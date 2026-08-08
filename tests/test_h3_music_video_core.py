from __future__ import annotations

import importlib.util
import json
import subprocess
import tempfile
import unittest
import wave
from pathlib import Path
from unittest import mock


ROOT = Path(__file__).resolve().parents[1]
CORE_PATH = ROOT / "custom_nodes" / "ComfyUI-DaWasteh-H3-MusicVideo" / "core.py"
HAVE_COMFY_RUNTIME = importlib.util.find_spec("torch") is not None and importlib.util.find_spec("av") is not None


class H3WorkflowSerializationTests(unittest.TestCase):
    def test_director_seed_control_does_not_shift_following_widgets(self):
        workflow_path = (
            ROOT
            / "workflows"
            / "Reference to Video"
            / "MiniMax_H3_Complete_Song_to_Music_Video_One_Click.json"
        )
        workflow = json.loads(workflow_path.read_text(encoding="utf-8"))
        director = next(node for node in workflow["nodes"] if node["type"] == "DaWH3MusicVideoDirector")
        values = director["widgets_values"]
        self.assertEqual(values[13], 314159265358979)
        self.assertEqual(values[14], "fixed")
        self.assertEqual(values[15], "increment per scene")
        self.assertIs(values[16], True)
        self.assertEqual(values[17:21], [14.0, 18.0, "medium", "mkv"])


@unittest.skipUnless(HAVE_COMFY_RUNTIME, "requires the ComfyUI runtime's torch and PyAV")
class H3MusicVideoCoreTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        spec = importlib.util.spec_from_file_location("h3_music_video_core_test", CORE_PATH)
        assert spec and spec.loader
        cls.core = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cls.core)

    def run_ffmpeg(self, *args: str) -> None:
        subprocess.run(
            [self.core.find_ffmpeg(), "-hide_banner", "-loglevel", "error", "-y", *args],
            check=True,
        )

    def make_video(self, path: Path, frames: int) -> None:
        import av
        import numpy as np
        with av.open(str(path), "w") as container:
            stream = container.add_stream("mpeg4", rate=24)
            stream.width = stream.height = 16
            stream.pix_fmt = "yuv420p"
            for _ in range(frames):
                frame = av.VideoFrame.from_ndarray(np.zeros((16, 16, 3), dtype=np.uint8), format="rgb24")
                for packet in stream.encode(frame):
                    container.mux(packet)
            for packet in stream.encode():
                container.mux(packet)

    def test_frame_grid_boundaries(self):
        self.assertEqual(self.core.align_h3_frames(0), 5)
        self.assertEqual(self.core.align_h3_frames(5), 5)
        self.assertEqual(self.core.align_h3_frames(6), 22)
        self.assertEqual(self.core.align_h3_frames(22), 22)
        self.assertEqual(self.core.align_h3_frames(3592), 3592)
        with self.assertRaises(ValueError):
            self.core.align_h3_frames(3593)

    def test_pyav_counts_decoded_frames_without_ffprobe(self):
        with tempfile.TemporaryDirectory() as directory:
            video = Path(directory) / "frames.mp4"
            self.make_video(video, 7)
            with mock.patch.object(self.core, "find_ffprobe", side_effect=AssertionError("ffprobe must not run")):
                self.assertEqual(self.core.count_video_frames("definitely-not-ffmpeg", str(video)), 7)

    def test_no_video_stream_reports_clear_error(self):
        with tempfile.TemporaryDirectory() as directory:
            audio = Path(directory) / "audio.wav"
            with wave.open(str(audio), "wb") as handle:
                handle.setnchannels(1)
                handle.setsampwidth(2)
                handle.setframerate(8000)
                handle.writeframes(b"\\0\\0" * 800)
            with self.assertRaisesRegex(ValueError, "No video stream"):
                self.core.count_video_frames("definitely-not-ffmpeg", str(audio))

    def test_pyav_decode_error_falls_back_to_ffprobe(self):
        invalid_data = self.core.av.error.InvalidDataError(1094995529, "invalid data")
        probe_result = subprocess.CompletedProcess(
            ["ffprobe"],
            0,
            stdout=b'{"streams":[{"nb_read_frames":"7"}]}',
            stderr=b"",
        )
        with (
            mock.patch.object(self.core.av, "open", side_effect=invalid_data),
            mock.patch.object(self.core, "find_ffprobe", return_value="ffprobe") as find_probe,
            mock.patch.object(self.core, "run_command", return_value=probe_result),
        ):
            self.assertEqual(self.core.count_video_frames("ffmpeg", "broken.mp4"), 7)
        find_probe.assert_called_once_with("ffmpeg")

    def test_final_mux_preserves_every_original_audio_packet(self):
        import av
        import hashlib

        def audio_packet_digest(path: Path) -> tuple[str, int]:
            digest = hashlib.sha256()
            count = 0
            with av.open(str(path)) as container:
                for packet in container.demux(container.streams.audio[0]):
                    payload = bytes(packet)
                    if payload:
                        digest.update(payload)
                        count += 1
            return digest.hexdigest(), count

        with tempfile.TemporaryDirectory() as directory:
            project = Path(directory)
            segment = project / "segment.mp4"
            source_audio = project / "song.mp3"
            output = project / "final.mkv"
            self.make_video(segment, 48)
            self.run_ffmpeg(
                "-f", "lavfi", "-i", "sine=frequency=440:duration=2", "-c:a", "libmp3lame", "-b:a", "192k", str(source_audio),
            )
            manifest = {
                "project_dir": str(project),
                "source_audio_copy": str(source_audio),
                "final_output_path": str(output),
                "settings": {"video_preset": "medium", "final_crf": 18},
                "segments": [{"video_path": str(segment), "target_frames": 48}],
            }
            manifest_path = project / "manifest.json"
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            original_run_command = self.core.run_command
            commands = []

            def record(command, **kwargs):
                commands.append(command)
                return original_run_command(command, **kwargs)

            with mock.patch.object(self.core, "run_command", side_effect=record):
                self.assertEqual(
                    self.core.concat_and_mux_project(self.core.find_ffmpeg(), str(manifest_path)),
                    str(output),
                )
            final_command = next(command for command in commands if str(output.with_name("final.tmp.mkv")) in command)
            self.assertNotIn("-shortest", final_command)
            self.assertIn("-c:a", final_command)
            self.assertEqual(final_command[final_command.index("-c:a") + 1], "copy")
            self.assertEqual(self.core.count_video_frames(self.core.find_ffmpeg(), str(output)), 48)
            with av.open(str(output)) as container:
                self.assertIn(container.streams.audio[0].codec_context.name, {"mp3", "mp3float"})
                self.assertLessEqual(float(container.duration / av.time_base), 2.1)
            self.assertEqual(audio_packet_digest(source_audio), audio_packet_digest(output))


if __name__ == "__main__":
    unittest.main()
