const CACHE_NAME = 'orion-academy-pwa-v75';
const CORE_FILES = [
  './',
  './index.html',
  './feira.html',
  './feira.js',
  './feira-home.js',
  './feira-app.css',
  './feira-paths.css',
  './feira-local.css',
  './feira-vocacional.html',
  './feira-faculdades.html',
  './feira-militares.html',
  './feira-exterior.html',
  './sisu-2026-nacional.js',
  './offline.html',
  './manifest.webmanifest',
  './orion-icon.svg',
  './menu-links.js',
  './acessibilidade.js',
  './sisu-loader.js',
  './acompanhamentos.js',
  './acompanhamentos-nacional.js',
  './dados-revisao/fontes-oficiais-status.json',
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
  './favoritos.html',
  './como-usamos-informacoes.html',
  './equipe-editorial.html',
  './acessibilidade-orion.html',
  './status-fontes.html',
  './vestibulares-seriados.html',
  './notas-vestibulares-seriados.js',
  './vestibulares-seriados-atualizacoes.js',
  './sisu-2026-estados/ac.js','./sisu-2026-estados/al.js','./sisu-2026-estados/am.js','./sisu-2026-estados/ap.js','./sisu-2026-estados/ba.js','./sisu-2026-estados/ce.js','./sisu-2026-estados/df.js','./sisu-2026-estados/es.js','./sisu-2026-estados/go.js','./sisu-2026-estados/ma.js','./sisu-2026-estados/mg.js','./sisu-2026-estados/ms.js','./sisu-2026-estados/mt.js','./sisu-2026-estados/pa.js','./sisu-2026-estados/pb.js','./sisu-2026-estados/pe.js','./sisu-2026-estados/pi.js','./sisu-2026-estados/pr.js','./sisu-2026-estados/rj.js','./sisu-2026-estados/rn.js','./sisu-2026-estados/ro.js','./sisu-2026-estados/rr.js','./sisu-2026-estados/rs.js','./sisu-2026-estados/sc.js','./sisu-2026-estados/se.js','./sisu-2026-estados/sp.js','./sisu-2026-estados/to.js'
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

  if (url.pathname.includes('/dados-revisao/')) {
    event.respondWith(fetch(request).then((response) => {
      if (response && response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
      return response;
    }).catch(() => caches.match(request)));
    return;
  }

  event.respondWith(fetch(request).then((response) => {
    if (response && response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
    return response;
  }).catch(() => caches.match(request)));
});
