(function(){
  var DATA  = {"2": {"pins": [[1, 40.74844, -73.98566], [2, 40.75366, -73.98325], [3, 40.75273, -73.97715], [4, 40.7545, -73.9843], [5, 40.75855, -73.97625], [6, 40.7605, -73.974], [7, 40.76144, -73.97768], [8, 40.75915, -73.97925], [9, 40.758, -73.9855], [10, 40.7596, -73.9877], [11, 40.7588, -73.988]], "refs": []}, "3": {"pins": [[1, 40.70614, -73.99688], [2, 40.7033, -73.9866], [3, 40.7004, -73.9967], [4, 40.70265, -73.9931], [5, 40.68264, -73.97562]], "refs": []}, "4": {"pins": [[1, 40.77398, -73.97088], [2, 40.77565, -73.96795], [3, 40.77943, -73.96324], [4, 40.78132, -73.97397]], "refs": []}, "5": {"pins": [[1, 40.68925, -74.0445], [2, 40.6993, -74.0396], [3, 40.7127, -74.0162], [4, 40.71155, -74.0125], [5, 40.713, -74.0133], [6, 40.75052, -73.99357]], "refs": [[40.705, -74.0555, "Départ ferry — Liberty State Park"]]}, "6": {"pins": [[1, 40.75395, -74.00195], [2, 40.7479, -74.0048], [3, 40.74245, -74.0061], [4, 40.7414, -74.0105], [5, 40.7308, -73.9973], [6, 40.7233, -74.0003], [7, 40.73145, -74.00335]], "refs": []}, "7": {"pins": [[1, 40.81355, -74.07425], [2, 40.811, -74.07], [3, 40.7328, -74.0634]], "refs": []}, "8": {"pins": [[2, 40.6413, -73.7781]], "refs": [[40.7328, -74.0634, "Base — Jersey City (Liberty Ave)"]]}};

  function kind(li){
    var c = li.className;
    if (/locked|match/.test(c)) return 'ev';
    if (/\beat\b/.test(c))     return 'eat';
    if (/\bfree\b/.test(c))    return 'free';
    if (/\bopt\b/.test(c))     return 'opt';
    return 'stop';
  }
  function label(li){
    var n = li.querySelector('.stop-name');
    if (n){
      var c = n.cloneNode(true), t = c.querySelector('.opttag');
      if (t) t.parentNode.removeChild(t);
      return c.textContent.replace(/\s+/g, ' ').trim();
    }
    var l = li.querySelector('.lbl'), hd = li.querySelector('.hood');
    return l ? (l.textContent.trim() + (hd ? ' \u2014 ' + hd.textContent.trim() : '')) : '';
  }
  function badge(num, k, off){
    var s = document.createElement('span');
    s.className = 'pin-badge ' + k + (off ? ' off' : '');
    s.textContent = num;
    return s;
  }

  /* Les etapes supprimees et les activites ajoutees avec une adresse ne sont
     connues que du DEUXIEME script (celui qui gere la synchro). On les lit
     ici via ce pont global, mis a jour apres chaque rendu de la check-list. */
  function curDel(){ return (window.__nycDB && window.__nycDB.del) || {}; }

  /* Recalcule le numero de chaque etape a partir de l'ORDRE ACTUEL du DOM
     (donc apres un glisser-deposer ou un clic sur monter/descendre, deja
     applique a ce stade par le script de la check-list) plutot que depuis
     l'ordre d'origine du HTML. Met aussi a jour le petit numero affiche sur
     la carte-etape elle-meme, pour que les deux restent identiques. */
  function liveRows(m){
    var del = curDel(), acts = (window.__nycDB && window.__nycDB.a) || {};
    var out = [], n = 0;
    /* une seule numérotation pour toute la journée, dans l'ordre affiché :
       étapes d'origine ET activités ajoutées depuis la page (avant, les deux
       avaient chacune leur compteur, d'où des 2 / 3 / 4 dans le désordre) */
    Array.prototype.forEach.call(
      m.day.querySelectorAll('ul.stops > li:not(.trans):not(.trans-gap)'),
      function(li){
        if (li.hidden) return;
        var b = li.querySelector('.pin-badge'), row;
        var xid = li.getAttribute('data-xid');
        if (xid){
          var act = acts[xid] || {};
          var ok = typeof act.lat === 'number' && typeof act.lng === 'number';
          row = {k: 'actv', name: act.t || 'Activité', has: ok, ll: ok ? [act.lat, act.lng] : null};
        } else {
          var r = GLOBAL_ROWS[li.getAttribute('data-sid')];
          if (!r || del[r.skey]) return;
          row = {k: r.k, name: r.name, has: r.has, ll: r.ll};
        }
        n++;
        row.n = n;
        if (b){ b.textContent = n; b.classList.toggle('off', !row.has); }
        out.push(row);
      }
    );
    return out;
  }

  function paintMap(m){
    var rows = liveRows(m);

    m.legendEl.innerHTML = '';
    rows.forEach(function(r){
      var lg = document.createElement('span');
      lg.className = 'lg';
      lg.appendChild(badge(r.n, r.k, !r.has));
      lg.appendChild(document.createTextNode(' ' + r.name));
      m.legendEl.appendChild(lg);
    });

    if (!m.map) return;
    if (m.layer) m.layer.clearLayers(); else m.layer = L.layerGroup().addTo(m.map);

    var pts = rows.filter(function(r){ return r.has; })
                  .map(function(r){ return {n: r.n, k: r.k, name: r.name, ll: r.ll}; });

    var all = [];
    if (pts.length > 1){
      L.polyline(pts.map(function(p){ return p.ll; }),
        {color: '#4a6076', weight: 2, opacity: .65, dashArray: '5,7'}).addTo(m.layer);
    }
    pts.forEach(function(p){
      all.push(p.ll);
      L.marker(p.ll, {icon: L.divIcon({className: '', iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -14],
        html: '<div class="mk ' + p.k + '">' + p.n + '</div>'})})
       .addTo(m.layer)
       .bindPopup('<b>' + p.n + '. ' + p.name + '</b><br><a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + p.ll[0] + ',' + p.ll[1] + '">Ouvrir dans Google Maps &#8599;</a>');
    });
    m.refs.forEach(function(r){
      all.push([r[0], r[1]]);
      L.marker([r[0], r[1]], {icon: L.divIcon({className: '', iconSize: [12, 12], iconAnchor: [6, 6], popupAnchor: [0, -8],
        html: '<div class="mk-ref"></div>'})}).addTo(m.layer).bindPopup(r[2]);
    });
    if (all.length > 1) m.map.fitBounds(L.latLngBounds(all).pad(0.18));
    else if (all.length === 1) m.map.setView(all[0], 15);
    else m.map.setView([40.75, -73.99], 12);
  }

  var maps = [];
  var GLOBAL_ROWS = {};   /* skey -> {k, name, has, ll}, toutes journées confondues */

  Array.prototype.forEach.call(document.querySelectorAll('.day'), function(day){
    var box = day.querySelector('.daymap');
    if (!box) return;
    var id = box.getAttribute('data-day');
    var d  = DATA[id] || {pins: [], refs: []};
    var coords = {};
    d.pins.forEach(function(p){ coords[p[0]] = [p[1], p[2]]; });

    var legend = box.querySelector('[data-legend]');
    var rows = [];

    /* :not(.trans):not(.actv) — les blocs transport et les activités ajoutés
       depuis la page ne doivent pas décaler la numérotation des étapes
       d'origine ni les points de la carte */
    Array.prototype.forEach.call(day.querySelectorAll('ul.stops > li:not(.trans):not(.trans-gap):not(.actv)'), function(li, i){
      var num = i + 1, k = kind(li), name = label(li), has = !!coords[num];
      var anchor = li.querySelector('.stop-name') || li.querySelector('.lbl');
      if (anchor) anchor.parentNode.insertBefore(badge(num, k, !has), anchor);
      li.setAttribute('data-sid', id + '-' + num);
      var row = {n: num, k: k, name: name, has: has, ll: has ? coords[num] : null, skey: id + '-' + num};
      rows.push(row);
      GLOBAL_ROWS[row.skey] = row;
    });

    var m = {box: box, day: day, id: id, rows: rows, refs: d.refs || [], extra: [], legendEl: legend};
    paintMap(m);
    box.__m = m;
    maps.push(m);
  });

  function buildMap(m){
    if (m.done || typeof L === 'undefined') return;
    m.done = true;
    var map = L.map('map-d' + m.id, {scrollWheelZoom: false});
    /* CARTO exige desormais une cle : ses tuiles reviennent barrees de
       « API KEY REQUIRED ». On passe sur les tuiles OpenStreetMap, libres. */
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    m.map = map;
    paintMap(m);
    setTimeout(function(){ map.invalidateSize(); }, 60);
  }

  function start(){
    if (typeof L === 'undefined'){
      maps.forEach(function(m){
        m.box.querySelector('.map-canvas').innerHTML =
          '<div style="padding:18px;font-size:13px;color:var(--steel)">Carte indisponible (pas de connexion) \u2014 utilisez l\'onglet Google Maps ou le lien \u00ab Itin\u00e9raire \u00bb.</div>';
      });
      return;
    }
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(es){
        es.forEach(function(e){ if (e.isIntersecting && e.target.offsetParent){ buildMap(e.target.__m); io.unobserve(e.target); } });
      }, {rootMargin: '350px'});
      maps.forEach(function(m){ io.observe(m.box); });
    } else maps.forEach(buildMap);
  }
  /* seules les cartes visibles : une carte construite dans un bloc masqué
     (journée non affichée, carte repliée) aurait une taille nulle */
  function showMap(m){
    if (!m.box.offsetParent) return;
    if (!m.done) buildMap(m);
    else if (m.map){ m.map.invalidateSize(); paintMap(m); }
  }
  window.__nycRefreshMaps = function(){ maps.forEach(showMap); };
  window.__nycShowMap = function(box){ if (box && box.__m) showMap(box.__m); };
  window.__nycRepaintMaps = function(){
    maps.forEach(function(m){ paintMap(m); });
  };
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);

  document.addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('.mt-btn') : null;
    if (!b) return;
    var box = b.closest('.daymap'), want = b.getAttribute('data-pane');
    Array.prototype.forEach.call(box.querySelectorAll('.mt-btn'), function(x){
      if (x === b) x.classList.add('active'); else x.classList.remove('active');
    });
    var pn = box.querySelector('.pane-num'), pg = box.querySelector('.pane-g');
    pn.hidden = (want !== 'num');
    pg.hidden = (want !== 'g');
    if (want === 'g'){
      var f = pg.querySelector('iframe');
      if (!f.getAttribute('src')) f.setAttribute('src', f.getAttribute('data-src'));
    } else if (box.__m && box.__m.map){
      box.__m.map.invalidateSize();
    }
  });
})();
