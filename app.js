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
const DN=['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const base=()=>location.origin+location.pathname;

/* ---------- defaults (everything below is editable in Settings) ---------- */
const DEF={start:D(),mode:{},wmode:{},chk:{},water:{},steps:{},port:{},supp:{},hab:{},jr:{},med:{},todo:[],log:[],active:null,tx:[],paid:{},rev:{},wx:{},timer:null,
cfg:{
income:0,invest:0,waterT:2500,stepsT:10000,stepsMin:8000,pg:20,
mvd:`Water + morning light
10 min mobility
Protein breakfast
SPF on
20-min walk
5 min breathing
Bed on time`,
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
Skill|Learn block|4
Skill|Commute audio|5
Skill|Weekend build block|1
Skill|Auto-invest running|1
Relationships|Phone-free time with girlfriend|5
Relationships|Date night|1
Relationships|Social / humour activity|2
Relationships|Joke or funny story|5
Relationships|Call family or friend|3
Meaning|Quiet moment|7
Meaning|Gratitude|7
Meaning|Nature time|1
Meaning|Service / kindness|1
Weekend|Meal prep|1
Weekend|Add training days to calendar|1
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
Learn blocks|4|3|h:Learn block
Commute audio days|5|5|h:Commute audio
Cardio sessions (Zone 2 / VO2)|3|1|x
Date night|1|1|h:Date night
Social / humour|2|1|h:Social / humour activity
Nature / quiet time|1|1|h:Nature time
Weekly review done|1|1|rev`,
blocks:`07:00|morning|Wake|500ml water + pinch of salt. Curtains open, 5 min of light. No phone.|Water + 5 min light|12345|
07:05|morning|Lymph and mobility (25 min)|Dry brush 3 min (optional), 2 min jumping jacks, 15 min flow, 3 min legs up the wall.|10 min mobility|12345|Dry brush:180;Jumping jacks:120;Cat-cow:120;World's greatest stretch:150;90/90 hips:150;Thoracic rotations:120;Band shoulder dislocates:120;Deep squat hold:120;Legs up the wall + belly breathing:180
07:30|morning|Breakfast|40g+ protein (eggs, skyr), oats, berries, banana. Creatine, vitamin D, omega-3.|Protein breakfast|12345|
07:50|morning|Shower, skin, hair|30-60s cold finish. Cleanser, moisturiser, SPF 50 on face, neck, ears, hands.|SPF on|12345|
08:15|morning|Prep|Pack lunch and gym bag. Leave 08:25.||12345|
08:30|morning|Commute + audio|Walk, stand on the tram. Listen to the audio theme of the day.|Commute audio|12345|
09:00|midday|Deep work|Hardest task first, 90 min. Move 3 min every hour. Caffeine stops 13:00.||12345|
12:30|midday|Lunch + sun walk|Protein, veg, carb. Walk 20 min outside, last 10 min read or call a friend.|20-min walk|12345|
13:30|afternoon|Work + movement|Stand hourly, 15 calf raises or squats. 15:30 fruit + protein snack + water.||12345|
17:00|afternoon|Commute home|Decompress. Call family or friend, or audio. No doomscrolling.||12345|
17:30|evening|Dinner|Batch-prepped: 40-50g protein, rice or potato, lots of veg, olive oil.||12345|
18:45|evening|Training (75 min)|Today's session: open Train. Warm up 10 min, lift hard, cool down.|MVW: 45 min full body (Mon/Wed/Fri)|12345|
20:00|evening|Shower + refuel|Protein snack if short of your target.||1234|
20:00|evening|Date night|From 20:00 with your girlfriend.|Date night|5|
20:20|evening|Learn block (40 min)|Theme of the day: open Skill.|30 min focused learning|1234|
21:00|evening|Girlfriend time (60 min)|Phone-free. Talk, cook tomorrow's lunch, walk, affection.|Phone-free time|1234|
22:00|night|Digital sunset|Dim lights. Cleanser, moisturiser, retinoid 3 nights. Prep clothes and bag, write tomorrow's top 3.||12345|
22:20|night|Wind-down|10 min breathwork, 3-line journal, 10 min paper book, magnesium. Room 18°C.|5 min breathing|12345|
22:45|night|Lights out|Asleep by 23:00. Phone outside the bedroom.|Bed on time|12345|
08:00|morning|Wake (Sat)|Water, morning light, 15 min mobility.|Water + light|6|
08:45|morning|Big protein breakfast||Protein breakfast|6|
09:30|morning|VO2 session (45 min)|10 min warm-up, 4x4 min hard with 3 min easy between. The one hard cardio of the week.|45 min hike/swim/bike|6|Warm-up:600;Hard 1:240;Easy:180;Hard 2:240;Easy:180;Hard 3:240;Easy:180;Hard 4:240;Cool-down:300
10:30|morning|Shower and refuel|||6|
11:00|midday|Quality time|Beach, market, coffee or day trip with your girlfriend. SPF on face.|Quality time|6|
13:00|midday|Lunch|Social or a nice meal out.||6|
14:00|afternoon|Build block (90 min)|Side project, business, investing research or course. The rich block.|30 min build|6|
16:00|afternoon|Free time|Friends, sport, beach, late-afternoon tan session.||6|
18:00|evening|Cook dinner together|Or dinner out with friends.||6|
20:00|evening|Fun|Friends, live music, comedy. 2 drinks or fewer.||6|
23:30|night|Sleep (Sat)|Up to an hour later than weekdays.|Bed on time|6|
08:30|morning|Wake (Sun)|Water, light, mobility.|Water + light|7|
09:30|morning|Long Zone 2 + spiritual hour|60-90 min coastal walk, hike or swim with your girlfriend. 15 min silence, gratitude or meditation.|45 min walk|7|
12:00|midday|Brunch|||7|
13:00|midday|Recovery (45 min)|Sauna or contrast shower, foam rolling, stretching.||7|
14:00|afternoon|Weekly review (45 min)|Review budget, auto-invest, goals, calendar. Add training days to calendar.|15 min review|7|
14:45|afternoon|Relationship check-in (20 min)|What went well, what you each need, what to plan.||7|
15:15|afternoon|Meal prep (90 min)|Protein, carb base and veg for Mon-Wed.||7|
17:00|afternoon|Free time|Family and friends call, hobby, or nothing.||7|
18:00|evening|Early dinner|||7|
19:00|evening|Optional easy lift|30 min easy lift, or skip.||7|
21:00|night|Wind down (Sun)|Light skin routine, read, set up Monday.|5 min breathing|7|
22:30|night|Sleep (Sun)|Earlier, to protect Monday.|Bed on time|7|`
}};
let S;try{S=JSON.parse(localStorage.lifeos1)}catch(e){}
S=Object.assign(structuredClone(DEF),S||{});S.cfg=Object.assign({},DEF.cfg,S.cfg);
const save=()=>{try{localStorage.lifeos1=JSON.stringify(S)}catch(e){}};

/* ---------- parsers ---------- */
const blocks=()=>lines(S.cfg.blocks).map(l=>{const[p,g,t,d,m,days,st]=l.split('|').map(x=>x.trim());const dy=days||'1234567';
 return{id:p.replace(':','')+'-'+slug(t||'x')+'-'+dy,time:p,g:g||'',t:t||'',d:d||'',m:m||'',days:dy,
 steps:(st||'').split(';').filter(Boolean).map(x=>{const i=x.lastIndexOf(':');return[x.slice(0,i),+x.slice(i+1)||60]})}}).sort((a,b)=>a.time<b.time?-1:a.time>b.time?1:0);
const themes=()=>Object.fromEntries(lines(S.cfg.themes).map(l=>{const[d,learn,audio,train,sp]=l.split('|').map(x=>x.trim());return[+d,{learn,audio,train,sp}]}));
const tpls=()=>{const o={};let c;lines(S.cfg.tpl).forEach(l=>{if(l[0]=='#'){c=l.slice(1).trim();o[c]=[]}else if(c){const[n,s,r,rest]=l.split('|').map(x=>x.trim());o[c].push({n,s:+s||3,r:r||'8-12',rest:+rest||90})}});return o};
const meals=()=>lines(S.cfg.meals).map(l=>{const[n,t]=l.split('|');return{n:n.trim(),t:Object.fromEntries((t||'').split(',').filter(Boolean).map(x=>{const[k,v]=x.split(':');return[k.trim(),+v||0]}))}});
const cats=()=>lines(S.cfg.cats).map(l=>{const[n,v]=l.split('|');return{n:n.trim(),l:+v||0}});
const mode=ds=>S.mode[ds]||null;
const its=(ds,m)=>m==='mvd'?lines(S.cfg.mvd).map((t,i)=>({id:'mvd'+i,t})):blocks().filter(b=>b.days.includes(dow(ds))&&(m!=='mvr'||b.m)).map(b=>({id:b.id,t:b.t,b}));
const pct=ds=>{const it=its(ds,mode(ds)||'complete');if(!it.length)return 0;const c=S.chk[ds]||{};return it.filter(i=>c[i.id]).length/it.length};
const prevOf=n=>{for(let i=S.log.length-1;i>=0;i--){const e=S.log[i].ex.find(x=>x.n===n);if(e&&e.s.length)return e.s}return null};
const topOf=r=>+String(r).split('-').pop()||0;

function cnt(src,ws,lab){const ds=wdays(ws),mv=S.wmode[ws]==='mvw';
 if(src==='lift')return S.log.filter(l=>l.date>=ws&&l.date<=ds[6]).length;
 if(src==='steps')return ds.filter(d=>(S.steps[d]||0)>=(mv?S.cfg.stepsMin:S.cfg.stepsT)).length;
 if(src==='water')return ds.filter(d=>(S.water[d]||0)>=S.cfg.waterT).length;
 if(src==='med')return ds.filter(d=>S.med[d]>0).length;
 if(src==='jr')return ds.filter(d=>S.jr[d]&&(S.jr[d].g||S.jr[d].w||S.jr[d].t)).length;
 if(src==='rev')return S.rev[ws]?.done?1:0;
 if(src[0]==='h')return ds.filter(d=>S.hab[d]?.[src.slice(2)]).length;
 return(S.wx[ws]||{})[lab]||0}

function monthStats(){const mo=D().slice(0,7),tx=S.tx.filter(x=>x.d.startsWith(mo)),by={};tx.forEach(x=>by[x.c]=(by[x.c]||0)+x.a);return{mo,tx,by,sp:tx.reduce((a,x)=>a+x.a,0)}}

/* ---------- warnings ---------- */
function warns(){const w=[],t=D(),y=addD(t,-1),y2=addD(t,-2),ok=d=>d<S.start||pct(d)>=.5;
 if(!mode(t))w.push(['i','Do your morning check-in to pick today\'s mode.']);
 if(!ok(y)&&!ok(y2))w.push(['r','Two slipped days in a row. Today is non-negotiable: do at least the Minimum Day.']);
 else if(!ok(y))w.push(['a','Yesterday slipped. Never miss twice. Protect today.']);
 let n=0;for(let i=1;i<=7;i++){const d=addD(t,-i);if(d>=S.start&&mode(d)==='mvd')n++;else break}
 if(n>=3)w.push(['a',`${n} days in Minimum Day. Fine for a rough patch. Pick one Complete block today to climb back.`]);
 const ws=weekStart(t),dw=dow(t),L=cnt('lift',ws),mv=S.wmode[ws]==='mvw';
 if(ws>=S.start||dw>2){if(dw>=3&&L===0)w.push(['r','No workout logged this week yet.']);else if(dw>=5&&L<(mv?2:3))w.push(['a',`Only ${L} workout${L==1?'':'s'} logged this week.`])}
 if(S.steps[y]!==undefined&&S.steps[y]<S.cfg.stepsMin)w.push(['a',`Yesterday's steps: ${S.steps[y]} (min ${S.cfg.stepsMin}).`]);
 const pw=addD(ws,-7);if(dw===1&&pw>=S.start&&!S.rev[pw]?.done)w.push(['a','Sunday review not done. Do it before the week gets away.']);
 const ms=monthStats();cats().forEach(c=>{if(c.l&&(ms.by[c.n]||0)>c.l)w.push(['a',`Over budget: ${c.n} (${eur(ms.by[c.n])} / ${eur(c.l)}).`])});
 return w}

/* ---------- timers ---------- */
let T=S.timer&&S.timer.end>Date.now()?{...S.timer}:null,R=null,B=null,WL=null,AC=null,bp='Box',bd=5,cd=dow(D());
function unlock(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume()}catch(e){}}
function beep(n=2){try{for(let i=0;i<n;i++){const o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.frequency.value=880;g.gain.value=.25;o.start(AC.currentTime+i*.3);o.stop(AC.currentTime+i*.3+.15)}}catch(e){}try{navigator.vibrate?.([200,100,200])}catch(e){}}
async function wake(on){try{if(on&&!WL){WL=await navigator.wakeLock.request('screen');WL.addEventListener('release',()=>WL=null)}else if(!on&&WL){WL.release();WL=null}}catch(e){}}
function startTimer(sec,label,cb){T={end:Date.now()+sec*1e3,total:sec,label,cb};S.timer=cb?null:{end:T.end,total:sec,label};save();unlock();wake(true);tick()}
function tick(){const b=$('#tb'),el=$('#el');if(el&&S.active)el.textContent=fmt(Math.floor((Date.now()-S.active.t0)/1e3));
 if(!T){b.style.display='none';return}
 const left=Math.ceil((T.end-Date.now())/1e3);
 if(left<=0){const t=T;T=null;S.timer=null;save();beep(2);t.cb?.();if(!T){wake(false);b.style.display='none'}return}
 b.style.display='flex';$('#tl').textContent=T.label;$('#tt').textContent=fmt(left);const big=$('#big');if(big)big.textContent=fmt(left)}
function breath(){if(!B)return;const el=(Date.now()-B.start)/1e3;
 if(el>=B.dur*60)return bend(true);
 const ph=PAT[B.pat],cyc=ph.reduce((a,p)=>a+p[1],0);let x=el%cyc,k=0;while(x>=ph[k][1]){x-=ph[k][1];k++}
 const[n,d]=ph[k],f=x/d,pv=ph[(k+ph.length-1)%ph.length][0];
 const sc=n==='Inhale'?.6+.35*f:n==='Top-up'?.95+.05*f:n==='Exhale'?1-.4*f:(pv==='Exhale'?.6:1);
 const bl=$('#bl');if(bl){bl.textContent=n+' '+Math.ceil(d-x);$('#bc').style.transform=`scale(${sc})`;$('#br').textContent=fmt(Math.ceil(B.dur*60-el))}}
function bend(full){const m=full?B.dur:Math.floor((Date.now()-B.start)/6e4);B=null;wake(false);if(m>0){S.med[D()]=(S.med[D()]||0)+m;(S.hab[D()]=S.hab[D()]||{})['Meditate / breathe']=1}save();if(full)beep(3);go()}
const PAT={Box:[['Inhale',4],['Hold',4],['Exhale',4],['Hold',4]],'Physiological sigh':[['Inhale',2],['Top-up',1],['Exhale',6]],'4-7-8':[['Inhale',4],['Hold',7],['Exhale',8]]};
function runStep(){const[n,s]=R.steps[R.i];startTimer(s,n,()=>{R.i++;if(R.i<R.steps.length)runStep();else{(S.chk[D()]=S.chk[D()]||{})[R.id]=1;R=null;save();location.hash='#/today'}go()})}

/* ---------- views ---------- */
const seg=(opts,cur,act,key)=>`<div class=seg>`+opts.map(([k,l])=>`<button class="${cur===k?'on':''}" data-a=${act} data-${key}="${k}">${l}</button>`).join('')+`</div>`;
const bar=(v,t)=>`<div class=bar><i class="${v>t&&t?'o':''}" style="width:${t?Math.min(100,v/t*100):0}%"></i></div>`;
function habs(sec){const t=D(),ws=weekStart(t);return lines(S.cfg.habits).map(l=>l.split('|').map(x=>x.trim())).filter(a=>a[0]===sec).map(([_,n,tg])=>{const c=wdays(ws).filter(d=>S.hab[d]?.[n]).length;
 return`<div class=row><button class="ck ${S.hab[t]?.[n]?'on':''}" data-a=hab data-n="${esc(n)}"></button><span style="flex:1">${esc(n)}</span><small style="width:auto">${c}/${tg||7} this week</small></div>`}).join('')}

function vToday(){const t=D(),m=mode(t),th=themes()[dow(t)]||{},ws=weekStart(t),c=S.chk[t]||{};
 const it=its(t,m||'complete'),done=it.filter(i=>c[i.id]).length,p=it.length?Math.round(done/it.length*100):0;
 const now=new Date().toTimeString().slice(0,5);let cur=-1;it.forEach((i,k)=>{if(i.b&&i.b.time<=now)cur=k});
 let h=`<h1>${new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'})}</h1><a class=chip data-a=wmode>Week: ${S.wmode[ws]==='mvw'?'Minimum (MVW)':'Complete'} ⇄</a> <a class=chip href="#/week">Week review</a>`
 +warns().map(([k,x])=>`<div class="w ${k}">${esc(x)}</div>`).join('');
 h+=m?seg([['complete','Complete'],['mvr','Min routine'],['mvd','Min day']],m,'mode','m')
 :`<div class=card><b>Morning check-in</b><small>How do you feel right now?</small><button class="btn pri" data-a=mode data-m=complete>💪 Great: Complete</button><button class=btn data-a=mode data-m=mvr>😐 Meh: Min routine</button><button class=btn data-a=mode data-m=mvd>🪫 Low: Min day</button></div>`;
 h+=`<div class=card><b>${done}/${it.length}</b> done (${p}%)<div class=bar><i style="width:${p}%"></i></div></div>
 <div class=card><b>Learn:</b> ${esc(th.learn)}<br><b>Audio:</b> ${esc(th.audio)} <a href="${esc(th.sp||'https://open.spotify.com')}" target=_blank>▶ Spotify</a><br><b>Train:</b> <a href="#/train">${esc(th.train)}</a></div>
 <div class=card><b>Water</b> ${S.water[t]||0} / ${S.cfg.waterT} ml${bar(S.water[t]||0,S.cfg.waterT)}<button class=btn data-a=water data-v=250>+250</button><button class=btn data-a=water data-v=500>+500</button><button class=btn data-a=water data-v=-250>−250</button>
 <input type=number inputmode=numeric data-c=steps value="${S.steps[t]||''}" placeholder="Steps today (target ${S.cfg.stepsT})"></div>`;
 let g='';it.forEach((i,k)=>{const b=i.b;if(b&&b.g!==g){g=b.g;h+=`<h3>${esc(g)}</h3>`}
 h+=`<div class="row ${k===cur?'cur':''}"><button class="ck ${c[i.id]?'on':''}" data-a=chk data-id="${i.id}"></button>${b?`<a href="#/b/${i.id}"><b>${b.time} ${esc(b.t)}</b><small>${esc(((m==='mvr'?b.m:b.d)||'').slice(0,90))}</small></a>`:`<span style="flex:1">${esc(i.t)}</span>`}</div>`});
 return h}

const LK=[[/training/i,'#/train','Open Train'],[/learn/i,'#/skill','Open Skill'],[/wind-down|breath/i,'#/mind','Open Mind'],[/breakfast|lunch|dinner|brunch|refuel/i,'#/fuel','Log meals'],[/review/i,'#/week','Weekly review'],[/girlfriend|date night|relationship/i,'#/rel','Relationships'],[/spiritual/i,'#/meaning','Meaning'],[/build/i,'#/skill','Skill and money']];
function vBlock(id){const b=blocks().find(x=>x.id===id);if(!b)return'<p>Block not found.</p><a href="#/today">Back</a>';
 const on=S.chk[D()]?.[id],link=base()+'#/b/'+id,l=LK.find(([r])=>r.test(b.t+' '+b.d));
 return`<a href="#/today">← Today</a><h1>${esc(b.t)}</h1><small>${b.time} · ${esc(b.g)} · days ${b.days}</small><div class=card>${esc(b.d)||'-'}</div>${b.m?`<div class=card><small>Minimum version</small>${esc(b.m)}</div>`:''}
 <button class="btn pri" data-a=chk data-id="${id}">${on?'✓ Done today':'Mark done'}</button>
 ${b.steps.length?`<button class=btn data-a=runstart data-id="${id}">▶ Guided run (${fmt(b.steps.reduce((a,s)=>a+s[1],0))})</button>`:''}
 ${l?`<a class=btn href="${l[1]}">${l[2]}</a>`:''}<button class=btn data-a=copy data-v="${link}">Copy deep link</button>`}

function vRun(){if(!R)return'<p>No guided run active.</p><a href="#/today">Back</a>';const s=R.steps;
 return`<small>Step ${R.i+1} / ${s.length}</small><h1>${esc(s[R.i][0])}</h1><div class=big id=big>${fmt(s[R.i][1])}</div>
 <button class=btn data-a=runback>◀ Back</button><button class="btn pri" data-a=tskip>Next ▶</button><button class=btn data-a=runstop>Stop</button>
 <h3>Up next</h3>`+s.slice(R.i+1).map(x=>`<div class=row><span style="flex:1">${esc(x[0])}</span><small style="width:auto">${fmt(x[1])}</small></div>`).join('')}

function vTrain(){if(S.active)return vActive();const th=themes()[dow(D())]||{},tp=tpls();
 return`<h1>Train</h1><small>Today: ${esc(th.train||'-')}</small>`+Object.keys(tp).map(n=>`<button class="btn ${n===th.train?'pri':''}" data-a=start data-n="${esc(n)}">${esc(n)}</button>`).join('')+`<button class=btn data-a=start data-n="">Empty workout</button>
 <h3>History</h3>`+(S.log.slice(-10).reverse().map((l,i)=>{const sets=l.ex.reduce((a,e)=>a+e.s.length,0),vol=l.ex.reduce((a,e)=>a+e.s.reduce((b,s)=>b+(+s.w||0)*(+s.r||0),0),0);
 return`<div class=row><span style="flex:1"><b>${esc(l.tpl)}</b><small>${l.date} · ${l.dur} min · ${sets} sets · ${Math.round(vol)} kg</small></span><button class=btn data-a=logdel data-i="${S.log.length-1-i}">✕</button></div>`}).join('')||'<small>No workouts yet.</small>')}
function vActive(){const a=S.active;
 return`<h1>${esc(a.tpl)}</h1><small>Elapsed <span id=el></span></small><button class="btn pri" data-a=finish>Finish</button><button class=btn data-a=cancel>Cancel</button>`+a.ex.map((e,x)=>{const p=prevOf(e.n),hint=p&&p.length>=e.s.length&&p.every(s=>+s.r>=topOf(e.r));
 return`<div class=card><b>${esc(e.n)}</b> <small style="display:inline">${e.r} reps · rest ${e.rest}s ${hint?'· ↑ add weight':''}</small>
 <div class=set><small>#</small><small>Previous</small><small>kg</small><small>reps</small><small>✓</small></div>`+e.s.map((s,i)=>{const q=p&&(p[i]||p[p.length-1]);
 return`<div class=set><small>${i+1}</small><small>${q?q.w+'×'+q.r:'-'}</small><input inputmode=decimal data-c=w data-x=${x} data-s=${i} value="${esc(s.w)}" placeholder="${q?q.w:'kg'}"><input inputmode=numeric data-c=r data-x=${x} data-s=${i} value="${esc(s.r)}" placeholder="${q?q.r:e.r}"><button class="ck ${s.d?'on':''}" data-a=setdone data-x=${x} data-s=${i}></button></div>`}).join('')
 +`<button class=btn data-a=addset data-x=${x}>+ Set</button><button class=btn data-a=rmex data-x=${x}>Remove</button></div>`}).join('')+`<button class=btn data-a=addex>+ Exercise</button>`}

function vFuel(){const t=D(),ml=meals(),P=S.port[t]||{},tot={},tg={};
 ml.forEach(m=>Object.entries(m.t).forEach(([k,v])=>{tg[k]=(tg[k]||0)+v;tot[k]=(tot[k]||0)+Math.min(P[m.n+'.'+k]||0,9)}));
 let h=`<h1>Fuel</h1><div class=card><b>Water</b> ${S.water[t]||0} / ${S.cfg.waterT} ml${bar(S.water[t]||0,S.cfg.waterT)}<button class=btn data-a=water data-v=250>+250</button><button class=btn data-a=water data-v=500>+500</button><button class=btn data-a=water data-v=-250>−250</button></div>
 <div class=card><b>Daily portions</b><small>Protein ≈ ${S.cfg.pg}g per portion · ${tot.Protein||0} portions ≈ ${(tot.Protein||0)*S.cfg.pg}g (goal ≈ ${Math.round(64*2)}g)</small>`
 +Object.keys(tg).map(k=>`<div>${k} ${tot[k]||0}/${tg[k]}${bar(tot[k]||0,tg[k])}</div>`).join('')+`</div>`;
 ml.forEach(m=>{h+=`<div class=card><b>${esc(m.n)}</b><small>Tap to add a portion</small><div class=chips>`+Object.entries(m.t).map(([k,v])=>{const n=P[m.n+'.'+k]||0;return`<button class="${n>v?'over':n>=v?'on':''}" data-a=port data-k="${esc(m.n+'.'+k)}" data-t=${v}>${k} ${n}/${v}</button>`}).join('')+`</div></div>`});
 h+=`<h3>Supplements</h3>`+lines(S.cfg.supps).map(n=>`<div class=row><button class="ck ${S.supp[t]?.[n]?'on':''}" data-a=supp data-n="${esc(n)}"></button><span>${esc(n)}</span></div>`).join('')+`<h3>Body</h3>`+habs('Body');return h}

function vMoney(){const s=monthStats(),inc=+S.cfg.income||0,inv=+S.cfg.invest||0,cs=cats();
 return`<h1>Money</h1><small>${s.mo} · EUR</small><div class=card>Income ${eur(inc)}<br>Auto-invest ${eur(inv)} <button class="ck ${S.paid[s.mo]?'on':''}" data-a=paid style="vertical-align:middle"></button><br>Spent ${eur(s.sp)}<br><b>Left ${eur(inc-inv-s.sp)}</b></div>
 <h3>Categories</h3>`+cs.map(c=>{const v=s.by[c.n]||0;return`<div>${esc(c.n)} <small style="display:inline">${eur(v)}${c.l?' / '+eur(c.l):''}</small>${bar(v,c.l)}</div>`}).join('')
 +`<h3>Add expense</h3><div class=card><input id=sa type=number step=0.01 inputmode=decimal placeholder="Amount €"><select id=sc>${cs.map(c=>`<option>${esc(c.n)}</option>`).join('')}</select><input id=sn placeholder="Note"><button class="btn pri" data-a=spend>Add</button></div>
 <h3>This month</h3>`+(s.tx.slice().reverse().map(x=>`<div class=row><span style="flex:1">${esc(x.c)}<small>${x.d} ${esc(x.n)}</small></span><b>${eur(x.a)}</b><button class=btn data-a=txdel data-i="${S.tx.indexOf(x)}">✕</button></div>`).join('')||'<small>Nothing yet.</small>')}

function vMind(){const t=D(),ws=weekStart(t);let h=`<h1>Mind</h1><small>Meditated today ${S.med[t]||0} min · this week ${wdays(ws).reduce((a,d)=>a+(S.med[d]||0),0)} min</small>`;
 if(B)h+=`<div class=big id=bl></div><div id=bc></div><div class=big id=br style="font-size:28px"></div><button class=btn data-a=bstop>Stop</button>`;
 else h+=seg(Object.keys(PAT).map(k=>[k,k]),bp,'bp','v')+seg([[3,'3 min'],[5,'5 min'],[10,'10 min']],bd,'bd','v')+`<button class="btn pri" data-a=bstart>▶ Start breathing</button>`;
 const j=S.jr[t]||{};
 h+=`<h3>3-line journal</h3><input data-c=jr data-k=g value="${esc(j.g)}" placeholder="Gratitude"><input data-c=jr data-k=w value="${esc(j.w)}" placeholder="One win"><input data-c=jr data-k=t value="${esc(j.t)}" placeholder="Tomorrow's #1">
 <h3>Search journal</h3><input data-c=js placeholder="Search..."><div id=jl>${jlist('')}</div><h3>Habits</h3>`+habs('Mind');return h}
const jlist=q=>Object.entries(S.jr).sort().reverse().filter(([d,j])=>(d+(j.g||'')+(j.w||'')+(j.t||'')).toLowerCase().includes(q.toLowerCase())).slice(0,30).map(([d,j])=>`<div class=card><small>${d}</small>🙏 ${esc(j.g)}<br>🏆 ${esc(j.w)}<br>🎯 ${esc(j.t)}</div>`).join('');

function vSkill(d){d=+d||dow(D());const th=themes()[d]||{};
 return`<h1>Skill and money</h1><div class=card><small>${DN[d]} theme</small><b>Learn:</b> ${esc(th.learn)}<br><b>Audio:</b> ${esc(th.audio)}</div><a class="btn pri" href="${esc(th.sp||'https://open.spotify.com')}" target=_blank>▶ Spotify</a><button class=btn data-a=timer data-s=2400 data-l="Learn block">⏱ 40-min learn</button><button class=btn data-a=timer data-s=5400 data-l="Build block">⏱ 90-min build</button>
 <h3>Habits</h3>${habs('Skill')}<h3>Week themes</h3>`+Object.entries(themes()).map(([k,v])=>`<div class=row><b style="width:40px">${DN[k]}</b><span style="flex:1">${esc(v.learn)}<small>🎧 ${esc(v.audio)}</small></span></div>`).join('')}
const vHab=(title,sec,extra='')=>`<h1>${title}</h1>${extra}${habs(sec)}`;

function vWeek(){const t=D(),ws=weekStart(t),mv=S.wmode[ws]==='mvw',r=S.rev[ws]||{};
 let h=`<h1>Week review</h1>`+seg([['','Complete week'],['mvw','Minimum week (MVW)']],S.wmode[ws]||'','wmodeset','v')+`<h3>Days</h3><div class=chips>`+wdays(ws).map(d=>{const p=Math.round(pct(d)*100),pastOrToday=d<=t;return`<button class="${pastOrToday&&p>=50?'on':''}" style="${pastOrToday&&p<50&&d<t?'background:#4a1d1d':''}">${DN[dow(d)]} ${pastOrToday?p+'%':'-'}</button>`}).join('')+`</div><h3>Targets</h3>`;
 lines(S.cfg.wk).forEach(l=>{const[n,c,m,src]=l.split('|').map(x=>x.trim()),tg=+(mv?m:c)||0,v=cnt(src||'x',ws,n);
 h+=`<div>${esc(n)} <small style="display:inline">${v}/${tg}</small>${src==='x'?` <button class=btn data-a=wx data-l="${esc(n)}" data-v=1>+</button><button class=btn data-a=wx data-l="${esc(n)}" data-v=-1>−</button>`:''}<div class=bar><i style="width:${tg?Math.min(100,v/tg*100):0}%"></i></div></div>`});
 return h+`<h3>Notes for next week</h3><textarea data-c=rev placeholder="Money, goals, calendar, what to fix">${esc(r.n)}</textarea><div class=row><button class="ck ${r.done?'on':''}" data-a=revdone></button><span>Review done</span></div>`}

function vWeekend(){let h='<h1>Weekend</h1>';[6,7].forEach(d=>{h+=`<h3>${d==6?'Saturday: move, enjoy, build':'Sunday: reset and deepen'}</h3>`+blocks().filter(b=>b.days.includes(d)).map(b=>`<div class=row><a href="#/b/${b.id}"><b>${b.time} ${esc(b.t)}</b><small>${esc(b.d.slice(0,90))}</small></a></div>`).join('')});
 return h+`<h3>Weekend habits</h3>${habs('Weekend')}<a class=btn href="#/week">Weekly review</a>`}

function vTodo(){const t=D();const a=S.todo.map((x,i)=>({...x,i})).sort((p,q)=>(p.done-q.done)||((p.due||'9')<(q.due||'9')?-1:1));
 return`<h1>To-dos</h1><div class=card><input id=ta placeholder="New task"><input id=td type=date><button class="btn pri" data-a=todoadd>Add</button></div>`+a.map(x=>`<div class=row><button class="ck ${x.done?'on':''}" data-a=todotog data-i=${x.i}></button><span style="flex:1;${x.done?'opacity:.4;text-decoration:line-through':''}">${esc(x.t)}<small style="${x.due&&x.due<t&&!x.done?'color:var(--r)':''}">${x.due||''}</small></span><button class=btn data-a=tododel data-i=${x.i}>✕</button></div>`).join('')}

function vCal(){const B=blocks().filter(b=>b.days.includes(cd));
 return`<h1>Calendar</h1><small>Read-only. Events live in Google Calendar and link back here.</small><a class="btn pri" href="https://calendar.google.com/calendar/r" target=_blank>Open Google Calendar</a><button class=btn data-a=ics>Export routine .ics</button>`
 +seg([1,2,3,4,5,6,7].map(d=>[d,DN[d]]),cd,'cd','v')+B.map(b=>`<div class=row><a href="#/b/${b.id}"><b>${b.time} ${esc(b.t)}</b></a><button class=btn data-a=copy data-v="${base()}#/b/${b.id}">Link</button></div>`).join('')
 +`<h3>Handy links (paste in event description)</h3>`+[['Today','today'],['Train','train'],['Fuel','fuel'],['Money','money'],['Mind','mind'],['Learn block','day/'+DN[dow(D())].toLowerCase()+'/learn'],['Relationships','rel'],['Meaning','meaning'],['Weekend','weekend'],['Week review','week'],['To-dos','todo']].map(([n,r])=>`<div class=row><span style="flex:1">${n}</span><button class=btn data-a=copy data-v="${base()}#/${r}">Copy</button></div>`).join('')}

const CF=[['blocks','Routine blocks','time|group|title|detail|minimum version (blank = not in min routine)|days 1-7|steps name:sec;name:sec'],['mvd','Minimum viable day (one per line)',''],['themes','Day themes','day 1-7|learn|audio|train template name|spotify link'],['tpl','Workout templates','# Name, then exercise|sets|reps|rest sec'],['meals','Meals and portions','Meal|Type:n,Type:n'],['supps','Supplements (one per line)',''],['habits','Habits','Section|Name|target per week. Sections: Body, Mind, Skill, Relationships, Meaning, Weekend'],['cats','Budget categories','Name|monthly limit €'],['wk','Weekly targets','label|complete|minimum|source: lift steps water med jr rev h:HabitName x(manual)']];
const NF=[['income','Monthly income €'],['invest','Auto-invest €/month'],['waterT','Water target ml'],['stepsT','Steps target'],['stepsMin','Steps minimum'],['pg','Protein g per portion']];
function vSet(){return`<h1>Settings</h1><small>Everything is editable. Use | to separate fields; do not use | inside text.</small><h3>Numbers</h3>`+NF.map(([k,l])=>`<small>${l}</small><input type=number inputmode=decimal data-c=num data-k=${k} value="${S.cfg[k]}">`).join('')
 +CF.map(([k,l,h])=>`<h3>${l}</h3><small>${esc(h)}</small><textarea data-c=cfg data-k=${k} rows=8>${esc(S.cfg[k])}</textarea><button class=btn data-a=cfgreset data-k=${k}>Reset to default</button>`).join('')
 +`<h3>Data</h3><button class=btn data-a=export>Export backup (JSON)</button><label class=btn>Import backup<input id=imp type=file accept=".json" hidden></label>`}

function vMore(){return`<h1>More</h1>`+[['mind','🧘 Mind training'],['skill','📚 Skill and money'],['rel','❤️ Relationships and play'],['meaning','🌿 Meaning'],['weekend','🏖️ Weekend'],['week','📊 Week review / MVW'],['todo','✅ To-dos'],['cal','📅 Calendar and links'],['set','⚙️ Settings']].map(([r,l])=>`<div class=row><a href="#/${r}" style="font-size:18px">${l}</a></div>`).join('')}
function vDay(d,w){const i=DN.map(x=>x.toLowerCase()).indexOf(String(d).toLowerCase());return w==='learn'?vSkill(i>0?i:d):w==='train'?vTrain():vToday()}

/* ---------- actions ---------- */
const td=()=>D(),A={
chk:({id})=>{const c=S.chk[td()]=S.chk[td()]||{};c[id]=!c[id]},
mode:({m})=>{S.mode[td()]=m},
wmode:()=>{const w=weekStart(td());S.wmode[w]=S.wmode[w]==='mvw'?'':'mvw'},
wmodeset:({v})=>{S.wmode[weekStart(td())]=v},
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
cd:({v})=>{cd=+v},
bp:({v})=>{bp=v},bd:({v})=>{bd=+v},
bstart:()=>{B={pat:bp,dur:bd,start:Date.now()};unlock();wake(true)},
bstop:()=>{bend(false);return false},
start:({n})=>{const tp=tpls()[n]||[];S.active={tpl:n||'Workout',t0:Date.now(),ex:tp.map(e=>({n:e.n,r:e.r,rest:e.rest,s:Array.from({length:e.s},()=>({w:'',r:'',d:0}))}))}},
addset:({x})=>{S.active.ex[+x].s.push({w:'',r:'',d:0})},
rmex:({x})=>{S.active.ex.splice(+x,1)},
addex:()=>{const n=prompt('Exercise name');if(n)S.active.ex.push({n,r:'8-12',rest:90,s:[{w:'',r:'',d:0},{w:'',r:'',d:0},{w:'',r:'',d:0}]})},
setdone:({x,s})=>{const e=S.active.ex[+x],st=e.s[+s],p=prevOf(e.n);st.d=st.d?0:1;if(st.d){const q=p&&(p[+s]||p[p.length-1]);if(q){st.w=st.w||q.w;st.r=st.r||q.r}startTimer(e.rest,'Rest: '+e.n)}},
finish:()=>{const a=S.active,ex=a.ex.map(e=>({n:e.n,s:e.s.filter(s=>s.d)})).filter(e=>e.s.length);if(ex.length)S.log.push({date:td(),tpl:a.tpl,dur:Math.round((Date.now()-a.t0)/6e4),ex});S.active=null;T=null;S.timer=null;wake(false);location.hash='#/train'},
cancel:()=>{if(confirm('Discard this workout?')){S.active=null;T=null;S.timer=null}},
logdel:({i})=>{if(confirm('Delete this workout?'))S.log.splice(+i,1)},
runstart:({id})=>{const b=blocks().find(x=>x.id===id);R={id,i:0,steps:b.steps};runStep();location.hash='#/run';return false},
runback:()=>{R.i=Math.max(0,R.i-1);runStep()},
runstop:()=>{R=null;T=null;S.timer=null;wake(false);location.hash='#/today'},
copy:({v})=>{(navigator.clipboard?.writeText(v)||Promise.reject()).then(()=>alert('Link copied')).catch(()=>prompt('Copy this link',v));return false},
cfgreset:({k})=>{if(confirm('Reset this section to defaults?'))S.cfg[k]=DEF.cfg[k]},
export:()=>{dl('lifeos-backup-'+td()+'.json',JSON.stringify(S),'application/json');return false},
ics:()=>{ics();return false}};
const dl=(n,t,ty)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:ty}));a.download=n;a.click()};
function ics(){const B=blocks(),b0=base(),BY=['','MO','TU','WE','TH','FR','SA','SU'],e=s=>s.replace(/[\\;,]/g,'\\$&').replace(/\n/g,'\\n'),hm=(t,m)=>{const x=Math.min(+t.slice(0,2)*60+ +t.slice(3)+m,1439);return String(x/60|0).padStart(2,'0')+String(x%60).padStart(2,'0')+'00'},stamp=new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';
 let o='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//LifeOS//EN\r\n';
 B.forEach(b=>{const ds=[...b.days].map(Number);let a=D();while(!ds.includes(dow(a)))a=addD(a,1);const len=+(b.t.match(/\((\d+) min\)/)||[])[1]||30,link=b0+'#/b/'+b.id,day=a.replace(/-/g,'');
 o+=`BEGIN:VEVENT\r\nUID:${b.id}@lifeos\r\nDTSTAMP:${stamp}\r\nDTSTART:${day}T${b.time.replace(':','')}00\r\nDTEND:${day}T${hm(b.time,len)}\r\nRRULE:FREQ=WEEKLY;BYDAY=${ds.map(d=>BY[d]).join(',')}\r\nSUMMARY:${e(b.t)}\r\nDESCRIPTION:${e(b.d+'\n'+link)}\r\nURL:${link}\r\nEND:VEVENT\r\n`});
 dl('life-os-routine.ics',o+'END:VCALENDAR\r\n','text/calendar')}

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
document.addEventListener('change',e=>{if(e.target.id!=='imp')return;const f=e.target.files[0];if(!f)return;f.text().then(t=>{S=Object.assign(structuredClone(DEF),JSON.parse(t));S.cfg=Object.assign({},DEF.cfg,S.cfg);save();go()}).catch(()=>alert('Invalid backup file'))});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();if(T||B)wake(true)}});

