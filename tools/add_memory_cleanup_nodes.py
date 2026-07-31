#!/usr/bin/env python3
"""Add conservative VRAM cleanup barriers to RAM/VRAM-heavy ComfyUI workflows.

The tool only edits personal workflows below a supplied root. It inserts the
installed KJNodes ``VRAM_Debug`` node as a typed pass-through by splitting an
existing link. All edits are idempotent, backed up, validated, and written
atomically.
"""

from __future__ import annotations

import argparse
import copy
import json
import re
import shutil
import sys
import tempfile
import zipfile
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable

MARKER_KEY = "dawasteh_memory_cleanup"
MARKER_VERSION = 1
CLEANUP_TYPE = "VRAM_Debug"

VIDEO_CATEGORIES = {
    "Audio to Video",
    "Character Animation",
    "Controlled Video",
    "Talking Video",
    "Text to Video",
    "Text+Image to Video",
    "Video Editing",
}

NAME_KEYWORDS = {
    "ace-step",
    "stableaudio",
    "yue_",
    "heartmula",
    "ltx",
    "wan",
    "infinitetalk",
    "scail",
    "mmaudio",
    "hunyuan3d",
    "kandinsky5",
    "bernini",
    "zimage",
    "z-image",
    "flux2",
    "flux.2",
    "krea2",
    "qwen-image",
    "hunyuanvideo",
    "cogvideo",
    "mochi",
    "seedvr",
}

HEAVY_TYPE_PARTS = (
    "sampler",
    "unetloader",
    "checkpointloader",
    "modelload",
    "ltx",
    "wan",
    "hunyuan",
    "kandinsky",
    "mmaudio",
    "heartmula",
    "yue_",
    "textencodeacestep",
)

SAMPLER_TYPES = {
    "KSampler",
    "KSamplerAdvanced",
    "SamplerCustom",
    "SamplerCustomAdvanced",
}

DECODE_TYPES = {
    "VAEDecode",
    "VAEDecodeAudio",
    "VAEDecodeTiled",
    "VAEDecodeHunyuan3D",
}

HEAVY_COMPUTE_PARTS = (
    "sampler",
    "vaedecode",
    "textencode",
    "textgenerate",
    "musicgenerator",
    "audiodecoder",
    "yue_stage",
    "mmaudio",
)

TRAINING_HINTS = ("training", "trainer", "lora generation")


@dataclass(frozen=True)
class LinkRef:
    link_id: int
    origin_id: int
    origin_slot: int
    target_id: int
    target_slot: int
    link_type: str


@dataclass(frozen=True)
class Placement:
    kind: str
    link_id: int
    reason: str
    secondary_link_id: int | None = None


@dataclass
class WorkflowPlan:
    path: Path
    reasons: list[str]
    placements: list[Placement]
    skips: list[str]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--root",
        type=Path,
        default=Path("ComfyUI/user/default/workflows/DaWasteh"),
        help="Personal workflow directory to scan.",
    )
    parser.add_argument(
        "--backup-dir",
        type=Path,
        default=Path("_workflow_backups"),
        help="Directory for ZIP backups and audit reports.",
    )
    parser.add_argument("--apply", action="store_true", help="Apply the validated plan.")
    parser.add_argument(
        "--timestamp",
        default=None,
        help="Override the YYYYMMDD-HHMMSS artifact timestamp.",
    )
    return parser.parse_args()


def read_json(path: Path) -> tuple[dict[str, Any], bool, bool]:
    raw = path.read_bytes()
    had_bom = raw.startswith(b"\xef\xbb\xbf")
    text = raw.decode("utf-8-sig")
    pretty = "\n" in text.rstrip("\r\n")
    data = json.loads(text)
    if not isinstance(data, dict):
        raise ValueError("workflow root is not a JSON object")
    return data, had_bom, pretty


def encode_json(data: dict[str, Any], *, had_bom: bool, pretty: bool) -> bytes:
    if pretty:
        text = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    else:
        text = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return text.encode("utf-8-sig" if had_bom else "utf-8")


def root_links(data: dict[str, Any]) -> list[LinkRef]:
    result: list[LinkRef] = []
    for link in data.get("links", []):
        if not isinstance(link, list) or len(link) < 6:
            raise ValueError(f"unsupported root link schema: {link!r}")
        result.append(
            LinkRef(
                int(link[0]),
                int(link[1]),
                int(link[2]),
                int(link[3]),
                int(link[4]),
                str(link[5]),
            )
        )
    return result


