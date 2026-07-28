#!/usr/bin/env python3
"""Static validation for the curated ComfyUI workflow collection."""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path
from typing import Any, Iterable

from refine_workflows import DOC_TYPES, NOTE_PROPERTY, REFINEMENT_KEY, graph_children, is_target

BLACKLIST = ("cudaexecutionprovider", "nunchaku", "svdq", "nvfp4", "tensorrt", "xformers", "flash_attn")


def load(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def graph_locator(workflow: dict[str, Any]) -> Iterable[tuple[str, dict[str, Any]]]:
    yield "root", workflow
    def descend(graph: dict[str, Any], prefix: str):
        for sg in graph.get("definitions", {}).get("subgraphs", []):
            loc = f"{prefix}/subgraph:{sg.get('id')}"
            yield loc, sg
            yield from descend(sg, loc)
    yield from descend(workflow, "root")


def link_id(entry: Any) -> Any:
    if isinstance(entry, list) and entry:
        return entry[0]
    if isinstance(entry, dict):
        return entry.get("id")
    return None


def endpoints(entry: Any) -> tuple[Any, Any]:
    if isinstance(entry, list) and len(entry) >= 5:
        return entry[1], entry[3]
    if isinstance(entry, dict):
        origin = entry.get("origin_id", entry.get("originId", entry.get("from", entry.get("source"))))
        target = entry.get("target_id", entry.get("targetId", entry.get("to", entry.get("target"))))
        if isinstance(origin, dict): origin = origin.get("node_id", origin.get("nodeId", origin.get("id")))
        if isinstance(target, dict): target = target.get("node_id", target.get("nodeId", target.get("id")))
        return origin, target
    return None, None


def rect(node: dict[str, Any]) -> tuple[float, float, float, float]:
    x, y = (list(node.get("pos", [0, 0])) + [0, 0])[:2]
    w, h = (list(node.get("size", [260, 120])) + [260, 120])[:2]
    return float(x), float(y), float(x)+float(w), float(y)+float(h)


def overlaps(a, b) -> bool:
    return a[0] < b[2] and a[2] > b[0] and a[1] < b[3] and a[3] > b[1]


def git_head_json(path: Path) -> dict[str, Any]:
    raw = subprocess.check_output(
        ["git", "show", f"HEAD:{path.as_posix()}"], text=True, encoding="utf-8",
        stderr=subprocess.DEVNULL,
    )
    return json.loads(raw)


def validate_graph(path: Path, locator: str, graph: dict[str, Any], errors: list[str]) -> tuple[int, int, int]:
    nodes = graph.get("nodes", [])
    ids = [n.get("id") for n in nodes]
    if len(ids) != len(set(ids)):
        errors.append(f"{path}:{locator}: duplicate node IDs")
    numeric = [i for i in ids if isinstance(i, int)]
    if numeric and int(graph.get("last_node_id", -1)) < max(numeric):
        errors.append(f"{path}:{locator}: last_node_id below maximum")

    targets = [n for n in nodes if is_target(n) and not n.get("properties", {}).get("dawasteh_generated_note")]
    notes = [n for n in nodes if n.get("properties", {}).get("dawasteh_generated_note")]
    by_target: dict[Any, list[dict[str, Any]]] = {}
    for note in notes:
        if note.get("type") != "MarkdownNote":
            errors.append(f"{path}:{locator}: generated note {note.get('id')} is not MarkdownNote")
        by_target.setdefault(note.get("properties", {}).get(NOTE_PROPERTY), []).append(note)
    target_ids = {n.get("id") for n in targets}
    if set(by_target) != target_ids:
        errors.append(f"{path}:{locator}: note target set differs (missing={target_ids-set(by_target)}, extra={set(by_target)-target_ids})")
    for target, matches in by_target.items():
        if len(matches) != 1:
            errors.append(f"{path}:{locator}: target {target} has {len(matches)} notes")
    marker = graph.get("extra", {}).get(REFINEMENT_KEY, {})
    if marker.get("generated_notes") != len(notes):
        errors.append(f"{path}:{locator}: refinement marker note count mismatch")

    link_entries = graph.get("links", []) or []
    if isinstance(link_entries, dict):
        entries = list(link_entries.values())
    else:
        entries = list(link_entries)
    link_ids = [link_id(e) for e in entries]
    if len(link_ids) != len(set(link_ids)):
        errors.append(f"{path}:{locator}: duplicate link IDs")
    known_links = set(link_ids)
    node_ids = set(ids)
    interface_ids = set()
    for key in ("inputNode", "outputNode"):
        interface = graph.get(key)
        if isinstance(interface, dict):
            interface_ids.add(interface.get("id"))
    allowed_nodes = node_ids | interface_ids | {None}
    for entry in entries:
        origin, target = endpoints(entry)
        if origin not in allowed_nodes or target not in allowed_nodes:
            errors.append(f"{path}:{locator}: link {link_id(entry)} endpoint missing ({origin}->{target})")
    for node in nodes:
        for inp in node.get("inputs", []) or []:
            if inp.get("link") is not None and inp.get("link") not in known_links:
                errors.append(f"{path}:{locator}: node {node.get('id')} input link {inp.get('link')} missing")
        for out in node.get("outputs", []) or []:
            for lid in out.get("links") or []:
                if lid not in known_links:
                    errors.append(f"{path}:{locator}: node {node.get('id')} output link {lid} missing")

    # Every node rectangle must be collision-free. Touching edges is allowed.
    rects = [(n.get("id"), rect(n)) for n in nodes]
    for i, (aid, ar) in enumerate(rects):
        for bid, br in rects[i+1:]:
            if overlaps(ar, br):
                errors.append(f"{path}:{locator}: overlapping nodes {aid} and {bid}")
                if sum("overlapping nodes" in e for e in errors) > 30:
                    break
        if sum("overlapping nodes" in e for e in errors) > 30:
            break
    return len(nodes), len(notes), len(entries)


def compare_head(path: Path, current: dict[str, Any], errors: list[str]) -> tuple[int, int]:
    head = git_head_json(path)
    head_graphs = dict(graph_locator(head))
    current_graphs = dict(graph_locator(current))
    if set(head_graphs) != set(current_graphs):
        errors.append(f"{path}: graph locator set changed")
        return 0, 0
    old_nodes = old_links = 0
    for locator, before in head_graphs.items():
        after = current_graphs[locator]
        old_nodes += len(before.get("nodes", []))
        old_links += len(before.get("links", {}) or [])
        if before.get("links", []) != after.get("links", []):
            errors.append(f"{path}:{locator}: existing links changed")
        before_pix = {n["id"]: n for n in before.get("nodes", []) if n.get("type") == "PixaromaNote"}
        after_pix = {n["id"]: n for n in after.get("nodes", []) if n.get("type") == "PixaromaNote"}
        if before_pix != after_pix:
            errors.append(f"{path}:{locator}: PixaromaNote dictionary changed")
        if before.get("last_link_id") != after.get("last_link_id"):
            errors.append(f"{path}:{locator}: last_link_id changed")
        if before.get("version") != after.get("version"):
            errors.append(f"{path}:{locator}: graph version changed")
    return old_nodes, old_links


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--workflows", type=Path, default=Path("workflows"))
    parser.add_argument("--against-head", action="store_true")
    args = parser.parse_args()
    paths = sorted(args.workflows.rglob("*.json"))
    errors: list[str] = []
    totals = {"graphs": 0, "nodes": 0, "notes": 0, "links": 0, "timers": 0, "old_nodes": 0, "old_links": 0}
    for path in paths:
        try:
            workflow = load(path)
        except Exception as exc:
            errors.append(f"{path}: JSON error: {exc}")
            continue

        path_errors: list[str] = []
        if workflow.get("version") != 0.4:
            path_errors.append(f"{path}: root version is not 0.4")
        timers = sum(1 for n in workflow.get("nodes", []) if n.get("type") == "PixaromaRunTimer")
        totals["timers"] += timers
        if timers != 1:
            path_errors.append(f"{path}: root timer count={timers}")
        raw_lower = path.read_text(encoding="utf-8").lower()
        for token in BLACKLIST:
            if token in raw_lower:
                path_errors.append(f"{path}: RDNA4 blacklist token {token}")
        for locator, graph in graph_locator(workflow):
            totals["graphs"] += 1
            n, notes, links = validate_graph(path, locator, graph, path_errors)
            totals["nodes"] += n; totals["notes"] += notes; totals["links"] += links

        if args.against_head:
            try:
                head_workflow = git_head_json(path)
                baseline_errors: list[str] = []
                if head_workflow.get("version") != 0.4:
                    baseline_errors.append(f"{path}: root version is not 0.4")
                head_timers = sum(1 for n in head_workflow.get("nodes", []) if n.get("type") == "PixaromaRunTimer")
                if head_timers != 1:
                    baseline_errors.append(f"{path}: root timer count={head_timers}")
                head_raw_lower = json.dumps(head_workflow, ensure_ascii=False).lower()
                for token in BLACKLIST:
                    if token in head_raw_lower:
                        baseline_errors.append(f"{path}: RDNA4 blacklist token {token}")
                for locator, graph in graph_locator(head_workflow):
                    validate_graph(path, locator, graph, baseline_errors)
                baseline_set = set(baseline_errors)
                errors.extend(error for error in path_errors if error not in baseline_set)

                old_nodes, old_links = compare_head(path, workflow, errors)
                totals["old_nodes"] += old_nodes; totals["old_links"] += old_links
            except subprocess.CalledProcessError:
                # A workflow absent from HEAD is a newly added collection item;
                # validate every issue because no baseline exists to grandfather it.
                errors.extend(path_errors)
        else:
            errors.extend(path_errors)
    expected = {"files": 186, "graphs": 222, "nodes": 6083, "notes": 2709, "links": 3939, "timers": 186}
    actual = {"files": len(paths), **{k: totals[k] for k in ("graphs", "nodes", "notes", "links", "timers")}}
    for key, value in expected.items():
        if actual[key] != value:
            errors.append(f"collection total {key}={actual[key]}, expected {value}")
    if args.against_head and (totals["old_nodes"] == 0 or totals["old_links"] == 0):
        errors.append("HEAD comparison produced no baseline nodes or links")
    print(json.dumps({"actual": actual, "head": {"nodes": totals["old_nodes"], "links": totals["old_links"]}, "errors": len(errors)}, indent=2))
    if errors:
        print("\n".join(errors[:100]), file=sys.stderr)
        if len(errors) > 100: print(f"... {len(errors)-100} more errors", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
