'use strict';
const BUILD='1794070643';
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
const VER=4;
const DEF={v:VER,start:D(),mode:{},wmode:{},short:{},chk:{},water:{},steps:{},port:{},ing:{},z:1,bind:{},notes:{},gcal:{url:'',proxy:'',t:0,evs:[],err:''},supp:{},hab:{},jr:{},med:{},todo:[],log:[],active:null,tx:[],paid:{},rev:{},wx:{},timer:null,ctx:null,
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
🍽️ Tick diet items, water + steps|3|fuel|*
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
 if((o.v||0)<4&&o.cfg){delete o.cfg.diet;delete o.cfg.habits;delete o.cfg.supps;delete o.cfg.wk}
 if((o.v||0)<3&&o.cfg){delete o.cfg.meals;delete o.cfg.wk;if(o.cfg.routines)o.cfg.routines=o.cfg.routines.replace('Log portions, water + steps','Tick diet items, water + steps')}
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
const diet=()=>{const o=[];let c;lines(S.cfg.diet).forEach(l=>{if(l[0]=='#'){const[n,t]=l.slice(1).split('|').map(x=>x.trim());c={n,t:t||'',items:[]};o.push(c)}else if(c){const[n,a,p,cb,f]=l.split('|').map(x=>x.trim());c.items.push({n,a:a||'',p:+p||0,c:+cb||0,f:+f||0})}});return o};
const tot=a=>a.reduce((x,i)=>({p:x.p+i.p,c:x.c+i.c,f:x.f+i.f,k:x.k+i.p*4+i.c*4+i.f*9}),{p:0,c:0,f:0,k:0});
function dietPct(ds){const all=diet().flatMap(m=>m.items.map(i=>m.n+'|'+i.n)),g=S.ing[ds]||{};return all.length?all.filter(k=>g[k]).length/all.length:0}
const cats=()=>lines(S.cfg.cats).map(l=>{const[n,v]=l.split('|');return{n:n.trim(),l:+v||0}});
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
function monthStats(){const mo=D().slice(0,7),tx=S.tx.filter(x=>x.d.startsWith(mo)),by={};tx.forEach(x=>by[x.c]=(by[x.c]||0)+x.a);return{mo,tx,by,sp:tx.reduce((a,x)=>a+x.a,0)}}

/* ---------- warnings ---------- */
function warns(){const w=[],t=D(),y=addD(t,-1),y2=addD(t,-2),ok=d=>d<S.start||pct(d)>=.5;
 if(!ok(y)&&!ok(y2))w.push(['r','Two slipped days in a row. Today is non-negotiable: at least do the Minimum Day.']);
 else if(!ok(y))w.push(['a','Yesterday slipped. Never miss twice. Protect today.']);
 let n=0;for(let i=1;i<=7;i++){const d=addD(t,-i);if(d>=S.start&&mode(d)==='min')n++;else break}
 if(n>=3)w.push(['a',`${n} days in a row on Minimum Day. Fine for a rough patch. Try one full routine today to climb back.`]);
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
const Zv=()=>S.z||1,clampZ=z=>Math.min(4,Math.max(.6,z));
const hmm=m=>String(m/60|0).padStart(2,'0')+':'+String(Math.round(m%60)).padStart(2,'0');
function extOn(ds){const a=new Date(ds+'T00:00').getTime(),b=a+864e5;return(S.gcal.evs||[]).filter(e=>e.s<b&&e.e>a).map(e=>({...e,sm:Math.max(0,(Math.max(e.s,a)-a)/6e4),em:(Math.min(e.e,b)-a)/6e4}))}
const TR='#c0392b';
function todoBar(ds,t){const l=S.todo.map((x,i)=>({...x,i})).filter(x=>x.due&&(x.due===ds||(ds===t&&x.due<ds&&!x.done)));if(!l.length)return'';
 return`<div class=card style="border-left:4px solid ${TR}"><small>To-dos</small>`+l.map(x=>`<div class=row style="padding:6px 0"><button class="ck ${x.done?'on':''}" data-a=todotog data-i=${x.i}></button><span style="flex:1;${x.done?'opacity:.5;text-decoration:line-through':''}">${esc(x.t)}<small style="${x.due<ds&&!x.done?'color:var(--r)':''}">${x.due<ds?'overdue · '+x.due:x.time||'all day'}</small></span></div>`).join('')+`</div>`}
function conflicts(ds){const o=[],xs=extOn(ds).filter(e=>!e.ad);occ(ds).forEach(r=>{const a=+r.start.slice(0,2)*60+ +r.start.slice(3),b=a+r.dur;xs.forEach(y=>{if(a<y.em&&y.sm<b)o.push(`${r.name} (${r.start}) overlaps "${y.t}" (${hmm(y.sm)}-${hmm(y.em)})`)})});return o}
function grid(days){const t=D(),wk=days.length>1,nm=new Date(),nowM=nm.getHours()*60+nm.getMinutes(),z=Zv(),pos=q=>`left:calc(${q.c/q.n*100}% + 1px);width:calc(${100/q.n}% - 2px);top:calc(var(--z)*${q.s-360}px);height:max(calc(var(--z)*${q.e0-q.s}px - 1px),20px)`;
 let gut='';for(let i=0;i<=18;i++){gut+=`<span style="top:calc(var(--z)*${i*60}px)">${String(6+i).padStart(2,'0')}:00</span>`;if(z>=2&&i<18)gut+=`<span style="top:calc(var(--z)*${i*60+30}px);opacity:.6">${String(6+i).padStart(2,'0')}:30</span>`}
 return`<div class="grid ${wk?'wk':''}"><div class=gut>${gut}</div><div class=cols>`
 +days.map(ds=>{const ev=occ(ds).map(r=>{const s=+r.start.slice(0,2)*60+ +r.start.slice(3);return{r,s,e0:s+r.dur,e:Math.max(s+r.dur,s+Math.ceil(22/z))}}),
 tds=S.todo.map((x,i)=>({x,i})).filter(q=>q.x.due===ds&&q.x.time).map(q=>{const s=+q.x.time.slice(0,2)*60+ +q.x.time.slice(3);return{...q,s,e0:s+(q.x.dur||30),e:Math.max(s+(q.x.dur||30),s+Math.ceil(22/z))}}),
 xs=extOn(ds).filter(e=>!e.ad&&e.em>360).map(e=>({x:e,s:Math.max(e.sm,360),e0:e.em,e:Math.max(e.em,e.sm+Math.ceil(22/z))}));
 ev.forEach(q=>{q.cf=xs.some(y=>q.s<y.e0&&y.s<q.e0)});layout([...ev,...xs,...tds]);
 return`<div class=col>`+ev.map(q=>{const r=q.r,st=stepsOf(r,ds),dn=st.filter(s=>isDone(ds,r,s)).length,all=st.length&&dn===st.length;
 return`<a class="ev ${all?'dn':''}" href="#/r/${r.id}/${ds}" style="${pos(q)};background:hsl(${r.hue} 45% 24%);border-color:hsl(${r.hue} 70% 60%)"><b>${all?'✓ ':''}${q.cf?'⚠ ':''}${esc(r.name)}</b>${wk?'':`<br>${r.start} · ${dn}/${st.length}`}</a>`}).join('')
 +tds.map(q=>`<div class="ev ${q.x.done?'dn':''}" data-a=todotog data-i=${q.i} style="${pos(q)};background:${TR};border-color:#ff8a7a"><b>${q.x.done?'✓ ':''}${esc(q.x.t)}</b>${wk?'':`<br>${q.x.time} · ${q.x.dur||30} min`}</div>`).join('')
 +xs.map(q=>`<a class="ev ext" href="#/x/${encodeURIComponent(q.x.t)}/${ds}" style="${pos(q)}"><b>${bnd(q.x.t)?'🔗 ':''}${esc(q.x.t)}</b>${wk?'':`<br>${hmm(q.x.sm)}-${hmm(q.x.em)}`}</a>`).join('')+(ds===t?`<i class=now style="top:calc(var(--z)*${nowM-360}px)"></i>`:'')+`</div>`}).join('')+`</div></div>`}

function minOk(ds){const d=dow(ds);return routines().filter(r=>r.ess&&r.days.includes(d)).every(r=>r.steps.filter(s=>s.short).every(x=>S.chk[ds]?.[key(r,x)]))}
function wsum(ws){const t=D(),ds=wdays(ws).filter(d=>d<=t&&d>=S.start),rows=lines(S.cfg.wk).map(l=>{const[n,c,m,src]=l.split('|').map(x=>x.trim());return{n,c:+c||0,m:+m||0,src:src||'x',v:cnt(src||'x',ws,n),vm:cnt(src||'x',ws,n,true)}});
 return{ds,ok:ds.filter(minOk).length,rows,met:rows.filter(r=>r.c&&r.v>=r.c).length,n:rows.filter(r=>r.c).length}}
let CTA='';
function vPlan(){const t=D(),ws=weekStart(sel),m=mode(sel),g=S.gcal,gon=g.url&&g.proxy;
 let h=`<div class=top><h1>${new Date(sel+'T12:00').toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</h1><div><button class="chip ${view==='day'?'on':''}" data-a=view data-v=day>Day</button> <button class="chip ${view==='week'?'on':''}" data-a=view data-v=week>Week</button> <button class=chip data-a=gotoday>Today</button></div></div>
 <div class=strip><button data-a=wk data-v=-7>‹</button>`+wdays(ws).map(d=>`<button class="dd ${d===sel?'on':''} ${d===t?'td':''}" data-a=sel data-v=${d}><small>${DN[dow(d)]}</small><b>${+d.slice(8)}</b></button>`).join('')+`<button data-a=wk data-v=7>›</button></div>`;
 if(sel===t){h+=warns().map(([k,x])=>`<div class="w ${k}">${esc(x)}</div>`).join('');
  if(!m)h+=`<div class=card><b>How do you feel today?</b><small>This picks your plan for today. You can change it any time.</small><button class="btn pri" data-a=mode data-v=full>💪 Full day</button><button class=btn data-a=mode data-v=min>🪫 Minimum day</button></div>`}
 h+=conflicts(sel).map(x=>`<div class="w a">⚠ ${esc(x)}. Move one of them.</div>`).join('');
 const ad=extOn(sel).filter(e=>e.ad);if(ad.length)h+=`<div class=card><small>All day (Google Calendar)</small>${ad.map(e=>esc(e.t)).join(', ')}</div>`;
 h+=todoBar(sel,t);
 h+=`<div class=card><div class=ctl><span>Day</span>${seg([['full','Full'],['min','Minimum']],m||'full','mode')}</div><small>${m==='min'?'Minimum day: only the essential routines, in short versions. Doing just this counts as a good day.':'Full day: every routine for this day, all steps.'}</small></div>`;
 h+=`<button class=chip data-a=zoom data-v=-1>🔍 −</button> <button class=chip data-a=zoom data-v=1>🔍 +</button> <small style="display:inline">pinch the calendar to zoom</small> `+(gon?`<button class=chip data-a=gsync>↻ Google ${g.t?new Date(g.t).toTimeString().slice(0,5):'not synced'}</button>`:'')+'<br>';
 if(ws<=t){const sm=wsum(ws),past=addD(ws,6)<t,ds=wdays(ws),beh=ds.some(d=>d<t&&d>=S.start&&!minOk(d)),bad=past?sm.ok<7:beh,left=ds.filter(d=>d>=t).length;
  h+=`<a class=card href="#/week/${ws}" style="display:block;color:inherit;text-decoration:none;border-left:4px solid ${bad?'var(--r)':'var(--g)'}"><b>Minimum week · ${sm.ok}/7 days</b> <span style="color:${bad?'var(--r)':'var(--g)'}">${past?(sm.ok===7?'achieved ✓':'missed'):bad?'broken: a minimum day was missed':'on track'}</span><br>`+ds.map(d=>{const f=d>=S.start,ok=f&&minOk(d);return`<span style="display:inline-block;width:13%;text-align:center;font-size:12px"><small style="text-align:center">${DN[dow(d)]}</small>${d>t?'·':ok?'✓':d===t?'○':'✗'}</span>`}).join('')+`<small>${past?'':bad?'You can still do the minimum day on the days left, but this week will not count as minimum.':minOk(t)?'Today\'s minimum day is done.':'Do today\'s minimum day (essential routines, short versions) to stay on track.'}</small></a>`}
 return h+grid(view==='week'?wdays(ws):[sel])}

const LBL={fuel:'Diet',train:'Workout',money:'Budget',mind:'Mind',skill:'Skill',rel:'Relationships',meaning:'Meaning',week:'Weeks',todo:'To-dos'};
function vRoutine(id,ds){ds=ds||D();const r=routines().find(x=>x.id===id);if(!r)return'<p>Routine not found.</p><a href="#/plan">Back</a>';
 const forced=mode(ds)==='min'&&r.ess,sh=isShort(r,ds),st=stepsOf(r,ds),done=st.filter(s=>isDone(ds,r,s)).length,left=st.filter(s=>!isDone(ds,r,s)).reduce((a,s)=>a+s.min,0),
 end=new Date(Date.now()+left*6e4).toTimeString().slice(0,5),cur=st.findIndex(s=>!isDone(ds,r,s)),run=RUN&&RUN.rid===id;
 const e=+r.start.slice(0,2)*60+ +r.start.slice(3)+r.dur,endT=String(Math.min(e,1439)/60|0).padStart(2,'0')+':'+String(Math.min(e,1439)%60).padStart(2,'0');
 const H=`<a href="#/plan" onclick="sel='${ds}'">‹ Calendar</a><h1>${esc(r.name)}</h1><small>${r.start} – ${endT} (${r.dur}m) · ${new Date(ds+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})} · ${done}/${st.length} done</small>
 ${forced?`<span class="dash on">Short version (Minimum day)</span>`:`<button class="dash ${sh?'on':''}" data-a=short data-r="${id}" data-d="${ds}">${sh?'✓ Short version':'+ Short version'}</button>`}`
 +st.map((s,i)=>{const d=isDone(ds,r,s);return`<div class="step ${d?'dn':''} ${i===cur?'cur':''}"><span class=n>${i+1}</span><span class=em>${emo(s.title)}</span><a data-a=stepgo data-r="${id}" data-d="${ds}" data-i=${i}>${esc(stripE(s.title))}${s.link?'<small>'+(s.link.startsWith('flow:')?'Guided flow':s.link==='spotify'?'Opens Spotify':'Opens '+esc(LBL[s.link]||s.link))+' ›</small>':''}</a><span class=mn>${s.min}m</span><button class="ck ${d?'on':''}" data-a=stepchk data-r="${id}" data-d="${ds}" data-i=${i}></button></div>`}).join('')
;CTA=done===st.length&&st.length?`<button class=cta data-a=rback data-d="${ds}">✓ Routine complete · Back to calendar</button>`:run?`<button class=cta data-a=rstop>■ Stop timer</button>`:`<button class=cta data-a=rstart data-r="${id}" data-d="${ds}">▶ Start Timer<br><small style="color:#06251a">Ends at ${end}</small></button>`;return H}

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

function vFuel(){const t=D(),dd=diet(),g=S.ing[t]||{},all=dd.flatMap(m=>m.items.map(i=>({...i,k:m.n+'|'+i.n}))),plan=tot(all),pc=all.filter(i=>g[i.k]).length;
 let h=`<h1>Diet</h1><div class=card><b>${pc}/${all.length}</b> items eaten today<div class=bar><i style="width:${all.length?pc/all.length*100:0}%"></i></div><small>Eat every amount listed and you hit about ${Math.round(plan.p)} g protein, ${Math.round(plan.c)} g carbs and ${Math.round(plan.f)} g fat (≈ ${Math.round(plan.k)} kcal). Tick an item once you've eaten that amount. Edit the plan in More › Settings.</small></div>`;
 dd.forEach(m=>{const mt=tot(m.items),on=m.items.every(i=>g[m.n+'|'+i.n]);h+=`<div class=card><div class=top><b>${esc(m.n)} <small style="display:inline">${esc(m.t)}</small></b><button class=btn data-a=ingall data-m="${esc(m.n)}">${on?'Untick all':'Tick all'}</button></div><small>${Math.round(mt.p)} g protein · ${Math.round(mt.c)} g carbs · ${Math.round(mt.f)} g fat</small>`+m.items.map(i=>`<div class=row><button class="ck ${g[m.n+'|'+i.n]?'on':''}" data-a=ing data-k="${esc(m.n+'|'+i.n)}"></button><span style="flex:1">${esc(i.n)}</span><b>${esc(i.a)}</b></div>`).join('')+`</div>`});
 return h+`<div class=card><b>Water</b> ${S.water[t]||0} / ${S.cfg.waterT} ml${bar(S.water[t]||0,S.cfg.waterT)}<button class=btn data-a=water data-v=250>+250 ml</button><button class=btn data-a=water data-v=500>+500 ml</button><button class=btn data-a=water data-v=-250>−250 ml</button>
 <input type=number inputmode=numeric data-c=steps value="${S.steps[t]||''}" placeholder="Steps today (target ${S.cfg.stepsT})"></div>`}

function vMoney(){const s=monthStats(),inc=+S.cfg.income||0,inv=+S.cfg.invest||0,cs=cats();
 return`<h1>Money</h1><small>${s.mo} · EUR</small><div class=card>Income ${eur(inc)}<br>Auto-invest ${eur(inv)} <button class="btn ${S.paid[s.mo]?'pri':''}" data-a=paid>${S.paid[s.mo]?'✓ Invested this month':'Tap when invested'}</button><br>Spent ${eur(s.sp)}<br><b>Left ${eur(inc-inv-s.sp)}</b><small>Set income, invest and category limits in Life › Settings.</small></div>
 <h3>Categories</h3>`+cs.map(c=>{const v=s.by[c.n]||0;return`<div>${esc(c.n)} <small style="display:inline">${eur(v)}${c.l?' / '+eur(c.l):''}</small>${bar(v,c.l)}</div>`}).join('')
 +`<h3>Add expense</h3><div class=card><input id=sa type=number step=0.01 inputmode=decimal placeholder="Amount €"><select id=sc>${cs.map(c=>`<option>${esc(c.n)}</option>`).join('')}</select><input id=sn placeholder="Note"><small>Date</small><input id=sdt type=date value="${D()}"><button class="btn pri" data-a=spend>Add</button></div>
 <h3>This month</h3><div class=card><b>Total ${eur(s.sp)}</b>${cs.filter(c=>s.by[c.n]).map(c=>`<br>${esc(c.n)} ${eur(s.by[c.n])}`).join('')}</div>`+txByDay(s.tx)+`<h3>Earlier months</h3>`+earlier()}
const txByDay=tx=>{const g={};tx.forEach(x=>(g[x.d]=g[x.d]||[]).push(x));return Object.keys(g).sort().reverse().map(d=>`<h3>${new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})} · ${eur(g[d].reduce((a,x)=>a+x.a,0))}</h3>`+g[d].map(x=>`<div class=row><span style="flex:1">${esc(x.c)}<small>${esc(x.n)}</small></span><b>${eur(x.a)}</b><button class=btn data-a=txdel data-i="${S.tx.indexOf(x)}">✕</button></div>`).join('')).join('')||'<small>Nothing yet.</small>'};
const earlier=()=>{const mo=D().slice(0,7),m={};S.tx.filter(x=>!x.d.startsWith(mo)).forEach(x=>m[x.d.slice(0,7)]=(m[x.d.slice(0,7)]||0)+x.a);return Object.keys(m).sort().reverse().map(k=>`<div class=row><span style="flex:1">${k}</span><b>${eur(m[k])}</b></div>`).join('')||'<small>None.</small>'}

function vMind(){const t=D(),ws=weekStart(t);let h=`<h1>Mind training</h1><small>Meditated today ${S.med[t]||0} min · this week ${wdays(ws).reduce((a,d)=>a+(S.med[d]||0),0)} min</small>`;
 if(B)h+=`<div class=big id=bl></div><div id=bc></div><div class=big id=br style="font-size:28px"></div><button class=btn data-a=bstop>Stop</button>`;
 else h+=`<small>Box breathing: 4 seconds in, 4 hold, 4 out, 4 hold</small>`+seg([[3,'3 min'],[5,'5 min'],[10,'10 min']],bd,'bd')+`<button class="btn pri" data-a=bstart>▶ Start box breathing</button>`;
 const j=S.jr[t]||{};
 return h+`<h3>Today's journal</h3><small>Three short lines, saved automatically.</small><input data-c=jr data-k=g value="${esc(j.g)}" placeholder="One thing I'm grateful for"><input data-c=jr data-k=w value="${esc(j.w)}" placeholder="One win today"><input data-c=jr data-k=t value="${esc(j.t)}" placeholder="Tomorrow's number one">
 <h3>Past entries</h3><input data-c=js placeholder="Search past entries (a word or a date)"><div id=jl>${jlist('')}</div>`}
const jlist=q=>{const t=D(),a=Object.entries(S.jr).filter(([d,j])=>d!==t&&(j.g||j.w||j.t)).sort().reverse().filter(([d,j])=>(d+(j.g||'')+(j.w||'')+(j.t||'')).toLowerCase().includes(q.toLowerCase()));
 return a.length?`<small>${a.length} ${q?'matching ':''}entr${a.length==1?'y':'ies'}${a.length>30?' (latest 30 shown)':''}</small>`+a.slice(0,30).map(([d,j])=>`<div class=card><small>${d}</small>🙏 ${esc(j.g)}<br>🏆 ${esc(j.w)}<br>🎯 ${esc(j.t)}</div>`).join(''):`<small>${q?'No entries match.':'No past entries yet. What you write above shows up here from tomorrow.'}</small>`};

function vSkill(d){d=+d||dow(D());const th=themes()[d]||{};
 return`<h1>Skill and money</h1><div class=card><small>${DN[d]} theme</small><b>Learn:</b> ${esc(th.learn)}<br><b>Audio:</b> ${esc(th.audio)}</div><a class="btn pri" href="${esc(th.sp||'https://open.spotify.com')}" target=_blank>▶ Spotify</a><button class=btn data-a=timer data-s=2400 data-l="Learn block">⏱ 40-min learn</button><button class=btn data-a=timer data-s=5400 data-l="Build block">⏱ 90-min build</button>
 <h3>Week themes</h3>`+Object.entries(themes()).map(([k,v])=>`<div class=row><b style="width:40px">${DN[k]}</b><span style="flex:1">${esc(v.learn)}<small>🎧 ${esc(v.audio)}</small></span></div>`).join('')}
const vNotes=(title,k,hint,extra='')=>`<h1>${title}</h1>${extra}<small>${hint}</small><textarea data-c=note data-k=${k} rows=12 placeholder="Write here...">${esc(S.notes[k])}</textarea>`;

function vWeek(w){const t=D(),cw=weekStart(t),ws=w||cw,sm=wsum(ws),r=S.rev[ws]||{},past=addD(ws,6)<t,fd=d=>new Date(d+'T12:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'});
 let h=`<div class=top><a class=btn href="#/week/${addD(ws,-7)}">‹</a><h2 style="margin:0">${fd(ws)} – ${fd(addD(ws,6))}</h2><a class=btn href="#/week/${addD(ws,7)}">›</a></div>
 <div class=card><b>Minimum week: ${sm.ok}/7 days</b> ${past?(sm.ok===7?'✓ achieved':'✗ missed'):'(in progress)'}<small>Achieved when the Minimum Day was done every day (essential routines, short versions).</small></div>
 <div class=card><b>Full week: ${sm.met}/${sm.n} targets met</b></div><div class=chips>`+wdays(ws).map(d=>{const f=d<=t&&d>=S.start,p=Math.round(pct(d)*100),ok=f&&minOk(d);return`<button class="${ok?'on':''}" style="${f&&!ok&&d<t?'background:#4a1d1d':''}">${DN[dow(d)]} ${f?(ok?'✓ ':'')+p+'%':'-'}</button>`}).join('')+`</div><small>✓ = minimum day done · % = steps done on that day's plan</small><h3>Targets</h3>`;
 sm.rows.forEach(x=>{h+=`<div>${esc(x.n)} <small style="display:inline">${x.v}/${x.c} · minimum ${x.m} ${x.vm>=x.m?'✓':''}</small>${x.src==='x'?` <button class=btn data-a=wx data-w="${ws}" data-l="${esc(x.n)}" data-v=1>+</button><button class=btn data-a=wx data-w="${ws}" data-l="${esc(x.n)}" data-v=-1>−</button>`:''}<div class=bar><i style="width:${x.c?Math.min(100,x.v/x.c*100):0}%"></i></div></div>`});
 h+=`<h3>Notes</h3><textarea data-c=rev data-w="${ws}" placeholder="Money, goals, what to fix next week">${esc(r.n)}</textarea><div class=row><button class="ck ${r.done?'on':''}" data-a=revdone data-w="${ws}"></button><span>Review done</span></div>`;
 h+=`<h3>All weeks</h3>`;for(let x=cw,i=0;x>=weekStart(S.start)&&i<26;x=addD(x,-7),i++){const q=wsum(x),pw=addD(x,6)<t;h+=`<a class=lc href="#/week/${x}" style="padding:10px 14px"><b style="font-size:15px">${fd(x)} – ${fd(addD(x,6))}</b><small>Minimum ${q.ok}/7${pw?(q.ok===7?' ✓':' ✗'):''} · Full ${q.met}/${q.n}</small></a>`}
 return h}

function vTodo(){const t=D(),a=S.todo.map((x,i)=>({...x,i})).sort((p,q)=>(p.done-q.done)||((p.due||'9')<(q.due||'9')?-1:1));
 return`<h1>To-dos</h1><div class=card><input id=ta placeholder="New task"><small>Date (leave empty for no date)</small><input id=td type=date><small>Time (optional; empty = all-day)</small><input id=tt2 type=time><small>Estimated duration</small><select id=tdu><option value=15>15 min</option><option value=30 selected>30 min</option><option value=60>1 hour</option><option value=90>1.5 hours</option><option value=120>2 hours</option></select><button class="btn pri" data-a=todoadd>Add</button><small>Open to-dos also show on the Calendar, in red, on their day.</small></div>`+a.map(x=>`<div class=row><button class="ck ${x.done?'on':''}" data-a=todotog data-i=${x.i}></button><span style="flex:1;${x.done?'opacity:.4;text-decoration:line-through':''}">${esc(x.t)}<small style="${x.due&&x.due<t&&!x.done?'color:var(--r)':''}">${x.due||''}${x.time?' '+x.time:''}</small></span><button class=btn data-a=tododel data-i=${x.i}>✕</button></div>`).join('')}

const bkey=t=>String(t).trim().toLowerCase(),bnd=t=>(S.bind||{})[bkey(t)];
const TG=()=>[...routines().map(r=>['r/'+r.id,r.start+' '+r.name]),['train','Workout'],['fuel','Diet and water'],['money','Budget'],['mind','Mind'],['skill','Skill'],['rel','Relationships'],['meaning','Meaning'],['week','Weeks'],['todo','To-dos']];
const tgName=v=>(TG().find(x=>x[0]===v)||[0,v])[1];
function vExt(t,ds,edit){const b=bnd(t);if(b&&!edit){setTimeout(()=>location.replace('#/'+b),0);return'<p>Opening…</p>'}
 const e=extOn(ds||D()).find(x=>x.t===t),when=e?(e.ad?'All day':hmm(e.sm)+'-'+hmm(e.em)):'';
 return`<a href="#/plan">‹ Calendar</a><h1>${esc(t)}</h1><small>Google Calendar event${when?' · '+when:''}. Read only: nothing is ever written to Google Calendar.</small>
 <h3>Link this event to</h3><small>Applies to every event called "${esc(t)}".</small>`+TG().map(x=>`<div class=row><span style="flex:1">${esc(x[1])}</span><button class="btn ${b===x[0]?'pri':''}" data-a=bind data-t="${esc(t)}" data-v="${x[0]}">${b===x[0]?'✓ Linked':'Link'}</button></div>`).join('')
 +(b?`<button class=btn data-a=unbind data-t="${esc(t)}">Remove link</button> <a class=btn href="#/${b}">Open ${esc(tgName(b))} ›</a>`:'')
 +`<h3>Open it from Google Calendar</h3><small>Copy this link and paste it into the event's description in Google Calendar yourself. Opening it goes straight to the linked page.</small><button class="btn pri" data-a=copy data-v="${base()}#/x/${encodeURIComponent(t)}">Copy link</button>`}
function vLinks(){const g=S.gcal,bs=Object.entries(S.bind||{});
 return`<h1>Google Calendar</h1><small>Read only. Life OS never creates or changes anything in Google Calendar.</small>
 <h3>Show my Google events here</h3>
 <ol style="color:var(--m);font-size:14px;padding-left:18px"><li>Google Calendar (computer) › Settings › your calendar › Integrate calendar › copy "Secret address in iCal format".</li><li>Paste it below, plus your proxy address (see the setup note).</li></ol>
 <input data-c=gc data-k=url value="${esc(g.url)}" placeholder="Secret address in iCal format"><input data-c=gc data-k=proxy value="${esc(g.proxy)}" placeholder="Proxy address, e.g. https://lifeos-cal.yourname.workers.dev/">
 <button class=btn data-a=gsync>↻ Sync now</button><small>${g.t?'Last synced '+new Date(g.t).toTimeString().slice(0,5)+' · '+g.evs.length+' upcoming events':'Not synced yet'}${g.err?' · Error: '+esc(g.err):''}</small>
 <h3>Linked events</h3><small>Tap a grey Google event on the calendar to link it to a routine or page. Linked events show 🔗 and open that page when tapped.</small>`
 +(bs.length?bs.map(([k,v])=>`<div class=row><span style="flex:1">${esc(k)}<small>→ ${esc(tgName(v))}</small></span><a class=btn href="#/xe/${encodeURIComponent(k)}">Change</a></div>`).join(''):'<small>None yet.</small>')
 +`<h3>Copy a link for any routine</h3>`+routines().map(r=>`<div class=row><span style="flex:1">${r.start} ${esc(r.name)}<small>${r.days.split('').map(d=>DN[d]).join(' ')}</small></span><button class=btn data-a=copy data-v="${base()}#/r/${r.id}">Copy</button></div>`).join('')}


const CF=[['routines','Routines (calendar events)','# name|start|minutes|days 1-7|unused, leave blank|essential 1/0|colour 0-360, then steps: title|minutes|link|short version (* = keep, number = minutes, blank = skipped). Links: fuel money mind skill rel meaning train week todo spotify flow:Name. Titles can use {learn} {audio} {train}.'],['flows','Guided flows','# Name, then step|seconds'],['themes','Day themes','day 1-7|learn|audio|train template name|spotify link'],['tpl','Workout templates','# Name, then exercise|sets|reps|rest sec'],['diet','Diet plan','# Meal|time, then: ingredient|amount (g or ml)|protein g|carbs g|fat g. Calories are calculated.'],['cats','Budget categories','Name|monthly limit €'],['wk','Weekly targets','label|full target|minimum target|source: lift steps water diet med jr rev r:routine-id (join several with +) x(manual +/- counter)']];
const NF=[['income','Monthly income €'],['invest','Auto-invest €/month'],['waterT','Water target ml'],['stepsT','Steps target'],['stepsMin','Steps minimum']];
function vSet(){return`<h1>Settings</h1><small>Everything is editable. Use | to separate fields and never use | inside text.</small><h3>Numbers</h3>`+NF.map(([k,l])=>`<small>${l}</small><input type=number inputmode=decimal data-c=num data-k=${k} value="${S.cfg[k]}">`).join('')
 +CF.map(([k,l,h])=>`<h3>${l}</h3><small>${esc(h)}</small><textarea data-c=cfg data-k=${k} rows=8>${esc(S.cfg[k])}</textarea><button class=btn data-a=cfgreset data-k=${k}>Reset to default</button>`).join('')
 +`<h3>Data</h3><button class=btn data-a=export>Export backup (JSON)</button><label class=btn>Import backup<input id=imp type=file accept=".json" hidden></label>`}

function vMore(){const L=(r,t)=>`<a class=lr href="#/${r}"><span>${t}</span><span>›</span></a>`;
 return`<h1>More</h1><h3>Track</h3>`+L('train','🏋️ Workouts')+L('fuel','🍽️ Diet, water, steps')+L('money','💶 Budget')+`<h3>Grow</h3>`+L('mind','🧘 Mind: box breathing, journal')+L('skill','📚 Skill and money')+L('rel','❤️ Relationships and play')+L('meaning','🌿 Meaning')+`<h3>Review and plan</h3>`+L('week','📊 Weeks')+L('todo','✅ To-dos')+`<h3>App</h3>`+L('links','📅 Google Calendar sync')+L('set','⚙️ Settings')+`<div class=row><span>Version ${BUILD}</span><button class=btn data-a=refresh>Update app now</button></div><small>Your data stays on the phone when you update.</small>`}

function vDay(d,w){const i=DN.map(x=>x.toLowerCase()).indexOf(String(d).toLowerCase());return w==='learn'?vSkill(i>0?i:d):w==='train'?vTrain():vPlan()}

/* ---------- actions ---------- */
const A={
view:({v})=>{view=v},gotoday:()=>{sel=D()},wk:({v})=>{sel=addD(sel,+v)},sel:({v})=>{sel=v},
mode:({v})=>{S.mode[sel]=v==='min'?'min':'full'},
short:({r,d})=>{const s=S.short[d]=S.short[d]||{};s[r]=!s[r]},
stepchk:({r,d,i})=>{const rr=routines().find(x=>x.id===r),s=stepsOf(rr,d)[+i];setDone(d,rr,s,!isDone(d,rr,s))},
stepgo:({r,d,i})=>{stepGo(r,d,+i);return false},
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
spend:()=>{const a=parseFloat($('#sa').value);if(!a)return false;S.tx.push({d:$('#sdt').value||td(),c:$('#sc').value,a,n:$('#sn').value})},
txdel:({i})=>{S.tx.splice(+i,1)},
todoadd:()=>{const t=$('#ta').value.trim();if(!t)return false;S.todo.push({t,due:$('#td').value,time:$('#tt2').value,dur:+$('#tdu').value||30,done:0})},
todotog:({i})=>{S.todo[+i].done=S.todo[+i].done?0:1},
tododel:({i})=>{S.todo.splice(+i,1)},
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
bind:({t,v})=>{(S.bind||(S.bind={}))[bkey(t)]=v;save();location.replace('#/'+v);return false},
unbind:({t})=>{delete S.bind[bkey(t)];save()},
copy:({v})=>{(navigator.clipboard?.writeText(v)||Promise.reject()).then(()=>alert('Link copied')).catch(()=>prompt('Copy this link',v));return false},
cfgreset:({k})=>{if(confirm('Reset this section to defaults?'))S.cfg[k]=DEF.cfg[k]},
export:()=>{dl('lifeos-backup-'+td()+'.json',JSON.stringify(S),'application/json');return false},
refresh:async()=>{try{(await navigator.serviceWorker.getRegistrations()).forEach(r=>r.unregister());(await caches.keys()).forEach(k=>caches.delete(k))}catch(e){}location.replace(location.pathname+'?u='+Date.now()+location.hash);return false}};
const dl=(n,t,ty)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:ty}));a.download=n;a.click()};

