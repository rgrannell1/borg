
const resources = [
  './js/styles/add-bookmark-page.js',
  './js/styles/navbar.js',
  './js/styles/shared.js',
  './js/views/app.js',
  './js/views/show-bookmarks-page.js',
  './js/views/add-bookmark-page.js',
  './js/views/navbar.js',
  './js/models/events.js',
  './js/models/status.js',
  './js/models/add-bookmark-states.js',
  './js/services/api.js'
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
