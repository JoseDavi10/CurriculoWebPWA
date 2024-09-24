// Nome do cache
const CACHE_NAME = 'meu-app-cache-v1';
// Arquivos a serem armazenados em cache
const urlsToCache = [
  '/',
  '/index.html',
  '/estilo.css',  // Inclua seus arquivos CSS
  '/script.js',  // Inclua seus arquivos JS
  '/manifest.json'
];

// Instalação do service worker e cache dos recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Arquivos em cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Responder com recursos do cache ou buscar na rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache ou busca na rede se não estiver no cache
        return response || fetch(event.request);
      })
  );
});

// Atualização do cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
