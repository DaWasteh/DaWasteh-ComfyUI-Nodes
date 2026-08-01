#!/usr/bin/env python3
"""Install the bundled Qwen3-TTS LoRA node pack into a ComfyUI checkout."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

NODE_DIR_NAME = "ComfyUI-DaWasteh-Qwen3TTS-LoRA"


def queue_is_empty(server: str) -> bool:
    with urllib.request.urlopen(f"{server.rstrip('/')}/queue", timeout=10) as response:
        queue = json.load(response)
    return not queue.get("queue_running") and not queue.get("queue_pending")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--comfyui-root", type=Path, default=Path("L:/ComfyUI/ComfyUI"))
    parser.add_argument("--server", default="http://127.0.0.1:8188")
    parser.add_argument("--python-exe", type=Path)
    parser.add_argument("--skip-queue-check", action="store_true")
    parser.add_argument("--skip-dependency-install", action="store_true")
    return parser.parse_args()


def resolve_python(comfyui_root: Path, override: Path | None) -> Path:
    candidates = [
        override,
        comfyui_root.parent / ".venv" / "Scripts" / "python.exe",
        comfyui_root.parent / ".venv" / "bin" / "python",
        Path(sys.executable),
    ]
    for candidate in candidates:
        if candidate is not None and candidate.expanduser().is_file():
            return candidate.expanduser().resolve()
    raise FileNotFoundError("No Python interpreter found for the target ComfyUI installation.")


def find_qwen_implementation(comfyui_root: Path) -> Path:
    candidates = [
        comfyui_root / "custom_nodes" / "qwen3-tts-comfyui" / "qwen_tts",
        comfyui_root / "custom_nodes" / "ComfyUI-Qwen-TTS" / "qwen_tts",
    ]
    for candidate in candidates:
        if (candidate / "__init__.py").is_file():
            return candidate
    raise RuntimeError(
        "Missing Qwen3-TTS implementation. Install qwen3-tts-comfyui or "
        "ComfyUI-Qwen-TTS first; this node pack deliberately reuses its matching qwen_tts runtime."
    )


def install_dependencies(python_exe: Path, requirements: Path) -> None:
    subprocess.run(
        [str(python_exe), "-m", "pip", "install", "--disable-pip-version-check", "-r", str(requirements)],
        check=True,
    )
    subprocess.run(
        [str(python_exe), "-c", "import librosa, packaging, peft, safetensors, soundfile"],
        check=True,
    )


def validate_qwen_runtime(python_exe: Path, qwen_package: Path) -> None:
    runtime_root = qwen_package.parent
    code = (
        "import sys; "
        f"sys.path.insert(0, {str(runtime_root)!r}); "
        "from qwen_tts import Qwen3TTSModel, Qwen3TTSTokenizer; "
        "from qwen_tts.finetuning.dataset import TTSDataset; "
        "assert Qwen3TTSModel and Qwen3TTSTokenizer and TTSDataset"
    )
    subprocess.run([str(python_exe), "-c", code], check=True)


def main() -> int:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[1]
    source = repo_root / "custom_nodes" / NODE_DIR_NAME
    target_root = args.comfyui_root.expanduser().resolve()
    target = target_root / "custom_nodes" / NODE_DIR_NAME
    if not source.is_dir():
        raise FileNotFoundError(f"Bundled node source not found: {source}")
    if not (target_root / "main.py").is_file():
        raise FileNotFoundError(f"Not a ComfyUI root: {target_root}")
    if not args.skip_queue_check and not queue_is_empty(args.server):
        raise RuntimeError("ComfyUI queue is not empty; installation was not started.")
    qwen_runtime = find_qwen_implementation(target_root)
    python_exe = resolve_python(target_root, args.python_exe)
    requirements = source / "requirements.txt"
    if not args.skip_dependency_install:
        install_dependencies(python_exe, requirements)
    validate_qwen_runtime(python_exe, qwen_runtime)

    target.mkdir(parents=True, exist_ok=True)
    for path in source.rglob("*"):
        if path.is_dir() or path.name == "__pycache__" or "__pycache__" in path.parts:
            continue
        relative = path.relative_to(source)
        destination = target / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, destination)
    print(f"Installed {NODE_DIR_NAME} to {target}")
    print(f"Python: {python_exe}")
    print(f"Qwen3-TTS runtime: {qwen_runtime.parent}")
    print("Restart ComfyUI to load the new nodes.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
