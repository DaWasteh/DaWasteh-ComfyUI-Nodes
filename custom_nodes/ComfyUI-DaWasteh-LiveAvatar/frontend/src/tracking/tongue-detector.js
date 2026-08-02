export function tongueColorScore(rgba, openness=0){
  if(!rgba||rgba.length<4||openness<0.08)return 0;
  let colored=0,visible=0;
  for(let i=0;i+3<rgba.length;i+=4){
    const r=rgba[i],g=rgba[i+1],b=rgba[i+2],a=rgba[i+3];
    if(a<32)continue;
    const light=(r+g+b)/3;
    if(light<28)continue;
    visible++;
    if(r>70&&r>g*1.16&&r>b*1.08&&b>g*.95)colored++;
  }
  if(!visible)return 0;
  const ratio=colored/visible,color=Math.max(0,Math.min(1,(ratio-.12)/.30));
  const open=Math.max(0,Math.min(1,(openness-.08)/.18));
  return color*open;
}
export function tongueSmoother({rise=.45,fall=.24}={}){let value=0;return{update(next){const rate=next>value?rise:fall;value+=rate*(Math.max(0,Math.min(1,next))-value);return value},reset(){value=0},value(){return value}}}
