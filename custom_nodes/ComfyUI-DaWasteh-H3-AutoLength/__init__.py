"""DaWasteh MiniMax H3 auto-length helpers for ComfyUI.

Nodes:
- Prepare Reference Video for H3 Auto Length
- Load Audio for H3 Auto Length
- Save Video with Original Audio (stream copy)

Designed for current ComfyUI's VIDEO/AUDIO API and MiniMax H3's 24 fps,
17k+5 frame grid.
"""

from __future__ import annotations

import hashlib
import math
import os
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Optional

import av
import torch

import folder_paths
from comfy_api.latest import ComfyExtension, Types, io, ui


H3_FPS = 24.0
H3_MAX_FRAMES = 3600
CATEGORY = "DaWasteh/MiniMax H3"


def _align_h3_frame_count(frame_count: int) -> int:
    """Round upward to MiniMax H3's required 17k+5 frame grid."""
    frame_count = max(5, int(frame_count))
    aligned = frame_count + ((5 - frame_count) % 17)
    if aligned > H3_MAX_FRAMES:
        raise ValueError(
            f"MiniMax H3 supports at most {H3_MAX_FRAMES} frames in the node. "
            f"The requested duration needs {aligned} frames."
        )
    return aligned


def _duration_to_h3_frames(duration_seconds: float) -> tuple[int, int]:
    if not math.isfinite(duration_seconds) or duration_seconds <= 0:
        raise ValueError(f"Invalid media duration: {duration_seconds!r} seconds")
    # Ceil first so the generated video can always be trimmed to the exact source duration.
    raw_frames = max(5, int(math.ceil(duration_seconds * H3_FPS - 1e-9)))
    return raw_frames, _align_h3_frame_count(raw_frames)


def _apply_duration_guard(duration: float, max_seconds: float, overflow_mode: str, media_name: str) -> float:
    if max_seconds <= 0:
        raise ValueError("max_seconds must be greater than zero")
    if duration <= max_seconds + 1e-6:
        return duration
    if overflow_mode == "trim_to_max":
        return float(max_seconds)
    raise ValueError(
        f"{media_name} is {duration:.3f} seconds long, but this workflow's safety cap is "
        f"{max_seconds:.3f} seconds. Raise max_seconds deliberately or split the source into "
        "multiple H3 shots. The guard runs before model loading to avoid an avoidable OOM."
    )


def _resample_reference_frames_to_24fps(
    images: torch.Tensor,
    source_fps: float,
    exact_duration: float,
    raw_target_frames: int,
    aligned_target_frames: int,
) -> torch.Tensor:
    """Sample source motion at 24 fps, then pad only the H3-grid tail with the final frame."""
    if images is None or images.ndim != 4 or images.shape[0] == 0:
        raise ValueError("The reference video contains no decodable frames")
    if not math.isfinite(source_fps) or source_fps <= 0:
        raise ValueError(f"Invalid source frame rate: {source_fps!r}")

    source_count = int(images.shape[0])
    # Timestamp of every target frame. Nearest-neighbour preserves duration and does not
    # interpolate/blur the actual reference frames.
    target_times = torch.arange(raw_target_frames, dtype=torch.float64) / H3_FPS
    source_indices = torch.round(target_times * source_fps).to(torch.long)
    source_indices.clamp_(0, source_count - 1)
    source_indices = source_indices.to(images.device)
    result = images.index_select(0, source_indices)

    pad = aligned_target_frames - raw_target_frames
    if pad > 0:
        repeat_shape = [pad] + [1] * (result.ndim - 1)
        tail = result[-1:].repeat(*repeat_shape)
        result = torch.cat((result, tail), dim=0)
    return result


def _pcm_to_float32(wav: torch.Tensor) -> torch.Tensor:
    if wav.dtype.is_floating_point:
        return wav.float()
    if wav.dtype == torch.int16:
        return wav.float() / (2**15)
    if wav.dtype == torch.int32:
        return wav.float() / (2**31)
    if wav.dtype == torch.uint8:
        return (wav.float() - 128.0) / 128.0
    raise ValueError(f"Unsupported decoded audio dtype: {wav.dtype}")


