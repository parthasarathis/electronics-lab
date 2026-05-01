const CACHE = 'eleclab-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './shared/nav.js',
  './offline.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Cache-first for shell assets, network-first for device pages
  const url = new URL(e.request.url);

  if (e.request.method !== 'GET') return;

  // Device pages: network-first, fall back to cache, then offline
  if (url.pathname.includes('/devices/')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() =>
          caches.match(e.request).then(r => r || caches.match('./offline.html'))
        )
    );
    return;
  }

  // Shell: cache-first
  e.respondWith(
    caches.match(e.request).then(r =>
      r || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
    ).catch(() => caches.match('./offline.html'))
  );
});
