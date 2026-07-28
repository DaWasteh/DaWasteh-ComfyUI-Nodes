# DaWasteh – konsolidierte ComfyUI-Workflows · v0.6.3

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

- **186 kuratierte Workflow-Dateien** in 28 Kategorien
- alle 186 Workflows enthalten exakt einen `PixaromaRunTimer` aus ComfyUI-Pixaroma
- alle vorhandenen Workflows wurden mit deutlich größeren, nachvollziehbaren Abständen angeordnet
- **2.709 automatisch zugeordnete Parameter-Notes** erklären jeden Nicht-Pixaroma-/Nicht-Dokumentations-Node einschließlich aktueller Werte, Schalterwirkung, Ein-/Ausgänge und höher-/niedriger-Auswirkung
- 59 vorhandene Workflows beibehalten
- 114 funktional ergänzende Workflows übernommen:
  - 33 aus `DaWasteh`
  - 78 aus `Pixaroma`
  - 3 aus `WhatDreamsCost`
- 2 neue Audio-zu-Video-Workflows aufgebaut: ein klar als AudioReact gekennzeichneter Gemma-/FLUX2-/Pixaroma-Workflow und ein echtes generatives LTX-2.3-Video mit Custom Audio
- 1 neuer Audio-zu-Bild-Workflow: Gemma 4 analysiert das Audio, FLUX.2 Klein 4B erzeugt das Kontextbild, `PixaromaResolution` bietet frei wählbare Formate und `PixaromaNote` dokumentiert Bedienung und Downloads
- 2 neue MOSS-TTS-Local-v1.5-Workflows: Audio + exaktes Transkript + neuer Text als Continuation sowie Text + Audio-Stimmenvorlage als Zero-shot Voice Clone; beide enthalten direkte Downloads und Zielordner
- 3 lokale YuE-/HeartMuLa-Musikworkflows: YuE CoT mit exakter 5–600-Sekunden-Planung, YuE ICL mit optionaler Vocal-/Songreferenz und HeartMuLa mit promptabhängig abgesicherter Dauer bis 600 Sekunden
- 5 neue lokale Bild-LoRA-Trainingsworkflows mit offiziellen ComfyUI-Core-Trainingsnodes: Z-Image Base, Boogu Image Base, FLUX.1 Dev, FLUX.2 Klein 4B Base und SDXL
- der ACE-Step-1.5-Workflow enthält zusätzlich einen ausführlichen Rank-Guide für Rank 16/32/64/128
- exakte und funktionale Tutorial-Duplikate nicht erneut übernommen
- NVIDIA-/CUDA-exklusive Varianten durch lokale AMD-taugliche Varianten ersetzt oder ausgelassen
- vorhandene Modell- und Input-Referenzen auf die lokale Installation angepasst

## Ordnerübersicht

