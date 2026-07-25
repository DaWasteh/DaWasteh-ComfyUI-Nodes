# DaWasteh – konsolidierte ComfyUI-Workflows

Dieser Ordner ist jetzt der **kuratierte Hauptordner** für die lokalen Workflows auf Windows 11 mit:

- AMD Radeon AI Pro R9700 (32 GB, RDNA4)
- AMD Radeon RX 9070 XT (16 GB, RDNA4)
- PyTorch/ROCm unter Windows
- ComfyUI aus `L:/ComfyUI`

Die Quellordner `DaWasteh`, `Pixaroma` und `WhatDreamsCost` wurden **nicht verändert**. Vor der Konsolidierung wurde zusätzlich ein Backup der ursprünglichen 59 Workflows erstellt:

`L:/ComfyUI/_workflow_backups/DaWasteh-Neu-before-consolidation-20260725-215010.zip`

Der maschinenlesbare Abschluss-Audit liegt hier:

`L:/ComfyUI/_workflow_backups/DaWasteh-Neu-final-audit-20260725.json`

## Ergebnis

- **173 kuratierte Workflow-Dateien** in 27 Kategorien
- alle 173 Workflows enthalten einen `PixaromaRunTimer` aus ComfyUI-Pixaroma
- 59 vorhandene Workflows beibehalten
- 114 funktional ergänzende Workflows übernommen:
  - 33 aus `DaWasteh`
  - 78 aus `Pixaroma`
  - 3 aus `WhatDreamsCost`
- exakte und funktionale Tutorial-Duplikate nicht erneut übernommen
- NVIDIA-/CUDA-exklusive Varianten durch lokale AMD-taugliche Varianten ersetzt oder ausgelassen
- vorhandene Modell- und Input-Referenzen auf die lokale Installation angepasst

## Ordnerübersicht

| Ordner | Anzahl | Zweck |
|---|---:|---|
| `Text to Image` | 42 | FLUX, Krea2, Z-Image, SDXL, Anima, Boogu, LongCat, Ideogram usw. |
| `Image Editing` | 21 | FLUX2-Klein-Edits, Qwen Image Edit, SDXL-Composites, Bernini |
| `Prompt Tools` | 15 | Prompt Stack/Pack/Multi, Builder, Text-Tools, XY-Plot |
| `Pixaroma Node Demos` | 12 | aktuelle, deduplizierte Pixaroma-Node-Beispiele |
| `Image Utilities` | 12 | Hintergrundentfernung, Combine, Blend, Compare, Filter, Scale, Lama |
| `Text+Image to Video` | 10 | WAN, LTX Director, First/Last Frame, Kandinsky |
| `Prompt Enhancer` | 11 | Gemma/Qwen Prompt-, Bild-, Audio- und Videoverständnis |
| `Music Generation` | 8 | ACE-Step und Stable Audio 3 |
| `Voice Design` | 8 | Qwen3-TTS Custom Voice, Voice Design, Clone und Dialog |
| `Text to Video` | 5 | LTX 2.3 und WAN 2.2 |
| `NSFW` | 4 | getrennte SDXL-NSFW-/AniToReal-Workflows |
| `Character & Consistency` | 3 | FLUX Kontext und SDXL/IPAdapter Character Keep |
| `Character Animation` | 3 | SCAIL-2 Animation und Character Replacement |
| `Image Inpainting` | 3 | FLUX2 Klein 4B/9B Inpainting |
| `Image Upscaling` | 3 | einfache, Modell- und Z-Image-Upscaler |
| `Batch Processing` | 2 | Ordner-Batches und Batch-Image-Edit |
| weitere Einzelordner | je 1 | Audio Reaction, Controlled Video, Image Fusion, 3D, Outpainting, Training, Talking Video, Tests, Video Editing, Video-to-Audio, Vocal Separation |

## Benennung

Die bestehende englische Ordnerstruktur wurde beibehalten und logisch erweitert. Neue Dateien folgen möglichst diesem Schema:

`MODEL_VARIANTE-Funktion.json`

Korrigierte vorhandene Namen:

- `LLM_Gemma3_12B_abliterated_...` → `LLM_Gemma4_e4b_abliterated_...`  
  Der Workflow lädt tatsächlich Gemma 4 e4b.
