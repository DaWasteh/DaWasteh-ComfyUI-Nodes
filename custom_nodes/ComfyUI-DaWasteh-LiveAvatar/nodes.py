"""Continuous, latest-frame LivePortrait output node.

Torch work deliberately remains in ComfyUI's execution thread. Only camera I/O
and Spout presentation use worker threads, each owning its native resource.
"""
from __future__ import annotations

import atexit
import copy
import importlib
import logging
import sys
import threading
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import numpy as np

LOGGER = logging.getLogger(__name__)


class DaWastehVRMLiveAvatarLauncher:
    """Non-blocking launcher for the localhost-only browser VRM application."""

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"port": ("INT", {"default": 8188, "min": 1, "max": 65535})}}

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("vrm_live_url",)
    OUTPUT_NODE = True
    FUNCTION = "open"
    CATEGORY = "DaWasteh/Live Avatar"

    def open(self, port: int = 8188):
        from .vrm_server import app_url
        url = app_url(int(port))
        return {"ui": {"text": [url]}, "result": (url,)}


@dataclass
class LatestFrameSlot:
    """One-element mailbox whose publishers overwrite stale frames."""

    frame: Any = None
    sequence: int = 0
    closed: bool = False
    error: BaseException | None = None
    lock: threading.Lock = field(default_factory=threading.Lock)
    ready: threading.Condition = field(init=False)

    def __post_init__(self) -> None:
        self.ready = threading.Condition(self.lock)

    def publish(self, frame: Any) -> int:
        with self.ready:
            if self.closed:
                return self.sequence
            self.frame = frame
            self.sequence += 1
            self.ready.notify_all()
            return self.sequence

    def get_after(self, sequence: int, timeout: float) -> tuple[Any, int] | None:
        with self.ready:
            self.ready.wait_for(
                lambda: self.closed or self.error is not None or self.sequence > sequence,
                timeout,
            )
            self._raise_locked()
            if self.sequence <= sequence:
                return None
            return self.frame, self.sequence

    def latest(self) -> tuple[Any, int] | None:
        with self.lock:
            self._raise_locked()
            if self.sequence == 0:
                return None
            return self.frame, self.sequence

    def fail(self, error: BaseException) -> None:
        with self.ready:
            self.error = error
            self.ready.notify_all()

    def raise_if_error(self) -> None:
        with self.lock:
            self._raise_locked()

    def _raise_locked(self) -> None:
        if self.error is not None:
            raise RuntimeError("live-avatar worker failed") from self.error

    def close(self) -> None:
        with self.ready:
            self.closed = True
            self.ready.notify_all()


def square_roi(frame: np.ndarray, offset_x: int = 0, offset_y: int = 0) -> np.ndarray:
    """Return a validated centered square crop with clamped pixel offsets."""

    if not isinstance(frame, np.ndarray) or frame.ndim != 3 or frame.shape[2] < 3:
        raise ValueError("camera frame must be HxWxC")
    height, width = frame.shape[:2]
    side = min(height, width)
    left = (width - side) // 2 + int(offset_x)
    top = (height - side) // 2 + int(offset_y)
    left = min(max(left, 0), width - side)
    top = min(max(top, 0), height - side)
    return frame[top : top + side, left : left + side, :3]


def rgba_from_rgb_and_mask(rgb: np.ndarray, load_image_mask: np.ndarray) -> np.ndarray:
    """Match JoinImageWithAlpha: output alpha equals ``1 - LoadImage MASK``."""

    if rgb.ndim != 3 or rgb.shape[2] < 3:
        raise ValueError("rgb must be HxWx3")
    if load_image_mask.shape != rgb.shape[:2]:
        raise ValueError("mask dimensions must match RGB")
    alpha = np.clip(1.0 - load_image_mask, 0.0, 1.0)[..., None]
    return np.concatenate((np.clip(rgb[..., :3], 0.0, 1.0), alpha), axis=-1)


