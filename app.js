/* Pulim 6.0 — interfeys. Mantiq core.js da. */

/* ---------- ikonkalar ---------- */
const IC={
 home:'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
 list:'M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01',
 chart:'M3 3v18h18M7.5 15v2M11.5 10v7M15.5 6v11M19.5 12v5',
 wallet:'M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v3M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5M17 12h4v4h-4a2 2 0 0 1 0-4z',
 target:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
 swap:'M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7',
 bell:'M6 8a6 6 0 1 1 12 0c0 7 3 8.5 3 8.5H3S6 15 6 8M10.3 21a1.9 1.9 0 0 0 3.4 0',
 chat:'M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 21l2-5.3A8.5 8.5 0 1 1 21 11.5z',
 globe:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
 gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
 plus:'M12 5v14M5 12h14',x:'M18 6 6 18M6 6l12 12',check:'M20 6 9 17l-5-5',
 edit:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
 trash:'M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6',
 undo:'M3 7v6h6M3 13a9 9 0 1 0 3-7.7L3 8',
 left:'m15 18-6-6 6-6',right:'m9 18 6-6-6-6',
 search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
 mic:'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3',
 send:'M5 12h14M13 6l6 6-6 6',
 menu:'M4 6h16M4 12h16M4 18h16',
 in:'M17 7 7 17M7 8v9h9',out:'M7 17 17 7M8 7h9v9',
 download:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
 upload:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
 file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
 calendar:'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18',
 flame:'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.1.1 1.5 1.1 2.6 2.5 2.6z',
 alert:'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
 info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
 bulb:'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z',
 trend:'M22 7 13.5 15.5l-5-5L2 17M16 7h6v6',
 phone:'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01',
 cloud:'M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10zM2 2l20 20',
 shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
 sparkle:'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
 repeat:'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',
 basket:'M5 10l1.6 9.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L19 10M3 10h18M8 10l4-6 4 6M10 14v3M14 14v3',
 car:'M5 17H3v-5l2.2-5.5A2 2 0 0 1 7 5h10a2 2 0 0 1 1.8 1.5L21 12v5h-2M3 12h18M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM13 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0z',
 wifi:'M5 12.6a10 10 0 0 1 14 0M8.5 16.1a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0M12 20h.01',
 book:'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
 heart:'M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z',
 shirt:'M20.4 6.6 16 3l-2 2h-4L8 3 3.6 6.6l2 4L8 9.5V21h8V9.5l2.4 1.1z',
 ticket:'M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4zM14 6v2M14 11v2M14 16v2',
 dots:'M5 12h.01M12 12h.01M19 12h.01',
 briefcase:'M3 8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18',
 laptop:'M5 5h14a1 1 0 0 1 1 1v9H4V6a1 1 0 0 1 1-1zM2 19h20l-2-4H4z',
 gift:'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8S10.5 3 8 3.5 7.5 8 12 8zM12 8s1.5-5 4-4.5S16.5 8 12 8z',
 user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
 sun:'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
 moon:'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
 monitor:'M3 4h18v12H3zM8 20h8M12 16v4',
 eye:'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
 eyeOff:'M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3 3.9M6.1 6.2A17 17 0 0 0 2 12s3.6 7 10 7c1.5 0 3-.4 4.3-1M9.9 9.9a3 3 0 0 0 4.2 4.2',
 mail:'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 7l9 6 9-6',
 lock:'M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM8 11V7a4 4 0 0 1 8 0v4',
 key:'M15.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM12 11v10M12 17h3M12 14h2',
 copy:'M9 9h11v11H9zM5 15H4V4h11v1',
 logout:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9'
};
const ico=(n,c='')=>`<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[n]||IC.dots}"/></svg>`;
const CM={'Oziq-ovqat':['#D9691E','basket'],Transport:['#2F74D0','car'],'Uy-joy':['#6E54C4','home'],Aloqa:['#138E92','wifi'],"Ta'lim":['#B83C7A','book'],Salomatlik:['#D6454F','heart'],Kiyim:['#9A6A2E','shirt'],"Ko'ngilochar":['#B88A00','ticket'],Boshqa:['#7D8797','dots'],Maosh:['#0B875B','briefcase'],Freelance:['#2B44B8','laptop'],"Sovg'a":['#B83C7A','gift']};
const catI=(c,sm)=>{const[col,i]=CM[c]||CM.Boshqa;return`<span class="ci${sm?' sm':''}" style="--c:${col}">${ico(i)}</span>`};
const tI=(i,col,sm)=>`<span class="ci${sm?' sm':''}" style="--c:${col}">${ico(i)}</span>`;
const RTI={debtback:'swap',debttake:'swap',utility:'home',telecom:'wifi',sub:'repeat',planned:'calendar',task:'check'};

const LOGO=`<svg class="mark" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="24" fill="currentColor"/><g transform="translate(16 14) scale(.72)"><rect x="20" y="13" width="15" height="74" rx="7.5" fill="#fff"/><path d="M28 20.5h27a19.5 19.5 0 0 1 0 39H28" fill="none" stroke="#fff" stroke-width="13" stroke-linejoin="round"/><rect x="34" y="38" width="34" height="4" rx="2" fill="#fff" opacity=".55"/><circle cx="46" cy="40" r="7" fill="#F2B53A"/><circle cx="60" cy="40" r="7" fill="#F2B53A"/><rect x="34" y="71" width="30" height="3" rx="1.5" fill="#fff" opacity=".35"/><circle cx="57" cy="72.5" r="4.6" fill="#fff" opacity=".35"/></g></svg>`;
/* ---------- formatlash ---------- */
const nf=n=>String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const M=(n,sign)=>`<span class="num">${n<0?'−':sign&&n>0?'+':''}${nf(n)}<small>${CUR}</small></span>`;
const WD=WDAYS[LANG];
const dObj=d=>new Date(d+'T00:00:00');
const dlong=d=>{const x=dObj(d);return dateText(x.getFullYear(),x.getMonth(),x.getDate())};
const monthIn=m=>LANG==='uz'?cap1(MFULL[m]):MFULL[m];
const dayLab=d=>d===todayS()?`${L('Bugun')}, ${dlong(d)}`:d===addD(-1)?`${L('Kecha')}, ${dlong(d)}`:`${dlong(d)}, ${WD[dObj(d).getDay()]}`;
const short=d=>{const x=dObj(d);return[x.getDate(),MON[x.getMonth()]]};
const pct=(a,b)=>b?Math.round(a/b*100):0;
const greet=()=>{const h=new Date().getHours();return L(h<5?'Xayrli tun':h<11?'Xayrli tong':h<17?'Xayrli kun':h<23?'Xayrli kech':'Xayrli tun')};
const empty=(t,s,btn)=>`<div class="empty"><b>${t}</b>${s?`<span>${s}</span>`:''}${btn||''}</div>`;
const fine=matchMedia('(pointer:fine)').matches;

/* ---------- holat ---------- */
let flt={t:'all',q:'',m:'',c:''},installEvt=null,cap=false,undoBuf=null;
const PAGES=[['dash','home','Asosiy'],['ai','chat','Yordamchi'],['tx','list','Operatsiyalar'],['an','chart','Tahlil'],['bud','wallet','Byudjet'],['goals','target','Maqsadlar'],['debts','swap','Qarzlar'],['rem','bell','Eslatmalar'],['set','gear','Sozlamalar']];
const TABS=['dash','tx','+','an','more'];
function streak(){const days=new Set(db.tx.map(t=>t.date));let n=0;const d=new Date();if(!days.has(iso(d)))d.setDate(d.getDate()-1);while(days.has(iso(d))&&n<999){n++;d.setDate(d.getDate()-1)}return{n,today:days.has(todayS())}}
const overdue=()=>db.rem.filter(isOver).length;
const hasData=()=>db.tx.length+db.debts.length+db.rem.length+db.goals.length>0;

/* ---------- umumiy bloklar ---------- */
const txRow=t=>`<div class="row click" data-a="edit" data-k="tx" data-id="${t.id}" tabindex="0" role="button">${catI(t.category)}<div class="t"><b ${t.note?'translate="no"':''}>${esc(t.note||t.category)}</b><span>${t.note?esc(t.category):t.type==='income'?'Kirim':'Chiqim'}</span></div><div class="amt ${t.type==='income'?'pos':''}">${M(t.type==='income'?t.amount:-t.amount,1)}</div><div class="ra"><button class="icon-btn danger" data-a="del" data-k="tx" data-id="${t.id}" aria-label="O'chirish" title="O'chirish">${ico('trash')}</button></div></div>`;
function byDay(list){const g={};list.forEach(t=>(g[t.date]=g[t.date]||[]).push(t));
 return Object.keys(g).sort().reverse().map(d=>{const net=g[d].reduce((s,t)=>s+(t.type==='income'?t.amount:-t.amount),0);return`<div class="day"><span>${dayLab(d)}</span><span>${M(net,1)}</span></div>${g[d].sort((a,b)=>b.createdAt-a.createdAt).map(txRow).join('')}`}).join('')}
