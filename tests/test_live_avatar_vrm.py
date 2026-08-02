import hashlib,importlib.util,subprocess,sys,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];P=ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar/vrm_server.py';S=importlib.util.spec_from_file_location('vrm_server',P);v=importlib.util.module_from_spec(S);S.loader.exec_module(v)
class Request: 
 def __init__(self,remote):self.remote=remote
class VRMTests(unittest.TestCase):
 def test_global_path_loopback_and_traversal(self):
  self.assertEqual(v.model_root(Path('X:/Comfy')),Path('X:/Comfy/models/live-avatar-vrm'))
  self.assertTrue(v.loopback(Request('127.0.0.1')));self.assertFalse(v.loopback(Request('10.0.0.7')))
  with self.assertRaises(ValueError):v.safe_child(v.WEB_ROOT,'../../secret')
 def test_launcher_contract_and_local_built_assets(self):
  n=(ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar/nodes.py').read_text();self.assertIn('OUTPUT_NODE = True',n);self.assertIn('"ui": {"text": [url]}',n)
  web=ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar/web/vrm-app';notices=(web/'THIRD_PARTY_NOTICES.txt').read_text();self.assertTrue(all(x in notices for x in ['MediaPipe','Three.js','three-vrm','Kalidokit','Apache License']));self.assertFalse('http://' in (ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar/frontend/src/main.js').read_text())
 def test_generator_is_clean_room_and_byte_stable(self):
  import tempfile
  names=['LiveAvatar-06-VRM-Full-Body-Hand-Face+Live-Mic.json','LiveAvatar-07-AI-Webcam-Character-Swap-Experimental.json','LiveAvatar-08-Local-VRM-Texture-Creator-Realistic+Stylized.json','LiveAvatar-09-Meshy-AutoRig-to-VRM-Candidate-Optional-Cloud.json','LiveAvatar-10-Realistic-Adult-Character-Reference-Prompt+Image.json','LiveAvatar-11-AI-Webcam-Character-Swap-Cached-OpenPose.json']
  with tempfile.TemporaryDirectory() as d:
   out=Path(d);subprocess.run([sys.executable,str(ROOT/'tools/generate_live_avatar_v072_workflows.py'),'--destination',str(out)],check=True,stdout=subprocess.DEVNULL);first=[(out/n).read_bytes() for n in names]
   for n in names:(out/n).write_bytes(b'arbitrary')
   subprocess.run([sys.executable,str(ROOT/'tools/generate_live_avatar_v072_workflows.py'),'--destination',str(out)],check=True,stdout=subprocess.DEVNULL)
   self.assertEqual(first,[(out/n).read_bytes() for n in names]);self.assertEqual(first,[(ROOT/'workflows/Live Avatar'/n).read_bytes() for n in names])
 def test_controls_and_mapping_helpers_are_present(self):
  front=ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar/frontend';s=(front/'src/main.js').read_text();html=(front/'index.html').read_text();built=(ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar/web/vrm-app/index.html').read_text()
  self.assertIn('loopController',s);self.assertIn('lastFace',s);self.assertIn('enumerateDevices',s);self.assertIn('neutralLegs',s);self.assertIn('handInputs',s);self.assertIn('URL.revokeObjectURL',s);self.assertIn('Tracking-Frame verworfen',s);self.assertIn('targets.captureRest',s);self.assertIn('validPalmLandmarks',s);self.assertIn('Math.min(rawDt,.05)',s);self.assertNotIn('removeUnnecessaryJoints',s)
  self.assertIn('globalThis.Holistic',s);self.assertNotIn("from '@mediapipe/holistic'",s);self.assertIn('DirectionalLight',s);self.assertNotIn('HemisphereLight',s);self.assertIn('URLSearchParams(location.search)',s);self.assertIn("params.get('model')",s);self.assertIn("params.get('present')",s);self.assertIn("params.get('chroma')",s)
  self.assertIn('./mediapipe/holistic.js',html);self.assertIn('./mediapipe/holistic.js',built)
 def test_vrm_command_uses_live_global_root(self):
  text=(ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar/README.md').read_text();self.assertIn('--comfy-root L:/ComfyUI/ComfyUI',text)
if __name__=='__main__':unittest.main()
