#!/usr/bin/env python3
"""Atomically install audited VRM presets into ComfyUI's global model directory."""
from __future__ import annotations
import argparse, hashlib, json, os, shutil, struct, tempfile, urllib.parse, urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; MANIFEST=ROOT/'assets/live-avatar-vrm/model-manifest.json'; TEXTURE=ROOT/'assets/live-avatar-vrm/panda-replacement.png'; MAX_BYTES=32*1024*1024

def digest(data): return hashlib.sha256(data).hexdigest()
def model_root(comfy_root=None):
 if comfy_root: return Path(comfy_root).resolve()/'models'/'live-avatar-vrm'
 try:
  import folder_paths
  return Path(folder_paths.models_dir).resolve()/'live-avatar-vrm'
 except ImportError: return ROOT/'models'/'live-avatar-vrm'
def load_manifest(path=MANIFEST):
 d=json.loads(Path(path).read_text(encoding='utf8'))
 if d.get('schema_version')!=2 or len(d.get('models',[]))!=4: raise ValueError('invalid manifest')
 return d
def parse_glb(data,allow_unaligned=False):
 if len(data)<20 or data[:4]!=b'glTF' or struct.unpack_from('<I',data,4)[0]!=2 or struct.unpack_from('<I',data,8)[0]!=len(data): raise ValueError('invalid GLB header')
 pos=12; chunks=[]
 while pos<len(data):
  if pos+8>len(data): raise ValueError('truncated GLB chunk')
  n,t=struct.unpack_from('<I4s',data,pos);pos+=8
  if (n%4 and not allow_unaligned) or pos+n>len(data): raise ValueError('invalid GLB chunk bounds')
  chunks.append((t,data[pos:pos+n]));pos+=n
 if pos!=len(data) or len(chunks)!=2 or chunks[0][0]!=b'JSON' or chunks[1][0]!=b'BIN\0': raise ValueError('GLB must contain JSON then BIN chunks')
 try: doc=json.loads(chunks[0][1].decode('utf8').rstrip(' \0\t\r\n'))
 except Exception as e: raise ValueError('invalid GLB JSON') from e
 binary=chunks[1][1]; buffers=doc.get('buffers',[])
 if len(buffers)!=1 or buffers[0].get('byteLength')>len(binary): raise ValueError('invalid GLB buffer length')
 for v in doc.get('bufferViews',[]):
  if v.get('buffer',0)!=0 or int(v.get('byteOffset',0))+int(v.get('byteLength',0))>len(binary): raise ValueError('invalid bufferView')
 if not ('VRM' in doc.get('extensions',{}) or 'VRMC_vrm' in doc.get('extensions',{})): raise ValueError('not VRM')
 return doc,binary
def valid_glb_vrm(data):
 try: parse_glb(data);return True
 except ValueError:return False
def safe_entry(e):
 u=urllib.parse.urlparse(e['source']); f=Path(e['filename'])
 if u.scheme!='https' or u.hostname!='arweave.net' or f.name!=e['filename'] or f.suffix!='.vrm':raise ValueError('unsafe manifest entry')
 for k in ('source_size','installed_size'):
  if not 0<int(e[k])<=MAX_BYTES:raise ValueError('unsafe size')
 for k in ('source_sha256','installed_sha256'):
  if len(e[k])!=64:raise ValueError('unsafe hash')
def fetch(e):
 safe_entry(e);r=urllib.request.Request(e['source'],headers={'User-Agent':'DaWasteh-LiveAvatar/0.7.2'})
 with urllib.request.urlopen(r,timeout=120) as h: data=h.read(MAX_BYTES+1)
 if len(data)!=e['source_size'] or digest(data)!=e['source_sha256']:raise ValueError('source size/hash mismatch')
 parse_glb(data,allow_unaligned=bool(e.get('normalize_glb_chunks')));return data
def pack(doc,binary):
 doc['buffers'][0]['byteLength']=len(binary);js=json.dumps(doc,separators=(',',':'),ensure_ascii=False).encode();js+=b' '*((-len(js))%4);binary+=b'\0'*(-len(binary)%4)
 return b'glTF'+struct.pack('<II',2,20+len(js)+8+len(binary))+struct.pack('<I4s',len(js),b'JSON')+js+struct.pack('<I4s',len(binary),b'BIN\0')+binary
def normalize_glb_chunks(data):
 parse_glb(data,allow_unaligned=True);pos=12;chunks=[]
 while pos<len(data):
  length,kind=struct.unpack_from('<I4s',data,pos);payload=data[pos+8:pos+8+length];padding=(-length)%4
  payload+=(b' ' if kind==b'JSON' else b'\0')*padding;chunks.append(struct.pack('<I4s',len(payload),kind)+payload);pos+=8+length
 result=b'glTF'+struct.pack('<II',2,12+sum(map(len,chunks)))+b''.join(chunks);parse_glb(result);return result
def panda_derivative(data,texture=TEXTURE):
 doc,binary=parse_glb(data);view=doc['bufferViews'][-1];o,n=int(view.get('byteOffset',0)),int(view['byteLength']);png=Path(texture).read_bytes()
 if not png.startswith(b'\x89PNG\r\n\x1a\n'):raise ValueError('invalid replacement PNG')
 view['byteLength']=len(png);return pack(doc,binary[:o]+png+binary[o+n:])
def expected(e,source):
 if e.get('normalize_glb_chunks'):source=normalize_glb_chunks(source)
 return panda_derivative(source) if e.get('derivative') else source
def cache_ok(path,e):
 if not path.is_file() or path.stat().st_size!=e['installed_size']:return False
 data=path.read_bytes();return digest(data)==e['installed_sha256'] and valid_glb_vrm(data)
def install(destination=None,manifest_path=MANIFEST):
 d=load_manifest(manifest_path);destination=Path(destination or model_root()).resolve(); entries=d['models']
 # A fully verified cache must be usable offline and never trigger a fetch.
 if all(cache_ok(destination/e['filename'],e) for e in entries):return [destination/e['filename'] for e in entries]
 destination.parent.mkdir(parents=True,exist_ok=True)
 sources=[fetch(e) for e in entries] # prefetch/validate before publication
 outputs=[]
 for e,s in zip(entries,sources):
  out=expected(e,s)
  if len(out)!=e['installed_size'] or digest(out)!=e['installed_sha256'] or not valid_glb_vrm(out):raise ValueError('installed derivative size/hash mismatch')
  outputs.append(out)
 stage=Path(tempfile.mkdtemp(prefix='live-avatar-vrm-',dir=destination.parent))
 try:
  target_stage=stage/'live-avatar-vrm';target_stage.mkdir()
  for e,out in zip(entries,outputs):(target_stage/e['filename']).write_bytes(out)
  backup=destination.with_name(destination.name+'.old')
  if backup.exists():shutil.rmtree(backup)
  moved=False
  if destination.exists():destination.replace(backup);moved=True
  try: target_stage.replace(destination)
  except Exception:
   if moved and backup.exists() and not destination.exists():backup.replace(destination)
   raise
  if backup.exists():shutil.rmtree(backup)
 finally: shutil.rmtree(stage,ignore_errors=True)
 return [destination/e['filename'] for e in entries]
def main():
 p=argparse.ArgumentParser();p.add_argument('--comfy-root',type=Path);p.add_argument('--destination',type=Path);p.add_argument('--manifest',type=Path,default=MANIFEST);a=p.parse_args()
 if a.comfy_root and a.destination:p.error('choose --comfy-root or --destination')
 for x in install(a.destination or model_root(a.comfy_root),a.manifest):print(x)
if __name__=='__main__':main()