def _probe_audio_duration(path: str) -> float:
    with av.open(path, mode="r") as container:
        if not container.streams.audio:
            raise ValueError(f"No audio stream found in '{path}'")
        stream = container.streams.audio[0]
        if stream.duration is not None and stream.time_base is not None:
            value = float(stream.duration * stream.time_base)
            if value > 0:
                return value
        if container.duration is not None:
            value = float(container.duration / av.time_base)
            if value > 0:
                return value
    raise ValueError(f"Could not determine audio duration for '{path}'")


def _decode_audio(path: str, duration_limit: Optional[float] = None) -> tuple[torch.Tensor, int]:
    """Decode the first audio stream to ComfyUI's [C, samples] float32 representation."""
    with av.open(path, mode="r") as container:
        if not container.streams.audio:
            raise ValueError(f"No audio stream found in '{path}'")
        stream = container.streams.audio[0]
        sample_rate = int(stream.codec_context.sample_rate or 0)
        channels = int(getattr(stream, "channels", 0) or getattr(stream.codec_context, "channels", 0) or 0)
        frames: list[torch.Tensor] = []
        samples_read = 0
        sample_cap = None
        if duration_limit is not None and sample_rate > 0:
            sample_cap = int(math.ceil(duration_limit * sample_rate))

        for frame in container.decode(streams=stream.index):
            if sample_rate <= 0:
                sample_rate = int(frame.sample_rate or 0)
                if duration_limit is not None and sample_rate > 0:
                    sample_cap = int(math.ceil(duration_limit * sample_rate))
            if channels <= 0:
                channels = int(frame.layout.nb_channels)

            buf = torch.from_numpy(frame.to_ndarray())
            if buf.ndim == 1:
                buf = buf.unsqueeze(0)
            if buf.shape[0] != channels:
                buf = buf.reshape(-1, channels).t()
            buf = _pcm_to_float32(buf)

            if sample_cap is not None:
                remaining = sample_cap - samples_read
                if remaining <= 0:
                    break
                if buf.shape[-1] > remaining:
                    buf = buf[..., :remaining]
            frames.append(buf)
            samples_read += int(buf.shape[-1])
            if sample_cap is not None and samples_read >= sample_cap:
                break

        if not frames or sample_rate <= 0:
            raise ValueError(f"No decodable audio frames found in '{path}'")
        return torch.cat(frames, dim=-1).contiguous(), sample_rate


def _find_ffmpeg() -> str:
    candidates: list[Optional[str]] = [
        os.environ.get("FFMPEG_PATH"),
        shutil.which("ffmpeg"),
        shutil.which("ffmpeg.exe"),
    ]
    try:
        import imageio_ffmpeg  # type: ignore

        candidates.append(imageio_ffmpeg.get_ffmpeg_exe())
    except Exception:
        pass
    # VideoHelperSuite commonly exposes its selected FFmpeg path here.
    for module_name in ("videohelpersuite.utils", "videohelpersuite.load_video_nodes"):
        try:
            module = __import__(module_name, fromlist=["ffmpeg_path"])
            candidates.append(getattr(module, "ffmpeg_path", None))
        except Exception:
            pass
    for candidate in candidates:
        if candidate and os.path.isfile(candidate):
            return os.path.abspath(candidate)
        if candidate and shutil.which(candidate):
            return str(shutil.which(candidate))
    raise RuntimeError(
        "FFmpeg was not found. Put ffmpeg.exe on PATH, set FFMPEG_PATH, or keep "
        "ComfyUI-VideoHelperSuite installed with a working FFmpeg configuration."
    )


def _safe_filename_prefix(prefix: str) -> str:
    prefix = (prefix or "video/MiniMax_H3").strip().replace("\\", "/")
    while prefix.startswith("/"):
        prefix = prefix[1:]
    return prefix or "video/MiniMax_H3"


