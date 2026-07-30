#!/usr/bin/env python3
"""Deterministically add compact parameter notes and spacious layouts to ComfyUI workflows.

The tool reads ComfyUI's official/custom-node schema from /object_info. It never
queues work or changes the server. Graphs marked with REFINEMENT_KEY are skipped,
which makes repeated execution idempotent.
"""
from __future__ import annotations

import argparse
import copy
import json
import math
import re
import textwrap
import urllib.request
from pathlib import Path
from typing import Any, Iterable

REFINEMENT_KEY = "dawasteh_workflow_refinement"
REFINEMENT_VERSION = 1
NOTE_PROPERTY = "dawasteh_note_for"
DOC_TYPES = {"Note", "MarkdownNote", "PixaromaNote"}
WIDGET_TYPES = {"INT", "FLOAT", "STRING", "BOOLEAN", "COMBO"}
DYNAMIC_TYPE = "COMFY_DYNAMICCOMBO_V3"
X_SCALE = 2.45
Y_SCALE = 2.35
GAP = 34.0


def is_pixaroma(node: dict[str, Any]) -> bool:
    node_type = str(node.get("type", ""))
    cnr = str(node.get("properties", {}).get("cnr_id", ""))
    return "pixaroma" in node_type.lower() or cnr.lower() == "comfyui-pixaroma"


def is_documentation(node: dict[str, Any]) -> bool:
    return str(node.get("type", "")) in DOC_TYPES


def is_target(node: dict[str, Any]) -> bool:
    return not is_documentation(node) and not is_pixaroma(node)


def graph_children(workflow: dict[str, Any]) -> Iterable[dict[str, Any]]:
    yield workflow
    for subgraph in workflow.get("definitions", {}).get("subgraphs", []):
        yield from graph_children(subgraph)


def fetch_object_info(url: str) -> dict[str, Any]:
    with urllib.request.urlopen(url, timeout=30) as response:
        return json.load(response)


def _ordered_inputs(schema: dict[str, Any]) -> Iterable[tuple[str, Any]]:
    inputs = schema.get("input", {})
    order = schema.get("input_order", {})
    for section in ("required", "optional"):
        values = inputs.get(section, {})
        names = order.get(section) or list(values)
        for name in names:
            if name in values:
                yield name, values[name]


def _normalize_spec(raw: Any) -> tuple[Any, dict[str, Any]]:
    if not isinstance(raw, (list, tuple)) or not raw:
        return raw, {}
    kind = raw[0]
    cfg = raw[1] if len(raw) > 1 and isinstance(raw[1], dict) else {}
    return kind, cfg


def _is_widget(kind: Any, cfg: dict[str, Any]) -> bool:
    if cfg.get("forceInput") or cfg.get("force_input"):
        return False
    return (
        isinstance(kind, list) or kind in WIDGET_TYPES or kind == DYNAMIC_TYPE
        or "default" in cfg or cfg.get("socketless") or cfg.get("image_upload")
    )


def _format_children(cfg: dict[str, Any], selected: Any) -> list[tuple[str, Any, dict[str, Any]]]:
    """Decode VideoHelperSuite's format-dependent widgets."""
    result = []
    for raw in cfg.get("formats", {}).get(selected, []):
        if not isinstance(raw, list) or len(raw) < 2:
            continue
        name = raw[0]
        kind = raw[1]
        child_cfg = raw[2] if len(raw) > 2 and isinstance(raw[2], dict) else {}
        result.append((name, kind, child_cfg))
    return result


