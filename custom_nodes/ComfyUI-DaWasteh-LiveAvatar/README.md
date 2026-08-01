# ComfyUI-DaWasteh-LiveAvatar (experimental)

Continuous, face-only LivePortrait-to-Spout output for the Windows/RDNA4 ComfyUI installation.

Install by copying this directory into `ComfyUI/custom_nodes/` and restarting ComfyUI. It requires the already installed `ComfyUI-LivePortraitKJ`, OpenCV and `SpoutGL`/PyOpenGL from `Jovi_Spout`; no CUDA dependency is added.

Use `LiveAvatar-05-LivePortrait-Continuous-Spout-OBS.json`. Start it once with normal **Run**. It deliberately holds the Comfy execution thread so use **Interrupt** to stop it and never use **Run (Instant)**. OBS receives `ComfyLiveAvatarFast` with Composite Mode `Default`.

The node is intentionally face-only. Its capture and Spout worker threads retain just their latest frame to prevent latency buildup; all torch/ROCm inference and compositing remains in ComfyUI's execution thread.
