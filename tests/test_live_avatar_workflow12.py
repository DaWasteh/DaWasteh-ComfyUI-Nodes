import copy
import hashlib
import importlib.util
import json
import os
import sys
import tempfile
import time
import types
import unittest
from datetime import datetime, timezone
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


preflight = load("preflight12", ROOT / "custom_nodes/ComfyUI-DaWasteh-LiveAvatar/preflight.py")
nodes = load("nodes12", ROOT / "custom_nodes/ComfyUI-DaWasteh-LiveAvatar/nodes.py")
benchmark = load("benchmark12", ROOT / "tools/benchmark_workflow12_spout.py")
FIXED_NOW = datetime(2028, 1, 1, tzinfo=timezone.utc)


class ConfigFixture:
    def __init__(self, root: Path):
        self.root = root
        self.face = root / "face.png"
        self.face.write_bytes(b"authorized face")
        self.video = root / "video.exe"
        self.video.write_bytes(b"video executable")
        self.rvc_exe = root / "rvc.exe"
        self.rvc_exe.write_bytes(b"rvc executable")
        self.video_model = root / "face-swap.onnx"
        self.video_model.write_bytes(b"video model")
        video_model_hash = preflight.sha256(self.video_model)
        video_model_set_hash = hashlib.sha256(video_model_hash.encode("ascii")).hexdigest()
        face_asset_hash = preflight.sha256(self.face)
        face_asset_set_hash = hashlib.sha256(face_asset_hash.encode("ascii")).hexdigest()
        self.config = {
            "mode": "face_clone",
            "visible_disclosure": "AI AVATAR / SYNTHETIC VOICE",
            "allowed_roots": [str(root)],
            "consent": {
                "identity_id": "local-test-identity",
                "attestation_id": "operator-attestation-1",
                "subject": "authorized adult test identity",
                "status": "active",
                "expires_at": "2030-01-01T00:00:00Z",
                "allowed_destinations": ["local-test"],
                "adult": True,
                "fully_synthetic": False,
                "minor": False,
                "public_figure": False,
                "face_authorized": True,
                "voice_authorized": False,
                "revoked": False,
                "deleted": False,
                "assets": [
                    {"purpose": "face", "path": str(self.face), "sha256": face_asset_hash}
                ],
            },
            "candidate": {
                "name": "DeepFaceLive",
                "enabled": True,
                "executable": str(self.video),
                "executable_sha256": preflight.sha256(self.video),
                "working_directory": str(root),
                "arguments": ["--token-file", "{RUN_TOKEN_FILE}", "--identity", "{IDENTITY_ID}", "--face", "{FACE_ASSET}", "--sender", "{SPOUT_SENDER}"],
                "health_url": "http://127.0.0.1:18080/health",
                "warmup_url": "http://127.0.0.1:18080/warmup",
                "shutdown_url": "http://127.0.0.1:18080/shutdown",
                "expected_health": {
                    "candidate": "DeepFaceLive",
                    "provider": "DmlExecutionProvider",
                    "vendor_id": "0x1002",
                    "adapter_name": "AMD Radeon AI PRO R9700",
                    "adapter_luid": "0x00000001:0x00000002",
                    "model_set_sha256": video_model_set_hash,
                    "identity_id": "local-test-identity",
                    "asset_set_sha256": face_asset_set_hash,
                    "run_token_required": True,
                    "origin_validation": True,
                    "reports_process_id": True,
                    "spout_sender_name": "Workflow12Integration-{RUN_ID}",
                    "output_width": 1280,
                    "output_height": 720,
                    "spout_ready": True,
                    "ready": True,
                },
                "directml_attestation": {
                    "provider": "DmlExecutionProvider",
                    "vendor_id": "0x1002",
                    "adapter_name": "AMD Radeon AI PRO R9700",
                    "adapter_luid": "0x00000001:0x00000002",
                },
                "models": [{"path": str(self.video_model), "sha256": video_model_hash}],
            },
            "rvc": {"enabled": False},
            "obs": {"enabled": False},
        }

    def write(self, config=None) -> Path:
        path = self.root / "config.json"
        path.write_text(json.dumps(config or self.config), encoding="utf-8")
        return path

    def result(self, config=None):
        return preflight.workflow12_preflight(str(self.write(config)), now=FIXED_NOW)

    def enable_rvc(self, config):
        voice = self.root / "voice.onnx"
        voice.write_bytes(b"authorized voice")
        config["consent"]["voice_authorized"] = True
        config["consent"]["assets"].append(
            {"purpose": "voice", "path": str(voice), "sha256": preflight.sha256(voice)}
        )
        voice_hash = preflight.sha256(voice)
        voice_model_set_hash = hashlib.sha256(voice_hash.encode("ascii")).hexdigest()
        config["rvc"] = {
            "enabled": True,
            "executable": str(self.rvc_exe),
            "executable_sha256": preflight.sha256(self.rvc_exe),
            "working_directory": str(self.root),
            "arguments": ["--token-file", "{RUN_TOKEN_FILE}", "--voice-reference", "{VOICE_ASSET}", "--identity", "{IDENTITY_ID}"],
            "health_url": "http://127.0.0.1:18888/health",
            "warmup_url": "http://127.0.0.1:18888/warmup",
            "shutdown_url": "http://127.0.0.1:18888/shutdown",
            "expected_health": {
                "ready": True,
                "provider": "DmlExecutionProvider",
                "vendor_id": "0x1002",
                "adapter_name": "AMD Radeon RX 9070 XT",
                "adapter_luid": "0x00000003:0x00000004",
                "model_set_sha256": voice_model_set_hash,
                "identity_id": "local-test-identity",
                "asset_set_sha256": voice_model_set_hash,
                "run_token_required": True,
                "origin_validation": True,
                "reports_process_id": True,
            },
            "directml_attestation": {
                "provider": "DmlExecutionProvider",
                "vendor_id": "0x1002",
                "adapter_name": "AMD Radeon RX 9070 XT",
                "adapter_luid": "0x00000003:0x00000004",
            },
            "models": [{"path": str(voice), "sha256": preflight.sha256(voice)}],
        }


