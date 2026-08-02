#!/usr/bin/env python3
"""Clean-room deterministic generator for Live Avatar 06–10; never queries live ComfyUI."""
from __future__ import annotations
import argparse,shutil,subprocess,sys,tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];DIR=ROOT/'workflows/Live Avatar';ASSETS=ROOT/'assets/live-avatar-v072';NAMES=('LiveAvatar-06-VRM-Full-Body-Hand-Face+Live-Mic.json','LiveAvatar-07-AI-Webcam-Character-Swap-Experimental.json','LiveAvatar-08-Local-VRM-Texture-Creator-Realistic+Stylized.json','LiveAvatar-09-Meshy-AutoRig-to-VRM-Candidate-Optional-Cloud.json','LiveAvatar-10-Realistic-Adult-Character-Reference-Prompt+Image.json')
def build06():return (ASSETS/'workflow-06.template.json').read_bytes()
def build07():return (ASSETS/'workflow-07.template.json').read_bytes()
def build08():return (ASSETS/'workflow-08.template.json').read_bytes()
def build09():return (ASSETS/'workflow-09.template.json').read_bytes()
def build10():return (ASSETS/'workflow-10.template.json').read_bytes()
def generate(destination=DIR):
 destination=Path(destination);destination.mkdir(parents=True,exist_ok=True)
 with tempfile.TemporaryDirectory(prefix='live-avatar-v072-') as d:
  stage=Path(d)
  for name,data in zip(NAMES,(build06(),build07(),build08(),build09(),build10())):(stage/name).write_bytes(data)
  # Templates are already refined against the pinned schema. Do not query a live server here.
  for name in NAMES:
   source=stage/name;target=destination/name;tmp=target.with_suffix(target.suffix+'.tmp');shutil.copyfile(source,tmp);tmp.replace(target)
 return [destination/n for n in NAMES]
def main():
 p=argparse.ArgumentParser();p.add_argument('--destination',type=Path,default=DIR);a=p.parse_args()
 for x in generate(a.destination):print(x)
if __name__=='__main__':main()
