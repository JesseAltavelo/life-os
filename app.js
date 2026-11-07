'use strict';
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
const emo=t=>(t.match(/^[\p{Extended_Pictographic}️‍]+/u)||['▫️'])[0];
const DN=['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const base=()=>location.origin+location.pathname;
const td=()=>D();

/* ---------- defaults (everything is editable in Life > Settings) ---------- */
const VER=2;
const DEF={v:VER,start:D(),mode:{},wmode:{},short:{},chk:{},water:{},steps:{},port:{},supp:{},hab:{},jr:{},med:{},todo:[],log:[],active:null,tx:[],paid:{},rev:{},wx:{},timer:null,ctx:null,
cfg:{
income:0,invest:0,waterT:2500,stepsT:10000,stepsMin:8000,pg:20,
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
meals:`Breakfast|Protein:2,Carb:2,Fruit:2
Lunch|Protein:2,Veg:2,Carb:1
Snack|Protein:1,Fruit:1
Dinner|Protein:2,Veg:3,Carb:1,Fat:1`,
supps:`Creatine 5g
Vitamin D
Omega-3
Magnesium`,
habits:`Body|Morning light|7
Body|SPF 50 on|7
Body|Retinoid at night|3
Body|Calf raises / hourly movement|5
Mind|Meditate / breathe|7
Skill|Weekend build block|1
Skill|Auto-invest running|1
Relationships|Social / humour activity|2
Relationships|Joke or funny story|5
Relationships|Call family or friend|3
Meaning|Quiet moment|7
Meaning|Gratitude|7
Meaning|Nature time|1
Meaning|Service / kindness|1
Weekend|Meal prep|1
Weekend|Relationship check-in|1`,
cats:`Rent|0
Groceries|0
Eating out|0
Transport|0
Health / gym|0
Subscriptions|0
Fun|0
Other|0`,
wk:`Lift sessions|5|3|lift
Days at step target|7|7|steps
Days at water target|7|5|water
Days meditated|7|5|med
Days journaled|5|3|jr
Learn blocks|4|3|r:learn-block
Commute audio days|5|5|r:commute-audio
Cardio sessions (Zone 2 / VO2)|3|1|x
Date night|1|1|r:date-night
Social / humour|2|1|h:Social / humour activity
Nature / quiet time|1|1|h:Nature time
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
routines:`# Morning routine|07:00|70|12345||1|40
💧 Water + pinch of salt|2||*
☀️ Morning light, no phone|3||*
🤸 Lymph + mobility flow|25|flow:Mobility flow|10
🍳 Protein breakfast (40g+) + supplements|20|fuel|*
🚿 Shower, cold finish, SPF 50|15||*
🎒 Pack lunch + gym bag|5||
# Commute + audio|08:30|30|12345||0|200
🎧 Audio: {audio}|30|spotify|*
# Deep work|09:00|90|12345||0|220
🧠 Hardest task first (move 3 min every hour)|90||*
# Lunch + sun walk|12:30|60|12345||1|130
🍽️ Lunch: protein, veg, carb|20|fuel|
☀️ Walk 20 min outside|20||*
📞 Read or call a friend|10||
# Snack + water|15:30|10|12345||0|130
🍎 Fruit + protein snack|5|fuel|*
💧 Water|2||*
# Commute home|17:00|30|12345||0|200
📞 Call family or friend, or audio. No doomscrolling|30||*
# Dinner|17:30|60|12345||0|130
🍽️ Dinner: 40-50g protein, carb, veg|30|fuel|*
# Training|18:45|75|12345|135|0|0
🤸 Warm up|10||5
🏋️ Workout: {train}|55|train|45
🧊 Cool down|5||
🍽️ Protein refuel|5|fuel|*
# Learn block|20:20|40|1234|123|0|210
📚 {learn}|40|skill|30
# Date night|20:00|180|5||0|330
❤️ Date night, phone-free|120|rel|*
# Together time|21:00|60|1234||0|330
❤️ Phone-free time together (cook lunch, walk, talk)|60|rel|*
# Evening routine|22:00|20|12345||0|270
🍽️ Log portions, water + steps|3|fuel|*
💶 Log today's spending|2|money|*
✅ Set tomorrow's top 3 tasks|3|todo|
🧴 Skin routine (retinoid 3 nights a week)|8||
🎒 Prep clothes + bag|3||
# Wind-down + bed|22:20|40|12345||1|250
🧘 Breathing 10 min|10|mind|5
📓 3-line journal|3|mind|
📖 Read a paper book|10||
💊 Magnesium|1||
🛏️ Phone outside, lights out by 22:45|5||*
# Morning (Sat)|08:00|75|6||1|40
💧 Water + morning light|5||*
🤸 Mobility 15 min|15|flow:Mobility flow|10
🍳 Big protein breakfast|30|fuel|*
# VO2 session|09:30|60|6||1|0
🏃 VO2 4x4 (hill, bike, row or swim)|45|flow:VO2 4x4|*
🚿 Shower + refuel|15|fuel|
# Quality time|11:00|120|6||0|330
❤️ Beach, market, coffee or day trip (SPF on face)|120|rel|*
# Lunch (Sat)|13:00|60|6||0|130
🍽️ Social lunch or nice meal|60|fuel|
# Build block|14:00|90|6||0|210
💼 Side project, business, investing or course|90|skill|30
# Cook dinner together|18:00|90|6||0|130
🍳 Cook dinner|60|fuel|
# Fun night|20:00|180|6||0|300
🎉 Friends, music, comedy (2 drinks or fewer)|180||
# Wind-down (Sat)|23:00|30|6||1|250
🧘 Breathing|5|mind|*
🛏️ Lights out (up to 23:30)|5||*
# Morning (Sun)|08:30|60|7||1|40
💧 Water + morning light|5||*
🤸 Mobility|15|flow:Mobility flow|10
# Long Zone 2 + quiet hour|09:30|120|7||1|140
🌊 Zone 2: coastal walk, hike or swim (60-90 min)|90||45
🧘 15 min silence, gratitude, meditation|15|meaning|*
# Brunch + recovery|12:00|120|7||0|130
🍽️ Brunch|45|fuel|
🧖 Sauna or contrast shower, foam rolling, stretching|45||
# Weekly review|14:00|45|7||1|20
💶 Review budget + auto-invest|15|money|*
📊 Weekly review + notes|20|week|*
📅 Add training days to Google Calendar|5||*
# Relationship check-in|14:45|20|7||0|330
❤️ What went well, what each needs, what to plan|20|rel|*
# Meal prep|15:15|90|7||0|130
🥘 Prep protein, carb base and veg for Mon-Wed|90|fuel|
# Wind-down (Sun)|21:00|45|7||1|250
🧴 Light skin routine, set up Monday|10||
🧘 Breathing|10|mind|5
🛏️ Lights out by 22:30|5||*`
}};
function load(o){o=o||{};if((o.v||0)<2){if(o.cfg){delete o.cfg.blocks;delete o.cfg.mvd;delete o.cfg.wk}Object.keys(o.mode||{}).forEach(k=>o.mode[k]=o.mode[k]==='mvd'?'min':'')}
 const s=Object.assign(structuredClone(DEF),o);s.cfg=Object.assign({},DEF.cfg,o.cfg);s.v=VER;return s}
let S;try{S=load(JSON.parse(localStorage.lifeos1))}catch(e){S=load()}
const save=()=>{try{localStorage.lifeos1=JSON.stringify(S)}catch(e){}};

/* ---------- parsers ---------- */
const routines=()=>{const o=[];let c;lines(S.cfg.routines).forEach(l=>{if(l[0]=='#'){const[n,s,d,dy,mw,es,h]=l.slice(1).split('|').map(x=>x.trim());c={id:slug(n),name:n,start:s||'09:00',dur:+d||30,days:dy||'1234567',mw:mw||'',ess:es==='1',hue:+h||200,steps:[]};o.push(c)}
 else if(c){const[t,m,k,sh]=l.split('|').map(x=>x.trim());c.steps.push({raw:t,min:+m||1,link:k||'',short:sh||''})}});return o};
const flows=()=>{const o={};let c;lines(S.cfg.flows).forEach(l=>{if(l[0]=='#'){c=l.slice(1).trim();o[c]=[]}else if(c){const[n,s]=l.split('|');o[c].push([n.trim(),+s||60])}});return o};
const themes=()=>Object.fromEntries(lines(S.cfg.themes).map(l=>{const[d,learn,audio,train,sp]=l.split('|').map(x=>x.trim());return[+d,{learn,audio,train,sp}]}));
const themeOf=ds=>themes()[dow(ds)]||{};
const tpls=()=>{const o={};let c;lines(S.cfg.tpl).forEach(l=>{if(l[0]=='#'){c=l.slice(1).trim();o[c]=[]}else if(c){const[n,s,r,rest]=l.split('|').map(x=>x.trim());o[c].push({n,s:+s||3,r:r||'8-12',rest:+rest||90})}});return o};
const meals=()=>lines(S.cfg.meals).map(l=>{const[n,t]=l.split('|');return{n:n.trim(),t:Object.fromEntries((t||'').split(',').filter(Boolean).map(x=>{const[k,v]=x.split(':');return[k.trim(),+v||0]}))}});
const cats=()=>lines(S.cfg.cats).map(l=>{const[n,v]=l.split('|');return{n:n.trim(),l:+v||0}});
const mode=ds=>S.mode[ds]||'';

/* occurrences, steps, progress */
const isShort=(r,ds)=>(mode(ds)==='min'&&r.ess)||!!S.short[ds]?.[r.id];
function occ(ds){const mw=S.wmode[weekStart(ds)]==='mvw',d=dow(ds),min=mode(ds)==='min';
 return routines().filter(r=>r.days.includes(d)&&(!mw||(r.mw||r.days).includes(d))&&(!min||r.ess))}
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

function cnt(src,ws,lab){const ds=wdays(ws),mv=S.wmode[ws]==='mvw';
 if(src==='lift')return S.log.filter(l=>l.date>=ws&&l.date<=ds[6]).length;
 if(src==='steps')return ds.filter(d=>(S.steps[d]||0)>=(mv?S.cfg.stepsMin:S.cfg.stepsT)).length;
 if(src==='water')return ds.filter(d=>(S.water[d]||0)>=S.cfg.waterT).length;
 if(src==='med')return ds.filter(d=>S.med[d]>0).length;
 if(src==='jr')return ds.filter(d=>S.jr[d]&&(S.jr[d].g||S.jr[d].w||S.jr[d].t)).length;
 if(src==='rev')return S.rev[ws]?.done?1:0;
 if(src.startsWith('r:'))return ds.filter(d=>rdone(d,src.slice(2))).length;
 if(src.startsWith('h:'))return ds.filter(d=>S.hab[d]?.[src.slice(2)]).length;
 return(S.wx[ws]||{})[lab]||0}
function monthStats(){const mo=D().slice(0,7),tx=S.tx.filter(x=>x.d.startsWith(mo)),by={};tx.forEach(x=>by[x.c]=(by[x.c]||0)+x.a);return{mo,tx,by,sp:tx.reduce((a,x)=>a+x.a,0)}}

/* ---------- warnings ---------- */
function warns(){const w=[],t=D(),y=addD(t,-1),y2=addD(t,-2),ok=d=>d<S.start||pct(d)>=.5;
 if(!ok(y)&&!ok(y2))w.push(['r','Two slipped days in a row. Today is non-negotiable: at least do the Minimum Day.']);
 else if(!ok(y))w.push(['a','Yesterday slipped. Never miss twice. Protect today.']);
 let n=0;for(let i=1;i<=7;i++){const d=addD(t,-i);if(d>=S.start&&mode(d)==='min')n++;else break}
 if(n>=3)w.push(['a',`${n} days in a row on Minimum Day. Fine for a rough patch. Try one full routine today to climb back.`]);
 const ws=weekStart(t),dw=dow(t),L=cnt('lift',ws),mv=S.wmode[ws]==='mvw';
 if(ws>=S.start||dw>2){if(dw>=3&&L===0)w.push(['r','No workout logged this week yet.']);else if(dw>=5&&L<(mv?2:3))w.push(['a',`Only ${L} workout${L==1?'':'s'} logged this week.`])}
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
const PAT={Box:[['Inhale',4],['Hold',4],['Exhale',4],['Hold',4]],'Physiological sigh':[['Inhale',2],['Top-up',1],['Exhale',6]],'4-7-8':[['Inhale',4],['Hold',7],['Exhale',8]]};
function breath(){if(!B)return;const el=(Date.now()-B.start)/1e3;
 if(el>=B.dur*60)return bend(true);
 const ph=PAT[B.pat],cyc=ph.reduce((a,p)=>a+p[1],0);let x=el%cyc,k=0;while(x>=ph[k][1]){x-=ph[k][1];k++}
 const[n,d]=ph[k],f=x/d,pv=ph[(k+ph.length-1)%ph.length][0];
 const sc=n==='Inhale'?.6+.35*f:n==='Top-up'?.95+.05*f:n==='Exhale'?1-.4*f:(pv==='Exhale'?.6:1);
 const bl=$('#bl');if(bl){bl.textContent=n+' '+Math.ceil(d-x);$('#bc').style.transform=`scale(${sc})`;$('#br').textContent=fmt(Math.ceil(B.dur*60-el))}}
function bend(full){const m=full?B.dur:Math.floor((Date.now()-B.start)/6e4);B=null;wake(false);if(m>0){S.med[D()]=(S.med[D()]||0)+m;(S.hab[D()]=S.hab[D()]||{})['Meditate / breathe']=1}save();if(full)beep(3);go()}

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
function habs(sec){const t=D(),ws=weekStart(t);return lines(S.cfg.habits).map(l=>l.split('|').map(x=>x.trim())).filter(a=>a[0]===sec).map(([_,n,tg])=>{const c=wdays(ws).filter(d=>S.hab[d]?.[n]).length;
 return`<div class=row><button class="ck ${S.hab[t]?.[n]?'on':''}" data-a=hab data-n="${esc(n)}"></button><span style="flex:1">${esc(n)}</span><small style="width:auto">${c}/${tg||7} this week</small></div>`}).join('')}

function layout(ev){ev.sort((a,b)=>a.s-b.s);const cl=[];let cur=[],end=0;
 ev.forEach(x=>{if(cur.length&&x.s>=end){cl.push(cur);cur=[];end=0}cur.push(x);end=Math.max(end,x.e)});if(cur.length)cl.push(cur);
 cl.forEach(c=>{const cols=[];c.forEach(x=>{let i=cols.findIndex(e=>e<=x.s);if(i<0){i=cols.length;cols.push(0)}cols[i]=x.e;x.c=i});c.forEach(x=>x.n=cols.length)})}
function grid(days){const t=D(),wk=days.length>1,nowM=new Date().getHours()*60+new Date().getMinutes();
 return`<div class="grid ${wk?'wk':''}"><div class=gut>`+[...Array(19)].map((_,i)=>`<span style="top:${i*60}px">${String(6+i).padStart(2,'0')}:00</span>`).join('')+`</div><div class=cols>`
 +days.map(ds=>{const ev=occ(ds).map(r=>{const s=+r.start.slice(0,2)*60+ +r.start.slice(3);return{r,s,e:Math.max(s+r.dur,s+26)}});layout(ev);
 return`<div class=col>`+ev.map(x=>{const r=x.r,st=stepsOf(r,ds),dn=st.filter(s=>isDone(ds,r,s)).length,all=st.length&&dn===st.length;
 return`<a class="ev ${all?'dn':''}" href="#/r/${r.id}/${ds}" style="top:${x.s-360}px;height:${x.e-x.s-1}px;left:calc(${x.c/x.n*100}% + 1px);width:calc(${100/x.n}% - 2px);background:hsl(${r.hue} 45% 24%);border-color:hsl(${r.hue} 70% 60%)"><b>${all?'✓ ':''}${esc(r.name)}</b>${wk?'':`<br>${r.start} · ${dn}/${st.length}`}</a>`}).join('')+(ds===t?`<i class=now style="top:${nowM-360}px"></i>`:'')+`</div>`}).join('')+`</div></div>`}

function vPlan(){const t=D(),ws=weekStart(sel),m=mode(sel),mw=S.wmode[ws]==='mvw';
 let h=`<div class=top><h1>${new Date(sel+'T12:00').toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</h1><div><button class="chip ${view==='day'?'on':''}" data-a=view data-v=day>Day</button> <button class="chip ${view==='week'?'on':''}" data-a=view data-v=week>Week</button> <button class=chip data-a=gotoday>Today</button></div></div>
 <div class=strip><button data-a=wk data-v=-7>‹</button>`+wdays(ws).map(d=>`<button class="dd ${d===sel?'on':''} ${d===t?'td':''}" data-a=sel data-v=${d}><small>${DN[dow(d)]}</small><b>${+d.slice(8)}</b></button>`).join('')+`<button data-a=wk data-v=7>›</button></div>`;
 if(sel===t){h+=warns().map(([k,x])=>`<div class="w ${k}">${esc(x)}</div>`).join('');
  if(!m)h+=`<div class=card><b>How do you feel today?</b><small>This picks your plan for today. You can change it any time.</small><button class="btn pri" data-a=mode data-v=full>💪 Full day</button><button class=btn data-a=mode data-v=min>🪫 Minimum day</button></div>`}
 h+=`<div class=card><div class=ctl><span>Day</span>${seg([['full','Full'],['min','Minimum']],m||'full','mode')}</div><small>${m==='min'?'Minimum day: only the essential routines, in their short versions. Doing just this counts as a good day.':'Full day: every routine for this day, all steps.'}</small>
 <div class=ctl style="margin-top:8px"><span>Week</span>${seg([['','Full'],['mvw','Minimum']],mw?'mvw':'','wmodeset')}</div><small>${mw?'Minimum week: a lighter calendar (e.g. training only Mon/Wed/Fri, fewer learn blocks) and lower weekly targets (e.g. 3 workouts, 8k steps).':'Full week: every routine on its normal days and the full weekly targets (e.g. 5 workouts, 10k steps).'}</small></div>`;
 return h+grid(view==='week'?wdays(ws):[sel])}

function vRoutine(id,ds){ds=ds||D();const r=routines().find(x=>x.id===id);if(!r)return'<p>Routine not found.</p><a href="#/plan">Back</a>';
 const forced=mode(ds)==='min'&&r.ess,sh=isShort(r,ds),st=stepsOf(r,ds),done=st.filter(s=>isDone(ds,r,s)).length,left=st.filter(s=>!isDone(ds,r,s)).reduce((a,s)=>a+s.min,0),
 end=new Date(Date.now()+left*6e4).toTimeString().slice(0,5),cur=st.findIndex(s=>!isDone(ds,r,s)),run=RUN&&RUN.rid===id;
 const e=+r.start.slice(0,2)*60+ +r.start.slice(3)+r.dur,endT=String(Math.min(e,1439)/60|0).padStart(2,'0')+':'+String(Math.min(e,1439)%60).padStart(2,'0');
 return`<a href="#/plan" onclick="sel='${ds}'">‹ Calendar</a><h1>${esc(r.name)}</h1><small>${r.start} – ${endT} (${r.dur}m) · ${new Date(ds+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})} · ${done}/${st.length} done</small>
 ${forced?`<span class="dash on">Short version (Minimum day)</span>`:`<button class="dash ${sh?'on':''}" data-a=short data-r="${id}" data-d="${ds}">${sh?'✓ Short version':'+ Short version'}</button>`}`
 +st.map((s,i)=>{const d=isDone(ds,r,s);return`<div class="step ${d?'dn':''} ${i===cur?'cur':''}"><span class=n>${i+1}</span><span class=em>${emo(s.title)}</span><a data-a=stepgo data-r="${id}" data-d="${ds}" data-i=${i}>${esc(stripE(s.title))}${s.link?'<small>'+(s.link.startsWith('flow:')?'Guided flow':s.link==='spotify'?'Opens Spotify':'Opens '+esc(s.link))+' ›</small>':''}</a><span class=mn>${s.min}m</span><button class="ck ${d?'on':''}" data-a=stepchk data-r="${id}" data-d="${ds}" data-i=${i}></button></div>`}).join('')
 +(done===st.length&&st.length?`<button class=cta data-a=rback data-d="${ds}">✓ Routine complete · Back to calendar</button>`:run?`<button class=cta data-a=rstop>■ Stop timer</button>`:`<button class=cta data-a=rstart data-r="${id}" data-d="${ds}">▶ Start Timer<br><small style="color:#06251a">Ends at ${end}</small></button>`)}

function vRun(){if(!R)return'<p>No guided flow running.</p><a href="#/plan">Back</a>';const s=R.steps;
 return`<small>${esc(R.name)} · step ${R.i+1} / ${s.length}</small><h1>${esc(s[R.i][0])}</h1><div class=big id=big>${fmt(s[R.i][1])}</div>
 <button class=btn data-a=runback>◀ Back</button><button class="btn pri" data-a=tskip>Next ▶</button><button class=btn data-a=runstop>Stop</button>
 <h3>Up next</h3>`+s.slice(R.i+1).map(x=>`<div class=row><span style="flex:1">${esc(x[0])}</span><small style="width:auto">${fmt(x[1])}</small></div>`).join('')}

function vTrain(){if(S.active)return vActive();const th=themeOf(D()),tp=tpls(),tn=th.train,last=S.log.filter(l=>l.tpl===tn).pop();
 let h=`<h1>Train</h1>`+(tp[tn]?`<div class=card><small>Today's session</small><b style="font-size:20px">${esc(tn)}</b><small>${tp[tn].length} exercises${last?' · last time '+last.date:''}</small><button class="btn pri" data-a=start data-n="${esc(tn)}">▶ Start ${esc(tn)}</button></div>`:`<div class=card><small>Today's session</small><b>${esc(tn||'Rest day')}</b><small>Not a lifting template. Start a free workout if you want to log something.</small></div>`)
 +`<h3>Other workouts</h3>`+Object.keys(tp).filter(n=>n!==tn).map(n=>`<button class=btn data-a=start data-n="${esc(n)}">${esc(n)}</button>`).join('')+`<button class=btn data-a=start data-n="">Empty workout</button><h3>History (saved on this phone)</h3>`;
 return h+(S.log.slice(-15).reverse().map((l,i)=>{const sets=l.ex.reduce((a,e)=>a+e.s.length,0),vol=l.ex.reduce((a,e)=>a+e.s.reduce((b,s)=>b+(+s.w||0)*(+s.r||0),0),0);
 return`<details class=card><summary><b>${esc(l.tpl)}</b> <small style="display:inline">${l.date} · ${l.dur} min · ${sets} sets · ${Math.round(vol)} kg</small></summary>${l.ex.map(e=>`<small>${esc(e.n)}: ${e.s.map(s=>s.w+'×'+s.r).join(', ')}</small>`).join('')}<button class=btn data-a=logdel data-i="${S.log.length-1-i}">Delete</button></details>`}).join('')||'<small>No workouts yet.</small>')}
function vActive(){const a=S.active;
 return`<h1>${esc(a.tpl)}</h1><small>Elapsed <span id=el></span> · autosaved, tap Finish to add it to history</small><button class="btn pri" data-a=finish>Finish</button><button class=btn data-a=cancel>Cancel</button>`+a.ex.map((e,x)=>{const p=prevOf(e.n,a.tpl),hint=p&&p.length>=e.s.length&&p.every(s=>+s.r>=topOf(e.r));
 return`<div class=card><b>${esc(e.n)}</b> <small style="display:inline">${e.r} reps · rest ${e.rest}s ${hint?'· ↑ add weight':''}</small>
 <div class=set><small>#</small><small>Last ${esc(a.tpl)}</small><small>kg</small><small>reps</small><small>✓</small></div>`+e.s.map((s,i)=>{const q=p&&(p[i]||p[p.length-1]);
 return`<div class=set><small>${i+1}</small><small>${q?q.w+'×'+q.r:'-'}</small><input inputmode=decimal data-c=w data-x=${x} data-s=${i} value="${esc(s.w)}" placeholder="${q?q.w:'kg'}"><input inputmode=numeric data-c=r data-x=${x} data-s=${i} value="${esc(s.r)}" placeholder="${q?q.r:e.r}"><button class="ck ${s.d?'on':''}" data-a=setdone data-x=${x} data-s=${i}></button></div>`}).join('')
 +`<button class=btn data-a=addset data-x=${x}>+ Set</button><button class=btn data-a=rmex data-x=${x}>Remove</button></div>`}).join('')+`<button class=btn data-a=addex>+ Exercise</button>`}

