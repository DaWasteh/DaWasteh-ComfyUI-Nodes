"""Generate a conservative non-metallic roughness map from an albedo PNG."""
from __future__ import annotations
import argparse
from pathlib import Path
import cv2,numpy as np
def main():
 p=argparse.ArgumentParser();p.add_argument('albedo',type=Path);p.add_argument('roughness',type=Path);a=p.parse_args()
 bgr=cv2.imread(str(a.albedo),cv2.IMREAD_COLOR)
 if bgr is None: raise SystemExit(f'cannot read {a.albedo}')
 h,s,v=cv2.split(cv2.cvtColor(bgr,cv2.COLOR_BGR2HSV));rough=np.full(v.shape,178,np.uint8)
 rough[v<80]=220;skin=(((h<22)|(h>170))&(s>18)&(s<190)&(v>70));rough[skin]=125
 hair=(((h<35)|(h>150))&(s>25)&(v>90)&~skin);rough[hair]=150;rough[(v<60)&(s<80)]=185
 rough=cv2.GaussianBlur(rough,(9,9),0);a.roughness.parent.mkdir(parents=True,exist_ok=True);cv2.imwrite(str(a.roughness),cv2.merge([rough]*3))
if __name__=='__main__':main()