| Ordner | Anzahl | Zweck |
|---|---:|---|
| `Text to Image` | 42 | FLUX, Krea2, Z-Image, SDXL, Anima, Boogu, LongCat, Ideogram usw. |
| `LoRA Generation` | 6 | ACE-Step 1.5 sowie lokale Core-Trainer für Z-Image, Boogu, FLUX.1, FLUX.2 Klein und SDXL |
| `Image Editing` | 21 | FLUX2-Klein-Edits, Qwen Image Edit, SDXL-Composites, Bernini |
| `Prompt Tools` | 15 | Prompt Stack/Pack/Multi, Builder, Text-Tools, XY-Plot |
| `Pixaroma Node Demos` | 12 | aktuelle, deduplizierte Pixaroma-Node-Beispiele |
| `Image Utilities` | 12 | Hintergrundentfernung, Combine, Blend, Compare, Filter, Scale, Lama |
| `Text+Image to Video` | 10 | WAN, LTX Director, First/Last Frame, Kandinsky |
| `Prompt Enhancer` | 11 | Gemma/Qwen Prompt-, Bild-, Audio- und Videoverständnis |
| `Music Generation` | 11 | ACE-Step, Stable Audio 3, YuE CoT/ICL und HeartMuLa |
| `Voice Design` | 10 | Qwen3-TTS sowie MOSS-TTS Local v1.5: Custom Voice, Continuation, Clone und Dialog |
| `Text to Video` | 5 | LTX 2.3 und WAN 2.2 |
| `Audio to Video` | 3 | zwei AudioReact-Varianten sowie echtes generatives LTX-2.3-Bild+Audio→Video in Soundlänge |
| `Audio to Image` | 1 | Gemma-4-Audioverständnis → visueller Prompt → FLUX.2-Klein-4B-Kontextbild |
| `NSFW` | 4 | getrennte SDXL-NSFW-/AniToReal-Workflows |
| `Character & Consistency` | 3 | FLUX Kontext und SDXL/IPAdapter Character Keep |
| `Character Animation` | 3 | SCAIL-2 Animation und Character Replacement |
| `Image Inpainting` | 3 | FLUX2 Klein 4B/9B Inpainting |
| `Image Upscaling` | 3 | einfache, Modell- und Z-Image-Upscaler |
| `Batch Processing` | 2 | Ordner-Batches und Batch-Image-Edit |
| weitere Einzelordner | je 1 | Controlled Video, Image Fusion, 3D, Outpainting, Talking Video, Tests, Video Editing, Video-to-Audio, Vocal Separation |

## Benennung

Die bestehende englische Ordnerstruktur wurde beibehalten und logisch erweitert. Neue Dateien folgen möglichst diesem Schema:

`MODEL_VARIANTE-Funktion.json`

Korrigierte vorhandene Namen:

- `LLM_Gemma3_12B_abliterated_...` → `LLM_Gemma4_e4b_abliterated_...`  
  Der Workflow lädt tatsächlich Gemma 4 e4b.
- `FLUX2_dev_fp8mixed_NEW-...` → `FLUX2_dev_fp8mixed_v2-...`

## Lokales LoRA-Training auf RDNA4

Die fünf neuen Bildtrainer verwenden ausschließlich die **offiziellen experimentellen ComfyUI-Core-Nodes** `LoadImageTextDataSetFromFolder`, `MakeTrainingDataset`, `ResolutionBucket`, `TrainLoraNode`, `LossGraphNode` und `SaveLoRA`. Es wird keine zusätzliche CUDA-Trainer-Extension benötigt.

- Trainingsdaten liegen unter `ComfyUI/input/lora_training/<modell>/`; jedes Bild erhält eine gleichnamige `.txt`-Caption.
- Alle neuen Trainer starten absichtlich mit **2 Schritten** und einem `_smoke`-Dateiprefix. Erst nach erfolgreichem Loss-/Datei-Test auf den gewünschten Schrittwert erhöhen und `_smoke` entfernen.
- Standard ist Rank 16, BF16, Batch 1, Gradient Accumulation 4, Gradient Checkpointing und Resolution Buckets.
- `SaveLoRA` schreibt nach `ComfyUI/output/loras/DaWasteh/`. Fertige Adapter anschließend nach `ComfyUI/models/loras/DaWasteh/` kopieren.
- FLUX.1 Dev nutzt wegen des vorhandenen FP8-Modells den quantisierten Bypass-Rückwärtsweg und ist im Workflow ausdrücklich als experimentell markiert.
- Alle für diese fünf Workflows benötigten Basismodelle, Textencoder und VAEs waren bereits in `L:/ComfyUI/ComfyUI/models` vorhanden; es mussten keine zusätzlichen Gewichte heruntergeladen werden.

**Krea 2 RAW wurde nach einem reproduzierbaren OOM auf der R9700 trotz aktiviertem Offloading wieder entfernt.** Das 24,5-GB-BF16-Modell zusammen mit Textencoder und Trainingszustand überschreitet die sichere 32-GB-VRAM-/48-GB-RAM-Grenze dieses Systems. Entsprechend der Stabilitätsregel wird kein Workflow ausgeliefert, der auf der Zielhardware nicht sicher nutzbar ist.

