'use strict';
const BUILD='1794156791';
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
const IC={gem:'<path d="M6 3h12l4 6-10 13L2 9zM11 3 8 9l4 13 4-13-3-6M2 9h20"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',dumbbell:'<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>',utensils:'<path d="M5 3v7a2 2 0 0 0 2 2v9M9 3v7a2 2 0 0 1-2 2M17 3c-2 2-2 6 0 8v10"/>',wallet:'<path d="M3 7a2 2 0 0 1 2-2h14v4M3 7v11a2 2 0 0 0 2 2h16V9H5a2 2 0 0 1-2-2z"/><circle cx="17" cy="14" r="1"/>',wind:'<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',book:'<path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>',heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',leaf:'<path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15zM5 19l8-8"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',check:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',repeat:'<path d="M17 2l3 3-3 3M20 5H8a4 4 0 0 0-4 4v1M7 22l-3-3 3-3M4 19h12a4 4 0 0 0 4-4v-1"/>',sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',play:'<path d="M7 4l13 8-13 8z"/>',timer:'<circle cx="12" cy="14" r="7"/><path d="M12 14v-4M9 2h6"/>',zin:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M8 11h6M11 8v6"/>',zout:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M8 11h6"/>',refresh:'<path d="M20 12a8 8 0 1 1-3-6.2M20 4v5h-5"/>',headphones:'<path d="M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H5a1 1 0 0 1-1-1zM20 15h-3v5h2a1 1 0 0 0 1-1z"/>',pencil:'<path d="M4 20h4L20 8l-4-4L4 16zM14 6l4 4"/>',drop:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',pulse:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',chev:'<path d="M9 6l6 6-6 6"/>',done:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',open:'<circle cx="12" cy="12" r="9"/>',layers:'<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',coin:'<circle cx="12" cy="12" r="9"/><path d="M14.5 9a3 3 0 0 0-5 1.5c0 3 5 1.5 5 4.5a3 3 0 0 1-5 1.5M12 6.5v11"/>'};
const ic=(n,z)=>`<svg class="i" viewBox="0 0 24 24"${z?` style="width:${z}px;height:${z}px"`:''}>${IC[n]||''}</svg>`;
const emo=t=>(t.match(/^[\p{Extended_Pictographic}️‍]+/u)||['▫️'])[0];
const DN=['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const base=()=>location.origin+location.pathname;
const td=()=>D();

/* ---------- defaults (everything is editable in Life > Settings) ---------- */
const VER=10;
const DEF={v:VER,foc:null,fs:[],fchain:null,gd:{w:8,h:6,it:[],bf:0,pend:[]},fsp:'daisy',fsel:null,start:D(),mode:{},wmode:{},short:{},chk:{},water:{},steps:{},port:{},ing:{},z:.75,tcol:{},bname:{},bcol:{},nl:{},own:0,tdel:[],bind:{},notes:{},gcal:{url:'',proxy:'',key:'',tds:0,t:0,evs:[],err:''},supp:{},hab:{},jr:{},med:{},todo:[],log:[],active:null,tx:[],paid:{},rev:{},wx:{},timer:null,ctx:null,
cfg:{
fapps:`WhatsApp|whatsapp://
Gmail|googlegmail://
Google Calendar|googlecalendar://`,
income:0,invest:0,waterT:2500,stepsT:10000,stepsMin:8000,
themes:`1|Money: investing basics, tax, index funds. Check auto-invest.|Finance and business|Push|
2|Craft: GTM, CRM, RevOps. Build or practise something real.|Career and industry|Pull|
3|Reading and mind: one book chapter + 10 min language.|History and philosophy|Lower|
4|Humour and social: improv, comedy night, run club, or write a joke.|Comedy, storytelling|Mobility|
5|No learn block. Date night.|Anything fun|Upper|
6|Build block (90 min).|Fun|Hard session (4x4)|
7|Weekly review.|Wisdom, nature|Long easy session (Zone 2)|`,
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
flows:`# Mobility
Dry brush (optional)|180
Jumping jacks|120
Cat-cow|120
World's greatest stretch|150
90/90 hips|150
Thoracic rotations|120
Band shoulder dislocates|120
Deep squat hold|120
Legs up the wall + belly breathing|180
# Hard session (4x4)
Warm-up|600
Hard 1|240
Easy|180
Hard 2|240
Easy|180
Hard 3|240
Easy|180
Hard 4|240
Cool-down|300
# Long easy session (Zone 2)
Warm-up|300
Steady Zone 2|5400
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

 if((o.v||0)<10){const R2={'Mobility flow':'Mobility','VO2 4x4':'Hard session (4x4)','Long Zone 2':'Long easy session (Zone 2)','Zone 2 session':'Long easy session (Zone 2)'},c=s.cfg;
  c.flows=c.flows.replace(/\n?# Zone 2 session\n(?:[^#\n][^\n]*\n?)*/,'\n').replace('# Mobility flow','# Mobility').replace('# VO2 4x4','# Hard session (4x4)').replace('# Long Zone 2','# Long easy session (Zone 2)').trim();
  c.themes=c.themes.replace('|Zone 2 session|','|Mobility|').replace('|VO2 4x4|','|Hard session (4x4)|').replace('|Long Zone 2|','|Long easy session (Zone 2)|').replace('|Mobility flow|','|Mobility|');
  Object.keys(R2).forEach(k=>{c.routines=(c.routines||'').split('flow:'+k).join('flow:'+R2[k])});
  Object.keys(s.bind||{}).forEach(k=>{const v=s.bind[k];if(v.startsWith('f/')&&R2[v.slice(2)])s.bind[k]='f/'+R2[v.slice(2)]})}
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
const rdoneFull=(ds,id)=>{const r=routines().find(x=>x.id===id);return r&&!isShort(r,ds)?rdone(ds,id):0};
const rdone=(ds,id)=>{const r=routines().find(x=>x.id===id);if(!r||!r.days.includes(dow(ds)))return 0;const st=stepsOf(r,ds);return st.length&&st.every(s=>isDone(ds,r,s))?1:0};

/* workouts: previous sets only from the SAME template (Upper never mixes with Push) */
const prevOf=(n,tpl)=>{for(let i=S.log.length-1;i>=0;i--){const l=S.log[i];if(l.tpl!==tpl)continue;const e=l.ex.find(x=>x.n===n);if(e&&e.s.length)return e.s}return null};
const topOf=r=>+String(r).split('-').pop()||0;

function cnt(src,ws,lab,mv){const ds=wdays(ws);
 if(src.startsWith('r:')&&src.includes('+'))return src.split('+').reduce((a,x)=>a+cnt(x,ws,lab,mv),0);
 if(src==='focus')return ds.reduce((a,d)=>a+fses(d).length,0);
 if(src==='focusm')return ds.reduce((a,d)=>a+fmin(d),0);
 if(src==='lift')return S.log.filter(l=>l.date>=ws&&l.date<=ds[6]).length;
 if(src==='steps')return ds.filter(d=>(S.steps[d]||0)>=(mv?S.cfg.stepsMin:S.cfg.stepsT)).length;
 if(src==='water')return ds.filter(d=>(S.water[d]||0)>=S.cfg.waterT).length;
 if(src==='med')return ds.filter(d=>S.med[d]>0).length;
 if(src==='jr')return ds.filter(d=>S.jr[d]&&(S.jr[d].g||S.jr[d].w||S.jr[d].t)).length;
 if(src==='rev')return S.rev[ws]?.done?1:0;
 if(src==='diet')return ds.filter(d=>dietPct(d)>=.9).length;
 if(src.startsWith('r:'))return ds.filter(d=>mv?rdone(d,src.slice(2)):rdoneFull(d,src.slice(2))).length;
 if(src.startsWith('gym:'))return S.log.filter(l=>l.date>=ws&&l.date<=ds[6]&&l.tpl===src.slice(4)).length;
 if(src.startsWith('flow:'))return (S.fl||[]).filter(x=>x.d>=ws&&x.d<=ds[6]&&x.n===src.slice(5)).length;
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

/* timed workout (mobility, VO2): steps with auto-advancing timers */
function startFlow(name,scale){const f=flows()[name]||[];R={name,i:0,steps:f.map(([n,s])=>[n,Math.max(5,Math.round(s*scale))])};runStep()}
function runStep(){const[n,s]=R.steps[R.i];startTimer(s,n,()=>{R.i++;if(R.i<R.steps.length)runStep();else{(S.fl=S.fl||[]).push({d:D(),n:R.name});R=null;save();if(S.ctx)A.ctxdone();else location.hash='#/plan'}go()})}

/* routine runner (Routinery-style Start Timer) */
function setDone(ds,r,s,v){const c=S.chk[ds]=S.chk[ds]||{};c[key(r,s)]=v}
function stepGo(rid,ds,i){const r=routines().find(x=>x.id===rid),s=stepsOf(r,ds)[i],k=s.link;
 if(!k){setDone(ds,r,s,!isDone(ds,r,s));save();return}
 if(k==='spotify'){setDone(ds,r,s,1);save();window.open(themeOf(ds).sp||'https://open.spotify.com','_blank');return}
 S.ctx={r:rid,d:ds,k:key(r,s),link:k,label:r.name+' › '+stripE(s.title)};save();
 if(k.startsWith('flow:'))startFlow(k.slice(5),s.min/s.full);
 if(k.startsWith('gym:')){if(!S.active)A.start({n:k.slice(4)});save();location.hash='#/train';go();return}
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

const dv=(src,ds)=>src==='steps'?(S.steps[ds]||0):src==='water'?(S.water[ds]||0):src==='diet'?Math.round(dietPct(ds)*100):src==='med'?(S.med[ds]||0):src==='jr'?(S.jr[ds]&&(S.jr[ds].g||S.jr[ds].w||S.jr[ds].t)?1:0):src==='lift'?S.log.filter(l=>l.date===ds).length:src==='focus'?fmin(ds):0;
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

const linkLbl=k=>k.startsWith('flow:')?'Timed workout · '+k.slice(5):k.startsWith('gym:')?'Gym workout · '+k.slice(4):k==='spotify'?'Opens Spotify':'Opens '+(LBL[k]||k);
const LBL={fuel:'Diet',train:'Gym workout',money:'Budget',mind:'Mind',skill:'Skill',rel:'Relationships',meaning:'Meaning',week:'Weeks',todo:'To-dos'};
function vRoutine(id,ds){ds=ds||D();const r=routines().find(x=>x.id===id);if(!r)return'<p>Routine not found.</p><a href="#/plan">Back</a>';
 const forced=mode(ds)==='min'&&r.ess,sh=isShort(r,ds),st=stepsOf(r,ds),done=st.filter(s=>isDone(ds,r,s)).length,left=st.filter(s=>!isDone(ds,r,s)).reduce((a,s)=>a+s.min,0),
 end=new Date(Date.now()+left*6e4).toTimeString().slice(0,5),cur=st.findIndex(s=>!isDone(ds,r,s)),run=RUN&&RUN.rid===id;
 const e=+r.start.slice(0,2)*60+ +r.start.slice(3)+r.dur,endT=String(Math.min(e,1439)/60|0).padStart(2,'0')+':'+String(Math.min(e,1439)%60).padStart(2,'0');
 const H=`<a href="#/plan" onclick="sel='${ds}'">‹ Calendar</a><h1>${esc(r.name)}</h1><small>${r.start} – ${endT} (${r.dur}m) · ${new Date(ds+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})} · ${done}/${st.length} done</small>
 ${forced?`<span class="dash on">Short version (Minimum day)</span>`:`<button class="dash ${sh?'on':''}" data-a=short data-r="${id}" data-d="${ds}">${sh?'✓ Short version':'+ Short version'}</button>`}`
 +st.map((s,i)=>{const d=isDone(ds,r,s);return`<div class="step ${d?'dn':''} ${i===cur?'cur':''}"><span class=n>${i+1}</span><span class=em>${emo(s.title)}</span><a data-a=stepgo data-r="${id}" data-d="${ds}" data-i=${i}>${esc(stripE(s.title))}${s.link?'<small>'+esc(linkLbl(s.link))+' ›</small>':''}</a><span class=mn>${s.min}m</span><button class="ck ${d?'on':''}" data-a=stepchk data-r="${id}" data-d="${ds}" data-i=${i}></button></div>`}).join('')
;CTA=done===st.length&&st.length?`<button class=cta data-a=rback data-d="${ds}">✓ Routine complete · Back to calendar</button>`:run?`<button class=cta data-a=rstop>■ Stop timer</button>`:`<button class=cta data-a=rstart data-r="${id}" data-d="${ds}">${ic('play')} Start timer<br><small style="color:#fff">Ends at ${end}</small></button>`;return H}

function vRun(){if(!R)return'<p>No timed workout running.</p><a href="#/plan">Back</a>';const s=R.steps;
 return`<small>${esc(R.name)} · step ${R.i+1} / ${s.length}</small><h1>${esc(s[R.i][0])}</h1><div class=big id=big>${fmt(s[R.i][1])}</div>
 <button class=btn data-a=runback>Back</button><button class="btn pri" data-a=tskip>Next</button><button class=btn data-a=runstop>Stop</button>
 <h3>Up next</h3>`+s.slice(R.i+1).map(x=>`<div class=row><span style="flex:1">${esc(x[0])}</span><small style="width:auto">${fmt(x[1])}</small></div>`).join('')}

function vTrain(){if(S.active)return vActive();const th=themeOf(D()),tp=tpls(),tn=th.train,last=S.log.filter(l=>l.tpl===tn).pop();
 let h=`<h1>Train</h1>`+(tp[tn]?`<div class=card><small>Today's session</small><b style="font-size:20px">${esc(tn)}</b><small>${tp[tn].length} exercises${last?' · last time '+last.date:''}</small><button class="btn pri" data-a=start data-n="${esc(tn)}">${ic('play')} Start ${esc(tn)}</button></div>`:(flows()[tn]?`<div class=card><small>Today's session</small><b style="font-weight:500;font-size:17px">${esc(tn)}</b><small>Timed workout · ${Math.round(flows()[tn].reduce((a,x)=>a+x[1],0)/60)} min</small><button class="btn pri" data-a=flowgo data-n="${esc(tn)}">${ic('play')} Start ${esc(tn)}</button></div>`:`<div class=card><small>Today's session</small><b>${esc(tn||'Rest day')}</b><small>Not a workout template. Start a free workout if you want to log something.</small></div>`))
 +`<h3>Timed workouts</h3><small>Mobility, a hard session, a long Zone 2 session</small>`+Object.keys(flows()).map(n=>`<button class=btn data-a=flowgo data-n="${esc(n)}">${esc(n)}</button>`).join('')+`<a class=btn href="#/flows">Edit</a><h3>Strength workouts</h3>`+Object.keys(tp).filter(n=>n!==tn).map(n=>`<button class=btn data-a=start data-n="${esc(n)}">${esc(n)}</button>`).join('')+`<button class=btn data-a=start data-n="">Empty workout</button><small>Empty workout: no exercises prepared, you add them as you go.</small><h3>History (saved on this phone)</h3>`;
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
 <h3>What each day is for</h3><small>Tap a day to change its focus, audio, training and watch list. The training name can be a workout or a timed workout.</small>
 <datalist id=trl>${tn.map(n=>`<option value="${esc(n)}">`).join('')}</datalist>`
 +Object.entries(T).map(([k,v])=>`<details class=card><summary><b style="font-weight:500">${DN[k]}</b> <small style="display:inline">${esc(v.learn)} · ${esc(v.train)}</small></summary>
 <small>Learn focus</small><input data-c=th data-d=${k} data-k=learn value="${esc(v.learn)}"><small>Audio</small><input data-c=th data-d=${k} data-k=audio value="${esc(v.audio)}"><small>Training</small><input data-c=th data-d=${k} data-k=train list=trl value="${esc(v.train)}"><small>Spotify link</small><input data-c=th data-d=${k} data-k=sp value="${esc(v.sp)}"><small>Watch and listen list: one per line, optional link after the title</small><textarea data-c=th data-d=${k} data-k=q rows=4 style="font-family:inherit">${esc((v.q||[]).map(i=>i.t+(i.u?' '+i.u:'')).join('\n'))}</textarea></details>`).join('')}
const vNotes=(title,k,hint,extra='')=>`<h1>${title}</h1>${extra}<small>${hint}</small><div class=card><textarea id=ne rows=4 placeholder="Write an entry..."></textarea><input id=nd class=dt type=date value="${D()}"><button class="btn pri" data-a=nadd data-k=${k}>Save entry</button></div><small>Entries are kept on this phone, newest first, and also show in your Weeks log on their date.</small>`+(S.nl[k]||[]).map((e,i)=>({...e,i})).sort((p,q)=>p.d<q.d?1:-1).map(e=>`<div class=card><small>${new Date(e.d+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'})}</small><div style="white-space:pre-wrap">${esc(e.t)}</div><button class=btn data-a=ndel data-k=${k} data-i=${e.i}>Delete</button></div>`).join('');

function dayLog(d){const j=S.jr[d]||{},L=[],sp=S.tx.filter(x=>x.d===d&&x.k!=='i').reduce((a,x)=>a+x.a,0),inc=S.tx.filter(x=>x.d===d&&x.k==='i').reduce((a,x)=>a+x.a,0),dp=Math.round(dietPct(d)*100);
 S.log.filter(l=>l.date===d).forEach(l=>L.push(`${ic('dumbbell')} ${esc(l.tpl)} · ${l.dur} min · ${l.ex.reduce((a,e)=>a+e.s.length,0)} sets`));
 if(fmin(d))L.push(ic('gem')+' Work focus · '+fses(d).length+' block'+(fses(d).length===1?'':'s')+' · '+fmin(d)+' min');
 if(S.steps[d])L.push(ic('pulse')+' '+S.steps[d]+' steps');if(S.water[d])L.push(ic('drop')+' '+S.water[d]+' ml water');if(dp)L.push(ic('utensils')+' Diet '+dp+'%');if(S.med[d])L.push(ic('wind')+' '+S.med[d]+' min box breathing / meditation');
 if(j.g)L.push(ic('pencil')+' Grateful: '+esc(j.g));if(j.w)L.push(ic('pencil')+' Win: '+esc(j.w));if(j.t)L.push(ic('pencil')+' Tomorrow: '+esc(j.t));
 S.todo.filter(x=>x.due===d).forEach(x=>L.push(ic(x.done?'done':'open')+' '+esc(x.t)));
 (S.nl.rel||[]).filter(e=>e.d===d).forEach(e=>L.push(ic('heart')+' '+esc(e.t)));(S.nl.meaning||[]).filter(e=>e.d===d).forEach(e=>L.push(ic('leaf')+' '+esc(e.t)));
 if(sp)L.push(ic('coin')+' Spent '+eur(sp));if(inc)L.push(ic('coin')+' Income +'+eur(inc));
 return`<div class=card><b>${new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'})}</b> ${minOk(d)?'<span class=chip style="background:var(--a);border-color:var(--a);color:#fff">✓ minimum</span>':''}${fullOk(d)?'<span class=chip style="background:var(--ok);border-color:var(--ok);color:#fff">★ full</span>':''}`+(L.length?L.map(x=>`<div style="display:flex;gap:8px;align-items:flex-start;padding:4px 0;font-size:14px;color:var(--t2)">${x}</div>`).join(''):'<small>Nothing logged.</small>')+`</div>`}
const wkComb=ws=>{const t=D();return`<div style="display:flex;gap:4px;margin:12px 0 8px">`+wdays(ws).map(d=>{const f=d>=S.start&&d<=t,st=!f?'':fullOk(d)?'f':minOk(d)?'m':d<t?'x':'',bg=st==='f'?'var(--ok)':st==='m'?'var(--a)':st==='x'?'#fde8e8':'var(--c2)',fg=st==='f'||st==='m'?'#fff':st==='x'?'var(--r)':'var(--m)';return`<span style="flex:1;text-align:center;border-radius:8px;padding:8px 0;font-size:12px;background:${bg};color:${fg}">${DN[dow(d)]}<br><b style="font-weight:500">${st==='f'?'★':st==='m'?'✓':st==='x'?'✗':'·'}</b></span>`}).join('')+`</div>`};
const srcLabel=x=>x.startsWith('gym:')?'Counts that gym workout when you finish it':x.startsWith('flow:')?'Counts that timed workout when it finishes':x==='focus'||x==='focusm'?'Fills in by itself from finished Work focus blocks':x==='lift'?'Fills in by itself from workouts you log':x==='steps'?'Fills in by itself from your steps':x==='water'?'Fills in by itself from water logged':x==='diet'?'Fills in by itself from ticked diet items':x==='med'?'Fills in by itself from box breathing':x==='jr'?'Fills in by itself from your journal':x==='rev'?'Ticks when you mark Review done':x.startsWith('r:')?'Counts days you finish the whole routine. The minimum counts the short version too':'Manual: use + and −';
const wkStrip=(ws,fn,mk)=>`<div style="display:flex;gap:4px;margin:6px 0 10px">`+wdays(ws).map(d=>{const f=d>=S.start&&d<=D(),ok=f&&fn(d);return`<span style="flex:1;text-align:center;border-radius:8px;padding:6px 0;font-size:12px;background:${ok?'var(--ok)':f&&d<D()?'#fde8e8':'var(--c2)'};color:${ok?'#fff':'var(--t)'}">${DN[dow(d)]}<br>${ok?mk:f&&d<D()?'✗':'·'}</span>`}).join('')+`</div>`;
function vWeek(w){const t=D(),cw=weekStart(t),ws=w||cw,sm=wsum(ws),r=S.rev[ws]||{},past=addD(ws,6)<t,fd=d=>new Date(d+'T12:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'});
 let h=`<div class=top><a class=btn href="#/week/${addD(ws,-7)}">‹</a><h2 style="margin:0">${fd(ws)} – ${fd(addD(ws,6))}</h2><a class=btn href="#/week/${addD(ws,7)}">›</a></div>
 <div class=card><div style="display:flex;gap:8px;flex-wrap:wrap"><span class=chip style="background:var(--a);color:#fff;border-color:var(--a)">✓ Minimum or better ${sm.ok}/7</span><span class=chip style="background:var(--ok);color:#fff;border-color:var(--ok)">★ Full day ${sm.okF}/7</span></div>${wkComb(ws)}<small>Green star: full day. Amber check: minimum day. Red: missed. Targets per day are in Settings › Daily targets. A week with all 7 days at minimum or better is a minimum week.</small></div>
 `+'<h3>Log</h3><small>Everything you logged, per day.</small>'+wdays(ws).filter(d=>d>=S.start&&d<=t).reverse().map(dayLog).join('')+`<h3>Targets</h3><a class=btn href="#/targets">Edit targets</a>`;
 sm.rows.forEach(x=>{h+=`<div>${esc(x.n)} <small style="display:inline">${x.v}/${x.c} · minimum ${x.m} ${x.vm>=x.m?'✓':''}</small><small style="font-size:12px">${srcLabel(x.src)}</small>${x.src==='x'?` <button class=btn data-a=wx data-w="${ws}" data-l="${esc(x.n)}" data-v=1>+</button><button class=btn data-a=wx data-w="${ws}" data-l="${esc(x.n)}" data-v=-1>−</button>`:''}<div class=bar><i style="width:${x.c?Math.min(100,x.v/x.c*100):0}%"></i></div></div>`});
 h+=`<h3>Notes</h3><textarea data-c=rev data-w="${ws}" placeholder="Money, goals, what to fix next week">${esc(r.n)}</textarea><div class=row><button class="ck ${r.done?'on':''}" data-a=revdone data-w="${ws}"></button><span>Review done</span></div>`;
 h+=`<h3>All weeks</h3>`;for(let x=cw,i=0;x>=weekStart(S.start)&&i<26;x=addD(x,-7),i++){const q=wsum(x),pw=addD(x,6)<t;h+=`<a class=lc href="#/week/${x}" style="padding:10px 14px"><b style="font-size:15px">${fd(x)} – ${fd(addD(x,6))}</b><small>Minimum days ${q.ok}/7 · Full days ${q.okF}/7 · Targets ${q.met}/${q.n}</small></a>`}
 return h}

function vTodo(){const t=D(),a=S.todo.map((x,i)=>({...x,i})).sort((p,q)=>(p.done-q.done)||((p.due||'9')<(q.due||'9')?-1:1));
 return`<h1>To-dos</h1><div class=card><input id=ta placeholder="New task"><small>Date (leave empty for no date)</small><input id=td class=dt type=date><small>Description (optional)</small><textarea id=tde rows=3 style="font-family:inherit"></textarea><small>Time (optional; empty = all-day)</small><input id=tt2 class=dt type=time><small>Estimated duration</small><select id=tdu><option value=15>15 min</option><option value=30 selected>30 min</option><option value=60>1 hour</option><option value=90>1.5 hours</option><option value=120>2 hours</option></select><button class="btn pri" data-a=todoadd>Add</button><small>Open to-dos also show on the Calendar, in red, on their day.</small></div>`+a.map(x=>`<div class=row><button class="ck ${x.done?'on':''}" data-a=todotog data-i=${x.i}></button><a href="#/t/${x.id}" style="flex:1;${x.done?'opacity:.4;text-decoration:line-through':''}">${esc(x.t)}<small style="${x.due&&x.due<t&&!x.done?'color:var(--r)':''}">${x.due||''}${x.time?' '+x.time:''}</small></a><button class=btn data-a=tododel data-i=${x.i}>✕</button></div>`).join('')}

const DH={train:8,routine:215,flow:40,fuel:130,money:48,mind:270,skill:210,rel:330,meaning:170,week:190,todo:0,focus:255},HUES=[0,25,45,95,150,185,215,255,290,330];
const evKey=e=>e.u?'u:'+e.u:'n:'+bkey(e.t),bndE=e=>{const b=S.bind||{};return b[evKey(e)]||b[bkey(e.t)]};
const CATS=[['train','Gym workout'],['routine','Routine'],['flow','Timed workout'],['fuel','Diet and water'],['money','Budget'],['mind','Mind'],['skill','Skill and watch list'],['rel','Relationships'],['meaning','Meaning'],['week','Weeks'],['todo','To-dos'],['focus','Work focus']];
const catOf=v=>v==='train'||v.startsWith('tr/')?'train':v.startsWith('r/')?'routine':v.startsWith('f/')?'flow':v;
const ITM=()=>({train:[['train','Any gym workout (I choose when I start)'],...Object.keys(tpls()).map(n=>['tr/'+n,n])],routine:routines().map(r=>['r/'+r.id,r.name]),flow:Object.keys(flows()).map(n=>['f/'+n,n])});
const typeHue=b=>{const c=catOf(b);return S.tcol&&S.tcol[c]!=null?S.tcol[c]:(DH[c]??200)};
const evHue=e=>{const b=bndE(e);return b?typeHue(b):null};
const bkey=t=>String(t).trim().toLowerCase(),bnd=t=>(S.bind||{})[bkey(t)];
const TG=()=>[['train','Workout (gym tracker)'],['fuel','Diet and water'],['money','Budget'],['mind','Mind'],['skill','Skill and watch list'],['rel','Relationships'],['meaning','Meaning'],['week','Weeks'],['todo','To-dos'],...routines().map(r=>['r/'+r.id,'My routine: '+r.name]),...Object.keys(flows()).map(n=>['f/'+n,'Timed workout: '+n]),...Object.keys(tpls()).map(n=>['tr/'+n,'Workout: '+n])];
const tgName=v=>v==='train'?'Gym workout · any':v.startsWith('tr/')?'Gym workout · '+v.slice(3):v.startsWith('r/')?'Routine · '+((routines().find(x=>'r/'+x.id===v)||{}).name||v.slice(2)):v.startsWith('f/')?'Timed workout · '+v.slice(2):((CATS.find(x=>x[0]===v)||[0,v])[1]);
function vExt(k,ds,rd){const e=extOn(ds||D()).find(x=>evKey(x)===k)||(S.gcal.evs||[]).find(x=>evKey(x)===k)||{t:(S.bname||{})[k]||k.replace(/^[un]:/,''),u:k.startsWith('u:')?k.slice(2):''},b=(S.bind||{})[k]||bndE(e);
 if(b&&rd){setTimeout(()=>location.replace('#/'+b+(b==='focus'&&e.sm!=null&&!e.ad?'/'+(e.em-e.sm):'')),0);return'<p>Opening…</p>'}
 const when=e.sm!=null?(e.ad?'All day':hmm(e.sm)+'-'+hmm(e.em)):'',t=esc(e.t),cat=b?catOf(b):'',items=ITM();
 return`<a href="#/plan">‹ Calendar</a><h1>${t}</h1><small>Google Calendar event${when?' · '+when:''}${e.rc?' · repeating: the link applies to every occurrence of this event':''}</small>`
 +(e.d?`<div class=card style="white-space:pre-wrap;font-size:14px">${esc(e.d)}</div>`:'')
 +`<h3>Type of event</h3><select data-c=bsel data-k="${esc(k)}" data-n="${t}"><option value="">Not linked</option>${CATS.map(c=>`<option value="${c[0]}" ${cat===c[0]?'selected':''}>${c[1]}</option>`).join('')}</select>`
 +(items[cat]?`<h3>Which one</h3>`+(items[cat].length?`<select data-c=bsel2 data-k="${esc(k)}" data-n="${t}">${items[cat].map(x=>`<option value="${esc(x[0])}" ${b===x[0]?'selected':''}>${esc(x[1])}</option>`).join('')}</select>`:`<small>None yet. Create one first (More › ${cat==='routine'?'My routines':'Timed workouts'}).</small>`):'')
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
function vFlow(n){const f=flows()[n];if(!f)return'<a href="#/flows">‹ Timed workouts</a><p>Flow not found.</p>';
 return`<a href="#/types">‹ Event types</a><h1>${esc(n)}</h1><small>${Math.round(f.reduce((a,x)=>a+x[1],0)/60)} min · ${f.length} steps</small><button class="btn pri" data-a=flowgo data-n="${esc(n)}" style="margin-top:12px">${ic('play')} Start</button><h3>Steps</h3>`+f.map(x=>`<div class=row><span style="flex:1">${esc(x[0])}</span><small>${fmt(x[1])}</small></div>`).join('')+`<a class=btn href="#/flows" style="margin-top:12px">Edit flows</a>`}
function vTr(n){if(S.active)return vActive();const t=tpls()[n];if(!t)return'<a href="#/types">‹ Event types</a><p>Workout not found.</p>';
 return`<a href="#/types">‹ Event types</a><h1>${esc(n)}</h1><small>${t.length} exercises</small><button class="btn pri" data-a=start data-n="${esc(n)}" style="margin-top:12px">${ic('play')} Start ${esc(n)}</button><h3>Exercises</h3>`+t.map(e=>`<div class=row><span style="flex:1">${esc(e.n)}</span><small>${e.s} × ${esc(e.r)} · rest ${e.rest} s</small></div>`).join('')+`<a class=btn href="#/set/tpl" style="margin-top:12px">Edit exercises and rest times</a>`}
function vFlows(){const f=flows();
 return`<h1>Timed workouts</h1><small>Timed, step-by-step sessions: mobility, 4x4 intervals, Zone 2 cardio. Start one here, link it to a Google event, or add it to a routine as a step with the page set to flow:Name.</small>`
 +Object.entries(f).map(([n,st])=>`<div class=card><div class=top><b style="font-weight:500">${esc(n)}</b><small style="display:inline">${Math.round(st.reduce((a,x)=>a+x[1],0)/60)} min</small></div><button class="btn pri" data-a=flowgo data-n="${esc(n)}">${ic('play')} Start</button><details><summary><small style="display:inline">Edit steps (name|seconds)</small></summary><textarea data-c=flowt data-n="${esc(n)}" rows=${st.length+1} style="font-family:var(--mono)">${esc(st.map(x=>x[0]+'|'+x[1]).join('\n'))}</textarea><button class=btn data-a=flowdel data-n="${esc(n)}">Delete flow</button></details></div>`).join('')
 +`<h3>Build an interval or cardio session</h3><div class=card><small>Name</small><input id=fn placeholder="e.g. Hill intervals"><small>Warm-up (min)</small><input id=fw type=number value=10><small>Rounds</small><input id=fr type=number value=4><small>Work per round (min)</small><input id=fk type=number value=4><small>Rest per round (min, 0 for steady cardio)</small><input id=fe type=number value=3><small>Cool-down (min)</small><input id=fc type=number value=5><button class="btn pri" data-a=flowbuild>Build</button><small>4 rounds of 4 min work and 3 min rest is the 4x4. One round, no rest, 60 min work is a Zone 2 session.</small></div>`}
function vTypes(){const row=(href,i,name,desc,v)=>`<a class=lr href="${href}"><span class=li>${ic(i)}<span>${esc(name)}<small>${esc(desc)}</small></span></span><small style="white-space:nowrap">${v!=null?nUse(v)+' linked':''}</small></a>`;
 const PG=[['fuel','utensils','Diet and water','Tick meals, log water and steps'],['money','wallet','Budget','Income, expenses and buckets'],['mind','wind','Mind','Box breathing and journal'],['skill','book','Skill and watch list','Learn focus, audio and your list per day'],['rel','heart','Relationships','Time with people, notes'],['meaning','leaf','Meaning','Reflections and gratitude'],['week','chart','Weeks','Your log per day and week'],['todo','check','To-dos','Tasks with date, time and description']];
 return`<h1>Event types</h1><small>Everything a Google event or a routine step can open. Open one, or edit it. The number is how many events and routine steps are linked to it.</small>
 <h3>Pages</h3>`+PG.map(p=>row('#/'+p[0],p[1],p[2],p[3],p[0])).join('')
 +`<h3>My routines</h3>`+(routines().map(r=>row('#/r/'+r.id,'repeat',r.name,r.steps.length+' steps',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('r/'+r.id)} linked</small>`)).join('')||'<small>No routines yet.</small>')+`<a class=btn href="#/rtn" style="margin-top:8px">Edit routines</a>`
 +`<h3>Timed workouts</h3>`+Object.entries(flows()).map(([n,st])=>row('#/f/'+encodeURIComponent(n),'timer',n,Math.round(st.reduce((a,x)=>a+x[1],0)/60)+' min',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('f/'+n)} linked</small>`)).join('')+`<a class=btn href="#/flows" style="margin-top:8px">Edit flows and cardio</a>`
 +`<h3>Gym workouts</h3>`+row('#/train','dumbbell','Gym tracker','Any gym workout, plus your history',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('train')} linked</small>`)+Object.keys(tpls()).map(n=>row('#/tr/'+encodeURIComponent(n),'dumbbell',n,'Strength session',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('tr/'+n)} linked</small>`)).join('')+`<a class=btn href="#/set/tpl" style="margin-top:8px">Edit workouts, sets and rest times</a>`}
function vNewTodo(d,tm){const du=[15,30,45,60,90,120,180];return`<a href="#/plan">‹ Calendar</a><h1>New to-do</h1><div class=card><input id=nt placeholder="What needs doing?"><small>Date</small><input id=ntd class=dt type=date value="${esc(d)}"><small>Time</small><input id=ntt class=dt type=time value="${esc(tm)}"><small>Duration</small><select id=ntu>${du.map(m=>`<option value=${m} ${m===30?'selected':''}>${m} min</option>`).join('')}</select><small>Description</small><textarea id=ntde rows=3 style="font-family:inherit"></textarea><button class="btn pri" data-a=tnadd>Add to-do</button></div>`}
const PGS=[['fuel','Diet and water'],['money','Budget'],['mind','Mind (box breathing, journal)'],['skill','Skill and watch list'],['rel','Relationships'],['meaning','Meaning'],['week','Weeks'],['todo','To-dos'],['spotify','Spotify']];
function srow(t,m,l){const o=(v,n)=>`<option value="${esc(v)}" ${l===v?'selected':''}>${esc(n)}</option>`;
 return`<div class=srow style="border-top:1px solid var(--hl);padding:12px 0"><div style="display:grid;grid-template-columns:1fr 72px;gap:8px"><input class=st-t placeholder="Step, e.g. Brush teeth" value="${esc(t||'')}"><input class=st-m type=number inputmode=numeric placeholder="min" value="${m||''}"></div><select class=st-l><option value="">No page, just tick it</option><optgroup label="Open a page">${PGS.map(p=>o(p[0],p[1])).join('')}</optgroup><optgroup label="Timed workouts (starts the timer)">${Object.keys(flows()).map(n=>o('flow:'+n,n)).join('')}</optgroup><optgroup label="Gym workouts">${o('train','Any gym workout (I choose)')}${Object.keys(tpls()).map(n=>o('gym:'+n,n)).join('')}</optgroup></select><button class=btn data-a=rtnrm>Remove step</button></div>`}
const wsrc=cur=>{const o=(v,n)=>`<option value="${esc(v)}" ${cur===v?'selected':''}>${esc(n)}</option>`,base=[['lift','Gym workouts finished (count)'],['focus','Work focus blocks finished (count)'],['focusm','Work focus minutes'],['steps','Days at step target'],['water','Days at water target'],['diet','Days on diet plan'],['med','Days with box breathing'],['jr','Days journaled'],['rev','Weekly review done'],['x','Manual counter (+ and −)']],ids=[...base.map(x=>x[0]),...routines().map(r=>'r:'+r.id),...Object.keys(tpls()).map(n=>'gym:'+n),...Object.keys(flows()).map(n=>'flow:'+n)];
 return`<select class=w-s data-c=wkr><optgroup label="Fills in by itself">${base.map(x=>o(x[0],x[1])).join('')}</optgroup><optgroup label="My routines (days finished)">${routines().map(r=>o('r:'+r.id,r.name)).join('')}</optgroup><optgroup label="Gym workouts (sessions)">${Object.keys(tpls()).map(n=>o('gym:'+n,n)).join('')}</optgroup><optgroup label="Timed workouts (sessions)">${Object.keys(flows()).map(n=>o('flow:'+n,n)).join('')}</optgroup>${ids.includes(cur)?'':o(cur,'Custom: '+cur)}</select>`};
const wrow=(n,c,m,src)=>`<div class=wrow style="border-top:1px solid var(--hl);padding:12px 0"><input class=w-n data-c=wkr placeholder="Target name" value="${esc(n||'')}"><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div><small>Full target</small><input class=w-c data-c=wkr type=number inputmode=numeric value="${c??''}"></div><div><small>Minimum</small><input class=w-m data-c=wkr type=number inputmode=numeric value="${m??''}"></div></div><small>Counts from</small>${wsrc(src||'x')}<button class=btn data-a=wkrm>Remove</button></div>`;
function vTargets(){return`<a href="#/week">‹ Weeks</a><h1>Weekly targets</h1><small>Each target counts by itself from what you do. Pick what it counts from. For a routine, the full target counts days you finish the whole routine, and the minimum also counts days you did its short version.</small><div id=wrows>`+lines(S.cfg.wk).map(l=>{const[n,c,m,src]=l.split('|').map(x=>x.trim());return wrow(n,c,m,src)}).join('')+`</div><button class=btn data-a=wkadd>+ Add target</button>`}
function vRtn(id){
 if(id){const r=id==='new'?null:routines().find(x=>x.id===id),rows=r?r.steps:[{},{},{}];
  return`<a href="#/rtn">‹ My routines</a><h1>${r?'Edit routine':'New routine'}</h1><div class=card><input id=rn placeholder="Name, e.g. Evening routine" value="${esc(r?r.name:'')}"><small>Steps, in order. A step can open a page, start a timed workout, or start a gym workout. When you run the routine, tapping that step opens it, and finishing it brings you back here.</small><div id=rows>${rows.map(x=>srow(x.raw,x.min,x.link)).join('')}</div><button class=btn data-a=rtnrow>+ Add step</button><div style="margin-top:12px"><button class="btn pri" data-a=rtnsave data-id="${id}">Save routine</button></div></div>`}
 return`<h1>My routines</h1><small>A routine is a list of steps you work through. Create one, then link it to a Google Calendar event by tapping that event on the calendar.</small>`
 +routines().map(r=>`<div class=row><a href="#/rtn/${r.id}"><b style="font-weight:500">${esc(r.name)}</b><small>${r.steps.length} steps · ${r.dur} min</small></a><a class=btn href="#/r/${r.id}">Open</a><button class=btn data-a=rtndel data-n="${esc(r.name)}">✕</button></div>`).join('')
 +`<a class="btn pri" href="#/rtn/new" style="margin-top:16px">+ New routine</a><small style="margin-top:12px">More control (days, colour, short versions): Settings › Routines.</small>`}
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


const CF=[['day','Daily targets (minimum and full day)','label|full-day target|minimum-day target|source. Sources: steps water diet(percent) med(minutes) jr(1 = journal written) lift(workouts that day). A minimum day = every minimum target reached. A full day = every full target reached.'],['routines','Routines (calendar events)','# name|start|minutes|days 1-7|unused, leave blank|essential 1/0|colour 0-360, then steps: title|minutes|link|short version (* = keep, number = minutes, blank = skipped). Links: fuel money mind skill rel meaning train week todo spotify flow:Name. Titles can use {learn} {audio} {train}.'],['flows','Timed workouts','# Name, then step|seconds'],['themes','Day themes','day 1-7|learn|audio|train template name|spotify link'],['tpl','Workout templates','# Name, then exercise|sets|reps|rest sec'],['diet','Diet plan','# Meal|time, then: ingredient|amount (g or ml)|protein g|carbs g|fat g|kcal. You enter the kcal yourself, nothing is calculated.'],['inc','Income sources','Name|expected per month €. Salary, trading wins, anything that comes in.'],['cats','Expense buckets','Name|monthly budget €|optional minimum €. Rent, groceries, savings and so on.'],['wk','Weekly targets','label|full target|minimum target|source: lift steps water diet med jr rev r:routine-id (join several with +) x(manual +/- counter)']];
const NF=[['waterT','Water target ml'],['stepsT','Steps target'],['stepsMin','Steps minimum']];
function vSet(k){if(k)setTimeout(()=>{const e=document.getElementById('cfg-'+k);if(e)e.scrollIntoView()},50);return`<h1>Settings</h1><small>Everything is editable. Use | to separate fields and never use | inside text.</small><h3>Numbers</h3>`+NF.map(([k,l])=>`<small>${l}</small><input type=number inputmode=decimal data-c=num data-k=${k} value="${S.cfg[k]}">`).join('')
 +CF.map(([k,l,h])=>`<h3 id="cfg-${k}">${l}</h3><small>${esc(h)}</small><textarea data-c=cfg data-k=${k} rows=8>${esc(S.cfg[k])}</textarea><button class=btn data-a=cfgreset data-k=${k}>Reset to default</button>`).join('')
 +`<h3>Data</h3><button class=btn data-a=export>Export backup (JSON)</button><label class=btn>Import backup<input id=imp type=file accept=".json" hidden></label>`}

function vMore(){const L=(r,i,t)=>`<a class=lr href="#/${r}"><span class=li>${ic(i)}${t}</span>${ic('chev')}</a>`;
 return`<h1>More</h1><h3>Track</h3>`+L('focus','gem','Work focus')+L('train','dumbbell','Gym workouts')+L('fuel','utensils','Diet, water, steps')+L('money','wallet','Budget')+`<h3>Grow</h3>`+L('mind','wind','Mind: box breathing, journal')+L('skill','book','Skill and money')+L('rel','heart','Relationships and play')+L('meaning','leaf','Meaning')+`<h3>Review and plan</h3>`+L('week','chart','Weeks')+L('todo','check','To-dos')+L('rtn','repeat','My routines')+L('types','layers','Event types')+L('flows','timer','Timed workouts')+`<h3>App</h3>`+L('links','calendar','Google Calendar sync')+L('set','sliders','Settings')+`<div class=row style="margin-top:8px"><span style="flex:1">Version<small style="font-family:var(--mono)">${BUILD}</small></span><button class=btn data-a=refresh>${ic('refresh')} Update app</button></div><small>Your data stays on the phone when you update</small>`}

function vDay(d,w){const i=DN.map(x=>x.toLowerCase()).indexOf(String(d).toLowerCase());return w==='learn'?vSkill(i>0?i:d):w==='train'?vTrain():vPlan()}

/* ---------- actions ---------- */
const A={
fstart:({m})=>{fstart(m)},fsp:({v})=>{S.fsp=v},fplace:()=>{const g=gd(),s=gsel(),k=g.pend[0];if(!k)return false;if(gat(s.x,s.y)&&!gfree(s.x,s.y))return false;g.it=g.it.filter(i=>!(i.x===s.x&&i.y===s.y));g.it.push({id:'d'+Date.now(),t:'d',x:s.x,y:s.y,dt:k});g.pend.shift();FXQ.push({x:s.x,y:s.y});chime([784,988,1175])},fgo:({n})=>{if(S.foc){S.foc.go={n,t:Date.now()};save()}return false},fstop:()=>{const f=S.foc;if(!f.sure||Date.now()-f.sure>5e3){f.sure=Date.now();save();setTimeout(go,5100);return}f.sure=0;ffail('You gave up this block.',Date.now())},ffin:()=>{fover(S.foc);wake(false)},fend:()=>{S.foc=null;wake(false)},fapadd:()=>{$('#fap').insertAdjacentHTML('beforeend',fapRow('',''));return false},fapdel:(d,el)=>{el.closest('.wrow2').remove();I.fap();save();return false},
view:({v})=>{view=v},gotoday:()=>{sel=D()},wk:({v})=>{sel=addD(sel,+v)},sel:({v})=>{sel=v},
mode:({v})=>{S.mode[sel]=v==='min'?'min':'full'},
short:({r,d})=>{const s=S.short[d]=S.short[d]||{};s[r]=!s[r]},
stepchk:({r,d,i})=>{const rr=routines().find(x=>x.id===r),s=stepsOf(rr,d)[+i];setDone(d,rr,s,!isDone(d,rr,s))},
stepgo:({r,d,i})=>{stepGo(r,d,+i);return false},
flowgo:({n})=>{startFlow(n,1);location.hash='#/run';return false},
flowdel:({n})=>{if(!confirm('Delete this flow?'))return false;const f=flows();delete f[n];S.cfg.flows=flowsText(f)},
flowbuild:()=>{const n=$('#fn').value.replace(/\|/g,' ').trim(),w=+$('#fw').value||0,r=Math.max(1,+$('#fr').value||1),k=+$('#fk').value||1,e=+$('#fe').value||0,c=+$('#fc').value||0;if(!n)return false;const st=[];if(w)st.push(['Warm-up',w*60]);for(let i=1;i<=r;i++){st.push([r===1&&!e?'Steady':'Work '+i,k*60]);if(e&&i<r)st.push(['Easy',e*60])}if(c)st.push(['Cool-down',c*60]);const f=flows();f[n]=st;S.cfg.flows=flowsText(f)},
tnadd:()=>{const t=$('#nt').value.trim();if(!t)return false;S.todo.push({id:tid(),sy:0,t,desc:$('#ntde').value,due:$('#ntd').value,time:$('#ntt').value,dur:+$('#ntu').value||30,done:0});sel=$('#ntd').value||sel;save();setTimeout(tflush,50);location.hash='#/plan';return false},
wkadd:()=>{$('#wrows').insertAdjacentHTML('beforeend',wrow('', '', '', 'x'));return false},
wkrm:(d,el)=>{el.closest('.wrow').remove();I.wkr();return false},
rtnrow:()=>{$('#rows').insertAdjacentHTML('beforeend',srow('','',''));return false},
rtnrm:(d,el)=>{el.closest('.srow').remove();return false},
rtnsave:({id})=>{const n=$('#rn').value.replace(/\|/g,' ').trim(),rows=[...document.querySelectorAll('.srow')].map(r=>({t:r.querySelector('.st-t').value.replace(/\|/g,' ').trim(),m:+r.querySelector('.st-m').value||0,l:r.querySelector('.st-l').value})).filter(x=>x.t);if(!n||!rows.length){alert('Give the routine a name and at least one step');return false}
 const old=id!=='new'?routines().find(x=>x.id===id):null,keep=old?Object.fromEntries(old.steps.map(x=>[x.raw,x.short])):{},sum=rows.reduce((a,x)=>a+(x.m||1),0),body=rows.map(x=>x.t+'|'+(x.m||1)+'|'+x.l+(keep[x.t]?'|'+keep[x.t]:'')).join('\n');
 if(old){const o=[];let skip=0;lines(S.cfg.routines).forEach(l=>{if(l[0]==='#'){const p=l.slice(1).split('|');skip=slug(p[0].trim())===id;if(skip){p[0]=n;p[2]=sum;o.push('# '+p.join('|'));o.push(body)}else o.push(l)}else if(!skip)o.push(l)});S.cfg.routines=o.join('\n')}
 else S.cfg.routines=(S.cfg.routines?S.cfg.routines.trim()+'\n':'')+`# ${n}|08:00|${sum}|1234567||0|${Math.floor(Math.random()*360)}\n`+body;
 save();location.hash='#/rtn';return false},
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
finish:()=>{const a=S.active,ex=a.ex.map(e=>({n:e.n,s:e.s.filter(s=>s.d)})).filter(e=>e.s.length);if(ex.length)S.log.push({date:td(),tpl:a.tpl,dur:Math.round((Date.now()-a.t0)/6e4),ex});S.active=null;T=null;S.timer=null;wake(false);if(S.ctx&&(S.ctx.link==='train'||String(S.ctx.link).startsWith('gym:')))return A.ctxdone();location.hash='#/train'},
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
const I={fapx:el=>{if(!el.value)return;const[n,u]=el.value.split('|');$('#fap').insertAdjacentHTML('beforeend',fapRow(n,u));I.fap();el.value=''},fap:()=>{S.cfg.fapps=[...document.querySelectorAll('.wrow2')].map(r=>[r.querySelector('.fa-n').value.replace(/\|/g,' ').trim(),r.querySelector('.fa-u').value.replace(/\|/g,'').trim()].join('|')).filter(l=>l!=='|').join('\n')},wkr:()=>{S.cfg.wk=[...document.querySelectorAll('.wrow')].map(r=>[r.querySelector('.w-n').value.replace(/\|/g,' ').trim(),r.querySelector('.w-c').value||0,r.querySelector('.w-m').value||0,r.querySelector('.w-s').value].join('|')).join('\n')},bsel:el=>{const k=el.dataset.k,n=el.dataset.n,v=el.value;S.bind=S.bind||{};S.bname=S.bname||{};if(!v){delete S.bind[k];delete S.bind[bkey(n)]}else{const it=ITM()[v];if(it){if(!it.length){save();setTimeout(go,0);return}S.bind[k]=it[0][0]}else S.bind[k]=v;S.bname[k]=n}save();setTimeout(go,0)},bsel2:el=>{S.bind[el.dataset.k]=el.value;S.bname[el.dataset.k]=el.dataset.n;save();setTimeout(go,0)},th:el=>{const T=themes(),d=+el.dataset.d,k=el.dataset.k;T[d]=T[d]||{};if(k==='q')T[d].q=el.value.split('\n').map(x=>x.trim()).filter(Boolean).map(x=>{const m=x.match(/^(.*?)\s*(https?:\S+)$/);return m?{t:m[1],u:m[2]}:{t:x,u:''}});else T[d][k]=el.value.replace(/\|/g,' ');S.cfg.themes=themesText(T)},flowt:el=>{const f=flows();f[el.dataset.n]=el.value.split('\n').filter(l=>l.trim()).map(l=>{const[n,x]=l.split('|');return[(n||'').trim(),+x||60]});S.cfg.flows=flowsText(f)},sk:el=>{$('#sc').style.display=el.value==='e'?'':'none';$('#si').style.display=el.value==='i'?'':'none'},tf:el=>{const x=S.todo.find(y=>y.id===el.dataset.id);if(!x)return;const k=el.dataset.k;x[k]=k==='dur'?+el.value:el.value;x.sy=0;clearTimeout(tft);tft=setTimeout(tflush,1500)},

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
/* ---------- work focus: pomodoro + pixel garden ---------- */
const FM={s:{n:'Short',f:25,b:5,bud:5,use:'Low energy, a hard time starting, or quick admin like email and organising files.'},l:{n:'Long',f:50,b:10,bud:10,use:'Complex work where switching context costs a lot: writing software, long reports, continuous design.'}},GRACE=20,PT=20,TS=16;
const fapps=()=>lines(S.cfg.fapps).map(l=>{const[n,u]=l.split('|').map(x=>x.trim());return{n,u}}).filter(x=>x.n&&x.u);
const fses=d=>(S.fs||[]).filter(x=>x.ok&&(!d||x.d===d)),fmin=d=>fses(d).reduce((a,x)=>a+x.mins+(x.over||0),0);
const RARE={gold:'Golden',blue:'Blue',rainbow:'Rainbow'},rr=r=>({opal:'rainbow',amber:'blue'})[r]||r||'';
const SP={daisy:{n:'Daisy',k:'r',a:'#ffffff',b:'#dfe3ee',c:'#ffd23f',h:9},cosmos:{n:'Cosmos',k:'r',a:'#ff8fc1',b:'#e05a9c',c:'#ffd23f',h:11},tulip:{n:'Tulip',k:'t',a:'#ef4444',b:'#b91c1c',c:'#fca5a5',h:9,u:60},sunflower:{n:'Sunflower',k:'s',a:'#fbbf24',b:'#d97706',c:'#78350f',h:13,u:180},bluebell:{n:'Bluebell',k:'r',a:'#7aa2ff',b:'#4f6fd6',c:'#ffffff',h:8,u:360},poppy:{n:'Poppy',k:'r',a:'#ff5a36',b:'#c2261a',c:'#1f2937',h:10,u:600}};
const DEC=[[120,'pond','Pond'],[240,'bench','Bench'],[480,'tree','Tree'],[720,'lantern','Lantern'],[1200,'fountain','Fountain']];
const ftot=()=>fmin(),spOk=k=>ftot()>=(SP[k].u||0),hm=m=>m>=60?(Math.round(m/6)/10)+' h':m+' min';
const gd=()=>{const g=S.gd=S.gd||{w:8,h:6,it:[],bf:0,pend:[]};g.pend=g.pend||[];return g};
const gat=(x,y)=>gd().it.find(i=>i.x===x&&i.y===y),gfree=(x,y)=>{const i=gat(x,y);return!i||(i.t==='p'&&i.st==='x')};
function gfirst(){const g=gd();for(let y=0;y<g.h;y++)for(let x=0;x<g.w;x++)if(!gat(x,y))return{x,y};for(let y=0;y<g.h;y++)for(let x=0;x<g.w;x++)if(gfree(x,y))return{x,y};return{x:0,y:0}}
function gsel(){const s=S.fsel;return s&&s.x<gd().w&&s.y<gd().h&&gfree(s.x,s.y)?s:gfirst()}
function gfix(){const g=gd();g.it.forEach(i=>{if(i.t==='p'&&i.st==='g'&&!(S.foc&&S.foc.pid===i.id))i.st='x'});const free=g.w*g.h-g.it.filter(i=>!(i.t==='p'&&i.st==='x')).length;if(free<4&&!(S.foc&&(S.foc.ph==='f'||S.foc.ph==='o')))g.h+=2}
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),hh=(x,y,s)=>{let n=(x*374761393+y*668265263+s*2147483647)>>>0;n=Math.imul(n^n>>>13,1274126177)>>>0;return(n^n>>>16)>>>0};
let GC=null,FXQ=[];
function chime(n){try{n.forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=f;o.connect(g);g.connect(AC.destination);const t=AC.currentTime+i*.11;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.22,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.4);o.start(t);o.stop(t+.45)})}catch(e){}}
function gburst(fx){if(!GC)return;const cx=fx.x*TS+8,cy=fx.y*TS+PT+4,n=fx.big?64:30,cols=fx.big?['#ff5a5a','#ffd23f','#5ad7ff','#9b6bff','#6bff8f','#fff']:['#fff','#ffd1e8','#fff7b0','#a8f0b0'];for(let i=0;i<n;i++){const a=Math.random()*6.283,s=.6+Math.random()*(fx.big?2.2:1.5);GC.part.push({x:cx,y:cy,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1.1,l:30+Math.random()*30,c:cols[i%cols.length]})}GC.pop={x:fx.x,y:fx.y,t:Date.now()}}
function gtap(e){const g=gd(),r=GC.cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*GC.W,py=(e.clientY-r.top)/r.height*GC.H,x=Math.floor(px/TS),y=Math.floor((py-PT)/TS);if(S.foc&&(S.foc.ph==='f'||S.foc.ph==='o'))return;if(x<0||y<0||x>=g.w||y>=g.h)return;if(!gfree(x,y)&&!(S.gd.pend.length&&false))return;S.fsel={x,y};save();go()}
function ginit(){const cv=$('#gc');if(!cv){GC=null;return}gfix();const g=gd(),W=g.w*TS,H=g.h*TS+PT;cv.width=W;cv.height=H;cv.style.cssText='width:100%;image-rendering:pixelated;display:block;border-radius:12px;touch-action:manipulation';GC={cv,cx:cv.getContext('2d'),W,H,part:[],pop:null};cv.onclick=gtap;FXQ.splice(0).forEach(gburst)}
function gdraw(){if(!GC||!document.body.contains(GC.cv))return;const{cx,W,H}=GC,g=gd(),t=Date.now(),f=S.foc,R=(x,y,w,h,c)=>{cx.fillStyle=c;cx.fillRect(Math.round(x),Math.round(y),w,h)};
 R(0,0,W,H,'#78c24b');
 for(let y=0;y<g.h;y++)for(let x=0;x<g.w;x++){const tx=x*TS,ty=y*TS+PT;R(tx,ty,TS,TS,(x+y)%2?'#7ec84f':'#78c24b');for(let k=0;k<4;k++){const h=hh(x,y,k);if(h%3===0)R(tx+h%14,ty+(h>>4)%13,1,2,'#5fa83f');else if(h%5===0)R(tx+h%13,ty+(h>>5)%14,2,1,'#9ddc66')}if(hh(x,y,9)%9===0){const h=hh(x,y,10);R(tx+h%13,ty+(h>>4)%13,1,1,'#fff');R(tx+h%13+1,ty+(h>>4)%13,1,1,'#ffd23f')}}
 R(0,0,W,PT-4,'#3f8f3a');for(let x=0;x<W;x+=3)R(x,2+hh(x,0,1)%6,2,2,'#56a84a');for(let x=2;x<W;x+=8){R(x,PT-14,2,12,'#efe6cf');R(x,PT-14,2,1,'#fff')}R(0,PT-11,W,1,'#d9ceb2');R(0,PT-6,W,1,'#d9ceb2');
 const its=[...g.it].sort((a,b)=>a.y-b.y||a.x-b.x);its.forEach(i=>{const tx=i.x*TS,ty=i.y*TS+PT;if(i.t==='d')return gdec(R,i.dt,tx,ty,t);gplant(R,i,tx,ty,t,f)});
 const bf=Math.min(8,g.bf+(f&&f.ph==='f'?f.ms:0)*0);for(let i=0;i<bf;i++){const x=W/2+Math.sin(t/1700*(1+i*.13)+i*2)*W*.42,y=PT+(H-PT)/2+Math.cos(t/1300*(1+i*.11)+i)*(H-PT)*.38,c=['#ff9f43','#54a0ff','#ff6b9d','#feca57'][i%4],fl=Math.floor(t/130+i)%2;R(x,y,1,3,'#374151');R(x-2,y-(fl?1:0),2,fl?3:2,c);R(x+1,y-(fl?1:0),2,fl?3:2,c)}
 const s=gsel();if(!(f&&(f.ph==='f'||f.ph==='o'))&&Math.floor(t/400)%2===0){const tx=s.x*TS,ty=s.y*TS+PT;R(tx,ty,TS,1,'#fff');R(tx,ty+TS-1,TS,1,'#fff');R(tx,ty,1,TS,'#fff');R(tx+TS-1,ty,1,TS,'#fff')}
 GC.part=GC.part.filter(p=>p.l>0);GC.part.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.07;p.l--;R(p.x,p.y,2,2,p.c)});
 const h=new Date().getHours();if(h>=21||h<6){cx.fillStyle='rgba(20,30,90,.32)';cx.fillRect(0,0,W,H)}else if(h>=19||h<8){cx.fillStyle='rgba(255,150,60,.1)';cx.fillRect(0,0,W,H)}}
