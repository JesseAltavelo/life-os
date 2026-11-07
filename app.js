'use strict';
const BUILD='1794077559';
const $=s=>document.querySelector(s);
const D=(d=new Date())=>new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
const dow=s=>new Date(s+'T12:00').getDay()||7;
const addD=(s,n)=>{const d=new Date(s+'T12:00');d.setDate(d.getDate()+n);return D(d)};
const weekStart=s=>addD(s,1-dow(s));
const wdays=ws=>[0,1,2,3,4,5,6].map(i=>addD(ws,i));
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lines=t=>(t||'').split('\n').map(l=>l.trim()).filter(Boolean);
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const fmt=s=>{s=Math.max(0,s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const eur=n=>'€'+(+n).toFixed(2).replace(/\.00$/,'');
const stripE=t=>t.replace(/^[\p{Extended_Pictographic}️‍]+\s*/u,'');
const IC={calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',dumbbell:'<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>',utensils:'<path d="M5 3v7a2 2 0 0 0 2 2v9M9 3v7a2 2 0 0 1-2 2M17 3c-2 2-2 6 0 8v10"/>',wallet:'<path d="M3 7a2 2 0 0 1 2-2h14v4M3 7v11a2 2 0 0 0 2 2h16V9H5a2 2 0 0 1-2-2z"/><circle cx="17" cy="14" r="1"/>',wind:'<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',book:'<path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>',heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',leaf:'<path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15zM5 19l8-8"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',check:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',repeat:'<path d="M17 2l3 3-3 3M20 5H8a4 4 0 0 0-4 4v1M7 22l-3-3 3-3M4 19h12a4 4 0 0 0 4-4v-1"/>',sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',play:'<path d="M7 4l13 8-13 8z"/>',timer:'<circle cx="12" cy="14" r="7"/><path d="M12 14v-4M9 2h6"/>',zin:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M8 11h6M11 8v6"/>',zout:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M8 11h6"/>',refresh:'<path d="M20 12a8 8 0 1 1-3-6.2M20 4v5h-5"/>',headphones:'<path d="M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H5a1 1 0 0 1-1-1zM20 15h-3v5h2a1 1 0 0 0 1-1z"/>',pencil:'<path d="M4 20h4L20 8l-4-4L4 16zM14 6l4 4"/>',drop:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',pulse:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',chev:'<path d="M9 6l6 6-6 6"/>',done:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',open:'<circle cx="12" cy="12" r="9"/>',layers:'<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',coin:'<circle cx="12" cy="12" r="9"/><path d="M14.5 9a3 3 0 0 0-5 1.5c0 3 5 1.5 5 4.5a3 3 0 0 1-5 1.5M12 6.5v11"/>'};
const ic=(n,z)=>`<svg class="i" viewBox="0 0 24 24"${z?` style="width:${z}px;height:${z}px"`:''}>${IC[n]||''}</svg>`;
const emo=t=>(t.match(/^[\p{Extended_Pictographic}️‍]+/u)||['▫️'])[0];
const DN=['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const base=()=>location.origin+location.pathname;
const td=()=>D();

/* ---------- defaults (everything is editable in Life > Settings) ---------- */
const VER=9;
const DEF={v:VER,start:D(),mode:{},wmode:{},short:{},chk:{},water:{},steps:{},port:{},ing:{},z:.75,tcol:{},bname:{},bcol:{},nl:{},own:0,tdel:[],bind:{},notes:{},gcal:{url:'',proxy:'',key:'',tds:0,t:0,evs:[],err:''},supp:{},hab:{},jr:{},med:{},todo:[],log:[],active:null,tx:[],paid:{},rev:{},wx:{},timer:null,ctx:null,
cfg:{
income:0,invest:0,waterT:2500,stepsT:10000,stepsMin:8000,
themes:`1|Money: investing basics, tax, index funds. Check auto-invest.|Finance and business|Push|
2|Craft: GTM, CRM, RevOps. Build or practise something real.|Career and industry|Pull|
3|Reading and mind: one book chapter + 10 min language.|History and philosophy|Lower|
4|Humour and social: improv, comedy night, run club, or write a joke.|Comedy, storytelling|Zone 2 + mobility|
5|No learn block. Date night.|Anything fun|Upper|
6|Build block (90 min).|Fun|VO2 4x4|
7|Weekly review.|Wisdom, nature|Long Zone 2|`,
tpl:`# Push
Incline DB press|4|6-10|120
Flat DB press|3|8-12|90
Seated DB shoulder press|3|8-10|90
Lateral raises|4|12-20|60
Overhead triceps extension|3|10-12|60
# Pull
Pull-ups|4|8-10|120
Chest-supported row|3|10|90
Rear-delt flyes|3|15|60
DB curls|3|10|60
Hammer curls|2|12|60
# Lower
Bulgarian split squat|4|8-10|120
Goblet squat|3|10|90
Romanian deadlift|3|8-10|120
Walking lunges|2|12|90
Calf raises|4|15-20|60
Hanging leg raises|3|10|60
# Upper
Incline DB press|3|10|90
Lat pulldown|3|10|90
Lateral raises|4|15|60
DB curls|3|12|60
Triceps pushdown|3|12|60
Face pulls|3|15|60`,
diet:`# Breakfast|07:30
Eggs|100 g|12|1|10
Skyr or Greek yoghurt|150 g|17|6|0
Oats (dry)|70 g|9|42|5
Berries|100 g|1|10|0
Banana|120 g|1|27|0
# Lunch|12:30
Chicken breast, cooked|120 g|37|0|4
Rice, cooked|200 g|5|56|1
Mixed vegetables|200 g|4|12|1
Olive oil|15 ml|0|0|14
Wholegrain bread|70 g|7|30|2
# Snack|15:30
Apple or other fruit|180 g|0|25|0
Almonds|30 g|6|4|16
# Dinner|17:30
Salmon or lean meat|130 g|28|0|18
Potatoes or rice, cooked|300 g|6|52|0
Vegetables|250 g|5|15|1
Olive oil|15 ml|0|0|14`,
inc:`Salary|0
Other income|0`,
cats:`Rent|0
Groceries|0
Eating out|0
Transport|0
Health / gym|0
Subscriptions|0
Fun|0
Other|0
Investing|0
Savings|0`,
day:`Steps|10000|8000|steps
Water ml|2500|2000|water
Diet % of plan|90|60|diet
Meditation min|10|3|med
Journal entry|1|1|jr`,
wk:`Lift sessions|5|3|lift
Days at step target|7|7|steps
Days at water target|7|5|water
Days on diet plan|7|5|diet
Days meditated|7|5|med
Days journaled|5|3|jr
Learn blocks|4|3|r:learn-block
Commute audio days|5|5|r:commute-audio
Cardio (VO2 + long Zone 2)|2|1|r:vo2-session+r:long-zone-2-quiet-hour
Date night|1|1|r:date-night
Social / play (quality time + fun night)|2|1|r:quality-time+r:fun-night
Nature / quiet time|1|1|r:long-zone-2-quiet-hour
Weekly review done|1|1|rev`,
flows:`# Mobility flow
Dry brush (optional)|180
Jumping jacks|120
Cat-cow|120
World's greatest stretch|150
90/90 hips|150
Thoracic rotations|120
Band shoulder dislocates|120
Deep squat hold|120
Legs up the wall + belly breathing|180
# VO2 4x4
Warm-up|600
Hard 1|240
Easy|180
Hard 2|240
Easy|180
Hard 3|240
Easy|180
Hard 4|240
Cool-down|300`,
routines:``
}};
function load(o){o=o||{};if((o.v||0)<2){if(o.cfg){delete o.cfg.blocks;delete o.cfg.mvd;delete o.cfg.wk}Object.keys(o.mode||{}).forEach(k=>o.mode[k]=o.mode[k]==='mvd'?'min':'')}
 if((o.v||0)<4&&o.cfg){delete o.cfg.diet;delete o.cfg.habits;delete o.cfg.supps;delete o.cfg.wk}
 if((o.v||0)<3&&o.cfg){delete o.cfg.meals;delete o.cfg.wk;if(o.cfg.routines)o.cfg.routines=o.cfg.routines.replace('Log portions, water + steps','Tick diet items, water + steps')}
 if((o.v||0)<7){o.z=.75;o.nl=o.nl||{};Object.entries(o.notes||{}).forEach(([k,t])=>{if(t&&t.trim())o.nl[k]=[{d:o.start||D(),t:t.trim()}]})}
 if((o.v||0)<6&&o.cfg){o.cfg.routines='';delete o.cfg.day}
 if((o.v||0)<5&&o.cfg&&o.cfg.cats){let c=o.cfg.cats;['Investing','Savings'].forEach(n=>{if(!c.includes(n))c+='\n'+n+'|0'});o.cfg.cats=c;if(+o.cfg.invest&&!/Investing\|[1-9]/.test(c))o.cfg.cats=c.replace('Investing|0','Investing|'+(+o.cfg.invest))}
 const s=Object.assign(structuredClone(DEF),o);s.cfg=Object.assign({},DEF.cfg,o.cfg); s.todo.forEach(x=>{x.id=x.id||Date.now().toString(32)+Math.random().toString(32).slice(2,6)});if((o.v||0)<8&&s.gcal)s.gcal.t=0;if((o.v||0)<9){const c=s.cfg;if(+c.income&&c.inc===DEF.cfg.inc)c.inc='Salary|'+(+c.income)+'\nOther income|0';c.diet=c.diet.split('\n').map(l=>{if(l[0]==='#')return l;const p=l.split('|');return p.length===5?l+'|'+Math.round(+p[2]*4+ +p[3]*4+ +p[4]*9):l}).join('\n');if(!c.flows.includes('# Zone 2 session'))c.flows+='\n# Zone 2 session\nWarm-up|300\nSteady Zone 2|3000\nCool-down|300\n# Long Zone 2\nWarm-up|300\nSteady Zone 2|5400\nCool-down|300';c.themes=c.themes.replace('Zone 2 + mobility','Zone 2 session')}
 s.v=VER;return s}
let S;try{S=load(JSON.parse(localStorage.lifeos1))}catch(e){S=load()}
const save=()=>{try{localStorage.lifeos1=JSON.stringify(S)}catch(e){}};

/* ---------- parsers ---------- */
const routines=()=>{const o=[];let c;lines(S.cfg.routines).forEach(l=>{if(l[0]=='#'){const[n,s,d,dy,mw,es,h]=l.slice(1).split('|').map(x=>x.trim());c={id:slug(n),name:n,start:s||'09:00',dur:+d||30,days:dy||'1234567',mw:mw||'',ess:es==='1',hue:+h||200,steps:[]};o.push(c)}
 else if(c){const[t,m,k,sh]=l.split('|').map(x=>x.trim());c.steps.push({raw:t,min:+m||1,link:k||'',short:sh||''})}});return o};
const flows=()=>{const o={};let c;lines(S.cfg.flows).forEach(l=>{if(l[0]=='#'){c=l.slice(1).trim();o[c]=[]}else if(c){const[n,s]=l.split('|');o[c].push([n.trim(),+s||60])}});return o};
const parseQ=t=>(t||'').split(';').filter(Boolean).map(x=>{const m=x.match(/^(.*?)@(https?:.*)$/);return m?{t:m[1].trim(),u:m[2].trim()}:{t:x.trim(),u:''}});
const themes=()=>Object.fromEntries(lines(S.cfg.themes).map(l=>{const[d,learn,audio,train,sp,q]=l.split('|').map(x=>x.trim());return[+d,{learn,audio,train,sp,q:parseQ(q)}]}));
const themesText=T=>Object.entries(T).map(([d,v])=>[d,v.learn||'',v.audio||'',v.train||'',v.sp||'',(v.q||[]).map(i=>i.t.replace(/[;|@]/g,' ')+(i.u?'@'+i.u:'')).join(';')].join('|')).join('\n');
const themeOf=ds=>themes()[dow(ds)]||{};
const tpls=()=>{const o={};let c;lines(S.cfg.tpl).forEach(l=>{if(l[0]=='#'){c=l.slice(1).trim();o[c]=[]}else if(c){const[n,s,r,rest]=l.split('|').map(x=>x.trim());o[c].push({n,s:+s||3,r:r||'8-12',rest:+rest||90})}});return o};
const diet=()=>{const o=[];let c;lines(S.cfg.diet).forEach(l=>{if(l[0]=='#'){const[n,t]=l.slice(1).split('|').map(x=>x.trim());c={n,t:t||'',items:[]};o.push(c)}else if(c){const[n,a,p,cb,f,kc]=l.split('|').map(x=>x.trim());c.items.push({n,a:a||'',p:+p||0,c:+cb||0,f:+f||0,kc:+kc||0})}});return o};
const tot=a=>a.reduce((x,i)=>({p:x.p+i.p,c:x.c+i.c,f:x.f+i.f,k:x.k+i.kc}),{p:0,c:0,f:0,k:0});
function dietPct(ds){const all=diet().flatMap(m=>m.items.map(i=>m.n+'|'+i.n)),g=S.ing[ds]||{};return all.length?all.filter(k=>g[k]).length/all.length:0}
const incs=()=>lines(S.cfg.inc).map(l=>{const[n,v]=l.split('|');return{n:n.trim(),l:+v||0}});
const cats=()=>lines(S.cfg.cats).map(l=>{const[n,v,m]=l.split('|');return{n:n.trim(),l:+v||0,m:+m||0}});
const mode=ds=>S.mode[ds]||'';

/* occurrences, steps, progress */
const isShort=(r,ds)=>(mode(ds)==='min'&&r.ess)||!!S.short[ds]?.[r.id];
function occ(ds){const d=dow(ds),min=mode(ds)==='min';
 return routines().filter(r=>r.days.includes(d)&&(!min||r.ess))}
function stepsOf(r,ds){const sh=isShort(r,ds),th=themeOf(ds);
 return r.steps.filter(s=>!sh||s.short).map(s=>({...s,full:s.min,min:sh&&+s.short>0?+s.short:s.min,title:s.raw.replace(/\{(\w+)\}/g,(m,k)=>th[k]||'')}))}
const key=(r,s)=>r.id+'|'+s.raw;
const isDone=(ds,r,s)=>!!S.chk[ds]?.[key(r,s)];
function dayStat(ds){let d=0,t=0;occ(ds).forEach(r=>{const st=stepsOf(r,ds);t+=st.length;d+=st.filter(s=>isDone(ds,r,s)).length});return{d,t}}
const pct=ds=>{const{d,t}=dayStat(ds);return t?d/t:0};
const rdone=(ds,id)=>{const r=routines().find(x=>x.id===id);if(!r||!r.days.includes(dow(ds)))return 0;const st=stepsOf(r,ds);return st.length&&st.every(s=>isDone(ds,r,s))?1:0};

/* workouts: previous sets only from the SAME template (Upper never mixes with Push) */
const prevOf=(n,tpl)=>{for(let i=S.log.length-1;i>=0;i--){const l=S.log[i];if(l.tpl!==tpl)continue;const e=l.ex.find(x=>x.n===n);if(e&&e.s.length)return e.s}return null};
const topOf=r=>+String(r).split('-').pop()||0;

function cnt(src,ws,lab,mv){const ds=wdays(ws);
 if(src.startsWith('r:')&&src.includes('+'))return src.split('+').reduce((a,x)=>a+cnt(x,ws,lab,mv),0);
 if(src==='lift')return S.log.filter(l=>l.date>=ws&&l.date<=ds[6]).length;
 if(src==='steps')return ds.filter(d=>(S.steps[d]||0)>=(mv?S.cfg.stepsMin:S.cfg.stepsT)).length;
 if(src==='water')return ds.filter(d=>(S.water[d]||0)>=S.cfg.waterT).length;
 if(src==='med')return ds.filter(d=>S.med[d]>0).length;
 if(src==='jr')return ds.filter(d=>S.jr[d]&&(S.jr[d].g||S.jr[d].w||S.jr[d].t)).length;
 if(src==='rev')return S.rev[ws]?.done?1:0;
 if(src==='diet')return ds.filter(d=>dietPct(d)>=.9).length;
 if(src.startsWith('r:'))return ds.filter(d=>rdone(d,src.slice(2))).length;
 if(src.startsWith('h:'))return ds.filter(d=>S.hab[d]?.[src.slice(2)]).length;
 return(S.wx[ws]||{})[lab]||0}
function monthStats(){const mo=D().slice(0,7),tx=S.tx.filter(x=>x.d.startsWith(mo)),by={};tx.forEach(x=>{if(x.k!=='i')by[x.c]=(by[x.c]||0)+x.a});const inBy={};tx.forEach(x=>{if(x.k==='i')inBy[x.c]=(inBy[x.c]||0)+x.a});return{mo,tx,by,inBy,sp:tx.reduce((a,x)=>a+(x.k==='i'?0:x.a),0),rc:tx.reduce((a,x)=>a+(x.k==='i'?x.a:0),0)}}

/* ---------- warnings ---------- */
function warns(){const w=[],t=D(),y=addD(t,-1),y2=addD(t,-2),ok=d=>d<S.start||minOk(d);
 if(!ok(y)&&!ok(y2))w.push(['r','Two slipped days in a row. Today is non-negotiable: hit your minimum day targets.']);
 else if(!ok(y))w.push(['a','Yesterday slipped. Never miss twice. Protect today.']);
 const ws=weekStart(t),dw=dow(t),L=cnt('lift',ws);
 if(ws>=S.start||dw>2){if(dw>=3&&L===0)w.push(['r','No workout logged this week yet.']);else if(dw>=5&&L<3)w.push(['a',`Only ${L} workout${L==1?'':'s'} logged this week.`])}
 if(S.steps[y]!==undefined&&S.steps[y]<S.cfg.stepsMin)w.push(['a',`Yesterday's steps: ${S.steps[y]} (minimum ${S.cfg.stepsMin}).`]);
 const pw=addD(ws,-7);if(dw===1&&pw>=S.start&&!S.rev[pw]?.done)w.push(['a','Sunday review not done. Do it before the week gets away.']);
 const ms=monthStats();cats().forEach(c=>{if(c.l&&(ms.by[c.n]||0)>c.l)w.push(['a',`Over budget: ${c.n} (${eur(ms.by[c.n])} / ${eur(c.l)}).`])});
 return w}

/* ---------- timers ---------- */
let T=S.timer&&S.timer.end>Date.now()?{...S.timer}:null,R=null,RUN=null,B=null,WL=null,AC=null,bp='Box',bd=5,sel=D(),view='day';
function unlock(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume()}catch(e){}}
function beep(n=2){try{for(let i=0;i<n;i++){const o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.frequency.value=880;g.gain.value=.25;o.start(AC.currentTime+i*.3);o.stop(AC.currentTime+i*.3+.15)}}catch(e){}try{navigator.vibrate?.([200,100,200])}catch(e){}}
async function wake(on){try{if(on&&!WL){WL=await navigator.wakeLock.request('screen');WL.addEventListener('release',()=>WL=null)}else if(!on&&WL){WL.release();WL=null}}catch(e){}}
function startTimer(sec,label,cb){T={end:Date.now()+sec*1e3,total:sec,label,cb};S.timer=cb?null:{end:T.end,total:sec,label};save();unlock();wake(true);tick()}
function tick(){const b=$('#tb'),el=$('#el');if(el&&S.active)el.textContent=fmt(Math.floor((Date.now()-S.active.t0)/1e3));
 if(!T){b.style.display='none';return}
 const left=Math.ceil((T.end-Date.now())/1e3);
 if(left<=0){const t=T;T=null;S.timer=null;save();beep(2);t.cb?.();if(!T){wake(false);b.style.display='none'}return}
 b.style.display='flex';$('#tl').textContent=T.label;$('#tt').textContent=fmt(left);const big=$('#big');if(big)big.textContent=fmt(left)}
const PAT={Box:[['Inhale',4],['Hold',4],['Exhale',4],['Hold',4]]};
function breath(){if(!B)return;const el=(Date.now()-B.start)/1e3;
 if(el>=B.dur*60)return bend(true);
 const ph=PAT[B.pat],cyc=ph.reduce((a,p)=>a+p[1],0);let x=el%cyc,k=0;while(x>=ph[k][1]){x-=ph[k][1];k++}
 const[n,d]=ph[k],f=x/d,pv=ph[(k+ph.length-1)%ph.length][0];
 const sc=n==='Inhale'?.6+.35*f:n==='Top-up'?.95+.05*f:n==='Exhale'?1-.4*f:(pv==='Exhale'?.6:1);
 const bl=$('#bl');if(bl){bl.textContent=n+' '+Math.ceil(d-x);$('#bc').style.transform=`scale(${sc})`;$('#br').textContent=fmt(Math.ceil(B.dur*60-el))}}
function bend(full){const m=full?B.dur:Math.floor((Date.now()-B.start)/6e4);B=null;wake(false);if(m>0)S.med[D()]=(S.med[D()]||0)+m;save();if(full)beep(3);go()}

/* guided flow (mobility, VO2): steps with auto-advancing timers */
function startFlow(name,scale){const f=flows()[name]||[];R={name,i:0,steps:f.map(([n,s])=>[n,Math.max(5,Math.round(s*scale))])};runStep()}
function runStep(){const[n,s]=R.steps[R.i];startTimer(s,n,()=>{R.i++;if(R.i<R.steps.length)runStep();else{R=null;save();if(S.ctx)A.ctxdone();else location.hash='#/plan'}go()})}

/* routine runner (Routinery-style Start Timer) */
function setDone(ds,r,s,v){const c=S.chk[ds]=S.chk[ds]||{};c[key(r,s)]=v}
function stepGo(rid,ds,i){const r=routines().find(x=>x.id===rid),s=stepsOf(r,ds)[i],k=s.link;
 if(!k){setDone(ds,r,s,!isDone(ds,r,s));save();return}
 if(k==='spotify'){setDone(ds,r,s,1);save();window.open(themeOf(ds).sp||'https://open.spotify.com','_blank');return}
 S.ctx={r:rid,d:ds,k:key(r,s),link:k,label:r.name+' › '+stripE(s.title)};save();
 if(k.startsWith('flow:'))startFlow(k.slice(5),s.min/s.full);
 location.hash=k.startsWith('flow:')?'#/run':'#/'+k;go()}
function rnext(rid,ds){const r=routines().find(x=>x.id===rid),st=stepsOf(r,ds),i=st.findIndex(s=>!isDone(ds,r,s));
 if(i<0){RUN=null;wake(false);beep(3);sel=ds;location.hash='#/plan';return}
 const s=st[i];if(s.link){RUN=null;stepGo(rid,ds,i);return}
 RUN={rid,ds};startTimer(s.min*60,stripE(s.title),()=>{setDone(ds,r,s,1);save();rnext(rid,ds);go()})}

/* ---------- views ---------- */
const seg=(opts,cur,act)=>`<div class=seg>`+opts.map(([k,l])=>`<button class="${String(cur)===String(k)?'on':''}" data-a=${act} data-v="${k}">${l}</button>`).join('')+`</div>`;
const bar=(v,t)=>`<div class=bar><i class="${v>t&&t?'o':''}" style="width:${t?Math.min(100,v/t*100):0}%"></i></div>`;
function layout(ev){ev.sort((a,b)=>a.s-b.s);const cl=[];let cur=[],end=0;
 ev.forEach(x=>{if(cur.length&&x.s>=end){cl.push(cur);cur=[];end=0}cur.push(x);end=Math.max(end,x.e)});if(cur.length)cl.push(cur);
 cl.forEach(c=>{const cols=[];c.forEach(x=>{let i=cols.findIndex(e=>e<=x.s);if(i<0){i=cols.length;cols.push(0)}cols[i]=x.e;x.c=i});c.forEach(x=>x.n=cols.length)})}
const Zv=()=>S.z||.75,clampZ=z=>Math.min(4,Math.max(.4,z));
const hmm=m=>String(m/60|0).padStart(2,'0')+':'+String(Math.round(m%60)).padStart(2,'0');
function extOn(ds){const a=new Date(ds+'T00:00').getTime(),b=a+864e5;return(S.gcal.evs||[]).filter(e=>e.s<b&&e.e>a).map(e=>({...e,sm:Math.max(0,(Math.max(e.s,a)-a)/6e4),em:(Math.min(e.e,b)-a)/6e4}))}
const TR='#d64550';
function todoBar(ds,t){const l=S.todo.filter(x=>x.due&&(x.due===ds||(ds===t&&x.due<ds&&!x.done)));if(!l.length)return'';
 return`<div style="margin:4px 0;max-height:96px;overflow-y:auto">`+l.map(x=>`<a href="#/t/${x.id}" style="display:flex;justify-content:space-between;align-items:center;gap:8px;color:inherit;text-decoration:none;font-size:14px;padding:6px 10px;margin:0 0 4px;background:var(--c);border-radius:10px;border-left:4px solid ${x.done?'#6b7280':TR};${x.done?'opacity:.55':''}"><span style="${x.done?'text-decoration:line-through':''}">${x.done?'✓ ':''}${esc(x.t)}</span><small style="display:inline;white-space:nowrap;${x.due<ds&&!x.done?'color:var(--r)':''}">${x.due<ds?'overdue':x.time||'all day'}</small></a>`).join('')+`</div>`}
function conflicts(ds){return[];const o=[],xs=extOn(ds).filter(e=>!e.ad);occ(ds).forEach(r=>{const a=+r.start.slice(0,2)*60+ +r.start.slice(3),b=a+r.dur;xs.forEach(y=>{if(a<y.em&&y.sm<b)o.push(`${r.name} (${r.start}) overlaps "${y.t}" (${hmm(y.sm)}-${hmm(y.em)})`)})});return o}
function grid(days){const t=D(),wk=days.length>1,nm=new Date(),nowM=nm.getHours()*60+nm.getMinutes(),z=Zv(),pos=q=>`left:calc(${q.c/q.n*100}% + 1px);width:calc(${100/q.n}% - 2px);top:calc(var(--z)*${q.s-360}px);height:max(calc(var(--z)*${q.e0-q.s}px - 1px),20px)`;
 let gut='';for(let i=0;i<=18;i++){gut+=`<span style="top:calc(var(--z)*${i*60}px)">${String(6+i).padStart(2,'0')}:00</span>`;if(z>=2&&i<18)gut+=`<span style="top:calc(var(--z)*${i*60+30}px);opacity:.6">${String(6+i).padStart(2,'0')}:30</span>`}
 return`<div class="grid ${wk?'wk':''}"><div class=gut>${gut}</div><div class=cols>`
 +days.map(ds=>{const ev=[].map(r=>{const s=+r.start.slice(0,2)*60+ +r.start.slice(3);return{r,s,e0:s+r.dur,e:Math.max(s+r.dur,s+Math.ceil(22/z))}}),
 tds=S.todo.map((x,i)=>({x,i})).filter(q=>q.x.due===ds&&q.x.time).map(q=>{const s=+q.x.time.slice(0,2)*60+ +q.x.time.slice(3);return{...q,s,e0:s+(q.x.dur||30),e:Math.max(s+(q.x.dur||30),s+Math.ceil(22/z))}}),
 xs=extOn(ds).filter(e=>!e.ad&&e.em>360).map(e=>({x:e,s:Math.max(e.sm,360),e0:e.em,e:Math.max(e.em,e.sm+Math.ceil(22/z))}));
 ev.forEach(q=>{q.cf=xs.some(y=>q.s<y.e0&&y.s<q.e0)});layout([...ev,...xs,...tds]);
 return`<div class=col data-d="${ds}">`+ev.map(q=>{const r=q.r,st=stepsOf(r,ds),dn=st.filter(s=>isDone(ds,r,s)).length,all=st.length&&dn===st.length;
 return`<a class="ev ${all?'dn':''}" href="#/r/${r.id}/${ds}" style="${pos(q)};background:hsl(${r.hue} 45% 24%);border-color:hsl(${r.hue} 70% 60%)"><b>${all?'✓ ':''}${esc(r.name)}</b>${wk?'':`<br>${r.start} · ${dn}/${st.length}`}</a>`}).join('')
 +tds.map(q=>`<a class="ev ${q.x.done?'dn':''}" href="#/t/${q.x.id}" style="${pos(q)};background:${TR};border-color:#fca5a5;color:#fff"><b>${q.x.done?'✓ ':''}${esc(q.x.t)}</b>${wk?'':`<br>${q.x.time} · ${q.x.dur||30} min`}</a>`).join('')
 +xs.map(q=>{const h=evHue(q.x);return`<a class="ev ${h==null?'ext':''}" href="#/xd/${encodeURIComponent(evKey(q.x))}/${ds}" style="${pos(q)}${h==null?'':`;background:hsl(${h} 70% 91%);border-color:hsl(${h} 55% 48%)`}"><b>${h==null?'':ic('link',12)+' '}${esc(q.x.t)}</b>${wk?'':`<br>${hmm(q.x.sm)}-${hmm(q.x.em)}`}</a>`}).join('')+(ds===t?`<i class=now style="top:calc(var(--z)*${nowM-360}px)">${wk?'':`<b>${hmm(nowM)}</b>`}</i>`:'')+`</div>`}).join('')+`</div></div>`}

const dv=(src,ds)=>src==='steps'?(S.steps[ds]||0):src==='water'?(S.water[ds]||0):src==='diet'?Math.round(dietPct(ds)*100):src==='med'?(S.med[ds]||0):src==='jr'?(S.jr[ds]&&(S.jr[ds].g||S.jr[ds].w||S.jr[ds].t)?1:0):src==='lift'?S.log.filter(l=>l.date===ds).length:0;
const dayRows=()=>lines(S.cfg.day).map(l=>{const[n,f,m,src]=l.split('|').map(x=>x.trim());return{n,f:+f||0,m:+m||0,src}});
const minOk=ds=>{const r=dayRows().filter(x=>x.m);return r.length>0&&r.every(x=>dv(x.src,ds)>=x.m)},fullOk=ds=>{const r=dayRows().filter(x=>x.f);return r.length>0&&r.every(x=>dv(x.src,ds)>=x.f)};
function minOkOld(ds){const d=dow(ds);return routines().filter(r=>r.ess&&r.days.includes(d)).every(r=>r.steps.filter(s=>s.short).every(x=>S.chk[ds]?.[key(r,x)]))}
function wsum(ws){const t=D(),ds=wdays(ws).filter(d=>d<=t&&d>=S.start),rows=lines(S.cfg.wk).map(l=>{const[n,c,m,src]=l.split('|').map(x=>x.trim());return{n,c:+c||0,m:+m||0,src:src||'x',v:cnt(src||'x',ws,n),vm:cnt(src||'x',ws,n,true)}});
 return{ds,ok:ds.filter(minOk).length,okF:ds.filter(fullOk).length,rows,met:rows.filter(r=>r.c&&r.v>=r.c).length,n:rows.filter(r=>r.c).length}}
let CTA='';
function vPlan(){const t=D(),ws=weekStart(sel),g=S.gcal,gon=g.url&&g.proxy;
 let h=`<div class=stick><div class=top><h1>${new Date(sel+'T12:00').toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</h1><div><button class="chip ${view==='day'?'on':''}" data-a=view data-v=day>Day</button> <button class="chip ${view==='week'?'on':''}" data-a=view data-v=week>Week</button> <button class=chip data-a=gotoday>Today</button></div></div>
 <div class=strip><button data-a=wk data-v=-7>‹</button>`+wdays(ws).map(d=>`<button class="dd ${d===sel?'on':''} ${d===t?'td':''}" data-a=sel data-v=${d}><small>${DN[dow(d)]}</small><b>${+d.slice(8)}</b></button>`).join('')+`<button data-a=wk data-v=7>›</button></div>
 <button class=chip data-a=zoom data-v=-1 aria-label="Zoom out">${ic('zout')}</button> <button class=chip data-a=zoom data-v=1 aria-label="Zoom in">${ic('zin')}</button> <small style="display:inline;font-size:12px">Pinch to zoom, swipe for next day</small> `+(gon?`<button class=chip data-a=gsync>${ic('refresh',14)} ${g.t?new Date(g.t).toTimeString().slice(0,5):'sync'}</button>`:'');
 const ad=extOn(sel).filter(e=>e.ad);if(ad.length)h+=`<div style="font-size:13px;color:var(--m);margin:4px 0">All day: ${ad.map(e=>esc(e.t)).join(', ')}</div>`;
 h+=todoBar(sel,t)+`</div>`;
 return h+grid(view==='week'?wdays(ws):[sel])}

const LBL={fuel:'Diet',train:'Workout',money:'Budget',mind:'Mind',skill:'Skill',rel:'Relationships',meaning:'Meaning',week:'Weeks',todo:'To-dos'};
function vRoutine(id,ds){ds=ds||D();const r=routines().find(x=>x.id===id);if(!r)return'<p>Routine not found.</p><a href="#/plan">Back</a>';
 const forced=mode(ds)==='min'&&r.ess,sh=isShort(r,ds),st=stepsOf(r,ds),done=st.filter(s=>isDone(ds,r,s)).length,left=st.filter(s=>!isDone(ds,r,s)).reduce((a,s)=>a+s.min,0),
 end=new Date(Date.now()+left*6e4).toTimeString().slice(0,5),cur=st.findIndex(s=>!isDone(ds,r,s)),run=RUN&&RUN.rid===id;
 const e=+r.start.slice(0,2)*60+ +r.start.slice(3)+r.dur,endT=String(Math.min(e,1439)/60|0).padStart(2,'0')+':'+String(Math.min(e,1439)%60).padStart(2,'0');
 const H=`<a href="#/plan" onclick="sel='${ds}'">‹ Calendar</a><h1>${esc(r.name)}</h1><small>${r.start} – ${endT} (${r.dur}m) · ${new Date(ds+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})} · ${done}/${st.length} done</small>
 ${forced?`<span class="dash on">Short version (Minimum day)</span>`:`<button class="dash ${sh?'on':''}" data-a=short data-r="${id}" data-d="${ds}">${sh?'✓ Short version':'+ Short version'}</button>`}`
 +st.map((s,i)=>{const d=isDone(ds,r,s);return`<div class="step ${d?'dn':''} ${i===cur?'cur':''}"><span class=n>${i+1}</span><span class=em>${emo(s.title)}</span><a data-a=stepgo data-r="${id}" data-d="${ds}" data-i=${i}>${esc(stripE(s.title))}${s.link?'<small>'+(s.link.startsWith('flow:')?'Guided flow':s.link==='spotify'?'Opens Spotify':'Opens '+esc(LBL[s.link]||s.link))+' ›</small>':''}</a><span class=mn>${s.min}m</span><button class="ck ${d?'on':''}" data-a=stepchk data-r="${id}" data-d="${ds}" data-i=${i}></button></div>`}).join('')
;CTA=done===st.length&&st.length?`<button class=cta data-a=rback data-d="${ds}">✓ Routine complete · Back to calendar</button>`:run?`<button class=cta data-a=rstop>■ Stop timer</button>`:`<button class=cta data-a=rstart data-r="${id}" data-d="${ds}">${ic('play')} Start timer<br><small style="color:#fff">Ends at ${end}</small></button>`;return H}

function vRun(){if(!R)return'<p>No guided flow running.</p><a href="#/plan">Back</a>';const s=R.steps;
 return`<small>${esc(R.name)} · step ${R.i+1} / ${s.length}</small><h1>${esc(s[R.i][0])}</h1><div class=big id=big>${fmt(s[R.i][1])}</div>
 <button class=btn data-a=runback>Back</button><button class="btn pri" data-a=tskip>Next</button><button class=btn data-a=runstop>Stop</button>
 <h3>Up next</h3>`+s.slice(R.i+1).map(x=>`<div class=row><span style="flex:1">${esc(x[0])}</span><small style="width:auto">${fmt(x[1])}</small></div>`).join('')}

function vTrain(){if(S.active)return vActive();const th=themeOf(D()),tp=tpls(),tn=th.train,last=S.log.filter(l=>l.tpl===tn).pop();
 let h=`<h1>Train</h1>`+(tp[tn]?`<div class=card><small>Today's session</small><b style="font-size:20px">${esc(tn)}</b><small>${tp[tn].length} exercises${last?' · last time '+last.date:''}</small><button class="btn pri" data-a=start data-n="${esc(tn)}">${ic('play')} Start ${esc(tn)}</button></div>`:(flows()[tn]?`<div class=card><small>Today's session</small><b style="font-weight:500;font-size:17px">${esc(tn)}</b><small>Guided flow · ${Math.round(flows()[tn].reduce((a,x)=>a+x[1],0)/60)} min</small><button class="btn pri" data-a=flowgo data-n="${esc(tn)}">${ic('play')} Start ${esc(tn)}</button></div>`:`<div class=card><small>Today's session</small><b>${esc(tn||'Rest day')}</b><small>Not a workout template. Start a free workout if you want to log something.</small></div>`))
 +`<h3>Cardio and guided flows</h3>`+Object.keys(flows()).map(n=>`<button class=btn data-a=flowgo data-n="${esc(n)}">${esc(n)}</button>`).join('')+`<a class=btn href="#/flows">Edit</a><h3>Other workouts</h3>`+Object.keys(tp).filter(n=>n!==tn).map(n=>`<button class=btn data-a=start data-n="${esc(n)}">${esc(n)}</button>`).join('')+`<button class=btn data-a=start data-n="">Empty workout</button><h3>History (saved on this phone)</h3>`;
 return h+(S.log.slice(-15).reverse().map((l,i)=>{const sets=l.ex.reduce((a,e)=>a+e.s.length,0),vol=l.ex.reduce((a,e)=>a+e.s.reduce((b,s)=>b+(+s.w||0)*(+s.r||0),0),0);
 return`<details class=card><summary><b>${esc(l.tpl)}</b> <small style="display:inline">${l.date} · ${l.dur} min · ${sets} sets · ${Math.round(vol)} kg</small></summary>${l.ex.map(e=>`<small>${esc(e.n)}: ${e.s.map(s=>s.w+'×'+s.r).join(', ')}</small>`).join('')}<button class=btn data-a=logdel data-i="${S.log.length-1-i}">Delete</button></details>`}).join('')||'<small>No workouts yet.</small>')}
function vActive(){const a=S.active;
 return`<h1>${esc(a.tpl)}</h1><small>Elapsed <span id=el></span> · autosaved, tap Finish to add it to history</small><button class="btn pri" data-a=finish>Finish</button><button class=btn data-a=cancel>Cancel</button>`+a.ex.map((e,x)=>{const p=prevOf(e.n,a.tpl),hint=p&&p.length>=e.s.length&&p.every(s=>+s.r>=topOf(e.r));
 return`<div class=card><b>${esc(e.n)}</b> <small style="display:inline">${e.r} reps · rest ${e.rest}s ${hint?'· ↑ add weight':''}</small>
 <div class=set><small>#</small><small>Last ${esc(a.tpl)}</small><small>kg</small><small>reps</small><small>✓</small></div>`+e.s.map((s,i)=>{const q=p&&(p[i]||p[p.length-1]);
 return`<div class=set><small>${i+1}</small><small>${q?q.w+'×'+q.r:'-'}</small><input inputmode=decimal data-c=w data-x=${x} data-s=${i} value="${esc(s.w)}" placeholder="${q?q.w:'kg'}"><input inputmode=numeric data-c=r data-x=${x} data-s=${i} value="${esc(s.r)}" placeholder="${q?q.r:e.r}"><button class="ck ${s.d?'on':''}" data-a=setdone data-x=${x} data-s=${i}></button></div>`}).join('')
 +`<button class=btn data-a=addset data-x=${x}>+ Set</button><button class=btn data-a=rmex data-x=${x}>Remove</button></div>`}).join('')+`<button class=btn data-a=addex>+ Exercise</button>`}

function vFuel(){const t=D(),dd=diet(),g=S.ing[t]||{},all=dd.flatMap(m=>m.items.map(i=>({...i,k:m.n+'|'+i.n}))),plan=tot(all),pc=all.filter(i=>g[i.k]).length;
 let h=`<h1>Diet</h1><div class=card><b>${pc}/${all.length}</b> items eaten today<div class=bar><i style="width:${all.length?pc/all.length*100:0}%"></i></div><small>Eat every amount listed and you hit about ${Math.round(plan.p)} g protein, ${Math.round(plan.c)} g carbs and ${Math.round(plan.f)} g fat (${Math.round(plan.k)} kcal as entered in your plan). Tick an item once you've eaten that amount. Edit the plan in More › Settings.</small></div>`;
 dd.forEach(m=>{const mt=tot(m.items),on=m.items.every(i=>g[m.n+'|'+i.n]);h+=`<div class=card><div class=top><b>${esc(m.n)} <small style="display:inline">${esc(m.t)}</small></b><button class=btn data-a=ingall data-m="${esc(m.n)}">${on?'Untick all':'Tick all'}</button></div><small>${Math.round(mt.p)} g protein · ${Math.round(mt.c)} g carbs · ${Math.round(mt.f)} g fat · ${Math.round(mt.k)} kcal</small>`+m.items.map(i=>`<div class=row><button class="ck ${g[m.n+'|'+i.n]?'on':''}" data-a=ing data-k="${esc(m.n+'|'+i.n)}"></button><span style="flex:1">${esc(i.n)}</span><b>${esc(i.a)}</b></div>`).join('')+`</div>`});
 return h+`<div class=card><b>Water</b> ${S.water[t]||0} / ${S.cfg.waterT} ml${bar(S.water[t]||0,S.cfg.waterT)}<button class=btn data-a=water data-v=250>+250 ml</button><button class=btn data-a=water data-v=500>+500 ml</button><button class=btn data-a=water data-v=-250>−250 ml</button>
 <input type=number inputmode=numeric data-c=steps value="${S.steps[t]||''}" placeholder="Steps today (target ${S.cfg.stepsT})"></div>`}

const sg=n=>(n>0?'+':n<0?'−':'')+eur(Math.abs(n));
function vMoney(){const s=monthStats(),ics=incs(),cs=cats(),exp=ics.reduce((a,c)=>a+c.l,0),bud=cs.reduce((a,c)=>a+c.l,0),av=exp,extra=Math.max(0,s.rc-exp),left=av-s.sp,unb=av-bud;
 const T=(l,v,sub,col)=>`<div class=tile><small>${l}</small><b style="${col?'color:'+col:''}">${v}</b><small>${sub}</small></div>`;
 return`<h1>Money</h1><small>${s.mo}</small><div class=tiles>`
 +T('Left to spend',sg(left),'expected income minus spent',left<0?'var(--r)':'var(--ok)')
 +T('Spent',eur(s.sp),bud?'of '+eur(bud)+' budgeted':'no budget set',bud&&s.sp>bud?'var(--r)':'')
 +T('Income',eur(s.rc),exp?'logged · '+eur(exp)+' expected'+(extra?' · '+sg(extra)+' extra':''):'logged · <a href="#/set/inc">set expected income</a>','')
 +T('Unbudgeted',sg(unb),unb<0?'budgets exceed expected income':'expected income not in a bucket',unb<0?'var(--r)':'')
 +`</div><h3>Income</h3>`+ics.map(c=>{const v=s.inBy[c.n]||0;return`<div style="margin:12px 0"><div class=top><b style="font-weight:500">${esc(c.n)}</b><small style="display:inline">${eur(v)}${c.l?' of '+eur(c.l):''}</small></div>${bar(c.l?Math.min(v,c.l):0,c.l)}</div>`}).join('')
 +`<h3>Expenses</h3>`+cs.map(c=>{const v=s.by[c.n]||0,l2=c.l-v;return`<div style="margin:12px 0"><div class=top><b style="font-weight:500">${esc(c.n)}</b><small style="display:inline;text-align:right">${eur(v)}${c.l?' of '+eur(c.l)+' · '+(l2>=0?eur(l2)+' left':'<span style="color:var(--r)">'+eur(-l2)+' over</span>'):''}${c.m?' · min '+eur(c.m)+(v>=c.m?' ✓':', '+eur(c.m-v)+' to go'):''}</small></div>${bar(v,c.l)}</div>`}).join('')
 +`<h3>Add</h3><div class=card><select id=sk data-c=sk><option value=e>Expense</option><option value=i>Income</option></select><input id=sa type=number step=0.01 inputmode=decimal placeholder="Amount €"><select id=sc>${cs.map(c=>`<option>${esc(c.n)}</option>`).join('')}</select><select id=si style="display:none">${ics.map(c=>`<option>${esc(c.n)}</option>`).join('')}</select><input id=sn placeholder="Note"><small>Date</small><input id=sdt class=dt type=date value="${D()}"><button class="btn pri" data-a=spend>Add</button></div>
 <h3>This month</h3>`+txByDay(s.tx)+`<h3>Earlier months</h3>`+earlier()}
const txByDay=tx=>{const g={};tx.forEach(x=>(g[x.d]=g[x.d]||[]).push(x));return Object.keys(g).sort().reverse().map(d=>`<h3>${new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})} · ${eur(g[d].reduce((a,x)=>a+(x.k==='i'?0:x.a),0))} spent</h3>`+g[d].map(x=>`<div class=row><span style="flex:1">${esc(x.c)}<small>${esc(x.n)}</small></span><b style="${x.k==='i'?'color:var(--ok)':''}">${x.k==='i'?'+':''}${eur(x.a)}</b><button class=btn data-a=txdel data-i="${S.tx.indexOf(x)}">✕</button></div>`).join('')).join('')||'<small>Nothing yet.</small>'};
const earlier=()=>{const mo=D().slice(0,7),m={};S.tx.filter(x=>!x.d.startsWith(mo)&&x.k!=='i').forEach(x=>m[x.d.slice(0,7)]=(m[x.d.slice(0,7)]||0)+x.a);return Object.keys(m).sort().reverse().map(k=>`<div class=row><span style="flex:1">${k}</span><b>${eur(m[k])}</b></div>`).join('')||'<small>None.</small>'}

function vMind(){const t=D(),ws=weekStart(t);let h=`<h1>Mind training</h1><small>Meditated today ${S.med[t]||0} min · this week ${wdays(ws).reduce((a,d)=>a+(S.med[d]||0),0)} min</small>`;
 if(B)h+=`<div class=big id=bl></div><div id=bc></div><div class=big id=br style="font-size:28px"></div><button class=btn data-a=bstop>Stop</button>`;
 else h+=`<small>Box breathing: 4 seconds in, 4 hold, 4 out, 4 hold</small>`+seg([[3,'3 min'],[5,'5 min'],[10,'10 min']],bd,'bd')+`<button class="btn pri" data-a=bstart>${ic('play')} Start box breathing</button>`;
 const j=S.jr[t]||{};
 return h+`<h3>Today's journal</h3><small>Three short lines, saved automatically.</small><input data-c=jr data-k=g value="${esc(j.g)}" placeholder="One thing I'm grateful for"><input data-c=jr data-k=w value="${esc(j.w)}" placeholder="One win today"><input data-c=jr data-k=t value="${esc(j.t)}" placeholder="Tomorrow's number one">
 <h3>Past entries</h3><input data-c=js placeholder="Search past entries (a word or a date)"><div id=jl>${jlist('')}</div>`}
const jlist=q=>{const t=D(),a=Object.entries(S.jr).filter(([d,j])=>d!==t&&(j.g||j.w||j.t)).sort().reverse().filter(([d,j])=>(d+(j.g||'')+(j.w||'')+(j.t||'')).toLowerCase().includes(q.toLowerCase()));
 return a.length?`<small>${a.length} ${q?'matching ':''}entr${a.length==1?'y':'ies'}${a.length>30?' (latest 30 shown)':''}</small>`+a.slice(0,30).map(([d,j])=>`<div class=card><small>${d}</small><span style="color:var(--t2)">Grateful</span> ${esc(j.g)}<br><span style="color:var(--t2)">Win</span> ${esc(j.w)}<br><span style="color:var(--t2)">Tomorrow</span> ${esc(j.t)}</div>`).join(''):`<small>${q?'No entries match.':'No past entries yet. What you write above shows up here from tomorrow.'}</small>`};

function vSkill(d){const T=themes(),td=+d||dow(D()),th=T[td]||{},tn=[...Object.keys(tpls()),...Object.keys(flows())];
 return`<h1>Skill and money</h1><div class=card><small>${DN[td]} focus</small><b style="font-weight:500;font-size:17px">${esc(th.learn)}</b><small>Listen: ${esc(th.audio)}</small></div>`
 +(th.q&&th.q.length?`<h3>Watch and listen list for ${DN[td]}</h3>`+th.q.map(i=>i.u?`<a class=row href="${esc(i.u)}" target=_blank style="flex:1"><span style="flex:1">${esc(i.t)}</span>${ic('chev')}</a>`:`<div class=row><span style="flex:1">${esc(i.t)}</span></div>`).join(''):'')
 +`<div style="margin-top:12px"><a class="btn pri" href="${esc(th.sp||'https://open.spotify.com')}" target=_blank>${ic('play')} Spotify</a><button class=btn data-a=timer data-s=2400 data-l="Learn block">${ic('timer')} 40-min learn</button><button class=btn data-a=timer data-s=5400 data-l="Build block">${ic('timer')} 90-min build</button></div>
 <h3>What each day is for</h3><small>Tap a day to change its focus, audio, training and watch list. The training name can be a workout or a guided flow.</small>
 <datalist id=trl>${tn.map(n=>`<option value="${esc(n)}">`).join('')}</datalist>`
 +Object.entries(T).map(([k,v])=>`<details class=card><summary><b style="font-weight:500">${DN[k]}</b> <small style="display:inline">${esc(v.learn)} · ${esc(v.train)}</small></summary>
 <small>Learn focus</small><input data-c=th data-d=${k} data-k=learn value="${esc(v.learn)}"><small>Audio</small><input data-c=th data-d=${k} data-k=audio value="${esc(v.audio)}"><small>Training</small><input data-c=th data-d=${k} data-k=train list=trl value="${esc(v.train)}"><small>Spotify link</small><input data-c=th data-d=${k} data-k=sp value="${esc(v.sp)}"><small>Watch and listen list: one per line, optional link after the title</small><textarea data-c=th data-d=${k} data-k=q rows=4 style="font-family:inherit">${esc((v.q||[]).map(i=>i.t+(i.u?' '+i.u:'')).join('\n'))}</textarea></details>`).join('')}
const vNotes=(title,k,hint,extra='')=>`<h1>${title}</h1>${extra}<small>${hint}</small><div class=card><textarea id=ne rows=4 placeholder="Write an entry..."></textarea><input id=nd class=dt type=date value="${D()}"><button class="btn pri" data-a=nadd data-k=${k}>Save entry</button></div><small>Entries are kept on this phone, newest first, and also show in your Weeks log on their date.</small>`+(S.nl[k]||[]).map((e,i)=>({...e,i})).sort((p,q)=>p.d<q.d?1:-1).map(e=>`<div class=card><small>${new Date(e.d+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'})}</small><div style="white-space:pre-wrap">${esc(e.t)}</div><button class=btn data-a=ndel data-k=${k} data-i=${e.i}>Delete</button></div>`).join('');

function dayLog(d){const j=S.jr[d]||{},L=[],sp=S.tx.filter(x=>x.d===d&&x.k!=='i').reduce((a,x)=>a+x.a,0),inc=S.tx.filter(x=>x.d===d&&x.k==='i').reduce((a,x)=>a+x.a,0),dp=Math.round(dietPct(d)*100);
 S.log.filter(l=>l.date===d).forEach(l=>L.push(`${ic('dumbbell')} ${esc(l.tpl)} · ${l.dur} min · ${l.ex.reduce((a,e)=>a+e.s.length,0)} sets`));
 if(S.steps[d])L.push(ic('pulse')+' '+S.steps[d]+' steps');if(S.water[d])L.push(ic('drop')+' '+S.water[d]+' ml water');if(dp)L.push(ic('utensils')+' Diet '+dp+'%');if(S.med[d])L.push(ic('wind')+' '+S.med[d]+' min box breathing / meditation');
 if(j.g)L.push(ic('pencil')+' Grateful: '+esc(j.g));if(j.w)L.push(ic('pencil')+' Win: '+esc(j.w));if(j.t)L.push(ic('pencil')+' Tomorrow: '+esc(j.t));
 S.todo.filter(x=>x.due===d).forEach(x=>L.push(ic(x.done?'done':'open')+' '+esc(x.t)));
 (S.nl.rel||[]).filter(e=>e.d===d).forEach(e=>L.push(ic('heart')+' '+esc(e.t)));(S.nl.meaning||[]).filter(e=>e.d===d).forEach(e=>L.push(ic('leaf')+' '+esc(e.t)));
 if(sp)L.push(ic('coin')+' Spent '+eur(sp));if(inc)L.push(ic('coin')+' Income +'+eur(inc));
 return`<div class=card><b>${new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'})}</b> ${minOk(d)?'<span class=chip style="background:var(--a);border-color:var(--a);color:#fff">✓ minimum</span>':''}${fullOk(d)?'<span class=chip style="background:var(--ok);border-color:var(--ok);color:#fff">★ full</span>':''}`+(L.length?L.map(x=>`<div style="display:flex;gap:8px;align-items:flex-start;padding:4px 0;font-size:14px;color:var(--t2)">${x}</div>`).join(''):'<small>Nothing logged.</small>')+`</div>`}
const wkComb=ws=>{const t=D();return`<div style="display:flex;gap:4px;margin:12px 0 8px">`+wdays(ws).map(d=>{const f=d>=S.start&&d<=t,st=!f?'':fullOk(d)?'f':minOk(d)?'m':d<t?'x':'',bg=st==='f'?'var(--ok)':st==='m'?'var(--a)':st==='x'?'#fde8e8':'var(--c2)',fg=st==='f'||st==='m'?'#fff':st==='x'?'var(--r)':'var(--m)';return`<span style="flex:1;text-align:center;border-radius:8px;padding:8px 0;font-size:12px;background:${bg};color:${fg}">${DN[dow(d)]}<br><b style="font-weight:500">${st==='f'?'★':st==='m'?'✓':st==='x'?'✗':'·'}</b></span>`}).join('')+`</div>`};
const srcLabel=x=>x==='lift'?'Fills in by itself from workouts you log':x==='steps'?'Fills in by itself from your steps':x==='water'?'Fills in by itself from water logged':x==='diet'?'Fills in by itself from ticked diet items':x==='med'?'Fills in by itself from box breathing':x==='jr'?'Fills in by itself from your journal':x==='rev'?'Ticks when you mark Review done':x.startsWith('r:')?'Fills in by itself when you tick these routines':'Manual: use + and −';
const wkStrip=(ws,fn,mk)=>`<div style="display:flex;gap:4px;margin:6px 0 10px">`+wdays(ws).map(d=>{const f=d>=S.start&&d<=D(),ok=f&&fn(d);return`<span style="flex:1;text-align:center;border-radius:8px;padding:6px 0;font-size:12px;background:${ok?'var(--ok)':f&&d<D()?'#fde8e8':'var(--c2)'};color:${ok?'#fff':'var(--t)'}">${DN[dow(d)]}<br>${ok?mk:f&&d<D()?'✗':'·'}</span>`}).join('')+`</div>`;
function vWeek(w){const t=D(),cw=weekStart(t),ws=w||cw,sm=wsum(ws),r=S.rev[ws]||{},past=addD(ws,6)<t,fd=d=>new Date(d+'T12:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'});
 let h=`<div class=top><a class=btn href="#/week/${addD(ws,-7)}">‹</a><h2 style="margin:0">${fd(ws)} – ${fd(addD(ws,6))}</h2><a class=btn href="#/week/${addD(ws,7)}">›</a></div>
 <div class=card><div style="display:flex;gap:8px;flex-wrap:wrap"><span class=chip style="background:var(--a);color:#fff;border-color:var(--a)">✓ Minimum or better ${sm.ok}/7</span><span class=chip style="background:var(--ok);color:#fff;border-color:var(--ok)">★ Full day ${sm.okF}/7</span></div>${wkComb(ws)}<small>Green star: full day. Amber check: minimum day. Red: missed. Targets per day are in Settings › Daily targets. A week with all 7 days at minimum or better is a minimum week.</small></div>
 `+'<h3>Log</h3><small>Everything you logged, per day.</small>'+wdays(ws).filter(d=>d>=S.start&&d<=t).reverse().map(dayLog).join('')+`<h3>Targets</h3>`;
 sm.rows.forEach(x=>{h+=`<div>${esc(x.n)} <small style="display:inline">${x.v}/${x.c} · minimum ${x.m} ${x.vm>=x.m?'✓':''}</small><small style="font-size:12px">${srcLabel(x.src)}</small>${x.src==='x'?` <button class=btn data-a=wx data-w="${ws}" data-l="${esc(x.n)}" data-v=1>+</button><button class=btn data-a=wx data-w="${ws}" data-l="${esc(x.n)}" data-v=-1>−</button>`:''}<div class=bar><i style="width:${x.c?Math.min(100,x.v/x.c*100):0}%"></i></div></div>`});
 h+=`<h3>Notes</h3><textarea data-c=rev data-w="${ws}" placeholder="Money, goals, what to fix next week">${esc(r.n)}</textarea><div class=row><button class="ck ${r.done?'on':''}" data-a=revdone data-w="${ws}"></button><span>Review done</span></div>`;
 h+=`<h3>All weeks</h3>`;for(let x=cw,i=0;x>=weekStart(S.start)&&i<26;x=addD(x,-7),i++){const q=wsum(x),pw=addD(x,6)<t;h+=`<a class=lc href="#/week/${x}" style="padding:10px 14px"><b style="font-size:15px">${fd(x)} – ${fd(addD(x,6))}</b><small>Minimum days ${q.ok}/7 · Full days ${q.okF}/7 · Targets ${q.met}/${q.n}</small></a>`}
 return h}

function vTodo(){const t=D(),a=S.todo.map((x,i)=>({...x,i})).sort((p,q)=>(p.done-q.done)||((p.due||'9')<(q.due||'9')?-1:1));
 return`<h1>To-dos</h1><div class=card><input id=ta placeholder="New task"><small>Date (leave empty for no date)</small><input id=td class=dt type=date><small>Description (optional)</small><textarea id=tde rows=3 style="font-family:inherit"></textarea><small>Time (optional; empty = all-day)</small><input id=tt2 class=dt type=time><small>Estimated duration</small><select id=tdu><option value=15>15 min</option><option value=30 selected>30 min</option><option value=60>1 hour</option><option value=90>1.5 hours</option><option value=120>2 hours</option></select><button class="btn pri" data-a=todoadd>Add</button><small>Open to-dos also show on the Calendar, in red, on their day.</small></div>`+a.map(x=>`<div class=row><button class="ck ${x.done?'on':''}" data-a=todotog data-i=${x.i}></button><a href="#/t/${x.id}" style="flex:1;${x.done?'opacity:.4;text-decoration:line-through':''}">${esc(x.t)}<small style="${x.due&&x.due<t&&!x.done?'color:var(--r)':''}">${x.due||''}${x.time?' '+x.time:''}</small></a><button class=btn data-a=tododel data-i=${x.i}>✕</button></div>`).join('')}

const DH={train:8,routine:215,flow:40,fuel:130,money:48,mind:270,skill:210,rel:330,meaning:170,week:190,todo:0},HUES=[0,25,45,95,150,185,215,255,290,330];
const evKey=e=>e.u?'u:'+e.u:'n:'+bkey(e.t),bndE=e=>{const b=S.bind||{};return b[evKey(e)]||b[bkey(e.t)]};
const CATS=[['train','Workout'],['routine','Routine'],['flow','Guided flow'],['fuel','Diet and water'],['money','Budget'],['mind','Mind'],['skill','Skill and watch list'],['rel','Relationships'],['meaning','Meaning'],['week','Weeks'],['todo','To-dos']];
const catOf=v=>v==='train'||v.startsWith('tr/')?'train':v.startsWith('r/')?'routine':v.startsWith('f/')?'flow':v;
const ITM=()=>({train:[['train','Gym tracker (free workout)'],...Object.keys(tpls()).map(n=>['tr/'+n,n])],routine:routines().map(r=>['r/'+r.id,r.name]),flow:Object.keys(flows()).map(n=>['f/'+n,n])});
const typeHue=b=>{const c=catOf(b);return S.tcol&&S.tcol[c]!=null?S.tcol[c]:(DH[c]??200)};
const evHue=e=>{const b=bndE(e);return b?typeHue(b):null};
const bkey=t=>String(t).trim().toLowerCase(),bnd=t=>(S.bind||{})[bkey(t)];
const TG=()=>[['train','Workout (gym tracker)'],['fuel','Diet and water'],['money','Budget'],['mind','Mind'],['skill','Skill and watch list'],['rel','Relationships'],['meaning','Meaning'],['week','Weeks'],['todo','To-dos'],...routines().map(r=>['r/'+r.id,'My routine: '+r.name]),...Object.keys(flows()).map(n=>['f/'+n,'Guided flow: '+n]),...Object.keys(tpls()).map(n=>['tr/'+n,'Workout: '+n])];
const tgName=v=>v==='train'?'Workout · gym tracker':v.startsWith('tr/')?'Workout · '+v.slice(3):v.startsWith('r/')?'Routine · '+((routines().find(x=>'r/'+x.id===v)||{}).name||v.slice(2)):v.startsWith('f/')?'Guided flow · '+v.slice(2):((CATS.find(x=>x[0]===v)||[0,v])[1]);
function vExt(k,ds,rd){const e=extOn(ds||D()).find(x=>evKey(x)===k)||(S.gcal.evs||[]).find(x=>evKey(x)===k)||{t:(S.bname||{})[k]||k.replace(/^[un]:/,''),u:k.startsWith('u:')?k.slice(2):''},b=(S.bind||{})[k]||bndE(e);
 if(b&&rd){setTimeout(()=>location.replace('#/'+b),0);return'<p>Opening…</p>'}
 const when=e.sm!=null?(e.ad?'All day':hmm(e.sm)+'-'+hmm(e.em)):'',t=esc(e.t),cat=b?catOf(b):'',items=ITM();
 return`<a href="#/plan">‹ Calendar</a><h1>${t}</h1><small>Google Calendar event${when?' · '+when:''}${e.rc?' · repeating: the link applies to every occurrence of this event':''}</small>`
 +(e.d?`<div class=card style="white-space:pre-wrap;font-size:14px">${esc(e.d)}</div>`:'')
 +`<h3>Type of event</h3><select data-c=bsel data-k="${esc(k)}" data-n="${t}"><option value="">Not linked</option>${CATS.map(c=>`<option value="${c[0]}" ${cat===c[0]?'selected':''}>${c[1]}</option>`).join('')}</select>`
 +(items[cat]?`<h3>Which one</h3>`+(items[cat].length?`<select data-c=bsel2 data-k="${esc(k)}" data-n="${t}">${items[cat].map(x=>`<option value="${esc(x[0])}" ${b===x[0]?'selected':''}>${esc(x[1])}</option>`).join('')}</select>`:`<small>None yet. Create one first (More › ${cat==='routine'?'My routines':'Guided flows'}).</small>`):'')
 +(b?`<div class=card style="border-left:4px solid hsl(${typeHue(b)} 60% 50%)"><small>Linked to</small><b style="font-weight:500">${esc(tgName(b))}</b><a class="btn pri" href="#/${b}" style="margin-top:8px">Open now ›</a><small>Tapping this event on the calendar opens its page. The colour comes from the type, change it in More › Google Calendar sync › Colours by type.</small></div>`:'<small>Not linked yet, so it stays grey on the calendar.</small>')
 +`<h3>Link for Google Calendar</h3><small>Optional: paste this into the event's description in Google Calendar yourself, and the link opens the linked page.</small><button class=btn data-a=copy data-v="${base()}#/x/${encodeURIComponent(k)}">Copy link</button>`}
function vTodoD(id){const x=S.todo.find(y=>y.id===id);if(!x)return'<a href="#/plan">‹ Calendar</a><p>To-do not found.</p>';
 const f=(k,ty,v)=>`<input data-c=tf data-id="${x.id}" data-k=${k} class=dt type=${ty} value="${esc(v||'')}">`,du=[15,30,45,60,90,120,180];if(!du.includes(+x.dur))du.push(+x.dur||30);
 return`<a href="#/plan">‹ Calendar</a><h1 style="${x.done?'text-decoration:line-through;opacity:.6':''}">${esc(x.t)}</h1><small>${x.due?x.due+(x.time?' at '+x.time+' · '+(x.dur||30)+' min':' · all day'):'No date'}${x.done?' · ✓ done':''}</small>
 <button class="btn ${x.done?'':'pri'}" data-a=todotogid data-id="${x.id}" style="display:block;width:100%;margin:10px 0">${x.done?'↩ Mark as not done':'✓ Mark as done'}</button>
 <h3>Edit</h3><small>Title</small><input data-c=tf data-id="${x.id}" data-k=t value="${esc(x.t)}"><small>Date</small>${f('due','date',x.due)}<small>Time (empty = all day)</small>${f('time','time',x.time)}<small>Duration</small><select data-c=tf data-id="${x.id}" data-k=dur>${du.sort((a,b)=>a-b).map(m=>`<option value=${m} ${m===+(x.dur||30)?'selected':''}>${m} min</option>`).join('')}</select>
 <h3>Description</h3><textarea data-c=tf data-id="${x.id}" data-k=desc rows=6 placeholder="Add details, links, notes..." style="font-family:inherit">${esc(x.desc||'')}</textarea>
 <button class=btn data-a=tododelid data-id="${x.id}" style="margin-top:14px">Delete to-do</button>`}
const flowsText=f=>Object.entries(f).map(([n,st])=>'# '+n+'\n'+st.map(x=>x[0]+'|'+x[1]).join('\n')).join('\n');
const nUse=v=>Object.values(S.bind||{}).filter(x=>x===v).length+routines().reduce((a,r)=>a+r.steps.filter(x=>x.link===v||(v.startsWith('f/')&&x.link==='flow:'+v.slice(2))).length,0);
function vFlow(n){const f=flows()[n];if(!f)return'<a href="#/flows">‹ Guided flows</a><p>Flow not found.</p>';
 return`<a href="#/types">‹ Event types</a><h1>${esc(n)}</h1><small>${Math.round(f.reduce((a,x)=>a+x[1],0)/60)} min · ${f.length} steps</small><button class="btn pri" data-a=flowgo data-n="${esc(n)}" style="margin-top:12px">${ic('play')} Start</button><h3>Steps</h3>`+f.map(x=>`<div class=row><span style="flex:1">${esc(x[0])}</span><small>${fmt(x[1])}</small></div>`).join('')+`<a class=btn href="#/flows" style="margin-top:12px">Edit flows</a>`}
function vTr(n){if(S.active)return vActive();const t=tpls()[n];if(!t)return'<a href="#/types">‹ Event types</a><p>Workout not found.</p>';
 return`<a href="#/types">‹ Event types</a><h1>${esc(n)}</h1><small>${t.length} exercises</small><button class="btn pri" data-a=start data-n="${esc(n)}" style="margin-top:12px">${ic('play')} Start ${esc(n)}</button><h3>Exercises</h3>`+t.map(e=>`<div class=row><span style="flex:1">${esc(e.n)}</span><small>${e.s} × ${esc(e.r)} · rest ${e.rest} s</small></div>`).join('')+`<a class=btn href="#/set/tpl" style="margin-top:12px">Edit exercises and rest times</a>`}
function vFlows(){const f=flows();
 return`<h1>Guided flows</h1><small>Timed, step-by-step sessions: mobility, 4x4 intervals, Zone 2 cardio. Start one here, link it to a Google event, or add it to a routine as a step with the page set to flow:Name.</small>`
 +Object.entries(f).map(([n,st])=>`<div class=card><div class=top><b style="font-weight:500">${esc(n)}</b><small style="display:inline">${Math.round(st.reduce((a,x)=>a+x[1],0)/60)} min</small></div><button class="btn pri" data-a=flowgo data-n="${esc(n)}">${ic('play')} Start</button><details><summary><small style="display:inline">Edit steps (name|seconds)</small></summary><textarea data-c=flowt data-n="${esc(n)}" rows=${st.length+1} style="font-family:var(--mono)">${esc(st.map(x=>x[0]+'|'+x[1]).join('\n'))}</textarea><button class=btn data-a=flowdel data-n="${esc(n)}">Delete flow</button></details></div>`).join('')
 +`<h3>Build an interval or cardio session</h3><div class=card><small>Name</small><input id=fn placeholder="e.g. Hill intervals"><small>Warm-up (min)</small><input id=fw type=number value=10><small>Rounds</small><input id=fr type=number value=4><small>Work per round (min)</small><input id=fk type=number value=4><small>Rest per round (min, 0 for steady cardio)</small><input id=fe type=number value=3><small>Cool-down (min)</small><input id=fc type=number value=5><button class="btn pri" data-a=flowbuild>Build</button><small>4 rounds of 4 min work and 3 min rest is the 4x4. One round, no rest, 60 min work is a Zone 2 session.</small></div>`}
function vTypes(){const row=(href,i,name,desc,v)=>`<a class=lr href="${href}"><span class=li>${ic(i)}<span>${esc(name)}<small>${esc(desc)}</small></span></span><small style="white-space:nowrap">${v!=null?nUse(v)+' linked':''}</small></a>`;
 const PG=[['fuel','utensils','Diet and water','Tick meals, log water and steps'],['money','wallet','Budget','Income, expenses and buckets'],['mind','wind','Mind','Box breathing and journal'],['skill','book','Skill and watch list','Learn focus, audio and your list per day'],['rel','heart','Relationships','Time with people, notes'],['meaning','leaf','Meaning','Reflections and gratitude'],['week','chart','Weeks','Your log per day and week'],['todo','check','To-dos','Tasks with date, time and description']];
 return`<h1>Event types</h1><small>Everything a Google event or a routine step can open. Open one, or edit it. The number is how many events and routine steps are linked to it.</small>
 <h3>Pages</h3>`+PG.map(p=>row('#/'+p[0],p[1],p[2],p[3],p[0])).join('')
 +`<h3>My routines</h3>`+(routines().map(r=>row('#/r/'+r.id,'repeat',r.name,r.steps.length+' steps',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('r/'+r.id)} linked</small>`)).join('')||'<small>No routines yet.</small>')+`<a class=btn href="#/rtn" style="margin-top:8px">Edit routines</a>`
 +`<h3>Guided flows</h3>`+Object.entries(flows()).map(([n,st])=>row('#/f/'+encodeURIComponent(n),'timer',n,Math.round(st.reduce((a,x)=>a+x[1],0)/60)+' min',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('f/'+n)} linked</small>`)).join('')+`<a class=btn href="#/flows" style="margin-top:8px">Edit flows and cardio</a>`
 +`<h3>Workouts</h3>`+row('#/train','dumbbell','Gym tracker','Free workout and history',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('train')} linked</small>`)+Object.keys(tpls()).map(n=>row('#/tr/'+encodeURIComponent(n),'dumbbell',n,'Strength session',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('tr/'+n)} linked</small>`)).join('')+`<a class=btn href="#/set/tpl" style="margin-top:8px">Edit workouts, sets and rest times</a>`}