function chart6(y,m){const ms=[];for(let i=5;i>=0;i--){const d=new Date(y,m-i,1),s=mstat(mk(d.getFullYear(),d.getMonth()));ms.push({n:MON[d.getMonth()],i:s.inc,e:s.exp,now:i===0})}
 const mx=Math.max(1,...ms.flatMap(x=>[x.i,x.e]));
 return`<div class="chart">${ms.map(x=>`<div class="col ${x.now?'now':''}"><div class="bars"><i class="in" style="height:${x.i/mx*100}%" title="Kirim: ${fmt(x.i)}"></i><i class="ex" style="height:${x.e/mx*100}%" title="Chiqim: ${fmt(x.e)}"></i></div><small>${x.n}</small></div>`).join('')}</div><div class="legend"><span><i style="background:var(--pos)"></i>Kirim</span><span><i style="background:var(--neg)"></i>Chiqim</span></div>`}
function shares(cats,total,prev,limit=99){const ce=Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,limit),mx=ce.length?ce[0][1]:1;
 return ce.map(([k,v])=>`<div class="share">${catI(k,1)}<div class="m"><b>${esc(k)}</b><div class="bar"><i style="width:${v/mx*100}%;background:${(CM[k]||CM.Boshqa)[0]}"></i></div></div><div class="v">${M(v)}<span>${pct(v,total)}%${prev&&prev.n?' · '+deltaTxt(v,prev.cats[k]||0):''}</span></div></div>`).join('')}
const deltaTxt=(a,b)=>!b?'yangi':a===b?'o\'zgarishsiz':`${a>b?'↑':'↓'} ${pct(Math.abs(a-b),b)}%`;
const delta=(a,b,goodUp)=>{if(!b&&!a)return'';if(!b)return`<span class="delta">yangi</span>`;const d=a-b;if(!d)return`<span class="delta">o'zgarishsiz</span>`;return`<span class="delta ${(d>0)===goodUp?'good':'bad'}">${d>0?'↑':'↓'} ${pct(Math.abs(d),Math.abs(b))}%</span>`};
function upcoming(){const L=[],lim=addD(7);
 db.rem.filter(r=>!r.done&&(isOver(r)||r.date<=lim)).forEach(r=>L.push({d:r.date,t:r.text,s:(isOver(r)?"Muddati o'tgan":rel(dn(r.date)))+(r.time?', '+r.time:''),a:r.amount,late:isOver(r),i:RTI[r.type]||'bell'}));
 db.debts.filter(d=>d.status==='pending'&&d.due&&d.due<=lim&&!db.rem.some(r=>!r.done&&r.date===d.due&&r.text.includes(d.person))).forEach(d=>L.push({d:d.due,t:d.dir==='gave'?L('{0} qarzni qaytarishi kerak',d.person):L('{0}ga qarzni qaytarish',d.person),s:d.due<todayS()?"Muddati o'tgan":rel(dn(d.due)),a:d.amount,late:d.due<todayS()}));
 return L.sort((a,b)=>a.d.localeCompare(b.d))}
