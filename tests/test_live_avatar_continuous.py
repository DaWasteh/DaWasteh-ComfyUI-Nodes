import importlib.util
import shutil
import subprocess
import sys
import tempfile
import threading
import time
import types
import unittest
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = ROOT / "custom_nodes" / "ComfyUI-DaWasteh-LiveAvatar" / "nodes.py"
spec = importlib.util.spec_from_file_location("live_avatar_nodes", MODULE_PATH)
nodes = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = nodes
spec.loader.exec_module(nodes)


class LatestSlotTests(unittest.TestCase):
    def test_overwrite_returns_only_latest_frame(self):
        slot = nodes.LatestFrameSlot()
        slot.publish("old")
        slot.publish("latest")
        self.assertEqual(slot.get_after(0, 0.01), ("latest", 2))
        self.assertEqual(slot.latest(), ("latest", 2))

    def test_close_unblocks_waiter(self):
        slot = nodes.LatestFrameSlot()
        result = []
        thread = threading.Thread(target=lambda: result.append(slot.get_after(0, 1)))
        thread.start()
        time.sleep(0.01)
        slot.close()
        thread.join(1)
        self.assertFalse(thread.is_alive())
        self.assertEqual(result, [None])


class ImageUtilityTests(unittest.TestCase):
    def test_centered_square_roi_and_offsets_are_clamped(self):
        frame = np.arange(4 * 8 * 3, dtype=np.uint8).reshape(4, 8, 3)
        centered = nodes.square_roi(frame)
        self.assertTrue(np.array_equal(centered, frame[:, 2:6, :]))
        self.assertTrue(np.array_equal(nodes.square_roi(frame, 100, -100), frame[:, 4:8, :]))

    def test_invalid_roi_and_alpha_semantics(self):
        with self.assertRaises(ValueError):
            nodes.square_roi(np.zeros((3, 3), dtype=np.uint8))
        rgb = np.zeros((2, 2, 3), dtype=np.float32)
        mask = np.array([[0.0, 1.0], [0.25, 0.75]], dtype=np.float32)
        self.assertTrue(np.array_equal(nodes.rgba_from_rgb_and_mask(rgb, mask)[..., 3], 1 - mask))
        with self.assertRaises(ValueError):
            nodes.rgba_from_rgb_and_mask(rgb, np.zeros((1, 1)))

    @unittest.skipUnless(importlib.util.find_spec("torch"), "torch is only present in the ComfyUI environment")
    def test_production_composite_uses_bchw_and_appends_alpha_channel(self):
        import torch

        face_mask = torch.full((1, 3, 2, 2), 0.25)
        warped = torch.ones((1, 3, 2, 2))
        static = torch.full((1, 3, 2, 2), 0.5)
        alpha = torch.full((1, 1, 2, 2), 0.75)
        rgba = nodes.composite_rgba_bchw(face_mask, warped, static, alpha)
        self.assertEqual(tuple(rgba.shape), (1, 4, 2, 2))
        self.assertTrue(torch.allclose(rgba[:, :3], torch.full((1, 3, 2, 2), 0.75)))
        self.assertTrue(torch.allclose(rgba[:, 3:], alpha))
        with self.assertRaises(ValueError):
            nodes.composite_rgba_bchw(face_mask.permute(0, 2, 3, 1), warped, static, alpha)


