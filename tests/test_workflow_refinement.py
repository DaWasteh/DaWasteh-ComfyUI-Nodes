import json
import sys
import unittest
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from tools.refine_workflows import _effect, _fallback_purpose, build_note_text, map_widget_values

OBJECT_INFO_URL = "http://127.0.0.1:8188/object_info"


class WidgetMappingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with urllib.request.urlopen(OBJECT_INFO_URL, timeout=30) as response:
            cls.info = json.load(response)

    def names_values(self, node_type, values):
        mapped, ignored = map_widget_values({"widgets_values": values}, self.info[node_type])
        return [(x["name"], x["value"]) for x in mapped], ignored

    def test_ksampler_control_after_generate(self):
        mapped, ignored = self.names_values(
            "KSampler", [123, "randomize", 20, 7.0, "euler", "simple", 1.0]
        )
        self.assertEqual(
            [name for name, _ in mapped],
            ["seed", "seed_control_after_generate", "steps", "cfg", "sampler_name", "scheduler", "denoise"],
        )
        self.assertEqual(mapped[1][1], "randomize")
        self.assertEqual(ignored, [])

    def test_textgenerate_dynamic_combo(self):
        values = ["Prompt", 1024, "on", 0.45, 48, 0.9, 0.05, 1.05, 7, 0.1, False, True]
        mapped, ignored = self.names_values("TextGenerate", values)
        self.assertEqual(
            [name for name, _ in mapped],
            ["prompt", "max_length", "sampling_mode", "temperature", "top_k", "top_p", "min_p",
             "repetition_penalty", "seed", "presence_penalty", "thinking", "use_default_template"],
        )
        self.assertEqual(ignored, [])

    def test_loadaudio_ignores_trailing_ui_state(self):
        mapped, ignored = self.names_values("LoadAudio", ["sample.wav", None, None])
        self.assertEqual(mapped, [("audio", "sample.wav")])
        self.assertEqual(ignored, [None, None])

    def test_vhs_dict_style(self):
        values = {
            "video": "clip.mp4", "force_rate": 24, "custom_width": 0, "custom_height": 0,
            "frame_load_cap": 81, "skip_first_frames": 2, "select_every_nth": 1, "format": "None",
            "videopreview": {"paused": False},
        }
        mapped, ignored = self.names_values("VHS_LoadVideo", values)
        names = [name for name, _ in mapped]
        for expected in ("video", "force_rate", "custom_width", "custom_height", "frame_load_cap",
                         "skip_first_frames", "select_every_nth", "format"):
            self.assertIn(expected, names)
        self.assertEqual(ignored, [{"videopreview": {"paused": False}}])

        combine_values = {
            "frame_rate": 24, "loop_count": 0, "filename_prefix": "out", "format": "video/h264-mp4",
            "pix_fmt": "yuv420p", "crf": 19, "save_metadata": True, "trim_to_audio": False,
            "pingpong": False, "save_output": True, "videopreview": {},
        }
        combine, combine_ignored = self.names_values("VHS_VideoCombine", combine_values)
        combine_names = [name for name, _ in combine]
        self.assertIn("pix_fmt", combine_names)
        self.assertIn("crf", combine_names)
        self.assertIn("trim_to_audio", combine_names)
        self.assertEqual(combine_ignored, [{"videopreview": {}}])

    def test_visible_widget_subset_overrides_optional_schema(self):
        node = {
            "inputs": [
                {"name": "positive", "type": "CONDITIONING", "link": 1},
                {"name": "scale_by", "type": "FLOAT", "link": None, "widget": {"name": "scale_by"}},
                {"name": "upscale_method", "type": "COMBO", "link": None, "widget": {"name": "upscale_method"}},
            ],
            "widgets_values": [0.5, "bicubic"],
        }
        mapped, ignored = map_widget_values(node, self.info["LTXDirectorGuide"])
        self.assertEqual([(item["name"], item["value"]) for item in mapped], [("scale_by", 0.5), ("upscale_method", "bicubic")])
        self.assertEqual(ignored, [])

    def test_acestep_config_seed_control(self):
        values = [16, 32, 0.1, 0.0001, 100, 1, 4, 10, "./output", 42, "randomize", 100, 0.01, 1.0,
                  "q_proj,k_proj,v_proj,o_proj"]
        mapped, ignored = self.names_values("FL_AceStep_TrainingConfig", values)
        names = [name for name, _ in mapped]
        self.assertIn("lora_rank", names)
        self.assertIn("seed_control_after_generate", names)
        self.assertIn("target_modules", names)
        self.assertEqual(ignored, [])

    def test_unetloader_fallback_purpose(self):
        node = {"id": 7, "type": "UNETLoader", "widgets_values": []}
        text = build_note_text(node, {})
        self.assertIn("Lädt die angegebene Ressource", text)
        self.assertNotIn("Verarbeitet seine Eingaben als Node-Typ", text)

    def test_model_combo_has_specific_effect(self):
        schema = {
            "input": {"required": {"model_name": [["a.safetensors", "b.safetensors"], {}]}},
            "input_order": {"required": ["model_name"]},
        }
        node = {"id": 8, "type": "ModelLoader", "widgets_values": ["a.safetensors"]}
        text = build_note_text(node, schema)
        self.assertIn("wechselt die geladene Ressource", text)
        self.assertIn("VRAM-Bedarf, Qualität und Kompatibilität", text)

    def test_boolean_memory_effects_are_specific(self):
        self.assertIn("VRAM", _effect("offloading", "BOOLEAN", {}, True))
        self.assertIn("nächsten Lauf", _effect("unload_model_after_generate", "BOOLEAN", {}, True))
        self.assertIn("Trainings-VRAM", _effect("gradient_checkpointing", "BOOLEAN", {}, True))
        self.assertIn("Auflösungs-Buckets", _effect("bucket_mode", "BOOLEAN", {}, True))

    def test_common_numeric_effects_are_parameter_specific(self):
        cases = {
            "repetition_penalty": "Wiederholungen",
            "scale_by": "proportional",
            "bit_depth": "Farb-/Dynamikabstufungen",
            "tile_overlap": "Nähte",
            "opacity": "deckender",
            "insert_frame_1": "Frame-Timeline",
            "batch_index": "Batch",
            "max_new_tokens": "Text-/Sprachausgaben",
        }
        for name, expected in cases.items():
            self.assertIn(expected, _effect(name, "FLOAT", {}, 1.0), name)
        self.assertIn("Bild-, Farb- oder Detailkorrektur", _fallback_purpose("LayerFilter: FilmV2"))
        self.assertIn("Konditionierungen", _fallback_purpose("ConditioningZeroOut"))
        self.assertIn("Text bzw. die Anweisung", _effect("prefix_text", "STRING", {}, "transcript"))

    def test_generated_train_lora_widgets_follow_live_schema(self):
        expected_names = [
            "batch_size", "grad_accumulation_steps", "steps", "learning_rate", "rank",
            "optimizer", "loss_function", "seed", "training_dtype", "lora_dtype",
            "quantized_backward", "algorithm", "gradient_checkpointing", "checkpoint_depth",
            "offloading", "existing_lora", "bucket_mode", "bypass_mode",
        ]
        paths = sorted((Path("workflows") / "LoRA Generation").glob("*-LoRA-Training.json"))
        generated = [path for path in paths if path.name != "ACE-Step1_5_XL-Voice-LoRA-Training.json"]
        self.assertEqual(len(generated), 5)
        for path in generated:
            workflow = json.loads(path.read_text(encoding="utf-8"))
            train = next(node for node in workflow["nodes"] if node["type"] == "TrainLoraNode")
            mapped, ignored = map_widget_values(train, self.info["TrainLoraNode"])
            self.assertEqual([item["name"] for item in mapped], expected_names, path.name)
            self.assertEqual(ignored, [], path.name)
            values = {item["name"]: item["value"] for item in mapped}
            self.assertIn(values["training_dtype"], {"bf16", "fp32", "none"}, path.name)
            self.assertIn(values["lora_dtype"], {"bf16", "fp32"}, path.name)
            self.assertEqual(values["algorithm"], "LoRA", path.name)
            self.assertIs(values["bucket_mode"], True, path.name)

    def test_subgraph_instance_note(self):
        schema = {
            "display_name": "Test Subgraph",
            "description": "Führt einen Test-Subgraph aus.",
            "input": {"required": {"image": ["IMAGE", {"forceInput": True}]}},
            "input_order": {"required": ["image"]},
            "output_name": ["result"],
            "output_tooltips": ["Subgraph result"],
        }
        node = {
            "id": 99, "type": "uuid", "title": "Subgraph Instance", "widgets_values": [],
            "inputs": [{"name": "image", "type": "IMAGE", "link": 7}],
            "outputs": [{"name": "result", "type": "IMAGE", "links": [8]}],
        }
        text = build_note_text(node, schema, "Test Subgraph")
        self.assertIn("Node 99", text)
        self.assertIn("Führt einen Test-Subgraph", text)
        self.assertIn("`image`", text)
        self.assertIn("`result`", text)


if __name__ == "__main__":
    unittest.main()