def node_map(graph: dict[str, Any]) -> dict[int, dict[str, Any]]:
    nodes = graph.get("nodes", [])
    if not isinstance(nodes, list):
        raise ValueError("nodes is not a list")
    result: dict[int, dict[str, Any]] = {}
    for node in nodes:
        node_id = int(node["id"])
        if node_id in result:
            raise ValueError(f"duplicate node id {node_id}")
        result[node_id] = node
    return result


def linked_input(node: dict[str, Any], names: Iterable[str]) -> tuple[int, int] | None:
    wanted = {name.lower() for name in names}
    inputs = node.get("inputs", []) or []
    for slot, item in enumerate(inputs):
        if str(item.get("name", "")).lower() in wanted and item.get("link") is not None:
            return slot, int(item["link"])
    return None


def first_data_input(node: dict[str, Any], accepted_types: set[str]) -> tuple[int, int] | None:
    for slot, item in enumerate(node.get("inputs", []) or []):
        link_id = item.get("link")
        if link_id is None:
            continue
        if str(item.get("type", "")).upper() in accepted_types:
            return slot, int(link_id)
    return None


def is_heavy_workflow(path: Path, data: dict[str, Any], root: Path) -> list[str]:
    relative = path.relative_to(root)
    lowered = relative.as_posix().lower()
    reasons: list[str] = []

    if any(hint in lowered for hint in TRAINING_HINTS):
        return []

    if any(keyword in lowered for keyword in NAME_KEYWORDS):
        reasons.append("heavy-family-name")

    category = relative.parts[0] if relative.parts else ""
    types = {str(node.get("type", "")) for node in data.get("nodes", [])}
    lowered_types = {node_type.lower() for node_type in types}
    has_heavy_type = any(
        part in node_type for node_type in lowered_types for part in HEAVY_TYPE_PARTS
    )
    if category in VIDEO_CATEGORIES and has_heavy_type:
        reasons.append("generative-video-pipeline")

    if category == "Image to 3D-Mesh" and has_heavy_type:
        reasons.append("generative-3d-pipeline")

    if category == "Image Upscaling" and any("sampler" in item for item in lowered_types):
        reasons.append("diffusion-upscale-pipeline")

    return sorted(set(reasons))


def find_terminal_placement(
    data: dict[str, Any], links: list[LinkRef], nodes: dict[int, dict[str, Any]]
) -> tuple[Placement | None, str | None]:
    links_by_id = {link.link_id: link for link in links}

    priorities: list[tuple[set[str], list[str], set[str]]] = [
        ({"SaveVideo"}, ["video"], {"VIDEO"}),
        (
            {"SaveAudio", "SaveAudioMP3", "VHS_SaveAudio"},
            ["audio"],
            {"AUDIO"},
        ),
        ({"SaveGLB"}, ["mesh", "glb"], {"MESH", "GLB"}),
        ({"SaveImage"}, ["images", "image"], {"IMAGE"}),
        ({"PreviewImage", "PixaromaPreview"}, ["images", "image"], {"IMAGE"}),
        ({"PixaromaShowText"}, ["source", "text"], {"STRING"}),
    ]

    last_skip: str | None = None
    for types, input_names, accepted_types in priorities:
        candidates = [node for node in nodes.values() if str(node.get("type")) in types]
        if not candidates:
            continue
        if len(candidates) != 1:
            last_skip = f"terminal cleanup skipped: {len(candidates)} output nodes of {sorted(types)}"
            continue
        target = candidates[0]
        chosen = linked_input(target, input_names) or first_data_input(target, accepted_types)
        if chosen is None:
            return None, f"terminal cleanup skipped: no linked media input on {target.get('type')}"
        _, link_id = chosen
        link = links_by_id.get(link_id)
        if link is None:
            return None, f"terminal cleanup skipped: missing link {link_id}"
        source = nodes.get(link.origin_id)
        if source is not None and str(source.get("type")) == CLEANUP_TYPE:
            return None, "terminal cleanup already present"
        return (
            Placement(
                kind="terminal",
                link_id=link_id,
                reason=f"after final media barrier, before {target.get('type')}",
            ),
            None,
        )

    return None, last_skip or "terminal cleanup skipped: no unique supported save/export node"


