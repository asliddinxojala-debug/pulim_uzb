/* Pulim 6.0 — hisoblar (kirish, ro'yxatdan o'tish, tiklash).
   Hisoblar shu qurilmada saqlanadi: parollar PBKDF2-SHA256 (150 000 takror) bilan xeshlanadi, ochiq holda saqlanmaydi.
   Har bir foydalanuvchining ma'lumoti alohida kalitda: hisobchi-u-<id>.
   Bulutga o'tkazish uchun AUTH.* funksiyalarini Firebase/Supabase chaqiruvlari bilan almashtirish kifoya. */
const AUTH = {
  U: 'hisobchi-users', S: 'hisobchi-session', L: 'hisobchi-lock',
  users() { try { return JSON.parse(localStorage.getItem(this.U)) || [] } catch { return [] } },
  save(l) { localStorage.setItem(this.U, JSON.stringify(l)) },
  find(email) { email = this.norm(email); return this.users().find(u => u.email === email) || null },
  norm: e => String(e || '').trim().toLowerCase(),
  session() {
    let s = null;
    try { s = JSON.parse(sessionStorage.getItem(this.S) || localStorage.getItem(this.S)) } catch {}
    if (!s || s.exp < Date.now()) { this.end(); return null }
    return this.users().find(u => u.id === s.uid) || null;
  },
  start(u, remember) {
    const s = JSON.stringify({ uid: u.id, exp: Date.now() + (remember ? 30 : 1) * 864e5 });
    this.end(); (remember ? localStorage : sessionStorage).setItem(this.S, s);
    const l = this.users(), i = l.findIndex(x => x.id === u.id);
    if (i >= 0) { l[i].last = Date.now(); this.save(l) }
  },
  end() { localStorage.removeItem(this.S); sessionStorage.removeItem(this.S) },
  update(u) { const l = this.users(), i = l.findIndex(x => x.id === u.id); if (i >= 0) { l[i] = u; this.save(l) } },
  remove(u) {
    this.save(this.users().filter(x => x.id !== u.id));
    Object.keys(localStorage).filter(k => k.startsWith('hisobchi-u-' + u.id)).forEach(k => localStorage.removeItem(k));
    this.end();
  },
  // 5 ta noto'g'ri urinishdan keyin 60 soniya kutish
  lockLeft(email) { let o = {}; try { o = JSON.parse(localStorage.getItem(this.L)) || {} } catch {} const r = o[this.norm(email)]; return r && r.until > Date.now() ? Math.ceil((r.until - Date.now()) / 1000) : 0 },
  fail(email) {
    let o = {}; try { o = JSON.parse(localStorage.getItem(this.L)) || {} } catch {}
    const k = this.norm(email); let r = o[k] || { n: 0, until: 0 };
    if (r.until && r.until <= Date.now()) r = { n: 0, until: 0 };
    r.n++; if (r.n >= 5) r.until = Date.now() + 60000;
    o[k] = r; localStorage.setItem(this.L, JSON.stringify(o)); return Math.max(0, 5 - r.n);
  },
  clearFail(email) { let o = {}; try { o = JSON.parse(localStorage.getItem(this.L)) || {} } catch {} delete o[this.norm(email)]; localStorage.setItem(this.L, JSON.stringify(o)) },
};

