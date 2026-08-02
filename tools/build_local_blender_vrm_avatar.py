#!/usr/bin/env python3
"""Build a local, conservative Olivia-derived VRM0 candidate; never uploads the portrait."""
from __future__ import annotations
import argparse,hashlib,json,subprocess,tempfile
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1];PROFILE=json.loads((ROOT/'assets/live-avatar-vrm/olivia-appearance-profile-v1.json').read_text())
BLENDER=Path('L:/ComfyUI/tools/blender-4.5.9-windows-x64/blender.exe');MODELS=Path('L:/ComfyUI/ComfyUI/models/live-avatar-vrm');INPUT=Path('L:/ComfyUI/ComfyUI/input')
def digest(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 return h.hexdigest()
def safe(name):
 if Path(name).name!=name or not name.endswith('.vrm') or name=='olivia.vrm':raise ValueError('output must be a new safe .vrm filename')
def extract_texture(source,dst):
 import sys,io
 sys.path.insert(0,str(ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar'));import vrm_tools as v
 doc,binary=v.parse_glb(source.read_bytes());_,_,view=v.image_binding(doc);dst.write_bytes(v.texture_bytes(doc,binary,view))
def recolor(src,dst):
 """UV-local palette adjustment only; deliberately never projects portrait pixels."""
 im=Image.open(src).convert('RGBA');p=im.load();w,h=im.size
 for y in range(h):
  for x in range(w):
   r,g,b,a=p[x,y]
   # Olivia lower garment UV islands: light neutral clothing, retain alpha/UVs.
   if a and ((390<x<670 and 570<y<1015) or (0<x<330 and 360<y<700)) and max(r,g,b)<80:
    p[x,y]=(210,214,220,a)
   # Brown eye chips are tiny, keep existing dark/brown values rather than inventing iris geometry.
 im.save(dst,'PNG',optimize=False)
def validate(path):
 import sys
 sys.path.insert(0,str(ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar'));import vrm_tools as v
 data=path.read_bytes();doc,b=v.parse_glb(data);ext=v.vrm0(doc)
 if len(data)>v.MAX_BYTES:raise ValueError('output exceeds browser limit')
 bones={x['bone'] for x in ext['humanoid']['humanBones']};required=set(v.REQUIRED)|set(v.FINGERS)
 if not required<=bones:raise ValueError('export lost humanoid/finger mapping')
 groups={str(x.get('name')):x for x in ext.get('blendShapeMaster',{}).get('blendShapeGroups',[])}
 if not {'A','E','I','O','U','Blink','TongueOut'}<=set(groups):raise ValueError('missing required expression group')
 t=groups['TongueOut'];
 if not t.get('binds'):raise ValueError('TongueOut is unbound')
 for bind in t['binds']:
  mesh=doc['meshes'][bind['mesh']];prim=mesh['primitives'][0];target=prim['targets'][bind['index']]
  if 'POSITION' not in target:raise ValueError('TongueOut has no real POSITION morph')
 return {'bytes':len(data),'sha256':digest(path),'bones':len(bones),'groups':sorted(groups)}
def main():
 p=argparse.ArgumentParser();p.add_argument('--portrait',default='02_Avatar_Transparent_00001_.png');p.add_argument('--output',default='olivia-portrait-style-tongue.vrm');p.add_argument('--blender',type=Path,default=BLENDER);p.add_argument('--models',type=Path,default=MODELS);a=p.parse_args();safe(a.output)
 source=a.models/'olivia.vrm';portrait=INPUT/a.portrait;target=a.models/a.output
 if target.exists():raise FileExistsError(target)
 if digest(source)!=PROFILE['base_sha256']:raise ValueError('Olivia base hash mismatch')
 if not portrait.is_file():raise FileNotFoundError(portrait)
 if not a.blender.is_file():raise FileNotFoundError(a.blender)
 with tempfile.TemporaryDirectory(prefix='olivia-vrm-',dir=a.models) as td:
  td=Path(td);original=td/'olivia-original.png';texture=td/'olivia-appearance.png';extract_texture(source,original);recolor(original,texture)
  if texture.stat().st_size < 1000:raise ValueError('invalid appearance texture')
  staged=td/a.output;blend=Path('L:/ComfyUI/tools')/'olivia-portrait-style-tongue.blend';report=td/'report.json'
  cmd=[str(a.blender),'--background','--python',str(ROOT/'tools/blender/build_olivia_reference_avatar.py'),'--',str(source),str(texture),str(staged),str(blend),str(report)]
  subprocess.run(cmd,check=True,timeout=300)
  info=validate(staged);staged.replace(target)
 print(json.dumps({'output':str(target),**info},indent=2))
if __name__=='__main__':main()