class PreflightTests(unittest.TestCase):
    def test_shipped_example_is_fail_closed(self):
        result = preflight.workflow12_preflight(
            str(ROOT / "assets/live-avatar-v080/workflow12-candidates.example.json"), now=FIXED_NOW
        )
        self.assertFalse(result["ready"])
        self.assertEqual(result["launch_command"], "NOT LAUNCHED")

    def test_face_mode_does_not_require_voice_when_rvc_is_disabled(self):
        with tempfile.TemporaryDirectory() as temporary:
            fixture = ConfigFixture(Path(temporary))
            result = fixture.result()
            self.assertTrue(result["ready"], result["status"])
            self.assertIn("services", result["verified"])

    def test_rvc_requires_separate_voice_authorization_and_hash_bound_asset(self):
        with tempfile.TemporaryDirectory() as temporary:
            fixture = ConfigFixture(Path(temporary))
            config = copy.deepcopy(fixture.config)
            config["rvc"] = {"enabled": True}
            rejected = fixture.result(config)
            self.assertFalse(rejected["ready"])
            self.assertIn("voice authorization", rejected["status"])
            fixture.enable_rvc(config)
            accepted = fixture.result(config)
            self.assertTrue(accepted["ready"], accepted["status"])
            config["rvc"]["health_url"] = "http://127.0.0.1:18080/rvc-health"
            config["rvc"]["warmup_url"] = "http://127.0.0.1:18080/rvc-warmup"
            collision = fixture.result(config)
            self.assertFalse(collision["ready"])
            self.assertIn("configured for both video and rvc", collision["status"])

    def test_consent_and_hash_substitution_fail_closed(self):
        mutations = [
            ("revoked", True),
            ("deleted", True),
            ("status", "inactive"),
            ("public_figure", True),
            ("minor", True),
            ("adult", False),
            ("face_authorized", False),
            ("expires_at", "2020-01-01T00:00:00Z"),
        ]
        with tempfile.TemporaryDirectory() as temporary:
            fixture = ConfigFixture(Path(temporary))
            for field, value in mutations:
                with self.subTest(field=field):
                    config = copy.deepcopy(fixture.config)
                    config["consent"][field] = value
                    self.assertFalse(fixture.result(config)["ready"])
            fixture.face.write_bytes(b"substituted after consent")
            self.assertFalse(fixture.result()["ready"])

    def test_security_booleans_are_type_strict(self):
        with tempfile.TemporaryDirectory() as temporary:
            fixture = ConfigFixture(Path(temporary))
            config = copy.deepcopy(fixture.config)
            config["candidate"]["enabled"] = "false"
            self.assertFalse(fixture.result(config)["ready"])
            config = copy.deepcopy(fixture.config)
            config["candidate"]["expected_health"]["ready"] = "true"
            self.assertFalse(fixture.result(config)["ready"])
            config = copy.deepcopy(fixture.config)
            config["consent"]["revoked"] = "false"
            self.assertFalse(fixture.result(config)["ready"])
            config = copy.deepcopy(fixture.config)
            config["candidate"]["expected_health"]["spout_ready"] = False
            self.assertFalse(fixture.result(config)["ready"])

    def test_wrong_provider_vendor_adapter_luid_path_and_url_are_rejected(self):
        with tempfile.TemporaryDirectory() as temporary:
            fixture = ConfigFixture(Path(temporary))
            cases = []
            for key, value in (
                ("provider", "CUDAExecutionProvider"),
                ("vendor_id", "0x10de"),
                ("adapter_name", "AMD Radeon RX 9070 XT"),
                ("adapter_luid", ""),
            ):
                config = copy.deepcopy(fixture.config)
                config["candidate"]["directml_attestation"][key] = value
                cases.append(config)
            config = copy.deepcopy(fixture.config)
            config["candidate"]["health_url"] = "http://0.0.0.0:18080/health"
            cases.append(config)
            outside = Path(temporary).parent / "outside-video.exe"
            outside.write_bytes(b"outside")
            self.addCleanup(outside.unlink, missing_ok=True)
            config = copy.deepcopy(fixture.config)
            config["candidate"]["executable"] = str(outside)
            config["candidate"]["executable_sha256"] = preflight.sha256(outside)
            cases.append(config)
            for index, case in enumerate(cases):
                with self.subTest(case=index):
                    self.assertFalse(fixture.result(case)["ready"])

    def test_loopback_url_rejects_credentials_fragments_and_missing_ports(self):
        self.assertTrue(preflight.loopback_url("http://127.0.0.1:18080/health"))
        for value in (
            "https://127.0.0.1:18080/health",
            "http://127.0.0.1/health",
            "http://user:pass@127.0.0.1:18080/health",
            "http://localhost:18080/health#fragment",
            "http://0.0.0.0:18080/health",
        ):
            with self.subTest(value=value):
                self.assertFalse(preflight.loopback_url(value))