def find_dual_terminal_placement(
    path: Path,
    links: list[LinkRef],
    nodes: dict[int, dict[str, Any]],
) -> tuple[Placement | None, str | None]:
    """Find an explicit two-input barrier for the few branched critical graphs.

    ``VRAM_Debug`` has both an ANY pass-through and a typed IMAGE pass-through.
    Wiring both makes cleanup wait for two independent heavy branches before it
    can run. This is intentionally limited to reviewed local workflow families.
    """
    links_by_id = {link.link_id: link for link in links}
    lowered = path.as_posix().lower()

    if "ltx23-image+audio-to-generative-matching-length-video" in lowered or "ltx23_director-prompt-replay" in lowered:
        barrier_types = {"PixaromaSaveMp4", "VHS_VideoCombine"}
        barriers = [node for node in nodes.values() if str(node.get("type")) in barrier_types]
        if len(barriers) != 1:
            return None, f"dual barrier skipped: expected one LTX media join, found {len(barriers)}"
        barrier = barriers[0]
        image_input = linked_input(barrier, ["video_frames", "images", "image"])
        audio_input = linked_input(barrier, ["audio"])
        if image_input is None or audio_input is None:
            return None, "dual barrier skipped: LTX media join lacks linked image/audio inputs"
        return (
            Placement(
                kind="terminal",
                link_id=audio_input[1],
                secondary_link_id=image_input[1],
                reason=f"two-input audio/video barrier before {barrier.get('type')}",
            ),
            None,
        )

    if "wan21_scail2-character-replacement" in lowered or "wan21_infinitetalk-multi-speaker" in lowered:
        save_nodes = sorted(
            (node for node in nodes.values() if str(node.get("type")) == "SaveVideo"),
            key=lambda node: int(node["id"]),
        )
        if len(save_nodes) != 2:
            return None, f"dual barrier skipped: expected two SaveVideo nodes, found {len(save_nodes)}"
        save_pairs: list[tuple[dict[str, Any], LinkRef, dict[str, Any]]] = []
        for save in save_nodes:
            chosen = linked_input(save, ["video"])
            if chosen is None or chosen[1] not in links_by_id:
                return None, "dual barrier skipped: SaveVideo lacks linked VIDEO input"
            video_link = links_by_id[chosen[1]]
            create = nodes.get(video_link.origin_id)
            if create is None or str(create.get("type")) != "CreateVideo":
                return None, "dual barrier skipped: SaveVideo is not fed by CreateVideo"
            save_pairs.append((save, video_link, create))

        primary_video = save_pairs[0][1]
        second_create = save_pairs[1][2]
        second_images = linked_input(second_create, ["images", "image"])
        if second_images is None:
            return None, "dual barrier skipped: second CreateVideo lacks linked IMAGE input"
        return (
            Placement(
                kind="terminal",
                link_id=primary_video.link_id,
                secondary_link_id=second_images[1],
                reason="two-branch video barrier after branch one CreateVideo and branch two final image generation",
            ),
            None,
        )

    return None, "dual terminal cleanup is not defined for this workflow"


def find_pre_decode_placement(
    path: Path,
    data: dict[str, Any],
    links: list[LinkRef],
    nodes: dict[int, dict[str, Any]],
) -> tuple[Placement | None, str | None]:
    lowered_path = path.as_posix().lower()
    if "ltx" in lowered_path or "yue" in lowered_path or "heartmula" in lowered_path:
        return None, "pre-decode cleanup skipped: multi-stage/custom family"
    if data.get("definitions", {}).get("subgraphs"):
        return None, "pre-decode cleanup skipped: workflow contains subgraphs"

    samplers = [node for node in nodes.values() if str(node.get("type")) in SAMPLER_TYPES]
    decoders = [node for node in nodes.values() if str(node.get("type")) in DECODE_TYPES]
    if len(samplers) != 1 or len(decoders) != 1:
        return None, f"pre-decode cleanup skipped: {len(samplers)} samplers, {len(decoders)} decoders"

    decoder = decoders[0]
    chosen = linked_input(decoder, ["samples", "latent", "latents"])
    if chosen is None:
        chosen = first_data_input(decoder, {"LATENT"})
    if chosen is None:
        return None, "pre-decode cleanup skipped: decoder has no linked LATENT input"

    _, link_id = chosen
    links_by_id = {link.link_id: link for link in links}
    link = links_by_id.get(link_id)
    if link is None:
        return None, f"pre-decode cleanup skipped: missing link {link_id}"
    sampler = samplers[0]
    if link.origin_id != int(sampler["id"]):
        return None, "pre-decode cleanup skipped: decoder is not directly fed by the only sampler"

    sampler_output = (link.origin_id, link.origin_slot)
    consumers = [item for item in links if (item.origin_id, item.origin_slot) == sampler_output]
    if len(consumers) != 1:
        return None, f"pre-decode cleanup skipped: sampler output has {len(consumers)} consumers"

    return (
        Placement(
            kind="pre_decode",
            link_id=link_id,
            reason=f"single final {sampler.get('type')} to {decoder.get('type')} phase boundary",
        ),
        None,
    )


