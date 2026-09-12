const CACHE_NAME = "smile-grade3-offline-v6";
const AUDIO_CACHE_NAME = "smile-audio-cache";

// Core static assets and app shell
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.png",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/favicon.ico",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-maskable-512.png",
  "/apple-touch-icon.png",
  "/logo.png"
];

// All dedicated lesson illustrations for all 12 units
const LESSON_ILLUSTRATIONS = [
  // Unit 1
  "/illustrations/lessons/u1_l1.jpg",
  "/illustrations/lessons/u1_l2.jpg",
  "/illustrations/lessons/u1_l3.jpg",
  "/illustrations/lessons/u1_l4.jpg",
  "/illustrations/lessons/u1_l5.jpg",
  "/illustrations/lessons/u1_l6.jpg",
  "/illustrations/lessons/u1_l7.jpg",
  "/illustrations/lessons/u1_l8.jpg",
  "/illustrations/lessons/u1_l1.svg",
  "/illustrations/lessons/u1_l2.svg",
  "/illustrations/lessons/u1_l3.svg",
  "/illustrations/lessons/u1_l4.svg",
  "/illustrations/lessons/u1_l5.svg",
  "/illustrations/lessons/u1_l6.svg",
  "/illustrations/lessons/u1_l7.svg",
  "/illustrations/lessons/u1_l8.svg",
  // Unit 2
  "/illustrations/lessons/u2_l1.jpg",
  "/illustrations/lessons/u2_l2.jpg",
  "/illustrations/lessons/u2_l3.jpg",
  "/illustrations/lessons/u2_l4.jpg",
  "/illustrations/lessons/u2_l5.jpg",
  "/illustrations/lessons/u2_l6.jpg",
  "/illustrations/lessons/u2_l7.jpg",
  "/illustrations/lessons/u2_l8.jpg",
  "/illustrations/lessons/u2_l1.svg",
  "/illustrations/lessons/u2_l2.svg",
  "/illustrations/lessons/u2_l3.svg",
  "/illustrations/lessons/u2_l4.svg",
  "/illustrations/lessons/u2_l5.svg",
  "/illustrations/lessons/u2_l6.svg",
  "/illustrations/lessons/u2_l7.svg",
  "/illustrations/lessons/u2_l8.svg",
  // Unit 3
  "/illustrations/lessons/u3_l1.jpg",
  "/illustrations/lessons/u3_l2.jpg",
  "/illustrations/lessons/u3_l3.jpg",
  "/illustrations/lessons/u3_l4.jpg",
  "/illustrations/lessons/u3_l5.jpg",
  "/illustrations/lessons/u3_l6.jpg",
  "/illustrations/lessons/u3_l7.jpg",
  "/illustrations/lessons/u3_l8.jpg",
  "/illustrations/lessons/u3_l1.svg",
  "/illustrations/lessons/u3_l2.svg",
  "/illustrations/lessons/u3_l3.svg",
  "/illustrations/lessons/u3_l4.svg",
  "/illustrations/lessons/u3_l5.svg",
  "/illustrations/lessons/u3_l6.svg",
  "/illustrations/lessons/u3_l7.svg",
  "/illustrations/lessons/u3_l8.svg",
  // Unit 4 (100% Complete)
  "/illustrations/lessons/u4_l1.jpg",
  "/illustrations/lessons/u4_l2.jpg",
  "/illustrations/lessons/u4_l3.jpg",
  "/illustrations/lessons/u4_l4.jpg",
  "/illustrations/lessons/u4_l5.jpg",
  "/illustrations/lessons/u4_l6.jpg",
  "/illustrations/lessons/u4_l7.jpg",
  "/illustrations/lessons/u4_l8.jpg",
  // Unit 5
  "/illustrations/lessons/u5_l1.jpg",
  "/illustrations/lessons/u5_l2.jpg",
  "/illustrations/lessons/u5_l3.jpg",
  "/illustrations/lessons/u5_l4.jpg",
  "/illustrations/lessons/u5_l5.jpg",
  "/illustrations/lessons/u5_l6.jpg",
  "/illustrations/lessons/u5_l7.jpg",
  "/illustrations/lessons/u5_l8.jpg",
  // Unit 6
  "/illustrations/lessons/u6_l1.jpg",
  "/illustrations/lessons/u6_l2.jpg",
  "/illustrations/lessons/u6_l3.jpg",
  "/illustrations/lessons/u6_l4.jpg",
  "/illustrations/lessons/u6_l5.jpg",
  "/illustrations/lessons/u6_l6.jpg",
  "/illustrations/lessons/u6_l7.jpg",
  "/illustrations/lessons/u6_l8.jpg",
  // Unit 7
  "/illustrations/lessons/u7_l1.jpg",
  "/illustrations/lessons/u7_l2.jpg",
  "/illustrations/lessons/u7_l3.jpg",
  "/illustrations/lessons/u7_l4.jpg",
  // Flagship artworks & vectors for Units 8 to 12
  "/illustrations/lessons/u8_l5.jpg",
  "/illustrations/lessons/u9_l7.jpg",
  "/illustrations/lessons/u10_l4.jpg",
  "/illustrations/lessons/u11_l1.jpg",
  "/illustrations/lessons/u12_l1.jpg",
  "/illustrations/lessons/u12_l6.jpg"
];