def map_widget_values(node: dict[str, Any], schema: dict[str, Any]) -> tuple[list[dict[str, Any]], list[Any]]:
    """Map persisted values to schema widgets, including dynamic/control widgets.

    Returns (mapped widgets, ignored trailing UI state). Dict-style persisted
    values are mapped by key. List-style values are consumed according to the
    recursive schema and ComfyUI's control_after_generate insertion rule.
    """
    persisted = node.get("widgets_values", [])
    mapped: list[dict[str, Any]] = []

    if isinstance(persisted, dict):
        for name, raw in _ordered_inputs(schema):
            kind, cfg = _normalize_spec(raw)
            if not _is_widget(kind, cfg):
                continue
            if kind == DYNAMIC_TYPE:
                selected = persisted.get(name, cfg.get("default"))
                mapped.append({"name": name, "kind": kind, "config": cfg, "value": selected})
                for option in cfg.get("options", []):
                    if option.get("key") == selected:
                        child_schema = {"input": option.get("inputs", {}), "input_order": {}}
                        child, _ = map_widget_values({"widgets_values": persisted}, child_schema)
                        mapped.extend(child)
                        break
            elif name in persisted:
                mapped.append({"name": name, "kind": kind, "config": cfg, "value": persisted[name]})
                for child_name, child_kind, child_cfg in _format_children(cfg, persisted[name]):
                    if child_name in persisted:
                        mapped.append({"name": child_name, "kind": child_kind, "config": child_cfg, "value": persisted[child_name]})
        ignored = [{k: v} for k, v in persisted.items() if k not in {m["name"] for m in mapped}]
        return mapped, ignored

    values = list(persisted) if isinstance(persisted, list) else []

    # Modern workflow JSON records the widgets that are actually visible on a
    # concrete node. Prefer that exact order when it fully explains the saved
    # value count; this handles nodes whose optional widgets disappeared after
    # connections or version upgrades (for example LTXDirectorGuide). Fall back
    # to object_info expansion when frontend-only/dynamic widgets are omitted
    # from node.inputs (for example TextGenerate).
    specs = {name: raw for name, raw in _ordered_inputs(schema)}
    visible_names = []
    for item in node.get("inputs", []) or []:
        widget = item.get("widget")
        name = widget.get("name") if isinstance(widget, dict) else None
        if name and name in specs and name not in visible_names:
            visible_names.append(name)
    if visible_names:
        control_count = 0
        for name in visible_names:
            kind, cfg = _normalize_spec(specs[name])
            if cfg.get("control_after_generate") or cfg.get("controlAfterGenerate") or (kind == "INT" and "seed" in name.lower()):
                control_count += 1
        if len(values) in {len(visible_names), len(visible_names) + control_count}:
            schema = {
                "input": {"required": {name: specs[name] for name in visible_names}},
                "input_order": {"required": visible_names},
            }

    index = 0

    def consume_schema(local_schema: dict[str, Any]) -> None:
        nonlocal index
        for name, raw in _ordered_inputs(local_schema):
            kind, cfg = _normalize_spec(raw)
            if not _is_widget(kind, cfg):
                continue
            value = values[index] if index < len(values) else cfg.get("default")
            if index < len(values):
                index += 1
            mapped.append({"name": name, "kind": kind, "config": cfg, "value": value})
            explicit_control = cfg.get("control_after_generate") or cfg.get("controlAfterGenerate")
            # Older/custom schemas sometimes omit the flag although the frontend
            # persisted the control widget immediately after a seed value.
            inferred_control = (
                kind == "INT" and "seed" in name.lower() and index < len(values)
                and values[index] in {"fixed", "randomize", "increment", "decrement"}
            )
            if explicit_control or inferred_control:
                control = values[index] if index < len(values) else "fixed"
                if index < len(values):
                    index += 1
                mapped.append({
                    "name": f"{name}_control_after_generate",
                    "kind": "COMBO",
                    "config": {"tooltip": "Verhalten des Werts nach jedem Workflow-Lauf."},
                    "value": control,
                })
            if kind == DYNAMIC_TYPE:
                for option in cfg.get("options", []):
                    if option.get("key") == value:
                        child_schema = {"input": option.get("inputs", {}), "input_order": {}}
                        consume_schema(child_schema)
                        break

    consume_schema(schema)
    # Frontend primitive nodes intentionally have no backend object_info entry.
    if not mapped and values:
        mapped.append({"name": "value", "kind": type(values[0]).__name__.upper(), "config": {"tooltip": "Direkter Primitive-Wert für verbundene Nodes."}, "value": values[0]})
        index = 1
        if (
            index < len(values)
            and isinstance(values[index], str)
            and values[index] in {"fixed", "randomize", "increment", "decrement"}
        ):
            mapped.append({"name": "value_control_after_generate", "kind": "COMBO", "config": {"tooltip": "Verhalten des Werts nach jedem Workflow-Lauf."}, "value": values[index]})
            index += 1
    return mapped, values[index:]


def _short(value: Any, limit: int = 110) -> str:
    if isinstance(value, str):
        value = value.replace("\n", " ↵ ")
    elif isinstance(value, (dict, list)):
        value = json.dumps(value, ensure_ascii=False, separators=(",", ":"))
    text = str(value)
    return text if len(text) <= limit else text[: limit - 1] + "…"