class DaWH3PrepareReferenceVideo(io.ComfyNode):
    @classmethod
    def define_schema(cls):
        return io.Schema(
            node_id="DaWH3PrepareReferenceVideo",
            display_name="Prepare Reference Video for H3 Auto Length",
            category=CATEGORY,
            description=(
                "Reads source duration before model loading, converts motion to 24 fps, snaps the "
                "generation length upward to H3's 17k+5 grid, and pads only the final grid tail."
            ),
            inputs=[
                io.Video.Input("video"),
                io.Float.Input(
                    "max_seconds",
                    default=45.0,
                    min=0.25,
                    max=149.0,
                    step=0.25,
                    tooltip="Safety guard. H3 reference videos are officially intended for about 2-15 s; longer is experimental.",
                ),
                io.Combo.Input(
                    "overflow_mode",
                    options=["error", "trim_to_max"],
                    default="error",
                    tooltip="error stops before model loading; trim_to_max deliberately uses only the beginning.",
                ),
                io.Boolean.Input(
                    "require_audio",
                    default=True,
                    tooltip="Raise a clear error when the reference video has no soundtrack. Disable only after removing <Audio 1> from the prompt.",
                ),
            ],
            outputs=[
                io.Image.Output("reference_frames_24fps"),
                io.Audio.Output("reference_audio"),
                io.Int.Output("h3_length"),
                io.Float.Output("source_duration"),
                io.Float.Output("h3_duration"),
                io.Float.Output("source_fps"),
                io.Int.Output("source_frame_count"),
                io.String.Output("info"),
            ],
        )

    @classmethod
    def execute(cls, video, max_seconds: float, overflow_mode: str, require_audio: bool) -> io.NodeOutput:
        original_duration = float(video.get_duration())
        selected_duration = _apply_duration_guard(
            original_duration, float(max_seconds), overflow_mode, "Reference video"
        )
        working_video = video
        if selected_duration + 1e-6 < original_duration:
            trimmed = video.as_trimmed(0.0, selected_duration, strict_duration=False)
            if trimmed is None:
                raise ValueError("ComfyUI could not trim the reference video to the selected duration")
            working_video = trimmed

        components = working_video.get_components()
        images = components.images
        source_fps = float(components.frame_rate)
        source_frame_count = int(images.shape[0])
        if require_audio and components.audio is None:
            raise ValueError(
                "The reference video has no decodable audio track, but require_audio is enabled. "
                "Use a video with sound, or disable require_audio and remove <Audio 1> from the prompt."
            )
        raw_frames, h3_frames = _duration_to_h3_frames(selected_duration)
        frames_24 = _resample_reference_frames_to_24fps(
            images, source_fps, selected_duration, raw_frames, h3_frames
        )
        h3_duration = h3_frames / H3_FPS
        pad_frames = h3_frames - raw_frames
        audio_state = "present" if components.audio is not None else "none"
        info = (
            f"source={selected_duration:.3f}s @ {source_fps:.6g} fps, "
            f"decoded_frames={source_frame_count}, H3={h3_frames} frames / {h3_duration:.3f}s, "
            f"grid_tail_pad={pad_frames} frames, source_audio={audio_state}"
        )
        print(f"[DaWasteh H3 AutoLength] {info}")
        return io.NodeOutput(
            frames_24,
            components.audio,
            h3_frames,
            selected_duration,
            h3_duration,
            source_fps,
            source_frame_count,
            info,
        )


