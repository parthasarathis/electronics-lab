(function(){'use strict';
const greek={'ω':'\\omega','τ':'\\tau','φ':'\\varphi','θ':'\\theta','π':'\\pi','α':'\\alpha','β':'\\beta','γ':'\\gamma','η':'\\eta','λ':'\\lambda','ε':'\\varepsilon','ν':'\\nu','Φ':'\\Phi','Δ':'\\Delta','Σ':'\\sum','∞':'\\infty','μ':'\\mu'};
const names={};
for(const base of ['R','V','I','E','X','C','L','Q','S','P','f','g','x','v','i','ω'])for(const sub of ['A','B','C','L','R','N','s','p','th','n','out','in','load','source','comp','max','pk','rms','eq','0','1','2','3','4','f','b','c','e','t','z','z0','j','BR','be','ce','eb','cc','gs','d','dss','opt','dc','w'])names[base+sub]=base+'_{\\mathrm{'+sub+'}}';
Object.assign(names,{rhsA:'b_A',rhsB:'b_B',rhs1:'b_A',rhs2:'b_B',det:'\\det',In:'I_{\\mathrm N}',Rnorton:'R_{\\mathrm N}',Rseries:'R_{\\mathrm s}',IRs:'I_{R_{\\mathrm s}}','VL₁':'V_{L1}','VL₂':'V_{L2}','VNₐ':'V_{Na}','VNᵦ':'V_{Nb}',Pinternal:'P_{\\mathrm{internal}}',Pload:'P_{\\mathrm L}',pmax:'P_{\\max}',PF:'\\mathrm{PF}',BW:'\\mathrm{BW}',Idss:'I_{\\mathrm{DSS}}',VBR:'V_{\\mathrm{BR}}',Nd:'N_D',ni:'n_i',NEP:'\\mathrm{NEP}',Ripple:'\\mathrm{Ripple}',Melt:'\\text{melt}',Sload:'S_{\\mathrm{load}}',Ssource:'S_{\\mathrm{source}}',Qsource:'Q_{\\mathrm{source}}',Qload:'Q_{\\mathrm{load}}',Ccomp:'C_{\\mathrm{comp}}',RAB:'R_{AB}',RBC:'R_{BC}',RCA:'R_{CA}',Rseries:'R_{\\mathrm s}',Iright:'I_{\\mathrm{right}}',Ileft:'I_{\\mathrm{left}}'});
Object.assign(names,{VL1:'V_{L1}',VL2:'V_{L2}',VNa:'V_{Na}',VNb:'V_{Nb}',IR1:'I_{R1}',IR2:'I_{R2}',IR3:'I_{R3}',Zload:'Z_{\\mathrm{load}}',Zeq:'Z_{\\mathrm{eq}}',φrad:'\\varphi_{\\mathrm{rad}}',φdeg:'\\varphi_{\\mathrm{deg}}',ω0:'\\omega_0',ω1:'\\omega_1',ω2:'\\omega_2'});
const units=new Set(['Ω','kΩ','MΩ','V','mV','A','mA','μA','W','mW','J','mJ','s','ms','μs','Hz','kHz','S','mS','μS','F','μF','mH','H','VA','var','dB','nm','rad']);
const esc=s=>String(s).replace(/[\\{}%#$&_]/g,c=>'\\'+c);
function variable(w){if(names[w])return names[w];if(greek[w])return greek[w];if(w==='sqrt')return '\\sqrt';if(['sin','cos','tan','ln','log','exp'].includes(w))return '\\'+w;if(w==='atan2')return '\\operatorname{atan2}';if(w==='log10')return '\\log_{10}';if(w.length===1)return /[a-zA-Z]/.test(w)?w:'\\text{'+esc(w)+'}';
// Products such as I1R1 and V²R are split using known circuit symbols.
let z='',i=0,keys=Object.keys(names).sort((a,b)=>b.length-a.length);while(i<w.length){let k=keys.find(k=>w.startsWith(k,i));if(k){z+=names[k]+' ';i+=k.length;}else{z+=/[A-Za-z]/.test(w[i])?w[i]:'_{'+w[i]+'}';i++;}}return z;}
function tex(input){let s=input.replace(/−|–/g,'-').replace(/∥/g,'‖').replace(/VNₐ/g,'VNa').replace(/VNᵦ/g,'VNb').replace(/[₀₁₂₃₄]/g,c=>'₀₁₂₃₄'.indexOf(c)).replace(/j(?=\d)/g,'j ').replace(/φrad/g,'PHASErad').replace(/φdeg/g,'PHASEdeg');
let t=s.match(/\d[\d,]*(?:\.\d+)?(?:e[+-]?\d+)?|[μmkM](?:Ω|Hz|S|F|H|A|V|W|J|s)|PHASErad|PHASEdeg|ω[012]|(?:[A-Za-z][A-Za-z0-9]*|[μmkM]?[Ωμ])|[^\s]/g)||[],p=0;
const stop=()=>p>=t.length||[')',']','}','=','≈','>','<','∝','⟹',';',',','+','-','∓','±','‖'].includes(t[p]);
function atom(){let a=t[p++];if(a===undefined)return '';let out;if(['(','[','{'].includes(a)){const end={'(':')','[':']','{':'}'}[a];out=expr(end);if(t[p]===end)p++;out='\\left'+(a==='{'?'\\{':a)+out+'\\right'+(end==='}'?'\\}':end);}else if(a==='√'||a==='sqrt'){let v=atom();out='\\sqrt{'+ungroup(v)+'}';}else if(a==='|'){let vals=[];while(p<t.length&&t[p]!=='|')vals.push(t[p++]);if(t[p]==='|')p++;out='\\left|'+tex(vals.join(' '))+'\\right|';}else if(a==='½')out='\\tfrac{1}{2}';else if(a==='-')out='-'+atom();else if(/^\d/.test(a)){out=a.replace(/,/g,'{,}').replace(/e([+-]?\d+)$/,'\\times10^{$1}');}else if(a==='Ω')out='\\Omega';else if(greek[a])out=greek[a];else if(units.has(a)&&p>1&&(/^\d/.test(t[p-2])||t[p-2]===')'))out='\\,\\mathrm{'+a.replace('Ω','\\Omega').replace('μ','\\mu ')+'}';else out=variable(a);
while(['²','³','^','*','_','°'].includes(t[p])){let op=t[p++];if(op==='²'||op==='³')out+='^{'+(op==='²'?2:3)+'}';else if(op==='°')out+='^{\\circ}';else if(op==='*')out+='^{*}';else out+=op+'{'+ungroup(atom())+'}';}return out;}
function ungroup(a){return a.startsWith('\\left(')&&a.endsWith('\\right)')?a.slice(6,-7):a;}
function implicit(){let out=atom();while(!stop()&&!['/','×','·'].includes(t[p]))out+=' '+atom();return out;}
function term(){let out=implicit();while(['/','×','·'].includes(t[p])){let op=t[p++],b=implicit();out=op==='/'?'\\frac{'+ungroup(out)+'}{'+ungroup(b)+'}':out+(op==='×'?'\\times ':'\\cdot ')+b;}return out;}
function expr(end){let out='';while(p<t.length&&t[p]!==end){if(['=','≈','>','<','∝','⟹',';',',','+','-','∓','±','‖'].includes(t[p])){const op=t[p++];out+=' '+({'≈':'\\approx','∝':'\\propto','⟹':'\\Longrightarrow','∓':'\\mp','±':'\\pm','‖':'\\parallel',';':';\\quad'}[op]||op)+' ';}else if([')',']','}'].includes(t[p]))break;else out+=term();}return out;}
return expr();}
function sourceText(el){let c=el.cloneNode(true);c.querySelectorAll('sub').forEach(x=>x.replaceWith('_('+x.textContent+')'));c.querySelectorAll('sup').forEach(x=>x.replaceWith('^('+x.textContent+')'));return c.textContent.trim();}
Object.assign(names,{PHASErad:'\\varphi_{\\mathrm{rad}}',PHASEdeg:'\\varphi_{\\mathrm{deg}}'});
function isProse(raw){return (raw.match(/[A-Za-z]{3,}/g)||[]).some(w=>!names[w]&&!names[w.replace(/^[jd]/,'')]&&!units.has(w)&&!['atan','sqrt','sin','cos','tan','log','exp','log10','atan2','rhsA','rhsB','det','fT','deg'].includes(w)&&!/^(?:[A-Z][a-z]?(?:[0-9]+)?)+$/.test(w));}
function explicit(raw){
if(raw.startsWith('dPL/dRL ='))return '\\frac{\\mathrm dP_L}{\\mathrm dR_L}=\\frac{V_{\\mathrm{th}}^2(R_{\\mathrm{th}}-R_L)}{(R_{\\mathrm{th}}+R_L)^3}';
if(raw.startsWith('Ccomp = Qload/(ωV²),'))return 'C_{\\mathrm{comp}}=\\frac{Q_{\\mathrm{load}}}{\\omega V^2},\\quad Q_{\\mathrm{load}}>0';
if(raw==='f0 = 1/(2π√LC)')return 'f_0=\\frac{1}{2\\pi\\sqrt{LC}}';
if(raw.startsWith('ω1,2 ='))return '\\omega_{1,2}=\\frac{\\sqrt{(\\Delta\\omega)^2+4\\omega_0^2}\\mp\\Delta\\omega}{2}';
if(raw==='Vrms = √[(1/T)∫₀ᵀ v²(t) dt]')return 'V_{\\mathrm{rms}}=\\sqrt{\\frac{1}{T}\\int_0^T v^2(t)\\,\\mathrm{d}t}';
if(raw.startsWith('[ g1+g2+g3'))return '\\begin{bmatrix}g_1+g_2+g_3&-g_3\\\\-g_3&g_3+g_4\\end{bmatrix}\\begin{bmatrix}V_A\\\\V_B\\end{bmatrix}=\\begin{bmatrix}V_sg_1\\\\J\\end{bmatrix}';
if(raw.startsWith('[   −g3'))return false;
if(raw==='[a −R3; −R3 b] × [I1;I2] = [E1;E2]')return '\\begin{bmatrix}a&-R_3\\\\-R_3&b\\end{bmatrix}\\begin{bmatrix}I_1\\\\I_2\\end{bmatrix}=\\begin{bmatrix}E_1\\\\E_2\\end{bmatrix}';
if(/^\[[\d.-]/.test(raw)&&window.lessonResult){let d=window.lessonResult;return '\\begin{bmatrix}'+d.a*1000+'&'+(-d.g3*1000)+'\\\\'+(-d.g3*1000)+'&'+d.b*1000+'\\end{bmatrix}\\begin{bmatrix}V_A\\\\V_B\\end{bmatrix}=\\begin{bmatrix}'+d.rhs1*1000+'\\\\'+window.lessonState.J+'\\end{bmatrix}';}
if(/^R(AB|BC|CA) = S\//.test(raw)&&window.Lesson?.id==='wye-delta'){const s=window.lessonState,part=raw.match(/^R(AB|BC|CA) = S\/(R[ABC]) = (.*)$/),div={RC:s.RL,RA:s.R1,RB:s.R2}[part[2]],sum=s.R1*s.R2+s.R2*s.RL+s.RL*s.R1;return '\\begin{aligned}'+tex('R'+part[1])+'&=\\frac{S}{'+tex(part[2])+'}\\\\&=\\frac{'+sum+'\\,\\Omega^2}{'+div+'\\,\\Omega}\\\\&='+tex(part[3])+'\\end{aligned}';}
if(raw.startsWith('VR = IR ='))return tex(raw.replace('VR = IR =','VR = I · R ='));
return undefined;}
function render(el){if(el.dataset.mathDone)return;const raw=sourceText(el);el.dataset.mathDone='true';el.dataset.mathSource=raw;
const custom=explicit(raw);if(custom===false){el.hidden=true;return;}
let label='',body=raw;const labelled=raw.match(/^(Left:|Right:|Star:|Delta:|A:|B:|B–C:|C–A:|For a sine:|Optimum|Difference|Top-node voltage|Left loop|Right loop|Vpeak-to-peak)\s*(.*)$/);if(labelled){label='\\text{'+esc(labelled[1])+'}\\quad ';body=labelled[2];}
if(isProse(body)&&!el.dataset.tex&&custom===undefined){el.classList.add('math-prose');return;}
try{let formula=el.dataset.tex||custom||label+tex(body);if(formula.length>95&&!formula.includes('\\begin')&&formula.includes(' = ')){const parts=formula.split(' = ');formula='\\begin{aligned}'+parts[0]+'&='+parts.slice(1).join('\\\\&=')+'\\end{aligned}';}el.dataset.tex=formula;katex.render(formula,el,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'ignore'});el.classList.add('math-rendered');}catch(e){el.dataset.mathError=e.message;window.mathErrors.push({source:raw,error:e.message});}}
window.mathErrors=[];window.CourseMath={tex,render,refresh};
function refresh(){document.querySelectorAll('.eq:not([data-math-done]),[data-tex]:not([data-math-done])').forEach(render);}
let queued=false;const observer=new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh();});});
function start(){refresh();observer.observe(document.body,{childList:true,subtree:true});document.documentElement.dataset.mathReady='true';}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
