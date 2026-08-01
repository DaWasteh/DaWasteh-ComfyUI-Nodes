#!/usr/bin/env python3
"""Convert Kijai's verified LivePortrait landmark GraphModule to TorchScript.

The upstream .pth requires full pickle loading and imports onnx2torch. This tool
performs that risky operation only after verifying the exact upstream SHA-256,
then emits a self-contained TorchScript file used by the local runtime patch.
"""
from __future__ import annotations

import argparse
import hashlib
import os
from importlib import metadata
from pathlib import Path

SOURCE_SHA256 = "48ba55140fda4c292d3faf3e3ed9106784c7c32aebf170d4983fb67cd0a3c9c8"
OUTPUT_SHA256 = "9064565b92b3595786096b36acd24709c7bd290631510517bd3a9d5ca8f28a43"
EXPECTED_SHAPES = ((1, 214), (1, 262), (1, 406))
EXPECTED_VERSIONS = {
    "torch": "2.12.0+rocm7.15.0a20260727",
    "onnx2torch": "1.5.15",
    "onnx": "1.22.0",
    "protobuf": "5.29.6",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(8 * 1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--model-dir",
        type=Path,
        default=Path("L:/ComfyUI/ComfyUI/models/liveportrait"),
        help="Directory containing landmark_model.pth",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    source = args.model_dir / "landmark_model.pth"
    target = args.model_dir / "landmark_model_torchscript.pt"
    temporary = target.with_suffix(".pt.tmp")

    if not source.is_file():
        raise FileNotFoundError(source)
    source_digest = sha256(source)
    if source_digest != SOURCE_SHA256:
        raise RuntimeError(
            f"Refusing to unpickle {source}: expected {SOURCE_SHA256}, got {source_digest}"
        )

    try:
        import torch
        import onnx2torch  # noqa: F401 - required while unpickling the GraphModule
    except ModuleNotFoundError as error:
        raise RuntimeError(
            "The one-time conversion requires the pinned conversion environment "
            f"{EXPECTED_VERSIONS}. Use a throwaway environment; the resulting "
            "TorchScript runtime does not require ONNX, onnx2torch, or protobuf."
        ) from error

    actual_versions = {
        "torch": str(torch.__version__),
        **{name: metadata.version(name) for name in ("onnx2torch", "onnx", "protobuf")},
    }
    if actual_versions != EXPECTED_VERSIONS:
        raise RuntimeError(
            f"Conversion environment differs: expected {EXPECTED_VERSIONS}, got {actual_versions}"
        )

    model = torch.load(source, map_location="cpu", weights_only=False).eval()
    generator = torch.Generator().manual_seed(9700)
    examples = [
        torch.zeros(1, 3, 224, 224),
        torch.rand(1, 3, 224, 224, generator=generator),
    ]
    with torch.inference_mode():
        reference_outputs = [model(example) for example in examples]
    traced = torch.jit.trace(model, examples[0], strict=False)
    torch.jit.save(traced, str(temporary))

    loaded = torch.jit.load(str(temporary), map_location="cpu").eval()
    with torch.inference_mode():
        converted_outputs = [loaded(example) for example in examples]
    for fixture_index, (reference, converted) in enumerate(zip(reference_outputs, converted_outputs)):
        shapes = tuple(tuple(tensor.shape) for tensor in converted)
        if shapes != EXPECTED_SHAPES:
            temporary.unlink(missing_ok=True)
            raise RuntimeError(f"Unexpected landmark output shapes for fixture {fixture_index}: {shapes}")
        for output_index, (expected_tensor, actual_tensor) in enumerate(zip(reference, converted)):
            if not torch.isfinite(actual_tensor).all():
                temporary.unlink(missing_ok=True)
                raise RuntimeError(
                    f"Non-finite TorchScript output for fixture {fixture_index}, output {output_index}"
                )
            if not torch.allclose(expected_tensor, actual_tensor, rtol=1e-5, atol=1e-6):
                temporary.unlink(missing_ok=True)
                error = (expected_tensor - actual_tensor).abs().max().item()
                raise RuntimeError(
                    f"TorchScript mismatch for fixture {fixture_index}, output {output_index}: "
                    f"max_abs_error={error}"
                )

    output_digest = sha256(temporary)
    if output_digest != OUTPUT_SHA256:
        raise RuntimeError(
            f"Converted model hash differs: expected {OUTPUT_SHA256}, got {output_digest}. "
            f"Unverified artifact remains at {temporary}."
        )

    os.replace(temporary, target)
    print(f"Wrote verified TorchScript model: {target}")
    print(f"SHA-256: {output_digest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
