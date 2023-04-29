import { AppEvents } from '../static/js/app-events.js';

const resources = [
  "./dist/app.js",
  "./css/globals.css",
  "./css/frontpage.css",
  "./css/inputs.css",
  "./css/add-database.css",
  "./css/view-database.css",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("sw-cache").then(function (cache) {
      return Promise.all(resources.map((resource) => cache.add(resource)));
    }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }),
  );
});

// fetch

function onAddCard(event) {
  event.ports[0].postMessage({ type: 'synced' });
}

function routeMessage(event) {
  if (event.data.type === 'add-card') {
    onAddCard();
  }
}

self.addEventListener('message', routeMessage);
