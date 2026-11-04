(function(root){'use strict';
function rlc(s,t){const a=s.R/(2*s.L),w=1/Math.sqrt(s.L*s.C),A=s.v0-s.V,d=s.i0/s.C;let y,dy;
 if(Math.abs(a-w)<1e-7*w){const B=d+a*A,e=Math.exp(-a*t);y=(A+B*t)*e;dy=(B-a*(A+B*t))*e;}
 else if(a<w){const b=Math.sqrt(w*w-a*a),B=(d+a*A)/b,e=Math.exp(-a*t),c=Math.cos(b*t),q=Math.sin(b*t);y=e*(A*c+B*q);dy=e*((-a*A+b*B)*c+(-a*B-b*A)*q);}
 else {const b=Math.sqrt(a*a-w*w),p=-w*w/(a+b),q=-a-b,B=(d-q*A)/(p-q),D=A-B;y=B*Math.exp(p*t)+D*Math.exp(q*t);dy=p*B*Math.exp(p*t)+q*D*Math.exp(q*t);}
 return {v:s.V+y,i:s.C*dy,a,w,z:a/w};}
function exact(s,type,t){if(type==='RLC')return rlc(s,t);if(type==='RC'){const v=s.V+(s.v0-s.V)*Math.exp(-t/(s.R*s.C));return {v,i:(s.V-v)/s.R};}const i=s.V/s.R+(s.i0-s.V/s.R)*Math.exp(-t*s.R/s.L);return {i,v:s.V-s.R*i};}
function derivative(s,type,y){if(type==='RC')return [(s.V-y[0])/(s.R*s.C)];if(type==='RL')return [(s.V-s.R*y[0])/s.L];return [y[1]/s.C,(s.V-s.R*y[1]-y[0])/s.L];}
function integrate(s,type,T,n){let y=type==='RC'?[s.v0]:type==='RL'?[s.i0]:[s.v0,s.i0],h=T/n,out=[[0,...y]];for(let k=0;k<n;k++){const f=x=>derivative(s,type,x),a=f(y),b=f(y.map((v,j)=>v+h*a[j]/2)),c=f(y.map((v,j)=>v+h*b[j]/2)),d=f(y.map((v,j)=>v+h*c[j]));y=y.map((v,j)=>v+h*(a[j]+2*b[j]+2*c[j]+d[j])/6);out.push([(k+1)*h,...y]);}return out;}
function bode(type,R,L,C,f){const tau=type.startsWith('RC')?R*C:L/R,x=2*Math.PI*f*tau,hp=type.endsWith('HP'),mag=(hp?x:1)/Math.hypot(1,x);return {mag,db:20*Math.log10(mag),phase:(hp?90:0)-Math.atan(x)*180/Math.PI,fc:1/(2*Math.PI*tau),tau};}
const api={rlc,exact,derivative,integrate,bode};if(typeof module!=='undefined')module.exports=api;else root.Module4=api;
})(typeof window==='undefined'?globalThis:window);
