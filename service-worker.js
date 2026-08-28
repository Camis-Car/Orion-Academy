const CACHE_NAME = 'orion-academy-pwa-v50';
const CORE_FILES = [
  './',
  './index.html',
  './offline.html',
  './manifest.webmanifest',
  './orion-icon.svg',
  './menu-links.js',
  './pwa.js',
  './cadastro.html',
  './minha-jornada.html',
  './alimentacao-e-estudos.html',
  './cronometro-estudos.html',
  './guia-enem.html',
  './questoes-enem.html',
  './calendario-vestibulando.html',
  './vestibulares-seriados.html',
  './notas-vestibulares-seriados.js',
  './countdown-enem.html',
  './busca.html',
  './entenda-escolhas.html',
  './favoritos.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ORION_SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      return response;
    }).catch(async () => (await caches.match(request)) || (await caches.match('./offline.html'))));
    return;
  }

  event.respondWith(caches.match(request).then((cached) => {
    const fresh = fetch(request).then((response) => {
      if (response && response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
      return response;
    });
    return cached || fresh;
  }));
});