function vFuel(){const t=D(),ml=meals(),P=S.port[t]||{},tot={},tg={};
 ml.forEach(m=>Object.entries(m.t).forEach(([k,v])=>{tg[k]=(tg[k]||0)+v;tot[k]=(tot[k]||0)+Math.min(P[m.n+'.'+k]||0,9)}));
 let h=`<h1>Fuel</h1><div class=card><b>Water</b> ${S.water[t]||0} / ${S.cfg.waterT} ml${bar(S.water[t]||0,S.cfg.waterT)}<button class=btn data-a=water data-v=250>+250</button><button class=btn data-a=water data-v=500>+500</button><button class=btn data-a=water data-v=-250>−250</button>
 <input type=number inputmode=numeric data-c=steps value="${S.steps[t]||''}" placeholder="Steps today (target ${S.cfg.stepsT})"></div>
 <div class=card><b>Daily portions</b><small>Protein ≈ ${S.cfg.pg}g per portion · ${tot.Protein||0} portions ≈ ${(tot.Protein||0)*S.cfg.pg}g (goal ≈ 128g)</small>`
 +Object.keys(tg).map(k=>`<div>${k} ${tot[k]||0}/${tg[k]}${bar(tot[k]||0,tg[k])}</div>`).join('')+`</div>`;
 ml.forEach(m=>{h+=`<div class=card><b>${esc(m.n)}</b><small>Tap to add a portion</small><div class=chips>`+Object.entries(m.t).map(([k,v])=>{const n=P[m.n+'.'+k]||0;return`<button class="${n>v?'over':n>=v?'on':''}" data-a=port data-k="${esc(m.n+'.'+k)}" data-t=${v}>${k} ${n}/${v}</button>`}).join('')+`</div></div>`});
 h+=`<h3>Supplements</h3>`+lines(S.cfg.supps).map(n=>`<div class=row><button class="ck ${S.supp[t]?.[n]?'on':''}" data-a=supp data-n="${esc(n)}"></button><span>${esc(n)}</span></div>`).join('')+`<h3>Body</h3>`+habs('Body');return h}