function vNewTodo(d,tm){const du=[15,30,45,60,90,120,180];return`<a href="#/plan">‹ Calendar</a><h1>New to-do</h1><div class=card><input id=nt placeholder="What needs doing?"><small>Date</small><input id=ntd class=dt type=date value="${esc(d)}"><small>Time</small><input id=ntt class=dt type=time value="${esc(tm)}"><small>Duration</small><select id=ntu>${du.map(m=>`<option value=${m} ${m===30?'selected':''}>${m} min</option>`).join('')}</select><small>Description</small><textarea id=ntde rows=3 style="font-family:inherit"></textarea><button class="btn pri" data-a=tnadd>Add to-do</button></div>`}
function vRtn(){return`<h1>My routines</h1><small>A routine is a list of steps you tick off, with an optional timer per step. Make one here, then link it to a Google Calendar event by tapping that event in the calendar.</small>`
 +routines().map(r=>`<div class=row><a href="#/r/${r.id}"><b>${esc(r.name)}</b><small>${r.steps.length} steps · ${r.dur} min</small></a><button class=btn data-a=rtndel data-n="${esc(r.name)}">✕</button></div>`).join('')
 +`<h3>New routine</h3><div class=card><input id=rn placeholder="Name, e.g. Evening routine"><small>One step per line: title|minutes|page (minutes and page are optional). Pages you can open from a step: train fuel money mind skill rel meaning week todo</small><textarea id=rs rows=7 placeholder="Brush teeth|3\nBox breathing|5|mind\nPlan tomorrow|5|todo\nRead|20"></textarea><button class="btn pri" data-a=rtnadd>Add routine</button></div><small>Want more control (days, colour, short versions)? Edit the text in Settings › Routines.</small>`}
