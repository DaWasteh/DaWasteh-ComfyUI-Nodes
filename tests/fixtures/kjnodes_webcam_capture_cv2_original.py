class WebcamCaptureCV2:

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "capture"
    CATEGORY = "KJNodes/experimental"
    DESCRIPTION = """
Captures a frame from a webcam using CV2.  
Can be used for realtime diffusion with autoqueue.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "x": ("INT", {"default": 0,"min": 0, "max": 4096, "step": 1}),
                 "y": ("INT", {"default": 0,"min": 0, "max": 4096, "step": 1}),
                 "width": ("INT", {"default": 512,"min": 0, "max": 4096, "step": 1}),
                 "height": ("INT", {"default": 512,"min": 0, "max": 4096, "step": 1}),
                 "cam_index": ("INT", {"default": 0,"min": 0, "max": 255, "step": 1}),
                 "release": ("BOOLEAN", {"default": False}),
            },
        } 

    def capture(self, x, y, cam_index, width, height, release):
        # Check if the camera index has changed or the capture object doesn't exist
        if not hasattr(self, "cap") or self.cap is None or self.current_cam_index != cam_index:
            if hasattr(self, "cap") and self.cap is not None:
                self.cap.release()
            self.current_cam_index = cam_index
            self.cap = cv2.VideoCapture(cam_index)
            try:
                self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)
                self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
            except cv2.error:
                pass
            if not self.cap.isOpened():
                raise RuntimeError("Could not open webcam")

        ret, frame = self.cap.read()
        if not ret:
            raise RuntimeError("Failed to capture image from webcam")

        # Crop the frame to the specified bbox
        frame = frame[y:y+height, x:x+width]
        img_torch = torch.from_numpy(frame[..., [2, 1, 0]]).float() / 255.0

        if release:
            self.cap.release()
            self.cap = None

        return (img_torch.unsqueeze(0),)

class AddLabel:
    pass
