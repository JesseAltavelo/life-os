// Tiny proxy so the Life OS web app can read your Google Calendar secret iCal address (Google blocks direct browser access).
// Only calendar.google.com is allowed; nothing is stored.
export default{async fetch(req){
 const u=new URL(req.url).searchParams.get('u'),h={'Access-Control-Allow-Origin':'https://jessealtavelo.github.io'};
 let x;try{x=new URL(u)}catch{return new Response('bad url',{status:400,headers:h})}
 if(x.hostname!=='calendar.google.com')return new Response('only calendar.google.com',{status:403,headers:h});
 const r=await fetch(x);return new Response(r.body,{status:r.status,headers:{...h,'Content-Type':'text/calendar; charset=utf-8'}})}}
