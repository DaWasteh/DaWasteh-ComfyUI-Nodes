"""Experimental continuous LivePortrait/Spout node for ComfyUI."""

from .nodes import DaWastehContinuousLiveAvatar

NODE_CLASS_MAPPINGS = {
    "DaWastehContinuousLiveAvatar": DaWastehContinuousLiveAvatar,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "DaWastehContinuousLiveAvatar": "LivePortrait Continuous Spout (DaWasteh, experimental)",
}

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS"]
