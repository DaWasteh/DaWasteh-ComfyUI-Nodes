"""Fail-closed Workflow 12 authorization/configuration validation.

This module validates a local configuration and returns a launch description. It
never starts a process and never treats a successful preflight as service health.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

ALLOWED_CANDIDATES = {"DeepFaceLive", "Deep-Live-Cam", "FaceFusion"}
ALLOWED_MODES = {"face_clone", "quality", "vrm"}
VIDEO_ADAPTER_TOKEN = "R9700"
VOICE_ADAPTER_TOKEN = "9070 XT"


def sha256(path: str | Path) -> str:
    digest = hashlib.sha256()
    with Path(path).open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def hash_set(values: list[str]) -> str:
    return hashlib.sha256("\n".join(sorted(value.lower() for value in values)).encode("ascii")).hexdigest()


def loopback_url(value: object) -> bool:
    if not isinstance(value, str):
        return False
    try:
        parsed = urlparse(value)
        return (
            parsed.scheme == "http"
            and parsed.hostname in {"127.0.0.1", "::1", "localhost"}
            and parsed.port is not None
            and parsed.username is None
            and parsed.password is None
            and not parsed.fragment
        )
    except ValueError:
        return False


def contained(path: str | Path, roots: list[str]) -> bool:
    try:
        resolved = Path(path).resolve(strict=False)
    except (OSError, RuntimeError):
        return False
    for root in roots:
        try:
            resolved.relative_to(Path(root).resolve(strict=False))
            return True
        except (OSError, RuntimeError, ValueError):
            continue
    return False


def _parse_expiry(value: object, now: datetime, errors: list[str]) -> None:
    if not isinstance(value, str):
        errors.append("consent expires_at is missing")
        return
    try:
        expiry = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        errors.append("consent expires_at is invalid")
        return
    if expiry.tzinfo is None:
        errors.append("consent expires_at needs a timezone")
    elif expiry <= now:
        errors.append("consent expired")


def _validate_hashed_file(
    record: dict[str, Any],
    path_key: str,
    hash_key: str,
    roots: list[str],
    label: str,
    errors: list[str],
) -> dict[str, str] | None:
    path_value = record.get(path_key)
    expected = record.get(hash_key)
    if not isinstance(path_value, str) or not isinstance(expected, str):
        errors.append(f"{label} path/SHA-256 is incomplete")
        return None
    path = Path(path_value)
    if not contained(path, roots):
        errors.append(f"{label} escapes allowed roots")
        return None
    if not path.is_file():
        errors.append(f"{label} is missing")
        return None
    actual = sha256(path)
    if actual.lower() != expected.lower():
        errors.append(f"{label} SHA-256 mismatch")
        return None
    return {"path": str(path.resolve()), "sha256": actual}


def _validate_attestation(
    attestation: object,
    adapter_token: str,
    label: str,
    errors: list[str],
) -> None:
    if not isinstance(attestation, dict):
        errors.append(f"{label} DirectML attestation is missing")
        return
    provider = attestation.get("provider")
    vendor = str(attestation.get("vendor_id", "")).lower()
    adapter_name = str(attestation.get("adapter_name", ""))
    luid = str(attestation.get("adapter_luid", ""))
    if provider != "DmlExecutionProvider":
        errors.append(f"{label} must attest DmlExecutionProvider")
    if vendor != "0x1002":
        errors.append(f"{label} must attest AMD vendor 0x1002")
    if adapter_token.casefold() not in adapter_name.casefold():
        errors.append(f"{label} must attest adapter {adapter_token}")
    if not re.fullmatch(r"0x[0-9a-fA-F]{8}:0x[0-9a-fA-F]{8}", luid):
        errors.append(f"{label} must attest a DXGI LUID as 0xHHHHHHHH:0xLLLLLLLL")


def _validate_service(
    service: object,
    name: str,
    roots: list[str],
    adapter_token: str | None,
    errors: list[str],
    require_models: bool = True,
) -> dict[str, Any] | None:
    if not isinstance(service, dict):
        errors.append(f"{name} service configuration is missing")
        return None
    if not isinstance(service.get("enabled"), bool):
        errors.append(f"{name} enabled must be an explicit boolean")
        return None
    if service.get("enabled") is not True:
        errors.append(f"{name} service is disabled")
        return None
    executable = _validate_hashed_file(
        service, "executable", "executable_sha256", roots, f"{name} executable", errors
    )
    models: list[dict[str, str]] = []
    configured_models = service.get("models", [])
    if not isinstance(configured_models, list):
        errors.append(f"{name} models must be an array")
        configured_models = []
    if require_models and not configured_models:
        errors.append(f"{name} must pin at least one model")
    for index, model in enumerate(configured_models):
        if not isinstance(model, dict):
            errors.append(f"{name} model {index} is invalid")
            continue
        verified = _validate_hashed_file(
            model, "path", "sha256", roots, f"{name} model {index}", errors
        )
        if verified:
            models.append(verified)
    for key in ("health_url", "warmup_url"):
        if not loopback_url(service.get(key)):
            errors.append(f"{name} {key} must be an explicit HTTP loopback URL")
    shutdown_url = service.get("shutdown_url")
    if not loopback_url(shutdown_url):
        errors.append(f"{name} shutdown_url must be an explicit HTTP loopback URL")
    arguments = service.get("arguments", [])
    if not isinstance(arguments, list) or not all(isinstance(item, str) for item in arguments):
        errors.append(f"{name} arguments must be a string array")
        arguments = []
    elif any(item != item.strip() or "\x00" in item for item in arguments):
        errors.append(f"{name} arguments may not contain leading/trailing whitespace or NUL")
    if "{RUN_TOKEN_FILE}" not in arguments:
        errors.append(f"{name} arguments must contain {{RUN_TOKEN_FILE}}")
    if "{RUN_TOKEN}" in arguments:
        errors.append(f"{name} may not expose the bearer token on the process command line")
    working_directory = service.get("working_directory")
    if not isinstance(working_directory, str) or not contained(working_directory, roots) or not Path(working_directory).is_dir():
        errors.append(f"{name} working_directory is missing or outside allowed roots")
    elif Path(working_directory).is_symlink():
        errors.append(f"{name} working_directory may not be a symlink")
    expected_health = service.get("expected_health")
    if not isinstance(expected_health, dict) or not expected_health:
        errors.append(f"{name} expected_health identity is required")
        expected_health = {}
    if expected_health.get("run_token_required") is not True:
        errors.append(f"{name} health must attest per-run token enforcement")
    if expected_health.get("origin_validation") is not True:
        errors.append(f"{name} health must attest Origin validation")
    if expected_health.get("reports_process_id") is not True:
        errors.append(f"{name} health must attest process_id reporting")
    if expected_health.get("ready") is not True:
        errors.append(f"{name} expected_health.ready must be boolean true")
    model_set_sha256 = hashlib.sha256(
        "\n".join(sorted(model["sha256"] for model in models)).encode("ascii")
    ).hexdigest()
    if require_models and expected_health.get("model_set_sha256") != model_set_sha256:
        errors.append(f"{name} expected_health model_set_sha256 does not match pinned models")
    if adapter_token:
        attestation = service.get("directml_attestation")
        _validate_attestation(attestation, adapter_token, name, errors)
        if isinstance(attestation, dict):
            for field in ("provider", "vendor_id", "adapter_name", "adapter_luid"):
                if str(expected_health.get(field, "")).casefold() != str(attestation.get(field, "")).casefold():
                    errors.append(f"{name} runtime health must attest DirectML field {field}")
    if not executable:
        return None
    return {"executable": executable, "models": models, "model_set_sha256": model_set_sha256}


def workflow12_preflight(config_path: str, now: datetime | None = None) -> dict[str, Any]:
    """Validate config and return an honest not-yet-active launch description."""
    errors: list[str] = []
    try:
        config_file = Path(config_path).resolve(strict=True)
        config = json.loads(config_file.read_text(encoding="utf-8"))
    except (OSError, RuntimeError, json.JSONDecodeError) as error:
        return {
            "ready": False,
            "status": f"NOT READY: invalid config ({error})",
            "launch_command": "NOT LAUNCHED",
            "verified": {},
        }
    if not isinstance(config, dict):
        return {
            "ready": False,
            "status": "NOT READY: config root must be an object",
            "launch_command": "NOT LAUNCHED",
            "verified": {},
        }

    current_time = now or datetime.now(timezone.utc)
    for service_key in ("candidate", "quality", "vrm", "rvc", "obs"):
        service_value = config.get(service_key, {})
        if service_value and (not isinstance(service_value, dict) or not isinstance(service_value.get("enabled"), bool)):
            errors.append(f"{service_key} enabled must be an explicit boolean")
    mode = config.get("mode")
    if mode not in ALLOWED_MODES:
        errors.append("mode must be face_clone, quality, or vrm")

    disclosure = config.get("visible_disclosure")
    if not isinstance(disclosure, str) or len(disclosure.strip()) < 8:
        errors.append("visible disclosure text is mandatory")

    roots = config.get("allowed_roots", [])
    if not isinstance(roots, list) or not roots or not all(isinstance(root, str) for root in roots):
        errors.append("allowed_roots must be a non-empty string array")
        roots = []

    consent = config.get("consent")
    verified_assets: list[dict[str, str]] = []
    if not isinstance(consent, dict):
        errors.append("consent record is missing")
        consent = {}
    for key in ("identity_id", "attestation_id", "subject", "status", "allowed_destinations"):
        value = consent.get(key)
        if not value:
            errors.append(f"consent {key} is missing")
        elif isinstance(value, str) and value.upper().startswith("REPLACE_"):
            errors.append(f"consent {key} is still a placeholder")
    for key in ("adult", "fully_synthetic", "minor", "public_figure", "face_authorized", "voice_authorized", "revoked", "deleted"):
        if not isinstance(consent.get(key), bool):
            errors.append(f"consent {key} must be an explicit boolean")
    destinations = consent.get("allowed_destinations")
    if not isinstance(destinations, list) or not destinations or not all(
        isinstance(item, str) and item.strip() for item in destinations
    ):
        errors.append("consent allowed_destinations must be a non-empty string array")
    if consent.get("revoked") or consent.get("deleted") or consent.get("status") != "active":
        errors.append("identity is revoked, deleted, or not active")
    if consent.get("public_figure"):
        errors.append("public-figure identities are not accepted by this local allowlist")
    if consent.get("minor"):
        errors.append("minor identities are not accepted")
    if not consent.get("fully_synthetic") and not consent.get("adult"):
        errors.append("identity must be explicitly adult or fully synthetic")
    if mode in {"face_clone", "quality"} and not consent.get("face_authorized"):
        errors.append("face authorization is required for this mode")
    rvc = config.get("rvc", {})
    rvc_enabled = isinstance(rvc, dict) and rvc.get("enabled") is True
    if rvc_enabled and not consent.get("voice_authorized"):
        errors.append("voice authorization is required when RVC is enabled")
    _parse_expiry(consent.get("expires_at"), current_time, errors)
    assets = consent.get("assets", [])
    if not isinstance(assets, list) or not assets:
        errors.append("consent assets must contain at least one hash-bound file")
    else:
        for index, asset in enumerate(assets):
            if not isinstance(asset, dict) or asset.get("purpose") not in {"face", "voice", "vrm"}:
                errors.append(f"consent asset {index} purpose is invalid")
                continue
            verified = _validate_hashed_file(
                asset, "path", "sha256", roots, f"consent asset {index}", errors
            )
            if verified:
                verified["purpose"] = asset["purpose"]
                verified_assets.append(verified)
    if mode in {"face_clone", "quality"} and not any(
        asset.get("purpose") == "face" for asset in verified_assets
    ):
        errors.append("a hash-bound face asset is required")
    if mode == "vrm" and not any(asset.get("purpose") == "vrm" for asset in verified_assets):
        errors.append("a hash-bound VRM asset is required")
    if rvc_enabled and not any(asset.get("purpose") == "voice" for asset in verified_assets):
        errors.append("a hash-bound voice asset is required when RVC is enabled")

    candidate = config.get("candidate", {})
    verified_services: dict[str, Any] = {}
    if mode == "face_clone":
        if not isinstance(candidate, dict) or candidate.get("name") not in ALLOWED_CANDIDATES:
            errors.append("face_clone candidate must be DeepFaceLive, Deep-Live-Cam, or FaceFusion")
        video_verified = _validate_service(
            candidate, "video", roots, VIDEO_ADAPTER_TOKEN, errors
        )
        expected = candidate.get("expected_health", {}) if isinstance(candidate, dict) else {}
        sender_template = expected.get("spout_sender_name")
        if not isinstance(sender_template, str) or not sender_template.strip() or sender_template.upper().startswith("REPLACE_") or "{RUN_ID}" not in sender_template:
            errors.append("face_clone health spout_sender_name must contain the per-run {RUN_ID} placeholder")
        candidate_arguments = candidate.get("arguments", []) if isinstance(candidate, dict) else []
        if not isinstance(candidate_arguments, list) or "{SPOUT_SENDER}" not in candidate_arguments:
            errors.append("face_clone arguments must contain the typed {SPOUT_SENDER} placeholder")
        if not isinstance(expected.get("output_width"), int) or isinstance(expected.get("output_width"), bool) or expected.get("output_width", 0) <= 0:
            errors.append("face_clone health must declare a positive integer output_width")
        if not isinstance(expected.get("output_height"), int) or isinstance(expected.get("output_height"), bool) or expected.get("output_height", 0) <= 0:
            errors.append("face_clone health must declare a positive integer output_height")
        if expected.get("spout_ready") is not True:
            errors.append("face_clone health must attest Boolean spout_ready=true")
        if video_verified:
            verified_services["video"] = video_verified
    elif mode == "quality":
        quality = config.get("quality", {})
        quality_verified = _validate_service(quality, "quality", roots, None, errors)
        if quality_verified:
            verified_services["video"] = quality_verified
    elif mode == "vrm":
        vrm = config.get("vrm", {})
        vrm_verified = _validate_service(vrm, "vrm", roots, None, errors)
        if vrm_verified:
            verified_services["video"] = vrm_verified

    if rvc_enabled:
        rvc_verified = _validate_service(rvc, "rvc", roots, VOICE_ADAPTER_TOKEN, errors)
        if rvc_verified:
            verified_services["rvc"] = rvc_verified

    video_service = candidate if mode == "face_clone" else config.get(mode, {})
    active_control_services: list[tuple[str, dict[str, Any]]] = []
    if isinstance(video_service, dict) and video_service.get("enabled") is True:
        active_control_services.append(("video", video_service))
    if rvc_enabled and isinstance(rvc, dict):
        active_control_services.append(("rvc", rvc))
    identity_id = str(consent.get("identity_id", ""))
    purpose_assets = {
        purpose: [asset for asset in verified_assets if asset.get("purpose") == purpose]
        for purpose in ("face", "voice", "vrm")
    }
    if isinstance(video_service, dict) and video_service.get("enabled") is True:
        video_purpose = "vrm" if mode == "vrm" else "face"
        placeholder = "{VRM_ASSET}" if mode == "vrm" else "{FACE_ASSET}"
        video_arguments = video_service.get("arguments", [])
        if not isinstance(video_arguments, list) or placeholder not in video_arguments:
            errors.append(f"video arguments must contain the typed asset placeholder {placeholder}")
        video_expected = video_service.get("expected_health", {})
        expected_asset_hash = hash_set([asset["sha256"] for asset in purpose_assets[video_purpose]])
        if not isinstance(video_expected, dict) or video_expected.get("identity_id") != identity_id:
            errors.append("video runtime health must bind the authorized identity_id")
        if not isinstance(video_expected, dict) or video_expected.get("asset_set_sha256") != expected_asset_hash:
            errors.append("video runtime health must bind the authorized asset hashes")
    if rvc_enabled and isinstance(rvc, dict):
        rvc_arguments = rvc.get("arguments", [])
        if not isinstance(rvc_arguments, list) or "{VOICE_ASSET}" not in rvc_arguments:
            errors.append("rvc arguments must contain the typed asset placeholder {VOICE_ASSET}")
        rvc_expected = rvc.get("expected_health", {})
        expected_voice_hash = hash_set([asset["sha256"] for asset in purpose_assets["voice"]])
        if not isinstance(rvc_expected, dict) or rvc_expected.get("identity_id") != identity_id:
            errors.append("rvc runtime health must bind the authorized identity_id")
        if not isinstance(rvc_expected, dict) or rvc_expected.get("asset_set_sha256") != expected_voice_hash:
            errors.append("rvc runtime health must bind the authorized voice asset hashes")

    verified_argument_paths = {
        asset["path"].casefold() for asset in verified_assets
    }
    for service_name, service_config in active_control_services:
        for argument in service_config.get("arguments", []):
            if not isinstance(argument, str) or "{" in argument:
                continue
            candidate_path = Path(argument)
            if candidate_path.is_absolute() and str(candidate_path.resolve()).casefold() not in verified_argument_paths:
                errors.append(f"{service_name} contains an untyped absolute path argument")

    configured_ports: dict[int, str] = {}
    for service_name, service_config in active_control_services:
        for url_key in ("health_url", "warmup_url"):
            url_value = service_config.get(url_key)
            if not loopback_url(url_value):
                continue
            port = urlparse(url_value).port
            assert port is not None
            owner = configured_ports.get(port)
            if owner is not None and owner != service_name:
                errors.append(f"loopback port {port} is configured for both {owner} and {service_name}")
            else:
                configured_ports[port] = service_name

    obs = config.get("obs", {})
    if isinstance(obs, dict) and obs.get("enabled") is True:
        obs_executable = _validate_hashed_file(
            obs, "executable", "executable_sha256", roots, "OBS executable", errors
        )
        arguments = obs.get("arguments", [])
        if not isinstance(arguments, list) or not all(isinstance(item, str) for item in arguments):
            errors.append("OBS arguments must be a string array")
            arguments = []
        obs_working = obs.get("working_directory")
        if not isinstance(obs_working, str) or not contained(obs_working, roots) or not Path(obs_working).is_dir() or Path(obs_working).is_symlink():
            errors.append("OBS working_directory is missing, outside allowed roots, or a symlink")
        if any(
            argument.strip().lower().startswith("--startstreaming")
            or argument.strip().lower().startswith("--startrecording")
            for argument in arguments
        ):
            errors.append("OBS may not auto-start a public stream or recording")
        if obs_executable:
            verified_services["obs"] = {"executable": obs_executable, "models": []}

    ready = not errors
    command = "NOT LAUNCHED"
    if ready and isinstance(video_service, dict):
        command = json.dumps(
            [video_service.get("executable"), *video_service.get("arguments", [])],
            ensure_ascii=False,
        )
    return {
        "ready": ready,
        "status": (
            "READY FOR VERIFIED SUPERVISOR LAUNCH; services are NOT active"
            if ready
            else "NOT READY: " + "; ".join(errors)
        ),
        "launch_command": command,
        "verified": {
            "config_path": str(config_file),
            "config_sha256": sha256(config_file),
            "identity_id": consent.get("identity_id"),
            "assets": verified_assets,
            "services": verified_services,
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", required=True)
    arguments = parser.parse_args()
    result = workflow12_preflight(arguments.config)
    print(json.dumps(result, ensure_ascii=False))
    return 0 if result["ready"] else 2


if __name__ == "__main__":
    sys.exit(main())
