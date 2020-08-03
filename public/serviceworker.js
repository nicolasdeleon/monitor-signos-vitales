const CACHE_NAME = "v1";

const urlsToCache = [
    'index.html',
    'App.js',
    'App.css',
    'index.js'
];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache", cache);

                return cache.addAll(urlsToCache);
            })
        );
})

// Fetch for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                console.log("Event request:", event.request)
                return fetch(event.request)
                    .catch(() => caches.match('index.html'));
            })
        );
});

// Activate SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cachesNames) => Promise.all(
            cachesNames.map((chacheName) => {
                if(!cacheWhiteList.includes(chacheName)) {
                    return caches.delete(chacheName);
                 }
            })
        ))
    )

})