Bewusst nicht als lokaler RDNA4-LoRA-Trainer aufgenommen wurden LTX-2 (offizieller Trainer verlangt CUDA/Triton), WAN 2.x (kein offizieller Herstellertrainer), HunyuanVideo/CogVideoX (kein bestätigter gfx1201-Pfad), Stable Audio 3 (kein passender ComfyUI-Core-Datasetpfad), Qwen3-TTS (vorhandener Node ist Full-Finetuning statt LoRA) sowie MOSS-TTS Local v1.5. OpenMOSS dokumentiert für Local v1.5 Full-SFT, aber keinen allgemeinen v1.5-LoRA-Pfad; das vorhandene Community-LoRA-Beispiel zielt auf das ältere 8B-Modell, und der verwendete ComfyUI-v1.5-Node kann keine LoRAs trainieren oder laden.

## YuE und HeartMuLa · v0.6.3

Die Musikworkflows benötigen zwei lokale Custom-Node-Patches aus `tools/patches/`:

- `ComfyUI_YuE-Windows-RDNA4-longform-ICL.patch`: SDPA statt Flash-Attention, kein TorchInductor auf Windows-ROCm, robuste MMGP-Profilvalidierung, verlustfreie WAV-Zwischenstufen, exakte 5–600-Sekunden-Tokenplanung und ein optionaler ComfyUI-`AUDIO`-Eingang für ICL-Referenzen.
- `ComfyUI-HeartMuLa-600s-context.patch`: erweitert `duration_seconds` auf 600 und prüft vor dem GPU-Lauf, wie viel Audio neben den aktuellen Lyrics/Tags in den 8192-Positionen-Kontext passt.

Die Patches werden jeweils im Root des passenden Custom-Node-Repositories angewendet; vorher mit `git apply --check` prüfen. Beispiel:

```powershell
git -C "L:/ComfyUI/ComfyUI/custom_nodes/ComfyUI_YuE" apply --check "<dieser-clone>/tools/patches/ComfyUI_YuE-Windows-RDNA4-longform-ICL.patch"
git -C "L:/ComfyUI/ComfyUI/custom_nodes/ComfyUI_YuE" apply "<dieser-clone>/tools/patches/ComfyUI_YuE-Windows-RDNA4-longform-ICL.patch"
git -C "L:/ComfyUI/ComfyUI/custom_nodes/ComfyUI-HeartMuLa" apply --check "<dieser-clone>/tools/patches/ComfyUI-HeartMuLa-600s-context.patch"
git -C "L:/ComfyUI/ComfyUI/custom_nodes/ComfyUI-HeartMuLa" apply "<dieser-clone>/tools/patches/ComfyUI-HeartMuLa-600s-context.patch"
```

Der separate Referenzstimmen-Workflow verwendet den zusätzlichen ICL-Checkpoint:

```powershell
hf download m-a-p/YuE-s1-7B-anneal-en-icl --local-dir "L:/ComfyUI/ComfyUI/models/yue/YuE-s1-7B-anneal-en-icl"
```

Lokaler Zielordner: `L:/ComfyUI/ComfyUI/models/yue/YuE-s1-7B-anneal-en-icl`

**YuE-Einstellungen unterscheiden sich bewusst:** Ohne Referenz den CoT-Workflow mit `...en-cot` und beiden Audio-Prompt-Schaltern AUS verwenden. Mit Referenz den ICL-Workflow mit `...en-icl`, verbundenem `reference_audio`, `use_audio_prompt=True` und vorzugsweise etwa 30 Sekunden isoliertem Gesang/Chorus verwenden. Ein kompletter Mix überträgt zusätzlich Arrangement und Instrumentierung; ICL ist Stil-/Audio-Conditioning, keine garantierte identische Voice-Clone-Engine.

