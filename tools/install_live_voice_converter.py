#!/usr/bin/env python3
"""Install/verify the pinned Windows DirectML RVC archive without executing it."""
from __future__ import annotations
import argparse,hashlib,json,shutil,stat,sys,tempfile,urllib.request,zipfile
from pathlib import Path,PurePosixPath
MANIFEST=Path(__file__).resolve().parents[1]/'assets/live-avatar-v072/voice-changer-b2332-tree.json';RELEASE='b2332';URL='https://github.com/deiteris/voice-changer/releases/download/b2332/voice-changer-windows-amd64-dml.zip';ARCHIVE_NAME='voice-changer-windows-amd64-dml.zip';ARCHIVE_SIZE=288921773;ARCHIVE_SHA256='8eb902b4cfaeaa68e1d5d2dc3ff3b1dbf82f5abb8bb6d05c3e1c4619f03a5ed5';ROOT='MMVCServerSIO';EXE=f'{ROOT}/MMVCServerSIO.exe';MAX_ENTRIES=10000;MAX_EXPANDED_BYTES=1200*1024*1024;TREE_FILES=3400;TREE_BYTES=806658313;TREE_SHA256='ddd816e470e4ff8765f11dd83ae927fa238ae36272017f71bf3977c19727e961'
def sha256(path):
 h=hashlib.sha256()
 with Path(path).open('rb') as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 return h.hexdigest()
def archive_ok(path):return Path(path).is_file() and Path(path).stat().st_size==ARCHIVE_SIZE and sha256(path)==ARCHIVE_SHA256
def safe_member(i):
 n=PurePosixPath(i.filename)
 if not i.filename or n.is_absolute() or '..' in n.parts or ':' in n.parts[0] or stat.S_ISLNK(i.external_attr>>16):raise ValueError(f'unsafe ZIP entry: {i.filename!r}')
 return n
def inspect_archive(path):
 if not archive_ok(path):raise ValueError('archive size or SHA-256 does not match pinned b2332 release')
 with zipfile.ZipFile(path) as z:
  e=z.infolist();names=[safe_member(i).as_posix() for i in e]
  if not 1<=len(e)<=MAX_ENTRIES or sum(i.file_size for i in e)>MAX_EXPANDED_BYTES or names.count(EXE)!=1 or any(not(x==ROOT or x.startswith(ROOT+'/')) for x in names):raise ValueError('unsafe or unexpected pinned ZIP')
  return e
def tree_digest(root):
 root=Path(root);files=json.loads(MANIFEST.read_text());h=hashlib.sha256();count=total=0
 for rel,(size,digest) in sorted(files.items()):
  p=root/rel
  if not p.is_file() or p.stat().st_size!=size or sha256(p)!=digest:return -1,-1,''
  h.update(f'{ROOT}/{rel}'.encode()+b'\0'+str(size).encode()+b'\0'+digest.encode()+b'\n');count+=1;total+=size
 return count,total,h.hexdigest()
def installation_ok(destination):
 d=Path(destination);return d.is_dir() and tree_digest(d)==(TREE_FILES,TREE_BYTES,TREE_SHA256)
def download(destination):
 part=destination.with_suffix(destination.suffix+'.part')
 if part.exists() and part.stat().st_size>=ARCHIVE_SIZE and not archive_ok(part):part.unlink()
 offset=part.stat().st_size if part.exists() else 0;headers={'User-Agent':'DaWasteh-LiveAvatar/0.7.2'}
 if offset:headers['Range']=f'bytes={offset}-'
 with urllib.request.urlopen(urllib.request.Request(URL,headers=headers),timeout=120) as r:
  if offset and getattr(r,'status',200)!=206:part.unlink(missing_ok=True);return download(destination)
  with part.open('ab' if offset else 'wb') as o:
   for b in iter(lambda:r.read(1024*1024),b''):
    if o.tell()+len(b)>ARCHIVE_SIZE:raise ValueError('download exceeds pinned archive size')
    o.write(b)
 if not archive_ok(part):part.unlink(missing_ok=True);raise ValueError('download did not match pinned archive')
 part.replace(destination);return destination
def install(destination,archive=None):
 if sys.platform!='win32':raise RuntimeError('Windows DirectML archive: install only on Windows')
 destination=Path(destination).resolve()
 if installation_ok(destination):return destination
 destination.parent.mkdir(parents=True,exist_ok=True);cache=Path(archive).resolve() if archive else destination.parent/ARCHIVE_NAME
 if not archive and not archive_ok(cache):cache.unlink(missing_ok=True);download(cache)
 entries=inspect_archive(cache);stage=Path(tempfile.mkdtemp(prefix='voice-changer-',dir=destination.parent));backup=destination.with_name(destination.name+'.old')
 try:
  with zipfile.ZipFile(cache) as z:
   for i in entries:
    rel=safe_member(i);target=(stage/rel).resolve()
    if stage.resolve() not in target.parents and target!=stage.resolve():raise ValueError('ZIP escape')
    if i.is_dir():target.mkdir(parents=True,exist_ok=True)
    else:target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(z.read(i))
  staged=stage/ROOT
  if not installation_ok(staged):raise ValueError('staged tree digest mismatch')
  if backup.exists():shutil.rmtree(backup)
  if destination.exists():destination.replace(backup)
  try:staged.replace(destination)
  except Exception:
   if backup.exists() and not destination.exists():backup.replace(destination)
   raise
  if backup.exists():shutil.rmtree(backup)
 finally:shutil.rmtree(stage,ignore_errors=True)
 return destination
def main():
 p=argparse.ArgumentParser();p.add_argument('--destination',type=Path,required=True);p.add_argument('--archive',type=Path);p.add_argument('--verify-destination',action='store_true');a=p.parse_args()
 if a.verify_destination:
  if not installation_ok(a.destination):raise SystemExit('voice converter tree digest verification failed')
  print(f'verified {TREE_FILES} files, {TREE_BYTES} bytes, {TREE_SHA256}');return
 print(install(a.destination,a.archive))
if __name__=='__main__':main()
