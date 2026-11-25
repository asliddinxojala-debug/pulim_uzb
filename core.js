/* Pulim 6.0 — core: ma'lumotlar, parser, hisob-kitoblar. Hisoblar: auth.js, interfeys: app.js */
const $=s=>document.querySelector(s),pad=n=>String(n).padStart(2,'0');
const iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; // mahalliy sana (UTC emas)
const todayS=()=>iso(new Date()),addD=n=>{const d=new Date();d.setDate(d.getDate()+n);return iso(d)};
const fmt=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+" so'm";
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now()*1000+Math.floor(Math.random()*1000);
const MON=MSHORT[LANG],MFULL=MONTHS[LANG];
const lab=d=>d===todayS()?L('Bugun'):d===addD(-1)?L('Kecha'):d===addD(1)?L('Ertaga'):dateText(+d.slice(0,4),+d.slice(5,7)-1,+d.slice(8));
const CAT={income:['Maosh','Freelance','Sovg\'a','Boshqa'],expense:['Oziq-ovqat','Transport','Uy-joy','Aloqa','Ta\'lim','Salomatlik','Kiyim','Ko\'ngilochar','Boshqa']};
const COL=['#7c5cff','#3b9cff','#2ee6a6','#ffc857','#ff6b81','#c084fc','#22d3ee','#fb923c','#a3e635'];

/* ---- Store ---- */
const KEY=window.AUTH_KEY||'hisobchi-v2',okD=d=>/^\d{4}-\d\d-\d\d$/.test(d||'');
const Store={
 load(){let d=null;try{d=JSON.parse(localStorage.getItem(KEY))}catch{}
  [2,3,4].forEach(v=>{if(d&&d.v===v&&!localStorage.getItem(KEY+'-v'+v+'-backup'))try{localStorage.setItem(KEY+'-v'+v+'-backup',JSON.stringify(d))}catch{}});
  return this.norm(d,true)},
 norm(d,legacy){const a=x=>Array.isArray(x)?x:[];
  if(!d||typeof d!=='object'||![2,3,4,5].includes(d.v)){d={v:2,tx:[],debts:[],rem:[]};if(legacy&&KEY==='hisobchi-v2')try{a(JSON.parse(localStorage.getItem('hisobchi-transactions'))).forEach(x=>d.tx.push({id:x.id||uid(),type:x.type,amount:x.amount,date:x.date,category:x.category||'Boshqa',note:x.name||'',createdAt:x.id||Date.now()}))}catch{}}
  const tx=a(d.tx).filter(x=>+x.amount>0&&okD(x.date)&&CAT[x.type]).map(x=>({...x,amount:+x.amount})),debts=a(d.debts).filter(x=>+x.amount>0&&okD(x.date)).map(x=>({...x,amount:+x.amount})),rem=a(d.rem).filter(x=>x.text&&okD(x.date)).map(x=>({type:'task',repeat:'once',time:'',amount:0,note:'',dom:+x.date.slice(8),...x,amount:+x.amount||0,nk:x.nk!==undefined?x.nk:(x.notified?x.date:'')}));
  if(legacy&&tx.length+debts.length+rem.length<a(d.tx).length+a(d.debts).length+a(d.rem).length)try{localStorage.setItem(KEY+'-backup',JSON.stringify(d))}catch{}
  const goals=a(d.goals).filter(g=>g&&g.name&&+g.target>0).map(g=>({start:0,deadline:'',note:'',...g,target:+g.target,start:+g.start||0,contribs:a(g.contribs).filter(c=>+c.amount>0&&okD(c.date)).map(c=>({...c,amount:+c.amount}))}));
  const budgets={};if(d.budgets&&typeof d.budgets==='object')Object.entries(d.budgets).forEach(([k,v])=>{if(CAT.expense.includes(k)&&+v>0)budgets[k]=Math.round(+v)});
  return{v:5,tx,debts,rem,goals,budgets}},
 save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch{toast("Saqlab bo'lmadi: brauzer xotirasi to'la yoki o'chirilgan.")}}};
let db=Store.load(),page='dash',draft=null;
let chat=[{r:'a',t:"Assalomu alaykum! Men Pulim. Oddiy tilda yozing, masalan:\n• «Bozorga 150 ming sarfladim»\n• «Bugun do'stimga 200 ming qarz berdim. 10-dekabr kuni eslat»\n• «Telefon uchun 5 mln jamg'armoqchiman, 1-iyungacha»\n• «Oziq-ovqatga oyiga 2 mln limit qo'y»\nSavol ham bering: «Balansim qancha?», «Byudjetim qanday?», «Maqsadlarim qanday?»\nSaqlashdan oldin har doim tasdig'ingizni so'rayman."}];

/* ---- Parser: keyinchalik haqiqiy AI bilan almashtiring ----
   Shartnoma: Parser.understand(text, draft) -> Promise<{draft|null, ask?:string, reply?:string}>
   draft: {kind:'tx'|'debt'|'rem', ...maydonlar, missing:[...]}. */
const Q={amount:"Qancha summa? (masalan: 200 ming)",type:"Bu daromadmi yoki xarajatmi?",dir:"Qarzni siz berdingizmi yoki oldingizmi?",person:"Kim bilan bo'lgan qarz? Ismini yozing.",date:"Qaysi sanaga eslatay? (masalan: 10-dekabr yoki ertaga)",name:"Maqsad nomi nima? (masalan: Telefon sotib olish)",cat:"Qaysi kategoriya uchun limit? ({0})"};
const qText=k=>L(Q[k],CAT.expense.map(c=>L(c)).join(', '));
/* uch tildagi kalit so'zlar (kirill harflari oldida \b ishlatilmaydi) */
const KW={
 cancel:/\bbekor\b|отмен|\bcancel/,
 q:/\?|\bqancha\b|\bqaysi\b|\bnima\b|\bkimga\b|\bkimdan\b|сколько|какой|какая|какие|кому|у кого|\bhow (much|many)\b|\bwhat\b|\bwhich\b|\bwho\b/,
 remind:/eslat|напомн|\bremind/,
 debt:/qarz|долг|займ|одолж|\bdebt|\bloan|\blent\b|\blend|\bborrow|\bowe/,
 gave:/berdim|bergan|дал |дала|одолжил|\blent\b|\bgave\b|\bloaned\b/,
 took:/oldim|olgan|взял|заняла?|\bborrowed\b|\btook\b|\bi owe\b/,
 budget:/\blimit|byudjet|budjet|лимит|бюджет|\bbudget/,
 goal:/maqsad|jamg'ar|yig'moqchi|to'plamoqchi|yig'ib|коплю|накоп|копить|\bsave up|\bsaving\b|\bsave for|\bgoal\b|\bwant to save/,
 exp:/sarfla|ishlat|to'ladim|sotib|xarajat|chiqim|ketdi|xarid|потрат|заплатил|оплатил|купил|расход|\bspent\b|\bspend\b|\bpaid\b|\bbought\b|\bexpense|\bpay\b/,
 inc:/daromad|maosh|oylik|topdim|tushdi|kirim|oldim|oldi\b|foyda|получил|зарплат|доход|заработ|\bearned\b|\bsalary\b|\breceived\b|\bincome\b|\bgot paid\b/,
 done:/berdim|oldim|sarfladim|ishlatdim|to'ladim|topdim|tushdi|ketdi|потратил|заплатил|оплатил|купил|получил|дал |взял|\bspent\b|\bpaid\b|\bbought\b|\bgot\b|\blent\b|\bborrowed\b/,
 today:/bugun|сегодня|\btoday/};
