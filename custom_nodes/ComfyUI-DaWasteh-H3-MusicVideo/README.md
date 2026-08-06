# DaWasteh MiniMax H3 – Complete Song Music Video

Ein einzelner sichtbarer ComfyUI-Master-Workflow für lange Musikvideos. Der Master analysiert den Song, plant beatnahe Szenen, erzeugt MiniMax-H3-Unterjobs nacheinander, speichert jeden Clip sofort, setzt alle Clips zusammen und muxxt den ursprünglichen Audiostream ohne Neukodierung ein.

## Voraussetzungen

- Aktuelles ComfyUI mit nativer MiniMax-H3-Unterstützung (`MiniMaxH3ReferenceToVideo`, `MiniMaxH3SigmaShift`, `VAEDecode`).
- `ComfyUI-Spectrum-MiniMax-H3`, sofern `spectrum_enabled = true` bleibt.
- Funktionierendes FFmpeg **und ffprobe**. VideoHelperSuite bringt gewöhnlich ein passendes FFmpeg mit; alternativ beide Programme auf `PATH` legen.
- Die vier bereits verwendeten Modelle:

```text
models/diffusion_models/MiniMax H3/minimax_h3_ref2va_pruned_int8_convrot.safetensors
models/text_encoders/MiniMax H3/qwen3vl_32b_minimax_h3_int8_convrot.safetensors
models/vae/MiniMax H3/minimax_h3_video_vae_fp16.safetensors
models/vae/MiniMax H3/minimax_h3_audio_vae_fp32.safetensors
```

## Installation

1. Den Ordner `ComfyUI-DaWasteh-H3-MusicVideo` nach `L:\ComfyUI\ComfyUI\custom_nodes\` kopieren; oder den beiliegenden PowerShell-Installer ausführen.
2. ComfyUI vollständig neu starten.
3. Im Browser `Strg+F5` drücken.
4. `MiniMax_H3_Complete_Song_to_Music_Video_One_Click_LOCAL.json` laden.

Keine zusätzlichen Python-Pakete werden installiert.

## Bedienung

1. `song`: Musikdatei auswählen/hochladen.
2. `reference_image`: optional. Ohne Bild beginnt Szene 1 nur aus Text + Audio; bei aktivierter Kontinuität dient ab Szene 2 das letzte Bild der vorherigen Szene als Referenz.
3. `master_visual_concept`: visuelle Welt, Hauptfigur, Verlauf und gewünschte Bildsprache beschreiben.
4. `lyrics_or_story_optional`: optionaler semantischer Inhalt. Normale Zeilen werden zeitlich verteilt; LRC-artige Zeilen wie `[02:17.40] Text` werden zeitlich zugeordnet.
5. Queue einmal starten.

Der Master-Job analysiert und startet die Job-Kette. Danach erzeugt jeder erfolgreiche Szenenjob automatisch den nächsten. Erst nachdem alle Clips als gültig bestätigt wurden, wird der Finalizer eingereiht.

## Was die Analyse tatsächlich versteht

Die automatische Analyse misst unter anderem Lautstärke/Energie, spektrale Helligkeit, Transienten, Strukturwechsel und ein geschätztes Tempo. Sie kann **nicht zuverlässig den semantischen Inhalt gesungener Lyrics erkennen**. Dafür ist das optionale Textfeld da.

Mit `scene_prompt_planner = local OpenAI-compatible LLM` kann ein lokales Modell an `http://127.0.0.1:8080/v1` aus Konzept, Text und Segmentmerkmalen einen zusammenhängenderen Szenenplan schreiben. Schlägt das LLM fehl, wird automatisch der deterministische Planer verwendet.

## Segmentierung und Audio

- Standardziel: ungefähr 10 Sekunden, Grenzen 7–13 Sekunden.
- Schnitte werden möglichst auf starke Beats/Taktanfänge oder Strukturwechsel gelegt.
- Jede Szene wird für H3 auf das gültige `17k+5`-Raster bei 24 fps aufgerundet.
- Nur die exakt benötigten Zielframes werden gespeichert; die Summe aller Szenenframes entspricht der Songdauer auf dem 24-fps-Raster.
- H3-generiertes Audio wird nie verwendet.
- Beim finalen Mux wird der ursprüngliche Audiostream mit FFmpeg `-c:a copy` übernommen: keine Normalisierung, kein Resampling, kein Audiofilter, keine erneute Audiokodierung.
- Standardausgabe ist MKV, weil dieser Container auch WAV/PCM, FLAC, Opus, MP3 und AAC zuverlässig per Stream-Copy aufnehmen kann. MP4 funktioniert nur, wenn der Original-Audiocodec MP4-kompatibel ist.

## Resume und Dateipfade

Projektstatus und Szenenplan:

```text
ComfyUI/output/DaWasteh_H3_MusicVideo_Projects/<Projekt-ID>/
├── manifest.json
├── scene_plan.json
├── source_audio.<Original-Endung>
├── segment_audio/
├── segments/
└── continuity/
```

Finale Ausgabe:

```text
ComfyUI/output/video/MiniMax_H3_MusicVideo/<Projekt-ID>/<Projektname>.mkv
```

Bei einem OOM oder sonstigen Fehler denselben Master-Workflow erneut starten. Gültige Clips werden erkannt. Mit Kontinuität werden ab dem ersten fehlenden Clip alle späteren Clips neu gerechnet, weil sie vom vorherigen Endbild abhängen. `force_rebuild = true` löscht das konkrete Projekt und beginnt vollständig neu.

## Grenzen

- Das ist eine lokale Queue-Orchestrierung, kein einzelner fünf Minuten großer H3-Latent. Genau dadurch bleibt der VRAM-Bedarf pro Szene begrenzt.
- Visuelle Kontinuität über viele unabhängige generative Shots ist nicht garantiert. Das feste Referenzbild plus vorheriges Endbild reduziert Drift, beseitigt sie aber nicht vollständig.
- Ein vollständiges Musikvideo besteht standardmäßig aus ungefähr 25–40 H3-Renders. Es ist entsprechend rechenintensiv.
- Der Master-Node zeigt den erwarteten Zielpfad sofort; die eigentliche Datei entsteht erst im automatisch eingereihten Finalizer.
