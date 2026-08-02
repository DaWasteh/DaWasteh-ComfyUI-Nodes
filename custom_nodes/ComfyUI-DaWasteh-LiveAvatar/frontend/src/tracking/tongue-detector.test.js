import test from 'node:test';import assert from 'node:assert/strict';import {tongueColorScore,tongueSmoother} from './tongue-detector.js';
const pixels=(rgb,count=64)=>new Uint8ClampedArray(Array.from({length:count},()=>[...rgb,255]).flat());
test('closed mouth never triggers',()=>assert.equal(tongueColorScore(pixels([210,70,90]),.03),0));
test('pink-red open mouth produces a signal',()=>assert.ok(tongueColorScore(pixels([210,80,95]),.25)>.5));
test('dark mouth and neutral skin do not trigger',()=>{assert.equal(tongueColorScore(pixels([18,12,12]),.3),0);assert.equal(tongueColorScore(pixels([185,150,130]),.3),0)});
test('smoother rises and decays without snapping',()=>{const s=tongueSmoother();const a=s.update(1),b=s.update(1),c=s.update(0);assert.ok(a>0&&b>a&&b<1);assert.ok(c>0&&c<b)});