function vGuide(){const g=S.gcal,w=(g.proxy||'https://YOUR-WORKER.workers.dev/').replace(/\/?$/,'/'),n=(t,b)=>`<div class=card><b>${t}</b><small style="color:var(--t)">${b}</small></div>`;
 return`<h1>Connect Google Calendar</h1><small>Do this on a computer, once. There are two separate things, and you can do only the first.</small>
 <h2>Part 1 · See Google events in Life OS</h2><small>You already did this if grey events show up. It needs a free Cloudflare worker address and your calendar's secret address.</small>
 <h2>Part 2 · Send to-dos to Google Calendar</h2><small>Optional. About 15 minutes. Menu names at Google change now and then, so look for the closest match.</small>
 ${n('Step 1 · Create a Google project','Open console.cloud.google.com and sign in with the same Google account as your calendar. Top left, click the project name › New project. Name it Life OS › Create. Make sure Life OS is the selected project.')}
 ${n('Step 2 · Turn on the Calendar API','Click the search bar at the top, type Google Calendar API, open it, click Enable.')}
 ${n('Step 3 · Consent screen','Menu › APIs and Services › OAuth consent screen (may be called Google Auth Platform) › Get started. App name Life OS, your email for support and contact. Audience: External. Finish. Then find Audience (or Publishing status) › Publish app › Confirm. This stops the login from expiring after 7 days. Only you will use it.')}
 ${n('Step 4 · Get your client ID and secret','Menu › APIs and Services › Credentials (or Clients) › Create credentials › OAuth client ID › Application type: Web application › name Life OS. Under Authorized redirect URIs click Add URI and paste the address below. Create. Keep the window open: you need the Client ID and the Client secret in the next step.')}
 <div class=row><span style="flex:1;word-break:break-all;font-size:13px">${esc(w)}auth/cb</span><button class=btn data-a=copy data-v="${esc(w)}auth/cb">Copy</button></div>
 ${g.proxy?'':'<small style="color:var(--r)">Fill in your worker address in Google Calendar sync first so this address is right.</small>'}
 ${n('Step 5 · Run the setup on your Mac','Open the Terminal app (Cmd+Space, type Terminal, Enter). Paste the line below and press Enter. It opens Cloudflare to log in, then asks you to paste the Client ID, then the Client secret (paste, Enter). At the end it prints a long key. Copy that key.')}
 <div class=row><span style="flex:1;word-break:break-all;font-size:13px">cd ~/Desktop/Life-OS/worker && ./setup.sh</span><button class=btn data-a=copy data-v="cd ~/Desktop/Life-OS/worker && ./setup.sh">Copy</button></div>
 ${n('Step 6 · Connect your Google account','In a browser on the computer open: '+esc(w)+'auth/start?k=YOURKEY (replace YOURKEY with the key). Choose your account. If Google says it has not verified the app, click Advanced › Go to Life OS › Allow. You should see "Connected ✓".')}
 ${n('Step 7 · Tell the app','Back in this app: More › Google Calendar sync › paste the key in the To-do sync key box › Turn on to-do sync. Then add a to-do with a date and check Google Calendar. It appears in red within seconds.')}
 <a class="btn pri" href="#/links">Back to Google Calendar sync</a>`}
