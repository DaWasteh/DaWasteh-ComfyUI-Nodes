"""Safely orchestrate the local Blender post-pipeline for a Hunyuan A-pose GLB.

This never invokes CUDA-only Hunyuan Paint/nvdiffrast. Run with the pinned Blender
executable and explicit local files; generated VRM/BLEND artifacts must not be committed.
"""
from __future__ import annotations
import argparse, subprocess, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def run(blender:Path, script:str, args:list[Path])->None:
    subprocess.run([str(blender),'--background','--python',str(ROOT/'tools/blender'/script),'--',*[str(x) for x in args]],check=True)
def main()->None:
 p=argparse.ArgumentParser(description='Local Hunyuan GLB -> rigged/textured VRM post-pipeline')
 p.add_argument('--blender',type=Path,required=True);p.add_argument('--donor-vrm',type=Path,required=True);p.add_argument('--mesh-glb',type=Path,required=True)
 p.add_argument('--front',type=Path,required=True);p.add_argument('--left',type=Path,required=True);p.add_argument('--back',type=Path,required=True);p.add_argument('--right',type=Path,required=True);p.add_argument('--face',type=Path,required=True)
 p.add_argument('--output-vrm',type=Path,required=True);p.add_argument('--workdir',type=Path,required=True);a=p.parse_args();a.workdir.mkdir(parents=True,exist_ok=True);a.output_vrm.parent.mkdir(parents=True,exist_ok=True)
 for path in (a.blender,a.donor_vrm,a.mesh_glb,a.front,a.left,a.back,a.right,a.face):
  if not path.is_file():raise SystemExit(f'required local file missing: {path}')
 rig=a.workdir/'rig.blend';candidate=a.workdir/'candidate.vrm';run(a.blender,'rig_hunyuan_high_realism_vrm.py',[a.donor_vrm,a.mesh_glb,rig,candidate,a.workdir/'rig-report.json'])
 textured=a.workdir/'textured.blend';run(a.blender,'bake_multiview_pbr_texture.py',[rig,a.front,a.left,a.back,a.right,a.face,a.workdir/'albedo.png',textured,candidate,a.workdir/'texture-report.json'])
 subprocess.run([sys.executable,str(ROOT/'tools/blender/generate_pbr_roughness.py'),str(a.workdir/'albedo.png'),str(a.workdir/'roughness.png')],check=True)
 pbr=a.workdir/'pbr.blend';run(a.blender,'add_pbr_roughness.py',[textured,a.workdir/'roughness.png',pbr,candidate,a.workdir/'pbr-report.json'])
 down=a.workdir/'pbr-2048.blend';run(a.blender,'downscale_pbr_images.py',[pbr,down,candidate,a.workdir/'downscale-report.json'])
 run(a.blender,'add_vrm_face_shapes.py',[down,a.workdir/'final.blend',a.output_vrm,a.workdir/'face-report.json'])
if __name__=='__main__':main()