def composite_rgba_bchw(face_mask: Any, warped: Any, static_background: Any, alpha: Any) -> Any:
    """Blend BCHW tensors and append a B1HW alpha channel."""

    tensors = (face_mask, warped, static_background, alpha)
    if any(getattr(tensor, "ndim", None) != 4 for tensor in tensors):
        raise ValueError("composite inputs must be four-dimensional BCHW tensors")
    if face_mask.shape != warped.shape or warped.shape != static_background.shape:
        raise ValueError("RGB composite tensors must have identical BCHW shapes")
    if face_mask.shape[1] != 3 or alpha.shape[1] != 1:
        raise ValueError("composite expects three RGB channels and one alpha channel")
    if alpha.shape[0] != face_mask.shape[0] or alpha.shape[2:] != face_mask.shape[2:]:
        raise ValueError("alpha dimensions must match the RGB batch and spatial dimensions")
    composite = (face_mask * warped + static_background).clamp(0, 1)
    return __import__("torch").cat((composite, alpha.clamp(0, 1)), dim=1)


def _loaded_liveportrait_nodes() -> Any:
    """Reuse ComfyUI's loaded LivePortraitKJ module instead of duplicating it."""

    for module in tuple(sys.modules.values()):
        module_file = getattr(module, "__file__", None)
        if not module_file or not hasattr(module, "_transform_img_kornia"):
            continue
        path = Path(module_file)
        if path.name == "nodes.py" and path.parent.name == "ComfyUI-LivePortraitKJ":
            return module
    try:
        return importlib.import_module("custom_nodes.ComfyUI-LivePortraitKJ.nodes")
    except ModuleNotFoundError as error:
        if error.name in {
            "custom_nodes",
            "custom_nodes.ComfyUI-LivePortraitKJ",
            "custom_nodes.ComfyUI-LivePortraitKJ.nodes",
        }:
            raise RuntimeError("ComfyUI-LivePortraitKJ must be installed before this node") from error
        raise RuntimeError(f"LivePortraitKJ dependency failed to import: {error.name}") from error


class CaptureWorker:
    def __init__(
        self,
        slot: LatestFrameSlot,
        cam_index: int,
        width: int,
        height: int,
        square_crop: bool,
        offset_x: int,
        offset_y: int,
        mirror: bool,
    ) -> None:
        self.slot = slot
        self.cam_index = cam_index
        self.width = width
        self.height = height
        self.square_crop = square_crop
        self.offset_x = offset_x
        self.offset_y = offset_y
        self.mirror = mirror
        self.stop_event = threading.Event()
        self.thread = threading.Thread(
            target=self._run,
            name="DaWastehLiveAvatarCapture",
            daemon=True,
        )
        self.cap: Any = None
        self.started = False

    def start(self) -> None:
        if self.started:
            raise RuntimeError("capture worker already started")
        self.thread.start()
        self.started = True

    def stop(self, timeout: float = 3.0) -> bool:
        self.stop_event.set()
        self.slot.close()
        if not self.started:
            return True
        self.thread.join(timeout=timeout)
        return not self.thread.is_alive()

    def _run(self) -> None:
        try:
            import cv2

            self.cap = cv2.VideoCapture(self.cam_index)
            if not self.cap.isOpened():
                raise RuntimeError(f"could not open webcam index {self.cam_index}")
            self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.width)
            self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.height)
            if hasattr(cv2, "CAP_PROP_BUFFERSIZE"):
                self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
            if hasattr(cv2, "CAP_PROP_READ_TIMEOUT_MSEC"):
                self.cap.set(cv2.CAP_PROP_READ_TIMEOUT_MSEC, 1000)

            while not self.stop_event.is_set():
                ok, frame = self.cap.read()
                if not ok:
                    raise RuntimeError("failed to capture webcam frame")
                if self.square_crop:
                    frame = square_roi(frame, self.offset_x, self.offset_y)
                if self.mirror:
                    frame = cv2.flip(frame, 1)
                frame = cv2.resize(frame, (256, 256), interpolation=cv2.INTER_AREA)
                self.slot.publish(frame)
        except BaseException as error:
            if not self.stop_event.is_set():
                self.slot.fail(error)
        finally:
            if self.cap is not None:
                self.cap.release()
                self.cap = None


