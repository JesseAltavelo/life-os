// Life OS helper worker.
// 1) Read proxy: fetches your Google Calendar secret iCal address (Google blocks direct browser access). Only calendar.google.com.
// 2) To-do sync: writes ONLY your Life OS to-dos (tagged #lifeos-todo) to your main Google Calendar. Needs the KEY secret.
const O='https://jessealtavelo.github.io',CAL='https://www.googleapis.com/calendar/v3/calendars/primary/events/';
const pad=n=>String(n).padStart(2,'0'),hm=m=>pad(m/60|0)+':'+pad(m%60)+':00';
async function token(env){const rt=await env.TOK.get('rt');if(!rt)throw Error('Not connected: open /auth/start?k=YOURKEY once');
 const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({client_id:env.CID,client_secret:env.CSECRET,refresh_token:rt,grant_type:'refresh_token'})});
 const j=await r.json();if(!j.access_token)throw Error('Token error: '+JSON.stringify(j));return j.access_token}
function body(t){const done=t.done,e={summary:(done?'✓ ':'')+t.title,description:(t.desc?t.desc+'\n\n':'')+'Life OS to-do #lifeos-todo',colorId:done?'8':'11',reminders:{useDefault:false}};
 if(t.time){const s=+t.time.slice(0,2)*60+ +t.time.slice(3),en=Math.min(s+(+t.dur||30),1439);e.start={dateTime:`${t.date}T${hm(s)}`,timeZone:t.tz};e.end={dateTime:`${t.date}T${hm(en)}`,timeZone:t.tz}}
 else{const d=new Date(t.date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+1);e.start={date:t.date};e.end={date:d.toISOString().slice(0,10)}}return e}
export default{async fetch(req,env){
 const url=new URL(req.url),p=url.pathname,h={'Access-Control-Allow-Origin':O,'Access-Control-Allow-Headers':'x-key,content-type','Access-Control-Allow-Methods':'GET,POST,DELETE,OPTIONS'};
 if(req.method==='OPTIONS')return new Response(null,{headers:h});
 if(p==='/auth/start'){if(url.searchParams.get('k')!==env.KEY)return new Response('wrong key',{status:403});
  return Response.redirect('https://accounts.google.com/o/oauth2/v2/auth?'+new URLSearchParams({client_id:env.CID,redirect_uri:url.origin+'/auth/cb',response_type:'code',scope:'https://www.googleapis.com/auth/calendar.events',access_type:'offline',prompt:'consent',state:env.KEY}),302)}
 if(p==='/auth/cb'){if(url.searchParams.get('state')!==env.KEY)return new Response('bad state',{status:403});
  const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({code:url.searchParams.get('code'),client_id:env.CID,client_secret:env.CSECRET,redirect_uri:url.origin+'/auth/cb',grant_type:'authorization_code'})}),j=await r.json();
  if(!j.refresh_token)return new Response('No refresh token: '+JSON.stringify(j),{status:400});await env.TOK.put('rt',j.refresh_token);
  return new Response('<meta name=viewport content="width=device-width"><body style="font:20px system-ui;padding:30px">Connected ✓ You can close this and return to Life OS.',{headers:{'Content-Type':'text/html; charset=utf-8'}})}
 if(p==='/todo'){if(req.headers.get('x-key')!==env.KEY)return new Response('wrong key',{status:403,headers:h});
  try{const at=await token(env),A={Authorization:'Bearer '+at,'Content-Type':'application/json'};
   if(req.method==='DELETE'){const r=await fetch(CAL+'lo'+url.searchParams.get('id'),{method:'DELETE',headers:A});return new Response(null,{status:r.status===410?404:r.status,headers:h})}
   const t=await req.json(),id='lo'+t.id,b=JSON.stringify(body(t));
   let r=await fetch(CAL+id,{method:'PUT',headers:A,body:b});
   if(r.status===404)r=await fetch(CAL.slice(0,-1),{method:'POST',headers:A,body:JSON.stringify({...JSON.parse(b),id})});
   return new Response(await r.text(),{status:r.ok?200:r.status,headers:h})}catch(e){return new Response(String(e.message),{status:500,headers:h})}}
 const u=url.searchParams.get('u');let x;try{x=new URL(u)}catch{return new Response('bad url',{status:400,headers:h})}
 if(x.hostname!=='calendar.google.com')return new Response('only calendar.google.com',{status:403,headers:h});
 const r=await fetch(x);return new Response(r.body,{status:r.status,headers:{...h,'Content-Type':'text/calendar; charset=utf-8'}})}}
