import * as THREE from 'three';
export function poseTargets({handTimeoutMs=250}={}){
 const rotations=new Map(),expressions=new Map(),hands=new Map(),rests=new Map();
 const restFor=name=>rests.get(name)||new THREE.Quaternion();
 return{
  captureRest(names,bone){rests.clear();for(const name of names){const node=bone(name);if(node)rests.set(name,node.quaternion.clone())}},
  rest(name){return restFor(name).clone()},
  rotation(name,euler={},scale=1,now=performance.now()){
   const delta=new THREE.Quaternion().setFromEuler(new THREE.Euler((euler.x||0)*scale,(euler.y||0)*scale,(euler.z||0)*scale));
   rotations.set(name,restFor(name).clone().multiply(delta));
  },
  expression(name,value){expressions.set(name,Math.max(0,Math.min(1,value)))},
  hand(name,now=performance.now()){hands.set(name,now)},
  resetHands(){for(const name of hands.keys())rotations.set(name,restFor(name).clone());hands.clear()},
  apply({bone,expression,now=performance.now(),dt=1/60,smoothing=.3}){
   const alpha=1-Math.exp(-Math.max(.001,dt)*Math.max(.1,smoothing)*18);
   for(const [name,target] of rotations){const b=bone(name);if(!b)continue;const age=hands.has(name)?now-hands.get(name):0;if(hands.has(name)&&age>handTimeoutMs){b.quaternion.slerp(restFor(name),Math.min(1,alpha*(age/handTimeoutMs)));continue}b.quaternion.slerp(target,alpha)}
   for(const [name,value] of expressions)expression(name,value,alpha)
  }
 }
}