class SpoutWorker:
    def __init__(self, slot: LatestFrameSlot, sender_name: str, fps: int) -> None:
        self.slot = slot
        self.sender_name = sender_name
        self.delay = 1.0 / fps
        self.stop_event = threading.Event()
        self.thread = threading.Thread(
            target=self._run,
            name="DaWastehLiveAvatarSpout",
            daemon=True,
        )
        self.sender: Any = None
        self.started = False

    def start(self) -> None:
        if self.started:
            raise RuntimeError("Spout worker already started")
        self.thread.start()
        self.started = True

    def stop(self, timeout: float = 3.0) -> bool:
        self.stop_event.set()
        self.slot.close()
        if not self.started:
            return True
        self.thread.join(timeout=timeout)
        return not self.thread.is_alive()

    def healthy(self) -> bool:
        return self.started and self.thread.is_alive() and not self.stop_event.is_set()

    def _run(self) -> None:
        try:
            if not sys.platform.startswith("win"):
                raise RuntimeError("Spout is only available on Windows")
            import SpoutGL
            from OpenGL import GL

            self.sender = SpoutGL.SpoutSender()
            self.sender.setSenderName(self.sender_name)
            latest = None
            next_tick = time.monotonic()
            while not self.stop_event.is_set():
                wait = max(0.0, next_tick - time.monotonic())
                if self.stop_event.wait(wait):
                    break
                item = self.slot.latest()
                if item is not None:
                    latest = item[0]
                if latest is not None:
                    image = np.ascontiguousarray(latest, dtype=np.uint8)
                    height, width = image.shape[:2]
                    self.sender.sendImage(image, width, height, GL.GL_RGBA, False, 0)
                    self.sender.setFrameSync(self.sender_name)
                next_tick = time.monotonic() + self.delay
        except BaseException as error:
            if not self.stop_event.is_set():
                self.slot.fail(error)
        finally:
            if self.sender is not None:
                self.sender.releaseSender()
                self.sender = None


_PERSISTENT_SPOUTS: dict[str, tuple[LatestFrameSlot, SpoutWorker]] = {}
_PERSISTENT_SPOUTS_LOCK = threading.Lock()


def _persistent_spout(sender_name: str, fps: int) -> LatestFrameSlot:
    """Return a healthy sender mailbox, replacing failed/dead workers atomically."""
    retired: tuple[LatestFrameSlot, SpoutWorker] | None = None
    with _PERSISTENT_SPOUTS_LOCK:
        existing = _PERSISTENT_SPOUTS.get(sender_name)
        if existing is not None:
            slot, worker = existing
            try:
                slot.raise_if_error()
            except RuntimeError:
                retired = _PERSISTENT_SPOUTS.pop(sender_name)
            else:
                if worker.healthy() and abs(worker.delay - (1.0 / fps)) < 1e-9:
                    return slot
                retired = _PERSISTENT_SPOUTS.pop(sender_name)
        if retired is not None and not retired[1].stop():
            _PERSISTENT_SPOUTS[sender_name] = retired
            raise RuntimeError(
                f"persistent Spout sender {sender_name!r} did not stop; refusing an overlapping replacement"
            )
        slot = LatestFrameSlot()
        worker = SpoutWorker(slot, sender_name, fps)
        worker.start()
        _PERSISTENT_SPOUTS[sender_name] = (slot, worker)
        return slot


def _stop_persistent_spouts() -> None:
    with _PERSISTENT_SPOUTS_LOCK:
        workers = list(_PERSISTENT_SPOUTS.values())
        _PERSISTENT_SPOUTS.clear()
    for _, worker in workers:
        try:
            worker.stop()
        except BaseException:
            LOGGER.exception("persistent Spout cleanup failed")


atexit.register(_stop_persistent_spouts)