function vMoney(){const s=monthStats(),inc=+S.cfg.income||0,inv=+S.cfg.invest||0,cs=cats();
 return`<h1>Money</h1><small>${s.mo} · EUR</small><div class=card>Income ${eur(inc)}<br>Auto-invest ${eur(inv)} <button class="ck ${S.paid[s.mo]?'on':''}" data-a=paid style="vertical-align:middle"></button><br>Spent ${eur(s.sp)}<br><b>Left ${eur(inc-inv-s.sp)}</b><small>Set income, invest and category limits in Life › Settings.</small></div>
 <h3>Categories</h3>`+cs.map(c=>{const v=s.by[c.n]||0;return`<div>${esc(c.n)} <small style="display:inline">${eur(v)}${c.l?' / '+eur(c.l):''}</small>${bar(v,c.l)}</div>`}).join('')
 +`<h3>Add expense</h3><div class=card><input id=sa type=number step=0.01 inputmode=decimal placeholder="Amount €"><select id=sc>${cs.map(c=>`<option>${esc(c.n)}</option>`).join('')}</select><input id=sn placeholder="Note"><button class="btn pri" data-a=spend>Add</button></div>
 <h3>This month</h3>`+(s.tx.slice().reverse().map(x=>`<div class=row><span style="flex:1">${esc(x.c)}<small>${x.d} ${esc(x.n)}</small></span><b>${eur(x.a)}</b><button class=btn data-a=txdel data-i="${S.tx.indexOf(x)}">✕</button></div>`).join('')||'<small>Nothing yet.</small>')}

