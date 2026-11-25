/* Pulim 6.0 — kirish / ro'yxatdan o'tish ekranlari, profil va ishga tushirish */
const avatar = (u, big) => { const ini = (u.name || u.email).trim().split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase(); return `<span class="avatar${big ? ' lg' : ''}" aria-hidden="true">${esc(ini)}</span>` };
const userBlock = () => USER ? `<div class="side-tools">${langSwitch('lang-side')}${themeBtn()}</div><div class="me">${avatar(USER)}<div class="t" translate="no"><b>${esc(USER.name)}</b><span>${esc(USER.email)}</span></div><button class="icon-btn" data-a="logout" aria-label="Chiqish" title="Chiqish">${ico('logout')}</button></div>` : '';
const ONB = 'hisobchi-onb';
let aMode = AUTH.users().length ? 'in' : 'up', aEmail = '';

const AF = (label, name, type, attrs = '', after = '') => `<label class="af"><span>${label}</span><span class="af-in">${ico(name === 'email' ? 'mail' : type === 'password' ? 'lock' : name === 'code' ? 'key' : 'user')}<input name="${name}" type="${type}" ${attrs}>${type === 'password' ? `<button type="button" class="pwt" data-a="pwt" aria-label="Parolni ko'rsatish" title="Parolni ko'rsatish">${ico('eye')}</button>` : ''}</span>${after}<small class="err" id="e-${name}" aria-live="polite"></small></label>`;
const meter = `<div class="meter" id="meter" aria-hidden="true"><i></i><i></i><i></i><i></i></div><small class="hint" id="mhint">Kamida 8 ta belgi. Harf va raqam aralashsa, kuchliroq bo'ladi.</small>`;

