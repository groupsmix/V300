var CACHE_NAME = 'groupsmix-v3';
var STATIC_ASSETS = [
    '/',
    '/assets/css/shared.css',
    '/assets/js/app.js',
    '/assets/js/components.js',
    '/assets/img/favicon.svg'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(k) { return k !== CACHE_NAME; })
                    .map(function(k) { return caches.delete(k); })
            );
        })
    );
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e) {
    var url = new URL(e.request.url);
    if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
    if (url.hostname.includes('supabase')) return;

    e.respondWith(
        caches.match(e.request).then(function(cached) {
            var fetchPromise = fetch(e.request).then(function(response) {
                if (response && response.status === 200 && response.type === 'basic') {
                    var responseClone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(e.request, responseClone);
                    });
                }
                return response;
            }).catch(function() {
                return cached;
            });
            return cached || fetchPromise;
        })
    );
});