const I={
w:el=>{S.active.ex[+el.dataset.x].s[+el.dataset.s].w=el.value},
r:el=>{S.active.ex[+el.dataset.x].s[+el.dataset.s].r=el.value},
steps:el=>{S.steps[td()]=+el.value},
jr:el=>{(S.jr[td()]=S.jr[td()]||{})[el.dataset.k]=el.value},
js:el=>{$('#jl').innerHTML=jlist(el.value)},
note:el=>{S.notes[el.dataset.k]=el.value},
gc:el=>{S.gcal[el.dataset.k]=el.value.trim()},
rev:el=>{const w=el.dataset.w;S.rev[w]=S.rev[w]||{};S.rev[w].n=el.value},
cfg:el=>{S.cfg[el.dataset.k]=el.value},
num:el=>{S.cfg[el.dataset.k]=+el.value}};
document.addEventListener('click',e=>{unlock();const el=e.target.closest('[data-a]');if(!el)return;const f=A[el.dataset.a];if(f&&f(el.dataset,el)!==false){save();go()}});
document.addEventListener('input',e=>{const f=I[e.target.dataset.c];if(f){f(e.target);save()}});
document.addEventListener('change',e=>{if(e.target.id!=='imp')return;const f=e.target.files[0];if(!f)return;f.text().then(t=>{S=load(JSON.parse(t));save();go()}).catch(()=>alert('Invalid backup file'))});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();if(T||B)wake(true);gsync(false);chk()}});