function vMind(){const t=D(),ws=weekStart(t);let h=`<h1>Mind training</h1><small>Meditated today ${S.med[t]||0} min · this week ${wdays(ws).reduce((a,d)=>a+(S.med[d]||0),0)} min</small>`;
 if(B)h+=`<div class=big id=bl></div><div id=bc></div><div class=big id=br style="font-size:28px"></div><button class=btn data-a=bstop>Stop</button>`;
 else h+=seg(Object.keys(PAT).map(k=>[k,k]),bp,'bp')+seg([[3,'3 min'],[5,'5 min'],[10,'10 min']],bd,'bd')+`<button class="btn pri" data-a=bstart>▶ Start breathing</button>`;
 const j=S.jr[t]||{};
 h+=`<h3>3-line journal</h3><input data-c=jr data-k=g value="${esc(j.g)}" placeholder="Gratitude"><input data-c=jr data-k=w value="${esc(j.w)}" placeholder="One win"><input data-c=jr data-k=t value="${esc(j.t)}" placeholder="Tomorrow's #1">
 <h3>Search journal</h3><input data-c=js placeholder="Search..."><div id=jl>${jlist('')}</div><h3>Habits</h3>`+habs('Mind');return h}
const jlist=q=>Object.entries(S.jr).sort().reverse().filter(([d,j])=>(d+(j.g||'')+(j.w||'')+(j.t||'')).toLowerCase().includes(q.toLowerCase())).slice(0,30).map(([d,j])=>`<div class=card><small>${d}</small>🙏 ${esc(j.g)}<br>🏆 ${esc(j.w)}<br>🎯 ${esc(j.t)}</div>`).join('');

