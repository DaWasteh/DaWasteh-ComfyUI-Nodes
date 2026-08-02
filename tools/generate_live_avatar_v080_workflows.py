"""Atomically reproduce the Workflow 12-14 release graphs from pinned templates."""
from __future__ import annotations

import argparse
import os
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NAMES = (
    "LiveAvatar-12-I-DirectML-Face-Clone-Bakeoff.json",
    "LiveAvatar-12-II-LivePortrait-Quality-Mode.json",
    "LiveAvatar-12-III-Reliable-VRM-Mode.json",
    "LiveAvatar-13-Synthetic-Character-Sheet.json",
    "LiveAvatar-14-Local-Hunyuan3D-Multiview-Mesh-Unrigged.json",
)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--destination", type=Path, default=ROOT / "workflows/Live Avatar")
    arguments = parser.parse_args()
    arguments.destination.mkdir(parents=True, exist_ok=True)
    for name in NAMES:
        data = (ROOT / "assets/live-avatar-v080" / name.replace(".json", ".template.json")).read_bytes()
        descriptor, temporary = tempfile.mkstemp(dir=arguments.destination, prefix=".", suffix=".tmp")
        with os.fdopen(descriptor, "wb") as target:
            target.write(data)
            target.flush()
            os.fsync(target.fileno())
        os.replace(temporary, arguments.destination / name)


if __name__ == "__main__":
    main()
