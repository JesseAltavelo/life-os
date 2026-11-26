'use strict';
const BUILD='1795714747';
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
const IC={flame:'<path d="M12 2c1 4-3 6-3 10a3 3 0 0 0 6 0c0-2-1-3-1-5 2 1 4 4 4 7a6 6 0 0 1-12 0c0-5 4-7 6-12z"/>',award:'<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',tag:'<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01"/>',bookmark:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',zap:'<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>',scale:'<circle cx="12" cy="12" r="9"/><path d="M12 12l3-4M8 8.5a6 6 0 0 1 8 0"/>',gem:'<path d="M6 3h12l4 6-10 13L2 9zM11 3 8 9l4 13 4-13-3-6M2 9h20"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',dumbbell:'<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>',utensils:'<path d="M5 3v7a2 2 0 0 0 2 2v9M9 3v7a2 2 0 0 1-2 2M17 3c-2 2-2 6 0 8v10"/>',wallet:'<path d="M3 7a2 2 0 0 1 2-2h14v4M3 7v11a2 2 0 0 0 2 2h16V9H5a2 2 0 0 1-2-2z"/><circle cx="17" cy="14" r="1"/>',wind:'<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',book:'<path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>',heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',leaf:'<path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15zM5 19l8-8"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',check:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',repeat:'<path d="M17 2l3 3-3 3M20 5H8a4 4 0 0 0-4 4v1M7 22l-3-3 3-3M4 19h12a4 4 0 0 0 4-4v-1"/>',sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',play:'<path d="M7 4l13 8-13 8z"/>',timer:'<circle cx="12" cy="14" r="7"/><path d="M12 14v-4M9 2h6"/>',zin:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M8 11h6M11 8v6"/>',zout:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M8 11h6"/>',refresh:'<path d="M20 12a8 8 0 1 1-3-6.2M20 4v5h-5"/>',headphones:'<path d="M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H5a1 1 0 0 1-1-1zM20 15h-3v5h2a1 1 0 0 0 1-1z"/>',pencil:'<path d="M4 20h4L20 8l-4-4L4 16zM14 6l4 4"/>',drop:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',pulse:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',chev:'<path d="M9 6l6 6-6 6"/>',done:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',open:'<circle cx="12" cy="12" r="9"/>',layers:'<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',coin:'<circle cx="12" cy="12" r="9"/><path d="M14.5 9a3 3 0 0 0-5 1.5c0 3 5 1.5 5 4.5a3 3 0 0 1-5 1.5M12 6.5v11"/>'};
const ic=(n,z)=>`<svg class="i" viewBox="0 0 24 24"${z?` style="width:${z}px;height:${z}px"`:''}>${IC[n]||''}</svg>`;
const emo=t=>(t.match(/^[\p{Extended_Pictographic}️‍]+/u)||['▫️'])[0];
const DN=['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const base=()=>location.origin+location.pathname;
const td=()=>D();

/* ---------- defaults (everything is editable in Life > Settings) ---------- */
const VER=15;
const DEF={v:VER,soc:{},foods:[],fd:{},sets:[],fday:'',bw:{},bgoal:0,bp:[],foc:null,fs:[],fchain:null,gd:{w:8,h:6,it:[],bf:0,pend:[]},fsp:'daisy',fsel:null,fpick:null,fmv:null,gh:[],start:D(),mode:{},wmode:{},short:{},chk:{},water:{},steps:{},port:{},ing:{},z:.75,tcol:{},bname:{},bcol:{},nl:{},own:0,tdel:[],bind:{},notes:{},gcal:{url:'',proxy:'',key:'',tds:0,t:0,evs:[],err:''},supp:{},hab:{},jr:{},med:{},todo:[],log:[],active:null,tx:[],paid:{},rev:{},wx:{},timer:null,ctx:null,
cfg:{
kcalT:2400,protT:130,
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

 if((o.v||0)<11){const c=s.cfg;
  c.routines=`#Morning routine|06:30|60|1234567||0|20
Wake up|10||
Weigh in|5|body|
Shower|10||
Get dressed|5||
Breakfast|30|fuel|
#Evening routine|22:00|30|1234567||0|270
Update budget|5|money|
Shower|15||
Reflect|10|meaning|`;
  c.tpl=`# Push
Dumbbell bench press|4|8-12|180
Dumbbell seated overhead press|4|8-12|180
Incline dumbbell bench press|3|8-12|180
Dumbbell lateral raise|4|12-15|180
Single-arm dumbbell triceps extension|4|10-12|180
# Pull
Incline row|4|8-12|180
Pull-up|3|6-10|180
Bent-over one-arm row|3|8-12|180
Reverse fly|3|12-15|180
Bicep curl|3|10-12|180
# Legs
Leg press|3|8-12|180
Bulgarian split squat|3|8-10|180
Romanian deadlift|4|8-10|180
Lying leg curl|3|10-12|180
Standing calf raise|4|10-15|180`;
  c.themes=c.themes.split('\n').map(l=>{const p=l.split('|'),d=+p[0];if(d>=1&&d<=7)p[3]=['','Pull','Push','Legs','Pull','Push','Legs','Rest'][d];return p.join('|')}).join('\n');
  c.day=`Steps|10000|8000|steps
Water ml|2500|2000|water
Calories near target %|90|60|diet`;
  c.wk=`Gym sessions|6|5|lift
Days at step target|7|5|steps
Days at water target|7|5|water
Days near calorie target|7|5|diet
Days weighed in|7|5|weigh
Morning routine days|7|5|r:morning-routine
Evening routine days|7|5|r:evening-routine
Work focus blocks|10|5|focus
Hard cardio (4x4)|1|1|flow:Hard session (4x4)
Zone 2 cardio|1|1|flow:Long easy session (Zone 2)
Weekly review done|1|1|rev`;
  c.kcalT=3300;c.protT=140;
  s.bind=s.bind||{};s.bname=s.bname||{};
  [['Gym: Pull','tr/Pull'],['Gym: Push','tr/Push'],['Gym: Legs','tr/Legs'],['Cardio: 4x4','f/Hard session (4x4)'],['Cardio: Zone 2','f/Long easy session (Zone 2)'],['Morning Routine + Breakfast','r/morning-routine'],['Evening routine','r/evening-routine'],['Lunch','fuel'],['Dinner','fuel'],['Snack','fuel']].forEach(([t,v])=>{const k=t.trim().toLowerCase();if(!s.bind[k]){s.bind[k]=v;s.bname[k]=t}})}
 if((o.v||0)<12){s.cfg.wk=s.cfg.wk.split('\n').filter(l=>!l.includes('flow:Hard session (4x4)')).join('\n')}
 if((o.v||0)<13){const c=s.cfg;c.themes=c.themes.split('\n').map(l=>{const p=l.split('|'),d=+p[0];if(d===6)p[3]='Long easy session (Zone 2)';if(d===7)p[3]='Hard session (4x4)';return p.join('|')}).join('\n');c.wk=c.wk.replace('Gym sessions|6|5|lift','Gym sessions|5|4|lift').split('\n').filter(l=>!l.startsWith('Hard cardio (4x4)')).join('\n').replace('Zone 2 cardio|1|1|flow:Long easy session (Zone 2)','Sunday cardio (4x4 or soccer)|1|1|flow:Hard session (4x4)+soccer\nZone 2 cardio|1|1|flow:Long easy session (Zone 2)')}
 if((o.v||0)<14){s.bind=s.bind||{};s.bname=s.bname||{};if(!s.bind['weekly review']){s.bind['weekly review']='week';s.bname['weekly review']='Weekly review'}}
 if((o.v||0)<15){const c=s.cfg;
  if(!c.flows.includes('# Mobility: Legs')){c.flows=c.flows.replace(/# Mobility\n(?:[^#\n][^\n]*\n?)*/,'').trim()+`
# Mobility: Legs
Couch stretch (quads), 45 s each side|90
Deep squat hold|90
90/90 hips, switch halfway|120
Pigeon pose, 45 s each side|90
Hamstring stretch, 30 s each side|60
Calf wall stretch, 30 s each side|60
Ankle rocks|60
# Mobility: Push
Doorway chest stretch, 30 s each side|60
Wall slides|90
Thoracic extension over a chair|90
Thread the needle, each side|90
Band shoulder dislocates|90
Overhead triceps stretch, each side|60
Wrist and forearm stretch|60
Child's pose with reach|60
# Mobility: Pull
Dead hang, relax|60
Child's pose, reach to each side|90
Thread the needle, each side|90
Cat-cow|60
Lat stretch on a bench, each side|90
Doorway chest stretch, 30 s each side|60
Neck stretch, 30 s each side|60
Wrist and forearm stretch|60`}
  {const seen={};c.flows=c.flows.split(/\n(?=# )/).filter(b=>{const n=b.split('\n')[0];return seen[n]?0:(seen[n]=1)}).join('\n')}
  c.wk=c.wk.replace(/^Work focus blocks\|.*$/m,'Work focus hours|15|10|focush')}
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
const themeOf=ds=>{const t=themes()[dow(ds)]||{};return dow(ds)===7&&(S.soc||{})[weekStart(ds)]?{...t,train:'Soccer match'}:t};
const tpls=()=>{const o={};let c;lines(S.cfg.tpl).forEach(l=>{if(l[0]=='#'){c=l.slice(1).trim();o[c]=[]}else if(c){const[n,s,r,rest]=l.split('|').map(x=>x.trim());o[c].push({n,s:+s||3,r:r||'8-12',rest:+rest||90})}});return o};
const diet=()=>{const o=[];let c;lines(S.cfg.diet).forEach(l=>{if(l[0]=='#'){const[n,t]=l.slice(1).split('|').map(x=>x.trim());c={n,t:t||'',items:[]};o.push(c)}else if(c){const[n,a,p,cb,f,kc]=l.split('|').map(x=>x.trim());c.items.push({n,a:a||'',p:+p||0,c:+cb||0,f:+f||0,kc:+kc||0})}});return o};
const tot=a=>a.reduce((x,i)=>({p:x.p+i.p,c:x.c+i.c,f:x.f+i.f,k:x.k+i.kc}),{p:0,c:0,f:0,k:0});
function dietPct(ds){const s=dk(ds).k,t=+S.cfg.kcalT;if(!s||!t)return 0;const r=s/t;return Math.min(r,1/r)}
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
 if(src==='soccer')return (S.soc||{})[ws]===2?1:0;
 if(!src.startsWith('r:')&&src.includes('+'))return src.split('+').reduce((a,x)=>a+cnt(x,ws,lab,mv),0);
 if(src.startsWith('r:')&&src.includes('+'))return src.split('+').reduce((a,x)=>a+cnt(x,ws,lab,mv),0);
 if(src==='weigh')return ds.filter(d=>(S.bw||{})[d]!=null).length;
 if(src==='focus')return ds.reduce((a,d)=>a+fses(d).length,0);
 if(src==='focush')return Math.round(ds.reduce((a,d)=>a+fmin(d),0)/6)/10;
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
function unlock(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state!=='running')AC.resume()}catch(e){}}
const KA=(()=>{try{const n=8000,b=new Uint8Array(44+n),v=new DataView(b.buffer),w=(o,t)=>[...t].forEach((c,i)=>v.setUint8(o+i,c.charCodeAt(0)));w(0,'RIFF');v.setUint32(4,36+n,true);w(8,'WAVEfmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,8000,true);v.setUint32(28,8000,true);v.setUint16(32,1,true);v.setUint16(34,8,true);w(36,'data');v.setUint32(40,n,true);b.fill(128,44);const a=new Audio('data:audio/wav;base64,'+btoa(String.fromCharCode(...b)));a.loop=true;a.volume=.05;return a}catch(e){return null}})();
const NATIVE=!!(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.lifeos);
const kaOn=()=>{if(NATIVE)return;try{KA&&KA.paused&&KA.play().catch(()=>{})}catch(e){}},kaOff=()=>{try{KA&&!KA.paused&&KA.pause()}catch(e){}};
let SCH=[],SCHAT=0;
function sched(){SCH.forEach(o=>{try{o.stop()}catch(e){}});SCH=[];if(!T||!AC||NATIVE)return;try{const d=Math.max(0,(T.end-Date.now())/1e3);SCHAT=T.end;for(let i=0;i<2;i++){const o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.frequency.value=880;g.gain.value=.3;o.start(AC.currentTime+d+i*.3);o.stop(AC.currentTime+d+i*.3+.18);SCH.push(o)}}catch(e){}}
function beep(n=2){try{for(let i=0;i<n;i++){const o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.frequency.value=880;g.gain.value=.25;o.start(AC.currentTime+i*.3);o.stop(AC.currentTime+i*.3+.15)}}catch(e){}try{navigator.vibrate?.([200,100,200])}catch(e){}}
async function wake(on){try{if(on&&!WL){WL=await navigator.wakeLock.request('screen');WL.addEventListener('release',()=>WL=null)}else if(!on&&WL){WL.release();WL=null}}catch(e){}}
function startTimer(sec,label,cb){T={end:Date.now()+sec*1e3,total:sec,label,cb};S.timer=cb?null:{end:T.end,total:sec,label};save();unlock();kaOn();sched();wake(true);tick()}
function tick(){const b=$('#tb'),el=$('#el');if(el&&S.active)el.textContent=fmt(Math.floor((Date.now()-S.active.t0)/1e3));
 if(!T){b.style.display='none';if(SCH.length)sched();kaOff();return}
 const left=Math.ceil((T.end-Date.now())/1e3);
 if(left<=0){const t=T;T=null;S.timer=null;save();if(SCH.length&&SCHAT<=Date.now()+50&&AC&&AC.state==='running'){}else{SCH.forEach(o=>{try{o.stop()}catch(e){}});if(!NATIVE||(R&&!document.hidden&&Date.now()-t.end<1500))beep(2)}SCH=[];t.cb?.();if(!T){wake(false);kaOff();b.style.display='none'}return}
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
function runStep(){const[n,s]=R.steps[R.i];startTimer(s,n,()=>{R.i++;if(R.i<R.steps.length)runStep();else{(S.fl=S.fl||[]).push({d:D(),n:R.name});R.fin=1;if(R.ret&&S.active)S.active.mob=1;save()}go()})}

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
const dayDot=(d,t)=>{if(d>t||d<S.start)return'transparent';const n=todayItems(d).filter(x=>!x.st).length;return n===0?'var(--ok)':d===t?'#e8a33d':'#e05252'};
const mlab=x=>x.np?(x.k==='focus'?'No focus time in calendar':'No workout in calendar ('+x.n+')'):x.k==='train'?'Workout: '+x.n:x.k==='focus'?(/^0\.0/.test(x.v)?'No focus time':'Focus '+x.v.replace(' · min 2','')):x.n.replace(/ ml$| %$| near target/g,'')+(x.v&&x.v!=='planned'?' '+x.v.replace(/ · min .*/,'').replace(/ of plan/,''):'');
function missBanner(d,t){if(d>t||d<S.start)return'';const m=todayItems(d).filter(x=>!x.st),isT=d===t,np=m.filter(x=>x.np),td=m.filter(x=>!x.np),day=new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'long'});
 if(!m.length)return`<div class=card style="border:2px solid var(--ok);display:flex;gap:8px;align-items:center;margin:8px 0;padding:10px 14px"><span style="color:var(--ok);display:flex">${ic('check',18)}</span><b style="font-weight:500;font-size:14px">${isT?'Nothing left to do today':'Nothing missed on '+day}</b></div>`;
 const chip=(x,c,tx)=>`<span data-a=wkgo data-h="${x.h}" data-d="${x.d}" data-k="${x.k||''}" style="background:#fff;border:1px solid ${c};color:${tx};border-radius:6px;padding:3px 8px;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap">${esc(mlab(x))}</span>`,row=(l,a,c,tx,bg)=>a.length?`<div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;margin-top:6px"><b style="font-size:12px;font-weight:600;color:${tx};margin-right:2px">${l}</b>${a.map(x=>chip(x,c,tx)).join('')}</div>`:'';
 const R='#e05252',RT='#b42323',A='#e8a33d',AT='#8a5200',blk=(l,a,c,tx,bg)=>a.length?`<div class=card style="background:${bg};border:1.5px solid ${c};margin:6px 0;padding:8px 12px"><div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:13px;color:${tx}">${l}</b><small style="margin:0;font-family:var(--mono);color:${tx}">${a.length}</small></div><div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">${a.map(x=>chip(x,c,tx)).join('')}</div></div>`:'';
 return blk((isT?'':day+' · ')+'Not planned',np,R,RT,'#fdecec')+blk(isT?'Still to do today':'Missed on '+day,td,isT?A:R,isT?AT:RT,isT?'#fff4e5':'#fdecec')}
function vPlan(){const t=D(),ws=weekStart(sel),g=S.gcal,gon=g.url&&g.proxy;
 let h=`<div class=stick><div class=top><h1>${new Date(sel+'T12:00').toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</h1><div><button class="chip ${view==='day'?'on':''}" data-a=view data-v=day>Day</button> <button class="chip ${view==='week'?'on':''}" data-a=view data-v=week>Week</button> <button class=chip data-a=gotoday>Today</button></div></div>
 <div class=strip><button data-a=wk data-v=-7>‹</button>`+wdays(ws).map(d=>`<button class="dd ${d===sel?'on':''} ${d===t?'td':''}" data-a=sel data-v=${d}><small>${DN[dow(d)]}</small><b>${+d.slice(8)}</b><i style="display:block;width:7px;height:7px;border-radius:4px;margin:3px auto 0;background:${dayDot(d,t)}"></i></button>`).join('')+`<button data-a=wk data-v=7>›</button></div>
 <button class=chip data-a=zoom data-v=-1 aria-label="Zoom out">${ic('zout')}</button> <button class=chip data-a=zoom data-v=1 aria-label="Zoom in">${ic('zin')}</button> <small style="display:inline;font-size:12px">Pinch to zoom, swipe for next day</small> `+(gon?`<button class=chip data-a=gsync>${ic('refresh',14)} ${g.t?new Date(g.t).toTimeString().slice(0,5):'sync'}</button>`:'');
 const ad=extOn(sel).filter(e=>e.ad);if(ad.length)h+=`<div style="font-size:13px;color:var(--m);margin:4px 0">All day: ${ad.map(e=>esc(e.t)).join(', ')}</div>`;
 h+=todoBar(sel,t)+`</div>`;
 return h+missBanner(sel,t)+grid(view==='week'?wdays(ws):[sel])}

const linkLbl=k=>k.startsWith('flow:')?'Timed workout · '+k.slice(5):k.startsWith('gym:')?'Gym workout · '+k.slice(4):k==='spotify'?'Opens Spotify':'Opens '+(LBL[k]||k);
const LBL={fuel:'Diet',train:'Gym workout',money:'Budget',mind:'Mind',skill:'Skill',rel:'Relationships',meaning:'Reflect',week:'Weeks',todo:'To-dos'};
function vRoutine(id,ds){ds=ds||D();const r=routines().find(x=>x.id===id);if(!r)return'<p>Routine not found.</p><a href="#/plan">Back</a>';
 const forced=mode(ds)==='min'&&r.ess,sh=isShort(r,ds),st=stepsOf(r,ds),done=st.filter(s=>isDone(ds,r,s)).length,left=st.filter(s=>!isDone(ds,r,s)).reduce((a,s)=>a+s.min,0),
 end=new Date(Date.now()+left*6e4).toTimeString().slice(0,5),cur=st.findIndex(s=>!isDone(ds,r,s)),run=RUN&&RUN.rid===id;
 const e=+r.start.slice(0,2)*60+ +r.start.slice(3)+r.dur,endT=String(Math.min(e,1439)/60|0).padStart(2,'0')+':'+String(Math.min(e,1439)%60).padStart(2,'0');
 const H=`<a href="#/plan" onclick="sel='${ds}'">‹ Calendar</a><h1>${esc(r.name)}</h1><small>${r.start} – ${endT} (${r.dur}m) · ${new Date(ds+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})} · ${done}/${st.length} done</small>
 ${forced?`<span class="dash on">Short version (Minimum day)</span>`:`<button class="dash ${sh?'on':''}" data-a=short data-r="${id}" data-d="${ds}">${sh?'✓ Short version':'+ Short version'}</button>`}`
 +st.map((s,i)=>{const d=isDone(ds,r,s);return`<div class="step ${d?'dn':''} ${i===cur?'cur':''}"><span class=n>${i+1}</span><span class=em>${emo(s.title)}</span><a data-a=stepgo data-r="${id}" data-d="${ds}" data-i=${i}>${esc(stripE(s.title))}${s.link?'<small>'+esc(linkLbl(s.link))+' ›</small>':''}</a><span class=mn>${s.min}m</span><button class="ck ${d?'on':''}" data-a=stepchk data-r="${id}" data-d="${ds}" data-i=${i}></button></div>`}).join('')
;CTA=done===st.length&&st.length?`<button class=cta data-a=rback data-d="${ds}">✓ Routine complete · Back to calendar</button>`:run?`<button class=cta data-a=rstop>■ Stop timer</button>`:`<button class=cta data-a=rstart data-r="${id}" data-d="${ds}">${ic('play')} Start timer<br><small style="color:#fff">Ends at ${end}</small></button>`;return H}

function vRun(){if(!R)return'<p>No timed workout running.</p><a href="#/plan">Back</a>';const s=R.steps,tot=s.reduce((a,x)=>a+x[1],0);
 return`<small>${R.fin?'Finished':'Step '+(R.i+1)+' of '+s.length} · ${Math.round(tot/60)} min</small><h1>${esc(R.name)}</h1>${MD[R.name]?`<small style="display:block;margin:-4px 0 8px">${esc(MD[R.name])}</small>`:''}${/Zone 2/.test(R.name)?audioCard():''}`+s.map((x,k)=>k<R.i||R.fin?`<div class=row style="opacity:.45"><span style="color:var(--ok);display:flex">${ic('check',18)}</span><span style="flex:1;text-decoration:line-through">${esc(x[0])}</span><small style="width:auto">${fmt(x[1])}</small></div>`:k===R.i?`<div class=card style="border:2px solid var(--g);margin:8px 0"><b style="font-size:18px;font-weight:500">${esc(x[0])}</b>${exOf(x[0])?`<small style="display:block;margin:6px 0 0">${esc(exOf(x[0]))}</small>`:''}<div class=big id=big>${fmt(x[1])}</div><div style="display:flex;gap:8px"><button class=btn data-a=runback style="flex:1;justify-content:center;margin:0">Back</button><button class="btn pri" data-a=tskip style="flex:2;justify-content:center;margin:0">Next</button></div></div>`:`<div class=row><span style="width:18px"></span><span style="flex:1">${esc(x[0])}</span><small style="width:auto">${fmt(x[1])}</small></div>`).join('')+(R.fin?`<button class="btn pri" data-a=runend style="width:100%;justify-content:center;min-height:48px;margin-top:12px">${ic('check',18)} Done</button>`:`<button class=btn data-a=runstop style="margin-top:12px">Stop</button>`)}

const MD={'Mobility: Legs':'Opens hips, hamstrings, calves and ankles after leg day. Helps squat depth and keeps knees and lower back happy.','Mobility: Push':'Opens chest, front shoulders and upper back after pressing. Keeps your shoulders moving well overhead.','Mobility: Pull':'Stretches lats, chest and neck and loosens the upper back after pulling. Undoes the hunch from rows and pull-ups.'};
const EX={'couch stretch':'Kneel with your back foot up against a wall or couch, front foot forward. Squeeze the glute of the back leg and lift your chest until the front of the thigh and hip stretch.','deep squat':'Feet a bit wider than shoulders, toes slightly out. Sink as low as you can, elbows pushing the knees out, chest up, heels down. Hold something for balance if needed.','90/90':'Sit with both knees bent at 90 degrees, one leg in front and one to the side. Sit tall, then lean gently over the front shin. Switch sides at the halfway mark.','pigeon':'From all fours slide one knee forward behind your wrist, the other leg straight behind you. Lower your hips and fold forward over the front shin.','hamstring':'Lie on your back and pull one straight leg toward you with a towel or both hands. Keep the other leg flat and the knee soft.','calf wall':'Hands on a wall, one foot back with the heel down and the leg straight. Lean forward until the calf stretches.','ankle rocks':'In a half-kneeling lunge keep the front heel down and drive the knee forward over your toes, then back. Slow, both sides.','doorway chest':'Forearm on a door frame, elbow at shoulder height. Step through gently until your chest and front shoulder open up.','wall slides':'Back, hips and head against a wall, arms in a goalpost shape. Slide your arms up and down without letting your lower back or wrists leave the wall.','thoracic extension':'Sit on a chair, hands behind your head, the backrest at mid-back. Lean back over it as you breathe out, and move the bend up and down your upper back.','thread the needle':'On all fours, reach one arm under your chest, palm up, and rest your shoulder and ear on the floor. Hold, then do the other side.','band shoulder':'Hold a band or towel wide in front of you. Keep your arms straight and slowly lift it overhead and behind you, then back. Go wider if it hurts.','overhead triceps':'Raise one arm, bend the elbow, hand down your back. Press the elbow back gently with the other hand.','wrist and forearm':'Arm out, palm up, fingers pointing down. Gently pull the fingers back with the other hand, then flip the palm down and pull the other way.',"child's pose with reach":'Kneel, sit back on your heels and stretch both arms forward on the floor. Breathe into your back and let your chest sink.',"child's pose, reach":'Child\'s pose, then walk both hands to the left and hold, then to the right. You should feel the side of your back and lats.','dead hang':'Hang from the pull-up bar with a loose, relaxed grip. Let your shoulders stretch and your spine lengthen.','cat-cow':'On all fours, arch your back and look up as you breathe in, then round it and tuck your chin as you breathe out. Move slowly.','lat stretch':'Kneel facing a bench, put one elbow on it and sink your hips back. Feel the stretch along the side of your back and armpit.','neck stretch':'Sit tall and tilt your ear toward your shoulder. A light hand on your head, the other arm relaxed down.'},
exOf=n=>{const l=String(n).toLowerCase(),k=Object.keys(EX).find(x=>l.startsWith(x));return k?EX[k]:''};
const audioCard=()=>{const th=themeOf(D());return th.audio?`<div class=card style="display:flex;gap:12px;align-items:center"><span style="display:flex;color:var(--g)">${ic('play',22)}</span><span style="flex:1;min-width:0"><small style="display:block;margin:0">Listening today</small><b style="font-weight:500">${esc(th.audio)}</b></span><a class=btn href="${esc(th.sp||'https://open.spotify.com')}" target=_blank style="margin:0">Open</a></div>`:''};
function vTrain(){if(S.active)return vActive();const th=themeOf(D()),tp=tpls(),tn=th.train,last=S.log.filter(l=>l.tpl===tn).pop(),fl=flows(),mf=fl['Mobility: '+tn],wsn=weekStart(D()),so=(S.soc||{})[wsn]||0,fm=n=>Math.round(fl[n].reduce((a,x)=>a+x[1],0)/60);
 let h=`<h1>Train</h1>`+(tp[tn]?`<div class=card><small>Today's session</small><b style="font-size:20px">${esc(tn)}</b><small>${tp[tn].length} exercises${last?' · last time '+last.date:''}${mf?' · then '+fm('Mobility: '+tn)+' min mobility':''}</small><button class="btn pri" data-a=start data-n="${esc(tn)}">${ic('play')} Start ${esc(tn)}</button>${mf?`<button class=btn data-a=flowgo data-n="Mobility: ${esc(tn)}">Mobility: ${esc(tn)}</button>`:''}</div>`:(fl[tn]?`<div class=card><small>Today's session</small><b style="font-weight:500;font-size:17px">${esc(tn)}</b><small>Timed workout · ${fm(tn)} min</small><button class="btn pri" data-a=flowgo data-n="${esc(tn)}">${ic('play')} Start ${esc(tn)}</button></div>`:tn==='Soccer match'?`<div class=card><small>Today's session</small><b style="font-size:20px">Soccer match</b>${so===2?`<small>${ic('check')} Played. Counts as this week's cardio.</small>`:`<button class="btn pri" data-a=socdone>${ic('check')} Mark soccer played</button>`}</div>`:`<div class=card><small>Today's session</small><b>${esc(tn||'Rest day')}</b><small>Not a workout template. Start a free workout if you want to log something.</small></div>`))
 +(tn&&tn!=='Rest'?audioCard():'')+`<h3>Strength workouts</h3>`+Object.keys(tp).map(n=>`<button class=btn data-a=start data-n="${esc(n)}" ${n===tn?'style="border:2px solid var(--g)"':''}>${esc(n)}</button>`).join('')+`<button class=btn data-a=start data-n="">Empty workout</button><small>Empty workout: no exercises prepared, you add them as you go. Mobility for each workout is the last row inside it.</small><h3>Timed workouts</h3>`+Object.keys(fl).map(n=>`<button class=btn data-a=flowgo data-n="${esc(n)}" ${n===tn||n==='Mobility: '+tn?'style="border:2px solid var(--g)"':''}>${esc(n)}</button>`).join('')+`<a class=btn href="#/flows">Edit</a><h3>History (saved on this phone)</h3>`;
 return h+(S.log.slice(-15).reverse().map((l,i)=>{const sets=l.ex.reduce((a,e)=>a+e.s.length,0),vol=l.ex.reduce((a,e)=>a+e.s.reduce((b,s)=>b+(+s.w||0)*(+s.r||0),0),0);
 return`<details class=card><summary><b>${esc(l.tpl)}</b> <small style="display:inline">${l.date} · ${l.dur} min · ${sets} sets · ${Math.round(vol)} kg</small></summary>${l.ex.map(e=>`<small>${esc(e.n)}: ${e.s.map(s=>s.w+'×'+s.r).join(', ')}</small>`).join('')}<button class=btn data-a=logdel data-i="${S.log.length-1-i}">Delete</button></details>`}).join('')||'<small>No workouts yet.</small>')}
function vActive(){const a=S.active;
 return`<h1>${esc(a.tpl)}</h1><small>Elapsed <span id=el></span> · autosaved, tap Finish to add it to history</small><button class="btn pri" data-a=finish>Finish</button><button class=btn data-a=cancel>Cancel</button>`+audioCard()+a.ex.map((e,x)=>{const p=prevOf(e.n,a.tpl),hint=p&&p.length>=e.s.length&&p.every(s=>+s.r>=topOf(e.r));
 return`<div class=card><b>${esc(e.n)}</b> <small style="display:inline">${e.r} reps · rest ${e.rest}s ${hint?'· ↑ add weight':''}</small>
 <div class=set><small>#</small><small>Last ${esc(a.tpl)}</small><small>kg</small><small>reps</small><small>✓</small></div>`+e.s.map((s,i)=>{const q=p&&(p[i]||p[p.length-1]);
 return`<div class=set><small>${i+1}</small><small>${q?q.w+'×'+q.r:'-'}</small><input inputmode=decimal data-c=w data-x=${x} data-s=${i} value="${esc(s.w)}" placeholder="${q?q.w:'kg'}"><input inputmode=numeric data-c=r data-x=${x} data-s=${i} value="${esc(s.r)}" placeholder="${q?q.r:e.r}"><button class="ck ${s.d?'on':''}" data-a=setdone data-x=${x} data-s=${i}></button></div>`}).join('')
 +`<button class=btn data-a=addset data-x=${x}>+ Set</button><button class=btn data-a=rmex data-x=${x}>Remove</button></div>`}).join('')+`<button class=btn data-a=addex>+ Exercise</button>`+(flows()['Mobility: '+a.tpl]?`<h3 style="margin-top:20px">Finish with mobility</h3><button data-a=mobgo data-n="Mobility: ${esc(a.tpl)}" style="width:100%;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:84px;padding:16px;border-radius:14px;border:2px solid var(--g);background:var(--c);font:inherit;color:var(--t);margin-bottom:12px;${a.mob?'opacity:.6':''}"><span><b style="font-size:17px;font-weight:600">${esc('Mobility: '+a.tpl)}</b><small style="display:block;margin:2px 0 0">${Math.round(flows()['Mobility: '+a.tpl].reduce((x,y)=>x+y[1],0)/60)} min${a.mob?' · done':''}. ${esc(MD['Mobility: '+a.tpl]||'')}</small></span><span style="display:flex;color:var(--g)">${ic(a.mob?'check':'chev',26)}</span></button>`:'')}

/* ---------- diet: foods from packages + set meals ---------- */
const MEALS=['Breakfast','Lunch','Dinner','Snacks'],uid=()=>Date.now().toString(32)+Math.random().toString(32).slice(2,6),r0=n=>Math.round(n).toLocaleString('en-GB'),num=v=>parseFloat(String(v).replace(',','.'))||0;
const food=id=>(S.foods||[]).find(f=>f.id===id),fcalc=(f,a)=>{const r=f.per>0?a/f.per:0;return{k:f.k*r,p:f.p*r,c:f.c*r,f:f.f*r}};
const dsum=es=>es.reduce((t,x)=>{if(x.q)return{k:t.k+x.k,p:t.p+x.p,c:t.c+x.c,f:t.f+x.f};const f=food(x.f);if(!f)return t;const n=fcalc(f,x.a);return{k:t.k+n.k,p:t.p+n.p,c:t.c+n.c,f:t.f+n.f}},{k:0,p:0,c:0,f:0}),dk=d=>dsum((S.fd||{})[d]||[]);
const gv=id=>{const e=$('#'+id);return e?e.value:''},fnm=m=>gv('fn-'+m).trim(),ffind=n=>n?(S.foods||[]).find(f=>(f.n||'').trim().toLowerCase()===n.toLowerCase()):null,ferr=(m,t)=>{const e=$('#fer-'+m);if(e)e.textContent=t;return false};
function vFuel(){const t=S.fday||D(),es=(S.fd||{})[t]||[],sm=dsum(es),kt=+S.cfg.kcalT||0,pt=+S.cfg.protT||0,fs=S.foods||[],left=kt-sm.k;
 const mb=(l,v,tg)=>`<div style="flex:1;min-width:0"><small>${l}</small><div style="font:500 14px var(--mono);white-space:nowrap;margin:2px 0 4px">${r0(v)}${tg?' / '+tg:''} g</div>${bar(v,tg)}</div>`;
 let h=`<h1>Diet, water and steps</h1><div class=top style="margin:4px 0 8px"><button class=btn data-a=fshift data-v=-1 aria-label="Previous day" style="margin:0;min-width:48px;justify-content:center">‹</button><b style="font-weight:500">${t===D()?'Today':fdt(t)}</b><span style="display:flex;gap:6px"><button class=btn data-a=ftoday style="margin:0">Today</button><button class=btn data-a=fshift data-v=1 aria-label="Next day" ${t===D()?'disabled':''} style="margin:0;min-width:48px;justify-content:center">›</button></span></div>`+(t!==D()?`<div class=card style="background:#fff4e5;border:2px solid #e8a33d"><b style="font-size:17px">Editing ${fdt(t)}</b><small style="display:block;color:var(--t)">This is a past day, not today. Food, water and steps you add here go to that day.</small><button class="btn pri" data-a=ftoday style="margin-top:8px">Back to today</button></div>`:'')
 +`<div class=card><small>Calories eaten</small><div style="display:flex;align-items:baseline;gap:8px;margin:4px 0"><span style="font:500 34px/1.1 var(--mono)">${r0(sm.k)}</span><small>/ ${r0(kt)} kcal</small></div>${bar(sm.k,kt)}<small>${kt?(left>=0?r0(left)+' kcal left':r0(-left)+' kcal over'):'Set a calorie target below'}</small><div style="display:flex;gap:12px;margin-top:12px">${mb('Protein',sm.p,pt)}${mb('Carbs',sm.c,0)}${mb('Fat',sm.f,0)}</div></div>`;
 const wv=S.water[t]||0,sv=S.steps[t]||0,big=(l,v,u,tg,x)=>`<div class=card><small>${l}</small><div style="display:flex;align-items:baseline;gap:8px;margin:4px 0"><span class=stv style="font:500 34px/1.1 var(--mono)">${r0(v)}</span><small>${u} / ${r0(tg)}</small></div>${bar(v,tg)}${x}</div>`;
 h+=big('Water',wv,'ml',S.cfg.waterT,`<div style="display:flex;gap:6px;margin-top:10px"><button class=btn data-a=water data-v=250 style="flex:1;justify-content:center;margin:0">+250</button><button class=btn data-a=water data-v=500 style="flex:1;justify-content:center;margin:0">+500</button><button class=btn data-a=water data-v=-250 style="flex:1;justify-content:center;margin:0">−250</button></div>`)
 +big('Steps',sv,'steps',S.cfg.stepsT,`<div style="display:flex;gap:8px;align-items:center;margin-top:10px"><small style="flex:none">Steps today</small><input type=number inputmode=numeric data-c=steps value="${sv||''}" placeholder="Type total" style="margin:0"></div>`);
 h+=MEALS.map((m,mi)=>{const me=es.filter(x=>x.m===m||(mi===3&&!MEALS.includes(x.m))),ms=dsum(me);return`<div class=card><div class=top><b>${m}</b><small style="font-family:var(--mono)">${r0(ms.k)} kcal</small></div>`+me.map(x=>{const f=x.q?null:food(x.f);if(!x.q&&!f)return'';const n=x.q?x:fcalc(f,x.a);return`<div class=row><span style="flex:1">${esc(x.q?(x.n||'Quick add'):(f.n||'Unnamed'))}<small style="font-family:var(--mono)">${x.q?(x.a?Math.round(x.a*10)/10+' '+(x.u||''):'quick add'):Math.round(x.a*10)/10+' '+f.u} · ${r0(n.p)} P · ${r0(n.c)} C · ${r0(n.f)} F</small></span><b style="font-weight:500">${r0(n.k)} kcal</b><button class=btn data-a=fdel data-id="${x.id}" aria-label="Remove" style="min-height:32px;padding:2px 10px;margin:0 0 0 8px">✕</button></div>`}).join('')
 +`<div style="margin:8px 0 4px"><button class="btn pri" data-a=ftab data-m=${mi} data-t=lab id=ft-lab-${mi} style="width:100%;justify-content:center;min-height:48px;margin:0 0 6px">${ic('tag',18)} From label</button><div style="display:flex;gap:6px"><button class=chip data-a=ftab data-m=${mi} data-t=set id=ft-set-${mi} style="flex:1;justify-content:center;margin:0;min-height:40px">${ic('bookmark',16)} Saved</button><button class=chip data-a=ftab data-m=${mi} data-t=qk id=ft-qk-${mi} style="flex:1;justify-content:center;margin:0;min-height:40px">${ic('zap',16)} Quick add</button></div></div>
 <div id=fps-set-${mi} style="display:none;background:var(--c2);border-radius:12px;padding:12px;margin-top:4px">${fs.length||(S.sets||[]).length?`<small style="display:block;margin-bottom:6px">Pick something you saved before.</small><select id=fsa-${mi} data-c=fsa data-m=${mi} style="margin:0 0 8px"><option value="">Choose…</option>${(S.sets||[]).length?`<optgroup label="Meals">${S.sets.map(x=>`<option value="s:${x.id}">${esc(x.n||'Meal')} · ${r0(dsum(x.items.map(q=>({f:q.f,a:q.a}))).k)} kcal</option>`).join('')}</optgroup>`:''}${fs.length?`<optgroup label="Foods">${fs.map(f=>`<option value="f:${f.id}">${esc(f.n||'Unnamed')} · per ${f.per} ${f.u}</option>`).join('')}</optgroup>`:''}</select>
 <div id=fkn-${mi} style="display:none"><small id=fkl-${mi}></small><div style="display:grid;grid-template-columns:1fr 64px;gap:8px;align-items:center;margin-top:6px"><input id=fa2-${mi} data-c=fsa data-m=${mi} type=text inputmode=decimal placeholder="How much did you eat?" style="margin:0"><b id=fku-${mi} style="font-weight:500"></b></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><small id=fpvk-${mi} style="font-family:var(--mono)"></small><button class="btn pri" data-a=faddk data-m=${mi}>Add</button></div></div>
 <div id=fsm-${mi} style="display:none"><small style="display:block;margin-bottom:6px">How much of it did you eat?</small><div style="display:flex;gap:6px">${[['¼',.25],['½',.5],['¾',.75],['All',1]].map(([l,v])=>`<button class="btn pri" data-a=fset2 data-m=${mi} data-v=${v} style="flex:1;justify-content:center;margin:0">${l}</button>`).join('')}</div></div>`:`<small>Nothing saved yet. Add a food from its label with "Save this food" ticked, or make a meal in Saved foods and meals below.</small>`}</div>
 <div id=fps-lab-${mi} style="display:none;background:var(--c2);border-radius:12px;padding:12px;margin-top:4px"><small style="display:block;margin-bottom:6px">Copy the numbers from the nutrition label.</small>
 <div id=fnew-${mi}><input id=fn-${mi} data-c=fq data-m=${mi} placeholder="Food name" autocapitalize=sentences style="margin:0 0 8px"><div style="display:grid;grid-template-columns:auto 1fr 84px;gap:8px;align-items:center"><small>Label is per</small><input id=fper-${mi} data-c=fq data-m=${mi} type=text inputmode=decimal value="100" style="margin:0"><select id=fu-${mi} data-c=fq data-m=${mi} style="margin:0"><option>g</option><option>ml</option></select></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:8px">${[['fk','kcal'],['fp','Protein g'],['fc','Carbs g'],['ff','Fat g']].map(([i,l])=>`<div><small>${l}</small><input id=${i}-${mi} data-c=fq data-m=${mi} type=text inputmode=decimal style="margin:0"></div>`).join('')}</div><div style="display:grid;grid-template-columns:1fr 64px;gap:8px;align-items:center;margin-top:8px"><input id=fan-${mi} data-c=fq data-m=${mi} type=text inputmode=decimal placeholder="How much did you eat?" style="margin:0"><b id=fau-${mi} style="font-weight:500">g</b></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><small id=fpvn-${mi} style="font-family:var(--mono)"></small><button class="btn pri" data-a=faddn data-m=${mi}>Add</button></div><label style="display:flex;gap:10px;align-items:center;margin:10px 0 0;font-size:14px"><input type=checkbox id=fsv2-${mi} data-c=fsavepref ${S.fsave?'checked':''} style="width:22px;height:22px;margin:0;flex:none"> Save under Saved for next time</label></div></div>
 <div id=fps-qk-${mi} style="display:none;background:var(--c2);border-radius:12px;padding:12px;margin-top:4px"><small style="display:block;margin-bottom:8px">Type your estimate for what you ate. Leave kcal empty and it is worked out from protein, carbs and fat.</small><input id=ql-${mi} placeholder="What was it? (optional)" style="margin:0 0 8px"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${[['qk','kcal'],['qp','Protein g'],['qc','Carbs g'],['qf','Fat g']].map(([i,l])=>`<div><small>${l}</small><input id=${i}-${mi} type=text inputmode=decimal style="margin:0"></div>`).join('')}</div><div style="text-align:right"><button class="btn pri" data-a=fquick data-m=${mi}>Add estimate</button></div></div>
 <small id=fer-${mi} style="color:var(--r);display:block"></small>`+`</div>`}).join('');
 h+=`<a class=btn href="#/foods">${ic('sliders')} Saved foods and meals</a><h3>Daily targets</h3><div class=card style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div><small>Calories (kcal)</small><input type=number inputmode=numeric data-c=num data-k=kcalT value="${S.cfg.kcalT||''}"></div><div><small>Protein (g)</small><input type=number inputmode=numeric data-c=num data-k=protT value="${S.cfg.protT||''}"></div></div>`;
 return h}
function vFoods(){const fs=S.foods||[],ss=S.sets||[],fo=sel=>fs.map(f=>`<option value="${f.id}" ${f.id===sel?'selected':''}>${esc(f.n||'Unnamed')}</option>`).join('');
 return`<a href="#/fuel">‹ Diet</a><h1>Saved foods and meals</h1><small>Everything here shows under Saved when you add food. </small><h3>Foods</h3><small>Copy the numbers from the package. Most packages list values per 100 g or per 100 ml. Enter that amount and its values once, then just say how much you ate.</small>`
 +fs.map(f=>`<div class=card><input data-c=food data-id="${f.id}" data-k=n placeholder="Food, e.g. Greek yoghurt" value="${esc(f.n)}"><div style="display:grid;grid-template-columns:1fr 96px;gap:8px"><div><small>Values are per</small><input data-c=food data-id="${f.id}" data-k=per type=text inputmode=decimal value="${f.per}"></div><div><small>Unit</small><select data-c=food data-id="${f.id}" data-k=u><option ${f.u==='g'?'selected':''}>g</option><option ${f.u==='ml'?'selected':''}>ml</option></select></div></div>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${[['k','kcal'],['p','Protein g'],['c','Carbs g'],['f','Fat g']].map(([k,l])=>`<div><small>${l}</small><input data-c=food data-id="${f.id}" data-k=${k} type=text inputmode=decimal value="${f[k]||''}"></div>`).join('')}</div><button class=btn data-a=ffdel data-id="${f.id}">Delete food</button></div>`).join('')
 +`<button class="btn pri" data-a=ffnew>Add food</button><h3>Meals</h3><small>A meal is a combination of saved foods you eat regularly. Under Saved you tap how much of it you ate.</small>`
 +ss.map(s=>`<div class=card><input data-c=set data-id="${s.id}" data-k=n placeholder="Name, e.g. Usual breakfast" value="${esc(s.n)}"><small>Counts as</small><select data-c=set data-id="${s.id}" data-k=m>${MEALS.map(m=>`<option ${s.m===m?'selected':''}>${m}</option>`).join('')}</select>`
  +s.items.map((it,i)=>`<div style="display:grid;grid-template-columns:1fr 84px 40px;gap:8px;margin-top:6px"><select data-c=setit data-id="${s.id}" data-i=${i} data-k=f style="margin:0">${fo(it.f)}</select><input data-c=setit data-id="${s.id}" data-i=${i} data-k=a type=text inputmode=decimal value="${it.a}" style="margin:0"><button class=btn data-a=sirm data-id="${s.id}" data-i=${i} aria-label="Remove" style="min-height:40px;padding:0;margin:0;justify-content:center">✕</button></div>`).join('')
  +(fs.length?`<button class=btn data-a=sadd data-id="${s.id}">Add food to this meal</button>`:'<small>Add a food above first.</small>')+`<button class=btn data-a=sdel data-id="${s.id}">Delete set meal</button></div>`).join('')+`<button class="btn pri" data-a=snew>Add set meal</button>`}

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

/* ---------- reflect: rate the day + short guided prompts */
const RT=[['1','Rough'],['2','Meh'],['3','Okay'],['4','Good'],['5','Great']],RTAG=['Energised','Calm','Proud','Grateful','Focused','Tired','Stressed','Distracted','Lonely','Restless'],RQ=[['g','Something I am grateful for'],['w','A win today, big or small'],['m','What mattered, or who I helped'],['x',"Tomorrow's number one"],['n','Anything else on my mind']];
let RFOK='',WKD='';
const rfd=()=>S.rfd=S.rfd||{d:D(),r:0,tg:[]};
const rfdate=d=>new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
function vReflect(){const d=rfd(),e=(S.nl.meaning||[]).map((x,i)=>({...x,i})).sort((p,q)=>p.d<q.d?1:p.d>q.d?-1:q.i-p.i),av=e.filter(x=>x.r).slice(0,14).length?(e.filter(x=>x.r).slice(0,14).reduce((a,x)=>a+x.r,0)/e.filter(x=>x.r).slice(0,14).length).toFixed(1):'';
 return`<h1>Reflect</h1><small>A minute to look back on the day. Everything is optional except tapping a rating or writing something.</small>`+(RFOK?`<div class=card style="border-color:var(--g)"><b>${ic('check')} Saved for ${rfdate(RFOK)}</b></div>`:'')
 +`<div class=card><b style="font-weight:500">How was your day?</b><div style="display:flex;gap:6px;margin-top:10px">${RT.map(([v,l])=>`<button class="chip${+v===d.r?' on':''}" data-a=rfr data-v=${v} style="flex:1;flex-direction:column;min-height:64px;margin:0;gap:2px;justify-content:center"><span style="font:500 22px var(--mono)">${v}</span><span style="font-size:12px;font-weight:400">${l}</span></button>`).join('')}</div>
 <b style="font-weight:500;display:block;margin-top:16px">How did it feel?</b><small>Tap any that fit.</small><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${RTAG.map(t=>`<button class="chip${d.tg.includes(t)?' on':''}" data-a=rftag data-t="${t}" style="margin:0">${t}</button>`).join('')}</div><div style="height:1px;background:var(--hl);margin:16px 0"></div>${RQ.map(([k,l])=>`<small>${l}</small><textarea data-c=rf data-k=${k} rows=2 placeholder="Write a line or two" style="font-family:inherit;margin-bottom:12px;min-height:64px;height:64px">${esc(d[k])}</textarea>`).join('')}<small>Date</small><input type=date class=dt data-c=rf data-k=d value="${esc(d.d)}"><button class="btn pri" data-a=rfsave style="width:100%;justify-content:center;min-height:48px;margin-top:12px">${ic('check',18)} Save reflection</button></div>`
 +`<div style="margin:4px 0 8px"><button class=btn data-a=timer data-s=900 data-l="Quiet moment">${ic('timer')} 15-min quiet</button></div>`
 +`<h3>Past reflections</h3>`+(av?`<small>Average rating, last ${Math.min(14,e.filter(x=>x.r).length)} reflections: ${av} / 5</small>`:'')
 +(e.length?e.map(x=>`<div class=card><div class=top><small>${rfdate(x.d)}</small>${x.r?`<b style="font-family:var(--mono);font-weight:500">${x.r} / 5 · ${RT[x.r-1][1]}</b>`:''}</div>${(x.tg||[]).length?`<small>${x.tg.map(esc).join(' · ')}</small>`:''}${RQ.map(([k,l])=>x[k]?`<div style="margin-top:6px"><small>${l}</small><div style="white-space:pre-wrap">${esc(x[k])}</div></div>`:'').join('')}${!x.r&&!(x.tg||[]).length&&!RQ.some(([k])=>x[k])?`<div style="white-space:pre-wrap">${esc(x.t)}</div>`:''}<button class=btn data-a=rfdel data-i=${x.i} style="margin-top:8px">Delete</button></div>`).join(''):'<small>No reflections yet.</small>')}
function vSkill(d){const T=themes(),td=+d||dow(D()),th=T[td]||{},tn=[...Object.keys(tpls()),...Object.keys(flows())];
 return`<h1>Skill and money</h1><div class=card><small>${DN[td]} focus</small><b style="font-weight:500;font-size:17px">${esc(th.learn)}</b><small>Listen: ${esc(th.audio)}</small></div>`
 +(th.q&&th.q.length?`<h3>Watch and listen list for ${DN[td]}</h3>`+th.q.map(i=>i.u?`<a class=row href="${esc(i.u)}" target=_blank style="flex:1"><span style="flex:1">${esc(i.t)}</span>${ic('chev')}</a>`:`<div class=row><span style="flex:1">${esc(i.t)}</span></div>`).join(''):'')
 +`<div style="margin-top:12px"><a class="btn pri" href="${esc(th.sp||'https://open.spotify.com')}" target=_blank>${ic('play')} Spotify</a><button class=btn data-a=timer data-s=2400 data-l="Learn block">${ic('timer')} 40-min learn</button><button class=btn data-a=timer data-s=5400 data-l="Build block">${ic('timer')} 90-min build</button></div>
 <h3>What each day is for</h3><small>Tap a day to change its focus, audio, training and watch list. The training name can be a workout or a timed workout.</small>
 <datalist id=trl>${tn.map(n=>`<option value="${esc(n)}">`).join('')}</datalist>`
 +Object.entries(T).map(([k,v])=>`<details class=card><summary><b style="font-weight:500">${DN[k]}</b> <small style="display:inline">${esc(v.learn)} · ${esc(v.train)}</small></summary>
 <small>Learn focus</small><input data-c=th data-d=${k} data-k=learn value="${esc(v.learn)}"><small>Audio</small><input data-c=th data-d=${k} data-k=audio value="${esc(v.audio)}"><small>Training</small><input data-c=th data-d=${k} data-k=train list=trl value="${esc(v.train)}"><small>Spotify link</small><input data-c=th data-d=${k} data-k=sp value="${esc(v.sp)}"><small>Watch and listen list: one per line, optional link after the title</small><textarea data-c=th data-d=${k} data-k=q rows=4 style="font-family:inherit">${esc((v.q||[]).map(i=>i.t+(i.u?' '+i.u:'')).join('\n'))}</textarea></details>`).join('')}
const vNotes=(title,k,hint,extra='')=>`<h1>${title}</h1>${extra}<small>${hint}</small><div class=card><textarea id=ne rows=4 placeholder="Write an entry..."></textarea><input id=nd class=dt type=date value="${D()}"><button class="btn pri" data-a=nadd data-k=${k}>Save entry</button></div><small>Entries are kept on this phone, newest first, and also show in your Weeks log on their date.</small>`+(S.nl[k]||[]).map((e,i)=>({...e,i})).sort((p,q)=>p.d<q.d?1:-1).map(e=>`<div class=card><small>${new Date(e.d+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'})}</small><div style="white-space:pre-wrap">${esc(e.t)}</div><button class=btn data-a=ndel data-k=${k} data-i=${e.i}>Delete</button></div>`).join('');

function dayL(d){const j=S.jr[d]||{},L=[],sp=S.tx.filter(x=>x.d===d&&x.k!=='i').reduce((a,x)=>a+x.a,0),inc=S.tx.filter(x=>x.d===d&&x.k==='i').reduce((a,x)=>a+x.a,0),dp=Math.round(dietPct(d)*100);
 S.log.filter(l=>l.date===d).forEach(l=>L.push(`${ic('dumbbell')} ${esc(l.tpl)} · ${l.dur} min · ${l.ex.reduce((a,e)=>a+e.s.length,0)} sets`));
 if((S.bw||{})[d]!=null)L.push(ic('scale')+' Weight '+S.bw[d]+' kg');if((S.bp||[]).some(p=>p.d===d))L.push(ic('calendar')+' Progress photo day');
 if(fmin(d))L.push(ic('gem')+' Work focus · '+fses(d).length+' block'+(fses(d).length===1?'':'s')+' · '+fmin(d)+' min');
 if(S.steps[d])L.push(ic('pulse')+' '+S.steps[d]+' steps');if(S.water[d])L.push(ic('drop')+' '+S.water[d]+' ml water');if(dk(d).k)L.push(ic('utensils')+' '+r0(dk(d).k)+' kcal · '+r0(dk(d).p)+' g protein');if(S.med[d])L.push(ic('wind')+' '+S.med[d]+' min box breathing / meditation');
 if(j.g)L.push(ic('pencil')+' Grateful: '+esc(j.g));if(j.w)L.push(ic('pencil')+' Win: '+esc(j.w));if(j.t)L.push(ic('pencil')+' Tomorrow: '+esc(j.t));
 S.todo.filter(x=>x.due===d).forEach(x=>L.push(ic(x.done?'done':'open')+' '+esc(x.t)));
 (S.nl.rel||[]).filter(e=>e.d===d).forEach(e=>L.push(ic('heart')+' '+esc(e.t)));(S.nl.meaning||[]).filter(e=>e.d===d).forEach(e=>L.push(ic('leaf')+' '+esc(e.t)));
 if(sp)L.push(ic('coin')+' Spent '+eur(sp));if(inc)L.push(ic('coin')+' Income +'+eur(inc));
 return L}
function dayLog(d){const L=dayL(d);
 return`<div class=card><b>${new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'})}</b> ${minOk(d)?'<span class=chip style="background:var(--a);border-color:var(--a);color:#fff">✓ minimum</span>':''}${fullOk(d)?'<span class=chip style="background:var(--ok);border-color:var(--ok);color:#fff">★ full</span>':''}`+(L.length?L.map(x=>`<div style="display:flex;gap:8px;align-items:flex-start;padding:4px 0;font-size:14px;color:var(--t2)">${x}</div>`).join(''):'<small>Nothing logged.</small>')+`</div>`}
const wkComb=ws=>{const t=D();return`<div style="display:flex;gap:4px;margin:12px 0 8px">`+wdays(ws).map(d=>{const f=d>=S.start&&d<=t,st=!f?'':fullOk(d)?'f':minOk(d)?'m':d<t?'x':'',bg=st==='f'?'var(--ok)':st==='m'?'var(--a)':st==='x'?'#fde8e8':'var(--c2)',fg=st==='f'||st==='m'?'#fff':st==='x'?'var(--r)':'var(--m)';return`<span style="flex:1;text-align:center;border-radius:8px;padding:8px 0;font-size:12px;background:${bg};color:${fg}">${DN[dow(d)]}<br><b style="font-weight:500">${st==='f'?'★':st==='m'?'✓':st==='x'?'✗':'·'}</b></span>`}).join('')+`</div>`};
const srcLabel=x=>x.startsWith('gym:')?'Counts that gym workout when you finish it':x.startsWith('flow:')?'Counts that timed workout when it finishes':x==='weigh'?'Fills in by itself from days you log your weight':x==='focus'||x==='focusm'?'Fills in by itself from finished Work focus blocks':x==='lift'?'Fills in by itself from workouts you log':x==='steps'?'Fills in by itself from your steps':x==='water'?'Fills in by itself from water logged':x==='diet'?'Fills in by itself from calories logged close to your target':x==='med'?'Fills in by itself from box breathing':x==='jr'?'Fills in by itself from your journal':x==='rev'?'Ticks when you mark Review done':x.startsWith('r:')?'Counts days you finish the whole routine. The minimum counts the short version too':'Manual: use + and −';
const wkStrip=(ws,fn,mk)=>`<div style="display:flex;gap:4px;margin:6px 0 10px">`+wdays(ws).map(d=>{const f=d>=S.start&&d<=D(),ok=f&&fn(d);return`<span style="flex:1;text-align:center;border-radius:8px;padding:6px 0;font-size:12px;background:${ok?'var(--ok)':f&&d<D()?'#fde8e8':'var(--c2)'};color:${ok?'#fff':'var(--t)'}">${DN[dow(d)]}<br>${ok?mk:f&&d<D()?'✗':'·'}</span>`}).join('')+`</div>`;
function todayItems(d){const it=[],tp=tpls(),tn=themeOf(d).train,P=(n,st,v,h,k)=>it.push({n,st,v,h,k,d}),evs=extOn(d),bs=evs.map(bndE).filter(Boolean),hasEv=evs.length>0,rd={};occ(d).forEach(r=>stepsOf(r,d).forEach(x=>{if(x.link&&isDone(d,r,x))rd[x.link]=1}));
 dayRows().forEach(x=>{const v=dv(x.src,d),f=x.f||x.m,st=v>=f?'f':x.m&&v>=x.m?'m':'',h=x.src==='steps'||x.src==='water'||x.src==='diet'?'#/fuel':x.src==='jr'?'#/meaning':'#/plan',vs=x.src==='diet'?r0(dk(d).k)+' / '+r0(+S.cfg.kcalT||0)+' kcal':r0(v)+' / '+r0(f);P(x.src==='diet'?'Calories':x.n,st,vs+(x.m&&x.m<f&&x.src!=='diet'?' · min '+r0(x.m):''),h,x.src==='steps'||x.src==='water'||x.src==='diet'?'fuel':x.src==='jr'?'refl':'')});
 if(tn&&tn!=='Rest'){const ok=S.log.some(l=>l.date===d)||(S.fl||[]).some(x=>x.d===d)||(tn==='Soccer match'&&(S.soc||{})[weekStart(d)]===2);P(tn,ok?'f':'',ok?'done':'planned','#/train','train');if(hasEv&&!bs.some(b=>/^(tr\/|f\/|gym:|flow:)/.test(b)||b==='train'||b==='flow'))it[it.length-1].np=1}
 const sn={};occ(d).forEach(r=>{if(sn[r.id])return;sn[r.id]=1;const st=stepsOf(r,d),n=st.filter(x=>isDone(d,r,x)).length;P(r.name,st.length>0&&n===st.length?'f':'',n+' / '+st.length+' steps','#/r/'+r.id+'/'+d)});
 P('Weigh in',(S.bw||{})[d]!=null||rd.body?'f':'',(S.bw||{})[d]!=null?S.bw[d]+' kg':'','#/body');
 if(dow(d)<6||fmin(d)){P('Work focus',fmin(d)>=180?'f':fmin(d)>=120?'m':'',(fmin(d)/60).toFixed(1)+' / 3 h · min 2','#/focus','focus');if(hasEv&&!bs.includes('focus'))it[it.length-1].np=1}
 P('Reflect',(S.nl.meaning||[]).some(e=>e.d===d)||rd.meaning?'f':'','','#/meaning','refl');
 const td0=S.todo.filter(x=>x.due===d);if(td0.length)P('To-dos',td0.every(x=>x.done)?'f':'',td0.filter(x=>x.done).length+' / '+td0.length,'#/plan');
 return it}
const tRow=x=>`<div data-a=wkgo data-h="${x.h}" data-d="${x.d}" data-k="${x.k||''}" style="display:flex;gap:10px;align-items:center;padding:8px 0;cursor:pointer;border-top:1px solid var(--hl)"><span style="color:${x.st==='f'?'var(--ok)':x.st==='m'?'var(--a)':'var(--m)'};display:flex">${ic(x.st?'check':'open',18)}</span><span style="flex:1;${x.st==='f'?'color:var(--t2)':''}">${esc(x.n)}</span><small style="font-family:var(--mono);margin:0;text-align:right">${esc(x.v)}</small></div>`;
function vWeek(w){const t=D(),cw=weekStart(t),ws=w||cw,sm=wsum(ws),r=S.rev[ws]||{},fd=d=>new Date(d+'T12:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'}),cur=ws===cw;
 let h=`<div class=top><a class=btn href="#/week/${addD(ws,-7)}">‹</a><h2 style="margin:0">${cur?'This week':fd(ws)+' – '+fd(addD(ws,6))}</h2><a class=btn href="#/week/${addD(ws,7)}">›</a></div>`+(cur?'':`<small>${fd(ws)} – ${fd(addD(ws,6))}</small>`);
 const sel=WKD&&wdays(ws).includes(WKD)?WKD:(cur?t:'');
 if(sel){const it=todayItems(sel),nd=it.filter(x=>!x.st),mn=it.filter(x=>x.st==='m'),dn=it.filter(x=>x.st==='f'),ttl=sel===t?'Today':new Date(sel+'T12:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'}),sh=(l,a)=>a.length?`<small style="display:block;margin-top:12px">${l}</small>`+a.map(tRow).join(''):'';h+=`<div class=card><div class=top><b>${ttl}</b><small style="font-family:var(--mono)">${dn.length} / ${it.length} done${mn.length?' · '+mn.length+' at minimum':''}</small></div>${bar(dn.length,it.length)}${sh(sel>t?'Planned':sel<t?'Missed':'Not yet',nd)}${sh('Minimum reached, not the full target',mn)}${sh('Done',dn)}<small style="display:block;margin-top:12px">Tap a row to open it${sel<t?' and fix it for that day':''}. Green is the full target, blue is the minimum.</small></div>`}
 const so=(S.soc||{})[ws]||0,strip=wdays(ws).map(d=>{const f=d>=S.start&&d<=t,st=!f?'':fullOk(d)?'f':minOk(d)?'m':d<t?'x':'',bg=st==='f'?'var(--ok)':st==='m'?'var(--a)':st==='x'?'#fde8e8':'var(--c2)',fg=st==='f'||st==='m'?'#fff':st==='x'?'var(--r)':'var(--m)';return`<button data-a=wkday data-d="${d}" style="flex:1;text-align:center;border-radius:8px;padding:8px 0;font:inherit;font-size:12px;border:0;background:${bg};color:${fg};${d===sel?'box-shadow:0 0 0 2px var(--g)':''}">${DN[dow(d)]}<br><b style="font-weight:500">${st==='f'?'★':st==='m'?'✓':st==='x'?'✗':'·'}</b></button>`}).join('');
 h+=`<div class=card><div class=top><b>Days</b><small style="font-family:var(--mono)">${sm.ok}/7 minimum · ${sm.okF}/7 full</small></div><div style="display:flex;gap:4px;margin:12px 0 8px">${strip}</div><small>Tap a day to see what you did. ★ full day · ✓ minimum · ✗ missed</small></div>`
 +`<div class=card><div class=top><b style="font-weight:500">Sunday cardio</b><div class=seg style="margin:0;width:200px"><button class="${so?'':'on'}" data-a=soc data-v=0 data-w="${ws}">4x4</button><button class="${so?'on':''}" data-a=soc data-v=1 data-w="${ws}">Soccer</button></div></div>${so===1?`<button class="btn pri" data-a=socdone data-w="${ws}" style="margin-top:8px">${ic('check')} Mark soccer played</button>`:so===2?`<small>${ic('check')} Soccer played. Counts as cardio this week.</small>`:''}</div>`;
 h+=`<div class=top style="margin-top:16px"><h3 style="margin:0">Weekly targets</h3><small style="font-family:var(--mono)">${sm.met} / ${sm.n} met</small></div><div class=card>`+sm.rows.map(x=>`<div style="padding:8px 0;border-top:1px solid var(--hl)"><div class=top><span>${esc(x.n)}</span><span style="font-family:var(--mono);color:${x.v>=x.c&&x.c?'var(--ok)':'var(--t2)'}">${x.v} / ${x.c}</span></div><div style="display:flex;align-items:center;gap:8px"><div style="flex:1">${bar(x.v,x.c)}</div>${x.src==='x'?`<button class=btn data-a=wx data-w="${ws}" data-l="${esc(x.n)}" data-v=1 style="min-height:28px;margin:0;padding:0 10px">+</button><button class=btn data-a=wx data-w="${ws}" data-l="${esc(x.n)}" data-v=-1 style="min-height:28px;margin:0;padding:0 10px">−</button>`:''}</div></div>`).join('').replace('border-top:1px solid var(--hl)','border-top:0')+`<a class=btn href="#/targets" style="margin-top:8px">Edit targets</a></div>`;
 const days=wdays(ws).filter(d=>d>=S.start&&(cur?d<t:d<=t)).reverse();
 if(days.length)h+=`<h3>${cur?'Earlier this week':'Log'}</h3>`+days.map(d=>{const L=dayL(d),nn=new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'});return`<details class=card><summary class=nm style="display:flex;justify-content:space-between;align-items:center"><b style="font-weight:500">${nn}</b><span>${fullOk(d)?'<span class=chip style="background:var(--ok);border-color:var(--ok);color:#fff;margin:0">★</span>':minOk(d)?'<span class=chip style="background:var(--a);border-color:var(--a);color:#fff;margin:0">✓</span>':''}<small style="font-family:var(--mono);display:inline;margin-left:6px">${L.length} logged</small></span></summary>${L.length?L.map(x=>`<div style="display:flex;gap:8px;align-items:flex-start;padding:4px 0;font-size:14px;color:var(--t2)">${x}</div>`).join(''):'<small>Nothing logged.</small>'}</details>`}).join('');
 h+=`<h3>Review</h3><textarea data-c=rev data-w="${ws}" placeholder="What worked, what to fix next week">${esc(r.n)}</textarea><div class=row><button class="ck ${r.done?'on':''}" data-a=revdone data-w="${ws}"></button><span>Review done</span></div>`;
 h+=`<details class=card style="margin-top:16px"><summary class=nm style="display:flex;justify-content:space-between"><b style="font-weight:500">All weeks</b>${ic('chev')}</summary>`;for(let x=cw,i=0;x>=weekStart(S.start)&&i<26;x=addD(x,-7),i++){const q=wsum(x);h+=`<a class=lc href="#/week/${x}" style="padding:10px 0"><b style="font-size:15px">${fd(x)} – ${fd(addD(x,6))}</b><small>Days ${q.ok}/7 · Targets ${q.met}/${q.n}</small></a>`}
 return h+'</details>'}

function vTodo(){const t=D(),a=S.todo.map((x,i)=>({...x,i})).sort((p,q)=>(p.done-q.done)||((p.due||'9')<(q.due||'9')?-1:1));
 return`<h1>To-dos</h1><div class=card><input id=ta placeholder="New task"><small>Date (leave empty for no date)</small><input id=td class=dt type=date><small>Description (optional)</small><textarea id=tde rows=3 style="font-family:inherit"></textarea><small>Time (optional; empty = all-day)</small><input id=tt2 class=dt type=time><small>Estimated duration</small><select id=tdu><option value=15>15 min</option><option value=30 selected>30 min</option><option value=60>1 hour</option><option value=90>1.5 hours</option><option value=120>2 hours</option></select><button class="btn pri" data-a=todoadd>Add</button><small>Open to-dos also show on the Calendar, in red, on their day.</small></div>`+a.map(x=>`<div class=row><button class="ck ${x.done?'on':''}" data-a=todotog data-i=${x.i}></button><a href="#/t/${x.id}" style="flex:1;${x.done?'opacity:.4;text-decoration:line-through':''}">${esc(x.t)}<small style="${x.due&&x.due<t&&!x.done?'color:var(--r)':''}">${x.due||''}${x.time?' '+x.time:''}</small></a><button class=btn data-a=tododel data-i=${x.i}>✕</button></div>`).join('')}

const DH={train:8,routine:215,flow:40,fuel:130,money:48,mind:270,skill:210,rel:330,meaning:170,week:190,todo:0,focus:255,body:165},HUES=[0,25,45,95,150,185,215,255,290,330];
const evKey=e=>e.u?'u:'+e.u:'n:'+bkey(e.t),bndE=e=>{const b=S.bind||{};return b[evKey(e)]||b[bkey(e.t)]};
const CATS=[['train','Gym workout'],['routine','Routine'],['flow','Timed workout'],['fuel','Diet and water'],['money','Budget'],['skill','Skill and watch list'],['meaning','Reflect'],['week','Weeks'],['todo','To-dos'],['focus','Work focus'],['body','Body: weight and photos']];
const catOf=v=>v==='train'||v.startsWith('tr/')?'train':v.startsWith('r/')?'routine':v.startsWith('f/')?'flow':v;
const ITM=()=>({train:[['train','Any gym workout (I choose when I start)'],...Object.keys(tpls()).map(n=>['tr/'+n,n])],routine:routines().map(r=>['r/'+r.id,r.name]),flow:Object.keys(flows()).map(n=>['f/'+n,n])});
const typeHue=b=>{const c=catOf(b);return S.tcol&&S.tcol[c]!=null?S.tcol[c]:(DH[c]??200)};
const evHue=e=>{const b=bndE(e);return b?typeHue(b):null};
const bkey=t=>String(t).trim().toLowerCase(),bnd=t=>(S.bind||{})[bkey(t)];
const TG=()=>[['train','Workout (gym tracker)'],['fuel','Diet and water'],['money','Budget'],['skill','Skill and watch list'],['meaning','Reflect'],['week','Weeks'],['todo','To-dos'],['focus','Work focus'],['body','Body: weight and photos'],...routines().map(r=>['r/'+r.id,'My routine: '+r.name]),...Object.keys(flows()).map(n=>['f/'+n,'Timed workout: '+n]),...Object.keys(tpls()).map(n=>['tr/'+n,'Workout: '+n])];
const tgName=v=>v==='train'?'Gym workout · any':v.startsWith('tr/')?'Gym workout · '+v.slice(3):v.startsWith('r/')?'Routine · '+((routines().find(x=>'r/'+x.id===v)||{}).name||v.slice(2)):v.startsWith('f/')?'Timed workout · '+v.slice(2):((CATS.find(x=>x[0]===v)||[0,v])[1]);
function vExt(k,ds,rd){const e=extOn(ds||D()).find(x=>evKey(x)===k)||(S.gcal.evs||[]).find(x=>evKey(x)===k)||{t:(S.bname||{})[k]||k.replace(/^[un]:/,''),u:k.startsWith('u:')?k.slice(2):''},b=(S.bind||{})[k]||bndE(e);
 if(b&&rd){setTimeout(()=>location.replace('#/'+b+(b==='focus'&&e.sm!=null&&!e.ad?'/'+(e.em-e.sm):'')),0);return'<p>Opening…</p>'}
 const when=e.sm!=null?(e.ad?'All day':hmm(e.sm)+' to '+hmm(e.em)):'',t=esc(e.t),cat=b?catOf(b):'',items=ITM(),
 TI={train:'dumbbell',routine:'repeat',flow:'timer',fuel:'utensils',money:'wallet',mind:'wind',skill:'book',rel:'heart',meaning:'leaf',week:'chart',todo:'check',focus:'gem',body:'scale'},
 SH={train:'Gym workout',routine:'Routine',flow:'Timed workout',fuel:'Diet and water',money:'Budget',mind:'Mind',skill:'Skill',rel:'People',meaning:'Reflect',week:'Weeks',todo:'To-dos',focus:'Work focus',body:'Body'},
 tile=(v,label,icn)=>{const on=v===cat,h=v?typeHue(v):215;return`<button data-a=btype data-k="${esc(k)}" data-n="${t}" data-v="${v}" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px;margin:0;font:inherit;font-size:12px;font-weight:500;color:var(--t);cursor:pointer;border-radius:12px;border:${on?'2px':'1px'} solid ${on?`hsl(${h} 60% 45%)`:'var(--hl)'};background:${on?`hsl(${h} 80% 94%)`:'var(--c)'}"><span style="color:hsl(${h} ${v?'60%':'10%'} ${v?'40%':'50%'})">${ic(icn,22)}</span>${label}</button>`};
 return`<a href="#/plan">‹ Calendar</a><h1 style="margin-bottom:4px">${t}</h1><div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">${when?`<span class=chip style="margin:0">${when}</span>`:''}${e.rc?'<span class=chip style="margin:0">Repeats</span>':''}<span class=chip style="margin:0">Google Calendar</span></div>`
 +(e.d?`<div class=card style="white-space:pre-wrap;font-size:14px">${esc(e.d)}</div>`:'')
 +(()=>{const grid=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">${CATS.map(c=>tile(c[0],SH[c[0]]||c[1],TI[c[0]]||'link')).join('')}${tile('','Not linked','open')}</div>`;if(!cat)return`<h3 style="margin-top:20px">What kind of event is this?</h3>${grid}`;const h=typeHue(cat);return`<details class=card style="margin-top:20px;padding:12px 16px"><summary class=nm style="display:flex;align-items:center;gap:12px;cursor:pointer;list-style:none"><span style="color:hsl(${h} 60% 40%)">${ic(TI[cat]||'link',22)}</span><span style="flex:1"><small style="display:block">Type of event</small><b style="font-weight:500">${SH[cat]||cat}</b></span><small style="color:var(--g)">Change</small></summary>${grid}</details>`})()
 +(items[cat]?`<h3>Which one?</h3>`+(items[cat].length?`<select data-c=bsel2 data-k="${esc(k)}" data-n="${t}">${items[cat].map(x=>`<option value="${esc(x[0])}" ${b===x[0]?'selected':''}>${esc(x[1])}</option>`).join('')}</select>`:`<div class=card><small>You have none yet, so tapping this event opens the list. Create one first.</small><a class="btn pri" href="#/${cat==='routine'?'rtn/new':'flows'}" style="margin-top:8px">${cat==='routine'?'Create a routine':'Open timed workouts'}</a></div>`):'')
 +(b?`<a class="btn pri" href="#/${b}" style="width:100%;justify-content:center;margin:16px 0 4px;min-height:48px">Open ${esc(tgName(b))}</a><small>${e.rc?'This applies to every repeat of this event. ':''}Tapping the event on the calendar opens this page. Colours are in More › Google Calendar sync.</small>`:'<small style="display:block;margin-top:12px">Pick a type and the event gets a colour on the calendar. Tapping it will then open that page.</small>')
 +`<details class=card style="margin-top:20px"><summary><b style="font-weight:500">Add a link inside Google Calendar</b></summary><small style="display:block;margin:8px 0">Optional. Paste this into the event's description in Google Calendar yourself, and the link opens the linked page. Only do this if nobody else sees your calendar.</small><button class=btn data-a=copy data-v="${base()}#/x/${encodeURIComponent(k)}">Copy link</button></details>`}
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
 const PG=[['fuel','utensils','Diet and water','Tick meals, log water and steps'],['money','wallet','Budget','Income, expenses and buckets'],['skill','book','Skill and watch list','Learn focus, audio and your list per day'],['meaning','leaf','Reflect','Rate your day, gratitude and wins'],['week','chart','Weeks','Your log per day and week'],['todo','check','To-dos','Tasks with date, time and description']];
 return`<h1>Event types</h1><small>Everything a Google event or a routine step can open. Open one, or edit it. The number is how many events and routine steps are linked to it.</small>
 <h3>Pages</h3>`+PG.map(p=>row('#/'+p[0],p[1],p[2],p[3],p[0])).join('')
 +`<h3>My routines</h3>`+(routines().map(r=>row('#/r/'+r.id,'repeat',r.name,r.steps.length+' steps',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('r/'+r.id)} linked</small>`)).join('')||'<small>No routines yet.</small>')+`<a class=btn href="#/rtn" style="margin-top:8px">Edit routines</a>`
 +`<h3>Timed workouts</h3>`+Object.entries(flows()).map(([n,st])=>row('#/f/'+encodeURIComponent(n),'timer',n,Math.round(st.reduce((a,x)=>a+x[1],0)/60)+' min',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('f/'+n)} linked</small>`)).join('')+`<a class=btn href="#/flows" style="margin-top:8px">Edit flows and cardio</a>`
 +`<h3>Gym workouts</h3>`+row('#/train','dumbbell','Gym tracker','Any gym workout, plus your history',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('train')} linked</small>`)+Object.keys(tpls()).map(n=>row('#/tr/'+encodeURIComponent(n),'dumbbell',n,'Strength session',null).replace('<small style="white-space:nowrap"></small>',`<small style="white-space:nowrap">${nUse('tr/'+n)} linked</small>`)).join('')+`<a class=btn href="#/set/tpl" style="margin-top:8px">Edit workouts, sets and rest times</a>`}
function vNewTodo(d,tm){const du=[15,30,45,60,90,120,180];return`<a href="#/plan">‹ Calendar</a><h1>New to-do</h1><div class=card><input id=nt placeholder="What needs doing?"><small>Date</small><input id=ntd class=dt type=date value="${esc(d)}"><small>Time</small><input id=ntt class=dt type=time value="${esc(tm)}"><small>Duration</small><select id=ntu>${du.map(m=>`<option value=${m} ${m===30?'selected':''}>${m} min</option>`).join('')}</select><small>Description</small><textarea id=ntde rows=3 style="font-family:inherit"></textarea><button class="btn pri" data-a=tnadd>Add to-do</button></div>`}
const PGS=[['fuel','Diet and water'],['money','Budget'],['skill','Skill and watch list'],['meaning','Reflect'],['week','Weeks'],['todo','To-dos'],['body','Body: weight and photos'],['focus','Work focus'],['spotify','Spotify']];
function srow(t,m,l){const o=(v,n)=>`<option value="${esc(v)}" ${l===v?'selected':''}>${esc(n)}</option>`;
 return`<div class=srow style="border-top:1px solid var(--hl);padding:12px 0"><div style="display:grid;grid-template-columns:1fr 72px;gap:8px"><input class=st-t placeholder="Step, e.g. Brush teeth" value="${esc(t||'')}"><input class=st-m type=number inputmode=numeric placeholder="min" value="${m||''}"></div><select class=st-l><option value="">No page, just tick it</option><optgroup label="Open a page">${PGS.map(p=>o(p[0],p[1])).join('')}</optgroup><optgroup label="Timed workouts (starts the timer)">${Object.keys(flows()).map(n=>o('flow:'+n,n)).join('')}</optgroup><optgroup label="Gym workouts">${o('train','Any gym workout (I choose)')}${Object.keys(tpls()).map(n=>o('gym:'+n,n)).join('')}</optgroup></select><button class=btn data-a=rtnrm>Remove step</button></div>`}
const wsrc=cur=>{const o=(v,n)=>`<option value="${esc(v)}" ${cur===v?'selected':''}>${esc(n)}</option>`,base=[['lift','Gym workouts finished (count)'],['weigh','Days weighed in'],['focush','Work focus time (hours)'],['focus','Work focus blocks finished (count)'],['focusm','Work focus minutes'],['steps','Days at step target'],['water','Days at water target'],['diet','Days near your calorie target'],['med','Days with box breathing'],['jr','Days journaled'],['rev','Weekly review done'],['x','Manual counter (+ and −)']],ids=[...base.map(x=>x[0]),...routines().map(r=>'r:'+r.id),...Object.keys(tpls()).map(n=>'gym:'+n),...Object.keys(flows()).map(n=>'flow:'+n)];
 return`<select class=w-s data-c=wkr><optgroup label="Fills in by itself">${base.map(x=>o(x[0],x[1])).join('')}</optgroup><optgroup label="My routines (days finished)">${routines().map(r=>o('r:'+r.id,r.name)).join('')}</optgroup><optgroup label="Gym workouts (sessions)">${Object.keys(tpls()).map(n=>o('gym:'+n,n)).join('')}</optgroup><optgroup label="Timed workouts (sessions)">${Object.keys(flows()).map(n=>o('flow:'+n,n)).join('')}</optgroup>${ids.includes(cur)?'':o(cur,'Custom: '+cur)}</select>`};
const wrow=(n,c,m,src)=>`<div class=wrow style="border-top:1px solid var(--hl);padding:12px 0"><input class=w-n data-c=wkr placeholder="Target name" value="${esc(n||'')}"><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div><small>Full target</small><input class=w-c data-c=wkr type=number inputmode=numeric value="${c??''}"></div><div><small>Minimum</small><input class=w-m data-c=wkr type=number inputmode=numeric value="${m??''}"></div></div><small>Counts from</small>${wsrc(src||'x')}<button class=btn data-a=wkrm>Remove</button></div>`;
function vTargets(){return`<a href="#/week">‹ Weeks</a><h1>Weekly targets</h1><small>Each target counts by itself. Pick what it counts from.</small><div id=wrows>`+lines(S.cfg.wk).map(l=>{const[n,c,m,src]=l.split('|').map(x=>x.trim());return wrow(n,c,m,src)}).join('')+`</div><button class=btn data-a=wkadd>+ Add target</button>`}
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


const CF=[['day','Daily targets (minimum and full day)','label|full-day target|minimum-day target|source. Sources: steps water diet(percent) med(minutes) jr(1 = journal written) lift(workouts that day). A minimum day = every minimum target reached. A full day = every full target reached.'],['routines','Routines (calendar events)','# name|start|minutes|days 1-7|unused, leave blank|essential 1/0|colour 0-360, then steps: title|minutes|link|short version (* = keep, number = minutes, blank = skipped). Links: fuel money mind skill rel meaning train week todo spotify flow:Name. Titles can use {learn} {audio} {train}.'],['flows','Timed workouts','# Name, then step|seconds'],['themes','Day themes','day 1-7|learn|audio|train template name|spotify link'],['tpl','Workout templates','# Name, then exercise|sets|reps|rest sec'],['inc','Income sources','Name|expected per month €. Salary, trading wins, anything that comes in.'],['cats','Expense buckets','Name|monthly budget €|optional minimum €. Rent, groceries, savings and so on.'],['wk','Weekly targets','label|full target|minimum target|source: lift steps water diet med jr rev r:routine-id (join several with +) x(manual +/- counter)']];
const NF=[['waterT','Water target ml'],['stepsT','Steps target'],['stepsMin','Steps minimum']];
function vSet(k){if(k)setTimeout(()=>{const e=document.getElementById('cfg-'+k);if(e)e.scrollIntoView()},50);return`<h1>Settings</h1><small>Everything is editable. Use | to separate fields and never use | inside text.</small><h3>Numbers</h3>`+NF.map(([k,l])=>`<small>${l}</small><input type=number inputmode=decimal data-c=num data-k=${k} value="${S.cfg[k]}">`).join('')
 +CF.map(([k,l,h])=>`<h3 id="cfg-${k}">${l}</h3><small>${esc(h)}</small><textarea data-c=cfg data-k=${k} rows=8>${esc(S.cfg[k])}</textarea><button class=btn data-a=cfgreset data-k=${k}>Reset to default</button>`).join('')
 +`<h3>Data</h3><button class=btn data-a=export>Export backup (JSON)</button><label class=btn>Import backup<input id=imp type=file accept=".json" hidden></label>`}

function vMore(){const L=(r,i,t)=>`<a class=lr href="#/${r}"><span class=li>${ic(i)}${t}</span>${ic('chev')}</a>`;
 return`<h1>More</h1><h3>Track</h3>`+L('body','scale','Body: weight and photos')+L('focus','gem','Work focus')+L('train','dumbbell','Gym workouts')+L('fuel','utensils','Diet, water and steps')+L('money','wallet','Budget')+`<h3>Grow</h3>`+L('skill','book','Skill and money')+L('meaning','leaf','Reflect')+`<h3>Review and plan</h3>`+L('week','chart','Weeks')+L('todo','check','To-dos')+L('rtn','repeat','My routines')+L('types','layers','Event types')+L('flows','timer','Timed workouts')+`<h3>App</h3>`+L('links','calendar','Google Calendar sync')+L('set','sliders','Settings')+`<div class=row style="margin-top:8px"><span style="flex:1">Version<small style="font-family:var(--mono)">${BUILD}</small></span><button class=btn data-a=refresh>${ic('refresh')} Update app</button></div><small>Your data stays on the phone when you update</small>`}

function vDay(d,w){const i=DN.map(x=>x.toLowerCase()).indexOf(String(d).toLowerCase());return w==='learn'?vSkill(i>0?i:d):w==='train'?vTrain():vPlan()}

/* ---------- actions ---------- */
const A={
nadd:({k})=>{const t=$('#ne').value.trim();if(!t)return false;(S.nl[k]=S.nl[k]||[]).push({d:$('#nd').value||D(),t})},ndel:({k,i})=>{if(!confirm('Delete this entry?'))return false;S.nl[k].splice(+i,1)},wkday:({d})=>{WKD=d},tgo:()=>{if(R)location.hash='#/run';else if(S.active)location.hash='#/train';return false},wkgo:({h,d,k})=>{if(k==='fuel')S.fday=d===D()?'':d;if(k==='refl')rfd().d=d;save();location.hash=h;return false},fshift:({v})=>{const n=addD(S.fday||D(),+v);S.fday=n>=D()?'':n},soc:({v,w:wk})=>{S.soc=S.soc||{};const w=wk||weekStart(D());if(+v===1)S.soc[w]=S.soc[w]||1;else delete S.soc[w]},socdone:({w:wk})=>{S.soc=S.soc||{};S.soc[wk||weekStart(D())]=2},rfr:({v})=>{const d=rfd();d.r=d.r===+v?0:+v;RFOK=''},rftag:({t})=>{const d=rfd();d.tg=d.tg.includes(t)?d.tg.filter(x=>x!==t):[...d.tg,t];RFOK=''},rfsave:()=>{const d=rfd(),has=d.r||d.tg.length||RQ.some(([k])=>(d[k]||'').trim());if(!has){alert('Tap a rating or write something first');return false}const e={d:d.d||D(),r:d.r||0,tg:d.tg.slice()};RQ.forEach(([k])=>{if((d[k]||'').trim())e[k]=d[k].trim()});e.t=[e.r?'Day rated '+e.r+'/5':'',e.g&&'Grateful: '+e.g,e.w&&'Win: '+e.w,e.m&&'Mattered: '+e.m,e.x&&'Tomorrow: '+e.x,e.n].filter(Boolean).join('. ');(S.nl.meaning=S.nl.meaning||[]).push(e);const j=S.jr[e.d]=S.jr[e.d]||{};if(e.g)j.g=e.g;if(e.w)j.w=e.w;if(e.x)j.t=e.x;if(!j.g&&!j.w&&!j.t)j.w=e.t.slice(0,80);RFOK=e.d;S.rfd={d:D(),r:0,tg:[]}},rfdel:({i})=>{if(!confirm('Delete this reflection?'))return false;S.nl.meaning.splice(+i,1);RFOK=''},
faddk:({m})=>{const f=food(gv('fsa-'+m).slice(2)),am=num(gv('fa2-'+m));if(!f||!(am>0))return ferr(m,'Type an amount');(S.fd[S.fday||D()]=S.fd[S.fday||D()]||[]).push({id:uid(),f:f.id,a:am,m:MEALS[+m]})},faddn:({m})=>{const n=fnm(m),per=num(gv('fper-'+m)),am=num(gv('fan-'+m)),f={id:uid(),n,per,u:gv('fu-'+m)||'g',k:num(gv('fk-'+m)),p:num(gv('fp-'+m)),c:num(gv('fc-'+m)),f:num(gv('ff-'+m))};if(!n||!(per>0))return ferr(m,'Fill in the amount the label is based on, like 100');if(!(f.k||f.p||f.c||f.f))return ferr(m,'Fill in the label values');if(!(am>0))return ferr(m,'Type how much you ate');const sv=$('#fsv2-'+m);if(sv&&sv.checked){(S.foods=S.foods||[]).push(f);(S.fd[S.fday||D()]=S.fd[S.fday||D()]||[]).push({id:uid(),f:f.id,a:am,m:MEALS[+m]})}else{const x=fcalc(f,am);(S.fd[S.fday||D()]=S.fd[S.fday||D()]||[]).push({id:uid(),q:1,n,k:x.k,p:x.p,c:x.c,f:x.f,a:am,u:f.u,m:MEALS[+m]})}},fquick:({m})=>{const p=num(gv('qp-'+m)),c=num(gv('qc-'+m)),f=num(gv('qf-'+m));let k=num(gv('qk-'+m));if(!k)k=p*4+c*4+f*9;if(!(k>0))return ferr(m,'Type at least calories or one of the macros');(S.fd[S.fday||D()]=S.fd[S.fday||D()]||[]).push({id:uid(),q:1,n:gv('ql-'+m).trim()||'Quick add',k,p,c,f,m:MEALS[+m]})},ftab:({m,t})=>{const was=$('#fps-'+t+'-'+m).style.display!=='none';['set','lab','qk'].forEach(x=>{$('#fps-'+x+'-'+m).style.display='none';$('#ft-'+x+'-'+m).classList.remove('on')});if(!was){$('#fps-'+t+'-'+m).style.display='';$('#ft-'+t+'-'+m).classList.add('on')}ferr(m,'');return false},fset2:({m,v})=>{const s=(S.sets||[]).find(x=>'s:'+x.id===gv('fsa-'+m));if(!s)return ferr(m,'Choose a meal');(S.fd[S.fday||D()]=S.fd[S.fday||D()]||[]).push(...s.items.filter(i=>food(i.f)).map(i=>({id:uid(),f:i.f,a:Math.round(i.a*(+v)*10)/10,m:MEALS[+m]})))},fdel:({id})=>{const t=S.fday||D();S.fd[t]=(S.fd[t]||[]).filter(x=>x.id!==id)},ftoday:()=>{S.fday=''},fadd:({m})=>{const t=S.fday||D(),f=food($('#fsel-'+m).value),am=num($('#fam-'+m).value);if(!f||!(am>0))return false;(S.fd[t]=S.fd[t]||[]).push({id:uid(),f:f.id,a:am,m:MEALS[+m]})},fset:({id,v})=>{const s=S.sets.find(x=>x.id===id),t=S.fday||D();if(!s)return false;(S.fd[t]=S.fd[t]||[]).push(...s.items.filter(i=>food(i.f)).map(i=>({id:uid(),f:i.f,a:Math.round(i.a*(+v)*10)/10,m:s.m||'Breakfast'})))},ffnew:()=>{(S.foods=S.foods||[]).push({id:uid(),n:'',per:100,u:'g',k:0,p:0,c:0,f:0})},ffdel:({id})=>{S.foods=S.foods.filter(f=>f.id!==id);S.sets.forEach(s=>s.items=s.items.filter(i=>i.f!==id))},snew:()=>{(S.sets=S.sets||[]).push({id:uid(),n:'',m:'Breakfast',items:[]})},sdel:({id})=>{S.sets=S.sets.filter(s=>s.id!==id)},sadd:({id})=>{const s=S.sets.find(x=>x.id===id);if(s)s.items.push({f:(S.foods[0]||{}).id,a:100})},sirm:({id,i})=>{const s=S.sets.find(x=>x.id===id);if(s)s.items.splice(+i,1)},btype:({k,n,v})=>{I.bsel({dataset:{k,n},value:v});return false},fstart:({m})=>{fstart(m)},bwsave:()=>{const v=parseFloat(($('#bwk').value||'').replace(',','.')),d=$('#bwd').value||D();if(!(v>20&&v<300))return false;S.bw[d]=Math.round(v*10)/10},bwdel:({d})=>{delete S.bw[d]},bpdel:({i})=>{S.bp.splice(+i,1)},bpsave:()=>{const d=$('#bpd').value||D(),f=$('#bpf').files[0],add=img=>{S.bp=S.bp||[];S.bp.push({d,img:img||''});S.bp.sort((x,y)=>x.d<y.d?1:-1);try{localStorage.lifeos1=JSON.stringify(S)}catch(e){S.bp[S.bp.findIndex(p=>p.img===img&&p.d===d)].img='';alert('Not enough space on the phone for the picture, so only the date was saved. Delete older photos to make room.')}save();go()};if(!f){add();return false}const im=new Image(),u=URL.createObjectURL(f);im.onload=()=>{const s=Math.min(1,480/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);add(c.toDataURL('image/jpeg',.7))};im.onerror=()=>add();im.src=u;return false},fdur:({v})=>{S.fdur=+v;S.fdst=''},fsm:()=>{S.fsm=S.fsm?0:1},fseat:({v})=>{S.fseat=v;S.fsm=0;chime([880])},fdst:({v})=>{S.fdst=v},fgo:({n})=>{if(S.foc){S.foc.go={n,t:Date.now()};save()}return false},fstop:()=>{const f=S.foc;if(!f.sure||Date.now()-f.sure>5e3){f.sure=Date.now();save();setTimeout(go,5100);return}f.sure=0;ffail('You ended the flight early.',Date.now())},ffin:()=>{fover(S.foc);wake(false)},fend:()=>{S.foc=null;wake(false)},fapadd:()=>{$('#fap').insertAdjacentHTML('beforeend',fapRow('',''));return false},fapdel:(d,el)=>{el.closest('.wrow2').remove();I.fap();save();return false},
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
rstop:()=>{RUN=null;T=null;S.timer=null;sched();kaOff();wake(false)},
rback:({d})=>{sel=d;location.hash='#/plan';return false},
ctxdone:()=>{const c=S.ctx;if(!c)return;(S.chk[c.d]=S.chk[c.d]||{})[c.k]=1;S.ctx=null;save();location.hash='#/r/'+c.r+'/'+c.d;go();return false},
ctxx:()=>{S.ctx=null},
water:({v})=>{const k=S.fday||D();S.water[k]=Math.max(0,(S.water[k]||0)+ +v)},
zoom:({v})=>{S.z=clampZ(Zv()*(+v>0?1.4:1/1.4))},
gsync:()=>{gsync(true);return false},
ing:({k})=>{const g=S.ing[td()]=S.ing[td()]||{};g[k]=!g[k]},
ingall:({m})=>{const dm=diet().find(x=>x.n===m),g=S.ing[td()]=S.ing[td()]||{},on=dm.items.every(i=>g[m+'|'+i.n]);dm.items.forEach(i=>g[m+'|'+i.n]=!on)},
tadd:({s})=>{if(T){T.end+= +s*1e3;if(S.timer)S.timer.end=T.end;sched()}},
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
runback:()=>{if(R.fin){R.fin=0;(S.fl||[]).pop()}R.i=Math.max(0,R.i-1);runStep()},runend:()=>{const r=R;R=null;T=null;S.timer=null;wake(false);if(r&&r.ret){location.hash=r.ret;return}if(S.ctx)return A.ctxdone();location.hash='#/plan'},mobgo:({n})=>{startFlow(n,1);R.ret='#/train';location.hash='#/run';return false},
runstop:()=>{R=null;T=null;S.timer=null;wake(false);location.hash=S.ctx?'#/r/'+S.ctx.r+'/'+S.ctx.d:'#/plan'},
bind:({k,n,v})=>{(S.bind=S.bind||{})[k]=v;(S.bname=S.bname||{})[k]=n},
unbind:({k,n})=>{delete S.bind[k];delete S.bind[bkey(n)]},
tcol:({v,h})=>{(S.tcol=S.tcol||{})[v]=+h},
todotogid:({id})=>{const x=S.todo.find(y=>y.id===id);x.done=x.done?0:1;x.sy=0;setTimeout(tflush,50)},
tododelid:({id})=>{const i=S.todo.findIndex(y=>y.id===id);if(i<0)return false;const x=S.todo[i];if(x.sy)S.tdel.push(x.id);S.todo.splice(i,1);save();setTimeout(tflush,50);location.hash='#/plan';return false},
tds:()=>{S.gcal.tds=S.gcal.tds?0:1;if(S.gcal.tds)S.todo.forEach(x=>x.sy=0)},
copy:({v})=>{(navigator.clipboard?.writeText(v)||Promise.reject()).then(()=>alert('Link copied')).catch(()=>prompt('Copy this link',v));return false},
cfgreset:({k})=>{if(confirm('Reset this section to defaults?'))S.cfg[k]=DEF.cfg[k]},
export:()=>{const n='lifeos-backup-'+td()+'.json';if(NATIVE)nat({t:'export',name:n,data:JSON.stringify(S)});else dl(n,JSON.stringify(S),'application/json');return false},
refresh:async()=>{try{(await navigator.serviceWorker.getRegistrations()).forEach(r=>r.unregister());(await caches.keys()).forEach(k=>caches.delete(k))}catch(e){}location.replace(location.pathname+'?u='+Date.now()+location.hash);return false}};
const dl=(n,t,ty)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:ty}));a.download=n;a.click()};

let tft=0;
const I={fsa:el=>{const m=el.dataset.m,v=gv('fsa-'+m),f=v.startsWith('f:')?food(v.slice(2)):null,sh=(id,on)=>{const e=$('#'+id);if(e)e.style.display=on?'':'none'},T=(id,t)=>{const e=$('#'+id);if(e)e.textContent=t};ferr(m,'');sh('fkn-'+m,!!f);sh('fsm-'+m,v.startsWith('s:'));if(f){T('fku-'+m,f.u);T('fkl-'+m,'Label: per '+f.per+' '+f.u+' · '+r0(f.k)+' kcal');const am=num(gv('fa2-'+m));T('fpvk-'+m,am>0?am+' '+f.u+' = '+r0(fcalc(f,am).k)+' kcal':'')}},fdh:el=>{S.fdur=Math.max(5,+el.value*60+fdm()%60);S.fdst='';setTimeout(go,0)},fdmn:el=>{S.fdur=Math.max(5,Math.floor(fdm()/60)*60+ +el.value);S.fdst='';setTimeout(go,0)},rf:el=>{rfd()[el.dataset.k]=el.value},fsavepref:el=>{S.fsave=el.checked},fq:el=>{const m=el.dataset.m,n=fnm(m),id=gv('fsv-'+m),f=id?food(id):null,sh=(id,on)=>{const e=$('#'+id);if(e)e.style.display=on?'':'none'},T=(id,t)=>{const e=$('#'+id);if(e)e.textContent=t};ferr(m,'');sh('fkn-'+m,!!f);sh('fnew-'+m,!id);
 if(f){T('fkl-'+m,'Saved: per '+f.per+' '+f.u+' · '+f.k+' kcal · '+f.p+' g protein · '+f.c+' g carbs · '+f.f+' g fat');T('fku-'+m,f.u);const am=num(gv('fa2-'+m));T('fpvk-'+m,am>0?am+' '+f.u+' = '+r0(fcalc(f,am).k)+' kcal · '+r0(fcalc(f,am).p)+' g protein':'')}
 else if(!id){const u=gv('fu-'+m),nf={per:num(gv('fper-'+m)),k:num(gv('fk-'+m)),p:num(gv('fp-'+m)),c:num(gv('fc-'+m)),f:num(gv('ff-'+m))},am=num(gv('fan-'+m));T('fau-'+m,u);if(am>0&&nf.per>0){const x=fcalc(nf,am);T('fpvn-'+m,am+' '+u+' = '+r0(x.k)+' kcal · '+r0(x.p)+' g protein')}else T('fpvn-'+m,'')}},fday:el=>{S.fday=el.value||'';setTimeout(go,0)},fprev:el=>{const m=el.dataset.m,f=food($('#fsel-'+m).value),am=num($('#fam-'+m).value),o=$('#fpv-'+m);if(!o)return;if(f&&am>0){const n=fcalc(f,am);o.textContent=am+' '+f.u+' = '+r0(n.k)+' kcal · '+r0(n.p)+' g protein'}else o.textContent=''},food:el=>{const f=S.foods.find(x=>x.id===el.dataset.id);if(!f)return;const k=el.dataset.k;f[k]=k==='n'?el.value:k==='u'?el.value:num(el.value)},set:el=>{const s=S.sets.find(x=>x.id===el.dataset.id);if(s)s[el.dataset.k]=el.value},setit:el=>{const s=S.sets.find(x=>x.id===el.dataset.id),it=s&&s.items[+el.dataset.i];if(it)it[el.dataset.k]=el.dataset.k==='a'?num(el.value):el.value},bgoal:el=>{S.bgoal=parseFloat(String(el.value).replace(',','.'))||0},fapx:el=>{if(!el.value)return;const[n,u]=el.value.split('|');$('#fap').insertAdjacentHTML('beforeend',fapRow(n,u));I.fap();el.value=''},fap:()=>{S.cfg.fapps=[...document.querySelectorAll('.wrow2')].map(r=>[r.querySelector('.fa-n').value.replace(/\|/g,' ').trim(),r.querySelector('.fa-u').value.replace(/\|/g,'').trim()].join('|')).filter(l=>l!=='|').join('\n')},wkr:()=>{S.cfg.wk=[...document.querySelectorAll('.wrow')].map(r=>[r.querySelector('.w-n').value.replace(/\|/g,' ').trim(),r.querySelector('.w-c').value||0,r.querySelector('.w-m').value||0,r.querySelector('.w-s').value].join('|')).join('\n')},bsel:el=>{const k=el.dataset.k,n=el.dataset.n,v=el.value;S.bind=S.bind||{};S.bname=S.bname||{};if(!v){delete S.bind[k];delete S.bind[bkey(n)]}else{const it=ITM()[v];if(it){if(!it.length){S.bind[k]=v;S.bname[k]=n;save();setTimeout(go,0);return}S.bind[k]=it[0][0]}else S.bind[k]=v;S.bname[k]=n}save();setTimeout(go,0)},bsel2:el=>{S.bind[el.dataset.k]=el.value;S.bname[el.dataset.k]=el.dataset.n;save();setTimeout(go,0)},th:el=>{const T=themes(),d=+el.dataset.d,k=el.dataset.k;T[d]=T[d]||{};if(k==='q')T[d].q=el.value.split('\n').map(x=>x.trim()).filter(Boolean).map(x=>{const m=x.match(/^(.*?)\s*(https?:\S+)$/);return m?{t:m[1],u:m[2]}:{t:x,u:''}});else T[d][k]=el.value.replace(/\|/g,' ');S.cfg.themes=themesText(T)},flowt:el=>{const f=flows();f[el.dataset.n]=el.value.split('\n').filter(l=>l.trim()).map(l=>{const[n,x]=l.split('|');return[(n||'').trim(),+x||60]});S.cfg.flows=flowsText(f)},sk:el=>{$('#sc').style.display=el.value==='e'?'':'none';$('#si').style.display=el.value==='i'?'':'none'},tf:el=>{const x=S.todo.find(y=>y.id===el.dataset.id);if(!x)return;const k=el.dataset.k;x[k]=k==='dur'?+el.value:el.value;x.sy=0;clearTimeout(tft);tft=setTimeout(tflush,1500)},

w:el=>{S.active.ex[+el.dataset.x].s[+el.dataset.s].w=el.value},
r:el=>{S.active.ex[+el.dataset.x].s[+el.dataset.s].r=el.value},
steps:el=>{const v=+el.value||0;S.steps[S.fday||D()]=v;const c=el.closest('.card'),n=c&&c.querySelector('.stv'),b=c&&c.querySelector('.bar i'),t=S.cfg.stepsT;if(n)n.textContent=r0(v);if(b){b.style.width=(t?Math.min(100,v/t*100):0)+'%';b.className=v>t&&t?'o':''}},
jr:el=>{(S.jr[td()]=S.jr[td()]||{})[el.dataset.k]=el.value},
js:el=>{$('#jl').innerHTML=jlist(el.value)},

gc:el=>{S.gcal[el.dataset.k]=el.value.trim()},
rev:el=>{const w=el.dataset.w;S.rev[w]=S.rev[w]||{};S.rev[w].n=el.value},
cfg:el=>{S.cfg[el.dataset.k]=el.value},
num:el=>{S.cfg[el.dataset.k]=+el.value}};
document.addEventListener('click',e=>{unlock();const el=e.target.closest('[data-a]');if(!el)return;const f=A[el.dataset.a];if(f&&f(el.dataset,el)!==false){save();go()}});
document.addEventListener('input',e=>{const f=I[e.target.dataset.c];if(f){f(e.target);save()}});
document.addEventListener('change',e=>{if(e.target.id!=='imp')return;const f=e.target.files[0];if(!f)return;f.text().then(t=>{S=load(JSON.parse(t));save();go()}).catch(()=>alert('Invalid backup file'))});
document.addEventListener('touchend',unlock,{passive:true});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){unlock();if(T)sched();tick();if(T||B)wake(true);gsync(false);tflush();chk()}});

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
/* ---------- work focus: every block is a flight ---------- */
const FM={s:{n:'Short',f:25,b:5,bud:5,lo:150,hi:450,use:'Low energy, a hard time starting, or quick admin like email and organising files.'},l:{n:'Long',f:50,b:10,bud:10,lo:450,hi:900,use:'Complex work where switching context costs a lot: writing software, long reports, continuous design.'}},GRACE=20;
const fapps=()=>lines(S.cfg.fapps).map(l=>{const[n,u]=l.split('|').map(x=>x.trim());return{n,u}}).filter(x=>x.n&&x.u);
const fses=d=>(S.fs||[]).filter(x=>x.ok&&(!d||x.d===d)),fmin=d=>fses(d).reduce((a,x)=>a+x.mins+(x.over||0),0);
const ftot=()=>fmin(),hm=m=>m>=60?(Math.round(m/6)/10)+' h':m+' min',cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const CITY={AMS:['Amsterdam',52.31,4.76],BRU:['Brussels',50.90,4.48],DUS:['Düsseldorf',51.29,6.77],CGN:['Cologne',50.87,7.14],LUX:['Luxembourg',49.63,6.21],HAM:['Hamburg',53.63,9.99],FRA:['Frankfurt',50.04,8.56],CDG:['Paris',49.01,2.55],LHR:['London',51.47,-0.45],BRE:['Bremen',53.05,8.79],HAJ:['Hanover',52.46,9.69],BER:['Berlin',52.37,13.50],CPH:['Copenhagen',55.62,12.65],MUC:['Munich',48.35,11.79],STR:['Stuttgart',48.69,9.22],ZRH:['Zurich',47.46,8.55],BSL:['Basel',47.59,7.53],SXB:['Strasbourg',48.54,7.63],LIL:['Lille',50.56,3.09],MAN:['Manchester',53.35,-2.27],BHX:['Birmingham',52.45,-1.75],EDI:['Edinburgh',55.95,-3.36],DUB:['Dublin',53.42,-6.27],BLL:['Billund',55.74,9.15],GOT:['Gothenburg',57.66,12.28],OSL:['Oslo',60.19,11.10],PRG:['Prague',50.10,14.26],VIE:['Vienna',48.11,16.57],MXP:['Milan',45.63,8.72],LYS:['Lyon',45.72,5.08],NTE:['Nantes',47.15,-1.61],BOD:['Bordeaux',44.83,-0.72],LEJ:['Leipzig',51.42,12.24],NUE:['Nuremberg',49.50,11.08],GVA:['Geneva',46.24,6.11],BRS:['Bristol',51.38,-2.72],NCL:['Newcastle',55.04,-1.69],ABZ:['Aberdeen',57.20,-2.20],ARN:['Stockholm',59.65,17.92],WAW:['Warsaw',52.17,20.97],FCO:['Rome',41.80,12.25],BCN:['Barcelona',41.30,2.08],MAD:['Madrid',40.49,-3.57],LIS:['Lisbon',38.77,-9.13],NCE:['Nice',43.66,7.21],VCE:['Venice',45.50,12.35],BUD:['Budapest',47.44,19.26],IST:['Istanbul',41.26,28.74],ATH:['Athens',37.94,23.94],KEF:['Reykjavik',63.99,-22.62],HEL:['Helsinki',60.32,24.96],RIX:['Riga',56.92,23.97],TFS:['Tenerife',28.04,-16.57],RAK:['Marrakech',31.61,-8.04],CAI:['Cairo',30.12,31.41],TLV:['Tel Aviv',32.01,34.89],LCA:['Larnaca',34.88,33.62],SPU:['Split',43.54,16.30],DBV:['Dubrovnik',42.56,18.27],OPO:['Porto',41.24,-8.68],AGP:['Malaga',36.67,-4.50],PMI:['Palma',39.55,2.74],DXB:['Dubai',25.25,55.36],DOH:['Doha',25.27,51.61],JFK:['New York',40.64,-73.78],BOS:['Boston',42.36,-71.01],YUL:['Montreal',45.47,-73.74],ORD:['Chicago',41.98,-87.90],MIA:['Miami',25.79,-80.29],LAX:['Los Angeles',33.94,-118.41],SFO:['San Francisco',37.62,-122.38],GRU:['São Paulo',-23.43,-46.47],CPT:['Cape Town',-33.97,18.60],NBO:['Nairobi',-1.32,36.93],DEL:['Delhi',28.56,77.10],BKK:['Bangkok',13.69,100.75],SIN:['Singapore',1.36,103.99],HKG:['Hong Kong',22.31,113.91],NRT:['Tokyo',35.77,140.39],SYD:['Sydney',-33.94,151.18],MEL:['Melbourne',-37.67,144.84]};
const km=(a,b)=>{const A=CITY[a],B=CITY[b];if(!A||!B)return 0;const r=Math.PI/180,dl=(B[1]-A[1])*r,dn=(B[2]-A[2])*r,h=Math.sin(dl/2)**2+Math.cos(A[1]*r)*Math.cos(B[1]*r)*Math.sin(dn/2)**2;return Math.round(12742*Math.asin(Math.sqrt(h)))};
const fcity=()=>CITY[S.fcity]?S.fcity:'AMS';
const fdm=()=>cl(+S.fdur||50,5,1440);
function fdests(mins){const tg=mins*13,lo=tg*.7,hi=tg*1.3,c=fcity(),all=Object.keys(CITY).filter(k=>k!==c).map(k=>[k,km(c,k)]);let o=all.filter(x=>x[1]>=lo&&x[1]<=hi);if(o.length<3)o=all.sort((a,b)=>Math.abs(a[1]-tg)-Math.abs(b[1]-tg)).slice(0,4);const d=+D().replace(/-/g,'');o.sort((a,b)=>((a[1]*7+d)%97)-((b[1]*7+d)%97));return o.slice(0,4)}
const fdst=()=>{const o=fdests(fdm());return o.find(x=>x[0]===S.fdst)?S.fdst:o[0][0]};
const seen=()=>{const v={AMS:1};(S.fs||[]).forEach(x=>{if(x.ok&&x.to)v[x.to]=1});return v};
const fno=()=>'LO '+(100+(S.fs||[]).length),seat=n=>(8+n%22)+'ABCDEF'[n%6];
function chime(n){try{n.forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=f;o.connect(g);g.connect(AC.destination);const t=AC.currentTime+i*.11;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.22,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.4);o.start(t);o.stop(t+.45)})}catch(e){}}
const ding=()=>{try{[659,523].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;o.connect(g);g.connect(AC.destination);const t=AC.currentTime+i*.45;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.25,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+1.1);o.start(t);o.stop(t+1.2)})}catch(e){}};
function fstart(){const mins=fdm(),m=mins<=30?'s':'l',b=Math.max(5,Math.round(mins/5)),n=Date.now(),to=fdst(),from=fcity();S.foc={m,t0:n,dur:mins*60,brk:b*60,bud:b*60,used:0,away:null,go:null,ph:'g',gt:n,ms:0,from,to,km:km(from,to),no:fno(),seat:S.fseat||seat(n/1e3|0),ch:S.fchain&&S.fchain.d===D()&&n-S.fchain.last<(mins+b+30)*6e4?S.fchain.ids.length:0};S.fdst='';S.fseat='';S.fsm=0;wake(true);unlock();ding()}
function frec(f,ok,mins){const n=Date.now(),r=ok&&Math.random()<1/6?'up':'',s={id:n,d:D(),t0:f.t0,m:f.m,mins,ok:ok?1:0,over:0,r,from:f.from,to:f.to,km:ok?f.km:0,ch:ok?(S.fchain&&S.fchain.d===D()&&n-S.fchain.last<(f.dur+f.brk+1800)*1e3?S.fchain.id:n):0};(S.fs=S.fs||[]).push(s);
 if(ok){if(S.fchain&&S.fchain.id===s.ch){S.fchain.ids.push(s.id);S.fchain.last=n}else S.fchain={id:n,d:D(),ids:[s.id],last:n}}else S.fchain=null;f.sid=s.id;return s}
function fdone(){const f=S.foc;f.nc=!seen()[f.to];f.ph='o';const b0=fbadges().filter(x=>x.ok).map(x=>x.id),m0=fmin(D()),s=frec(f,true,f.dur/60);S.fcity=f.to;f.nb=fbadges().filter(x=>x.ok&&!b0.includes(x.id)).map(x=>x.n);f.sk=m0<120&&fmin(D())>=120?fstreak():0;thud();setTimeout(()=>chime(s.r?[523,659,784,1047,1319,1568]:[523,659,784,1047]),250);save()}
const thud=()=>{try{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(110,AC.currentTime);o.frequency.exponentialRampToValueAtTime(40,AC.currentTime+.3);o.connect(g);g.connect(AC.destination);g.gain.setValueAtTime(.5,AC.currentTime);g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.35);o.start();o.stop(AC.currentTime+.4)}catch(e){}};
function ffail(why,at){const f=S.foc;f.ph='x';f.why=why;frec(f,false,Math.floor((at-f.t0)/6e4));wake(false);save()}
function fover(f,t){const s=(S.fs||[]).find(x=>x.id===f.sid),end=f.t0+f.dur*1e3;if(s)s.over=Math.max(0,Math.floor(((t||Date.now())-end)/6e4));f.ph='b';f.bt0=t||Date.now();save()}
function fcheck(){const f=S.foc;if(!f)return;const n=Date.now();
 if(f.away&&!document.hidden){const a=f.away;f.away=null;
  if(f.ph==='f'){const dt=Math.max(0,Math.min(n,f.t0+f.dur*1e3)-a.t);
   if(a.k==='a'){f.used+=dt;if(f.used>f.bud*1e3){ffail('Your detour budget ran out. You can spend '+(f.bud/60)+' minutes in your allowed apps per flight.',a.t+Math.max(0,f.bud*1e3-(f.used-dt)));return}}
   else if(dt>GRACE*1e3){ffail('You left the app for '+Math.round(dt/1e3)+' seconds without opening an allowed app. The grace period is '+GRACE+' seconds.',a.t+GRACE*1e3);return}}
  else if(f.ph==='o'){fover(f,a.t)}
  save()}
 if(f.ph==='f'&&n>=f.t0+f.dur*1e3)fdone();
 if(f.ph==='b'&&!f.bd&&n>=f.bt0+f.brk*1e3){f.bd=1;beep(2);save()}}
document.addEventListener('visibilitychange',()=>{const f=S.foc;if(!f)return;if(document.hidden){if(!f.away&&(f.ph==='f'||f.ph==='o')){const a=f.go&&Date.now()-f.go.t<8e3;f.away={t:Date.now(),k:a?'a':'o',n:a?f.go.n:''};f.go=null;save()}}else{fcheck();go()}});
const fphase=p=>p<.06?'Taking off':p<.2?'Climbing':p<.85?'Cruising at 36,000 ft':p<1?'Descending':'Landed';
function fplane(p){const q=1-p,x=q*q*30+2*q*p*150+p*p*270,y=q*q*92+2*q*p*14+p*p*92,dx=2*q*(150-30)+2*p*(270-150),dy=2*q*(14-92)+2*p*(92-14),a=Math.atan2(dy,dx)*180/Math.PI,pl=$('#fpl'),tr=$('#ftr');if(pl)pl.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(1)})`);if(tr){const L=tr.getTotalLength();tr.style.strokeDasharray=L;tr.style.strokeDashoffset=L*(1-p)}}
function ftick(){const f=S.foc;if(!f)return;if(f.ph==='g'){const l=Math.ceil((f.gt+1e4-Date.now())/1e3);if(l<=0){f.ph='f';f.t0=Date.now();ding();save();return go()}const t=$('#ftm');if(t)t.textContent=l;const b=$('#fgb');if(b)b.style.width=Math.min(100,(Date.now()-f.gt)/100)+'%';return}fcheck();const q=$('#fph');if(q&&q.dataset.p!==f.ph)return go();
 if(f.ph==='o'&&!f.cu&&$('#fph')){f.cu=1;save();confetti();document.querySelectorAll('.cu').forEach(e=>{const to=+e.dataset.to,t0=performance.now(),st=n=>{const p=Math.min(1,(n-t0)/1300),v=Math.round(to*(1-Math.pow(1-p,3)));e.textContent=v.toLocaleString('en-GB');if(p<1)requestAnimationFrame(st)};requestAnimationFrame(st)})}
 if(f.ph==='f'||f.ph==='o'){const p=f.ph==='f'?cl((Date.now()-f.t0)/(f.dur*1e3),0,1):1,left=Math.ceil((f.t0+f.dur*1e3-Date.now())/1e3);
  if(f.ph==='f'&&p>=.85&&!f.ms){f.ms=1;ding();save()}
  fplane(p);const st=$('#fst');if(st)st.textContent=fphase(p);
  const t=$('#ftm');if(t)t.textContent=f.ph==='f'?fmt(left):'+'+fmt(-left);const bd=$('#fbud');if(bd)bd.textContent=fmt(Math.max(0,Math.round(f.bud-f.used/1e3)))}
 else if(f.ph==='b'){const left=Math.ceil((f.bt0+f.brk*1e3-Date.now())/1e3),t=$('#ftm');if(t)t.textContent=left>0?fmt(left):'Layover over'}}
setInterval(ftick,500);
let NAT={};const nat=m=>{try{window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.lifeos&&window.webkit.messageHandlers.lifeos.postMessage(m)}catch(e){}};
setInterval(()=>{const te=T?Math.round(T.end):0,f=S.foc,fe=f&&f.ph==='f'?f.t0+f.dur*1e3:0;if(te!==NAT.t){NAT.t=te;nat({t:'timer',end:te,start:T?T.end-T.total*1e3:0,label:T?T.label:'',kind:R?'step':'rest',sub:R?R.name:(S.active?S.active.tpl:'')})}if(NATIVE&&Date.now()-(NAT.st||0)>5e3){NAT.st=Date.now();const d=D(),js=JSON.stringify({fm:fmin(d),fg:180,st:S.steps[d]||0,stT:+S.cfg.stepsT||10000,w:S.water[d]||0,wT:+S.cfg.waterT||2500,k:Math.round(dk(d).k),kT:+S.cfg.kcalT||0,sk:fstreak(),city:(CITY[fcity()]||[''])[0]});if(js!==NAT.sj){NAT.sj=js;nat({t:'summary',d:JSON.parse(js)})}}if(fe!==NAT.f){NAT.f=fe;nat({t:'focus',end:fe,start:f?f.t0:0,from:f?(CITY[f.from]||[''])[0]:'',to:f?(CITY[f.to]||[''])[0]:''})}},1000);
const fhm=t=>new Date(t).toTimeString().slice(0,5);
function fpass(from,to,mins,t0,no,st,big){const k=km(from,to),fm2=mins>=60?Math.floor(mins/60)+' h'+(mins%60?' '+mins%60+' min':''):mins+' min';return`<div class=card style="padding:0;overflow:hidden"><div style="background:var(--g);color:var(--gi);padding:10px 16px;display:flex;justify-content:space-between;font-size:13px"><b style="font-weight:500">Boarding pass</b><span style="font-family:var(--mono)">${no} · seat ${st}</span></div><div style="display:flex;align-items:center;justify-content:space-between;padding:16px"><div><div style="font:500 ${big?34:26}px/1 var(--mono)">${from}</div><small>${esc(CITY[from][0])}</small><small style="font-family:var(--mono)">${fhm(t0)}</small></div><div style="flex:1;text-align:center;color:var(--m)"><svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg><small style="display:block">${fm2} · ${k.toLocaleString('en-GB')} km</small></div><div style="text-align:right"><div style="font:500 ${big?34:26}px/1 var(--mono)">${to}</div><small>${esc(CITY[to][0])}</small><small style="font-family:var(--mono)">${fhm(t0+mins*6e4)}</small></div></div></div>`}
const froute=(from,to)=>`<svg viewBox="0 0 300 110" style="width:100%;display:block"><path d="M30 92 Q150 14 270 92" fill="none" stroke="var(--hl)" stroke-width="2" stroke-dasharray="4 5"/><path id=ftr d="M30 92 Q150 14 270 92" fill="none" stroke="var(--g)" stroke-width="3" stroke-linecap="round"/><circle cx=30 cy=92 r=5 fill="var(--g)"/><circle cx=270 cy=92 r=5 fill="none" stroke="var(--g)" stroke-width="2"/><text x=30 y=108 font-size=11 text-anchor=middle fill="var(--t2)" font-family="var(--mono)">${from}</text><text x=270 y=108 font-size=11 text-anchor=middle fill="var(--t2)" font-family="var(--mono)">${to}</text><g id=fpl transform="translate(30 92)"><path d="M10 0 L-6 -7 L-3 0 L-6 7 Z" fill="var(--t)"/><path d="M2 0 L-4 -10 L-1 -10 L6 0 L-1 10 L-4 10 Z" fill="var(--t)"/></g></svg>`;
function confetti(){const c=['#3b82f6','#f59e0b','#10b981','#ef4444','#8b5cf6','#facc15'],w=document.createElement('div');w.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:50;overflow:hidden';for(let i=0;i<80;i++){const p=document.createElement('i'),sz=6+Math.random()*6;p.style.cssText=`position:absolute;left:${Math.random()*100}%;top:-12px;width:${sz}px;height:${sz*.45}px;background:${c[i%c.length]};border-radius:1px;--dx:${(Math.random()-.5)*160}px;--r:${(Math.random()-.5)*900}deg;animation:cf ${1.6+Math.random()*1.4}s cubic-bezier(.2,.6,.4,1) ${Math.random()*.4}s forwards`;w.appendChild(p)}document.body.appendChild(w);setTimeout(()=>w.remove(),3600)}
function fstreak(){let n=0,d=D();if(fmin(d)<120)d=addD(d,-1);while(fmin(d)>=120){n++;d=addD(d,-1)}return n}
function fstats(){const fl=fses(),v=seen();let ch={},atl=0,lh=0;fl.forEach(x=>{ch[x.ch]=(ch[x.ch]||0)+1;const a=CITY[x.from],b=CITY[x.to];if(a&&b&&(a[2]<-30)!==(b[2]<-30))atl=1;if(x.mins>=180)lh=1});return{n:fl.length,km:fl.reduce((a,x)=>a+(x.km||0),0),h:fmin()/60,c:Object.keys(v).length,atl,lh,con:Math.max(0,...Object.values(ch))}}
function fbadges(){const s=fstats();return[['f1','First flight',s.n,1],['f10','10 flights',s.n,10],['f50','50 flights',s.n,50],['k1','1,000 km',s.km,1000],['k5','5,000 km',s.km,5000],['k10','10,000 km',s.km,10000],['k40','Around the world',s.km,40075],['h10','10 h of focus',s.h,10],['h50','50 h of focus',s.h,50],['h100','100 h of focus',s.h,100],['c10','10 cities',s.c,10],['c25','25 cities',s.c,25],['con','3 connections in a day',s.con,3],['lh','Long haul: 3 h in one go',s.lh,1],['atl','Crossed the Atlantic',s.atl,1]].map(([id,n,v,t])=>({id,n,ok:v>=t,p:Math.min(1,v/t)}))}
let LAND=null;(()=>{try{const c=localStorage.lifeosLand;if(c)LAND=JSON.parse(c)}catch(e){}})();
function landLoad(){if(LAND||landLoad.busy)return;landLoad.busy=1;fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json').then(r=>r.json()).then(t=>{const[sx,sy]=t.transform.scale,[tx,ty]=t.transform.translate,arcs=t.arcs.map(a=>{let x=0,y=0;return a.map(([dx,dy])=>{x+=dx;y+=dy;return[+(x*sx+tx).toFixed(2),+(y*sy+ty).toFixed(2)]})}),ring=r=>r.flatMap((i,k)=>{const a=i<0?arcs[~i].slice().reverse():arcs[i];return k?a.slice(1):a}),out=[];t.objects.land.geometries.forEach(g=>{(g.type==='Polygon'?[g.arcs]:g.arcs).forEach(p=>p.forEach(r=>out.push(ring(r))))});LAND=out;try{localStorage.lifeosLand=JSON.stringify(out)}catch(e){}if(location.hash.startsWith('#/focus'))go()}).catch(()=>{landLoad.busy=0})}
function fmap(){landLoad();const fl=fses().filter(x=>CITY[x.from]&&CITY[x.to]),c=fcity(),pts=[c,...fl.flatMap(x=>[x.from,x.to])].map(k=>CITY[k]);let la0=Math.min(...pts.map(p=>p[1])),la1=Math.max(...pts.map(p=>p[1])),lo0=Math.min(...pts.map(p=>p[2])),lo1=Math.max(...pts.map(p=>p[2]));const ml=(la0+la1)/2,k=Math.cos(ml*Math.PI/180);let sx=Math.max(16,(lo1-lo0)*k),sy=Math.max(10,la1-la0);if(sx/sy<1.7)sx=sy*1.7;else sy=sx/1.7;const cx=(lo0+lo1)/2*k,cy=(la0+la1)/2,W=sx*1.25,H=sy*1.25,X=lo=>((lo*k-cx)/W+.5)*300,Y=la=>(.5-(la-cy)/H)*176,v=seen();
 const grid=[];const st=W/k>60?20:W/k>25?10:5;for(let lo=Math.ceil((cx-W/2)/k/st)*st;lo<(cx+W/2)/k;lo+=st)grid.push(`<line x1=${X(lo).toFixed(1)} y1=0 x2=${X(lo).toFixed(1)} y2=176 stroke="var(--hl)" stroke-width=.5 />`);for(let la=Math.ceil((cy-H/2)/st)*st;la<cy+H/2;la+=st)grid.push(`<line x1=0 y1=${Y(la).toFixed(1)} x2=300 y2=${Y(la).toFixed(1)} stroke="var(--hl)" stroke-width=.5 />`);
 const land=(LAND||[]).map(r=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;const p=r.map(([lo,la])=>{const x=X(lo),y=Y(la);if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;return x.toFixed(1)+' '+y.toFixed(1)});return x1<0||x0>300||y1<0||y0>176?'':'M'+p.join('L')+'Z'}).join('');
 const dots=Object.entries(CITY).map(([q,p])=>{const x=X(p[2]),y=Y(p[1]);return x<0||x>300||y<0||y>176?'':`<circle cx=${x.toFixed(1)} cy=${y.toFixed(1)} r=${v[q]?2.6:1.3} fill="${v[q]?'var(--g)':'var(--m)'}" opacity="${v[q]?1:.35}"/>`}).join('');
 const arc=(a,b,o,w)=>{const A=CITY[a],B=CITY[b],x1=X(A[2]),y1=Y(A[1]),x2=X(B[2]),y2=Y(B[1]),mx=(x1+x2)/2,my=(y1+y2)/2-Math.hypot(x2-x1,y2-y1)*.18;return`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill=none stroke="var(--g)" stroke-width=${w} opacity=${o} stroke-linecap=round />`};
 const routes=fl.map((x,i)=>arc(x.from,x.to,i===fl.length-1?1:.35,i===fl.length-1?2:1.2)).join(''),labs=Object.keys(v).filter(q=>CITY[q]).map(q=>`<text x=${(X(CITY[q][2])+4).toFixed(1)} y=${(Y(CITY[q][1])-4).toFixed(1)} font-size=7 fill="var(--t2)" font-family="var(--mono)">${q}</text>`).join('');
 return`<svg viewBox="0 0 300 176" style="width:100%;display:block;background:#e7eef8;border-radius:10px">${land?`<path d="${land}" fill="#d4dbe5" stroke="#c3ccd8" stroke-width=".4" stroke-linejoin=round />`:''}${grid.join('')}${dots}${routes}${labs}<circle cx=${X(CITY[c][2]).toFixed(1)} cy=${Y(CITY[c][1]).toFixed(1)} r=4 fill=none stroke="var(--g)" stroke-width=1.5><animate attributeName=r values="3;8;3" dur="2s" repeatCount=indefinite /><animate attributeName=opacity values="1;0;1" dur="2s" repeatCount=indefinite /></circle></svg>`}
function fcabin(cur,auto){const d=+D().replace(/-/g,''),taken=(r,l)=>{let x=Math.imul(r*131+l.charCodeAt(0)*7919,2654435761)^d;x=Math.imul(x^x>>>15,2246822519)>>>0;return x%10<3},seatB=(r,l)=>{const id=r+l,on=id===(cur||auto),tk=!on&&taken(r,l);return`<button ${tk?'disabled':''} data-a=fseat data-v="${id}" style="width:100%;aspect-ratio:1;border-radius:${r<=3?'8px':'6px'};border:1.5px solid ${r<=3?'#c9a227':'var(--hl)'};background:${on?'var(--g)':tk?'var(--c2)':'var(--c)'};color:${on?'var(--gi)':'var(--m)'};font:500 10px var(--mono);padding:0;opacity:${tk?.45:1}">${tk?'':l}</button>`};
 return`<div class=card style="padding:12px"><div style="display:flex;justify-content:space-between"><small>Business · rows 1 to 3</small><small>Window: A and F</small></div><div style="display:grid;grid-template-columns:18px repeat(3,1fr) 14px repeat(3,1fr);gap:4px;margin-top:8px;align-items:center">${Array.from({length:16},(_,i)=>i+1).map(r=>`<small style="margin:0;font-family:var(--mono);font-size:10px;text-align:center">${r}</small>${'ABC'.split('').map(l=>seatB(r,l)).join('')}<span></span>${'DEF'.split('').map(l=>seatB(r,l)).join('')}`).join('')}</div></div>`}
function fplan(){const mins=fdm(),o=fdests(mins),d=fdst(),n=Date.now(),b=Math.max(5,Math.round(mins/5)),h=Math.floor(mins/60),mm=mins%60;
 return`<small style="display:block;margin-top:12px">How long?</small><div style="display:flex;gap:8px;align-items:center;margin:6px 0"><select data-c=fdh style="margin:0;flex:1">${[0,1,2,3,4,5,6,8,10,12,16,20].map(x=>`<option value=${x} ${x===h?'selected':''}>${x} h</option>`).join('')}</select><select data-c=fdmn style="margin:0;flex:1">${[0,5,10,15,20,25,30,35,40,45,50,55].map(x=>`<option value=${x} ${x===mm?'selected':''}>${x} min</option>`).join('')}</select></div>
 <div style="display:flex;gap:6px;margin-bottom:6px">${[25,50,90].map(x=>`<button class="chip${x===mins?' on':''}" data-a=fdur data-v=${x} style="margin:0;flex:1;justify-content:center">${x} min</button>`).join('')}</div>
 <small style="display:block;margin-bottom:8px">${mins<=30?'Short: good for low energy, a hard start, or quick admin like email.':'Long: good for deep work where switching context costs a lot.'} Then a ${b} min layover, and ${b} min detour budget.</small>
 <small>Where to?</small><div style="display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 12px">${o.map(([k])=>`<button class="chip${k===d?' on':''}" data-a=fdst data-v=${k} style="margin:0">${esc(CITY[k][0])} <span style="font-family:var(--mono);opacity:.7">${k}</span></button>`).join('')}</div>
 ${fpass(fcity(),d,mins,n,fno(),S.fseat||seat(n/1e3|0))}<button class=btn data-a=fsm style="width:100%;justify-content:center">${S.fsm?'Hide seat map':'Choose your seat'}</button>${S.fsm?fcabin(S.fseat,seat(n/1e3|0)):''}<button class="btn pri" data-a=fstart style="width:100%;justify-content:center;min-height:52px;font-size:17px">Take off</button>`}
function vFocus(){const f=S.foc,T0=D();
 const apps=fapps(),links=()=>`<div class=card><b style="font-weight:500">Allowed apps</b><small style="display:block">Time in these comes from your detour budget. Any other way out has a ${GRACE} second grace period.</small><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">${apps.map(a=>`<a class=btn href="${esc(a.u)}" data-a=fgo data-n="${esc(a.n)}" style="margin:0">${ic('link',16)} ${esc(a.n)}</a>`).join('')}</div></div>`;
 if(f){fcheck();const M={n:f.dur/60+' min',b:Math.round(f.brk/60)},PH=`<i id=fph data-p="${f.ph}" hidden></i>`,s=(S.fs||[]).find(y=>y.id===f.sid)||{},to=CITY[f.to]?f.to:'BRU',from=CITY[f.from]?f.from:'AMS';
  if(f.ph==='g')return PH+`<small>${f.no||''} · gate B${(f.t0%20)+1} · seat ${f.seat}</small><h1>Now boarding</h1><div class=card style="text-align:center"><div style="font:500 15px var(--mono);color:var(--t2)">${from} → ${to} · ${esc(CITY[to][0])}</div><div class=big id=ftm style="margin:8px 0">10</div><small>Doors close in a few seconds. Get your work open.</small><div style="height:6px;background:var(--c2);border-radius:3px;overflow:hidden;margin-top:12px"><div id=fgb style="height:100%;width:0;background:var(--g);transition:width .5s linear"></div></div></div><button class=btn data-a=fend>Leave the gate</button>`;
  if(f.ph==='f')return PH+`<small>${f.no||''} · ${M.n} flight${f.ch?' · connection '+(f.ch+1):''}</small><h1>${esc(CITY[from][0])} to ${esc(CITY[to][0])}</h1><div class=card style="text-align:center">${froute(from,to)}<div class=big id=ftm style="margin:8px 0 0"></div><b id=fst style="font-weight:500;color:var(--g)"></b><small style="display:block;margin-top:8px">Detour budget left <b id=fbud style="font-family:var(--mono)"></b></small></div>${links()}<div class=card style="padding:12px 14px"><button class=btn data-a=fstop style="margin:0">${f.sure&&Date.now()-f.sure<5e3?'Tap again to end the flight':'End flight early'}</button><small style="display:block;margin-top:6px">Stops this focus block now. You get no minutes and no stamp, you stay in ${esc(CITY[from][0])}, and your connection streak resets. Tap twice to confirm.</small></div>`;
  if(f.ph==='o')return PH+`<small>${f.no||''} · landed</small><h1>Welcome to ${esc(CITY[to][0])}</h1><div class=card style="text-align:center"><div style="display:inline-block;border:3px solid ${s.r?'#c9a227':'var(--g)'};color:${s.r?'#a7841a':'var(--g)'};border-radius:12px;padding:10px 18px;transform:rotate(-6deg);margin:8px 0 12px;animation:stamp .5s cubic-bezier(.2,1.6,.4,1)"><div style="font:600 30px/1 var(--mono)">${to}</div><small style="color:inherit">${esc(CITY[to][0])} · ${fhm(Date.now())}</small></div><div style="font:500 22px var(--mono);color:var(--ok)">+<span class=cu data-to="${f.dur/60}">${f.cu?f.dur/60:0}</span> min · +<span class=cu data-to="${f.km||0}">${f.cu?(f.km||0).toLocaleString('en-GB'):0}</span> km</div><div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0">${f.nc?'<span class=chip style="background:var(--ok);border-color:var(--ok);color:#fff;margin:0">New city in your passport</span>':''}${s.r?'<span class=chip style="background:#c9a227;border-color:#c9a227;color:#fff;margin:0">Upgraded to business class</span>':''}${f.ch?`<span class=chip style="margin:0">Connection ${f.ch+1} in a row</span>`:''}${f.sk?`<span class=chip style="background:#f97316;border-color:#f97316;color:#fff;margin:0">${ic('flame',14)} ${f.sk}-day streak</span>`:''}${(f.nb||[]).map(n=>`<span class=chip style="background:var(--g);border-color:var(--g);color:var(--gi);margin:0">${ic('award',14)} ${esc(n)}</span>`).join('')}</div><small>At the gate <b id=ftm style="font-family:var(--mono)"></b>. Staying here counts as extra focus. Leaving now costs nothing.</small><br><button class="btn pri" data-a=ffin style="margin-top:8px">Finish and start the ${M.b} min layover</button></div>`;
  if(f.ph==='b')return PH+`<small>Layover in ${esc(CITY[fcity()][0])}</small><h1>Break</h1><div class=card style="text-align:center"><div class=big id=ftm style="margin:4px 0"></div><small>Free time. Use any app you like.</small></div><h3>Next flight</h3>${fplan()}<button class=btn data-a=fend style="margin-top:8px">Finish for today</button>`;
  if(f.ph==='x')return PH+`<small>${f.no||''}</small><h1>Flight diverted</h1><div class=card><p style="margin:0 0 8px">${esc(f.why||'')}</p><small>You stay in ${esc(CITY[fcity()][0])}. Your connection streak resets.</small></div><h3>Try again</h3>${fplan()}<button class=btn data-a=fend style="margin-top:8px">Stop</button>`}
 const v=seen(),fl=fses(),tkm=fl.reduce((a,x)=>a+(x.km||0),0),wk=wdays(weekStart(T0)).reduce((a,d)=>a+fmin(d),0),tm=fmin(T0);
 return`<h1>Work focus</h1><small>Every focus block is a flight. Stay in Life OS until you land. Leave without an allowed app for more than ${GRACE} seconds and the flight is diverted.</small>
 <div class=tiles style="margin-top:12px"><div class=tile><small>Today</small><b>${hm(tm)}</b><small>goal 3 h · min 2 h</small></div><div class=tile><small>This week</small><b>${hm(wk)}</b><small>${fl.length} flight${fl.length===1?'':'s'} · ${tkm.toLocaleString('en-GB')} km</small></div></div>
 ${(()=>{const k=fstreak();return`<div class=card style="display:flex;gap:10px;align-items:center;padding:10px 14px"><span style="color:${k?'#f97316':'var(--m)'};display:flex">${ic('flame',22)}</span><span style="flex:1"><b style="font-weight:500">${k?k+'-day streak':'No streak yet'}</b><small style="display:block;margin:0">${fmin(T0)>=120?'Kept today':'2 h of focus today keeps it going'}</small></span></div>`})()}
 <div class=card style="padding:8px">${fmap()}</div>
 <div class=card><small>You are in</small><b style="font-size:20px;font-weight:500;display:block">${esc(CITY[fcity()][0])} <span style="font-family:var(--mono);color:var(--m)">${fcity()}</span></b>${fplan()}</div>
 <details class=card><summary class=nm style="display:flex;justify-content:space-between"><b style="font-weight:500">How it works</b>${ic('chev')}</summary><div style="font-size:14px;color:var(--t2);line-height:1.6;margin-top:8px"><b>Duration.</b> Pick any length. The layover and detour budget are a fifth of it, at least 5 min.<br><b>Destinations.</b> You fly on from wherever you landed last, to cities about as far as a real plane gets in that time.<br><b>Leaving.</b> Open an allowed app from the flight screen and the time comes from your detour budget. Any other way out, including other pages in Life OS or locking the screen, gives you ${GRACE} seconds to come back.<br><b>Bonuses.</b> A stamp for every new city. About 1 in 6 landings is an upgrade to business class. Stay on the screen after landing and the extra minutes count. Take off again within 30 min of your layover and it counts as a connection.</div></details>
 <h3>Milestones</h3><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">${fbadges().map(b=>`<div style="border:1.5px solid ${b.ok?'var(--g)':'var(--hl)'};border-radius:10px;padding:8px;text-align:center;${b.ok?'':'opacity:.6'}"><span style="color:${b.ok?'var(--g)':'var(--m)'};display:flex;justify-content:center">${ic('award',20)}</span><small style="display:block;margin:2px 0 0;font-size:11px;line-height:1.25;color:var(--t)">${esc(b.n)}</small>${b.ok?'':`<div style="height:3px;background:var(--c2);border-radius:2px;margin-top:4px"><div style="height:100%;width:${Math.round(b.p*100)}%;background:var(--g);border-radius:2px"></div></div>`}</div>`).join('')}</div>
 <h3>Passport · ${Object.keys(v).length} cities</h3><div style="display:flex;flex-wrap:wrap;gap:6px">${Object.keys(v).map((k,i)=>`<span style="border:2px solid var(--g);color:var(--g);border-radius:8px;padding:4px 8px;font:600 13px var(--mono);transform:rotate(${(i*37%9)-4}deg)">${k}</span>`).join('')}</div>
 <h3>Logbook</h3>${fl.slice(-8).reverse().map(x=>`<div class=row><span style="flex:1;font-family:var(--mono)">${x.from||'AMS'} → ${x.to||'?'}</span><small style="width:auto">${x.mins+(x.over||0)} min · ${new Date(x.d+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})}</small></div>`).join('')||'<small>No flights yet.</small>'}
 <h3>Allowed apps</h3><small>Shown on the flight screen. Use the app's link, for example whatsapp://, googlegmail:// or googlecalendar://</small><div id=fap>${apps.map(a=>fapRow(a.n,a.u)).join('')}</div><button class=btn data-a=fapadd>${ic('link',16)} Add app</button><select data-c=fapx style="margin-top:8px"><option value="">Add from common apps</option>${FAPP.map(x=>`<option value="${x}">${x.split('|')[0]}</option>`).join('')}</select><small style="display:block;margin-top:8px">Not in the list? Search the web for the app name plus "URL scheme iOS", or make a Shortcut with Open App and use shortcuts://run-shortcut?name=YourShortcutName.</small>`}

const FAPP=['WhatsApp|whatsapp://','Gmail|googlegmail://','Google Calendar|googlecalendar://','Google Docs|googledocs://','Google Sheets|googlesheets://','Google Drive|googledrive://','Slack|slack://','Notion|notion://','Spotify|spotify://','Telegram|tg://','Microsoft Teams|msteams://','Zoom|zoomus://','Todoist|todoist://','Apple Calendar|calshow://','Apple Notes|mobilenotes://','Apple Mail|message://','Messages|sms:','Phone|tel:'];
const fapRow=(n,u)=>`<div class=wrow2 style="display:flex;gap:6px;align-items:center;margin:6px 0"><input class=fa-n data-c=fap placeholder="Name" value="${esc(n||'')}" style="flex:3;min-width:0"><input class=fa-u data-c=fap placeholder="Link" value="${esc(u||'')}" style="flex:3;min-width:0"><button class=btn data-a=fapdel aria-label="Remove">✕</button></div>`;


/* ---------- body: weight log + progress photos ---------- */
const bwDays=()=>Object.keys(S.bw||{}).sort(),bwLast=()=>{const d=bwDays();return d.length?{d:d[d.length-1],v:S.bw[d[d.length-1]]}:null};
const fdt=d=>new Date(d+'T12:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
function bwChart(){const t=D(),days=[];for(let i=29;i>=0;i--){const x=new Date(t+'T12:00');x.setDate(x.getDate()-i);days.push(x.toISOString().slice(0,10))}
 const pts=days.map((d,i)=>({d,i,v:(S.bw||{})[d]})).filter(p=>p.v!=null);if(!pts.length)return'<small>Log a few weigh-ins to see the trend.</small>';
 const avg=pts.map(p=>{const a=pts.filter(q=>q.i<=p.i&&q.i>p.i-7);return{i:p.i,v:a.reduce((s,q)=>s+q.v,0)/a.length}}),g=+S.bgoal||0,all=[...pts.map(p=>p.v),...(g?[g]:[])],lo=Math.floor(Math.min(...all)-.5),hi=Math.ceil(Math.max(...all)+.5),X=i=>36+i/29*296,Y=v=>10+(hi-v)/(hi-lo||1)*86,path=a=>a.map((p,k)=>(k?'L':'M')+X(p.i).toFixed(1)+' '+Y(p.v).toFixed(1)).join('');
 return`<svg viewBox="0 0 340 126" style="width:100%;display:block" role=img aria-label="Weight trend"><g stroke="var(--hl)" stroke-width="1"><path d="M36 10H332M36 53H332M36 96H332"/></g><g font-family="Geist Mono,monospace" font-size="10" fill="var(--t3,#6b7280)"><text x="30" y="13" text-anchor="end">${hi}</text><text x="30" y="56" text-anchor="end">${((hi+lo)/2).toFixed(1)}</text><text x="30" y="99" text-anchor="end">${lo}</text><text x="36" y="118">${days[0].slice(5)}</text><text x="332" y="118" text-anchor="end">${days[29].slice(5)}</text></g>`
 +(g?`<path d="M36 ${Y(g)}H332" stroke="var(--ok)" stroke-width="1.5" stroke-dasharray="4 4"/><text x="332" y="${Y(g)-4}" text-anchor="end" font-family="Geist Mono,monospace" font-size="10" fill="var(--ok)">goal ${g}</text>`:'')
 +pts.map(p=>`<circle cx="${X(p.i).toFixed(1)}" cy="${Y(p.v).toFixed(1)}" r="2.5" fill="var(--t3,#9ca3af)"/>`).join('')+(avg.length>1?`<path d="${path(avg)}" fill="none" stroke="var(--g)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>`:'')+`</svg><small>Dots are weigh-ins, the blue line is the 7-day average.</small>`}
function vBody(){const t=D(),ds=bwDays(),first=ds.length?{d:ds[0],v:S.bw[ds[0]]}:null,last=bwLast(),ch=first&&last?Math.round((last.v-first.v)*10)/10:null,g=+S.bgoal||0,togo=g&&last?Math.round((last.v-g)*10)/10:null,sg=n=>(n>0?'+':'')+n;
 return`<h1>Body</h1><div class=card><b>Weigh in</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px"><div><small>Weight (kg)</small><input id=bwk type=text inputmode=decimal placeholder="${last?last.v:'64.0'}"></div><div><small>Date</small><input id=bwd type=date value="${t}"></div></div><button class="btn pri" data-a=bwsave>Save weight</button></div>
 <div class=tiles><div class=tile><small>Current</small><b>${last?last.v+' kg':'None yet'}</b><small>${last?fdt(last.d):'Log your first weigh-in'}</small></div><div class=tile><small>Since start</small><b>${ch==null?'-':sg(ch)+' kg'}</b><small>${first?'from '+first.v+' kg on '+fdt(first.d):''}</small></div></div>
 <div class=card><small>Goal weight (kg, optional)</small><input type=text inputmode=decimal data-c=bgoal value="${g||''}" placeholder="e.g. 66">${togo!=null?`<small>${togo===0?'You are at your goal':Math.abs(togo)+' kg '+(togo>0?'above':'below')+' your goal'}</small>`:''}</div>
 <h3>Last 30 days</h3><div class=card>${bwChart()}</div>
 ${ds.length?`<h3>Weigh-ins</h3>`+ds.slice().reverse().slice(0,10).map(d=>`<div class=row><span style="flex:1">${fdt(d)}<small style="font-family:var(--mono)">${S.bw[d]} kg</small></span><button class=btn data-a=bwdel data-d="${d}" aria-label="Delete">✕</button></div>`).join(''):''}
 <h3>Progress photos</h3><div class=card><small>Log the date you took a progress photo. Adding the picture is optional: leave it empty to keep just the date.</small><div style="display:grid;grid-template-columns:1fr;gap:8px;margin-top:8px"><div><small>Date</small><input id=bpd type=date value="${t}"></div><div><small>Photo (optional)</small><input id=bpf type=file accept="image/*"></div></div><button class="btn pri" data-a=bpsave>Save progress photo</button></div>
 ${(S.bp||[]).length?`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${S.bp.map((p,i)=>`<div class=card style="padding:8px">${p.img?`<img src="${p.img}" style="width:100%;border-radius:8px;display:block" alt="Progress photo">`:`<div style="height:64px;display:flex;align-items:center;justify-content:center;background:var(--c2);border-radius:8px;color:var(--t2)">${ic('calendar',24)}</div>`}<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><small>${fdt(p.d)}${p.img?'':' · date only'}</small><button class=btn data-a=bpdel data-i="${i}" aria-label="Delete" style="min-height:28px;padding:2px 10px;margin:0">✕</button></div></div>`).join('')}</div>`:'<small>No progress photos logged.</small>'}
 <small style="display:block;margin-top:12px">Photos are shrunk and stay on this phone. They are included in your backup export.</small>`}

const V={foods:vFoods,body:vBody,routine:()=>vRtn(),flow:()=>vFlows(),focus:vFocus,targets:vTargets,types:vTypes,flows:vFlows,f:vFlow,tr:vTr,tn:vNewTodo,rtn:vRtn,guide:vGuide,x:(k,d)=>vExt(k,d,1),xd:(k,d)=>vExt(k,d),xe:(k,d)=>vExt(k,d),t:vTodoD,plan:vPlan,today:vPlan,b:vPlan,train:vTrain,fuel:vFuel,money:vMoney,more:vMore,life:vMore,mind:vMind,skill:vSkill,rel:()=>vNotes('Relationships and play','rel','Log time with people and things to remember: date ideas, who to call, gifts, how an evening went.'),meaning:vReflect,week:vWeek,todo:vTodo,links:vLinks,set:vSet,r:vRoutine,run:vRun,day:vDay};
const SUB=['body','focus','types','flows','rtn','guide','train','fuel','money','mind','skill','rel','meaning','week','todo','links','set'];
function scrollPlan(){const g=$('.grid');if(!g)return;const n=new Date(),m=sel===D()?n.getHours()*60+n.getMinutes():420;const hh=($('.stick')||{}).offsetHeight||0;scrollTo(0,g.offsetTop-hh+Math.max(0,m-360-60)*Zv())}
function go(){const[p,...a]=(location.hash.slice(2)||'plan').split('/'),v=$('#v'),st=scrollY,lock=!!S.foc&&(S.foc.ph==='f'||S.foc.ph==='o');if(lock&&p!=='focus'){location.replace('#/focus');return}document.body.classList.toggle('foc',lock);CTA='';document.documentElement.style.setProperty('--z',Zv());
 if(p==='r'&&S.ctx){S.ctx=null;save()}
 try{v.innerHTML=(SUB.includes(p)&&!lock?'<a href="#/more">‹ More</a>':'')+(V[p]||vPlan)(...a.map(decodeURIComponent))}catch(e){v.innerHTML=`<h1>Error</h1><p>${esc(e.message)}</p><a href="#/set">Open Settings to fix a config</a>`}
 scrollTo(0,st);$('#ctaw').innerHTML=CTA;if(ANIM){const g=$('.grid');if(g)g.classList.add(ANIM);ANIM=''}
 const nav=['plan','today','b','r','run','day'].includes(p)?'plan':'more';
 document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x.dataset.p===nav));
 $('#cx').style.display=S.ctx?'flex':'none';if(S.ctx)$('#cxl').textContent=S.ctx.label;
 tick();breath();ftick()}
addEventListener('hashchange',()=>{go();scrollTo(0,0);scrollPlan()});
const fixVp=()=>setTimeout(()=>{const y=scrollY;scrollTo(0,y+1);scrollTo(0,y)},120);
const isTxt=e=>e.target&&/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
document.addEventListener('focusin',e=>{if(isTxt(e))document.body.classList.add('kb')});
document.addEventListener('focusout',e=>{setTimeout(()=>{if(!document.activeElement||!/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName))document.body.classList.remove('kb');fixVp()},150)});
if(window.visualViewport)visualViewport.addEventListener('resize',()=>{if(!document.body.classList.contains('kb'))fixVp()});
const kbfix=()=>{const a=document.activeElement;if(!a||!/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))document.body.classList.remove('kb')};setInterval(kbfix,800);document.addEventListener('click',()=>setTimeout(kbfix,200));document.addEventListener('visibilitychange',kbfix);addEventListener('pageshow',kbfix);
addEventListener('hashchange',()=>{try{document.activeElement&&document.activeElement.blur()}catch(e){}fixVp()});addEventListener('resize',fixVp);
setInterval(tick,250);setInterval(breath,100);

/* data safety + silent updates */
try{navigator.storage?.persist?.()}catch(e){}
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(()=>{});let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!S.active&&!B&&!R&&!S.foc)location.reload();had=true})}
async function chk(){try{const j=await(await fetch('version.json?'+Date.now(),{cache:'no-store'})).json();if(BUILD!=='dev'&&j.b&&j.b!==BUILD&&!location.search.includes('u='+j.b)&&!S.active&&!B&&!R&&!T&&!S.foc)location.replace(location.pathname+'?u='+j.b+location.hash)}catch(e){}}
save();go();scrollPlan();gsync(false);chk();
