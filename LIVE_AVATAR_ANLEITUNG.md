# Live-Avatar-Anleitung · v0.7.2

Diese Anleitung beschreibt die lokalen Live-Avatar-Wege dieses Repositories auf dem Windows-RDNA4-System. Alle Kamera- und Referenzbilder bleiben bei den lokalen Wegen auf dem Rechner.

> **Wichtig:** Die Workflows haben unterschiedliche Fähigkeiten. Ein 2D-Bild ist kein geriggter 3D-Avatar. Nur ein vorhandenes VRM0-Modell besitzt Körper-Rig, Finger und Gesichtsmorphs.

## Schnellwahl

| Ziel | Workflow | Ausgabe für OBS |
|---|---|---|
| Geriggter Full-Body-Avatar mit Gesicht, Händen und Körper | 06 | Chrome-Fensteraufnahme |
| Drei Bilder + Prompt als später auswählbare lokale VRM-Variante | 08, danach 06 | Chrome-Fensteraufnahme |
| Transparentes 2D-Bild mit LivePortrait-Gesichtsanimation | 02 → 03 | Spout2 `ComfyLiveAvatar` |
| Schnellere experimentelle LivePortrait-Dauerausgabe | 05 | Spout2 `ComfyLiveAvatarFast` |
| Langsamer KI-Webcam-Charaktertausch | 07 | Spout2 `ComfyAICharacterSwapExperimental` |
| Realistische 2D-Referenzbilder erzeugen | 10 | keine Live-Ausgabe |

## Voraussetzungen

1. ComfyUI läuft lokal unter `http://127.0.0.1:8188/`.
2. Die Live-Avatar-Custom-Node liegt unter `L:/ComfyUI/ComfyUI/custom_nodes/ComfyUI-DaWasteh-LiveAvatar/`.
3. Die geprüften VRM0-Presets sind installiert:

   ```powershell
   L:/ComfyUI/.venv/Scripts/python.exe tools/install_live_avatar_vrm_models.py --comfy-root L:/ComfyUI/ComfyUI
   ```

4. Für Spout-Ausgaben ist das OBS-Spout2-Plugin auf diesem System unter `C:/ProgramData/obs-studio/plugins/win-spout/` installiert. Ältere Workflow-Notizen nennen alternativ den benutzerspezifischen `%APPDATA%`-Ordner; für diese OBS-32-Installation gilt der verifizierte `ProgramData`-Pfad. OBS anschließend neu starten.
5. Nur eigene, lizenzierte oder ausdrücklich einvernehmlich bereitgestellte Bilder und Stimmen verwenden.

### Zusätzliche Abhängigkeiten nach Workflow

| Workflow | Erforderlich |
|---|---|
| 03/04 | `ComfyUI-LivePortraitKJ`, `ComfyUI-KJNodes`, LivePortrait-Modelle und `ComfyUI-DaWasteh-LiveAvatar` |
| 05 | dieselben LivePortrait-Modelle plus `ComfyUI-DaWasteh-LiveAvatar` |
| 06 | `ComfyUI-DaWasteh-LiveAvatar`, gebautes lokales Frontend und installierte VRM0-Presets |
| 07 | zusätzlich OpenPose-Preprocessor, SD1.5-Checkpoint, LCM-LoRA, OpenPose-ControlNet, IPAdapter Plus und CLIP Vision |
| 08 | SD1.5-Checkpoint, LCM-LoRA, IPAdapter Plus, CLIP Vision und ein kompatibles VRM0-Basismodell mit genau einer eingebetteten Basisfarbtextur |

Workflow 07 und 08 verwenden die gepinnten KI-Assets. Zuerst `Run (Instant)` stoppen und eine leere Queue abwarten, dann aus dem Repository-Root ausführen:

```powershell
L:/ComfyUI/.venv/Scripts/python.exe tools/install_live_avatar_ai_assets.py --comfy-root L:/ComfyUI/ComfyUI
```

Der Installer erwartet den vorhandenen SD1.5-Checkpoint `models/checkpoints/v1-5-pruned-emaonly-fp16.safetensors` und das vorhandene CLIP-Vision-Modell `models/clip_vision/CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors`. Nach einer Neuinstallation ComfyUI neu starten, damit die Modelllisten aktualisiert werden.

## Drei Inputbilder + Prompt → auswählbare VRM-Variante

Dafür ist **Workflow 08** vorgesehen:

`workflows/Live Avatar/LiveAvatar-08-Local-VRM-Texture-Creator-Realistic+Stylized.json`

### Was der Workflow wirklich erzeugt