const upRow=u=>{const[dd,mm]=short(u.d);return`<div class="row click" data-a="nav" data-p="rem"><div class="date-chip ${u.late?'late':''}"><b>${dd}</b><span>${mm}</span></div><div class="t"><b translate="no">${esc(u.t)}</b><span class="${u.late?'neg':''}">${esc(u.s)}</span></div>${u.a?`<div class="amt">${M(u.a)}</div>`:''}</div>`};
function budRow(x,full){const n=new Date(),dim=new Date(n.getFullYear(),n.getMonth()+1,0).getDate(),day=n.getDate(),left=dim-day+1,exp=x.lim*day/dim,fast=x.p<100&&x.spent>exp*1.15;
 const st=x.p>=100?'po':x.p>=80?'pw':'',tg=x.p>=100?'neg':x.p>=80?'warn':'pos';
 return`<div class="brow"><div class="h">${catI(x.k,1)}<b>${esc(x.k)}</b><span class="tag ${tg}">${x.p}%</span>${full?`<button class="icon-btn" data-a="budset" data-c="${esc(x.k)}" aria-label="Limitni o'zgartirish">${ico('edit')}</button>`:''}</div><div class="bar ${st}"><i style="width:${Math.min(100,x.p)}%"></i>${full?`<em style="left:${day/dim*100}%" title="Bugun"></em>`:''}</div><div class="s"><span>${M(x.spent)} / ${M(x.lim)}</span><span class="${x.p>=100?'neg':''}">${x.p>=100?`${M(x.spent-x.lim)} oshib ketdi`:`qoldi ${M(x.lim-x.spent)}${full?`, kuniga ~${M((x.lim-x.spent)/left)}`:''}`}</span></div>${full&&fast?`<div class="s"><span class="tag warn">Sarf oy sur'atidan tez ketmoqda</span></div>`:''}</div>`}

/* ---------- tasdiqlash kartasi (yordamchi) ---------- */
const CK={tx:t=>t.type==='income'?'Kirim':'Chiqim',debt:t=>t.dir==='gave'?'Qarz berildi':'Qarz olindi',rem:()=>'Eslatma',goal:()=>"Jamg'arma maqsadi",bud:()=>'Byudjet limiti'};
function cardHTML(d,active){const rows=[];const R=(k,v)=>v&&rows.push(`<div class="kv"><span>${k}</span><b>${esc(v)}</b></div>`);
 const head=d.kind==='tx'?catI(d.category||'Boshqa',1):d.kind==='debt'?tI('swap','#2B44B8',1):d.kind==='rem'?tI('bell','#B88A00',1):d.kind==='goal'?tI('target','#0B875B',1):tI('wallet','#6E54C4',1);
 if(d.kind==='goal'){R('Nomi',d.name);R('Kerakli summa',fmt(d.amount));R('Muddat',d.deadline?dlong(d.deadline):'belgilanmagan');if(d.deadline){const mo=Math.max(1,Math.ceil(dn(d.deadline)/30.4375));R('Oyiga ajratish',fmt(Math.ceil(d.amount/mo)))}}
 else if(d.kind==='bud'){const sp=sum(db.tx,x=>x.type==='expense'&&x.category===d.category&&x.date.startsWith(todayS().slice(0,7)));R('Kategoriya',d.category);R('Oylik limit',fmt(d.amount));R('Bu oy sarflangan',fmt(sp));if(d.old)R('Avvalgi limit',fmt(d.old))}
 else if(d.kind==='rem'){R('Matn',d.text);R('Turi',L(RT[d.type]));R('Sana',d.date&&dlong(d.date));R('Vaqt',d.time||'09:00');R('Summa',d.amount&&fmt(d.amount));R('Takrorlanish',L(RP[d.repeat]))}
 else{R('Summa',fmt(d.amount));R('Sana',d.date&&dlong(d.date));if(d.kind==='tx')R('Kategoriya',d.category);else{R('Kim',d.person);R('Qaytarish muddati',d.due&&dlong(d.due))}R('Eslatma',d.remind&&dlong(d.remind))}
 return`<div class="cf ${active?'':d.saved?'saved':'old'}"><h4>${head}${CK[d.kind](d)}${d.saved?' <span class="tag pos" style="margin-left:auto">Saqlandi</span>':''}</h4>${rows.join('')}${active?`<div class="bt"><button class="btn sm" data-a="ok">${ico('check')}Saqlash</button><button class="btn sm ghost" data-a="editd">Tahrirlash</button><button class="btn sm quiet" data-a="no">Bekor qilish</button></div>`:''}</div>`}
const msgHTML=m=>m.card?cardHTML(m.card,m.card===draft&&!m.card.missing.length&&!m.card.saved):`<div class="m ${m.r}${m.err?' err':''}" ${m.r==='u'?'translate="no"':''}>${esc(m.t)}</div>`;
const SUGG={uz:["Taksiga 25 ming to'ladim","Bugun 3 mln maosh oldim","Ertaga internet to'lovini eslat","Byudjetim qanday?"],ru:['Заплатил за такси 25 тысяч','Сегодня получил зарплату 3 млн','Напомни завтра оплатить интернет','Какой у меня бюджет?'],en:['Paid 25k for a taxi','Got my 3m salary today','Remind me tomorrow to pay internet','How is my budget?']}[LANG];
const SUGG_AI={uz:["Bozorga 150 ming sarfladim","Telefon uchun 5 mln jamg'armoqchiman","Oziq-ovqatga oyiga 2 mln limit qo'y","Balansim qancha?","Kimlarga qarz berganman?"],ru:['Потратил 150 тысяч на продукты','Коплю 5 млн на телефон','Лимит на еду 2 млн в месяц','Какой у меня баланс?','Кому я дал в долг?'],en:['Spent 150k on groceries','Saving 5m for a phone','Set a 2m monthly food budget',"What's my balance?",'Who did I lend money to?']}[LANG];

/* ---------- sahifalar ---------- */
const HEAD={
 dash:()=>[greet()+(USER?', '+USER.name.split(' ')[0]:''),`${dlong(todayS())}, ${WD[new Date().getDay()]}`,`${streakPill()}<button class="btn hide-m" data-a="add" title="Yangi yozuv (N)">${ico('plus')}Yangi yozuv</button>`],
 ai:()=>['Yordamchi',"Oddiy gap bilan yozing yoki savol bering",''],
 tx:()=>['Operatsiyalar','Barcha kirim va chiqimlaringiz',`<button class="btn hide-m" data-a="add">${ico('plus')}Yangi yozuv</button>`],
 an:()=>['Tahlil','Oyma-oy natijalar va tavsiyalar',`<div class="monthnav"><button class="icon-btn" data-a="anp" aria-label="Oldingi oy">${ico('left')}</button><b>${monthTitle(anS.m,anS.y)}</b><button class="icon-btn" data-a="ann" aria-label="Keyingi oy">${ico('right')}</button></div>`],
 bud:()=>['Byudjet',"Kategoriyalar bo'yicha oylik limitlar",`<button class="btn ghost" data-a="budset">${ico('edit')}Limitlarni sozlash</button>`],
 goals:()=>['Maqsadlar',"Nima uchun pul yig'yapsiz",`<button class="btn" data-a="goal">${ico('plus')}Yangi maqsad</button>`],
 debts:()=>['Qarzlar','Kimga berdingiz va kimdan oldingiz',`<button class="btn" data-a="debt">${ico('plus')}Qarz yozish</button>`],
 rem:()=>['Eslatmalar',"To'lovlar va majburiyatlar",`<button class="btn" data-a="remadd">${ico('plus')}Eslatma qo'shish</button>`],
 set:()=>['Sozlamalar','Ma\'lumotlar, zaxira nusxa va ilova','']};
const streakPill=()=>{const s=streak();return s.n?`<span class="pill warm" title="Har kuni kamida bitta yozuv">${ico('flame')}${s.n} kun ketma-ket</span>`:''};

const V={
 dash(){if(!hasData())return welcome();
  const now=new Date(),k=todayS().slice(0,7),c=mstat(k),inc=sum(db.tx,t=>t.type==='income'),exp=sum(db.tx,t=>t.type==='expense'),
   gave=sum(db.debts,d=>d.dir==='gave'&&d.status==='pending'),took=sum(db.debts,d=>d.dir==='took'&&d.status==='pending'),gs=db.goals.reduce((a,g)=>a+gSaved(g),0),
   left=new Date(now.getFullYear(),now.getMonth()+1,0).getDate()-now.getDate(),sp=pct(c.exp,c.inc),bs=budStat(),up=upcoming(),rec=db.tx.slice().sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt).slice(0,6);
  return`<div class="grid">
  <section class="panel balance c7"><div><div class="lbl"><span>${L('{0} oyida qoldi',monthIn(now.getMonth()))}</span><button class="link" data-a="nav" data-p="an">Batafsil tahlil</button></div>
   <div class="big ${c.net<0?'neg':''}">${c.net<0?'−':''}${nf(c.net)}<small>so'm</small></div></div>
   <div><div class="flow"><div><span>${ico('in')}Kirim</span><b class="pos">${M(c.inc)}</b></div><div><span>${ico('out')}Chiqim</span><b>${M(c.exp)}</b></div></div>
   ${c.inc?`<div class="split" style="margin-top:14px" title="Daromadning ${sp}% i sarflandi"><i style="width:${Math.min(100,sp)}%"></i></div><p class="split-note">Daromadning ${sp}% i sarflandi. Oy tugashiga ${left} kun qoldi.</p>`:`<p class="split-note">Bu oy hali kirim yozilmagan.</p>`}</div>
   <div class="facts"><div>Umumiy balans<b>${M(inc-exp)}</b></div><div>Sizga qaytariladi<b>${M(gave)}</b></div><div>Siz qaytarasiz<b>${M(took)}</b></div><div>Maqsadlarda<b>${M(gs)}</b></div></div></section>
  <section class="panel capture c5"><h2>Tezkor yozuv</h2><p>Oddiy gap bilan yozing. Summa, kategoriya va sanani o'zim aniqlayman.</p>
   <form class="cbox" id="capf"><input id="ci" placeholder="Masalan: taksiga 25 ming" autocomplete="off" aria-label="Tezkor yozuv" enterkeyhint="send"><button type="button" class="mic" id="mic" data-a="mic" aria-label="Ovoz bilan yozish" title="Ovoz bilan yozish">${ico('mic')}</button><button class="send" aria-label="Yuborish">${ico('send')}</button></form>
   <div class="sugg" translate="no">${SUGG.slice(0,3).map(x=>`<button data-a="chip" data-t="${esc(x)}">${esc(x)}</button>`).join('')}</div>
   <div class="cres">${capRes()}</div></section>
  <section class="panel c5"><div class="panel-h"><h2>Byudjet</h2><button class="link" data-a="nav" data-p="bud">${bs.length?'Hammasi':'Limit qo\'yish'}</button></div>${bs.length?bs.slice(0,4).map(x=>budRow(x)).join(''):empty("Limit qo'yilmagan","Har kategoriyaga oylik limit qo'ysangiz, oshib ketishidan oldin ogohlantiraman.",`<button class="btn ghost sm" data-a="budset">Limit qo'yish</button>`)}</section>
  <section class="panel c7"><div class="panel-h"><div><h2>Yaqin 7 kun</h2><p>To'lovlar, qarzlar va eslatmalar</p></div><button class="link" data-a="nav" data-p="rem">Eslatmalar</button></div><div class="rows">${up.length?up.slice(0,5).map(upRow).join(''):empty("Hammasi joyida","Yaqin 7 kunda to'lov yoki majburiyat yo'q.")}</div></section>
  <section class="panel c6"><div class="panel-h"><div><h2>Bu oy nimaga ketdi</h2><p>${c.ne} ta xarajat</p></div></div>${c.ne?shares(c.cats,c.exp,null,6):empty("Bu oy xarajat yozilmagan")}</section>
  <section class="panel c6"><div class="panel-h"><div><h2>Oxirgi 6 oy</h2><p>Kirim va chiqim</p></div></div>${chart6(now.getFullYear(),now.getMonth())}</section>
  <section class="panel c12"><div class="panel-h"><h2>Oxirgi yozuvlar</h2><button class="link" data-a="nav" data-p="tx">Barchasi</button></div><div class="rows">${rec.length?byDay(rec):empty("Hali yozuv yo'q")}</div></section></div>`},
 tx(){const ms=[...new Set(db.tx.map(t=>t.date.slice(0,7)))].sort().reverse(),cats=flt.t==='all'?[...new Set([...CAT.expense,...CAT.income])]:CAT[flt.t];
  return`<div class="toolbar"><div class="seg" role="tablist">${[['all','Hammasi'],['expense','Chiqim'],['income','Kirim']].map(([v,l])=>`<button class="${flt.t===v?'on':''}" data-a="ft" data-v="${v}" role="tab" aria-selected="${flt.t===v}">${l}</button>`).join('')}</div>
  <label class="field search">${ico('search')}<input id="fq" type="search" placeholder="Izoh, kategoriya yoki summa" value="${esc(flt.q)}" aria-label="Qidirish"></label>
  <label class="field"><select id="fm" aria-label="Oy"><option value="">Barcha oylar</option>${ms.map(k=>`<option value="${k}" ${k===flt.m?'selected':''}>${monthTitle(+k.slice(5)-1,k.slice(0,4))}</option>`).join('')}</select></label>
  <label class="field"><select id="fc" aria-label="Kategoriya"><option value="">Barcha kategoriyalar</option>${cats.map(c=>`<option value="${esc(c)}" ${c===flt.c?'selected':''}>${esc(c)}</option>`).join('')}</select></label></div>
  <section class="panel" id="lr">${txBody()}</section>`},
 an(){const{y,m}=anS,c=mstat(mk(y,m)),p=mstat(mk(y,m-1));
  if(!c.n)return`<section class="panel">${empty(L("{0} oyida yozuv yo'q",monthIn(m)),"Boshqa oyni tanlang yoki shu oy uchun yozuv qo'shing.")}</section>`;
  const f=forecast(),ins=recsFor(c,p);
  return`<div class="stats" style="margin-bottom:18px"><div><span>Kirim</span><b class="pos">${M(c.inc)}</b><em>${p.n?delta(c.inc,p.inc,true)+" o'tgan oyga nisbatan":c.n+' ta yozuv'}</em></div><div><span>Chiqim</span><b>${M(c.exp)}</b><em>${p.n?delta(c.exp,p.exp,false)+" o'tgan oyga nisbatan":c.ne+' ta xarajat'}</em></div><div><span>Qoldi</span><b class="${c.net<0?'neg':''}">${M(c.net)}</b><em>${c.inc?`daromadning ${pct(Math.max(0,c.net),c.inc)}% i`:''}</em></div><div><span>Jamg'arildi</span><b>${M(c.sv)}</b><em>maqsadlarga qo'shilgan</em></div></div>
  <div class="grid"><section class="panel c7"><div class="panel-h"><div><h2>Xarajat kategoriyalari</h2><p>Ulush va o'tgan oyga nisbatan o'zgarish</p></div></div>${c.ne?shares(c.cats,c.exp,p):empty('Xarajat yozilmagan')}</section>
  <section class="panel c5"><div class="panel-h"><h2>Kuzatuvlar</h2></div><div class="insights">${ins.map(x=>{const bad=/oshib|oshgan|ga ko'p|katta qismini|превыш|выросл|большая часть|is over|went up|large share|more than you earned/.test(x),good=/ortgan|из дохода осталось|left from income/i.test(x);return`<div class="insight ${bad?'bad':good?'good':''}">${ico(bad?'alert':good?'trend':'bulb')}<span>${esc(x)}</span></div>`}).join('')}</div><p class="note">Faqat siz yozgan ma'lumotlar asosida hisoblanadi.</p></section>
  <section class="panel c6"><div class="panel-h"><h2>O'tgan oy bilan taqqoslash</h2></div>${p.n?`<table class="cmp"><thead><tr><th></th><th>${monthTitle(m)}</th><th>${monthTitle((m+11)%12)}</th><th>O'zgarish</th></tr></thead><tbody>${[['Kirim','inc',1],['Chiqim','exp',0],['Qoldi','net',1]].map(([l,k,u])=>`<tr><td>${l}</td><td>${M(c[k])}</td><td>${M(p[k])}</td><td>${delta(c[k],p[k],!!u)||'—'}</td></tr>`).join('')}</tbody></table><p class="note">${L('Eng katta xarajat:')} <span translate="no">${c.big?`${esc(c.big.note||L(c.big.category))}, ${fmt(c.big.amount).replace("so'm",CUR)} (${dlong(c.big.date)})`:'—'}</span></p>`:empty("O'tgan oy ma'lumoti yo'q","Taqqoslash uchun kamida ikki oylik yozuv kerak.")}</section>
  <section class="panel c6"><div class="panel-h"><div><h2>Keyingi oy taxmini</h2><p>${f?`Oxirgi ${f.n} oy asosida`:''}</p></div></div>${f?[['Kirim',f.inc],['Chiqim',f.exp],['Qoladi',f.net]].map(([l,r])=>`<div class="range"><span>${l}</span><b>${nf(r[0])} – ${M(r[1])}</b></div>`).join('')+`<p class="note">Bu o'tgan oylardagi oraliq, kafolat emas.</p>`:empty("Taxmin uchun ma'lumot kam","Kamida ikki oylik yozuv kerak.")}</section>
  <section class="panel c12"><div class="panel-h"><h2>Oxirgi 6 oy</h2></div>${chart6(y,m)}</section></div>`},
 bud(){const b=budStat(),k=todayS().slice(0,7),n=new Date(),left=new Date(n.getFullYear(),n.getMonth()+1,0).getDate()-n.getDate()+1;
  const free=CAT.expense.filter(c=>!db.budgets[c]).map(c=>[c,sum(db.tx,x=>x.type==='expense'&&x.category===c&&x.date.startsWith(k))]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]);
  const freeP=free.length?`<section class="panel" style="margin-top:18px"><div class="panel-h"><div><h2>Limitsiz xarajatlar</h2><p>Bu oy limit qo'yilmagan kategoriyalar</p></div></div><div class="rows">${free.map(([c,v])=>`<div class="row">${catI(c,1)}<div class="t"><b>${esc(c)}</b></div><div class="amt">${M(v)}</div><button class="btn sm ghost" data-a="budset" data-c="${esc(c)}">Limit qo'yish</button></div>`).join('')}</div></section>`:'';
  if(!b.length)return`<section class="panel">${empty("Hali limit qo'yilmagan","Masalan, oziq-ovqatga oyiga 2 mln. Sarf 80% ga yetganda va oshib ketganda ogohlantiraman.",`<button class="btn" data-a="budset">Limitlarni sozlash</button>`)}</section>`+freeP;
  const tl=b.reduce((a,x)=>a+x.lim,0),ts=b.reduce((a,x)=>a+x.spent,0);
  return`<div class="stats" style="margin-bottom:18px"><div><span>Oylik limit</span><b>${M(tl)}</b><em>${b.length} ta kategoriya</em></div><div><span>Sarflandi</span><b class="${ts>tl?'neg':''}">${M(ts)}</b><em>limitning ${pct(ts,tl)}% i</em></div><div><span>Qoldi</span><b class="${ts>tl?'neg':'pos'}">${M(Math.max(0,tl-ts))}</b><em>${ts>tl?fmt(ts-tl)+' oshib ketdi':'limit doirasida'}</em></div><div><span>Kuniga sarflash mumkin</span><b>${M(Math.max(0,(tl-ts)/left))}</b><em>oy tugashiga ${left} kun</em></div></div>
  <section class="panel"><div class="panel-h"><div><h2>${monthTitle(n.getMonth())}</h2><p>Chiziqdagi belgi oyning bugungi kunini ko'rsatadi</p></div></div>${b.map(x=>budRow(x,1)).join('')}</section>${freeP}`},
 goals(){if(!db.goals.length)return`<section class="panel">${empty("Maqsad hali yo'q","Telefon, noutbuk yoki sayohat. Summa va muddatni yozing, oyiga qancha ajratish kerakligini hisoblayman.",`<button class="btn" data-a="goal">${ico('plus')}Yangi maqsad</button>`)}</section>`;
  return`<div class="grid">${db.goals.map(g=>{const s=gSaved(g),p=Math.min(100,pct(s,g.target)),C=2*Math.PI*40;
   return`<section class="panel c6"><div class="goal"><div class="ring ${p>=100?'done':''}"><svg viewBox="0 0 96 96"><circle class="bg" cx="48" cy="48" r="40"/><circle class="fg" cx="48" cy="48" r="40" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-p/100)}"/></svg><b>${p}%</b></div>
   <div><h3 translate="no">${esc(g.name)}</h3><div class="meta">${g.deadline?L('{0} gacha',dlong(g.deadline)):L('Muddatsiz')}<span translate="no">${g.note?', '+esc(g.note):''}</span></div><div class="amt"><b>${M(s)}</b> <span class="muted">/ ${M(g.target)}</span></div><p class="plan">${esc(plan(g))}</p>
   <div class="acts"><button class="btn sm" data-a="cadd" data-id="${g.id}">${ico('plus')}Pul qo'shish</button>${g.contribs.length?`<button class="btn sm quiet" data-a="undoc" data-id="${g.id}">${ico('undo')}Oxirgisini qaytarish</button>`:''}<button class="icon-btn" data-a="edit" data-k="goals" data-id="${g.id}" aria-label="Tahrirlash">${ico('edit')}</button><button class="icon-btn danger" data-a="del" data-k="goals" data-id="${g.id}" aria-label="O'chirish">${ico('trash')}</button></div></div></div></section>`}).join('')}</div><p class="note">Maqsadga qo'shilgan pul balansdan ayrilmaydi, alohida kuzatiladi.</p>`},
 debts(){const P=db.debts.filter(d=>d.status==='pending'),gave=sum(P,d=>d.dir==='gave'),took=sum(P,d=>d.dir==='took'),late=P.filter(d=>d.due&&d.due<todayS());
  if(!db.debts.length)return`<section class="panel">${empty("Qarz yozilmagan","Kimga qancha berganingiz va kimdan olganingizni yozib qo'ying, muddatida eslataman.",`<button class="btn" data-a="debt">${ico('plus')}Qarz yozish</button>`)}</section>`;
  const row=d=>{const l=d.status==='pending'&&d.due&&d.due<todayS();return`<div class="row click" data-a="edit" data-k="debts" data-id="${d.id}" tabindex="0">${tI(d.dir==='gave'?'out':'in',d.dir==='gave'?'#2B44B8':'#B83C7A')}<div class="t"><b translate="no">${esc(d.person)}</b><span translate="no">${L(d.dir==='gave'?'Siz berdingiz':'Siz oldingiz')}, ${dlong(d.date)}${d.note?', '+esc(d.note):''}</span></div>${d.due&&d.status==='pending'?`<span class="tag ${l?'neg':'brand'}">${l?L("Muddati o'tgan"):L('{0} gacha',dlong(d.due))}</span>`:''}<div class="amt">${M(d.amount)}</div><button class="btn sm ${d.status==='paid'?'quiet':'ghost'}" data-a="toggle" data-k="debts" data-id="${d.id}">${d.status==='paid'?ico('undo')+'Qayta ochish':ico('check')+'Qaytarildi'}</button></div>`};
  const done=db.debts.filter(d=>d.status==='paid');
  return`<div class="stats" style="margin-bottom:18px;grid-template-columns:repeat(3,1fr)"><div><span>Sizga qaytarilishi kerak</span><b>${M(gave)}</b><em>${P.filter(d=>d.dir==='gave').length} ta qarz</em></div><div><span>Siz qaytarishingiz kerak</span><b>${M(took)}</b><em>${P.filter(d=>d.dir==='took').length} ta qarz</em></div><div><span>Muddati o'tgan</span><b class="${late.length?'neg':''}">${late.length} ta</b><em>${late.length?fmt(sum(late)):'hammasi vaqtida'}</em></div></div>
  <section class="panel"><div class="panel-h"><h2>Ochiq qarzlar</h2></div><div class="rows">${P.length?P.sort((a,b)=>(a.due||'9').localeCompare(b.due||'9')).map(row).join(''):empty("Ochiq qarz yo'q")}</div></section>
  ${done.length?`<section class="panel" style="margin-top:18px"><div class="panel-h"><h2>Yopilgan qarzlar</h2></div><div class="rows">${done.map(row).join('')}</div></section>`:''}`},
 rem(){const N='Notification'in window,p=N&&Notification.permission,g={};db.rem.forEach(r=>(g[sect(r)]=g[sect(r)]||[]).push(r));
  Object.values(g).forEach(a=>a.sort((x,y)=>(x.date+(x.time||'')).localeCompare(y.date+(y.time||''))));
  const secs=[['over',"Muddati o'tgan"],['today','Bugun'],['tom','Ertaga'],['up','Keyinroq'],['done','Bajarilgan']],selL=cal.sel?db.rem.filter(r=>r.date===cal.sel):[];
  const banner=N&&p==='default'?`<section class="panel" style="margin-bottom:18px;display:flex;gap:16px;align-items:center;flex-wrap:wrap">${tI('bell','#2B44B8')}<div style="flex:1;min-width:220px"><b>Bildirishnomalarni yoqing</b><p class="muted" style="font-size:14px">To'lov vaqti kelganda xabar beraman. Ilova ochiq bo'lishi kerak.</p></div><button class="btn" data-a="notif">Yoqish</button></section>`:'';
  return banner+`<div class="grid"><section class="panel c5" style="align-self:start">${calHTML()}${cal.sel?`<div class="sec-h"><h3>${dayLab(cal.sel)}</h3></div><div class="rows">${selL.length?selL.map(remRow).join(''):`<p class="muted" style="font-size:14px">Bu kunda eslatma yo'q.</p>`}</div>`:''}</section>
  <div class="c7">${secs.filter(([k])=>g[k]).map(([k,l],i)=>`<div class="sec-h" style="${i?'':'margin-top:0'}"><h3>${l}</h3><span>${g[k].length} ta</span></div><section class="panel" style="padding:10px 22px"><div class="rows">${g[k].map(remRow).join('')}</div></section>`).join('')||`<section class="panel">${empty("Eslatma yo'q","Kommunal to'lov, internet, qarz qaytarish. Bir marta yozing, vaqtida eslataman.",`<button class="btn" data-a="remadd">${ico('plus')}Eslatma qo'shish</button>`)}</section>`}</div></div>`},
 ai(){return`<section class="panel chat"><div class="msgs" id="ms">${chat.map(msgHTML).join('')}${typing?'<div class="m a typ"><i></i><i></i><i></i></div>':''}</div>
  <div class="composer"><div class="sugg" translate="no">${SUGG_AI.map(x=>`<button data-a="chip" data-t="${esc(x)}">${esc(x)}</button>`).join('')}</div>
  <form class="cbox" id="cf"><input id="ci" autocomplete="off" placeholder="Masalan: kecha taksiga 25 ming to'ladim" aria-label="Xabar" enterkeyhint="send"><button type="button" class="mic" id="mic" data-a="mic" aria-label="Ovoz bilan yozish">${ico('mic')}</button><button class="send" aria-label="Yuborish">${ico('send')}</button></form></div></section>`},
 set(){const n=db.tx.length+db.debts.length+db.rem.length+db.goals.length,kb=(new Blob([localStorage.getItem(KEY)||'']).size/1024).toFixed(1),le=localStorage.getItem(KEY+'-last-export'),sa=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
  const R=(i,t,s,a)=>`<div class="set-row"><span class="ico">${ico(i)}</span><div class="t"><b>${t}</b><span>${s}</span></div>${a||''}</div>`;
  const ac=USER?`<section class="set-group"><h2>Hisob</h2><div class="set-row">${avatar(USER,1)}<div class="t"><b translate="no">${esc(USER.name)}</b><span><span translate="no">${esc(USER.email)}</span>. ${L('Hisob {0} da yaratilgan.',dlong(iso(new Date(USER.createdAt))))}</span></div><button class="btn sm ghost" data-a="profile">Tahrirlash</button></div>
  ${R('lock','Parol',"Parolni muntazam yangilab turing.",`<button class="btn sm ghost" data-a="chpw">O'zgartirish</button>`)}
  ${R('key','Tiklash kodi',"Parolni unutsangiz, shu kod bilan tiklaysiz. Yo'qotgan bo'lsangiz, yangisini oling.",`<button class="btn sm ghost" data-a="newcode">Yangi kod</button>`)}
  ${R('logout','Chiqish',"Bu qurilmadagi sessiya yopiladi. Ma'lumotlaringiz saqlanib qoladi.",`<button class="btn sm ghost" data-a="logout">Chiqish</button>`)}
  ${R('trash',"Hisobni o'chirish","Hisob va undagi barcha ma'lumotlar butunlay o'chiriladi.",`<button class="btn sm danger" data-a="delacc">O'chirish</button>`)}</section>`:'';
  return`<div style="max-width:760px">${ac}
  <section class="set-group"><h2>Ilova</h2>${R('globe','Til',"Interfeys va yordamchi shu tilda ishlaydi.",langSwitch())}${R('moon',"Ko'rinish","Yorug', qorong'i yoki qurilma sozlamasiga mos.",themeSwitch())}${R('phone',"Telefonga o'rnatish",sa?"Ilova o'rnatilgan holda ishlayapti.":installEvt?"Bosh ekrandan ochiladi va internetsiz ishlaydi.":"Android: brauzer menyusi, keyin «Ilovani o'rnatish». iPhone: «Ulashish», keyin «Bosh ekranga qo'shish».",!sa&&installEvt?`<button class="btn sm" data-a="install">O'rnatish</button>`:sa?`<span class="tag pos">O'rnatilgan</span>`:'')}
  ${R('cloud','Internetsiz ishlash',swOk?"Ilova fayllari qurilmada saqlangan.":"HTTPS orqali ochilganda yoqiladi.",`<span class="tag ${swOk?'pos':''}">${swOk?'Yoqilgan':"O'chiq"}</span>`)}
  ${R('bell','Bildirishnomalar',!('Notification'in window)?"Bu brauzer qo'llamaydi.":Notification.permission==='granted'?"Yoqilgan. Ilova ochiq bo'lganda ishlaydi.":Notification.permission==='denied'?"Brauzer sozlamalarida bloklangan.":"To'lov vaqti kelganda xabar beraman.",'Notification'in window&&Notification.permission==='default'?`<button class="btn sm ghost" data-a="notif">Yoqish</button>`:'')}</section>
  <section class="set-group"><h2>Ma'lumotlar</h2>${R('download','Zaxira nusxa olish',L('{0} ta yozuv, {1} KB.',n,kb)+' '+(le?L('Oxirgi nusxa: {0}.',dlong(le)):L('Hali nusxa olinmagan.')),`<button class="btn sm" data-a="exp">Yuklab olish</button>`)}
  ${R('upload','Zaxiradan tiklash','Boshqa qurilmadan olingan JSON faylni yuklang.',`<button class="btn sm ghost" data-a="imp">Fayl tanlash</button>`)}
  ${R('file','Excel uchun eksport','Barcha operatsiya va qarzlar CSV faylda.',`<button class="btn sm ghost" data-a="csv">Yuklab olish</button>`)}
  ${R('sparkle','Namuna ma\'lumot',"Ilovani 6 oylik namunaviy ma'lumot bilan ko'ring. Hozirgi ma'lumotlaringiz saqlab qo'yiladi.",`<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">${localStorage.getItem(KEY+'-before-demo')?`<button class="btn sm quiet" data-a="undemo">Avvalgi holat</button>`:''}<button class="btn sm ghost" data-a="demo">Yuklash</button></div>`)}</section>
  <section class="set-group"><h2>Maxfiylik</h2>${R('shield',"Ma'lumotlar faqat sizda","Hech narsa serverga yuborilmaydi. Hammasi shu qurilmaning xotirasida saqlanadi.")}
  ${R('trash',"Barcha ma'lumotlarni o'chirish",'Bu amalni bekor qilib bo\'lmaydi. Avval zaxira nusxa oling.',`<button class="btn sm danger" data-a="wipe">O'chirish</button>`)}</section>
  <p class="note">Pulim, versiya 6.5</p></div>`}};

function txBody(){const q=flt.q.trim().toLowerCase().replace(/\s/g,''),l=db.tx.filter(t=>(flt.t==='all'||t.type===flt.t)&&(!flt.m||t.date.startsWith(flt.m))&&(!flt.c||t.category===flt.c)&&(!q||(t.note+t.category+t.amount+dlong(t.date)).toLowerCase().replace(/\s/g,'').includes(q))),f=flt.q||flt.m||flt.c;
 const i=sum(l,t=>t.type==='income'),e=sum(l,t=>t.type==='expense');
 if(!db.tx.length)return empty("Hali yozuv yo'q","Birinchi xarajat yoki kirimingizni yozing.",`<button class="btn" data-a="add">${ico('plus')}Yangi yozuv</button>`);
 return`<div class="sumline">${flt.t!=='expense'?`<span>Kirim <b class="pos">${M(i)}</b></span>`:''}${flt.t!=='income'?`<span>Chiqim <b>${M(e)}</b></span>`:''}<span>${l.length} ta yozuv</span>${f?`<button class="link" data-a="fclr">Filtrni tozalash</button>`:''}</div><div class="rows" style="margin-top:12px">${l.length?byDay(l):empty("Hech narsa topilmadi","Boshqa so'z bilan qidiring yoki filtrni tozalang.")}</div>`}
function capRes(){if(!cap)return`<div class="reply">Masalan: «kecha bozorga 180 ming», «Aziz 500 ming qarz berdim, 10-dekabrda eslat», «balansim qancha?»${fine?'\n\nKlaviatura: «/» shu qatorga o\'tadi, «N» yangi yozuv oynasini ochadi.':''}</div>`;
 const last=chat[chat.length-1];return(typing?'<div class="m a typ" style="align-self:flex-start"><i></i><i></i><i></i></div>':last.card?cardHTML(last.card,last.card===draft&&!last.card.missing.length&&!last.card.saved):`<div class="reply">${esc(last.t)}</div>`)+`<div class="more"><button class="link" data-a="nav" data-p="ai">Yordamchida davom ettirish</button></div>`}
const remRow=r=>{const[dd,mm]=short(r.date),s=sect(r);return`<div class="row">${`<div class="date-chip ${s==='over'?'late':''}"><b>${dd}</b><span>${mm}</span></div>`}<div class="t"><b translate="no" style="${r.done?'text-decoration:line-through;color:var(--muted)':''}">${esc(r.text)}</b><span translate="no">${[r.time||'',L(RT[r.type]),r.repeat!=='once'?L(RP[r.repeat]).toLowerCase():'',r.note].filter(Boolean).map(esc).join(', ')}</span></div>${r.amount?`<div class="amt">${M(r.amount)}</div>`:''}<div style="display:flex;gap:2px"><button class="icon-btn" data-a="toggle" data-k="rem" data-id="${r.id}" aria-label="${r.done?'Qayta ochish':'Bajarildi'}" title="${r.done?'Qayta ochish':'Bajarildi'}">${ico(r.done?'undo':'check')}</button><button class="icon-btn" data-a="edit" data-k="rem" data-id="${r.id}" aria-label="Tahrirlash">${ico('edit')}</button><button class="icon-btn danger" data-a="del" data-k="rem" data-id="${r.id}" aria-label="O'chirish">${ico('trash')}</button></div></div>`};
function calHTML(){const{y,m}=cal,off=(new Date(y,m,1).getDay()+6)%7,days=new Date(y,m+1,0).getDate(),by={};db.rem.forEach(r=>(by[r.date]=by[r.date]||[]).push(r));let c='<span></span>'.repeat(off);
 for(let d=1;d<=days;d++){const k=`${y}-${pad(m+1)}-${pad(d)}`,l=by[k]||[],cl=l.length?(l.some(isOver)?'late':l.every(r=>r.done)?'ok':'pend'):'';c+=`<button class="cd ${k===todayS()?'td':''} ${k===cal.sel?'sel':''} ${cl}" data-a="cday" data-d="${k}" aria-label="${dateText(y,m,d)}${l.length?', '+L('{0} ta eslatma',l.length):''}">${d}${l.length?'<i></i>':''}</button>`}
 return`<div class="cal-h"><button class="icon-btn" data-a="cprev" aria-label="Oldingi oy">${ico('left')}</button><b>${monthTitle(m,y)}</b><button class="icon-btn" data-a="cnext" aria-label="Keyingi oy">${ico('right')}</button></div><div class="cal-w">${WSHORT[LANG].map(x=>`<span>${x}</span>`).join('')}</div><div class="cal-g">${c}</div>`}
function welcome(){return`<section class="panel welcome"><div><h2>Pulingiz qayerga ketayotganini aniq biling</h2><p>Xarajatni oddiy gap bilan yozing: «taksiga 25 ming». Qolganini Pulim o'zi tartiblaydi: kategoriya, oylik tahlil, byudjet va eslatmalar.</p>
 <div class="acts"><button class="btn" data-a="add">${ico('plus')}Birinchi yozuvni qo'shish</button><button class="btn ghost" data-a="demo">Namuna bilan ko'rish</button></div></div>
 <div class="demo-type"><div class="m u">Bozorga 150 ming sarfladim</div><div class="cf" style="width:100%"><h4>${catI('Oziq-ovqat',1)}Chiqim</h4><div class="kv"><span>Summa</span><b>150 000 so'm</b></div><div class="kv"><span>Kategoriya</span><b>Oziq-ovqat</b></div><div class="kv"><span>Sana</span><b>Bugun</b></div></div></div></section>`}

/* ---------- marshrut ---------- */
function route(){
 const od=overdue();
 $('#nav').innerHTML=PAGES.map(([k,i,n],x)=>`${k==='set'?'<hr>':''}<button class="${k===page?'on':''}" data-a="nav" data-p="${k}" ${k===page?'aria-current="page"':''}>${ico(i)}${n}${k==='rem'&&od?`<span class="badge">${od}</span>`:''}</button>`).join('');
 $('#tabbar').innerHTML=[['dash','home','Asosiy'],['tx','list','Operatsiyalar'],['+','plus',''],['an','chart','Tahlil'],['more','menu',"Ko'proq"]].map(([k,i,n])=>k==='+'?`<button data-a="add" aria-label="Yangi yozuv"><span class="fab" style="display:grid;place-items:center">${ico(i)}</span></button>`:`<button class="${k===page||(k==='more'&&!['dash','tx','an'].includes(page))?'on':''}" data-a="${k==='more'?'more':'nav'}" data-p="${k}">${ico(i)}${n}</button>`).join('');
 const s=streak();$('#sfoot').innerHTML=(s.n?`<div class="streak">${ico('flame')}${s.n} kun ketma-ket</div><div>${s.today?"Bugun yozildi. Ertaga ham davom eting.":"Seriyani uzmaslik uchun bugun ham yozing."}</div>`:`<div>Har kuni yozib boring, seriya boshlanadi.</div>`)+(navigator.onLine?'':`<div class="neg">Internet yo'q, ilova oflayn ishlayapti</div>`)+userBlock();
 const[h,sub,act]=HEAD[page]();$('#ttl').textContent=h;$('#sub').textContent=sub;$('#topact').innerHTML=act;
 $('#view').innerHTML=V[page]();document.title=(page==='dash'?'':PAGES.find(p=>p[0]===page)[2]+' — ')+'Pulim';
 if(page==='ai'){const m=$('#ms');m.scrollTop=m.scrollHeight;if(fine)$('#ci').focus({preventScroll:true})}
 if(page==='dash'&&cap&&fine&&$('#ci'))$('#ci').focus({preventScroll:true})}
function go(p){if(p!==page){flt={t:'all',q:'',m:'',c:''};if(p!=='dash')cap=false}page=p;closeSheet();try{history.replaceState(null,'',p==='dash'?location.pathname:'?p='+p)}catch{}route();window.scrollTo(0,0)}

/* ---------- toast ---------- */
function toast(t,act){const e=$('#toast');e.innerHTML=`<span>${esc(t)}</span>${act?`<button type="button" id="tact">${esc(act.l)}</button>`:''}`;e.classList.add('on');if(act)$('#tact').onclick=()=>{act.f();e.classList.remove('on')};clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),act?5500:2600)}

/* ---------- oyna (sheet) ---------- */
let sheetSubmit=null;
function openSheet(title,body,foot,onSubmit){const s=$('#sheet');s.hidden=false;s.innerHTML=`<form class="sh" id="sf" role="dialog" aria-modal="true" aria-label="${esc(title)}" novalidate><div class="sh-h"><h2>${title}</h2><button type="button" class="icon-btn" data-a="close" aria-label="Yopish">${ico('x')}</button></div><div class="sh-b">${body}</div><div class="sh-f">${foot||`<button type="button" class="btn ghost" data-a="close">Bekor qilish</button><button class="btn">Saqlash</button>`}</div></form>`;
 sheetSubmit=onSubmit;document.body.style.overflow='hidden';const f=s.querySelector('[autofocus]')||s.querySelector('input:not([type=radio]):not([type=hidden]),select');if(f&&fine)setTimeout(()=>f.focus(),30)}
function closeSheet(){const s=$('#sheet');if(s.hidden)return;s.hidden=true;s.innerHTML='';sheetSubmit=null;document.body.style.overflow=''}
const FL=(l,n,t,v='',x='',hint='')=>`<label class="fl">${l}${hint?` <small>${hint}</small>`:''}<input name="${n}" type="${t}" value="${esc(v)}" ${x}></label>`;
const SL=(l,n,o,v)=>`<label class="fl">${l}<select name="${n}">${o.map(([a,b])=>`<option value="${esc(a)}" ${a===v?'selected':''}>${esc(b)}</option>`).join('')}</select></label>`;
const AMT=(n,v,lab='Summa')=>`<div><div class="fl" style="margin-bottom:6px">${lab}</div><label class="amount-in"><input name="${n}" inputmode="numeric" autocomplete="off" placeholder="0" value="${v?nf(v):''}" data-money autofocus aria-label="${lab}"><span>so'm</span></label></div>`;
const QUICK=`<div class="quick">${[10000,50000,100000,500000].map(v=>`<button type="button" data-a="qadd" data-v="${v}">+${nf(v)}</button>`).join('')}<button type="button" data-a="qadd" data-v="0">Tozalash</button></div>`;
const money=v=>Math.round(+String(v||'').replace(/[^\d]/g,''))||0;
const SEG=(name,opts,v)=>`<input type="hidden" name="${name}" value="${v}"><div class="seg" style="width:100%">${opts.map(([a,b])=>`<button type="button" class="${a===v?'on':''}" style="flex:1" data-a="sseg" data-n="${name}" data-v="${a}">${b}</button>`).join('')}</div>`;
const CATS=(type,v)=>`<div class="cats" id="cats">${CAT[type].map(c=>`<label><input type="radio" name="category" value="${esc(c)}" ${c===v?'checked':''}><span>${catI(c,1)}${esc(c)}</span></label>`).join('')}</div>`;

function openTx(it={},type){const t=it.type||type||'expense',ed=!!it.id;
 openSheet(ed?'Yozuvni tahrirlash':'Yangi yozuv',SEG('type',[['expense','Chiqim'],['income','Kirim']],t)+AMT('amount',it.amount)+QUICK+`<div><div class="fl" style="margin-bottom:8px">Kategoriya</div>${CATS(t,it.category||CAT[t][0])}</div><div class="two">${FL('Sana','date','date',it.date||todayS(),'required')}${FL('Izoh','note','text',it.note||'','maxlength="80" placeholder="Masalan: Korzinka"')}</div>`,
 `${ed?`<button type="button" class="icon-btn danger" data-a="del" data-k="tx" data-id="${it.id}" aria-label="O'chirish">${ico('trash')}</button>`:''}<button type="button" class="btn ghost" data-a="close">Bekor qilish</button><button class="btn">${ed?'Saqlash':"Qo'shish"}</button>`,
 f=>{const a=money(f.amount);if(!a)return"Summani kiriting.";if(!okD(f.date))return"Sanani tanlang.";const out=build('tx',{...f,amount:a,category:f.category||'Boshqa'},it);upsert('tx',out);Store.save();
  if(it.onSave)it.onSave(out);else if(!ed)toast(L(f.type==='income'?"Kirim qo'shildi: {0}":"Chiqim qo'shildi: {0}",fmt(a)),{l:'Bekor qilish',f:()=>{db.tx=db.tx.filter(x=>x.id!==out.id);Store.save();route()}});else toast('Saqlandi')})}
function openDebt(it={}){const ed=!!it.id;
 openSheet(ed?'Qarzni tahrirlash':'Qarz yozish',SEG('dir',[['gave','Men berdim'],['took','Men oldim']],it.dir||'gave')+AMT('amount',it.amount)+FL('Kim bilan','person','text',it.person||'','required maxlength="40" placeholder="Ism"')+`<div class="two">${FL('Sana','date','date',it.date||todayS(),'required')}${FL('Qaytarish muddati','due','date',it.due||'','','ixtiyoriy')}</div>`+(ed?SL('Holati','status',[['pending','Kutilmoqda'],['paid','Qaytarildi']],it.status||'pending'):'')+FL('Izoh','note','text',it.note||'','maxlength="80"'),
 ed?`<button type="button" class="icon-btn danger" data-a="del" data-k="debts" data-id="${it.id}" aria-label="O'chirish">${ico('trash')}</button><button type="button" class="btn ghost" data-a="close">Bekor qilish</button><button class="btn">Saqlash</button>`:'',
 f=>{const a=money(f.amount);if(!a)return"Summani kiriting.";if(!f.person.trim())return"Ismni yozing.";const out=build('debt',{...f,amount:a},it);upsert('debt',out);Store.save();if(it.onSave)it.onSave(out);toast('Saqlandi')})}
function openRem(it={}){const ed=!!it.id;
 openSheet(ed?'Eslatmani tahrirlash':'Yangi eslatma',FL('Nima haqida','text','text',it.text||'','required maxlength="100" placeholder="Masalan: Internet to\'lovi" autofocus')+`<div class="two">${FL('Sana','date','date',it.date||todayS(),'required')}${FL('Vaqt','time','time',it.time||'','','ixtiyoriy')}</div>`+FL("Summa","amount",'text',it.amount?nf(it.amount):'','inputmode="numeric" data-money placeholder="0"','ixtiyoriy')+`<div class="two">${SL('Turi','type',Object.entries(RT),it.type||'task')}${SL('Takrorlanish','repeat',Object.entries(RP),it.repeat||'once')}</div>`+FL('Izoh','note','text',it.note||'','maxlength="80"'),
 ed?`<button type="button" class="icon-btn danger" data-a="del" data-k="rem" data-id="${it.id}" aria-label="O'chirish">${ico('trash')}</button><button type="button" class="btn ghost" data-a="close">Bekor qilish</button><button class="btn">Saqlash</button>`:'',
 f=>{if(!f.text.trim())return"Eslatma matnini yozing.";if(!okD(f.date))return"Sanani tanlang.";const out=build('rem',{...f,amount:money(f.amount)},it);upsert('rem',out);Store.save();if(it.onSave)it.onSave(out);toast('Eslatma saqlandi')})}
function openGoal(it={}){const ed=!!it.id;
 openSheet(ed?'Maqsadni tahrirlash':'Yangi maqsad',FL('Maqsad','name','text',it.name||'','required maxlength="60" placeholder="Masalan: Noutbuk sotib olish" autofocus')+AMT('target',it.target,'Kerakli summa')+`<div class="two">${FL("Hozir bor",'start','text',it.start?nf(it.start):'','inputmode="numeric" data-money placeholder="0"','ixtiyoriy')}${FL('Muddat','deadline','date',it.deadline||'','','ixtiyoriy')}</div>`+FL('Izoh','note','text',it.note||'','maxlength="80"'),'',
 f=>{const t=money(f.target);if(!f.name.trim())return"Maqsad nomini yozing.";if(!t)return"Kerakli summani kiriting.";
  const o={id:it.id||uid(),name:f.name.trim(),target:t,start:money(f.start),deadline:f.deadline||'',note:f.note.trim(),contribs:it.contribs||[],createdAt:it.createdAt||Date.now()},i=db.goals.findIndex(x=>x.id===o.id);i>=0?db.goals[i]=o:db.goals.push(o);Store.save();if(it.onSave)it.onSave(o);toast('Maqsad saqlandi')})}
function openContrib(g){openSheet(L("{0}: pul qo'shish",esc(g.name)),AMT('amount','')+QUICK+FL('Sana','date','date',todayS(),'required'),'',f=>{const a=money(f.amount);if(!a)return"Summani kiriting.";if(!okD(f.date))return"Sanani tanlang.";g.contribs.push({id:uid(),amount:a,date:f.date});Store.save();const p=pct(gSaved(g),g.target);toast(p>=100?L('Tabriklaymiz! «{0}» maqsadiga yetdingiz.',g.name):L("{0} qo'shildi. Maqsadning {1}% i yig'ildi.",fmt(a),p))})}
function openBud(focus,val){openSheet('Oylik limitlar',`<p class="muted" style="font-size:14px">Limit kerak bo'lmagan kategoriyani bo'sh qoldiring.</p><div class="rows">${CAT.expense.map(c=>`<label class="row" style="padding:6px 8px">${catI(c,1)}<span class="t"><b>${esc(c)}</b></span><span class="field" style="width:170px;height:40px"><input name="${esc(c)}" inputmode="numeric" data-money value="${c===focus&&val?nf(val):db.budgets[c]?nf(db.budgets[c]):''}" placeholder="limit yo'q" aria-label="${esc(L('{0} limiti',L(c)))}" style="text-align:right"><small class="muted">so'm</small></span></label>`).join('')}</div>`,'',
 v=>{const nb={};for(const[c,x]of Object.entries(v)){const n=money(x);if(CAT.expense.includes(c)&&n>0)nb[c]=n}db.budgets=nb;Store.save();if(focus&&val!==undefined&&draft)draft.saved=true;toast('Limitlar saqlandi')});
 if(focus){const i=[...document.querySelectorAll('#sf input')].find(x=>x.name===focus);if(i)setTimeout(()=>{i.focus();i.select()},40)}}
function askConfirm(title,text,ok,fn){openSheet(title,`<p style="color:var(--ink2)">${text}</p>`,`<button type="button" class="btn ghost" data-a="close">Bekor qilish</button><button class="btn danger">${ok}</button>`,()=>{fn()})}

/* ---------- amallar ---------- */
const KCOLL={tx:'tx',debts:'debts',rem:'rem',goals:'goals'};
function del(k,id){const c=db[KCOLL[k]],i=c.findIndex(x=>x.id===id);if(i<0)return;const [it]=c.splice(i,1);Store.save();closeSheet();route();
 toast(k==='goals'?'Maqsad o\'chirildi':k==='rem'?"Eslatma o'chirildi":k==='debts'?"Qarz o'chirildi":"Yozuv o'chirildi",{l:'Qaytarish',f:()=>{db[KCOLL[k]].splice(Math.min(i,db[KCOLL[k]].length),0,it);Store.save();route()}})}
function askDemo(){const run=()=>{if(hasData())try{localStorage.setItem(KEY+'-before-demo',JSON.stringify(db))}catch{}try{localStorage.setItem(KEY+'-hint-snooze',todayS())}catch{}db=demoData();Store.save();anS={y:new Date().getFullYear(),m:new Date().getMonth()};closeSheet();go('dash');toast("Namuna ma'lumot yuklandi")};
 hasData()?askConfirm("Namuna ma'lumot yuklansinmi?","Hozirgi ma'lumotlaringiz saqlab qo'yiladi va Sozlamalardan qaytarib olish mumkin.",'Yuklash',run):run()}
function moreMenu(){openSheet('Bo\'limlar',`<div style="margin-bottom:8px;display:grid;gap:8px">${langSwitch('wide')}${themeSwitch(true)}</div><div class="rows">${USER?`<div class="row" style="margin-bottom:6px">${avatar(USER)}<span class="t" translate="no"><b>${esc(USER.name)}</b><span>${esc(USER.email)}</span></span><button type="button" class="btn sm ghost" data-a="logout">${ico('logout')}Chiqish</button></div>`:''}${PAGES.filter(p=>!['dash','tx','an'].includes(p[0])).map(([k,i,n])=>`<button type="button" class="row click" data-a="nav" data-p="${k}" style="text-align:left;width:calc(100% + 16px)">${tI(i,'#2B44B8',1)}<span class="t"><b>${n}</b></span>${k==='rem'&&overdue()?`<span class="tag neg">${overdue()} ta muddati o'tgan</span>`:''}${ico('right')}</button>`).join('')}</div>`,' ',()=>{})}

/* ---------- hodisalar ---------- */
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el)return;const a=el.dataset.a,k=el.dataset.k,id=+el.dataset.id;
 if(a==='lang'){setLang(el.dataset.l);return}
 if(a==='nav')go(el.dataset.p);
 else if(a==='close')closeSheet();
 else if(a==='more')moreMenu();
 else if(a==='add')openTx({},flt.t==='income'?'income':'expense');
 else if(a==='debt')openDebt();
 else if(a==='remadd')openRem({date:cal.sel||todayS()});
 else if(a==='goal')openGoal();
 else if(a==='del')del(k,id);
 else if(a==='edit'){const it=db[KCOLL[k]].find(x=>x.id===id);if(!it)return;k==='tx'?openTx(it):k==='debts'?openDebt(it):k==='rem'?openRem(it):openGoal(it)}
 else if(a==='toggle'){const it=db[KCOLL[k]].find(x=>x.id===id);if(it){if(k==='debts'){it.status=it.status==='paid'?'pending':'paid';toast(it.status==='paid'?L('{0} bilan qarz yopildi',it.person):L('Qarz qayta ochildi'))}else{const was=it.done;doneRem(it);if(!was&&it.done)toast('Bajarildi')}Store.save();route()}}
 else if(a==='sseg'){const f=$('#sf'),n=el.dataset.n,v=el.dataset.v;f.elements[n].value=v;el.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===el));if(n==='type'){$('#cats').outerHTML=CATS(v,CAT[v][0])}}
 else if(a==='qadd'){const i=$('#sf').querySelector('[data-money]');const v=+el.dataset.v;i.value=v?nf(money(i.value)+v):'';i.focus()}
 else if(a==='ft'){flt.t=el.dataset.v;flt.c='';route()}
 else if(a==='fclr'){flt={...flt,q:'',m:'',c:''};route()}
 else if(a==='chip'){if(page==='dash')cap=true;send(el.dataset.t)}
 else if(a==='mic')mic();
 else if(a==='notif')Notification.requestPermission().then(()=>{route();checkRem()});
 else if(a==='cday'){cal.sel=cal.sel===el.dataset.d?null:el.dataset.d;route()}
 else if(a==='cprev'||a==='cnext'){cal.m+=a==='cnext'?1:-1;if(cal.m>11){cal.m=0;cal.y++}if(cal.m<0){cal.m=11;cal.y--}route()}
 else if(a==='anp'||a==='ann'){anS.m+=a==='ann'?1:-1;if(anS.m>11){anS.m=0;anS.y++}if(anS.m<0){anS.m=11;anS.y--}route()}
 else if(a==='cadd'){const g=db.goals.find(x=>x.id===id);g&&openContrib(g)}
 else if(a==='undoc'){const g=db.goals.find(x=>x.id===id);if(g&&g.contribs.length){const c=g.contribs.pop();Store.save();route();toast(`${fmt(c.amount)} qaytarildi`,{l:'Bekor qilish',f:()=>{g.contribs.push(c);Store.save();route()}})}}
 else if(a==='budset')openBud(el.dataset.c);
 else if(a==='exp')exportJSON();
 else if(a==='csv')exportCSV();
 else if(a==='imp')$('#imp').click();
 else if(a==='demo')askDemo();
 else if(a==='undemo')askConfirm("Avvalgi holatga qaytilsinmi?","Namuna ma'lumot o'chiriladi va namunadan oldingi ma'lumotlaringiz qaytariladi.",'Qaytarish',()=>{const s=localStorage.getItem(KEY+'-before-demo');let o=null;try{o=JSON.parse(s)}catch{}if(o){db=Store.norm(o);Store.save();localStorage.removeItem(KEY+'-before-demo');closeSheet();route();toast('Avvalgi ma\'lumotlar qaytarildi')}});
 else if(a==='wipe')askConfirm("Barcha ma'lumotlar o'chirilsinmi?","Barcha yozuvlar, qarzlar, eslatmalar va maqsadlar shu qurilmadan o'chiriladi.","Ha, o'chirish",()=>{try{localStorage.setItem(KEY+'-before-wipe',JSON.stringify(db))}catch{}db=Store.norm(null);Store.save();closeSheet();go('dash');toast("Ma'lumotlar o'chirildi")});
 else if(a==='install'&&installEvt){installEvt.prompt();installEvt.userChoice.finally(()=>{installEvt=null;route()})}
 else if(a==='ok'){const d=draft,s=commit(d);chat.push({r:'a',t:s?okMsg(d):"Bu yozuv hozirgina saqlangan, takrorlanmadi."});draft=null;route()}
 else if(a==='no'){draft=null;chat.push({r:'a',t:"Bekor qilindi, hech narsa saqlanmadi."});route()}
 else if(a==='editd'){const d=draft,done=()=>{d.saved=true;draft=null;chat.push({r:'a',t:"Tahrirlangan yozuv saqlandi."});route()};
  if(d.kind==='tx')openTx({type:d.type||'expense',amount:d.amount,category:d.category,date:d.date,note:d.note,onSave:o=>{remFor(d,o);done()}});
  else if(d.kind==='debt')openDebt({dir:d.dir||'gave',amount:d.amount,person:d.person||'',date:d.date,due:d.due,note:d.note,onSave:o=>{remFor(d,o);done()}});
  else if(d.kind==='rem')openRem({text:d.text,date:d.date,time:d.time,amount:d.amount,type:d.type,repeat:d.repeat,onSave:done});
  else if(d.kind==='goal')openGoal({name:d.name||'',target:d.amount,deadline:d.deadline||'',onSave:done});
  else{openBud(d.category,d.amount);const old=sheetSubmit;sheetSubmit=v=>{const r=old(v);if(r===undefined)done();return r}}}});