HeartMuLa OSS 3B besitzt derzeit keinen Referenz-Audio-Eingang; dieser Punkt steht im offiziellen HeartLib noch auf der TODO-Liste. Deshalb enthält der HeartMuLa-Workflow keinen wirkungslosen Pseudo-Port. Mehr als 300 Sekunden sind möglich, aber `duration_seconds` bleibt eine Obergrenze: Audio-EOS kann früher eintreten und lange Lyrics verkleinern das promptabhängige Maximum.

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

Automatisch geprüft wurden alle 186 Workflows. Der `--against-head`-Modus prüft neue und geänderte Dateien vollständig und lässt bekannte strukturelle Altbefunde unveränderter HEAD-Dateien nicht mehr fälschlich als v0.6.3-Regression erscheinen:

- 186/186 gültige JSON-Dateien
- 186/186 Workflows mit genau einem `PixaromaRunTimer`
- 222 Haupt- und Untergraphen rekursiv geprüft
- 6.083 Nodes, davon 2.709 eindeutig zugeordnete Parameter-Notes
- 3.939 Graph-Links erfasst; die bestehenden 3.933 HEAD-Links blieben erhalten
- keine neuen doppelten IDs, fehlenden Endpunkte, Note-Zuordnungs- oder Layoutfehler in den v0.6.3-Dateien
- vorhandene `PixaromaNote`-Dictionaries einschließlich Position, Größe und Inhalt unverändert
- alle fünf neuen Trainer verwenden installierte Core-Nodes und vorhandene lokale Modelle
- alle fünf Trainer erfolgreich mit einem vollständigen einmaligen 1-Step-Train-und-Save-Smoke-Test auf der Radeon AI Pro R9700 / ROCm 7.15 ausgeführt; die ausgelieferten Workflows starten bewusst mit 2 Schritten für den ersten eigenen Smoke-Test, und die erzeugten Test-Safetensors enthielten nichtleere Adaptergewichte
- Boogu erst nach aktiviertem `offloading=true` OOM-frei validiert; diese sichere Einstellung ist im Workflow fest voreingestellt
- MOSS-TTS Local v1.5 verwendet `dtype=auto` und `attention=sdpa`; die Gewichte belegen zusammen rund 17,6 GB (9,1 GB Modell plus 8,5 GB Codec). Voice Clone und Continuation wurden auf der R9700 erfolgreich bis zu nichtleeren 48-kHz-Stereo-FLACs ausgeführt; für statisches ComfyUI-Offloading war ein lokaler Comfy-Cast-Fix für `MossQwen3RMSNorm` nötig
- keine NVIDIA-/CUDA-only-Risiko-Widgets und keine eingebetteten `Rh-Comfy-Auth`-Tokens/JWTs
- Generator, Refinement und Validator sind reproduzierbar und idempotent; die fokussierte Unit-Test-Suite prüft dynamische Widgets, Seed-Kontrollen, VHS-Dictionary-Werte, Subgraphs und TrainLora-Widgetreihenfolge

Die Prüfung bestätigt Struktur, lokale Abhängigkeiten und RDNA4-Kompatibilität. Die fünf neuen Bild-LoRA-Trainer wurden lokal bis zum gespeicherten Adapter ausgeführt; Krea 2 RAW wurde nach dem OOM konsequent entfernt. Der Audio-to-Image-Workflow wurde vollständig mit Gemma 4 und FLUX.2 Klein 4B auf der lokalen ComfyUI-Installation ausgeführt. YuE CoT und YuE ICL wurden jeweils mit einer erzwungenen 10,00-Sekunden-Ausgabe vollständig auf der R9700 ausgeführt. HeartMuLa akzeptierte und dekodierte einen Lauf mit `duration_seconds=301` erfolgreich; das Modell setzte bei 193,68 Sekunden selbst Audio-EOS und bestätigt damit, dass der Wert eine Obergrenze statt einer garantierten Länge ist. Ein vollständiger GPU-End-to-End-Lauf aller 186 Workflows wäre sehr rechen- und zeitintensiv; besonders große Musik-, WAN- und LTX-Workflows sollten auf der R9700 mit dem vorhandenen sicheren Launcher-Profil ausgeführt werden.
