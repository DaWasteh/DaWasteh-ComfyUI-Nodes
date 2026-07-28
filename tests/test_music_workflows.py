from __future__ import annotations

import json
import re
import unittest
from pathlib import Path


ROOT = Path("workflows") / "Music Generation"
COT_PATH = ROOT / "YuE_7B-FP16_R9700-Music-Generation.json"
ICL_PATH = ROOT / "YuE_7B-FP16_R9700-Reference-Voice-ICL-Music-Generation.json"
HEART_PATH = ROOT / "HeartMuLa_HappyNewYear_3B_R9700-Music-Generation.json"


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def nodes(workflow: dict) -> dict[int, dict]:
    return {node["id"]: node for node in workflow["nodes"]}


def lyric_sections(text: str) -> list[tuple[str, str]]:
    return re.findall(r"\[(\w+)\](.*?)(?=\[|\Z)", text, re.DOTALL)


class MusicWorkflowTests(unittest.TestCase):
    def test_yue_cot_has_exact_duration_capacity(self):
        workflow = load(COT_PATH)
        by_id = nodes(workflow)
        values = by_id[2]["widgets_values"]
        self.assertEqual(len(lyric_sections(values[1])), 20)
        self.assertEqual(values[4], 20)  # maximum lyric sections
        self.assertEqual(values[5], 540.0)  # target duration
        self.assertEqual(values[9], 3000)  # 30 seconds/section at 100 codec IDs/s
        self.assertFalse(values[10])  # dual-track prompt
        self.assertFalse(values[11])  # single-track audio prompt
        self.assertGreaterEqual(values[4] * values[9], 600 * 100)

    def test_yue_icl_uses_reference_audio_and_icl_checkpoint(self):
        workflow = load(ICL_PATH)
        by_id = nodes(workflow)
        self.assertTrue(by_id[1]["widgets_values"][0].endswith("YuE-s1-7B-anneal-en-icl"))
        self.assertEqual(by_id[13]["type"], "LoadAudio")
        self.assertEqual(by_id[13]["outputs"][0]["links"], [6])
        self.assertEqual(by_id[2]["inputs"][1], {"name": "reference_audio", "type": "AUDIO", "link": 6})
        self.assertFalse(by_id[2]["widgets_values"][10])
        self.assertTrue(by_id[2]["widgets_values"][11])
        self.assertIn("Ohne Input-Voice", by_id[8]["widgets_values"][0])
        self.assertEqual(sum(node["type"] == "PixaromaRunTimer" for node in workflow["nodes"]), 1)

    def test_heartmula_documents_context_limit_and_no_fake_reference(self):
        workflow = load(HEART_PATH)
        by_id = nodes(workflow)
        self.assertEqual(by_id[3]["widgets_values"][2], 300.0)
        self.assertNotIn("reference_audio", {item["name"] for item in by_id[3]["inputs"]})
        documentation = by_id[14]["widgets_values"][0]
        self.assertIn("keinen Audio-Encoder-Eingang", documentation)
        self.assertIn("bis 600 Sekunden", documentation)
        self.assertIn("`29.76` Sekunden", documentation)

    def test_distributable_custom_node_patches_include_required_guards(self):
        yue_patch = Path("tools/patches/ComfyUI_YuE-Windows-RDNA4-longform-ICL.patch").read_text(
            encoding="utf-8"
        )
        heart_patch = Path("tools/patches/ComfyUI-HeartMuLa-600s-context.patch").read_text(
            encoding="utf-8"
        )
        for token in (
            "target_duration_seconds",
            "min_new_tokens=segment_new_tokens",
            '"reference_audio": ("AUDIO",)',
            "YuE audio/reference prompting requires an ICL Stage-1 checkpoint",
        ):
            self.assertIn(token, yue_patch)
        self.assertIn('max=600.0', heart_patch)
        self.assertIn("validate_duration_context", heart_patch)
        self.assertNotIn("decode_duration", heart_patch)


if __name__ == "__main__":
    unittest.main()
