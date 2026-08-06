# ComfyUI-DaWasteh-H3-AutoLength

Three dependency-free helper nodes for local MiniMax H3 workflows:

1. **Prepare Reference Video for H3 Auto Length**
   - reads source duration before loading H3,
   - resamples reference motion to H3's native 24 fps,
   - derives the output length automatically,
   - snaps upward to the required `17k+5` frame grid,
   - pads only the final grid tail.

2. **Load Audio for H3 Auto Length**
   - loads the audio reference,
   - derives the H3 length from its decoded sample duration,
   - exposes the original absolute path for stream-copy muxing.

3. **Save Video with Original Audio (Stream Copy)**
   - encodes only the generated video,
   - muxes the original input audio with `-c:a copy`,
   - defaults to MKV for broad codec compatibility.

## Installation

Copy this complete folder to:

```text
L:\ComfyUI\ComfyUI\custom_nodes\ComfyUI-DaWasteh-H3-AutoLength
```

Restart ComfyUI and hard-refresh the browser (`Ctrl+F5`).

No additional Python packages are required beyond current ComfyUI. FFmpeg must be available through PATH, `FFMPEG_PATH`, `imageio-ffmpeg`, or VideoHelperSuite.