def _effect(name: str, kind: Any, cfg: dict[str, Any], value: Any) -> str:
    n = name.lower()
    if n.endswith("_control_after_generate"):
        return "`randomize` erzeugt pro Lauf eine neue Variation; `fixed` behält den Wert; andere Modi ändern ihn schrittweise."
    if kind == "BOOLEAN" or isinstance(value, bool):
        if "unload" in n:
            return "AN gibt Modell-/VRAM-Speicher nach dem Lauf frei, macht den nächsten Lauf aber langsamer; AUS hält das Modell für Wiederholungen im Cache."
        if "offload" in n:
            return "AN spart VRAM durch Auslagern in RAM, ist aber langsamer; AUS ist schneller und braucht mehr VRAM."
        if "gradient_checkpoint" in n:
            return "AN spart Trainings-VRAM durch Neuberechnung, erhöht aber die Laufzeit; AUS ist schneller und speicherintensiver."
        if "quantized_backward" in n:
            return "AN nutzt den quantisierten Rückwärtsweg für kompatible quantisierte Modelle; AUS verwendet den normalen, präziseren Trainingspfad."
        if "bucket_mode" in n:
            return "AN trainiert vorgruppierte Auflösungs-Buckets effizienter; AUS verarbeitet die Latents ohne Bucket-Gruppierung."
        if "bypass_mode" in n:
            return "AN injiziert Adapter über Forward-Hooks und hilft bei quantisierten/ausgelagerten Gewichten; AUS verändert die normalen Weight-Wrapper."
        if "invert" in n:
            return "AN kehrt Maske oder Ausgabe um; AUS behält Vordergrund und Hintergrund in der ursprünglichen Zuordnung."
        return "AN aktiviert die Funktion; AUS deaktiviert sie bzw. verwendet den Standardpfad."
    if isinstance(kind, list) or kind == "COMBO":
        # Do not persist the size of dynamic model/file combo lists: those
        # change whenever local assets are added and would make regeneration
        # non-deterministic without adding useful parameter guidance.
        suffix = ""
        if any(token in n for token in ("model", "unet", "checkpoint", "ckpt", "vae", "clip", "lora")):
            return f"Die Auswahl wechselt die geladene Ressource und beeinflusst VRAM-Bedarf, Qualität und Kompatibilität{suffix}."
        if any(token in n for token in ("dtype", "data_type", "precision")):
            return f"Die Auswahl ändert Rechenpräzision, Speicherbedarf und Hardware-Kompatibilität{suffix}."
        if any(token in n for token in ("device", "backend", "provider")):
            return f"Die Auswahl bestimmt das Rechen-Backend (z. B. GPU oder CPU) und damit Geschwindigkeit und Kompatibilität{suffix}."
        if "sampler" in n or "scheduler" in n:
            return f"Die Auswahl ändert den Rauschabbau und damit Stil, Laufzeit und Ergebnischarakter{suffix}."
        if any(token in n for token in ("resize", "upscale", "interpolation")):
            return f"Die Auswahl ändert die Skalierungsmethode und damit Schärfe, Kanten und mögliche Artefakte{suffix}."
        if "mode" in n or "format" in n:
            return f"Die Auswahl bestimmt den Verarbeitungs- bzw. Dateimodus und dessen Kompatibilität{suffix}."
        return f"Die Auswahl wechselt Algorithmus/Modus und damit Qualität, Geschwindigkeit oder Kompatibilität{suffix}."
    if "learning_rate" in n or n in {"lr"}:
        return "Höher lernt schneller, kann aber instabil werden/übersteuern; niedriger ist stabiler, benötigt mehr Schritte."
    if "rank" in n:
        return "Höher erhöht Kapazität, Dateigröße und Speicherbedarf; niedriger ist kompakter, kann Details unterlernen."
    if "alpha" in n:
        return "Höher skaliert den Adapter stärker; niedriger wirkt sanfter. Häufig wird Alpha passend zum Rank gewählt."
    if "dropout" in n:
        return "Höher regularisiert stärker gegen Overfitting; niedriger passt sich enger an die Trainingsdaten an."
    if "gradient_accum" in n:
        return "Höher vergrößert die effektive Batchgröße bei ähnlichem VRAM, verlängert aber jeden Optimizer-Schritt."
    if "warmup" in n:
        return "Höher fährt die Lernrate länger sanft hoch und stabilisiert den Start, verkürzt aber die volle Lernphase; niedriger erreicht die Ziel-Lernrate früher."
    if "save_every" in n:
        return "Höher speichert seltener und spart Speicherplatz/I/O; niedriger erzeugt häufiger Zwischenstände."
    if "weight_decay" in n:
        return "Höher regularisiert Gewichte stärker gegen Overfitting; zu hoch kann Details unterlernen."
    if "max_grad_norm" in n:
        return "Niedriger begrenzt Gradientenspitzen stärker; höher greift seltener ein, kann aber Instabilität zulassen."
    if "checkpoint_depth" in n:
        return "Höher checkpointet tiefer verschachtelte Module und verändert den VRAM-/Laufzeit-Kompromiss; 1 ist der konservative Start."
    if n in {"batch", "batch_size", "batch_count"} or "batch_size" in n:
        return "Höher verarbeitet mehr Beispiele parallel und braucht mehr VRAM; niedriger spart Speicher."
    if "start_at_step" in n:
        return "Höher startet später im Rauschabbau und überspringt frühe Schritte; niedriger beginnt näher am vollen Rauschen."
    if "end_at_step" in n:
        return "Höher denoisiert länger bis zu einem späteren Schritt; niedriger beendet die Stufe früher und lässt mehr Rest-Rauschen für Folgestufen."
    if any(x in n for x in ("steps", "epochs", "iterations")):
        return "Höher erhöht Laufzeit und mögliche Ausarbeitung, kann aber übertrainieren; niedriger ist schneller."
    if "cfg" in n or "guidance" in n:
        return "Höher folgt der Vorgabe stärker, kann unnatürlich/übersättigt wirken; niedriger lässt mehr Freiheit."
    if "repetition_penalty" in n:
        return "Über 1 unterdrückt Wiederholungen zunehmend; zu hoch kann Wörter, Klang oder Kohärenz beschädigen, nahe 1 bleibt neutral."
    if "presence_penalty" in n:
        return "Höher bevorzugt neue Inhalte statt bereits verwendeter Tokens; 0 lässt die ursprüngliche Modellverteilung unverändert."
    if any(x in n for x in ("denoise", "strength", "weight", "influence")):
        return "Höher verstärkt den Einfluss bzw. die Veränderung; niedriger bewahrt Eingang/Grundmodell stärker."
    if "scale_by" in n or n == "scale":
        return "Höher vergrößert das Ergebnis proportional und erhöht Pixelzahl, Zeit und VRAM; unter 1 verkleinert es."
    if any(x in n for x in ("width", "height", "resolution", "process_res", "megapixel", "tile_size", "guide_size", "max_size")):
        return "Höher liefert mehr Auflösung/Fläche, benötigt aber mehr VRAM und Zeit; niedriger ist schneller und sparsamer."
    if "bit_depth" in n:
        return "Höher bewahrt feinere Farb-/Dynamikabstufungen, vergrößert aber Datenmenge und Datei; niedriger ist kompakter."
    if "frame_rate" in n or n == "fps":
        return "Höher wirkt flüssiger und erzeugt/verarbeitet mehr Frames pro Sekunde; niedriger spart Rechenzeit/Dateigröße."
    if re.search(r"insert_frame_?\d*$", n):
        return "Höher setzt das Guide-Bild später auf der Frame-Timeline ein; niedriger positioniert es früher."
    if re.search(r"insert_second_?\d*$", n):
        return "Höher setzt das Guide-Bild später in Sekunden ein; niedriger positioniert es näher am Anfang."
    if any(x in n for x in ("frames", "duration", "length", "seconds")):
        return "Höher erzeugt/verarbeitet mehr bzw. längeren Inhalt und steigert Zeit/VRAM; niedriger verkürzt ihn."
    if "temperature" in n:
        return "Höher macht die Auswahl vielfältiger/zufälliger; niedriger wird deterministischer und konservativer."
    if n == "top_k":
        return "Höher erlaubt mehr Kandidaten und Vielfalt; niedriger begrenzt die Auswahl stärker."
    if n in {"top_p", "min_p"}:
        return "Ändert den Wahrscheinlichkeitsfilter: großzügiger erhöht Vielfalt, strenger erhöht Fokus/Konsistenz."
    if "seed" in n:
        return "Ein anderer Seed erzeugt eine andere Variation; derselbe Seed unterstützt reproduzierbare Ergebnisse."
    if any(x in n for x in ("threshold", "sensitivity")):
        return "Eine empfindlichere/niedrigere Schwelle erkennt mehr schwache Treffer, aber auch Fehlalarme; eine strengere/höhere Schwelle liefert weniger, sicherere Treffer."
    if "max_objects" in n or "num_images" in n:
        return "Höher erlaubt mehr Objekte/Bilder und erhöht Rechenaufwand; niedriger begrenzt die Verarbeitung."
    if "detect_interval" in n:
        return "Höher analysiert seltener und ist schneller, kann aber kurze Änderungen verpassen; niedriger prüft häufiger."
    if any(x in n for x in ("overlap", "feather", "blur")):
        return "Höher verbreitert Übergänge/Überlappung und reduziert harte Nähte, kostet aber mehr Verarbeitung und kann Details weicher machen."
    if any(x in n for x in ("mask_offset", "bbox_dilation", "sam_dilation", "bbox_expansion")):
        return "Höher erweitert Maske oder Box nach außen; niedriger bzw. negativ zieht den Bereich enger zusammen."
    if "bbox_crop_factor" in n:
        return "Höher nimmt mehr Kontext um die erkannte Box auf; niedriger schneidet enger am Motiv."
    if "opacity" in n:
        return "Höher macht die Ebene sichtbarer/deckender; niedriger lässt den Hintergrund stärker durchscheinen."
    if "saturation" in n:
        return "Höher intensiviert Farben; niedriger entsättigt bis hin zu Graustufen."
    if "contrast" in n:
        return "Höher spreizt helle und dunkle Bereiche stärker; niedriger macht das Bild flacher und weicher."
    if "rotate" in n or "angle" in n:
        return "Ein höherer Wert dreht weiter in die positive Richtung; ein niedriger/negativer Wert dreht entgegengesetzt."
    if "aspect_ratio" in n or n == "multiple":
        return "Ändert Seitenverhältnis bzw. Rasterteilung; größere Vielfache erhöhen Kompatibilität, können Abmessungen aber stärker runden."
    if "img_compression" in n:
        return "Höher komprimiert Guide-Bilder stärker und spart Speicher/Bandbreite, kann aber Referenzdetails verlieren."
    if "stop_at_clip_layer" in n:
        return "Stärker negative Werte stoppen CLIP früher und verändern Stil/Promptinterpretation; -1 nutzt die letzte Schicht."
    if "batch_index" in n:
        return "Höher wählt ein späteres Element aus dem Batch; der Wert muss innerhalb der vorhandenen Batchgröße liegen."
    if n == "value":
        return "Höher gibt einen größeren Zahlenwert an verbundene Nodes weiter; niedriger einen kleineren, ohne eigene Zusatzwirkung."
    if any(x in n for x in ("shift", "sigma")):
        return "Höher verschiebt den Rausch-/Sigma-Zeitplan und gewichtet andere Denoising-Phasen; zu starke Abweichungen können Qualität kosten."
    if "cycle" in n:
        return "Höher wiederholt den Detail-/Verarbeitungslauf häufiger und kostet mehr Zeit; niedriger führt weniger Durchgänge aus."
    if "max_new_tokens" in n:
        return "Höher erlaubt längere Text-/Sprachausgaben und benötigt mehr Zeit/Speicher; niedriger kürzt früher ab."
    if kind in {"INT", "FLOAT"}:
        return "Höher setzt einen größeren numerischen Steuerwert; niedriger einen kleineren. Die genaue Einheit ergibt sich aus Parametername und Node-Beschreibung."
    if kind == "STRING":
        if any(x in n for x in ("model", "checkpoint", "lora", "vae", "clip")):
            return "Ein anderer kompatibler Eintrag wechselt Modell/Adapter und verändert Stil, Qualität und Speicherbedarf."
        if any(x in n for x in ("text", "transcript", "caption", "prompt", "instruction")):
            return "Ändert den Text bzw. die Anweisung, die dieser Node verarbeitet."
        if any(x in n for x in ("path", "folder", "directory", "filename", "prefix")):
            return "Legt Quelle/Ziel oder Dateibenennung fest; ein anderer Wert ändert den verwendeten Speicherort."
        return "Ändert den Text bzw. die Anweisung, die dieser Node verarbeitet."
    return "Ändert die Verarbeitung dieses Nodes entsprechend dem angeschlossenen Datentyp."