function vSkill(d){d=+d||dow(D());const th=themes()[d]||{};
 return`<h1>Skill and money</h1><div class=card><small>${DN[d]} theme</small><b>Learn:</b> ${esc(th.learn)}<br><b>Audio:</b> ${esc(th.audio)}</div><a class="btn pri" href="${esc(th.sp||'https://open.spotify.com')}" target=_blank>▶ Spotify</a><button class=btn data-a=timer data-s=2400 data-l="Learn block">⏱ 40-min learn</button><button class=btn data-a=timer data-s=5400 data-l="Build block">⏱ 90-min build</button>
 <h3>Habits</h3>${habs('Skill')}<h3>Week themes</h3>`+Object.entries(themes()).map(([k,v])=>`<div class=row><b style="width:40px">${DN[k]}</b><span style="flex:1">${esc(v.learn)}<small>🎧 ${esc(v.audio)}</small></span></div>`).join('')}
const vHab=(title,sec,extra='')=>`<h1>${title}</h1>${extra}${habs(sec)}`;

function vWeek(){const t=D(),ws=weekStart(t),mv=S.wmode[ws]==='mvw',r=S.rev[ws]||{};
 let h=`<h1>Week review</h1><small>Targets below follow the week plan you picked on the calendar.</small>`+seg([['','Full week'],['mvw','Minimum week']],S.wmode[ws]||'','wmodeset')+`<h3>Days</h3><div class=chips>`+wdays(ws).map(d=>{const p=Math.round(pct(d)*100),pt=d<=t;return`<button class="${pt&&p>=50?'on':''}" style="${pt&&p<50&&d<t?'background:#4a1d1d':''}">${DN[dow(d)]} ${pt?p+'%':'-'}</button>`}).join('')+`</div><h3>Targets</h3>`;
 lines(S.cfg.wk).forEach(l=>{const[n,c,m,src]=l.split('|').map(x=>x.trim()),tg=+(mv?m:c)||0,v=cnt(src||'x',ws,n);
 h+=`<div>${esc(n)} <small style="display:inline">${v}/${tg}</small>${src==='x'?` <button class=btn data-a=wx data-l="${esc(n)}" data-v=1>+</button><button class=btn data-a=wx data-l="${esc(n)}" data-v=-1>−</button>`:''}<div class=bar><i style="width:${tg?Math.min(100,v/tg*100):0}%"></i></div></div>`});
 return h+`<h3>Notes for next week</h3><textarea data-c=rev placeholder="Money, goals, calendar, what to fix">${esc(r.n)}</textarea><div class=row><button class="ck ${r.done?'on':''}" data-a=revdone></button><span>Review done</span></div>`}