function vLinks(){const g=S.gcal,bs=Object.entries(S.bind||{});
 return`<h1>Google Calendar</h1><small>Link a Google event to a page, routine or flow. Life OS only reads your events.</small>
 <h3>Colours by type</h3><small>Every linked event takes the colour of its type.</small>`
 +CATS.map(x=>`<div style="margin:8px 0"><small>${esc(x[1])}</small><div style="display:flex;gap:8px;margin-top:4px">`+HUES.map(h=>`<button data-a=tcol data-v="${x[0]}" data-h=${h} aria-label="Colour ${h}" style="flex:none;width:26px;height:26px;padding:0;border:0;border-radius:50%;background:hsl(${h} 60% 55%);${typeHue(x[0])===h?'outline:2px solid var(--t);outline-offset:2px':''}"></button>`).join('')+`</div></div>`).join('')
 +`<h3>Linked events</h3><small>Google events you've connected to a page, routine, flow or workout. Tap one to change or remove its link. To link a new event, tap it on the calendar.</small>`
 +(bs.length?bs.map(([k,v])=>`<a class=row href="#/xd/${encodeURIComponent(k)}/${D()}" style="color:inherit"><span style="width:12px;height:12px;border-radius:50%;background:hsl(${typeHue(v)} 55% 50%);flex:none"></span><span style="flex:1"><b style="font-weight:500">${esc((S.bname||{})[k]||k.replace(/^[un]:/,''))}</b><small>Opens ${esc(tgName(v))}</small></span>${ic('chev')}</a>`).join(''):'<small>No events linked yet.</small>')
 +`<h3>Copy a link for any routine</h3>`+(routines().map(r=>`<div class=row><span style="flex:1">${esc(r.name)}</span><button class=btn data-a=copy data-v="${base()}#/r/${r.id}">Copy</button></div>`).join('')||'<small>No routines yet.</small>')
 +`<details class=card style="margin-top:24px"><summary><b style="font-weight:500">Sync settings</b> <small style="display:inline">set up once</small></summary><small style="margin-top:8px"><a href="#/guide">Step-by-step guide</a></small>
 <h3>Show my Google events here</h3><small>Google Calendar on a computer › Settings › your calendar › Integrate calendar › copy the secret address in iCal format.</small>
 <input data-c=gc data-k=url value="${esc(g.url)}" placeholder="Secret address in iCal format"><input data-c=gc data-k=proxy value="${esc(g.proxy)}" placeholder="Worker address, e.g. https://lifeos-cal.yourname.workers.dev/">
 <button class=btn data-a=gsync>${ic('refresh')} Sync now</button><small>${g.t?'Last synced '+new Date(g.t).toTimeString().slice(0,5)+' · '+g.evs.length+' upcoming events':'Not synced yet'}${g.err?' · Error: '+esc(g.err):''}</small>
 <h3>Send my to-dos to Google Calendar</h3><small>To-dos with a date appear in red and stay in step: done ones get a ✓ and turn grey.</small><input data-c=gc data-k=key type=password value="${esc(g.key)}" placeholder="To-do sync key"><button class="btn ${g.tds?'pri':''}" data-a=tds>${g.tds?'✓ To-do sync on':'Turn on to-do sync'}</button>${g.terr?'<small style="color:var(--r)">Error: '+esc(g.terr)+'</small>':''}</details>`}