def _input_lines(node: dict[str, Any], schema: dict[str, Any]) -> list[str]:
    tooltips: dict[str, str] = {}
    for name, raw in _ordered_inputs(schema):
        _, cfg = _normalize_spec(raw)
        if cfg.get("tooltip"):
            tooltips[name] = str(cfg["tooltip"])
    lines = []
    for inp in node.get("inputs", []) or []:
        name = str(inp.get("name", "input"))
        state = f"Link {inp['link']}" if inp.get("link") is not None else "nicht verbunden"
        tip = _short(tooltips.get(name, "liefert Eingabedaten für diesen Verarbeitungsschritt"), 150)
        lines.append(f"- `{name}` ({inp.get('type', '?')}, {state}): {tip}")
    return lines


def _output_lines(node: dict[str, Any], schema: dict[str, Any]) -> list[str]:
    schema_names = schema.get("output_name", []) or []
    tips = schema.get("output_tooltips", []) or []
    lines = []
    for i, out in enumerate(node.get("outputs", []) or []):
        name = out.get("name") or (schema_names[i] if i < len(schema_names) else f"output_{i}")
        links = out.get("links") or []
        state = f"{len(links)} Verbindung(en)" if links else "nicht verbunden"
        tip = tips[i] if i < len(tips) and tips[i] else "Ergebnis dieses Nodes"
        lines.append(f"- `{name}` ({out.get('type', '?')}, {state}): {_short(tip, 150)}")
    return lines


