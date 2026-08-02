#!/usr/bin/env python3
"""Safely install pinned Workflow 07 safetensors; never changes Python/ROCm packages."""
from __future__ import annotations
import argparse, hashlib, json, os, shutil, struct, tempfile, urllib.parse, urllib.request
from pathlib import Path
ASSETS=(
 ('pytorch_lora_weights.safetensors','https://huggingface.co/latent-consistency/lcm-lora-sdv1-5/resolve/main/pytorch_lora_weights.safetensors',134621556,'8f90d840e075ff588a58e22c6586e2ae9a6f7922996ee6649a7f01072333afe4','models/loras/LiveAvatar/lcm-lora-sdv1-5.safetensors'),
 ('control_v11p_sd15_openpose_fp16.safetensors','https://huggingface.co/comfyanonymous/ControlNet-v1-1_fp16_safetensors/resolve/main/control_v11p_sd15_openpose_fp16.safetensors',722601100,'4003c1da17b0e4ba444e02140e1c0d83bb24b79e4dcfd613c3a554d38f0f89c7','models/controlnet/SD1.5/control_v11p_sd15_openpose_fp16.safetensors'),
 ('ip-adapter-plus_sd15.safetensors','https://huggingface.co/h94/IP-Adapter/resolve/main/models/ip-adapter-plus_sd15.safetensors',98183288,'a1c250be40455cc61a43da1201ec3f1edaea71214865fb47f57927e06cbe4996','models/ipadapter/ip-adapter-plus_sd15.safetensors'),
)
CLIP='models/clip_vision/CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors'; CKPT='models/checkpoints/v1-5-pruned-emaonly-fp16.safetensors'; MAX_HEADER=16*1024*1024
def sha(p):
 h=hashlib.sha256()
 with Path(p).open('rb') as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 return h.hexdigest()
def safe_tensor(p):
 p=Path(p)
 if p.suffix!='.safetensors' or not p.is_file() or p.stat().st_size<9: raise ValueError('not a safetensors file')
 with p.open('rb') as f:
  n=struct.unpack('<Q',f.read(8))[0]
  if not 2<=n<=MAX_HEADER or n>p.stat().st_size-8: raise ValueError('invalid safetensors header size')
  try: header=json.loads(f.read(n).decode('utf8'))
  except Exception as e: raise ValueError('invalid safetensors JSON header') from e
 if not isinstance(header,dict) or not any(k!='__metadata__' for k in header): raise ValueError('safetensors has no tensors')
 return True
def safe_rel(value):
 p=Path(value)
 if p.is_absolute() or '..' in p.parts or ':' in value or value.startswith(('\\', '/')): raise ValueError('unsafe target path')
 return p
def queue_empty(server):
 try:
  with urllib.request.urlopen(server.rstrip('/')+'/queue',timeout=5) as r: q=json.load(r)
 except Exception as e: raise RuntimeError(f'cannot check ComfyUI queue at {server}: {e}') from e
 if q.get('queue_running') or q.get('queue_pending'): raise RuntimeError('ComfyUI queue is not empty; refuse model publication')
def valid_target(p,size,digest):
 return p.is_file() and p.stat().st_size==size and sha(p)==digest and safe_tensor(p)
def fetch(url,target,size,digest):
 u=urllib.parse.urlparse(url)
 if u.scheme!='https' or u.hostname!='huggingface.co': raise ValueError('URL is not allowlisted HTTPS')
 part=target.with_suffix(target.suffix+'.part'); offset=part.stat().st_size if part.exists() else 0
 req=urllib.request.Request(url,headers={'User-Agent':'DaWasteh-LiveAvatar/0.7.2',**({'Range':f'bytes={offset}-'} if offset else {})})
 with urllib.request.urlopen(req,timeout=120) as r:
  if offset and getattr(r,'status',200)!=206: part.unlink(missing_ok=True); return fetch(url,target,size,digest)
  with part.open('ab' if offset else 'wb') as out:
   for chunk in iter(lambda:r.read(1024*1024),b''):
    if out.tell()+len(chunk)>size: raise ValueError('download exceeds pinned size')
    out.write(chunk)
 if not valid_target(part,size,digest): raise ValueError('download size, hash, or safetensors validation failed')
 part.replace(target); return target
def install(comfy_root,source_dir=None,server='http://127.0.0.1:8188'):
 root=Path(comfy_root).resolve(); queue_empty(server)
 if not (root/CKPT).is_file(): raise ValueError(f'missing required SD1.5 checkpoint: {root/CKPT}')
 if not (root/CLIP).is_file(): raise ValueError(f'missing required CLIP Vision model: {root/CLIP}')
 targets=[root/safe_rel(a[4]) for a in ASSETS]
 if all(valid_target(t,a[2],a[3]) for t,a in zip(targets,ASSETS)): return targets
 stage=Path(tempfile.mkdtemp(prefix='live-avatar-ai-',dir=root))
 backup=[]
 try:
  staged=[]
  for name,url,size,digest,rel in ASSETS:
   src=Path(source_dir)/name if source_dir else stage/name
   if source_dir:
    if not valid_target(src,size,digest): raise ValueError(f'offline source invalid: {src}')
   else: fetch(url,src,size,digest)
   out=stage/'payload'/safe_rel(rel);out.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,out)
   if not valid_target(out,size,digest): raise ValueError('staged asset invalid')
   staged.append((out,root/safe_rel(rel)))
  published=[]
  for src,dst in staged:
   # Run (Instant) must be stopped; recheck immediately before every publication.
   queue_empty(server)
   dst.parent.mkdir(parents=True,exist_ok=True); old=dst.with_suffix(dst.suffix+'.old')
   if old.exists():old.unlink()
   existed=dst.exists()
   if existed:dst.replace(old)
   try: src.replace(dst)
   except Exception:
    if existed and old.exists():old.replace(dst)
    raise
   published.append((dst,old,existed))
  for _,old,_ in published: old.unlink(missing_ok=True)
 except Exception:
  for dst,old,existed in reversed(locals().get('published',[])):
   dst.unlink(missing_ok=True)
   if existed and old.exists():old.replace(dst)
  raise
 finally: shutil.rmtree(stage,ignore_errors=True)
 return targets
def main():
 p=argparse.ArgumentParser();p.add_argument('--comfy-root',type=Path,required=True);p.add_argument('--source-dir',type=Path);p.add_argument('--server',default='http://127.0.0.1:8188');a=p.parse_args()
 for x in install(a.comfy_root,a.source_dir,a.server):print(x)
 print('Restart ComfyUI after install so model combo lists refresh.')
if __name__=='__main__':main()
