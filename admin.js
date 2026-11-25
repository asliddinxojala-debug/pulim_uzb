/* Pulim — administrator paneli («Ma'lumotlar bazasi»).
   Kirish: kirish oynasida login «admin», parol «admin1234» (keyin Sozlamalarda o'zgartiring).
   Parol kodda ochiq saqlanmaydi: faqat PBKDF2 xeshi. Panel shu qurilmadagi barcha hisoblar va ularning ma'lumotlarini ko'rsatadi. */
const ADM = {
  S: 'hisobchi-admin-session', C: 'hisobchi-admin-cred', LOGIN: 'admin',
  DEF: { salt: 'hisobchi-admin-v1', p1: 'p1:uk+9r98ExlPFIK6XGbe2YsNni2JVga3cX/67hQHpEao=', s1: 's1:ea3e3e1d0863548413f878654d5e1b155a41d5b86767b498e6ff79595b2b6d63' },
  cred() { try { return JSON.parse(localStorage.getItem(this.C)) } catch { return null } },
  async check(pw) {
    const c = this.cred(), salt = c ? c.salt : this.DEF.salt, h = await pwHash(pw, salt);
    return c ? h === c.hash : (h === this.DEF.p1 || h === this.DEF.s1);
  },
  async setPw(pw) { const salt = randId(); localStorage.setItem(this.C, JSON.stringify({ salt, hash: await pwHash(pw, salt), at: Date.now() })) },
  isDefault() { return !this.cred() },
  on() { try { const s = JSON.parse(sessionStorage.getItem(this.S)); return !!s && s.exp > Date.now() } catch { return false } },
  start() { sessionStorage.setItem(this.S, JSON.stringify({ exp: Date.now() + 4 * 3600e3 })) },
  end() { sessionStorage.removeItem(this.S) },
};

/* ---- ma'lumotlarni yig'ish ---- */
const uKey = u => 'hisobchi-u-' + u.id;
function uData(u) { let d = null; try { d = JSON.parse(localStorage.getItem(uKey(u))) } catch {} return Store.norm(d) }
const uSize = u => (localStorage.getItem(uKey(u)) || '').length;
function dbAll() {
  return AUTH.users().map(u => { const d = uData(u), inc = sum(d.tx, t => t.type === 'income'), exp = sum(d.tx, t => t.type === 'expense');
    return { u, d, inc, exp, bal: inc - exp, n: d.tx.length + d.debts.length + d.rem.length + d.goals.length, size: uSize(u) } });
}
function withDb(tmp, fn) { const keep = db; db = tmp; try { return fn() } finally { db = keep } }
const kb = n => (n / 1024).toFixed(1) + ' KB';
const ago = t => { if (!t) return '—'; const d = Math.floor((Date.now() - t) / 864e5); return d <= 0 ? L('Bugun') : d === 1 ? L('Kecha') : L('{0} kun oldin', d) };
const dts = t => t ? dlong(iso(new Date(t))) : '—';

/* ---- holat ---- */
let aTab = 'ov', aQ = '', aT = 'users', aSort = { k: '', d: 1 }, aPage = 0;
const PER = 25;
const TABS_A = [['ov', 'chart', 'Umumiy'], ['users', 'user', 'Foydalanuvchilar'], ['db', 'list', "Ma'lumotlar bazasi"], ['aset', 'gear', 'Sozlamalar']];