Workflow 08 nimmt ein vorhandenes, bereits geriggtes VRM0-Basismodell mit genau einer eingebetteten Basisfarbtextur und ersetzt ausschließlich diese UV-Textur. Mehrtextur-Modelle werden mit einer klaren Fehlermeldung abgelehnt, statt nur teilweise verändert zu werden. Ein vorhandener Alpha-Kanal der Textur bleibt erhalten. Das akzeptierte Ergebnis wird als neue `.vrm`-Datei unter ComfyUIs globalem Modellordner `models/live-avatar-vrm/` gespeichert und kann anschließend in Workflow 06 ausgewählt werden.

Er erzeugt **keine neue Geometrie**, kein neues Rig und keine zuverlässige Identitätsrekonstruktion. Körperform, Gesichtskontur, Haare als Geometrie, Finger, Morphs und UV-Inseln bleiben vom Basismodell. Die drei Bilder führen zu einer erscheinungs-/ähnlichkeitsgeführten Texturvariante.

### Geeignete Referenzbilder

Verwende drei Bilder derselben klar erwachsenen, lizenzierten beziehungsweise einvernehmlich abgebildeten Person:

1. **Frontalansicht**
2. **Dreiviertelansicht**
3. **Seitenansicht/Profil**

Für ein besseres Mittel:

- ähnliche Beleuchtung, Mimik und Bildqualität,
- Gesicht in allen Bildern ungefähr gleich groß,
- möglichst gleicher Haarschnitt und gleiche Kleidung,
- keine weiteren Personen, Texte, Logos oder UI-Elemente,
- keine extremen Perspektiven oder verdeckten Gesichter.

Das erste Bild bestimmt die Zielgröße des Referenz-Batches; die beiden anderen Bilder werden dafür mittig angepasst. Sehr unterschiedliche Ausschnitte schwächen das Ergebnis.

### Schritt für Schritt

1. Workflow 08 in ComfyUI öffnen.
2. Im Node **„1 · Licensed VRM0 template + UV texture“** ein passendes VRM0-Basismodell auswählen.
3. Die Bilder laden:
   - **„Referenz 1 · Frontalansicht“**
   - **„Referenz 2 · Dreiviertelansicht“**
   - **„Referenz 3 · Seitenansicht“**
4. Im positiven Prompt das gewünschte Aussehen beschreiben, zum Beispiel:

   ```text
   realistic adult fantasy character, natural skin tones, dark brown hair,
   plain black fitted clothing, detailed fabric, no logos, preserve UV seams
   ```

5. Im Speichern-Node einen neuen eindeutigen Namen setzen, zum Beispiel:

   ```text
   basti-avatar-v1.vrm
   ```

   `allow_overwrite` auf `false` lassen. So wird kein vorhandener Avatar unbemerkt überschrieben.
6. Der Speichern-Node **„OPT-IN (MUTED)“** ist standardmäßig stummgeschaltet. Zuerst genau einmal normal **Run** drücken; dabei wird nur die Vorschau erzeugt und noch keine `.vrm`-Datei gespeichert.
7. Die flache UV-Vorschau auf Text, Logos, harte Nähte, verschmolzene Details oder starke Farbflächen prüfen. Bei Fehlern Prompt oder Seed ändern und erneut mit weiterhin stummgeschaltetem Speichern-Node ausführen.
8. Nur bei akzeptierter Vorschau den Speichern-Node aktivieren und erneut normal **Run** drücken. Der feste Seed und ComfyUI-Cache verwenden exakt die bereits geprüfte Textur.
9. Workflow 06 öffnen, im Browser **„Modellliste aktualisieren“** drücken und die neue `.vrm`-Datei auswählen.
10. Die Variante zusätzlich am gerenderten 3D-Modell aus mehreren Ansichten prüfen. Die flache UV-Vorschau allein beweist keine sauberen Nähte am Mesh. Abgelehnte Dateien unter `models/live-avatar-vrm/` löschen oder nicht auswählen.

### Sichere Startwerte

- IPAdapter-Gewicht: `0.35`
- Referenzkombination: `average`
- Img2Img-Denoise: `0.20`
- LCM-Schritte: `4`

Ein höheres IPAdapter-Gewicht kann Referenzmerkmale stärker mischen, aber UV-Strukturen verschlechtern. Ein höheres Denoise verändert mehr, erhöht jedoch die Gefahr kaputter UV-Nähte. Die Startwerte sind absichtlich konservativ.

## Geriggten VRM-Avatar live starten · Workflow 06

1. `LiveAvatar-06-VRM-Full-Body-Hand-Face+Live-Mic.json` öffnen.
2. Einmal **normal Run** drücken, niemals `Run (Instant)`.
3. Falls ComfyUI die URL nicht sichtbar anzeigt, diese Adresse in Chrome öffnen:

   <http://127.0.0.1:8188/dawasteh/vrm-live/>