function authHTML() {
  const brand = `<div class="a-brand">${LOGO}<b>Pulim</b></div>`;
  let h = '', p = '', form = '', foot = '';
  if (aMode === 'in') {
    h = 'Xush kelibsiz'; p = 'Hisobingizga kiring va davom eting.';
    form = AF('Email yoki login', 'email', 'text', `autocomplete="username" inputmode="email" required value="${esc(aEmail)}" ${aEmail ? '' : 'autofocus'}`) + AF('Parol', 'password', 'password', `autocomplete="current-password" required ${aEmail ? 'autofocus' : ''}`) +
      `<div class="a-row"><label class="chk"><input type="checkbox" name="remember" checked><span>Meni eslab qol</span></label><button type="button" class="link" data-a="amode" data-m="reset">Parolni unutdingizmi?</button></div><button class="btn block lg">Kirish</button>`;
    foot = `Hisobingiz yo'qmi? <button type="button" class="link" data-a="amode" data-m="up">Ro'yxatdan o'ting</button>`;
  } else if (aMode === 'up') {
    h = 'Hisob yarating'; p = "Bir daqiqa vaqt oladi. Karta yoki telefon raqami so'ralmaydi.";
    form = AF('Ismingiz', 'name', 'text', 'autocomplete="name" required maxlength="40" autofocus placeholder="Masalan: Rustam"') + AF('Email', 'email', 'email', `autocomplete="email" required placeholder="siz@example.com" value="${esc(aEmail)}"`) + AF('Parol', 'password', 'password', 'autocomplete="new-password" required minlength="8"', meter) +
      `<button class="btn block lg">Hisob yaratish</button><p class="a-fine">Hisob va ma'lumotlar shu qurilmada saqlanadi, serverga yuborilmaydi.</p>`;
    foot = AUTH.users().length ? `Hisobingiz bormi? <button type="button" class="link" data-a="amode" data-m="in">Kirish</button>` : '';
  } else if (aMode === 'reset') {
    h = 'Parolni tiklash'; p = "Ro'yxatdan o'tganda berilgan tiklash kodini kiriting.";
    form = AF('Email', 'email', 'email', `autocomplete="email" required value="${esc(aEmail)}" autofocus`) + AF('Tiklash kodi', 'code', 'text', 'required autocomplete="off" placeholder="XXXX-XXXX-XXXX" class="mono" maxlength="16"') + AF('Yangi parol', 'password', 'password', 'autocomplete="new-password" required minlength="8"', meter) + `<button class="btn block lg">Parolni yangilash</button>`;
    foot = `<button type="button" class="link" data-a="amode" data-m="in">${ico('left')}Kirishga qaytish</button>`;
  } else if (aMode === 'code') {
    const code = sessionStorage.getItem(ONB + '-code') || '';
    h = 'Tiklash kodingizni saqlang'; p = "Parolni unutsangiz, hisobingizga faqat shu kod orqali qaytasiz. Kod boshqa ko'rsatilmaydi.";
    form = `<div class="code" aria-label="Tiklash kodi">${esc(code)}</div><div class="a-row"><button type="button" class="btn ghost" data-a="copycode">${ico('copy')}Nusxa olish</button><button type="button" class="btn ghost" data-a="dlcode">${ico('download')}Fayl sifatida saqlash</button></div>
      <label class="chk"><input type="checkbox" id="saved" name="saved"><span>Kodni xavfsiz joyga saqlab qo'ydim</span></label><button class="btn block lg" id="cont" disabled>Davom etish</button>`;
  } else if (aMode === 'start') {
    h = esc(L('Qanday boshlaymiz, {0}?', USER.name.split(' ')[0])); p = USER.migrated ? "Avval kiritgan ma'lumotlaringiz shu hisobga ko'chirildi." : "Hisobingiz tayyor. Boshlash usulini tanlang, keyin istalgan vaqt o'zgartirasiz.";
    form = USER.migrated ? `<button type="button" class="btn block lg" data-a="onb" data-v="empty">Ilovaga o'tish</button>` :
      `<button type="button" class="choice" data-a="onb" data-v="empty">${tI('plus', '#2B44B8')}<span><b>Toza hisob</b><span>Birinchi xarajat yoki kirimimni o'zim yozaman.</span></span>${ico('right')}</button>
       <button type="button" class="choice" data-a="onb" data-v="demo">${tI('sparkle', '#0B875B')}<span><b>Namuna ma'lumot bilan</b><span>6 oylik misol bilan imkoniyatlarni ko'raman. Keyin Sozlamalardan tozalash mumkin.</span></span>${ico('right')}</button>`;
  }
  const isForm = !['start'].includes(aMode);
  return `<div class="auth"><section class="a-main"><div class="auth-lang">${langSwitch()}${themeBtn()}</div><div class="a-box">${brand}<h1>${h}</h1><p class="a-sub">${p}</p>
    ${isForm ? `<form id="af" class="a-form" novalidate>${form}</form>` : `<div class="a-form">${form}</div>`}
    ${foot ? `<p class="a-foot">${foot}</p>` : ''}</div></section>
    <aside class="a-art" aria-hidden="true"><div class="a-art-in"><h2>Pulingiz qayerga ketayotganini aniq biling</h2><p>Xarajatni oddiy gap bilan yozing. Kategoriya, tahlil, byudjet va eslatmalarni Pulim o'zi tartiblaydi.</p>
      <div class="a-demo"><div class="m u">Taksiga 25 ming to'ladim</div><div class="cf"><h4>${catI('Transport', 1)}Chiqim<span class="tag pos" style="margin-left:auto">Saqlandi</span></h4><div class="kv"><span>Summa</span><b>25 000 so'm</b></div><div class="kv"><span>Kategoriya</span><b>Transport</b></div><div class="kv"><span>Sana</span><b>Bugun</b></div></div>
      <div class="a-stat"><span>Noyabr oyida qoldi</span><b class="big">3 525 000<small>so'm</small></b></div></div></div></aside></div>`;
}
function showAuth(mode) {
  if (mode) aMode = mode;
  $('#auth').hidden = false; $('.app').hidden = true; $('#auth').innerHTML = authHTML();
  document.title = { in: 'Kirish', up: "Ro'yxatdan o'tish", reset: 'Parolni tiklash', code: 'Tiklash kodi', start: 'Boshlash' }[aMode] + ' — Pulim';
  const f = $('#auth [autofocus]'); if (f && fine) f.focus();
  $('.code') && $('.code').setAttribute('translate', 'no');
}
function showApp() {
  $('#auth').hidden = true; $('#auth').innerHTML = ''; $('.app').hidden = false;
  route(); checkRem(); if (!showApp.t) showApp.t = setInterval(checkRem, 30000);
}
const setErr = (n, m) => { const e = $('#e-' + n); if (e) { e.textContent = m || ''; const i = e.parentNode.querySelector('input'); if (i) { i.setAttribute('aria-invalid', m ? 'true' : 'false'); if (m) i.focus() } } };
const clrErr = () => document.querySelectorAll('#af .err').forEach(e => { e.textContent = ''; const i = e.parentNode.querySelector('input'); if (i) i.removeAttribute('aria-invalid') });
const okEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e).trim());
const busy = (on, label) => { const b = $('#af button.btn.lg') || $('#af .btn.block'); if (!b) return; b.disabled = on; if (on) { b.dataset.l = b.textContent; b.innerHTML = '<span class="spin"></span>' + (label || 'Kuting...') } else if (b.dataset.l) b.textContent = b.dataset.l };