// Dynamically generate all SVG fallbacks for Units 4 to 12
for (let u = 4; u <= 12; u++) {
  for (let l = 1; l <= 8; l++) {
    const svgPath = `/illustrations/lessons/u${u}_l${l}.svg`;
    if (!LESSON_ILLUSTRATIONS.includes(svgPath)) {
      LESSON_ILLUSTRATIONS.push(svgPath);
    }
  }
}

const ALL_PRECACHE_ASSETS = [...CORE_ASSETS, ...LESSON_ILLUSTRATIONS];

// Install Event: Cache app shell and all educational illustrations
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("[Service Worker] Pre-caching core assets and illustrations...");
      // Cache core assets first
      try {
        await cache.addAll(CORE_ASSETS);
      } catch (err) {
        console.warn("[Service Worker] Core assets precache issue:", err);
      }

      // Cache illustrations resiliently (continue even if one fails)
      for (const asset of LESSON_ILLUSTRATIONS) {
        try {
          const match = await cache.match(asset);
          if (!match) {
            const resp = await fetch(asset);
            if (resp.ok) {
              await cache.put(asset, resp);
            }
          }
        } catch {
          // Ignore individual fetch failure in offline/restricted environment
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean up outdated legacy caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== AUDIO_CACHE_NAME) {
            console.log("[Service Worker] Deleting outdated cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Robust Cache-First strategy for assets & illustrations, Network-First for dynamic navigation
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Ignore non-GET or unsupported protocols
  if (event.request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // 1. Audio Cache Handler (Youdao / Google Translate / API proxy TTS)
  const isAudio =
    url.pathname.includes("/dictvoice") ||
    url.pathname.includes("/translate_tts") ||
    url.pathname.includes("/api/tts") ||
    event.request.destination === "audio";

  if (isAudio) {
    event.respondWith(
      caches.open(AUDIO_CACHE_NAME).then(async (audioCache) => {
        const cached = await audioCache.match(event.request);
        if (cached) return cached;

        try {
          const netRes = await fetch(event.request);
          if (netRes && netRes.ok) {
            audioCache.put(event.request, netRes.clone());
          }
          return netRes;
        } catch (err) {
          // Return 404 so that browser falls back to window.speechSynthesis
          return new Response("", { status: 404, statusText: "Offline Audio Fallback" });
        }
      })
    );
    return;
  }

  // 2. Cache-First for static assets, local illustrations, icons, scripts & styles
  const isIllustration = url.pathname.startsWith("/illustrations/");
  const isStaticAsset =
    url.pathname.startsWith("/assets/") ||
    url.pathname === "/favicon.png" ||
    url.pathname === "/icon.svg" ||
    url.pathname === "/manifest.json" ||
    event.request.destination === "image" ||
    event.request.destination === "script" ||
    event.request.destination === "style" ||
    event.request.destination === "font";

  if (isIllustration || isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then(async (cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          // If offline and request is an illustration, fallback to default svg/icon if available
          if (isIllustration) {
            const fallback = await caches.match("/favicon.png");
            if (fallback) return fallback;
          }
          throw err;
        }
      })
    );
    return;
  }

  // 3. Navigation Requests (HTML / Page Navigation)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(async (netRes) => {
          if (netRes && netRes.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, netRes.clone());
          }
          return netRes;
        })
        .catch(async () => {
          // Offline navigation fallback: serve cached index.html
          const cachedIndex =
            (await caches.match(event.request)) ||
            (await caches.match("/index.html")) ||
            (await caches.match("/"));
          return cachedIndex || new Response("Offline mode", { status: 200, headers: { "Content-Type": "text/html" } });
        })
    );
    return;
  }

  // 4. Default: Try Cache, then Network, then Cache
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