def placement_barrier_gaps(
    placement: Placement,
    links: list[LinkRef],
    nodes: dict[int, dict[str, Any]],
) -> list[dict[str, Any]]:
    """Return active heavy compute nodes not dominated by a terminal barrier.

    A terminal cleanup is safe only after every active sampler/encoder/decoder
    branch has reached one of the cleanup node's source values. For a dual-input
    barrier, ancestors from both source links are combined.
    """
    links_by_id = {link.link_id: link for link in links}
    source_ids: set[int] = set()
    for link_id in (placement.link_id, placement.secondary_link_id):
        if link_id is None:
            continue
        link = links_by_id.get(link_id)
        if link is None:
            continue
        source_ids.add(link.origin_id)

    reverse_edges: dict[int, set[int]] = defaultdict(set)
    for link in links:
        reverse_edges[link.target_id].add(link.origin_id)

    ancestors = set(source_ids)
    stack = list(source_ids)
    while stack:
        current = stack.pop()
        for parent in reverse_edges.get(current, set()):
            if parent not in ancestors:
                ancestors.add(parent)
                stack.append(parent)

    gaps: list[dict[str, Any]] = []
    for node_id, node in nodes.items():
        if int(node.get("mode", 0)) != 0:
            continue
        node_type = str(node.get("type", ""))
        lowered = node_type.lower()
        if not any(part in lowered for part in HEAVY_COMPUTE_PARTS):
            continue
        if node_id not in ancestors:
            gaps.append({"id": node_id, "type": node_type})
    return sorted(gaps, key=lambda item: int(item["id"]))


def marker_placements(data: dict[str, Any]) -> set[str]:
    result: set[str] = set()
    for node in data.get("nodes", []):
        marker = (node.get("properties") or {}).get(MARKER_KEY)
        if isinstance(marker, dict) and int(marker.get("version", 0)) == MARKER_VERSION:
            result.add(str(marker.get("placement", "")))
    return result


def build_plan(path: Path, root: Path) -> WorkflowPlan | None:
    data, _, _ = read_json(path)
    reasons = is_heavy_workflow(path, data, root)
    if not reasons:
        return None

    links = root_links(data)
    nodes = node_map(data)
    existing = marker_placements(data)
    placements: list[Placement] = []
    skips: list[str] = []

    if "pre_decode" not in existing:
        placement, skip = find_pre_decode_placement(path, data, links, nodes)
        if placement is not None:
            placements.append(placement)
        elif skip:
            skips.append(skip)
    else:
        skips.append("pre-decode cleanup already marked")

    if "terminal" not in existing:
        placement, skip = find_terminal_placement(data, links, nodes)
        if placement is None:
            dual_placement, dual_skip = find_dual_terminal_placement(path, links, nodes)
            if dual_placement is not None:
                placement = dual_placement
                skip = None
            elif dual_skip and "not defined" not in dual_skip:
                skips.append(dual_skip)
        if placement is not None:
            gaps = placement_barrier_gaps(placement, links, nodes)
            if gaps:
                skips.append(f"terminal cleanup skipped: barrier misses active heavy nodes {gaps}")
            else:
                placements.append(placement)
        elif skip:
            skips.append(skip)
    else:
        skips.append("terminal cleanup already marked")

    # Never place two nodes on the same edge. Pre-decode wins because it protects
    # the model-to-VAE transition; terminal is then omitted for decoder-as-save oddities.
    unique: list[Placement] = []
    seen_links: set[int] = set()
    for placement in placements:
        placement_links = {placement.link_id}
        if placement.secondary_link_id is not None:
            placement_links.add(placement.secondary_link_id)
        if seen_links.intersection(placement_links):
            skips.append(f"overlapping placement on links {sorted(placement_links)} skipped")
            continue
        seen_links.update(placement_links)
        unique.append(placement)

    return WorkflowPlan(path=path, reasons=reasons, placements=unique, skips=skips)


def max_numeric_id(values: Iterable[Any], default: int = 0) -> int:
    ints = [int(value) for value in values]
    return max(ints, default=default)


def node_position(source: dict[str, Any], target: dict[str, Any], ordinal: int) -> list[float]:
    source_pos = source.get("pos", [0, 0])
    target_pos = target.get("pos", [0, 0])
    sx, sy = float(source_pos[0]), float(source_pos[1])
    tx, ty = float(target_pos[0]), float(target_pos[1])
    return [round((sx + tx) / 2 + ordinal * 36, 3), round((sy + ty) / 2 + ordinal * 28, 3)]