setInterval(gdraw,70);
function gplant(R,i,tx,ty,t,f){const S0=SP[i.sp]||SP.daisy,live=f&&f.pid===i.id,p=live?(f.ph==='f'?cl((t-f.t0)/(f.dur*1e3),0,1):1):(i.st==='x'?.82:1),cx=tx+8,by=ty+11,dead=i.st==='x',g=Math.min(i.g||0,3),H=S0.h+(i.m==='l'?2:0)+2*g,sh=Math.round(H*cl(p/.7,0,1)),sw=dead?0:Math.round(Math.sin(t/700+i.x*1.3+i.y)*.6);
 R(tx+2,ty+9,12,6,'#5b3a20');R(tx+3,ty+10,10,4,'#7a5230');R(tx+5,ty+11,1,1,'#5b3a20');R(tx+9,ty+12,1,1,'#5b3a20');
 const r=rr(i.r);let A=S0.a,B=S0.b,C=S0.c;if(r==='gold'){A='#ffd700';B='#e0a000';C='#fff3a0'}else if(r==='blue'){A='#4aa3ff';B='#2563eb';C='#e0f2ff'}else if(r==='rainbow'){const hu=(t/9)%360;A=`hsl(${hu} 90% 62%)`;B=`hsl(${(hu+60)%360} 90% 48%)`;C='#fff'}
 let pop=0;if(GC&&GC.pop&&GC.pop.x===i.x&&GC.pop.y===i.y){const d=(t-GC.pop.t)/1000;if(d<.5)pop=Math.round(Math.sin(d/.5*Math.PI)*3)}
 if(dead){R(cx,by-4,1,4,'#6b5a3a');R(cx+1,by-5,2,1,'#6b5a3a');R(cx+2,by-4,2,2,'#8a7a5a');R(cx-2,by-3,2,1,'#8a7a5a');return}
 if(p<.12){R(cx-1,by-1,3,1,'#a06a3a');R(cx,by-2,1,1,'#a06a3a');return}
 const top=by-sh-pop;for(let k=0;k<sh;k++)R(cx+(k>sh*.6?sw:0),by-1-k,1,1,'#3c9a46');
 if(sh>=4)R(cx-3,by-Math.round(sh*.35)-1,3,2,'#4fbf5a');if(sh>=8)R(cx+1+(sw?1:0),by-Math.round(sh*.62)-1,3,2,'#4fbf5a');if(sh>=4)R(cx-3,by-Math.round(sh*.35),1,1,'#2f7d3a');
 const bx=cx+sw,bY=top-1,sz=p<.72?0:p<.84?1:p<.97?2:3;
 if(sz===0&&sh>1)R(bx,bY,1,1,'#4fbf5a');
 else if(sz===1)R(bx-1,bY-1,3,3,'#4fbf5a');
 else if(sz>=2){const full=sz===3;
  if(S0.k==='t'){if(!full)R(bx-1,bY-1,3,3,A);else{R(bx-2,bY-2,5,3,A);R(bx-2,bY-3,1,1,A);R(bx,bY-3,1,1,A);R(bx+2,bY-3,1,1,A);R(bx-1,bY+1,3,1,B);R(bx,bY-1,1,2,C)}}
  else if(S0.k==='s'){if(!full){R(bx-2,bY-1,5,3,A);R(bx-1,bY-2,3,5,A)}else{R(bx-3,bY-2,7,5,A);R(bx-2,bY-3,5,7,A);R(bx-1,bY-1,3,3,C);R(bx-4,bY,1,1,A);R(bx+4,bY,1,1,A);R(bx,bY-4,1,1,A);R(bx-2,bY+2,5,1,B)}}
  else{if(!full){R(bx-1,bY-1,3,3,A);R(bx,bY,1,1,C)}else{R(bx-2,bY-1,5,3,A);R(bx-1,bY-2,3,5,A);R(bx-1,bY-1,3,3,C);R(bx-1,bY+2,3,1,B)}}
  if(full&&(r||g)){const ph=Math.floor(t/250+i.x*3+i.y)%4,o=[[-4,-3],[4,-2],[3,3],[-3,2]][ph];R(bx+o[0],bY+o[1],1,1,'#fff');R(bx+o[0]-1,bY+o[1],3,1,'#fff7b0');R(bx+o[0],bY+o[1]-1,1,3,'#fff7b0')}
  if(full&&g>0&&Math.floor(t/400)%2===0)R(bx,bY-5-(S0.k==='s'?1:0),1,2,'#ffd23f')}
 if(i.st==='o'||live&&f.ph==='o')[[3,2],[12,2],[6,1],[10,1]].forEach(([ex,eh],k)=>{if((i.ov||0)>=3*(k+1)||(live&&f.ph==='o'&&Math.floor((t-f.t0-f.dur*1e3)/6e4)>=3*(k+1))){R(tx+ex,by-eh-1,1,eh,'#3c9a46');R(tx+ex-1,by-eh-3,3,2,A);R(tx+ex,by-eh-2,1,1,C)}})}