/* ---------- router ---------- */
/* Google Calendar read sync (via your own tiny proxy) */
let icalP,gbusy=false;
const loadICAL=()=>window.ICAL?Promise.resolve():icalP||(icalP=new Promise((ok,no)=>{const e=document.createElement('script');e.src='https://cdn.jsdelivr.net/npm/ical.js@1.5.0/build/ical.min.js';e.onload=ok;e.onerror=()=>no(Error('could not load ical.js'));document.head.appendChild(e)}));
function toLocal(t){return t.isDate||!t.zone||t.zone===ICAL.Timezone.localTimezone?new Date(t.year,t.month-1,t.day,t.hour,t.minute,t.second):t.toJSDate()}
function parseICS(txt){const comp=new ICAL.Component(ICAL.parse(txt));comp.getAllSubcomponents('vtimezone').forEach(z=>{try{ICAL.TimezoneService.register(z)}catch(e){}});
 const a=ICAL.Time.fromJSDate(new Date(Date.now()-7*864e5)),b=ICAL.Time.fromJSDate(new Date(Date.now()+70*864e5)),out=[],all=comp.getAllSubcomponents('vevent').map(v=>new ICAL.Event(v)),ms={};
 all.forEach(e=>{if(!e.isRecurrenceException())ms[e.uid]=e});all.forEach(e=>{if(e.isRecurrenceException()&&ms[e.uid])ms[e.uid].relateException(e)});
 const push=(st,en,e)=>{if((e.description||'').includes('#/r/'))return;out.push({t:e.summary||'(no title)',s:toLocal(st).getTime(),e:toLocal(en).getTime(),ad:!!st.isDate})};
 Object.values(ms).forEach(e=>{if(e.isRecurring()){const it=e.iterator();let n,k=0;while((n=it.next())&&k++<800){if(n.compare(b)>0)break;if(n.compare(a)<0)continue;const d=e.getOccurrenceDetails(n);push(d.startDate,d.endDate,d.item)}}else if(e.startDate.compare(b)<=0&&e.endDate.compare(a)>=0)push(e.startDate,e.endDate,e)});
 return out}