const CF=[['day','Daily targets (minimum and full day)','label|full-day target|minimum-day target|source. Sources: steps water diet(percent) med(minutes) jr(1 = journal written) lift(workouts that day). A minimum day = every minimum target reached. A full day = every full target reached.'],['routines','Routines (calendar events)','# name|start|minutes|days 1-7|unused, leave blank|essential 1/0|colour 0-360, then steps: title|minutes|link|short version (* = keep, number = minutes, blank = skipped). Links: fuel money mind skill rel meaning train week todo spotify flow:Name. Titles can use {learn} {audio} {train}.'],['flows','Guided flows','# Name, then step|seconds'],['themes','Day themes','day 1-7|learn|audio|train template name|spotify link'],['tpl','Workout templates','# Name, then exercise|sets|reps|rest sec'],['diet','Diet plan','# Meal|time, then: ingredient|amount (g or ml)|protein g|carbs g|fat g|kcal. You enter the kcal yourself, nothing is calculated.'],['inc','Income sources','Name|expected per month €. Salary, trading wins, anything that comes in.'],['cats','Expense buckets','Name|monthly budget €|optional minimum €. Rent, groceries, savings and so on.'],['wk','Weekly targets','label|full target|minimum target|source: lift steps water diet med jr rev r:routine-id (join several with +) x(manual +/- counter)']];
const NF=[['waterT','Water target ml'],['stepsT','Steps target'],['stepsMin','Steps minimum']];
function vSet(k){if(k)setTimeout(()=>{const e=document.getElementById('cfg-'+k);if(e)e.scrollIntoView()},50);return`<h1>Settings</h1><small>Everything is editable. Use | to separate fields and never use | inside text.</small><h3>Numbers</h3>`+NF.map(([k,l])=>`<small>${l}</small><input type=number inputmode=decimal data-c=num data-k=${k} value="${S.cfg[k]}">`).join('')
 +CF.map(([k,l,h])=>`<h3 id="cfg-${k}">${l}</h3><small>${esc(h)}</small><textarea data-c=cfg data-k=${k} rows=8>${esc(S.cfg[k])}</textarea><button class=btn data-a=cfgreset data-k=${k}>Reset to default</button>`).join('')
 +`<h3>Data</h3><button class=btn data-a=export>Export backup (JSON)</button><label class=btn>Import backup<input id=imp type=file accept=".json" hidden></label>`}

