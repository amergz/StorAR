const CACHE_NAME = "stor-ar-v2";
const APP_SHELL = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

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

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Data luar (Google Sheets, imej QR) - biar browser uruskan terus, tak sentuh langsung.
  if (url.hostname.includes("docs.google.com") || url.hostname.includes("postimg.cc")) {
    return;
  }

  const isAppShellDoc =
    event.request.mode === "navigate" ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/manifest.json");

  if (isAppShellDoc) {
    // NETWORK-FIRST: sentiasa cuba tarik versi terbaru dari server dulu.
    // Ini penting supaya update yang di-upload ke GitHub terus nampak,
    // bukan versi lama yang tersekat dalam cache peranti pengguna.
    // Cache cuma digunakan sebagai fallback bila tiada internet.
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Fail statik lain (ikon dll.) - cache-first sudah cukup selamat,
  // sebab ikon jarang berubah dan tak perlu update serta-merta.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => cached);
    })
  );
});
