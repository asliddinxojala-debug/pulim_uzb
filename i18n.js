/* Pulim 6.0 — tillar: o'zbek (asosiy), rus, ingliz.
   Matnlar o'zbekcha yoziladi; DICT ularning tarjimasini saqlaydi (i18n-dict.js).
   1) L('matn {0}', x) — koddagi tarkibiy gaplar uchun.
   2) Qolgan barcha matnlar sahifaga chiqqanda avtomatik tarjima qilinadi (MutationObserver).
      Raqamlar {n}, pul summalari {m} bilan almashtirilib qidiriladi: "Oy tugashiga {n} kun qoldi." */
const LANGS = [['uz', "O'zbekcha", 'UZ'], ['ru', 'Русский', 'RU'], ['en', 'English', 'EN']];
const LANG = (() => {
  const s = localStorage.getItem('hisobchi-lang'); if (LANGS.some(l => l[0] === s)) return s;
  const n = (navigator.language || '').slice(0, 2).toLowerCase(); return n === 'ru' ? 'ru' : 'uz';
})();
document.documentElement.lang = LANG;
const DICT = { ru: {}, en: {} };
const CUR = { uz: "so'm", ru: 'сум', en: 'UZS' }[LANG];
const MONTHS = {
  uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
  ru: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};
const MGEN_RU = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const MSHORT = {
  uz: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'],
  ru: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};
const WDAYS = {
  uz: ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba'],
  ru: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};
const WSHORT = { uz: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'], ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] };
const cap1 = s => s ? s[0].toUpperCase() + s.slice(1) : s;
/* "25-noyabr" / "25 ноября" / "November 25" (yil boshqa bo'lsa qo'shiladi) */
function dateText(y, m, d) {
  const yy = y !== new Date().getFullYear() ? ' ' + y : '';
  if (LANG === 'ru') return `${d} ${MGEN_RU[m]}${yy}`;
  if (LANG === 'en') return `${MONTHS.en[m]} ${d}${yy ? ',' + yy : ''}`;
  return `${d}-${MONTHS.uz[m]}${yy}`;
}
const monthTitle = (m, y) => cap1(MONTHS[LANG][m]) + (y ? ' ' + y : '');

function L(s, ...a) {
  if (LANG !== 'uz' && DICT[LANG][s] === undefined) MISS.add(s);
  let r = (LANG !== 'uz' && DICT[LANG][s]) || s;
  a.forEach((v, i) => { r = r.split('{' + i + '}').join(v) });
  return LANG === 'uz' ? r : r.replace(/(\d) so'm/g, '$1 ' + CUR);
}
function setLang(l) { localStorage.setItem('hisobchi-lang', l); location.reload() }
const langSwitch = cls => `<div class="lang ${cls || ''}" translate="no" role="group" aria-label="Til / Язык / Language">${LANGS.map(([k, , s]) => `<button type="button" class="${k === LANG ? 'on' : ''}" data-a="lang" data-l="${k}" aria-pressed="${k === LANG}" title="${LANGS.find(x => x[0] === k)[1]}">${s}</button>`).join('')}</div>`;

/* ---- sahifadagi matnni avtomatik tarjima qilish ---- */
const MONEY_RE = /[−+-]?\d+(?:[  ]\d{3})*(?:[.,]\d+)? so'm/g, NUM_RE = /[−+-]?\d+(?:[  ]\d{3})*(?:[.,]\d+)?/g;
const MISS = new Set();
function trText(s) {
  const t = s.trim(); if (!t || LANG === 'uz' || !/[a-zA-Z]/.test(t)) return s;
  const D = DICT[LANG]; let r = D[t];
  if (r === undefined) {
    const vals = [];
    const key = t.replace(MONEY_RE, m => { vals.push(['m', m]); return '{m}' }).replace(NUM_RE, m => { vals.push(['n', m]); return '{n}' });
    r = D[key];
    if (r === undefined) { if (key !== t || t.length > 1) MISS.add(key); return t.includes("so'm") ? s.replace(/so'm/g, CUR) : s }
    // qiymatlarni asl tartibida qaytarish: {m} va {n} alohida navbatda
    const ms = vals.filter(v => v[0] === 'm').map(v => v[1].replace("so'm", CUR)), ns = vals.filter(v => v[0] === 'n').map(v => v[1]);
    r = r.replace(/\{m\}/g, () => ms.shift()).replace(/\{n\}/g, () => ns.shift());
  }
  return s.replace(t, r);
}
const ATTRS = ['placeholder', 'title', 'aria-label'];
function translate(root) {
  if (LANG === 'uz' || !root) return;
  if (root.nodeType === 3) { if (!skip(root.parentNode)) { const v = trText(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v } return }
  if (root.nodeType !== 1 || skip(root)) return;
  const els = [root, ...root.querySelectorAll('*')];
  for (const el of els) { if (skip(el)) continue; for (const a of ATTRS) if (el.hasAttribute(a)) { const v = el.getAttribute(a), n = trText(v); if (n !== v) el.setAttribute(a, n) } }
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { if (skip(n.parentNode)) continue; const v = trText(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v }
}
const skip = el => !el || el.nodeType !== 1 || /^(SCRIPT|STYLE|TEXTAREA)$/.test(el.tagName) || !!el.closest('[translate="no"]');
if (LANG !== 'uz') {
  new MutationObserver(ms => { for (const m of ms) { if (m.type === 'characterData') translate(m.target); else m.addedNodes.forEach(translate) } })
    .observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  const _t = Object.getOwnPropertyDescriptor(Document.prototype, 'title');
  Object.defineProperty(document, 'title', { get() { return _t.get.call(this) }, set(v) { _t.set.call(this, trText(v)) } });
}
if (LANG !== 'uz') document.addEventListener('DOMContentLoaded', () => translate(document.body));