function vMore(){const L=(r,i,t)=>`<a class=lr href="#/${r}"><span class=li>${ic(i)}${t}</span>${ic('chev')}</a>`;
 return`<h1>More</h1><h3>Track</h3>`+L('train','dumbbell','Workouts')+L('fuel','utensils','Diet, water, steps')+L('money','wallet','Budget')+`<h3>Grow</h3>`+L('mind','wind','Mind: box breathing, journal')+L('skill','book','Skill and money')+L('rel','heart','Relationships and play')+L('meaning','leaf','Meaning')+`<h3>Review and plan</h3>`+L('week','chart','Weeks')+L('todo','check','To-dos')+L('rtn','repeat','My routines')+L('types','layers','Event types')+L('flows','timer','Guided flows')+`<h3>App</h3>`+L('links','calendar','Google Calendar sync')+L('set','sliders','Settings')+`<div class=row style="margin-top:8px"><span style="flex:1">Version<small style="font-family:var(--mono)">${BUILD}</small></span><button class=btn data-a=refresh>${ic('refresh')} Update app</button></div><small>Your data stays on the phone when you update</small>`}

function vDay(d,w){const i=DN.map(x=>x.toLowerCase()).indexOf(String(d).toLowerCase());return w==='learn'?vSkill(i>0?i:d):w==='train'?vTrain():vPlan()}