/* ---------- router ---------- */
const V={today:vToday,train:vTrain,fuel:vFuel,money:vMoney,more:vMore,mind:vMind,skill:vSkill,rel:()=>vHab('Relationships and play','Relationships'),meaning:()=>vHab('Meaning','Meaning',`<button class=btn data-a=timer data-s=900 data-l="Quiet moment">⏱ 15-min quiet</button>`),weekend:vWeekend,week:vWeek,todo:vTodo,cal:vCal,set:vSet,b:vBlock,run:vRun,day:vDay};
function go(){const[p,...a]=(location.hash.slice(2)||'today').split('/');
 try{$('#v').innerHTML=(V[p]||vToday)(...a.map(decodeURIComponent))}catch(e){$('#v').innerHTML=`<h1>Error</h1><p>${esc(e.message)}</p><a href="#/set">Open Settings to fix a config</a>`}
 document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x.dataset.p===(['today','train','fuel','money'].includes(p)?p:'more')));tick();breath()}
addEventListener('hashchange',()=>{scrollTo(0,0);go()});
setInterval(tick,250);setInterval(breath,100);
/* data safety + silent updates */
try{navigator.storage?.persist?.()}catch(e){}
const VER=1;/* bump + add a migration below when an update must change saved data/config */
if((S.v||0)<VER){/* migrations: if(S.v<2){S.cfg.blocks=...} */S.v=VER;save()}
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!S.active&&!B&&!R)location.reload();had=true})}
go();
