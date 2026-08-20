const CACHE_NAME = "katalog-langganan-v1";
const APP_SHELL = [
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png"
];

// Pasang: simpan app shell dalam cache supaya app boleh dibuka tanpa internet.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Aktif: buang cache versi lama.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: app shell guna "cache-first". Data CSV Google Sheets sentiasa
// diambil terus dari internet (network) supaya harga terkini dipaparkan.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Jangan cache permintaan CSV dari Google Sheets - biar sentiasa live.
  if (url.hostname.includes("docs.google.com")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => cached);
    })
  );
});