const okMsg=d=>d.kind==='tx'?L('Saqlandi. {0}: {1}, {2}.',L(d.type==='income'?'Kirim':'Chiqim'),fmt(d.amount),L(d.category)):d.kind==='goal'?L('«{0}» maqsadi yaratildi.',d.name):d.kind==='bud'?L('{0} uchun oylik limit: {1}.',L(d.category),fmt(d.amount)):d.kind==='rem'?L('Eslatma saqlandi: {0}.',dlong(d.date)):L('Saqlandi.');
document.addEventListener('keydown',e=>{if(!$('#auth').hidden||!$('#admin').hidden){if(e.key==='Escape')closeSheet();return}if(e.key==='Enter'&&e.target.matches&&e.target.matches('.row.click')){e.target.click();return}
 if(e.key==='Escape'){closeSheet();return}
 if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||e.metaKey||e.ctrlKey||e.altKey||!$('#sheet').hidden)return;
 if(e.key==='n'||e.key==='N'||e.key==='т'){e.preventDefault();openTx()}
 else if(e.key==='/'){e.preventDefault();if(page!=='dash'&&page!=='ai')go('ai');$('#ci')&&$('#ci').focus()}});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target;
 if(f.id==='capf'||f.id==='cf'){const i=$('#ci'),v=i.value;if(!v.trim())return;i.value='';if(f.id==='capf')cap=true;send(v);return}
 if(f.id==='sf'&&sheetSubmit){if(f.dataset.busy)return;const r=sheetSubmit(Object.fromEntries(new FormData(f)));if(typeof r==='string'){toast(r);return}f.dataset.busy=1;closeSheet();if($('#admin').hidden)route()}});
