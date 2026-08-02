import hashlib,importlib.util,json,struct,tempfile,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];S=importlib.util.spec_from_file_location('installer',ROOT/'tools/install_live_avatar_vrm_models.py');m=importlib.util.module_from_spec(S);S.loader.exec_module(m)
class Assets(unittest.TestCase):
 def test_manifest_and_panda_are_pinned(self):
  d=m.load_manifest();self.assertEqual([x['id'] for x in d['models']],['amazonas','olivia','lady-koi','panda-bear']);p=d['models'][-1];data=(ROOT/'tmp/vrm-models/teddy.vrm').read_bytes() if (ROOT/'tmp/vrm-models/teddy.vrm').exists() else None
  self.assertTrue((ROOT/'assets/live-avatar-vrm/panda-replacement.png').read_bytes().startswith(b'\x89PNG'))
  if data:self.assertEqual((len(m.panda_derivative(data)),m.digest(m.panda_derivative(data))),(p['installed_size'],p['installed_sha256']))
 def test_manifest_truthfully_audits_spring_bones_and_colliders(self):
  models={x['id']:x for x in m.load_manifest()['models']}
  self.assertEqual({key:(value['vrm0_spring_bone_groups'],value['vrm0_collider_groups']) for key,value in models.items()},{'amazonas':(0,0),'olivia':(0,0),'lady-koi':(1,0),'panda-bear':(0,0)})
  self.assertIn('limited authored spring motion',models['lady-koi']['physics_claim'])
  self.assertTrue(all('does not synthesize physics' in value['physics_claim'] for key,value in models.items() if key!='lady-koi'))
 def test_glb_rejects_bad_chunks(self):
  with self.assertRaises(ValueError):m.parse_glb(b'glTF'+b'\0'*16)
  self.assertFalse(m.valid_glb_vrm(b'not-glb'))
 def test_pinned_unaligned_source_is_normalized(self):
  payload=b'{"asset":{"version":"2.0"},"extensions":{"VRM":{}},"buffers":[{"byteLength":0}]} '
  raw=b'glTF'+struct.pack('<II',2,12+8+len(payload)+8)+struct.pack('<I4s',len(payload),b'JSON')+payload+struct.pack('<I4s',0,b'BIN\0')
  with self.assertRaises(ValueError):m.parse_glb(raw)
  normalized=m.normalize_glb_chunks(raw);self.assertTrue(m.valid_glb_vrm(normalized));self.assertEqual(len(normalized)%4,0)
 def test_global_destination_and_cache_integrity(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);self.assertEqual(m.model_root(root),root/'models/live-avatar-vrm')
   e=m.load_manifest()['models'][0];p=root/'x.vrm';p.write_bytes(b'bad');self.assertFalse(m.cache_ok(p,e))
 def test_valid_cache_skips_fetch(self):
  with tempfile.TemporaryDirectory() as td:
   original_fetch=m.fetch;original_cache=m.cache_ok
   try:
    m.fetch=lambda entry: (_ for _ in ()).throw(AssertionError('network fetch'))
    m.cache_ok=lambda path,entry: True
    result=m.install(Path(td)/'missing-parent'/'live-avatar-vrm')
    self.assertEqual(len(result),4)
   finally:m.fetch=original_fetch;m.cache_ok=original_cache
 def test_panda_bin_chunk_is_standards_value(self):
  try:data=(ROOT/'tmp/vrm-models/teddy.vrm').read_bytes()
  except FileNotFoundError:self.skipTest('source not present')
  out=m.panda_derivative(data);doc,binary=m.parse_glb(out);j=12+struct.unpack_from('<I',out,12)[0]+8;self.assertEqual(struct.unpack_from('<4s',out,j+4)[0],b'BIN\0');self.assertLessEqual(doc['buffers'][0]['byteLength'],len(binary))
if __name__=='__main__':unittest.main()