document.addEventListener('submit', async e => {
  if (e.target.id !== 'af') return; e.preventDefault(); e.stopImmediatePropagation();
  const v = Object.fromEntries(new FormData(e.target)); clrErr();
  try {
    if (aMode === 'in') {
      if (v.email.trim().toLowerCase() === ADM.LOGIN) { if (!v.password) return setErr('password', 'Parolni kiriting.'); busy(true, 'Kirilmoqda...'); await adminLogin(v.password); return }
      if (!okEmail(v.email)) return setErr('email', "Email manzilini to'g'ri kiriting.");
      if (!v.password) return setErr('password', 'Parolni kiriting.');
      busy(true, 'Kirilmoqda...'); const u = await signIn(v); AUTH.start(u, !!v.remember); location.replace(location.pathname);
    } else if (aMode === 'up') {
      if (!v.name.trim()) return setErr('name', 'Ismingizni yozing.');
      if (!okEmail(v.email)) return setErr('email', "Email manzilini to'g'ri kiriting.");
      if (v.password.length < 8) return setErr('password', "Parol kamida 8 ta belgidan iborat bo'lsin.");
      if (pwScore(v.password) < 2) return setErr('password', "Parol juda oddiy. Raqam yoki katta harf qo'shing.");
      busy(true, 'Hisob yaratilmoqda...'); const { u, code } = await signUp(v);
      AUTH.start(u, true); sessionStorage.setItem(ONB, 'code'); sessionStorage.setItem(ONB + '-code', code); location.replace(location.pathname);
    } else if (aMode === 'reset') {
      if (!okEmail(v.email)) return setErr('email', "Email manzilini to'g'ri kiriting.");
      if (!v.code.trim()) return setErr('code', 'Tiklash kodini kiriting.');
      if (v.password.length < 8) return setErr('password', "Parol kamida 8 ta belgidan iborat bo'lsin.");
      busy(true, 'Tekshirilmoqda...'); await resetPw(v); aEmail = v.email; showAuth('in'); toast('Parol yangilandi. Yangi parol bilan kiring.');
    } else if (aMode === 'code') {
      if (!$('#saved').checked) return; sessionStorage.setItem(ONB, 'start'); sessionStorage.removeItem(ONB + '-code'); showAuth('start');
    }
  } catch (err) { busy(false); if (err && err.f) setErr(err.f, err.m); else { console.error(err); toast("Kutilmagan xato. Sahifani yangilab, qayta urinib ko'ring.") } }
}, true);