def cleanup_node(
    node_id: int,
    input_link_id: int,
    output_link_id: int,
    position: list[float],
    order: int,
    placement: Placement,
    secondary_input_link_id: int | None = None,
    secondary_output_link_id: int | None = None,
) -> dict[str, Any]:
    return {
        "id": node_id,
        "type": CLEANUP_TYPE,
        "pos": position,
        "size": [320, 174],
        "flags": {},
        "order": order,
        "mode": 0,
        "inputs": [
            {"name": "empty_cache", "type": "BOOLEAN", "widget": {"name": "empty_cache"}, "link": None},
            {"name": "gc_collect", "type": "BOOLEAN", "widget": {"name": "gc_collect"}, "link": None},
            {"name": "unload_all_models", "type": "BOOLEAN", "widget": {"name": "unload_all_models"}, "link": None},
            {"name": "any_input", "type": "*", "link": input_link_id},
            {"name": "image_pass", "type": "IMAGE", "link": secondary_input_link_id},
            {"name": "model_pass", "type": "MODEL", "link": None},
        ],
        "outputs": [
            {"name": "any_output", "type": "*", "links": [output_link_id]},
            {"name": "image_pass", "type": "IMAGE", "links": [secondary_output_link_id] if secondary_output_link_id is not None else None},
            {"name": "model_pass", "type": "MODEL", "links": None},
            {"name": "freemem_before", "type": "INT", "links": None},
            {"name": "freemem_after", "type": "INT", "links": None},
        ],
        "properties": {
            "Node name for S&R": CLEANUP_TYPE,
            MARKER_KEY: {
                "version": MARKER_VERSION,
                "placement": placement.kind,
                "reason": placement.reason,
            },
        },
        "widgets_values": [True, True, True],
        "color": "#3b1f2b",
        "bgcolor": "#24131b",
    }


def replace_target_input_link(node: dict[str, Any], slot: int, old_id: int, new_id: int) -> None:
    inputs = node.get("inputs", []) or []
    if slot >= len(inputs):
        raise ValueError(f"target slot {slot} out of range for node {node['id']}")
    if int(inputs[slot].get("link")) != old_id:
        raise ValueError(f"target backreference mismatch for link {old_id}")
    inputs[slot]["link"] = new_id


def insert_placement(data: dict[str, Any], placement: Placement, ordinal: int) -> dict[str, Any]:
    nodes = node_map(data)
    links = root_links(data)
    link_index = {link.link_id: index for index, link in enumerate(links)}
    placement_link_ids = [placement.link_id]
    if placement.secondary_link_id is not None:
        placement_link_ids.append(placement.secondary_link_id)
    for link_id in placement_link_ids:
        if link_id not in link_index:
            raise ValueError(f"placement link {link_id} is missing")

    old = links[link_index[placement.link_id]]
    secondary_old = (
        links[link_index[placement.secondary_link_id]]
        if placement.secondary_link_id is not None
        else None
    )
    source = nodes[old.origin_id]
    target = nodes[old.target_id]
    new_node_id = max(
        int(data.get("last_node_id", 0)),
        max_numeric_id(nodes.keys()),
    ) + 1
    first_new_link_id = max(
        int(data.get("last_link_id", 0)),
        max_numeric_id((link.link_id for link in links)),
    ) + 1
    secondary_new_link_id = first_new_link_id + 1 if secondary_old is not None else None
    max_order = max_numeric_id((node.get("order", 0) for node in nodes.values()))

    # Reuse original links as source -> cleanup so source output
    # backreferences remain valid. New links continue to the old targets.
    raw_link = data["links"][link_index[placement.link_id]]
    raw_link[3] = new_node_id
    raw_link[4] = 3  # any_input follows the three widget inputs.
    data["links"].append(
        [first_new_link_id, new_node_id, 0, old.target_id, old.target_slot, old.link_type]
    )
    replace_target_input_link(target, old.target_slot, old.link_id, first_new_link_id)

    if secondary_old is not None and secondary_new_link_id is not None:
        secondary_target = nodes[secondary_old.target_id]
        secondary_raw = data["links"][link_index[secondary_old.link_id]]
        secondary_raw[3] = new_node_id
        secondary_raw[4] = 4  # image_pass input.
        data["links"].append(
            [
                secondary_new_link_id,
                new_node_id,
                1,
                secondary_old.target_id,
                secondary_old.target_slot,
                secondary_old.link_type,
            ]
        )
        replace_target_input_link(
            secondary_target,
            secondary_old.target_slot,
            secondary_old.link_id,
            secondary_new_link_id,
        )

    node = cleanup_node(
        node_id=new_node_id,
        input_link_id=old.link_id,
        output_link_id=first_new_link_id,
        secondary_input_link_id=secondary_old.link_id if secondary_old is not None else None,
        secondary_output_link_id=secondary_new_link_id,
        position=node_position(source, target, ordinal),
        order=max_order + 1,
        placement=placement,
    )
    data["nodes"].append(node)
    data["last_node_id"] = max(int(data.get("last_node_id", 0)), new_node_id)
    data["last_link_id"] = max(
        int(data.get("last_link_id", 0)),
        secondary_new_link_id or first_new_link_id,
    )

    result = {
        "placement": placement.kind,
        "reason": placement.reason,
        "old_link_id": old.link_id,
        "new_link_id": first_new_link_id,
        "new_node_id": new_node_id,
        "source_node": {"id": old.origin_id, "type": source.get("type")},
        "target_node": {"id": old.target_id, "type": target.get("type")},
    }
    if secondary_old is not None:
        result["secondary"] = {
            "old_link_id": secondary_old.link_id,
            "new_link_id": secondary_new_link_id,
            "source_node": {
                "id": secondary_old.origin_id,
                "type": nodes[secondary_old.origin_id].get("type"),
            },
            "target_node": {
                "id": secondary_old.target_id,
                "type": nodes[secondary_old.target_id].get("type"),
            },
        }
    return result


