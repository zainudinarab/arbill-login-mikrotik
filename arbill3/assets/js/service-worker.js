const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/assets/img/favicon.png',
    '/assets/img/loading.gif',
    '/assets/css/style.css',
    '/assets/js/lib/bootstrap.bundle.min.js',
    '/assets/js/base.js',
    '/assets/js/plugins/splide/splide.min.js',
    '/chat.js',
    'https://www.intergram.xyz/js/widget.js'
];

// Install service worker dan cache file
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch aset dari cache jika tersedia
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Aktivasi dan hapus cache lama jika ada
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