def _fallback_purpose(node_type: str) -> str:
    """Return a useful German purpose for recognizable node families."""
    compact = re.sub(r"[^a-z0-9]", "", node_type.lower())
    rules = (
        (("checkpointloader", "unetloader", "modelloader", "vaeloader", "cliploader", "loraloader", "loadimage", "loadaudio", "loadvideo"), "Lädt die angegebene Ressource und stellt sie für nachfolgende Verarbeitungsschritte bereit."),
        (("cliptextencode", "textencode", "promptencode"), "Kodiert Text bzw. Prompts mit CLIP in eine Konditionierung für das generative Modell."),
        (("textgenerate",), "Erzeugt mit dem geladenen Sprachmodell Text aus Prompt und optionalen Bild-, Video- oder Audio-Eingaben."),
        (("vaeencode",), "Kodiert Medien mit dem VAE in den Latent-Raum."),
        (("vaedecode",), "Dekodiert Latents mit dem VAE zu sicht- oder hörbaren Mediendaten."),
        (("conditioning", "cfg", "guider", "guidance"), "Erzeugt, kombiniert oder gewichtet Konditionierungen, die das generative Modell während des Samplings steuern."),
        (("sampler", "scheduler", "modelsampling", "sigma"), "Steuert Sampling, Zeitplan oder Modell-Sampling für den schrittweisen Rauschabbau."),
        (("randomnoise", "noise"), "Erzeugt oder verändert das Start-Rauschen, das die Variation des generierten Ergebnisses bestimmt."),
        (("emptylatent",), "Erzeugt ein leeres Latent mit den vorgegebenen Abmessungen als Startpunkt der Generierung."),
        (("emptyimage",), "Erzeugt eine leere Bildfläche mit den vorgegebenen Abmessungen."),
        (("save",), "Speichert das erzeugte Ergebnis mit den gewählten Ausgabeparametern."),
        (("lossgraph",), "Visualisiert und speichert den Loss-Verlauf, damit Trainingsstabilität und Overfitting beurteilt werden können."),
        (("preview",), "Zeigt eine Vorschau des erzeugten Ergebnisses an, ohne den Verarbeitungsinhalt zu ändern."),
        (("primitive",), "Stellt einen direkt einstellbaren Wert für verbundene Nodes bereit."),
        (("reroute",), "Leitet eine Verbindung zur übersichtlichen Strukturierung des Graphen unverändert weiter."),
        (("groupsmuter",), "Aktiviert oder deaktiviert die zugeordneten Node-Gruppen gemeinsam, um Workflow-Zweige zu schalten."),
        (("switch", "customcombo"), "Wählt abhängig von der Einstellung einen von mehreren Daten- oder Verarbeitungspfaden aus."),
        (("math", "calculate", "arithmetic", "inttofloat"), "Berechnet oder konvertiert numerische Werte für nachfolgende Nodes."),
        (("string", "textconcat", "regex"), "Erzeugt, kombiniert, ersetzt oder extrahiert Text für nachfolgende Workflow-Schritte."),
        (("dataset",), "Lädt, filtert oder bereitet Trainingsdaten für die weitere Verarbeitung auf."),
        (("training", "trainer", "train"), "Konfiguriert oder führt einen Trainingsschritt mit den bereitgestellten Daten und Modellen aus."),
        (("lora",), "Lädt, trainiert oder wendet einen LoRA-Adapter zur gezielten Modellanpassung an."),
        (("clipvision", "ipadapter"), "Kodiert visuelle Referenzen oder überträgt deren Merkmale per IP-Adapter auf die Generierung."),
        (("detector", "sam3", "bbox", "ultralytics"), "Erkennt, segmentiert oder verfolgt Motive und liefert Masken bzw. Begrenzungsboxen."),
        (("rmbg", "backgroundremoval", "matte"), "Trennt Vordergrund und Hintergrund und erzeugt dafür Bild, Maske oder Transparenz."),
        (("purgevram",), "Gibt zwischengespeicherte Modelle und VRAM frei, damit nachfolgende große Schritte mehr Speicher erhalten."),
        (("concat", "combine"), "Führt mehrere kompatible Datenströme oder Konditionierungen zu einem Ergebnis zusammen."),
        (("latent",), "Erzeugt, kombiniert oder transformiert Daten im Latent-Raum vor Sampling oder Decoding."),
        (("filter", "color", "levels", "exposure", "brightness", "contrast", "grain", "blur", "detail"), "Wendet eine Bild-, Farb- oder Detailkorrektur mit den einstellbaren Intensitäten auf das Bild an."),
        (("inpaint", "tileddiffusion"), "Bereitet maskierte oder gekachelte Generierung vor, um Teilbereiche bzw. große Bilder kontrolliert zu bearbeiten."),
        (("audio",), "Lädt, erzeugt oder verarbeitet Audiodaten für den nächsten Workflow-Schritt."),
        (("video",), "Lädt, erzeugt oder verarbeitet Videodaten und deren Frames."),
        (("image", "resize", "upscale", "crop", "mask", "blend"), "Erzeugt oder verarbeitet Bilddaten, etwa durch Skalierung, Zuschnitt, Maskierung oder Kombination."),
    )
    for needles, purpose in rules:
        if any(needle in compact for needle in needles):
            return purpose
    return f"Verarbeitet die Ein- und Ausgaben des Node-Typs `{node_type}` gemäß seiner Workflow-Funktion."


