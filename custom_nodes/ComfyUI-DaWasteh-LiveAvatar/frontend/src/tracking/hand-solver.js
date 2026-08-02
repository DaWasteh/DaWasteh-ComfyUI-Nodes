import * as THREE from 'three';

const FINGER_LIMITS={x:[-.35,.35],y:[-.35,.35],z:[-1.65,1.65]};
const WRIST_LIMITS={x:[-1.2,1.2],y:[-1.1,1.1],z:[-1.35,1.35]};
const clamp=(value,[low,high])=>Math.max(low,Math.min(high,Number.isFinite(value)?value:0));
const slew=(value,previous,maxDelta)=>Math.max(previous-maxDelta,Math.min(previous+maxDelta,value));

/** Clamp Kalidokit rotations and limit per-update angular travel. */
export function constrainedHandEuler(name,euler={},previous={x:0,y:0,z:0},dt=1/30){
 const wrist=/Hand$/.test(name),limits=wrist?WRIST_LIMITS:FINGER_LIMITS;
 const maxSpeed=wrist?5.5:7.5,maxDelta=maxSpeed*Math.max(1/120,Math.min(.1,dt));
 return Object.fromEntries(['x','y','z'].map(axis=>[axis,slew(clamp(euler[axis],limits[axis]),previous[axis]||0,maxDelta)]));
}

/** Reject incomplete or degenerate palms before side-specific solving. */
export function validPalmLandmarks(points){
 if(!Array.isArray(points)||points.length!==21)return false;
 const required=[0,5,9,17].map(i=>points[i]);
 if(required.some(p=>!p||![p.x,p.y,p.z??0].every(Number.isFinite)))return false;
 const vector=(a,b)=>new THREE.Vector3(a.x-b.x,a.y-b.y,(a.z||0)-(b.z||0));
 const width=vector(points[5],points[17]),middle=vector(points[9],points[0]);
 return width.lengthSq()>1e-6&&middle.lengthSq()>1e-6&&new THREE.Vector3().crossVectors(width,middle).lengthSq()>1e-8;
}

/** Stable palm basis for diagnostics/fallbacks; null preserves the last wrist target. */
export function palmQuaternion(points,side='Left'){
 if(!validPalmLandmarks(points))return null;
 const x=new THREE.Vector3(points[5].x-points[17].x,points[5].y-points[17].y,(points[5].z||0)-(points[17].z||0)).normalize();
 if(side==='Right')x.negate();
 const middle=new THREE.Vector3(points[9].x-points[0].x,points[9].y-points[0].y,(points[9].z||0)-(points[0].z||0)).normalize();
 const forward=new THREE.Vector3().crossVectors(x,middle);
 if(forward.lengthSq()<1e-8)return null;
 forward.normalize();const up=new THREE.Vector3().crossVectors(forward,x).normalize();
 const matrix=new THREE.Matrix4().makeBasis(x,up,forward);
 return new THREE.Quaternion().setFromRotationMatrix(matrix).normalize();
}
