# ComfyUI-DaWasteh-Qwen3TTS-LoRA

Two local ComfyUI nodes for real PEFT LoRA voice adaptation with Qwen3-TTS:

- `DaWastehQwen3TTSLoRATrain`: trains an adapter and stores its speaker embedding.
- `DaWastehQwen3TTSLoRAInference`: loads a selectable adapter with adjustable LoRA scale.

The implementation targets the 12 Hz Base models and uses BF16 plus SDPA on the Windows ROCm/HIP build used by this repository. It does not require CUDA-only Flash Attention or Triton.

## Prerequisites and installation

Install either `qwen3-tts-comfyui` or `ComfyUI-Qwen-TTS` first. This pack deliberately reuses that node's matching `qwen_tts` runtime instead of installing a second, potentially conflicting Transformers stack.

From this workflow repository, run:

```powershell
L:/ComfyUI/.venv/Scripts/python.exe tools/install_qwen3_tts_lora_node.py --comfyui-root L:/ComfyUI/ComfyUI
```

The installer refuses to write while the live queue is busy, verifies the Qwen runtime, installs the bounded Python requirements into the target ComfyUI interpreter, copies the node pack, and requests a restart. Use `--skip-dependency-install` only when the environment was provisioned separately and already passes the import check.

## Dataset

Place audio/transcript pairs in one folder. Every audio file needs a UTF-8 text file named either `<audio-stem>.txt` or `<audio-stem>_Text.txt`:

```text
ComfyUI/input/qwen3tts_lora/my_voice/
├── 001.wav
├── 001.txt
├── 002.wav
└── 002_Text.txt
```

Use only speech you own or have explicit permission to clone. Clean, single-speaker recordings and exact transcripts give the best result. The trainer creates cached 24 kHz mono WAVs before tokenization.

## Safe starting settings

- Model: 0.6B for the first AMD smoke test, 1.7B for final quality.
- Learning rate: `2e-6`.
- Epochs: `1` for smoke testing, then compare checkpoints up to about `10`.
- Batch: `1`; gradient accumulation: `4`.
- Rank/alpha: `16/32`.
- Inference LoRA scale: compare `0.2`, `0.3`, `0.35`, and `0.5`; `1.0` often over-steers.
- Attention: `sdpa` on AMD RDNA4.

Adapter checkpoints contain `adapter_model.safetensors`, `adapter_config.json`, `speaker_embedding.safetensors`, and `qwen3_tts_speaker.json`. Only Safetensors/JSON are loaded; untrusted pickle files are never accepted.

## Important limitation

The ComfyUI node returns a complete audio clip after one queued request. It is low-latency request-based TTS, not continuous microphone-to-speaker streaming. The LivePortrait workflow can keep video in Auto Queue because unchanged audio nodes remain cached; change the text or adapter to synthesize a new line.

## Attribution

Training loss fixes, PEFT targets, speaker-embedding handling, and scale guidance are adapted from the Apache-2.0 companion project:

- https://github.com/cheeweijie/qwen3-tts-lora-finetuning
- https://github.com/QwenLM/Qwen3-TTS