def build_note_text(node: dict[str, Any], schema: dict[str, Any], subgraph_name: str | None = None) -> str:
    node_type = str(node.get("type", "Unbekannt"))
    title = str(node.get("title") or schema.get("display_name") or subgraph_name or node_type)
    description = schema.get("description") or (
        f"Führt den Subgraph „{subgraph_name}“ aus." if subgraph_name else
        _fallback_purpose(node_type)
    )
    description = re.sub(r"<[^>]+>", " ", str(description))
    description = re.sub(r"\\s+", " ", description).strip()
    mapped, _ignored = map_widget_values(node, schema)
    lines = [f"# Erklärung · {title} · Node {node.get('id')}", "", f"**Zweck:** {_short(description, 320)}"]
    lines += ["", "**Einstellbare Werte**"]
    if mapped:
        for widget in mapped:
            cfg = widget["config"]
            tip = cfg.get("tooltip") or cfg.get("display_name") or "Steuert diesen Parameter."
            effect = _effect(widget["name"], widget["kind"], cfg, widget["value"])
            lines.append(f"- `{widget['name']}` = `{_short(widget['value'])}` — {_short(tip, 180)} {effect}")
    else:
        lines.append("- Keine direkt einstellbaren Widgets; die Wirkung wird über Verbindungen bestimmt.")
    lines += ["", "**Eingänge**"] + (_input_lines(node, schema) or ["- Keine Eingänge."])
    lines += ["", "**Ausgänge**"] + (_output_lines(node, schema) or ["- Keine Ausgänge."])
    return "\n".join(lines)


