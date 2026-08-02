import hashlib,importlib.util,json,struct,tempfile,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];S=importlib.util.spec_from_file_location('ai',ROOT/'tools/install_live_avatar_ai_assets.py');m=importlib.util.module_from_spec(S);S.loader.exec_module(m)
def tensor(path):
 h=json.dumps({'x':{'dtype':'F16','shape':[1],'data_offsets':[0,2]}}).encode();path.write_bytes(struct.pack('<Q',len(h))+h+b'xx')
class Assets(unittest.TestCase):
 def test_rejects_bad_tensor_and_paths(self):
  with tempfile.TemporaryDirectory() as d:
   p=Path(d)/'bad.safetensors';p.write_bytes(b'no');
   with self.assertRaises(ValueError):m.safe_tensor(p)
  for value in ('../x','C:/x','/x'):
   with self.assertRaises(ValueError):m.safe_rel(value)
 def test_tensor_header_and_cache_integrity(self):
  with tempfile.TemporaryDirectory() as d:
   p=Path(d)/'a.safetensors';tensor(p);self.assertTrue(m.safe_tensor(p));self.assertFalse(m.valid_target(p,p.stat().st_size+1,m.sha(p)))
 def test_queue_busy_and_offline_bad_source(self):
  old=m.queue_empty;m.queue_empty=lambda _:(_ for _ in ()).throw(RuntimeError('busy'))
  with self.assertRaises(RuntimeError):m.install(Path(tempfile.gettempdir()),Path(tempfile.gettempdir()),'x')
  m.queue_empty=old
 def test_offline_install_cache_and_rollback(self):
  old_assets,old_queue=m.ASSETS,m.queue_empty
  try:
   with tempfile.TemporaryDirectory() as d:
    root=Path(d); src=root/'src';src.mkdir(); (root/'models/checkpoints').mkdir(parents=True);(root/'models/clip_vision').mkdir(parents=True)
    tensor(root/m.CKPT);tensor(root/m.CLIP)
    assets=[]
    for i in range(3):
     p=src/f'a{i}.safetensors';tensor(p);assets.append((p.name,'https://huggingface.co/x',p.stat().st_size,m.sha(p),f'models/x/a{i}.safetensors'))
    m.ASSETS=tuple(assets);m.queue_empty=lambda _:None
    first=m.install(root,src,'x');self.assertEqual(len(first),3);self.assertEqual(m.install(root,src,'x'),first)
    first[0].write_bytes(b'bad')
    second=m.install(root,src,'x');self.assertTrue(m.safe_tensor(second[0]))
  finally:m.ASSETS, m.queue_empty=old_assets,old_queue
 def test_publication_failure_removes_new_targets(self):
  old_assets,old_queue=m.ASSETS,m.queue_empty
  try:
   with tempfile.TemporaryDirectory() as d:
    root=Path(d);src=root/'src';src.mkdir();(root/'models/checkpoints').mkdir(parents=True);(root/'models/clip_vision').mkdir(parents=True);tensor(root/m.CKPT);tensor(root/m.CLIP);assets=[]
    for i in range(3):
     p=src/f'a{i}.safetensors';tensor(p);assets.append((p.name,'https://huggingface.co/x',p.stat().st_size,m.sha(p),f'models/x/a{i}.safetensors'))
    m.ASSETS=tuple(assets);m.queue_empty=lambda _:None;original=Path.replace;calls={'n':0}
    def fail(self,target):
     if str(self).endswith('a1.safetensors') and 'payload' in str(self):raise OSError('injected')
     return original(self,target)
    Path.replace=fail
    with self.assertRaises(OSError):m.install(root,src,'x')
    self.assertFalse((root/'models/x/a0.safetensors').exists())
    Path.replace=original
  finally:m.ASSETS,m.queue_empty=old_assets,old_queue
 def test_manifest_is_pinned_and_safe(self):
  self.assertEqual(len(m.ASSETS),3)
  for name,url,size,digest,target in m.ASSETS:
   self.assertTrue(url.startswith('https://huggingface.co/'));self.assertEqual(len(digest),64);self.assertGreater(size,0);self.assertTrue(target.endswith('.safetensors'))
 def test_windows_workflow_combo_paths_match_pinned_object_info_fixture(self):
  fixture=json.loads((ROOT/'assets/live-avatar-v072/object-info.json').read_text(encoding='utf-8'))
  expected={5:('LoraLoader','lora_name'),8:('ControlNetLoader','control_net_name'),12:('IPAdapterModelLoader','ipadapter_file'),13:('CLIPVisionLoader','clip_name'),4:('CheckpointLoaderSimple','ckpt_name')}
  for path in (ROOT/'assets/live-avatar-v072/workflow-07.template.json',ROOT/'workflows/Live Avatar/LiveAvatar-07-AI-Webcam-Character-Swap-Experimental.json'):
   nodes={node['id']:node for node in json.loads(path.read_text(encoding='utf-8'))['nodes']}
   for node_id,(kind,field) in expected.items():self.assertIn(nodes[node_id]['widgets_values'][0],fixture[kind]['input']['required'][field][0])
if __name__=='__main__':unittest.main()