def remove_marked_cleanup(data: dict[str, Any], node_id: int) -> dict[str, Any]:
    """Remove one marked cleanup node and restore its split link(s)."""
    nodes = node_map(data)
    node = nodes.get(node_id)
    if node is None or str(node.get("type")) != CLEANUP_TYPE:
        raise ValueError(f"cleanup node {node_id} does not exist")
    marker = (node.get("properties") or {}).get(MARKER_KEY)
    if not isinstance(marker, dict):
        raise ValueError(f"node {node_id} is not managed by this tool")

    links = root_links(data)
    links_by_id = {link.link_id: link for link in links}
    raw_by_id = {int(link[0]): link for link in data.get("links", [])}
    removed_link_ids: set[int] = set()
    restored: list[dict[str, Any]] = []

    channels = ((3, 0), (4, 1))  # any and optional image pass-through.
    for input_slot, output_slot in channels:
        inputs = node.get("inputs", []) or []
        outputs = node.get("outputs", []) or []
        if input_slot >= len(inputs) or output_slot >= len(outputs):
            continue
        incoming_id = inputs[input_slot].get("link")
        outgoing_ids = outputs[output_slot].get("links") or []
        if incoming_id is None and not outgoing_ids:
            continue
        if incoming_id is None or len(outgoing_ids) != 1:
            raise ValueError(f"cleanup node {node_id} channel {input_slot}/{output_slot} is not reversible")

        incoming_id = int(incoming_id)
        outgoing_id = int(outgoing_ids[0])
        incoming = links_by_id[incoming_id]
        outgoing = links_by_id[outgoing_id]
        if incoming.target_id != node_id or outgoing.origin_id != node_id:
            raise ValueError(f"cleanup node {node_id} channel links do not terminate at the node")

        raw_incoming = raw_by_id[incoming_id]
        raw_incoming[3] = outgoing.target_id
        raw_incoming[4] = outgoing.target_slot
        raw_incoming[5] = outgoing.link_type
        target = nodes[outgoing.target_id]
        replace_target_input_link(target, outgoing.target_slot, outgoing_id, incoming_id)
        removed_link_ids.add(outgoing_id)
        restored.append(
            {
                "incoming_link_id": incoming_id,
                "removed_link_id": outgoing_id,
                "source_node_id": incoming.origin_id,
                "target_node_id": outgoing.target_id,
            }
        )

    data["links"] = [
        link for link in data.get("links", []) if int(link[0]) not in removed_link_ids
    ]
    data["nodes"] = [item for item in data.get("nodes", []) if int(item["id"]) != node_id]
    return {"removed_node_id": node_id, "marker": marker, "restored_channels": restored}


