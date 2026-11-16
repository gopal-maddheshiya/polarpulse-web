const CACHE_NAME = 'polaris-cache-v1'
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.svg',
  '/site.webmanifest',
  '/og-image.jpg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache warning:', err)
      })
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const req = event.request

  // Only handle GET requests
  if (req.method !== 'GET') return

  // Do not intercept chrome-extension or external analytics
  if (!req.url.startsWith(self.location.origin)) return

  // Navigation requests (HTML pages)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => {
        return caches.match(req).then((cached) => {
          return cached || caches.match('/offline.html')
        })
      })
    )
    return
  }

  // Static assets (CSS, JS, images, SVG, fonts): Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cachedResp) => {
      const fetchPromise = fetch(req)
        .then((networkResp) => {
          if (networkResp && networkResp.status === 200) {
            const respClone = networkResp.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(req, respClone))
          }
          return networkResp
        })
        .catch(() => cachedResp)

      return cachedResp || fetchPromise
    })
  )
})