function gdec(R,d,tx,ty,t){
 if(d==='pond'){R(tx+1,ty+4,14,11,'#9ca3af');R(tx+2,ty+5,12,9,'#4aa3e8');R(tx+3,ty+6,10,7,'#5bb5f0');const w=Math.floor(t/500)%3;R(tx+4+w*2,ty+8,3,1,'#bfe6ff');R(tx+9-w,ty+11,3,1,'#bfe6ff');R(tx+9,ty+7,3,2,'#4fbf5a');R(tx+10,ty+7,1,1,'#ff9ecb')}
 else if(d==='bench'){R(tx+2,ty+13,12,2,'rgba(0,0,0,.18)');R(tx+2,ty+5,12,3,'#c58b57');R(tx+2,ty+9,12,2,'#b07c4c');R(tx+3,ty+11,2,3,'#7a5230');R(tx+11,ty+11,2,3,'#7a5230');R(tx+2,ty+5,12,1,'#dba974')}
 else if(d==='tree'){R(tx+3,ty+13,10,2,'rgba(0,0,0,.18)');R(tx+7,ty+5,3,10,'#7a5230');R(tx+1,ty-6,14,12,'#2f8f46');R(tx+3,ty-9,10,6,'#3fae56');R(tx+4,ty-4,4,3,'#4fc468');R(tx+9,ty,3,3,'#3fae56');R(tx+5,ty-8,3,2,'#6fd985');if(Math.floor(t/900)%2)R(tx+10,ty-5,2,2,'#ff7aa8')}
 else if(d==='lantern'){const g=.25+.1*Math.sin(t/400);GC.cx.fillStyle=`rgba(255,230,140,${g})`;GC.cx.fillRect(tx-2,ty-3,20,20);R(tx+7,ty+6,2,9,'#4b5563');R(tx+5,ty+1,6,6,'#fde68a');R(tx+6,ty+2,4,4,'#fff3b0');R(tx+4,ty,8,1,'#374151')}
 else if(d==='fountain'){R(tx+1,ty+8,14,7,'#9ca3af');R(tx+2,ty+9,12,5,'#7cc8ff');R(tx+7,ty+3,2,7,'#cde9ff');const w=Math.floor(t/150)%3;R(tx+5-w,ty+4+w,1,1,'#cde9ff');R(tx+10+w,ty+4+w,1,1,'#cde9ff');R(tx+6,ty+2,4,1,'#e6f4ff')}}
