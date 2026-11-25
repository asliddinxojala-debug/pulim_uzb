/* Pulim 6.0 Service Worker
   1) Oflayn ishlash: ilova fayllari keshda saqlanadi (avval tarmoq, internet bo'lmasa kesh).
   2) Tizim bildirishnomasini ko'rsatish va bosilganda ilovani ochish.
   DIQQAT: bu fayl vaqti kelganda o'zi uyg'onib eslatma yubormaydi — buning uchun server push kerak (README). */
const CACHE = 'pulim-v6.5';
const SHELL = ['./', 'index.html', 'style.css', 'i18n.js', 'i18n-dict.js', 'auth.js', 'core.js', 'app.js', 'theme.js', 'admin.js', 'authui.js', 'fonts/onest-400.woff2', 'fonts/onest-500.woff2', 'fonts/onest-600.woff2', 'fonts/onest-700.woff2', 'fonts/unbounded-600.woff2', 'manifest.webmanifest', 'logo.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => (k.startsWith('hisobchi-') || k.startsWith('pulim-')) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true })
        .then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(l => l.length ? l[0].focus() : clients.openWindow('./')));
});
