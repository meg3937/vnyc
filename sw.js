/* ---------------------------------------------------------------------------
   Mode hors ligne.  La page, les photos, Leaflet et les polices sont gardees
   en cache pour que le programme reste consultable dans le metro ou l'avion.
   - code (html/css/js) : reseau d'abord, cache si pas de reseau -> une mise a
     jour poussee sur GitHub arrive des qu'on a du reseau, sans rien faire ;
   - photos : cache d'abord.  Si vous REMPLACEZ une photo en gardant le meme
     nom, augmentez VERSION ci-dessous (ou changez le nom du fichier) ;
   - fonds de carte : gardes au fil de la consultation (600 tuiles max).
   Firebase et la meteo passent toujours par le reseau (la page garde sa
   propre copie de secours).
--------------------------------------------------------------------------- */
var VERSION = 'v1';
var SHELL = 'nyc-shell-' + VERSION, TILES = 'nyc-tiles-' + VERSION, CDN = 'nyc-cdn-' + VERSION;
var CORE = ['./', 'index.html', 'css/style.css', 'js/map.js', 'js/config.js', 'js/app.js', 'js/trip.js',
            'manifest.webmanifest', 'icons/icon-192.png', 'icons/favicon-32.png'];
var CDN_HOSTS = ['unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'www.gstatic.com'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(SHELL).then(function(c){
    return c.addAll(CORE).then(function(){
      /* les photos : on les retrouve dans la page elle-meme, sans liste a tenir a jour */
      return fetch('index.html').then(function(r){ return r.text(); }).then(function(html){
        var imgs = (html.match(/img\/[\w.-]+\.webp/g) || []).filter(function(v, i, a){ return a.indexOf(v) === i; });
        return Promise.all(imgs.map(function(u){ return c.add(u)['catch'](function(){}); }));
      })['catch'](function(){});
    });
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return [SHELL, TILES, CDN].indexOf(k) < 0; })
                         .map(function(k){ return caches['delete'](k); }));
  }).then(function(){ return self.clients.claim(); }));
});

/* reseau d'abord, mais sur un reseau qui rame (JFK, metro) on n'attend pas
   plus de 4 s : on sert la copie en cache et la mise a jour se fera en fond */
function networkFirst(req){
  var fromCache = function(){
    return caches.match(req, {ignoreSearch: true}).then(function(m){
      return m || (req.mode === 'navigate' ? caches.match('index.html') : undefined);
    });
  };
  var net = fetch(req).then(function(r){
    if (r && r.ok){ var cp = r.clone(); caches.open(SHELL).then(function(c){ c.put(req, cp); }); }
    return r;
  });
  return new Promise(function(resolve){
    var settled = false;
    var give = function(r){ if (!settled && r){ settled = true; resolve(r); } };
    var t = setTimeout(function(){ fromCache().then(give); }, 4000);
    net.then(function(r){ clearTimeout(t); give(r); }, function(){
      clearTimeout(t);
      fromCache().then(function(m){ give(m || Response.error()); });
    });
  });
}
function cacheFirst(req, name, limit){
  return caches.match(req).then(function(m){
    if (m) return m;
    return fetch(req).then(function(r){
      if (r && (r.ok || r.type === 'opaque')){
        var cp = r.clone();
        caches.open(name).then(function(c){
          c.put(req, cp);
          if (limit) c.keys().then(function(ks){ if (ks.length > limit) c['delete'](ks[0]); });
        });
      }
      return r;
    });
  });
}
function staleWhileRevalidate(req){
  return caches.open(CDN).then(function(c){
    return c.match(req).then(function(m){
      var net = fetch(req).then(function(r){ if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; });
      return m || net;
    });
  });
}

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin === self.location.origin){
    if (/\/img\/|\/icons\//.test(url.pathname)) return e.respondWith(cacheFirst(req, SHELL));
    return e.respondWith(networkFirst(req));
  }
  if (url.hostname === 'tile.openstreetmap.org') return e.respondWith(cacheFirst(req, TILES, 600));
  if (CDN_HOSTS.indexOf(url.hostname) >= 0) return e.respondWith(staleWhileRevalidate(req));
  /* le reste (Firebase, meteo, Google Maps, Uber...) : reseau, sans cache */
});
