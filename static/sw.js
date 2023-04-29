
const resources = [
  "./dist/app.js",
  "./css/globals.css",
  "./css/frontpage.css",
  "./css/inputs.css",
  "./css/pages/add-database.css",
  "./css/pages/view-database.css",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("sw-cache").then(function (cache) {
      return Promise.all(resources.map((resource) => cache.add(resource)));
    }),
  );
});

async function getWindowURL(event) {
  const clientId = event.clientId;

  if (clientId && clients.get) {
    const client = await clients.get(clientId);
    return new URL(client.url);
  } else {
    const allClients = await clients.matchAll({type: 'window'});
    const filtered = allClients.filter(client => client.id === clientId);

    if (filtered.length > 0) {
      return new URL(filtered[0].url);
    }
  }
}

async function receiveShare(event) {
  const formData = await event.request.formData();

  const windowUrl = await getWindowURL(event);
  const redirectUrl = '/'

  event.ports[0].postMessage({
    type: 'share-target',
    data: {
      url: formData.length()
    }
  });


  return Response.redirect('/', 303);
}

self.addEventListener("fetch", function (event) {
  // -- intercept web-shares to Borg
  if (event.request.method === 'POST' && event.request?.url?.pathname === '/_web-share-target') {
    return receiveShare(event);
  }

  // respond with any cached results
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }),
  );
});

// communication between application and service-worker

function onAddCard(event) {
  event.ports[0].postMessage({ type: 'synced' });
}

function routeMessage(event) {
  if (event.data.type === 'add-card') {
    onAddCard();
  }
}

self.addEventListener('message', routeMessage);