async function gsync(force){const g=S.gcal;if(gbusy||!g.url||!g.proxy||(!force&&Date.now()-g.t<9e5))return;gbusy=true;
 try{await loadICAL();const r=await fetch(g.proxy+(g.proxy.includes('?')?'&':'?')+'u='+encodeURIComponent(g.url));if(!r.ok)throw Error('HTTP '+r.status);g.evs=parseICS(await r.text());g.t=Date.now();g.err=''}catch(e){g.err=String(e.message||e)}
 gbusy=false;save();go()}

/* pinch to zoom the calendar time axis */
let pz=null;const pd=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
document.addEventListener('touchstart',e=>{const g=$('.grid');if(g&&e.touches.length===2&&e.target.closest('.grid')){const my=(e.touches[0].clientY+e.touches[1].clientY)/2;pz={d:pd(e.touches),z:Zv(),my,m:(scrollY+my-g.offsetTop)/Zv()}}},{passive:true});
document.addEventListener('touchmove',e=>{if(!pz||e.touches.length!==2)return;e.preventDefault();S.z=clampZ(pz.z*pd(e.touches)/pz.d);document.documentElement.style.setProperty('--z',S.z);scrollTo(0,$('.grid').offsetTop+pz.m*S.z-pz.my)},{passive:false});
document.addEventListener('touchend',e=>{if(pz&&e.touches.length<2){pz=null;save();go()}});

