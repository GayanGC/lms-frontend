const CACHE_NAME = "lms-cache-v1";

// List of files to save for offline use
const ASSETS_TO_CACHE = [
    "/lms-frontend/",
    "/lms-frontend/index.html",
    "/lms-frontend/login.html",
    "/lms-frontend/assets/css/main.css",
    "/lms-frontend/assets/js/router.js",
    "/lms-frontend/assets/js/auth.js",
    "/lms-frontend/assets/js/theme.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
];

// 1. Install Event: Runs when the app is first installed
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching assets...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. Fetch Event: Runs when the app requests a file
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // If file is in cache, use it. If not, fetch from internet.
            return response || fetch(event.request);
        })
    );
});