function vWeekend(){const sat=addD(weekStart(D()),5),sun=addD(sat,1);let h='<h1>Weekend</h1><small>These are the Saturday and Sunday routines. Tap one to open it.</small>';
 [[6,sat,'Saturday: move, enjoy, build'],[7,sun,'Sunday: reset and deepen']].forEach(([d,ds,n])=>{h+=`<h3>${n}</h3>`+routines().filter(r=>r.days.includes(d)).map(r=>`<a class=lc href="#/r/${r.id}/${ds}"><b>${r.start} ${esc(r.name)}</b><small>${r.steps.length} steps</small></a>`).join('')});
 return h+`<h3>Weekend habits</h3>${habs('Weekend')}`}

function vTodo(){const t=D(),a=S.todo.map((x,i)=>({...x,i})).sort((p,q)=>(p.done-q.done)||((p.due||'9')<(q.due||'9')?-1:1));
 return`<h1>To-dos</h1><div class=card><input id=ta placeholder="New task"><input id=td type=date><button class="btn pri" data-a=todoadd>Add</button></div>`+a.map(x=>`<div class=row><button class="ck ${x.done?'on':''}" data-a=todotog data-i=${x.i}></button><span style="flex:1;${x.done?'opacity:.4;text-decoration:line-through':''}">${esc(x.t)}<small style="${x.due&&x.due<t&&!x.done?'color:var(--r)':''}">${x.due||''}</small></span><button class=btn data-a=tododel data-i=${x.i}>✕</button></div>`).join('')}

function vLinks(){return`<h1>Google Calendar</h1><small>Your plan lives in this app. To get the events in Google Calendar, import the file below once. Each event contains a link that opens the matching routine here.</small>
 <a class="btn pri" href="https://calendar.google.com/calendar/r" target=_blank>Open Google Calendar</a><button class=btn data-a=ics>Download routines (.ics)</button>
 <h3>Copy a link for any routine</h3>`+routines().map(r=>`<div class=row><span style="flex:1">${r.start} ${esc(r.name)}<small>${r.days.split('').map(d=>DN[d]).join(' ')}</small></span><button class=btn data-a=copy data-v="${base()}#/r/${r.id}">Copy</button></div>`).join('')
 +`<h3>Other links</h3>`+[['Calendar','plan'],['Train','train'],['Fuel','fuel'],['Money','money'],['Mind','mind'],['Skill','skill'],['Week review','week']].map(([n,r])=>`<div class=row><span style="flex:1">${n}</span><button class=btn data-a=copy data-v="${base()}#/${r}">Copy</button></div>`).join('')}

