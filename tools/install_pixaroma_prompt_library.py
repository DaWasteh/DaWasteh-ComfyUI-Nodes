#!/usr/bin/env python3
"""Install a Pixaroma Prompt library through ComfyUI's settings API safely."""
from __future__ import annotations
import argparse,json,urllib.request,datetime
from pathlib import Path
KEY='Pixaroma.Prompt.Library'
def req(url,data=None):
 r=urllib.request.Request(url,data=data,headers={'Content-Type':'application/json'}) if data is not None else urllib.request.Request(url)
 with urllib.request.urlopen(r,timeout=15) as x: return x.read().decode()
def norm(x):
 if isinstance(x,str): x=json.loads(x)
 return json.dumps(x,ensure_ascii=False,sort_keys=True,separators=(',',':'))
def main():
 p=argparse.ArgumentParser(); p.add_argument('--library',type=Path,default=Path('prompt-libraries/DaWasteh-Pixaroma-Prompt-Library.json')); p.add_argument('--url',default='http://127.0.0.1:8188'); p.add_argument('--replace',action='store_true'); a=p.parse_args()
 queue=json.loads(req(a.url+'/queue')); prompt=json.loads(req(a.url+'/prompt'))
 if queue.get('queue_running') or queue.get('queue_pending') or prompt.get('exec_info',{}).get('queue_remaining',0): raise SystemExit('ComfyUI queue is not empty')
 src=json.loads(a.library.read_text(encoding='utf-8'))
 old=json.loads(req(a.url+'/settings/'+KEY))
 if old not in (None,'',{} ) and not a.replace: raise SystemExit('existing library present; use --replace explicitly')
 if old not in (None,'',{}) and a.replace:
  backup=a.library.with_suffix('.before-replace-'+datetime.datetime.now().strftime('%Y%m%d-%H%M%S')+'.json')
  backup.write_text(json.dumps(old if isinstance(old,dict) else json.loads(old),ensure_ascii=False,indent=2)+'\\n',encoding='utf-8')
 # Recheck immediately before mutation so a queued job cannot be raced accidentally.
 queue=json.loads(req(a.url+'/queue'))
 if queue.get('queue_running') or queue.get('queue_pending'): raise SystemExit('ComfyUI queue changed')
 req(a.url+'/settings/'+KEY,json.dumps(json.dumps(src,ensure_ascii=False)).encode())
 got=json.loads(req(a.url+'/settings/'+KEY))
 if norm(got)!=norm(src): raise SystemExit('post-install semantic verification failed')
 print(json.dumps({'installed':KEY,'tags':len(src.get('tags',[])),'categories':len(src.get('categories',[]))}))
if __name__=='__main__': main()