/* ---------- actions ---------- */
const A={
view:({v})=>{view=v},gotoday:()=>{sel=D()},wk:({v})=>{sel=addD(sel,+v)},sel:({v})=>{sel=v},
mode:({v})=>{S.mode[sel]=v==='min'?'min':'full'},
short:({r,d})=>{const s=S.short[d]=S.short[d]||{};s[r]=!s[r]},
stepchk:({r,d,i})=>{const rr=routines().find(x=>x.id===r),s=stepsOf(rr,d)[+i];setDone(d,rr,s,!isDone(d,rr,s))},
stepgo:({r,d,i})=>{stepGo(r,d,+i);return false},
flowgo:({n})=>{startFlow(n,1);location.hash='#/run';return false},
flowdel:({n})=>{if(!confirm('Delete this flow?'))return false;const f=flows();delete f[n];S.cfg.flows=flowsText(f)},
flowbuild:()=>{const n=$('#fn').value.replace(/\|/g,' ').trim(),w=+$('#fw').value||0,r=Math.max(1,+$('#fr').value||1),k=+$('#fk').value||1,e=+$('#fe').value||0,c=+$('#fc').value||0;if(!n)return false;const st=[];if(w)st.push(['Warm-up',w*60]);for(let i=1;i<=r;i++){st.push([r===1&&!e?'Steady':'Work '+i,k*60]);if(e&&i<r)st.push(['Easy',e*60])}if(c)st.push(['Cool-down',c*60]);const f=flows();f[n]=st;S.cfg.flows=flowsText(f)},
tnadd:()=>{const t=$('#nt').value.trim();if(!t)return false;S.todo.push({id:tid(),sy:0,t,desc:$('#ntde').value,due:$('#ntd').value,time:$('#ntt').value,dur:+$('#ntu').value||30,done:0});sel=$('#ntd').value||sel;save();setTimeout(tflush,50);location.hash='#/plan';return false},
rtnadd:()=>{const n=$('#rn').value.replace(/\|/g,' ').trim(),st=$('#rs').value.split('\n').map(x=>x.trim()).filter(Boolean);if(!n||!st.length)return false;const m=st.reduce((a,x)=>a+(+x.split('|')[1]||0),0)||5;S.cfg.routines=(S.cfg.routines?S.cfg.routines.trim()+'\n':'')+`# ${n}|08:00|${m}|1234567||0|${Math.floor(Math.random()*360)}\n`+st.join('\n')},
rtndel:({n})=>{const o=[];let skip=0;lines(S.cfg.routines).forEach(l=>{if(l[0]==='#')skip=l.slice(1).split('|')[0].trim()===n;if(!skip)o.push(l)});S.cfg.routines=o.join('\n')},
rstart:({r,d})=>{rnext(r,d)},
rstop:()=>{RUN=null;T=null;S.timer=null;wake(false)},
rback:({d})=>{sel=d;location.hash='#/plan';return false},
ctxdone:()=>{const c=S.ctx;if(!c)return;(S.chk[c.d]=S.chk[c.d]||{})[c.k]=1;S.ctx=null;save();location.hash='#/r/'+c.r+'/'+c.d;go();return false},
ctxx:()=>{S.ctx=null},
water:({v})=>{S.water[td()]=Math.max(0,(S.water[td()]||0)+ +v)},
zoom:({v})=>{S.z=clampZ(Zv()*(+v>0?1.4:1/1.4))},
gsync:()=>{gsync(true);return false},
ing:({k})=>{const g=S.ing[td()]=S.ing[td()]||{};g[k]=!g[k]},
ingall:({m})=>{const dm=diet().find(x=>x.n===m),g=S.ing[td()]=S.ing[td()]||{},on=dm.items.every(i=>g[m+'|'+i.n]);dm.items.forEach(i=>g[m+'|'+i.n]=!on)},
tadd:({s})=>{if(T){T.end+= +s*1e3;if(S.timer)S.timer.end=T.end}},
tskip:()=>{if(T)T.end=Date.now()-1;tick();return false},
timer:({s,l})=>{startTimer(+s,l)},
paid:()=>{const m=td().slice(0,7);S.paid[m]=!S.paid[m]},
spend:()=>{const a=parseFloat($('#sa').value);if(!a)return false;{const k=$('#sk').value;S.tx.push({d:$('#sdt').value||td(),c:k==='i'?$('#si').value:$('#sc').value,a,n:$('#sn').value,k})}},
txdel:({i})=>{S.tx.splice(+i,1)},
todoadd:()=>{const t=$('#ta').value.trim();if(!t)return false;setTimeout(tflush,50);S.todo.push({id:tid(),sy:0,desc:($('#tde')||{}).value||'',t,due:$('#td').value,time:$('#tt2').value,dur:+$('#tdu').value||30,done:0})},
todotog:({i})=>{const x=S.todo[+i];x.done=x.done?0:1;x.sy=0;setTimeout(tflush,50)},
tododel:({i})=>{const x=S.todo[+i];if(x.id&&x.sy)S.tdel.push(x.id);S.todo.splice(+i,1);setTimeout(tflush,50)},
wx:({l,v,w})=>{S.wx[w]=S.wx[w]||{};S.wx[w][l]=Math.max(0,(S.wx[w][l]||0)+ +v)},
revdone:({w})=>{S.rev[w]=S.rev[w]||{};S.rev[w].done=!S.rev[w].done},
bp:({v})=>{bp=v},bd:({v})=>{bd=+v},
bstart:()=>{B={pat:bp,dur:bd,start:Date.now()};unlock();wake(true)},
bstop:()=>{bend(false);return false},
start:({n})=>{const tp=tpls()[n]||[];S.active={tpl:n||'Workout',t0:Date.now(),ex:tp.map(e=>({n:e.n,r:e.r,rest:e.rest,s:Array.from({length:e.s},()=>({w:'',r:'',d:0}))}))}},
addset:({x})=>{S.active.ex[+x].s.push({w:'',r:'',d:0})},
rmex:({x})=>{S.active.ex.splice(+x,1)},
addex:()=>{const n=prompt('Exercise name');if(n)S.active.ex.push({n,r:'8-12',rest:90,s:[{w:'',r:'',d:0},{w:'',r:'',d:0},{w:'',r:'',d:0}]})},
setdone:({x,s})=>{const a=S.active,e=a.ex[+x],st=e.s[+s],p=prevOf(e.n,a.tpl);st.d=st.d?0:1;if(st.d){const q=p&&(p[+s]||p[p.length-1]);if(q){st.w=st.w||q.w;st.r=st.r||q.r}startTimer(e.rest,'Rest: '+e.n)}},
finish:()=>{const a=S.active,ex=a.ex.map(e=>({n:e.n,s:e.s.filter(s=>s.d)})).filter(e=>e.s.length);if(ex.length)S.log.push({date:td(),tpl:a.tpl,dur:Math.round((Date.now()-a.t0)/6e4),ex});S.active=null;T=null;S.timer=null;wake(false);if(S.ctx&&S.ctx.link==='train')return A.ctxdone();location.hash='#/train'},
cancel:()=>{if(confirm('Discard this workout?')){S.active=null;T=null;S.timer=null}},
logdel:({i})=>{if(confirm('Delete this workout?'))S.log.splice(+i,1)},
runback:()=>{R.i=Math.max(0,R.i-1);runStep()},
runstop:()=>{R=null;T=null;S.timer=null;wake(false);location.hash=S.ctx?'#/r/'+S.ctx.r+'/'+S.ctx.d:'#/plan'},
bind:({k,n,v})=>{(S.bind=S.bind||{})[k]=v;(S.bname=S.bname||{})[k]=n},
unbind:({k,n})=>{delete S.bind[k];delete S.bind[bkey(n)]},
tcol:({v,h})=>{(S.tcol=S.tcol||{})[v]=+h},
todotogid:({id})=>{const x=S.todo.find(y=>y.id===id);x.done=x.done?0:1;x.sy=0;setTimeout(tflush,50)},
tododelid:({id})=>{const i=S.todo.findIndex(y=>y.id===id);if(i<0)return false;const x=S.todo[i];if(x.sy)S.tdel.push(x.id);S.todo.splice(i,1);save();setTimeout(tflush,50);location.hash='#/plan';return false},
tds:()=>{S.gcal.tds=S.gcal.tds?0:1;if(S.gcal.tds)S.todo.forEach(x=>x.sy=0)},
copy:({v})=>{(navigator.clipboard?.writeText(v)||Promise.reject()).then(()=>alert('Link copied')).catch(()=>prompt('Copy this link',v));return false},
cfgreset:({k})=>{if(confirm('Reset this section to defaults?'))S.cfg[k]=DEF.cfg[k]},
export:()=>{dl('lifeos-backup-'+td()+'.json',JSON.stringify(S),'application/json');return false},
refresh:async()=>{try{(await navigator.serviceWorker.getRegistrations()).forEach(r=>r.unregister());(await caches.keys()).forEach(k=>caches.delete(k))}catch(e){}location.replace(location.pathname+'?u='+Date.now()+location.hash);return false}};
const dl=(n,t,ty)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:ty}));a.download=n;a.click()};

