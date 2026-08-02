import test from 'node:test'; import assert from 'node:assert/strict'; import {ModeController} from './mode-controller.js';
const full=Object.fromEntries(['leftHip','rightHip','leftKnee','rightKnee','leftAnkle','rightAnkle'].map(k=>[k,{visibility:.9}]));
test('enters full body only after stable frames',()=>{const c=new ModeController({enterFrames:2,minHoldMs:0}); assert.equal(c.update(full,1),'upper');assert.equal(c.update(full,2),'full');});
test('hysteresis and reset prevent flicker',()=>{const c=new ModeController({enterFrames:1,exitFrames:2,minHoldMs:0});c.update(full,1); assert.equal(c.update({},2),'full');assert.equal(c.update({},3),'upper');c.reset();assert.equal(c.mode,'upper');});
test('manual mode overrides missing landmarks',()=>{const c=new ModeController();assert.equal(c.update({},1,'full'),'full');assert.equal(c.update({},2,'upper'),'upper');});
