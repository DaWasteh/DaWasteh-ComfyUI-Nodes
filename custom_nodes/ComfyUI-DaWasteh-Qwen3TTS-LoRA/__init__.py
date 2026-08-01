"""ComfyUI nodes for Qwen3-TTS LoRA training and inference."""

from .nodes import Qwen3TTSLoRAInference, Qwen3TTSLoRATrain

NODE_CLASS_MAPPINGS = {
    "DaWastehQwen3TTSLoRATrain": Qwen3TTSLoRATrain,
    "DaWastehQwen3TTSLoRAInference": Qwen3TTSLoRAInference,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "DaWastehQwen3TTSLoRATrain": "Qwen3-TTS LoRA Train (DaWasteh)",
    "DaWastehQwen3TTSLoRAInference": "Qwen3-TTS LoRA Voice (DaWasteh)",
}

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS"]
