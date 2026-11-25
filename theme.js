/* Pulim — yorug' / qorong'i rejim. Tanlov: light | dark | auto (qurilma sozlamasi).
   Sahifa oq «miltillab» ketmasligi uchun boshlang'ich qiymat index.html <head> ichida qo'llanadi. */
const THEME = {
  K: 'hisobchi-theme',
  get mode() { const m = localStorage.getItem(this.K); return m === 'light' || m === 'dark' ? m : 'auto' },
  get dark() { return document.documentElement.dataset.theme === 'dark' },
  sys: matchMedia('(prefers-color-scheme: dark)'),
  apply() {
    const t = this.mode === 'auto' ? (this.sys.matches ? 'dark' : 'light') : this.mode;
    document.documentElement.dataset.theme = t;
    const mc = document.querySelector('meta[name=theme-color]'); if (mc) mc.content = t === 'dark' ? '#0E121B' : '#EEF1F4';
  },
  set(m) { if (m === 'auto') localStorage.removeItem(this.K); else localStorage.setItem(this.K, m); this.apply(); this.refresh() },
  toggle() { this.set(this.dark ? 'light' : 'dark') },
  refresh() { document.querySelectorAll('[data-thm]').forEach(el => { el.outerHTML = el.dataset.thm === 'btn' ? themeBtn() : themeSwitch(el.dataset.thm === 'wide') }) },
};
THEME.apply();
THEME.sys.addEventListener('change', () => { if (THEME.mode === 'auto') { THEME.apply(); THEME.refresh() } });
const themeSwitch = wide => `<div class="thm ${wide ? 'wide' : ''}" data-thm="${wide ? 'wide' : 'seg'}" role="group" aria-label="${L("Ko'rinish")}">${[['light', 'sun', "Yorug'"], ['dark', 'moon', "Qorong'i"], ['auto', 'monitor', 'Tizim']].map(([k, i, n]) => `<button type="button" class="${THEME.mode === k ? 'on' : ''}" data-a="theme" data-v="${k}" aria-pressed="${THEME.mode === k}">${ico(i)}${L(n)}</button>`).join('')}</div>`;
const themeBtn = () => `<button type="button" class="thm-btn" data-thm="btn" data-a="theme" data-v="toggle" aria-label="${L(THEME.dark ? "Yorug' rejim" : "Qorong'i rejim")}" title="${L(THEME.dark ? "Yorug' rejim" : "Qorong'i rejim")}">${ico(THEME.dark ? 'sun' : 'moon')}</button>`;
document.addEventListener('click', e => { const el = e.target.closest('[data-a="theme"]'); if (!el) return; e.stopPropagation(); el.dataset.v === 'toggle' ? THEME.toggle() : THEME.set(el.dataset.v); if (typeof toast === 'function') toast(L(THEME.dark ? "Qorong'i rejim yoqildi" : "Yorug' rejim yoqildi")) }, true);