- `FLUX2_dev_fp8mixed_NEW-...` → `FLUX2_dev_fp8mixed_v2-...`

## RDNA4-Anpassungen

Folgende Regeln wurden auf die konsolidierte Sammlung angewendet:

- keine Nunchaku-/SVDQ-/FP4-Workflows
- kein `CUDAExecutionProvider`
- keine TensorRT-, xformers-, Triton- oder Flash-Attention-Pflicht
- keine `nvfp4`-Modelle
- keine SeedVR2-Workflows mit festem `cuda:0`
- FLUX2-Klein-9B-Imports verwenden das installierte KV-FP8-Modell
- FLUX2-Klein-4B-Imports verwenden das installierte lokale 4B-Modell
- Z-Image-Imports verwenden das installierte BF16-Modell
- verdächtige Krea2-INT8-ConvRot-Referenzen wurden auf das installierte FP8-Modell umgestellt
- Qwen3-TTS verwendet `device=auto` und `attention=sdpa`
- ONNX-CUDA-Beispiele aus den Pixaroma-WAN-Wrapper-Workflows wurden nicht übernommen; stattdessen bleiben die nativen lokalen WAN/SCAIL-Workflows erhalten

## Bewusst nicht übernommen

Diese Dateien bleiben in ihren Quellordnern als Referenz, gehören aber nicht in die produktive RDNA4-Sammlung:

- Nunchaku-Workflows: NVIDIA/CUDA-spezifisch
- SeedVR2-Custom-Workflows: fehlende Nodes und festes `cuda:0`
- WAN-Video-Wrapper-Beispiele mit `CUDAExecutionProvider`
- Lens-Workflow mit NVIDIA-`nvfp4`-Textencoder
- Fish Audio S2: benötigter Node-Pack ist nicht installiert; Qwen3-TTS deckt TTS/Clone/Dialog lokal ab
- kostenpflichtige Cloud-Upscaler
- alte Tutorial-T2I-Duplikate, deren Modelle bereits sauber unter `Text to Image` vorhanden sind
- `Ill_modular_wf.json` und `Illus_v2_6.13.25.json`: große Legacy-Pipelines mit zahlreichen nicht mehr installierten Nodes/Modellen; die lauffähigen vereinfachten SDXL-Nachfolger wurden übernommen
- redundante WhatDreamsCost-Director-/2-Stage-Varianten; behalten wurden die expandierte Director-, Custom-Audio- und Prompt-Replay-Version
- der WhatDreamsCost-3-Stage-Workflow wurde nach rekursiver Prüfung ausgeschlossen, weil sein Quell-Subgraph `Stage #2` 20 Links zu nicht vorhandenen Nodes enthält; die Originaldatei bleibt im Quellordner und eine Sicherung liegt unter `_workflow_backups/excluded-LTX23_First+Last-Frame-3-Stage-source-broken.json`

## Validierung

Automatisch geprüft wurden alle 173 Workflows gegen den aktuellen ComfyUI-`object_info`-Snapshot:

- 173/173 gültige JSON-Dateien
- 173/173 Workflows mit genau einem `PixaromaRunTimer`
- 202 Haupt- und Untergraphen rekursiv geprüft
- 3.161 Nodes und 3.647 Graph-Links konsistent und bidirektional referenziert
- alle 408 Subgraph-Interface-Links (`inputNode`/`outputNode`) erhalten und geprüft
- keine fehlenden installierten Node-Typen (Frontend-/Subgraph-Knoten berücksichtigt)
- 498 Modellreferenzen einschließlich Untergraphen geprüft
- 132 Input-/Medienreferenzen einschließlich Untergraphen geprüft
- keine fehlenden Modell- oder Input-Dateien
- keine NVIDIA-/CUDA-only-Risiko-Widgets
- keine eingebetteten `Rh-Comfy-Auth`-Tokens/JWTs
- unabhängiger abschließender Reviewer-Check: **PASS**, keine verbleibenden Blocker oder Fehler

Die Prüfung bestätigt Struktur, lokale Abhängigkeiten und statische RDNA4-Kompatibilität. Ein vollständiger GPU-End-to-End-Lauf aller 173 Workflows wäre sehr rechen- und zeitintensiv; besonders große WAN-/LTX-Workflows sollten auf der R9700 mit dem vorhandenen sicheren Launcher-Profil ausgeführt werden.