4. Kamera so aufstellen, dass für Ganzkörpertracking Hüften, Knie und Knöchel stabil sichtbar sind; gleichmäßiges Licht und freie Hände verbessern die Erkennung. Der Automatikmodus fällt bei verlorenen Bein-Landmarks auf eine stabile Oberkörperpose zurück. Hand- und Fingertracking bleibt bei Verdeckung, schnellen Bewegungen oder Händen außerhalb des Bildes best-effort.
5. Im Browser:
   - Kamera erlauben,
   - **Kamera starten**,
   - Preset oder eigene VRM0-Datei wählen,
   - **Neutrale Pose kalibrieren**,
   - optional **OBS-Chroma-Grün** aktivieren,
   - **OBS-Präsentationsmodus** drücken oder `P`.
6. In OBS eine **Fensteraufnahme** hinzufügen und das Chrome-Fenster **„DaWasteh VRM Live Avatar“** auswählen.
7. Bei grünem Hintergrund unter **Filter → Chroma-Key** Grün entfernen.

Browser-Rendering und synthetisches Kameratracking sind automatisiert geprüft. Physische Kameraqualität, Gesten und die konkrete OBS-Szenenkomposition müssen auf dem jeweiligen Aufbau sichtbar kontrolliert werden.

Workflow 06 erzeugt keinen Spout-Sender. Chrome-Fensteraufnahme ist zuverlässiger als eine OBS-Browserquelle, weil Kamera-Freigabe und Interaktion im normalen Browser kontrollierbar bleiben.

### Optional als OBS-Browserquelle

Die gleiche URL kann in eine OBS-Browserquelle eingetragen werden. Danach über **Rechtsklick → Interagieren** die Kamera starten. Dieser Weg ist nicht der primär getestete Pfad; wenn Kamera oder WebGL in OBS/CEF nicht funktionieren, Chrome plus Fensteraufnahme verwenden.

## 2D-Avatar über LivePortrait und Spout · Workflow 03

1. Ein Quellbild erzeugen oder bereitstellen.
2. Mit Workflow 02 den Hintergrund entfernen.
3. Das transparente PNG in Workflow 03 unter **„Transparenten Avatar laden“** wählen.
4. Prüfen, dass Backend und Kameraindex zusammenpassen. Die Zahlen sind nicht backendübergreifend stabil:
   - DirectShow: Elgato Virtual Camera `0`, Facecam Pro `1`, Logitech BRIO `2`, OBS Virtual Camera `3`
   - Media Foundation: Logitech BRIO `0`, Elgato Virtual Camera `1`, Facecam Pro `2`
5. Zuerst genau einen normalen Lauf ausführen.
6. Danach **Run (Instant)** aktivieren, damit neue Webcam-Frames verarbeitet werden.
7. In OBS **Spout2 Capture** hinzufügen.
8. Sender **`ComfyLiveAvatar`** auswählen und Alpha/Transparenz aktivieren.

Der Spout-Sender hält das letzte fertige Bild sichtbar, erzeugt aber nur dann neue Bewegung, wenn weitere ComfyUI-Ausführungen stattfinden.

## Continuous LivePortrait · Workflow 05

1. Workflow 05 öffnen.
2. Einmal normal **Run** drücken.
3. In OBS den Spout2-Sender **`ComfyLiveAvatarFast`** mit Composite Mode `Default` wählen.
4. Mit ComfyUI **Interrupt** stoppen.

Bei Workflow 05 niemals `Run (Instant)` verwenden. Der Continuous-Node hält den ComfyUI-Ausführungsthread belegt und animiert ausschließlich Gesicht/Kopf.

## Buffered AI Mirror · Workflow 07

Workflow 07 kombiniert Webcam, OpenPose, SD1.5-LCM und IPAdapter. Er läuft auf der R9700 nur ungefähr mit 0,36–0,50 neuen Frames pro Sekunde und ist deshalb kein echter Echtzeitpfad. Der reparierte Kamera-Node ist ausdrücklich auf Logitech BRIO, DirectShow und Index 2 gestellt; damit darf OBS die Elgato-Kamera parallel weiterverwenden.

- Wiederholte Ausführung beziehungsweise `Run (Instant)` verwenden.
- In OBS den Spout2-Sender **`ComfyAICharacterSwapExperimental`** auswählen.
- Die BRIO für ComfyUI frei lassen.

## Optimierter Buffered AI Mirror · Workflow 11

Workflow 11 bleibt ein separater Graph und überschreibt Workflow 07 nicht. Er verwendet `DaWastehCachedOpenPose`, hält die OpenPose-Gewichte nach dem ersten Lauf auf der R9700 und nutzt standardmäßig 384×384 mit Körper- und Gesichtserkennung. Die besonders teure Handerkennung ist zunächst deaktiviert.