document.addEventListener('click', e => {
  const el = e.target.closest('[data-a]'); if (!el) return; const a = el.dataset.a;
  if (a === 'amode') { const em = $('#af [name=email]'); if (em) aEmail = em.value; showAuth(el.dataset.m) }
  else if (a === 'pwt') { const i = el.parentNode.querySelector('input'), sh = i.type === 'password'; i.type = sh ? 'text' : 'password'; el.innerHTML = ico(sh ? 'eyeOff' : 'eye'); el.setAttribute('aria-label', sh ? 'Parolni yashirish' : "Parolni ko'rsatish"); i.focus() }
  else if (a === 'copycode') { const c = $('.code').textContent; (navigator.clipboard ? navigator.clipboard.writeText(c) : Promise.reject()).then(() => toast('Kod nusxalandi'), () => toast("Nusxa olinmadi. Kodni qo'lda yozib oling.")) }
  else if (a === 'dlcode') dl('pulim-recovery-code.txt', L("Pulim — tiklash kodi\nHisob: {0}\nKod: {1}\n\nBu kod parolni unutganingizda kerak bo'ladi. Uni hech kimga bermang.\n", USER ? USER.email : '', $('.code').textContent), 'text/plain');
  else if (a === 'onb') { sessionStorage.removeItem(ONB); if (el.dataset.v === 'demo') { try { localStorage.setItem(KEY + '-hint-snooze', todayS()) } catch {} db = demoData(); Store.save() } showApp(); toast(el.dataset.v === 'demo' ? L("Namuna ma'lumot yuklandi") : L('Xush kelibsiz, {0}!', USER.name.split(' ')[0])) }
  else if (a === 'logout') askConfirm('Hisobdan chiqasizmi?', "Ma'lumotlaringiz saqlanib qoladi. Qayta kirish uchun email va parol kerak bo'ladi.", 'Chiqish', () => { AUTH.end(); location.replace(location.pathname) });
  else if (a === 'profile') openSheet('Profil', FL('Ism', 'name', 'text', USER.name, 'required maxlength="40" autofocus') + FL('Email', 'email', 'email', USER.email, 'required autocomplete="email"'), '', v => {
    if (!v.name.trim()) return 'Ismni yozing.'; if (!okEmail(v.email)) return "Email manzilini to'g'ri kiriting.";
    const ex = AUTH.find(v.email); if (ex && ex.id !== USER.id) return 'Bu email boshqa hisobda ishlatilgan.';
    USER.name = v.name.trim(); USER.email = AUTH.norm(v.email); AUTH.update(USER); toast('Profil saqlandi') });
  else if (a === 'chpw') { openSheet("Parolni o'zgartirish", FL('Joriy parol', 'cur', 'password', '', 'required autocomplete="current-password" autofocus') + FL('Yangi parol', 'next', 'password', '', 'required minlength="8" autocomplete="new-password"', 'kamida 8 ta belgi') + FL('Yangi parolni takrorlang', 'rep', 'password', '', 'required autocomplete="new-password"'), '', () => {});
    sheetSubmit = v => { if (v.next.length < 8) return "Yangi parol kamida 8 ta belgidan iborat bo'lsin."; if (pwScore(v.next) < 2) return "Yangi parol juda oddiy. Raqam yoki katta harf qo'shing."; if (v.next !== v.rep) return 'Yangi parollar bir xil emas.';
      changePw(USER, v.cur, v.next).then(() => toast('Parol yangilandi'), err => { toast(err.m || 'Xato'); $('[data-a=chpw]') && $('[data-a=chpw]').click() }) } }
  else if (a === 'newcode') { openSheet('Yangi tiklash kodi', `<p style="color:var(--ink2)">Eski kod bekor bo'ladi. Davom etish uchun parolingizni kiriting.</p>` + FL('Parol', 'pw', 'password', '', 'required autocomplete="current-password" autofocus'), `<button type="button" class="btn ghost" data-a="close">Bekor qilish</button><button class="btn">Kod olish</button>`, () => {});
    sheetSubmit = v => { pwHash(v.pw, USER.salt).then(h => { if (h !== USER.hash) { toast("Parol noto'g'ri"); return } newRecovery(USER).then(code => openSheet('Yangi tiklash kodingiz', `<div class="code">${code}</div><p class="muted" style="font-size:14px">Kodni yozib oling. U boshqa ko'rsatilmaydi.</p>`, `<button type="button" class="btn ghost" data-a="copycode">${ico('copy')}Nusxa olish</button><button type="button" class="btn" data-a="close">Saqladim</button>`, () => {})) }) } }
  else if (a === 'delacc') { openSheet("Hisobni o'chirish", `<p style="color:var(--ink2)">Hisobingiz va undagi barcha yozuvlar, qarzlar, eslatmalar va maqsadlar butunlay o'chiriladi. Bu amalni qaytarib bo'lmaydi.</p>` + FL('Tasdiqlash uchun parolingiz', 'pw', 'password', '', 'required autocomplete="current-password" autofocus'), `<button type="button" class="btn ghost" data-a="close">Bekor qilish</button><button class="btn danger">Hisobni o'chirish</button>`, () => {});
    sheetSubmit = v => { pwHash(v.pw, USER.salt).then(h => { if (h !== USER.hash) { toast("Parol noto'g'ri"); return } AUTH.remove(USER); location.replace(location.pathname) }) } }
});
document.addEventListener('input', e => {
  if (e.target.closest && e.target.closest('#af') && e.target.name) { const er = $('#e-' + e.target.name); if (er && er.textContent) { er.textContent = ''; e.target.removeAttribute('aria-invalid') } }
  if (e.target.closest && e.target.closest('#af') && e.target.name === 'password' && $('#meter')) {
    const s = e.target.value ? Math.max(1, pwScore(e.target.value)) : 0, m = $('#meter');
    m.dataset.s = s; $('#mhint').textContent = !e.target.value ? "Kamida 8 ta belgi. Harf va raqam aralashsa, kuchliroq bo'ladi." : ['', 'Zaif parol', "O'rtacha parol", 'Yaxshi parol', 'Kuchli parol'][s];
  }
  if (e.target.id === 'saved') $('#cont').disabled = !e.target.checked;
});
document.addEventListener('change', e => { if (e.target.id === 'saved') $('#cont').disabled = !e.target.checked });

/* ---- ishga tushirish ---- */
{ const step = sessionStorage.getItem(ONB); if (ADM.on() && !USER) showAdmin(); else if (!USER) showAuth(); else if (step === 'code' || step === 'start') showAuth(step); else showApp(); }
