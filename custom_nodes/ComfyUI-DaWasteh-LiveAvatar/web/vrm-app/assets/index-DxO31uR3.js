(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ht="137",wu=0,ja=1,Su=2,Wc=1,bu=2,br=3,qn=0,ht=1,an=2,qc=1,zn=0,Er=1,Ya=2,Za=3,Ja=4,Tu=5,Bi=100,Eu=101,Au=102,Ka=103,$a=104,Lu=200,Ru=201,Cu=202,Pu=203,Xc=204,jc=205,Du=206,Iu=207,Nu=208,Fu=209,Ou=210,Bu=0,zu=1,Uu=2,Qo=3,Hu=4,ku=5,Gu=6,Vu=7,qs=0,Wu=1,qu=2,Un=0,Xu=1,ju=2,Yu=3,Zu=4,Ju=5,Yc=300,Wr=301,qr=302,ea=303,ta=304,Xs=306,Ma=307,Zi=1e3,Nt=1001,Bs=1002,ft=1003,na=1004,ia=1005,yt=1006,Zc=1007,tr=1008,Hn=1009,Ku=1010,$u=1011,Ir=1012,Qu=1013,Fs=1014,Fn=1015,Wi=1016,ed=1017,td=1018,qi=1020,nd=1021,id=1022,Lt=1023,rd=1024,sd=1025,si=1026,Ji=1027,od=1028,ad=1029,ld=1030,cd=1031,hd=1033,lo=33776,co=33777,ho=33778,uo=33779,Qa=35840,el=35841,tl=35842,nl=35843,ud=36196,il=37492,rl=37496,sl=37808,ol=37809,al=37810,ll=37811,cl=37812,hl=37813,ul=37814,dl=37815,fl=37816,pl=37817,ml=37818,gl=37819,xl=37820,_l=37821,vl=36492,dd=2200,fd=2201,pd=2202,Nr=2300,Ki=2301,fo=2302,zi=2400,Ui=2401,zs=2402,wa=2500,Jc=2501,md=0,gd=1,Kc=2,Rt=3e3,He=3001,xd=3200,_d=3201,Zn=0,vd=1,po=7680,yd=519,Fr=35044,Us=35048,yl="300 es",ra=1035;class ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Mt=[];for(let s=0;s<256;s++)Mt[s]=(s<16?"0":"")+s.toString(16);let es=1234567;const Ar=Math.PI/180,Or=180/Math.PI;function kt(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mt[s&255]+Mt[s>>8&255]+Mt[s>>16&255]+Mt[s>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[n&255]+Mt[n>>8&255]+Mt[n>>16&255]+Mt[n>>24&255]).toUpperCase()}function It(s,e,t){return Math.max(e,Math.min(t,s))}function Sa(s,e){return(s%e+e)%e}function Md(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function wd(s,e,t){return s!==e?(t-s)/(e-s):0}function Lr(s,e,t){return(1-t)*s+t*e}function Sd(s,e,t,n){return Lr(s,e,1-Math.exp(-t*n))}function bd(s,e=1){return e-Math.abs(Sa(s,e*2)-e)}function Td(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Ed(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Ad(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Ld(s,e){return s+Math.random()*(e-s)}function Rd(s){return s*(.5-Math.random())}function Cd(s){return s!==void 0&&(es=s%2147483647),es=es*16807%2147483647,(es-1)/2147483646}function Pd(s){return s*Ar}function Dd(s){return s*Or}function sa(s){return(s&s-1)===0&&s!==0}function $c(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Qc(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Id(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}var Nd=Object.freeze({__proto__:null,DEG2RAD:Ar,RAD2DEG:Or,generateUUID:kt,clamp:It,euclideanModulo:Sa,mapLinear:Md,inverseLerp:wd,lerp:Lr,damp:Sd,pingpong:bd,smoothstep:Td,smootherstep:Ed,randInt:Ad,randFloat:Ld,randFloatSpread:Rd,seededRandom:Cd,degToRad:Pd,radToDeg:Dd,isPowerOfTwo:sa,ceilPowerOfTwo:$c,floorPowerOfTwo:Qc,setQuaternionFromProperEuler:Id});class J{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this)}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this)}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}J.prototype.isVector2=!0;class St{constructor(){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=i[0],_=i[3],m=i[6],p=i[1],T=i[4],b=i[7],w=i[2],L=i[5],C=i[8];return r[0]=o*x+a*p+l*w,r[3]=o*_+a*T+l*L,r[6]=o*m+a*b+l*C,r[1]=c*x+h*p+u*w,r[4]=c*_+h*T+u*L,r[7]=c*m+h*b+u*C,r[2]=d*x+f*p+g*w,r[5]=d*_+f*T+g*L,r[8]=d*m+f*b+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=t,n[4]*=t,n[7]*=t,this}rotate(e){const t=Math.cos(e),n=Math.sin(e),i=this.elements,r=i[0],o=i[3],a=i[6],l=i[1],c=i[4],h=i[7];return i[0]=t*r+n*l,i[3]=t*o+n*c,i[6]=t*a+n*h,i[1]=-n*r+t*l,i[4]=-n*o+t*c,i[7]=-n*a+t*h,this}translate(e,t){const n=this.elements;return n[0]+=e*n[2],n[3]+=e*n[5],n[6]+=e*n[8],n[1]+=t*n[2],n[4]+=t*n[5],n[7]+=t*n[8],this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}St.prototype.isMatrix3=!0;function eh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>65535)return!0;return!1}function Br(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}const th={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xt={h:0,s:0,l:0},ts={h:0,s:0,l:0};function mo(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}function Xi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function go(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}class ne{constructor(e,t,n){return t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,this}setRGB(e,t,n){return this.r=e,this.g=t,this.b=n,this}setHSL(e,t,n){if(e=Sa(e,1),t=It(t,0,1),n=It(n,0,1),t===0)this.r=this.g=this.b=n;else{const i=n<=.5?n*(1+t):n+t-n*t,r=2*n-i;this.r=mo(r,i,e+1/3),this.g=mo(r,i,e),this.b=mo(r,i,e-1/3)}return this}setStyle(e){function t(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let i;const r=n[1],o=n[2];switch(r){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(i[1],10))/255,this.g=Math.min(255,parseInt(i[2],10))/255,this.b=Math.min(255,parseInt(i[3],10))/255,t(i[4]),this;if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(i[1],10))/100,this.g=Math.min(100,parseInt(i[2],10))/100,this.b=Math.min(100,parseInt(i[3],10))/100,t(i[4]),this;break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const a=parseFloat(i[1])/360,l=parseInt(i[2],10)/100,c=parseInt(i[3],10)/100;return t(i[4]),this.setHSL(a,l,c)}break}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const i=n[1],r=i.length;if(r===3)return this.r=parseInt(i.charAt(0)+i.charAt(0),16)/255,this.g=parseInt(i.charAt(1)+i.charAt(1),16)/255,this.b=parseInt(i.charAt(2)+i.charAt(2),16)/255,this;if(r===6)return this.r=parseInt(i.charAt(0)+i.charAt(1),16)/255,this.g=parseInt(i.charAt(2)+i.charAt(3),16)/255,this.b=parseInt(i.charAt(4)+i.charAt(5),16)/255,this}return e&&e.length>0?this.setColorName(e):this}setColorName(e){const t=th[e.toLowerCase()];return t!==void 0?this.setHex(t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}copyLinearToSRGB(e){return this.r=go(e.r),this.g=go(e.g),this.b=go(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){return this.r*255<<16^this.g*255<<8^this.b*255<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(e){const t=this.r,n=this.g,i=this.b,r=Math.max(t,n,i),o=Math.min(t,n,i);let a,l;const c=(o+r)/2;if(o===r)a=0,l=0;else{const h=r-o;switch(l=c<=.5?h/(r+o):h/(2-r-o),r){case t:a=(n-i)/h+(n<i?6:0);break;case n:a=(i-t)/h+2;break;case i:a=(t-n)/h+4;break}a/=6}return e.h=a,e.s=l,e.l=c,e}getStyle(){return"rgb("+(this.r*255|0)+","+(this.g*255|0)+","+(this.b*255|0)+")"}offsetHSL(e,t,n){return this.getHSL(Xt),Xt.h+=e,Xt.s+=t,Xt.l+=n,this.setHSL(Xt.h,Xt.s,Xt.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xt),e.getHSL(ts);const n=Lr(Xt.h,ts.h,t),i=Lr(Xt.s,ts.s,t),r=Lr(Xt.l,ts.l,t);return this.setHSL(n,i,r),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),e.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}}ne.NAMES=th;ne.prototype.isColor=!0;ne.prototype.r=1;ne.prototype.g=1;ne.prototype.b=1;let pi;class hi{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{pi===void 0&&(pi=Br("canvas")),pi.width=e.width,pi.height=e.height;const n=pi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=pi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Xi(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xi(t[n]/255)*255):t[n]=Xi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fd=0;class pt extends ci{constructor(e=pt.DEFAULT_IMAGE,t=pt.DEFAULT_MAPPING,n=Nt,i=Nt,r=yt,o=tr,a=Lt,l=Hn,c=1,h=Rt){super(),Object.defineProperty(this,"id",{value:Fd++}),this.uuid=kt(),this.name="",this.image=e,this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new St,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.image=e.image,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(this.image!==void 0){const i=this.image;if(i.uuid===void 0&&(i.uuid=kt()),!t&&e.images[i.uuid]===void 0){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(xo(i[o].image)):r.push(xo(i[o]))}else r=xo(i);e.images[i.uuid]={uuid:i.uuid,url:r}}n.image=i.uuid}return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zi:e.x=e.x-Math.floor(e.x);break;case Nt:e.x=e.x<0?0:1;break;case Bs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Zi:e.y=e.y-Math.floor(e.y);break;case Nt:e.y=e.y<0?0:1;break;case Bs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&this.version++}}pt.DEFAULT_IMAGE=void 0;pt.DEFAULT_MAPPING=Yc;pt.prototype.isTexture=!0;function xo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?hi.getDataURL(s):s.data?{data:Array.prototype.slice.call(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}class Re{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],_=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-_)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+_)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,b=(f+1)/2,w=(m+1)/2,L=(h+d)/4,C=(u+x)/4,W=(g+_)/4;return T>b&&T>w?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=L/n,r=C/n):b>w?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=L/i,r=W/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=C/r,i=W/r),this.set(n,i,r,t),this}let p=Math.sqrt((_-g)*(_-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(p)<.001&&(p=1),this.x=(_-g)/p,this.y=(u-x)/p,this.z=(d-h)/p,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}Re.prototype.isVector4=!0;class Gt extends ci{constructor(e,t,n={}){super(),this.width=e,this.height=t,this.depth=1,this.scissor=new Re(0,0,e,t),this.scissorTest=!1,this.viewport=new Re(0,0,e,t),this.texture=new pt(void 0,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.image={width:e,height:t,depth:1},this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:yt,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null}setTexture(e){e.image={width:this.width,height:this.height,depth:this.depth},this.texture=e}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.image=Object.assign({},e.texture.image),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.depthTexture=e.depthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}Gt.prototype.isWebGLRenderTarget=!0;class Od extends Gt{constructor(e,t,n){super(e,t);const i=this.texture;this.texture=[];for(let r=0;r<n;r++)this.texture[r]=i.clone()}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.texture.length;i<r;i++)this.texture[i].image.width=e,this.texture[i].image.height=t,this.texture[i].image.depth=n;this.dispose()}return this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t),this}copy(e){this.dispose(),this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.set(0,0,this.width,this.height),this.scissor.set(0,0,this.width,this.height),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.depthTexture=e.depthTexture,this.texture.length=0;for(let t=0,n=e.texture.length;t<n;t++)this.texture[t]=e.texture[t].clone();return this}}Od.prototype.isWebGLMultipleRenderTargets=!0;class ba extends Gt{constructor(e,t,n={}){super(e,t,n),this.samples=4,this.ignoreDepthForMultisampleCopy=n.ignoreDepth!==void 0?n.ignoreDepth:!0,this.useRenderToTexture=n.useRenderToTexture!==void 0?n.useRenderToTexture:!1,this.useRenderbuffer=this.useRenderToTexture===!1}copy(e){return super.copy.call(this,e),this.samples=e.samples,this.useRenderToTexture=e.useRenderToTexture,this.useRenderbuffer=e.useRenderbuffer,this}}ba.prototype.isWebGLMultisampleRenderTarget=!0;class it{constructor(e=0,t=0,n=0,i=1){this._x=e,this._y=t,this._z=n,this._w=i}static slerp(e,t,n,i){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),n.slerpQuaternions(e,t,i)}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==g){let _=1-a;const m=l*d+c*f+h*g+u*x,p=m>=0?1:-1,T=1-m*m;if(T>Number.EPSILON){const w=Math.sqrt(T),L=Math.atan2(w,m*p);_=Math.sin(_*L)/w,a=Math.sin(a*L)/w}const b=a*p;if(l=l*_+d*b,c=c*_+f*b,h=h*_+g*b,u=u*_+x*b,_===1-a){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){if(!(e&&e.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(It(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e,t){return t!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t)):this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}}it.prototype.isQuaternion=!0;class S{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t)):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this)}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return e&&e.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(Ml.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ml.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=l*t+o*i-a*n,h=l*n+a*t-r*i,u=l*i+r*n-o*t,d=-r*t-o*n-a*i;return this.x=c*l+d*-r+h*-a-u*-o,this.y=h*l+d*-o+u*-r-c*-a,this.z=u*l+d*-a+c*-o-h*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e,t){return t!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t)):this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _o.copy(this).projectOnVector(e),this.sub(_o)}reflect(e){return this.sub(_o.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(It(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}S.prototype.isVector3=!0;const _o=new S,Ml=new it;class Ft{constructor(e=new S(1/0,1/0,1/0),t=new S(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,r=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.length;l<c;l+=3){const h=e[l],u=e[l+1],d=e[l+2];h<t&&(t=h),u<n&&(n=u),d<i&&(i=d),h>r&&(r=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(r,o,a),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,r=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.count;l<c;l++){const h=e.getX(l),u=e.getY(l),d=e.getZ(l);h<t&&(t=h),u<n&&(n=u),d<i&&(i=d),h>r&&(r=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(r,o,a),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){const r=n.attributes.position;for(let o=0,a=r.count;o<a;o++)$n.fromBufferAttribute(r,o).applyMatrix4(e.matrixWorld),this.expandByPoint($n)}else n.boundingBox===null&&n.computeBoundingBox(),vo.copy(n.boundingBox),vo.applyMatrix4(e.matrixWorld),this.union(vo);const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),ns.subVectors(this.max,hr),mi.subVectors(e.a,hr),gi.subVectors(e.b,hr),xi.subVectors(e.c,hr),En.subVectors(gi,mi),An.subVectors(xi,gi),Qn.subVectors(mi,xi);let t=[0,-En.z,En.y,0,-An.z,An.y,0,-Qn.z,Qn.y,En.z,0,-En.x,An.z,0,-An.x,Qn.z,0,-Qn.x,-En.y,En.x,0,-An.y,An.x,0,-Qn.y,Qn.x,0];return!yo(t,mi,gi,xi,ns)||(t=[1,0,0,0,1,0,0,0,1],!yo(t,mi,gi,xi,ns))?!1:(is.crossVectors(En,An),t=[is.x,is.y,is.z],yo(t,mi,gi,xi,ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return $n.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize($n).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}Ft.prototype.isBox3=!0;const dn=[new S,new S,new S,new S,new S,new S,new S,new S],$n=new S,vo=new Ft,mi=new S,gi=new S,xi=new S,En=new S,An=new S,Qn=new S,hr=new S,ns=new S,is=new S,ei=new S;function yo(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ei.fromArray(s,r);const a=i.x*Math.abs(ei.x)+i.y*Math.abs(ei.y)+i.z*Math.abs(ei.z),l=e.dot(ei),c=t.dot(ei),h=n.dot(ei);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Bd=new Ft,wl=new S,rs=new S,Mo=new S;class ui{constructor(e=new S,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Bd.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){Mo.subVectors(e,this.center);const t=Mo.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.add(Mo.multiplyScalar(i/n)),this.radius+=i}return this}union(e){return this.center.equals(e.center)===!0?rs.set(0,0,1).multiplyScalar(e.radius):rs.subVectors(e.center,this.center).normalize().multiplyScalar(e.radius),this.expandByPoint(wl.copy(e.center).add(rs)),this.expandByPoint(wl.copy(e.center).sub(rs)),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new S,wo=new S,ss=new S,Ln=new S,So=new S,os=new S,bo=new S;class nr{constructor(e=new S,t=new S(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.direction).multiplyScalar(t).add(this.origin),fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){wo.copy(e).add(t).multiplyScalar(.5),ss.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(wo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ss),a=Ln.dot(this.direction),l=-Ln.dot(ss),c=Ln.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(u).add(this.origin),i&&i.copy(ss).multiplyScalar(d).add(wo),f}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const n=fn.dot(this.direction),i=fn.dot(fn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return a<0&&l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||n!==n)&&(n=r),(o<i||i!==i)&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,n,i,r){So.subVectors(t,e),os.subVectors(n,e),bo.crossVectors(So,os);let o=this.direction.dot(bo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ln.subVectors(this.origin,e);const l=a*this.direction.dot(os.crossVectors(Ln,os));if(l<0)return null;const c=a*this.direction.dot(So.cross(Ln));if(c<0||l+c>o)return null;const h=-a*Ln.dot(bo);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,x,_){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=x,m[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/_i.setFromMatrixColumn(e,0).length(),r=1/_i.setFromMatrixColumn(e,1).length(),o=1/_i.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){e&&e.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zd,e,Ud)}lookAt(e,t,n){const i=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),Rn.crossVectors(n,Bt),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),Rn.crossVectors(n,Bt)),Rn.normalize(),as.crossVectors(Bt,Rn),i[0]=Rn.x,i[4]=as.x,i[8]=Bt.x,i[1]=Rn.y,i[5]=as.y,i[9]=Bt.y,i[2]=Rn.z,i[6]=as.z,i[10]=Bt.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(e,t)):this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],_=n[10],m=n[14],p=n[3],T=n[7],b=n[11],w=n[15],L=i[0],C=i[4],W=i[8],ae=i[12],Z=i[1],v=i[5],R=i[9],D=i[13],F=i[2],N=i[6],O=i[10],H=i[14],K=i[3],re=i[7],k=i[11],Y=i[15];return r[0]=o*L+a*Z+l*F+c*K,r[4]=o*C+a*v+l*N+c*re,r[8]=o*W+a*R+l*O+c*k,r[12]=o*ae+a*D+l*H+c*Y,r[1]=h*L+u*Z+d*F+f*K,r[5]=h*C+u*v+d*N+f*re,r[9]=h*W+u*R+d*O+f*k,r[13]=h*ae+u*D+d*H+f*Y,r[2]=g*L+x*Z+_*F+m*K,r[6]=g*C+x*v+_*N+m*re,r[10]=g*W+x*R+_*O+m*k,r[14]=g*ae+x*D+_*H+m*Y,r[3]=p*L+T*Z+b*F+w*K,r[7]=p*C+T*v+b*N+w*re,r[11]=p*W+T*R+b*O+w*k,r[15]=p*ae+T*D+b*H+w*Y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],_=e[11],m=e[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+x*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+_*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+m*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],_=e[14],m=e[15],p=u*_*c-x*d*c+x*l*f-a*_*f-u*l*m+a*d*m,T=g*d*c-h*_*c-g*l*f+o*_*f+h*l*m-o*d*m,b=h*x*c-g*u*c+g*a*f-o*x*f-h*a*m+o*u*m,w=g*u*l-h*x*l-g*a*d+o*x*d+h*a*_-o*u*_,L=t*p+n*T+i*b+r*w;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/L;return e[0]=p*C,e[1]=(x*d*r-u*_*r-x*i*f+n*_*f+u*i*m-n*d*m)*C,e[2]=(a*_*r-x*l*r+x*i*c-n*_*c-a*i*m+n*l*m)*C,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*C,e[4]=T*C,e[5]=(h*_*r-g*d*r+g*i*f-t*_*f-h*i*m+t*d*m)*C,e[6]=(g*l*r-o*_*r-g*i*c+t*_*c+o*i*m-t*l*m)*C,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*C,e[8]=b*C,e[9]=(g*u*r-h*x*r-g*n*f+t*x*f+h*n*m-t*u*m)*C,e[10]=(o*x*r-g*a*r+g*n*c-t*x*c-o*n*m+t*a*m)*C,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*C,e[12]=w*C,e[13]=(h*x*i-g*u*i+g*n*d-t*x*d-h*n*_+t*u*_)*C,e[14]=(g*a*i-o*x*i-g*n*l+t*x*l+o*n*_-t*a*_)*C,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,x=o*h,_=o*u,m=a*u,p=l*c,T=l*h,b=l*u,w=n.x,L=n.y,C=n.z;return i[0]=(1-(x+m))*w,i[1]=(f+b)*w,i[2]=(g-T)*w,i[3]=0,i[4]=(f-b)*L,i[5]=(1-(d+m))*L,i[6]=(_+p)*L,i[7]=0,i[8]=(g+T)*C,i[9]=(_-p)*C,i[10]=(1-(d+x))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=_i.set(i[0],i[1],i[2]).length();const o=_i.set(i[4],i[5],i[6]).length(),a=_i.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],jt.copy(this);const c=1/r,h=1/o,u=1/a;return jt.elements[0]*=c,jt.elements[1]*=c,jt.elements[2]*=c,jt.elements[4]*=h,jt.elements[5]*=h,jt.elements[6]*=h,jt.elements[8]*=u,jt.elements[9]*=u,jt.elements[10]*=u,t.setFromRotationMatrix(jt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o){o===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const a=this.elements,l=2*r/(t-e),c=2*r/(n-i),h=(t+e)/(t-e),u=(n+i)/(n-i),d=-(o+r)/(o-r),f=-2*o*r/(o-r);return a[0]=l,a[4]=0,a[8]=h,a[12]=0,a[1]=0,a[5]=c,a[9]=u,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=f,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,r,o){const a=this.elements,l=1/(t-e),c=1/(n-i),h=1/(o-r),u=(t+e)*l,d=(n+i)*c,f=(o+r)*h;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-u,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=-2*h,a[14]=-f,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}de.prototype.isMatrix4=!0;const _i=new S,jt=new de,zd=new S(0,0,0),Ud=new S(1,1,1),Rn=new S,as=new S,Bt=new S,Sl=new de,bl=new it;let Jn=class nh{constructor(e=0,t=0,n=0,i=nh.DefaultOrder){this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(It(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-It(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(It(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-It(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(It(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-It(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bl.setFromEuler(this),this.setFromQuaternion(bl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}toVector3(e){return e?e.set(this._x,this._y,this._z):new S(this._x,this._y,this._z)}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}};Jn.prototype.isEuler=!0;Jn.DefaultOrder="XYZ";Jn.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class ih{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hd=0;const Tl=new S,vi=new it,pn=new de,ls=new S,ur=new S,kd=new S,Gd=new it,El=new S(1,0,0),Al=new S(0,1,0),Ll=new S(0,0,1),Vd={type:"added"},Rl={type:"removed"};class We extends ci{constructor(){super(),Object.defineProperty(this,"id",{value:Hd++}),this.uuid=kt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=We.DefaultUp.clone();const e=new S,t=new Jn,n=new it,i=new S(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new de},normalMatrix:{value:new St}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=We.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new ih,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.multiply(vi),this}rotateOnWorldAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.premultiply(vi),this}rotateX(e){return this.rotateOnAxis(El,e)}rotateY(e){return this.rotateOnAxis(Al,e)}rotateZ(e){return this.rotateOnAxis(Ll,e)}translateOnAxis(e,t){return Tl.copy(e).applyQuaternion(this.quaternion),this.position.add(Tl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(El,e)}translateY(e){return this.translateOnAxis(Al,e)}translateZ(e){return this.translateOnAxis(Ll,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ls.copy(e):ls.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(ur,ls,this.up):pn.lookAt(ls,ur,this.up),this.quaternion.setFromRotationMatrix(pn),i&&(pn.extractRotation(i.matrixWorld),vi.setFromRotationMatrix(pn),this.quaternion.premultiply(vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Vd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rl)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Rl)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,e,kd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,Gd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}We.DefaultUp=new S(0,1,0);We.DefaultMatrixAutoUpdate=!0;We.prototype.isObject3D=!0;const Yt=new S,mn=new S,To=new S,gn=new S,yi=new S,Mi=new S,Cl=new S,Eo=new S,Ao=new S,Lo=new S;class gt{constructor(e=new S,t=new S,n=new S){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Yt.subVectors(e,t),i.cross(Yt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Yt.subVectors(i,t),mn.subVectors(n,t),To.subVectors(e,t);const o=Yt.dot(Yt),a=Yt.dot(mn),l=Yt.dot(To),c=mn.dot(mn),h=mn.dot(To),u=o*c-a*a;if(u===0)return r.set(-2,-1,-1);const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,gn),gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getUV(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,gn),l.set(0,0),l.addScaledVector(r,gn.x),l.addScaledVector(o,gn.y),l.addScaledVector(a,gn.z),l}static isFrontFacing(e,t,n,i){return Yt.subVectors(n,t),mn.subVectors(e,t),Yt.cross(mn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Yt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return gt.getUV(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;yi.subVectors(i,n),Mi.subVectors(r,n),Eo.subVectors(e,n);const l=yi.dot(Eo),c=Mi.dot(Eo);if(l<=0&&c<=0)return t.copy(n);Ao.subVectors(e,i);const h=yi.dot(Ao),u=Mi.dot(Ao);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(yi,o);Lo.subVectors(e,r);const f=yi.dot(Lo),g=Mi.dot(Lo);if(g>=0&&f<=g)return t.copy(r);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Mi,a);const _=h*g-f*u;if(_<=0&&u-h>=0&&f-g>=0)return Cl.subVectors(r,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Cl,a);const m=1/(_+x+d);return o=x*m,a=d*m,t.copy(n).addScaledVector(yi,o).addScaledVector(Mi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let Wd=0;class xt extends ci{constructor(){super(),Object.defineProperty(this,"id",{value:Wd++}),this.uuid=kt(),this.name="",this.type="Material",this.fog=!0,this.blending=Er,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Xc,this.blendDst=jc,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Qo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=po,this.stencilZFail=po,this.stencilZPass=po,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}if(t==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=n===qc;continue}const i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Er&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.fog=e.fog,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}xt.prototype.isMaterial=!0;class Jt extends xt{constructor(e){super(),this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=qs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this}}Jt.prototype.isMeshBasicMaterial=!0;const Je=new S,cs=new J;class ut{constructor(e,t,n){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n===!0,this.usage=Fr,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}copyColorsArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let o=e[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),o=new ne),t[n++]=o.r,t[n++]=o.g,t[n++]=o.b}return this}copyVector2sArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let o=e[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),o=new J),t[n++]=o.x,t[n++]=o.y}return this}copyVector3sArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let o=e[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),o=new S),t[n++]=o.x,t[n++]=o.y,t[n++]=o.z}return this}copyVector4sArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let o=e[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),o=new Re),t[n++]=o.x,t[n++]=o.y,t[n++]=o.z,t[n++]=o.w}return this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)cs.fromBufferAttribute(this,t),cs.applyMatrix3(e),this.setXY(t,cs.x,cs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Je.fromBufferAttribute(this,t),Je.applyMatrix3(e),this.setXYZ(t,Je.x,Je.y,Je.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Je.x=this.getX(t),Je.y=this.getY(t),Je.z=this.getZ(t),Je.applyMatrix4(e),this.setXYZ(t,Je.x,Je.y,Je.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Je.x=this.getX(t),Je.y=this.getY(t),Je.z=this.getZ(t),Je.applyNormalMatrix(e),this.setXYZ(t,Je.x,Je.y,Je.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Je.x=this.getX(t),Je.y=this.getY(t),Je.z=this.getZ(t),Je.transformDirection(e),this.setXYZ(t,Je.x,Je.y,Je.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){return this.array[e*this.itemSize]}setX(e,t){return this.array[e*this.itemSize]=t,this}getY(e){return this.array[e*this.itemSize+1]}setY(e,t){return this.array[e*this.itemSize+1]=t,this}getZ(e){return this.array[e*this.itemSize+2]}setZ(e,t){return this.array[e*this.itemSize+2]=t,this}getW(e){return this.array[e*this.itemSize+3]}setW(e,t){return this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Fr&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}ut.prototype.isBufferAttribute=!0;class rh extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class sh extends ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class qd extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}qd.prototype.isFloat16BufferAttribute=!0;class dt extends ut{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Xd=0;const Ut=new de,Ro=new We,wi=new S,zt=new Ft,dr=new Ft,_t=new S;class Ke extends ci{constructor(){super(),Object.defineProperty(this,"id",{value:Xd++}),this.uuid=kt(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(eh(e)?sh:rh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new St().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ut.makeRotationFromQuaternion(e),this.applyMatrix4(Ut),this}rotateX(e){return Ut.makeRotationX(e),this.applyMatrix4(Ut),this}rotateY(e){return Ut.makeRotationY(e),this.applyMatrix4(Ut),this}rotateZ(e){return Ut.makeRotationZ(e),this.applyMatrix4(Ut),this}translate(e,t,n){return Ut.makeTranslation(e,t,n),this.applyMatrix4(Ut),this}scale(e,t,n){return Ut.makeScale(e,t,n),this.applyMatrix4(Ut),this}lookAt(e){return Ro.lookAt(e),Ro.updateMatrix(),this.applyMatrix4(Ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new dt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ft);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];zt.setFromBufferAttribute(r),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new S,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];dr.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(zt.min,dr.min),zt.expandByPoint(_t),_t.addVectors(zt.max,dr.max),zt.expandByPoint(_t)):(zt.expandByPoint(dr.min),zt.expandByPoint(dr.max))}zt.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)_t.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(_t));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)_t.fromBufferAttribute(a,c),l&&(wi.fromBufferAttribute(e,c),_t.add(wi)),i=Math.max(i,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;t.tangent===void 0&&this.setAttribute("tangent",new ut(new Float32Array(4*a),4));const l=t.tangent.array,c=[],h=[];for(let Z=0;Z<a;Z++)c[Z]=new S,h[Z]=new S;const u=new S,d=new S,f=new S,g=new J,x=new J,_=new J,m=new S,p=new S;function T(Z,v,R){u.fromArray(i,Z*3),d.fromArray(i,v*3),f.fromArray(i,R*3),g.fromArray(o,Z*2),x.fromArray(o,v*2),_.fromArray(o,R*2),d.sub(u),f.sub(u),x.sub(g),_.sub(g);const D=1/(x.x*_.y-_.x*x.y);isFinite(D)&&(m.copy(d).multiplyScalar(_.y).addScaledVector(f,-x.y).multiplyScalar(D),p.copy(f).multiplyScalar(x.x).addScaledVector(d,-_.x).multiplyScalar(D),c[Z].add(m),c[v].add(m),c[R].add(m),h[Z].add(p),h[v].add(p),h[R].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let Z=0,v=b.length;Z<v;++Z){const R=b[Z],D=R.start,F=R.count;for(let N=D,O=D+F;N<O;N+=3)T(n[N+0],n[N+1],n[N+2])}const w=new S,L=new S,C=new S,W=new S;function ae(Z){C.fromArray(r,Z*3),W.copy(C);const v=c[Z];w.copy(v),w.sub(C.multiplyScalar(C.dot(v))).normalize(),L.crossVectors(W,v);const D=L.dot(h[Z])<0?-1:1;l[Z*4]=w.x,l[Z*4+1]=w.y,l[Z*4+2]=w.z,l[Z*4+3]=D}for(let Z=0,v=b.length;Z<v;++Z){const R=b[Z],D=R.start,F=R.count;for(let N=D,O=D+F;N<O;N+=3)ae(n[N+0]),ae(n[N+1]),ae(n[N+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new S,r=new S,o=new S,a=new S,l=new S,c=new S,h=new S,u=new S;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),x=e.getX(d+1),_=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,_),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,_),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(_,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(e,t){if(!(e&&e.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e);return}t===void 0&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(e.attributes[i]===void 0)continue;const o=n[i].array,a=e.attributes[i],l=a.array,c=a.itemSize*t,h=Math.min(l.length,o.length-c);for(let u=0,d=c;u<h;u++,d++)o[d]=l[u]}return this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let x=0,_=l.length;x<_;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new ut(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ke,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}Ke.prototype.isBufferGeometry=!0;const Pl=new de,Si=new nr,Co=new ui,Cn=new S,Pn=new S,Dn=new S,Po=new S,Do=new S,Io=new S,hs=new S,us=new S,ds=new S,fs=new J,ps=new J,ms=new J,No=new S,gs=new S;class bt extends We{constructor(e=new Ke,t=new Jt){super(),this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(r),e.ray.intersectsSphere(Co)===!1)||(Pl.copy(r).invert(),Si.copy(e.ray).applyMatrix4(Pl),n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1))return;let o;if(n.isBufferGeometry){const a=n.index,l=n.attributes.position,c=n.morphAttributes.position,h=n.morphTargetsRelative,u=n.attributes.uv,d=n.attributes.uv2,f=n.groups,g=n.drawRange;if(a!==null)if(Array.isArray(i))for(let x=0,_=f.length;x<_;x++){const m=f[x],p=i[m.materialIndex],T=Math.max(m.start,g.start),b=Math.min(a.count,Math.min(m.start+m.count,g.start+g.count));for(let w=T,L=b;w<L;w+=3){const C=a.getX(w),W=a.getX(w+1),ae=a.getX(w+2);o=xs(this,p,e,Si,l,c,h,u,d,C,W,ae),o&&(o.faceIndex=Math.floor(w/3),o.face.materialIndex=m.materialIndex,t.push(o))}}else{const x=Math.max(0,g.start),_=Math.min(a.count,g.start+g.count);for(let m=x,p=_;m<p;m+=3){const T=a.getX(m),b=a.getX(m+1),w=a.getX(m+2);o=xs(this,i,e,Si,l,c,h,u,d,T,b,w),o&&(o.faceIndex=Math.floor(m/3),t.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let x=0,_=f.length;x<_;x++){const m=f[x],p=i[m.materialIndex],T=Math.max(m.start,g.start),b=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let w=T,L=b;w<L;w+=3){const C=w,W=w+1,ae=w+2;o=xs(this,p,e,Si,l,c,h,u,d,C,W,ae),o&&(o.faceIndex=Math.floor(w/3),o.face.materialIndex=m.materialIndex,t.push(o))}}else{const x=Math.max(0,g.start),_=Math.min(l.count,g.start+g.count);for(let m=x,p=_;m<p;m+=3){const T=m,b=m+1,w=m+2;o=xs(this,i,e,Si,l,c,h,u,d,T,b,w),o&&(o.faceIndex=Math.floor(m/3),t.push(o))}}}else n.isGeometry&&console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}bt.prototype.isMesh=!0;function jd(s,e,t,n,i,r,o,a){let l;if(e.side===ht?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side!==an,a),l===null)return null;gs.copy(a),gs.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(gs);return c<t.near||c>t.far?null:{distance:c,point:gs.clone(),object:s}}function xs(s,e,t,n,i,r,o,a,l,c,h,u){Cn.fromBufferAttribute(i,c),Pn.fromBufferAttribute(i,h),Dn.fromBufferAttribute(i,u);const d=s.morphTargetInfluences;if(r&&d){hs.set(0,0,0),us.set(0,0,0),ds.set(0,0,0);for(let g=0,x=r.length;g<x;g++){const _=d[g],m=r[g];_!==0&&(Po.fromBufferAttribute(m,c),Do.fromBufferAttribute(m,h),Io.fromBufferAttribute(m,u),o?(hs.addScaledVector(Po,_),us.addScaledVector(Do,_),ds.addScaledVector(Io,_)):(hs.addScaledVector(Po.sub(Cn),_),us.addScaledVector(Do.sub(Pn),_),ds.addScaledVector(Io.sub(Dn),_)))}Cn.add(hs),Pn.add(us),Dn.add(ds)}s.isSkinnedMesh&&(s.boneTransform(c,Cn),s.boneTransform(h,Pn),s.boneTransform(u,Dn));const f=jd(s,e,t,n,Cn,Pn,Dn,No);if(f){a&&(fs.fromBufferAttribute(a,c),ps.fromBufferAttribute(a,h),ms.fromBufferAttribute(a,u),f.uv=gt.getUV(No,Cn,Pn,Dn,fs,ps,ms,new J)),l&&(fs.fromBufferAttribute(l,c),ps.fromBufferAttribute(l,h),ms.fromBufferAttribute(l,u),f.uv2=gt.getUV(No,Cn,Pn,Dn,fs,ps,ms,new J));const g={a:c,b:h,c:u,normal:new S,materialIndex:0};gt.getNormal(Cn,Pn,Dn,g.normal),f.face=g}return f}class Xr extends Ke{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(u,2));function g(x,_,m,p,T,b,w,L,C,W,ae){const Z=b/C,v=w/W,R=b/2,D=w/2,F=L/2,N=C+1,O=W+1;let H=0,K=0;const re=new S;for(let k=0;k<O;k++){const Y=k*v-D;for(let se=0;se<N;se++){const pe=se*Z-R;re[x]=pe*p,re[_]=Y*T,re[m]=F,c.push(re.x,re.y,re.z),re[x]=0,re[_]=0,re[m]=L>0?1:-1,h.push(re.x,re.y,re.z),u.push(se/C),u.push(1-k/W),H+=1}}for(let k=0;k<W;k++)for(let Y=0;Y<C;Y++){const se=d+Y+N*k,pe=d+Y+N*(k+1),_e=d+(Y+1)+N*(k+1),U=d+(Y+1)+N*k;l.push(se,pe,U),l.push(pe,_e,U),K+=6}a.addGroup(f,K,ae),f+=K,d+=H}}static fromJSON(e){return new Xr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $i(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Et(s){const e={};for(let t=0;t<s.length;t++){const n=$i(s[t]);for(const i in n)e[i]=n[i]}return e}const Ta={clone:$i,merge:Et};var Yd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Sn extends xt{constructor(e){super(),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=Yd,this.fragmentShader=Zd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&(e.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}Sn.prototype.isShaderMaterial=!0;class Ea extends We{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}Ea.prototype.isCamera=!0;class At extends Ea{constructor(e=50,t=1,n=.1,i=2e3){super(),this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Or*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Or*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ar*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}At.prototype.isPerspectiveCamera=!0;const bi=90,Ti=1;class Aa extends We{constructor(e,t,n){if(super(),this.type="CubeCamera",n.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=n;const i=new At(bi,Ti,e,t);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new S(1,0,0)),this.add(i);const r=new At(bi,Ti,e,t);r.layers=this.layers,r.up.set(0,-1,0),r.lookAt(new S(-1,0,0)),this.add(r);const o=new At(bi,Ti,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(new S(0,1,0)),this.add(o);const a=new At(bi,Ti,e,t);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(new S(0,-1,0)),this.add(a);const l=new At(bi,Ti,e,t);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new S(0,0,1)),this.add(l);const c=new At(bi,Ti,e,t);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new S(0,0,-1)),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,r,o,a,l,c]=this.children,h=e.xr.enabled,u=e.getRenderTarget();e.xr.enabled=!1;const d=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,r),e.setRenderTarget(n,2),e.render(t,o),e.setRenderTarget(n,3),e.render(t,a),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=d,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(u),e.xr.enabled=h,n.texture.needsPMREMUpdate=!0}}class js extends pt{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Wr,super(e,t,n,i,r,o,a,l,c,h),this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}js.prototype.isCubeTexture=!0;class oh extends Gt{constructor(e,t,n){Number.isInteger(t)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),t=n),super(e,e,t),t=t||{},this.texture=new js(void 0,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:yt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.format=Lt,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Xr(5,5,5),r=new Sn({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ht,blending:zn});r.uniforms.tEquirect.value=t;const o=new bt(i,r),a=t.minFilter;return t.minFilter===tr&&(t.minFilter=yt),new Aa(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}oh.prototype.isWebGLCubeRenderTarget=!0;const Fo=new S,Jd=new S,Kd=new St;class vn{constructor(e=new S(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Fo.subVectors(n,t).cross(Jd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const n=e.delta(Fo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(n).multiplyScalar(r).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Kd.getNormalMatrix(e),i=this.coplanarPoint(Fo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}vn.prototype.isPlane=!0;const Ei=new ui,_s=new S;class Ys{constructor(e=new vn,t=new vn,n=new vn,i=new vn,r=new vn,o=new vn){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],r=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],u=n[7],d=n[8],f=n[9],g=n[10],x=n[11],_=n[12],m=n[13],p=n[14],T=n[15];return t[0].setComponents(a-i,u-l,x-d,T-_).normalize(),t[1].setComponents(a+i,u+l,x+d,T+_).normalize(),t[2].setComponents(a+r,u+c,x+f,T+m).normalize(),t[3].setComponents(a-r,u-c,x-f,T-m).normalize(),t[4].setComponents(a-o,u-h,x-g,T-p).normalize(),t[5].setComponents(a+o,u+h,x+g,T+p).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Ei)}intersectsSprite(e){return Ei.center.set(0,0,0),Ei.radius=.7071067811865476,Ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(_s.x=i.normal.x>0?e.max.x:e.min.x,_s.y=i.normal.y>0?e.max.y:e.min.y,_s.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(_s)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ah(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function $d(s,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,f=s.createBuffer();s.bindBuffer(h,f),s.bufferData(h,u,d),c.onUploadCallback();let g=5126;return u instanceof Float32Array?g=5126:u instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):u instanceof Uint16Array?c.isFloat16BufferAttribute?t?g=5131:console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."):g=5123:u instanceof Int16Array?g=5122:u instanceof Uint32Array?g=5125:u instanceof Int32Array?g=5124:u instanceof Int8Array?g=5120:(u instanceof Uint8Array||u instanceof Uint8ClampedArray)&&(g=5121),{buffer:f,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function r(c,h,u){const d=h.array,f=h.updateRange;s.bindBuffer(u,c),f.count===-1?s.bufferSubData(u,0,d):(t?s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1)}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,i(c,h)):u.version<c.version&&(r(u.buffer,c,h),u.version=c.version)}return{get:o,remove:a,update:l}}class Zs extends Ke{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],x=[],_=[];for(let m=0;m<h;m++){const p=m*d-o;for(let T=0;T<c;T++){const b=T*u-r;g.push(b,-p,0),x.push(0,0,1),_.push(T/a),_.push(1-m/l)}}for(let m=0;m<l;m++)for(let p=0;p<a;p++){const T=p+c*m,b=p+c*(m+1),w=p+1+c*(m+1),L=p+1+c*m;f.push(T,b,L),f.push(b,w,L)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(x,3)),this.setAttribute("uv",new dt(_,2))}static fromJSON(e){return new Zs(e.width,e.height,e.widthSegments,e.heightSegments)}}var Qd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,ef=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,nf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,sf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,of="vec3 transformed = vec3( position );",af=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lf=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,cf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,xf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,_f=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,vf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 ) + 0.5;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		if ( mipInt < cubeUV_maxMipLevel ) {
			uv.y += 2.0 * cubeUV_maxTileSize;
		}
		uv.y += filterInt * 2.0 * cubeUV_minTileSize;
		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
		uv *= texelSize;
		return texture2D( envMap, uv ).rgb;
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yf=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Mf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Sf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ef=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Af=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Lf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Rf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Df=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,If=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ff=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Of=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,Bf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		lightMapIrradiance *= PI;
	#endif
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,zf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uf=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointLightInfo( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotLightInfo( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalLightInfo( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry.normal );
		#endif
	}
	#pragma unroll_loop_end
#endif`,Hf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kf=`#if defined( USE_ENVMAP )
	#ifdef ENVMAP_MODE_REFRACTION
		uniform float refractionRatio;
	#endif
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec;
			#ifdef ENVMAP_MODE_REFLECTION
				reflectVec = reflect( - viewDir, normal );
				reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			#else
				reflectVec = refract( - viewDir, normal, refractionRatio );
			#endif
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Gf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,Wf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,Xf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,jf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	vec3 FssEss = specularColor * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yf=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Zf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			lightMapIrradiance *= PI;
		#endif
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Kf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$f=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ep=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,tp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,np=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ip=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,op=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ap=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1, 2 ) * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,lp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform vec2 morphTargetsTextureSize;
		vec3 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset, const in int stride ) {
			float texelIndex = float( vertexIndex * stride + offset );
			float y = floor( texelIndex / morphTargetsTextureSize.x );
			float x = texelIndex - y * morphTargetsTextureSize.x;
			vec3 morphUV = vec3( ( x + 0.5 ) / morphTargetsTextureSize.x, y / morphTargetsTextureSize.y, morphTargetIndex );
			return texture( morphTargetsTexture, morphUV ).xyz;
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,cp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			#ifndef USE_MORPHNORMALS
				if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 1 ) * morphTargetInfluences[ i ];
			#else
				if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 2 ) * morphTargetInfluences[ i ];
			#endif
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,up=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,gp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,xp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,_p=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,vp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,Mp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ep=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ap=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Lp=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rp=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Cp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	#ifdef BONE_TEXTURE
		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;
		mat4 getBoneMatrix( const in float i ) {
			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );
			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );
			y = dy * ( y + 0.5 );
			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
			mat4 bone = mat4( v1, v2, v3, v4 );
			return bone;
		}
	#else
		uniform mat4 boneMatrices[ MAX_BONES ];
		mat4 getBoneMatrix( const in float i ) {
			mat4 bone = boneMatrices[ int(i) ];
			return bone;
		}
	#endif
#endif`,Ip=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Np=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Op=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Up=`#ifdef USE_TRANSMISSION
	float transmissionAlpha = 1.0;
	float transmissionFactor = transmission;
	float thicknessFactor = thickness;
	#ifdef USE_TRANSMISSIONMAP
		transmissionFactor *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		thicknessFactor *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,
		attenuationColor, attenuationDistance );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );
	transmissionAlpha = mix( transmissionAlpha, transmission.a, transmissionFactor );
#endif`,Hp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef TEXTURE_LOD_EXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( attenuationDistance == 0.0 ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,kp=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Gp=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Vp=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Wp=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,qp=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Xp=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,jp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zp=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kp=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,$p=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,em=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,rm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,om=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,am=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,um=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_m=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ym=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wm=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,bm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ne={alphamap_fragment:Qd,alphamap_pars_fragment:ef,alphatest_fragment:tf,alphatest_pars_fragment:nf,aomap_fragment:rf,aomap_pars_fragment:sf,begin_vertex:of,beginnormal_vertex:af,bsdfs:lf,bumpmap_pars_fragment:cf,clipping_planes_fragment:hf,clipping_planes_pars_fragment:uf,clipping_planes_pars_vertex:df,clipping_planes_vertex:ff,color_fragment:pf,color_pars_fragment:mf,color_pars_vertex:gf,color_vertex:xf,common:_f,cube_uv_reflection_fragment:vf,defaultnormal_vertex:yf,displacementmap_pars_vertex:Mf,displacementmap_vertex:wf,emissivemap_fragment:Sf,emissivemap_pars_fragment:bf,encodings_fragment:Tf,encodings_pars_fragment:Ef,envmap_fragment:Af,envmap_common_pars_fragment:Lf,envmap_pars_fragment:Rf,envmap_pars_vertex:Cf,envmap_physical_pars_fragment:kf,envmap_vertex:Pf,fog_vertex:Df,fog_pars_vertex:If,fog_fragment:Nf,fog_pars_fragment:Ff,gradientmap_pars_fragment:Of,lightmap_fragment:Bf,lightmap_pars_fragment:zf,lights_lambert_vertex:Uf,lights_pars_begin:Hf,lights_toon_fragment:Gf,lights_toon_pars_fragment:Vf,lights_phong_fragment:Wf,lights_phong_pars_fragment:qf,lights_physical_fragment:Xf,lights_physical_pars_fragment:jf,lights_fragment_begin:Yf,lights_fragment_maps:Zf,lights_fragment_end:Jf,logdepthbuf_fragment:Kf,logdepthbuf_pars_fragment:$f,logdepthbuf_pars_vertex:Qf,logdepthbuf_vertex:ep,map_fragment:tp,map_pars_fragment:np,map_particle_fragment:ip,map_particle_pars_fragment:rp,metalnessmap_fragment:sp,metalnessmap_pars_fragment:op,morphnormal_vertex:ap,morphtarget_pars_vertex:lp,morphtarget_vertex:cp,normal_fragment_begin:hp,normal_fragment_maps:up,normal_pars_fragment:dp,normal_pars_vertex:fp,normal_vertex:pp,normalmap_pars_fragment:mp,clearcoat_normal_fragment_begin:gp,clearcoat_normal_fragment_maps:xp,clearcoat_pars_fragment:_p,output_fragment:vp,packing:yp,premultiplied_alpha_fragment:Mp,project_vertex:wp,dithering_fragment:Sp,dithering_pars_fragment:bp,roughnessmap_fragment:Tp,roughnessmap_pars_fragment:Ep,shadowmap_pars_fragment:Ap,shadowmap_pars_vertex:Lp,shadowmap_vertex:Rp,shadowmask_pars_fragment:Cp,skinbase_vertex:Pp,skinning_pars_vertex:Dp,skinning_vertex:Ip,skinnormal_vertex:Np,specularmap_fragment:Fp,specularmap_pars_fragment:Op,tonemapping_fragment:Bp,tonemapping_pars_fragment:zp,transmission_fragment:Up,transmission_pars_fragment:Hp,uv_pars_fragment:kp,uv_pars_vertex:Gp,uv_vertex:Vp,uv2_pars_fragment:Wp,uv2_pars_vertex:qp,uv2_vertex:Xp,worldpos_vertex:jp,background_vert:Yp,background_frag:Zp,cube_vert:Jp,cube_frag:Kp,depth_vert:$p,depth_frag:Qp,distanceRGBA_vert:em,distanceRGBA_frag:tm,equirect_vert:nm,equirect_frag:im,linedashed_vert:rm,linedashed_frag:sm,meshbasic_vert:om,meshbasic_frag:am,meshlambert_vert:lm,meshlambert_frag:cm,meshmatcap_vert:hm,meshmatcap_frag:um,meshnormal_vert:dm,meshnormal_frag:fm,meshphong_vert:pm,meshphong_frag:mm,meshphysical_vert:gm,meshphysical_frag:xm,meshtoon_vert:_m,meshtoon_frag:vm,points_vert:ym,points_frag:Mm,shadow_vert:wm,shadow_frag:Sm,sprite_vert:bm,sprite_frag:Tm},$={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new St},uv2Transform:{value:new St},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new St}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new St}}},on={basic:{uniforms:Et([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Et([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.fog,$.lights,{emissive:{value:new ne(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Et([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Et([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Et([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new ne(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Et([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Et([$.points,$.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Et([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Et([$.common,$.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Et([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Et([$.sprite,$.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new St},t2D:{value:null}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},cube:{uniforms:Et([$.envmap,{opacity:{value:1}}]),vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:Et([$.common,$.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:Et([$.lights,$.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};on.physical={uniforms:Et([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new J(1,1)},clearcoatNormalMap:{value:null},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};function Em(s,e,t,n,i,r){const o=new ne(0);let a=i===!0?0:1,l,c,h=null,u=0,d=null;function f(x,_){let m=!1,p=_.isScene===!0?_.background:null;p&&p.isTexture&&(p=e.get(p));const T=s.xr,b=T.getSession&&T.getSession();b&&b.environmentBlendMode==="additive"&&(p=null),p===null?g(o,a):p&&p.isColor&&(g(p,1),m=!0),(s.autoClear||m)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),p&&(p.isCubeTexture||p.mapping===Xs)?(c===void 0&&(c=new bt(new Xr(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:$i(on.cube.uniforms),vertexShader:on.cube.vertexShader,fragmentShader:on.cube.fragmentShader,side:ht,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,L,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=p,c.material.uniforms.flipEnvMap.value=p.isCubeTexture&&p.isRenderTargetTexture===!1?-1:1,(h!==p||u!==p.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=p,u=p.version,d=s.toneMapping),x.unshift(c,c.geometry,c.material,0,0,null)):p&&p.isTexture&&(l===void 0&&(l=new bt(new Zs(2,2),new Sn({name:"BackgroundMaterial",uniforms:$i(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=p,p.matrixAutoUpdate===!0&&p.updateMatrix(),l.material.uniforms.uvTransform.value.copy(p.matrix),(h!==p||u!==p.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=p,u=p.version,d=s.toneMapping),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,_){t.buffers.color.setClear(x.r,x.g,x.b,_,r)}return{getClearColor:function(){return o},setClearColor:function(x,_=1){o.set(x),a=_,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,g(o,a)},render:f}}function Am(s,e,t,n){const i=s.getParameter(34921),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=x(null);let c=l;function h(D,F,N,O,H){let K=!1;if(o){const re=g(O,N,F);c!==re&&(c=re,d(c.object)),K=_(O,H),K&&m(O,H)}else{const re=F.wireframe===!0;(c.geometry!==O.id||c.program!==N.id||c.wireframe!==re)&&(c.geometry=O.id,c.program=N.id,c.wireframe=re,K=!0)}D.isInstancedMesh===!0&&(K=!0),H!==null&&t.update(H,34963),K&&(C(D,F,N,O),H!==null&&s.bindBuffer(34963,t.get(H).buffer))}function u(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function d(D){return n.isWebGL2?s.bindVertexArray(D):r.bindVertexArrayOES(D)}function f(D){return n.isWebGL2?s.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function g(D,F,N){const O=N.wireframe===!0;let H=a[D.id];H===void 0&&(H={},a[D.id]=H);let K=H[F.id];K===void 0&&(K={},H[F.id]=K);let re=K[O];return re===void 0&&(re=x(u()),K[O]=re),re}function x(D){const F=[],N=[],O=[];for(let H=0;H<i;H++)F[H]=0,N[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:N,attributeDivisors:O,object:D,attributes:{},index:null}}function _(D,F){const N=c.attributes,O=D.attributes;let H=0;for(const K in O){const re=N[K],k=O[K];if(re===void 0||re.attribute!==k||re.data!==k.data)return!0;H++}return c.attributesNum!==H||c.index!==F}function m(D,F){const N={},O=D.attributes;let H=0;for(const K in O){const re=O[K],k={};k.attribute=re,re.data&&(k.data=re.data),N[K]=k,H++}c.attributes=N,c.attributesNum=H,c.index=F}function p(){const D=c.newAttributes;for(let F=0,N=D.length;F<N;F++)D[F]=0}function T(D){b(D,0)}function b(D,F){const N=c.newAttributes,O=c.enabledAttributes,H=c.attributeDivisors;N[D]=1,O[D]===0&&(s.enableVertexAttribArray(D),O[D]=1),H[D]!==F&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,F),H[D]=F)}function w(){const D=c.newAttributes,F=c.enabledAttributes;for(let N=0,O=F.length;N<O;N++)F[N]!==D[N]&&(s.disableVertexAttribArray(N),F[N]=0)}function L(D,F,N,O,H,K){n.isWebGL2===!0&&(N===5124||N===5125)?s.vertexAttribIPointer(D,F,N,H,K):s.vertexAttribPointer(D,F,N,O,H,K)}function C(D,F,N,O){if(n.isWebGL2===!1&&(D.isInstancedMesh||O.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;p();const H=O.attributes,K=N.getAttributes(),re=F.defaultAttributeValues;for(const k in K){const Y=K[k];if(Y.location>=0){let se=H[k];if(se===void 0&&(k==="instanceMatrix"&&D.instanceMatrix&&(se=D.instanceMatrix),k==="instanceColor"&&D.instanceColor&&(se=D.instanceColor)),se!==void 0){const pe=se.normalized,_e=se.itemSize,U=t.get(se);if(U===void 0)continue;const Ge=U.buffer,ge=U.type,Se=U.bytesPerElement;if(se.isInterleavedBufferAttribute){const he=se.data,Pe=he.stride,be=se.offset;if(he&&he.isInstancedInterleavedBuffer){for(let q=0;q<Y.locationSize;q++)b(Y.location+q,he.meshPerAttribute);D.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let q=0;q<Y.locationSize;q++)T(Y.location+q);s.bindBuffer(34962,Ge);for(let q=0;q<Y.locationSize;q++)L(Y.location+q,_e/Y.locationSize,ge,pe,Pe*Se,(be+_e/Y.locationSize*q)*Se)}else{if(se.isInstancedBufferAttribute){for(let he=0;he<Y.locationSize;he++)b(Y.location+he,se.meshPerAttribute);D.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let he=0;he<Y.locationSize;he++)T(Y.location+he);s.bindBuffer(34962,Ge);for(let he=0;he<Y.locationSize;he++)L(Y.location+he,_e/Y.locationSize,ge,pe,_e*Se,_e/Y.locationSize*he*Se)}}else if(re!==void 0){const pe=re[k];if(pe!==void 0)switch(pe.length){case 2:s.vertexAttrib2fv(Y.location,pe);break;case 3:s.vertexAttrib3fv(Y.location,pe);break;case 4:s.vertexAttrib4fv(Y.location,pe);break;default:s.vertexAttrib1fv(Y.location,pe)}}}}w()}function W(){v();for(const D in a){const F=a[D];for(const N in F){const O=F[N];for(const H in O)f(O[H].object),delete O[H];delete F[N]}delete a[D]}}function ae(D){if(a[D.id]===void 0)return;const F=a[D.id];for(const N in F){const O=F[N];for(const H in O)f(O[H].object),delete O[H];delete F[N]}delete a[D.id]}function Z(D){for(const F in a){const N=a[F];if(N[D.id]===void 0)continue;const O=N[D.id];for(const H in O)f(O[H].object),delete O[H];delete N[D.id]}}function v(){R(),c!==l&&(c=l,d(c.object))}function R(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:v,resetDefaultState:R,dispose:W,releaseStatesOfGeometry:ae,releaseStatesOfProgram:Z,initAttributes:p,enableAttribute:T,disableUnusedAttributes:w}}function Lm(s,e,t,n){const i=n.isWebGL2;let r;function o(c){r=c}function a(c,h){s.drawArrays(r,c,h),t.update(h,r,1)}function l(c,h,u){if(u===0)return;let d,f;if(i)d=s,f="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),f="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[f](r,c,h,u),t.update(h,r,u)}this.setMode=o,this.render=a,this.renderInstances=l}function Rm(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(C){if(C==="highp"){if(s.getShaderPrecisionFormat(35633,36338).precision>0&&s.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(35633,36337).precision>0&&s.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&s instanceof WebGL2ComputeRenderingContext;let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(34930),d=s.getParameter(35660),f=s.getParameter(3379),g=s.getParameter(34076),x=s.getParameter(34921),_=s.getParameter(36347),m=s.getParameter(36348),p=s.getParameter(36349),T=d>0,b=o||e.has("OES_texture_float"),w=T&&b,L=o?s.getParameter(36183):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:_,maxVaryings:m,maxFragmentUniforms:p,vertexTextures:T,floatFragmentTextures:b,floatVertexTextures:w,maxSamples:L}}function Cm(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new vn,a=new St,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d,f){const g=u.length!==0||d||n!==0||i;return i=d,t=h(u,f,0),n=u.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1,c()},this.setState=function(u,d,f){const g=u.clippingPlanes,x=u.clipIntersection,_=u.clipShadows,m=s.get(u);if(!i||g===null||g.length===0||r&&!_)r?h(null):c();else{const p=r?0:n,T=p*4;let b=m.clippingState||null;l.value=b,b=h(g,d,T,f);for(let w=0;w!==T;++w)b[w]=t[w];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=p}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const x=u!==null?u.length:0;let _=null;if(x!==0){if(_=l.value,g!==!0||_===null){const m=f+x*4,p=d.matrixWorldInverse;a.getNormalMatrix(p),(_===null||_.length<m)&&(_=new Float32Array(m));for(let T=0,b=f;T!==x;++T,b+=4)o.copy(u[T]).applyMatrix4(p,a),o.normal.toArray(_,b),_[b+3]=o.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,_}}function Pm(s){let e=new WeakMap;function t(o,a){return a===ea?o.mapping=Wr:a===ta&&(o.mapping=qr),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===ea||a===ta)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new oh(l.height/2);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class jr extends Ea{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}jr.prototype.isOrthographicCamera=!0;class Js extends Sn{constructor(e){super(e),this.type="RawShaderMaterial"}}Js.prototype.isRawShaderMaterial=!0;const ji=4,kn=8,nn=Math.pow(2,kn),lh=[.125,.215,.35,.446,.526,.582],ch=kn-ji+1+lh.length,Ai=20,Oo=new jr,{_lodPlanes:fr,_sizeLods:Dl,_sigmas:vs}=Dm(),Il=new ne;let Bo=null;const ti=(1+Math.sqrt(5))/2,Li=1/ti,Nl=[new S(1,1,1),new S(-1,1,1),new S(1,1,-1),new S(-1,1,-1),new S(0,ti,Li),new S(0,ti,-Li),new S(Li,0,ti),new S(-Li,0,ti),new S(ti,Li,0),new S(-ti,Li,0)];class Fl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._blurMaterial=Im(Ai),this._equirectShader=null,this._cubemapShader=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Bo=this._renderer.getRenderTarget();const r=this._allocateTargets();return this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapShader===null&&(this._cubemapShader=zl(),this._compileMaterial(this._cubemapShader))}compileEquirectangularShader(){this._equirectShader===null&&(this._equirectShader=Bl(),this._compileMaterial(this._equirectShader))}dispose(){this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose(),this._cubemapShader!==null&&this._cubemapShader.dispose(),this._equirectShader!==null&&this._equirectShader.dispose();for(let e=0;e<fr.length;e++)fr[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Bo),e.scissorTest=!1,ys(e,0,0,e.width,e.height)}_fromTexture(e,t){Bo=this._renderer.getRenderTarget();const n=t||this._allocateTargets(e);return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(e){const t={magFilter:yt,minFilter:yt,generateMipmaps:!1,type:Wi,format:Lt,encoding:Rt,depthBuffer:!1},n=Ol(t);return n.depthBuffer=!e,this._pingPongRenderTarget===null&&(this._pingPongRenderTarget=Ol(t)),n}_compileMaterial(e){const t=new bt(fr[0],e);this._renderer.compile(t,Oo)}_sceneToCubeUV(e,t,n,i){const a=new At(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Il),h.toneMapping=Un,h.autoClear=!1;const f=new Jt({name:"PMREM.Background",side:ht,depthWrite:!1,depthTest:!1}),g=new bt(new Xr,f);let x=!1;const _=e.background;_?_.isColor&&(f.color.copy(_),e.background=null,x=!0):(f.color.copy(Il),x=!0);for(let m=0;m<6;m++){const p=m%3;p===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):p===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m])),ys(i,p*nn,m>2?nn:0,nn,nn),h.setRenderTarget(i),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Wr||e.mapping===qr;i?(this._cubemapShader===null&&(this._cubemapShader=zl()),this._cubemapShader.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectShader===null&&(this._equirectShader=Bl());const r=i?this._cubemapShader:this._equirectShader,o=new bt(fr[0],r),a=r.uniforms;a.envMap.value=e,i||a.texelSize.value.set(1/e.image.width,1/e.image.height),ys(t,0,0,3*nn,2*nn),n.setRenderTarget(t),n.render(o,Oo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<ch;i++){const r=Math.sqrt(vs[i]*vs[i]-vs[i-1]*vs[i-1]),o=Nl[(i-1)%Nl.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new bt(fr[i],c),d=c.uniforms,f=Dl[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ai-1),x=r/g,_=isFinite(r)?1+Math.floor(h*x):Ai;_>Ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Ai}`);const m=[];let p=0;for(let L=0;L<Ai;++L){const C=L/x,W=Math.exp(-C*C/2);m.push(W),L===0?p+=W:L<_&&(p+=2*W)}for(let L=0;L<m.length;L++)m[L]=m[L]/p;d.envMap.value=e.texture,d.samples.value=_,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a),d.dTheta.value=g,d.mipInt.value=kn-n;const T=Dl[i],b=3*Math.max(0,nn-2*T),w=(i===0?0:2*nn)+2*T*(i>kn-ji?i-kn+ji:0);ys(t,b,w,3*T,2*T),l.setRenderTarget(t),l.render(u,Oo)}}function Dm(){const s=[],e=[],t=[];let n=kn;for(let i=0;i<ch;i++){const r=Math.pow(2,n);e.push(r);let o=1/r;i>kn-ji?o=lh[i-kn+ji-1]:i===0&&(o=0),t.push(o);const a=1/(r-1),l=-a/2,c=1+a/2,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,g=2,x=1,_=new Float32Array(f*d*u),m=new Float32Array(g*d*u),p=new Float32Array(x*d*u);for(let b=0;b<u;b++){const w=b%3*2/3-1,L=b>2?0:-1,C=[w,L,0,w+2/3,L,0,w+2/3,L+1,0,w,L,0,w+2/3,L+1,0,w,L+1,0];_.set(C,f*d*b),m.set(h,g*d*b);const W=[b,b,b,b,b,b];p.set(W,x*d*b)}const T=new Ke;T.setAttribute("position",new ut(_,f)),T.setAttribute("uv",new ut(m,g)),T.setAttribute("faceIndex",new ut(p,x)),s.push(T),n>ji&&n--}return{_lodPlanes:s,_sizeLods:e,_sigmas:t}}function Ol(s){const e=new Gt(3*nn,3*nn,s);return e.texture.mapping=Xs,e.texture.name="PMREM.cubeUv",e.scissorTest=!0,e}function ys(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Im(s){const e=new Float32Array(s),t=new S(0,1,0);return new Js({name:"SphericalGaussianBlur",defines:{n:s},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:e},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:t}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Bl(){const s=new J(1,1);return new Js({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null},texelSize:{value:s}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform vec2 texelSize;

			#include <common>

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				vec2 f = fract( uv / texelSize - 0.5 );
				uv -= f * texelSize;
				vec3 tl = texture2D ( envMap, uv ).rgb;
				uv.x += texelSize.x;
				vec3 tr = texture2D ( envMap, uv ).rgb;
				uv.y += texelSize.y;
				vec3 br = texture2D ( envMap, uv ).rgb;
				uv.x -= texelSize.x;
				vec3 bl = texture2D ( envMap, uv ).rgb;

				vec3 tm = mix( tl, tr, f.x );
				vec3 bm = mix( bl, br, f.x );
				gl_FragColor.rgb = mix( tm, bm, f.y );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function zl(){return new Js({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function La(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 position;
		attribute vec2 uv;
		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Nm(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ea||l===ta,h=l===Wr||l===qr;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Fl(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Fl(s));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Fm(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Om(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],34962);const f=u.morphAttributes;for(const g in f){const x=f[g];for(let _=0,m=x.length;_<m;_++)e.update(x[_],34962)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let x=0;if(f!==null){const p=f.array;x=f.version;for(let T=0,b=p.length;T<b;T+=3){const w=p[T+0],L=p[T+1],C=p[T+2];d.push(w,L,L,C,C,w)}}else{const p=g.array;x=g.version;for(let T=0,b=p.length/3-1;T<b;T+=3){const w=T+0,L=T+1,C=T+2;d.push(w,L,L,C,C,w)}}const _=new(eh(d)?sh:rh)(d,1);_.version=x;const m=r.get(u);m&&e.remove(m),r.set(u,_)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Bm(s,e,t,n){const i=n.isWebGL2;let r;function o(d){r=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,f){s.drawElements(r,f,a,d*l),t.update(f,r,1)}function u(d,f,g){if(g===0)return;let x,_;if(i)x=s,_="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),_="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[_](r,f,a,d*l,g),t.update(f,r,g)}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u}function zm(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case 4:t.triangles+=a*(r/3);break;case 1:t.lines+=a*(r/2);break;case 3:t.lines+=a*(r-1);break;case 2:t.lines+=a*r;break;case 0:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}class Ra extends pt{constructor(e=null,t=1,n=1,i=1){super(null),this.image={data:e,width:t,height:n,depth:i},this.magFilter=ft,this.minFilter=ft,this.wrapR=Nt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}Ra.prototype.isDataTexture2DArray=!0;function Um(s,e){return s[0]-e[0]}function Hm(s,e){return Math.abs(e[1])-Math.abs(s[1])}function Ul(s,e){let t=1;const n=e.isInterleavedBufferAttribute?e.data.array:e.array;n instanceof Int8Array?t=127:n instanceof Int16Array?t=32767:n instanceof Int32Array?t=2147483647:console.error("THREE.WebGLMorphtargets: Unsupported morph attribute data type: ",n),s.divideScalar(t)}function km(s,e,t){const n={},i=new Float32Array(8),r=new WeakMap,o=new S,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u,d){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const x=h.morphAttributes.position.length;let _=r.get(h);if(_===void 0||_.count!==x){let D=function(){v.dispose(),r.delete(h),h.removeEventListener("dispose",D)};var g=D;_!==void 0&&_.texture.dispose();const T=h.morphAttributes.normal!==void 0,b=h.morphAttributes.position,w=h.morphAttributes.normal||[],L=h.attributes.position.count,C=T===!0?2:1;let W=L*C,ae=1;W>e.maxTextureSize&&(ae=Math.ceil(W/e.maxTextureSize),W=e.maxTextureSize);const Z=new Float32Array(W*ae*4*x),v=new Ra(Z,W,ae,x);v.format=Lt,v.type=Fn,v.needsUpdate=!0;const R=C*4;for(let F=0;F<x;F++){const N=b[F],O=w[F],H=W*ae*4*F;for(let K=0;K<N.count;K++){o.fromBufferAttribute(N,K),N.normalized===!0&&Ul(o,N);const re=K*R;Z[H+re+0]=o.x,Z[H+re+1]=o.y,Z[H+re+2]=o.z,Z[H+re+3]=0,T===!0&&(o.fromBufferAttribute(O,K),O.normalized===!0&&Ul(o,O),Z[H+re+4]=o.x,Z[H+re+5]=o.y,Z[H+re+6]=o.z,Z[H+re+7]=0)}}_={count:x,texture:v,size:new J(W,ae)},r.set(h,_),h.addEventListener("dispose",D)}let m=0;for(let T=0;T<f.length;T++)m+=f[T];const p=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(s,"morphTargetBaseInfluence",p),d.getUniforms().setValue(s,"morphTargetInfluences",f),d.getUniforms().setValue(s,"morphTargetsTexture",_.texture,t),d.getUniforms().setValue(s,"morphTargetsTextureSize",_.size)}else{const x=f===void 0?0:f.length;let _=n[h.id];if(_===void 0||_.length!==x){_=[];for(let w=0;w<x;w++)_[w]=[w,0];n[h.id]=_}for(let w=0;w<x;w++){const L=_[w];L[0]=w,L[1]=f[w]}_.sort(Hm);for(let w=0;w<8;w++)w<x&&_[w][1]?(a[w][0]=_[w][0],a[w][1]=_[w][1]):(a[w][0]=Number.MAX_SAFE_INTEGER,a[w][1]=0);a.sort(Um);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let T=0;for(let w=0;w<8;w++){const L=a[w],C=L[0],W=L[1];C!==Number.MAX_SAFE_INTEGER&&W?(m&&h.getAttribute("morphTarget"+w)!==m[C]&&h.setAttribute("morphTarget"+w,m[C]),p&&h.getAttribute("morphNormal"+w)!==p[C]&&h.setAttribute("morphNormal"+w,p[C]),i[w]=W,T+=W):(m&&h.hasAttribute("morphTarget"+w)===!0&&h.deleteAttribute("morphTarget"+w),p&&h.hasAttribute("morphNormal"+w)===!0&&h.deleteAttribute("morphNormal"+w),i[w]=0)}const b=h.morphTargetsRelative?1:1-T;d.getUniforms().setValue(s,"morphTargetBaseInfluence",b),d.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function Gm(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);return i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class hh extends pt{constructor(e=null,t=1,n=1,i=1){super(null),this.image={data:e,width:t,height:n,depth:i},this.magFilter=ft,this.minFilter=ft,this.wrapR=Nt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}hh.prototype.isDataTexture3D=!0;const uh=new pt,dh=new Ra,fh=new hh,ph=new js,Hl=[],kl=[],Gl=new Float32Array(16),Vl=new Float32Array(9),Wl=new Float32Array(4);function ir(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Hl[i];if(r===void 0&&(r=new Float32Array(i),Hl[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Pt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Ct(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Ks(s,e){let t=kl[e];t===void 0&&(t=new Int32Array(e),kl[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Vm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Wm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;s.uniform2fv(this.addr,e),Ct(t,e)}}function qm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;s.uniform3fv(this.addr,e),Ct(t,e)}}function Xm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;s.uniform4fv(this.addr,e),Ct(t,e)}}function jm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Pt(t,n))return;Wl.set(n),s.uniformMatrix2fv(this.addr,!1,Wl),Ct(t,n)}}function Ym(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Pt(t,n))return;Vl.set(n),s.uniformMatrix3fv(this.addr,!1,Vl),Ct(t,n)}}function Zm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Pt(t,n))return;Gl.set(n),s.uniformMatrix4fv(this.addr,!1,Gl),Ct(t,n)}}function Jm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Km(s,e){const t=this.cache;Pt(t,e)||(s.uniform2iv(this.addr,e),Ct(t,e))}function $m(s,e){const t=this.cache;Pt(t,e)||(s.uniform3iv(this.addr,e),Ct(t,e))}function Qm(s,e){const t=this.cache;Pt(t,e)||(s.uniform4iv(this.addr,e),Ct(t,e))}function eg(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function tg(s,e){const t=this.cache;Pt(t,e)||(s.uniform2uiv(this.addr,e),Ct(t,e))}function ng(s,e){const t=this.cache;Pt(t,e)||(s.uniform3uiv(this.addr,e),Ct(t,e))}function ig(s,e){const t=this.cache;Pt(t,e)||(s.uniform4uiv(this.addr,e),Ct(t,e))}function rg(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.safeSetTexture2D(e||uh,i)}function sg(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||fh,i)}function og(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.safeSetTextureCube(e||ph,i)}function ag(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||dh,i)}function lg(s){switch(s){case 5126:return Vm;case 35664:return Wm;case 35665:return qm;case 35666:return Xm;case 35674:return jm;case 35675:return Ym;case 35676:return Zm;case 5124:case 35670:return Jm;case 35667:case 35671:return Km;case 35668:case 35672:return $m;case 35669:case 35673:return Qm;case 5125:return eg;case 36294:return tg;case 36295:return ng;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return sg;case 35680:case 36300:case 36308:case 36293:return og;case 36289:case 36303:case 36311:case 36292:return ag}}function cg(s,e){s.uniform1fv(this.addr,e)}function hg(s,e){const t=ir(e,this.size,2);s.uniform2fv(this.addr,t)}function ug(s,e){const t=ir(e,this.size,3);s.uniform3fv(this.addr,t)}function dg(s,e){const t=ir(e,this.size,4);s.uniform4fv(this.addr,t)}function fg(s,e){const t=ir(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function pg(s,e){const t=ir(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function mg(s,e){const t=ir(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function gg(s,e){s.uniform1iv(this.addr,e)}function xg(s,e){s.uniform2iv(this.addr,e)}function _g(s,e){s.uniform3iv(this.addr,e)}function vg(s,e){s.uniform4iv(this.addr,e)}function yg(s,e){s.uniform1uiv(this.addr,e)}function Mg(s,e){s.uniform2uiv(this.addr,e)}function wg(s,e){s.uniform3uiv(this.addr,e)}function Sg(s,e){s.uniform4uiv(this.addr,e)}function bg(s,e,t){const n=e.length,i=Ks(t,n);s.uniform1iv(this.addr,i);for(let r=0;r!==n;++r)t.safeSetTexture2D(e[r]||uh,i[r])}function Tg(s,e,t){const n=e.length,i=Ks(t,n);s.uniform1iv(this.addr,i);for(let r=0;r!==n;++r)t.setTexture3D(e[r]||fh,i[r])}function Eg(s,e,t){const n=e.length,i=Ks(t,n);s.uniform1iv(this.addr,i);for(let r=0;r!==n;++r)t.safeSetTextureCube(e[r]||ph,i[r])}function Ag(s,e,t){const n=e.length,i=Ks(t,n);s.uniform1iv(this.addr,i);for(let r=0;r!==n;++r)t.setTexture2DArray(e[r]||dh,i[r])}function Lg(s){switch(s){case 5126:return cg;case 35664:return hg;case 35665:return ug;case 35666:return dg;case 35674:return fg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return xg;case 35668:case 35672:return _g;case 35669:case 35673:return vg;case 5125:return yg;case 36294:return Mg;case 36295:return wg;case 36296:return Sg;case 35678:case 36198:case 36298:case 36306:case 35682:return bg;case 35679:case 36299:case 36307:return Tg;case 35680:case 36300:case 36308:case 36293:return Eg;case 36289:case 36303:case 36311:case 36292:return Ag}}function Rg(s,e,t){this.id=s,this.addr=t,this.cache=[],this.setValue=lg(e.type)}function mh(s,e,t){this.id=s,this.addr=t,this.cache=[],this.size=e.size,this.setValue=Lg(e.type)}mh.prototype.updateCache=function(s){const e=this.cache;s instanceof Float32Array&&e.length!==s.length&&(this.cache=new Float32Array(s.length)),Ct(e,s)};function gh(s){this.id=s,this.seq=[],this.map={}}gh.prototype.setValue=function(s,e,t){const n=this.seq;for(let i=0,r=n.length;i!==r;++i){const o=n[i];o.setValue(s,e[o.id],t)}};const zo=/(\w+)(\])?(\[|\.)?/g;function ql(s,e){s.seq.push(e),s.map[e.id]=e}function Cg(s,e,t){const n=s.name,i=n.length;for(zo.lastIndex=0;;){const r=zo.exec(n),o=zo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){ql(t,c===void 0?new Rg(a,s,e):new mh(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new gh(a),ql(t,u)),t=u}}}function Gn(s,e){this.seq=[],this.map={};const t=s.getProgramParameter(e,35718);for(let n=0;n<t;++n){const i=s.getActiveUniform(e,n),r=s.getUniformLocation(e,i.name);Cg(i,r,this)}}Gn.prototype.setValue=function(s,e,t,n){const i=this.map[e];i!==void 0&&i.setValue(s,t,n)};Gn.prototype.setOptional=function(s,e,t){const n=e[t];n!==void 0&&this.setValue(s,t,n)};Gn.upload=function(s,e,t,n){for(let i=0,r=e.length;i!==r;++i){const o=e[i],a=t[o.id];a.needsUpdate!==!1&&o.setValue(s,a.value,n)}};Gn.seqWithValue=function(s,e){const t=[];for(let n=0,i=s.length;n!==i;++n){const r=s[n];r.id in e&&t.push(r)}return t};function Xl(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}let Pg=0;function Dg(s){const e=s.split(`
`);for(let t=0;t<e.length;t++)e[t]=t+1+": "+e[t];return e.join(`
`)}function Ig(s){switch(s){case Rt:return["Linear","( value )"];case He:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",s),["Linear","( value )"]}}function jl(s,e,t){const n=s.getShaderParameter(e,35713),i=s.getShaderInfoLog(e).trim();return n&&i===""?"":t.toUpperCase()+`

`+i+`

`+Dg(s.getShaderSource(e))}function Ng(s,e){const t=Ig(e);return"vec4 "+s+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function Fg(s,e){let t;switch(e){case Xu:t="Linear";break;case ju:t="Reinhard";break;case Yu:t="OptimizedCineon";break;case Zu:t="ACESFilmic";break;case Ju:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Og(s){return[s.extensionDerivatives||s.envMapCubeUV||s.bumpMap||s.tangentSpaceNormalMap||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Tr).join(`
`)}function Bg(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function zg(s,e){const t={},n=s.getProgramParameter(e,35721);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===35674&&(a=2),r.type===35675&&(a=3),r.type===35676&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Tr(s){return s!==""}function Yl(s,e){return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zl(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ug=/^[ \t]*#include +<([\w\d./]+)>/gm;function oa(s){return s.replace(Ug,Hg)}function Hg(s,e){const t=Ne[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return oa(t)}const kg=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,Gg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jl(s){return s.replace(Gg,xh).replace(kg,Vg)}function Vg(s,e,t,n){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),xh(s,e,t,n)}function xh(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Kl(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Wg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Wc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===bu?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===br&&(e="SHADOWMAP_TYPE_VSM"),e}function qg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Wr:case qr:e="ENVMAP_TYPE_CUBE";break;case Xs:case Ma:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case qr:case Ma:e="ENVMAP_MODE_REFRACTION";break}return e}function jg(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case qs:e="ENVMAP_BLENDING_MULTIPLY";break;case Wu:e="ENVMAP_BLENDING_MIX";break;case qu:e="ENVMAP_BLENDING_ADD";break}return e}function Yg(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Wg(t),c=qg(t),h=Xg(t),u=jg(t),d=t.isWebGL2?"":Og(t),f=Bg(r),g=i.createProgram();let x,_,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=[f].filter(Tr).join(`
`),x.length>0&&(x+=`
`),_=[d,f].filter(Tr).join(`
`),_.length>0&&(_+=`
`)):(x=[Kl(t),"#define SHADER_NAME "+t.shaderName,f,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define MAX_BONES "+t.maxBones,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.useVertexTexture?"#define BONE_TEXTURE":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphTargets&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargets&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tr).join(`
`),_=[d,Kl(t),"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(t.extensionShaderTextureLOD||t.envMap)&&t.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?Ne.tonemapping_pars_fragment:"",t.toneMapping!==Un?Fg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.transparent?"":"#define OPAQUE",Ne.encodings_pars_fragment,Ng("linearToOutputTexel",t.outputEncoding),t.depthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Tr).join(`
`)),o=oa(o),o=Yl(o,t),o=Zl(o,t),a=oa(a),a=Yl(a,t),a=Zl(a,t),o=Jl(o),a=Jl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,x=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,_=["#define varying in",t.glslVersion===yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const p=m+x+o,T=m+_+a,b=Xl(i,35633,p),w=Xl(i,35632,T);if(i.attachShader(g,b),i.attachShader(g,w),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g),s.debug.checkShaderErrors){const W=i.getProgramInfoLog(g).trim(),ae=i.getShaderInfoLog(b).trim(),Z=i.getShaderInfoLog(w).trim();let v=!0,R=!0;if(i.getProgramParameter(g,35714)===!1){v=!1;const D=jl(i,b,"vertex"),F=jl(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,35715)+`

Program Info Log: `+W+`
`+D+`
`+F)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(ae===""||Z==="")&&(R=!1);R&&(this.diagnostics={runnable:v,programLog:W,vertexShader:{log:ae,prefix:x},fragmentShader:{log:Z,prefix:_}})}i.deleteShader(b),i.deleteShader(w);let L;this.getUniforms=function(){return L===void 0&&(L=new Gn(i,g)),L};let C;return this.getAttributes=function(){return C===void 0&&(C=zg(i,g)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.name=t.shaderName,this.id=Pg++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=w,this}let Zg=0;class Jg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;return t.has(e)===!1&&t.set(e,new Set),t.get(e)}_getShaderStage(e){const t=this.shaderCache;if(t.has(e)===!1){const n=new Kg;t.set(e,n)}return t.get(e)}}class Kg{constructor(){this.id=Zg++,this.usedTimes=0}}function $g(s,e,t,n,i,r,o){const a=new ih,l=new Jg,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.floatVertexTextures,f=i.maxVertexUniforms,g=i.vertexTextures;let x=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){const D=v.skeleton.bones;if(d)return 1024;{const N=Math.floor((f-20)/4),O=Math.min(N,D.length);return O<D.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+D.length+" bones. This GPU supports "+O+"."),0):O}}function p(v,R,D,F,N){const O=F.fog,H=v.isMeshStandardMaterial?F.environment:null,K=(v.isMeshStandardMaterial?t:e).get(v.envMap||H),re=_[v.type],k=N.isSkinnedMesh?m(N):0;v.precision!==null&&(x=i.getMaxPrecision(v.precision),x!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",x,"instead."));let Y,se,pe,_e;if(re){const he=on[re];Y=he.vertexShader,se=he.fragmentShader}else Y=v.vertexShader,se=v.fragmentShader,l.update(v),pe=l.getVertexShaderID(v),_e=l.getFragmentShaderID(v);const U=s.getRenderTarget(),Ge=v.alphaTest>0,ge=v.clearcoat>0;return{isWebGL2:h,shaderID:re,shaderName:v.type,vertexShader:Y,fragmentShader:se,defines:v.defines,customVertexShaderID:pe,customFragmentShaderID:_e,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:x,instancing:N.isInstancedMesh===!0,instancingColor:N.isInstancedMesh===!0&&N.instanceColor!==null,supportsVertexTextures:g,outputEncoding:U===null?s.outputEncoding:U.isXRRenderTarget===!0?U.texture.encoding:Rt,map:!!v.map,matcap:!!v.matcap,envMap:!!K,envMapMode:K&&K.mapping,envMapCubeUV:!!K&&(K.mapping===Xs||K.mapping===Ma),lightMap:!!v.lightMap,aoMap:!!v.aoMap,emissiveMap:!!v.emissiveMap,bumpMap:!!v.bumpMap,normalMap:!!v.normalMap,objectSpaceNormalMap:v.normalMapType===vd,tangentSpaceNormalMap:v.normalMapType===Zn,decodeVideoTexture:!!v.map&&v.map.isVideoTexture===!0&&v.map.encoding===He,clearcoat:ge,clearcoatMap:ge&&!!v.clearcoatMap,clearcoatRoughnessMap:ge&&!!v.clearcoatRoughnessMap,clearcoatNormalMap:ge&&!!v.clearcoatNormalMap,displacementMap:!!v.displacementMap,roughnessMap:!!v.roughnessMap,metalnessMap:!!v.metalnessMap,specularMap:!!v.specularMap,specularIntensityMap:!!v.specularIntensityMap,specularColorMap:!!v.specularColorMap,transparent:v.transparent,alphaMap:!!v.alphaMap,alphaTest:Ge,gradientMap:!!v.gradientMap,sheen:v.sheen>0,sheenColorMap:!!v.sheenColorMap,sheenRoughnessMap:!!v.sheenRoughnessMap,transmission:v.transmission>0,transmissionMap:!!v.transmissionMap,thicknessMap:!!v.thicknessMap,combine:v.combine,vertexTangents:!!v.normalMap&&!!N.geometry&&!!N.geometry.attributes.tangent,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!N.geometry&&!!N.geometry.attributes.color&&N.geometry.attributes.color.itemSize===4,vertexUvs:!!v.map||!!v.bumpMap||!!v.normalMap||!!v.specularMap||!!v.alphaMap||!!v.emissiveMap||!!v.roughnessMap||!!v.metalnessMap||!!v.clearcoatMap||!!v.clearcoatRoughnessMap||!!v.clearcoatNormalMap||!!v.displacementMap||!!v.transmissionMap||!!v.thicknessMap||!!v.specularIntensityMap||!!v.specularColorMap||!!v.sheenColorMap||!!v.sheenRoughnessMap,uvsVertexOnly:!(v.map||v.bumpMap||v.normalMap||v.specularMap||v.alphaMap||v.emissiveMap||v.roughnessMap||v.metalnessMap||v.clearcoatNormalMap||v.transmission>0||v.transmissionMap||v.thicknessMap||v.specularIntensityMap||v.specularColorMap||v.sheen>0||v.sheenColorMap||v.sheenRoughnessMap)&&!!v.displacementMap,fog:!!O,useFog:v.fog,fogExp2:O&&O.isFogExp2,flatShading:!!v.flatShading,sizeAttenuation:v.sizeAttenuation,logarithmicDepthBuffer:u,skinning:N.isSkinnedMesh===!0&&k>0,maxBones:k,useVertexTexture:d,morphTargets:!!N.geometry&&!!N.geometry.morphAttributes.position,morphNormals:!!N.geometry&&!!N.geometry.morphAttributes.normal,morphTargetsCount:N.geometry&&N.geometry.morphAttributes.position?N.geometry.morphAttributes.position.length:0,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:v.toneMapped?s.toneMapping:Un,physicallyCorrectLights:s.physicallyCorrectLights,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===an,flipSided:v.side===ht,depthPacking:v.depthPacking!==void 0?v.depthPacking:!1,index0AttributeName:v.index0AttributeName,extensionDerivatives:v.extensions&&v.extensions.derivatives,extensionFragDepth:v.extensions&&v.extensions.fragDepth,extensionDrawBuffers:v.extensions&&v.extensions.drawBuffers,extensionShaderTextureLOD:v.extensions&&v.extensions.shaderTextureLOD,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:v.customProgramCacheKey()}}function T(v){const R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(const D in v.defines)R.push(D),R.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(b(R,v),w(R,v),R.push(s.outputEncoding)),R.push(v.customProgramCacheKey),R.join()}function b(v,R){v.push(R.precision),v.push(R.outputEncoding),v.push(R.envMapMode),v.push(R.combine),v.push(R.vertexUvs),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.maxBones),v.push(R.morphTargetsCount),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection)}function w(v,R){a.disableAll(),R.isWebGL2&&a.enable(0),R.supportsVertexTextures&&a.enable(1),R.instancing&&a.enable(2),R.instancingColor&&a.enable(3),R.map&&a.enable(4),R.matcap&&a.enable(5),R.envMap&&a.enable(6),R.envMapCubeUV&&a.enable(7),R.lightMap&&a.enable(8),R.aoMap&&a.enable(9),R.emissiveMap&&a.enable(10),R.bumpMap&&a.enable(11),R.normalMap&&a.enable(12),R.objectSpaceNormalMap&&a.enable(13),R.tangentSpaceNormalMap&&a.enable(14),R.clearcoat&&a.enable(15),R.clearcoatMap&&a.enable(16),R.clearcoatRoughnessMap&&a.enable(17),R.clearcoatNormalMap&&a.enable(18),R.displacementMap&&a.enable(19),R.specularMap&&a.enable(20),R.roughnessMap&&a.enable(21),R.metalnessMap&&a.enable(22),R.gradientMap&&a.enable(23),R.alphaMap&&a.enable(24),R.alphaTest&&a.enable(25),R.vertexColors&&a.enable(26),R.vertexAlphas&&a.enable(27),R.vertexUvs&&a.enable(28),R.vertexTangents&&a.enable(29),R.uvsVertexOnly&&a.enable(30),R.fog&&a.enable(31),v.push(a.mask),a.disableAll(),R.useFog&&a.enable(0),R.flatShading&&a.enable(1),R.logarithmicDepthBuffer&&a.enable(2),R.skinning&&a.enable(3),R.useVertexTexture&&a.enable(4),R.morphTargets&&a.enable(5),R.morphNormals&&a.enable(6),R.premultipliedAlpha&&a.enable(7),R.shadowMapEnabled&&a.enable(8),R.physicallyCorrectLights&&a.enable(9),R.doubleSided&&a.enable(10),R.flipSided&&a.enable(11),R.depthPacking&&a.enable(12),R.dithering&&a.enable(13),R.specularIntensityMap&&a.enable(14),R.specularColorMap&&a.enable(15),R.transmission&&a.enable(16),R.transmissionMap&&a.enable(17),R.thicknessMap&&a.enable(18),R.sheen&&a.enable(19),R.sheenColorMap&&a.enable(20),R.sheenRoughnessMap&&a.enable(21),R.decodeVideoTexture&&a.enable(22),R.transparent&&a.enable(23),v.push(a.mask)}function L(v){const R=_[v.type];let D;if(R){const F=on[R];D=Ta.clone(F.uniforms)}else D=v.uniforms;return D}function C(v,R){let D;for(let F=0,N=c.length;F<N;F++){const O=c[F];if(O.cacheKey===R){D=O,++D.usedTimes;break}}return D===void 0&&(D=new Yg(s,R,v,r),c.push(D)),D}function W(v){if(--v.usedTimes===0){const R=c.indexOf(v);c[R]=c[c.length-1],c.pop(),v.destroy()}}function ae(v){l.remove(v)}function Z(){l.dispose()}return{getParameters:p,getProgramCacheKey:T,getUniforms:L,acquireProgram:C,releaseProgram:W,releaseShaderCache:ae,programs:c,dispose:Z}}function Qg(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function ex(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function $l(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Ql(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,x,_){let m=s[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:_},s[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=x,m.group=_),e++,m}function a(u,d,f,g,x,_){const m=o(u,d,f,g,x,_);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(u,d,f,g,x,_){const m=o(u,d,f,g,x,_);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(u,d){t.length>1&&t.sort(u||ex),n.length>1&&n.sort(d||$l),i.length>1&&i.sort(d||$l)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function tx(){let s=new WeakMap;function e(n,i){let r;return s.has(n)===!1?(r=new Ql,s.set(n,[r])):i>=s.get(n).length?(r=new Ql,s.get(n).push(r)):r=s.get(n)[i],r}function t(){s=new WeakMap}return{get:e,dispose:t}}function nx(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new S,color:new ne};break;case"SpotLight":t={position:new S,direction:new S,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new S,color:new ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new S,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":t={color:new ne,position:new S,halfWidth:new S,halfHeight:new S};break}return s[e.id]=t,t}}}function ix(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let rx=0;function sx(s,e){return(e.castShadow?1:0)-(s.castShadow?1:0)}function ox(s,e){const t=new nx,n=ix(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let h=0;h<9;h++)i.probe.push(new S);const r=new S,o=new de,a=new de;function l(h,u){let d=0,f=0,g=0;for(let ae=0;ae<9;ae++)i.probe[ae].set(0,0,0);let x=0,_=0,m=0,p=0,T=0,b=0,w=0,L=0;h.sort(sx);const C=u!==!0?Math.PI:1;for(let ae=0,Z=h.length;ae<Z;ae++){const v=h[ae],R=v.color,D=v.intensity,F=v.distance,N=v.shadow&&v.shadow.map?v.shadow.map.texture:null;if(v.isAmbientLight)d+=R.r*D*C,f+=R.g*D*C,g+=R.b*D*C;else if(v.isLightProbe)for(let O=0;O<9;O++)i.probe[O].addScaledVector(v.sh.coefficients[O],D);else if(v.isDirectionalLight){const O=t.get(v);if(O.color.copy(v.color).multiplyScalar(v.intensity*C),v.castShadow){const H=v.shadow,K=n.get(v);K.shadowBias=H.bias,K.shadowNormalBias=H.normalBias,K.shadowRadius=H.radius,K.shadowMapSize=H.mapSize,i.directionalShadow[x]=K,i.directionalShadowMap[x]=N,i.directionalShadowMatrix[x]=v.shadow.matrix,b++}i.directional[x]=O,x++}else if(v.isSpotLight){const O=t.get(v);if(O.position.setFromMatrixPosition(v.matrixWorld),O.color.copy(R).multiplyScalar(D*C),O.distance=F,O.coneCos=Math.cos(v.angle),O.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),O.decay=v.decay,v.castShadow){const H=v.shadow,K=n.get(v);K.shadowBias=H.bias,K.shadowNormalBias=H.normalBias,K.shadowRadius=H.radius,K.shadowMapSize=H.mapSize,i.spotShadow[m]=K,i.spotShadowMap[m]=N,i.spotShadowMatrix[m]=v.shadow.matrix,L++}i.spot[m]=O,m++}else if(v.isRectAreaLight){const O=t.get(v);O.color.copy(R).multiplyScalar(D),O.halfWidth.set(v.width*.5,0,0),O.halfHeight.set(0,v.height*.5,0),i.rectArea[p]=O,p++}else if(v.isPointLight){const O=t.get(v);if(O.color.copy(v.color).multiplyScalar(v.intensity*C),O.distance=v.distance,O.decay=v.decay,v.castShadow){const H=v.shadow,K=n.get(v);K.shadowBias=H.bias,K.shadowNormalBias=H.normalBias,K.shadowRadius=H.radius,K.shadowMapSize=H.mapSize,K.shadowCameraNear=H.camera.near,K.shadowCameraFar=H.camera.far,i.pointShadow[_]=K,i.pointShadowMap[_]=N,i.pointShadowMatrix[_]=v.shadow.matrix,w++}i.point[_]=O,_++}else if(v.isHemisphereLight){const O=t.get(v);O.skyColor.copy(v.color).multiplyScalar(D*C),O.groundColor.copy(v.groundColor).multiplyScalar(D*C),i.hemi[T]=O,T++}}p>0&&(e.isWebGL2||s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=$.LTC_FLOAT_1,i.rectAreaLTC2=$.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=$.LTC_HALF_1,i.rectAreaLTC2=$.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;const W=i.hash;(W.directionalLength!==x||W.pointLength!==_||W.spotLength!==m||W.rectAreaLength!==p||W.hemiLength!==T||W.numDirectionalShadows!==b||W.numPointShadows!==w||W.numSpotShadows!==L)&&(i.directional.length=x,i.spot.length=m,i.rectArea.length=p,i.point.length=_,i.hemi.length=T,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=L,i.spotShadowMap.length=L,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=w,i.spotShadowMatrix.length=L,W.directionalLength=x,W.pointLength=_,W.spotLength=m,W.rectAreaLength=p,W.hemiLength=T,W.numDirectionalShadows=b,W.numPointShadows=w,W.numSpotShadows=L,i.version=rx++)}function c(h,u){let d=0,f=0,g=0,x=0,_=0;const m=u.matrixWorldInverse;for(let p=0,T=h.length;p<T;p++){const b=h[p];if(b.isDirectionalLight){const w=i.directional[d];w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),d++}else if(b.isSpotLight){const w=i.spot[g];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),g++}else if(b.isRectAreaLight){const w=i.rectArea[x];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),a.identity(),o.copy(b.matrixWorld),o.premultiply(m),a.extractRotation(o),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const w=i.point[f];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),f++}else if(b.isHemisphereLight){const w=i.hemi[_];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(m),w.direction.normalize(),_++}}}return{setup:l,setupView:c,state:i}}function ec(s,e){const t=new ox(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function ax(s,e){let t=new WeakMap;function n(r,o=0){let a;return t.has(r)===!1?(a=new ec(s,e),t.set(r,[a])):o>=t.get(r).length?(a=new ec(s,e),t.get(r).push(a)):a=t.get(r)[o],a}function i(){t=new WeakMap}return{get:n,dispose:i}}class _h extends xt{constructor(e){super(),this.type="MeshDepthMaterial",this.depthPacking=xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}_h.prototype.isMeshDepthMaterial=!0;class vh extends xt{constructor(e){super(),this.type="MeshDistanceMaterial",this.referencePosition=new S,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}vh.prototype.isMeshDistanceMaterial=!0;const lx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function yh(s,e,t){let n=new Ys;const i=new J,r=new J,o=new Re,a=new _h({depthPacking:_d}),l=new vh,c={},h=t.maxTextureSize,u={0:ht,1:qn,2:an},d=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:lx,fragmentShader:cx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ke;g.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new bt(g,d),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wc,this.render=function(b,w,L){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||b.length===0)return;const C=s.getRenderTarget(),W=s.getActiveCubeFace(),ae=s.getActiveMipmapLevel(),Z=s.state;Z.setBlending(zn),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);for(let v=0,R=b.length;v<R;v++){const D=b[v],F=D.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",D,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);const N=F.getFrameExtents();if(i.multiply(N),r.copy(F.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/N.x),i.x=r.x*N.x,F.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/N.y),i.y=r.y*N.y,F.mapSize.y=r.y)),F.map===null&&!F.isPointLightShadow&&this.type===br){const H={minFilter:yt,magFilter:yt,format:Lt};F.map=new Gt(i.x,i.y,H),F.map.texture.name=D.name+".shadowMap",F.mapPass=new Gt(i.x,i.y,H),F.camera.updateProjectionMatrix()}if(F.map===null){const H={minFilter:ft,magFilter:ft,format:Lt};F.map=new Gt(i.x,i.y,H),F.map.texture.name=D.name+".shadowMap",F.camera.updateProjectionMatrix()}s.setRenderTarget(F.map),s.clear();const O=F.getViewportCount();for(let H=0;H<O;H++){const K=F.getViewport(H);o.set(r.x*K.x,r.y*K.y,r.x*K.z,r.y*K.w),Z.viewport(o),F.updateMatrices(D,H),n=F.getFrustum(),T(w,L,F.camera,D,this.type)}!F.isPointLightShadow&&this.type===br&&m(F,L),F.needsUpdate=!1}_.needsUpdate=!1,s.setRenderTarget(C,W,ae)};function m(b,w){const L=e.update(x);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(w,null,L,d,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(w,null,L,f,x,null)}function p(b,w,L,C,W,ae,Z){let v=null;const R=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0?v=R:v=C.isPointLight===!0?l:a,s.localClippingEnabled&&L.clipShadows===!0&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0){const D=v.uuid,F=L.uuid;let N=c[D];N===void 0&&(N={},c[D]=N);let O=N[F];O===void 0&&(O=v.clone(),N[F]=O),v=O}return v.visible=L.visible,v.wireframe=L.wireframe,Z===br?v.side=L.shadowSide!==null?L.shadowSide:L.side:v.side=L.shadowSide!==null?L.shadowSide:u[L.side],v.alphaMap=L.alphaMap,v.alphaTest=L.alphaTest,v.clipShadows=L.clipShadows,v.clippingPlanes=L.clippingPlanes,v.clipIntersection=L.clipIntersection,v.displacementMap=L.displacementMap,v.displacementScale=L.displacementScale,v.displacementBias=L.displacementBias,v.wireframeLinewidth=L.wireframeLinewidth,v.linewidth=L.linewidth,C.isPointLight===!0&&v.isMeshDistanceMaterial===!0&&(v.referencePosition.setFromMatrixPosition(C.matrixWorld),v.nearDistance=W,v.farDistance=ae),v}function T(b,w,L,C,W){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&W===br)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,b.matrixWorld);const v=e.update(b),R=b.material;if(Array.isArray(R)){const D=v.groups;for(let F=0,N=D.length;F<N;F++){const O=D[F],H=R[O.materialIndex];if(H&&H.visible){const K=p(b,v,H,C,L.near,L.far,W);s.renderBufferDirect(L,null,v,K,b,O)}}}else if(R.visible){const D=p(b,v,R,C,L.near,L.far,W);s.renderBufferDirect(L,null,v,D,b,null)}}const Z=b.children;for(let v=0,R=Z.length;v<R;v++)T(Z[v],w,L,C,W)}}function hx(s,e,t){const n=t.isWebGL2;function i(){let A=!1;const fe=new Re;let ce=null;const we=new Re(0,0,0,0);return{setMask:function(X){ce!==X&&!A&&(s.colorMask(X,X,X,X),ce=X)},setLocked:function(X){A=X},setClear:function(X,ye,Fe,rt,Ot){Ot===!0&&(X*=rt,ye*=rt,Fe*=rt),fe.set(X,ye,Fe,rt),we.equals(fe)===!1&&(s.clearColor(X,ye,Fe,rt),we.copy(fe))},reset:function(){A=!1,ce=null,we.set(-1,0,0,0)}}}function r(){let A=!1,fe=null,ce=null,we=null;return{setTest:function(X){X?U(2929):Ge(2929)},setMask:function(X){fe!==X&&!A&&(s.depthMask(X),fe=X)},setFunc:function(X){if(ce!==X){if(X)switch(X){case Bu:s.depthFunc(512);break;case zu:s.depthFunc(519);break;case Uu:s.depthFunc(513);break;case Qo:s.depthFunc(515);break;case Hu:s.depthFunc(514);break;case ku:s.depthFunc(518);break;case Gu:s.depthFunc(516);break;case Vu:s.depthFunc(517);break;default:s.depthFunc(515)}else s.depthFunc(515);ce=X}},setLocked:function(X){A=X},setClear:function(X){we!==X&&(s.clearDepth(X),we=X)},reset:function(){A=!1,fe=null,ce=null,we=null}}}function o(){let A=!1,fe=null,ce=null,we=null,X=null,ye=null,Fe=null,rt=null,Ot=null;return{setTest:function(ot){A||(ot?U(2960):Ge(2960))},setMask:function(ot){fe!==ot&&!A&&(s.stencilMask(ot),fe=ot)},setFunc:function(ot,$t,hn){(ce!==ot||we!==$t||X!==hn)&&(s.stencilFunc(ot,$t,hn),ce=ot,we=$t,X=hn)},setOp:function(ot,$t,hn){(ye!==ot||Fe!==$t||rt!==hn)&&(s.stencilOp(ot,$t,hn),ye=ot,Fe=$t,rt=hn)},setLocked:function(ot){A=ot},setClear:function(ot){Ot!==ot&&(s.clearStencil(ot),Ot=ot)},reset:function(){A=!1,fe=null,ce=null,we=null,X=null,ye=null,Fe=null,rt=null,Ot=null}}}const a=new i,l=new r,c=new o;let h={},u={},d=new WeakMap,f=[],g=null,x=!1,_=null,m=null,p=null,T=null,b=null,w=null,L=null,C=!1,W=null,ae=null,Z=null,v=null,R=null;const D=s.getParameter(35661);let F=!1,N=0;const O=s.getParameter(7938);O.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(O)[1]),F=N>=1):O.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),F=N>=2);let H=null,K={};const re=s.getParameter(3088),k=s.getParameter(2978),Y=new Re().fromArray(re),se=new Re().fromArray(k);function pe(A,fe,ce){const we=new Uint8Array(4),X=s.createTexture();s.bindTexture(A,X),s.texParameteri(A,10241,9728),s.texParameteri(A,10240,9728);for(let ye=0;ye<ce;ye++)s.texImage2D(fe+ye,0,6408,1,1,0,6408,5121,we);return X}const _e={};_e[3553]=pe(3553,3553,1),_e[34067]=pe(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),U(2929),l.setFunc(Qo),Q(!1),ue(ja),U(2884),q(zn);function U(A){h[A]!==!0&&(s.enable(A),h[A]=!0)}function Ge(A){h[A]!==!1&&(s.disable(A),h[A]=!1)}function ge(A,fe){return u[A]!==fe?(s.bindFramebuffer(A,fe),u[A]=fe,n&&(A===36009&&(u[36160]=fe),A===36160&&(u[36009]=fe)),!0):!1}function Se(A,fe){let ce=f,we=!1;if(A)if(ce=d.get(fe),ce===void 0&&(ce=[],d.set(fe,ce)),A.isWebGLMultipleRenderTargets){const X=A.texture;if(ce.length!==X.length||ce[0]!==36064){for(let ye=0,Fe=X.length;ye<Fe;ye++)ce[ye]=36064+ye;ce.length=X.length,we=!0}}else ce[0]!==36064&&(ce[0]=36064,we=!0);else ce[0]!==1029&&(ce[0]=1029,we=!0);we&&(t.isWebGL2?s.drawBuffers(ce):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ce))}function he(A){return g!==A?(s.useProgram(A),g=A,!0):!1}const Pe={[Bi]:32774,[Eu]:32778,[Au]:32779};if(n)Pe[Ka]=32775,Pe[$a]=32776;else{const A=e.get("EXT_blend_minmax");A!==null&&(Pe[Ka]=A.MIN_EXT,Pe[$a]=A.MAX_EXT)}const be={[Lu]:0,[Ru]:1,[Cu]:768,[Xc]:770,[Ou]:776,[Nu]:774,[Du]:772,[Pu]:769,[jc]:771,[Fu]:775,[Iu]:773};function q(A,fe,ce,we,X,ye,Fe,rt){if(A===zn){x===!0&&(Ge(3042),x=!1);return}if(x===!1&&(U(3042),x=!0),A!==Tu){if(A!==_||rt!==C){if((m!==Bi||b!==Bi)&&(s.blendEquation(32774),m=Bi,b=Bi),rt)switch(A){case Er:s.blendFuncSeparate(1,771,1,771);break;case Ya:s.blendFunc(1,1);break;case Za:s.blendFuncSeparate(0,769,0,1);break;case Ja:s.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}else switch(A){case Er:s.blendFuncSeparate(770,771,1,771);break;case Ya:s.blendFunc(770,1);break;case Za:s.blendFuncSeparate(0,769,0,1);break;case Ja:s.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}p=null,T=null,w=null,L=null,_=A,C=rt}return}X=X||fe,ye=ye||ce,Fe=Fe||we,(fe!==m||X!==b)&&(s.blendEquationSeparate(Pe[fe],Pe[X]),m=fe,b=X),(ce!==p||we!==T||ye!==w||Fe!==L)&&(s.blendFuncSeparate(be[ce],be[we],be[ye],be[Fe]),p=ce,T=we,w=ye,L=Fe),_=A,C=null}function te(A,fe){A.side===an?Ge(2884):U(2884);let ce=A.side===ht;fe&&(ce=!ce),Q(ce),A.blending===Er&&A.transparent===!1?q(zn):q(A.blending,A.blendEquation,A.blendSrc,A.blendDst,A.blendEquationAlpha,A.blendSrcAlpha,A.blendDstAlpha,A.premultipliedAlpha),l.setFunc(A.depthFunc),l.setTest(A.depthTest),l.setMask(A.depthWrite),a.setMask(A.colorWrite);const we=A.stencilWrite;c.setTest(we),we&&(c.setMask(A.stencilWriteMask),c.setFunc(A.stencilFunc,A.stencilRef,A.stencilFuncMask),c.setOp(A.stencilFail,A.stencilZFail,A.stencilZPass)),Me(A.polygonOffset,A.polygonOffsetFactor,A.polygonOffsetUnits),A.alphaToCoverage===!0?U(32926):Ge(32926)}function Q(A){W!==A&&(A?s.frontFace(2304):s.frontFace(2305),W=A)}function ue(A){A!==wu?(U(2884),A!==ae&&(A===ja?s.cullFace(1029):A===Su?s.cullFace(1028):s.cullFace(1032))):Ge(2884),ae=A}function le(A){A!==Z&&(F&&s.lineWidth(A),Z=A)}function Me(A,fe,ce){A?(U(32823),(v!==fe||R!==ce)&&(s.polygonOffset(fe,ce),v=fe,R=ce)):Ge(32823)}function Te(A){A?U(3089):Ge(3089)}function Be(A){A===void 0&&(A=33984+D-1),H!==A&&(s.activeTexture(A),H=A)}function Ze(A,fe){H===null&&Be();let ce=K[H];ce===void 0&&(ce={type:void 0,texture:void 0},K[H]=ce),(ce.type!==A||ce.texture!==fe)&&(s.bindTexture(A,fe||_e[A]),ce.type=A,ce.texture=fe)}function Ye(){const A=K[H];A!==void 0&&A.type!==void 0&&(s.bindTexture(A.type,null),A.type=void 0,A.texture=void 0)}function E(){try{s.compressedTexImage2D.apply(s,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function y(){try{s.texSubImage2D.apply(s,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function V(){try{s.texSubImage3D.apply(s,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ee(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function me(){try{s.texStorage2D.apply(s,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function G(){try{s.texStorage3D.apply(s,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ve(){try{s.texImage2D.apply(s,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function xe(){try{s.texImage3D.apply(s,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function oe(A){Y.equals(A)===!1&&(s.scissor(A.x,A.y,A.z,A.w),Y.copy(A))}function ie(A){se.equals(A)===!1&&(s.viewport(A.x,A.y,A.z,A.w),se.copy(A))}function Ae(){s.disable(3042),s.disable(2884),s.disable(2929),s.disable(32823),s.disable(3089),s.disable(2960),s.disable(32926),s.blendEquation(32774),s.blendFunc(1,0),s.blendFuncSeparate(1,0,1,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(513),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(519,0,4294967295),s.stencilOp(7680,7680,7680),s.clearStencil(0),s.cullFace(1029),s.frontFace(2305),s.polygonOffset(0,0),s.activeTexture(33984),s.bindFramebuffer(36160,null),n===!0&&(s.bindFramebuffer(36009,null),s.bindFramebuffer(36008,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},H=null,K={},u={},d=new WeakMap,f=[],g=null,x=!1,_=null,m=null,p=null,T=null,b=null,w=null,L=null,C=!1,W=null,ae=null,Z=null,v=null,R=null,Y.set(0,0,s.canvas.width,s.canvas.height),se.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:U,disable:Ge,bindFramebuffer:ge,drawBuffers:Se,useProgram:he,setBlending:q,setMaterial:te,setFlipSided:Q,setCullFace:ue,setLineWidth:le,setPolygonOffset:Me,setScissorTest:Te,activeTexture:Be,bindTexture:Ze,unbindTexture:Ye,compressedTexImage2D:E,texImage2D:ve,texImage3D:xe,texStorage2D:me,texStorage3D:G,texSubImage2D:y,texSubImage3D:V,compressedTexSubImage2D:ee,scissor:oe,viewport:ie,reset:Ae}}function ux(s,e,t,n,i,r,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,u=i.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):void 0,g=new WeakMap;let x,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,y){return _?new OffscreenCanvas(E,y):Br("canvas")}function p(E,y,V,ee){let me=1;if((E.width>ee||E.height>ee)&&(me=ee/Math.max(E.width,E.height)),me<1||y===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const G=y?Qc:Math.floor,ve=G(me*E.width),xe=G(me*E.height);x===void 0&&(x=m(ve,xe));const oe=V?m(ve,xe):x;return oe.width=ve,oe.height=xe,oe.getContext("2d").drawImage(E,0,0,ve,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+ve+"x"+xe+")."),oe}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function T(E){return sa(E.width)&&sa(E.height)}function b(E){return a?!1:E.wrapS!==Nt||E.wrapT!==Nt||E.minFilter!==ft&&E.minFilter!==yt}function w(E,y){return E.generateMipmaps&&y&&E.minFilter!==ft&&E.minFilter!==yt}function L(E){s.generateMipmap(E)}function C(E,y,V,ee,me=!1){if(a===!1)return y;if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let G=y;return y===6403&&(V===5126&&(G=33326),V===5131&&(G=33325),V===5121&&(G=33321)),y===33319&&(V===5126&&(G=33328),V===5131&&(G=33327),V===5121&&(G=33323)),y===6408&&(V===5126&&(G=34836),V===5131&&(G=34842),V===5121&&(G=ee===He&&me===!1?35907:32856),V===32819&&(G=32854),V===32820&&(G=32855)),(G===33325||G===33326||G===33327||G===33328||G===34842||G===34836)&&e.get("EXT_color_buffer_float"),G}function W(E,y,V){return w(E,V)===!0||E.isFramebufferTexture&&E.minFilter!==ft&&E.minFilter!==yt?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function ae(E){return E===ft||E===na||E===ia?9728:9729}function Z(E){const y=E.target;y.removeEventListener("dispose",Z),R(y),y.isVideoTexture&&g.delete(y),o.memory.textures--}function v(E){const y=E.target;y.removeEventListener("dispose",v),D(y)}function R(E){const y=n.get(E);y.__webglInit!==void 0&&(s.deleteTexture(y.__webglTexture),n.remove(E))}function D(E){const y=E.texture,V=n.get(E),ee=n.get(y);if(E){if(ee.__webglTexture!==void 0&&(s.deleteTexture(ee.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let me=0;me<6;me++)s.deleteFramebuffer(V.__webglFramebuffer[me]),V.__webglDepthbuffer&&s.deleteRenderbuffer(V.__webglDepthbuffer[me]);else s.deleteFramebuffer(V.__webglFramebuffer),V.__webglDepthbuffer&&s.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&s.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer&&s.deleteRenderbuffer(V.__webglColorRenderbuffer),V.__webglDepthRenderbuffer&&s.deleteRenderbuffer(V.__webglDepthRenderbuffer);if(E.isWebGLMultipleRenderTargets)for(let me=0,G=y.length;me<G;me++){const ve=n.get(y[me]);ve.__webglTexture&&(s.deleteTexture(ve.__webglTexture),o.memory.textures--),n.remove(y[me])}n.remove(y),n.remove(E)}}let F=0;function N(){F=0}function O(){const E=F;return E>=l&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+l),F+=1,E}function H(E,y){const V=n.get(E);if(E.isVideoTexture&&le(E),E.version>0&&V.__version!==E.version){const ee=E.image;if(ee===void 0)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{U(V,E,y);return}}t.activeTexture(33984+y),t.bindTexture(3553,V.__webglTexture)}function K(E,y){const V=n.get(E);if(E.version>0&&V.__version!==E.version){U(V,E,y);return}t.activeTexture(33984+y),t.bindTexture(35866,V.__webglTexture)}function re(E,y){const V=n.get(E);if(E.version>0&&V.__version!==E.version){U(V,E,y);return}t.activeTexture(33984+y),t.bindTexture(32879,V.__webglTexture)}function k(E,y){const V=n.get(E);if(E.version>0&&V.__version!==E.version){Ge(V,E,y);return}t.activeTexture(33984+y),t.bindTexture(34067,V.__webglTexture)}const Y={[Zi]:10497,[Nt]:33071,[Bs]:33648},se={[ft]:9728,[na]:9984,[ia]:9986,[yt]:9729,[Zc]:9985,[tr]:9987};function pe(E,y,V){if(V?(s.texParameteri(E,10242,Y[y.wrapS]),s.texParameteri(E,10243,Y[y.wrapT]),(E===32879||E===35866)&&s.texParameteri(E,32882,Y[y.wrapR]),s.texParameteri(E,10240,se[y.magFilter]),s.texParameteri(E,10241,se[y.minFilter])):(s.texParameteri(E,10242,33071),s.texParameteri(E,10243,33071),(E===32879||E===35866)&&s.texParameteri(E,32882,33071),(y.wrapS!==Nt||y.wrapT!==Nt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(E,10240,ae(y.magFilter)),s.texParameteri(E,10241,ae(y.minFilter)),y.minFilter!==ft&&y.minFilter!==yt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const ee=e.get("EXT_texture_filter_anisotropic");if(y.type===Fn&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===Wi&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(s.texParameterf(E,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function _e(E,y){E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",Z),E.__webglTexture=s.createTexture(),o.memory.textures++)}function U(E,y,V){let ee=3553;y.isDataTexture2DArray&&(ee=35866),y.isDataTexture3D&&(ee=32879),_e(E,y),t.activeTexture(33984+V),t.bindTexture(ee,E.__webglTexture),s.pixelStorei(37440,y.flipY),s.pixelStorei(37441,y.premultiplyAlpha),s.pixelStorei(3317,y.unpackAlignment),s.pixelStorei(37443,0);const me=b(y)&&T(y.image)===!1;let G=p(y.image,me,!1,h);G=Me(y,G);const ve=T(G)||a,xe=r.convert(y.format,y.encoding);let oe=r.convert(y.type),ie=C(y.internalFormat,xe,oe,y.encoding,y.isVideoTexture);pe(ee,y,ve);let Ae;const A=y.mipmaps,fe=a&&y.isVideoTexture!==!0,ce=E.__version===void 0,we=W(y,G,ve);if(y.isDepthTexture)ie=6402,a?y.type===Fn?ie=36012:y.type===Fs?ie=33190:y.type===qi?ie=35056:ie=33189:y.type===Fn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===si&&ie===6402&&y.type!==Ir&&y.type!==Fs&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Ir,oe=r.convert(y.type)),y.format===Ji&&ie===6402&&(ie=34041,y.type!==qi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=qi,oe=r.convert(y.type))),fe&&ce?t.texStorage2D(3553,1,ie,G.width,G.height):t.texImage2D(3553,0,ie,G.width,G.height,0,xe,oe,null);else if(y.isDataTexture)if(A.length>0&&ve){fe&&ce&&t.texStorage2D(3553,we,ie,A[0].width,A[0].height);for(let X=0,ye=A.length;X<ye;X++)Ae=A[X],fe?t.texSubImage2D(3553,0,0,0,Ae.width,Ae.height,xe,oe,Ae.data):t.texImage2D(3553,X,ie,Ae.width,Ae.height,0,xe,oe,Ae.data);y.generateMipmaps=!1}else fe?(ce&&t.texStorage2D(3553,we,ie,G.width,G.height),t.texSubImage2D(3553,0,0,0,G.width,G.height,xe,oe,G.data)):t.texImage2D(3553,0,ie,G.width,G.height,0,xe,oe,G.data);else if(y.isCompressedTexture){fe&&ce&&t.texStorage2D(3553,we,ie,A[0].width,A[0].height);for(let X=0,ye=A.length;X<ye;X++)Ae=A[X],y.format!==Lt?xe!==null?fe?t.compressedTexSubImage2D(3553,X,0,0,Ae.width,Ae.height,xe,Ae.data):t.compressedTexImage2D(3553,X,ie,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?t.texSubImage2D(3553,X,0,0,Ae.width,Ae.height,xe,oe,Ae.data):t.texImage2D(3553,X,ie,Ae.width,Ae.height,0,xe,oe,Ae.data)}else if(y.isDataTexture2DArray)fe?(ce&&t.texStorage3D(35866,we,ie,G.width,G.height,G.depth),t.texSubImage3D(35866,0,0,0,0,G.width,G.height,G.depth,xe,oe,G.data)):t.texImage3D(35866,0,ie,G.width,G.height,G.depth,0,xe,oe,G.data);else if(y.isDataTexture3D)fe?(ce&&t.texStorage3D(32879,we,ie,G.width,G.height,G.depth),t.texSubImage3D(32879,0,0,0,0,G.width,G.height,G.depth,xe,oe,G.data)):t.texImage3D(32879,0,ie,G.width,G.height,G.depth,0,xe,oe,G.data);else if(y.isFramebufferTexture)fe&&ce?t.texStorage2D(3553,we,ie,G.width,G.height):t.texImage2D(3553,0,ie,G.width,G.height,0,xe,oe,null);else if(A.length>0&&ve){fe&&ce&&t.texStorage2D(3553,we,ie,A[0].width,A[0].height);for(let X=0,ye=A.length;X<ye;X++)Ae=A[X],fe?t.texSubImage2D(3553,X,0,0,xe,oe,Ae):t.texImage2D(3553,X,ie,xe,oe,Ae);y.generateMipmaps=!1}else fe?(ce&&t.texStorage2D(3553,we,ie,G.width,G.height),t.texSubImage2D(3553,0,0,0,xe,oe,G)):t.texImage2D(3553,0,ie,xe,oe,G);w(y,ve)&&L(ee),E.__version=y.version,y.onUpdate&&y.onUpdate(y)}function Ge(E,y,V){if(y.image.length!==6)return;_e(E,y),t.activeTexture(33984+V),t.bindTexture(34067,E.__webglTexture),s.pixelStorei(37440,y.flipY),s.pixelStorei(37441,y.premultiplyAlpha),s.pixelStorei(3317,y.unpackAlignment),s.pixelStorei(37443,0);const ee=y&&(y.isCompressedTexture||y.image[0].isCompressedTexture),me=y.image[0]&&y.image[0].isDataTexture,G=[];for(let X=0;X<6;X++)!ee&&!me?G[X]=p(y.image[X],!1,!0,c):G[X]=me?y.image[X].image:y.image[X],G[X]=Me(y,G[X]);const ve=G[0],xe=T(ve)||a,oe=r.convert(y.format,y.encoding),ie=r.convert(y.type),Ae=C(y.internalFormat,oe,ie,y.encoding),A=a&&y.isVideoTexture!==!0,fe=E.__version===void 0;let ce=W(y,ve,xe);pe(34067,y,xe);let we;if(ee){A&&fe&&t.texStorage2D(34067,ce,Ae,ve.width,ve.height);for(let X=0;X<6;X++){we=G[X].mipmaps;for(let ye=0;ye<we.length;ye++){const Fe=we[ye];y.format!==Lt?oe!==null?A?t.compressedTexSubImage2D(34069+X,ye,0,0,Fe.width,Fe.height,oe,Fe.data):t.compressedTexImage2D(34069+X,ye,Ae,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):A?t.texSubImage2D(34069+X,ye,0,0,Fe.width,Fe.height,oe,ie,Fe.data):t.texImage2D(34069+X,ye,Ae,Fe.width,Fe.height,0,oe,ie,Fe.data)}}}else{we=y.mipmaps,A&&fe&&(we.length>0&&ce++,t.texStorage2D(34067,ce,Ae,G[0].width,G[0].height));for(let X=0;X<6;X++)if(me){A?t.texSubImage2D(34069+X,0,0,0,G[X].width,G[X].height,oe,ie,G[X].data):t.texImage2D(34069+X,0,Ae,G[X].width,G[X].height,0,oe,ie,G[X].data);for(let ye=0;ye<we.length;ye++){const rt=we[ye].image[X].image;A?t.texSubImage2D(34069+X,ye+1,0,0,rt.width,rt.height,oe,ie,rt.data):t.texImage2D(34069+X,ye+1,Ae,rt.width,rt.height,0,oe,ie,rt.data)}}else{A?t.texSubImage2D(34069+X,0,0,0,oe,ie,G[X]):t.texImage2D(34069+X,0,Ae,oe,ie,G[X]);for(let ye=0;ye<we.length;ye++){const Fe=we[ye];A?t.texSubImage2D(34069+X,ye+1,0,0,oe,ie,Fe.image[X]):t.texImage2D(34069+X,ye+1,Ae,oe,ie,Fe.image[X])}}}w(y,xe)&&L(34067),E.__version=y.version,y.onUpdate&&y.onUpdate(y)}function ge(E,y,V,ee,me){const G=r.convert(V.format,V.encoding),ve=r.convert(V.type),xe=C(V.internalFormat,G,ve,V.encoding);n.get(y).__hasExternalTextures||(me===32879||me===35866?t.texImage3D(me,0,xe,y.width,y.height,y.depth,0,G,ve,null):t.texImage2D(me,0,xe,y.width,y.height,0,G,ve,null)),t.bindFramebuffer(36160,E),y.useRenderToTexture?f.framebufferTexture2DMultisampleEXT(36160,ee,me,n.get(V).__webglTexture,0,ue(y)):s.framebufferTexture2D(36160,ee,me,n.get(V).__webglTexture,0),t.bindFramebuffer(36160,null)}function Se(E,y,V){if(s.bindRenderbuffer(36161,E),y.depthBuffer&&!y.stencilBuffer){let ee=33189;if(V||y.useRenderToTexture){const me=y.depthTexture;me&&me.isDepthTexture&&(me.type===Fn?ee=36012:me.type===Fs&&(ee=33190));const G=ue(y);y.useRenderToTexture?f.renderbufferStorageMultisampleEXT(36161,G,ee,y.width,y.height):s.renderbufferStorageMultisample(36161,G,ee,y.width,y.height)}else s.renderbufferStorage(36161,ee,y.width,y.height);s.framebufferRenderbuffer(36160,36096,36161,E)}else if(y.depthBuffer&&y.stencilBuffer){const ee=ue(y);V&&y.useRenderbuffer?s.renderbufferStorageMultisample(36161,ee,35056,y.width,y.height):y.useRenderToTexture?f.renderbufferStorageMultisampleEXT(36161,ee,35056,y.width,y.height):s.renderbufferStorage(36161,34041,y.width,y.height),s.framebufferRenderbuffer(36160,33306,36161,E)}else{const ee=y.isWebGLMultipleRenderTargets===!0?y.texture[0]:y.texture,me=r.convert(ee.format,ee.encoding),G=r.convert(ee.type),ve=C(ee.internalFormat,me,G,ee.encoding),xe=ue(y);V&&y.useRenderbuffer?s.renderbufferStorageMultisample(36161,xe,ve,y.width,y.height):y.useRenderToTexture?f.renderbufferStorageMultisampleEXT(36161,xe,ve,y.width,y.height):s.renderbufferStorage(36161,ve,y.width,y.height)}s.bindRenderbuffer(36161,null)}function he(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),H(y.depthTexture,0);const ee=n.get(y.depthTexture).__webglTexture,me=ue(y);if(y.depthTexture.format===si)y.useRenderToTexture?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,ee,0,me):s.framebufferTexture2D(36160,36096,3553,ee,0);else if(y.depthTexture.format===Ji)y.useRenderToTexture?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,ee,0,me):s.framebufferTexture2D(36160,33306,3553,ee,0);else throw new Error("Unknown depthTexture format")}function Pe(E){const y=n.get(E),V=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");he(y.__webglFramebuffer,E)}else if(V){y.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)t.bindFramebuffer(36160,y.__webglFramebuffer[ee]),y.__webglDepthbuffer[ee]=s.createRenderbuffer(),Se(y.__webglDepthbuffer[ee],E,!1)}else t.bindFramebuffer(36160,y.__webglFramebuffer),y.__webglDepthbuffer=s.createRenderbuffer(),Se(y.__webglDepthbuffer,E,!1);t.bindFramebuffer(36160,null)}function be(E,y,V){const ee=n.get(E);y!==void 0&&ge(ee.__webglFramebuffer,E,E.texture,36064,3553),V!==void 0&&Pe(E)}function q(E){const y=E.texture,V=n.get(E),ee=n.get(y);E.addEventListener("dispose",v),E.isWebGLMultipleRenderTargets!==!0&&(ee.__webglTexture===void 0&&(ee.__webglTexture=s.createTexture()),ee.__version=y.version,o.memory.textures++);const me=E.isWebGLCubeRenderTarget===!0,G=E.isWebGLMultipleRenderTargets===!0,ve=y.isDataTexture3D||y.isDataTexture2DArray,xe=T(E)||a;if(me){V.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)V.__webglFramebuffer[oe]=s.createFramebuffer()}else if(V.__webglFramebuffer=s.createFramebuffer(),G)if(i.drawBuffers){const oe=E.texture;for(let ie=0,Ae=oe.length;ie<Ae;ie++){const A=n.get(oe[ie]);A.__webglTexture===void 0&&(A.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");else if(E.useRenderbuffer)if(a){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=s.createRenderbuffer(),s.bindRenderbuffer(36161,V.__webglColorRenderbuffer);const oe=r.convert(y.format,y.encoding),ie=r.convert(y.type),Ae=C(y.internalFormat,oe,ie,y.encoding),A=ue(E);s.renderbufferStorageMultisample(36161,A,Ae,E.width,E.height),t.bindFramebuffer(36160,V.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064,36161,V.__webglColorRenderbuffer),s.bindRenderbuffer(36161,null),E.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),Se(V.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(36160,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(me){t.bindTexture(34067,ee.__webglTexture),pe(34067,y,xe);for(let oe=0;oe<6;oe++)ge(V.__webglFramebuffer[oe],E,y,36064,34069+oe);w(y,xe)&&L(34067),t.unbindTexture()}else if(G){const oe=E.texture;for(let ie=0,Ae=oe.length;ie<Ae;ie++){const A=oe[ie],fe=n.get(A);t.bindTexture(3553,fe.__webglTexture),pe(3553,A,xe),ge(V.__webglFramebuffer,E,A,36064+ie,3553),w(A,xe)&&L(3553)}t.unbindTexture()}else{let oe=3553;ve&&(a?oe=y.isDataTexture3D?32879:35866:console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.")),t.bindTexture(oe,ee.__webglTexture),pe(oe,y,xe),ge(V.__webglFramebuffer,E,y,36064,oe),w(y,xe)&&L(oe),t.unbindTexture()}E.depthBuffer&&Pe(E)}function te(E){const y=T(E)||a,V=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ee=0,me=V.length;ee<me;ee++){const G=V[ee];if(w(G,y)){const ve=E.isWebGLCubeRenderTarget?34067:3553,xe=n.get(G).__webglTexture;t.bindTexture(ve,xe),L(ve),t.unbindTexture()}}}function Q(E){if(E.useRenderbuffer)if(a){const y=E.width,V=E.height;let ee=16384;const me=[36064],G=E.stencilBuffer?33306:36096;E.depthBuffer&&me.push(G),E.ignoreDepthForMultisampleCopy||(E.depthBuffer&&(ee|=256),E.stencilBuffer&&(ee|=1024));const ve=n.get(E);t.bindFramebuffer(36008,ve.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,ve.__webglFramebuffer),E.ignoreDepthForMultisampleCopy&&(s.invalidateFramebuffer(36008,[G]),s.invalidateFramebuffer(36009,[G])),s.blitFramebuffer(0,0,y,V,0,0,y,V,ee,9728),s.invalidateFramebuffer(36008,me),t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,ve.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}function ue(E){return a&&(E.useRenderbuffer||E.useRenderToTexture)?Math.min(u,E.samples):0}function le(E){const y=o.render.frame;g.get(E)!==y&&(g.set(E,y),E.update())}function Me(E,y){const V=E.encoding,ee=E.format,me=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===ra||V!==Rt&&(V===He?a===!1?e.has("EXT_sRGB")===!0&&ee===Lt?(E.format=ra,E.minFilter=yt,E.generateMipmaps=!1):y=hi.sRGBToLinear(y):(ee!==Lt||me!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",V)),y}let Te=!1,Be=!1;function Ze(E,y){E&&E.isWebGLRenderTarget&&(Te===!1&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),Te=!0),E=E.texture),H(E,y)}function Ye(E,y){E&&E.isWebGLCubeRenderTarget&&(Be===!1&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),Be=!0),E=E.texture),k(E,y)}this.allocateTextureUnit=O,this.resetTextureUnits=N,this.setTexture2D=H,this.setTexture2DArray=K,this.setTexture3D=re,this.setTextureCube=k,this.rebindTextures=be,this.setupRenderTarget=q,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=ge,this.safeSetTexture2D=Ze,this.safeSetTextureCube=Ye}function dx(s,e,t){const n=t.isWebGL2;function i(r,o=null){let a;if(r===Hn)return 5121;if(r===ed)return 32819;if(r===td)return 32820;if(r===Ku)return 5120;if(r===$u)return 5122;if(r===Ir)return 5123;if(r===Qu)return 5124;if(r===Fs)return 5125;if(r===Fn)return 5126;if(r===Wi)return n?5131:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===nd)return 6406;if(r===Lt)return 6408;if(r===rd)return 6409;if(r===sd)return 6410;if(r===si)return 6402;if(r===Ji)return 34041;if(r===od)return 6403;if(r===id)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(r===ra)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===ad)return 36244;if(r===ld)return 33319;if(r===cd)return 33320;if(r===hd)return 36249;if(r===lo||r===co||r===ho||r===uo)if(o===He)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===lo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===co)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===ho)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===uo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===lo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===co)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===ho)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===uo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Qa||r===el||r===tl||r===nl)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Qa)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===el)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===tl)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===nl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ud)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===il||r===rl)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===il)return o===He?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===rl)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===sl||r===ol||r===al||r===ll||r===cl||r===hl||r===ul||r===dl||r===fl||r===pl||r===ml||r===gl||r===xl||r===_l)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===sl)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ol)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===al)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ll)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===cl)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===hl)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ul)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===dl)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===fl)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===pl)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ml)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===gl)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===xl)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===_l)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===vl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===vl)return o===He?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(r===qi)return n?34042:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null)}return{convert:i}}class Mh extends At{constructor(e=[]){super(),this.cameras=e}}Mh.prototype.isArrayCamera=!0;class On extends We{constructor(){super(),this.type="Group"}}On.prototype.isGroup=!0;const fx={type:"move"};class Uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new On,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new On,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new On,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred")if(a!==null&&(i=t.getPose(e.targetRaySpace,n),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(fx))),c&&e.hand){o=!0;for(const x of e.hand.values()){const _=t.getJointPose(x,n);if(c.joints[x.jointName]===void 0){const p=new On;p.matrixAutoUpdate=!1,p.visible=!1,c.joints[x.jointName]=p,c.add(p)}const m=c.joints[x.jointName];_!==null&&(m.matrix.fromArray(_.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.jointRadius=_.radius),m.visible=_!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}}class aa extends pt{constructor(e,t,n,i,r,o,a,l,c,h){if(h=h!==void 0?h:si,h!==si&&h!==Ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===si&&(n=Ir),n===void 0&&h===Ji&&(n=qi),super(null,i,r,o,a,l,h,n,c),this.image={width:e,height:t},this.magFilter=a!==void 0?a:ft,this.minFilter=l!==void 0?l:ft,this.flipY=!1,this.generateMipmaps=!1}}aa.prototype.isDepthTexture=!0;class px extends ci{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor";const l=e.extensions.has("WEBGL_multisampled_render_to_texture");let c=null,h=null,u=null,d=null,f=!1,g=null;const x=t.getContextAttributes();let _=null,m=null;const p=[],T=new Map,b=new At;b.layers.enable(1),b.viewport=new Re;const w=new At;w.layers.enable(2),w.viewport=new Re;const L=[b,w],C=new Mh;C.layers.enable(1),C.layers.enable(2);let W=null,ae=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let Y=p[k];return Y===void 0&&(Y=new Uo,p[k]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(k){let Y=p[k];return Y===void 0&&(Y=new Uo,p[k]=Y),Y.getGripSpace()},this.getHand=function(k){let Y=p[k];return Y===void 0&&(Y=new Uo,p[k]=Y),Y.getHandSpace()};function Z(k){const Y=T.get(k.inputSource);Y&&Y.dispatchEvent({type:k.type,data:k.inputSource})}function v(){T.forEach(function(k,Y){k.disconnect(Y)}),T.clear(),W=null,ae=null,e.setRenderTarget(_),d=null,u=null,h=null,i=null,m=null,re.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(k){if(i=k,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",Z),i.addEventListener("selectstart",Z),i.addEventListener("selectend",Z),i.addEventListener("squeeze",Z),i.addEventListener("squeezestart",Z),i.addEventListener("squeezeend",Z),i.addEventListener("end",v),i.addEventListener("inputsourceschange",R),x.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Y={antialias:i.renderState.layers===void 0?x.antialias:!0,alpha:x.alpha,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,Y),i.updateRenderState({baseLayer:d}),m=new Gt(d.framebufferWidth,d.framebufferHeight,{format:Lt,type:Hn,encoding:e.outputEncoding})}else{f=x.antialias;let Y=null,se=null,pe=null;x.depth&&(pe=x.stencil?35056:33190,Y=x.stencil?Ji:si,se=x.stencil?qi:Ir);const _e={colorFormat:e.outputEncoding===He?35907:32856,depthFormat:pe,scaleFactor:r};h=new XRWebGLBinding(i,t),u=h.createProjectionLayer(_e),i.updateRenderState({layers:[u]}),f?m=new ba(u.textureWidth,u.textureHeight,{format:Lt,type:Hn,depthTexture:new aa(u.textureWidth,u.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:x.stencil,ignoreDepth:u.ignoreDepthValues,useRenderToTexture:l,encoding:e.outputEncoding}):m=new Gt(u.textureWidth,u.textureHeight,{format:Lt,type:Hn,depthTexture:new aa(u.textureWidth,u.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:x.stencil,ignoreDepth:u.ignoreDepthValues,encoding:e.outputEncoding})}m.isXRRenderTarget=!0,this.setFoveation(1),o=await i.requestReferenceSpace(a),re.setContext(i),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function R(k){const Y=i.inputSources;for(let se=0;se<p.length;se++)T.set(Y[se],p[se]);for(let se=0;se<k.removed.length;se++){const pe=k.removed[se],_e=T.get(pe);_e&&(_e.dispatchEvent({type:"disconnected",data:pe}),T.delete(pe))}for(let se=0;se<k.added.length;se++){const pe=k.added[se],_e=T.get(pe);_e&&_e.dispatchEvent({type:"connected",data:pe})}}const D=new S,F=new S;function N(k,Y,se){D.setFromMatrixPosition(Y.matrixWorld),F.setFromMatrixPosition(se.matrixWorld);const pe=D.distanceTo(F),_e=Y.projectionMatrix.elements,U=se.projectionMatrix.elements,Ge=_e[14]/(_e[10]-1),ge=_e[14]/(_e[10]+1),Se=(_e[9]+1)/_e[5],he=(_e[9]-1)/_e[5],Pe=(_e[8]-1)/_e[0],be=(U[8]+1)/U[0],q=Ge*Pe,te=Ge*be,Q=pe/(-Pe+be),ue=Q*-Pe;Y.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(ue),k.translateZ(Q),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const le=Ge+Q,Me=ge+Q,Te=q-ue,Be=te+(pe-ue),Ze=Se*ge/Me*le,Ye=he*ge/Me*le;k.projectionMatrix.makePerspective(Te,Be,Ze,Ye,le,Me)}function O(k,Y){Y===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(Y.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(i===null)return;C.near=w.near=b.near=k.near,C.far=w.far=b.far=k.far,(W!==C.near||ae!==C.far)&&(i.updateRenderState({depthNear:C.near,depthFar:C.far}),W=C.near,ae=C.far);const Y=k.parent,se=C.cameras;O(C,Y);for(let _e=0;_e<se.length;_e++)O(se[_e],Y);C.matrixWorld.decompose(C.position,C.quaternion,C.scale),k.position.copy(C.position),k.quaternion.copy(C.quaternion),k.scale.copy(C.scale),k.matrix.copy(C.matrix),k.matrixWorld.copy(C.matrixWorld);const pe=k.children;for(let _e=0,U=pe.length;_e<U;_e++)pe[_e].updateMatrixWorld(!0);se.length===2?N(C,b,w):C.projectionMatrix.copy(b.projectionMatrix)},this.getCamera=function(){return C},this.getFoveation=function(){if(u!==null)return u.fixedFoveation;if(d!==null)return d.fixedFoveation},this.setFoveation=function(k){u!==null&&(u.fixedFoveation=k),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=k)};let H=null;function K(k,Y){if(c=Y.getViewerPose(o),g=Y,c!==null){const pe=c.views;d!==null&&(e.setRenderTargetFramebuffer(m,d.framebuffer),e.setRenderTarget(m));let _e=!1;pe.length!==C.cameras.length&&(C.cameras.length=0,_e=!0);for(let U=0;U<pe.length;U++){const Ge=pe[U];let ge=null;if(d!==null)ge=d.getViewport(Ge);else{const he=h.getViewSubImage(u,Ge);ge=he.viewport,U===0&&(e.setRenderTargetTextures(m,he.colorTexture,u.ignoreDepthValues?void 0:he.depthStencilTexture),e.setRenderTarget(m))}const Se=L[U];Se.matrix.fromArray(Ge.transform.matrix),Se.projectionMatrix.fromArray(Ge.projectionMatrix),Se.viewport.set(ge.x,ge.y,ge.width,ge.height),U===0&&C.matrix.copy(Se.matrix),_e===!0&&C.cameras.push(Se)}}const se=i.inputSources;for(let pe=0;pe<p.length;pe++){const _e=p[pe],U=se[pe];_e.update(U,Y,o)}H&&H(k,Y),g=null}const re=new ah;re.setAnimationLoop(K),this.setAnimationLoop=function(k){H=k},this.dispose=function(){}}}function mx(s){function e(m,p){m.fogColor.value.copy(p.color),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function t(m,p,T,b,w){p.isMeshBasicMaterial?n(m,p):p.isMeshLambertMaterial?(n(m,p),l(m,p)):p.isMeshToonMaterial?(n(m,p),h(m,p)):p.isMeshPhongMaterial?(n(m,p),c(m,p)):p.isMeshStandardMaterial?(n(m,p),p.isMeshPhysicalMaterial?d(m,p,w):u(m,p)):p.isMeshMatcapMaterial?(n(m,p),f(m,p)):p.isMeshDepthMaterial?(n(m,p),g(m,p)):p.isMeshDistanceMaterial?(n(m,p),x(m,p)):p.isMeshNormalMaterial?(n(m,p),_(m,p)):p.isLineBasicMaterial?(i(m,p),p.isLineDashedMaterial&&r(m,p)):p.isPointsMaterial?o(m,p,T,b):p.isSpriteMaterial?a(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function n(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.specularMap&&(m.specularMap.value=p.specularMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=s.get(p).envMap;T&&(m.envMap.value=T,m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity);let b;p.map?b=p.map:p.specularMap?b=p.specularMap:p.displacementMap?b=p.displacementMap:p.normalMap?b=p.normalMap:p.bumpMap?b=p.bumpMap:p.roughnessMap?b=p.roughnessMap:p.metalnessMap?b=p.metalnessMap:p.alphaMap?b=p.alphaMap:p.emissiveMap?b=p.emissiveMap:p.clearcoatMap?b=p.clearcoatMap:p.clearcoatNormalMap?b=p.clearcoatNormalMap:p.clearcoatRoughnessMap?b=p.clearcoatRoughnessMap:p.specularIntensityMap?b=p.specularIntensityMap:p.specularColorMap?b=p.specularColorMap:p.transmissionMap?b=p.transmissionMap:p.thicknessMap?b=p.thicknessMap:p.sheenColorMap?b=p.sheenColorMap:p.sheenRoughnessMap&&(b=p.sheenRoughnessMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),m.uvTransform.value.copy(b.matrix));let w;p.aoMap?w=p.aoMap:p.lightMap&&(w=p.lightMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),m.uv2Transform.value.copy(w.matrix))}function i(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity}function r(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,T,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=b*.5,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let w;p.map?w=p.map:p.alphaMap&&(w=p.alphaMap),w!==void 0&&(w.matrixAutoUpdate===!0&&w.updateMatrix(),m.uvTransform.value.copy(w.matrix))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let T;p.map?T=p.map:p.alphaMap&&(T=p.alphaMap),T!==void 0&&(T.matrixAutoUpdate===!0&&T.updateMatrix(),m.uvTransform.value.copy(T.matrix))}function l(m,p){p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap)}function c(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}function u(m,p){m.roughness.value=p.roughness,m.metalness.value=p.metalness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),s.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){u(m,p),m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap)),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),m.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===ht&&m.clearcoatNormalScale.value.negate())),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap)}function f(m,p){p.matcap&&(m.matcap.value=p.matcap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}function g(m,p){p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}function x(m,p){p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),m.referencePosition.value.copy(p.referencePosition),m.nearDistance.value=p.nearDistance,m.farDistance.value=p.farDistance}function _(m,p){p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}return{refreshFogUniforms:e,refreshMaterialUniforms:t}}function gx(){const s=Br("canvas");return s.style.display="block",s}function je(s={}){const e=s.canvas!==void 0?s.canvas:gx(),t=s.context!==void 0?s.context:null,n=s.alpha!==void 0?s.alpha:!1,i=s.depth!==void 0?s.depth:!0,r=s.stencil!==void 0?s.stencil:!0,o=s.antialias!==void 0?s.antialias:!1,a=s.premultipliedAlpha!==void 0?s.premultipliedAlpha:!0,l=s.preserveDrawingBuffer!==void 0?s.preserveDrawingBuffer:!1,c=s.powerPreference!==void 0?s.powerPreference:"default",h=s.failIfMajorPerformanceCaveat!==void 0?s.failIfMajorPerformanceCaveat:!1;let u=null,d=null;const f=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=Rt,this.physicallyCorrectLights=!1,this.toneMapping=Un,this.toneMappingExposure=1;const x=this;let _=!1,m=0,p=0,T=null,b=-1,w=null;const L=new Re,C=new Re;let W=null,ae=e.width,Z=e.height,v=1,R=null,D=null;const F=new Re(0,0,ae,Z),N=new Re(0,0,ae,Z);let O=!1;const H=new Ys;let K=!1,re=!1,k=null;const Y=new de,se=new S,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function _e(){return T===null?v:1}let U=t;function Ge(M,I){for(let z=0;z<M.length;z++){const B=M[z],j=e.getContext(B,I);if(j!==null)return j}return null}try{const M={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:a,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ht}`),e.addEventListener("webglcontextlost",Ae,!1),e.addEventListener("webglcontextrestored",A,!1),U===null){const I=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&I.shift(),U=Ge(I,M),U===null)throw Ge(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let ge,Se,he,Pe,be,q,te,Q,ue,le,Me,Te,Be,Ze,Ye,E,y,V,ee,me,G,ve,xe;function oe(){ge=new Fm(U),Se=new Rm(U,ge,s),ge.init(Se),ve=new dx(U,ge,Se),he=new hx(U,ge,Se),Pe=new zm,be=new Qg,q=new ux(U,ge,he,be,Se,ve,Pe),te=new Pm(x),Q=new Nm(x),ue=new $d(U,Se),xe=new Am(U,ge,ue,Se),le=new Om(U,ue,Pe,xe),Me=new Gm(U,le,ue,Pe),ee=new km(U,Se,q),E=new Cm(be),Te=new $g(x,te,Q,ge,Se,xe,E),Be=new mx(be),Ze=new tx,Ye=new ax(ge,Se),V=new Em(x,te,he,Me,n,a),y=new yh(x,Me,Se),me=new Lm(U,ge,Pe,Se),G=new Bm(U,ge,Pe,Se),Pe.programs=Te.programs,x.capabilities=Se,x.extensions=ge,x.properties=be,x.renderLists=Ze,x.shadowMap=y,x.state=he,x.info=Pe}oe();const ie=new px(x,U);this.xr=ie,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=ge.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ge.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return v},this.setPixelRatio=function(M){M!==void 0&&(v=M,this.setSize(ae,Z,!1))},this.getSize=function(M){return M.set(ae,Z)},this.setSize=function(M,I,z){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ae=M,Z=I,e.width=Math.floor(M*v),e.height=Math.floor(I*v),z!==!1&&(e.style.width=M+"px",e.style.height=I+"px"),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(ae*v,Z*v).floor()},this.setDrawingBufferSize=function(M,I,z){ae=M,Z=I,v=z,e.width=Math.floor(M*z),e.height=Math.floor(I*z),this.setViewport(0,0,M,I)},this.getCurrentViewport=function(M){return M.copy(L)},this.getViewport=function(M){return M.copy(F)},this.setViewport=function(M,I,z,B){M.isVector4?F.set(M.x,M.y,M.z,M.w):F.set(M,I,z,B),he.viewport(L.copy(F).multiplyScalar(v).floor())},this.getScissor=function(M){return M.copy(N)},this.setScissor=function(M,I,z,B){M.isVector4?N.set(M.x,M.y,M.z,M.w):N.set(M,I,z,B),he.scissor(C.copy(N).multiplyScalar(v).floor())},this.getScissorTest=function(){return O},this.setScissorTest=function(M){he.setScissorTest(O=M)},this.setOpaqueSort=function(M){R=M},this.setTransparentSort=function(M){D=M},this.getClearColor=function(M){return M.copy(V.getClearColor())},this.setClearColor=function(){V.setClearColor.apply(V,arguments)},this.getClearAlpha=function(){return V.getClearAlpha()},this.setClearAlpha=function(){V.setClearAlpha.apply(V,arguments)},this.clear=function(M,I,z){let B=0;(M===void 0||M)&&(B|=16384),(I===void 0||I)&&(B|=256),(z===void 0||z)&&(B|=1024),U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Ae,!1),e.removeEventListener("webglcontextrestored",A,!1),Ze.dispose(),Ye.dispose(),be.dispose(),te.dispose(),Q.dispose(),Me.dispose(),xe.dispose(),Te.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",Fe),ie.removeEventListener("sessionend",rt),k&&(k.dispose(),k=null),Ot.stop()};function Ae(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function A(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;const M=Pe.autoReset,I=y.enabled,z=y.autoUpdate,B=y.needsUpdate,j=y.type;oe(),Pe.autoReset=M,y.enabled=I,y.autoUpdate=z,y.needsUpdate=B,y.type=j}function fe(M){const I=M.target;I.removeEventListener("dispose",fe),ce(I)}function ce(M){we(M),be.remove(M)}function we(M){const I=be.get(M).programs;I!==void 0&&(I.forEach(function(z){Te.releaseProgram(z)}),M.isShaderMaterial&&Te.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,z,B,j,Ee){I===null&&(I=pe);const Le=j.isMesh&&j.matrixWorld.determinant()<0,Ie=vu(M,I,z,B,j);he.setMaterial(B,Le);let De=z.index;const Xe=z.attributes.position;if(De===null){if(Xe===void 0||Xe.count===0)return}else if(De.count===0)return;let ze=1;B.wireframe===!0&&(De=le.getWireframeAttribute(z),ze=2),xe.setup(j,B,Ie,z,De);let Ue,at=me;De!==null&&(Ue=ue.get(De),at=G,at.setIndex(Ue));const Kn=De!==null?De.count:Xe.count,fi=z.drawRange.start*ze,Ve=z.drawRange.count*ze,Qt=Ee!==null?Ee.start*ze:0,mt=Ee!==null?Ee.count*ze:1/0,en=Math.max(fi,Qt),Qr=Math.min(Kn,fi+Ve,Qt+mt)-1,tn=Math.max(0,Qr-en+1);if(tn!==0){if(j.isMesh)B.wireframe===!0?(he.setLineWidth(B.wireframeLinewidth*_e()),at.setMode(1)):at.setMode(4);else if(j.isLine){let un=B.linewidth;un===void 0&&(un=1),he.setLineWidth(un*_e()),j.isLineSegments?at.setMode(1):j.isLineLoop?at.setMode(2):at.setMode(3)}else j.isPoints?at.setMode(0):j.isSprite&&at.setMode(4);if(j.isInstancedMesh)at.renderInstances(en,tn,j.count);else if(z.isInstancedBufferGeometry){const un=Math.min(z.instanceCount,z._maxInstanceCount);at.renderInstances(en,tn,un)}else at.render(en,tn)}},this.compile=function(M,I){d=Ye.get(M),d.init(),g.push(d),M.traverseVisible(function(z){z.isLight&&z.layers.test(I.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),d.setupLights(x.physicallyCorrectLights),M.traverse(function(z){const B=z.material;if(B)if(Array.isArray(B))for(let j=0;j<B.length;j++){const Ee=B[j];ao(Ee,M,z)}else ao(B,M,z)}),g.pop(),d=null};let X=null;function ye(M){X&&X(M)}function Fe(){Ot.stop()}function rt(){Ot.start()}const Ot=new ah;Ot.setAnimationLoop(ye),typeof window<"u"&&Ot.setContext(window),this.setAnimationLoop=function(M){X=M,ie.setAnimationLoop(M),M===null?Ot.stop():Ot.start()},ie.addEventListener("sessionstart",Fe),ie.addEventListener("sessionend",rt),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;M.autoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(I),I=ie.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,I,T),d=Ye.get(M,g.length),d.init(),g.push(d),Y.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),H.setFromProjectionMatrix(Y),re=this.localClippingEnabled,K=E.init(this.clippingPlanes,re,I),u=Ze.get(M,f.length),u.init(),f.push(u),ot(M,I,0,x.sortObjects),u.finish(),x.sortObjects===!0&&u.sort(R,D),K===!0&&E.beginShadows();const z=d.state.shadowsArray;if(y.render(z,M,I),K===!0&&E.endShadows(),this.info.autoReset===!0&&this.info.reset(),V.render(u,M),d.setupLights(x.physicallyCorrectLights),I.isArrayCamera){const B=I.cameras;for(let j=0,Ee=B.length;j<Ee;j++){const Le=B[j];$t(u,M,Le,Le.viewport)}}else $t(u,M,I);T!==null&&(q.updateMultisampleRenderTarget(T),q.updateRenderTargetMipmap(T)),M.isScene===!0&&M.onAfterRender(x,M,I),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1),xe.resetDefaultState(),b=-1,w=null,g.pop(),g.length>0?d=g[g.length-1]:d=null,f.pop(),f.length>0?u=f[f.length-1]:u=null};function ot(M,I,z,B){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||H.intersectsSprite(M)){B&&se.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Y);const Le=Me.update(M),Ie=M.material;Ie.visible&&u.push(M,Le,Ie,z,se.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(M.isSkinnedMesh&&M.skeleton.frame!==Pe.render.frame&&(M.skeleton.update(),M.skeleton.frame=Pe.render.frame),!M.frustumCulled||H.intersectsObject(M))){B&&se.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Y);const Le=Me.update(M),Ie=M.material;if(Array.isArray(Ie)){const De=Le.groups;for(let Xe=0,ze=De.length;Xe<ze;Xe++){const Ue=De[Xe],at=Ie[Ue.materialIndex];at&&at.visible&&u.push(M,Le,at,z,se.z,Ue)}}else Ie.visible&&u.push(M,Le,Ie,z,se.z,null)}}const Ee=M.children;for(let Le=0,Ie=Ee.length;Le<Ie;Le++)ot(Ee[Le],I,z,B)}function $t(M,I,z,B){const j=M.opaque,Ee=M.transmissive,Le=M.transparent;d.setupLightsView(z),Ee.length>0&&hn(j,I,z),B&&he.viewport(L.copy(B)),j.length>0&&$r(j,I,z),Ee.length>0&&$r(Ee,I,z),Le.length>0&&$r(Le,I,z)}function hn(M,I,z){if(k===null){const Le=o===!0&&Se.isWebGL2===!0?ba:Gt;k=new Le(1024,1024,{generateMipmaps:!0,type:ve.convert(Wi)!==null?Wi:Hn,minFilter:tr,magFilter:ft,wrapS:Nt,wrapT:Nt,useRenderToTexture:ge.has("WEBGL_multisampled_render_to_texture")})}const B=x.getRenderTarget();x.setRenderTarget(k),x.clear();const j=x.toneMapping;x.toneMapping=Un,$r(M,I,z),x.toneMapping=j,q.updateMultisampleRenderTarget(k),q.updateRenderTargetMipmap(k),x.setRenderTarget(B)}function $r(M,I,z){const B=I.isScene===!0?I.overrideMaterial:null;for(let j=0,Ee=M.length;j<Ee;j++){const Le=M[j],Ie=Le.object,De=Le.geometry,Xe=B===null?Le.material:B,ze=Le.group;Ie.layers.test(z.layers)&&_u(Ie,I,z,De,Xe,ze)}}function _u(M,I,z,B,j,Ee){M.onBeforeRender(x,I,z,B,j,Ee),M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),j.onBeforeRender(x,I,z,B,M,Ee),j.transparent===!0&&j.side===an?(j.side=ht,j.needsUpdate=!0,x.renderBufferDirect(z,I,B,j,M,Ee),j.side=qn,j.needsUpdate=!0,x.renderBufferDirect(z,I,B,j,M,Ee),j.side=an):x.renderBufferDirect(z,I,B,j,M,Ee),M.onAfterRender(x,I,z,B,j,Ee)}function ao(M,I,z){I.isScene!==!0&&(I=pe);const B=be.get(M),j=d.state.lights,Ee=d.state.shadowsArray,Le=j.state.version,Ie=Te.getParameters(M,j.state,Ee,I,z),De=Te.getProgramCacheKey(Ie);let Xe=B.programs;B.environment=M.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(M.isMeshStandardMaterial?Q:te).get(M.envMap||B.environment),Xe===void 0&&(M.addEventListener("dispose",fe),Xe=new Map,B.programs=Xe);let ze=Xe.get(De);if(ze!==void 0){if(B.currentProgram===ze&&B.lightsStateVersion===Le)return Xa(M,Ie),ze}else Ie.uniforms=Te.getUniforms(M),M.onBuild(z,Ie,x),M.onBeforeCompile(Ie,x),ze=Te.acquireProgram(Ie,De),Xe.set(De,ze),B.uniforms=Ie.uniforms;const Ue=B.uniforms;(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ue.clippingPlanes=E.uniform),Xa(M,Ie),B.needsLights=Mu(M),B.lightsStateVersion=Le,B.needsLights&&(Ue.ambientLightColor.value=j.state.ambient,Ue.lightProbe.value=j.state.probe,Ue.directionalLights.value=j.state.directional,Ue.directionalLightShadows.value=j.state.directionalShadow,Ue.spotLights.value=j.state.spot,Ue.spotLightShadows.value=j.state.spotShadow,Ue.rectAreaLights.value=j.state.rectArea,Ue.ltc_1.value=j.state.rectAreaLTC1,Ue.ltc_2.value=j.state.rectAreaLTC2,Ue.pointLights.value=j.state.point,Ue.pointLightShadows.value=j.state.pointShadow,Ue.hemisphereLights.value=j.state.hemi,Ue.directionalShadowMap.value=j.state.directionalShadowMap,Ue.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ue.spotShadowMap.value=j.state.spotShadowMap,Ue.spotShadowMatrix.value=j.state.spotShadowMatrix,Ue.pointShadowMap.value=j.state.pointShadowMap,Ue.pointShadowMatrix.value=j.state.pointShadowMatrix);const at=ze.getUniforms(),Kn=Gn.seqWithValue(at.seq,Ue);return B.currentProgram=ze,B.uniformsList=Kn,ze}function Xa(M,I){const z=be.get(M);z.outputEncoding=I.outputEncoding,z.instancing=I.instancing,z.skinning=I.skinning,z.morphTargets=I.morphTargets,z.morphNormals=I.morphNormals,z.morphTargetsCount=I.morphTargetsCount,z.numClippingPlanes=I.numClippingPlanes,z.numIntersection=I.numClipIntersection,z.vertexAlphas=I.vertexAlphas,z.vertexTangents=I.vertexTangents,z.toneMapping=I.toneMapping}function vu(M,I,z,B,j){I.isScene!==!0&&(I=pe),q.resetTextureUnits();const Ee=I.fog,Le=B.isMeshStandardMaterial?I.environment:null,Ie=T===null?x.outputEncoding:T.isXRRenderTarget===!0?T.texture.encoding:Rt,De=(B.isMeshStandardMaterial?Q:te).get(B.envMap||Le),Xe=B.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,ze=!!B.normalMap&&!!z.attributes.tangent,Ue=!!z.morphAttributes.position,at=!!z.morphAttributes.normal,Kn=z.morphAttributes.position?z.morphAttributes.position.length:0,fi=B.toneMapped?x.toneMapping:Un,Ve=be.get(B),Qt=d.state.lights;if(K===!0&&(re===!0||M!==w)){const qt=M===w&&B.id===b;E.setState(B,M,qt)}let mt=!1;B.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Qt.state.version||Ve.outputEncoding!==Ie||j.isInstancedMesh&&Ve.instancing===!1||!j.isInstancedMesh&&Ve.instancing===!0||j.isSkinnedMesh&&Ve.skinning===!1||!j.isSkinnedMesh&&Ve.skinning===!0||Ve.envMap!==De||B.fog&&Ve.fog!==Ee||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==E.numPlanes||Ve.numIntersection!==E.numIntersection)||Ve.vertexAlphas!==Xe||Ve.vertexTangents!==ze||Ve.morphTargets!==Ue||Ve.morphNormals!==at||Ve.toneMapping!==fi||Se.isWebGL2===!0&&Ve.morphTargetsCount!==Kn)&&(mt=!0):(mt=!0,Ve.__version=B.version);let en=Ve.currentProgram;mt===!0&&(en=ao(B,I,j));let Qr=!1,tn=!1,un=!1;const Tt=en.getUniforms(),cr=Ve.uniforms;if(he.useProgram(en.program)&&(Qr=!0,tn=!0,un=!0),B.id!==b&&(b=B.id,tn=!0),Qr||w!==M){if(Tt.setValue(U,"projectionMatrix",M.projectionMatrix),Se.logarithmicDepthBuffer&&Tt.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),w!==M&&(w=M,tn=!0,un=!0),B.isShaderMaterial||B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshStandardMaterial||B.envMap){const qt=Tt.map.cameraPosition;qt!==void 0&&qt.setValue(U,se.setFromMatrixPosition(M.matrixWorld))}(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Tt.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial||B.isShadowMaterial||j.isSkinnedMesh)&&Tt.setValue(U,"viewMatrix",M.matrixWorldInverse)}if(j.isSkinnedMesh){Tt.setOptional(U,j,"bindMatrix"),Tt.setOptional(U,j,"bindMatrixInverse");const qt=j.skeleton;qt&&(Se.floatVertexTextures?(qt.boneTexture===null&&qt.computeBoneTexture(),Tt.setValue(U,"boneTexture",qt.boneTexture,q),Tt.setValue(U,"boneTextureSize",qt.boneTextureSize)):Tt.setOptional(U,qt,"boneMatrices"))}return z&&(z.morphAttributes.position!==void 0||z.morphAttributes.normal!==void 0)&&ee.update(j,z,B,en),(tn||Ve.receiveShadow!==j.receiveShadow)&&(Ve.receiveShadow=j.receiveShadow,Tt.setValue(U,"receiveShadow",j.receiveShadow)),tn&&(Tt.setValue(U,"toneMappingExposure",x.toneMappingExposure),Ve.needsLights&&yu(cr,un),Ee&&B.fog&&Be.refreshFogUniforms(cr,Ee),Be.refreshMaterialUniforms(cr,B,v,Z,k),Gn.upload(U,Ve.uniformsList,cr,q)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Gn.upload(U,Ve.uniformsList,cr,q),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Tt.setValue(U,"center",j.center),Tt.setValue(U,"modelViewMatrix",j.modelViewMatrix),Tt.setValue(U,"normalMatrix",j.normalMatrix),Tt.setValue(U,"modelMatrix",j.matrixWorld),en}function yu(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function Mu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return m},this.getActiveMipmapLevel=function(){return p},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(M,I,z){be.get(M.texture).__webglTexture=I,be.get(M.depthTexture).__webglTexture=z;const B=be.get(M);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=z===void 0,B.__autoAllocateDepthBuffer||M.useRenderToTexture&&(console.warn("render-to-texture extension was disabled because an external texture was provided"),M.useRenderToTexture=!1,M.useRenderbuffer=!0))},this.setRenderTargetFramebuffer=function(M,I){const z=be.get(M);z.__webglFramebuffer=I,z.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,z=0){T=M,m=I,p=z;let B=!0;if(M){const De=be.get(M);De.__useDefaultFramebuffer!==void 0?(he.bindFramebuffer(36160,null),B=!1):De.__webglFramebuffer===void 0?q.setupRenderTarget(M):De.__hasExternalTextures&&q.rebindTextures(M,be.get(M.texture).__webglTexture,be.get(M.depthTexture).__webglTexture)}let j=null,Ee=!1,Le=!1;if(M){const De=M.texture;(De.isDataTexture3D||De.isDataTexture2DArray)&&(Le=!0);const Xe=be.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(j=Xe[I],Ee=!0):M.useRenderbuffer?j=be.get(M).__webglMultisampledFramebuffer:j=Xe,L.copy(M.viewport),C.copy(M.scissor),W=M.scissorTest}else L.copy(F).multiplyScalar(v).floor(),C.copy(N).multiplyScalar(v).floor(),W=O;if(he.bindFramebuffer(36160,j)&&Se.drawBuffers&&B&&he.drawBuffers(M,j),he.viewport(L),he.scissor(C),he.setScissorTest(W),Ee){const De=be.get(M.texture);U.framebufferTexture2D(36160,36064,34069+I,De.__webglTexture,z)}else if(Le){const De=be.get(M.texture),Xe=I||0;U.framebufferTextureLayer(36160,36064,De.__webglTexture,z||0,Xe)}b=-1},this.readRenderTargetPixels=function(M,I,z,B,j,Ee,Le){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=be.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Le!==void 0&&(Ie=Ie[Le]),Ie){he.bindFramebuffer(36160,Ie);try{const De=M.texture,Xe=De.format,ze=De.type;if(Xe!==Lt&&ve.convert(Xe)!==U.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ue=ze===Wi&&(ge.has("EXT_color_buffer_half_float")||Se.isWebGL2&&ge.has("EXT_color_buffer_float"));if(ze!==Hn&&ve.convert(ze)!==U.getParameter(35738)&&!(ze===Fn&&(Se.isWebGL2||ge.has("OES_texture_float")||ge.has("WEBGL_color_buffer_float")))&&!Ue){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U.checkFramebufferStatus(36160)===36053?I>=0&&I<=M.width-B&&z>=0&&z<=M.height-j&&U.readPixels(I,z,B,j,ve.convert(Xe),ve.convert(ze),Ee):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{const De=T!==null?be.get(T).__webglFramebuffer:null;he.bindFramebuffer(36160,De)}}},this.copyFramebufferToTexture=function(M,I,z=0){if(I.isFramebufferTexture!==!0){console.error("THREE.WebGLRenderer: copyFramebufferToTexture() can only be used with FramebufferTexture.");return}const B=Math.pow(2,-z),j=Math.floor(I.image.width*B),Ee=Math.floor(I.image.height*B);q.setTexture2D(I,0),U.copyTexSubImage2D(3553,z,0,0,M.x,M.y,j,Ee),he.unbindTexture()},this.copyTextureToTexture=function(M,I,z,B=0){const j=I.image.width,Ee=I.image.height,Le=ve.convert(z.format),Ie=ve.convert(z.type);q.setTexture2D(z,0),U.pixelStorei(37440,z.flipY),U.pixelStorei(37441,z.premultiplyAlpha),U.pixelStorei(3317,z.unpackAlignment),I.isDataTexture?U.texSubImage2D(3553,B,M.x,M.y,j,Ee,Le,Ie,I.image.data):I.isCompressedTexture?U.compressedTexSubImage2D(3553,B,M.x,M.y,I.mipmaps[0].width,I.mipmaps[0].height,Le,I.mipmaps[0].data):U.texSubImage2D(3553,B,M.x,M.y,Le,Ie,I.image),B===0&&z.generateMipmaps&&U.generateMipmap(3553),he.unbindTexture()},this.copyTextureToTexture3D=function(M,I,z,B,j=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ee=M.max.x-M.min.x+1,Le=M.max.y-M.min.y+1,Ie=M.max.z-M.min.z+1,De=ve.convert(B.format),Xe=ve.convert(B.type);let ze;if(B.isDataTexture3D)q.setTexture3D(B,0),ze=32879;else if(B.isDataTexture2DArray)q.setTexture2DArray(B,0),ze=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(37440,B.flipY),U.pixelStorei(37441,B.premultiplyAlpha),U.pixelStorei(3317,B.unpackAlignment);const Ue=U.getParameter(3314),at=U.getParameter(32878),Kn=U.getParameter(3316),fi=U.getParameter(3315),Ve=U.getParameter(32877),Qt=z.isCompressedTexture?z.mipmaps[0]:z.image;U.pixelStorei(3314,Qt.width),U.pixelStorei(32878,Qt.height),U.pixelStorei(3316,M.min.x),U.pixelStorei(3315,M.min.y),U.pixelStorei(32877,M.min.z),z.isDataTexture||z.isDataTexture3D?U.texSubImage3D(ze,j,I.x,I.y,I.z,Ee,Le,Ie,De,Xe,Qt.data):z.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(ze,j,I.x,I.y,I.z,Ee,Le,Ie,De,Qt.data)):U.texSubImage3D(ze,j,I.x,I.y,I.z,Ee,Le,Ie,De,Xe,Qt),U.pixelStorei(3314,Ue),U.pixelStorei(32878,at),U.pixelStorei(3316,Kn),U.pixelStorei(3315,fi),U.pixelStorei(32877,Ve),j===0&&B.generateMipmaps&&U.generateMipmap(ze),he.unbindTexture()},this.initTexture=function(M){q.setTexture2D(M,0),he.unbindTexture()},this.resetState=function(){m=0,p=0,T=null,he.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}je.prototype.isWebGLRenderer=!0;class xx extends je{}xx.prototype.isWebGL1Renderer=!0;class $s extends We{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.autoUpdate=e.autoUpdate,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t}}$s.prototype.isScene=!0;class rr{constructor(e,t){this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Fr,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=kt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.prototype.slice.call(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}rr.prototype.isInterleavedBuffer=!0;const ct=new S;class Qi{constructor(e,t,n,i=!1){this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ct.x=this.getX(t),ct.y=this.getY(t),ct.z=this.getZ(t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ct.x=this.getX(t),ct.y=this.getY(t),ct.z=this.getZ(t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ct.x=this.getX(t),ct.y=this.getY(t),ct.z=this.getZ(t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}setX(e,t){return this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){return this.data.array[e*this.data.stride+this.offset]}getY(e){return this.data.array[e*this.data.stride+this.offset+1]}getZ(e){return this.data.array[e*this.data.stride+this.offset+2]}getW(e){return this.data.array[e*this.data.stride+this.offset+3]}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Qi(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}Qi.prototype.isInterleavedBufferAttribute=!0;class wh extends xt{constructor(e){super(),this.type="SpriteMaterial",this.color=new ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this}}wh.prototype.isSpriteMaterial=!0;let Ri;const pr=new S,Ci=new S,Pi=new S,Di=new J,mr=new J,Sh=new de,Ms=new S,gr=new S,ws=new S,tc=new J,Ho=new J,nc=new J;class _x extends We{constructor(e){if(super(),this.type="Sprite",Ri===void 0){Ri=new Ke;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new rr(t,5);Ri.setIndex([0,1,2,0,2,3]),Ri.setAttribute("position",new Qi(n,3,0,!1)),Ri.setAttribute("uv",new Qi(n,2,3,!1))}this.geometry=Ri,this.material=e!==void 0?e:new wh,this.center=new J(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ci.setFromMatrixScale(this.matrixWorld),Sh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Pi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ci.multiplyScalar(-Pi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Ss(Ms.set(-.5,-.5,0),Pi,o,Ci,i,r),Ss(gr.set(.5,-.5,0),Pi,o,Ci,i,r),Ss(ws.set(.5,.5,0),Pi,o,Ci,i,r),tc.set(0,0),Ho.set(1,0),nc.set(1,1);let a=e.ray.intersectTriangle(Ms,gr,ws,!1,pr);if(a===null&&(Ss(gr.set(-.5,.5,0),Pi,o,Ci,i,r),Ho.set(0,1),a=e.ray.intersectTriangle(Ms,ws,gr,!1,pr),a===null))return;const l=e.ray.origin.distanceTo(pr);l<e.near||l>e.far||t.push({distance:l,point:pr.clone(),uv:gt.getUV(pr,Ms,gr,ws,tc,Ho,nc,new J),face:null,object:this})}copy(e){return super.copy(e),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}_x.prototype.isSprite=!0;function Ss(s,e,t,n,i,r){Di.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(mr.x=r*Di.x-i*Di.y,mr.y=i*Di.x+r*Di.y):mr.copy(Di),s.copy(e),s.x+=mr.x,s.y+=mr.y,s.applyMatrix4(Sh)}const ic=new S,rc=new Re,sc=new Re,vx=new S,oc=new de;class Qs extends bt{constructor(e,t){super(e,t),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new de,this.bindMatrixInverse=new de}copy(e){return super.copy(e),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Re,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.x=t.getX(n),e.y=t.getY(n),e.z=t.getZ(n),e.w=t.getW(n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,i=this.geometry;rc.fromBufferAttribute(i.attributes.skinIndex,e),sc.fromBufferAttribute(i.attributes.skinWeight,e),ic.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=sc.getComponent(r);if(o!==0){const a=rc.getComponent(r);oc.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(vx.copy(ic).applyMatrix4(oc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}Qs.prototype.isSkinnedMesh=!0;class Ca extends We{constructor(){super(),this.type="Bone"}}Ca.prototype.isBone=!0;class bh extends pt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=ft,h=ft,u,d){super(null,o,a,l,c,h,i,r,u,d),this.image={data:e,width:t,height:n},this.magFilter=c,this.minFilter=h,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}bh.prototype.isDataTexture=!0;const ac=new de,yx=new de;class eo{constructor(e=[],t=[]){this.uuid=kt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new de)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new de;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:yx;ac.multiplyMatrices(a,t[r]),ac.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new eo(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=$c(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new bh(t,e,e,Lt,Fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ca),this.bones.push(o),this.boneInverses.push(new de().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class la extends ut{constructor(e,t,n,i=1){typeof n=="number"&&(i=n,n=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),super(e,t,n),this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}la.prototype.isInstancedBufferAttribute=!0;const lc=new de,cc=new de,bs=[],xr=new bt;class Mx extends bt{constructor(e,t,n){super(e,t),this.instanceMatrix=new la(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1}copy(e){return super.copy(e),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(xr.geometry=this.geometry,xr.material=this.material,xr.material!==void 0)for(let r=0;r<i;r++){this.getMatrixAt(r,lc),cc.multiplyMatrices(n,lc),xr.matrixWorld=cc,xr.raycast(e,bs);for(let o=0,a=bs.length;o<a;o++){const l=bs[o];l.instanceId=r,l.object=this,t.push(l)}bs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new la(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}Mx.prototype.isInstancedMesh=!0;class sr extends xt{constructor(e){super(),this.type="LineBasicMaterial",this.color=new ne(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this}}sr.prototype.isLineBasicMaterial=!0;const hc=new S,uc=new S,dc=new de,ko=new nr,Ts=new ui;class to extends We{constructor(e=new Ke,t=new sr){super(),this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)hc.fromBufferAttribute(t,i-1),uc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=hc.distanceTo(uc);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(i),Ts.radius+=r,e.ray.intersectsSphere(Ts)===!1)return;dc.copy(i).invert(),ko.copy(e.ray).applyMatrix4(dc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new S,h=new S,u=new S,d=new S,f=this.isLineSegments?2:1;if(n.isBufferGeometry){const g=n.index,_=n.attributes.position;if(g!==null){const m=Math.max(0,o.start),p=Math.min(g.count,o.start+o.count);for(let T=m,b=p-1;T<b;T+=f){const w=g.getX(T),L=g.getX(T+1);if(c.fromBufferAttribute(_,w),h.fromBufferAttribute(_,L),ko.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const W=e.ray.origin.distanceTo(d);W<e.near||W>e.far||t.push({distance:W,point:u.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,o.start),p=Math.min(_.count,o.start+o.count);for(let T=m,b=p-1;T<b;T+=f){if(c.fromBufferAttribute(_,T),h.fromBufferAttribute(_,T+1),ko.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const L=e.ray.origin.distanceTo(d);L<e.near||L>e.far||t.push({distance:L,point:u.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}}else n.isGeometry&&console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}to.prototype.isLine=!0;const fc=new S,pc=new S;class no extends to{constructor(e,t){super(e,t),this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)fc.fromBufferAttribute(t,i),pc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+fc.distanceTo(pc);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}}no.prototype.isLineSegments=!0;class Th extends to{constructor(e,t){super(e,t),this.type="LineLoop"}}Th.prototype.isLineLoop=!0;class Pa extends xt{constructor(e){super(),this.type="PointsMaterial",this.color=new ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this}}Pa.prototype.isPointsMaterial=!0;const mc=new de,ca=new nr,Es=new ui,As=new S;class Eh extends We{constructor(e=new Ke,t=new Pa){super(),this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Es.copy(n.boundingSphere),Es.applyMatrix4(i),Es.radius+=r,e.ray.intersectsSphere(Es)===!1)return;mc.copy(i).invert(),ca.copy(e.ray).applyMatrix4(mc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a;if(n.isBufferGeometry){const c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){const _=c.getX(g);As.fromBufferAttribute(u,_),gc(As,_,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)As.fromBufferAttribute(u,g),gc(As,g,l,i,e,t,this)}}else console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}Eh.prototype.isPoints=!0;function gc(s,e,t,n,i,r,o){const a=ca.distanceSqToPoint(s);if(a<t){const l=new S;ca.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class wx extends pt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.minFilter=o!==void 0?o:yt,this.magFilter=r!==void 0?r:yt,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}wx.prototype.isVideoTexture=!0;class Sx extends pt{constructor(e,t,n){super({width:e,height:t}),this.format=n,this.magFilter=ft,this.minFilter=ft,this.generateMipmaps=!1,this.needsUpdate=!0}}Sx.prototype.isFramebufferTexture=!0;class bx extends pt{constructor(e,t,n,i,r,o,a,l,c,h,u,d){super(null,o,a,l,c,h,i,r,u,d),this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}bx.prototype.isCompressedTexture=!0;class Tx extends pt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.needsUpdate=!0}}Tx.prototype.isCanvasTexture=!0;class Wt{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new J:new S);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new S,i=[],r=[],o=[],a=new S,l=new de;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new S)}r[0]=new S,o[0]=new S;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(It(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(It(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class io extends Wt{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const n=t||new J,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}io.prototype.isEllipseCurve=!0;class Ah extends io{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.type="ArcCurve"}}Ah.prototype.isArcCurve=!0;function Da(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const Ls=new S,Go=new Da,Vo=new Da,Wo=new Da;class Lh extends Wt{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new S){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Ls.subVectors(i[0],i[1]).add(i[0]),c=Ls);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Ls.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ls),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),_<1e-4&&(_=x),Go.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,_),Vo.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,_),Wo.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,_)}else this.curveType==="catmullrom"&&(Go.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Vo.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Wo.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Go.calc(l),Vo.calc(l),Wo.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new S().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}Lh.prototype.isCatmullRomCurve3=!0;function xc(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function Ex(s,e){const t=1-s;return t*t*e}function Ax(s,e){return 2*(1-s)*s*e}function Lx(s,e){return s*s*e}function Rr(s,e,t,n){return Ex(s,e)+Ax(s,t)+Lx(s,n)}function Rx(s,e){const t=1-s;return t*t*t*e}function Cx(s,e){const t=1-s;return 3*t*t*s*e}function Px(s,e){return 3*(1-s)*s*s*e}function Dx(s,e){return s*s*s*e}function Cr(s,e,t,n,i){return Rx(s,e)+Cx(s,t)+Px(s,n)+Dx(s,i)}class Ia extends Wt{constructor(e=new J,t=new J,n=new J,i=new J){super(),this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new J){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cr(e,i.x,r.x,o.x,a.x),Cr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}Ia.prototype.isCubicBezierCurve=!0;class Rh extends Wt{constructor(e=new S,t=new S,n=new S,i=new S){super(),this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new S){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cr(e,i.x,r.x,o.x,a.x),Cr(e,i.y,r.y,o.y,a.y),Cr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}Rh.prototype.isCubicBezierCurve3=!0;class ro extends Wt{constructor(e=new J,t=new J){super(),this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new J){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t){const n=t||new J;return n.copy(this.v2).sub(this.v1).normalize(),n}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}ro.prototype.isLineCurve=!0;class Ix extends Wt{constructor(e=new S,t=new S){super(),this.type="LineCurve3",this.isLineCurve3=!0,this.v1=e,this.v2=t}getPoint(e,t=new S){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Na extends Wt{constructor(e=new J,t=new J,n=new J){super(),this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Rr(e,i.x,r.x,o.x),Rr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}Na.prototype.isQuadraticBezierCurve=!0;class Ch extends Wt{constructor(e=new S,t=new S,n=new S){super(),this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new S){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Rr(e,i.x,r.x,o.x),Rr(e,i.y,r.y,o.y),Rr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}Ch.prototype.isQuadraticBezierCurve3=!0;class Fa extends Wt{constructor(e=[]){super(),this.type="SplineCurve",this.points=e}getPoint(e,t=new J){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(xc(a,l.x,c.x,h.x,u.x),xc(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new J().fromArray(i))}return this}}Fa.prototype.isSplineCurve=!0;var Ph=Object.freeze({__proto__:null,ArcCurve:Ah,CatmullRomCurve3:Lh,CubicBezierCurve:Ia,CubicBezierCurve3:Rh,EllipseCurve:io,LineCurve:ro,LineCurve3:Ix,QuadraticBezierCurve:Na,QuadraticBezierCurve3:Ch,SplineCurve:Fa});class Nx extends Wt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new ro(t,e))}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o&&o.isEllipseCurve?e*2:o&&(o.isLineCurve||o.isLineCurve3)?1:o&&o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Ph[i.type]().fromJSON(i))}return this}}class ha extends Nx{constructor(e){super(),this.type="Path",this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ro(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Na(this.currentPoint.clone(),new J(e,t),new J(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new Ia(this.currentPoint.clone(),new J(e,t),new J(n,i),new J(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Fa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new io(e,t,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Yr extends ha{constructor(e){super(e),this.uuid=kt(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new ha().fromJSON(i))}return this}}const Fx={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=Dh(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(n&&(r=Hx(s,e,r,t)),s.length>80*t){a=c=s[0],l=h=s[1];for(let g=t;g<i;g+=t)u=s[g],d=s[g+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?1/f:0}return zr(r,o,t,a,l,f),o}};function Dh(s,e,t,n,i){let r,o;if(i===Kx(s,e,t,n)>0)for(r=e;r<t;r+=n)o=_c(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=_c(r,s[r],s[r+1],o);return o&&so(o,o.next)&&(Hr(o),o=o.next),o}function Xn(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(so(t,t.next)||st(t.prev,t,t.next)===0)){if(Hr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function zr(s,e,t,n,i,r,o){if(!s)return;!o&&r&&qx(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Bx(s,n,i,r):Ox(s)){e.push(l.i/t),e.push(s.i/t),e.push(c.i/t),Hr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=zx(Xn(s),e,t),zr(s,e,t,n,i,r,2)):o===2&&Ux(s,e,t,n,i,r):zr(Xn(s),e,t,n,i,r,1);break}}}function Ox(s){const e=s.prev,t=s,n=s.next;if(st(e,t,n)>=0)return!1;let i=s.next.next;for(;i!==s.prev;){if(Hi(e.x,e.y,t.x,t.y,n.x,n.y,i.x,i.y)&&st(i.prev,i,i.next)>=0)return!1;i=i.next}return!0}function Bx(s,e,t,n){const i=s.prev,r=s,o=s.next;if(st(i,r,o)>=0)return!1;const a=i.x<r.x?i.x<o.x?i.x:o.x:r.x<o.x?r.x:o.x,l=i.y<r.y?i.y<o.y?i.y:o.y:r.y<o.y?r.y:o.y,c=i.x>r.x?i.x>o.x?i.x:o.x:r.x>o.x?r.x:o.x,h=i.y>r.y?i.y>o.y?i.y:o.y:r.y>o.y?r.y:o.y,u=ua(a,l,e,t,n),d=ua(c,h,e,t,n);let f=s.prevZ,g=s.nextZ;for(;f&&f.z>=u&&g&&g.z<=d;){if(f!==s.prev&&f!==s.next&&Hi(i.x,i.y,r.x,r.y,o.x,o.y,f.x,f.y)&&st(f.prev,f,f.next)>=0||(f=f.prevZ,g!==s.prev&&g!==s.next&&Hi(i.x,i.y,r.x,r.y,o.x,o.y,g.x,g.y)&&st(g.prev,g,g.next)>=0))return!1;g=g.nextZ}for(;f&&f.z>=u;){if(f!==s.prev&&f!==s.next&&Hi(i.x,i.y,r.x,r.y,o.x,o.y,f.x,f.y)&&st(f.prev,f,f.next)>=0)return!1;f=f.prevZ}for(;g&&g.z<=d;){if(g!==s.prev&&g!==s.next&&Hi(i.x,i.y,r.x,r.y,o.x,o.y,g.x,g.y)&&st(g.prev,g,g.next)>=0)return!1;g=g.nextZ}return!0}function zx(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!so(i,r)&&Ih(i,n,n.next,r)&&Ur(i,r)&&Ur(r,i)&&(e.push(i.i/t),e.push(n.i/t),e.push(r.i/t),Hr(n),Hr(n.next),n=s=r),n=n.next}while(n!==s);return Xn(n)}function Ux(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Yx(o,a)){let l=Nh(o,a);o=Xn(o,o.next),l=Xn(l,l.next),zr(o,e,t,n,i,r),zr(l,e,t,n,i,r);return}a=a.next}o=o.next}while(o!==s)}function Hx(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Dh(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(jx(c));for(i.sort(kx),r=0;r<i.length;r++)Gx(i[r],t),t=Xn(t,t.next);return t}function kx(s,e){return s.x-e.x}function Gx(s,e){if(e=Vx(s,e),e){const t=Nh(e,s);Xn(e,e.next),Xn(t,t.next)}}function Vx(s,e){let t=e;const n=s.x,i=s.y;let r=-1/0,o;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r){if(r=d,d===n){if(i===t.y)return t;if(i===t.next.y)return t.next}o=t.x<t.next.x?t:t.next}}t=t.next}while(t!==e);if(!o)return null;if(n===r)return o;const a=o,l=o.x,c=o.y;let h=1/0,u;t=o;do n>=t.x&&t.x>=l&&n!==t.x&&Hi(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)&&(u=Math.abs(i-t.y)/(n-t.x),Ur(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Wx(o,t)))&&(o=t,h=u)),t=t.next;while(t!==a);return o}function Wx(s,e){return st(s.prev,s,e.prev)<0&&st(e.next,s,s.next)<0}function qx(s,e,t,n){let i=s;do i.z===null&&(i.z=ua(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Xx(i)}function Xx(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function ua(s,e,t,n,i){return s=32767*(s-t)*i,e=32767*(e-n)*i,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function jx(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Hi(s,e,t,n,i,r,o,a){return(i-o)*(e-a)-(s-o)*(r-a)>=0&&(s-o)*(n-a)-(t-o)*(e-a)>=0&&(t-o)*(r-a)-(i-o)*(n-a)>=0}function Yx(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Zx(s,e)&&(Ur(s,e)&&Ur(e,s)&&Jx(s,e)&&(st(s.prev,s,e.prev)||st(s,e.prev,e))||so(s,e)&&st(s.prev,s,s.next)>0&&st(e.prev,e,e.next)>0)}function st(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function so(s,e){return s.x===e.x&&s.y===e.y}function Ih(s,e,t,n){const i=Cs(st(s,e,t)),r=Cs(st(s,e,n)),o=Cs(st(t,n,s)),a=Cs(st(t,n,e));return!!(i!==r&&o!==a||i===0&&Rs(s,t,e)||r===0&&Rs(s,n,e)||o===0&&Rs(t,s,n)||a===0&&Rs(t,e,n))}function Rs(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Cs(s){return s>0?1:s<0?-1:0}function Zx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Ih(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Ur(s,e){return st(s.prev,s,s.next)<0?st(s,e,s.next)>=0&&st(s,s.prev,e)>=0:st(s,e,s.prev)<0||st(s,s.next,e)<0}function Jx(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Nh(s,e){const t=new da(s.i,s.x,s.y),n=new da(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function _c(s,e,t,n){const i=new da(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Hr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function da(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Kx(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Vn{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return Vn.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];vc(e),yc(n,e);let o=e.length;t.forEach(vc);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,yc(n,t[l]);const a=Fx.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function vc(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function yc(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class or extends Ke{constructor(e=new Yr([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new dt(i,3)),this.setAttribute("uv",new dt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1;let u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,_=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,p=t.UVGenerator!==void 0?t.UVGenerator:$x;t.amount!==void 0&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),u=t.amount);let T,b=!1,w,L,C,W;m&&(T=m.getSpacedPoints(h),b=!0,d=!1,w=m.computeFrenetFrames(h,!1),L=new S,C=new S,W=new S),d||(_=0,f=0,g=0,x=0);const ae=a.extractPoints(c);let Z=ae.shape;const v=ae.holes;if(!Vn.isClockWise(Z)){Z=Z.reverse();for(let q=0,te=v.length;q<te;q++){const Q=v[q];Vn.isClockWise(Q)&&(v[q]=Q.reverse())}}const D=Vn.triangulateShape(Z,v),F=Z;for(let q=0,te=v.length;q<te;q++){const Q=v[q];Z=Z.concat(Q)}function N(q,te,Q){return te||console.error("THREE.ExtrudeGeometry: vec does not exist"),te.clone().multiplyScalar(Q).add(q)}const O=Z.length,H=D.length;function K(q,te,Q){let ue,le,Me;const Te=q.x-te.x,Be=q.y-te.y,Ze=Q.x-q.x,Ye=Q.y-q.y,E=Te*Te+Be*Be,y=Te*Ye-Be*Ze;if(Math.abs(y)>Number.EPSILON){const V=Math.sqrt(E),ee=Math.sqrt(Ze*Ze+Ye*Ye),me=te.x-Be/V,G=te.y+Te/V,ve=Q.x-Ye/ee,xe=Q.y+Ze/ee,oe=((ve-me)*Ye-(xe-G)*Ze)/(Te*Ye-Be*Ze);ue=me+Te*oe-q.x,le=G+Be*oe-q.y;const ie=ue*ue+le*le;if(ie<=2)return new J(ue,le);Me=Math.sqrt(ie/2)}else{let V=!1;Te>Number.EPSILON?Ze>Number.EPSILON&&(V=!0):Te<-Number.EPSILON?Ze<-Number.EPSILON&&(V=!0):Math.sign(Be)===Math.sign(Ye)&&(V=!0),V?(ue=-Be,le=Te,Me=Math.sqrt(E)):(ue=Te,le=Be,Me=Math.sqrt(E/2))}return new J(ue/Me,le/Me)}const re=[];for(let q=0,te=F.length,Q=te-1,ue=q+1;q<te;q++,Q++,ue++)Q===te&&(Q=0),ue===te&&(ue=0),re[q]=K(F[q],F[Q],F[ue]);const k=[];let Y,se=re.concat();for(let q=0,te=v.length;q<te;q++){const Q=v[q];Y=[];for(let ue=0,le=Q.length,Me=le-1,Te=ue+1;ue<le;ue++,Me++,Te++)Me===le&&(Me=0),Te===le&&(Te=0),Y[ue]=K(Q[ue],Q[Me],Q[Te]);k.push(Y),se=se.concat(Y)}for(let q=0;q<_;q++){const te=q/_,Q=f*Math.cos(te*Math.PI/2),ue=g*Math.sin(te*Math.PI/2)+x;for(let le=0,Me=F.length;le<Me;le++){const Te=N(F[le],re[le],ue);ge(Te.x,Te.y,-Q)}for(let le=0,Me=v.length;le<Me;le++){const Te=v[le];Y=k[le];for(let Be=0,Ze=Te.length;Be<Ze;Be++){const Ye=N(Te[Be],Y[Be],ue);ge(Ye.x,Ye.y,-Q)}}}const pe=g+x;for(let q=0;q<O;q++){const te=d?N(Z[q],se[q],pe):Z[q];b?(C.copy(w.normals[0]).multiplyScalar(te.x),L.copy(w.binormals[0]).multiplyScalar(te.y),W.copy(T[0]).add(C).add(L),ge(W.x,W.y,W.z)):ge(te.x,te.y,0)}for(let q=1;q<=h;q++)for(let te=0;te<O;te++){const Q=d?N(Z[te],se[te],pe):Z[te];b?(C.copy(w.normals[q]).multiplyScalar(Q.x),L.copy(w.binormals[q]).multiplyScalar(Q.y),W.copy(T[q]).add(C).add(L),ge(W.x,W.y,W.z)):ge(Q.x,Q.y,u/h*q)}for(let q=_-1;q>=0;q--){const te=q/_,Q=f*Math.cos(te*Math.PI/2),ue=g*Math.sin(te*Math.PI/2)+x;for(let le=0,Me=F.length;le<Me;le++){const Te=N(F[le],re[le],ue);ge(Te.x,Te.y,u+Q)}for(let le=0,Me=v.length;le<Me;le++){const Te=v[le];Y=k[le];for(let Be=0,Ze=Te.length;Be<Ze;Be++){const Ye=N(Te[Be],Y[Be],ue);b?ge(Ye.x,Ye.y+T[h-1].y,T[h-1].x+Q):ge(Ye.x,Ye.y,u+Q)}}}_e(),U();function _e(){const q=i.length/3;if(d){let te=0,Q=O*te;for(let ue=0;ue<H;ue++){const le=D[ue];Se(le[2]+Q,le[1]+Q,le[0]+Q)}te=h+_*2,Q=O*te;for(let ue=0;ue<H;ue++){const le=D[ue];Se(le[0]+Q,le[1]+Q,le[2]+Q)}}else{for(let te=0;te<H;te++){const Q=D[te];Se(Q[2],Q[1],Q[0])}for(let te=0;te<H;te++){const Q=D[te];Se(Q[0]+O*h,Q[1]+O*h,Q[2]+O*h)}}n.addGroup(q,i.length/3-q,0)}function U(){const q=i.length/3;let te=0;Ge(F,te),te+=F.length;for(let Q=0,ue=v.length;Q<ue;Q++){const le=v[Q];Ge(le,te),te+=le.length}n.addGroup(q,i.length/3-q,1)}function Ge(q,te){let Q=q.length;for(;--Q>=0;){const ue=Q;let le=Q-1;le<0&&(le=q.length-1);for(let Me=0,Te=h+_*2;Me<Te;Me++){const Be=O*Me,Ze=O*(Me+1),Ye=te+ue+Be,E=te+le+Be,y=te+le+Ze,V=te+ue+Ze;he(Ye,E,y,V)}}}function ge(q,te,Q){l.push(q),l.push(te),l.push(Q)}function Se(q,te,Q){Pe(q),Pe(te),Pe(Q);const ue=i.length/3,le=p.generateTopUV(n,i,ue-3,ue-2,ue-1);be(le[0]),be(le[1]),be(le[2])}function he(q,te,Q,ue){Pe(q),Pe(te),Pe(ue),Pe(te),Pe(Q),Pe(ue);const le=i.length/3,Me=p.generateSideWallUV(n,i,le-6,le-3,le-2,le-1);be(Me[0]),be(Me[1]),be(Me[3]),be(Me[1]),be(Me[2]),be(Me[3])}function Pe(q){i.push(l[q*3+0]),i.push(l[q*3+1]),i.push(l[q*3+2])}function be(q){r.push(q.x),r.push(q.y)}}}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Qx(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ph[i.type]().fromJSON(i)),new or(n,e.options)}}const $x={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new J(r,o),new J(a,l),new J(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],g=e[i*3+2],x=e[r*3],_=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new J(o,1-l),new J(c,1-u),new J(d,1-g),new J(x,1-m)]:[new J(a,1-l),new J(h,1-u),new J(f,1-g),new J(_,1-m)]}};function Qx(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Oa extends Ke{constructor(e=new Yr([new J(0,.5),new J(-.5,-.5),new J(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new dt(i,3)),this.setAttribute("normal",new dt(r,3)),this.setAttribute("uv",new dt(o,2));function c(h){const u=i.length/3,d=h.extractPoints(t);let f=d.shape;const g=d.holes;Vn.isClockWise(f)===!1&&(f=f.reverse());for(let _=0,m=g.length;_<m;_++){const p=g[_];Vn.isClockWise(p)===!0&&(g[_]=p.reverse())}const x=Vn.triangulateShape(f,g);for(let _=0,m=g.length;_<m;_++){const p=g[_];f=f.concat(p)}for(let _=0,m=f.length;_<m;_++){const p=f[_];i.push(p.x,p.y,0),r.push(0,0,1),o.push(p.x,p.y)}for(let _=0,m=x.length;_<m;_++){const p=x[_],T=p[0]+u,b=p[1]+u,w=p[2]+u;n.push(T,b,w),l+=3}}}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return e_(t,e)}static fromJSON(e,t){const n=[];for(let i=0,r=e.shapes.length;i<r;i++){const o=t[e.shapes[i]];n.push(o)}return new Oa(n,e.curveSegments)}}function e_(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class Ba extends Ke{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new S,d=new S,f=[],g=[],x=[],_=[];for(let m=0;m<=n;m++){const p=[],T=m/n;let b=0;m==0&&o==0?b=.5/t:m==n&&l==Math.PI&&(b=-.5/t);for(let w=0;w<=t;w++){const L=w/t;u.x=-e*Math.cos(i+L*r)*Math.sin(o+T*a),u.y=e*Math.cos(o+T*a),u.z=e*Math.sin(i+L*r)*Math.sin(o+T*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),_.push(L+b,1-T),p.push(c++)}h.push(p)}for(let m=0;m<n;m++)for(let p=0;p<t;p++){const T=h[m][p+1],b=h[m][p],w=h[m+1][p],L=h[m+1][p+1];(m!==0||o>0)&&f.push(T,b,L),(m!==n-1||l<Math.PI)&&f.push(b,w,L)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(x,3)),this.setAttribute("uv",new dt(_,2))}static fromJSON(e){return new Ba(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class t_ extends xt{constructor(e){super(),this.type="ShadowMaterial",this.color=new ne(0),this.transparent=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this}}t_.prototype.isShadowMaterial=!0;class Zr extends xt{constructor(e){super(),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zn,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this}}Zr.prototype.isMeshStandardMaterial=!0;class di extends Zr{constructor(e){super(),this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return It(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.sheenColor=new ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=0,this.attenuationColor=new ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ne(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}di.prototype.isMeshPhysicalMaterial=!0;class n_ extends xt{constructor(e){super(),this.type="MeshPhongMaterial",this.color=new ne(16777215),this.specular=new ne(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zn,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=qs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this}}n_.prototype.isMeshPhongMaterial=!0;class i_ extends xt{constructor(e){super(),this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ne(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zn,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this}}i_.prototype.isMeshToonMaterial=!0;class r_ extends xt{constructor(e){super(),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zn,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}r_.prototype.isMeshNormalMaterial=!0;class s_ extends xt{constructor(e){super(),this.type="MeshLambertMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=qs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this}}s_.prototype.isMeshLambertMaterial=!0;class o_ extends xt{constructor(e){super(),this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new ne(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zn,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this}}o_.prototype.isMeshMatcapMaterial=!0;class a_ extends sr{constructor(e){super(),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}a_.prototype.isLineDashedMaterial=!0;const tt={arraySlice:function(s,e,t){return tt.isTypedArray(s)?new s.constructor(s.subarray(e,t!==void 0?t:s.length)):s.slice(e,t)},convertArray:function(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)},isTypedArray:function(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)},getKeyframeOrder:function(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n},sortedArray:function(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i},flattenJSON:function(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)},subclip:function(s,e,t,n,i=30){const r=s.clone();r.name=e;const o=[];for(let l=0;l<r.tracks.length;++l){const c=r.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const g=c.times[f]*i;if(!(g<t||g>=n)){u.push(c.times[f]);for(let x=0;x<h;++x)d.push(c.values[f*h+x])}}u.length!==0&&(c.times=tt.convertArray(u,c.times.constructor),c.values=tt.convertArray(d,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r},makeClipAdditive:function(s,e=0,t=s,n=30){n<=0&&(n=30);const i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){const a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=s.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const g=a.times.length-1;let x;if(r<=a.times[0]){const m=h,p=u-h;x=tt.arraySlice(a.values,m,p)}else if(r>=a.times[g]){const m=g*u+h,p=m+u-h;x=tt.arraySlice(a.values,m,p)}else{const m=a.createInterpolant(),p=h,T=u-h;m.evaluate(r),x=tt.arraySlice(m.resultBuffer,p,T)}l==="quaternion"&&new it().fromArray(x).normalize().conjugate().toArray(x);const _=c.times.length;for(let m=0;m<_;++m){const p=m*f+d;if(l==="quaternion")it.multiplyQuaternionsFlat(c.values,p,x,0,c.values,p);else{const T=f-d*2;for(let b=0;b<T;++b)c.values[p+b]-=x[b]}}}return s.blendMode=Jc,s}};class bn{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,e,r)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(i===void 0)return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,r,e)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}bn.prototype.beforeStart_=bn.prototype.copySampleValue_;bn.prototype.afterEnd_=bn.prototype.copySampleValue_;class l_ extends bn{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:zi,endingEnd:zi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ui:r=e,a=2*t-n;break;case zs:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ui:o=e,l=2*n-t;break;case zs:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),x=g*g,_=x*g,m=-d*_+2*d*x-d*g,p=(1+d)*_+(-1.5-2*d)*x+(-.5+d)*g+1,T=(-1-f)*_+(1.5+f)*x+.5*g,b=f*_-f*x;for(let w=0;w!==a;++w)r[w]=m*o[h+w]+p*o[c+w]+T*o[l+w]+b*o[u+w];return r}}class Fh extends bn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class c_ extends bn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class cn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=tt.convertArray(t,this.TimeBufferType),this.values=tt.convertArray(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:tt.convertArray(e.times,Array),values:tt.convertArray(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new c_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Fh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new l_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Nr:t=this.InterpolantFactoryMethodDiscrete;break;case Ki:t=this.InterpolantFactoryMethodLinear;break;case fo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Nr;case this.InterpolantFactoryMethodLinear:return Ki;case this.InterpolantFactoryMethodSmooth:return fo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=tt.arraySlice(n,r,o),this.values=tt.arraySlice(this.values,r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&tt.isTypedArray(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=tt.arraySlice(this.times),t=tt.arraySlice(this.values),n=this.getValueSize(),i=this.getInterpolation()===fo,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const x=t[u+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=tt.arraySlice(e,0,o),this.values=tt.arraySlice(t,0,o*n)):(this.times=e,this.values=t),this}clone(){const e=tt.arraySlice(this.times,0),t=tt.arraySlice(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=Ki;class ar extends cn{}ar.prototype.ValueTypeName="bool";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=Nr;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;class Oh extends cn{}Oh.prototype.ValueTypeName="color";class kr extends cn{}kr.prototype.ValueTypeName="number";class h_ extends bn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)it.slerpFlat(r,0,o,c-a,o,c,l);return r}}class oi extends cn{InterpolantFactoryMethodLinear(e){return new h_(this.times,this.values,this.getValueSize(),e)}}oi.prototype.ValueTypeName="quaternion";oi.prototype.DefaultInterpolation=Ki;oi.prototype.InterpolantFactoryMethodSmooth=void 0;class lr extends cn{}lr.prototype.ValueTypeName="string";lr.prototype.ValueBufferType=Array;lr.prototype.DefaultInterpolation=Nr;lr.prototype.InterpolantFactoryMethodLinear=void 0;lr.prototype.InterpolantFactoryMethodSmooth=void 0;class Gr extends cn{}Gr.prototype.ValueTypeName="vector";class fa{constructor(e,t=-1,n,i=wa){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=kt(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(d_(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(cn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=tt.getKeyframeOrder(l);l=tt.sortedArray(l,1,h),c=tt.sortedArray(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new kr(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,x){if(f.length!==0){const _=[],m=[];tt.flattenJSON(f,_,m,g),_.length!==0&&x.push(new u(d,_,m))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(const x in f){const _=[],m=[];for(let p=0;p!==d[g].morphTargets.length;++p){const T=d[g];_.push(T.time),m.push(T.morphTarget===x?1:0)}i.push(new kr(".morphTargetInfluence["+x+"]",_,m))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(Gr,f+".position",d,"pos",i),n(oi,f+".quaternion",d,"rot",i),n(Gr,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function u_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return kr;case"vector":case"vector2":case"vector3":case"vector4":return Gr;case"color":return Oh;case"quaternion":return oi;case"bool":case"boolean":return ar;case"string":return lr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function d_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=u_(s.type);if(s.times===void 0){const t=[],n=[];tt.flattenJSON(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const er={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class f_{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const p_=new f_;class Tn{constructor(e){this.manager=e!==void 0?e:p_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const xn={};class za extends Tn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=er.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(xn[e]!==void 0){xn[e].push({onLoad:t,onProgress:n,onError:i});return}xn[e]=[],xn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body.getReader===void 0)return c;const h=xn[e],u=c.body.getReader(),d=c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let x=0;const _=new ReadableStream({start(m){p();function p(){u.read().then(({done:T,value:b})=>{if(T)m.close();else{x+=b.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let L=0,C=h.length;L<C;L++){const W=h[L];W.onProgress&&W.onProgress(w)}m.enqueue(b),p()}})}}});return new Response(_)}else throw Error(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{er.add(e,c);const h=xn[e];delete xn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=xn[e];if(h===void 0)throw this.manager.itemError(e),c;delete xn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Bh extends Tn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=er.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Br("img");function l(){h(),er.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.substr(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class m_ extends Tn{constructor(e){super(e)}load(e,t,n,i){const r=new js,o=new Bh(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(h){r.images[c]=h,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}}class zh extends Tn{constructor(e){super(e)}load(e,t,n,i){const r=new pt,o=new Bh(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class ln extends We{constructor(e,t=1){super(),this.type="Light",this.color=new ne(e),this.intensity=t}dispose(){}copy(e){return super.copy(e),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}ln.prototype.isLight=!0;class g_ extends ln{constructor(e,t,n){super(e,n),this.type="HemisphereLight",this.position.copy(We.DefaultUp),this.updateMatrix(),this.groundColor=new ne(t)}copy(e){return ln.prototype.copy.call(this,e),this.groundColor.copy(e.groundColor),this}}g_.prototype.isHemisphereLight=!0;const Mc=new de,wc=new S,Sc=new S;class Ua{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ys,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;wc.setFromMatrixPosition(e.matrixWorld),t.position.copy(wc),Sc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sc),t.updateMatrixWorld(),Mc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(t.projectionMatrix),n.multiply(t.matrixWorldInverse)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Uh extends Ua{constructor(){super(new At(50,1,.5,500)),this.focus=1}updateMatrices(e){const t=this.camera,n=Or*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}Uh.prototype.isSpotLightShadow=!0;class Hh extends ln{constructor(e,t,n=0,i=Math.PI/3,r=0,o=1){super(e,t),this.type="SpotLight",this.position.copy(We.DefaultUp),this.updateMatrix(),this.target=new We,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.shadow=new Uh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}Hh.prototype.isSpotLight=!0;const bc=new de,_r=new S,qo=new S;class kh extends Ua{constructor(){super(new At(90,1,.5,500)),this._frameExtents=new J(4,2),this._viewportCount=6,this._viewports=[new Re(2,1,1,1),new Re(0,1,1,1),new Re(3,1,1,1),new Re(1,1,1,1),new Re(3,0,1,1),new Re(1,0,1,1)],this._cubeDirections=[new S(1,0,0),new S(-1,0,0),new S(0,0,1),new S(0,0,-1),new S(0,1,0),new S(0,-1,0)],this._cubeUps=[new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,0,1),new S(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),_r.setFromMatrixPosition(e.matrixWorld),n.position.copy(_r),qo.copy(n.position),qo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(qo),n.updateMatrixWorld(),i.makeTranslation(-_r.x,-_r.y,-_r.z),bc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bc)}}kh.prototype.isPointLightShadow=!0;class Gh extends ln{constructor(e,t,n=0,i=1){super(e,t),this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new kh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}Gh.prototype.isPointLight=!0;class Vh extends Ua{constructor(){super(new jr(-5,5,5,-5,.5,500))}}Vh.prototype.isDirectionalLightShadow=!0;class Ha extends ln{constructor(e,t){super(e,t),this.type="DirectionalLight",this.position.copy(We.DefaultUp),this.updateMatrix(),this.target=new We,this.shadow=new Vh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}Ha.prototype.isDirectionalLight=!0;class x_ extends ln{constructor(e,t){super(e,t),this.type="AmbientLight"}}x_.prototype.isAmbientLight=!0;class __ extends ln{constructor(e,t,n=10,i=10){super(e,t),this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}__.prototype.isRectAreaLight=!0;class Wh{constructor(){this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new S)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}}Wh.prototype.isSphericalHarmonics3=!0;class ka extends ln{constructor(e=new Wh,t=1){super(void 0,t),this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}ka.prototype.isLightProbe=!0;class Wn{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.substr(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class v_ extends Ke{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new this.constructor().copy(this)}toJSON(){const e=super.toJSON(this);return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}v_.prototype.isInstancedBufferGeometry=!0;class qh extends Tn{constructor(e){super(e),typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=er.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){er.add(e,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){i&&i(l),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}}qh.prototype.isImageBitmapLoader=!0;let Ps;const y_={getContext:function(){return Ps===void 0&&(Ps=new(window.AudioContext||window.webkitAudioContext)),Ps},setContext:function(s){Ps=s}};class M_ extends Tn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new za(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{const l=a.slice(0);y_.getContext().decodeAudioData(l,function(h){t(h)})}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}}class w_ extends ka{constructor(e,t,n=1){super(void 0,n);const i=new ne().set(e),r=new ne().set(t),o=new S(i.r,i.g,i.b),a=new S(r.r,r.g,r.b),l=Math.sqrt(Math.PI),c=l*Math.sqrt(.75);this.sh.coefficients[0].copy(o).add(a).multiplyScalar(l),this.sh.coefficients[1].copy(o).sub(a).multiplyScalar(c)}}w_.prototype.isHemisphereLightProbe=!0;class S_ extends ka{constructor(e,t=1){super(void 0,t);const n=new ne().set(e);this.sh.coefficients[0].set(n.r,n.g,n.b).multiplyScalar(2*Math.sqrt(Math.PI))}}S_.prototype.isAmbientLightProbe=!0;class b_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Tc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Tc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Tc(){return(typeof performance>"u"?Date:performance).now()}class T_ extends We{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source.stop(),this.source.onended=null,this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){if(this.detune=e,this.source.detune!==void 0)return this.isPlaying===!0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}class E_{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){it.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const o=this._workIndex*r;it.multiplyQuaternionsFlat(e,o,e,t,e,n),it.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const Ga="\\[\\]\\.:\\/",A_=new RegExp("["+Ga+"]","g"),Va="[^"+Ga+"]",L_="[^"+Ga.replace("\\.","")+"]",R_=/((?:WC+[\/:])*)/.source.replace("WC",Va),C_=/(WCOD+)?/.source.replace("WCOD",L_),P_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Va),D_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Va),I_=new RegExp("^"+R_+C_+P_+D_+"$"),N_=["material","materials","bones"];class F_{constructor(e,t,n){const i=n||qe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class qe{constructor(e,t,n){this.path=t,this.parsedPath=n||qe.parseTrackName(t),this.node=qe.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new qe.Composite(e,t,n):new qe(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(A_,"")}static parseTrackName(e){const t=I_.exec(e);if(!t)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);N_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(!t||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=qe.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(e.geometry.isBufferGeometry){if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}else{console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",this);return}}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}qe.Composite=F_;qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};qe.prototype.GetterByBindingType=[qe.prototype._getValue_direct,qe.prototype._getValue_array,qe.prototype._getValue_arrayElement,qe.prototype._getValue_toArray];qe.prototype.SetterByBindingTypeAndVersioning=[[qe.prototype._setValue_direct,qe.prototype._setValue_direct_setNeedsUpdate,qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[qe.prototype._setValue_array,qe.prototype._setValue_array_setNeedsUpdate,qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[qe.prototype._setValue_arrayElement,qe.prototype._setValue_arrayElement_setNeedsUpdate,qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[qe.prototype._setValue_fromArray,qe.prototype._setValue_fromArray_setNeedsUpdate,qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class O_{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:zi,endingEnd:zi};for(let c=0;c!==o;++c){const h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=fd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;if(l<0||n===0)return;this._startTime=null,t=n*l}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Jc:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case wa:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const o=n===pd;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===dd){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Ui,i.endingEnd=Ui):(e?i.endingStart=this.zeroSlopeAtStart?Ui:zi:i.endingStart=zs,t?i.endingEnd=this.zeroSlopeAtEnd?Ui:zi:i.endingEnd=zs)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}class B_ extends ci{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const x=t&&t._propertyBindings[u].binding.parsedPath;g=new E_(qe.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Fh(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let o=typeof e=="string"?fa.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=wa),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new O_(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?fa.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}B_.prototype._controlInterpolantsResultBuffer=new Float32Array(1);class z_ extends rr{constructor(e,t,n=1){super(e,t),this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}z_.prototype.isInstancedInterleavedBuffer=!0;const In=new S,Ds=new de,Xo=new de;class U_ extends no{constructor(e){const t=Xh(e),n=new Ke,i=[],r=[],o=new ne(0,0,1),a=new ne(0,1,0);for(let c=0;c<t.length;c++){const h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(o.r,o.g,o.b),r.push(a.r,a.g,a.b))}n.setAttribute("position",new dt(i,3)),n.setAttribute("color",new dt(r,3));const l=new sr({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.type="SkeletonHelper",this.isSkeletonHelper=!0,this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Xo.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){const a=t[r];a.parent&&a.parent.isBone&&(Ds.multiplyMatrices(Xo,a.matrixWorld),In.setFromMatrixPosition(Ds),i.setXYZ(o,In.x,In.y,In.z),Ds.multiplyMatrices(Xo,a.parent.matrixWorld),In.setFromMatrixPosition(Ds),i.setXYZ(o+1,In.x,In.y,In.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}}function Xh(s){const e=[];s&&s.isBone&&e.push(s);for(let t=0;t<s.children.length;t++)e.push.apply(e,Xh(s.children[t]));return e}class H_ extends no{constructor(e=10,t=10,n=4473924,i=8947848){n=new ne(n),i=new ne(i);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,g=-a;d<=t;d++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const x=d===r?n:i;x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3}const h=new Ke;h.setAttribute("position",new dt(l,3)),h.setAttribute("color",new dt(c,3));const u=new sr({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}}const k_=new Float32Array(1);new Int32Array(k_.buffer);Wt.create=function(s,e){return console.log("THREE.Curve.create() has been deprecated"),s.prototype=Object.create(Wt.prototype),s.prototype.constructor=s,s.prototype.getPoint=e,s};ha.prototype.fromPoints=function(s){return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(s)};H_.prototype.setColors=function(){console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")};U_.prototype.update=function(){console.error("THREE.SkeletonHelper: update() no longer needs to be called.")};Tn.prototype.extractUrlBase=function(s){return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),Wn.extractUrlBase(s)};Tn.Handlers={add:function(){console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")},get:function(){console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")}};Ft.prototype.center=function(s){return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(s)};Ft.prototype.empty=function(){return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty()};Ft.prototype.isIntersectionBox=function(s){return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(s)};Ft.prototype.isIntersectionSphere=function(s){return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(s)};Ft.prototype.size=function(s){return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(s)};ui.prototype.empty=function(){return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),this.isEmpty()};Ys.prototype.setFromMatrix=function(s){return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."),this.setFromProjectionMatrix(s)};St.prototype.flattenToArrayOffset=function(s,e){return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(s,e)};St.prototype.multiplyVector3=function(s){return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),s.applyMatrix3(this)};St.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")};St.prototype.applyToBufferAttribute=function(s){return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."),s.applyMatrix3(this)};St.prototype.applyToVector3Array=function(){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")};St.prototype.getInverse=function(s){return console.warn("THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(s).invert()};de.prototype.extractPosition=function(s){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(s)};de.prototype.flattenToArrayOffset=function(s,e){return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(s,e)};de.prototype.getPosition=function(){return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),new S().setFromMatrixColumn(this,3)};de.prototype.setRotationFromQuaternion=function(s){return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(s)};de.prototype.multiplyToArray=function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")};de.prototype.multiplyVector3=function(s){return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};de.prototype.multiplyVector4=function(s){return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};de.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")};de.prototype.rotateAxis=function(s){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),s.transformDirection(this)};de.prototype.crossVector=function(s){return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};de.prototype.translate=function(){console.error("THREE.Matrix4: .translate() has been removed.")};de.prototype.rotateX=function(){console.error("THREE.Matrix4: .rotateX() has been removed.")};de.prototype.rotateY=function(){console.error("THREE.Matrix4: .rotateY() has been removed.")};de.prototype.rotateZ=function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")};de.prototype.rotateByAxis=function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")};de.prototype.applyToBufferAttribute=function(s){return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};de.prototype.applyToVector3Array=function(){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")};de.prototype.makeFrustum=function(s,e,t,n,i,r){return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(s,e,n,t,i,r)};de.prototype.getInverse=function(s){return console.warn("THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(s).invert()};vn.prototype.isIntersectionLine=function(s){return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(s)};it.prototype.multiplyVector3=function(s){return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),s.applyQuaternion(this)};it.prototype.inverse=function(){return console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."),this.invert()};nr.prototype.isIntersectionBox=function(s){return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(s)};nr.prototype.isIntersectionPlane=function(s){return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(s)};nr.prototype.isIntersectionSphere=function(s){return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(s)};gt.prototype.area=function(){return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea()};gt.prototype.barycoordFromPoint=function(s,e){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(s,e)};gt.prototype.midpoint=function(s){return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(s)};gt.prototypenormal=function(s){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(s)};gt.prototype.plane=function(s){return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(s)};gt.barycoordFromPoint=function(s,e,t,n,i){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),gt.getBarycoord(s,e,t,n,i)};gt.normal=function(s,e,t,n){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),gt.getNormal(s,e,t,n)};Yr.prototype.extractAllPoints=function(s){return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(s)};Yr.prototype.extrude=function(s){return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new or(this,s)};Yr.prototype.makeGeometry=function(s){return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new Oa(this,s)};J.prototype.fromAttribute=function(s,e,t){return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(s,e,t)};J.prototype.distanceToManhattan=function(s){return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(s)};J.prototype.lengthManhattan=function(){return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};S.prototype.setEulerFromRotationMatrix=function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")};S.prototype.setEulerFromQuaternion=function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")};S.prototype.getPositionFromMatrix=function(s){return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(s)};S.prototype.getScaleFromMatrix=function(s){return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(s)};S.prototype.getColumnFromMatrix=function(s,e){return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(e,s)};S.prototype.applyProjection=function(s){return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(s)};S.prototype.fromAttribute=function(s,e,t){return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(s,e,t)};S.prototype.distanceToManhattan=function(s){return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(s)};S.prototype.lengthManhattan=function(){return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};Re.prototype.fromAttribute=function(s,e,t){return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(s,e,t)};Re.prototype.lengthManhattan=function(){return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};We.prototype.getChildByName=function(s){return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(s)};We.prototype.renderDepth=function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")};We.prototype.translate=function(s,e){return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(e,s)};We.prototype.getWorldRotation=function(){console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")};We.prototype.applyMatrix=function(s){return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(s)};Object.defineProperties(We.prototype,{eulerOrder:{get:function(){return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order},set:function(s){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=s}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}});bt.prototype.setDrawMode=function(){console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")};Object.defineProperties(bt.prototype,{drawMode:{get:function(){return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."),md},set:function(){console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}});Qs.prototype.initBones=function(){console.error("THREE.SkinnedMesh: initBones() has been removed.")};At.prototype.setLens=function(s,e){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),e!==void 0&&(this.filmGauge=e),this.setFocalLength(s)};Object.defineProperties(ln.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(s){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=s}},shadowCameraLeft:{set:function(s){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=s}},shadowCameraRight:{set:function(s){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=s}},shadowCameraTop:{set:function(s){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=s}},shadowCameraBottom:{set:function(s){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=s}},shadowCameraNear:{set:function(s){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=s}},shadowCameraFar:{set:function(s){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=s}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(s){console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=s}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(s){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=s}},shadowMapHeight:{set:function(s){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=s}}});Object.defineProperties(ut.prototype,{length:{get:function(){return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length}},dynamic:{get:function(){return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.usage===Us},set:function(){console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.setUsage(Us)}}});ut.prototype.setDynamic=function(s){return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(s===!0?Us:Fr),this};ut.prototype.copyIndicesArray=function(){console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")},ut.prototype.setArray=function(){console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};Ke.prototype.addIndex=function(s){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(s)};Ke.prototype.addAttribute=function(s,e){return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."),!(e&&e.isBufferAttribute)&&!(e&&e.isInterleavedBufferAttribute)?(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.setAttribute(s,new ut(arguments[1],arguments[2]))):s==="index"?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(e),this):this.setAttribute(s,e)};Ke.prototype.addDrawCall=function(s,e,t){t!==void 0&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(s,e)};Ke.prototype.clearDrawCalls=function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups()};Ke.prototype.computeOffsets=function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")};Ke.prototype.removeAttribute=function(s){return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."),this.deleteAttribute(s)};Ke.prototype.applyMatrix=function(s){return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(s)};Object.defineProperties(Ke.prototype,{drawcalls:{get:function(){return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups}},offsets:{get:function(){return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups}}});rr.prototype.setDynamic=function(s){return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(s===!0?Us:Fr),this};rr.prototype.setArray=function(){console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};or.prototype.getArrays=function(){console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.")};or.prototype.addShapeList=function(){console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.")};or.prototype.addShape=function(){console.error("THREE.ExtrudeGeometry: .addShape() has been removed.")};$s.prototype.dispose=function(){console.error("THREE.Scene: .dispose() has been removed.")};Object.defineProperties(xt.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},overdraw:{get:function(){console.warn("THREE.Material: .overdraw has been removed.")},set:function(){console.warn("THREE.Material: .overdraw has been removed.")}},wrapRGB:{get:function(){return console.warn("THREE.Material: .wrapRGB has been removed."),new ne}},shading:{get:function(){console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.")},set:function(s){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=s===qc}},stencilMask:{get:function(){return console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask},set:function(s){console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask=s}},vertexTangents:{get:function(){console.warn("THREE."+this.type+": .vertexTangents has been removed.")},set:function(){console.warn("THREE."+this.type+": .vertexTangents has been removed.")}}});Object.defineProperties(Sn.prototype,{derivatives:{get:function(){return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives},set:function(s){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=s}}});je.prototype.clearTarget=function(s,e,t,n){console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(s),this.clear(e,t,n)};je.prototype.animate=function(s){console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(s)};je.prototype.getCurrentRenderTarget=function(){return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget()};je.prototype.getMaxAnisotropy=function(){return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy()};je.prototype.getPrecision=function(){return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision};je.prototype.resetGLState=function(){return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset()};je.prototype.supportsFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float")};je.prototype.supportsHalfFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float")};je.prototype.supportsStandardDerivatives=function(){return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives")};je.prototype.supportsCompressedTextureS3TC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc")};je.prototype.supportsCompressedTexturePVRTC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc")};je.prototype.supportsBlendMinMax=function(){return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax")};je.prototype.supportsVertexTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures};je.prototype.supportsInstancedArrays=function(){return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays")};je.prototype.enableScissorTest=function(s){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(s)};je.prototype.initMaterial=function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")};je.prototype.addPrePlugin=function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")};je.prototype.addPostPlugin=function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")};je.prototype.updateShadowMap=function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")};je.prototype.setFaceCulling=function(){console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")};je.prototype.allocTextureUnit=function(){console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")};je.prototype.setTexture=function(){console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")};je.prototype.setTexture2D=function(){console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")};je.prototype.setTextureCube=function(){console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")};je.prototype.getActiveMipMapLevel=function(){return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel()};Object.defineProperties(je.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(s){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=s}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(s){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=s}},shadowMapCullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}},context:{get:function(){return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext()}},vr:{get:function(){return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),this.xr}},gammaInput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."),!1},set:function(){console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")}},gammaOutput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),!1},set:function(s){console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),this.outputEncoding=s===!0?He:Rt}},toneMappingWhitePoint:{get:function(){return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."),1},set:function(){console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")}},gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});Object.defineProperties(yh.prototype,{cullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},renderSingleSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}});Object.defineProperties(Gt.prototype,{wrapS:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS},set:function(s){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=s}},wrapT:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT},set:function(s){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=s}},magFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter},set:function(s){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=s}},minFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter},set:function(s){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=s}},anisotropy:{get:function(){return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy},set:function(s){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=s}},offset:{get:function(){return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset},set:function(s){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=s}},repeat:{get:function(){return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat},set:function(s){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=s}},format:{get:function(){return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format},set:function(s){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=s}},type:{get:function(){return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type},set:function(s){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=s}},generateMipmaps:{get:function(){return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps},set:function(s){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=s}}});T_.prototype.load=function(s){console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");const e=this;return new M_().load(s,function(n){e.setBuffer(n)}),this};Aa.prototype.updateCubeMap=function(s,e){return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(s,e)};Aa.prototype.clear=function(s,e,t,n){return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."),this.renderTarget.clear(s,e,t,n)};hi.crossOrigin=void 0;hi.loadTexture=function(s,e,t,n){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");const i=new zh;i.setCrossOrigin(this.crossOrigin);const r=i.load(s,t,void 0,n);return e&&(r.mapping=e),r};hi.loadTextureCube=function(s,e,t,n){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");const i=new m_;i.setCrossOrigin(this.crossOrigin);const r=i.load(s,t,void 0,n);return e&&(r.mapping=e),r};hi.loadCompressedTexture=function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")};hi.loadCompressedTextureCube=function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ht}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ht);class G_ extends Tn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new X_(t)}),this.register(function(t){return new $_(t)}),this.register(function(t){return new Q_(t)}),this.register(function(t){return new j_(t)}),this.register(function(t){return new Y_(t)}),this.register(function(t){return new Z_(t)}),this.register(function(t){return new J_(t)}),this.register(function(t){return new K_(t)}),this.register(function(t){return new W_(t)}),this.register(function(t){return new ev(t)})}load(e,t,n,i){const r=this;let o;this.resourcePath!==""?o=this.resourcePath:this.path!==""?o=this.path:o=Wn.extractUrlBase(e),this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new za(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={};if(typeof e=="string")r=e;else if(Wn.decodeText(new Uint8Array(e,0,4))===jh){try{o[Oe.KHR_BINARY_GLTF]=new tv(e)}catch(u){i&&i(u);return}r=o[Oe.KHR_BINARY_GLTF].content}else r=Wn.decodeText(new Uint8Array(e));const l=JSON.parse(r);if(l.asset===void 0||l.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new fv(l,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);a[u.name]=u,o[u.name]=!0}if(l.extensionsUsed)for(let h=0;h<l.extensionsUsed.length;++h){const u=l.extensionsUsed[h],d=l.extensionsRequired||[];switch(u){case Oe.KHR_MATERIALS_UNLIT:o[u]=new q_;break;case Oe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:o[u]=new rv;break;case Oe.KHR_DRACO_MESH_COMPRESSION:o[u]=new nv(l,this.dracoLoader);break;case Oe.KHR_TEXTURE_TRANSFORM:o[u]=new iv;break;case Oe.KHR_MESH_QUANTIZATION:o[u]=new sv;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function V_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Oe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression"};class W_{constructor(e){this.parser=e,this.name=Oe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new ne(16777215);l.color!==void 0&&h.fromArray(l.color);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ha(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Gh(h),c.distance=u;break;case"spot":c=new Hh(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class q_{constructor(){this.name=Oe.KHR_MATERIALS_UNLIT}getMaterialType(){return Jt}extendParams(e,t,n){const i=[];e.color=new ne(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.fromArray(o),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture))}return Promise.all(i)}}class X_{constructor(e){this.parser=e,this.name=Oe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:di}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new J(a,a)}return Promise.all(r)}}class j_{constructor(e){this.parser=e,this.name=Oe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:di}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ne(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];return o.sheenColorFactor!==void 0&&t.sheenColor.fromArray(o.sheenColorFactor),o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class Y_{constructor(e){this.parser=e,this.name=Oe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:di}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class Z_{constructor(e){this.parser=e,this.name=Oe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:di}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ne(a[0],a[1],a[2]),Promise.all(r)}}class J_{constructor(e){this.parser=e,this.name=Oe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:di}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class K_{constructor(e){this.parser=e,this.name=Oe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:di}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ne(a[0],a[1],a[2]),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture).then(function(l){l.encoding=He})),Promise.all(r)}}class $_{constructor(e){this.parser=e,this.name=Oe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=n.images[r.source],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o,a)}}class Q_{constructor(e){this.parser=e,this.name=Oe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class ev{constructor(e){this.name=Oe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return Promise.all([r,o.ready]).then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new ArrayBuffer(h*u),f=new Uint8Array(a[0],l,c);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,i.mode,i.filter),d})}else return null}}const jh="glTF",vr=12,Ec={JSON:1313821514,BIN:5130562};class tv{constructor(e){this.name=Oe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,vr);if(this.header={magic:Wn.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==jh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-vr,i=new DataView(e,vr);let r=0;for(;r<n;){const o=i.getUint32(r,!0);r+=4;const a=i.getUint32(r,!0);if(r+=4,a===Ec.JSON){const l=new Uint8Array(e,vr+r,o);this.content=Wn.decodeText(l)}else if(a===Ec.BIN){const l=vr+r;this.body=e.slice(l,l+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class nv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Oe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=ma[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=ma[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Vr[d.componentType];c[u]=f,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u){i.decodeDracoFile(h,function(d){for(const f in d.attributes){const g=d.attributes[f],x=l[f];x!==void 0&&(g.normalized=x)}u(d)},a,c)})})}}class iv{constructor(){this.name=Oe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class pa extends Zr{constructor(e){super(),this.isGLTFSpecularGlossinessMaterial=!0;const t=["#ifdef USE_SPECULARMAP","	uniform sampler2D specularMap;","#endif"].join(`
`),n=["#ifdef USE_GLOSSINESSMAP","	uniform sampler2D glossinessMap;","#endif"].join(`
`),i=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","	vec4 texelSpecular = texture2D( specularMap, vUv );","	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","	specularFactor *= texelSpecular.rgb;","#endif"].join(`
`),r=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","	vec4 texelGlossiness = texture2D( glossinessMap, vUv );","	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","	glossinessFactor *= texelGlossiness.a;","#endif"].join(`
`),o=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );","vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );","float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );","material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.","material.roughness += geometryRoughness;","material.roughness = min( material.roughness, 1.0 );","material.specularColor = specularFactor;"].join(`
`),a={specular:{value:new ne().setHex(16777215)},glossiness:{value:1},specularMap:{value:null},glossinessMap:{value:null}};this._extraUniforms=a,this.onBeforeCompile=function(l){for(const c in a)l.uniforms[c]=a[c];l.fragmentShader=l.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;").replace("uniform float metalness;","uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>",t).replace("#include <metalnessmap_pars_fragment>",n).replace("#include <roughnessmap_fragment>",i).replace("#include <metalnessmap_fragment>",r).replace("#include <lights_physical_fragment>",o)},Object.defineProperties(this,{specular:{get:function(){return a.specular.value},set:function(l){a.specular.value=l}},specularMap:{get:function(){return a.specularMap.value},set:function(l){a.specularMap.value=l,l?this.defines.USE_SPECULARMAP="":delete this.defines.USE_SPECULARMAP}},glossiness:{get:function(){return a.glossiness.value},set:function(l){a.glossiness.value=l}},glossinessMap:{get:function(){return a.glossinessMap.value},set:function(l){a.glossinessMap.value=l,l?(this.defines.USE_GLOSSINESSMAP="",this.defines.USE_UV=""):(delete this.defines.USE_GLOSSINESSMAP,delete this.defines.USE_UV)}}}),delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this.setValues(e)}copy(e){return super.copy(e),this.specularMap=e.specularMap,this.specular.copy(e.specular),this.glossinessMap=e.glossinessMap,this.glossiness=e.glossiness,delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this}}class rv{constructor(){this.name=Oe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,this.specularGlossinessParams=["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","normalMapType","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity","refractionRatio"]}getMaterialType(){return pa}extendParams(e,t,n){const i=t.extensions[this.name];e.color=new ne(1,1,1),e.opacity=1;const r=[];if(Array.isArray(i.diffuseFactor)){const o=i.diffuseFactor;e.color.fromArray(o),e.opacity=o[3]}if(i.diffuseTexture!==void 0&&r.push(n.assignTexture(e,"map",i.diffuseTexture)),e.emissive=new ne(0,0,0),e.glossiness=i.glossinessFactor!==void 0?i.glossinessFactor:1,e.specular=new ne(1,1,1),Array.isArray(i.specularFactor)&&e.specular.fromArray(i.specularFactor),i.specularGlossinessTexture!==void 0){const o=i.specularGlossinessTexture;r.push(n.assignTexture(e,"glossinessMap",o)),r.push(n.assignTexture(e,"specularMap",o))}return Promise.all(r)}createMaterial(e){const t=new pa(e);return t.fog=!0,t.color=e.color,t.map=e.map===void 0?null:e.map,t.lightMap=null,t.lightMapIntensity=1,t.aoMap=e.aoMap===void 0?null:e.aoMap,t.aoMapIntensity=1,t.emissive=e.emissive,t.emissiveIntensity=1,t.emissiveMap=e.emissiveMap===void 0?null:e.emissiveMap,t.bumpMap=e.bumpMap===void 0?null:e.bumpMap,t.bumpScale=1,t.normalMap=e.normalMap===void 0?null:e.normalMap,t.normalMapType=Zn,e.normalScale&&(t.normalScale=e.normalScale),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.specularMap=e.specularMap===void 0?null:e.specularMap,t.specular=e.specular,t.glossinessMap=e.glossinessMap===void 0?null:e.glossinessMap,t.glossiness=e.glossiness,t.alphaMap=null,t.envMap=e.envMap===void 0?null:e.envMap,t.envMapIntensity=1,t.refractionRatio=.98,t}}class sv{constructor(){this.name=Oe.KHR_MESH_QUANTIZATION}}class ai extends bn{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}}ai.prototype.beforeStart_=ai.prototype.copySampleValue_;ai.prototype.afterEnd_=ai.prototype.copySampleValue_;ai.prototype.interpolate_=function(s,e,t,n){const i=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=o*2,l=o*3,c=n-e,h=(t-e)/c,u=h*h,d=u*h,f=s*l,g=f-l,x=-2*d+3*u,_=d-u,m=1-x,p=_-u+h;for(let T=0;T!==o;T++){const b=r[g+T+o],w=r[g+T+a]*c,L=r[f+T+o],C=r[f+T]*c;i[T]=m*b+p*w+x*L+_*C}return i};const ov=new it;class av extends ai{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return ov.fromArray(r).normalize().toArray(r),r}}const _n={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Vr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ac={9728:ft,9729:yt,9984:na,9985:Zc,9986:ia,9987:tr},Lc={33071:Nt,33648:Bs,10497:Zi},Rc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ma={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Nn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},lv={CUBICSPLINE:void 0,LINEAR:Ki,STEP:Nr},jo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function cv(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Zr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qn})),s.DefaultMaterial}function yr(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ni(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function hv(s,e,t){let n=!1,i=!1;for(let a=0,l=e.length;a<l;a++){const c=e[a];if(c.POSITION!==void 0&&(n=!0),c.NORMAL!==void 0&&(i=!0),n&&i)break}if(!n&&!i)return Promise.resolve(s);const r=[],o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];if(n){const h=c.POSITION!==void 0?t.getDependency("accessor",c.POSITION):s.attributes.position;r.push(h)}if(i){const h=c.NORMAL!==void 0?t.getDependency("accessor",c.NORMAL):s.attributes.normal;o.push(h)}}return Promise.all([Promise.all(r),Promise.all(o)]).then(function(a){const l=a[0],c=a[1];return n&&(s.morphAttributes.position=l),i&&(s.morphAttributes.normal=c),s.morphTargetsRelative=!0,s})}function uv(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function dv(s){const e=s.extensions&&s.extensions[Oe.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+Cc(e.attributes):t=s.indices+":"+Cc(s.attributes)+":"+s.mode,t}function Cc(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function ga(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}class fv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new V_,this.associations=new Map,this.primitiveCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.textureCache={},this.nodeNamesUsed={},typeof createImageBitmap<"u"&&/Firefox|^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!1?this.textureLoader=new qh(this.options.manager):this.textureLoader=new zh(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new za(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};yr(r,a,i),ni(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this.loadNode(t);break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this.loadAnimation(t);break;case"camera":i=this.loadCamera(t);break;default:throw new Error("Unknown type: "+e)}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Oe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Wn.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0)return Promise.resolve(null);const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Rc[i.type],c=Vr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let x,_;if(f&&f!==u){const m=Math.floor(d/f),p="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let T=t.cache.get(p);T||(x=new c(a,m*f,i.count*f/h),T=new rr(x,f/h),t.cache.add(p,T)),_=new Qi(T,l,d%f/h,g)}else a===null?x=new c(i.count*l):x=new c(a,d,i.count*l),_=new ut(x,l,g);if(i.sparse!==void 0){const m=Rc.SCALAR,p=Vr[i.sparse.indices.componentType],T=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,w=new p(o[1],T,i.sparse.count*m),L=new c(o[2],b,i.sparse.count*l);a!==null&&(_=new ut(_.array.slice(),_.itemSize,_.normalized));for(let C=0,W=w.length;C<W;C++){const ae=w[C];if(_.setX(ae,L[C*l]),l>=2&&_.setY(ae,L[C*l+1]),l>=3&&_.setZ(ae,L[C*l+2]),l>=4&&_.setW(ae,L[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return _})}loadTexture(e){const t=this.json,n=this.options,i=t.textures[e],r=t.images[i.source];let o=this.textureLoader;if(r.uri){const a=n.manager.getHandler(r.uri);a!==null&&(o=a)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,o=this.options,a=r.textures[e],l=(t.uri||t.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=self.URL||self.webkitURL;let h=t.uri||"",u=!1;if(t.bufferView!==void 0)h=i.getDependency("bufferView",t.bufferView).then(function(f){u=!0;const g=new Blob([f],{type:t.mimeType});return h=c.createObjectURL(g),h});else if(t.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(h).then(function(f){return new Promise(function(g,x){let _=g;n.isImageBitmapLoader===!0&&(_=function(m){const p=new pt(m);p.needsUpdate=!0,g(p)}),n.load(Wn.resolveURL(f,o.path),_,void 0,x)})}).then(function(f){u===!0&&c.revokeObjectURL(h),f.flipY=!1,a.name&&(f.name=a.name);const x=(r.samplers||{})[a.sampler]||{};return f.magFilter=Ac[x.magFilter]||yt,f.minFilter=Ac[x.minFilter]||tr,f.wrapS=Lc[x.wrapS]||Zi,f.wrapT=Lc[x.wrapT]||Zi,i.associations.set(f,{textures:e}),f}).catch(function(){return console.error("THREE.GLTFLoader: Couldn't load texture",h),null});return this.textureCache[l]=d,d}assignTexture(e,t,n){const i=this;return this.getDependency("texture",n.index).then(function(r){if(n.texCoord!==void 0&&n.texCoord!=0&&!(t==="aoMap"&&n.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),i.extensions[Oe.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Oe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const a=i.associations.get(r);r=i.extensions[Oe.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),i.associations.set(r,a)}}return e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Pa,xt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new sr,xt.prototype.copy.call(l,n),l.color.copy(n.color),this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";n.isGLTFSpecularGlossinessMaterial&&(a+="specular-glossiness:"),i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}n.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=n}getMaterialType(){return Zr}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[Oe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){const u=i[Oe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else if(l[Oe.KHR_MATERIALS_UNLIT]){const u=i[Oe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new ne(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.fromArray(d),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=an);const h=r.alphaMode||jo.OPAQUE;if(h===jo.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===jo.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Jt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new J(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}return r.occlusionTexture!==void 0&&o!==Jt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Jt&&(a.emissive=new ne().fromArray(r.emissiveFactor)),r.emissiveTexture!==void 0&&o!==Jt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture)),Promise.all(c).then(function(){let u;return o===pa?u=i[Oe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(a):u=new o(a),r.name&&(u.name=r.name),u.map&&(u.map.encoding=He),u.emissiveMap&&(u.emissiveMap.encoding=He),ni(u,r),t.associations.set(u,{materials:e}),r.extensions&&yr(i,u,r),u})}createUniqueName(e){const t=qe.sanitizeNodeName(e||"");let n=t;for(let i=1;this.nodeNamesUsed[n];++i)n=t+"_"+i;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[Oe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Pc(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=dv(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[Oe.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Pc(new Ke,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?cv(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const x=h[f],_=o[f];let m;const p=c[f];if(_.mode===_n.TRIANGLES||_.mode===_n.TRIANGLE_STRIP||_.mode===_n.TRIANGLE_FAN||_.mode===void 0)m=r.isSkinnedMesh===!0?new Qs(x,p):new bt(x,p),m.isSkinnedMesh===!0&&!m.geometry.attributes.skinWeight.normalized&&m.normalizeSkinWeights(),_.mode===_n.TRIANGLE_STRIP?m.geometry=Dc(m.geometry,gd):_.mode===_n.TRIANGLE_FAN&&(m.geometry=Dc(m.geometry,Kc));else if(_.mode===_n.LINES)m=new no(x,p);else if(_.mode===_n.LINE_STRIP)m=new to(x,p);else if(_.mode===_n.LINE_LOOP)m=new Th(x,p);else if(_.mode===_n.POINTS)m=new Eh(x,p);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+_.mode);Object.keys(m.geometry.morphAttributes).length>0&&uv(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),ni(m,r),_.extensions&&yr(i,m,_),t.assignFinalMaterial(m),u.push(m)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return u[0];const d=new On;t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new At(Nd.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new jr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ni(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n={joints:t.joints};return t.inverseBindMatrices===void 0?Promise.resolve(n):this.getDependency("accessor",t.inverseBindMatrices).then(function(i){return n.inverseBindMatrices=i,n})}loadAnimation(e){const n=this.json.animations[e],i=[],r=[],o=[],a=[],l=[];for(let c=0,h=n.channels.length;c<h;c++){const u=n.channels[c],d=n.samplers[u.sampler],f=u.target,g=f.node!==void 0?f.node:f.id,x=n.parameters!==void 0?n.parameters[d.input]:d.input,_=n.parameters!==void 0?n.parameters[d.output]:d.output;i.push(this.getDependency("node",g)),r.push(this.getDependency("accessor",x)),o.push(this.getDependency("accessor",_)),a.push(d),l.push(f)}return Promise.all([Promise.all(i),Promise.all(r),Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2],f=c[3],g=c[4],x=[];for(let m=0,p=h.length;m<p;m++){const T=h[m],b=u[m],w=d[m],L=f[m],C=g[m];if(T===void 0)continue;T.updateMatrix(),T.matrixAutoUpdate=!0;let W;switch(Nn[C.path]){case Nn.weights:W=kr;break;case Nn.rotation:W=oi;break;case Nn.position:case Nn.scale:default:W=Gr;break}const ae=T.name?T.name:T.uuid,Z=L.interpolation!==void 0?lv[L.interpolation]:Ki,v=[];Nn[C.path]===Nn.weights?T.traverse(function(D){D.morphTargetInfluences&&v.push(D.name?D.name:D.uuid)}):v.push(ae);let R=w.array;if(w.normalized){const D=ga(R.constructor),F=new Float32Array(R.length);for(let N=0,O=R.length;N<O;N++)F[N]=R[N]*D;R=F}for(let D=0,F=v.length;D<F;D++){const N=new W(v[D]+"."+Nn[C.path],b.array,R,Z);L.interpolation==="CUBICSPLINE"&&(N.createInterpolant=function(H){const K=this instanceof oi?av:ai;return new K(this.times,this.values,this.getValueSize()/3,H)},N.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),x.push(N)}}const _=n.name?n.name:"animation_"+e;return new fa(_,void 0,x)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this.extensions,i=this,r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"";return function(){const a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),Promise.all(a)}().then(function(a){let l;if(r.isBone===!0?l=new Ca:a.length>1?l=new On:a.length===1?l=a[0]:l=new We,l!==a[0])for(let c=0,h=a.length;c<h;c++)l.add(a[c]);if(r.name&&(l.userData.name=r.name,l.name=o),ni(l,r),r.extensions&&yr(n,l,r),r.matrix!==void 0){const c=new de;c.fromArray(r.matrix),l.applyMatrix4(c)}else r.translation!==void 0&&l.position.fromArray(r.translation),r.rotation!==void 0&&l.quaternion.fromArray(r.rotation),r.scale!==void 0&&l.scale.fromArray(r.scale);return i.associations.has(l)||i.associations.set(l,{}),i.associations.get(l).nodes=e,l})}loadScene(e){const t=this.json,n=this.extensions,i=this.json.scenes[e],r=this,o=new On;i.name&&(o.name=r.createUniqueName(i.name)),ni(o,i),i.extensions&&yr(n,o,i);const a=i.nodes||[],l=[];for(let c=0,h=a.length;c<h;c++)l.push(Yh(a[c],o,t,r));return Promise.all(l).then(function(){const c=h=>{const u=new Map;for(const[d,f]of r.associations)(d instanceof xt||d instanceof pt)&&u.set(d,f);return h.traverse(d=>{const f=r.associations.get(d);f!=null&&u.set(d,f)}),u};return r.associations=c(o),o})}}function Yh(s,e,t,n){const i=t.nodes[s];return n.getDependency("node",s).then(function(r){if(i.skin===void 0)return r;let o;return n.getDependency("skin",i.skin).then(function(a){o=a;const l=[];for(let c=0,h=o.joints.length;c<h;c++)l.push(n.getDependency("node",o.joints[c]));return Promise.all(l)}).then(function(a){return r.traverse(function(l){if(!l.isMesh)return;const c=[],h=[];for(let u=0,d=a.length;u<d;u++){const f=a[u];if(f){c.push(f);const g=new de;o.inverseBindMatrices!==void 0&&g.fromArray(o.inverseBindMatrices.array,u*16),h.push(g)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',o.joints[u])}l.bind(new eo(c,h),l.matrixWorld)}),r})}).then(function(r){e.add(r);const o=[];if(i.children){const a=i.children;for(let l=0,c=a.length;l<c;l++){const h=a[l];o.push(Yh(h,r,t,n))}}return Promise.all(o)})}function pv(s,e,t){const n=e.attributes,i=new Ft;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new S(l[0],l[1],l[2]),new S(c[0],c[1],c[2])),a.normalized){const h=ga(Vr[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new S,l=new S;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const x=ga(Vr[d.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new ui;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Pc(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=ma[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return ni(s,e),pv(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?hv(s,e.targets,t):s})}function Dc(s,e){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Kc)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r}/*! (c) 2019-2021 pixiv Inc. - https://github.com/pixiv/three-vrm/blob/release/LICENSE *//*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function lt(s,e,t,n){return new(t||(t=Promise))(function(i,r){function o(c){try{l(n.next(c))}catch(h){r(h)}}function a(c){try{l(n.throw(c))}catch(h){r(h)}}function l(c){var h;c.done?i(c.value):(h=c.value,h instanceof t?h:new t(function(u){u(h)})).then(o,a)}l((n=n.apply(s,[])).next())})}function Ic(s){Object.keys(s).forEach(e=>{const t=s[e];t!=null&&t.isTexture&&t.dispose()}),s.dispose()}function mv(s){const e=s.geometry;e&&e.dispose();const t=s.material;t&&(Array.isArray(t)?t.forEach(n=>Ic(n)):t&&Ic(t))}var wt;(function(s){s[s.NUMBER=0]="NUMBER",s[s.VECTOR2=1]="VECTOR2",s[s.VECTOR3=2]="VECTOR3",s[s.VECTOR4=3]="VECTOR4",s[s.COLOR=4]="COLOR"})(wt||(wt={}));const gv=new J,xv=new S,_v=new Re,vv=new ne;class yv extends We{constructor(e){super(),this.weight=0,this.isBinary=!1,this._binds=[],this._materialValues=[],this.name=`BlendShapeController_${e}`,this.type="BlendShapeController",this.visible=!1}addBind(e){const t=e.weight/100;this._binds.push({meshes:e.meshes,morphTargetIndex:e.morphTargetIndex,weight:t})}addMaterialValue(e){const t=e.material,n=e.propertyName;let i,r,o,a,l=t[n];l&&(l=e.defaultValue||l,l.isVector2?(i=wt.VECTOR2,r=l.clone(),o=new J().fromArray(e.targetValue),a=o.clone().sub(r)):l.isVector3?(i=wt.VECTOR3,r=l.clone(),o=new S().fromArray(e.targetValue),a=o.clone().sub(r)):l.isVector4?(i=wt.VECTOR4,r=l.clone(),o=new Re().fromArray([e.targetValue[2],e.targetValue[3],e.targetValue[0],e.targetValue[1]]),a=o.clone().sub(r)):l.isColor?(i=wt.COLOR,r=l.clone(),o=new ne().fromArray(e.targetValue),a=o.clone().sub(r)):(i=wt.NUMBER,r=l,o=e.targetValue[0],a=o-r),this._materialValues.push({material:t,propertyName:n,defaultValue:r,targetValue:o,deltaValue:a,type:i}))}applyWeight(){const e=this.isBinary?this.weight<.5?0:1:this.weight;this._binds.forEach(t=>{t.meshes.forEach(n=>{n.morphTargetInfluences&&(n.morphTargetInfluences[t.morphTargetIndex]+=e*t.weight)})}),this._materialValues.forEach(t=>{if(t.material[t.propertyName]!==void 0){if(t.type===wt.NUMBER){const n=t.deltaValue;t.material[t.propertyName]+=n*e}else if(t.type===wt.VECTOR2){const n=t.deltaValue;t.material[t.propertyName].add(gv.copy(n).multiplyScalar(e))}else if(t.type===wt.VECTOR3){const n=t.deltaValue;t.material[t.propertyName].add(xv.copy(n).multiplyScalar(e))}else if(t.type===wt.VECTOR4){const n=t.deltaValue;t.material[t.propertyName].add(_v.copy(n).multiplyScalar(e))}else if(t.type===wt.COLOR){const n=t.deltaValue;t.material[t.propertyName].add(vv.copy(n).multiplyScalar(e))}typeof t.material.shouldApplyUniforms=="boolean"&&(t.material.shouldApplyUniforms=!0)}})}clearAppliedWeight(){this._binds.forEach(e=>{e.meshes.forEach(t=>{t.morphTargetInfluences&&(t.morphTargetInfluences[e.morphTargetIndex]=0)})}),this._materialValues.forEach(e=>{if(e.material[e.propertyName]!==void 0){if(e.type===wt.NUMBER){const t=e.defaultValue;e.material[e.propertyName]=t}else if(e.type===wt.VECTOR2){const t=e.defaultValue;e.material[e.propertyName].copy(t)}else if(e.type===wt.VECTOR3){const t=e.defaultValue;e.material[e.propertyName].copy(t)}else if(e.type===wt.VECTOR4){const t=e.defaultValue;e.material[e.propertyName].copy(t)}else if(e.type===wt.COLOR){const t=e.defaultValue;e.material[e.propertyName].copy(t)}typeof e.material.shouldApplyUniforms=="boolean"&&(e.material.shouldApplyUniforms=!0)}})}}var nt;function Zh(s,e,t){const n=s.parser.json.nodes[e].mesh;if(n==null)return null;const i=s.parser.json.meshes[n].primitives.length,r=[];return t.traverse(o=>{r.length<i&&o.isMesh&&r.push(o)}),r}function Jh(s){return lt(this,void 0,void 0,function*(){const e=yield s.parser.getDependencies("node"),t=new Map;return e.forEach((n,i)=>{const r=Zh(s,i,n);r!=null&&t.set(i,r)}),t})}function Mv(s){return s[0]!=="_"?(console.warn(`renameMaterialProperty: Given property name "${s}" might be invalid`),s):(s=s.substring(1),/[A-Z]/.test(s[0])?s[0].toLowerCase()+s.substring(1):(console.warn(`renameMaterialProperty: Given property name "${s}" might be invalid`),s))}(function(s){var e,t,n,i,r,o;(e=s.BlendShapePresetName||(s.BlendShapePresetName={})).A="a",e.Angry="angry",e.Blink="blink",e.BlinkL="blink_l",e.BlinkR="blink_r",e.E="e",e.Fun="fun",e.I="i",e.Joy="joy",e.Lookdown="lookdown",e.Lookleft="lookleft",e.Lookright="lookright",e.Lookup="lookup",e.Neutral="neutral",e.O="o",e.Sorrow="sorrow",e.U="u",e.Unknown="unknown",(t=s.FirstPersonLookAtTypeName||(s.FirstPersonLookAtTypeName={})).BlendShape="BlendShape",t.Bone="Bone",(n=s.HumanoidBoneName||(s.HumanoidBoneName={})).Chest="chest",n.Head="head",n.Hips="hips",n.Jaw="jaw",n.LeftEye="leftEye",n.LeftFoot="leftFoot",n.LeftHand="leftHand",n.LeftIndexDistal="leftIndexDistal",n.LeftIndexIntermediate="leftIndexIntermediate",n.LeftIndexProximal="leftIndexProximal",n.LeftLittleDistal="leftLittleDistal",n.LeftLittleIntermediate="leftLittleIntermediate",n.LeftLittleProximal="leftLittleProximal",n.LeftLowerArm="leftLowerArm",n.LeftLowerLeg="leftLowerLeg",n.LeftMiddleDistal="leftMiddleDistal",n.LeftMiddleIntermediate="leftMiddleIntermediate",n.LeftMiddleProximal="leftMiddleProximal",n.LeftRingDistal="leftRingDistal",n.LeftRingIntermediate="leftRingIntermediate",n.LeftRingProximal="leftRingProximal",n.LeftShoulder="leftShoulder",n.LeftThumbDistal="leftThumbDistal",n.LeftThumbIntermediate="leftThumbIntermediate",n.LeftThumbProximal="leftThumbProximal",n.LeftToes="leftToes",n.LeftUpperArm="leftUpperArm",n.LeftUpperLeg="leftUpperLeg",n.Neck="neck",n.RightEye="rightEye",n.RightFoot="rightFoot",n.RightHand="rightHand",n.RightIndexDistal="rightIndexDistal",n.RightIndexIntermediate="rightIndexIntermediate",n.RightIndexProximal="rightIndexProximal",n.RightLittleDistal="rightLittleDistal",n.RightLittleIntermediate="rightLittleIntermediate",n.RightLittleProximal="rightLittleProximal",n.RightLowerArm="rightLowerArm",n.RightLowerLeg="rightLowerLeg",n.RightMiddleDistal="rightMiddleDistal",n.RightMiddleIntermediate="rightMiddleIntermediate",n.RightMiddleProximal="rightMiddleProximal",n.RightRingDistal="rightRingDistal",n.RightRingIntermediate="rightRingIntermediate",n.RightRingProximal="rightRingProximal",n.RightShoulder="rightShoulder",n.RightThumbDistal="rightThumbDistal",n.RightThumbIntermediate="rightThumbIntermediate",n.RightThumbProximal="rightThumbProximal",n.RightToes="rightToes",n.RightUpperArm="rightUpperArm",n.RightUpperLeg="rightUpperLeg",n.Spine="spine",n.UpperChest="upperChest",(i=s.MetaAllowedUserName||(s.MetaAllowedUserName={})).Everyone="Everyone",i.ExplicitlyLicensedPerson="ExplicitlyLicensedPerson",i.OnlyAuthor="OnlyAuthor",(r=s.MetaUssageName||(s.MetaUssageName={})).Allow="Allow",r.Disallow="Disallow",(o=s.MetaLicenseName||(s.MetaLicenseName={})).Cc0="CC0",o.CcBy="CC_BY",o.CcByNc="CC_BY_NC",o.CcByNcNd="CC_BY_NC_ND",o.CcByNcSa="CC_BY_NC_SA",o.CcByNd="CC_BY_ND",o.CcBySa="CC_BY_SA",o.Other="Other",o.RedistributionProhibited="Redistribution_Prohibited"})(nt||(nt={}));const wv=new S,Sv=new S;function Hs(s,e){return s.matrixWorld.decompose(wv,e,Sv),e}class bv{constructor(){this._blendShapeGroups={},this._blendShapePresetMap={},this._unknownGroupNames=[]}get expressions(){return Object.keys(this._blendShapeGroups)}get blendShapePresetMap(){return this._blendShapePresetMap}get unknownGroupNames(){return this._unknownGroupNames}getBlendShapeGroup(e){const t=this._blendShapePresetMap[e],n=t?this._blendShapeGroups[t]:this._blendShapeGroups[e];if(n)return n;console.warn(`no blend shape found by ${e}`)}registerBlendShapeGroup(e,t,n){this._blendShapeGroups[e]=n,t?this._blendShapePresetMap[t]=e:this._unknownGroupNames.push(e)}getValue(e){var t;const n=this.getBlendShapeGroup(e);return(t=n==null?void 0:n.weight)!==null&&t!==void 0?t:null}setValue(e,t){const n=this.getBlendShapeGroup(e);var i;n&&(n.weight=(i=t,Math.max(Math.min(i,1),0)))}getBlendShapeTrackName(e){const t=this.getBlendShapeGroup(e);return t?`${t.name}.weight`:null}update(){Object.keys(this._blendShapeGroups).forEach(e=>{this._blendShapeGroups[e].clearAppliedWeight()}),Object.keys(this._blendShapeGroups).forEach(e=>{this._blendShapeGroups[e].applyWeight()})}}class Tv{import(e){var t;return lt(this,void 0,void 0,function*(){const n=(t=e.parser.json.extensions)===null||t===void 0?void 0:t.VRM;if(!n)return null;const i=n.blendShapeMaster;if(!i)return null;const r=new bv,o=i.blendShapeGroups;if(!o)return r;const a={};return yield Promise.all(o.map(l=>lt(this,void 0,void 0,function*(){const c=l.name;if(c===void 0)return void console.warn("VRMBlendShapeImporter: One of blendShapeGroups has no name");let h;l.presetName&&l.presetName!==nt.BlendShapePresetName.Unknown&&!a[l.presetName]&&(h=l.presetName,a[l.presetName]=c);const u=new yv(c);e.scene.add(u),u.isBinary=l.isBinary||!1,l.binds&&l.binds.forEach(f=>lt(this,void 0,void 0,function*(){if(f.mesh===void 0||f.index===void 0)return;const g=[];e.parser.json.nodes.forEach((_,m)=>{_.mesh===f.mesh&&g.push(m)});const x=f.index;yield Promise.all(g.map(_=>lt(this,void 0,void 0,function*(){var m;const p=yield function(T,b){return lt(this,void 0,void 0,function*(){const w=yield T.parser.getDependency("node",b);return Zh(T,b,w)})}(e,_);p.every(T=>Array.isArray(T.morphTargetInfluences)&&x<T.morphTargetInfluences.length)?u.addBind({meshes:p,morphTargetIndex:x,weight:(m=f.weight)!==null&&m!==void 0?m:100}):console.warn(`VRMBlendShapeImporter: ${l.name} attempts to index ${x}th morph but not found.`)})))}));const d=l.materialValues;d&&d.forEach(f=>{if(f.materialName===void 0||f.propertyName===void 0||f.targetValue===void 0)return;const g=[];e.scene.traverse(x=>{if(x.material){const _=x.material;Array.isArray(_)?g.push(..._.filter(m=>m.name===f.materialName&&g.indexOf(m)===-1)):_.name===f.materialName&&g.indexOf(_)===-1&&g.push(_)}}),g.forEach(x=>{u.addMaterialValue({material:x,propertyName:Mv(f.propertyName),targetValue:f.targetValue})})}),r.registerBlendShapeGroup(c,h,u)}))),r})}}const Ev=Object.freeze(new S(0,0,-1)),Av=new it;var Mn;(function(s){s[s.Auto=0]="Auto",s[s.Both=1]="Both",s[s.ThirdPersonOnly=2]="ThirdPersonOnly",s[s.FirstPersonOnly=3]="FirstPersonOnly"})(Mn||(Mn={}));class Wa{constructor(e,t){this.firstPersonFlag=Wa._parseFirstPersonFlag(e),this.primitives=t}static _parseFirstPersonFlag(e){switch(e){case"Both":return Mn.Both;case"ThirdPersonOnly":return Mn.ThirdPersonOnly;case"FirstPersonOnly":return Mn.FirstPersonOnly;default:return Mn.Auto}}}class Bn{constructor(e,t,n){this._meshAnnotations=[],this._firstPersonOnlyLayer=Bn._DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=Bn._DEFAULT_THIRDPERSON_ONLY_LAYER,this._initialized=!1,this._firstPersonBone=e,this._firstPersonBoneOffset=t,this._meshAnnotations=n}get firstPersonBone(){return this._firstPersonBone}get meshAnnotations(){return this._meshAnnotations}getFirstPersonWorldDirection(e){return e.copy(Ev).applyQuaternion(Hs(this._firstPersonBone,Av))}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}getFirstPersonBoneOffset(e){return e.copy(this._firstPersonBoneOffset)}getFirstPersonWorldPosition(e){const t=this._firstPersonBoneOffset,n=new Re(t.x,t.y,t.z,1);return n.applyMatrix4(this._firstPersonBone.matrixWorld),e.set(n.x,n.y,n.z)}setup({firstPersonOnlyLayer:e=Bn._DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:t=Bn._DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initialized||(this._initialized=!0,this._firstPersonOnlyLayer=e,this._thirdPersonOnlyLayer=t,this._meshAnnotations.forEach(n=>{n.firstPersonFlag===Mn.FirstPersonOnly?n.primitives.forEach(i=>{i.layers.set(this._firstPersonOnlyLayer)}):n.firstPersonFlag===Mn.ThirdPersonOnly?n.primitives.forEach(i=>{i.layers.set(this._thirdPersonOnlyLayer)}):n.firstPersonFlag===Mn.Auto&&this._createHeadlessModel(n.primitives)}))}_excludeTriangles(e,t,n,i){let r=0;if(t!=null&&t.length>0)for(let o=0;o<e.length;o+=3){const a=e[o],l=e[o+1],c=e[o+2],h=t[a],u=n[a];if(h[0]>0&&i.includes(u[0])||h[1]>0&&i.includes(u[1])||h[2]>0&&i.includes(u[2])||h[3]>0&&i.includes(u[3]))continue;const d=t[l],f=n[l];if(d[0]>0&&i.includes(f[0])||d[1]>0&&i.includes(f[1])||d[2]>0&&i.includes(f[2])||d[3]>0&&i.includes(f[3]))continue;const g=t[c],x=n[c];g[0]>0&&i.includes(x[0])||g[1]>0&&i.includes(x[1])||g[2]>0&&i.includes(x[2])||g[3]>0&&i.includes(x[3])||(e[r++]=a,e[r++]=l,e[r++]=c)}return r}_createErasedMesh(e,t){const n=new Qs(e.geometry.clone(),e.material);n.name=`${e.name}(erase)`,n.frustumCulled=e.frustumCulled,n.layers.set(this._firstPersonOnlyLayer);const i=n.geometry,r=i.getAttribute("skinIndex").array,o=[];for(let f=0;f<r.length;f+=4)o.push([r[f],r[f+1],r[f+2],r[f+3]]);const a=i.getAttribute("skinWeight").array,l=[];for(let f=0;f<a.length;f+=4)l.push([a[f],a[f+1],a[f+2],a[f+3]]);const c=i.getIndex();if(!c)throw new Error("The geometry doesn't have an index buffer");const h=Array.from(c.array),u=this._excludeTriangles(h,l,o,t),d=[];for(let f=0;f<u;f++)d[f]=h[f];return i.setIndex(d),e.onBeforeRender&&(n.onBeforeRender=e.onBeforeRender),n.bind(new eo(e.skeleton.bones,e.skeleton.boneInverses),new de),n}_createHeadlessModelForSkinnedMesh(e,t){const n=[];if(t.skeleton.bones.forEach((r,o)=>{this._isEraseTarget(r)&&n.push(o)}),!n.length)return t.layers.enable(this._thirdPersonOnlyLayer),void t.layers.enable(this._firstPersonOnlyLayer);t.layers.set(this._thirdPersonOnlyLayer);const i=this._createErasedMesh(t,n);e.add(i)}_createHeadlessModel(e){e.forEach(t=>{if(t.type==="SkinnedMesh"){const n=t;this._createHeadlessModelForSkinnedMesh(n.parent,n)}else this._isEraseTarget(t)&&t.layers.set(this._thirdPersonOnlyLayer)})}_isEraseTarget(e){return e===this._firstPersonBone||!!e.parent&&this._isEraseTarget(e.parent)}}Bn._DEFAULT_FIRSTPERSON_ONLY_LAYER=9,Bn._DEFAULT_THIRDPERSON_ONLY_LAYER=10;class Lv{import(e,t){var n;return lt(this,void 0,void 0,function*(){const i=(n=e.parser.json.extensions)===null||n===void 0?void 0:n.VRM;if(!i)return null;const r=i.firstPerson;if(!r)return null;const o=r.firstPersonBone;let a;if(a=o===void 0||o===-1?t.getBoneNode(nt.HumanoidBoneName.Head):yield e.parser.getDependency("node",o),!a)return console.warn("VRMFirstPersonImporter: Could not find firstPersonBone of the VRM"),null;const l=r.firstPersonBoneOffset?new S(r.firstPersonBoneOffset.x,r.firstPersonBoneOffset.y,-r.firstPersonBoneOffset.z):new S(0,.06,0),c=[],h=yield Jh(e);return Array.from(h.entries()).forEach(([u,d])=>{const f=e.parser.json.nodes[u],g=r.meshAnnotations?r.meshAnnotations.find(x=>x.mesh===f.mesh):void 0;c.push(new Wa(g==null?void 0:g.firstPersonFlag,d))}),new Bn(a,l,c)})}}class Rv{constructor(e,t){this.node=e,this.humanLimit=t}}function Kh(s){return s.invert?s.invert():s.inverse(),s}const Mr=new S,wr=new it;class Cv{constructor(e,t){this.restPose={},this.humanBones=this._createHumanBones(e),this.humanDescription=t,this.restPose=this.getPose()}getPose(){const e={};return Object.keys(this.humanBones).forEach(t=>{const n=this.getBoneNode(t);if(!n||e[t])return;Mr.set(0,0,0),wr.identity();const i=this.restPose[t];i!=null&&i.position&&Mr.fromArray(i.position).negate(),i!=null&&i.rotation&&Kh(wr.fromArray(i.rotation)),Mr.add(n.position),wr.premultiply(n.quaternion),e[t]={position:Mr.toArray(),rotation:wr.toArray()}},{}),e}setPose(e){Object.keys(e).forEach(t=>{const n=e[t],i=this.getBoneNode(t);if(!i)return;const r=this.restPose[t];r&&(n.position&&(i.position.fromArray(n.position),r.position&&i.position.add(Mr.fromArray(r.position))),n.rotation&&(i.quaternion.fromArray(n.rotation),r.rotation&&i.quaternion.multiply(wr.fromArray(r.rotation))))})}resetPose(){Object.entries(this.restPose).forEach(([e,t])=>{const n=this.getBoneNode(e);n&&(t!=null&&t.position&&n.position.fromArray(t.position),t!=null&&t.rotation&&n.quaternion.fromArray(t.rotation))})}getBone(e){var t;return(t=this.humanBones[e][0])!==null&&t!==void 0?t:void 0}getBones(e){var t;return(t=this.humanBones[e])!==null&&t!==void 0?t:[]}getBoneNode(e){var t,n;return(n=(t=this.humanBones[e][0])===null||t===void 0?void 0:t.node)!==null&&n!==void 0?n:null}getBoneNodes(e){var t,n;return(n=(t=this.humanBones[e])===null||t===void 0?void 0:t.map(i=>i.node))!==null&&n!==void 0?n:[]}_createHumanBones(e){const t=Object.values(nt.HumanoidBoneName).reduce((n,i)=>(n[i]=[],n),{});return e.forEach(n=>{t[n.name].push(n.bone)}),t}}class Pv{import(e){var t;return lt(this,void 0,void 0,function*(){const n=(t=e.parser.json.extensions)===null||t===void 0?void 0:t.VRM;if(!n)return null;const i=n.humanoid;if(!i)return null;const r=[];i.humanBones&&(yield Promise.all(i.humanBones.map(a=>lt(this,void 0,void 0,function*(){if(!a.bone||a.node==null)return;const l=yield e.parser.getDependency("node",a.node);r.push({name:a.bone,bone:new Rv(l,{axisLength:a.axisLength,center:a.center&&new S(a.center.x,a.center.y,a.center.z),max:a.max&&new S(a.max.x,a.max.y,a.max.z),min:a.min&&new S(a.min.x,a.min.y,a.min.z),useDefaultValues:a.useDefaultValues})})}))));const o={armStretch:i.armStretch,legStretch:i.legStretch,upperArmTwist:i.upperArmTwist,lowerArmTwist:i.lowerArmTwist,upperLegTwist:i.upperLegTwist,lowerLegTwist:i.lowerLegTwist,feetSpacing:i.feetSpacing,hasTranslationDoF:i.hasTranslationDoF};return new Cv(r,o)})}}class Nc{constructor(e,t,n){this.curve=[0,0,0,1,1,1,1,0],this.curveXRangeDegree=90,this.curveYRangeDegree=10,e!==void 0&&(this.curveXRangeDegree=e),t!==void 0&&(this.curveYRangeDegree=t),n!==void 0&&(this.curve=n)}map(e){const t=Math.min(Math.max(e,0),this.curveXRangeDegree)/this.curveXRangeDegree;return this.curveYRangeDegree*((n,i)=>{if(n.length<8)throw new Error("evaluateCurve: Invalid curve detected! (Array length must be 8 at least)");if(n.length%4!=0)throw new Error("evaluateCurve: Invalid curve detected! (Array length must be multiples of 4");let r;for(r=0;;r++){if(n.length<=4*r)return n[4*r-3];if(i<=n[4*r])break}const o=r-1;if(o<0)return n[4*o+5];const a=n[4*o],l=(i-a)/(n[4*r]-a);return((c,h,u,d,f)=>{const g=f*f*f,x=f*f;return c+(h-c)*(-2*g+3*x)+u*(g-2*x+f)+d*(g-x)})(n[4*o+1],n[4*r+1],n[4*o+3],n[4*r+2],l)})(this.curve,t)}}class $h{}class Dv extends $h{constructor(e,t,n,i){super(),this.type=nt.FirstPersonLookAtTypeName.BlendShape,this._curveHorizontal=t,this._curveVerticalDown=n,this._curveVerticalUp=i,this._blendShapeProxy=e}name(){return nt.FirstPersonLookAtTypeName.BlendShape}lookAt(e){const t=e.x,n=e.y;t<0?(this._blendShapeProxy.setValue(nt.BlendShapePresetName.Lookup,0),this._blendShapeProxy.setValue(nt.BlendShapePresetName.Lookdown,this._curveVerticalDown.map(-t))):(this._blendShapeProxy.setValue(nt.BlendShapePresetName.Lookdown,0),this._blendShapeProxy.setValue(nt.BlendShapePresetName.Lookup,this._curveVerticalUp.map(t))),n<0?(this._blendShapeProxy.setValue(nt.BlendShapePresetName.Lookleft,0),this._blendShapeProxy.setValue(nt.BlendShapePresetName.Lookright,this._curveHorizontal.map(-n))):(this._blendShapeProxy.setValue(nt.BlendShapePresetName.Lookright,0),this._blendShapeProxy.setValue(nt.BlendShapePresetName.Lookleft,this._curveHorizontal.map(n)))}}const Iv=Object.freeze(new S(0,0,-1)),Nv=new S,Fv=new S,Ov=new S,Fc=new it;class Jr{constructor(e,t){this.autoUpdate=!0,this._euler=new Jn(0,0,0,Jr.EULER_ORDER),this.firstPerson=e,this.applyer=t}getLookAtWorldDirection(e){const t=Hs(this.firstPerson.firstPersonBone,Fc);return e.copy(Iv).applyEuler(this._euler).applyQuaternion(t)}lookAt(e){this._calcEuler(this._euler,e),this.applyer&&this.applyer.lookAt(this._euler)}update(e){this.target&&this.autoUpdate&&(this.lookAt(this.target.getWorldPosition(Nv)),this.applyer&&this.applyer.lookAt(this._euler))}_calcEuler(e,t){const n=this.firstPerson.getFirstPersonWorldPosition(Fv),i=Ov.copy(t).sub(n).normalize();return i.applyQuaternion(Kh(Hs(this.firstPerson.firstPersonBone,Fc))),e.x=Math.atan2(i.y,Math.sqrt(i.x*i.x+i.z*i.z)),e.y=Math.atan2(-i.x,-i.z),e}}Jr.EULER_ORDER="YXZ";const Ii=new Jn(0,0,0,Jr.EULER_ORDER);class Bv extends $h{constructor(e,t,n,i,r){super(),this.type=nt.FirstPersonLookAtTypeName.Bone,this._curveHorizontalInner=t,this._curveHorizontalOuter=n,this._curveVerticalDown=i,this._curveVerticalUp=r,this._leftEye=e.getBoneNode(nt.HumanoidBoneName.LeftEye),this._rightEye=e.getBoneNode(nt.HumanoidBoneName.RightEye)}lookAt(e){const t=e.x,n=e.y;this._leftEye&&(Ii.x=t<0?-this._curveVerticalDown.map(-t):this._curveVerticalUp.map(t),Ii.y=n<0?-this._curveHorizontalInner.map(-n):this._curveHorizontalOuter.map(n),this._leftEye.quaternion.setFromEuler(Ii)),this._rightEye&&(Ii.x=t<0?-this._curveVerticalDown.map(-t):this._curveVerticalUp.map(t),Ii.y=n<0?-this._curveHorizontalOuter.map(-n):this._curveHorizontalInner.map(n),this._rightEye.quaternion.setFromEuler(Ii))}}const Yo=Math.PI/180;class zv{import(e,t,n,i){var r;const o=(r=e.parser.json.extensions)===null||r===void 0?void 0:r.VRM;if(!o)return null;const a=o.firstPerson;if(!a)return null;const l=this._importApplyer(a,n,i);return new Jr(t,l||void 0)}_importApplyer(e,t,n){const i=e.lookAtHorizontalInner,r=e.lookAtHorizontalOuter,o=e.lookAtVerticalDown,a=e.lookAtVerticalUp;switch(e.lookAtTypeName){case nt.FirstPersonLookAtTypeName.Bone:return i===void 0||r===void 0||o===void 0||a===void 0?null:new Bv(n,this._importCurveMapperBone(i),this._importCurveMapperBone(r),this._importCurveMapperBone(o),this._importCurveMapperBone(a));case nt.FirstPersonLookAtTypeName.BlendShape:return r===void 0||o===void 0||a===void 0?null:new Dv(t,this._importCurveMapperBlendShape(r),this._importCurveMapperBlendShape(o),this._importCurveMapperBlendShape(a));default:return null}}_importCurveMapperBone(e){return new Nc(typeof e.xRange=="number"?Yo*e.xRange:void 0,typeof e.yRange=="number"?Yo*e.yRange:void 0,e.curve)}_importCurveMapperBlendShape(e){return new Nc(typeof e.xRange=="number"?Yo*e.xRange:void 0,e.yRange,e.curve)}}var Oc=`// #define PHONG

#ifdef BLENDMODE_CUTOUT
  uniform float cutoff;
#endif

uniform vec3 color;
uniform float colorAlpha;
uniform vec3 shadeColor;
#ifdef USE_SHADETEXTURE
  uniform sampler2D shadeTexture;
#endif

uniform float receiveShadowRate;
#ifdef USE_RECEIVESHADOWTEXTURE
  uniform sampler2D receiveShadowTexture;
#endif

uniform float shadingGradeRate;
#ifdef USE_SHADINGGRADETEXTURE
  uniform sampler2D shadingGradeTexture;
#endif

uniform float shadeShift;
uniform float shadeToony;
uniform float lightColorAttenuation;
uniform float indirectLightIntensity;

#ifdef USE_RIMTEXTURE
  uniform sampler2D rimTexture;
#endif
uniform vec3 rimColor;
uniform float rimLightingMix;
uniform float rimFresnelPower;
uniform float rimLift;

#ifdef USE_SPHEREADD
  uniform sampler2D sphereAdd;
#endif

uniform vec3 emissionColor;

uniform vec3 outlineColor;
uniform float outlineLightingMix;

#ifdef USE_UVANIMMASKTEXTURE
  uniform sampler2D uvAnimMaskTexture;
#endif

uniform float uvAnimOffsetX;
uniform float uvAnimOffsetY;
uniform float uvAnimTheta;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>

// #include <uv_pars_fragment>
#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
  varying vec2 vUv;
#endif

#include <uv2_pars_fragment>
#include <map_pars_fragment>
// #include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
// #include <envmap_common_pars_fragment>
// #include <envmap_pars_fragment>
// #include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>

// #include <bsdfs>
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
    return RECIPROCAL_PI * diffuseColor;
}

#include <lights_pars_begin>

// #include <lights_phong_pars_fragment>
varying vec3 vViewPosition;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

struct MToonMaterial {
  vec3 diffuseColor;
  vec3 shadeColor;
  float shadingGrade;
  float receiveShadow;
};

#define Material_LightProbeLOD( material ) (0)

#include <shadowmap_pars_fragment>
// #include <bumpmap_pars_fragment>

// #include <normalmap_pars_fragment>
#ifdef USE_NORMALMAP

  uniform sampler2D normalMap;
  uniform vec2 normalScale;

#endif

#ifdef OBJECTSPACE_NORMALMAP

  uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && defined ( TANGENTSPACE_NORMALMAP )

  // Per-Pixel Tangent Space Normal Mapping
  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

  // three-vrm specific change: it requires \`uv\` as an input in order to support uv scrolls

  // Temporary compat against shader change @ Three.js r126
  // See: #21205, #21307, #21299
  #if THREE_VRM_THREE_REVISION >= 126

    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {

      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      vec3 N = normalize( surf_norm );

      vec3 q1perp = cross( q1, N );
      vec3 q0perp = cross( N, q0 );

      vec3 T = q1perp * st0.x + q0perp * st1.x;
      vec3 B = q1perp * st0.y + q0perp * st1.y;

      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0
      // TODO: Is this still required? Or shall I make a PR about it?
      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {
        return surf_norm;
      }

      float det = max( dot( T, T ), dot( B, B ) );
      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );

      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );

    }

  #else

    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {

      // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude

      vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;
      vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;

      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0
      // TODO: Is this still required? Or shall I make a PR about it?

      if ( length( S ) == 0.0 || length( T ) == 0.0 ) {
        return surf_norm;
      }

      S = normalize( S );
      T = normalize( T );
      vec3 N = normalize( surf_norm );

      #ifdef DOUBLE_SIDED

        // Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331

        bool frontFacing = dot( cross( S, T ), N ) > 0.0;

        mapN.xy *= ( float( frontFacing ) * 2.0 - 1.0 );

      #else

        mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );

      #endif

      mat3 tsn = mat3( S, T, N );
      return normalize( tsn * mapN );

    }

  #endif

#endif

// #include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// == lighting stuff ===========================================================
float getLightIntensity(
  const in IncidentLight directLight,
  const in GeometricContext geometry,
  const in float shadow,
  const in float shadingGrade
) {
  float lightIntensity = dot( geometry.normal, directLight.direction );
  lightIntensity = 0.5 + 0.5 * lightIntensity;
  lightIntensity = lightIntensity * shadow;
  lightIntensity = lightIntensity * shadingGrade;
  lightIntensity = lightIntensity * 2.0 - 1.0;
  return shadeToony == 1.0
    ? step( shadeShift, lightIntensity )
    : smoothstep( shadeShift, shadeShift + ( 1.0 - shadeToony ), lightIntensity );
}

vec3 getLighting( const in vec3 lightColor ) {
  vec3 lighting = lightColor;
  lighting = mix(
    lighting,
    vec3( max( 0.001, max( lighting.x, max( lighting.y, lighting.z ) ) ) ),
    lightColorAttenuation
  );

  #if THREE_VRM_THREE_REVISION < 132
    #ifndef PHYSICALLY_CORRECT_LIGHTS
      lighting *= PI;
    #endif
  #endif

  return lighting;
}

vec3 getDiffuse(
  const in MToonMaterial material,
  const in float lightIntensity,
  const in vec3 lighting
) {
  #ifdef DEBUG_LITSHADERATE
    return vec3( BRDF_Lambert( lightIntensity * lighting ) );
  #endif

  return lighting * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, lightIntensity ) );
}

// == post correction ==========================================================
void postCorrection() {
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}

// == main procedure ===========================================================
void main() {
  #include <clipping_planes_fragment>

  vec2 uv = vec2(0.5, 0.5);

  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
    uv = vUv;

    float uvAnimMask = 1.0;
    #ifdef USE_UVANIMMASKTEXTURE
      uvAnimMask = texture2D( uvAnimMaskTexture, uv ).x;
    #endif

    uv = uv + vec2( uvAnimOffsetX, uvAnimOffsetY ) * uvAnimMask;
    float uvRotCos = cos( uvAnimTheta * uvAnimMask );
    float uvRotSin = sin( uvAnimTheta * uvAnimMask );
    uv = mat2( uvRotCos, uvRotSin, -uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;
  #endif

  #ifdef DEBUG_UV
    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
      gl_FragColor = vec4( uv, 0.0, 1.0 );
    #endif
    return;
  #endif

  vec4 diffuseColor = vec4( color, colorAlpha );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissionColor;

  #include <logdepthbuf_fragment>

  // #include <map_fragment>
  #ifdef USE_MAP
    #if THREE_VRM_THREE_REVISION >= 137
      vec4 sampledDiffuseColor = texture2D( map, uv );
      #ifdef DECODE_VIDEO_TEXTURE
        sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
      #endif
      diffuseColor *= sampledDiffuseColor;
    #else
      // COMPAT: pre-r137
      diffuseColor *= mapTexelToLinear( texture2D( map, uv ) );
    #endif
  #endif

  #include <color_fragment>
  // #include <alphamap_fragment>

  // -- MToon: alpha -----------------------------------------------------------
  // #include <alphatest_fragment>
  #ifdef BLENDMODE_CUTOUT
    if ( diffuseColor.a <= cutoff ) { discard; }
    diffuseColor.a = 1.0;
  #endif

  #ifdef BLENDMODE_OPAQUE
    diffuseColor.a = 1.0;
  #endif

  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_FIXED ) // omitting DebugMode
    gl_FragColor = vec4( outlineColor, diffuseColor.a );
    postCorrection();
    return;
  #endif

  // #include <specularmap_fragment>
  #include <normal_fragment_begin>

  #ifdef OUTLINE
    normal *= -1.0;
  #endif

  // #include <normal_fragment_maps>

  #ifdef OBJECTSPACE_NORMALMAP

    normal = texture2D( normalMap, uv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

    #ifdef FLIP_SIDED

      normal = - normal;

    #endif

    #ifdef DOUBLE_SIDED

      // Temporary compat against shader change @ Three.js r126
      // See: #21205, #21307, #21299
      #if THREE_VRM_THREE_REVISION >= 126

        normal = normal * faceDirection;

      #else

        normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );

      #endif

    #endif

    normal = normalize( normalMatrix * normal );

  #elif defined( TANGENTSPACE_NORMALMAP )

    vec3 mapN = texture2D( normalMap, uv ).xyz * 2.0 - 1.0;
    mapN.xy *= normalScale;

    #ifdef USE_TANGENT

      normal = normalize( vTBN * mapN );

    #else

      // Temporary compat against shader change @ Three.js r126
      // See: #21205, #21307, #21299
      #if THREE_VRM_THREE_REVISION >= 126

        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );

      #else

        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN );

      #endif

    #endif

  #endif

  // #include <emissivemap_fragment>
  #ifdef USE_EMISSIVEMAP
    #if THREE_VRM_THREE_REVISION >= 137
      totalEmissiveRadiance *= texture2D( emissiveMap, uv ).rgb;
    #else
      // COMPAT: pre-r137
      totalEmissiveRadiance *= emissiveMapTexelToLinear( texture2D( emissiveMap, uv ) ).rgb;
    #endif
  #endif

  #ifdef DEBUG_NORMAL
    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );
    return;
  #endif

  // -- MToon: lighting --------------------------------------------------------
  // accumulation
  // #include <lights_phong_fragment>
  MToonMaterial material;

  material.diffuseColor = diffuseColor.rgb;

  material.shadeColor = shadeColor;
  #ifdef USE_SHADETEXTURE
    #if THREE_VRM_THREE_REVISION >= 137
      material.shadeColor *= texture2D( shadeTexture, uv ).rgb;
    #else
      // COMPAT: pre-r137
      material.shadeColor *= shadeTextureTexelToLinear( texture2D( shadeTexture, uv ) ).rgb;
    #endif
  #endif

  material.shadingGrade = 1.0;
  #ifdef USE_SHADINGGRADETEXTURE
    material.shadingGrade = 1.0 - shadingGradeRate * ( 1.0 - texture2D( shadingGradeTexture, uv ).r );
  #endif

  material.receiveShadow = receiveShadowRate;
  #ifdef USE_RECEIVESHADOWTEXTURE
    material.receiveShadow *= texture2D( receiveShadowTexture, uv ).a;
  #endif

  // #include <lights_fragment_begin>
  GeometricContext geometry;

  geometry.position = - vViewPosition;
  geometry.normal = normal;
  geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

  IncidentLight directLight;
  vec3 lightingSum = vec3( 0.0 );

  // since these variables will be used in unrolled loop, we have to define in prior
  float atten, shadow, lightIntensity;
  vec3 lighting;

  #if ( NUM_POINT_LIGHTS > 0 )
    PointLight pointLight;

    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
    PointLightShadow pointLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
      pointLight = pointLights[ i ];

      #if THREE_VRM_THREE_REVISION >= 132
        getPointLightInfo( pointLight, geometry, directLight );
      #else
        getPointDirectLightIrradiance( pointLight, geometry, directLight );
      #endif

      atten = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
      pointLightShadow = pointLightShadows[ i ];
      atten = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
      #endif

      shadow = 1.0 - material.receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );
      lightIntensity = getLightIntensity( directLight, geometry, shadow, material.shadingGrade );
      lighting = getLighting( directLight.color );
      reflectedLight.directDiffuse += getDiffuse( material, lightIntensity, lighting );
      lightingSum += lighting;
    }
    #pragma unroll_loop_end
  #endif

  #if ( NUM_SPOT_LIGHTS > 0 )
    SpotLight spotLight;

    #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
    SpotLightShadow spotLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
      spotLight = spotLights[ i ];

      #if THREE_VRM_THREE_REVISION >= 132
        getSpotLightInfo( spotLight, geometry, directLight );
      #else
        getSpotDirectLightIrradiance( spotLight, geometry, directLight );
      #endif

      atten = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
      spotLightShadow = spotLightShadows[ i ];
      atten = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
      #endif

      shadow = 1.0 - material.receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );
      lightIntensity = getLightIntensity( directLight, geometry, shadow, material.shadingGrade );
      lighting = getLighting( directLight.color );
      reflectedLight.directDiffuse += getDiffuse( material, lightIntensity, lighting );
      lightingSum += lighting;
    }
    #pragma unroll_loop_end
  #endif

  #if ( NUM_DIR_LIGHTS > 0 )
    DirectionalLight directionalLight;

    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow directionalLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
      directionalLight = directionalLights[ i ];

      #if THREE_VRM_THREE_REVISION >= 132
        getDirectionalLightInfo( directionalLight, geometry, directLight );
      #else
        getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );
      #endif

      atten = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
      directionalLightShadow = directionalLightShadows[ i ];
      atten = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #endif

      shadow = 1.0 - material.receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );
      lightIntensity = getLightIntensity( directLight, geometry, shadow, material.shadingGrade );
      lighting = getLighting( directLight.color );
      reflectedLight.directDiffuse += getDiffuse( material, lightIntensity, lighting );
      lightingSum += lighting;
    }
    #pragma unroll_loop_end
  #endif

  // #if defined( RE_IndirectDiffuse )
  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
  #if THREE_VRM_THREE_REVISION >= 133
    irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
  #else
    irradiance += getLightProbeIrradiance( lightProbe, geometry );
  #endif
  #if ( NUM_HEMI_LIGHTS > 0 )
    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
    }
    #pragma unroll_loop_end
  #endif
  // #endif

  // #include <lights_fragment_maps>
  #ifdef USE_LIGHTMAP
    vec4 lightMapTexel = texture2D( lightMap, vUv2 );
    #if THREE_VRM_THREE_REVISION >= 137
      vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
    #else
      // COMPAT: pre-r137
      vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
    #endif
    #ifndef PHYSICALLY_CORRECT_LIGHTS
      lightMapIrradiance *= PI;
    #endif
    irradiance += lightMapIrradiance;
  #endif

  // #include <lights_fragment_end>
  // RE_IndirectDiffuse here
  reflectedLight.indirectDiffuse += indirectLightIntensity * irradiance * BRDF_Lambert( material.diffuseColor );

  // modulation
  #include <aomap_fragment>

  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

  // The "comment out if you want to PBR absolutely" line
  #ifndef DEBUG_LITSHADERATE
    col = min(col, material.diffuseColor);
  #endif

  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_MIXED )
    gl_FragColor = vec4(
      outlineColor.rgb * mix( vec3( 1.0 ), col, outlineLightingMix ),
      diffuseColor.a
    );
    postCorrection();
    return;
  #endif

  #ifdef DEBUG_LITSHADERATE
    gl_FragColor = vec4( col, diffuseColor.a );
    postCorrection();
    return;
  #endif

  // -- MToon: parametric rim lighting -----------------------------------------
  vec3 viewDir = normalize( vViewPosition );
  vec3 rimMix = mix( vec3( 1.0 ), lightingSum + indirectLightIntensity * irradiance, rimLightingMix );
  vec3 rim = rimColor * pow( saturate( 1.0 - dot( viewDir, normal ) + rimLift ), rimFresnelPower );
  #ifdef USE_RIMTEXTURE
    #if THREE_VRM_THREE_REVISION >= 137
      rim *= texture2D( rimTexture, uv ).rgb;
    #else
      // COMPAT: pre-r137
      rim *= rimTextureTexelToLinear( texture2D( rimTexture, uv ) ).rgb;
    #endif
  #endif
  col += rim;

  // -- MToon: additive matcap -------------------------------------------------
  #ifdef USE_SPHEREADD
    {
      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );
      vec3 y = cross( viewDir, x ); // guaranteed to be normalized
      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );
      #if THREE_VRM_THREE_REVISION >= 137
        vec3 matcap = texture2D( sphereAdd, sphereUv ).xyz;
      #else
        // COMPAT: pre-r137
        vec3 matcap = sphereAddTexelToLinear( texture2D( sphereAdd, sphereUv ) ).xyz;
      #endif
      col += matcap;
    }
  #endif

  // -- MToon: Emission --------------------------------------------------------
  col += totalEmissiveRadiance;

  // #include <envmap_fragment>

  // -- Almost done! -----------------------------------------------------------
  gl_FragColor = vec4( col, diffuseColor.a );
  postCorrection();
}`;const Zo=(s,e)=>{const t=(n=>{if(parseInt(Ht,10)>=136)switch(n){case Rt:return["Linear","( value )"];case He:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",n),["Linear","( value )"]}else switch(n){case Rt:return["Linear","( value )"];case He:return["sRGB","( value )"];case 3002:return["RGBE","( value )"];case 3004:return["RGBM","( value, 7.0 )"];case 3005:return["RGBM","( value, 16.0 )"];case 3006:return["RGBD","( value, 256.0 )"];case 3007:return["Gamma","( value, float( GAMMA_FACTOR ) )"];default:throw new Error("unsupported encoding: "+n)}})(e);return"vec4 "+s+"( vec4 value ) { return "+t[0]+"ToLinear"+t[1]+"; }"},Uv=2*Math.PI;var rn,ki,Pr,Yi,sn;(function(s){s[s.Off=0]="Off",s[s.Front=1]="Front",s[s.Back=2]="Back"})(rn||(rn={})),function(s){s[s.None=0]="None",s[s.Normal=1]="Normal",s[s.LitShadeRate=2]="LitShadeRate",s[s.UV=3]="UV"}(ki||(ki={})),function(s){s[s.FixedColor=0]="FixedColor",s[s.MixedLighting=1]="MixedLighting"}(Pr||(Pr={})),function(s){s[s.None=0]="None",s[s.WorldCoordinates=1]="WorldCoordinates",s[s.ScreenCoordinates=2]="ScreenCoordinates"}(Yi||(Yi={})),function(s){s[s.Opaque=0]="Opaque",s[s.Cutout=1]="Cutout",s[s.Transparent=2]="Transparent",s[s.TransparentWithZWrite=3]="TransparentWithZWrite"}(sn||(sn={}));class Bc extends Sn{constructor(e={}){super(),this.isMToonMaterial=!0,this.cutoff=.5,this.color=new Re(1,1,1,1),this.shadeColor=new Re(.97,.81,.86,1),this.map=null,this.mainTex_ST=new Re(0,0,1,1),this.shadeTexture=null,this.normalMap=null,this.normalMapType=Zn,this.normalScale=new J(1,1),this.receiveShadowRate=1,this.receiveShadowTexture=null,this.shadingGradeRate=1,this.shadingGradeTexture=null,this.shadeShift=0,this.shadeToony=.9,this.lightColorAttenuation=0,this.indirectLightIntensity=.1,this.rimTexture=null,this.rimColor=new Re(0,0,0,1),this.rimLightingMix=0,this.rimFresnelPower=1,this.rimLift=0,this.sphereAdd=null,this.emissionColor=new Re(0,0,0,1),this.emissiveMap=null,this.outlineWidthTexture=null,this.outlineWidth=.5,this.outlineScaledMaxDistance=1,this.outlineColor=new Re(0,0,0,1),this.outlineLightingMix=1,this.uvAnimMaskTexture=null,this.uvAnimScrollX=0,this.uvAnimScrollY=0,this.uvAnimRotation=0,this.shouldApplyUniforms=!0,this._debugMode=ki.None,this._blendMode=sn.Opaque,this._outlineWidthMode=Yi.None,this._outlineColorMode=Pr.FixedColor,this._cullMode=rn.Back,this._outlineCullMode=rn.Front,this._isOutline=!1,this._uvAnimOffsetX=0,this._uvAnimOffsetY=0,this._uvAnimPhase=0,this.encoding=e.encoding||Rt,this.encoding!==Rt&&this.encoding!==He&&console.warn("The specified color encoding does not work properly with MToonMaterial. You might want to use THREE.sRGBEncoding instead."),["mToonVersion","shadeTexture_ST","bumpMap_ST","receiveShadowTexture_ST","shadingGradeTexture_ST","rimTexture_ST","sphereAdd_ST","emissionMap_ST","outlineWidthTexture_ST","uvAnimMaskTexture_ST","srcBlend","dstBlend"].forEach(t=>{e[t]!==void 0&&delete e[t]}),e.fog=!0,e.lights=!0,e.clipping=!0,parseInt(Ht,10)<129&&(e.skinning=e.skinning||!1),parseInt(Ht,10)<131&&(e.morphTargets=e.morphTargets||!1,e.morphNormals=e.morphNormals||!1),e.uniforms=Ta.merge([$.common,$.normalmap,$.emissivemap,$.fog,$.lights,{cutoff:{value:.5},color:{value:new ne(1,1,1)},colorAlpha:{value:1},shadeColor:{value:new ne(.97,.81,.86)},mainTex_ST:{value:new Re(0,0,1,1)},shadeTexture:{value:null},receiveShadowRate:{value:1},receiveShadowTexture:{value:null},shadingGradeRate:{value:1},shadingGradeTexture:{value:null},shadeShift:{value:0},shadeToony:{value:.9},lightColorAttenuation:{value:0},indirectLightIntensity:{value:.1},rimTexture:{value:null},rimColor:{value:new ne(0,0,0)},rimLightingMix:{value:0},rimFresnelPower:{value:1},rimLift:{value:0},sphereAdd:{value:null},emissionColor:{value:new ne(0,0,0)},outlineWidthTexture:{value:null},outlineWidth:{value:.5},outlineScaledMaxDistance:{value:1},outlineColor:{value:new ne(0,0,0)},outlineLightingMix:{value:1},uvAnimMaskTexture:{value:null},uvAnimOffsetX:{value:0},uvAnimOffsetY:{value:0},uvAnimTheta:{value:0}}]),this.setValues(e),this._updateShaderCode(),this._applyUniforms()}get mainTex(){return this.map}set mainTex(e){this.map=e}get bumpMap(){return this.normalMap}set bumpMap(e){this.normalMap=e}get bumpScale(){return this.normalScale.x}set bumpScale(e){this.normalScale.set(e,e)}get emissionMap(){return this.emissiveMap}set emissionMap(e){this.emissiveMap=e}get blendMode(){return this._blendMode}set blendMode(e){this._blendMode=e,this.depthWrite=this._blendMode!==sn.Transparent,this.transparent=this._blendMode===sn.Transparent||this._blendMode===sn.TransparentWithZWrite,this._updateShaderCode()}get debugMode(){return this._debugMode}set debugMode(e){this._debugMode=e,this._updateShaderCode()}get outlineWidthMode(){return this._outlineWidthMode}set outlineWidthMode(e){this._outlineWidthMode=e,this._updateShaderCode()}get outlineColorMode(){return this._outlineColorMode}set outlineColorMode(e){this._outlineColorMode=e,this._updateShaderCode()}get cullMode(){return this._cullMode}set cullMode(e){this._cullMode=e,this._updateCullFace()}get outlineCullMode(){return this._outlineCullMode}set outlineCullMode(e){this._outlineCullMode=e,this._updateCullFace()}get zWrite(){return this.depthWrite?1:0}set zWrite(e){this.depthWrite=.5<=e}get isOutline(){return this._isOutline}set isOutline(e){this._isOutline=e,this._updateShaderCode(),this._updateCullFace()}updateVRMMaterials(e){this._uvAnimOffsetX=this._uvAnimOffsetX+e*this.uvAnimScrollX,this._uvAnimOffsetY=this._uvAnimOffsetY-e*this.uvAnimScrollY,this._uvAnimPhase=this._uvAnimPhase+e*this.uvAnimRotation,this._applyUniforms()}copy(e){return super.copy(e),this.cutoff=e.cutoff,this.color.copy(e.color),this.shadeColor.copy(e.shadeColor),this.map=e.map,this.mainTex_ST.copy(e.mainTex_ST),this.shadeTexture=e.shadeTexture,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(this.normalScale),this.receiveShadowRate=e.receiveShadowRate,this.receiveShadowTexture=e.receiveShadowTexture,this.shadingGradeRate=e.shadingGradeRate,this.shadingGradeTexture=e.shadingGradeTexture,this.shadeShift=e.shadeShift,this.shadeToony=e.shadeToony,this.lightColorAttenuation=e.lightColorAttenuation,this.indirectLightIntensity=e.indirectLightIntensity,this.rimTexture=e.rimTexture,this.rimColor.copy(e.rimColor),this.rimLightingMix=e.rimLightingMix,this.rimFresnelPower=e.rimFresnelPower,this.rimLift=e.rimLift,this.sphereAdd=e.sphereAdd,this.emissionColor.copy(e.emissionColor),this.emissiveMap=e.emissiveMap,this.outlineWidthTexture=e.outlineWidthTexture,this.outlineWidth=e.outlineWidth,this.outlineScaledMaxDistance=e.outlineScaledMaxDistance,this.outlineColor.copy(e.outlineColor),this.outlineLightingMix=e.outlineLightingMix,this.uvAnimMaskTexture=e.uvAnimMaskTexture,this.uvAnimScrollX=e.uvAnimScrollX,this.uvAnimScrollY=e.uvAnimScrollY,this.uvAnimRotation=e.uvAnimRotation,this.debugMode=e.debugMode,this.blendMode=e.blendMode,this.outlineWidthMode=e.outlineWidthMode,this.outlineColorMode=e.outlineColorMode,this.cullMode=e.cullMode,this.outlineCullMode=e.outlineCullMode,this.isOutline=e.isOutline,this}_applyUniforms(){this.uniforms.uvAnimOffsetX.value=this._uvAnimOffsetX,this.uniforms.uvAnimOffsetY.value=this._uvAnimOffsetY,this.uniforms.uvAnimTheta.value=Uv*this._uvAnimPhase,this.shouldApplyUniforms&&(this.shouldApplyUniforms=!1,this.uniforms.cutoff.value=this.cutoff,this.uniforms.color.value.setRGB(this.color.x,this.color.y,this.color.z),this.uniforms.colorAlpha.value=this.color.w,this.uniforms.shadeColor.value.setRGB(this.shadeColor.x,this.shadeColor.y,this.shadeColor.z),this.uniforms.map.value=this.map,this.uniforms.mainTex_ST.value.copy(this.mainTex_ST),this.uniforms.shadeTexture.value=this.shadeTexture,this.uniforms.normalMap.value=this.normalMap,this.uniforms.normalScale.value.copy(this.normalScale),this.uniforms.receiveShadowRate.value=this.receiveShadowRate,this.uniforms.receiveShadowTexture.value=this.receiveShadowTexture,this.uniforms.shadingGradeRate.value=this.shadingGradeRate,this.uniforms.shadingGradeTexture.value=this.shadingGradeTexture,this.uniforms.shadeShift.value=this.shadeShift,this.uniforms.shadeToony.value=this.shadeToony,this.uniforms.lightColorAttenuation.value=this.lightColorAttenuation,this.uniforms.indirectLightIntensity.value=this.indirectLightIntensity,this.uniforms.rimTexture.value=this.rimTexture,this.uniforms.rimColor.value.setRGB(this.rimColor.x,this.rimColor.y,this.rimColor.z),this.uniforms.rimLightingMix.value=this.rimLightingMix,this.uniforms.rimFresnelPower.value=this.rimFresnelPower,this.uniforms.rimLift.value=this.rimLift,this.uniforms.sphereAdd.value=this.sphereAdd,this.uniforms.emissionColor.value.setRGB(this.emissionColor.x,this.emissionColor.y,this.emissionColor.z),this.uniforms.emissiveMap.value=this.emissiveMap,this.uniforms.outlineWidthTexture.value=this.outlineWidthTexture,this.uniforms.outlineWidth.value=this.outlineWidth,this.uniforms.outlineScaledMaxDistance.value=this.outlineScaledMaxDistance,this.uniforms.outlineColor.value.setRGB(this.outlineColor.x,this.outlineColor.y,this.outlineColor.z),this.uniforms.outlineLightingMix.value=this.outlineLightingMix,this.uniforms.uvAnimMaskTexture.value=this.uvAnimMaskTexture,this.encoding===He&&(this.uniforms.color.value.convertSRGBToLinear(),this.uniforms.shadeColor.value.convertSRGBToLinear(),this.uniforms.rimColor.value.convertSRGBToLinear(),this.uniforms.emissionColor.value.convertSRGBToLinear(),this.uniforms.outlineColor.value.convertSRGBToLinear()),this._updateCullFace())}_updateShaderCode(){const e=this.outlineWidthTexture!==null,t=this.map!==null||this.shadeTexture!==null||this.receiveShadowTexture!==null||this.shadingGradeTexture!==null||this.rimTexture!==null||this.uvAnimMaskTexture!==null;if(this.defines={THREE_VRM_THREE_REVISION:parseInt(Ht,10),OUTLINE:this._isOutline,BLENDMODE_OPAQUE:this._blendMode===sn.Opaque,BLENDMODE_CUTOUT:this._blendMode===sn.Cutout,BLENDMODE_TRANSPARENT:this._blendMode===sn.Transparent||this._blendMode===sn.TransparentWithZWrite,MTOON_USE_UV:e||t,MTOON_UVS_VERTEX_ONLY:e&&!t,USE_SHADETEXTURE:this.shadeTexture!==null,USE_RECEIVESHADOWTEXTURE:this.receiveShadowTexture!==null,USE_SHADINGGRADETEXTURE:this.shadingGradeTexture!==null,USE_RIMTEXTURE:this.rimTexture!==null,USE_SPHEREADD:this.sphereAdd!==null,USE_OUTLINEWIDTHTEXTURE:this.outlineWidthTexture!==null,USE_UVANIMMASKTEXTURE:this.uvAnimMaskTexture!==null,DEBUG_NORMAL:this._debugMode===ki.Normal,DEBUG_LITSHADERATE:this._debugMode===ki.LitShadeRate,DEBUG_UV:this._debugMode===ki.UV,OUTLINE_WIDTH_WORLD:this._outlineWidthMode===Yi.WorldCoordinates,OUTLINE_WIDTH_SCREEN:this._outlineWidthMode===Yi.ScreenCoordinates,OUTLINE_COLOR_FIXED:this._outlineColorMode===Pr.FixedColor,OUTLINE_COLOR_MIXED:this._outlineColorMode===Pr.MixedLighting},this.vertexShader=`// #define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

#include <common>

// #include <uv_pars_vertex>
#ifdef MTOON_USE_UV
  #ifdef MTOON_UVS_VERTEX_ONLY
    vec2 vUv;
  #else
    varying vec2 vUv;
  #endif

  uniform vec4 mainTex_ST;
#endif

#include <uv2_pars_vertex>
// #include <displacementmap_pars_vertex>
// #include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_OUTLINEWIDTHTEXTURE
  uniform sampler2D outlineWidthTexture;
#endif

uniform float outlineWidth;
uniform float outlineScaledMaxDistance;

void main() {

  // #include <uv_vertex>
  #ifdef MTOON_USE_UV
    vUv = uv;
    vUv.y = 1.0 - vUv.y; // uv.y is opposite from UniVRM's
    vUv = mainTex_ST.st + mainTex_ST.pq * vUv;
    vUv.y = 1.0 - vUv.y; // reverting the previous flip
  #endif

  #include <uv2_vertex>
  #include <color_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>

  // we need this to compute the outline properly
  objectNormal = normalize( objectNormal );

  #include <defaultnormal_vertex>

  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED
    vNormal = normalize( transformedNormal );
  #endif

  #include <begin_vertex>

  #include <morphtarget_vertex>
  #include <skinning_vertex>
  // #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

  float outlineTex = 1.0;

  #ifdef OUTLINE
    #ifdef USE_OUTLINEWIDTHTEXTURE
      outlineTex = texture2D( outlineWidthTexture, vUv ).r;
    #endif

    #ifdef OUTLINE_WIDTH_WORLD
      float worldNormalLength = length( transformedNormal );
      vec3 outlineOffset = 0.01 * outlineWidth * outlineTex * worldNormalLength * objectNormal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );
    #endif

    #ifdef OUTLINE_WIDTH_SCREEN
      vec3 clipNormal = ( projectionMatrix * modelViewMatrix * vec4( objectNormal, 0.0 ) ).xyz;
      vec2 projectedNormal = normalize( clipNormal.xy );
      projectedNormal *= min( gl_Position.w, outlineScaledMaxDistance );
      projectedNormal.x *= projectionMatrix[ 0 ].x / projectionMatrix[ 1 ].y;
      gl_Position.xy += 0.01 * outlineWidth * outlineTex * projectedNormal.xy;
    #endif

    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic
  #endif

  #include <worldpos_vertex>
  // #include <envmap_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}`,this.fragmentShader=Oc,parseInt(Ht,10)<137){const n=(this.shadeTexture!==null?Zo("shadeTextureTexelToLinear",this.shadeTexture.encoding)+`
`:"")+(this.sphereAdd!==null?Zo("sphereAddTexelToLinear",this.sphereAdd.encoding)+`
`:"")+(this.rimTexture!==null?Zo("rimTextureTexelToLinear",this.rimTexture.encoding)+`
`:"");this.fragmentShader=n+Oc}this.needsUpdate=!0}_updateCullFace(){this.isOutline?this.outlineCullMode===rn.Off?this.side=an:this.outlineCullMode===rn.Front?this.side=ht:this.outlineCullMode===rn.Back&&(this.side=qn):this.cullMode===rn.Off?this.side=an:this.cullMode===rn.Front?this.side=ht:this.cullMode===rn.Back&&(this.side=qn)}}var Dt;(function(s){s[s.Opaque=0]="Opaque",s[s.Cutout=1]="Cutout",s[s.Transparent=2]="Transparent",s[s.TransparentWithZWrite=3]="TransparentWithZWrite"})(Dt||(Dt={}));class Is extends Sn{constructor(e){super(),this.isVRMUnlitMaterial=!0,this.cutoff=.5,this.map=null,this.mainTex_ST=new Re(0,0,1,1),this._renderType=Dt.Opaque,this.shouldApplyUniforms=!0,e===void 0&&(e={}),e.fog=!0,e.clipping=!0,parseInt(Ht,10)<129&&(e.skinning=e.skinning||!1),parseInt(Ht,10)<131&&(e.morphTargets=e.morphTargets||!1,e.morphNormals=e.morphNormals||!1),e.uniforms=Ta.merge([$.common,$.fog,{cutoff:{value:.5},mainTex_ST:{value:new Re(0,0,1,1)}}]),this.setValues(e),this._updateShaderCode(),this._applyUniforms()}get mainTex(){return this.map}set mainTex(e){this.map=e}get renderType(){return this._renderType}set renderType(e){this._renderType=e,this.depthWrite=this._renderType!==Dt.Transparent,this.transparent=this._renderType===Dt.Transparent||this._renderType===Dt.TransparentWithZWrite,this._updateShaderCode()}updateVRMMaterials(e){this._applyUniforms()}copy(e){return super.copy(e),this.cutoff=e.cutoff,this.map=e.map,this.mainTex_ST.copy(e.mainTex_ST),this.renderType=e.renderType,this}_applyUniforms(){this.shouldApplyUniforms&&(this.shouldApplyUniforms=!1,this.uniforms.cutoff.value=this.cutoff,this.uniforms.map.value=this.map,this.uniforms.mainTex_ST.value.copy(this.mainTex_ST))}_updateShaderCode(){this.defines={RENDERTYPE_OPAQUE:this._renderType===Dt.Opaque,RENDERTYPE_CUTOUT:this._renderType===Dt.Cutout,RENDERTYPE_TRANSPARENT:this._renderType===Dt.Transparent||this._renderType===Dt.TransparentWithZWrite},this.vertexShader=`#include <common>

// #include <uv_pars_vertex>
#ifdef USE_MAP
  varying vec2 vUv;
  uniform vec4 mainTex_ST;
#endif

#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  // #include <uv_vertex>
  #ifdef USE_MAP
    vUv = vec2( mainTex_ST.p * uv.x + mainTex_ST.s, mainTex_ST.q * uv.y + mainTex_ST.t );
  #endif

  #include <uv2_vertex>
  #include <color_vertex>
  #include <skinbase_vertex>

  #ifdef USE_ENVMAP

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>

  #endif

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>

  #include <worldpos_vertex>
  #include <clipping_planes_vertex>
  #include <envmap_vertex>
  #include <fog_vertex>

}`,this.fragmentShader=`#ifdef RENDERTYPE_CUTOUT
  uniform float cutoff;
#endif

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
// #include <alphamap_pars_fragment>
// #include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
// #include <envmap_pars_fragment>
#include <fog_pars_fragment>
// #include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// == main procedure ===========================================================
void main() {
  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( 1.0 );

  #include <logdepthbuf_fragment>

  #include <map_fragment>
  #include <color_fragment>
  // #include <alphamap_fragment>

  // MToon: alpha
  // #include <alphatest_fragment>
  #ifdef RENDERTYPE_CUTOUT
    if ( diffuseColor.a <= cutoff ) { discard; }
    diffuseColor.a = 1.0;
  #endif

  #ifdef RENDERTYPE_OPAQUE
    diffuseColor.a = 1.0;
  #endif

  // #include <specularmap_fragment>

  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

  // accumulation (baked indirect lighting only)
  #ifdef USE_LIGHTMAP
    reflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;
  #else
    reflectedLight.indirectDiffuse += vec3( 1.0 );
  #endif

  // modulation
  // #include <aomap_fragment>

  reflectedLight.indirectDiffuse *= diffuseColor.rgb;
  vec3 outgoingLight = reflectedLight.indirectDiffuse;

  // #include <envmap_fragment>

  gl_FragColor = vec4( outgoingLight, diffuseColor.a );

  #include <premultiplied_alpha_fragment>
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
}`,this.needsUpdate=!0}}class Hv{constructor(e={}){this._encoding=e.encoding||Rt,this._encoding!==Rt&&this._encoding!==He&&console.warn("The specified color encoding might not work properly with VRMMaterialImporter. You might want to use THREE.sRGBEncoding instead."),this._requestEnvMap=e.requestEnvMap}convertGLTFMaterials(e){var t;return lt(this,void 0,void 0,function*(){const n=(t=e.parser.json.extensions)===null||t===void 0?void 0:t.VRM;if(!n)return null;const i=n.materialProperties;if(!i)return null;const r=yield Jh(e),o={},a=[];return yield Promise.all(Array.from(r.entries()).map(([l,c])=>lt(this,void 0,void 0,function*(){const h=e.parser.json.nodes[l],u=e.parser.json.meshes[h.mesh];yield Promise.all(c.map((d,f)=>lt(this,void 0,void 0,function*(){const g=u.primitives[f];if(!g)return;const x=d.geometry,_=x.index?x.index.count:x.attributes.position.count/3;Array.isArray(d.material)||(d.material=[d.material],x.addGroup(0,_,0));const m=g.material;let p,T=i[m];T||(console.warn(`VRMMaterialImporter: There are no material definition for material #${m} on VRM extension.`),T={shader:"VRM_USE_GLTFSHADER"}),o[m]?p=o[m]:(p=yield this.createVRMMaterials(d.material[0],T,e),o[m]=p,a.push(p.surface),p.outline&&a.push(p.outline)),d.material[0]=p.surface,this._requestEnvMap&&p.surface.isMeshStandardMaterial&&this._requestEnvMap().then(b=>{p.surface.envMap=b,p.surface.needsUpdate=!0}),d.renderOrder=T.renderQueue||2e3,p.outline&&(d.material[1]=p.outline,x.addGroup(0,_,1))})))}))),a})}createVRMMaterials(e,t,n){return lt(this,void 0,void 0,function*(){let i,r;if(t.shader==="VRM/MToon"){const o=yield this._extractMaterialProperties(e,t,n);["srcBlend","dstBlend","isFirstSetup"].forEach(a=>{o[a]!==void 0&&delete o[a]}),["mainTex","shadeTexture","emissionMap","sphereAdd","rimTexture"].forEach(a=>{o[a]!==void 0&&(o[a].encoding=this._encoding)}),o.encoding=this._encoding,i=new Bc(o),o.outlineWidthMode!==Yi.None&&(o.isOutline=!0,r=new Bc(o))}else if(t.shader==="VRM/UnlitTexture"){const o=yield this._extractMaterialProperties(e,t,n);o.renderType=Dt.Opaque,i=new Is(o)}else if(t.shader==="VRM/UnlitCutout"){const o=yield this._extractMaterialProperties(e,t,n);o.renderType=Dt.Cutout,i=new Is(o)}else if(t.shader==="VRM/UnlitTransparent"){const o=yield this._extractMaterialProperties(e,t,n);o.renderType=Dt.Transparent,i=new Is(o)}else if(t.shader==="VRM/UnlitTransparentZWrite"){const o=yield this._extractMaterialProperties(e,t,n);o.renderType=Dt.TransparentWithZWrite,i=new Is(o)}else t.shader!=="VRM_USE_GLTFSHADER"&&console.warn(`Unknown shader detected: "${t.shader}"`),i=this._convertGLTFMaterial(e.clone());return i.name=e.name,i.userData=JSON.parse(JSON.stringify(e.userData)),i.userData.vrmMaterialProperties=t,r&&(r.name=e.name+" (Outline)",r.userData=JSON.parse(JSON.stringify(e.userData)),r.userData.vrmMaterialProperties=t),{surface:i,outline:r}})}_renameMaterialProperty(e){return e[0]!=="_"?(console.warn(`VRMMaterials: Given property name "${e}" might be invalid`),e):(e=e.substring(1),/[A-Z]/.test(e[0])?e[0].toLowerCase()+e.substring(1):(console.warn(`VRMMaterials: Given property name "${e}" might be invalid`),e))}_convertGLTFMaterial(e){if(e.isMeshStandardMaterial){const t=e;t.map&&(t.map.encoding=this._encoding),t.emissiveMap&&(t.emissiveMap.encoding=this._encoding),this._encoding===Rt&&(t.color.convertLinearToSRGB(),t.emissive.convertLinearToSRGB())}if(e.isMeshBasicMaterial){const t=e;t.map&&(t.map.encoding=this._encoding),this._encoding===Rt&&t.color.convertLinearToSRGB()}return e}_extractMaterialProperties(e,t,n){const i=[],r={};if(t.textureProperties)for(const o of Object.keys(t.textureProperties)){const a=this._renameMaterialProperty(o),l=t.textureProperties[o];i.push(n.parser.getDependency("texture",l).then(c=>{r[a]=c}))}if(t.floatProperties)for(const o of Object.keys(t.floatProperties)){const a=this._renameMaterialProperty(o);r[a]=t.floatProperties[o]}if(t.vectorProperties)for(const o of Object.keys(t.vectorProperties)){let a=this._renameMaterialProperty(o);["_MainTex","_ShadeTexture","_BumpMap","_ReceiveShadowTexture","_ShadingGradeTexture","_RimTexture","_SphereAdd","_EmissionMap","_OutlineWidthTexture","_UvAnimMaskTexture"].some(l=>o===l)&&(a+="_ST"),r[a]=new Re(...t.vectorProperties[o])}return parseInt(Ht,10)<129&&(r.skinning=e.skinning||!1),parseInt(Ht,10)<131&&(r.morphTargets=e.morphTargets||!1,r.morphNormals=e.morphNormals||!1),Promise.all(i).then(()=>r)}}class kv{constructor(e){var t;this.ignoreTexture=(t=e==null?void 0:e.ignoreTexture)!==null&&t!==void 0&&t}import(e){var t;return lt(this,void 0,void 0,function*(){const n=(t=e.parser.json.extensions)===null||t===void 0?void 0:t.VRM;if(!n)return null;const i=n.meta;if(!i)return null;let r;return this.ignoreTexture||i.texture==null||i.texture===-1||(r=yield e.parser.getDependency("texture",i.texture)),{allowedUserName:i.allowedUserName,author:i.author,commercialUssageName:i.commercialUssageName,contactInformation:i.contactInformation,licenseName:i.licenseName,otherLicenseUrl:i.otherLicenseUrl,otherPermissionUrl:i.otherPermissionUrl,reference:i.reference,sexualUssageName:i.sexualUssageName,texture:r??void 0,title:i.title,version:i.version,violentUssageName:i.violentUssageName}})}}const Gv=new de;function Qh(s){return s.invert?s.invert():s.getInverse(Gv.copy(s)),s}class Vv{constructor(e){this._inverseCache=new de,this._shouldUpdateInverse=!0,this.matrix=e;const t={set:(n,i,r)=>(this._shouldUpdateInverse=!0,n[i]=r,!0)};this._originalElements=e.elements,e.elements=new Proxy(e.elements,t)}get inverse(){return this._shouldUpdateInverse&&(Qh(this._inverseCache.copy(this.matrix)),this._shouldUpdateInverse=!1),this._inverseCache}revert(){this.matrix.elements=this._originalElements}}const Wv=Object.freeze(new de),qv=Object.freeze(new it),Ni=new S,zc=new S,Xv=new S,jv=new it,vt=new de,Ns=new de;class Yv{constructor(e,t={}){var n,i,r,o,a,l;if(this._currentTail=new S,this._prevTail=new S,this._nextTail=new S,this._boneAxis=new S,this._centerSpacePosition=new S,this._center=null,this._parentWorldRotation=new it,this._initialLocalMatrix=new de,this._initialLocalRotation=new it,this._initialLocalChildPosition=new S,this.bone=e,this.bone.matrixAutoUpdate=!1,this.radius=(n=t.radius)!==null&&n!==void 0?n:.02,this.stiffnessForce=(i=t.stiffnessForce)!==null&&i!==void 0?i:1,this.gravityDir=t.gravityDir?new S().copy(t.gravityDir):new S().set(0,-1,0),this.gravityPower=(r=t.gravityPower)!==null&&r!==void 0?r:0,this.dragForce=(o=t.dragForce)!==null&&o!==void 0?o:.4,this.colliders=(a=t.colliders)!==null&&a!==void 0?a:[],this._centerSpacePosition.setFromMatrixPosition(this.bone.matrixWorld),this._initialLocalMatrix.copy(this.bone.matrix),this._initialLocalRotation.copy(this.bone.quaternion),this.bone.children.length===0)this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);else{const c=this.bone.children[0];this._initialLocalChildPosition.copy(c.position)}this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)),this._prevTail.copy(this._currentTail),this._nextTail.copy(this._currentTail),this._boneAxis.copy(this._initialLocalChildPosition).normalize(),this._centerSpaceBoneLength=Ni.copy(this._initialLocalChildPosition).applyMatrix4(this.bone.matrixWorld).sub(this._centerSpacePosition).length(),this.center=(l=t.center)!==null&&l!==void 0?l:null}get center(){return this._center}set center(e){var t;this._getMatrixCenterToWorld(vt),this._currentTail.applyMatrix4(vt),this._prevTail.applyMatrix4(vt),this._nextTail.applyMatrix4(vt),!((t=this._center)===null||t===void 0)&&t.userData.inverseCacheProxy&&(this._center.userData.inverseCacheProxy.revert(),delete this._center.userData.inverseCacheProxy),this._center=e,this._center&&(this._center.userData.inverseCacheProxy||(this._center.userData.inverseCacheProxy=new Vv(this._center.matrixWorld))),this._getMatrixWorldToCenter(vt),this._currentTail.applyMatrix4(vt),this._prevTail.applyMatrix4(vt),this._nextTail.applyMatrix4(vt),vt.multiply(this.bone.matrixWorld),this._centerSpacePosition.setFromMatrixPosition(vt),this._centerSpaceBoneLength=Ni.copy(this._initialLocalChildPosition).applyMatrix4(vt).sub(this._centerSpacePosition).length()}reset(){this.bone.quaternion.copy(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(),this.bone.matrix),this._centerSpacePosition.setFromMatrixPosition(this.bone.matrixWorld),this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)),this._prevTail.copy(this._currentTail),this._nextTail.copy(this._currentTail)}update(e){if(e<=0)return;this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(),this.bone.matrix),this.bone.parent?Hs(this.bone.parent,this._parentWorldRotation):this._parentWorldRotation.copy(qv),this._getMatrixWorldToCenter(vt),vt.multiply(this.bone.matrixWorld),this._centerSpacePosition.setFromMatrixPosition(vt),this._getMatrixWorldToCenter(Ns),Ns.multiply(this._getParentMatrixWorld());const t=this.stiffnessForce*e,n=zc.copy(this.gravityDir).multiplyScalar(this.gravityPower*e);this._nextTail.copy(this._currentTail).add(Ni.copy(this._currentTail).sub(this._prevTail).multiplyScalar(1-this.dragForce)).add(Ni.copy(this._boneAxis).applyMatrix4(this._initialLocalMatrix).applyMatrix4(Ns).sub(this._centerSpacePosition).normalize().multiplyScalar(t)).add(n),this._nextTail.sub(this._centerSpacePosition).normalize().multiplyScalar(this._centerSpaceBoneLength).add(this._centerSpacePosition),this._collision(this._nextTail),this._prevTail.copy(this._currentTail),this._currentTail.copy(this._nextTail);const i=Qh(vt.copy(Ns.multiply(this._initialLocalMatrix))),r=jv.setFromUnitVectors(this._boneAxis,Ni.copy(this._nextTail).applyMatrix4(i).normalize());this.bone.quaternion.copy(this._initialLocalRotation).multiply(r),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(),this.bone.matrix)}_collision(e){this.colliders.forEach(t=>{this._getMatrixWorldToCenter(vt),vt.multiply(t.matrixWorld);const n=Ni.setFromMatrixPosition(vt),i=t.geometry.boundingSphere.radius,r=this.radius+i;if(e.distanceToSquared(n)<=r*r){const o=zc.subVectors(e,n).normalize(),a=Xv.addVectors(n,o.multiplyScalar(r));e.copy(a.sub(this._centerSpacePosition).normalize().multiplyScalar(this._centerSpaceBoneLength).add(this._centerSpacePosition))}})}_getMatrixCenterToWorld(e){return this._center?e.copy(this._center.matrixWorld):e.identity(),e}_getMatrixWorldToCenter(e){return this._center?e.copy(this._center.userData.inverseCacheProxy.inverse):e.identity(),e}_getParentMatrixWorld(){return this.bone.parent?this.bone.parent.matrixWorld:Wv}}class Zv{constructor(e,t){this.colliderGroups=[],this.springBoneGroupList=[],this.colliderGroups=e,this.springBoneGroupList=t}setCenter(e){this.springBoneGroupList.forEach(t=>{t.forEach(n=>{n.center=e})})}lateUpdate(e){this.springBoneGroupList.forEach(t=>{t.forEach(n=>{n.update(e)})})}reset(){this.springBoneGroupList.forEach(e=>{e.forEach(t=>{t.reset()})})}}const Jv=new S,Kv=new Jt({visible:!1});class $v{import(e){var t;return lt(this,void 0,void 0,function*(){const n=(t=e.parser.json.extensions)===null||t===void 0?void 0:t.VRM;if(!n)return null;const i=n.secondaryAnimation;if(!i)return null;const r=yield this._importColliderMeshGroups(e,i),o=yield this._importSpringBoneGroupList(e,i,r);return new Zv(r,o)})}_createSpringBone(e,t={}){return new Yv(e,t)}_importSpringBoneGroupList(e,t,n){return lt(this,void 0,void 0,function*(){const i=t.boneGroups||[],r=[];return yield Promise.all(i.map(o=>lt(this,void 0,void 0,function*(){if(o.stiffiness===void 0||o.gravityDir===void 0||o.gravityDir.x===void 0||o.gravityDir.y===void 0||o.gravityDir.z===void 0||o.gravityPower===void 0||o.dragForce===void 0||o.hitRadius===void 0||o.colliderGroups===void 0||o.bones===void 0||o.center===void 0)return;const a=o.stiffiness,l=new S(o.gravityDir.x,o.gravityDir.y,-o.gravityDir.z),c=o.gravityPower,h=o.dragForce,u=o.hitRadius,d=[];o.colliderGroups.forEach(g=>{d.push(...n[g].colliders)});const f=[];yield Promise.all(o.bones.map(g=>lt(this,void 0,void 0,function*(){const x=yield e.parser.getDependency("node",g),_=o.center!==-1?yield e.parser.getDependency("node",o.center):null;x&&x.traverse(m=>{const p=this._createSpringBone(m,{radius:u,stiffnessForce:a,gravityDir:l,gravityPower:c,dragForce:h,colliders:d,center:_});f.push(p)})}))),r.push(f)}))),r})}_importColliderMeshGroups(e,t){return lt(this,void 0,void 0,function*(){const n=t.colliderGroups;if(n===void 0)return[];const i=[];return n.forEach(r=>lt(this,void 0,void 0,function*(){if(r.node===void 0||r.colliders===void 0)return;const o=yield e.parser.getDependency("node",r.node),a=[];r.colliders.forEach(c=>{if(c.offset===void 0||c.offset.x===void 0||c.offset.y===void 0||c.offset.z===void 0||c.radius===void 0)return;const h=Jv.set(c.offset.x,c.offset.y,-c.offset.z),u=this._createColliderMesh(c.radius,h);o.add(u),a.push(u)});const l={node:r.node,colliders:a};i.push(l)})),i})}_createColliderMesh(e,t){const n=new bt(new Ba(e,8,4),Kv);return n.position.copy(t),n.name="vrmColliderSphere",n.geometry.computeBoundingSphere(),n}}class Qv{constructor(e={}){this._metaImporter=e.metaImporter||new kv,this._blendShapeImporter=e.blendShapeImporter||new Tv,this._lookAtImporter=e.lookAtImporter||new zv,this._humanoidImporter=e.humanoidImporter||new Pv,this._firstPersonImporter=e.firstPersonImporter||new Lv,this._materialImporter=e.materialImporter||new Hv,this._springBoneImporter=e.springBoneImporter||new $v}import(e){return lt(this,void 0,void 0,function*(){if(e.parser.json.extensions===void 0||e.parser.json.extensions.VRM===void 0)throw new Error("Could not find VRM extension on the GLTF");const t=e.scene;t.updateMatrixWorld(!1),t.traverse(h=>{h.isMesh&&(h.frustumCulled=!1)});const n=(yield this._metaImporter.import(e))||void 0,i=(yield this._materialImporter.convertGLTFMaterials(e))||void 0,r=(yield this._humanoidImporter.import(e))||void 0,o=r&&(yield this._firstPersonImporter.import(e,r))||void 0,a=(yield this._blendShapeImporter.import(e))||void 0,l=o&&a&&r&&(yield this._lookAtImporter.import(e,o,a,r))||void 0,c=(yield this._springBoneImporter.import(e))||void 0;return new eu({scene:e.scene,meta:n,materials:i,humanoid:r,firstPerson:o,blendShapeProxy:a,lookAt:l,springBoneManager:c})})}}class eu{constructor(e){this.scene=e.scene,this.humanoid=e.humanoid,this.blendShapeProxy=e.blendShapeProxy,this.firstPerson=e.firstPerson,this.lookAt=e.lookAt,this.materials=e.materials,this.springBoneManager=e.springBoneManager,this.meta=e.meta}static from(e,t={}){return lt(this,void 0,void 0,function*(){return yield new Qv(t).import(e)})}update(e){this.lookAt&&this.lookAt.update(e),this.blendShapeProxy&&this.blendShapeProxy.update(),this.springBoneManager&&this.springBoneManager.lateUpdate(e),this.materials&&this.materials.forEach(t=>{t.updateVRMMaterials&&t.updateVRMMaterials(e)})}dispose(){var e,t;const n=this.scene;n&&n.traverse(mv),(t=(e=this.meta)===null||e===void 0?void 0:e.texture)===null||t===void 0||t.dispose()}}new jr(-1,1,-1,1,-1,1);const ey=new Jt({color:16777215,side:an}),ty=new bt(new Zs(2,2),ey),ny=new $s;ny.add(ty);new Jt({color:16711935,wireframe:!0,transparent:!0,depthTest:!1});const et=(s,e,t)=>Math.max(Math.min(s,t),e),Zt=(s,e,t)=>(et(s,e,t)-e)/(t-e),Fi={Pose:{RightUpperArm:{z:-1.25},LeftUpperArm:{z:1.25},LeftUpperLeg:{x:0,y:0,z:0},RightUpperLeg:{x:0,y:0,z:0},RightLowerLeg:{x:0,y:0,z:0},LeftLowerLeg:{x:0,y:0,z:0}}},$e="Right",Vt="Left",ke=Math.PI,Oi=Math.PI*2;class P{constructor(e,t,n){var i,r,o,a,l,c;if(Array.isArray(e)){this.x=(i=e[0])!==null&&i!==void 0?i:0,this.y=(r=e[1])!==null&&r!==void 0?r:0,this.z=(o=e[2])!==null&&o!==void 0?o:0;return}if(e&&typeof e=="object"){this.x=(a=e.x)!==null&&a!==void 0?a:0,this.y=(l=e.y)!==null&&l!==void 0?l:0,this.z=(c=e.z)!==null&&c!==void 0?c:0;return}this.x=e??0,this.y=t??0,this.z=n??0}negative(){return new P(-this.x,-this.y,-this.z)}add(e){return e instanceof P?new P(this.x+e.x,this.y+e.y,this.z+e.z):new P(this.x+e,this.y+e,this.z+e)}subtract(e){return e instanceof P?new P(this.x-e.x,this.y-e.y,this.z-e.z):new P(this.x-e,this.y-e,this.z-e)}multiply(e){return e instanceof P?new P(this.x*e.x,this.y*e.y,this.z*e.z):new P(this.x*e,this.y*e,this.z*e)}divide(e){return e instanceof P?new P(this.x/e.x,this.y/e.y,this.z/e.z):new P(this.x/e,this.y/e,this.z/e)}equals(e){return this.x==e.x&&this.y==e.y&&this.z==e.z}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}cross(e){return new P(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)}length(){return Math.sqrt(this.dot(this))}distance(e,t=3){return Math.sqrt(t===2?Math.pow(this.x-e.x,2)+Math.pow(this.y-e.y,2):Math.pow(this.x-e.x,2)+Math.pow(this.y-e.y,2)+Math.pow(this.z-e.z,2))}lerp(e,t){return e.subtract(this).multiply(t).add(this)}unit(){return this.divide(this.length())}min(){return Math.min(Math.min(this.x,this.y),this.z)}max(){return Math.max(Math.max(this.x,this.y),this.z)}toSphericalCoords(e={x:"x",y:"y",z:"z"}){return{theta:Math.atan2(this[e.y],this[e.x]),phi:Math.acos(this[e.z]/this.length())}}angleTo(e){return Math.acos(this.dot(e)/(this.length()*e.length()))}toArray(e){return[this.x,this.y,this.z].slice(0,e||3)}clone(){return new P(this.x,this.y,this.z)}init(e,t,n){return this.x=e,this.y=t,this.z=n,this}static negative(e,t=new P){return t.x=-e.x,t.y=-e.y,t.z=-e.z,t}static add(e,t,n=new P){return t instanceof P?(n.x=e.x+t.x,n.y=e.y+t.y,n.z=e.z+t.z):(n.x=e.x+t,n.y=e.y+t,n.z=e.z+t),n}static subtract(e,t,n=new P){return t instanceof P?(n.x=e.x-t.x,n.y=e.y-t.y,n.z=e.z-t.z):(n.x=e.x-t,n.y=e.y-t,n.z=e.z-t),n}static multiply(e,t,n=new P){return t instanceof P?(n.x=e.x*t.x,n.y=e.y*t.y,n.z=e.z*t.z):(n.x=e.x*t,n.y=e.y*t,n.z=e.z*t),n}static divide(e,t,n=new P){return t instanceof P?(n.x=e.x/t.x,n.y=e.y/t.y,n.z=e.z/t.z):(n.x=e.x/t,n.y=e.y/t,n.z=e.z/t),n}static cross(e,t,n=new P){return n.x=e.y*t.z-e.z*t.y,n.y=e.z*t.x-e.x*t.z,n.z=e.x*t.y-e.y*t.x,n}static unit(e,t){const n=e.length();return t.x=e.x/n,t.y=e.y/n,t.z=e.z/n,t}static fromAngles(e,t){return new P(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t))}static randomDirection(){return P.fromAngles(Math.random()*Oi,Math.asin(Math.random()*2-1))}static min(e,t){return new P(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z))}static max(e,t){return new P(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))}static lerp(e,t,n){return t instanceof P?t.subtract(e).multiply(n).add(e):(t-e)*n+e}static fromArray(e){return Array.isArray(e)?new P(e[0],e[1],e[2]):new P(e.x,e.y,e.z)}static angleBetween(e,t){return e.angleTo(t)}static distance(e,t,n){return Math.sqrt(n===2?Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2):Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2))}static toDegrees(e){return e*(180/ke)}static normalizeAngle(e){let t=e%Oi;return t=t>ke?t-Oi:t<-ke?Oi+t:t,t/ke}static normalizeRadians(e){return e>=ke/2&&(e-=Oi),e<=-ke/2&&(e+=Oi,e=ke-e),e/ke}static find2DAngle(e,t,n,i){const r=i-t,o=n-e;return Math.atan2(r,o)}static findRotation(e,t,n=!0){return n?new P(P.normalizeRadians(P.find2DAngle(e.z,e.x,t.z,t.x)),P.normalizeRadians(P.find2DAngle(e.z,e.y,t.z,t.y)),P.normalizeRadians(P.find2DAngle(e.x,e.y,t.x,t.y))):new P(P.find2DAngle(e.z,e.x,t.z,t.x),P.find2DAngle(e.z,e.y,t.z,t.y),P.find2DAngle(e.x,e.y,t.x,t.y))}static rollPitchYaw(e,t,n){if(!n)return new P(P.normalizeAngle(P.find2DAngle(e.z,e.y,t.z,t.y)),P.normalizeAngle(P.find2DAngle(e.z,e.x,t.z,t.x)),P.normalizeAngle(P.find2DAngle(e.x,e.y,t.x,t.y)));const i=t.subtract(e),r=n.subtract(e),a=i.cross(r).unit(),l=i.unit(),c=a.cross(l),h=Math.asin(a.x)||0,u=Math.atan2(-a.y,a.z)||0,d=Math.atan2(-c.x,l.x)||0;return new P(P.normalizeAngle(u),P.normalizeAngle(h),P.normalizeAngle(d))}static angleBetween3DCoords(e,t,n){e instanceof P||(e=new P(e),t=new P(t),n=new P(n));const i=e.subtract(t),r=n.subtract(t),o=i.unit(),a=r.unit(),l=o.dot(a),c=Math.acos(l);return P.normalizeRadians(c)}static getRelativeSphericalCoords(e,t,n,i){e instanceof P||(e=new P(e),t=new P(t),n=new P(n));const r=t.subtract(e),o=n.subtract(t),a=r.unit(),l=o.unit(),{theta:c,phi:h}=a.toSphericalCoords(i),{theta:u,phi:d}=l.toSphericalCoords(i),f=c-u,g=h-d;return{theta:P.normalizeAngle(f),phi:P.normalizeAngle(g)}}static getSphericalCoords(e,t,n={x:"x",y:"y",z:"z"}){e instanceof P||(e=new P(e),t=new P(t));const r=t.subtract(e).unit(),{theta:o,phi:a}=r.toSphericalCoords(n);return{theta:P.normalizeAngle(-o),phi:P.normalizeAngle(ke/2-a)}}}const tu=s=>{const e={r:P.findRotation(s[11],s[13]),l:P.findRotation(s[12],s[14])};e.r.y=P.angleBetween3DCoords(s[12],s[11],s[13]),e.l.y=P.angleBetween3DCoords(s[11],s[12],s[14]);const t={r:P.findRotation(s[13],s[15]),l:P.findRotation(s[14],s[16])};t.r.y=P.angleBetween3DCoords(s[11],s[13],s[15]),t.l.y=P.angleBetween3DCoords(s[12],s[14],s[16]),t.r.z=et(t.r.z,-2.14,0),t.l.z=et(t.l.z,-2.14,0);const n={r:P.findRotation(P.fromArray(s[15]),P.lerp(P.fromArray(s[17]),P.fromArray(s[19]),.5)),l:P.findRotation(P.fromArray(s[16]),P.lerp(P.fromArray(s[18]),P.fromArray(s[20]),.5))},i=Uc(e.r,t.r,n.r,$e),r=Uc(e.l,t.l,n.l,Vt);return{UpperArm:{r:i.UpperArm,l:r.UpperArm},LowerArm:{r:i.LowerArm,l:r.LowerArm},Hand:{r:i.Hand,l:r.Hand},Unscaled:{UpperArm:e,LowerArm:t,Hand:n}}},Uc=(s,e,t,n=$e)=>{const i=n===$e?1:-1;return s.z*=-2.3*i,s.y*=ke*i,s.y-=Math.max(e.x),s.y-=-i*Math.max(e.z,0),s.x-=.3*i,e.z*=-2.14*i,e.y*=2.14*i,e.x*=2.14*i,s.x=et(s.x,-.5,ke),e.x=et(e.x,-.3,.3),t.y=et(t.z*2,-.6,.6),t.z=t.z*-2.3*i,{UpperArm:s,LowerArm:e,Hand:t}},nu=(s,e)=>{const t=P.fromArray(e[23]),n=P.fromArray(e[24]),i=P.fromArray(e[11]),r=P.fromArray(e[12]),o=t.lerp(n,1),a=i.lerp(r,1),l=o.distance(a),c={position:{x:et(o.x-.4,-1,1),y:0,z:et(l-1,-2,0)}};c.worldPosition={x:c.position.x,y:0,z:c.position.z*Math.pow(c.position.z*-2,2)},c.worldPosition.x*=c.worldPosition.z,c.rotation=P.rollPitchYaw(s[23],s[24]),c.rotation.y>.5&&(c.rotation.y-=2),c.rotation.y+=.5,c.rotation.z>0&&(c.rotation.z=1-c.rotation.z),c.rotation.z<0&&(c.rotation.z=-1-c.rotation.z);const h=Zt(Math.abs(c.rotation.y),.2,.4);c.rotation.z*=1-h,c.rotation.x=0;const u=P.rollPitchYaw(s[11],s[12]);u.y>.5&&(u.y-=2),u.y+=.5,u.z>0&&(u.z=1-u.z),u.z<0&&(u.z=-1-u.z);const d=Zt(Math.abs(u.y),.2,.4);return u.z*=1-d,u.x=0,iy(c,u)},iy=(s,e)=>(s.rotation&&(s.rotation.x*=Math.PI,s.rotation.y*=Math.PI,s.rotation.z*=Math.PI),e.x*=ke,e.y*=ke,e.z*=ke,{Hips:s,Spine:e});class ks{constructor(e,t,n,i){var r,o,a,l;if(e&&typeof e=="object"){this.x=(r=e.x)!==null&&r!==void 0?r:0,this.y=(o=e.y)!==null&&o!==void 0?o:0,this.z=(a=e.z)!==null&&a!==void 0?a:0,this.rotationOrder=(l=e.rotationOrder)!==null&&l!==void 0?l:"XYZ";return}this.x=e??0,this.y=t??0,this.z=n??0,this.rotationOrder=i??"XYZ"}multiply(e){return new ks(this.x*e,this.y*e,this.z*e,this.rotationOrder)}}const ry={upperLeg:{z:.1}},iu=s=>{const e=P.getSphericalCoords(s[23],s[25],{x:"y",y:"z",z:"x"}),t=P.getSphericalCoords(s[24],s[26],{x:"y",y:"z",z:"x"}),n=P.getRelativeSphericalCoords(s[23],s[25],s[27],{x:"y",y:"z",z:"x"}),i=P.getRelativeSphericalCoords(s[24],s[26],s[28],{x:"y",y:"z",z:"x"}),r=P.findRotation(s[23],s[24]),o={r:new P({x:e.theta,y:n.phi,z:e.phi-r.z}),l:new P({x:t.theta,y:i.phi,z:t.phi-r.z})},a={r:new P({x:-Math.abs(n.theta),y:0,z:0}),l:new P({x:-Math.abs(i.theta),y:0,z:0})},l=Hc(o.r,a.r,$e),c=Hc(o.l,a.l,Vt);return{UpperLeg:{r:l.UpperLeg,l:c.UpperLeg},LowerLeg:{r:l.LowerLeg,l:c.LowerLeg},Unscaled:{UpperLeg:o,LowerLeg:a}}},Hc=(s,e,t=$e)=>{const n=t===$e?1:-1,i=new ks({x:et(s.x,0,.5)*ke,y:et(s.y,-.25,.25)*ke,z:et(s.z,-.5,.5)*ke+n*ry.upperLeg.z,rotationOrder:"XYZ"}),r=new ks({x:e.x*ke,y:e.y*ke,z:e.z*ke});return{UpperLeg:i,LowerLeg:r}};class oo{static solve(e,t,{runtime:n="mediapipe",video:i=null,imageSize:r=null,enableLegs:o=!0}={}){var a,l,c,h;if(!e&&!t){console.error("Need both World Pose and Pose Landmarks");return}if(i){const p=typeof i=="string"?document.querySelector(i):i;r={width:p.videoWidth,height:p.videoHeight}}if(n==="tfjs"&&r){for(const p of e)p.visibility=p.score;for(const p of t)p.x/=r.width,p.y/=r.height,p.z=0,p.visibility=p.score}const u=tu(e),d=nu(e,t),f=o?iu(e):null,g=e[15].y>.1||((a=e[15].visibility)!==null&&a!==void 0?a:0)<.23||.995<t[15].y,x=e[16].y>.1||((l=e[16].visibility)!==null&&l!==void 0?l:0)<.23||.995<t[16].y,_=e[23].y>.1||((c=e[23].visibility)!==null&&c!==void 0?c:0)<.63||d.Hips.position.z>-.4,m=e[24].y>.1||((h=e[24].visibility)!==null&&h!==void 0?h:0)<.63||d.Hips.position.z>-.4;return u.UpperArm.l=u.UpperArm.l.multiply(x?0:1),u.UpperArm.l.z=x?Fi.Pose.LeftUpperArm.z:u.UpperArm.l.z,u.UpperArm.r=u.UpperArm.r.multiply(g?0:1),u.UpperArm.r.z=g?Fi.Pose.RightUpperArm.z:u.UpperArm.r.z,u.LowerArm.l=u.LowerArm.l.multiply(x?0:1),u.LowerArm.r=u.LowerArm.r.multiply(g?0:1),u.Hand.l=u.Hand.l.multiply(x?0:1),u.Hand.r=u.Hand.r.multiply(g?0:1),f&&(f.UpperLeg.l=f.UpperLeg.l.multiply(m?0:1),f.UpperLeg.r=f.UpperLeg.r.multiply(_?0:1),f.LowerLeg.l=f.LowerLeg.l.multiply(m?0:1),f.LowerLeg.r=f.LowerLeg.r.multiply(_?0:1)),{RightUpperArm:u.UpperArm.r,RightLowerArm:u.LowerArm.r,LeftUpperArm:u.UpperArm.l,LeftLowerArm:u.LowerArm.l,RightHand:u.Hand.r,LeftHand:u.Hand.l,RightUpperLeg:f?f.UpperLeg.r:Fi.Pose.RightUpperLeg,RightLowerLeg:f?f.LowerLeg.r:Fi.Pose.RightLowerLeg,LeftUpperLeg:f?f.UpperLeg.l:Fi.Pose.LeftUpperLeg,LeftLowerLeg:f?f.LowerLeg.l:Fi.Pose.LeftLowerLeg,Hips:d.Hips,Spine:d.Spine}}}oo.calcArms=tu;oo.calcHips=nu;oo.calcLegs=iu;class sy{static solve(e,t=$e){if(!e){console.error("Need Hand Landmarks");return}const n=[new P(e[0]),new P(e[t===$e?17:5]),new P(e[t===$e?5:17])],i=P.rollPitchYaw(n[0],n[1],n[2]);i.y=i.z,i.y-=.4;let r={};return r[t+"Wrist"]={x:i.x,y:i.y,z:i.z},r[t+"RingProximal"]={x:0,y:0,z:P.angleBetween3DCoords(e[0],e[13],e[14])},r[t+"RingIntermediate"]={x:0,y:0,z:P.angleBetween3DCoords(e[13],e[14],e[15])},r[t+"RingDistal"]={x:0,y:0,z:P.angleBetween3DCoords(e[14],e[15],e[16])},r[t+"IndexProximal"]={x:0,y:0,z:P.angleBetween3DCoords(e[0],e[5],e[6])},r[t+"IndexIntermediate"]={x:0,y:0,z:P.angleBetween3DCoords(e[5],e[6],e[7])},r[t+"IndexDistal"]={x:0,y:0,z:P.angleBetween3DCoords(e[6],e[7],e[8])},r[t+"MiddleProximal"]={x:0,y:0,z:P.angleBetween3DCoords(e[0],e[9],e[10])},r[t+"MiddleIntermediate"]={x:0,y:0,z:P.angleBetween3DCoords(e[9],e[10],e[11])},r[t+"MiddleDistal"]={x:0,y:0,z:P.angleBetween3DCoords(e[10],e[11],e[12])},r[t+"ThumbProximal"]={x:0,y:0,z:P.angleBetween3DCoords(e[0],e[1],e[2])},r[t+"ThumbIntermediate"]={x:0,y:0,z:P.angleBetween3DCoords(e[1],e[2],e[3])},r[t+"ThumbDistal"]={x:0,y:0,z:P.angleBetween3DCoords(e[2],e[3],e[4])},r[t+"LittleProximal"]={x:0,y:0,z:P.angleBetween3DCoords(e[0],e[17],e[18])},r[t+"LittleIntermediate"]={x:0,y:0,z:P.angleBetween3DCoords(e[17],e[18],e[19])},r[t+"LittleDistal"]={x:0,y:0,z:P.angleBetween3DCoords(e[18],e[19],e[20])},r=oy(r,t),r}}const oy=(s,e=$e)=>{const t=e===$e?1:-1,n=["Ring","Index","Little","Thumb","Middle"],i=["Proximal","Intermediate","Distal"];return s[e+"Wrist"].x=et(s[e+"Wrist"].x*2*t,-.3,.3),s[e+"Wrist"].y=et(s[e+"Wrist"].y*2.3,e===$e?-1.2:-.6,e===$e?.6:1.6),s[e+"Wrist"].z=s[e+"Wrist"].z*-2.3*t,n.forEach(r=>{i.forEach(o=>{const a=s[e+r+o];if(r==="Thumb"){const l={x:o==="Proximal"?2.2:0,y:o==="Proximal"?2.2:o==="Intermediate"?.7:1,z:.5},c={x:o==="Proximal"?1.2:-.2,y:o==="Proximal"?1.1*t:.1*t,z:.2*t},h={x:0,y:0,z:0};o==="Proximal"?(h.z=et(c.z+a.z*-ke*l.z*t,e===$e?-.6:-.3,e===$e?.3:.6),h.x=et(c.x+a.z*-ke*l.x,-.6,.3),h.y=et(c.y+a.z*-ke*l.y*t,e===$e?-1:-.3,e===$e?.3:1)):(h.z=et(c.z+a.z*-ke*l.z*t,-2,2),h.x=et(c.x+a.z*-ke*l.x,-2,2),h.y=et(c.y+a.z*-ke*l.y*t,-2,2)),a.x=h.x,a.y=h.y,a.z=h.z}else a.z=et(a.z*-ke*t,e===$e?-ke:0,e===$e?0:ke)})}),s},ay=s=>{const e=new P(s[21]),t=new P(s[251]),n=new P(s[397]),i=new P(s[172]),r=n.lerp(i,.5);return{vector:[e,t,r],points:[e,t,n,i]}},ly=s=>{const e=ay(s).vector,t=P.rollPitchYaw(e[0],e[1],e[2]),n=e[0].lerp(e[1],.5),i=e[0].distance(e[1]),r=n.distance(e[2]);return t.x*=-1,t.z*=-1,{y:t.y*ke,x:t.x*ke,z:t.z*ke,width:i,height:r,position:n.lerp(e[2],.5),normalized:{y:t.y,x:t.x,z:t.z},degrees:{y:t.y*180,x:t.x*180,z:t.z*180}}},Dr={eye:{[Vt]:[130,133,160,159,158,144,145,153],[$e]:[263,362,387,386,385,373,374,380]},brow:{[Vt]:[35,244,63,105,66,229,230,231],[$e]:[265,464,293,334,296,449,450,451]},pupil:{[Vt]:[468,469,470,471,472],[$e]:[473,474,475,476,477]}},kc=(s,e=Vt,{high:t=.85,low:n=.55}={})=>{const i=Dr.eye[e],r=ru(s[i[0]],s[i[1]],s[i[2]],s[i[3]],s[i[4]],s[i[5]],s[i[6]],s[i[7]]),a=et(r/.285,0,2);return{norm:Zt(a,n,t),raw:a}},ru=(s,e,t,n,i,r,o,a)=>{s=new P(s),e=new P(e),t=new P(t),n=new P(n),i=new P(i),r=new P(r),o=new P(o),a=new P(a);const l=s.distance(e,2),c=t.distance(r,2),h=n.distance(o,2),u=i.distance(a,2);return(c+h+u)/3/l},Gc=(s,e=Vt)=>{const t=new P(s[Dr.eye[e][0]]),n=new P(s[Dr.eye[e][1]]),i=t.distance(n,2),r=t.lerp(n,.5),o=new P(s[Dr.pupil[e][0]]),a=r.x-o.x,l=r.y-i*.075-o.y;let c=a/(i/2),h=l/(i/4);return c*=4,h*=4,{x:c,y:h}},su=(s,e,{enableWink:t=!0,maxRot:n=.5}={})=>{s.r=et(s.r,0,1),s.l=et(s.l,0,1);const i=Math.abs(s.l-s.r),r=t?.8:1.2,o=s.l<.3&&s.r<.3,a=s.l>.6&&s.r>.6;return e>n?{l:s.r,r:s.r}:e<-n?{l:s.l,r:s.l}:{l:i>=r&&!o&&!a?s.l:s.r>s.l?P.lerp(s.r,s.l,.95):P.lerp(s.r,s.l,.05),r:i>=r&&!o&&!a?s.r:s.r>s.l?P.lerp(s.r,s.l,.95):P.lerp(s.r,s.l,.05)}},cy=(s,{high:e=.85,low:t=.55}={})=>{if(s.length!==478)return{l:1,r:1};const n=kc(s,Vt,{high:e,low:t}),i=kc(s,$e,{high:e,low:t});return{l:n.norm||0,r:i.norm||0}},hy=s=>{if(s.length!==478)return{x:0,y:0};{const e=Gc(s,Vt),t=Gc(s,$e);return{x:(e.x+t.x)*.5||0,y:(e.y+t.y)*.5||0}}},Vc=(s,e=Vt)=>{const t=Dr.brow[e],n=ru(s[t[0]],s[t[1]],s[t[2]],s[t[3]],s[t[4]],s[t[5]],s[t[6]],s[t[7]]),i=1.15,r=.125,o=.07,a=n/i-1;return(et(a,o,r)-o)/(r-o)},uy=s=>{if(s.length!==478)return 0;{const e=Vc(s,Vt),t=Vc(s,$e);return(e+t)/2||0}},dy=s=>{const e=new P(s[133]),t=new P(s[362]),n=new P(s[130]),i=new P(s[263]),r=e.distance(t),o=n.distance(i),a=new P(s[13]),l=new P(s[14]),c=new P(s[61]),h=new P(s[291]),u=a.distance(l),d=c.distance(h);let f=u/r,g=d/o;f=Zt(f,.15,.7),g=Zt(g,.45,.9),g=(g-.3)*2;const x=g,_=Zt(u/r,.17,.5),m=et(Zt(x,0,1)*2*Zt(_,.2,.7),0,1),p=_*.4+_*(1-m)*.6,T=_*Zt(1-m,0,.3)*.1,b=Zt(T,.2,1)*(1-m)*.3,w=(1-m)*Zt(_,.3,1)*.4;return{x:g||0,y:f||0,shape:{A:p||0,E:b||0,I:m||0,O:w||0,U:T||0}}};class ou{static solve(e,{runtime:t="tfjs",video:n=null,imageSize:i=null,smoothBlink:r=!1,blinkSettings:o=[]}={}){if(!e){console.error("Need Face Landmarks");return}if(n){const d=typeof n=="string"?document.querySelector(n):n;i={width:d.videoWidth,height:d.videoHeight}}if(t==="mediapipe"&&i)for(const d of e)d.x*=i.width,d.y*=i.height,d.z*=i.width;const a=ly(e),l=dy(e);o=o.length>0?o:t==="tfjs"?[.55,.85]:[.35,.5];let c=cy(e,{high:o[1],low:o[0]});r&&(c=su(c,a.y));const h=hy(e),u=uy(e);return{head:a,eye:c,brow:u,pupil:h,mouth:l}}}ou.stabilizeBlink=su;class fy{constructor({enterFrames:e=15,exitFrames:t=30,enterVisibility:n=.65,exitVisibility:i=.45,minHoldMs:r=2e3}={}){Object.assign(this,{enterFrames:e,exitFrames:t,enterVisibility:n,exitVisibility:i,minHoldMs:r}),this.reset()}reset(){this.mode="upper",this.good=0,this.bad=0,this.changedAt=0}update(e,t=performance.now(),n="auto"){if(n==="upper"||n==="full")return this.mode=n,this.good=this.bad=0,this.mode;const i=["leftHip","rightHip","leftKnee","rightKnee","leftAnkle","rightAnkle"],o=i.map(a=>{var l;return((l=e==null?void 0:e[a])==null?void 0:l.visibility)??0}).reduce((a,l)=>a+l,0)/i.length;return o>=this.enterVisibility?(this.good++,this.bad=0):o<this.exitVisibility?(this.bad++,this.good=0):this.good=this.bad=0,this.mode==="upper"&&this.good>=this.enterFrames&&t-this.changedAt>=this.minHoldMs&&(this.mode="full",this.changedAt=t,this.good=0),this.mode==="full"&&this.bad>=this.exitFrames&&t-this.changedAt>=this.minHoldMs&&(this.mode="upper",this.changedAt=t,this.bad=0),this.mode}}const py=(s,e=!1)=>e?[["Left",s.rightHandLandmarks],["Right",s.leftHandLandmarks]]:[["Left",s.leftHandLandmarks],["Right",s.rightHandLandmarks]],au=["LeftUpperLeg","LeftLowerLeg","RightUpperLeg","RightLowerLeg"];function my(s,e=()=>{}){let t=0,n=!1,i=!1;return{start(){n=!0;const r=async()=>{if(n){if(!i){i=!0;try{await s()}catch(o){e(o)}finally{i=!1}}t=requestAnimationFrame(r)}};t=requestAnimationFrame(r)},stop(){n=!1,cancelAnimationFrame(t)},get busy(){return i}}}function lu(s,e,t=1,n=1.15){const i={x:e.max.x-e.min.x,y:e.max.y-e.min.y,z:e.max.z-e.min.z},r={x:(e.min.x+e.max.x)/2,y:(e.min.y+e.max.y)/2,z:(e.min.z+e.max.z)/2},o=s.fov*Math.PI/180,a=Math.max(i.y*n/2/Math.tan(o/2),i.x*n/2/(Math.tan(o/2)*Math.max(t,.01)))+i.z/2;return s.position.set(r.x,r.y,r.z+a),s.lookAt(r.x,r.y,r.z),s.near=Math.max(.01,a-i.z*2),s.far=a+i.z*4+100,s.updateProjectionMatrix(),a}function Jo(s){var e;(e=s==null?void 0:s.traverse)==null||e.call(s,t=>{var n,i,r;(i=(n=t.geometry)==null?void 0:n.dispose)==null||i.call(n);for(const o of Array.isArray(t.material)?t.material:[t.material])if(o){for(const a of Object.values(o))a!=null&&a.isTexture&&a.dispose();(r=o.dispose)==null||r.call(o)}})}function gy(){let s=Promise.resolve(),e=0;return{run(t){const n=++e;return s=s.catch(()=>{}).then(()=>t(n,()=>n===e)),s},invalidate(){return e++,e}}}function xy({handTimeoutMs:s=250}={}){const e=new Map,t=new Map,n=new Map,i=new Map,r=o=>i.get(o)||new it;return{captureRest(o,a){i.clear();for(const l of o){const c=a(l);c&&i.set(l,c.quaternion.clone())}},rest(o){return r(o).clone()},rotation(o,a={},l=1,c=performance.now()){const h=new it().setFromEuler(new Jn((a.x||0)*l,(a.y||0)*l,(a.z||0)*l));e.set(o,r(o).clone().multiply(h))},expression(o,a){t.set(o,Math.max(0,Math.min(1,a)))},hand(o,a=performance.now()){n.set(o,a)},resetHands(){for(const o of n.keys())e.set(o,r(o).clone());n.clear()},apply({bone:o,expression:a,now:l=performance.now(),dt:c=1/60,smoothing:h=.3}){const u=1-Math.exp(-Math.max(.001,c)*Math.max(.1,h)*18);for(const[d,f]of e){const g=o(d);if(!g)continue;const x=n.has(d)?l-n.get(d):0;if(n.has(d)&&x>s){g.quaternion.slerp(r(d),Math.min(1,u*(x/s)));continue}g.quaternion.slerp(f,u)}for(const[d,f]of t)a(d,f,u)}}}const _y={x:[-.35,.35],y:[-.35,.35],z:[-1.65,1.65]},vy={x:[-1.2,1.2],y:[-1.1,1.1],z:[-1.35,1.35]},yy=(s,[e,t])=>Math.max(e,Math.min(t,Number.isFinite(s)?s:0)),My=(s,e,t)=>Math.max(e-t,Math.min(e+t,s));function wy(s,e={},t={x:0,y:0,z:0},n=1/30){const i=/Hand$/.test(s),r=i?vy:_y,o=i?5.5:7.5,a=o*Math.max(1/120,Math.min(.1,n));return Object.fromEntries(["x","y","z"].map(l=>[l,My(yy(e[l],r[l]),t[l]||0,a)]))}function Sy(s){if(!Array.isArray(s)||s.length!==21||[0,5,9,17].map(r=>s[r]).some(r=>!r||![r.x,r.y,r.z??0].every(Number.isFinite)))return!1;const t=(r,o)=>new S(r.x-o.x,r.y-o.y,(r.z||0)-(o.z||0)),n=t(s[5],s[17]),i=t(s[9],s[0]);return n.lengthSq()>1e-6&&i.lengthSq()>1e-6&&new S().crossVectors(n,i).lengthSq()>1e-8}function by(s,e=0){if(!s||s.length<4||e<.08)return 0;let t=0,n=0;for(let a=0;a+3<s.length;a+=4){const l=s[a],c=s[a+1],h=s[a+2];s[a+3]<32||(l+c+h)/3<28||(n++,l>70&&l>c*1.16&&l>h*1.08&&h>c*.95&&t++)}if(!n)return 0;const i=t/n,r=Math.max(0,Math.min(1,(i-.12)/.3)),o=Math.max(0,Math.min(1,(e-.08)/.18));return r*o}function Ty({rise:s=.45,fall:e=.24}={}){let t=0;return{update(n){const i=n>t?s:e;return t+=i*(Math.max(0,Math.min(1,n))-t),t},reset(){t=0},value(){return t}}}const cu=globalThis.Holistic;if(typeof cu!="function")throw new Error("Local MediaPipe Holistic runtime failed to load");const Ce=s=>document.getElementById(s),Kt=Ce("status"),Ey=Ce("avatar"),wn=Ce("cameraVideo"),hu=gy(),Kr=new je({canvas:Ey,alpha:!0,antialias:!0}),Gs=new $s,ii=new At(35,1,.01,100);Kr.setPixelRatio(Math.min(devicePixelRatio,2));const uu=new Ha(16777215,1.5);uu.position.set(1,2,3).normalize();Gs.add(uu);let Qe,yn,ri,Gi,xa,Vi,Ko=0,Ay=new fy,Os={x:0,y:0,z:0},jn=!1,du=0;const li=xy(),_a=Ty(),va=document.createElement("canvas"),$o=va.getContext("2d",{willReadFrequently:!0}),Vs=new Map,ya=new Map;va.width=va.height=64;const Ly=new b_,Ry=["Neck","Hips","Spine","Chest","LeftUpperArm","LeftLowerArm","RightUpperArm","RightLowerArm",...au,...["Left","Right"].flatMap(s=>["Hand",...["Thumb","Index","Middle","Ring","Little"].flatMap(e=>["Proximal","Intermediate","Distal"].map(t=>e+t))].map(e=>s+e))];function fu(){Kr.setSize(innerWidth,innerHeight,!1),ii.aspect=innerWidth/innerHeight,ii.updateProjectionMatrix(),Qe&&lu(ii,new Ft().setFromObject(Qe.scene),ii.aspect)}addEventListener("resize",fu);fu();function pu(s){var e;return(e=Qe==null?void 0:Qe.humanoid)==null?void 0:e.getBoneNode(nt.HumanoidBoneName[s])}function Sr(s,e={},t=1){li.rotation(s,e,t),/Hand|Thumb|Index|Middle|Ring|Little/.test(s)&&li.hand(s)}function Ws(s,e){li.expression(s,e)}function Yn(s){const e=Math.max(0,Math.min(1,s))*+Ce("tongueIntensity").value;Ws("TongueOut",e),Ws(nt.BlendShapePresetName.A,Math.max(du,e*.45))}function Cy(s){if(wn.readyState<2||!$o)return 0;const e=s[78],t=s[308],n=s[13],i=s[14];if(!e||!t||!n||!i)return 0;const r=Math.max(.001,Math.abs(t.x-e.x)),o=Math.abs(i.y-n.y)/r;$o.drawImage(wn,0,0,64,64);const a=Math.max(0,Math.floor(Math.min(e.x,t.x)*64)),l=Math.min(64,Math.ceil(Math.max(e.x,t.x)*64)),c=Math.max(0,Math.floor(Math.min(n.y,i.y)*64)),h=Math.min(64,Math.ceil(Math.max(n.y,i.y)*64));return l<=a||h<=c?0:by($o.getImageData(a,c,l-a,h-c).data,o)}function Py(s){var n,i;if(!Qe)return;const e=Ce("mirror").checked,t=Ay.update(Object.fromEntries(["leftHip","rightHip","leftKnee","rightKnee","leftAnkle","rightAnkle"].map((r,o)=>{var a;return[r,(a=s.poseLandmarks)==null?void 0:a[[23,24,25,26,27,28][o]]]})),performance.now(),Ce("tracking").value);if(s.faceLandmarks){const r=xa=ou.solve(s.faceLandmarks,{runtime:"mediapipe",video:wn});Sr("Neck",{x:r.head.x-Os.x,y:r.head.y-Os.y,z:r.head.z-Os.z},.7),Ws(nt.BlendShapePresetName.Blink,Math.min(1,1-(r.eye.l+r.eye.r)/2)),du=r.mouth.shape.A||0;for(const o of["A","I","U","E","O"]){const a=r.mouth.shape[o]||0;Ws(nt.BlendShapePresetName[o],o==="A"&&jn?Math.max(a,+Ce("tongueIntensity").value*.45):a)}jn||(Ce("tongueHeuristic").checked?Yn(_a.update(Cy(s.faceLandmarks))):(_a.reset(),Yn(0))),(i=(n=Qe.lookAt)==null?void 0:n.applyer)==null||i.lookAt(new Jn(r.pupil.y,r.pupil.x,0))}if(s.poseLandmarks&&s.ea){const r=oo.solve(s.ea,s.poseLandmarks,{runtime:"mediapipe",video:wn});for(const[o,a,l]of[["Hips",r.Hips.rotation,.7],["Spine",r.Spine,.45],["Chest",r.Spine,.25]])Sr(o,a,l);for(const o of["LeftUpperArm","LeftLowerArm","RightUpperArm","RightLowerArm"])Sr(o,r[o]);for(const o of au)Sr(o,t==="full"?r[o]:{x:0,y:0,z:0})}for(const[r,o]of py(s,e))if(Sy(o)){const a=sy.solve(o,r),l=performance.now(),c=Math.max(1/120,Math.min(.1,(l-(ya.get(r)||l-33))/1e3));ya.set(r,l);for(const[h,u]of[...["Thumb","Index","Middle","Ring","Little"].flatMap(d=>["Proximal","Intermediate","Distal"].map(f=>[`${r}${d}${f}`,a[`${r}${d}${f}`]])),[`${r}Hand`,a[`${r}Wrist`]]]){const d=wy(h,u,Vs.get(h),c);Vs.set(h,d),Sr(h,d)}}Kt.textContent=`Tracking: ${t==="full"?"Ganzkörper":"Oberkörper"} · live`}async function mu(){var e;Gi==null||Gi.stop(),Gi=null,ri==null||ri.getTracks().forEach(t=>t.stop()),ri=null,wn.srcObject=null;const s=yn;yn=null,await((e=s==null?void 0:s.close)==null?void 0:e.call(s))}async function Dy(){const s=await navigator.mediaDevices.enumerateDevices(),e=Ce("camera").value;Ce("camera").replaceChildren(new Option("Standardkamera",""));for(const t of s.filter(n=>n.kind==="videoinput"))Ce("camera").add(new Option(t.label||`Kamera ${Ce("camera").length}`,t.deviceId));Ce("camera").value=e}function gu(){return hu.run(async(s,e)=>{if(await mu(),!!e()){if(ri=await navigator.mediaDevices.getUserMedia({video:{deviceId:Ce("camera").value||void 0,width:{ideal:1280},height:{ideal:720}},audio:!1}),!e()){ri.getTracks().forEach(t=>t.stop());return}wn.srcObject=ri,await wn.play(),await Dy(),e()&&(yn=new cu({locateFile:t=>`./mediapipe/${t}`}),yn.setOptions({modelComplexity:1,smoothLandmarks:!0,refineFaceLandmarks:!0,selfieMode:Ce("mirror").checked,minDetectionConfidence:.65,minTrackingConfidence:.65}),yn.onResults(Py),Gi=my(()=>yn==null?void 0:yn.send({image:wn}),t=>Kt.textContent=`Tracking-Frame verworfen: ${t.message}`),Gi.start(),Kt.textContent="Kamera aktiv – kein Frame-Backlog.")}})}async function qa(s,e=!1){var n,i,r,o;const t=++Ko;try{const a=await new G_().loadAsync(s);if(t!==Ko){Jo(a.scene),e&&URL.revokeObjectURL(s);return}const l=await eu.from(a);if(t!==Ko){Jo(l.scene),e&&URL.revokeObjectURL(s);return}Qe&&(Gs.remove(Qe.scene),Jo(Qe.scene)),Qe=l,Qe.scene.rotation.y=Math.PI,Gs.add(Qe.scene),li.captureRest(Ry,pu),li.resetHands(),Vs.clear(),ya.clear(),(i=(n=Qe.springBoneManager)==null?void 0:n.setCenter)==null||i.call(n,Qe.scene),(o=(r=Qe.springBoneManager)==null?void 0:r.reset)==null||o.call(r);const c=new Ft().setFromObject(Qe.scene);lu(ii,c,ii.aspect),Vi&&Vi!==s&&URL.revokeObjectURL(Vi),Vi=e?s:void 0,Kt.textContent="VRM 0.x Ganzkörper-Modell geladen."}catch(a){e&&URL.revokeObjectURL(s),Kt.textContent=`Modell-Fehler: ${a.message}. VRM 1.0 wird noch nicht unterstützt.`}}async function xu(){try{const s=Ce("preset").value,e=await fetch("/dawasteh/vrm-model-list",{cache:"no-store"}).then(n=>n.ok?n.json():Promise.reject(new Error(n.status))),t={"amazonas.vrm":"Amazonas","olivia.vrm":"Olivia","lady-koi.vrm":"Lady Koi (nichtmenschliche Fantasyfigur)","panda-bear.vrm":"Panda Bear (CC0-Derivat)"};Ce("preset").replaceChildren(...e.models.map(n=>new Option(t[n]||n,n))),[...Ce("preset").options].some(n=>n.value===s)&&(Ce("preset").value=s)}catch(s){Kt.textContent=`Modellliste-Fehler: ${s.message}`}}Ce("start").onclick=()=>gu().catch(s=>Kt.textContent=`Kamera-Fehler: ${s.message}`);Ce("tongue").onpointerdown=()=>{jn=!0,Ce("tongue").setAttribute("aria-pressed","true"),Yn(1)};for(const s of["pointerup","pointerleave","pointercancel"])Ce("tongue").addEventListener(s,()=>{jn=!1,Ce("tongue").setAttribute("aria-pressed","false"),Yn(0)});Ce("preset").onchange=s=>qa(`/dawasteh/vrm-models/${encodeURIComponent(s.target.value)}`);Ce("reloadModels").onclick=()=>xu();Ce("upload").onchange=s=>{const e=s.target.files[0];e&&e.size<=32*1024*1024?qa(URL.createObjectURL(e),!0):e&&(Kt.textContent="Upload zu groß (maximal 32 MiB).")};Ce("mirror").onchange=()=>{wn.style.transform=Ce("mirror").checked?"scaleX(-1)":"none",yn&&gu().catch(s=>Kt.textContent=`Kamera-Fehler: ${s.message}`)};Ce("present").onclick=()=>document.body.classList.toggle("presentation");addEventListener("keydown",s=>{s.key==="p"&&!/input|select/i.test(s.target.tagName)&&(Ce("present").click(),s.preventDefault()),s.key.toLowerCase()==="t"&&!s.repeat&&!/input|select/i.test(s.target.tagName)&&(jn=!0,Ce("tongue").setAttribute("aria-pressed","true"),Yn(1),s.preventDefault())});addEventListener("keyup",s=>{s.key.toLowerCase()==="t"&&(jn=!1,Ce("tongue").setAttribute("aria-pressed","false"),Yn(0))});Ce("tongueHeuristic").onchange=s=>{s.target.checked||(_a.reset(),jn||Yn(0))};Ce("chroma").onchange=s=>Kr.setClearColor(s.target.checked?65280:0,s.target.checked?1:0);Ce("calibrate").onclick=()=>{var s,e;xa&&(Os={...xa.head},li.resetHands(),Vs.clear(),(e=(s=Qe==null?void 0:Qe.springBoneManager)==null?void 0:s.reset)==null||e.call(s),Kt.textContent="Neutrale Kopfpose gespeichert.")};(function s(){var n,i;requestAnimationFrame(s);const e=Ly.getDelta(),t=Math.min(e,.05);Qe&&(e>.25&&((i=(n=Qe.springBoneManager)==null?void 0:n.reset)==null||i.call(n)),li.apply({bone:pu,expression:(r,o,a)=>{var l;try{const c=Qe.blendShapeProxy,h=((l=c==null?void 0:c.getValue)==null?void 0:l.call(c,r))||0;c==null||c.setValue(r,h+(o-h)*a)}catch{}},dt:t,smoothing:+Ce("smoothing").value}),jn&&Yn(1),Qe.scene.updateMatrixWorld(!0),Qe.update(t)),Kr.render(Gs,ii)})();async function Iy(){var i;await xu();const s=new URLSearchParams(location.search),e=s.get("model"),t=[...Ce("preset").options],n=t.some(r=>r.value===e)?e:t.some(r=>r.value==="amazonas.vrm")?"amazonas.vrm":(i=t[0])==null?void 0:i.value;n&&(Ce("preset").value=n,await qa(`/dawasteh/vrm-models/${encodeURIComponent(n)}`)),s.get("chroma")==="1"&&(Ce("chroma").checked=!0,Kr.setClearColor(65280,1)),s.get("present")==="1"&&document.body.classList.add("presentation")}Iy().catch(s=>Kt.textContent=`Start-Fehler: ${s.message}`);addEventListener("beforeunload",()=>{hu.invalidate(),mu(),Vi&&URL.revokeObjectURL(Vi)});
