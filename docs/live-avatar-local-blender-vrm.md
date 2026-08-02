# Lokaler Blender-VRM-Kandidat

`tools/build_local_blender_vrm_avatar.py` erzeugt lokal einen VRM0-Kandidaten aus der hash-geprüften CC0-Datei `olivia.vrm`. Blender 4.5.9 Portable und die VRM-Erweiterung 4.5.0 sind über `tools/install_live_avatar_blender.py` pinbar und prüfbar. Weder Referenzbild noch Kamera verlassen den Rechner.

Die Datei `02_Avatar_Transparent_00001_.png` ist nur ein frontales Oberkörperporträt. Der Kandidat ist daher **eine Olivia-abgeleitete Stilannäherung, kein Klon**: Körper, Hände, Finger, Seiten- und Rückansicht bleiben vom CC0-Original geerbt. Die Builder-Textur ändert nur konservativ lokale UV-Farbbereiche und projiziert das Porträt nicht über unbekannte Flächen.

Der Kandidat enthält eine reale rosa Zungengeometrie mit einem VRM0-Custom-Blendshape `TongueOut`. Im Browser: Zunge über den Button oder `T` gedrückt halten. Die manuelle Aktion öffnet zusätzlich A teilweise. MediaPipe Holistic meldet keinen zuverlässigen Zungenwert. `T`/Button bleibt deshalb der unterstützte Pfad. Eine standardmäßig ausgeschaltete Webcam-Farbheuristik kann im geöffneten Mund pink-rote Zungenpixel erkennen, ist aber wegen Lippenstift, Licht und Schatten ausdrücklich experimentell und nicht zugesichert.

Prüfen: Browsermodell laden, `T` halten, danach Kopf/Mund/Hand/Finger in einer sichtbaren Webcam-Session testen. Die GLB/VRM-Datei und das Zwischen-`.blend` enthalten abgeleitete lokale Daten und dürfen nicht in Git aufgenommen werden.