class DependencyTests(unittest.TestCase):
    def test_loaded_liveportrait_module_is_reused(self):
        name = "test_loaded_liveportrait_nodes"
        fake = types.ModuleType(name)
        fake.__file__ = str(Path("X:/custom_nodes/ComfyUI-LivePortraitKJ/nodes.py"))
        fake._transform_img_kornia = object()
        sys.modules[name] = fake
        try:
            self.assertIs(nodes._loaded_liveportrait_nodes(), fake)
        finally:
            sys.modules.pop(name, None)

    @unittest.skipUnless(shutil.which("git"), "git is required for patch applicability test")
    def test_kjnodes_patch_applies_to_expected_source(self):
        patch = ROOT / "tools" / "patches" / "ComfyUI-KJNodes-WebcamCaptureCV2-ComfyUI-IS_CHANGED.patch"
        prefix = "\n" * 806
        source = prefix + '''class WebcamCaptureCV2:\n\n    @classmethod\n    def IS_CHANGED(cls):\n        return\n\n    RETURN_TYPES = ("IMAGE",)\n    RETURN_NAMES = ("image",)\n'''
        with tempfile.TemporaryDirectory() as temp:
            target = Path(temp) / "nodes" / "image_nodes.py"
            target.parent.mkdir(parents=True)
            target.write_text(source, encoding="utf-8")
            result = subprocess.run(
                [shutil.which("git"), "apply", "--check", str(patch)],
                cwd=temp,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            self.assertEqual(result.returncode, 0, result.stderr)


class LifecycleTests(unittest.TestCase):
    def test_workers_can_stop_before_start(self):
        capture = nodes.CaptureWorker(nodes.LatestFrameSlot(), 1, 256, 256, True, 0, 0, False)
        spout = nodes.SpoutWorker(nodes.LatestFrameSlot(), "test", 30)
        self.assertTrue(capture.stop(0.01))
        self.assertTrue(spout.stop(0.01))

    def test_capture_worker_releases_camera(self):
        released = []

        class FakeCap:
            def isOpened(self):
                return True

            def set(self, *args):
                return True

            def read(self):
                return False, None

            def release(self):
                released.append(True)

        fake_cv2 = types.SimpleNamespace(
            VideoCapture=lambda index: FakeCap(),
            CAP_PROP_FRAME_WIDTH=1,
            CAP_PROP_FRAME_HEIGHT=2,
            CAP_PROP_BUFFERSIZE=3,
            CAP_PROP_READ_TIMEOUT_MSEC=4,
            INTER_AREA=5,
            flip=lambda image, axis: image,
            resize=lambda image, size, interpolation: image,
        )
        old = sys.modules.get("cv2")
        sys.modules["cv2"] = fake_cv2
        try:
            worker = nodes.CaptureWorker(nodes.LatestFrameSlot(), 1, 256, 256, True, 0, 0, False)
            worker.start()
            worker.thread.join(1)
            self.assertTrue(released)
            with self.assertRaises(RuntimeError):
                worker.slot.get_after(0, 0.01)
            self.assertTrue(worker.stop(0.01))
        finally:
            if old is None:
                sys.modules.pop("cv2", None)
            else:
                sys.modules["cv2"] = old

    def test_spout_worker_releases_sender_and_paces_repeated_frames(self):
        released = []
        send_times = []

        class FakeSender:
            def setSenderName(self, name):
                pass

            def sendImage(self, *args):
                send_times.append(time.monotonic())

            def setFrameSync(self, name):
                pass

            def releaseSender(self):
                released.append(True)

        old_platform = sys.platform
        old_spout = sys.modules.get("SpoutGL")
        old_opengl = sys.modules.get("OpenGL")
        sys.platform = "win32"
        sys.modules["SpoutGL"] = types.SimpleNamespace(SpoutSender=FakeSender)
        sys.modules["OpenGL"] = types.SimpleNamespace(GL=types.SimpleNamespace(GL_RGBA=1))
        try:
            slot = nodes.LatestFrameSlot()
            slot.publish(np.zeros((2, 2, 4), dtype=np.uint8))
            worker = nodes.SpoutWorker(slot, "test", 20)
            worker.start()
            time.sleep(0.13)
            self.assertTrue(worker.stop())
            self.assertTrue(released)
            self.assertGreaterEqual(len(send_times), 2)
            self.assertLessEqual(len(send_times), 4)
            if len(send_times) > 1:
                self.assertGreaterEqual(min(b - a for a, b in zip(send_times, send_times[1:])), 0.035)
        finally:
            sys.platform = old_platform
            if old_spout is None:
                sys.modules.pop("SpoutGL", None)
            else:
                sys.modules["SpoutGL"] = old_spout
            if old_opengl is None:
                sys.modules.pop("OpenGL", None)
            else:
                sys.modules["OpenGL"] = old_opengl

    def test_config_restoration_removes_temporary_attributes(self):
        cfg = types.SimpleNamespace(flag_stitching=False, flag_lip_zero=False)
        saved = dict(vars(cfg))
        cfg.flag_stitching = True
        cfg.extra = 1
        nodes.DaWastehContinuousLiveAvatar._restore_cfg(cfg, saved)
        self.assertFalse(cfg.flag_stitching)
        self.assertFalse(cfg.flag_lip_zero)
        self.assertFalse(hasattr(cfg, "extra"))

    @unittest.skipUnless(importlib.util.find_spec("torch"), "torch is only present in the ComfyUI environment")
    def test_partial_start_failure_stops_both_workers_and_restores_cfg(self):
        import torch

        events = []

        class FakeCapture:
            def __init__(self, *args):
                pass

            def start(self):
                events.append("capture-start")

            def stop(self):
                events.append("capture-stop")
                return True

        class FakeSpout:
            def __init__(self, *args):
                pass

            def start(self):
                events.append("spout-start")
                raise RuntimeError("spout start failed")

            def stop(self):
                events.append("spout-stop")
                return True

        cfg = types.SimpleNamespace(
            flag_stitching=False,
            flag_lip_zero=False,
            lip_zero_threshold=0.02,
            flag_eye_retargeting=True,
            eyes_retargeting_multiplier=2.0,
            flag_lip_retargeting=True,
            lip_retargeting_multiplier=2.0,
            flag_use_half_precision=False,
        )
        pipeline = types.SimpleNamespace(live_portrait_wrapper=types.SimpleNamespace(cfg=cfg))
        crop_info = {"crop_info_list": [{"M_c2o": np.eye(3, dtype=np.float32)}]}
        fake_kj = types.SimpleNamespace(
            script_directory=".",
            _transform_img_kornia=lambda image, matrix, size, device: image.permute(0, 3, 1, 2),
        )
        fake_cv2 = types.SimpleNamespace(
            IMREAD_COLOR=1,
            imread=lambda path, mode: np.ones((2, 2, 3), dtype=np.uint8) * 255,
        )
        fake_mm = types.ModuleType("comfy.model_management")
        fake_mm.get_torch_device = lambda: torch.device("cpu")
        fake_mm.throw_exception_if_processing_interrupted = lambda: None
        fake_comfy = types.ModuleType("comfy")
        fake_comfy.__path__ = []
        fake_comfy.model_management = fake_mm

        originals = {
            "capture": nodes.CaptureWorker,
            "spout": nodes.SpoutWorker,
            "loader": nodes._loaded_liveportrait_nodes,
            "platform": sys.platform,
            "cv2": sys.modules.get("cv2"),
            "comfy": sys.modules.get("comfy"),
            "mm": sys.modules.get("comfy.model_management"),
        }
        nodes.CaptureWorker = FakeCapture
        nodes.SpoutWorker = FakeSpout
        nodes._loaded_liveportrait_nodes = lambda: fake_kj
        sys.platform = "win32"
        sys.modules["cv2"] = fake_cv2
        sys.modules["comfy"] = fake_comfy
        sys.modules["comfy.model_management"] = fake_mm
        try:
            with self.assertRaisesRegex(RuntimeError, "spout start failed"):
                nodes.DaWastehContinuousLiveAvatar().run(
                    pipeline,
                    crop_info,
                    torch.zeros((1, 2, 2, 3)),
                    torch.zeros((1, 2, 2)),
                    "test",
                    30,
                    1,
                    960,
                    540,
                    True,
                    0,
                    0,
                    True,
                    0.75,
                    True,
                    False,
                    0.03,
                    1,
                )
            self.assertEqual(events, ["capture-start", "spout-start", "capture-stop", "spout-stop"])
            self.assertFalse(cfg.flag_stitching)
            self.assertTrue(cfg.flag_eye_retargeting)
            self.assertEqual(cfg.eyes_retargeting_multiplier, 2.0)
        finally:
            nodes.CaptureWorker = originals["capture"]
            nodes.SpoutWorker = originals["spout"]
            nodes._loaded_liveportrait_nodes = originals["loader"]
            sys.platform = originals["platform"]
            for key, value in (("cv2", originals["cv2"]), ("comfy", originals["comfy"]), ("comfy.model_management", originals["mm"])):
                if value is None:
                    sys.modules.pop(key, None)
                else:
                    sys.modules[key] = value

    def test_inference_loop_has_no_per_frame_cache_flush(self):
        source = MODULE_PATH.read_text(encoding="utf-8")
        loop = source[source.index("while max_frames") : source.index("finally:", source.index("while max_frames"))]
        self.assertNotIn("soft_empty_cache", loop)
        self.assertNotIn("gc.collect", loop)


if __name__ == "__main__":
    unittest.main()
