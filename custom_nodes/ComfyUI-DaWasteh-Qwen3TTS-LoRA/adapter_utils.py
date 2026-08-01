# Copyright 2026 DaWasteh contributors
# SPDX-License-Identifier: Apache-2.0
"""Lightweight filesystem helpers for Qwen3-TTS adapter lifecycle."""

from __future__ import annotations

import shutil
from pathlib import Path

ADAPTER_FILES = (
    "adapter_config.json",
    "adapter_model.safetensors",
    "speaker_embedding.safetensors",
    "qwen3_tts_speaker.json",
)
LORA_RANKS = (8, 16, 32, 64)


def normalize_lora_rank(value: int | str) -> int:
    """Convert ComfyUI combo values to a supported integer LoRA rank."""
    try:
        rank = int(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"Invalid LoRA rank: {value!r}.") from exc
    if rank not in LORA_RANKS:
        raise ValueError(f"Unsupported LoRA rank {rank}; choose one of {LORA_RANKS}.")
    return rank


def find_audio_transcript_pairs(
    audio_folder: Path,
    audio_extensions: set[str] | frozenset[str],
) -> list[tuple[Path, Path]]:
    """Find exact or conventional ``<audio-stem>_Text.txt`` transcript pairs."""
    files = [path for path in audio_folder.iterdir() if path.is_file()]
    transcripts = {path.name.casefold(): path for path in files if path.suffix.lower() == ".txt"}
    pairs: list[tuple[Path, Path]] = []
    for audio_path in sorted(
        (path for path in files if path.suffix.lower() in audio_extensions),
        key=lambda path: path.name.casefold(),
    ):
        transcript = transcripts.get(f"{audio_path.stem}.txt".casefold())
        if transcript is None:
            transcript = transcripts.get(f"{audio_path.stem}_Text.txt".casefold())
        if transcript is not None:
            pairs.append((audio_path, transcript))
    return pairs


def adapter_signature(adapter: Path) -> tuple[tuple[str, int, int], ...]:
    """Return a cheap signature that changes when a checkpoint is republished."""
    signature: list[tuple[str, int, int]] = []
    for name in ADAPTER_FILES:
        path = adapter / name
        if not path.is_file():
            signature.append((name, -1, -1))
            continue
        stat = path.stat()
        signature.append((name, stat.st_size, stat.st_mtime_ns))
    return tuple(signature)


def accumulation_group_size(step: int, total_steps: int, requested_size: int) -> int:
    """Return the actual accumulation divisor for this complete or tail group."""
    if step < 0 or total_steps <= 0 or step >= total_steps or requested_size <= 0:
        raise ValueError("Invalid gradient-accumulation bounds.")
    group_start = (step // requested_size) * requested_size
    return min(requested_size, total_steps - group_start)


def publish_directory(staging: Path, destination: Path) -> None:
    """Publish a complete checkpoint without exposing partially written files."""
    if not staging.is_dir():
        raise FileNotFoundError(f"Checkpoint staging directory not found: {staging}")
    backup = destination.with_name(f".{destination.name}.previous")
    if backup.exists():
        if destination.exists():
            shutil.rmtree(backup)
        else:
            backup.replace(destination)
    had_destination = destination.exists()
    if had_destination:
        destination.replace(backup)
    try:
        staging.replace(destination)
    except Exception:
        if had_destination and backup.exists() and not destination.exists():
            backup.replace(destination)
        raise
    else:
        if backup.exists():
            shutil.rmtree(backup)
