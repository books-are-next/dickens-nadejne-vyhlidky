/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-55cc28f';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./nadejne_vyhlidky_002.html","./nadejne_vyhlidky_007.html","./nadejne_vyhlidky_006.html","./nadejne_vyhlidky_005.html","./nadejne_vyhlidky_009.html","./nadejne_vyhlidky_008.html","./nadejne_vyhlidky_010.html","./nadejne_vyhlidky_012.html","./nadejne_vyhlidky_013.html","./nadejne_vyhlidky_011.html","./nadejne_vyhlidky_015.html","./nadejne_vyhlidky_014.html","./nadejne_vyhlidky_016.html","./nadejne_vyhlidky_019.html","./nadejne_vyhlidky_018.html","./nadejne_vyhlidky_017.html","./nadejne_vyhlidky_021.html","./nadejne_vyhlidky_020.html","./nadejne_vyhlidky_022.html","./nadejne_vyhlidky_023.html","./nadejne_vyhlidky_024.html","./nadejne_vyhlidky_026.html","./nadejne_vyhlidky_025.html","./nadejne_vyhlidky_027.html","./nadejne_vyhlidky_029.html","./nadejne_vyhlidky_028.html","./nadejne_vyhlidky_032.html","./nadejne_vyhlidky_031.html","./nadejne_vyhlidky_033.html","./nadejne_vyhlidky_030.html","./nadejne_vyhlidky_034.html","./nadejne_vyhlidky_035.html","./nadejne_vyhlidky_037.html","./nadejne_vyhlidky_038.html","./nadejne_vyhlidky_036.html","./nadejne_vyhlidky_039.html","./nadejne_vyhlidky_040.html","./nadejne_vyhlidky_041.html","./nadejne_vyhlidky_042.html","./nadejne_vyhlidky_043.html","./nadejne_vyhlidky_044.html","./nadejne_vyhlidky_045.html","./nadejne_vyhlidky_046.html","./nadejne_vyhlidky_047.html","./nadejne_vyhlidky_048.html","./nadejne_vyhlidky_049.html","./nadejne_vyhlidky_050.html","./nadejne_vyhlidky_051.html","./nadejne_vyhlidky_052.html","./nadejne_vyhlidky_053.html","./nadejne_vyhlidky_054.html","./nadejne_vyhlidky_055.html","./nadejne_vyhlidky_056.html","./nadejne_vyhlidky_057.html","./nadejne_vyhlidky_058.html","./nadejne_vyhlidky_059.html","./nadejne_vyhlidky_060.html","./nadejne_vyhlidky_061.html","./nadejne_vyhlidky_062.html","./nadejne_vyhlidky_063.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_nadejne_vyhlidky.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