/* ---- jadvallar (ma'lumotlar bazasi) ---- */
const TBL = {
  users: { n: 'Foydalanuvchilar', cols: [['name', 'Ism', 1], ['email', 'Email', 1], ['created', "Ro'yxatdan o'tgan"], ['last', 'Oxirgi kirish'], ['entries', 'Yozuvlar', 0, 'n'], ['balance', 'Balans', 0, 'm'], ['size', 'Hajm', 0, 'kb']],
    rows: A => A.map(x => ({ _u: x.u, name: x.u.name, email: x.u.email, created: iso(new Date(x.u.createdAt)), last: x.u.last ? iso(new Date(x.u.last)) : '', entries: x.n, balance: x.bal, size: x.size })) },
  tx: { n: 'Operatsiyalar', cols: [['email', 'Foydalanuvchi', 1], ['date', 'Sana'], ['type', 'Turi'], ['category', 'Kategoriya'], ['amount', 'Summa', 0, 'm'], ['note', 'Izoh', 1]],
    rows: A => A.flatMap(x => x.d.tx.map(t => ({ _u: x.u, email: x.u.email, date: t.date, type: t.type === 'income' ? 'Kirim' : 'Chiqim', category: t.category, amount: t.type === 'income' ? t.amount : -t.amount, note: t.note }))) },
  debts: { n: 'Qarzlar', cols: [['email', 'Foydalanuvchi', 1], ['date', 'Sana'], ['dir', 'Turi'], ['person', 'Kim', 1], ['amount', 'Summa', 0, 'm'], ['due', 'Muddat'], ['status', 'Holati']],
    rows: A => A.flatMap(x => x.d.debts.map(d => ({ _u: x.u, email: x.u.email, date: d.date, dir: d.dir === 'gave' ? 'Berilgan' : 'Olingan', person: d.person, amount: d.amount, due: d.due, status: d.status === 'paid' ? 'Qaytarildi' : 'Kutilmoqda' }))) },
  rem: { n: 'Eslatmalar', cols: [['email', 'Foydalanuvchi', 1], ['date', 'Sana'], ['text', 'Matn', 1], ['type', 'Turi'], ['repeat', 'Takrorlanish'], ['amount', 'Summa', 0, 'm'], ['done', 'Holati']],
    rows: A => A.flatMap(x => x.d.rem.map(r => ({ _u: x.u, email: x.u.email, date: r.date, text: r.text, type: RT[r.type], repeat: RP[r.repeat], amount: r.amount, done: r.done ? 'Bajarilgan' : 'Kutilmoqda' }))) },
  goals: { n: 'Maqsadlar', cols: [['email', 'Foydalanuvchi', 1], ['name', 'Maqsad', 1], ['target', 'Kerakli summa', 0, 'm'], ['saved', "Jamg'arildi", 0, 'm'], ['pct', '%', 0, 'n'], ['deadline', 'Muddat']],
    rows: A => A.flatMap(x => x.d.goals.map(g => ({ _u: x.u, email: x.u.email, name: g.name, target: g.target, saved: gSaved(g), pct: Math.min(100, pct(gSaved(g), g.target)), deadline: g.deadline }))) },
  budgets: { n: 'Byudjet', cols: [['email', 'Foydalanuvchi', 1], ['category', 'Kategoriya'], ['limit', 'Oylik limit', 0, 'm'], ['spent', 'Bu oy sarflangan', 0, 'm'], ['pct', '%', 0, 'n']],
    rows: A => A.flatMap(x => Object.entries(x.d.budgets).map(([c, lim]) => { const sp = sum(x.d.tx, t => t.type === 'expense' && t.category === c && t.date.startsWith(todayS().slice(0, 7))); return { _u: x.u, email: x.u.email, category: c, limit: lim, spent: sp, pct: pct(sp, lim) } })) },
};
function cell(v, f, user) {
  if (v === '' || v === undefined || v === null) return '<span class="muted">—</span>';
  if (f === 'm') return M(v, v < 0 ? 0 : 0);
  if (f === 'kb') return kb(v);
  if (f === 'n') return `<span class="num">${v}</span>`;
  if (/^\d{4}-\d\d-\d\d$/.test(v)) return `<span class="num">${dlong(v)}</span>`;
  return user ? `<span translate="no">${esc(v)}</span>` : esc(L(String(v)));
}
function tableRows(A) {
  const T = TBL[aT], q = aQ.trim().toLowerCase();
  let r = T.rows(A).filter(x => !q || T.cols.some(([k]) => String(x[k] ?? '').toLowerCase().includes(q) || String(L(String(x[k] ?? ''))).toLowerCase().includes(q)));
  if (aSort.k) r.sort((a, b) => { const x = a[aSort.k], y = b[aSort.k]; return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x ?? '').localeCompare(String(y ?? ''))) * aSort.d });
  return r;
}