const V={x:(t,d)=>vExt(t,d),xe:(t,d)=>vExt(t,d,1),plan:vPlan,today:vPlan,b:vPlan,train:vTrain,fuel:vFuel,money:vMoney,more:vMore,life:vMore,mind:vMind,skill:vSkill,rel:()=>vNotes('Relationships and play','rel','Date ideas, things to talk about, friends to call, gift ideas. Your time together lives in the calendar routines.'),meaning:()=>vNotes('Meaning','meaning','What matters to you, reflections, gratitude, ways to help others.',`<button class=btn data-a=timer data-s=900 data-l="Quiet moment">⏱ 15-min quiet</button>`),week:vWeek,todo:vTodo,links:vLinks,set:vSet,r:vRoutine,run:vRun,day:vDay};
const SUB=['train','fuel','money','mind','skill','rel','meaning','week','todo','links','set'];
function scrollPlan(){const g=$('.grid');if(!g)return;const n=new Date(),m=sel===D()?n.getHours()*60+n.getMinutes():420;scrollTo(0,g.offsetTop+Math.max(0,m-360-80))}
function go(){const[p,...a]=(location.hash.slice(2)||'plan').split('/'),v=$('#v'),st=scrollY;CTA='';document.documentElement.style.setProperty('--z',Zv());
 if(p==='r'&&S.ctx){S.ctx=null;save()}
 try{v.innerHTML=(SUB.includes(p)?'<a href="#/more">‹ More</a>':'')+(V[p]||vPlan)(...a.map(decodeURIComponent))}catch(e){v.innerHTML=`<h1>Error</h1><p>${esc(e.message)}</p><a href="#/set">Open Settings to fix a config</a>`}
 scrollTo(0,st);$('#ctaw').innerHTML=CTA;
 const nav=['plan','today','b','r','run','day'].includes(p)?'plan':'more';
 document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x.dataset.p===nav));
 $('#cx').style.display=S.ctx?'flex':'none';if(S.ctx)$('#cxl').textContent=S.ctx.label;
 tick();breath()}
addEventListener('hashchange',()=>{go();scrollTo(0,0);scrollPlan()});
setInterval(tick,250);setInterval(breath,100);

/* data safety + silent updates */
try{navigator.storage?.persist?.()}catch(e){}
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(()=>{});let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!S.active&&!B&&!R)location.reload();had=true})}
async function chk(){try{const j=await(await fetch('version.json?'+Date.now(),{cache:'no-store'})).json();if(BUILD!=='dev'&&j.b&&j.b!==BUILD&&!location.search.includes('u='+j.b)&&!S.active&&!B&&!R&&!T)location.replace(location.pathname+'?u='+j.b+location.hash)}catch(e){}}
save();go();scrollPlan();gsync(false);chk();