let tft=0;
const I={bsel:el=>{const k=el.dataset.k,n=el.dataset.n,v=el.value;S.bind=S.bind||{};S.bname=S.bname||{};if(!v){delete S.bind[k];delete S.bind[bkey(n)]}else{const it=ITM()[v];if(it){if(!it.length){save();setTimeout(go,0);return}S.bind[k]=it[0][0]}else S.bind[k]=v;S.bname[k]=n}save();setTimeout(go,0)},bsel2:el=>{S.bind[el.dataset.k]=el.value;S.bname[el.dataset.k]=el.dataset.n;save();setTimeout(go,0)},th:el=>{const T=themes(),d=+el.dataset.d,k=el.dataset.k;T[d]=T[d]||{};if(k==='q')T[d].q=el.value.split('\n').map(x=>x.trim()).filter(Boolean).map(x=>{const m=x.match(/^(.*?)\s*(https?:\S+)$/);return m?{t:m[1],u:m[2]}:{t:x,u:''}});else T[d][k]=el.value.replace(/\|/g,' ');S.cfg.themes=themesText(T)},flowt:el=>{const f=flows();f[el.dataset.n]=el.value.split('\n').filter(l=>l.trim()).map(l=>{const[n,x]=l.split('|');return[(n||'').trim(),+x||60]});S.cfg.flows=flowsText(f)},sk:el=>{$('#sc').style.display=el.value==='e'?'':'none';$('#si').style.display=el.value==='i'?'':'none'},tf:el=>{const x=S.todo.find(y=>y.id===el.dataset.id);if(!x)return;const k=el.dataset.k;x[k]=k==='dur'?+el.value:el.value;x.sy=0;clearTimeout(tft);tft=setTimeout(tflush,1500)},

w:el=>{S.active.ex[+el.dataset.x].s[+el.dataset.s].w=el.value},
r:el=>{S.active.ex[+el.dataset.x].s[+el.dataset.s].r=el.value},
steps:el=>{S.steps[td()]=+el.value},
jr:el=>{(S.jr[td()]=S.jr[td()]||{})[el.dataset.k]=el.value},
js:el=>{$('#jl').innerHTML=jlist(el.value)},

gc:el=>{S.gcal[el.dataset.k]=el.value.trim()},
rev:el=>{const w=el.dataset.w;S.rev[w]=S.rev[w]||{};S.rev[w].n=el.value},
cfg:el=>{S.cfg[el.dataset.k]=el.value},
num:el=>{S.cfg[el.dataset.k]=+el.value}};
document.addEventListener('click',e=>{unlock();const el=e.target.closest('[data-a]');if(!el)return;const f=A[el.dataset.a];if(f&&f(el.dataset,el)!==false){save();go()}});
document.addEventListener('input',e=>{const f=I[e.target.dataset.c];if(f){f(e.target);save()}});
document.addEventListener('change',e=>{if(e.target.id!=='imp')return;const f=e.target.files[0];if(!f)return;f.text().then(t=>{S=load(JSON.parse(t));save();go()}).catch(()=>alert('Invalid backup file'))});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();if(T||B)wake(true);gsync(false);tflush();chk()}});

/* ---------- router ---------- */
/* Google Calendar read sync (via your own tiny proxy) */
let icalP,gbusy=false;
const loadICAL=()=>window.ICAL?Promise.resolve():icalP||(icalP=new Promise((ok,no)=>{const e=document.createElement('script');e.src='https://cdn.jsdelivr.net/npm/ical.js@1.5.0/build/ical.min.js';e.onload=ok;e.onerror=()=>no(Error('could not load ical.js'));document.head.appendChild(e)}));
function toLocal(t){return t.isDate||!t.zone||t.zone===ICAL.Timezone.localTimezone?new Date(t.year,t.month-1,t.day,t.hour,t.minute,t.second):t.toJSDate()}
function parseICS(txt){const comp=new ICAL.Component(ICAL.parse(txt));comp.getAllSubcomponents('vtimezone').forEach(z=>{try{ICAL.TimezoneService.register(z)}catch(e){}});
 const a=ICAL.Time.fromJSDate(new Date(Date.now()-7*864e5)),b=ICAL.Time.fromJSDate(new Date(Date.now()+70*864e5)),out=[],all=comp.getAllSubcomponents('vevent').map(v=>new ICAL.Event(v)),ms={};
 all.forEach(e=>{if(!e.isRecurrenceException())ms[e.uid]=e});all.forEach(e=>{if(e.isRecurrenceException()&&ms[e.uid])ms[e.uid].relateException(e)});
 const push=(st,en,e,u,rc)=>{if(/#\/r\/|#lifeos-todo/.test(e.description||''))return;out.push({t:e.summary||'(no title)',s:toLocal(st).getTime(),e:toLocal(en).getTime(),ad:!!st.isDate,u,rc,d:(e.description||'').slice(0,600)})};
 Object.values(ms).forEach(e=>{if(e.isRecurring()){const it=e.iterator();let n,k=0;while((n=it.next())&&k++<800){if(n.compare(b)>0)break;if(n.compare(a)<0)continue;const d=e.getOccurrenceDetails(n);push(d.startDate,d.endDate,d.item,e.uid,1)}}else if(e.startDate.compare(b)<=0&&e.endDate.compare(a)>=0)push(e.startDate,e.endDate,e,e.uid,0)});
 return out}
const tid=()=>Date.now().toString(32)+Math.random().toString(32).slice(2,6);let tbusy=0;
async function tflush(){const g=S.gcal;if(tbusy||!g.proxy||!g.key||!g.tds)return;tbusy=1;
 try{const u=new URL('todo',g.proxy.endsWith('/')?g.proxy:g.proxy+'/').href,H={'x-key':g.key,'content-type':'application/json'};
  for(const d of (S.tdel||[]).slice()){const r=await fetch(u+'?id='+d,{method:'DELETE',headers:H});if(!r.ok&&r.status!==404)throw Error('HTTP '+r.status);S.tdel=S.tdel.filter(x=>x!==d);save()}
  for(const x of S.todo){x.id=x.id||tid();if(x.due&&!x.sy){const r=await fetch(u,{method:'POST',headers:H,body:JSON.stringify({id:x.id,title:x.t,desc:x.desc||'',date:x.due,time:x.time||'',dur:x.dur||30,done:x.done?1:0,tz:Intl.DateTimeFormat().resolvedOptions().timeZone})});if(!r.ok)throw Error('HTTP '+r.status+' '+await r.text());x.sy=1;save()}}
  g.terr=''}catch(e){g.terr=String(e.message||e)}tbusy=0;save();if(location.hash.includes('links'))go()}
setTimeout(tflush,2500);
async function gsync(force){const g=S.gcal;if(gbusy||!g.url||!g.proxy||(!force&&Date.now()-g.t<9e5))return;gbusy=true;
 try{await loadICAL();const r=await fetch(g.proxy+(g.proxy.includes('?')?'&':'?')+'u='+encodeURIComponent(g.url));if(!r.ok)throw Error('HTTP '+r.status);g.evs=parseICS(await r.text());g.t=Date.now();g.err=''}catch(e){g.err=String(e.message||e)}
 gbusy=false;save();go()}

/* pinch to zoom the calendar time axis */
let pz=null;const pd=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
let sw=null,ANIM='';
function swipe(d){ANIM=d>0?'inL':'inR';sel=addD(sel,d*(view==='week'?7:1));go()}
document.addEventListener('touchstart',e=>{sw=e.touches.length===1&&e.target.closest('.grid')?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;const g=$('.grid');if(g&&e.touches.length===2&&e.target.closest('.grid')){const my=(e.touches[0].clientY+e.touches[1].clientY)/2;pz={d:pd(e.touches),z:Zv(),my,m:(scrollY+my-g.offsetTop)/Zv()}}},{passive:true});
document.addEventListener('touchmove',e=>{if(!pz||e.touches.length!==2)return;e.preventDefault();S.z=clampZ(pz.z*pd(e.touches)/pz.d);document.documentElement.style.setProperty('--z',S.z);scrollTo(0,$('.grid').offsetTop+pz.m*S.z-pz.my)},{passive:false});
document.addEventListener('touchend',e=>{if(sw&&!pz&&e.changedTouches.length===1){const dx=e.changedTouches[0].clientX-sw.x,dy=e.changedTouches[0].clientY-sw.y;sw=null;if(Math.abs(dx)>70&&Math.abs(dx)>1.6*Math.abs(dy)){swipe(dx<0?1:-1);return}}if(pz&&e.touches.length<2){pz=null;save();go()}});

let lp=null,lpx=0,lpy=0;
document.addEventListener('touchstart',e=>{clearTimeout(lp);if(e.touches.length!==1)return;const g=$('.grid'),t0=e.target;if(!g||!t0.closest||!t0.closest('.grid')||t0.closest('.ev'))return;lpx=e.touches[0].clientX;lpy=e.touches[0].clientY;lp=setTimeout(()=>{const r=g.getBoundingClientRect(),m=Math.round(((lpy-r.top)/Zv()+360)/15)*15,col=document.elementFromPoint(lpx,lpy);if(m<360||m>1425)return;const d=(col&&col.closest('.col')&&col.closest('.col').dataset.d)||sel;try{navigator.vibrate&&navigator.vibrate(15)}catch(x){}sw=null;location.hash='#/tn/'+d+'/'+hmm(m)},550)},{passive:true});
document.addEventListener('touchmove',e=>{if(lp&&e.touches[0]&&(Math.abs(e.touches[0].clientX-lpx)>10||Math.abs(e.touches[0].clientY-lpy)>10)){clearTimeout(lp);lp=null}},{passive:true});
document.addEventListener('touchend',()=>{clearTimeout(lp)});
const V={types:vTypes,flows:vFlows,f:vFlow,tr:vTr,tn:vNewTodo,rtn:vRtn,guide:vGuide,x:(k,d)=>vExt(k,d,1),xd:(k,d)=>vExt(k,d),xe:(k,d)=>vExt(k,d),t:vTodoD,plan:vPlan,today:vPlan,b:vPlan,train:vTrain,fuel:vFuel,money:vMoney,more:vMore,life:vMore,mind:vMind,skill:vSkill,rel:()=>vNotes('Relationships and play','rel','Log time with people and things to remember: date ideas, who to call, gifts, how an evening went.'),meaning:()=>vNotes('Meaning','meaning','Reflections, gratitude, what matters to you, ways you helped someone.',`<button class=btn data-a=timer data-s=900 data-l="Quiet moment">${ic('timer')} 15-min quiet</button>`),week:vWeek,todo:vTodo,links:vLinks,set:vSet,r:vRoutine,run:vRun,day:vDay};
const SUB=['types','flows','rtn','guide','train','fuel','money','mind','skill','rel','meaning','week','todo','links','set'];
function scrollPlan(){const g=$('.grid');if(!g)return;const n=new Date(),m=sel===D()?n.getHours()*60+n.getMinutes():420;const hh=($('.stick')||{}).offsetHeight||0;scrollTo(0,g.offsetTop-hh+Math.max(0,m-360-60)*Zv())}
function go(){const[p,...a]=(location.hash.slice(2)||'plan').split('/'),v=$('#v'),st=scrollY;CTA='';document.documentElement.style.setProperty('--z',Zv());
 if(p==='r'&&S.ctx){S.ctx=null;save()}
 try{v.innerHTML=(SUB.includes(p)?'<a href="#/more">‹ More</a>':'')+(V[p]||vPlan)(...a.map(decodeURIComponent))}catch(e){v.innerHTML=`<h1>Error</h1><p>${esc(e.message)}</p><a href="#/set">Open Settings to fix a config</a>`}
 scrollTo(0,st);$('#ctaw').innerHTML=CTA;if(ANIM){const g=$('.grid');if(g)g.classList.add(ANIM);ANIM=''}
 const nav=['plan','today','b','r','run','day'].includes(p)?'plan':'more';
 document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x.dataset.p===nav));
 $('#cx').style.display=S.ctx?'flex':'none';if(S.ctx)$('#cxl').textContent=S.ctx.label;
 tick();breath()}
addEventListener('hashchange',()=>{go();scrollTo(0,0);scrollPlan()});
try{new ResizeObserver(()=>{$('#v').style.paddingBottom=($('#dock').offsetHeight+72)+'px'}).observe($('#dock'))}catch(e){}
setInterval(tick,250);setInterval(breath,100);

/* data safety + silent updates */
try{navigator.storage?.persist?.()}catch(e){}
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(()=>{});let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!S.active&&!B&&!R)location.reload();had=true})}
async function chk(){try{const j=await(await fetch('version.json?'+Date.now(),{cache:'no-store'})).json();if(BUILD!=='dev'&&j.b&&j.b!==BUILD&&!location.search.includes('u='+j.b)&&!S.active&&!B&&!R&&!T)location.replace(location.pathname+'?u='+j.b+location.hash)}catch(e){}}
save();go();scrollPlan();gsync(false);chk();