/* ---- ko'rinishlar ---- */
const AV = {
  ov() {
    const A = dbAll(), wk = Date.now() - 7 * 864e5, merged = { tx: A.flatMap(x => x.d.tx), debts: A.flatMap(x => x.d.debts), rem: A.flatMap(x => x.d.rem), goals: A.flatMap(x => x.d.goals), budgets: {} };
    const inc = A.reduce((s, x) => s + x.inc, 0), exp = A.reduce((s, x) => s + x.exp, 0), rec = A.reduce((s, x) => s + x.n, 0), size = A.reduce((s, x) => s + x.size, 0) + (localStorage.getItem(AUTH.U) || '').length;
    const newW = A.filter(x => x.u.createdAt > wk).length, act = A.filter(x => x.u.last > wk).length, cats = {};
    merged.tx.filter(t => t.type === 'expense').forEach(t => cats[t.category] = (cats[t.category] || 0) + t.amount);
    const n = new Date();
    if (!A.length) return `<section class="panel">${empty("Hali foydalanuvchi yo'q", "Birinchi hisob ro'yxatdan o'tgach, statistika shu yerda chiqadi.")}</section>`;
    return `<div class="stats" style="margin-bottom:18px"><div><span>Foydalanuvchilar</span><b>${A.length}</b><em>${L('bu hafta +{0}', newW)}</em></div><div><span>Faol (7 kun)</span><b>${act}</b><em>${L('{0}% foydalanuvchi', pct(act, A.length))}</em></div><div><span>Jami yozuvlar</span><b>${rec}</b><em>${L('{0} ta operatsiya', merged.tx.length)}</em></div><div><span>Ma'lumotlar hajmi</span><b>${kb(size)}</b><em>${L('brauzer xotirasida')}</em></div></div>
    <div class="grid">
    <section class="panel c6"><div class="panel-h"><div><h2>Umumiy aylanma</h2><p>Barcha foydalanuvchilar</p></div></div><div class="flow"><div><span>${ico('in')}Kirim</span><b class="pos">${M(inc)}</b></div><div><span>${ico('out')}Chiqim</span><b>${M(exp)}</b></div></div><div style="margin-top:18px">${withDb(merged, () => chart6(n.getFullYear(), n.getMonth()))}</div></section>
    <section class="panel c6"><div class="panel-h"><div><h2>Xarajat kategoriyalari</h2><p>Barcha foydalanuvchilar</p></div></div>${Object.keys(cats).length ? shares(cats, exp, null, 7) : empty('Xarajat yozilmagan')}</section>
    <section class="panel c6"><div class="panel-h"><h2>So'nggi ro'yxatdan o'tganlar</h2><button class="link" data-a="atab" data-t="users">Hammasi</button></div><div class="rows">${A.slice().sort((a, b) => b.u.createdAt - a.u.createdAt).slice(0, 5).map(x => `<div class="row click" data-a="auser" data-id="${x.u.id}">${avatar(x.u)}<div class="t" translate="no"><b>${esc(x.u.name)}</b><span>${esc(x.u.email)}</span></div><div class="amt"><span class="muted" style="font-size:13px;font-weight:500">${dts(x.u.createdAt)}</span></div></div>`).join('')}</div></section>
    <section class="panel c6"><div class="panel-h"><h2>Oxirgi faollik</h2></div><div class="rows">${A.slice().sort((a, b) => (b.u.last || 0) - (a.u.last || 0)).slice(0, 5).map(x => `<div class="row click" data-a="auser" data-id="${x.u.id}">${avatar(x.u)}<div class="t"><b translate="no">${esc(x.u.name)}</b><span>${L('{0} ta yozuv', x.n)}</span></div><span class="tag ${x.u.last > Date.now() - 864e5 ? 'pos' : ''}">${ago(x.u.last)}</span></div>`).join('')}</div></section></div>`;
  },
  users() {
    const A = dbAll(), q = aQ.trim().toLowerCase(), L2 = A.filter(x => !q || (x.u.name + ' ' + x.u.email).toLowerCase().includes(q)).sort((a, b) => b.u.createdAt - a.u.createdAt);
    return `<div class="toolbar"><label class="field search">${ico('search')}<input id="aq" type="search" placeholder="Ism yoki email" value="${esc(aQ)}" aria-label="Qidirish"></label><span class="muted" style="font-size:14px">${L('{0} ta foydalanuvchi', L2.length)}</span></div>
    <section class="panel" style="padding:0;overflow:hidden">${L2.length ? `<div class="dbt-wrap"><table class="dbt"><thead><tr><th>Foydalanuvchi</th><th>Ro'yxatdan o'tgan</th><th>Oxirgi kirish</th><th class="r">Yozuvlar</th><th class="r">Balans</th><th class="r">Hajm</th><th></th></tr></thead><tbody>
    ${L2.map(x => `<tr class="click" data-a="auser" data-id="${x.u.id}"><td><div class="who">${avatar(x.u)}<div translate="no"><b>${esc(x.u.name)}</b><span>${esc(x.u.email)}</span></div></div></td><td>${dts(x.u.createdAt)}</td><td>${ago(x.u.last)}</td><td class="r num">${x.n}</td><td class="r">${M(x.bal)}</td><td class="r num">${kb(x.size)}</td><td class="r"><button class="icon-btn" data-a="auser" data-id="${x.u.id}" aria-label="Ko'rish">${ico('right')}</button></td></tr>`).join('')}</tbody></table></div>` : empty("Hech narsa topilmadi")}</section>`;
  },
  db() {
    const A = dbAll(), T = TBL[aT], r = tableRows(A), pages = Math.max(1, Math.ceil(r.length / PER)); if (aPage >= pages) aPage = pages - 1;
    const pg = r.slice(aPage * PER, aPage * PER + PER);
    return `<div class="toolbar"><div class="seg seg-scroll" role="tablist">${Object.entries(TBL).map(([k, t]) => `<button class="${k === aT ? 'on' : ''}" data-a="atbl" data-t="${k}" role="tab">${t.n} <span class="cnt">${t.rows(A).length}</span></button>`).join('')}</div></div>
    <div class="toolbar"><label class="field search">${ico('search')}<input id="aq" type="search" placeholder="Jadvaldan qidirish" value="${esc(aQ)}" aria-label="Qidirish"></label><span class="muted" style="font-size:14px">${L('{0} ta qator', r.length)}</span><button class="btn ghost sm" data-a="acsv">${ico('download')}CSV</button></div>
    <section class="panel" style="padding:0;overflow:hidden">${r.length ? `<div class="dbt-wrap"><table class="dbt"><thead><tr>${T.cols.map(([k, l, , f]) => `<th class="${f === 'm' || f === 'n' || f === 'kb' ? 'r' : ''}"><button data-a="asort" data-k="${k}">${l}${aSort.k === k ? (aSort.d > 0 ? ' ↑' : ' ↓') : ''}</button></th>`).join('')}</tr></thead><tbody>
    ${pg.map(x => `<tr class="click" data-a="auser" data-id="${x._u.id}">${T.cols.map(([k, , u, f]) => `<td class="${f === 'm' || f === 'n' || f === 'kb' ? 'r' : ''} ${f === 'm' && x[k] < 0 ? 'neg' : ''}">${cell(x[k], f, u)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <div class="pager"><span class="muted">${L('{0}–{1}, jami {2}', aPage * PER + 1, Math.min(r.length, aPage * PER + PER), r.length)}</span><div><button class="icon-btn" data-a="apg" data-d="-1" ${aPage ? '' : 'disabled'} aria-label="Oldingi">${ico('left')}</button><button class="icon-btn" data-a="apg" data-d="1" ${aPage < pages - 1 ? '' : 'disabled'} aria-label="Keyingi">${ico('right')}</button></div></div>` : empty("Jadval bo'sh")}</section>`;
  },
  aset() {
    const R = (i, t, s, a) => `<div class="set-row"><span class="ico">${ico(i)}</span><div class="t"><b>${t}</b><span>${s}</span></div>${a || ''}</div>`, A = dbAll();
    return `<div style="max-width:760px">${ADM.isDefault() ? `<section class="panel warn-box" style="margin-bottom:20px">${ico('alert')}<div><b>Standart parol ishlatilmoqda</b><p>«admin1234» parolini o'zgartiring. Aks holda saytni ochgan har kim administrator bo'lib kira oladi.</p></div><button class="btn sm" data-a="apw">O'zgartirish</button></section>` : ''}
    <section class="set-group"><h2>Administrator</h2>${R('lock', 'Administrator paroli', ADM.isDefault() ? "Standart parol: admin1234" : L("Oxirgi o'zgartirish: {0}", dts(ADM.cred().at)), `<button class="btn sm ghost" data-a="apw">O'zgartirish</button>`)}
    ${R('moon', "Ko'rinish", "Yorug', qorong'i yoki qurilma sozlamasiga mos.", themeSwitch())}${R('logout', 'Paneldan chiqish', "Administrator sessiyasi yopiladi.", `<button class="btn sm ghost" data-a="aout">Chiqish</button>`)}</section>
    <section class="set-group"><h2>Ma'lumotlar bazasi</h2>${R('download', "To'liq zaxira nusxa", L("{0} ta foydalanuvchi va ularning barcha ma'lumotlari bitta JSON faylda.", A.length), `<button class="btn sm" data-a="aexp">Yuklab olish</button>`)}
    ${R('upload', 'Zaxiradan tiklash', "To'liq zaxira faylidan barcha hisoblarni tiklash. Mavjud hisoblar almashtiriladi.", `<button class="btn sm ghost" data-a="aimp">Fayl tanlash</button>`)}
    ${R('file', 'Excel uchun eksport', "Barcha foydalanuvchilar operatsiyalari CSV faylda.", `<button class="btn sm ghost" data-a="acsvall">Yuklab olish</button>`)}
    ${R('trash', "Barcha hisoblarni o'chirish", "Barcha foydalanuvchilar va ularning ma'lumotlari o'chiriladi. Qaytarib bo'lmaydi.", `<button class="btn sm danger" data-a="awipe">O'chirish</button>`)}</section>
    <p class="note">Panel shu brauzerdagi hisoblarni ko'rsatadi. Barcha qurilmalardagi foydalanuvchilarni ko'rish uchun bulutli baza (Supabase yoki Firebase) kerak.</p></div>`;
  },
};
function adminHTML() {
  return `<div class="adm"><header class="adm-top"><div class="wrap adm-bar"><div class="a-brand" style="margin:0">${LOGO}<b>Pulim</b><span class="tag brand">Administrator</span></div><div class="adm-act">${langSwitch()}${themeBtn()}<button class="btn ghost sm" data-a="aout">${ico('logout')}Chiqish</button></div></div>
  <div class="wrap"><nav class="adm-tabs" role="tablist">${TABS_A.map(([k, i, n]) => `<button class="${k === aTab ? 'on' : ''}" data-a="atab" data-t="${k}" role="tab" aria-selected="${k === aTab}">${ico(i)}${n}</button>`).join('')}</nav></div></header>
  <main class="wrap adm-main" id="aview">${AV[aTab]()}</main></div>`;
}
function showAdmin() { $('#auth').hidden = true; $('.app').hidden = true; const a = $('#admin'); a.hidden = false; a.innerHTML = adminHTML(); document.title = "Ma'lumotlar bazasi — Pulim" }
const aRender = () => { const v = $('#aview'); if (!v) return showAdmin(); v.innerHTML = AV[aTab]() };

function userSheet(id) {
  const u = AUTH.users().find(x => x.id === id); if (!u) return; const d = uData(u), inc = sum(d.tx, t => t.type === 'income'), exp = sum(d.tx, t => t.type === 'expense');
  const last = d.tx.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
  openSheet(L('Foydalanuvchi'), `<div class="row" style="margin:0">${avatar(u, 1)}<div class="t" translate="no"><b>${esc(u.name)}</b><span>${esc(u.email)}</span></div></div>
    <div class="kvs">${[['Ro\'yxatdan o\'tgan', dts(u.createdAt)], ['Oxirgi kirish', ago(u.last)], ['Balans', M(inc - exp)], ['Kirim', M(inc)], ['Chiqim', M(exp)], ['Operatsiyalar', d.tx.length], ['Qarzlar', d.debts.length], ['Eslatmalar', d.rem.length], ['Maqsadlar', d.goals.length], ['Hajm', kb(uSize(u))], ['ID', `<span translate="no">${u.id}</span>`]].map(([k, v]) => `<div class="kv"><span>${L(k)}</span><b>${v}</b></div>`).join('')}</div>
    <div><div class="fl" style="margin-bottom:6px">${L('Oxirgi operatsiyalar')}</div><div class="rows">${last.length ? last.map(t => `<div class="row">${catI(t.category, 1)}<div class="t"><b ${t.note ? 'translate="no"' : ''}>${esc(t.note || t.category)}</b><span>${dlong(t.date)}</span></div><div class="amt ${t.type === 'income' ? 'pos' : ''}">${M(t.type === 'income' ? t.amount : -t.amount, 1)}</div></div>`).join('') : `<p class="muted" style="font-size:14px">${L("Operatsiya yo'q")}</p>`}</div></div>`,
    `<button type="button" class="btn ghost sm" data-a="aupw" data-id="${u.id}">${ico('key')}${L('Parolni tiklash')}</button><button type="button" class="btn ghost sm" data-a="auexp" data-id="${u.id}">${ico('download')}JSON</button><button type="button" class="btn danger sm" data-a="audel" data-id="${u.id}">${ico('trash')}${L("O'chirish")}</button>`, () => {});
}
const tempPw = () => { const A = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789', a = new Uint8Array(10); crypto.getRandomValues(a); return [...a].map(x => A[x % A.length]).join('') + '7' };
const csvOf = rows => '﻿' + rows.map(r => r.map(v => { const s = String(v ?? ''); return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s }).join(';')).join('\r\n');

document.addEventListener('click', async e => {
  if ($('#admin').hidden) return; const el = e.target.closest('[data-a]'); if (!el) return; const a = el.dataset.a, id = el.dataset.id;
  if (a === 'atab') { aTab = el.dataset.t; aQ = ''; aPage = 0; showAdmin() }
  else if (a === 'atbl') { aT = el.dataset.t; aQ = ''; aPage = 0; aSort = { k: '', d: 1 }; aRender() }
  else if (a === 'asort') { e.stopPropagation(); const k = el.dataset.k; aSort = aSort.k === k ? { k, d: -aSort.d } : { k, d: 1 }; aRender() }
  else if (a === 'apg') { aPage = Math.max(0, aPage + +el.dataset.d); aRender() }
  else if (a === 'auser') { if (e.target.closest('[data-a=asort]')) return; userSheet(id) }
  else if (a === 'aout') { ADM.end(); location.replace(location.pathname) }
  else if (a === 'acsv') { const T = TBL[aT], r = tableRows(dbAll()); dl(`pulim-${aT}-${todayS()}.csv`, csvOf([T.cols.map(c => L(c[1])), ...r.map(x => T.cols.map(([k]) => typeof x[k] === 'string' && !/@/.test(x[k]) ? L(x[k]) : x[k]))]), 'text/csv;charset=utf-8'); toast(L('CSV yuklab olindi — Excel bilan oching.')) }
  else if (a === 'acsvall') { aT = 'tx'; const r = tableRows(dbAll()), T = TBL.tx; dl(`pulim-all-tx-${todayS()}.csv`, csvOf([T.cols.map(c => L(c[1])), ...r.map(x => T.cols.map(([k]) => x[k]))]), 'text/csv;charset=utf-8'); toast(L('CSV yuklab olindi — Excel bilan oching.')) }
  else if (a === 'aexp') { const users = AUTH.users(), data = {}; users.forEach(u => data[u.id] = uData(u)); dl(`pulim-database-${todayS()}.json`, JSON.stringify({ app: 'Pulim', kind: 'full-database', exported: new Date().toISOString(), users, data }, null, 1), 'application/json'); toast(L("To'liq zaxira nusxa yuklab olindi.")) }
  else if (a === 'aimp') { const i = document.createElement('input'); i.type = 'file'; i.accept = '.json,application/json'; i.onchange = () => { const f = i.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { let o; try { o = JSON.parse(r.result) } catch { toast(L("Fayl o'qilmadi: JSON emas.")); return }
      if (!o || o.kind !== 'full-database' || !Array.isArray(o.users)) { toast(L("Bu to'liq zaxira fayli emas.")); return }
      askConfirm(L("Ma'lumotlar bazasi tiklansinmi?"), L("Fayldagi {0} ta hisob hozirgi barcha hisoblar o'rniga yuklanadi.", o.users.length), L('Tiklash'), () => {
        AUTH.users().forEach(u => localStorage.removeItem(uKey(u))); AUTH.save(o.users); o.users.forEach(u => { if (o.data && o.data[u.id]) localStorage.setItem(uKey(u), JSON.stringify(Store.norm(o.data[u.id]))) }); closeSheet(); showAdmin(); toast(L('Tiklandi: {0} ta hisob.', o.users.length)) }) }; r.readAsText(f) }; i.click() }
  else if (a === 'awipe') askConfirm(L("Barcha hisoblar o'chirilsinmi?"), L("{0} ta foydalanuvchi va ularning barcha ma'lumotlari butunlay o'chiriladi.", AUTH.users().length), L("Ha, o'chirish"), () => { AUTH.users().forEach(u => AUTH.remove(u)); closeSheet(); showAdmin(); toast(L("Ma'lumotlar o'chirildi")) });
  else if (a === 'auexp') { const u = AUTH.users().find(x => x.id === id); if (u) dl(`pulim-${u.email.replace(/[^a-z0-9]+/gi, '-')}.json`, JSON.stringify({ app: 'Pulim', exported: new Date().toISOString(), ...uData(u) }, null, 1), 'application/json') }
  else if (a === 'audel') { const u = AUTH.users().find(x => x.id === id); if (u) askConfirm(L("Hisobni o'chirish"), L("«{0}» hisobi va undagi barcha ma'lumotlar butunlay o'chiriladi.", esc(u.email)), L("Ha, o'chirish"), () => { const s = sessionStorage.getItem(AUTH.S), l = localStorage.getItem(AUTH.S); AUTH.remove(u); if (s) sessionStorage.setItem(AUTH.S, s); if (l) localStorage.setItem(AUTH.S, l); closeSheet(); showAdmin(); toast(L("Hisob o'chirildi")) }) }
  else if (a === 'aupw') { const u = AUTH.users().find(x => x.id === id); if (!u) return; const p = tempPw(); u.salt = randId(); u.hash = await pwHash(p, u.salt); AUTH.update(u); AUTH.clearFail(u.email);
    openSheet(L('Vaqtinchalik parol'), `<p style="color:var(--ink2)">${L("Bu parolni foydalanuvchiga bering. U kirgach, Sozlamalarda o'z parolini qo'yadi. Parol boshqa ko'rsatilmaydi.")}</p><div class="code" translate="no">${p}</div>`, `<button type="button" class="btn ghost" data-a="copycode">${ico('copy')}${L('Nusxa olish')}</button><button type="button" class="btn" data-a="close">${L('Tayyor')}</button>`, () => {}) }
  else if (a === 'apw') { openSheet(L('Administrator paroli'), FL('Joriy parol', 'cur', 'password', '', 'required autocomplete="current-password" autofocus') + FL('Yangi parol', 'next', 'password', '', 'required minlength="8" autocomplete="new-password"', 'kamida 8 ta belgi') + FL('Yangi parolni takrorlang', 'rep', 'password', '', 'required autocomplete="new-password"'), '', () => {});
    sheetSubmit = v => { if (v.next.length < 8) return "Yangi parol kamida 8 ta belgidan iborat bo'lsin."; if (v.next === 'admin1234' || pwScore(v.next) < 2) return "Yangi parol juda oddiy. Raqam yoki katta harf qo'shing."; if (v.next !== v.rep) return 'Yangi parollar bir xil emas.';
      ADM.check(v.cur).then(ok => { if (!ok) { toast(L("Joriy parol noto'g'ri.")); return } ADM.setPw(v.next).then(() => { showAdmin(); toast(L('Parol yangilandi')) }) }) } }
});
document.addEventListener('input', e => { if (e.target.id === 'aq') { aQ = e.target.value; aPage = 0; const p = e.target.selectionStart; aRender(); const i = $('#aq'); if (i) { i.focus(); try { i.setSelectionRange(p, p) } catch {} } } });

async function adminLogin(pw) {
  const wait = AUTH.lockLeft('admin'); if (wait) throw { f: 'password', m: L("Juda ko'p urinish. {0} soniyadan keyin qayta urinib ko'ring.", wait) };
  if (!(await ADM.check(pw))) { const left = AUTH.fail('admin'); throw { f: 'password', m: left === 0 ? L("Juda ko'p urinish. {0} soniyadan keyin qayta urinib ko'ring.", 60) : L("Login yoki parol noto'g'ri.") } }
  AUTH.clearFail('admin'); ADM.start(); showAdmin();
}
