#!/usr/bin/env python3
"""Install/verify the pinned, portable Blender+VRM add-on without adding binaries to Git."""
from __future__ import annotations
import argparse,hashlib,json,shutil,subprocess,tempfile,urllib.request,zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];MANIFEST=json.loads((ROOT/'assets/live-avatar-blender/toolchain-manifest.json').read_text());DEFAULT=Path('L:/ComfyUI/tools/blender-4.5.9-windows-x64')
def sha(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 return h.hexdigest()
def safe_zip(path):
 with zipfile.ZipFile(path) as z:
  for i in z.infolist():
   p=Path(i.filename)
   if p.is_absolute() or '..' in p.parts:raise ValueError('unsafe archive path')
def fetch(spec,cache):
 p=cache/spec['filename'];cache.mkdir(parents=True,exist_ok=True)
 if not p.exists() or p.stat().st_size!=spec['size'] or sha(p)!=spec['sha256']:
  tmp=p.with_suffix('.part');urllib.request.urlretrieve(spec['url'],tmp);tmp.replace(p)
 if p.stat().st_size!=spec['size'] or sha(p)!=spec['sha256']:raise ValueError(f"hash/size mismatch: {p.name}")
 safe_zip(p);return p
def verify(dest):
 exe=dest/'blender.exe';addon=dest/'portable/extensions/user_default/vrm'
 if not exe.is_file():raise ValueError('blender.exe missing')
 out=subprocess.check_output([str(exe),'--background','--version'],text=True,stderr=subprocess.STDOUT)
 if 'Blender 4.5.9' not in out:raise ValueError('wrong Blender version')
 if not addon.exists():raise ValueError('VRM extension missing')
 print(json.dumps({'destination':str(dest),'version':'4.5.9','vrm_extension':str(addon)},indent=2))
def main():
 p=argparse.ArgumentParser();p.add_argument('--destination',type=Path,default=DEFAULT);p.add_argument('--cache',type=Path,default=Path('L:/ComfyUI/tools'));p.add_argument('--verify-destination',action='store_true');a=p.parse_args()
 if a.verify_destination:return verify(a.destination)
 bz=fetch(MANIFEST['blender'],a.cache);az=fetch(MANIFEST['vrm_addon'],a.cache)
 if a.destination.exists():return verify(a.destination)
 with tempfile.TemporaryDirectory(dir=a.destination.parent) as td:
  stage=Path(td)/a.destination.name;stage.mkdir();
  with zipfile.ZipFile(bz) as z:z.extractall(stage.parent)
  extracted=stage.parent/a.destination.name
  (extracted/'portable').mkdir(exist_ok=True)
  subprocess.check_call([str(extracted/'blender.exe'),'--background','--command','extension','install-file','-r','user_default','-e',str(az)])
  verify(extracted);extracted.replace(a.destination)
if __name__=='__main__':main()