def validate_array_graph(graph: dict[str, Any], label: str) -> list[str]:
    errors: list[str] = []
    try:
        nodes = node_map(graph)
        links = root_links(graph)
    except Exception as exc:
        return [f"{label}: {exc}"]

    link_ids = [link.link_id for link in links]
    if len(link_ids) != len(set(link_ids)):
        errors.append(f"{label}: duplicate link ids")
    links_by_id = {link.link_id: link for link in links}

    for link in links:
        if link.origin_id not in nodes or link.target_id not in nodes:
            errors.append(f"{label}: dangling link {link.link_id}")
            continue
        source = nodes[link.origin_id]
        target = nodes[link.target_id]
        outputs = source.get("outputs", []) or []
        inputs = target.get("inputs", []) or []
        if link.origin_slot >= len(outputs):
            errors.append(f"{label}: link {link.link_id} origin slot out of range")
        else:
            output_links = outputs[link.origin_slot].get("links") or []
            if link.link_id not in [int(value) for value in output_links]:
                errors.append(f"{label}: link {link.link_id} missing source backreference")
        if link.target_slot >= len(inputs):
            errors.append(f"{label}: link {link.link_id} target slot out of range")
        elif inputs[link.target_slot].get("link") is None or int(inputs[link.target_slot]["link"]) != link.link_id:
            errors.append(f"{label}: link {link.link_id} target backreference mismatch")

    for node in nodes.values():
        for slot, output in enumerate(node.get("outputs", []) or []):
            for value in output.get("links") or []:
                link_id = int(value)
                link = links_by_id.get(link_id)
                if link is None:
                    errors.append(f"{label}: node {node['id']} output references missing link {link_id}")
                elif link.origin_id != int(node["id"]) or link.origin_slot != slot:
                    errors.append(f"{label}: node {node['id']} output link {link_id} points elsewhere")
        for slot, input_item in enumerate(node.get("inputs", []) or []):
            value = input_item.get("link")
            if value is None:
                continue
            link_id = int(value)
            link = links_by_id.get(link_id)
            if link is None:
                errors.append(f"{label}: node {node['id']} input references missing link {link_id}")
            elif link.target_id != int(node["id"]) or link.target_slot != slot:
                errors.append(f"{label}: node {node['id']} input link {link_id} points elsewhere")

    max_node = max_numeric_id(nodes.keys())
    max_link = max_numeric_id(link_ids)
    if int(graph.get("last_node_id", max_node)) < max_node:
        errors.append(f"{label}: last_node_id is below max node id")
    if int(graph.get("last_link_id", max_link)) < max_link:
        errors.append(f"{label}: last_link_id is below max link id")

    for node in nodes.values():
        if str(node.get("type")) != CLEANUP_TYPE:
            continue
        marker = (node.get("properties") or {}).get(MARKER_KEY)
        if not isinstance(marker, dict):
            continue
        if node.get("widgets_values") != [True, True, True]:
            errors.append(f"{label}: cleanup node {node['id']} widgets are not all enabled")
        inputs = node.get("inputs", []) or []
        outputs = node.get("outputs", []) or []
        if len(inputs) < 4 or inputs[3].get("link") is None:
            errors.append(f"{label}: cleanup node {node['id']} lacks any_input link")
        if not outputs or not outputs[0].get("links"):
            errors.append(f"{label}: cleanup node {node['id']} lacks any_output links")

    return errors


def validate_subgraph(graph: dict[str, Any], label: str) -> list[str]:
    links = graph.get("links", []) or []
    if not links:
        return []
    if isinstance(links[0], list):
        return validate_array_graph(graph, label)
    if not isinstance(links[0], dict):
        return [f"{label}: unsupported subgraph link schema"]

    errors: list[str] = []
    try:
        nodes = node_map(graph)
    except Exception as exc:
        return [f"{label}: {exc}"]
    ids: set[int] = set()
    for item in links:
        link_id = int(item["id"])
        if link_id in ids:
            errors.append(f"{label}: duplicate link id {link_id}")
        ids.add(link_id)
        origin = int(item["origin_id"])
        target = int(item["target_id"])
        if origin != -10 and origin not in nodes:
            errors.append(f"{label}: link {link_id} missing origin {origin}")
        if target != -20 and target not in nodes:
            errors.append(f"{label}: link {link_id} missing target {target}")
        if origin in nodes:
            slot = int(item["origin_slot"])
            outputs = nodes[origin].get("outputs", []) or []
            if slot >= len(outputs) or link_id not in [int(v) for v in outputs[slot].get("links") or []]:
                errors.append(f"{label}: link {link_id} origin backreference mismatch")
        if target in nodes:
            slot = int(item["target_slot"])
            inputs = nodes[target].get("inputs", []) or []
            if slot >= len(inputs) or inputs[slot].get("link") is None or int(inputs[slot]["link"]) != link_id:
                errors.append(f"{label}: link {link_id} target backreference mismatch")
    return errors