class DaWH3LoadAudioAutoLength(io.ComfyNode):
    @classmethod
    def define_schema(cls):
        input_dir = folder_paths.get_input_directory()
        os.makedirs(input_dir, exist_ok=True)
        files = [
            name
            for name in os.listdir(input_dir)
            if os.path.isfile(os.path.join(input_dir, name))
        ]
        files = folder_paths.filter_files_content_types(files, ["audio", "video"])
        return io.Schema(
            node_id="DaWH3LoadAudioAutoLength",
            display_name="Load Audio for H3 Auto Length",
            category=CATEGORY,
            description=(
                "Loads an audio reference, reports its original file path for stream-copy muxing, "
                "and derives an H3-safe generation length automatically."
            ),
            inputs=[
                # AUDIOUPLOAD expects the core LoadAudio node's companion audioUI widget.
                # This path node intentionally exposes a plain file combo because it also
                # returns the original absolute path for stream-copy muxing.
                io.Combo.Input("audio", options=sorted(files)),
                io.Float.Input(
                    "max_seconds",
                    default=45.0,
                    min=0.25,
                    max=149.0,
                    step=0.25,
                    tooltip="Safety guard evaluated before the full audio is decoded or H3 is loaded.",
                ),
                io.Combo.Input(
                    "overflow_mode",
                    options=["error", "trim_to_max"],
                    default="error",
                ),
            ],
            outputs=[
                io.Audio.Output("audio"),
                io.Int.Output("h3_length"),
                io.Float.Output("source_duration"),
                io.Float.Output("h3_duration"),
                io.String.Output("source_audio_path"),
                io.String.Output("source_filename"),
                io.String.Output("info"),
            ],
        )

    @classmethod
    def execute(cls, audio: str, max_seconds: float, overflow_mode: str) -> io.NodeOutput:
        audio_path = os.path.abspath(folder_paths.get_annotated_filepath(audio))
        probed_duration = _probe_audio_duration(audio_path)
        selected_duration = _apply_duration_guard(
            probed_duration, float(max_seconds), overflow_mode, "Audio"
        )
        decode_limit = selected_duration if selected_duration + 1e-6 < probed_duration else None
        waveform, sample_rate = _decode_audio(audio_path, duration_limit=decode_limit)
        decoded_duration = waveform.shape[-1] / float(sample_rate)
        # Decoded sample count is the authoritative H3/final-video duration. It avoids a
        # one-packet discrepancy common with compressed container metadata.
        selected_duration = min(selected_duration, decoded_duration)
        raw_frames, h3_frames = _duration_to_h3_frames(selected_duration)
        h3_duration = h3_frames / H3_FPS
        audio_value = {"waveform": waveform.unsqueeze(0), "sample_rate": sample_rate}
        info = (
            f"audio={Path(audio_path).name}, duration={selected_duration:.6f}s, "
            f"sample_rate={sample_rate}, channels={waveform.shape[0]}, "
            f"H3={h3_frames} frames / {h3_duration:.3f}s"
        )
        print(f"[DaWasteh H3 AutoLength] {info}")
        return io.NodeOutput(
            audio_value,
            h3_frames,
            selected_duration,
            h3_duration,
            audio_path,
            Path(audio_path).name,
            info,
        )

    @classmethod
    def fingerprint_inputs(cls, audio: str, max_seconds: float, overflow_mode: str):
        path = folder_paths.get_annotated_filepath(audio)
        stat = os.stat(path)
        value = f"{os.path.abspath(path)}|{stat.st_mtime_ns}|{stat.st_size}|{max_seconds}|{overflow_mode}"
        return hashlib.sha256(value.encode("utf-8")).hexdigest()

    @classmethod
    def validate_inputs(cls, audio: str, max_seconds: float, overflow_mode: str):
        if not folder_paths.exists_annotated_filepath(audio):
            return f"Invalid audio file: {audio}"
        return True


