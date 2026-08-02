#!/usr/bin/env python3
"""Verify that a per-run Workflow-12 Spout sender is live and changing."""
from __future__ import annotations

import argparse
import array
import hashlib
import json
import sys
import time
from itertools import repeat


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sender", required=True)
    parser.add_argument("--width", type=int, required=True)
    parser.add_argument("--height", type=int, required=True)
    parser.add_argument("--timeout", type=float, default=10.0)
    parser.add_argument("--minimum-presentations", type=int, default=3)
    parser.add_argument("--minimum-unique", type=int, default=2)
    arguments = parser.parse_args()
    if sys.platform != "win32":
        raise SystemExit("Spout sender checks are Windows-only")
    if min(arguments.width, arguments.height, arguments.timeout, arguments.minimum_presentations, arguments.minimum_unique) <= 0:
        raise SystemExit("positive dimensions, timeout, and frame gates are required")

    try:
        import SpoutGL
        from OpenGL import GL
    except ImportError as error:
        raise SystemExit("SpoutGL/OpenGL is unavailable in this Python environment") from error

    deadline = time.perf_counter() + arguments.timeout
    observed = (0, 0)
    presentations = 0
    hashes: set[bytes] = set()
    buffer: array.array[int] | None = None
    with SpoutGL.SpoutReceiver() as receiver:
        receiver.setReceiverName(arguments.sender)
        while time.perf_counter() < deadline:
            if not receiver.waitFrameSync(arguments.sender, 1000):
                continue
            width = int(receiver.getSenderWidth())
            height = int(receiver.getSenderHeight())
            observed = (width, height)
            if observed != (arguments.width, arguments.height):
                continue
            if buffer is None or receiver.isUpdated():
                buffer = array.array("B", repeat(0, width * height * 4))
            if receiver.receiveImage(buffer, GL.GL_RGBA, False, 0):
                presentations += 1
                hashes.add(hashlib.blake2b(buffer.tobytes(), digest_size=16).digest())
                if presentations >= arguments.minimum_presentations and len(hashes) >= arguments.minimum_unique:
                    print(
                        json.dumps(
                            {
                                "ready": True,
                                "sender": arguments.sender,
                                "width": width,
                                "height": height,
                                "presentations": presentations,
                                "unique_pixel_hashes": len(hashes),
                            }
                        )
                    )
                    return 0
    print(
        json.dumps(
            {
                "ready": False,
                "sender": arguments.sender,
                "expected": [arguments.width, arguments.height],
                "observed": list(observed),
                "presentations": presentations,
                "unique_pixel_hashes": len(hashes),
            }
        ),
        file=sys.stderr,
    )
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