function fstart(m){const M=FM[m],n=Date.now(),ch=S.fchain&&S.fchain.d===D()&&n-S.fchain.last<(M.f+M.b+30)*6e4?S.fchain:null,g=gd();gfix();const sp=S.fsp&&spOk(S.fsp)?S.fsp:'daisy',s=gsel();g.it=g.it.filter(i=>!(i.x===s.x&&i.y===s.y));const it={id:'p'+n,t:'p',x:s.x,y:s.y,sp,st:'g',r:'',ov:0,g:ch?ch.ids.length:0,m,d:D()};g.it.push(it);
 S.foc={m,t0:n,dur:M.f*60,brk:M.b*60,bud:M.bud*60,used:0,away:null,go:null,ph:'f',ms:0,ch:it.g,pid:it.id,nu:[]};wake(true);unlock()}
function frec(f,ok,mins){const n=Date.now(),r=ok&&Math.random()<1/6?(()=>{const x=Math.random();return x<.5?'gold':x<.8?'blue':'rainbow'})():'';const s={id:n,d:D(),t0:f.t0,m:f.m,mins,ok:ok?1:0,over:0,bf:ok?2:0,r,ch:ok?(S.fchain&&S.fchain.d===D()&&n-S.fchain.last<(f.dur+f.brk+1800)*1e3?S.fchain.id:n):0};(S.fs=S.fs||[]).push(s);
 if(ok){if(S.fchain&&S.fchain.id===s.ch){S.fchain.ids.push(s.id);S.fchain.last=n}else S.fchain={id:n,d:D(),ids:[s.id],last:n}}else S.fchain=null;f.sid=s.id;return s}