class DaWH3SaveVideoWithOriginalAudio(io.ComfyNode):
    @classmethod
    def define_schema(cls):
        return io.Schema(
            node_id="DaWH3SaveVideoWithOriginalAudio",
            display_name="Save Video with Original Audio (Stream Copy)",
            category=CATEGORY,
            description=(
                "Encodes the generated video once, then muxes the original input audio stream with "
                "FFmpeg -c:a copy. The audio is not decoded, filtered, resampled, normalized, or re-encoded."
            ),
            inputs=[
                io.Video.Input("video"),
                io.String.Input("source_audio_path"),
                io.Float.Input("duration", default=5.0, min=0.01, max=149.0, step=0.001),
                io.String.Input(
                    "filename_prefix",
                    default="video/MiniMax_H3_Image_Audio_AutoLength_OriginalAudio",
                ),
                io.Combo.Input(
                    "container",
                    options=["mkv", "mp4"],
                    default="mkv",
                    tooltip="MKV accepts essentially any source audio codec. MP4 can reject PCM/FLAC/Opus.",
                ),
                io.Float.Input(
                    "video_crf",
                    default=18.0,
                    min=0.0,
                    max=51.0,
                    step=1.0,
                    tooltip="Only the generated video is encoded; the source audio remains stream-copied.",
                ),
            ],
            is_output_node=True,
            outputs=[io.String.Output("saved_file")],
        )

    @classmethod
    def execute(
        cls,
        video,
        source_audio_path: str,
        duration: float,
        filename_prefix: str,
        container: str,
        video_crf: float,
    ) -> io.NodeOutput:
        source_audio_path = os.path.abspath(source_audio_path)
        if not os.path.isfile(source_audio_path):
            raise FileNotFoundError(f"Original audio file not found: {source_audio_path}")
        if duration <= 0:
            raise ValueError("duration must be greater than zero")

        ffmpeg = _find_ffmpeg()
        trimmed_video = video.as_trimmed(0.0, float(duration), strict_duration=True)
        if trimmed_video is None:
            raise ValueError(
                f"Generated video is shorter than the requested exact duration ({float(duration):.6f}s)"
            )
        width, height = trimmed_video.get_dimensions()
        prefix = _safe_filename_prefix(filename_prefix)
        output_dir = folder_paths.get_output_directory()
        full_output_folder, filename, counter, subfolder, _ = folder_paths.get_save_image_path(
            prefix, output_dir, width, height
        )
        os.makedirs(full_output_folder, exist_ok=True)
        output_name = f"{filename}_{counter:05}_.{container}"
        output_path = os.path.join(full_output_folder, output_name)

        temp_dir = folder_paths.get_temp_directory()
        os.makedirs(temp_dir, exist_ok=True)
        fd, temp_video_path = tempfile.mkstemp(prefix="daw_h3_video_", suffix=".mp4", dir=temp_dir)
        os.close(fd)
        try:
            trimmed_video.save_to(
                temp_video_path,
                format=Types.VideoContainer.MP4,
                codec=Types.VideoCodec.H264,
                metadata=None,
                crf=float(video_crf),
            )
            source_audio_duration = _probe_audio_duration(source_audio_path)
            trim_source_audio = source_audio_duration > float(duration) + 0.1
            command = [
                ffmpeg,
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-i",
                temp_video_path,
                "-i",
                source_audio_path,
                "-map",
                "0:v:0",
                "-map",
                "1:a:0",
                "-map_metadata",
                "1",
                "-c:v",
                "copy",
                "-c:a",
                "copy",
            ]
            # `trim_to_max` intentionally keeps only the selected beginning of a
            # genuinely longer source. Do not apply this to normal codec/container
            # padding (for example one final MP3 packet), because preserving every
            # original packet is the default contract.
            if trim_source_audio:
                command.extend(["-t", f"{float(duration):.9f}", "-shortest"])
            command.extend(["-avoid_negative_ts", "make_zero", output_path])
            completed = subprocess.run(command, capture_output=True, text=True, check=False)
            if completed.returncode != 0:
                raise RuntimeError(
                    "FFmpeg could not mux the original audio without re-encoding.\n"
                    f"Command: {' '.join(command)}\n"
                    f"stderr:\n{completed.stderr.strip()}\n"
                    "Use the default MKV container when the source is WAV/PCM, FLAC, Opus, or another "
                    "codec that MP4 does not accept."
                )
            if not os.path.isfile(output_path) or os.path.getsize(output_path) == 0:
                raise RuntimeError("FFmpeg returned success but no valid output file was created")
        finally:
            try:
                os.remove(temp_video_path)
            except OSError:
                pass

        print(
            f"[DaWasteh H3 AutoLength] Saved '{output_path}' with original audio stream copied unchanged."
        )
        saved = ui.SavedResult(output_name, subfolder, io.FolderType.output)
        return io.NodeOutput(output_path, ui=ui.PreviewVideo([saved]))


class DaWastehH3AutoLengthExtension(ComfyExtension):
    async def get_node_list(self):
        return [
            DaWH3PrepareReferenceVideo,
            DaWH3LoadAudioAutoLength,
            DaWH3SaveVideoWithOriginalAudio,
        ]


async def comfy_entrypoint() -> DaWastehH3AutoLengthExtension:
    return DaWastehH3AutoLengthExtension()
