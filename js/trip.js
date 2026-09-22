/* ---------------------------------------------------------------------------
   En bref : compte a rebours, mode « Aujourd'hui », meteo, infos pratiques,
   horloges, theme clair/sombre, impression et mode hors ligne.
   Tout ce qui est ici ne touche pas a la base partagee : les coches « fait »
   du jour restent dans le navigateur de chacun.
--------------------------------------------------------------------------- */
(function(){
  var INFO = window.TRIP_INFO || {};
  var NY = 'America/New_York', PARIS = 'Europe/Paris';
  var DAY_MS = 86400000;

  function ls(k, v){
    try{ if (v === undefined) return localStorage.getItem(k);
         if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
         return true; }catch(e){ return null; }
  }
  function $(s, r){ return (r || document).querySelector(s); }
  function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s){ var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

  /* ------------------------------------------------------------- dates
     « 2026-10-21 » dans le fuseau voulu.  ?date=2026-10-21 dans l'adresse
     simule un jour (pratique pour tester le mode « Aujourd'hui »). */
  var FORCED = (location.search.match(/[?&]date=(\d{4}-\d{2}-\d{2})/) || [])[1];
  function isoIn(tz, d){
    if (FORCED) return FORCED;
    try{ return new Intl.DateTimeFormat('en-CA', {timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit'}).format(d || new Date()); }
    catch(e){ return new Date().toISOString().slice(0, 10); }
  }
  function utc(iso){ var p = iso.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
  function diffDays(a, b){ return Math.round((utc(b) - utc(a)) / DAY_MS); }
  function addDays(iso, n){ return new Date(utc(iso) + n * DAY_MS).toISOString().slice(0, 10); }

  var START = INFO.debut || '2026-10-19', END = INFO.fin || '2026-10-26';
  function dayIso(n){ return addDays(START, n - 1); }
  function todayNum(){
    var n = diffDays(START, isoIn(NY)) + 1;
    return (n >= 1 && n <= diffDays(START, END) + 1) ? n : 0;
  }
  function dayEl(n){ return $('.day[data-day="' + n + '"]'); }
  function dayTitle(n){ var t = $('.day[data-day="' + n + '"] .day-title'); return t ? t.textContent.trim() : ''; }

  /* ------------------------------------------------------------- theme */
  var root = document.documentElement;
  var themeBtn = $('[data-theme-toggle]');
  var metaTheme = $('meta[name="theme-color"]');
  function paintThemeBtn(){
    if (!themeBtn) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.textContent = dark ? '☀️' : '🌙';
    themeBtn.title = dark ? 'Passer en mode clair' : 'Passer en mode sombre';
    themeBtn.setAttribute('aria-label', themeBtn.title);
    if (metaTheme) metaTheme.setAttribute('content', dark ? '#0b131c' : '#16263a');
  }
  if (themeBtn) themeBtn.addEventListener('click', function(){
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    ls('nyc2026:theme', next);
    paintThemeBtn();
  });
  if (window.matchMedia){
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onMq = function(e){
      if (ls('nyc2026:theme')) return;   /* un choix manuel l'emporte */
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      paintThemeBtn();
    };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }
  paintThemeBtn();

  /* ------------------------------------------------------------- impression */
  $$('[data-print]').forEach(function(b){
    b.addEventListener('click', function(){ window.print(); });
  });

  /* ------------------------------------------------------------- infos pratiques */
  var lg = INFO.logement || {};
  var addrEl = $('[data-hub-addr]');
  if (addrEl) addrEl.textContent = lg.adresse || '';
  var dest = lg.lat != null ? lg.lat + ',' + lg.lng : encodeURIComponent(lg.adresse || '');
  var mapsA = $('[data-hub-maps]');
  if (mapsA) mapsA.href = 'https://www.google.com/maps/dir/?api=1&destination=' + dest;
  var uberA = $('[data-hub-uber]');
  if (uberA){
    var u = 'https://m.uber.com/ul/?action=setPickup&pickup=my_location'
          + '&dropoff%5Bformatted_address%5D=' + encodeURIComponent(lg.adresse || '');
    if (lg.lat != null) u += '&dropoff%5Blatitude%5D=' + lg.lat + '&dropoff%5Blongitude%5D=' + lg.lng;
    uberA.href = u;
  }
  var copyB = $('[data-hub-copy]');
  if (copyB) copyB.addEventListener('click', function(){
    var done = function(){ copyB.textContent = 'Copiée ✓'; setTimeout(function(){ copyB.textContent = 'Copier'; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(lg.adresse || '').then(done, function(){});
  });
  var sosEl = $('[data-hub-sos]');
  if (sosEl) sosEl.innerHTML = (INFO.urgences || []).map(function(x){
    return '<li><span>' + esc(x.nom) + '</span><a href="tel:' + esc(String(x.tel).replace(/[^\d+]/g, '')) + '">' + esc(x.tel) + '</a></li>';
  }).join('');

  /* ------------------------------------------------------------- horloges */
  function hm(tz){
    try{ return new Intl.DateTimeFormat('fr-FR', {timeZone: tz, hour: '2-digit', minute: '2-digit'}).format(new Date()); }
    catch(e){ return '--:--'; }
  }
  /* ecart reel Paris / New York : 6 h la plupart du temps, 5 h entre le
     passage a l'heure d'hiver en France (dim. 25 oct.) et aux Etats-Unis (1er nov.) */
  function offsetH(){
    try{
      var now = new Date();
      var f = function(tz){
        var p = new Intl.DateTimeFormat('en-US', {timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}).formatToParts(now);
        var o = {}; p.forEach(function(x){ o[x.type] = +x.value; });
        return Date.UTC(o.year, o.month - 1, o.day, o.hour, o.minute);
      };
      return Math.round((f(PARIS) - f(NY)) / 3600000);
    }catch(e){ return 6; }
  }
  function paintClocks(){
    $$('[data-clock]').forEach(function(el){ el.textContent = hm(el.getAttribute('data-clock')); });
    var o = $('[data-hub-offset]');
    if (o) o.textContent = 'Paris a ' + offsetH() + ' h d’avance sur New York.';
  }
  paintClocks();
  setInterval(paintClocks, 20000);

  /* ------------------------------------------------------------- meteo (Open-Meteo, gratuit, sans cle) */
  var WX_KEY = 'nyc2026:wx', WX = null;
  function wxIcon(c){
    if (c === 0) return ['☀️', 'Ensoleillé'];
    if (c === 1) return ['🌤️', 'Plutôt beau'];
    if (c === 2) return ['⛅', 'Éclaircies'];
    if (c === 3) return ['☁️', 'Couvert'];
    if (c === 45 || c === 48) return ['🌫️', 'Brouillard'];
    if (c >= 51 && c <= 57) return ['🌦️', 'Bruine'];
    if (c >= 61 && c <= 67) return ['🌧️', 'Pluie'];
    if (c >= 71 && c <= 77) return ['🌨️', 'Neige'];
    if (c >= 80 && c <= 82) return ['🌦️', 'Averses'];
    if (c === 85 || c === 86) return ['🌨️', 'Averses de neige'];
    if (c >= 95) return ['⛈️', 'Orages'];
    return ['🌡️', ''];
  }
  function wxFor(iso){
    if (!WX || !WX.daily || !WX.daily.time) return null;
    var i = WX.daily.time.indexOf(iso);
    if (i < 0) return null;
    var d = WX.daily;
    return {code: d.weather_code[i], max: Math.round(d.temperature_2m_max[i]), min: Math.round(d.temperature_2m_min[i]),
            rain: d.precipitation_probability_max ? d.precipitation_probability_max[i] : null};
  }
  function wxHtml(w, long){
    var ic = wxIcon(w.code);
    return '<span class="wx-ic">' + ic[0] + '</span>'
      + (long && ic[1] ? '<span class="wx-lbl">' + ic[1] + '</span>' : '')
      + '<span class="wx-t"><b>' + w.max + '°</b> / ' + w.min + '°</span>'
      + (w.rain != null && w.rain >= 20 ? '<span class="wx-r">💧 ' + w.rain + ' %</span>' : '');
  }
  function paintWx(){
    var any = false;
    $$('.day[data-day]').forEach(function(day){
      var n = +day.getAttribute('data-day');
      var head = $('.day-head', day), chip = $('.wx', day);
      var w = n ? wxFor(dayIso(n)) : null;
      if (!w){ if (chip) chip.parentNode.removeChild(chip); return; }
      any = true;
      if (!chip){ chip = document.createElement('div'); chip.className = 'wx'; head.appendChild(chip); }
      chip.title = 'Prévision météo — ' + wxIcon(w.code)[1];
      chip.innerHTML = wxHtml(w, false);
    });
    var src = $('[data-wx-src]');
    if (src) src.hidden = !any;
    paintStatus();
    if (PANES && PANES.length) paintCal();
  }
  function loadWx(){
    try{ WX = JSON.parse(ls(WX_KEY) || 'null'); }catch(e){ WX = null; }
    paintWx();
    if (WX && Date.now() - (WX._at || 0) < 3 * 3600000) return;
    if (diffDays(isoIn(NY), START) > 16 || diffDays(END, isoIn(NY)) > 0) return;   /* hors de portee des previsions */
    var m = INFO.meteo || {lat: 40.7128, lng: -74.006};
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + m.lat + '&longitude=' + m.lng
      + '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max'
      + '&timezone=America%2FNew_York&forecast_days=16')
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(j){
        if (!j || !j.daily) return;
        j._at = Date.now(); WX = j;
        ls(WX_KEY, JSON.stringify(j));
        paintWx();
      })['catch'](function(){});
  }

  /* ------------------------------------------------------------- mode « Aujourd'hui » */
  var TODAY = todayNum();
  var DONE_KEY = 'nyc2026:done:' + (TODAY ? dayIso(TODAY) : '');
  function doneSet(){ try{ return JSON.parse(ls(DONE_KEY) || '{}') || {}; }catch(e){ return {}; } }
  function stopKey(li){
    return li.getAttribute('data-sid') || (li.getAttribute('data-xid') ? 'x:' + li.getAttribute('data-xid') : '');
  }
  function stopName(li){
    var n = $('.stop-name', li) || $('.lbl', li);
    if (!n) return '';
    var c = n.cloneNode(true);
    $$('.opttag, .pin-badge', c).forEach(function(x){ x.parentNode.removeChild(x); });
    var t = c.textContent.replace(/\s+/g, ' ').trim();
    var hd = !$('.stop-name', li) && $('.hood', li);
    return hd ? t + ' — ' + hd.textContent.trim() : t;
  }
  function todayStops(){
    var d = dayEl(TODAY);
    if (!d) return [];
    return $$('ul.stops > li', d).filter(function(li){
      return !li.hidden && !/\b(trans|trans-gap)\b/.test(li.className) && stopKey(li);
    });
  }
  var NEXT = null;
  function paintToday(){
    if (!TODAY) return;
    var d = dayEl(TODAY);
    if (!d) return;
    d.classList.add('is-today');
    var head = $('.day-head', d);
    if (head && !$('.today-tag', head)){
      var tag = document.createElement('span');
      tag.className = 'today-tag'; tag.textContent = "Aujourd'hui";
      head.insertBefore(tag, $('.day-tot', head));
    }
    var done = doneSet();
    NEXT = null;
    todayStops().forEach(function(li){
      var k = stopKey(li), isDone = !!done[k];
      li.classList.toggle('is-done', isDone);
      li.classList.remove('is-next');
      if (!isDone && !NEXT) NEXT = li;
      var host = $('.cbody', li) || li;
      var bar = $('.today-bar', host);
      if (!bar){
        bar = document.createElement('div'); bar.className = 'today-bar';
        bar.innerHTML = '<span class="next-lbl">▶ Prochaine étape</span><button type="button" class="done-btn"></button>';
        $('.done-btn', bar).addEventListener('click', function(){
          var s = doneSet(), key = stopKey(li);
          if (s[key]) delete s[key]; else s[key] = Date.now();
          ls(DONE_KEY, JSON.stringify(s));
          paintToday();
        });
        host.appendChild(bar);
      }
      $('.done-btn', bar).textContent = isDone ? '↺ Pas encore fait' : '✓ Fait';
      $('.done-btn', bar).classList.toggle('on', isDone);
    });
    if (NEXT) NEXT.classList.add('is-next');
    paintStatus();
  }

  /* ------------------------------------------------------------- bandeau d'etat */
  function paintStatus(){
    var el = $('[data-hub-status]');
    if (!el) return;
    var nyIso = isoIn(NY), parisIso = isoIn(PARIS);
    var html = '';
    if (TODAY){
      var w = wxFor(dayIso(TODAY));
      var total = diffDays(START, END) + 1;
      html = '<div class="hs-eyebrow">Aujourd’hui · jour ' + TODAY + ' sur ' + total + '</div>'
           + '<div class="hs-title">' + esc(dayTitle(TODAY)) + '</div>'
           + (w ? '<div class="hs-wx">' + wxHtml(w, true) + '</div>' : '');
      if (NEXT){
        html += '<div class="hs-next"><span>Prochaine étape</span><b>' + esc(stopName(NEXT)) + '</b></div>'
              + '<div class="hs-btns"><button type="button" class="hs-go" data-go="next">Voir l’étape ↓</button>'
              + '<button type="button" class="hs-ghost" data-go="day">Toute la journée</button></div>';
      } else {
        html += '<div class="hs-next"><span>Programme du jour</span><b>Tout est fait 🎉</b></div>'
              + '<div class="hs-btns"><button type="button" class="hs-ghost" data-go="day">Revoir la journée</button></div>';
      }
    } else {
      var j = diffDays(parisIso, START);
      if (j > 0){
        html = '<div class="hs-eyebrow">New York · du 19 au 26 octobre</div>'
             + '<div class="hs-big">J‑' + j + '</div>'
             + '<div class="hs-sub">' + (j === 1 ? 'Départ demain !' : 'avant le départ') + ' · atterrissage à JFK le lundi 19 à 22 h 40</div>';
      } else if (j === 0){
        html = '<div class="hs-eyebrow">C’est aujourd’hui</div><div class="hs-big">Jour J ✈️</div>'
             + '<div class="hs-sub">Atterrissage à JFK à 22 h 40, heure de New York.</div>';
      } else {
        html = '<div class="hs-eyebrow">Voyage terminé</div><div class="hs-title">Bon retour ! 🗽</div>'
             + '<div class="hs-sub">Le programme reste consultable ci-dessous.</div>';
      }
      var w1 = wxFor(dayIso(1));
      if (j > 0 && w1) html += '<div class="hs-wx"><span class="hs-wx-lbl">Prévision à l’arrivée</span>' + wxHtml(w1, true) + '</div>';
    }
    el.innerHTML = html;
    el.classList.toggle('live', !!TODAY);
  }
  function goTo(el){
    if (!el) return;
    var prog = document.getElementById('tab-prog');
    if (prog && prog.getAttribute('aria-selected') !== 'true') prog.click();
    var pane = PANES.filter(function(p){ return p.el === el || p.el.contains(el); })[0];
    if (pane) select(pane.key, true);
    setTimeout(function(){ el.scrollIntoView({behavior: 'smooth', block: 'start'}); }, 30);
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('[data-go]') : null;
    if (!b) return;
    goTo(b.getAttribute('data-go') === 'next' ? NEXT : dayEl(TODAY));
  });


  /* ------------------------------------------------------------- calendrier
     Une seule journee affichee a la fois : la barre de jours en haut sert a
     passer de l'une a l'autre (plus « A caler », les idees et les infos). */
  var calEl = $('[data-cal]');
  var PANES = [];
  var moreEl = null;
  var CUR = null;
  $$('.day[data-day]').forEach(function(d){
    var id = d.getAttribute('data-day');
    if (/^\d+$/.test(id)){
      var t = dayTitle(+id), m = t.match(/^(\S+?)\.?\s+(\d+)/);
      PANES.push({key: 'd' + id, el: d, n: +id, w: m ? m[1] : '', d: m ? m[2] : id,
                  title: t.replace(/^[^—]*—\s*/, '')});
    } else if (id === 'caler'){
      PANES.push({key: 'caler', el: d, label: '★ À caler'});
    }
  });
  var sg = document.getElementById('suggestions');
  if (sg) PANES.push({key: 'idees', el: sg, label: '💡 Idées'});
  var inf = $('[data-pane-infos]');
  if (inf) PANES.push({key: 'infos', el: inf, label: 'ℹ︎ Infos'});
  function paneBy(key){ return PANES.filter(function(p){ return p.key === key; })[0]; }

  function buildCal(){
    if (!calEl) return;
    var days = PANES.filter(function(p){ return p.n; });
    var other = PANES.filter(function(p){ return !p.n; });
    calEl.innerHTML = '<div class="cal-days">' + days.map(function(p){
        return '<button type="button" class="cal-d" data-key="' + p.key + '" title="' + esc(p.title) + '">'
             + '<span class="cal-w">' + esc(p.w) + '</span><span class="cal-n">' + esc(p.d) + '</span>'
             + '<span class="cal-x" data-cal-wx="' + p.n + '"></span></button>';
      }).join('') + '</div>';
    /* « A caler », idees, infos : sur une ligne a part, qui ne reste pas
       collee en haut de l'ecran (seuls les jours le restent) */
    moreEl = document.createElement('div');
    moreEl.className = 'cal-more';
    moreEl.innerHTML = other.map(function(p){
      return '<button type="button" class="cal-o" data-key="' + p.key + '">' + esc(p.label)
           + (p.key === 'caler' ? '<span class="cal-c" data-cal-count></span>' : '') + '</button>';
    }).join('');
    calEl.parentNode.insertBefore(moreEl, calEl.nextSibling);
    [calEl, moreEl].forEach(function(el){
      el.addEventListener('click', function(e){
        var b = e.target.closest('[data-key]');
        if (b) select(b.getAttribute('data-key'), true);
      });
    });
    /* bas de chaque journee : jour precedent / suivant */
    days.forEach(function(p, i){
      var pg = document.createElement('div');
      pg.className = 'pager';
      var prev = days[i - 1], next = days[i + 1];
      pg.innerHTML = (prev ? '<button type="button" data-key="' + prev.key + '">← ' + esc(prev.w) + ' ' + esc(prev.d) + '</button>' : '<span></span>')
                   + (next ? '<button type="button" class="nx" data-key="' + next.key + '">' + esc(next.w) + ' ' + esc(next.d) + ' · ' + esc(next.title) + ' →</button>' : '');
      pg.addEventListener('click', function(e){
        var b = e.target.closest('[data-key]');
        if (b) select(b.getAttribute('data-key'), true);
      });
      p.el.appendChild(pg);
    });
  }
  function paintCal(){
    if (!calEl) return;
    $$('.cal-d', calEl).forEach(function(b){
      var n = +b.getAttribute('data-key').slice(1);
      b.classList.toggle('is-today', n === TODAY);
      var w = wxFor(dayIso(n)), x = $('.cal-x', b);
      x.textContent = w ? wxIcon(w.code)[0] : '';
    });
    var c = moreEl && $('[data-cal-count]', moreEl), h = paneBy('caler');
    if (c && h){
      var k = $$('ul.stops > li', h.el).filter(function(li){ return !li.hidden && !/\btrans-gap\b/.test(li.className); }).length;
      c.textContent = k ? ' ' + k : '';
    }
  }
  function select(key, user){
    var p = paneBy(key) || PANES[0];
    if (!p) return;
    CUR = p.key;
    PANES.forEach(function(x){ x.el.classList.toggle('pane-off', x !== p); });
    $$('.cal [data-key], .cal-more [data-key]').forEach(function(b){
      var on = b.getAttribute('data-key') === p.key;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on && b.parentNode.scrollWidth > b.parentNode.clientWidth){
        var r = b.parentNode;
        r.scrollLeft = b.offsetLeft - (r.clientWidth - b.offsetWidth) / 2;
      }
    });
    if (user){
      ls('nyc2026:pane', p.key);
      /* on remonte au debut de la journee si on etait plus bas */
      var top = p.el.getBoundingClientRect().top + window.pageYOffset - tabH() - (calEl ? calEl.offsetHeight : 0) - 8;
      if (window.pageYOffset > top) window.scrollTo(0, Math.max(0, top));
    }
    $$('.daymap', p.el).forEach(function(b){ if (window.__nycShowMap) window.__nycShowMap(b); });
  }
  function tabH(){ var t = $('.tabbar'); return t ? t.offsetHeight : 0; }
  function setTabH(){ root.style.setProperty('--tbh', tabH() + 'px'); }
  setTabH();
  window.addEventListener('resize', setTabH);

  /* carte du jour repliee par defaut : un bouton pour l'ouvrir */
  var mapsOpen = ls('nyc2026:maps') === 'open';
  function paintMapToggles(){
    $$('.daymap').forEach(function(box){
      box.classList.toggle('closed', !mapsOpen);
      var b = box.previousElementSibling;
      if (b && b.classList.contains('map-toggle')) b.textContent = mapsOpen ? '🗺️ Masquer la carte' : '🗺️ Voir la carte du jour';
    });
  }
  $$('.daymap').forEach(function(box){
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'map-toggle';
    b.addEventListener('click', function(){
      mapsOpen = !mapsOpen;
      ls('nyc2026:maps', mapsOpen ? 'open' : 'closed');
      paintMapToggles();
      if (mapsOpen && window.__nycShowMap) window.__nycShowMap(box);
    });
    box.parentNode.insertBefore(b, box);
  });
  paintMapToggles();

  buildCal();
  var start = TODAY ? 'd' + TODAY : (location.hash === '#suggestions' ? 'idees' : ls('nyc2026:pane'));
  select(paneBy(start) ? start : 'd1', false);


  /* ------------------------------------------------------------- trajets entre les etapes
     Le trajet ecrit dans une etape (« a pied (~10 min) », « PATH 33rd St »…)
     s'affiche en petit ENTRE les blocs, juste avant l'etape.  S'il y a deja
     un bloc transport ajoute a cet endroit, c'est lui qui compte : on
     n'affiche rien de plus. */
  var MOVE_ICO = {go: '🚶', metro: '🚇', path: '🚆', vtc: '🚕', ferry: '⛴️', van: '🚐'};
  function paintAutoTrans(){
    $$('li.auto-trans').forEach(function(x){ x.parentNode.removeChild(x); });
    $$('ul.stops > li').forEach(function(li){
      if (li.hidden || /\b(trans|trans-gap)\b/.test(li.className)) return;
      var mv = null, k = null;
      $$('.stop-meta .move', li).some(function(m){
        for (var t in MOVE_ICO) if (m.classList.contains(t)){ mv = m; k = t; return true; }
        return false;
      });
      if (!mv || !mv.textContent.trim() || /sur place/i.test(mv.textContent)) return;
      var prev = li.previousElementSibling;
      while (prev && (prev.hidden || prev.classList.contains('trans-gap'))) prev = prev.previousElementSibling;
      if (prev && prev.classList.contains('trans')) return;
      var a = document.createElement('li');
      a.className = 'trans auto-trans';
      a.innerHTML = '<span class="tr-ico">' + MOVE_ICO[k] + '</span><div class="tr-body"><div class="tr-top"><span class="tr-name">'
                  + esc(mv.textContent.trim()) + '</span></div></div>';
      li.parentNode.insertBefore(a, li);
    });
  }

  /* ------------------------------------------------------------- demarrage */
  var jumped = false;
  function afterRender(){
    paintAutoTrans();
    paintToday();
    paintWx();
    paintCal();
    /* pendant le sejour, on ouvre directement sur la journee en cours */
    if (TODAY && !jumped){
      jumped = true;
      var prog = document.getElementById('tab-prog');
      if (prog && prog.getAttribute('aria-selected') !== 'true') prog.click();
      select('d' + TODAY, false);
    }
  }
  document.addEventListener('nyc:rendered', afterRender);
  paintStatus();
  paintAutoTrans();
  paintToday();
  loadWx();
  /* passage de minuit : on recalcule le jour courant */
  setInterval(function(){
    var n = todayNum();
    if (n !== TODAY){
      if (TODAY){ var old = dayEl(TODAY); if (old) old.classList.remove('is-today'); }
      TODAY = n; DONE_KEY = 'nyc2026:done:' + (n ? dayIso(n) : '');
      $$('.is-next, .is-done').forEach(function(x){ x.classList.remove('is-next', 'is-done'); });
      $$('.today-bar, .today-tag').forEach(function(x){ x.parentNode.removeChild(x); });
      paintToday(); loadWx(); paintCal();
      if (n) select('d' + n, false);
    }
  }, 60000);

  /* ------------------------------------------------------------- hors ligne */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('sw.js')['catch'](function(){});
    });
  }
})();