- Nach Installation oder Aktualisierung von `ComfyUI-DaWasteh-LiveAvatar` ComfyUI 8188 neu starten.
- Workflow 11 laden und zuerst einen einzelnen Kaltstart ausführen.
- Danach `Run (Instant)` aktivieren.
- Der OBS-Sender bleibt **`ComfyAICharacterSwapExperimental`**.
- Gemessene warme Laufzeit: 0,62–0,68 Sekunden, Median 0,645 Sekunden beziehungsweise etwa 1,55 neue Bilder/s.
- Für wichtigere Handposen im Cached-OpenPose-Node `detect_hand = enable` setzen; das kostet auf der R9700 ungefähr 0,54 Sekunden zusätzlich pro Frame.

Zwei Diffusionsläufe auf derselben GPU werden absichtlich nicht parallel gestartet: OpenPose, VAE und Sampler würden um dieselben GPU-Ressourcen konkurrieren, während Frames veralten und die Ende-zu-Ende-Latenz steigt. Das Caching plus kleinere Arbeitsauflösung reduziert stattdessen den tatsächlich seriellen kritischen Pfad.

## OBS-Fehlerbehebung

### Kein Spout-Sender in OBS

- Erst einen erfolgreichen Workflow-Lauf abwarten.
- OBS nach Plugin-Installation neu starten.
- Richtigen Namen wählen: `ComfyLiveAvatar`, `ComfyLiveAvatarFast` oder `ComfyAICharacterSwapExperimental`.
- Workflow 06 verwendet grundsätzlich keinen Spout-Sender.

### Sender sichtbar, Bild bleibt schwarz

OBS und der sendende ComfyUI-Prozess müssen für Spout auf derselben physischen GPU laufen. Für den ComfyUI-Server auf Port 8188 bedeutet das auf diesem System üblicherweise die Radeon AI Pro R9700. Die Zuordnung in Windows unter **System → Anzeige → Grafik** prüfen und beide Programme danach neu starten.

### Webcam lässt sich nicht öffnen

- Andere Browser-Tabs und OBS-Kameraquellen schließen beziehungsweise deaktivieren.
- Workflow 03, 07 oder 11: `Run (Instant)` stoppen, im `WebcamCaptureCV2`-Node `release=true` setzen und einmal ausführen; anschließend für den nächsten Start wieder auf `false` stellen.
- Bei `0xC00D3704` Backend und Index prüfen: MSMF-Index 1 ist auf diesem Rechner die Elgato Virtual Camera, nicht die Logitech BRIO. Workflows 07/11 verwenden deshalb DirectShow-Index 2.
- Workflow 05: mit **Interrupt** stoppen und die leere Queue abwarten.
- Workflow 06: Browser-Tab beziehungsweise Fenster schließen, damit `getUserMedia` die Kamera freigibt.
- USB-Neuverbindungen können die OpenCV-Kameraindizes verändern.
- Workflow 06 und die Workflows 03/05/07/11 nicht gleichzeitig dieselbe Kamera verwenden lassen.

### Neue VRM-Datei erscheint nicht

- In Workflow 06 **„Modellliste aktualisieren“** drücken.
- Prüfen, dass der Dateiname auf `.vrm` endet.
- Nicht versuchen, eine ungeriggte `.glb` lediglich in `.vrm` umzubenennen.
- Der Browser unterstützt derzeit geprüfte VRM0-Dateien; nicht jede VRM-1.0-Datei ist kompatibel.

## Audio · optionaler DirectML-RVC-Begleiter

Workflow 06 liefert nur Video. Die optionale Live-Stimmwandlung läuft getrennt über den lokalen DirectML-RVC-Begleiter und ist ausdrücklich nicht Qwen-TTS/Voice-LoRA.

Installation und Start aus dem Repository-Root:

```powershell
L:/ComfyUI/.venv/Scripts/python.exe tools/install_live_voice_converter.py --destination L:/ComfyUI/voice-changer-dml-b2332
powershell -ExecutionPolicy Bypass -File tools/start_live_voice_converter.ps1 -InstallPath L:/ComfyUI/voice-changer-dml-b2332
```

Nur ein eigenes oder ausdrücklich lizenziertes kompatibles RVC-Modell verwenden. Das virtuelle Audiokabel ist nicht Bestandteil dieses Repositories. Das konvertierte Signal über ein separates Kabel in OBS aufnehmen und das Originalmikrofon im Mix stummschalten, um Doppelton, Originalstimmen-Leakage und Feedback zu vermeiden.

Offene manuelle Abnahmen für diesen optionalen Audiopfad sind physische Mikrofon-/Kabel-Routingqualität, mindestens zehn Minuten Stabilität, hörbare Qualitätsprüfung, kein Feedback beziehungsweise Originalsignal und die gewünschte Ende-zu-Ende-Latenz. Details und gemessene DirectML-Werte: [docs/live-avatar-v072-voice-backend-evaluation.md](docs/live-avatar-v072-voice-backend-evaluation.md).
