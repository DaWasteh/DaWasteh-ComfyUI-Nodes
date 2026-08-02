"""Loopback-only static routes for the VRM live-avatar browser app."""
from __future__ import annotations
from pathlib import Path
PACKAGE_ROOT=Path(__file__).resolve().parent;WEB_ROOT=PACKAGE_ROOT/'web'/'vrm-app';MAX_MODEL_BYTES=32*1024*1024;_REGISTERED=False
def model_root(comfy_root=None):
 if comfy_root:return Path(comfy_root).resolve()/'models'/'live-avatar-vrm'
 try:
  import folder_paths
  return Path(folder_paths.models_dir).resolve()/'live-avatar-vrm'
 except ImportError:return PACKAGE_ROOT.parents[1]/'models'/'live-avatar-vrm'
def safe_child(root,value):
 p=(root/value).resolve()
 if p!=root.resolve() and root.resolve() not in p.parents:raise ValueError('path traversal rejected')
 return p
def loopback(request):
 peer=request.remote or '';return peer in {'127.0.0.1','::1','localhost'}
def app_url(port=8188):
 if not isinstance(port,int) or not 1<=port<=65535:raise ValueError('invalid localhost port')
 return f'http://127.0.0.1:{port}/dawasteh/vrm-live/'
def register_routes():
 global _REGISTERED
 if _REGISTERED:return
 try:
  from aiohttp import web
  from server import PromptServer
 except ImportError:return
 routes=PromptServer.instance.routes
 @routes.get('/dawasteh/vrm-live/{path:.*}')
 async def static_app(request):
  if not loopback(request):raise web.HTTPForbidden()
  try:file=safe_child(WEB_ROOT,request.match_info['path'] or 'index.html')
  except ValueError:raise web.HTTPForbidden()
  if not file.is_file():raise web.HTTPNotFound()
  return web.FileResponse(file,headers={'Cache-Control':'no-store'})
 @routes.get('/dawasteh/vrm-model-list')
 async def model_list(request):
  if not loopback(request):raise web.HTTPForbidden()
  root=model_root()
  names=[] if not root.is_dir() else sorted(p.name for p in root.glob('*.vrm') if p.is_file() and p.stat().st_size<=MAX_MODEL_BYTES and '/' not in p.name and '\\' not in p.name)
  return web.json_response({'models':names},headers={'Cache-Control':'no-store'})
 @routes.get('/dawasteh/vrm-models/{name}')
 async def preset(request):
  if not loopback(request):raise web.HTTPForbidden()
  try:file=safe_child(model_root(),request.match_info['name'])
  except ValueError:raise web.HTTPForbidden()
  if file.suffix!='.vrm' or not file.is_file() or file.stat().st_size>MAX_MODEL_BYTES:raise web.HTTPNotFound()
  return web.FileResponse(file,headers={'Content-Type':'model/gltf-binary','Cache-Control':'no-store'})
 _REGISTERED=True
