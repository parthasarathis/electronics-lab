(function(root){
'use strict';
const TAU=2*Math.PI;
function positive(x,name){if(!Number.isFinite(x)||x<=0)throw new Error(name+' must be positive.');return x;}
function kirchhoff(s){
 const r1=positive(s.R1,'R1'),r2=positive(s.R2,'R2'),r3=positive(s.R3,'R3');
 const vn=(s.E1/r1+s.E2/r2)/(1/r1+1/r2+1/r3),i1=(s.E1-vn)/r1,i2=(s.E2-vn)/r2,i3=vn/r3;
 return {vn,i1,i2,i3,v1:i1*r1,v2:i2*r2,v3:vn,kcl:i1+i2-i3,kvl1:s.E1-i1*r1-vn,kvl2:s.E2-i2*r2-vn,p1:i1*i1*r1,p2:i2*i2*r2,p3:i3*i3*r3,delivered:s.E1*i1+s.E2*i2};
}
function transient(s){
 const r=positive(s.R,'R'),rc=s.kind==='RC',c=positive(s.C,'C')*1e-6,l=positive(s.L,'L')/1000;
 const tau=rc?r*c:l/r,initial=rc?s.initialV:s.initialI/1000,final=rc?s.V:s.V/r;
 const at=t=>{const state=final+(initial-final)*Math.exp(-t/tau),current=rc?(s.V-state)/r:state,vr=current*r,reactive=rc?state:s.V-vr,energy=.5*(rc?c*state*state:l*state*state);return {t,state,current,vr,reactive,energy};};
 return {tau,initial,final,rc,at,cursor:at(s.cursor*tau),atTau:at(tau),samples:Array.from({length:151},(_,j)=>at(j*tau/30))};
}
function resonanceAt(s,f){
 const w=TAU*positive(f,'Frequency'),r=positive(s.R,'R'),l=positive(s.L,'L')/1000,c=positive(s.C,'C')*1e-6;
 const xl=w*l,xc=1/(w*c),series=s.topology==='series',b=w*c-1/(w*l),z=series?Math.hypot(r,xl-xc):1/Math.hypot(1/r,b);
 return {f,xl,xc,z,current:s.V/z,response:series?r/z:z/r,angle:series?Math.atan2(xl-xc,r):-Math.atan2(b,1/r)};
}
function resonance(s){
 const r=positive(s.R,'R'),l=positive(s.L,'L')/1000,c=positive(s.C,'C')*1e-6,w0=1/Math.sqrt(l*c),series=s.topology==='series';
 const bw=series?r/l:1/(r*c),disc=Math.hypot(bw,2*w0),w1=2*w0*w0/(disc+bw),w2=(disc+bw)/2;
 const f0=w0/TAU,f1=w1/TAU,f2=w2/TAU,q=w0/bw,low=Math.min(f0/10,f1*.65),high=Math.max(f0*10,f2*1.5);
 const fs=Array.from({length:501},(_,j)=>low*Math.pow(high/low,j/500)).concat([f0,f1,f2]).sort((a,b)=>a-b);
 return {f0,f1,f2,bw:bw/TAU,q,low,high,series,selected:resonanceAt(s,f0*s.ratio),peak:resonanceAt(s,f0),samples:fs.map(f=>resonanceAt(s,f))};
}
function power(s){
 const w=TAU*positive(s.f,'Frequency'),r=positive(s.R,'R'),xl=w*s.L/1000,xc=s.C>0?1/(w*s.C*1e-6):0,x=xl-xc,z2=r*r+x*x;
 const p=s.V*s.V*r/z2,q=s.V*s.V*x/z2,apparent=Math.hypot(p,q),comp=s.comp*1e-6,qc=-w*comp*s.V*s.V,netq=q+qc,total=Math.hypot(p,netq),phi=Math.atan2(netq,p);
 const i=total/s.V,iLoad=apparent/s.V,auto=q>0?q/(w*s.V*s.V)*1e6:0;
 const samples=Array.from({length:321},(_,j)=>{const a=j/320*4*Math.PI;return {cycles:j/160,power:2*s.V*i*Math.sin(a)*Math.sin(a-phi)};});
 return {w,xl,xc,x,p,q,apparent,qc,netq,total,phi,pf:p/total,i,iLoad,auto,samples};
}
const api={kirchhoff,transient,resonance,resonanceAt,power};root.CircuitModels=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);