const MST=[['yanvar','январ','jan'],['fevral','феврал','feb'],['mart','март','mar'],['aprel','апрел','apr'],['may','ма[йя]'],['iyun','июн','jun'],['iyul','июл','jul'],['avgust','август','aug'],['sentabr','сентябр','sep'],['oktabr','октябр','oct'],['noyabr','ноябр','nov'],['dekabr','декабр','dec']];
const MWORD='(?:'+MST.map(a=>a.join('|')).join('|')+')[a-zа-я]*',monthIdx=w=>MST.findIndex(a=>new RegExp('^(?:'+a.join('|')+')').test(w));
const CATRE={'Oziq-ovqat':/non|bozor|ovqat|go'sht|market|meva|restoran|продукт|еда|еду|рын|базар|магазин|хлеб|мяс|ресторан|кафе|обед|ужин|food|grocer|bread|restaurant|cafe|lunch|dinner|supermarket/,Transport:/taksi|benzin|avtobus|metro|yo'l|mashina|такси|бензин|автобус|метро|проезд|машин|taxi|fuel|petrol|\bbus\b|subway|uber|yandex go/,'Uy-joy':/ijara|kommunal|gaz|svet|elektr|suv|аренд|коммунал|газ|свет|электр|вод|квартплат|\brent\b|utilit|electric|water bill/,Aloqa:/internet|telefon|aloqa|интернет|телефон|связ|\bphone\b|mobile/,"Ta'lim":/kurs|kitob|o'qish|maktab|курс|книг|учеб|школ|репетитор|course|book|school|tuition|tutor/,Salomatlik:/dori|shifokor|dorixona|klinika|лекарств|врач|аптек|клиник|medicine|doctor|pharmacy|clinic|dentist/,Kiyim:/kiyim|ko'ylak|poyabzal|одежд|обув|рубаш|куртк|clothes|shoes|shirt|jacket/,"Ko'ngilochar":/kino|o'yin|konsert|dam olish|кино|игр|концерт|отдых|movie|cinema|game|concert/};
const Parser={
 norm:s=>s.toLowerCase().replace(/[‘’`ʻʼ]/g,"'").replace(/ё/g,'е'),
 async understand(raw,d){const t=this.norm(raw);
  if(KW.cancel.test(t))return{draft:null,reply:L("Bekor qilindi.")};
  if(!(d&&d.missing.length)&&this.isQ(t))return{draft:d,answer:Answer.reply(t)};
  if(d&&d.missing.length)this.fill(d,t,raw);else{d=this.parse(t,raw);
   if(!d)return{draft:null,reply:L("Tushunmadim. Summa va nima haqida ekanini yozing, masalan: «Bozorga 150 ming sarfladim» yoki «Ertaga elektr to'lovini eslat».")}}
  d.missing=this.check(d);return{draft:d,ask:d.missing.length?qText(d.missing[0]):null}},
 dates(t){let target=null,op=todayS();const fix=(mi,dd)=>{const n=new Date();let d=new Date(n.getFullYear(),mi,+dd);if(d.getMonth()!==mi)return null;if(iso(d)<todayS())d=new Date(n.getFullYear()+1,mi,+dd);return iso(d)};
  let rest=t.replace(/\b(\d{4})-(\d\d)-(\d\d)\b/,(m,y,mo,dd)=>{const x=new Date(+y,+mo-1,+dd);if(x.getMonth()===+mo-1&&x.getDate()===+dd){if(KW.remind.test(t)||/qaytar|muddat|срок|вернуть|due/.test(t))target=m;else op=m}return' '});
  rest=rest.replace(new RegExp(`(\\d{1,2})(?:-?(?:го|th|st|nd|rd))?[-\\s]*(${MWORD})`),(m,dd,mo)=>{const x=fix(monthIdx(mo),dd);if(x)target=x;return' '});
  if(!target)rest=rest.replace(new RegExp(`(${MWORD})\\s+(\\d{1,2})(?:st|nd|rd|th)?(?!\\d)`),(m,mo,dd)=>{const x=fix(monthIdx(mo),dd);if(x)target=x;return' '});
  if(/kecha|вчера|\byesterday/.test(t))op=addD(-1);
  if(!target){if(/indinga|послезавтра|day after tomorrow/.test(t))target=addD(2);else if(/ertaga|завтра|\btomorrow/.test(t))target=addD(1)}
  let time='',repeat='once',dom=0;
  rest=rest.replace(/(?:soat|в|at)?\s*\b(\d{1,2}):(\d{2})\b/,(m,h,mi)=>{if(+h<24&&+mi<60)time=pad(+h)+':'+mi;return' '});
  if(!time)rest=rest.replace(/soat\s*(\d{1,2})(?![\d:])|в\s*(\d{1,2})\s*час|\bat\s*(\d{1,2})\s*(am|pm)?(?![\d:])/,(m,a,b,c,ap)=>{let h=+(a||b||c);if(ap==='pm'&&h<12)h+=12;if(h<24)time=pad(h)+':00';return' '});
  rest=rest.replace(/(har\s*oy\w*|кажд[а-я]*\s*месяц[а-я]*|ежемесячн[а-я]*|every\s*month|monthly)(?:\D{0,15}?(\d{1,2})(?!\d)(?!\s*(?:ming|mln|тыс|млн|k|к|thousand|million)))?/,(m,w,d)=>{repeat='monthly';if(d&&+d<=31)dom=+d;return' '});
  if(/har\s*kun|кажд[а-я]*\s*день|ежедневн|every\s*day|\bdaily/.test(t))repeat='daily';if(/har\s*hafta|кажд[а-я]*\s*недел|еженедельн|every\s*week|\bweekly/.test(t))repeat='weekly';
  if(repeat==='monthly'&&dom&&!target){const n=new Date(),dm=(y,mo)=>Math.min(dom,new Date(y,mo+1,0).getDate());let c=new Date(n.getFullYear(),n.getMonth(),dm(n.getFullYear(),n.getMonth()));if(iso(c)<todayS())c=new Date(n.getFullYear(),n.getMonth()+1,dm(n.getFullYear(),n.getMonth()+1));target=iso(c)}
  return{op,target,rest,time,repeat,dom}},
 isQ(t){return KW.q.test(t)&&!this.amount(this.dates(t).rest)},
 amount(s){const m=s.match(/(\d+(?:[.,]\d+)?(?:\s\d{3})*)\s*(mln|million|млн|миллион[а-я]*|m(?![a-zа-я])|ming|тыс[а-я]*|thousand|k(?![a-zа-я])|к(?![а-я]))?/);if(!m)return null;
  const u=m[2]||'',n=parseFloat(m[1].replace(/\s/g,'').replace(',','.')),k=/^(ming|тыс|thousand|k|к)/.test(u)?1e3:u?1e6:1,v=Math.round(n*k);return v>0?v:null},
 type(t){return KW.exp.test(t)?'expense':KW.inc.test(t)?'income':null},
 cat(t,type){const M=type==='income'?{Maosh:/maosh|oylik|зарплат|salary|paycheck/,Freelance:/freelance|loyiha|buyurtma|фриланс|проект|заказ|project|client/}:CATRE;
  if(type==='expense'){const n=this.catName(t);if(n&&n!=='Boshqa')return n}
  for(const[k,re]of Object.entries(M))if(re.test(t))return k;return'Boshqa'},
 catName(t){for(const k of CAT.expense){const names=[k,DICT.ru[k],DICT.en[k]].filter(Boolean).map(x=>x.toLowerCase().replace(/[-\s]/g,'[-\\s]?'));if(names.some(x=>new RegExp(x).test(t)))return k}return null},
 budCat(t){const n=this.catName(t);if(n)return n;const c=this.cat(t,'expense');return c==='Boshqa'?null:c},
 goalName(raw){const n=this.norm(raw),m=n.match(/^(?:maqsad\s*:?\s*)?(.+?)\s+uchun\b/)||n.match(/\bfor\s+(?:a\s+|an\s+|the\s+|my\s+)?([^,.\d]+)/)||n.match(/(?:^|\s)на\s+([^,.\d]+)/);let s=m?m[1]:n.replace(/maqsad\w*\s*:?|цель\s*:?|\bgoal\s*:?/,' ');
  s=s.replace(new RegExp(`\\d{1,2}[-\\s]*${MWORD}|${MWORD}\\s*\\d{0,2}`,'g'),' ').replace(/\d+(?:[.,]\d+)?/g,' ').replace(/(^|\s)(mln|million|ming|so'm|som|k|m|jamg'\S*|yig'\S*|to'pla\S*|\S*gacha|oyiga|qo'y\S*|qil\S*|menda|bor|kerak|ertaga|bugun|млн|миллион\S*|тыс\S*|сум|копл\S*|накоп\S*|хочу|до|к|i|i'm|want|to|save|saving|by|until|up|thousand|new)(?=\s|$|[,.!])/g,' ').replace(/[,.!:;?]+/g,' ').replace(/\s+/g,' ').trim();
  return s.length>=2?s.charAt(0).toUpperCase()+s.slice(1,60):null},
 person(t,raw){let n=raw.match(/([A-ZА-ЯЁ][a-zа-яё']+)(?:ga|dan)\b/)||raw.match(/\b(?:to|from)\s+([A-Z][a-z']+)/)||raw.match(/(?:у|от|для)\s+([А-ЯЁ][а-яё]+)/);if(n)return n[1];
  n=raw.match(/\s([A-ZА-ЯЁ][a-zа-яё']+)/);if(n&&!monthIdxSafe(n[1]))return n[1];
  const r=t.match(/(do'st|aka|uka|opa|singil|ota|dada|ona|qo'shni|hamkasb|друг|брат|сестр|отц|отец|мам|сосед|коллег|friend|brother|sister|dad|mom|neighbo|colleague)[a-zа-я']*/);return r?(r[0].replace(/(ga|dan)$/,'')).replace(/^./,c=>c.toUpperCase()):null},
 remDraft(t,raw,D,amount){const T=KW.debt.test(t)?(/olgan|olaman|olish|взял|занял|borrow/.test(t)?'debttake':'debtback'):/kommunal|gaz|svet|elektr|suv\b|коммунал|газ|свет|электр|вод|utilit|electric|water/.test(t)?'utility':/internet|telefon|aloqa|интернет|телефон|связ|\bphone\b/.test(t)?'telecom':/obuna|подписк|subscription|netflix|spotify|youtube/.test(t)?'sub':/rejalashtir|xarid|план|покупк|\bplan|purchase/.test(t)?'planned':'task';
  return{kind:'rem',text:raw.trim().replace(/[.!\s]+$/,''),amount:amount||0,date:D.target||(KW.today.test(t)?todayS():null),time:D.time,repeat:D.repeat,dom:D.dom,type:T,note:''}},
 parse(t,raw){const D=this.dates(t),amount=this.amount(D.rest),rm=KW.remind.test(t),remind=rm?D.target:null,note=raw.trim();
  if(!rm&&KW.budget.test(t))return{kind:'bud',amount,category:this.budCat(t)};
  if(!rm&&!KW.debt.test(t)&&KW.goal.test(t))return{kind:'goal',amount,name:this.goalName(raw),deadline:D.target||'',note:''};
  if(rm&&!KW.done.test(t))return this.remDraft(t,raw,D,amount);
  if(KW.debt.test(t))return{kind:'debt',dir:KW.gave.test(t+' ')?'gave':KW.took.test(t)?'took':null,person:this.person(t,raw),amount,date:D.op,due:D.target||'',note,remind};
  if(!amount&&rm)return this.remDraft(t,raw,D,amount);
  if(!amount)return null;let type=this.type(t);if(!type&&this.cat(t,'expense')!=='Boshqa')type='expense';if(!type&&this.cat(t,'income')!=='Boshqa')type='income';
  return{kind:'tx',type,amount,date:D.op,category:this.cat(t,type),note,remind}},
 fill(d,t,raw){const k=d.missing[0],D=this.dates(t);
  if(k==='amount')d.amount=this.amount(D.rest);
  if(k==='type'){d.type=/daromad|kirim|доход|приход|income/.test(t)?'income':/xarajat|chiqim|расход|expense/.test(t)?'expense':null;if(d.type)d.category=this.cat(this.norm(d.note),d.type)}
  if(k==='dir')d.dir=KW.gave.test(t+' ')?'gave':KW.took.test(t)?'took':null;
  if(k==='person')d.person=raw.trim().slice(0,40)||null;
  if(k==='name')d.name=raw.trim().replace(/[.!]+$/,'').slice(0,60)||null;
  if(k==='cat')d.category=this.budCat(t);
  if(k==='date'){const x=D.target||(KW.today.test(t)?todayS():null);if(x){d.date=x;d.remind=x;if(D.time)d.time=D.time}}},
 check(d){const m=[];
  if(d.kind==='tx'){if(!d.amount)m.push('amount');if(!d.type)m.push('type')}
  if(d.kind==='debt'){if(!d.amount)m.push('amount');if(!d.dir)m.push('dir');if(!d.person)m.push('person')}
  if(d.kind==='rem'&&!d.date)m.push('date');
  if(d.kind==='goal'){if(!d.amount)m.push('amount');if(!d.name)m.push('name')}
  if(d.kind==='bud'){if(d.category&&d.old===undefined)d.old=db.budgets[d.category]||0;if(!d.category)m.push('cat');if(!d.amount)m.push('amount')}return m}};
const monthIdxSafe=w=>monthIdx(w.toLowerCase())>=0||/^(bugun|kecha|ertaga|сегодня|вчера|завтра|today|yesterday|tomorrow|i)$/i.test(w);

/* ---- Moliyaviy savollarga javob: faqat saqlangan ma'lumotdan hisoblanadi ---- */
const Answer={get NO(){return L("Bu haqida hali ma'lumot yo'q.")},
 reply(t){const mk=todayS().slice(0,7),M=x=>x.date.startsWith(mk),ex=db.tx.filter(x=>x.type==='expense'),inc=sum(db.tx,x=>x.type==='income'),exp=sum(ex),open=db.debts.filter(d=>d.status==='pending');
  const by=(a,f)=>{const o={};a.forEach(x=>o[f(x)]=(o[f(x)]||0)+x.amount);return Object.entries(o).sort((a,b)=>b[1]-a[1])};
  const list=a=>by(a,d=>d.person).map(([n,v])=>`• ${n}: ${fmt(v)}`).join('\n'),g=open.filter(d=>d.dir==='gave'),k=open.filter(d=>d.dir==='took');
  if(/balans|qoldiq|баланс|остат|balance/.test(t))return db.tx.length?L("Balansingiz {0} (daromad {1} − xarajat {2}). Qarzlar hisobga olinmagan.",fmt(inc-exp),fmt(inc),fmt(exp)):this.NO;
  if(/qarz|долг|debt|\bowe|\blent|\blend|borrow/.test(t)){if(!open.length)return L("Kutilayotgan qarz yo'q.");
   if(/kimga|berganman|кому|\blent\b|\blend|owes me|owe me/.test(t))return g.length?L("Siz qarz bergansiz:")+"\n"+list(g):L("Kutilayotgan berilgan qarz yo'q.");
   if(/kimdan|olganman|у кого|borrow|i owe/.test(t))return k.length?L("Siz qarz olgansiz:")+"\n"+list(k):L("Kutilayotgan olingan qarz yo'q.");
   return L("Kutilayotgan qarzlar: sizga qaytarilishi kerak {0}, siz qaytarishingiz kerak {1}.",fmt(sum(g)),fmt(sum(k)))}
  if(/maqsad|цел|goal/.test(t))return db.goals.length?L("Jamg'arma maqsadlari:")+"\n"+db.goals.map(g=>`• ${g.name}: ${fmt(gSaved(g))} / ${fmt(g.target)} (${Math.min(100,Math.round(gSaved(g)/g.target*100))}%)`).join('\n'):L("Jamg'arma maqsadi hali yo'q.");
  if(/tejad|jamg|сэконом|накоп|\bsav/.test(t)){const im=sum(db.tx,x=>x.type==='income'&&M(x)),em=sum(ex,M);return im||em?L("Bu oy: daromad {0}, xarajat {1}, farq {2}.",fmt(im),fmt(em),fmt(im-em))+(im<em?' '+L("Xarajat ko'p."):'')+' '+L("Jami farq: {0}. Bu hisoblangan farq, alohida jamg'arma hisobi emas.",fmt(inc-exp)):this.NO}
  if(/kategor|категор|categor/.test(t)){const c=by(ex,x=>x.category);return c.length?L("Eng ko'p \"{0}\" kategoriyasiga ketgan: {1} ({2}%).",L(c[0][0]),fmt(c[0][1]),Math.round(c[0][1]/exp*100)):this.NO}
  if(/katta|больш|крупн|biggest|largest/.test(t)){const m=ex.slice().sort((a,b)=>b.amount-a.amount)[0];return m?L("Eng katta bitta xarajat: {0} — {1}{2}, {3}.",fmt(m.amount),L(m.category),m.note?' ('+m.note+')':'',lab(m.date)):this.NO}
  if(/kategor|ko'proq|ko'p|категор|больше всего|categor|\bmost\b/.test(t)){const c=by(ex,x=>x.category);return c.length?L("Eng ko'p \"{0}\" kategoriyasiga ketgan: {1} ({2}%).",L(c[0][0]),fmt(c[0][1]),Math.round(c[0][1]/exp*100)):this.NO}
  if(/byudjet|budjet|limit|бюджет|лимит|budget/.test(t)){const b=budStat();return b.length?L("Bu oy byudjet holati:")+"\n"+b.map(x=>`• ${L(x.k)}: ${fmt(x.spent)} / ${fmt(x.lim)} (${x.p}%)${x.p>=100?' — '+L('limitdan oshgan!'):x.p>=80?' — '+L('limitga yaqin'):''}`).join('\n'):L("Byudjet limiti hali qo'yilmagan. Masalan: «Oziq-ovqatga oyiga 2 mln limit qo'y».")}
  if(/daromad|maosh|доход|зарплат|заработ|income|salary|earn/.test(t)){const im=sum(db.tx,x=>x.type==='income'&&M(x));return im?L("Bu oy daromadingiz {0}.",fmt(im)):L("Bu oy hali daromad kiritilmagan.")}
  if(/xarajat|sarfla|ishlat|ketdi|расход|потрат|spend|spent|expense/.test(t))return ex.length?L("Bu oy xarajatingiz {0} ({1} ta yozuv).",fmt(sum(ex,M)),ex.filter(M).length):this.NO;
  return L("Bu savolga javob bera olmayman. So'rang: balans, bu oy xarajat, qarzlar, eng katta xarajat, qaysi kategoriya, tejash, byudjet, maqsadlar.")}};

/* ---- Saqlash amallari ---- */
const COLL={tx:'tx',debt:'debts',rem:'rem'};
function build(kind,f,old={}){const id=old.id||uid(),a=Math.round(+f.amount);
 if(kind==='tx')return{id,type:f.type,amount:a,date:f.date,category:f.category,note:(f.note||'').trim(),createdAt:old.createdAt||Date.now()};
 if(kind==='debt')return{id,dir:f.dir,person:(f.person||'').trim(),amount:a,date:f.date,due:f.due||'',note:(f.note||'').trim(),status:f.status||'pending'};
 return{id,text:(f.text||'').trim(),amount:a||0,date:f.date,time:f.time||'',note:(f.note||'').trim(),type:f.type||'task',repeat:f.repeat||'once',dom:+f.dom||(old.date===f.date&&old.dom)||+f.date.slice(8),done:!!old.done,nk:(old.date===f.date&&(old.time||'')===(f.time||''))?old.nk||'':''}}
function upsert(kind,it){const c=db[COLL[kind]],i=c.findIndex(x=>x.id===it.id);i>=0?c[i]=it:c.push(it)}
function remFor(d,it){if(!d.remind||d.kind==='rem')return;
 const txt=d.kind==='debt'?(it.dir==='gave'?L("{0}dan {1} qarzni qaytarishni so'rang",it.person,fmt(it.amount)):L('{0}ga {1} qarzni qaytaring',it.person,fmt(it.amount))):(it.note||L('Eslatma'));
 db.rem.push(build('rem',{text:txt,date:d.remind,amount:it.amount,type:d.kind==='debt'?(it.dir==='gave'?'debtback':'debttake'):'planned'}))}
function commit(d){if(d.saved)return false;
 if(d.kind==='goal'){d.saved=true;db.goals.push({id:uid(),name:d.name,target:Math.round(d.amount),start:0,deadline:d.deadline||'',note:'',contribs:[],createdAt:Date.now()});Store.save();return true}
 if(d.kind==='bud'){d.saved=true;db.budgets[d.category]=Math.round(d.amount);Store.save();return true}
 const it=build(d.kind,d),sig=x=>[x.type,x.dir,x.person,x.amount,x.date,x.category,x.text].join('|');
 if(db[COLL[d.kind]].some(x=>sig(x)===sig(it)&&Date.now()-(x.createdAt||x.id/1000)<60000))return false;
 d.saved=true;upsert(d.kind,it);remFor(d,it);Store.save();return true}
const sum=(a,f=()=>true)=>a.filter(f).reduce((s,x)=>s+x.amount,0);
const RT={debtback:'Qarz qaytarish',debttake:'Qarz olish',utility:"Kommunal to'lov",telecom:'Internet / telefon',sub:'Oylik obuna',planned:'Rejalashtirilgan xarajat',task:'Shaxsiy vazifa'},RP={once:'Bir marta',daily:'Har kuni',weekly:'Har hafta',monthly:'Har oy'};
const nowT=()=>{const n=new Date();return pad(n.getHours())+':'+pad(n.getMinutes())},dn=d=>Math.round((new Date(d+'T00:00:00')-new Date(todayS()+'T00:00:00'))/864e5);
const isOver=r=>!r.done&&(r.date<todayS()||(r.date===todayS()&&r.time&&r.time<nowT()));
const sect=r=>r.done?'done':isOver(r)?'over':r.date===todayS()?'today':r.date===addD(1)?'tom':'up';
const rel=n=>n<0?L('{0} kun oldin',-n):n===0?L('Bugun'):n===1?L('Ertaga'):L('{0} kundan keyin',n);
function nextDate(r){const[y,m,d]=r.date.split('-').map(Number);if(r.repeat==='daily'||r.repeat==='weekly')return iso(new Date(y,m-1,d+(r.repeat==='daily'?1:7)));
 const l=new Date(y,m+1,0).getDate(),dom=r.dom||d;return iso(new Date(y,m,Math.min(dom,new Date(y,m+1,0).getDate())))}
function doneRem(r){if(r.done){r.done=false;return}if(r.repeat==='once'){r.done=true;return}
 let g=0;do{r.date=nextDate(r)}while(r.date<=todayS()&&++g<500);r.nk='';toast(L("Bajarildi. Keyingi eslatma: {0}",lab(r.date)))}
function analyze(){const L=[],P=db.rem.filter(r=>!r.done),ov=P.filter(isOver),td=P.filter(r=>sect(r)==='today');
 if(ov.length)L.push(`Muddati o'tgan ${ov.length} ta majburiyat bor: ${ov.slice(0,2).map(r=>r.text).join('; ')}`);
 if(td.length)L.push(`Bugun bajarilmagan ${td.length} ta eslatma mavjud.`);
 P.filter(r=>!isOver(r)&&dn(r.date)>=1&&dn(r.date)<=7).sort((x,y)=>x.date.localeCompare(y.date)).slice(0,4).forEach(r=>L.push(`${rel(dn(r.date))}: ${r.text}${r.amount?' — '+fmt(r.amount):''}`));
 db.debts.filter(d=>d.status==='pending'&&d.due&&dn(d.due)<=7&&!db.rem.some(r=>!r.done&&r.date===d.due&&r.text.includes(d.person))).slice(0,3).forEach(d=>L.push(`${rel(dn(d.due))}: ${d.dir==='gave'?'qarz qaytarilishi kerak':'qarzni qaytarish kerak'} — ${d.person}, ${fmt(d.amount)}`));
 return L.length?L:[db.rem.length?"Yaqin 7 kunda majburiyat yo'q.":"Hali eslatma kiritilmagan."]}
const mk=(y,m)=>{const d=new Date(y,m,1);return`${d.getFullYear()}-${pad(d.getMonth()+1)}`};
const gSaved=g=>g.start+g.contribs.reduce((s,c)=>s+c.amount,0);
/* ---- Byudjet: kategoriya bo'yicha oylik limit ---- */
function budStat(k=todayS().slice(0,7)){return Object.entries(db.budgets).map(([c,lim])=>{const spent=sum(db.tx,x=>x.type==='expense'&&x.category===c&&x.date.startsWith(k));return{k:c,lim,spent,p:Math.round(spent/lim*100)}}).sort((a,b)=>b.p-a.p)}
const bcls=p=>p>=100?'po':p>=80?'pw':'';
function mstat(k){const t=db.tx.filter(x=>x.date.startsWith(k)),ex=t.filter(x=>x.type==='expense'),inc=sum(t,x=>x.type==='income'),exp=sum(ex),cats={};ex.forEach(x=>cats[x.category]=(cats[x.category]||0)+x.amount);
 const sv=db.goals.reduce((s,g)=>s+g.contribs.filter(c=>c.date.startsWith(k)).reduce((a,c)=>a+c.amount,0),0);
 return{k,n:t.length,ne:ex.length,inc,exp,net:inc-exp,cats,sv,top:Object.entries(cats).sort((a,b)=>b[1]-a[1])[0],big:ex.slice().sort((a,b)=>b.amount-a.amount)[0]}}
function forecast(){const n=new Date(),ms=[];for(let i=1;i<=3;i++){const s=mstat(mk(n.getFullYear(),n.getMonth()-i));if(s.n)ms.push(s)}
 if(ms.length<2)return null;const r=f=>[Math.min(...ms.map(f)),Math.max(...ms.map(f))];return{n:ms.length,inc:r(s=>s.inc),exp:r(s=>s.exp),net:r(s=>s.net),avgNet:Math.round(ms.reduce((a,s)=>a+s.net,0)/ms.length)}}
function recsFor(c,p){if(c.ne<3)return[L('Tavsiya uchun kamida 3 ta xarajat kerak. Bu oy {0} ta kiritilgan.',c.ne)];const r=[];
 Object.entries(db.budgets).forEach(([k,lim])=>{const v=c.cats[k]||0;if(v>lim)r.push(L('"{0}" uchun oylik limit ({1}) {2} ga oshib ketgan.',L(k),fmt(lim),fmt(v-lim)));else if(v>=lim*.8)r.push(L('"{0}" limitining {1}% i ishlatilgan — qolgan {2}.',L(k),Math.round(v/lim*100),fmt(lim-v)))});
 if(p.n)Object.entries(c.cats).filter(([k,v])=>p.cats[k]>0&&v>=p.cats[k]*1.2&&v-p.cats[k]>=c.exp*.05).sort((a,b)=>b[1]-a[1]).slice(0,2).forEach(([k,v])=>r.push(L("Bu oy \"{0}\" xarajatlaringiz oshgan: {1} (o'tgan oy {2}).",L(k),fmt(v),fmt(p.cats[k]))));
 const sh=Math.round(c.top[1]/c.exp*100);if(sh>=40)r.push(L('"{0}" xarajatlaringiz umumiy xarajatning katta qismini ({1}%) tashkil qilmoqda.',L(c.top[0]),sh));
 r.push(c.net>0?L("Daromadingizdan {0} ortgan. Uning bir qismini (masalan, 10% — {1}) jamg'arishga ajratishingiz mumkin.",fmt(c.net),fmt(Math.round(c.net/10))):c.net<0?L("Bu oy xarajat daromaddan {0} ga ko'p. Kategoriyalarni ko'rib chiqish foydali bo'lishi mumkin.",fmt(-c.net)):L("Bu oy xarajat daromadga teng. Kategoriyalarni ko'rib chiqish foydali bo'lishi mumkin."));
 r.push(L('Keyingi oy xarajatlarini rejalashtirish foydali: bu oygi xarajat {0} edi.',fmt(c.exp)));return r}
function plan(g){const s=gSaved(g),rem=g.target-s,f=forecast();if(rem<=0)return L("Maqsadga erishildingiz. Tabriklaymiz!");
 if(g.deadline){const d=dn(g.deadline);if(d<0)return L("Muddat {0} kun oldin o'tgan. Qolgan: {1}. Muddatni yangilashingiz mumkin.",-d,fmt(rem));
  const mo=Math.max(1,Math.ceil(d/30.4375)),per=Math.ceil(rem/mo);return L("Qolgan {0}, muddatgacha taxminan {1} oy. Oyiga taxminan {2} ajratish kerak.",fmt(rem),mo,fmt(per))+(f&&f.avgNet>0?' '+L("O'rtacha oylik sof farqingiz {0}.",fmt(f.avgNet))+(per>f.avgNet?' '+L("Reja undan katta: muddat yoki summani moslashtirish mumkin."):''):'')}
 return f&&f.avgNet>0?L("Qolgan {0}. Oyiga o'rtacha {1} ajratsangiz, taxminan {2} oy kerak (taxmin, kafolat emas).",fmt(rem),fmt(f.avgNet),Math.ceil(rem/f.avgNet)):L("Qolgan {0}. Muddat belgilang yoki ma'lumot ko'paygach taxminiy vaqtni hisoblab beraman.",fmt(rem))}
const dlt=(a,b,up,has)=>{if(!has)return'—';const d=a-b;if(!d)return"o'zgarishsiz";const p=b?Math.round(Math.abs(d)/Math.abs(b)*100):null;return`<span class="${(d>0)===up?'income':'du'}">${d>0?'↑':'↓'} ${fmt(Math.abs(d))}${p!==null?` (${p}%)`:''}</span>`};
function recs(){const mk=todayS().slice(0,7),pd=new Date();pd.setDate(1);pd.setMonth(pd.getMonth()-1);const pk=iso(pd).slice(0,7),ex=db.tx.filter(t=>t.type==='expense');
 if(ex.length<3)return[`Tavsiya uchun kamida 3 ta xarajat kerak. Hozir ${ex.length} ta kiritilgan.`];
 const o={};ex.forEach(t=>o[t.category]=(o[t.category]||0)+t.amount);const[tc,tv]=Object.entries(o).sort((a,b)=>b[1]-a[1])[0],r=[`Xarajatlarning ${Math.round(tv/sum(ex)*100)}% i "${tc}" kategoriyasiga ketgan.`],cm=sum(ex,t=>t.date.startsWith(mk)),cp=sum(ex,t=>t.date.startsWith(pk));
 if(cp>0){const p=Math.round((cm-cp)/cp*100);r.push(p>0?`Bu oy hozirgacha xarajat o'tgan oyning to'liq xarajatidan ${p}% ko'p.`:`Bu oy hozirgacha xarajat o'tgan oydagidan ${100-Math.round(cm/cp*100)}% kam.`)}else r.push("O'tgan oy ma'lumoti yo'q, taqqoslab bo'lmaydi.");
 const im=sum(db.tx,t=>t.type==='income'&&t.date.startsWith(mk));if(im>0)r.push(cm<im?`Bu oy daromaddan ${fmt(im-cm)} qolgan. Jamg'arma uchun bir qismini ajratishni o'ylab ko'ring.`:`Bu oy xarajat daromaddan ${fmt(cm-im)} ko'p.`);return r}
/* ---- Zaxira nusxa, CSV, demo ---- */
function dl(name,text,mime){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:mime}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},800)}
function exportJSON(){dl(`pulim-zaxira-${todayS()}.json`,JSON.stringify({app:'Pulim',exported:new Date().toISOString(),...db},null,1),'application/json');try{localStorage.setItem(KEY+'-last-export',todayS())}catch{}route();toast('Zaxira nusxa yuklab olindi.')}
function exportCSV(){const q=v=>{const s=String(v??'');return/[;"\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
 const rows=[['Sana','Turi','Kategoriya',"Summa (so'm)",'Izoh'].map(x=>L(x))].concat(db.tx.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(t=>[t.date,L(t.type==='income'?'Daromad':'Xarajat'),L(t.category),t.type==='income'?t.amount:-t.amount,t.note]));
 if(db.debts.length)rows.push([],[L('Qarzlar')],['Sana','Turi','Kim',"Summa (so'm)",'Muddat','Holati','Izoh'].map(x=>L(x)),...db.debts.map(d=>[d.date,L(d.dir==='gave'?'Berilgan':'Olingan'),d.person,d.amount,d.due,L(d.status==='paid'?'Qaytarildi':'Kutilmoqda'),d.note]));
 dl(`pulim-${todayS()}.csv`,'﻿'+rows.map(r=>r.map(q).join(';')).join('\r\n'),'text/csv;charset=utf-8');toast('CSV yuklab olindi — Excel bilan oching.')}
function importJSON(file){const r=new FileReader();r.onload=()=>{let o;try{o=JSON.parse(r.result)}catch{toast("Fayl o'qilmadi: JSON emas.");return}
 if(!o||typeof o!=='object'||!Array.isArray(o.tx)){toast("Bu Pulim zaxira fayli emas.");return}
 const nd=Store.norm({...o,v:[2,3,4,5].includes(o.v)?o.v:5}),n=nd.tx.length+nd.debts.length+nd.rem.length+nd.goals.length;
 if(!confirm(L("Fayldagi {0} ta yozuv hozirgi ma'lumotlar o'rniga yuklanadi. Davom etasizmi?",n)))return;
 try{localStorage.setItem(KEY+'-before-import',JSON.stringify(db))}catch{}db=nd;Store.save();route();toast(`Tiklandi: ${n} ta yozuv.`)};r.readAsText(file)}
function demoData(){let s=20261124,c=0;const R=()=>(s=(s*16807)%2147483647)/2147483647,pick=a=>a[Math.floor(R()*a.length)],id=()=>Date.now()*1000+(c++),now=new Date(),tx=[];
 const E=[['Oziq-ovqat',[60,420],['Bozor','Korzinka','Non va sut','Restoran','Meva-sabzavot','Go\'sht'],8],['Transport',[15,110],['Taksi','Benzin','Metro'],6],['Uy-joy',[380,850],['Kommunal to\'lovlar'],1],['Aloqa',[70,150],['Internet','Telefon'],2],["Ta'lim",[250,600],['Ingliz tili kursi','Kitob'],1],['Salomatlik',[40,250],['Dorixona','Stomatolog'],1],['Kiyim',[150,650],['Poyabzal',"Ko'ylak",'Kurtka'],1],["Ko'ngilochar",[50,280],['Kino',"Do'stlar bilan kafe",'Bouling'],2]].map(([c,r,n,k])=>[c,r,n.map(x=>L(x)),k]);
 for(let i=5;i>=0;i--){const d0=new Date(now.getFullYear(),now.getMonth()-i,1),y=d0.getFullYear(),m=d0.getMonth(),last=i?new Date(y,m+1,0).getDate():now.getDate();
  const add=(type,cat,amt,d,note)=>tx.push({id:id(),type,category:cat,amount:Math.max(1000,Math.round(amt/1000)*1000),date:iso(new Date(y,m,Math.min(d,last))),note,createdAt:Date.now()+c});
  add('income','Maosh',(6.5+R()*1.2)*1e6,5,L('Oylik maosh'));if(R()>.35)add('income','Freelance',(0.8+R()*1.6)*1e6,2+Math.floor(R()*25),L('Dizayn loyihasi'));
  E.forEach(([cat,[a,b],notes,n])=>{const k=Math.max(1,Math.round(n*(0.75+R()*.5)));for(let j=0;j<k;j++)add('expense',cat,(a+R()*(b-a))*1000*(i===0&&cat==='Oziq-ovqat'?1.05:1),1+Math.floor(R()*28),pick(notes))})}
 const nd=(dom)=>{const y=now.getFullYear(),m=now.getMonth();let d=new Date(y,m,dom);if(iso(d)<todayS())d=new Date(y,m+1,dom);return iso(d)};
 const rem=(text,date,type,amount=0,repeat='once',dom=0,time='')=>({id:id(),text,amount,date,time,note:'',type,repeat,dom:dom||+date.slice(8),done:false,nk:date+'T'+(time||'09:00')<todayS()?date+'T'+(time||'09:00'):''});
 const mago=n=>iso(new Date(now.getFullYear(),now.getMonth()-n,10));
 return{v:5,tx,
  debts:[{id:id(),dir:'gave',person:'Aziz',amount:500000,date:addD(-12),due:addD(4),note:L("Telefon ta'miri uchun"),status:'pending'},{id:id(),dir:'took',person:'Sardor',amount:1200000,date:addD(-40),due:addD(-2),note:'',status:'pending'},{id:id(),dir:'gave',person:'Dilnoza',amount:300000,date:addD(-50),due:addD(-30),note:'',status:'paid'}],
  rem:[rem(L("Internet to'lovi"),nd(15),'telecom',100000,'monthly',15),rem(L("Kommunal to'lovlar"),nd(10),'utility',450000,'monthly',10),rem(L('{0} qarzni qaytarishi','Aziz'),addD(4),'debtback',500000),rem(L('{0}ga qarzni qaytarish','Sardor'),addD(-2),'debttake',1200000),rem(L("Ingliz tili kursi to'lovi"),addD(1),'planned',400000,'once',0,'10:00')],
  goals:[{id:id(),name:L('Noutbuk sotib olish'),target:9000000,start:1500000,deadline:iso(new Date(now.getFullYear(),now.getMonth()+6,1)),note:'MacBook Air',contribs:[4,3,2,1,0].map(n=>({id:id(),amount:600000+n*100000,date:n?mago(n):todayS()})),createdAt:Date.now()},{id:id(),name:L('Samarqandga sayohat'),target:3000000,start:0,deadline:'',note:L('Oila bilan'),contribs:[2,1].map(n=>({id:id(),amount:400000,date:mago(n)})),createdAt:Date.now()}],
  budgets:{'Oziq-ovqat':2000000,Transport:550000,"Ko'ngilochar":450000,Kiyim:700000}}}
function loadDemo(){const has=db.tx.length+db.debts.length+db.rem.length+db.goals.length;
 if(has&&!confirm("Demo ma'lumot hozirgi ma'lumotlar o'rniga yuklanadi (ular «Sozlamalar»dan qaytarib olinadi). Davom etasizmi?"))return;
 if(has)try{localStorage.setItem(KEY+'-before-demo',JSON.stringify(db))}catch{}try{localStorage.setItem(KEY+'-hint-snooze',todayS())}catch{}db=demoData();Store.save();anS={y:new Date().getFullYear(),m:new Date().getMonth()};go('dash');toast("Demo ma'lumot yuklandi ✨")}
/* ---- Chat ---- */
let typing=false,cal={y:new Date().getFullYear(),m:new Date().getMonth(),sel:null},anS={y:new Date().getFullYear(),m:new Date().getMonth()};
async function send(t){t=t.trim();if(!t||typing)return;chat.push({r:'u',t});typing=true;route();
 try{const r=await Parser.understand(t,draft);await new Promise(x=>setTimeout(x,450));
  if(r.answer){chat.push({r:'a',t:r.answer});draft=r.draft}else{draft=r.draft;if(!draft)chat.push({r:'a',t:r.reply});else if(r.ask)chat.push({r:'a',t:r.ask});else chat.push({r:'a',card:draft})}}
 catch(e){console.error(e);chat.push({r:'a',t:"Xatolik yuz berdi. Qayta urinib ko'ring.",err:1})}
 typing=false;route()}
/* ---- Ovozli kiritish (Web Speech API). Matn yuborilmaydi: avval tahrirlanadi ---- */
function mic(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){toast("Bu brauzer ovozli kiritishni qo'llamaydi (Chrome tavsiya etiladi). Yozib kiriting.");return}
 if(mic.r){mic.r.stop();return}const r=new SR();r.lang='uz-UZ';r.interimResults=false;
 r.onstart=()=>{const b=$('#mic');b&&b.classList.add('rec');toast("Eshitmoqdaman... gapiring")};
 r.onresult=e=>{const i=$('#ci');if(i){i.value=(i.value+' '+e.results[0][0].transcript).trim();i.focus()}};
 r.onerror=e=>toast(e.error==='not-allowed'||e.error==='service-not-allowed'?"Mikrofon ruxsati berilmagan. Brauzer sozlamalarida ruxsat bering.":e.error==='language-not-supported'?"Bu qurilma o'zbek tilini tanimaydi. Yozib kiriting.":e.error==='no-speech'?"Ovoz eshitilmadi.":"Ovoz tanilmadi ("+e.error+").");
 r.onend=()=>{mic.r=null;const b=$('#mic');b&&b.classList.remove('rec')};mic.r=r;try{r.start()}catch{mic.r=null}}

/* ---- Bildirishnoma ---- */
let swOk=false;
async function fire(r){const body=r.text+(r.amount?', '+fmt(r.amount):''),tag='r'+r.id+r.nk;
 if('Notification'in window&&Notification.permission==='granted'){try{const reg=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();if(reg)await reg.showNotification('Pulim',{body,tag});else new Notification('Pulim',{body,tag});return}catch{}}
 toast(body)}
let lastMin='';
async function checkRem(){const n=new Date(),ns=iso(n),nt=pad(n.getHours())+':'+pad(n.getMinutes()),due=[];let ch=false;
 db.rem.forEach(r=>{const tm=r.time||'09:00',key=r.date+'T'+tm;if(r.done||r.nk===key||r.date>ns||(r.date===ns&&tm>nt))return;r.nk=key;ch=true;if(n-new Date(r.date+'T'+tm+':00')<864e5)due.push(r)});
 if(ch)Store.save();const sk=ns+(page==='rem'||page==='dash'?nt:'');if(!due.length&&sk===lastMin)return;lastMin=sk;for(const r of due.slice(0,5))await fire(r);const ae=document.activeElement;if(!(ae&&/INPUT|SELECT|TEXTAREA/.test(ae.tagName)&&$('#view').contains(ae)&&ae.value))route()}