const CF=[['routines','Routines (calendar events)','# name|start|minutes|days 1-7|days in minimum week (blank = same)|essential 1/0|colour 0-360, then steps: title|minutes|link|short version (* = keep, number = minutes, blank = skipped). Links: fuel money mind skill rel meaning train week todo spotify flow:Name. Titles can use {learn} {audio} {train}.'],['flows','Guided flows','# Name, then step|seconds'],['themes','Day themes','day 1-7|learn|audio|train template name|spotify link'],['tpl','Workout templates','# Name, then exercise|sets|reps|rest sec'],['meals','Meals and portions','Meal|Type:n,Type:n'],['supps','Supplements (one per line)',''],['habits','Habits','Section|Name|target per week. Sections: Body, Mind, Skill, Relationships, Meaning, Weekend'],['cats','Budget categories','Name|monthly limit €'],['wk','Weekly targets','label|full|minimum|source: lift steps water med jr rev r:routine-id h:HabitName x(manual)']];
const NF=[['income','Monthly income €'],['invest','Auto-invest €/month'],['waterT','Water target ml'],['stepsT','Steps target'],['stepsMin','Steps minimum'],['pg','Protein g per portion']];
function vSet(){return`<h1>Settings</h1><small>Everything is editable. Use | to separate fields and never use | inside text.</small><h3>Numbers</h3>`+NF.map(([k,l])=>`<small>${l}</small><input type=number inputmode=decimal data-c=num data-k=${k} value="${S.cfg[k]}">`).join('')
 +CF.map(([k,l,h])=>`<h3>${l}</h3><small>${esc(h)}</small><textarea data-c=cfg data-k=${k} rows=8>${esc(S.cfg[k])}</textarea><button class=btn data-a=cfgreset data-k=${k}>Reset to default</button>`).join('')
 +`<h3>Data</h3><button class=btn data-a=export>Export backup (JSON)</button><label class=btn>Import backup<input id=imp type=file accept=".json" hidden></label>`}

function vLife(){const L=(r,t,d)=>`<a class=lc href="#/${r}"><b>${t}</b><small>${d}</small></a>`;
 return`<h1>Life</h1><h3>Grow</h3>`+L('mind','🧘 Mind training','Breathing exercises and your 3-line journal')+L('skill','📚 Skill and money','Today\'s learn theme, podcast link, build blocks')+L('rel','❤️ Relationships and play','Time together, social and humour habits')+L('meaning','🌿 Meaning','Quiet moment, gratitude, nature, service')
 +`<h3>Plan</h3>`+L('week','📊 Week review','Weekly targets, how each day went, notes')+L('weekend','🏖️ Weekend','Saturday and Sunday routines')+L('todo','✅ To-dos','Tasks and due dates')
 +`<h3>Tools</h3>`+L('links','🔗 Google Calendar links','Import your routines into Google Calendar with links back here')+L('set','⚙️ Settings','Edit routines, workouts, meals, budget, targets, backup')}

function vDay(d,w){const i=DN.map(x=>x.toLowerCase()).indexOf(String(d).toLowerCase());return w==='learn'?vSkill(i>0?i:d):w==='train'?vTrain():vPlan()}