def _rect(node: dict[str, Any], pad: float = 0.0) -> tuple[float, float, float, float]:
    x, y = (list(node.get("pos", [0, 0])) + [0, 0])[:2]
    w, h = (list(node.get("size", [260, 120])) + [260, 120])[:2]
    return float(x) - pad, float(y) - pad, float(x) + float(w) + pad, float(y) + float(h) + pad


def _overlap(a: tuple[float, float, float, float], b: tuple[float, float, float, float]) -> bool:
    return a[0] < b[2] and a[2] > b[0] and a[1] < b[3] and a[3] > b[1]


def _place(node: dict[str, Any], desired: tuple[float, float], occupied: list[tuple[float, float, float, float]]) -> None:
    base_x, base_y = desired
    step = 44.0
    candidates = [(0, 0)]
    for radius in range(1, 220):
        candidates.extend([
            (0, radius), (radius, 0), (-radius, 0), (0, -radius),
            (radius, radius), (-radius, radius), (radius, -radius), (-radius, -radius),
        ])
    for dx, dy in candidates:
        node["pos"] = [round(base_x + dx * step, 3), round(base_y + dy * step, 3)]
        r = _rect(node, GAP / 2)
        if not any(_overlap(r, other) for other in occupied):
            occupied.append(r)
            return
    raise RuntimeError(f"Could not place node {node.get('id')} without overlap")


def _group_members(groups: list[dict[str, Any]], nodes: list[dict[str, Any]]) -> dict[int, list[int]]:
    result: dict[int, list[int]] = {}
    for group in groups:
        x, y, w, h = group.get("bounding", [0, 0, 0, 0])
        members = []
        for node in nodes:
            nx, ny, nr, nb = _rect(node)
            cx, cy = (nx + nr) / 2, (ny + nb) / 2
            if x <= cx <= x + w and y <= cy <= y + h:
                members.append(node["id"])
        result[group.get("id", len(result))] = members
    return result


def _subgraph_schemas(workflow: dict[str, Any]) -> dict[str, tuple[str, dict[str, Any]]]:
    result = {}
    for sg in workflow.get("definitions", {}).get("subgraphs", []):
        input_defs = {}
        required = []
        for item in sg.get("inputs", []):
            name = item.get("name", f"input_{len(required)}")
            input_defs[name] = [item.get("type", "*"), {"forceInput": True, "tooltip": item.get("tooltip", "Subgraph-Eingang")}]
            required.append(name)
        schema = {
            "display_name": sg.get("name", "Subgraph"),
            "description": f"Führt den eingebetteten Subgraph „{sg.get('name', 'Subgraph')}“ aus.",
            "input": {"required": input_defs},
            "input_order": {"required": required},
            "output_name": [o.get("name", f"output_{i}") for i, o in enumerate(sg.get("outputs", []))],
            "output_tooltips": [o.get("tooltip") for o in sg.get("outputs", [])],
        }
        result[str(sg.get("id"))] = (sg.get("name", "Subgraph"), schema)
    return result