class MetricsTests(unittest.TestCase):
    def test_transport_metrics_keep_duplicates_separate(self):
        metrics = nodes.LiveAvatarMetrics()
        frame = nodes.TimedFrame(np.zeros((1, 1, 4), dtype=np.uint8), capture_time=1.0)
        metrics.produced(now=1.01)
        metrics.presented(True, frame, 1.02)
        metrics.presented(False, frame, 1.03)
        snapshot = metrics.snapshot()
        self.assertEqual(
            (
                snapshot["ai_frames"],
                snapshot["presented_frames"],
                snapshot["unique_presentations"],
                snapshot["duplicate_presentations"],
            ),
            (1, 2, 1, 1),
        )
        self.assertAlmostEqual(snapshot["capture_to_spout_ms"]["p50"], 20.0)

    def test_rates_use_explicit_run_start_not_first_frame_timestamp(self):
        metrics = nodes.LiveAvatarMetrics()
        metrics.start(0.0)
        metrics.produced(now=0.5)
        metrics.produced(now=1.0)
        snapshot = metrics.snapshot(now=1.0)
        self.assertEqual(snapshot["ai_frames"], 2)
        self.assertAlmostEqual(snapshot["elapsed_seconds"], 1.0)
        self.assertAlmostEqual(snapshot["ai_fps"], 2.0)

    def test_latest_multiview_loader_selects_newest_semantic_output(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary) / "LiveAvatar"
            directory.mkdir()
            first = directory / "13_front_full_body_00001_.png"
            second = directory / "13_front_full_body_00002_.png"
            first.write_bytes(b"first")
            second.write_bytes(b"second")
            os.utime(first, ns=(1_000_000_000, 1_000_000_000))
            os.utime(second, ns=(2_000_000_000, 2_000_000_000))
            self.assertEqual(nodes.latest_live_avatar_output("13_front_full_body", temporary), second.resolve())
            with self.assertRaises(ValueError):
                nodes.latest_live_avatar_output("../unauthorized", temporary)

    def test_smoothed_face_roi_increases_driving_face_resolution(self):
        worker = nodes.CaptureWorker(nodes.LatestFrameSlot(), 2, 400, 400, True, 0, 0, False, "DirectShow", True, 2.0, 0.72)
        frame = np.zeros((400, 400, 3), dtype=np.uint8)
        fake_cv2 = types.SimpleNamespace(
            COLOR_BGR2GRAY=1,
            INTER_AREA=2,
            cvtColor=lambda image, code: image[..., 0],
            resize=lambda image, *args, **kwargs: image,
        )
        detector = types.SimpleNamespace(detectMultiScale=lambda *args, **kwargs: [(100, 80, 100, 100)])
        roi = worker._tracked_face_roi(frame, fake_cv2, detector)
        self.assertEqual(roi.shape, (200, 200, 3))
        self.assertIsNotNone(worker._face_crop_state)

    def test_capture_worker_honors_explicit_directshow_and_resolution(self):
        calls = []
        released = []

        class FakeCap:
            def isOpened(self): return True
            def set(self, prop, value): return True
            def get(self, prop): return 1280 if prop == 1 else 720
            def read(self): return False, None
            def release(self): released.append(True)

        fake_cv2 = types.SimpleNamespace(
            VideoCapture=lambda *args: calls.append(args) or FakeCap(),
            CAP_DSHOW=700,
            CAP_PROP_FRAME_WIDTH=1,
            CAP_PROP_FRAME_HEIGHT=2,
            CAP_PROP_BUFFERSIZE=3,
            CAP_PROP_READ_TIMEOUT_MSEC=4,
        )
        old_cv2 = sys.modules.get("cv2")
        sys.modules["cv2"] = fake_cv2
        try:
            slot = nodes.LatestFrameSlot()
            worker = nodes.CaptureWorker(slot, 2, 1280, 720, False, 0, 0, False, "DirectShow")
            worker.start()
            worker.thread.join(1)
            self.assertEqual(calls, [(2, 700)])
            self.assertTrue(released)
            with self.assertRaises(RuntimeError):
                slot.raise_if_error()
        finally:
            if old_cv2 is None: sys.modules.pop("cv2", None)
            else: sys.modules["cv2"] = old_cv2

    def test_spout_worker_records_real_unique_and_duplicate_sends(self):
        released = []

        class FakeSender:
            def setSenderName(self, name):
                self.name = name

            def sendImage(self, *args):
                pass

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
            metrics = nodes.LiveAvatarMetrics()
            slot.publish(nodes.TimedFrame(np.zeros((2, 2, 4), dtype=np.uint8), time.monotonic()))
            worker = nodes.SpoutWorker(slot, "metrics-test", 30, metrics)
            worker.start()
            time.sleep(0.09)
            self.assertTrue(worker.stop())
            snapshot = metrics.snapshot()
            self.assertGreaterEqual(snapshot["presented_frames"], 2)
            self.assertEqual(snapshot["unique_presentations"], 1)
            self.assertGreaterEqual(snapshot["duplicate_presentations"], 1)
            self.assertTrue(released)
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

    def test_benchmark_gate_never_promotes_repeated_transport(self):
        slow = benchmark.Aggregator()
        for index in range(18_000):
            slow.add(bytes([index // 30 % 256]), index / 30.0)
        slow_result = slow.result(600.0)
        self.assertGreaterEqual(slow_result["presentation_fps"], 29.9)
        self.assertLess(slow_result["unique_ai_fps_proxy"], 1.1)
        self.assertFalse(slow_result["pass_24_unique_fps"])

        good = benchmark.Aggregator()
        for index in range(14_400):
            good.add(index.to_bytes(4, "little"), index / 24.0)
        self.assertTrue(good.result(600.0)["pass_24_unique_fps"])
        self.assertFalse(good.result(599.9)["pass_24_unique_fps"])

    def test_pdh_contract_uses_english_wildcards_not_wmi(self):
        source = (ROOT / "tools/benchmark_workflow12_spout.py").read_text(encoding="utf-8")
        self.assertIn(r"\GPU Engine(*)\Utilization Percentage", source)
        self.assertIn(r"\GPU Process Memory(*)\Dedicated Usage", source)
        self.assertNotIn("Win32_PerfFormattedData", source)
        self.assertIn("pid_", source)
        receive_source = source[source.index("def receive_spout") : source.index("def main")]
        self.assertIn("if not receiver.waitFrameSync", receive_source)
        self.assertNotIn("receiver.setFrameSync", receive_source)
        with tempfile.TemporaryDirectory() as temporary:
            pdh = Path(temporary) / "pdh.csv"
            pdh.write_bytes(('"time","\\\\HOST\\GPU Engine(pid_123_luid_0x0_eng_0)\\Utilization Percentage","\\\\HOST\\GPU Process Memory(pid_123_luid_0x0_phys_0)\\Dedicated Usage"\n"t","12,5","1048576"\n').encode("cp1252"))
            summary = benchmark.summarize_pdh(pdh, 123)
            self.assertTrue(summary["collected"])
            self.assertEqual(summary["matching_engine_columns"], 1)
            self.assertEqual(summary["peak_dedicated_bytes"], 1048576)
        labeled = benchmark.Aggregator()
        labeled.add(b"frame", 0.0)
        self.assertEqual(
            labeled.result(600.0, capture_to_spout_ms=25.0)["capture_to_spout"]["source"],
            "manual_synchronized_measurement",
        )


class WorkflowTests(unittest.TestCase):
    def test_release_templates_are_identical_timer_free_and_link_valid(self):
        workflow_dir = ROOT / "workflows/Live Avatar"
        for graph in workflow_dir.glob("LiveAvatar-1[234]-*.json"):
            template = ROOT / "assets/live-avatar-v080" / graph.name.replace(".json", ".template.json")
            self.assertEqual(graph.read_bytes(), template.read_bytes())
            data = json.loads(graph.read_text(encoding="utf-8"))
            self.assertFalse(any(node["type"] == "PixaromaRunTimer" for node in data["nodes"]))
            node_ids = {node["id"] for node in data["nodes"]}
            for link in data.get("links", []):
                self.assertIn(link[1], node_ids)
                self.assertIn(link[3], node_ids)

    def test_preflight_graph_is_queueable_output_node(self):
        data = json.loads(
            (ROOT / "workflows/Live Avatar/LiveAvatar-12-I-DirectML-Face-Clone-Bakeoff.json").read_text(encoding="utf-8")
        )
        self.assertTrue(nodes.DaWastehWorkflow12Preflight.OUTPUT_NODE)
        self.assertTrue(any(node["type"] == "DaWastehWorkflow12Preflight" for node in data["nodes"]))
        fixture = json.loads((ROOT / "assets/live-avatar-v072/object-info.json").read_text(encoding="utf-8"))
        self.assertTrue(fixture["DaWastehWorkflow12Preflight"]["output_node"])

    def test_quality_graph_selects_brio_directshow_and_metrics(self):
        data = json.loads(
            (ROOT / "workflows/Live Avatar/LiveAvatar-12-II-LivePortrait-Quality-Mode.json").read_text(
                encoding="utf-8"
            )
        )
        node = next(item for item in data["nodes"] if item["type"] == "DaWastehContinuousLiveAvatar")
        names = [item["name"] for item in node["inputs"]]
        values = dict(zip([name for name in names if name not in {"pipeline", "crop_info", "source_image", "source_mask"}], node["widgets_values"]))
        self.assertEqual(values["sender_name"], "ComfyLiveAvatarQuality")
        self.assertEqual(values["cam_index"], 2)
        self.assertEqual(values["capture_width"], 1280)
        self.assertEqual(values["capture_height"], 720)
        self.assertEqual(values["capture_backend"], "DirectShow")
        self.assertTrue(values["auto_face_crop"])
        self.assertEqual(values["face_crop_scale"], 2.0)
        self.assertEqual(values["face_crop_smoothing"], 0.72)
        self.assertIn("quality-metrics.json", values["metrics_json_path"])
        source = next(item for item in data["nodes"] if item["id"] == 1)
        self.assertEqual(source["widgets_values"], ["example.png", "image"])

    def test_character_sheet_has_required_prompts_outputs_and_installed_models(self):
        data = json.loads(
            (ROOT / "workflows/Live Avatar/LiveAvatar-13-Synthetic-Character-Sheet.json").read_text(
                encoding="utf-8"
            )
        )
        prefixes = {
            node["widgets_values"][0]
            for node in data["nodes"]
            if node["type"] == "SaveImage"
        }
        expected_prefixes = {
            "LiveAvatar/13_front_full_body",
            "LiveAvatar/13_three_quarter_left_full_body",
            "LiveAvatar/13_three_quarter_right_full_body",
            "LiveAvatar/13_left_profile_full_body",
            "LiveAvatar/13_right_profile_full_body",
            "LiveAvatar/13_rear_full_body",
            "LiveAvatar/13_smile_closeup",
            "LiveAvatar/13_mouth_open_gaze_closeup",
        }
        self.assertEqual(prefixes, expected_prefixes)
        batch = next(subgraph for subgraph in data["definitions"]["subgraphs"] if subgraph["id"] == "6b6e4ec3-3bd2-476c-8132-55d562d3b89d")
        exposed_prompt_nodes = [node for node in batch["nodes"] if node.get("id") in {598, 599, 600, 601, 602, 603, 604, 605}]
        self.assertEqual(len(exposed_prompt_nodes), 8)
        prompts = " ".join(str(node["widgets_values"][0]).lower() for node in exposed_prompt_nodes)
        self.assertNotIn("aerial view", prompts)
        self.assertNotIn("low-angle", prompts)
        self.assertNotIn("wide-angle lens", prompts)
        for token in ("full-body frontal", "45 degrees to the character’s left", "45 degrees to the character’s right", "90 degrees to the character’s left", "90 degrees to the character’s right", "180 degrees", "smile", "mouth naturally open"):
            self.assertIn(token, prompts)
        fixture = json.loads((ROOT / "assets/live-avatar-v072/object-info.json").read_text(encoding="utf-8"))
        for subgraph in data["definitions"]["subgraphs"]:
            for node in subgraph.get("nodes", []):
                if node.get("type") == "UNETLoader":
                    self.assertIn(node["widgets_values"][0], fixture["UNETLoader"]["input"]["required"]["unet_name"][0])
                elif node.get("type") == "CLIPLoader":
                    self.assertIn(node["widgets_values"][0], fixture["CLIPLoader"]["input"]["required"]["clip_name"][0])
                elif node.get("type") == "VAELoader":
                    self.assertIn(node["widgets_values"][0], fixture["VAELoader"]["input"]["required"]["vae_name"][0])

    def test_workflow14_is_real_local_multiview_mesh_not_fake_vrm(self):
        data = json.loads(
            (ROOT / "workflows/Live Avatar/LiveAvatar-14-Local-Hunyuan3D-Multiview-Mesh-Unrigged.json").read_text(encoding="utf-8")
        )
        types = {node["type"] for node in data["nodes"]}
        self.assertIn("Hunyuan3Dv2ConditioningMultiView", types)
        self.assertIn("VoxelToMesh", types)
        self.assertIn("SaveGLB", types)
        self.assertNotIn("Hy3DRenderMultiView", types)
        self.assertNotIn("Hy3DNvdiffrastRenderer", types)
        loaders = [node for node in data["nodes"] if node["type"] == "DaWastehLatestLiveAvatarOutput"]
        self.assertEqual(len(loaders), 4)
        self.assertEqual(
            {node["widgets_values"][0] for node in loaders},
            {
                "13_front_full_body",
                "13_left_profile_full_body",
                "13_rear_full_body",
                "13_right_profile_full_body",
            },
        )
        sampler = next(node for node in data["nodes"] if node["type"] == "KSampler")
        self.assertEqual(sampler["widgets_values"][1], "randomize")
        checkpoint = next(node for node in data["nodes"] if node["type"] == "ImageOnlyCheckpointLoader")
        self.assertEqual(checkpoint["widgets_values"][0], "Hunyuan3D\\hunyuan_3d_v2.1.safetensors")
        save = next(node for node in data["nodes"] if node["type"] == "SaveGLB")
        self.assertIn("multiview_unrigged", save["widgets_values"][0])

    def test_supervisor_contract_is_static_safe(self):
        start = (ROOT / "tools/start_live_avatar_workflow12.ps1").read_text(encoding="utf-8")
        stop = (ROOT / "tools/stop_live_avatar_workflow12.ps1").read_text(encoding="utf-8")
        combined = (start + stop).lower()
        self.assertNotIn("invoke-expression", combined)
        self.assertIn("$erroractionpreference = 'stop'", combined)
        self.assertIn("start-verifiedservice 'rvc'", combined)
        self.assertIn("start-verifiedservice 'video'", combined)
        self.assertIn("start-verifiedservice 'obs'", combined)
        self.assertIn("invoke-warmup", start.lower())
        self.assertIn("expectedhealth", start.lower())
        self.assertIn("configsha256", start.lower())
        self.assertIn("models", start.lower())
        self.assertIn("[array]::reverse", stop.lower())
        self.assertIn("starttimefileutc", stop.lower())
        self.assertIn("refusing pid reuse", stop.lower())
        self.assertIn("--startstreaming", start.lower())
        self.assertIn("publicstreamlaunchrequested = $false", start.lower())
        self.assertIn("assert-controlboundary", start.lower())
        self.assertIn("assert-spoutsender", start.lower())
        probe = (ROOT / "tools/check_workflow12_spout_sender.py").read_text(encoding="utf-8")
        self.assertIn("waitFrameSync", probe)
        self.assertIn("receiveImage", probe)
        self.assertIn("minimum_unique", probe)
        self.assertNotIn("setFrameSync", probe)
        self.assertIn("config.snapshot.json", start.lower())
        self.assertNotIn("runtoken = $token", start.lower())


if __name__ == "__main__":
    unittest.main()
