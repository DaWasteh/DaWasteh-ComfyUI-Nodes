#!/usr/bin/env python3
"""Measure a Workflow-12 Spout sender without counting repeated frames as AI FPS."""
from __future__ import annotations

import argparse
import array
import csv
import hashlib
import json
import locale
import os
import signal
import subprocess
import sys
import time
from dataclasses import dataclass, field
from itertools import repeat
from pathlib import Path
from typing import Any

GPU_ENGINE_COUNTER = r"\GPU Engine(*)\Utilization Percentage"
GPU_MEMORY_COUNTER = r"\GPU Process Memory(*)\Dedicated Usage"


def percentile(values: list[float], fraction: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    return ordered[round((len(ordered) - 1) * fraction)]


@dataclass
class Aggregator:
    """Aggregate received sender presentations and visually unique frames."""

    presentation_frames: int = 0
    unique_times: list[float] = field(default_factory=list)
    duplicate_presentations: int = 0
    _last_hash: bytes | None = None
    _first_time: float | None = None
    _last_time: float | None = None

    def add(self, pixels: bytes, now: float) -> None:
        if self._first_time is None:
            self._first_time = now
        self._last_time = now
        self.presentation_frames += 1
        digest = hashlib.blake2b(pixels, digest_size=16).digest()
        if digest == self._last_hash:
            self.duplicate_presentations += 1
            return
        self._last_hash = digest
        self.unique_times.append(now)

    def result(
        self,
        elapsed_seconds: float | None = None,
        minimum_seconds: float = 600.0,
        capture_to_spout_ms: float | None = None,
    ) -> dict[str, Any]:
        if elapsed_seconds is None:
            elapsed_seconds = max(0.0, (self._last_time or 0.0) - (self._first_time or 0.0))
        intervals = [
            (current - previous) * 1000.0
            for previous, current in zip(self.unique_times, self.unique_times[1:])
        ]
        unique_fps = len(self.unique_times) / elapsed_seconds if elapsed_seconds else 0.0
        presentation_fps = self.presentation_frames / elapsed_seconds if elapsed_seconds else 0.0
        p95 = percentile(intervals, 0.95)
        passed = (
            elapsed_seconds >= minimum_seconds
            and unique_fps >= 24.0
            and p95 is not None
            and p95 <= 41.67
        )
        return {
            "measurement_seconds": elapsed_seconds,
            "presentation_frames": self.presentation_frames,
            "presentation_fps": presentation_fps,
            "unique_pixel_hash_frames": len(self.unique_times),
            "unique_ai_fps_proxy": unique_fps,
            "duplicate_presentations": self.duplicate_presentations,
            "duplicate_ratio": (
                self.duplicate_presentations / self.presentation_frames
                if self.presentation_frames
                else 0.0
            ),
            "unique_frame_interval_ms": {
                "p50": percentile(intervals, 0.50),
                "p95": p95,
                "p99": percentile(intervals, 0.99),
            },
            "capture_to_spout": (
                {"value_ms": capture_to_spout_ms, "source": "manual_synchronized_measurement"}
                if capture_to_spout_ms is not None
                else {"value_ms": None, "source": "unavailable_without_instrumented_timestamps"}
            ),
            "pass_24_unique_fps": passed,
            "pass_contract": "at least 600 seconds, unique FPS >= 24, p95 interval <= 41.67 ms",
        }


def start_pdh_capture(path: Path, pid: int | None, interval: float = 0.5) -> subprocess.Popen[str] | None:
    """Start cache-free PDH collection through typeperf using English wildcard counters."""
    if sys.platform != "win32":
        return None
    command = [
        "typeperf",
        GPU_ENGINE_COUNTER,
        GPU_MEMORY_COUNTER,
        "-si",
        str(interval),
        "-f",
        "CSV",
        "-o",
        str(path),
        "-y",
    ]
    creationflags = getattr(subprocess, "CREATE_NEW_PROCESS_GROUP", 0)
    process = subprocess.Popen(
        command,
        stdin=subprocess.DEVNULL,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="replace",
        creationflags=creationflags,
    )
    process.workflow12_pid_filter = pid  # type: ignore[attr-defined]
    return process


def stop_pdh_capture(process: subprocess.Popen[str] | None) -> None:
    if process is None or process.poll() is not None:
        return
    try:
        process.send_signal(signal.CTRL_BREAK_EVENT)
        process.wait(timeout=5)
    except (AttributeError, OSError, subprocess.TimeoutExpired):
        process.terminate()
        try:
            process.wait(timeout=3)
        except subprocess.TimeoutExpired:
            process.kill()


def summarize_pdh(path: Path, pid: int | None) -> dict[str, Any]:
    """Summarize PID-matching PDH columns while retaining the raw CSV as evidence."""
    if not path.is_file():
        return {"collected": False, "reason": "typeperf output missing"}
    try:
        raw = path.read_bytes()
        encodings = ["utf-16"] if raw.startswith((b"\xff\xfe", b"\xfe\xff")) else ["utf-8-sig", locale.getpreferredencoding(False), "cp1252"]
        text = None
        for encoding in dict.fromkeys(encodings):
            try:
                text = raw.decode(encoding)
                break
            except UnicodeDecodeError:
                continue
        if text is None:
            raise ValueError("PDH CSV encoding is unsupported")
        rows = list(csv.reader(text.splitlines()))
        if len(rows) < 2:
            return {"collected": False, "reason": "no PDH samples", "raw_csv": str(path)}
        headers = rows[0]
        token = f"pid_{pid}_".casefold() if pid is not None else ""
        engine_indices = [
            index
            for index, header in enumerate(headers)
            if "gpu engine" in header.casefold() and (not token or token in header.casefold())
        ]
        memory_indices = [
            index
            for index, header in enumerate(headers)
            if "gpu process memory" in header.casefold() and (not token or token in header.casefold())
        ]
        engine_peaks: list[float] = []
        memory_peaks: list[float] = []
        for row in rows[1:]:
            engine_values = [_number(row[index]) for index in engine_indices if index < len(row)]
            memory_values = [_number(row[index]) for index in memory_indices if index < len(row)]
            engine_peaks.append(max(engine_values, default=0.0))
            memory_peaks.append(max(memory_values, default=0.0))
        return {
            "collected": True,
            "pid_filter": pid,
            "raw_csv": str(path),
            "matching_engine_columns": len(engine_indices),
            "matching_memory_columns": len(memory_indices),
            "peak_single_engine_percent": max(engine_peaks, default=0.0),
            "peak_dedicated_bytes": max(memory_peaks, default=0.0),
            "note": "Raw wildcard PDH evidence is authoritative; no WMI utilization was used.",
        }
    except (OSError, csv.Error, ValueError) as error:
        return {"collected": False, "reason": str(error), "raw_csv": str(path)}


def _number(value: str) -> float:
    text = value.strip().strip('"').replace(",", ".")
    try:
        return float(text)
    except ValueError:
        return 0.0


def receive_spout(sender_name: str, duration_seconds: float, expected_width: int, expected_height: int) -> Aggregator:
    import SpoutGL
    from OpenGL import GL

    aggregate = Aggregator()
    deadline = time.perf_counter() + duration_seconds
    buffer: array.array[int] | None = None
    width = height = 0
    with SpoutGL.SpoutReceiver() as receiver:
        receiver.setReceiverName(sender_name)
        while time.perf_counter() < deadline:
            if not receiver.waitFrameSync(sender_name, 1000):
                continue
            if buffer is None or receiver.isUpdated():
                width = int(receiver.getSenderWidth())
                height = int(receiver.getSenderHeight())
                if width <= 0 or height <= 0:
                    continue
                if (width, height) != (expected_width, expected_height):
                    raise RuntimeError(
                        f"sender resolution is {width}x{height}; expected {expected_width}x{expected_height}"
                    )
                buffer = array.array("B", repeat(0, width * height * 4))
            if buffer is None:
                continue
            if receiver.receiveImage(buffer, GL.GL_RGBA, False, 0):
                aggregate.add(buffer.tobytes(), time.perf_counter())
    return aggregate


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sender", required=True)
    parser.add_argument("--height", type=int, choices=(720, 1080), required=True)
    parser.add_argument("--duration", type=float, default=600.0)
    parser.add_argument("--candidate", choices=("DeepFaceLive", "Deep-Live-Cam", "FaceFusion"), required=True)
    parser.add_argument("--gpu", choices=("R9700", "RX-9070-XT"), required=True)
    parser.add_argument("--pid", type=int)
    parser.add_argument("--capture-to-spout-ms", type=float)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--pdh-csv", type=Path)
    args = parser.parse_args()
    if sys.platform != "win32":
        raise SystemExit("Spout benchmarking is Windows-only")
    if args.duration <= 0:
        raise SystemExit("duration must be positive")

    width = 1280 if args.height == 720 else 1920
    pdh_path = args.pdh_csv or args.output.with_suffix(".pdh.csv")
    pdh = start_pdh_capture(pdh_path, args.pid)
    started = time.perf_counter()
    try:
        aggregate = receive_spout(args.sender, args.duration, width, args.height)
    finally:
        stop_pdh_capture(pdh)
    elapsed = time.perf_counter() - started
    report = {
        "candidate": args.candidate,
        "gpu": args.gpu,
        "resolution": f"{width}x{args.height}",
        "enhancer": "off",
        "sender": args.sender,
        "metrics": aggregate.result(elapsed, capture_to_spout_ms=args.capture_to_spout_ms),
        "pdh": summarize_pdh(pdh_path, args.pid),
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    temporary = args.output.with_suffix(args.output.suffix + ".tmp")
    temporary.write_text(json.dumps(report, indent=2), encoding="utf-8")
    os.replace(temporary, args.output)
    print(args.output)


if __name__ == "__main__":
    main()