class DaWastehPersistentSpout:
    """Publish the latest IMAGE continuously so OBS does not lose the sender between prompts."""

    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = "publish"
    CATEGORY = "DaWasteh/Live Avatar"
    DESCRIPTION = (
        "Keeps the latest RGBA frame on a named Spout sender between Run (Instant) prompts. "
        "The sender remains alive until ComfyUI exits."
    )

    @classmethod
    def INPUT_TYPES(cls) -> dict[str, dict[str, Any]]:
        return {
            "required": {
                "images": ("IMAGE",),
                "sender_name": ("STRING", {"default": "ComfyLiveAvatar"}),
                "sender_fps": ("INT", {"default": 30, "min": 1, "max": 60}),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs: Any) -> float:
        return float("NaN")

    def publish(self, images: Any, sender_name: str, sender_fps: int) -> tuple[()]:
        import torch

        if not sys.platform.startswith("win"):
            raise RuntimeError("Persistent Spout output is supported on Windows only")
        if not isinstance(images, torch.Tensor) or images.ndim != 4 or images.shape[0] < 1:
            raise ValueError("images must be a non-empty BHWC tensor")
        frame = images[0].detach().float().clamp(0, 1)
        if frame.shape[-1] not in (3, 4):
            raise ValueError("images must have RGB or RGBA channels")
        rgb = frame[..., :3].mul(255).round().byte().cpu().numpy()
        if frame.shape[-1] == 4:
            alpha = frame[..., 3:4].mul(255).round().byte().cpu().numpy()
        else:
            alpha = np.full((*rgb.shape[:2], 1), 255, dtype=np.uint8)
        rgba = np.ascontiguousarray(np.concatenate((rgb, alpha), axis=2))
        _persistent_spout(str(sender_name), int(sender_fps)).publish(rgba)
        return ()


class DaWastehContinuousLiveAvatar:
    """Face-only experimental live output that blocks ComfyUI until interrupted."""

    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = "run"
    CATEGORY = "DaWasteh/Live Avatar"
    DESCRIPTION = (
        "Face-only continuous LivePortrait sender. Run once normally, then use Interrupt "
        "to stop; never use Run (Instant). It blocks other ComfyUI jobs while active."
    )

    @classmethod
    def INPUT_TYPES(cls) -> dict[str, dict[str, Any]]:
        return {
            "required": {
                "pipeline": ("LIVEPORTRAITPIPE",),
                "crop_info": ("CROPINFO",),
                "source_image": ("IMAGE",),
                "source_mask": ("MASK",),
                "sender_name": ("STRING", {"default": "ComfyLiveAvatarFast"}),
                "sender_fps": ("INT", {"default": 30, "min": 1, "max": 60}),
                "cam_index": ("INT", {"default": 1, "min": 0, "max": 255}),
                "capture_width": ("INT", {"default": 960, "min": 256, "max": 4096}),
                "capture_height": ("INT", {"default": 540, "min": 256, "max": 4096}),
                "square_crop": ("BOOLEAN", {"default": True}),
                "crop_offset_x": ("INT", {"default": 0, "min": -2048, "max": 2048}),
                "crop_offset_y": ("INT", {"default": 0, "min": -2048, "max": 2048}),
                "mirror": ("BOOLEAN", {"default": True}),
                "delta_multiplier": (
                    "FLOAT",
                    {"default": 0.75, "min": 0.1, "max": 2.0, "step": 0.01},
                ),
                "stitching": ("BOOLEAN", {"default": True}),
                "lip_zero": ("BOOLEAN", {"default": False}),
                "lip_zero_threshold": (
                    "FLOAT",
                    {"default": 0.03, "min": 0.001, "max": 1.0, "step": 0.001},
                ),
                "max_frames": ("INT", {"default": 0, "min": 0, "max": 100000}),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs: Any) -> float:
        return float("NaN")

    @staticmethod
    def _restore_cfg(cfg: Any, saved: dict[str, Any]) -> None:
        for key in set(vars(cfg)) - set(saved):
            delattr(cfg, key)
        for key, value in saved.items():
            setattr(cfg, key, value)

    def run(
        self,
        pipeline: Any,
        crop_info: dict[str, Any],
        source_image: Any,
        source_mask: Any,
        sender_name: str,
        sender_fps: int,
        cam_index: int,
        capture_width: int,
        capture_height: int,
        square_crop: bool,
        crop_offset_x: int,
        crop_offset_y: int,
        mirror: bool,
        delta_multiplier: float,
        stitching: bool,
        lip_zero: bool,
        lip_zero_threshold: float,
        max_frames: int,
    ) -> tuple[()]:
        import cv2
        import torch
        import torch.nn.functional as torch_functional
        import comfy.model_management as mm

        if not sys.platform.startswith("win"):
            raise RuntimeError("Continuous Spout output is supported on Windows only")

        kj = _loaded_liveportrait_nodes()
        transform = kj._transform_img_kornia
        cfg = pipeline.live_portrait_wrapper.cfg
        saved_cfg = copy.copy(vars(cfg))
        capture_slot = LatestFrameSlot()
        output_slot = LatestFrameSlot()
        capture = CaptureWorker(
            capture_slot,
            cam_index,
            capture_width,
            capture_height,
            square_crop,
            crop_offset_x,
            crop_offset_y,
            mirror,
        )
        spout = SpoutWorker(output_slot, sender_name, sender_fps)

        try:
            device = mm.get_torch_device()
            source_rgb = source_image[..., :3].permute(0, 3, 1, 2).contiguous().to(device)
            height, width = source_rgb.shape[2:]

            alpha = (1.0 - source_mask.to(device)).clamp(0, 1).unsqueeze(1)
            if alpha.shape[2:] != (height, width):
                alpha = torch_functional.interpolate(
                    alpha,
                    size=(height, width),
                    mode="bilinear",
                    align_corners=False,
                )

            mask_path = Path(kj.script_directory) / "liveportrait" / "utils" / "resources" / "mask_template.png"
            mask_image = cv2.imread(str(mask_path), cv2.IMREAD_COLOR)
            if mask_image is None:
                raise RuntimeError(f"could not load LivePortrait blend mask: {mask_path}")
            mask_bhwc = torch.from_numpy(mask_image).unsqueeze(0).float().div(255)
            face_mask = transform(
                mask_bhwc,
                crop_info["crop_info_list"][0]["M_c2o"],
                (width, height),
                device,
            ).clamp(0, 1)
            static_background = (1.0 - face_mask) * source_rgb

            cfg.flag_stitching = stitching
            cfg.flag_lip_zero = lip_zero
            cfg.lip_zero_threshold = lip_zero_threshold
            cfg.flag_eye_retargeting = False
            cfg.eyes_retargeting_multiplier = 1.0
            cfg.flag_lip_retargeting = False
            cfg.lip_retargeting_multiplier = 1.0
            capture.start()
            spout.start()

            sequence = 0
            frames = 0
            while max_frames == 0 or frames < max_frames:
                mm.throw_exception_if_processing_interrupted()
                capture_slot.raise_if_error()
                output_slot.raise_if_error()
                item = capture_slot.get_after(sequence, 2.0)
                if item is None:
                    continue
                bgr, sequence = item
                rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
                driving = (
                    torch.from_numpy(rgb)
                    .to(device=device, dtype=torch.float32)
                    .div(255)
                    .unsqueeze(0)
                    .permute(0, 3, 1, 2)
                    .contiguous()
                )
                if cfg.flag_use_half_precision:
                    driving = driving.half()

                out = pipeline.execute(
                    driving,
                    crop_info,
                    None,
                    delta_multiplier,
                    "single_frame",
                    3e-6,
                    "constant",
                )
                if not out.get("out_list") or not out["out_list"][0]:
                    continue
                generated_bhwc = (
                    torch.clamp(out["out_list"][0]["out"], 0, 1)
                    .permute(0, 2, 3, 1)
                    .contiguous()
                )
                warped = transform(
                    generated_bhwc,
                    crop_info["crop_info_list"][0]["M_c2o"],
                    (width, height),
                    device,
                )
                rgba_bchw = composite_rgba_bchw(face_mask, warped, static_background, alpha)
                rgba = rgba_bchw[0].permute(1, 2, 0).mul(255).byte().cpu().numpy()
                output_slot.publish(rgba)
                frames += 1
        finally:
            capture_stopped = False
            spout_stopped = False
            try:
                capture_stopped = capture.stop()
            except BaseException:
                LOGGER.exception("webcam worker cleanup failed")
            try:
                spout_stopped = spout.stop()
            except BaseException:
                LOGGER.exception("Spout worker cleanup failed")
            finally:
                self._restore_cfg(cfg, saved_cfg)
            if not capture_stopped:
                LOGGER.error("webcam worker did not stop within the cleanup timeout")
            if not spout_stopped:
                LOGGER.error("Spout worker did not stop within the cleanup timeout")
        return ()
