// update cache version after release
const CACHE_VERSION = 'CACHE_REV_1249972';


async function refresh(request) {
  const cache = await caches.open(CACHE_VERSION);
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
        .filter(key => key !== CACHE_VERSION)
        .map(cacheKey => caches.delete(cacheKey))
    )
    )
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