/* ---------- actions ---------- */
const A={
view:({v})=>{view=v},gotoday:()=>{sel=D()},wk:({v})=>{sel=addD(sel,+v)},sel:({v})=>{sel=v},
mode:({v})=>{S.mode[sel]=v==='min'?'min':'full'},
wmodeset:({v})=>{S.wmode[weekStart(sel)]=v},
short:({r,d})=>{const s=S.short[d]=S.short[d]||{};s[r]=!s[r]},
stepchk:({r,d,i})=>{const rr=routines().find(x=>x.id===r),s=stepsOf(rr,d)[+i];setDone(d,rr,s,!isDone(d,rr,s))},
stepgo:({r,d,i})=>{stepGo(r,d,+i);return false},
rstart:({r,d})=>{rnext(r,d)},
rstop:()=>{RUN=null;T=null;S.timer=null;wake(false)},
rback:({d})=>{sel=d;location.hash='#/plan';return false},
ctxdone:()=>{const c=S.ctx;if(!c)return;(S.chk[c.d]=S.chk[c.d]||{})[c.k]=1;S.ctx=null;save();location.hash='#/r/'+c.r+'/'+c.d;go();return false},
ctxx:()=>{S.ctx=null},
water:({v})=>{S.water[td()]=Math.max(0,(S.water[td()]||0)+ +v)},
hab:({n})=>{const h=S.hab[td()]=S.hab[td()]||{};h[n]=!h[n]},
supp:({n})=>{const h=S.supp[td()]=S.supp[td()]||{};h[n]=!h[n]},
port:({k,t})=>{const p=S.port[td()]=S.port[td()]||{};p[k]=(p[k]||0)>= +t+1?0:(p[k]||0)+1},
tadd:({s})=>{if(T){T.end+= +s*1e3;if(S.timer)S.timer.end=T.end}},
tskip:()=>{if(T)T.end=Date.now()-1;tick();return false},
timer:({s,l})=>{startTimer(+s,l)},
paid:()=>{const m=td().slice(0,7);S.paid[m]=!S.paid[m]},
spend:()=>{const a=parseFloat($('#sa').value);if(!a)return false;S.tx.push({d:td(),c:$('#sc').value,a,n:$('#sn').value})},
txdel:({i})=>{S.tx.splice(+i,1)},
todoadd:()=>{const t=$('#ta').value.trim();if(!t)return false;S.todo.push({t,due:$('#td').value,done:0})},
todotog:({i})=>{S.todo[+i].done=S.todo[+i].done?0:1},
tododel:({i})=>{S.todo.splice(+i,1)},
wx:({l,v})=>{const w=weekStart(td());S.wx[w]=S.wx[w]||{};S.wx[w][l]=Math.max(0,(S.wx[w][l]||0)+ +v)},
revdone:()=>{const w=weekStart(td());S.rev[w]=S.rev[w]||{};S.rev[w].done=!S.rev[w].done},
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
copy:({v})=>{(navigator.clipboard?.writeText(v)||Promise.reject()).then(()=>alert('Link copied')).catch(()=>prompt('Copy this link',v));return false},
cfgreset:({k})=>{if(confirm('Reset this section to defaults?'))S.cfg[k]=DEF.cfg[k]},
export:()=>{dl('lifeos-backup-'+td()+'.json',JSON.stringify(S),'application/json');return false},
ics:()=>{ics();return false}};
const dl=(n,t,ty)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:ty}));a.download=n;a.click()};
function ics(){const b0=base(),BY=['','MO','TU','WE','TH','FR','SA','SU'],e=s=>s.replace(/[\\;,]/g,'\\$&').replace(/\n/g,'\\n'),hm=m=>{m=Math.min(m,1439);return String(m/60|0).padStart(2,'0')+String(m%60).padStart(2,'0')+'00'},stamp=new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';
 let o='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//LifeOS//EN\r\n';
 routines().forEach(r=>{const ds=[...r.days].map(Number);let a=D();while(!ds.includes(dow(a)))a=addD(a,1);const s=+r.start.slice(0,2)*60+ +r.start.slice(3),link=b0+'#/r/'+r.id,day=a.replace(/-/g,'');
 o+=`BEGIN:VEVENT\r\nUID:${r.id}@lifeos\r\nDTSTAMP:${stamp}\r\nDTSTART:${day}T${hm(s)}\r\nDTEND:${day}T${hm(s+r.dur)}\r\nRRULE:FREQ=WEEKLY;BYDAY=${ds.map(d=>BY[d]).join(',')}\r\nSUMMARY:${e(r.name)}\r\nDESCRIPTION:${e(r.steps.map(x=>'- '+stripE(x.raw)).join('\n')+'\n'+link)}\r\nURL:${link}\r\nEND:VEVENT\r\n`});
 dl('life-os-routines.ics',o+'END:VCALENDAR\r\n','text/calendar')}

const I={
w:el=>{S.active.ex[+el.dataset.x].s[+el.dataset.s].w=el.value},
r:el=>{S.active.ex[+el.dataset.x].s[+el.dataset.s].r=el.value},
steps:el=>{S.steps[td()]=+el.value},
jr:el=>{(S.jr[td()]=S.jr[td()]||{})[el.dataset.k]=el.value},
js:el=>{$('#jl').innerHTML=jlist(el.value)},
rev:el=>{const w=weekStart(td());S.rev[w]=S.rev[w]||{};S.rev[w].n=el.value},
cfg:el=>{S.cfg[el.dataset.k]=el.value},
num:el=>{S.cfg[el.dataset.k]=+el.value}};
document.addEventListener('click',e=>{unlock();const el=e.target.closest('[data-a]');if(!el)return;const f=A[el.dataset.a];if(f&&f(el.dataset,el)!==false){save();go()}});
document.addEventListener('input',e=>{const f=I[e.target.dataset.c];if(f){f(e.target);save()}});
document.addEventListener('change',e=>{if(e.target.id!=='imp')return;const f=e.target.files[0];if(!f)return;f.text().then(t=>{S=load(JSON.parse(t));save();go()}).catch(()=>alert('Invalid backup file'))});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();if(T||B)wake(true)}});

/* ---------- router ---------- */
const V={plan:vPlan,today:vPlan,b:vPlan,train:vTrain,fuel:vFuel,money:vMoney,life:vLife,more:vLife,mind:vMind,skill:vSkill,rel:()=>vHab('Relationships and play','Relationships'),meaning:()=>vHab('Meaning','Meaning',`<button class=btn data-a=timer data-s=900 data-l="Quiet moment">⏱ 15-min quiet</button>`),weekend:vWeekend,week:vWeek,todo:vTodo,links:vLinks,set:vSet,r:vRoutine,run:vRun,day:vDay};
function scrollPlan(){const g=$('.grid');if(!g)return;const n=new Date(),m=sel===D()?n.getHours()*60+n.getMinutes():420;scrollTo(0,g.offsetTop+Math.max(0,m-360-80))}
function go(){const[p,...a]=(location.hash.slice(2)||'plan').split('/');
 if(p==='r'&&S.ctx){S.ctx=null;save()}
 try{$('#v').innerHTML=(V[p]||vPlan)(...a.map(decodeURIComponent))}catch(e){$('#v').innerHTML=`<h1>Error</h1><p>${esc(e.message)}</p><a href="#/set">Open Settings to fix a config</a>`}
 const nav=['plan','today','b',''].includes(p)?'plan':['train','fuel','money'].includes(p)?p:'life';
 document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x.dataset.p===nav));
 const cx=$('#cx');cx.style.display=S.ctx?'flex':'none';document.body.classList.toggle('hascx',!!S.ctx);if(S.ctx)$('#cxl').textContent=S.ctx.label;
 tick();breath()}
addEventListener('hashchange',()=>{scrollTo(0,0);go();scrollPlan()});
setInterval(tick,250);setInterval(breath,100);

/* data safety + silent updates */
try{navigator.storage?.persist?.()}catch(e){}
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!S.active&&!B&&!R)location.reload();had=true})}
save();go();scrollPlan();