document.addEventListener('input',e=>{const t=e.target;
 if(t.matches('[data-money]')){const p=t.selectionStart,before=t.value.length;t.value=t.value.replace(/[^\d]/g,'')?nf(money(t.value)):'';const d=t.value.length-before;try{t.setSelectionRange(p+d,p+d)}catch{}}
 if(['fq','fm','fc'].includes(t.id)){flt[{fq:'q',fm:'m',fc:'c'}[t.id]]=t.value;$('#lr').innerHTML=txBody()}});
$('#sheet').addEventListener('mousedown',e=>{if(e.target.id==='sheet')closeSheet()});
$('#imp').onchange=e=>{const f=e.target.files[0];if(f)importJSON(f);e.target.value=''};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;if(page==='set')route()});
window.addEventListener('appinstalled',()=>{installEvt=null;toast("Ilova o'rnatildi")});
window.addEventListener('online',route);window.addEventListener('offline',route);
if('serviceWorker'in navigator&&(location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1'))navigator.serviceWorker.register('sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{swOk=true;if(page==='set')route()}).catch(()=>{});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)checkRem()});
{const p=new URLSearchParams(location.search).get('p'),map={income:'tx',expense:'tx'};const q=map[p]||p;if(q&&PAGES.some(x=>x[0]===q))page=q;if(p==='income'||p==='expense')flt.t=p}
chat[0]={r:'a',t:L("Assalomu alaykum! Oddiy gap bilan yozing, men tushunib, saqlashdan oldin tasdiq so'rayman.\n\nMasalan:\n«Bozorga 150 ming sarfladim»\n«Aziz 200 ming qarz berdim, 10-dekabrda eslat»\n«Telefon uchun 5 mln jamg'armoqchiman»\n«Balansim qancha?»")};
/* ishga tushirish: authui.js */
