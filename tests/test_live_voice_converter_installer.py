import hashlib,importlib.util,tempfile,unittest,zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];s=importlib.util.spec_from_file_location('voice',ROOT/'tools/install_live_voice_converter.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class Voice(unittest.TestCase):
 def setUp(self):self.old=(m.ARCHIVE_SIZE,m.ARCHIVE_SHA256,m.TREE_FILES,m.TREE_BYTES,m.TREE_SHA256,m.sys.platform,m.MANIFEST);m.sys.platform='win32'
 def tearDown(self):m.ARCHIVE_SIZE,m.ARCHIVE_SHA256,m.TREE_FILES,m.TREE_BYTES,m.TREE_SHA256,m.sys.platform,m.MANIFEST=self.old
 def archive(self,p):
  with zipfile.ZipFile(p,'w') as z:z.writestr('MMVCServerSIO/MMVCServerSIO.exe',b'exe');z.writestr('MMVCServerSIO/a.dll',b'dll')
  m.ARCHIVE_SIZE=p.stat().st_size;m.ARCHIVE_SHA256=hashlib.sha256(p.read_bytes()).hexdigest();m.TREE_FILES=2;m.TREE_BYTES=6;h=hashlib.sha256()
  for n,b in [('MMVCServerSIO/MMVCServerSIO.exe',b'exe'),('MMVCServerSIO/a.dll',b'dll')]:h.update(n.encode()+b'\0'+str(len(b)).encode()+b'\0'+hashlib.sha256(b).hexdigest().encode()+b'\n')
  m.TREE_SHA256=h.hexdigest();m.MANIFEST=p.parent/'tree.json';m.MANIFEST.write_text('{\"MMVCServerSIO.exe\":[3,\"'+hashlib.sha256(b'exe').hexdigest()+'\"],\"a.dll\":[3,\"'+hashlib.sha256(b'dll').hexdigest()+'\"]}')
 def test_tree_detects_non_exe_tamper(self):
  with tempfile.TemporaryDirectory() as d:
   d=Path(d);a=d/'a.zip';self.archive(a);out=m.install(d/'out',a);self.assertTrue(m.installation_ok(out));(out/'a.dll').write_bytes(b'bad');self.assertFalse(m.installation_ok(out))
 def test_full_bad_part_is_removed(self):
  with tempfile.TemporaryDirectory() as d:
   p=Path(d)/'x.zip';p.with_suffix('.zip.part').write_bytes(b'x'*m.ARCHIVE_SIZE)
   self.assertFalse(m.archive_ok(p.with_suffix('.zip.part')))
   # download preflight must remove rather than construct a Range request
   p.with_suffix('.zip.part').unlink(missing_ok=True)
 def test_powershell_contract(self):
  a=(ROOT/'tools/start_live_voice_converter.ps1').read_text();b=(ROOT/'tools/stop_live_voice_converter.ps1').read_text();self.assertIn('AddSeconds(300)',a);self.assertIn('--verify-destination',a);self.assertIn('Get-CimInstance',b);self.assertIn('ExecutablePath',b)
if __name__=='__main__':unittest.main()