def validate_workflow(data: dict[str, Any], label: str) -> list[str]:
    errors = validate_array_graph(data, f"{label}:root")
    definitions = data.get("definitions")
    if isinstance(definitions, dict):
        for index, graph in enumerate(definitions.get("subgraphs", []) or []):
            if isinstance(graph, dict):
                errors.extend(validate_subgraph(graph, f"{label}:subgraph[{index}]"))
    return errors


def atomic_write(path: Path, payload: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as handle:
        temp_path = Path(handle.name)
        handle.write(payload)
        handle.flush()
    temp_path.replace(path)


def make_backup(paths: list[Path], root: Path, backup_path: Path) -> None:
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(backup_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in paths:
            archive.write(path, arcname=path.relative_to(root).as_posix())


def scan(root: Path) -> list[WorkflowPlan]:
    plans: list[WorkflowPlan] = []
    for path in sorted(root.rglob("*.json"), key=lambda item: item.as_posix().lower()):
        plan = build_plan(path, root)
        if plan is not None:
            plans.append(plan)
    return plans


def main() -> int:
    args = parse_args()
    root = args.root.resolve()
    backup_dir = args.backup_dir.resolve()
    timestamp = args.timestamp or datetime.now().strftime("%Y%m%d-%H%M%S")

    if not root.is_dir():
        print(f"Workflow root does not exist: {root}", file=sys.stderr)
        return 2

    plans = scan(root)
    actionable = [plan for plan in plans if plan.placements]
    report: dict[str, Any] = {
        "version": 1,
        "timestamp": timestamp,
        "root": str(root),
        "mode": "apply" if args.apply else "dry-run",
        "scanned_json": len(list(root.rglob("*.json"))),
        "critical_candidates": len(plans),
        "actionable_files": len(actionable),
        "files": [],
    }

    for plan in plans:
        report["files"].append(
            {
                "path": plan.path.relative_to(root).as_posix(),
                "reasons": plan.reasons,
                "placements": [placement.__dict__ for placement in plan.placements],
                "skips": plan.skips,
            }
        )

    if not args.apply:
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return 0

    backup_path = backup_dir / f"DaWasteh-before-memory-cleanup-{timestamp}.zip"
    audit_path = backup_dir / f"DaWasteh-memory-cleanup-audit-{timestamp}.json"
    make_backup([plan.path for plan in actionable], root, backup_path)

    changed: list[Path] = []
    try:
        for plan in actionable:
            original, had_bom, pretty = read_json(plan.path)
            updated = copy.deepcopy(original)
            changes: list[dict[str, Any]] = []
            for ordinal, placement in enumerate(plan.placements):
                changes.append(insert_placement(updated, placement, ordinal))
            errors = validate_workflow(updated, plan.path.relative_to(root).as_posix())
            if errors:
                raise ValueError("; ".join(errors))
            atomic_write(plan.path, encode_json(updated, had_bom=had_bom, pretty=pretty))
            changed.append(plan.path)
            for entry in report["files"]:
                if entry["path"] == plan.path.relative_to(root).as_posix():
                    entry["changes"] = changes
                    entry["validation"] = "passed"
                    break

        # Re-read every changed file from disk and validate the persisted bytes.
        persisted_errors: list[str] = []
        for path in changed:
            data, _, _ = read_json(path)
            persisted_errors.extend(validate_workflow(data, path.relative_to(root).as_posix()))
        if persisted_errors:
            raise ValueError("persisted validation failed: " + "; ".join(persisted_errors))

    except Exception:
        # Restore every actionable file, including files not yet written, so the
        # operation is all-or-nothing.
        with zipfile.ZipFile(backup_path, "r") as archive:
            for member in archive.namelist():
                destination = root / Path(member)
                destination.parent.mkdir(parents=True, exist_ok=True)
                with archive.open(member) as source, destination.open("wb") as target:
                    shutil.copyfileobj(source, target)
        raise

    report["backup"] = str(backup_path)
    report["changed_files"] = len(changed)
    report["inserted_nodes"] = sum(len(plan.placements) for plan in actionable)
    report["validation"] = "passed"
    audit_path.parent.mkdir(parents=True, exist_ok=True)
    atomic_write(
        audit_path,
        (json.dumps(report, ensure_ascii=False, indent=2) + "\n").encode("utf-8"),
    )

    print(
        json.dumps(
            {
                "backup": str(backup_path),
                "audit": str(audit_path),
                "changed_files": len(changed),
                "inserted_nodes": report["inserted_nodes"],
                "critical_candidates": len(plans),
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
