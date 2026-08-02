# v0.7.2 live microphone voice conversion

Optional companion: [deiteris/voice-changer](https://github.com/deiteris/voice-changer) `b2332` (MIT), Windows DirectML RVC archive. It is RVC conversion, not Qwen TTS/LoRA. Use only models you own or are licensed to use.

```powershell
python tools/install_live_voice_converter.py --destination L:/ComfyUI/voice-changer-dml-b2332
powershell -ExecutionPolicy Bypass -File tools/start_live_voice_converter.ps1 -InstallPath L:/ComfyUI/voice-changer-dml-b2332
```

The ZIP is pinned to 288921773 bytes and SHA-256 `8eb902b4cfaeaa68e1d5d2dc3ff3b1dbf82f5abb8bb6d05c3e1c4619f03a5ed5`; every archived runtime file is verified before launch (3400 files, 806658313 bytes, tree SHA-256 `ddd816e470e4ff8765f11dd83ae927fa238ae36272017f71bf3977c19727e961`). `--archive` permits an offline ZIP install, but **runtime is not fully pinned/offline**: first startup downloads upstream model weights (including ONNX/PTH), needs Internet/disk space, and the observed first startup took about 164 seconds. The launcher allows 300 seconds.

The startup command prints an identity-checked controlled stop command. b2332 exposes no authenticated graceful shutdown endpoint, so the stop helper verifies the executable path for the PID then terminates it; it is not presented as graceful shutdown.

## Measured conversion acceptance

A trusted upstream test model governed by its supplied Amitaro test terms was downloaded only for local validation: PTH size `55235736`, SHA-256 `c336ee63c220ea07b2220c438af446f7dbf93f4472ad477add4866fb5bf25092`. b2332 imported it, selected RX 9070 XT DirectML (device 0) and `rmvpe_onnx`, converted test audio successfully, and exported its own compatible ONNX (`110393859` bytes, SHA-256 `5599eea47354993ae8d18e89f330f1a72c8d620af7896df3e18fc03f4ebdc49d`). Warm REST tests for 100-ms/48-kHz chunks measured roughly 36–41 ms model compute and 45–63 ms request round-trip after warm-up. Two older upstream `*_simple.onnx` test exports were rejected because b2332 expects `skip_head`; do not assume arbitrary ONNX compatibility.

The default RODE NT-USB microphone was also opened at 48 kHz and delivered six 100-ms chunks into the same REST conversion path; the room/input was effectively silent (about `1.46e-5` RMS), so this confirms device capture/routing but not audible speech quality. This proves model loading, DirectML inference and app-exported ONNX inference—not a complete audible microphone/OBS chain. For real use, import only an owned/licensed compatible model, use a separately installed virtual cable, capture only converted audio in OBS, and mute the original microphone. Remaining manual gates: physical microphone routing, OBS recording, at least 10-minute stability, no feedback/original-voice leakage, audible quality review, and p95 end-to-end latency under the desired 250–300 ms target. Avoid heavy 8189 jobs while DirectML RVC occupies the RX 9070 XT.