function fdone(){const f=S.foc,before=ftot();f.ph='o';const s=frec(f,true,f.dur/60),it=gd().it.find(i=>i.id===f.pid);if(it){it.st='o';it.r=s.r;FXQ.push({x:it.x,y:it.y,big:!!s.r})}const after=before+f.dur/60,nu=[];Object.keys(SP).forEach(k=>{const u=SP[k].u||0;if(u>before&&u<=after)nu.push(SP[k].n+' seeds')});DEC.forEach(([u,k,n])=>{if(u>before&&u<=after){nu.push(n);gd().pend.push(k)}});f.nu=nu;chime(s.r?[523,659,784,1047,1319,1568]:[523,659,784,1047]);save()}
function ffail(why,at){const f=S.foc;f.ph='x';f.why=why;f.pf=0;const it=gd().it.find(i=>i.id===f.pid);if(it)it.st='x';frec(f,false,Math.floor((at-f.t0)/6e4));wake(false);save()}
function fover(f,t){const s=(S.fs||[]).find(x=>x.id===f.sid),end=f.t0+f.dur*1e3,it=gd().it.find(i=>i.id===f.pid);if(s)s.over=Math.max(0,Math.floor(((t||Date.now())-end)/6e4));if(it)it.ov=s?s.over:0;f.ph='b';f.bt0=t||Date.now();save()}

