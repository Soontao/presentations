// update cache version after release
const CACHE_VERSION = 'DEFAULT_CACHE';

const CACHE_STATIC = 'CACHE_STATIC_RES';

const STATIC_RESOURCE_HOST = [
  "cdn.jsdelivr.net",
  "openui5.hana.ondemand.com",
  "cdnjs.cloudflare.com",
  "res.cloudinary.com",
  "cap.cloud.sap",
  "kroki.io",
]

/**
 * @param {Request} request 
 */
function isStaticResource(request) {
  if (typeof request?.url === 'string') {
    return STATIC_RESOURCE_HOST.find(s => request.url.includes(s)) !== undefined
  }
  return false
}

async function refresh(request) {
  const cache = isStaticResource(request) ? await caches.open(CACHE_STATIC) : await caches.open(CACHE_VERSION);
  const response = await fetch(request)
  cache.put(request, response.clone())
  return response
}

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', async function (event) {
  // clean all old cache
  event.waitUntil(
    caches.keys().then((cacheKeys) => Promise.all(
      cacheKeys
        .filter(key => key !== CACHE_VERSION && key !== CACHE_STATIC)
        .map(cacheKey => caches.delete(cacheKey))
    ))
  )
});

self.addEventListener('fetch', function (event) {

  // only GET method
  if (event.request.method !== 'GET') {
    return event.respondWith(fetch(event.request))
  }

  event.respondWith((async function () {

    const cache = await caches.open(CACHE_VERSION);
    let response = await cache.match(event.request)
    if (response === undefined) {
      response = await refresh(event.request)
    }
    return response

  })());

});


