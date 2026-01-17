/**
 * BIT Repository Service Worker
 * Provides offline caching and improved performance for the PDF viewer application.
 * 
 * @version 2.1.0
 */

const CACHE_NAME = 'bit-repository-v2.2.0';
const STATIC_ASSETS = [
    './',
    './index.html',
    './files.json',
    './manifest.json'
];

// External assets that should be cached
const EXTERNAL_ASSETS = [
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[ServiceWorker] Failed to cache:', error);
            })
    );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[ServiceWorker] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                // Take control of all pages immediately
                return self.clients.claim();
            })
    );
});

/**
 * Fetch event - serve from cache, fallback to network
 * Uses stale-while-revalidate strategy for better performance
 */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    // For PDF files - network first, cache fallback
    if (url.pathname.endsWith('.pdf')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone the response for caching
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(request, responseClone);
                        })
                        .catch((error) => {
                            console.warn('[ServiceWorker] Failed to cache PDF:', error);
                        });
                    return response;
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
        return;
    }
    
    // For files.json - always try network first to get latest updates
    if (url.pathname.endsWith('files.json')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(request, responseClone);
                        })
                        .catch((error) => {
                            console.warn('[ServiceWorker] Failed to cache files.json:', error);
                        });
                    return response;
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
        return;
    }
    
    // For other assets - cache first, network fallback (stale-while-revalidate)
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached response immediately
                const fetchPromise = fetch(request)
                    .then((networkResponse) => {
                        // Update cache in background
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(request, responseClone);
                                })
                                .catch((error) => {
                                    console.warn('[ServiceWorker] Failed to update cache:', error);
                                });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Network failed, return cached or undefined
                        return cachedResponse;
                    });
                
                return cachedResponse || fetchPromise;
            })
    );
});

/**
 * Message handler for cache updates
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME)
            .then(() => {
                console.log('[ServiceWorker] Cache cleared');
                event.ports[0].postMessage({ success: true });
            })
            .catch((error) => {
                console.error('[ServiceWorker] Failed to clear cache:', error);
                event.ports[0].postMessage({ success: false, error: error.message });
            });
    }
});