/* ---- xeshlash ---- */
const _te = new TextEncoder();
const _b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
const randId = (n = 16) => { const a = new Uint8Array(n); crypto.getRandomValues(a); return [...a].map(x => x.toString(16).padStart(2, '0')).join('') };
function sha256hex(str) { // zaxira: crypto.subtle bo'lmagan muhit uchun
  const K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  const b = [..._te.encode(str)], l = b.length * 8; b.push(0x80); while (b.length % 64 !== 56) b.push(0);
  for (let i = 7; i >= 0; i--) b.push(Math.floor(l / 2 ** (i * 8)) & 255);
  let H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]; const r = (x, n) => (x >>> n) | (x << (32 - n));
  for (let o = 0; o < b.length; o += 64) {
    const w = []; for (let i = 0; i < 16; i++) w[i] = (b[o+i*4] << 24) | (b[o+i*4+1] << 16) | (b[o+i*4+2] << 8) | b[o+i*4+3];
    for (let i = 16; i < 64; i++) { const s0 = r(w[i-15],7) ^ r(w[i-15],18) ^ (w[i-15] >>> 3), s1 = r(w[i-2],17) ^ r(w[i-2],19) ^ (w[i-2] >>> 10); w[i] = (w[i-16] + s0 + w[i-7] + s1) | 0 }
    let [a, bb, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) { const t1 = (h + (r(e,6) ^ r(e,11) ^ r(e,25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0, t2 = ((r(a,2) ^ r(a,13) ^ r(a,22)) + ((a & bb) ^ (a & c) ^ (bb & c))) | 0; h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = bb; bb = a; a = (t1 + t2) | 0 }
    H = H.map((x, i) => (x + [a, bb, c, d, e, f, g, h][i]) | 0);
  }
  return H.map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
}
async function pwHash(pw, salt) {
  if (window.crypto && crypto.subtle) {
    const k = await crypto.subtle.importKey('raw', _te.encode(pw), 'PBKDF2', false, ['deriveBits']);
    return 'p1:' + _b64(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: _te.encode(salt), iterations: 150000, hash: 'SHA-256' }, k, 256));
  }
  let h = salt + pw; for (let i = 0; i < 4000; i++) h = sha256hex(h + salt); return 's1:' + h;
}
const recCode = () => { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', a = new Uint8Array(12); crypto.getRandomValues(a); const s = [...a].map(x => A[x % A.length]).join(''); return s.slice(0, 4) + '-' + s.slice(4, 8) + '-' + s.slice(8) };

async function signUp({ name, email, password }) {
  email = AUTH.norm(email);
  if (AUTH.find(email)) throw { f: 'email', m: "Bu email bilan hisob allaqachon bor. Kirish bo'limidan kiring." };
  const first = AUTH.users().length === 0, salt = randId(), rsalt = randId(), code = recCode();
  const u = { id: randId(8), name: name.trim(), email, salt, hash: await pwHash(password, salt), rsalt, rhash: await pwHash(code.replace(/-/g, ''), rsalt), createdAt: Date.now(), last: Date.now() };
  AUTH.save([...AUTH.users(), u]);
  // Birinchi hisob: hisobsiz kiritilgan eski ma'lumotlarni shu hisobga ko'chiramiz
  const legacy = localStorage.getItem('hisobchi-v2');
  if (first && legacy) { localStorage.setItem('hisobchi-u-' + u.id, legacy); u.migrated = true; AUTH.update(u) }
  return { u, code };
}
async function signIn({ email, password }) {
  const wait = AUTH.lockLeft(email); if (wait) throw { f: 'password', m: `Juda ko'p urinish. ${wait} soniyadan keyin qayta urinib ko'ring.` };
  const u = AUTH.find(email);
  if (!u || (await pwHash(password, u.salt)) !== u.hash) {
    const left = AUTH.fail(email);
    throw { f: 'password', m: left === 0 ? "Juda ko'p urinish. 60 soniyadan keyin qayta urinib ko'ring." : left <= 2 ? `Email yoki parol noto'g'ri. Yana ${left} ta urinish qoldi.` : "Email yoki parol noto'g'ri." };
  }
  AUTH.clearFail(email); return u;
}
async function resetPw({ email, code, password }) {
  const u = AUTH.find(email); const wait = AUTH.lockLeft('reset:' + email);
  if (wait) throw { f: 'code', m: `Juda ko'p urinish. ${wait} soniyadan keyin qayta urinib ko'ring.` };
  if (!u || (await pwHash(String(code).toUpperCase().replace(/[^A-Z0-9]/g, ''), u.rsalt)) !== u.rhash) { AUTH.fail('reset:' + email); throw { f: 'code', m: "Email yoki tiklash kodi noto'g'ri." } }
  u.salt = randId(); u.hash = await pwHash(password, u.salt); AUTH.update(u); AUTH.clearFail(email); return u;
}
async function changePw(u, cur, next) {
  if ((await pwHash(cur, u.salt)) !== u.hash) throw { f: 'cur', m: "Joriy parol noto'g'ri." };
  u.salt = randId(); u.hash = await pwHash(next, u.salt); AUTH.update(u);
}
async function newRecovery(u) { const code = recCode(); u.rsalt = randId(); u.rhash = await pwHash(code.replace(/-/g, ''), u.rsalt); AUTH.update(u); return code }
function pwScore(p) {
  let s = 0; if (p.length >= 8) s++; if (p.length >= 12) s++; if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++; if (/\d/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++;
  return Math.min(4, s);
}

const USER = AUTH.session();
window.AUTH_KEY = USER ? 'hisobchi-u-' + USER.id : 'hisobchi-nouser';
