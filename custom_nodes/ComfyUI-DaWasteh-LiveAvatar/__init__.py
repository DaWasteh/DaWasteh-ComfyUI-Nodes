"""Experimental continuous LivePortrait and local VRM Live Avatar nodes for ComfyUI."""
from .nodes import DaWastehContinuousLiveAvatar, DaWastehPersistentSpout, DaWastehVRMLiveAvatarLauncher
from .vrm_tools import DaWastehRiggedGLBToVRM0, DaWastehVRMTextureSource, DaWastehVRMTextureVariant
from .vrm_server import register_routes

register_routes()
NODE_CLASS_MAPPINGS = {
    "DaWastehContinuousLiveAvatar": DaWastehContinuousLiveAvatar,
    "DaWastehPersistentSpout": DaWastehPersistentSpout,
    "DaWastehVRMLiveAvatarLauncher": DaWastehVRMLiveAvatarLauncher,
    "DaWastehVRMTextureSource": DaWastehVRMTextureSource,
    "DaWastehVRMTextureVariant": DaWastehVRMTextureVariant,
    "DaWastehRiggedGLBToVRM0": DaWastehRiggedGLBToVRM0,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "DaWastehContinuousLiveAvatar": "LivePortrait Continuous Spout (DaWasteh, experimental)",
    "DaWastehPersistentSpout": "Persistent Latest-Frame Spout (DaWasteh)",
    "DaWastehVRMLiveAvatarLauncher": "VRM Full-Body Live Avatar Launcher (DaWasteh)",
    "DaWastehVRMTextureSource": "VRM Texture Source (DaWasteh, local)",
    "DaWastehVRMTextureVariant": "Save VRM Texture Variant (DaWasteh, local)",
    "DaWastehRiggedGLBToVRM0": "Rigged GLB to VRM0 Candidate (DaWasteh, strict)",
}
WEB_DIRECTORY = "web"
__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