function fcheck(){const f=S.foc;if(!f)return;const n=Date.now();
 if(f.away&&!document.hidden){const a=f.away;f.away=null;
  if(f.ph==='f'){const dt=Math.max(0,Math.min(n,f.t0+f.dur*1e3)-a.t);
   if(a.k==='a'){f.used+=dt;if(f.used>f.bud*1e3){ffail('Your detour budget ran out. You can spend '+(f.bud/60)+' minutes in your allowed apps per block.',a.t+Math.max(0,f.bud*1e3-(f.used-dt)));return}}
   else if(dt>GRACE*1e3){ffail('You left the app for '+Math.round(dt/1e3)+' seconds without opening an allowed app. The grace period is '+GRACE+' seconds.',a.t+GRACE*1e3);return}}
  else if(f.ph==='o'){fover(f,a.t)}
  save()}
 if(f.ph==='f'&&n>=f.t0+f.dur*1e3)fdone();
 if(f.ph==='b'&&!f.bd&&n>=f.bt0+f.brk*1e3){f.bd=1;beep(2);save()}}
document.addEventListener('visibilitychange',()=>{const f=S.foc;if(!f)return;if(document.hidden){if(!f.away&&(f.ph==='f'||f.ph==='o')){const a=f.go&&Date.now()-f.go.t<8e3;f.away={t:Date.now(),k:a?'a':'o',n:a?f.go.n:''};f.go=null;save()}}else{fcheck();go()}});
function ftick(){const f=S.foc;if(!f)return;fcheck();const q=$('#fph');if(q&&q.dataset.p!==f.ph)return go();
 if(f.ph==='f'||f.ph==='o'){const p=f.ph==='f'?cl((Date.now()-f.t0)/(f.dur*1e3),0,1):1,left=Math.ceil((f.t0+f.dur*1e3-Date.now())/1e3);
  if(f.ph==='f'){const m=Math.floor(p*3);if(m>f.ms&&m<3){f.ms=m;gd().bf++;beep(1);save();const it=gd().it.find(i=>i.id===f.pid)||{x:0,y:0};if(GC)gburst({x:it.x,y:it.y});const g=$('#fmsg');if(g){g.textContent='A butterfly landed';g.style.opacity=1;setTimeout(()=>{if(g)g.style.opacity=0},3500)}}}
  const t=$('#ftm');if(t)t.textContent=f.ph==='f'?fmt(left):'+'+fmt(-left);const bd=$('#fbud');if(bd)bd.textContent=fmt(Math.max(0,Math.round(f.bud-f.used/1e3)))}
 else if(f.ph==='b'){const left=Math.ceil((f.bt0+f.brk*1e3-Date.now())/1e3),t=$('#ftm');if(t)t.textContent=left>0?fmt(left):'Break over'}}