def refine_graph(graph: dict[str, Any], object_info: dict[str, Any], subgraph_schemas: dict[str, tuple[str, dict[str, Any]]], refresh_notes: bool = False) -> int:
    extra = graph.setdefault("extra", {})
    marked = extra.get(REFINEMENT_KEY, {}).get("version") == REFINEMENT_VERSION
    nodes = graph.get("nodes", [])
    if marked and not refresh_notes:
        return 0
    if marked:
        targets = {int(n["id"]): n for n in nodes if is_target(n)}
        refreshed = 0
        for note in nodes:
            target_id = note.get("properties", {}).get(NOTE_PROPERTY)
            if target_id is None or int(target_id) not in targets:
                continue
            target = targets[int(target_id)]
            node_type = str(target.get("type", ""))
            sub_name, schema = subgraph_schemas.get(node_type, (None, object_info.get(node_type, {})))
            title = f"Erklärung · {target.get('title') or schema.get('display_name') or sub_name or node_type} · Node {target['id']}"
            text = build_note_text(target, schema, sub_name)
            if note.get("title") != title or note.get("widgets_values") != [text]:
                note["title"] = title
                note["widgets_values"] = [text]
                refreshed += 1
        return refreshed
    if any(n.get("properties", {}).get(NOTE_PROPERTY) is not None for n in nodes):
        raise RuntimeError("Graph has generated notes but no matching refinement marker")

    original_nodes = copy.deepcopy(nodes)
    groups = graph.get("groups", []) or []
    memberships = _group_members(groups, original_nodes)
    anchored = [n for n in nodes if n.get("type") == "PixaromaNote"]
    movable = [n for n in nodes if n.get("type") != "PixaromaNote"]
    occupied = [_rect(n, GAP / 2) for n in anchored]

    # Preserve relative topology while deterministically resolving pre-existing overlaps.
    movable.sort(key=lambda n: (float(n.get("pos", [0, 0])[1]), float(n.get("pos", [0, 0])[0]), int(n.get("id", 0))))
    for node in movable:
        ox, oy = node.get("pos", [0, 0])
        _place(node, (float(ox) * X_SCALE, float(oy) * Y_SCALE), occupied)

    max_id = max([int(n.get("id", 0)) for n in nodes] + [int(graph.get("last_node_id", 0))])
    max_order = max([int(n.get("order", 0)) for n in nodes] + [-1])
    generated = []
    note_by_target: dict[int, dict[str, Any]] = {}
    for target in sorted((n for n in nodes if is_target(n)), key=lambda n: int(n["id"])):
        max_id += 1
        max_order += 1
        node_type = str(target.get("type", ""))
        sub_name, schema = subgraph_schemas.get(node_type, (None, object_info.get(node_type, {})))
        text = build_note_text(target, schema, sub_name)
        line_count = text.count("\n") + 1
        note = {
            "id": max_id,
            "type": "MarkdownNote",
            "pos": [0, 0],
            "size": [390, min(540, max(230, 90 + line_count * 17))],
            "flags": {},
            "order": max_order,
            "mode": 0,
            "inputs": [],
            "outputs": [],
            "title": f"Erklärung · {target.get('title') or schema.get('display_name') or sub_name or node_type} · Node {target['id']}",
            "properties": {
                "Node name for S&R": "MarkdownNote",
                "cnr_id": "comfy-core",
                NOTE_PROPERTY: int(target["id"]),
                "dawasteh_generated_note": True,
            },
            "widgets_values": [text],
            "color": "#1b2638",
            "bgcolor": "#101722",
        }
        tx, ty, tr, _ = _rect(target)
        _place(note, (tr + 46, ty), occupied)
        generated.append(note)
        note_by_target[int(target["id"])] = note
    nodes.extend(generated)
    graph["last_node_id"] = max_id

    # Expand each group around its original members and their generated notes.
    by_id = {int(n["id"]): n for n in nodes}
    for group in groups:
        member_nodes = []
        for node_id in memberships.get(group.get("id"), []):
            if node_id in by_id:
                member_nodes.append(by_id[node_id])
                if node_id in note_by_target:
                    member_nodes.append(note_by_target[node_id])
        if member_nodes:
            rects = [_rect(n) for n in member_nodes]
            left = min(r[0] for r in rects) - 28
            top = min(r[1] for r in rects) - 54
            right = max(r[2] for r in rects) + 28
            bottom = max(r[3] for r in rects) + 28
            group["bounding"] = [round(left, 3), round(top, 3), round(right-left, 3), round(bottom-top, 3)]

    extra[REFINEMENT_KEY] = {
        "version": REFINEMENT_VERSION,
        "generated_notes": len(generated),
        "x_scale": X_SCALE,
        "y_scale": Y_SCALE,
        "gap": GAP,
    }
    return len(generated)


def refine_workflow(workflow: dict[str, Any], object_info: dict[str, Any], refresh_notes: bool = False) -> int:
    subgraph_schemas = _subgraph_schemas(workflow)
    total = refine_graph(workflow, object_info, subgraph_schemas, refresh_notes)
    for sg in workflow.get("definitions", {}).get("subgraphs", []):
        total += refine_workflow(sg, object_info, refresh_notes)
    return total


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--workflows", type=Path, default=Path("workflows"))
    parser.add_argument("--object-info", default="http://127.0.0.1:8188/object_info")
    parser.add_argument("--check", action="store_true", help="Parse and report without writing")
    parser.add_argument("--refresh-notes", action="store_true", help="Retext existing generated notes without changing their geometry or identity")
    args = parser.parse_args()
    object_info = fetch_object_info(args.object_info)
    paths = sorted(args.workflows.rglob("*.json"))
    total = 0
    changed = 0
    for path in paths:
        original_text = path.read_text(encoding="utf-8")
        workflow = json.loads(original_text)
        original_workflow = copy.deepcopy(workflow)
        count = refine_workflow(workflow, object_info, args.refresh_notes)
        total += count
        # A marked workflow can be semantically unchanged while its original JSON
        # intentionally uses compact formatting. Do not rewrite or report such a
        # file merely because json.dumps would format it differently.
        if workflow != original_workflow:
            changed += 1
            if not args.check:
                rendered = json.dumps(workflow, ensure_ascii=False, indent=2) + "\n"
                path.write_text(rendered, encoding="utf-8")
    print(f"files={len(paths)} changed={changed} generated_notes={total} check={args.check}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