setInterval(ftick,500);
function vFocus(){const f=S.foc,T0=D();
 const apps=fapps(),links=show=>show?`<h3>Allowed apps</h3><small>Open these from here during a block. Time away counts against your detour budget, not as a failure. Any other way out has a ${GRACE} second grace period.</small><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">${apps.map(a=>`<a class=btn href="${esc(a.u)}" data-a=fgo data-n="${esc(a.n)}">${ic('link',16)} ${esc(a.n)}</a>`).join('')}</div>`:'';
 const cv='<canvas id=gc></canvas>';
 if(f){fcheck();const M=FM[f.m],PH=`<i id=fph data-p="${f.ph}" hidden></i>`,s=(S.fs||[]).find(y=>y.id===f.sid)||{},SPn=(SP[(gd().it.find(i=>i.id===f.pid)||{}).sp]||SP.daisy).n;
  if(f.ph==='f'||f.ph==='o')return PH+`<h1>Work focus</h1><small>${M.n} block · ${M.f} min focus, ${M.b} min break · ${SPn}</small>
   <div class=card style="text-align:center">${cv}<div class=big id=ftm style="margin:12px 0 4px"></div><div id=fmsg style="opacity:0;transition:opacity .4s;color:var(--g);font-size:14px;min-height:20px"></div>
   ${f.ph==='o'?`<div class=gain style="font:500 22px var(--mono);color:var(--ok)">+${f.dur/60} min</div><p style="margin:4px 0 8px"><b>Fully grown.</b> ${s.r?`<span class=chip style="background:var(--g);border-color:var(--g);color:var(--gi)">Rare: ${RARE[rr(s.r)]} ${SPn}</span>`:''}</p>${(f.nu||[]).length?`<p><span class=chip style="background:var(--ok);border-color:var(--ok);color:#fff">Unlocked: ${f.nu.map(esc).join(', ')}</span></p>`:''}<small>Stay on this screen and tiny flowers open around it. Leaving now costs nothing and ends the extra time.</small><br><button class="btn pri" data-a=ffin>Finish and start the ${M.b} min break</button>`:`<small>Detour budget left <b id=fbud style="font-family:var(--mono)"></b>. Leaving the app any other way gives you ${GRACE} seconds back.</small><br><button class=btn data-a=fstop>${f.sure&&Date.now()-f.sure<5e3?'Tap again to give up':'Give up this block'}</button>`}</div>${links(f.ph==='f')}`;
  if(f.ph==='b'){const pd=gd().pend[0];return PH+`<h1>Break</h1><div class=card style="text-align:center">${cv}<div class=big id=ftm style="margin:12px 0"></div><p>Free time. Use any app you like.</p>${pd?`<p><b>New item: ${DEC.find(d=>d[1]===pd)[2]}.</b> Tap an empty tile, then place it.</p><button class="btn pri" data-a=fplace>Place ${DEC.find(d=>d[1]===pd)[2]} here</button><br>`:''}<button class="btn pri" data-a=fstart data-m="${f.m}">Next ${M.n.toLowerCase()} block</button><button class=btn data-a=fstart data-m="${f.m==='s'?'l':'s'}">Switch to ${FM[f.m==='s'?'l':'s'].n.toLowerCase()}</button><button class=btn data-a=fend>Finish for today</button></div>`}
  if(f.ph==='x')return PH+`<h1>Plant wilted</h1><div class=card style="text-align:center">${cv}<p>${esc(f.why||'')}</p><small>It stays in your garden until you plant over it. The streak resets.</small><br><button class="btn pri" data-a=fstart data-m="${f.m}">Try again</button><button class=btn data-a=fend>Stop</button></div>`}
 const pd=gd().pend[0],tot=ftot(),nx=[...Object.keys(SP).map(k=>[SP[k].u||0,SP[k].n+' seeds']),...DEC.map(d=>[d[0],d[2]])].filter(x=>x[0]>tot).sort((a,b)=>a[0]-b[0])[0],pl=gd().it.filter(i=>i.t==='p'&&i.st==='o'),tdS=fses(T0),wk=wdays(weekStart(T0)).reduce((a,d)=>a+fmin(d),0),s=gsel();
 const mode=m=>{const M=FM[m];return`<div class=card><b>${M.n}: ${M.f} focus, ${M.b} break</b><small style="display:block;margin:4px 0 8px">${M.use}</small><button class="btn pri" data-a=fstart data-m="${m}">${ic('play',16)} Start ${M.f} / ${M.b}</button></div>`};
 const sw=k=>`<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${SP[k].a};border:2px solid ${SP[k].b};margin-right:6px"></span>`;
 return`<h1>Work focus</h1><small>Stay in the app to grow a flower in your garden. Leave and it wilts.</small>
 <div class=card style="padding:8px">${cv}<small style="display:block;margin:8px 4px 0">Planting at row ${s.y+1}, column ${s.x+1}. Tap another empty tile to move.</small></div>
 ${pd?`<div class=card style="border-color:var(--ok)"><b>New item: ${DEC.find(d=>d[1]===pd)[2]}</b><small style="display:block;margin:4px 0 8px">Tap an empty tile in the garden, then place it.</small><button class="btn pri" data-a=fplace>Place ${DEC.find(d=>d[1]===pd)[2]} here</button></div>`:''}
 <h3>Seed</h3><div style="display:flex;flex-wrap:wrap;gap:8px">${Object.keys(SP).map(k=>spOk(k)?`<button class="chip ${(S.fsp||'daisy')===k?'on':''}" data-a=fsp data-v="${k}">${sw(k)}${SP[k].n}</button>`:`<span class=chip style="opacity:.55">${SP[k].n} · ${hm(SP[k].u)}</span>`).join('')}</div>
 ${mode('s')}${mode('l')}
 ${nx?`<div class=card><small>Next unlock</small><div style="display:flex;justify-content:space-between;margin:4px 0"><b>${nx[1]}</b><small>${hm(nx[0]-tot)} to go</small></div><div style="height:8px;background:var(--c2);border-radius:4px;overflow:hidden"><div style="width:${Math.round(tot/nx[0]*100)}%;height:100%;background:var(--g)"></div></div></div>`:''}
 <div class=card><b>How it works</b><div style="font-size:14px;color:var(--t2);line-height:1.5;margin-top:4px">Pick a seed and a tile, then start a block. Your flower grows in the garden while you stay on this screen: seed, sprout, leaves, bud, bloom. Open an allowed app from here and the time away comes from your detour budget (${FM.s.bud} min for short blocks, ${FM.l.bud} for long). Leave any other way, or browse elsewhere in this app, and you have ${GRACE} seconds to come back or the flower wilts. Locking the screen counts as leaving. Breaks are free.</div></div>
 <div class=card><b>Bonuses</b><div style="font-size:14px;color:var(--t2);line-height:1.6;margin-top:4px"><b>Butterflies.</b> Two land at one third and two thirds of the block, then stay and fly around the garden (up to 8 at once).<br><b>Rare flower.</b> About 1 in 6 finished flowers blooms golden, blue or rainbow, with a bigger burst and sparkles. You find out at the end.<br><b>Overtime.</b> Stay on the screen after the end and tiny flowers open around it, one every 3 minutes, up to 4.<br><b>Streak.</b> Start the next block within 30 minutes of the break ending and the flower grows 2 pixels taller for each block in a row, with a gold twinkle.<br><b>Unlocks.</b> Your total focus time opens new seeds and garden items like a pond, bench, tree, lantern and fountain.</div></div>
 <div class=tiles><div class=tile><small>Today</small><b>${fmin(T0)} min</b><small>${tdS.length} block${tdS.length===1?'':'s'}</small></div><div class=tile><small>This week</small><b>${wk} min</b><small>${hm(tot)} in total</small></div></div>
 <small>${pl.length} flower${pl.length===1?'':'s'} grown · ${pl.filter(i=>i.r).length} rare · ${gd().bf} butterflies</small>
 <h3>Allowed apps</h3><small>Shown on the focus screen. Use the app's link, for example whatsapp://, googlegmail:// or googlecalendar://</small><div id=fap>${apps.map(a=>fapRow(a.n,a.u)).join('')}</div><button class=btn data-a=fapadd>${ic('link',16)} Add app</button><select data-c=fapx style="margin-top:8px"><option value="">Add from common apps</option>${FAPP.map(x=>`<option value="${x}">${x.split('|')[0]}</option>`).join('')}</select><small style="display:block;margin-top:8px">Not in the list? Every iPhone app has a link that starts with its own word and ://. Search the web for the app name plus "URL scheme iOS". For any app, you can also make a shortcut in the Shortcuts app with the action Open App, name it, and use the link shortcuts://run-shortcut?name=YourShortcutName here.</small>`}

const FAPP=['WhatsApp|whatsapp://','Gmail|googlegmail://','Google Calendar|googlecalendar://','Google Docs|googledocs://','Google Sheets|googlesheets://','Google Drive|googledrive://','Slack|slack://','Notion|notion://','Spotify|spotify://','Telegram|tg://','Microsoft Teams|msteams://','Zoom|zoomus://','Todoist|todoist://','Apple Calendar|calshow://','Apple Notes|mobilenotes://','Apple Mail|message://','Messages|sms:','Phone|tel:'];
const fapRow=(n,u)=>`<div class=wrow2 style="display:flex;gap:6px;align-items:center;margin:6px 0"><input class=fa-n data-c=fap placeholder="Name" value="${esc(n||'')}" style="flex:3;min-width:0"><input class=fa-u data-c=fap placeholder="Link" value="${esc(u||'')}" style="flex:3;min-width:0"><button class=btn data-a=fapdel aria-label="Remove">✕</button></div>`;

const V={focus:vFocus,targets:vTargets,types:vTypes,flows:vFlows,f:vFlow,tr:vTr,tn:vNewTodo,rtn:vRtn,guide:vGuide,x:(k,d)=>vExt(k,d,1),xd:(k,d)=>vExt(k,d),xe:(k,d)=>vExt(k,d),t:vTodoD,plan:vPlan,today:vPlan,b:vPlan,train:vTrain,fuel:vFuel,money:vMoney,more:vMore,life:vMore,mind:vMind,skill:vSkill,rel:()=>vNotes('Relationships and play','rel','Log time with people and things to remember: date ideas, who to call, gifts, how an evening went.'),meaning:()=>vNotes('Meaning','meaning','Reflections, gratitude, what matters to you, ways you helped someone.',`<button class=btn data-a=timer data-s=900 data-l="Quiet moment">${ic('timer')} 15-min quiet</button>`),week:vWeek,todo:vTodo,links:vLinks,set:vSet,r:vRoutine,run:vRun,day:vDay};
const SUB=['focus','types','flows','rtn','guide','train','fuel','money','mind','skill','rel','meaning','week','todo','links','set'];
function scrollPlan(){const g=$('.grid');if(!g)return;const n=new Date(),m=sel===D()?n.getHours()*60+n.getMinutes():420;const hh=($('.stick')||{}).offsetHeight||0;scrollTo(0,g.offsetTop-hh+Math.max(0,m-360-60)*Zv())}
function go(){const[p,...a]=(location.hash.slice(2)||'plan').split('/'),v=$('#v'),st=scrollY,lock=!!S.foc&&(S.foc.ph==='f'||S.foc.ph==='o');if(lock&&p!=='focus'){location.replace('#/focus');return}document.body.classList.toggle('foc',lock);CTA='';document.documentElement.style.setProperty('--z',Zv());
 if(p==='r'&&S.ctx){S.ctx=null;save()}
 try{v.innerHTML=(SUB.includes(p)&&!lock?'<a href="#/more">‹ More</a>':'')+(V[p]||vPlan)(...a.map(decodeURIComponent))}catch(e){v.innerHTML=`<h1>Error</h1><p>${esc(e.message)}</p><a href="#/set">Open Settings to fix a config</a>`}
 scrollTo(0,st);$('#ctaw').innerHTML=CTA;if(ANIM){const g=$('.grid');if(g)g.classList.add(ANIM);ANIM=''}
 const nav=['plan','today','b','r','run','day'].includes(p)?'plan':'more';
 document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x.dataset.p===nav));
 $('#cx').style.display=S.ctx?'flex':'none';if(S.ctx)$('#cxl').textContent=S.ctx.label;
 tick();breath();ftick();ginit()}
addEventListener('hashchange',()=>{go();scrollTo(0,0);scrollPlan()});
const fixVp=()=>setTimeout(()=>{const y=scrollY;scrollTo(0,y+1);scrollTo(0,y)},120);
const isTxt=e=>e.target&&/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
document.addEventListener('focusin',e=>{if(isTxt(e))document.body.classList.add('kb')});
document.addEventListener('focusout',e=>{setTimeout(()=>{if(!document.activeElement||!/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName))document.body.classList.remove('kb');fixVp()},150)});
if(window.visualViewport)visualViewport.addEventListener('resize',()=>{if(!document.body.classList.contains('kb'))fixVp()});
addEventListener('hashchange',()=>{try{document.activeElement&&document.activeElement.blur()}catch(e){}fixVp()});addEventListener('resize',fixVp);
setInterval(tick,250);setInterval(breath,100);

/* data safety + silent updates */
try{navigator.storage?.persist?.()}catch(e){}
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(()=>{});let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!S.active&&!B&&!R&&!S.foc)location.reload();had=true})}
async function chk(){try{const j=await(await fetch('version.json?'+Date.now(),{cache:'no-store'})).json();if(BUILD!=='dev'&&j.b&&j.b!==BUILD&&!location.search.includes('u='+j.b)&&!S.active&&!B&&!R&&!T&&!S.foc)location.replace(location.pathname+'?u='+j.b+location.hash)}catch(e){}}
save();go();scrollPlan();gsync(false);chk();
