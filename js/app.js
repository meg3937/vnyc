(function(){
  var CFG    = window.TRIP_SYNC || {};
  var PEOPLE = [{"k": "megan", "n": "Mégan", "i": "Mé", "c": "#b23b5b"}, {"k": "theo", "n": "Théo", "i": "Th", "c": "#1d7a5f"}, {"k": "shirley", "n": "Shirley", "i": "Sh", "c": "#d99125"}, {"k": "david", "n": "David", "i": "Da", "c": "#3a6ea5"}, {"k": "camille", "n": "Camille", "i": "Ca", "c": "#7b52a1"}, {"k": "philippe", "n": "Philippe", "i": "Ph", "c": "#b5651d"}, {"k": "marie", "n": "Marie", "i": "Ma", "c": "#0f8b8d"}];
  var DEF_S  = [{"id": "s1", "t": "Formalités & documents", "o": 10}, {"id": "s2", "t": "Réservations à boucler", "o": 20}, {"id": "s3", "t": "Argent, téléphone & applis", "o": 30}, {"id": "s4", "t": "Valise — à ne pas oublier", "o": 40}, {"id": "s5", "t": "Juste avant de partir", "o": 50}, {"id": "s6", "t": "À ajouter", "o": 60}];
  var DEF_I  = [{"id": "i01", "s": "s1", "o": 10, "t": "Faire son ESTA", "n": "≈ 21 $/personne, uniquement sur esta.cbp.dhs.gov (les autres sites surfacturent). Au moins 72 h avant le vol.", "m": "each"}, {"id": "i02", "s": "s1", "o": 20, "t": "Vérifier la validité de son passeport", "n": "Valide pendant tout le séjour, et biométrique pour l'ESTA.", "m": "each"}, {"id": "i03", "s": "s1", "o": 30, "t": "Souscrire une assurance voyage / santé", "n": "Les soins aux États-Unis coûtent très cher, la carte européenne n'y sert à rien.", "m": "each"}, {"id": "i04", "s": "s1", "o": 40, "t": "Prévenir la compagnie aérienne pour la PMR", "n": "Assistance aéroport, fauteuil, place adaptée — à demander bien avant le départ.", "m": "once"}, {"id": "i05", "s": "s1", "o": 50, "t": "Scanner son passeport + ESTA (téléphone et mail)", "n": "Une copie papier dans un autre sac ne coûte rien.", "m": "each"}, {"id": "i06", "s": "s1", "o": 60, "t": "Faire son enregistrement en ligne", "n": "Ouvre généralement 24 h avant le vol.", "m": "each"}, {"id": "i07", "s": "s2", "o": 10, "t": "Acheter le Go City (New York Explorer) pour les 7", "n": "Vérifier dans l'appli que l'Empire State, le MoMA, le 9/11, One World, The Edge et le ferry sont bien inclus.", "m": "once"}, {"id": "i08", "s": "s2", "o": 20, "t": "Billets du spectacle de Broadway — mar. 20", "n": "Places PMR à réserver tôt. Sinon TKTS à Times Square le jour même, mais pas garanti à 7.", "m": "once"}, {"id": "i09", "s": "s2", "o": 30, "t": "Billets Nets vs Hornets — mer. 21, Barclays Center", "n": "19h30. Places PMR à réserver tôt.", "m": "once"}, {"id": "i10", "s": "s2", "o": 40, "t": "Billets Jets vs Dolphins — dim. 25, MetLife", "n": "Coup d'envoi 13h. Places PMR à réserver tôt.", "m": "once"}, {"id": "i11", "s": "s2", "o": 50, "t": "Billets du Met — jeu. 22", "n": "≈ 30 $/personne, non inclus dans le Go City.", "m": "once"}, {"id": "i12", "s": "s2", "o": 60, "t": "Van ou 2 UberXL : JFK → Jersey City, lun. 19", "n": "Atterrissage 22h40, prévoir l'attente bagages. Place devant pour la PMR.", "m": "once"}, {"id": "i13", "s": "s2", "o": 70, "t": "Van : Jersey City → MetLife, dim. 25", "n": "Départ vers 11h-11h30 pour l'avant-match, et le retour.", "m": "once"}, {"id": "i14", "s": "s2", "o": 80, "t": "Van : Jersey City → JFK, lun. 26", "n": "Vol à 23h55, départ du logement vers 19h30-20h.", "m": "once"}, {"id": "i15", "s": "s2", "o": 90, "t": "Créneau Empire State Building — mar. 20", "n": "Réserver l'horaire à l'avance même avec le pass.", "m": "once"}, {"id": "i16", "s": "s2", "o": 100, "t": "Choisir et réserver l'observatoire", "n": "Top of the Rock (mar.), One World (ven.) ou The Edge (sam.) — un seul suffit.", "m": "once"}, {"id": "i17", "s": "s2", "o": 110, "t": "Créneau ferry Statue de la Liberté — ven. 23", "n": "Au départ de Liberty State Park côté Jersey City : moins de queue.", "m": "once"}, {"id": "i18", "s": "s2", "o": 120, "t": "Réserver l'hélicoptère", "n": "Jeu. 22 ou ven. 23, héliport de Downtown (Pier 6). Avant le coucher du soleil, ~18 h en octobre.", "m": "once"}, {"id": "i19", "s": "s2", "o": 130, "t": "Réserver le stand de tir (New Jersey)", "n": "Pièce d'identité demandée sur place.", "m": "once"}, {"id": "i20", "s": "s2", "o": 140, "t": "Réserver les restos pour 7", "n": "La Pecora Bianca (mar.), John's of Bleecker (sam.) : les grandes tablées se réservent.", "m": "once"}, {"id": "i21", "s": "s2", "o": 150, "t": "Confirmer le logement de Jersey City", "n": "Adresse exacte, code d'accès, arrivée tardive (~00h30), checkout ~11h le lundi et consigne à bagages.", "m": "once"}, {"id": "i22", "s": "s3", "o": 10, "t": "Prévenir sa banque + vérifier ses plafonds", "n": "Sinon la carte peut être bloquée au premier paiement.", "m": "each"}, {"id": "i23", "s": "s3", "o": 20, "t": "Prévoir une carte sans frais à l'étranger", "n": "Et une deuxième carte de secours, rangée ailleurs.", "m": "each"}, {"id": "i24", "s": "s3", "o": 30, "t": "Prendre un peu de cash en dollars", "n": "Tailgate MetLife, pourboires, petits stands. Le reste se paie par carte partout.", "m": "each"}, {"id": "i25", "s": "s3", "o": 40, "t": "Activer une eSIM ou un forfait data US", "n": "À faire avant de partir.", "m": "each"}, {"id": "i26", "s": "s3", "o": 50, "t": "Installer Uber, Go City, Citymapper", "n": "Et télécharger la carte de New York hors ligne dans Google Maps.", "m": "each"}, {"id": "i27", "s": "s3", "o": 60, "t": "Vérifier que sa carte passe en sans-contact", "n": "Le métro et le PATH fonctionnent à l'OMNY : pas besoin de MetroCard.", "m": "each"}, {"id": "i28", "s": "s4", "o": 10, "t": "Adaptateurs de prise US (type A/B)", "n": "Deux ou trois suffisent pour le groupe, ou une multiprise française + un seul adaptateur. À se répartir.", "m": "once"}, {"id": "i29", "s": "s4", "o": 20, "t": "Batterie externe", "n": "Obligatoirement en bagage cabine, jamais en soute.", "m": "each"}, {"id": "i30", "s": "s4", "o": 30, "t": "Chargeurs (téléphone, appareil photo)", "n": "", "m": "each"}, {"id": "i31", "s": "s4", "o": 40, "t": "Chaussures de marche déjà faites", "n": "Les journées font 6 à 8 h de marche.", "m": "each"}, {"id": "i32", "s": "s4", "o": 50, "t": "Vêtements chauds + bonnet et écharpe", "n": "MetLife est un stade à ciel ouvert et il fait froid fin octobre.", "m": "each"}, {"id": "i33", "s": "s4", "o": 60, "t": "Coupe-vent et petit parapluie", "n": "", "m": "each"}, {"id": "i34", "s": "s4", "o": 70, "t": "Tenue un peu habillée pour Broadway", "n": "Facultatif, mais l'ambiance s'y prête.", "m": "each"}, {"id": "i35", "s": "s4", "o": 80, "t": "Médicaments + ordonnances", "n": "En cabine, dans leur boîte d'origine.", "m": "each"}, {"id": "i36", "s": "s4", "o": 90, "t": "Trousse de toilette", "n": "Liquides de moins de 100 ml en cabine.", "m": "each"}, {"id": "i37", "s": "s4", "o": 100, "t": "Petit sac à dos pour la journée", "n": "Sacs souvent contrôlés à l'entrée des salles et des musées.", "m": "each"}, {"id": "i38", "s": "s5", "o": 10, "t": "Peser ses bagages, vérifier les dimensions cabine", "n": "", "m": "each"}, {"id": "i39", "s": "s5", "o": 20, "t": "Télécharger billets d'avion, matchs, spectacle, Go City, ESTA, adresse du logement", "n": "Dans le téléphone ET imprimé : le réseau à JFK est capricieux.", "m": "each"}, {"id": "i40", "s": "s5", "o": 30, "t": "Régler sa montre : New York a 6 h de moins", "n": "", "m": "each"}, {"id": "i41", "s": "s5", "o": 40, "t": "Aucune nourriture fraîche dans les bagages", "n": "La douane américaine est stricte : pas de fromage, charcuterie, fruits.", "m": "each"}, {"id": "i42", "s": "s5", "o": 50, "t": "Laisser l'itinéraire à un proche resté en France", "n": "", "m": "once"}, {"id": "i43", "s": "s5", "o": 60, "t": "Regarder la météo à New York la veille", "n": "", "m": "once"}];
  var MEKEY  = 'nyc2026:me', LKEY = 'nyc2026:checklist:v2', SKEY = 'nyc2026:cloud-copy';
  var ADMIN  = 'megan';   /* seul ce profil peut corriger un texte déjà écrit */

  var $ = function(s){ return document.querySelector(s); };
  var listEl  = $('[data-ck-list]'),  barEl  = $('[data-ck-bar]'),   lblEl  = $('[data-ck-lbl]');
  var cntEl   = $('[data-ck-count]'), lastEl = $('[data-ck-last]'),  warnEl = $('[data-ck-warn]');
  var meEls   = document.querySelectorAll('[data-ck-me]');
  var syncEl  = $('[data-ck-sync]'),  sumEl  = $('[data-ck-people]');
  var sgBody   = $('[data-sg-body]');
  var sgCounts = document.querySelectorAll('[data-sg-count]');   /* en haut ET en bas */
  var sgAdds   = document.querySelectorAll('[data-sg-add]');
  var sgJump   = $('[data-sg-jump]');

  /* ---------------------------------------------------------------- outils */
  function ls(k, v){
    try{ if (v === undefined) return localStorage.getItem(k);
         if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
         return true; }catch(e){ return null; }
  }
  function P(k){ for (var i = 0; i < PEOPLE.length; i++) if (PEOPLE[i].k === k) return PEOPLE[i]; return null; }
  function avatar(k, big){
    var p = P(k), s = document.createElement('span');
    s.className = 'av' + (big ? ' lg' : '');
    if (p){ s.style.background = p.c; s.textContent = p.i; s.title = p.n; }
    else { s.textContent = '?'; }
    return s;
  }
  function ago(ts){
    if (!ts) return '';
    var d = Math.round((Date.now() - ts) / 1000);
    if (d < 60) return "à l'instant";
    if (d < 3600) return 'il y a ' + Math.round(d / 60) + ' min';
    if (d < 86400) return 'il y a ' + Math.round(d / 3600) + ' h';
    return 'il y a ' + Math.round(d / 86400) + ' j';
  }
  function esc(s){ var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
  /* on prefixe les valeurs par un tilde : on retire celui que l'auteur aurait deja tape */
  function approx(v){ return String(v == null ? '' : v).replace(/^\s*(?:~|≈|environ)\s*/i, ''); }

  /* ------------------------------------------------------------ identite */
  var ME = ls(MEKEY);
  if (ME && !P(ME)) ME = null;
  function paintMe(){
    for (var i = 0; i < meEls.length; i++){
      var e = meEls[i];
      e.innerHTML = '';
      e.appendChild(avatar(ME));
      var t = document.createElement('span');
      t.textContent = ME ? P(ME).n : 'Qui suis-je ?';
      e.appendChild(t);
    }
  }
  var meOpen = false;
  function askMe(force, cb){
    if (meOpen) return;              /* jamais deux fois la même fenêtre */
    meOpen = true;
    var ov = document.createElement('div');
    ov.className = 'modal';
    var card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '<h3>Qui êtes-vous ?</h3><p>Pour savoir qui a fait quoi : les coches de la check-list, les +1 sur les suggestions. Vous pourrez en changer à tout moment avec le bouton en haut à droite.</p>';
    var g = document.createElement('div');
    g.className = 'grid';
    PEOPLE.forEach(function(p){
      var b = document.createElement('button');
      b.type = 'button';
      b.appendChild(avatar(p.k));
      var s = document.createElement('span'); s.textContent = p.n; b.appendChild(s);
      b.addEventListener('click', function(){
        ME = p.k; ls(MEKEY, p.k); paintMe(); closeMe(); render();
        if (typeof cb === 'function') cb();
      });
      g.appendChild(b);
    });
    card.appendChild(g);
    function closeMe(){
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      meOpen = false;
    }
    if (force !== true){
      var c = document.createElement('button');
      c.type = 'button'; c.className = 'btn close';
      c.textContent = ME ? 'Annuler' : 'Je regarde juste';
      c.addEventListener('click', closeMe);
      card.appendChild(c);
    }
    ov.appendChild(card);
    ov.addEventListener('click', function(e){ if (e.target === ov && force !== true) closeMe(); });
    document.body.appendChild(ov);
  }
  for (var mi = 0; mi < meEls.length; mi++) meEls[mi].addEventListener('click', function(){ askMe(); });
  paintMe();

  /* ------------------------------------------------- base de donnees */
  var DB = {s:{}, i:{}, g:{}, t:{}, d:{}, a:{}, del:{}, ord:{}, loc:{}, st:{}}, CLOUD = false, ROOT = null, ready = false;
  var SNAP = false;   /* true = on affiche la copie hors ligne, en lecture seule */

  function defaults(){
    var d = {s:{}, i:{}};
    DEF_S.forEach(function(s){ d.s[s.id] = {t:s.t, o:s.o}; });
    DEF_I.forEach(function(it){ d.i[it.id] = {s:it.s, o:it.o, t:it.t, n:it.n, m:it.m, w:{}, a:null, d:null}; });
    return d;
  }
  function saveLocal(){ ls(LKEY, JSON.stringify(DB)); }

  /* Rattrapage : le badge « chacun · N/7 » était affiché DANS le titre modifiable,
     donc chaque passage en édition le recopiait dans le texte enregistré
     (« Faire son ESTAchacun · 0/7 »). On nettoie ce qui a déjà été abîmé. */
  var TAG_RE = /(?:\s*chacun\s*·\s*\d+\s*\/\s*\d+)+\s*$/i;
  function repairTitles(){
    var fixed = [];
    Object.keys(DB.i || {}).forEach(function(k){
      var it = DB.i[k];
      if (!it || typeof it.t !== 'string') return;
      var c = it.t.replace(TAG_RE, '').trim();
      if (c && c !== it.t){ it.t = c; fixed.push(k); }
    });
    if (!fixed.length) return;
    if (CLOUD){
      var o = {};
      fixed.forEach(function(k){ o[k + '/t'] = DB.i[k].t; });
      ROOT.child('i').update(o);
    } else saveLocal();
  }

  function applyPath(obj, path, val){
    var ks = path.split('/'), cur = obj;
    for (var i = 0; i < ks.length - 1; i++){ if (typeof cur[ks[i]] !== 'object' || !cur[ks[i]]) cur[ks[i]] = {}; cur = cur[ks[i]]; }
    if (val === null) delete cur[ks[ks.length - 1]]; else cur[ks[ks.length - 1]] = val;
  }
  /* Une ecriture Firebase qui echoue levait une exception avalee par le
     gestionnaire de clic : rien ne se passait, sans le moindre message.
     On l'attrape et on l'affiche dans la pastille de synchro. */
  function writeFail(e, path){
    if (window.console) console.error('Echec ecriture', path, e);
    setSync('off', 'Enregistrement refuse');
    setTimeout(function(){ if (CLOUD) setSync('on', 'Partage \u2014 a jour'); }, 4000);
  }
  function readOnly(){
    setSync('off', 'Hors ligne — lecture seule');
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = 'Pas de connexion : la page affiche la dernière version reçue. Les modifications seront possibles dès que le réseau revient.';
    document.body.appendChild(t);
    setTimeout(function(){ if (t.parentNode) t.parentNode.removeChild(t); }, 4500);
  }
  function cloud(path, fn){
    try { fn(ROOT.child(path)); }
    catch (e){ writeFail(e, path); }
  }
  function patch(base, obj){
    if (SNAP){ readOnly(); return; }
    if (CLOUD){ cloud(base, function(r){ r.update(obj); }); return; }
    Object.keys(obj).forEach(function(k){ applyPath(DB, base + '/' + k, obj[k]); });
    saveLocal(); render();
  }
  function drop(path){
    if (SNAP){ readOnly(); return; }
    if (CLOUD){ cloud(path, function(r){ r.remove(); }); return; }
    applyPath(DB, path, null); saveLocal(); render();
  }
  function put(path, val){
    if (SNAP){ readOnly(); return; }
    if (CLOUD){ cloud(path, function(r){ r.set(val); }); return; }
    applyPath(DB, path, val); saveLocal(); render();
  }

  /* ------------------------------------------------------------ calculs */
  function secs(){
    return Object.keys(DB.s).map(function(k){ var o = DB.s[k]; return {id:k, t:o.t, o:o.o || 0}; })
                 .sort(function(a, b){ return a.o - b.o; });
  }
  function items(sid){
    return Object.keys(DB.i).filter(function(k){ return DB.i[k].s === sid; })
      .map(function(k){ var o = DB.i[k]; return {id:k, d:o}; })
      .sort(function(a, b){ return (a.d.o || 0) - (b.d.o || 0); });
  }
  function isDone(it){
    if (it.m === 'each'){
      var w = it.w || {};
      for (var i = 0; i < PEOPLE.length; i++) if (!w[PEOPLE[i].k]) return false;
      return true;
    }
    return !!it.d;
  }
  function doneCount(it){
    if (it.m !== 'each') return isDone(it) ? 1 : 0;
    var w = it.w || {}, n = 0;
    PEOPLE.forEach(function(p){ if (w[p.k]) n++; });
    return n;
  }
  function totals(){
    var d = 0, t = 0;
    Object.keys(DB.i).forEach(function(k){ t++; if (isDone(DB.i[k])) d++; });
    return [d, t];
  }
  function concerns(it, who){
    if (it.m === 'each') return true;
    return it.a === who;
  }

  /* ------------------------------------------------------------- rendu */
  var FILTER = 'all', editing = null, pending = false;

  function match(it){
    if (FILTER === 'todo') return !isDone(it);
    if (FILTER === 'free') return it.m === 'once' && !it.a && !it.d;
    if (FILTER === 'mine'){
      if (!ME) return true;
      if (it.m === 'each') return !(it.w || {})[ME];
      return it.a === ME && !it.d;
    }
    return true;
  }

  function personRow(id, it){
    var row = document.createElement('div');
    row.className = 'who-row';
    var w = it.w || {};
    PEOPLE.forEach(function(p){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pp' + (w[p.k] ? ' on' : '') + (p.k === ME ? ' self' : '');
      b.title = w[p.k] ? (p.n + ' — fait ' + ago(w[p.k])) : (p.n + ' — pas encore');
      b.appendChild(avatar(p.k));
      var s = document.createElement('span'); s.textContent = p.n; b.appendChild(s);
      b.addEventListener('click', function(){
        var o = {}; o['w/' + p.k] = w[p.k] ? null : Date.now();
        patch('i/' + id, o);
      });
      row.appendChild(b);
    });
    return row;
  }

  /* Confirmation avant une suppression : reprend le style des autres modales
     (Echap ou clic hors de la carte = annuler ; le focus part sur Annuler). */
  function askConfirm(title, msgHtml, okLabel, cb){
    var ov = document.createElement('div');
    ov.className = 'modal';
    var card = document.createElement('div');
    card.className = 'card ask';
    card.innerHTML = '<h3>' + esc(title) + '</h3><p>' + msgHtml + '</p>';
    var row = document.createElement('div'); row.className = 'actions';
    var no = document.createElement('button');
    no.type = 'button'; no.className = 'cancel'; no.textContent = 'Annuler';
    var yes = document.createElement('button');
    yes.type = 'button'; yes.className = 'danger'; yes.textContent = okLabel;
    row.appendChild(no); row.appendChild(yes);
    card.appendChild(row); ov.appendChild(card);
    function close(){
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e){ if (e.key === 'Escape' || e.keyCode === 27) close(); }
    no.addEventListener('click', close);
    yes.addEventListener('click', function(){ close(); cb(); });
    ov.addEventListener('click', function(e){ if (e.target === ov) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(ov);
    no.focus();
  }

  function pickPerson(anchorText, cb){
    var ov = document.createElement('div');
    ov.className = 'modal';
    var card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '<h3>' + esc(anchorText) + '</h3><p>Choisissez la personne qui s\'en charge.</p>';
    var g = document.createElement('div'); g.className = 'grid';
    PEOPLE.forEach(function(p){
      var b = document.createElement('button'); b.type = 'button';
      b.appendChild(avatar(p.k));
      var s = document.createElement('span'); s.textContent = p.n; b.appendChild(s);
      b.addEventListener('click', function(){ document.body.removeChild(ov); cb(p.k); });
      g.appendChild(b);
    });
    card.appendChild(g);
    var c = document.createElement('button');
    c.type = 'button'; c.className = 'btn close'; c.textContent = 'Personne pour l\'instant';
    c.addEventListener('click', function(){ document.body.removeChild(ov); cb(null); });
    card.appendChild(c);
    ov.appendChild(card);
    ov.addEventListener('click', function(e){ if (e.target === ov) document.body.removeChild(ov); });
    document.body.appendChild(ov);
  }

  /* Les textes déjà écrits sont figés pour tout le monde, sauf pour le profil
     ADMIN qui peut les corriger sur place. Attention : le badge « chacun · N/7 »
     doit rester EN DEHORS du span modifiable, sinon il se recopie dans le titre
     à chaque édition (voir repairTitles). */
  function canEdit(){ return ME === ADMIN; }

  function editable(e, onSave){
    e.classList.add('editable');
    e.contentEditable = 'true'; e.spellcheck = false;
    e.title = 'Cliquez pour corriger';
    e.addEventListener('focus', function(){ editing = e; });
    e.addEventListener('blur', function(){
      editing = null;
      onSave(e.textContent.trim());
      if (pending){ pending = false; render(); }
    });
    e.addEventListener('keydown', function(ev){ if (ev.key === 'Enter'){ ev.preventDefault(); e.blur(); } });
    return e;
  }

  function txtEl(cls, text, ph, onSave){
    var e = document.createElement('span');
    e.className = cls;
    e.textContent = text || '';
    if (!canEdit()) return e;
    if (ph) e.setAttribute('data-ph', ph);
    return editable(e, onSave);
  }

  /* Saisie du texte AVANT création, puisqu'on ne peut plus le retoucher ensuite.
     intro  : phrase d'explication facultative (null si inutile).
     fields : [{label, ph, multi}] — le premier champ est obligatoire. */
  function askText(title, intro, fields, okLabel, cb){
    var ov = document.createElement('div');
    ov.className = 'modal';
    var card = document.createElement('div');
    card.className = 'card ask';
    card.innerHTML = '<h3>' + esc(title) + '</h3>' + (intro ? '<p>' + intro + '</p>' : '');
    var inputs = [];
    fields.forEach(function(f){
      var wrap = document.createElement('label');
      wrap.className = 'field';
      var lb = document.createElement('span'); lb.textContent = f.label;
      var el;
      if (f.checkbox){
        wrap.className = 'field field-check';
        el = document.createElement('input');
        el.type = 'checkbox';
        el.checked = !!f.value;
      } else if (f.options){
        el = document.createElement('select');
        f.options.forEach(function(o){
          var op = document.createElement('option');
          op.value = o; op.textContent = o; el.appendChild(op);
        });
        if (f.value) el.value = f.value;
      } else {
        el = document.createElement(f.multi ? 'textarea' : 'input');
        if (f.multi) el.rows = 2; else el.type = 'text';
        el.placeholder = f.ph || '';
        if (f.value) el.value = f.value;
      }
      if (f.checkbox){ wrap.appendChild(el); wrap.appendChild(lb); }
      else { wrap.appendChild(lb); wrap.appendChild(el); }
      card.appendChild(wrap);
      inputs.push(el);
    });
    var row = document.createElement('div'); row.className = 'actions';
    var no = document.createElement('button');
    no.type = 'button'; no.className = 'cancel'; no.textContent = 'Annuler';
    var yes = document.createElement('button');
    yes.type = 'button'; yes.className = 'ok'; yes.textContent = okLabel;
    row.appendChild(no); row.appendChild(yes);
    card.appendChild(row); ov.appendChild(card);
    function close(){
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      document.removeEventListener('keydown', onKey);
    }
    function valid(){
      var v = inputs.map(function(el){ return el.type === 'checkbox' ? el.checked : el.value.trim(); });
      if (!v[0] && !fields[0].allowEmpty){ inputs[0].focus(); return; }
      close(); cb(v);
    }
    function onKey(e){
      if (e.key === 'Escape' || e.keyCode === 27) close();
      else if ((e.key === 'Enter' || e.keyCode === 13) && e.target.tagName !== 'TEXTAREA'
               && e.target.tagName !== 'SELECT'){ e.preventDefault(); valid(); }
    }
    no.addEventListener('click', close);
    yes.addEventListener('click', valid);
    ov.addEventListener('click', function(e){ if (e.target === ov) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(ov);
    inputs[0].focus();
  }

  function itemEl(id, it){
    var done = isDone(it);
    var li = document.createElement('li');
    li.className = 'citem mode-' + it.m + (done ? ' done' : '');

    if (it.m === 'once'){
      var box = document.createElement('span');
      box.className = 'box'; box.setAttribute('role', 'checkbox');
      box.setAttribute('aria-checked', done ? 'true' : 'false'); box.tabIndex = 0;
      var tog = function(){
        if (!ME){ askMe(true); return; }
        patch('i/' + id, it.d ? {d:null, dby:null} : {d:Date.now(), dby:ME});
      };
      box.addEventListener('click', tog);
      box.addEventListener('keydown', function(e){ if (e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); tog(); } });
      li.appendChild(box);
    }

    var body = document.createElement('div');
    body.className = 'body';

    var t = txtEl('txt', it.t, null, function(v){
      if (v === it.t) return;
      if (!v){ render(); return; }        /* on ne vide pas un intitulé par accident */
      patch('i/' + id, {t:v});
    });
    body.appendChild(t);
    if (it.m === 'each'){
      var tag = document.createElement('span');
      tag.className = 'tag-each';
      tag.textContent = 'chacun · ' + doneCount(it) + '/' + PEOPLE.length;
      body.insertBefore(tag, t.nextSibling);
    }
    if (it.n || canEdit()){
      body.appendChild(txtEl('note', it.n, 'ajouter une précision…', function(v){
        if (v !== it.n) patch('i/' + id, {n:v});
      }));
    }

    if (it.m === 'each'){
      body.appendChild(personRow(id, it));
    } else {
      var foot = document.createElement('div');
      foot.className = 'item-foot';
      if (it.d && it.dby){
        var db = document.createElement('span');
        db.className = 'doneby';
        db.appendChild(avatar(it.dby));
        var sp = document.createElement('span'); sp.textContent = 'fait par ' + P(it.dby).n + ' ' + ago(it.d);
        db.appendChild(sp);
        foot.appendChild(db);
      } else {
        var a = document.createElement('button');
        a.type = 'button';
        a.className = 'asg' + (it.a ? '' : ' none');
        if (it.a){ a.appendChild(avatar(it.a)); var s2 = document.createElement('span'); s2.textContent = P(it.a).n + " s'en occupe"; a.appendChild(s2); }
        else a.textContent = "Qui s'en occupe ?";
        a.addEventListener('click', function(){
          pickPerson(it.t || 'Cette tâche', function(k){ patch('i/' + id, {a:k}); });
        });
        foot.appendChild(a);
        if (!it.a && ME){
          var mine = document.createElement('button');
          mine.type = 'button'; mine.className = 'mini-btn'; mine.textContent = "je m'en occupe";
          mine.addEventListener('click', function(){ patch('i/' + id, {a:ME}); });
          foot.appendChild(mine);
        }
      }
      var md = document.createElement('button');
      md.type = 'button'; md.className = 'mini-btn'; md.textContent = 'chacun doit le faire';
      md.title = 'Transformer en tâche que les 7 doivent faire chacun de leur côté';
      md.addEventListener('click', function(){ patch('i/' + id, {m:'each', a:null, d:null, dby:null}); });
      foot.appendChild(md);
      body.appendChild(foot);
    }

    if (it.m === 'each'){
      var f2 = document.createElement('div');
      f2.className = 'item-foot';
      var md2 = document.createElement('button');
      md2.type = 'button'; md2.className = 'mini-btn'; md2.textContent = 'une seule fois pour le groupe';
      md2.addEventListener('click', function(){ patch('i/' + id, {m:'once', w:null}); });
      f2.appendChild(md2);
      body.appendChild(f2);
    }

    li.appendChild(body);

    var del = document.createElement('button');
    del.type = 'button'; del.className = 'del'; del.title = 'Supprimer'; del.textContent = '×';
    del.addEventListener('click', function(){
      askConfirm('Supprimer cette ligne ?',
        'Vous allez supprimer <b>« ' + esc(it.t || 'cette ligne') + ' »</b>'
        + (CLOUD ? ' pour <b>tout le monde</b>.' : '.') + " C'est définitif.",
        'Supprimer', function(){ drop('i/' + id); });
    });
    li.appendChild(del);
    return li;
  }

  function render(){
    if (editing){ pending = true; return; }   /* ne pas rafraîchir sous les doigts */
    window.__nycDB = DB;   /* pont lu par le script des cartes (étapes supprimées, activités localisées) */
    /* pont pour trip.js : heure de départ de chaque journée (branche « st ») */
    window.__nycSetStart = function(dayId, hhmm){ if (canEdit()) put('st/' + dayId, hhmm || null); };
    window.__nycCanEdit = canEdit();
    listEl.innerHTML = '';
    secs().forEach(function(s){
      var its = items(s.id), shown = its.filter(function(x){ return match(x.d); });
      if (!shown.length && FILTER !== 'all') return;

      var sec = document.createElement('section');
      sec.className = 'csec';
      var head = document.createElement('div');
      head.className = 'csec-head';
      var h3 = document.createElement('h3');
      h3.textContent = s.t;
      if (canEdit()) editable(h3, function(v){
        if (v && v !== s.t) put('s/' + s.id + '/t', v); else if (!v) render();
      });
      var cnt = document.createElement('span');
      cnt.className = 'cnt';
      var d = its.filter(function(x){ return isDone(x.d); }).length;
      cnt.textContent = its.length ? d + '/' + its.length : '—';
      var dsec = document.createElement('button');
      dsec.type = 'button'; dsec.className = 'del-sec'; dsec.title = 'Supprimer la catégorie'; dsec.textContent = '×';
      dsec.addEventListener('click', function(){
        askConfirm('Supprimer cette catégorie ?',
          'Vous allez supprimer <b>« ' + esc(s.t) + ' »</b> et ses <b>' + its.length
          + ' ligne' + (its.length > 1 ? 's' : '') + '</b>'
          + (CLOUD ? ', pour <b>tout le monde</b>.' : '.') + " C'est définitif.",
          'Tout supprimer', function(){
            its.forEach(function(x){ drop('i/' + x.id); });
            drop('s/' + s.id);
          });
      });
      head.appendChild(h3); head.appendChild(cnt); head.appendChild(dsec);

      var ul = document.createElement('ul');
      ul.className = 'citems';
      shown.forEach(function(x){ ul.appendChild(itemEl(x.id, x.d)); });

      var add = document.createElement('button');
      add.type = 'button'; add.className = 'add-item'; add.textContent = '＋ Ajouter une ligne';
      add.addEventListener('click', function(){
        askText('Ajouter une ligne à « ' + s.t + ' »', null, [
          {label:'Intitulé', ph:'Ex. Réserver le van pour JFK'},
          {label:'Précision (facultatif)', ph:'Détail, lien, montant…', multi:true}
        ], 'Ajouter', function(v){
          var id = 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
          var mo = its.length ? (its[its.length - 1].d.o || 0) + 10 : 10;
          put('i/' + id, {s:s.id, o:mo, t:v[0], n:v[1], m:'once', a:(ME || null), d:null});
        });
      });

      sec.appendChild(head); sec.appendChild(ul); sec.appendChild(add);
      listEl.appendChild(sec);
    });
    paintTotals();
    renderSugg();
    ensureSids();
    applyDayMoves();
    applyOrder();
    renderExtras();
    renderDescs();
    renderGetins();
    renderStopTools();
    syncMapExtras();
    if (window.__nycRepaintMaps) window.__nycRepaintMaps();
    document.dispatchEvent(new CustomEvent('nyc:rendered'));
  }

  /* Donne au script des cartes les activités ajoutées qui ont une adresse
     déjà localisée (branche DB.a, champs lat/lng posés par geocode()). */
  function syncMapExtras(){
    Array.prototype.forEach.call(document.querySelectorAll('.daymap'), function(box){
      var m = box.__m;
      if (!m) return;
      var prefix = m.id + ':';
      var list = [];
      Object.keys(DB.a || {}).forEach(function(k){
        var act = DB.a[k];
        if (act && typeof act.a === 'string' && act.a.indexOf(prefix) === 0
            && typeof act.lat === 'number' && typeof act.lng === 'number'){
          list.push({name: act.t || 'Activité', ll: [act.lat, act.lng]});
        }
      });
      m.extra = list;
    });
  }

  /* ------------------------------------------- suggestions d'activités
     Stockées dans la branche « g » de la même base que la check-list :
     elles sont donc partagées en direct entre les 7. */
  function suggs(){
    return Object.keys(DB.g || {}).map(function(k){ return {id:k, d:DB.g[k]}; })
                 .sort(function(a, b){
                   /* les plus demandées en haut, puis les plus récentes */
                   return votes(b.d).length - votes(a.d).length || (b.d.at || 0) - (a.d.at || 0);
                 });
  }

  function votes(g){
    var w = g.w || {}, out = [];
    PEOPLE.forEach(function(p){ if (w[p.k]) out.push(p); });
    return out;
  }

  function renderSugg(){
    var list = suggs();
    var lbl = list.length
      ? list.length + (list.length > 1 ? ' propositions' : ' proposition')
      : "aucune pour l'instant";
    for (var c = 0; c < sgCounts.length; c++) sgCounts[c].textContent = lbl;
    if (sgJump){
      sgJump.textContent = list.length
        ? 'Voir les ' + lbl
        : 'Voir les suggestions';
    }

    sgBody.innerHTML = '';
    if (!list.length){
      var tr0 = document.createElement('tr');
      var td0 = document.createElement('td');
      td0.className = 'sg-none'; td0.colSpan = 4;
      td0.textContent = "Rien de proposé pour l'instant — lancez-vous.";
      tr0.appendChild(td0); sgBody.appendChild(tr0);
      return;
    }

    list.forEach(function(x){
      var g = x.d, tr = document.createElement('tr');

      var c1 = document.createElement('td');
      var t = document.createElement('span'); t.className = 'sg-t'; t.textContent = g.t || '';
      c1.appendChild(t);
      if (g.p || g.h){
        var meta = document.createElement('span'); meta.className = 'sg-meta';
        if (g.p){
          var pp = document.createElement('span'); pp.className = 'sg-pill';
          pp.textContent = '💵 ≈ ' + approx(g.p); pp.title = 'Prix approximatif par personne';
          meta.appendChild(pp);
        }
        if (g.h){
          var hh = document.createElement('span'); hh.className = 'sg-pill';
          hh.textContent = '⏱ ≈ ' + approx(g.h); hh.title = 'Durée approximative';
          meta.appendChild(hh);
        }
        c1.appendChild(meta);
      }
      tr.appendChild(c1);

      /* « ça m'intéresse » : un +1 par personne, comme les coches de la check-list */
      var c2 = document.createElement('td'); c2.className = 'sg-int';
      var v = votes(g), mine = !!(ME && (g.w || {})[ME]);
      var plus = document.createElement('button');
      plus.type = 'button';
      plus.className = 'sg-plus' + (mine ? ' on' : '');
      plus.textContent = mine ? '✓ ça m’intéresse' : '+1';
      plus.title = mine ? 'Retirer mon +1' : "Dire que ça m'intéresse";
      plus.addEventListener('click', function(){
        if (!ME){ askMe(true, function(){ vote(x.id, g); }); return; }
        vote(x.id, g);
      });
      c2.appendChild(plus);
      var cnt = document.createElement('span');
      cnt.className = 'sg-cnt'; cnt.textContent = v.length + '/' + PEOPLE.length;
      c2.appendChild(cnt);
      if (v.length){
        var avs = document.createElement('span'); avs.className = 'sg-avs';
        avs.title = v.map(function(p){ return p.n; }).join(', ');
        v.forEach(function(p){ avs.appendChild(avatar(p.k)); });
        c2.appendChild(avs);
      }
      tr.appendChild(c2);

      var c3 = document.createElement('td');
      var by = document.createElement('span'); by.className = 'sg-by';
      by.appendChild(avatar(g.by));
      var nm = document.createElement('span'); nm.textContent = P(g.by) ? P(g.by).n : '?';
      by.appendChild(nm);
      c3.appendChild(by);
      if (g.at){
        var w = document.createElement('span'); w.className = 'sg-when'; w.textContent = ago(g.at);
        c3.appendChild(w);
      }
      tr.appendChild(c3);

      var c4 = document.createElement('td'); c4.className = 'sg-x';
      var del = document.createElement('button');
      del.type = 'button'; del.className = 'del'; del.title = 'Retirer cette suggestion'; del.textContent = '×';
      del.addEventListener('click', function(){
        askConfirm('Retirer cette suggestion ?',
          'Vous allez retirer <b>« ' + esc(g.t || 'cette suggestion') + ' »</b>'
          + (CLOUD ? ' pour <b>tout le monde</b>.' : '.') + " C'est définitif.",
          'Retirer', function(){ drop('g/' + x.id); });
      });
      c4.appendChild(del); tr.appendChild(c4);

      sgBody.appendChild(tr);
    });
  }

  function vote(id, g){
    var w = g.w || {}, o = {};
    o['w/' + ME] = w[ME] ? null : Date.now();
    patch('g/' + id, o);
  }
  function suggestBox(){
    askText('Suggérer une activité',
      "Le prix et la durée sont <b>approximatifs</b>, une estimation à la louche suffit. Si vous n'avez pas l'info, laissez vide — ce n'est pas grave, on complétera plus tard.",
      [
        {label:'Activité', ph:'Ex. Match des Rangers au Madison Square Garden'},
        {label:'Prix à peu près, par personne (facultatif)', ph:'Ex. 30 $, gratuit, entre 20 et 40 $…'},
        {label:'Temps que ça prend, à peu près (facultatif)', ph:'Ex. 2 h, une demi-journée, la soirée…'}
      ],
      'Proposer', function(v){
        var id = 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        put('g/' + id, {t:v[0], p:v[1], h:v[2], by:ME, at:Date.now(), w:{}});
      });
  }
  for (var sa = 0; sa < sgAdds.length; sa++){
    sgAdds[sa].addEventListener('click', function(){
      if (!ME) askMe(true, suggestBox); else suggestBox();
    });
  }

  /* ------------------------------------------------ blocs « transport »
     Ajoutés entre deux étapes du programme, depuis la page, par le profil ADMIN.
     Chaque bloc retient son point d'ancrage « jour:position » : position 0 =
     avant la 1re étape du jour, n = après la n-ième. */
  var MOYENS = ['🚶 À pied', '🚇 Métro', '🚆 PATH', '🚌 Bus',
                '🚕 Uber / VTC', '🚐 Van privé', '🚗 Voiture de location',
                '⛴️ Ferry', '🚈 Train', '🚡 Téléphérique', '🧭 Autre'];

  /* ------------------------------------------------ blocs « activité »
     Ajoutées entre deux étapes du programme, comme les transports ci-dessus,
     par le profil ADMIN. Même ancrage « jour:position ». */
  var COSTS = ['Gratuit', 'Inclus Go City', 'À part / prix'];
  function costLabel(c){ return c === 'inc' ? 'Inclus Go City' : c === 'free' ? 'Gratuit' : 'À part / prix'; }
  function costCode(l){ return l === 'Inclus Go City' ? 'inc' : l === 'Gratuit' ? 'free' : 'no'; }

  /* --------------------------------- barre d'outils commune aux blocs
     transport / activité ajoutés depuis la page (monter/descendre d'un cran,
     changer de jour). Le glisser-déposer sert pour les étapes d'origine ;
     ici, plus simple : ces blocs sont ancrés « jour:position », donc on
     déplace juste l'ancre. */
  /* L'ancre d'un bloc ajouté est « jour:repère », où repère vaut soit "0"
     (tout au début du jour) soit le data-sid d'une étape (« juste après elle »).
     On utilise l'identifiant stable des étapes plutôt qu'une position
     numérique : sinon, réordonner les étapes d'origine faisait « sauter »
     les blocs ajoutés vers un autre voisinage sans que ce soit voulu. */
  function extraDayId(anchor){ return anchor.split(':')[0]; }
  function extraAfterKey(anchor){ return anchor.slice(anchor.indexOf(':') + 1); }

  function extraToolbar(kind, id, anchor){
    var tools = document.createElement('div'); tools.className = 'stop-tools';

    var up = document.createElement('button');
    up.type = 'button'; up.className = 'ord-btn'; up.title = 'Monter (avant l’étape précédente)'; up.textContent = '↑';
    up.addEventListener('click', function(){ shiftExtraAnchor(kind, id, anchor, -1); });
    tools.appendChild(up);

    var down = document.createElement('button');
    down.type = 'button'; down.className = 'ord-btn'; down.title = 'Descendre (après l’étape suivante)'; down.textContent = '↓';
    down.addEventListener('click', function(){ shiftExtraAnchor(kind, id, anchor, 1); });
    tools.appendChild(down);

    var sel = document.createElement('select');
    sel.className = 'day-move'; sel.title = 'Déplacer vers un autre jour';
    dayOptions().forEach(function(d){
      var op = document.createElement('option'); op.value = d.id; op.textContent = d.label;
      sel.appendChild(op);
    });
    sel.value = extraDayId(anchor);
    sel.addEventListener('change', function(){ moveExtraToDay(kind, id, anchor, sel.value); });
    tools.appendChild(sel);

    return tools;
  }

  /* Ordre visuel complet d'un jour : étapes d'origine ET blocs ajoutés
     (transport/activité), dans l'ordre exact où renderExtras() les affiche.
     Sert de base à shiftExtraAnchor ci-dessous : sans ça, monter/descendre
     ne « voyait » que les étapes d'origine et sautait par-dessus tous les
     blocs ajoutés voisins d'un coup, au lieu d'échanger avec le voisin
     immédiat (visuellement, ça ne bougeait presque jamais comme attendu). */
  function fullSlots(day, dayId){
    var del = DB.del || {};
    var stops = stopsOf(day).filter(function(li){ return !del[li.getAttribute('data-sid')]; });
    var out = [];
    for (var i = 0; i <= stops.length; i++){
      var afterKey = (i === 0) ? '0' : stops[i - 1].getAttribute('data-sid');
      extrasAt(dayId + ':' + afterKey).forEach(function(x){ out.push({kind: x.kind, id: x.id}); });
      if (i < stops.length) out.push({sid: stops[i].getAttribute('data-sid')});
    }
    /* blocs dont l'étape de repère n'est plus dans ce jour : affichés en fin
       de journée par renderExtras, ils doivent aussi pouvoir bouger */
    var valid = {'0': true};
    stops.forEach(function(li){ valid[li.getAttribute('data-sid')] = true; });
    var orphans = [];
    ['t', 'a'].forEach(function(kind){
      var src = (kind === 't' ? DB.t : DB.a) || {};
      Object.keys(src).forEach(function(k){
        var o = src[k];
        if (o && o.a && extraDayId(o.a) === dayId && !valid[extraAfterKey(o.a)]) orphans.push({kind: kind, id: k, o: o.o || 0});
      });
    });
    orphans.sort(function(x, y){ return x.o - y.o; })
           .forEach(function(x){ out.push({kind: x.kind, id: x.id}); });
    return out;
  }

  /* Réaffecte repère + ordre de tous les blocs ajoutés du jour d'après une
     liste de slots (étapes + blocs) déjà dans l'ordre visuel voulu. */
  function commitSlotOrder(dayId, slots){
    /* un seul envoi pour tout : ordre des étapes du jour + repère de chaque
       bloc ajouté (sinon on voit des états intermédiaires, et un « monter »
       qui croise une étape d'origine n'était jamais enregistré) */
    var upd = {}, counters = {}, afterKey = '0', sids = [];
    slots.forEach(function(s){
      if (s.sid){ afterKey = s.sid; sids.push(s.sid); return; }
      var anchor = dayId + ':' + afterKey;
      var o = (counters[anchor] = (counters[anchor] || 0) + 10);
      upd[(s.kind === 't' ? 't/' : 'a/') + s.id + '/a'] = anchor;
      upd[(s.kind === 't' ? 't/' : 'a/') + s.id + '/o'] = o;
    });
    /* les étapes supprimées (masquées) gardent leur place, en fin de liste */
    var day = document.querySelector('.day[data-day="' + dayId + '"]');
    if (day) stopsOf(day).forEach(function(li){
      var sid = li.getAttribute('data-sid');
      if (sids.indexOf(sid) < 0) sids.push(sid);
    });
    upd['ord/' + dayId] = sids;
    multi(upd);
  }
  function multi(obj){
    if (SNAP){ readOnly(); return; }
    if (CLOUD){
      try { ROOT.update(obj); } catch (e){ writeFail(e, Object.keys(obj).join(',')); }
      return;
    }
    Object.keys(obj).forEach(function(k){ applyPath(DB, k, obj[k]); });
    saveLocal(); render();
  }

  function shiftExtraAnchor(kind, id, curAnchor, dir){
    var dayId = extraDayId(curAnchor);
    var day = document.querySelector('.day[data-day="' + dayId + '"]');
    if (!day) return;
    var slots = fullSlots(day, dayId);
    var idx = -1;
    for (var k = 0; k < slots.length; k++){
      if (slots[k].kind === kind && slots[k].id === id){ idx = k; break; }
    }
    if (idx < 0) return;
    var newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= slots.length) return;
    var tmp = slots[idx]; slots[idx] = slots[newIdx]; slots[newIdx] = tmp;
    commitSlotOrder(dayId, slots);
  }

  function moveExtraToDay(kind, id, curAnchor, targetDayId){
    var srcDayId = extraDayId(curAnchor);
    if (srcDayId === targetDayId) return;
    var day = document.querySelector('.day[data-day="' + targetDayId + '"]');
    var stops = day ? stopsOf(day) : [];
    var afterKey = stops.length ? stops[stops.length - 1].getAttribute('data-sid') : '0';
    put((kind === 't' ? 't/' : 'a/') + id + '/a', targetDayId + ':' + afterKey);
  }

  function activityBlock(id, act){
    var li = document.createElement('li');
    li.className = 'actv' + (act.alt ? ' is-alt' : '');
    li.setAttribute('data-xid', id);

    var ph = document.createElement('div'); ph.className = 'ph';
    if (act.img){
      var img = document.createElement('img'); img.src = act.img; img.alt = act.t || ''; img.loading = 'lazy';
      ph.appendChild(img);
    } else {
      var lbl = document.createElement('span'); lbl.className = 'ph-lbl'; lbl.textContent = '🖼️ Pas de photo';
      ph.appendChild(lbl);
    }
    li.appendChild(ph);

    var cbody = document.createElement('div'); cbody.className = 'cbody';

    var top = document.createElement('div'); top.className = 'stop-top';
    var bnum = document.createElement('span'); bnum.className = 'pin-badge actv';
    top.appendChild(bnum);
    var nm = document.createElement('span'); nm.className = 'stop-name'; nm.textContent = act.t || '';
    top.appendChild(nm);

    var right = document.createElement('span'); right.className = 'stop-tr';
    if (act.d){
      var du = document.createElement('span'); du.className = 'dur'; du.textContent = act.d;
      right.appendChild(du);
    }
    var co = document.createElement('span'); co.className = 'cost ' + (act.c || 'no');
    co.textContent = act.c === 'inc' ? 'inclus Go City' : act.c === 'free' ? 'gratuit' : (act.cp || 'à part');
    right.appendChild(co);
    if (act.addr){
      var pin = document.createElement('span'); pin.className = 'pin-ok';
      pin.textContent = '📍';
      pin.title = (typeof act.lat === 'number')
        ? 'Repérée sur la carte du jour (' + act.addr + ')'
        : 'Adresse enregistrée, recherche de la position en cours…';
      right.appendChild(pin);
    }
    top.appendChild(right);
    cbody.appendChild(top);

    if (act.alt){
      var altTag = document.createElement('span'); altTag.className = 'alt-tag'; altTag.textContent = 'Alternative';
      cbody.appendChild(altTag);
    }

    if (act.h || act.mv){
      var meta = document.createElement('div'); meta.className = 'stop-meta';
      if (act.h){ var hd = document.createElement('span'); hd.className = 'hood'; hd.textContent = act.h; meta.appendChild(hd); }
      if (act.mv){ var mv = document.createElement('span'); mv.className = 'move'; mv.textContent = act.mv; meta.appendChild(mv); }
      cbody.appendChild(meta);
    }
    if (act.n){
      var note = document.createElement('div'); note.className = 'stop-note'; note.textContent = act.n;
      cbody.appendChild(note);
    }

    if (canEdit()) cbody.appendChild(extraToolbar('a', id, act.a));
    li.appendChild(cbody);

    if (canEdit()){
      var mod = document.createElement('button');
      mod.type = 'button'; mod.className = 'extra-edit'; mod.title = 'Modifier cette activité';
      mod.textContent = '✎';
      mod.addEventListener('click', function(){ activityForm(act.a, id, act); });
      li.appendChild(mod);

      var del = document.createElement('button');
      del.type = 'button'; del.className = 'del'; del.title = 'Supprimer cette activité';
      del.textContent = '×';
      del.addEventListener('click', function(){
        askConfirm('Supprimer cette activité ?',
          'Vous allez supprimer <b>« ' + esc(act.t || 'cette activité') + ' »</b>'
          + (CLOUD ? ' pour <b>tout le monde</b>.' : '.') + " C'est définitif.",
          'Supprimer', function(){ drop('a/' + id); });
      });
      li.appendChild(del);
    }
    return li;
  }

  /* Geolocalisation par adresse (API Nominatim/OpenStreetMap, gratuite, sans
     clé). Utilisée pour poser automatiquement un point sur la carte du jour
     quand on ajoute une activité avec son adresse. */
  function geocode(q, cb){
    try{
      fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(q))
        .then(function(r){ return r.json(); })
        .then(function(arr){
          cb((arr && arr.length) ? {lat: parseFloat(arr[0].lat), lng: parseFloat(arr[0].lon)} : null);
        })
        .catch(function(){ cb(null); });
    }catch(e){ cb(null); }
  }

  function activityForm(anchor, id, cur){
    cur = cur || {};
    askText(id ? 'Modifier l’activité' : 'Ajouter une activité',
      'Durée et prix sont <b>approximatifs</b>. L’adresse est utilisée pour placer'
      + ' automatiquement un point sur la carte du jour — soyez aussi précis·e que possible'
      + ' (numéro, rue, ville). Laissez vide ce que vous ne savez pas encore.',
      [
        {label:'Nom de l’activité', ph:'Ex. Balade à Central Park', value:cur.t},
        {label:'Adresse (facultatif, pour la carte)', ph:'Ex. 20 W 34th St, New York, NY 10001', value:cur.addr},
        {label:'Quartier (facultatif)', ph:'Ex. Upper West Side', value:cur.h},
        {label:'Durée à peu près (facultatif)', ph:'Ex. 1 h 30', value:cur.d},
        {label:'Coût', options:COSTS, value:costLabel(cur.c)},
        {label:'Prix ou précision sur le coût (facultatif)', ph:'Ex. 25 $, réservation conseillée…', value:cur.cp},
        {label:'Comment y aller (facultatif)', ph:'Ex. à pied (~10 min), métro ligne 6…', value:cur.mv},
        {label:'URL d’une photo (facultatif)', ph:'https://…', value:cur.img},
        {label:'Remarque (facultatif)', ph:'Ce qu’il faut savoir…', multi:true, value:cur.n, allowEmpty:true},
        {label:'Alternative (option de rechange, pas le plan principal)', checkbox:true, value:cur.alt}
      ],
      id ? 'Enregistrer' : 'Ajouter', function(v){
        var addr = (v[1] || '').trim();
        var o = {a:anchor, t:v[0], addr:addr, h:v[2], d:v[3], c:costCode(v[4]), cp:v[5], mv:v[6], img:v[7], n:v[8], alt:v[9]};
        o.o = id ? (cur.o || 0) : Date.now();
        var pid = id || ('x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5));

        if (!addr){ o.lat = null; o.lng = null; put('a/' + pid, o); return; }
        if (addr === cur.addr && typeof cur.lat === 'number'){
          o.lat = cur.lat; o.lng = cur.lng; put('a/' + pid, o); return;
        }
        /* adresse neuve, changée, ou jamais localisée : on enregistre tout de
           suite, puis on complète les coordonnées dès qu'on les a */
        put('a/' + pid, o);
        geocode(addr, function(loc){ if (loc) patch('a/' + pid, {lat: loc.lat, lng: loc.lng}); });
      });
  }

  function extrasAt(anchor){
    var out = [];
    Object.keys(DB.t || {}).forEach(function(k){
      if (DB.t[k] && DB.t[k].a === anchor) out.push({id:k, d:DB.t[k], kind:'t'});
    });
    Object.keys(DB.a || {}).forEach(function(k){
      if (DB.a[k] && DB.a[k].a === anchor) out.push({id:k, d:DB.a[k], kind:'a'});
    });
    return out.sort(function(x, y){ return (x.d.o || 0) - (y.d.o || 0); });
  }

  function transBlock(id, tr){
    var li = document.createElement('li');
    li.className = 'trans';

    var ico = document.createElement('span');
    ico.className = 'tr-ico';
    ico.textContent = (tr.m || '🧭').split(' ')[0];
    li.appendChild(ico);

    var body = document.createElement('div'); body.className = 'tr-body';
    var top  = document.createElement('div'); top.className = 'tr-top';
    var nm   = document.createElement('span'); nm.className = 'tr-name';
    nm.textContent = (tr.m || '').replace(/^\S+\s*/, '') + (tr.l ? ' — ' + tr.l : '');
    top.appendChild(nm);

    if (tr.d || tr.p){
      var right = document.createElement('span'); right.className = 'stop-tr';
      if (tr.d){
        var du = document.createElement('span'); du.className = 'dur'; du.textContent = tr.d;
        right.appendChild(du);
      }
      if (tr.p){
        var co = document.createElement('span'); co.className = 'cost no';
        co.textContent = '≈ ' + approx(tr.p);
        right.appendChild(co);
      }
      top.appendChild(right);
    }
    body.appendChild(top);

    if (tr.n){
      var nt = document.createElement('div'); nt.className = 'tr-note'; nt.textContent = tr.n;
      body.appendChild(nt);
    }

    if (canEdit()) body.appendChild(extraToolbar('t', id, tr.a));
    li.appendChild(body);

    if (canEdit()){
      var mod = document.createElement('button');
      mod.type = 'button'; mod.className = 'tr-edit'; mod.title = 'Modifier ce transport';
      mod.textContent = '✎';
      mod.addEventListener('click', function(){ transForm(tr.a, id, tr); });
      li.appendChild(mod);

      var del = document.createElement('button');
      del.type = 'button'; del.className = 'del'; del.title = 'Supprimer ce transport';
      del.textContent = '×';
      del.addEventListener('click', function(){
        askConfirm('Supprimer ce transport ?',
          'Vous allez supprimer <b>« ' + esc(nm.textContent || 'ce trajet') + ' »</b>'
          + (CLOUD ? ' pour <b>tout le monde</b>.' : '.') + " C'est définitif.",
          'Supprimer', function(){ drop('t/' + id); });
      });
      li.appendChild(del);
    }
    return li;
  }

  function transForm(anchor, id, cur){
    cur = cur || {};
    askText(id ? 'Modifier le transport' : 'Ajouter un transport',
      'Durée et prix sont <b>approximatifs</b>. Laissez vide ce que vous ne savez pas encore.',
      [
        {label:'Moyen de transport', options:MOYENS, value:cur.m},
        {label:'Ligne, direction, arrêt… (facultatif)', ph:'Ex. Ligne 7 → Flushing, arrêt 42 St', value:cur.l},
        {label:'Durée à peu près (facultatif)', ph:'Ex. 25 min', value:cur.d},
        {label:'Prix à peu près (facultatif)', ph:'Ex. 2,90 $/pers., 45 $ le van…', value:cur.p},
        {label:'Remarque (facultatif)', ph:'Tickets, correspondance, accès PMR…', multi:true, value:cur.n}
      ],
      id ? 'Enregistrer' : 'Ajouter', function(v){
        var o = {a:anchor, m:v[0], l:v[1], d:v[2], p:v[3], n:v[4]};
        if (id){ o.o = cur.o || 0; put('t/' + id, o); }
        else {
          o.o = Date.now();
          put('t/x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), o);
        }
      });
  }

  function gapBtn(anchor){
    var li = document.createElement('li');
    li.className = 'trans-gap';
    var b1 = document.createElement('button');
    b1.type = 'button'; b1.className = 'add-trans';
    b1.textContent = '＋ Transport ici';
    b1.addEventListener('click', function(){ transForm(anchor, null, null); });
    li.appendChild(b1);

    var b2 = document.createElement('button');
    b2.type = 'button'; b2.className = 'add-trans add-act';
    b2.textContent = '＋ Activité ici';
    b2.addEventListener('click', function(){ activityForm(anchor, null, null); });
    li.appendChild(b2);
    return li;
  }

  function renderExtras(){
    Array.prototype.forEach.call(document.querySelectorAll('.day[data-day]'), function(day){
      var dayId = day.getAttribute('data-day');
      var ul = day.querySelector('ul.stops');
      if (!ul) return;

      /* on repart de la liste d'origine : on retire ce qu'on avait injecté */
      Array.prototype.slice.call(ul.children).forEach(function(li){
        if (li.classList.contains('trans') || li.classList.contains('actv') || li.classList.contains('trans-gap')) ul.removeChild(li);
      });

      /* les étapes supprimées ne comptent pas comme repère : sinon leur
         emplacement (invisible, display:none) crée un « trou » avec deux
         rangées de boutons ＋ qui se retrouvent visuellement collées */
      var del = DB.del || {};
      var stops = stopsOf(day).filter(function(li){ return !del[li.getAttribute('data-sid')]; });
      var validKeys = {'0': true};
      stops.forEach(function(li){ validKeys[li.getAttribute('data-sid')] = true; });

      for (var i = stops.length; i >= 0; i--){
        var afterKey = (i === 0) ? '0' : stops[i - 1].getAttribute('data-sid');
        var anchor = dayId + ':' + afterKey;
        var frag = document.createDocumentFragment();
        extrasAt(anchor).forEach(function(x){
          frag.appendChild(x.kind === 't' ? transBlock(x.id, x.d) : activityBlock(x.id, x.d));
        });
        if (canEdit()) frag.appendChild(gapBtn(anchor));
        if (frag.childNodes.length) ul.insertBefore(frag, stops[i] || null);
      }

      /* filet de secours : un bloc dont le repère (étape) a disparu de ce
         jour — déplacée ailleurs, jour vidé… — réapparaît en fin de journée
         plutôt que de se perdre silencieusement. */
      var orphans = [];
      Object.keys(DB.t || {}).forEach(function(k){
        var o = DB.t[k];
        if (o && o.a && extraDayId(o.a) === dayId && !validKeys[extraAfterKey(o.a)]) orphans.push({id:k, d:o, kind:'t'});
      });
      Object.keys(DB.a || {}).forEach(function(k){
        var o = DB.a[k];
        if (o && o.a && extraDayId(o.a) === dayId && !validKeys[extraAfterKey(o.a)]) orphans.push({id:k, d:o, kind:'a'});
      });
      if (orphans.length){
        orphans.sort(function(x, y){ return (x.d.o || 0) - (y.d.o || 0); });
        var frag2 = document.createDocumentFragment();
        orphans.forEach(function(x){ frag2.appendChild(x.kind === 't' ? transBlock(x.id, x.d) : activityBlock(x.id, x.d)); });
        ul.appendChild(frag2);
      }

      numberExtras(day);
    });
  }

  /* Numérote les blocs transport/activité ajoutés, dans leur ordre visuel
     (les deux types partagent la même numérotation — badges violet/gris). */
  function numberExtras(day){
    /* une seule numérotation par journée, étapes d'origine et activités
       ajoutées confondues, dans l'ordre affiché (le script des cartes refait
       la même chose pour les journées qui ont une carte) */
    var del = DB.del || {}, n = 0;
    Array.prototype.forEach.call(
      day.querySelectorAll('ul.stops > li:not(.trans):not(.trans-gap)'),
      function(li){
        if (del[li.getAttribute('data-sid')]) return;
        var b = li.querySelector('.pin-badge');
        n++;
        if (b) b.textContent = n;
      }
    );
  }
  /* --------------------------------- descriptions réécrites des étapes
     Le texte d'origine est dans le HTML. Le profil ADMIN peut le remplacer :
     la réécriture est stockée dans la branche « d », sous la clé « jour#numéro »
     (2#1 = 1re étape du jour 2). Vider le champ restaure le texte d'origine. */
  function stopsOf(day){
    return Array.prototype.slice.call(
      day.querySelectorAll('ul.stops > li:not(.trans):not(.trans-gap):not(.actv)'));
  }

  /* --------------------------------- identifiant stable de chaque étape
     Posé une seule fois par le script des cartes (data-sid, basé sur l'ordre
     d'origine du HTML) : on le reprend tel quel ici pour que suppression,
     description et réordonnancement pointent tous vers la même étape, même
     après un glisser-déposer. Filet de secours si jamais l'attribut manque
     (jour sans carte). */
  function sidOf(li, dayId, i){
    return li.getAttribute('data-sid') || (dayId + '-' + (i + 1));
  }
  function ensureSids(){
    Array.prototype.forEach.call(document.querySelectorAll('.day[data-day]'), function(day){
      var dayId = day.getAttribute('data-day');
      stopsOf(day).forEach(function(li, i){
        if (!li.getAttribute('data-sid')) li.setAttribute('data-sid', sidOf(li, dayId, i));
      });
    });
  }

  /* --------------------------------- ordre personnalisé des étapes
     DB.ord[jour] retient la liste des data-sid dans l'ordre voulu. Une étape
     jamais déplacée, ou une étape ajoutée après coup, se retrouve simplement
     à la fin : rien à migrer. */
  function applyOrder(){
    Array.prototype.forEach.call(document.querySelectorAll('.day[data-day]'), function(day){
      var dayId = day.getAttribute('data-day');
      var ul = day.querySelector('ul.stops');
      if (!ul) return;
      var bySid = {};
      stopsOf(day).forEach(function(li){ bySid[li.getAttribute('data-sid')] = li; });

      var order = [];
      ((DB.ord || {})[dayId] || []).forEach(function(sid){
        if (bySid[sid]){ order.push(sid); delete bySid[sid]; }
      });
      stopsOf(day).forEach(function(li){
        var sid = li.getAttribute('data-sid');
        if (bySid[sid]){ order.push(sid); delete bySid[sid]; }
      });

      order.forEach(function(sid){
        var li = ul.querySelector('li[data-sid="' + sid + '"]');
        if (li) ul.appendChild(li);
      });
    });
  }

  /* --------------------------------- déplacer une étape vers un autre jour
     DB.loc[sid] = jour d'accueil quand il diffère du jour d'origine (celui
     lu dans le sid, ex. "2-3" -> jour "2"). Posé au début de render(), donc
     avant applyOrder() : l'étape est physiquement rattachée à son nouveau
     jour avant que ce jour ne calcule son propre ordre. */
  function applyDayMoves(){
    var loc = DB.loc || {};
    Object.keys(loc).forEach(function(sid){
      var targetDayId = loc[sid];
      if (!targetDayId) return;
      var li = document.querySelector('li[data-sid="' + sid + '"]');
      if (!li) return;
      var targetDay = document.querySelector('.day[data-day="' + targetDayId + '"]');
      if (!targetDay) return;
      var ul = targetDay.querySelector('ul.stops');
      if (ul && li.parentNode !== ul) ul.appendChild(li);
    });
  }

  function commitMove(sid, srcDayId, dstDayId, srcDay, dstDay){
    if (srcDayId && srcDayId !== dstDayId){
      put('ord/' + srcDayId, stopsOf(srcDay).map(function(x){ return x.getAttribute('data-sid'); }));
    }
    var origDayId = sid.split('-')[0];
    put('loc/' + sid, (dstDayId === origDayId) ? null : dstDayId);
    put('ord/' + dstDayId, stopsOf(dstDay).map(function(x){ return x.getAttribute('data-sid'); }));
  }

  function moveToDay(li, targetDayId){
    var sid = li.getAttribute('data-sid');
    var srcDay = li.closest('.day');
    var srcDayId = srcDay ? srcDay.getAttribute('data-day') : null;
    if (!sid || !targetDayId || targetDayId === srcDayId) return;
    var targetDay = document.querySelector('.day[data-day="' + targetDayId + '"]');
    if (!targetDay) return;
    var ul = targetDay.querySelector('ul.stops');
    if (ul) ul.appendChild(li);
    commitMove(sid, srcDayId, targetDayId, srcDay, targetDay);
  }

  /* Monter / descendre une étape d'un cran PARMI CE QUI EST AFFICHÉ :
     étapes d'origine, activités et transports ajoutés confondus.  Avant,
     seules les étapes d'origine comptaient, y compris celles supprimées
     (masquées) : l'étape échangeait sa place avec un bloc invisible, ou ne
     pouvait pas passer au-dessus d'une activité ajoutée — rien ne bougeait. */
  function moveStop(li, dir){
    var day = li.closest('.day');
    if (!day) return;
    var dayId = day.getAttribute('data-day');
    var slots = fullSlots(day, dayId), sid = li.getAttribute('data-sid');
    var i = -1;
    for (var k = 0; k < slots.length; k++) if (slots[k].sid === sid){ i = k; break; }
    var j = i + dir;
    if (i < 0 || j < 0 || j >= slots.length) return;
    var tmp = slots[i]; slots[i] = slots[j]; slots[j] = tmp;
    commitSlotOrder(dayId, slots);
  }

  function wireDrag(li, handle){
    handle.draggable = true;
    handle.addEventListener('dragstart', function(e){
      e.dataTransfer.setData('text/plain', li.getAttribute('data-sid'));
      e.dataTransfer.effectAllowed = 'move';
      li.classList.add('dragging');
    });
    handle.addEventListener('dragend', function(){ li.classList.remove('dragging'); });

    if (li.__dragWired) return;
    li.__dragWired = true;
    li.addEventListener('dragover', function(e){ e.preventDefault(); li.classList.add('drag-over'); });
    li.addEventListener('dragleave', function(){ li.classList.remove('drag-over'); });
    li.addEventListener('drop', function(e){
      e.preventDefault();
      e.stopPropagation();   /* empêche le <ul> du jour de traiter le même dépôt en double */
      li.classList.remove('drag-over');
      var srcSid = e.dataTransfer.getData('text/plain');
      var dstSid = li.getAttribute('data-sid');
      if (!srcSid || srcSid === dstSid) return;
      var srcLi = document.querySelector('li[data-sid="' + srcSid + '"]');
      if (!srcLi) return;
      var dstDay = li.closest('.day');
      if (!dstDay) return;
      var srcDay = srcLi.closest('.day');
      var dstDayId = dstDay.getAttribute('data-day');
      var srcDayId = srcDay ? srcDay.getAttribute('data-day') : null;

      if (srcDayId !== dstDayId){
        /* déposé sur une étape d'un AUTRE jour : on la déplace physiquement
           juste avant, puis on enregistre le nouvel ordre des deux jours */
        var dstUl = dstDay.querySelector('ul.stops');
        if (dstUl) dstUl.insertBefore(srcLi, li);
        commitMove(srcSid, srcDayId, dstDayId, srcDay, dstDay);
        return;
      }

      var sids = stopsOf(dstDay).map(function(x){ return x.getAttribute('data-sid'); });
      var from = sids.indexOf(srcSid);
      if (from < 0) return;
      sids.splice(from, 1);
      var to = sids.indexOf(dstSid);
      if (to < 0) return;
      sids.splice(to, 0, srcSid);
      put('ord/' + dstDayId, sids);
    });
  }

  /* Déposer directement sur le <ul> (pas sur une étape précise) : sert
     surtout pour un jour vide comme « À caler », où il n'y a encore aucune
     carte-étape sur laquelle lâcher le glisser-déposer. */
  function wireDayDrop(ul){
    if (ul.__dragWired) return;
    ul.__dragWired = true;
    ul.addEventListener('dragover', function(e){ e.preventDefault(); });
    ul.addEventListener('drop', function(e){
      if (e.target !== ul) return;   /* une étape a déjà géré ce dépôt (stopPropagation) */
      e.preventDefault();
      var srcSid = e.dataTransfer.getData('text/plain');
      if (!srcSid) return;
      var srcLi = document.querySelector('li[data-sid="' + srcSid + '"]');
      if (!srcLi) return;
      var dstDay = ul.closest('.day');
      if (!dstDay) return;
      var srcDay = srcLi.closest('.day');
      var dstDayId = dstDay.getAttribute('data-day');
      var srcDayId = srcDay ? srcDay.getAttribute('data-day') : null;
      if (srcDayId === dstDayId) return;
      ul.appendChild(srcLi);
      commitMove(srcSid, srcDayId, dstDayId, srcDay, dstDay);
    });
  }

  /* --------------------------------- suppression des étapes d'origine
     Chaque étape du HTML garde son texte tel quel : on la cache seulement
     (même data-sid que ci-dessus) et on lui ajoute une petite barre d'outils
     (glisser, monter, descendre, supprimer) pour le profil ADMIN. */
  function stopLabel(li){
    var n = li.querySelector('.stop-name');
    if (n){
      var c = n.cloneNode(true), t = c.querySelector('.opttag');
      if (t) t.parentNode.removeChild(t);
      return c.textContent.replace(/\s+/g, ' ').trim();
    }
    var l = li.querySelector('.lbl'), hd = li.querySelector('.hood');
    return l ? (l.textContent.trim() + (hd ? ' — ' + hd.textContent.trim() : '')) : 'cette étape';
  }

  function dayOptions(){
    return Array.prototype.map.call(document.querySelectorAll('.day[data-day]'), function(d){
      var num = d.querySelector('.day-num'), title = d.querySelector('.day-title');
      return {
        id: d.getAttribute('data-day'),
        label: (num ? num.textContent.trim() : d.getAttribute('data-day')) + ' — ' + (title ? title.textContent.trim() : '')
      };
    });
  }

  function renderStopTools(){
    var days = dayOptions();
    Array.prototype.forEach.call(document.querySelectorAll('.day[data-day]'), function(day){
      var dayId = day.getAttribute('data-day');
      var dayUl = day.querySelector('ul.stops');
      if (canEdit() && dayUl) wireDayDrop(dayUl);
      stopsOf(day).forEach(function(li, i){
        var key = sidOf(li, dayId, i);
        li.hidden = !!(DB.del || {})[key];

        var cbody = li.querySelector('.cbody');
        if (!cbody) return;
        var old = cbody.querySelector('.stop-tools');
        if (old) cbody.removeChild(old);
        if (canEdit()){
          var name = stopLabel(li);
          var tools = document.createElement('div'); tools.className = 'stop-tools';

          var handle = document.createElement('span');
          handle.className = 'drag-handle'; handle.title = 'Glisser pour réordonner';
          handle.textContent = '⠿';
          tools.appendChild(handle);
          wireDrag(li, handle);

          var up = document.createElement('button');
          up.type = 'button'; up.className = 'ord-btn'; up.title = 'Monter'; up.textContent = '↑';
          up.addEventListener('click', function(){ moveStop(li, -1); });
          tools.appendChild(up);

          var down = document.createElement('button');
          down.type = 'button'; down.className = 'ord-btn'; down.title = 'Descendre'; down.textContent = '↓';
          down.addEventListener('click', function(){ moveStop(li, 1); });
          tools.appendChild(down);

          var sel = document.createElement('select');
          sel.className = 'day-move'; sel.title = 'Déplacer vers un autre jour';
          days.forEach(function(d){
            var op = document.createElement('option'); op.value = d.id; op.textContent = d.label;
            sel.appendChild(op);
          });
          sel.value = dayId;
          sel.addEventListener('change', function(){ moveToDay(li, sel.value); });
          tools.appendChild(sel);

          var b = document.createElement('button');
          b.type = 'button'; b.className = 'rm-stop'; b.textContent = '× Supprimer cette étape';
          b.addEventListener('click', function(){
            askConfirm('Supprimer cette étape ?',
              'Vous allez supprimer <b>« ' + esc(name) + ' »</b>'
              + (CLOUD ? ' pour <b>tout le monde</b>.' : '.') + " C'est définitif.",
              'Supprimer', function(){ put('del/' + key, true); });
          });
          tools.appendChild(b);

          cbody.appendChild(tools);
        }
      });
    });
  }

  /* Dans un encadré repas, le texte libre suit un <br> sans balise à lui :
     on l'enveloppe une fois pour tout dans un <span> qu'on saura remplacer. */
  function eatDesc(cbody){
    var d = cbody.querySelector('.eat-desc');
    if (d) return d;
    var br = cbody.querySelector('br');
    if (!br) return null;
    d = document.createElement('span');
    d.className = 'eat-desc';
    var n = br.nextSibling;
    while (n){ var nx = n.nextSibling; d.appendChild(n); n = nx; }
    cbody.appendChild(d);
    d.setAttribute('data-orig', d.innerHTML);
    return d;
  }

  function descForm(key, current, name){
    askText('Description de l\u2019étape',
      'Vous réécrivez la description de <b>« ' + esc(name) + ' »</b> pour tout le monde.'
      + ' Videz le champ et enregistrez pour revenir au texte d\u2019origine.',
      [{label:'Description', ph:'Ce qu\u2019il faut savoir sur cette étape…', multi:true,
        value:current, allowEmpty:true}],
      'Enregistrer', function(v){
        if (v[0]) put('d/' + key, v[0]); else drop('d/' + key);
      });
  }

  function renderDescs(){
    Array.prototype.forEach.call(document.querySelectorAll('.day[data-day]'), function(day){
      var dayId = day.getAttribute('data-day');
      stopsOf(day).forEach(function(li, i){
        var cbody = li.querySelector('.cbody');
        if (!cbody) return;

        var key  = sidOf(li, dayId, i);   /* pas de # : interdit par Firebase */
        var over = (DB.d || {})[key];
        var eat  = li.classList.contains('eat');
        var note, name;

        if (eat){
          var lb = li.querySelector('.lbl'), hd = li.querySelector('.hood');
          name = (lb ? lb.textContent.trim() : 'ce repas')
               + (hd ? ' \u2014 ' + hd.textContent.trim() : '');
          note = eatDesc(cbody);
          if (!note) return;
          if (over) note.textContent = over;
          else note.innerHTML = note.getAttribute('data-orig') || '';
        } else {
          note = cbody.querySelector('.stop-note');
          name = li.querySelector('.stop-name');
          name = name ? name.textContent.trim() : 'cette étape';

          /* on garde le texte du HTML pour pouvoir y revenir */
          if (note && note.getAttribute('data-orig') === null){
            note.setAttribute('data-orig', note.innerHTML);
          }

          if (over){
            if (!note){
              note = document.createElement('div');
              note.className = 'stop-note';
              note.setAttribute('data-orig', '');
              cbody.appendChild(note);
            }
            note.textContent = over;
          } else if (note){
            var orig = note.getAttribute('data-orig');
            if (orig) note.innerHTML = orig;
            else { cbody.removeChild(note); note = null; }
          }
        }

        /* bouton d'ajout laissé au tour précédent */
        var old = cbody.querySelector('.add-desc');
        if (old) cbody.removeChild(old);

        if (note){
          note.classList.toggle('editable', canEdit());
          note.title = canEdit() ? 'Cliquez pour modifier la description' : '';
          if (canEdit() && !note.__wired){
            note.__wired = true;
            note.addEventListener('click', function(){
              if (!canEdit()) return;   /* l'ecouteur survit a un changement de profil */
              descForm(key, (DB.d || {})[key] || note.textContent.trim(), name);
            });
          }
        } else if (canEdit() && !eat){
          var b = document.createElement('button');
          b.type = 'button'; b.className = 'add-desc';
          b.textContent = '＋ Description';
          b.addEventListener('click', function(){ descForm(key, '', name); });
          cbody.appendChild(b);
        }
      });
    });
  }

  /* --------------------------------- texte d'intro de chaque jour (le
     bandeau vert « Aller au 1er spot : … »). Même mécanique que les
     descriptions d'étape : réécriture stockée dans la branche « d », sous
     une clé qui ne peut pas entrer en collision avec celles des étapes. */
  function getinForm(dayId, current, dayTitle){
    var key = 'gi-' + dayId;
    askText('Texte d’introduction du jour',
      'Vous réécrivez le texte d’introduction de <b>« ' + esc(dayTitle) + ' »</b> pour tout le monde.'
      + ' Videz le champ et enregistrez pour revenir au texte d’origine.',
      [{label:'Texte', ph:'Ex. Aller au 1er spot : …', multi:true, value:current, allowEmpty:true}],
      'Enregistrer', function(v){
        if (v[0]) put('d/' + key, v[0]); else drop('d/' + key);
      });
  }

  function renderGetins(){
    Array.prototype.forEach.call(document.querySelectorAll('.day[data-day]'), function(day){
      var dayId = day.getAttribute('data-day');
      var box = day.querySelector('.getin');
      if (!box) return;
      var textEl = box.children[1];
      if (!textEl) return;
      if (textEl.getAttribute('data-orig') === null) textEl.setAttribute('data-orig', textEl.innerHTML);

      var key = 'gi-' + dayId;
      var over = (DB.d || {})[key];
      if (over) textEl.textContent = over;
      else textEl.innerHTML = textEl.getAttribute('data-orig') || '';

      textEl.classList.add('gi-text');
      textEl.classList.toggle('editable', canEdit());
      textEl.title = canEdit() ? 'Cliquez pour modifier ce texte' : '';
      if (canEdit() && !textEl.__wired){
        textEl.__wired = true;
        textEl.addEventListener('click', function(){
          if (!canEdit()) return;
          var titleEl = day.querySelector('.day-title');
          var name = titleEl ? titleEl.textContent.trim() : ('jour ' + dayId);
          getinForm(dayId, (DB.d || {})[key] || textEl.textContent.trim(), name);
        });
      }
    });
  }

  function paintTotals(){
    var x = totals(), d = x[0], t = x[1];
    barEl.style.width = t ? (100 * d / t).toFixed(1) + '%' : '0%';
    lblEl.textContent = d + ' sur ' + t + ' ✓';
    cntEl.textContent = d + '/' + t;
    cntEl.className = (t && d === t) ? 'tb-count done' : 'tb-count';

    var last = 0, lastBy = null;
    Object.keys(DB.i).forEach(function(k){
      var it = DB.i[k], w = it.w || {};
      Object.keys(w).forEach(function(p){ if (w[p] > last){ last = w[p]; lastBy = p; } });
      if (it.d && it.d > last){ last = it.d; lastBy = it.dby || null; }
    });
    lastEl.textContent = last && lastBy
      ? 'Dernière action : ' + P(lastBy).n + ' ' + ago(last)
      : 'Départ le lundi 19 octobre, 22h40 à JFK';

    sumEl.innerHTML = '';
    PEOPLE.forEach(function(p){
      var td = 0, tt = 0;
      Object.keys(DB.i).forEach(function(k){
        var it = DB.i[k];
        if (it.m === 'each'){ tt++; if ((it.w || {})[p.k]) td++; }
        else if (it.a === p.k){ tt++; if (it.d) td++; }
      });
      var c = document.createElement('div');
      c.className = 'psum';
      c.appendChild(avatar(p.k));
      var w = document.createElement('div');
      w.innerHTML = '<b>' + esc(p.n) + '</b> ' + td + '/' + tt;
      var mb = document.createElement('div');
      mb.className = 'mini';
      var mi = document.createElement('i');
      mi.style.width = tt ? (100 * td / tt) + '%' : '0%';
      mi.style.background = p.c;
      mb.appendChild(mi); w.appendChild(mb);
      c.appendChild(w);
      sumEl.appendChild(c);
    });
  }

  /* --------------------------------------------------------- controles */
  Array.prototype.forEach.call(document.querySelectorAll('[data-ck-filter]'), function(b){
    b.addEventListener('click', function(){
      FILTER = b.getAttribute('data-ck-filter');
      Array.prototype.forEach.call(document.querySelectorAll('[data-ck-filter]'), function(x){
        if (x === b) x.classList.add('on'); else x.classList.remove('on');
      });
      if (FILTER === 'mine' && !ME) askMe();
      render();
    });
  });
  $('[data-ck-print]').addEventListener('click', function(){ window.print(); });
  $('[data-ck-addsec]').addEventListener('click', function(){
    askText('Nouvelle catégorie', null, [{label:'Nom de la catégorie', ph:'Ex. Bagages'}], 'Créer', function(v){
      var id = 's' + Date.now().toString(36);
      var mx = 0; secs().forEach(function(s){ if (s.o > mx) mx = s.o; });
      put('s/' + id, {t:v[0], o:mx + 10});
    });
  });
  $('[data-ck-reset]').addEventListener('click', function(){
    askConfirm("Revenir à la liste d'origine ?",
      CLOUD
        ? 'La liste sera remise à zéro <b>pour tout le monde</b> : les ajouts et les coches de chacun seront perdus.'
        : 'Vos ajouts et vos coches seront perdus.',
      'Réinitialiser', function(){
        var d = defaults();
        d.g = DB.g || {};     /* ni les suggestions, transports, activités */
        d.t = DB.t || {};     /* ajoutées, descriptions réécrites ou      */
        d.d = DB.d || {};     /* étapes supprimées ne font partie de la   */
        d.a = DB.a || {};     /* check-list : on les conserve             */
        d.del = DB.del || {};
        d.ord = DB.ord || {};
        d.loc = DB.loc || {};
        d.st = DB.st || {};
        if (CLOUD) ROOT.set(d); else { DB = d; saveLocal(); render(); }
      });
  });

  /* ------------------------------------------------------------ synchro */
  function setSync(cls, txt){
    syncEl.className = 'sync-pill ' + cls;
    syncEl.innerHTML = '<span class="dot"></span><span>' + esc(txt) + '</span>';
  }
  function loadScript(src, cb){
    var s = document.createElement('script');
    s.src = src; s.onload = function(){ cb(); }; s.onerror = function(){ cb('err'); };
    document.head.appendChild(s);
  }
  function startLocal(msg){
    CLOUD = false; SNAP = false;
    var raw = ls(LKEY);
    try{ DB = raw ? JSON.parse(raw) : defaults(); }catch(e){ DB = defaults(); }
    if (!DB.i || !Object.keys(DB.i).length) DB = defaults();
    if (!DB.g) DB.g = {};
    if (!DB.t) DB.t = {};
    if (!DB.d) DB.d = {};
    if (!DB.a) DB.a = {};
    if (!DB.del) DB.del = {};
    if (!DB.ord) DB.ord = {};
    if (!DB.loc) DB.loc = {};
    if (!DB.st) DB.st = {};
    if (ls(LKEY, JSON.stringify(DB)) === null){
      warnEl.innerHTML = '<div class="stor-warn">Ce navigateur n\'autorise pas l\'enregistrement local : vos coches dispara\u00eetront à la fermeture.</div>';
    }
    setSync('', msg || 'Liste locale');
    if (!CFG.databaseURL){
      warnEl.innerHTML += '<div class="setup"><b>Cette liste n\'est pas encore partagée.</b> Chacun a sa copie dans son navigateur. Pour que les 7 voient la même liste en direct, renseignez <code>databaseURL</code> en haut du script de cette page — la marche à suivre est dans <b>HEBERGEMENT.md</b> (à la racine du dépôt).</div>';
    }
    repairTitles();
    ready = true; render();
  }
  /* Hors ligne (métro, avion), Firebase ne répond pas : sans rien de plus, la
     page retombait sur le programme d'origine et une liste vide. On garde donc
     une copie de la dernière version partagée reçue, affichée tout de suite,
     en lecture seule tant que Firebase n'a pas pris le relais. */
  function showSnapshot(){
    var raw = ls(SKEY), v;
    try{ v = raw ? JSON.parse(raw) : null; }catch(e){ v = null; }
    if (!v || !v.i || !Object.keys(v.i).length) return false;
    DB = v; SNAP = true;
    setSync('off', 'Hors ligne — dernière version');
    ready = true; render();
    return true;
  }
  function offline(){
    if (SNAP) setSync('off', 'Hors ligne — dernière version');
    else startLocal('Hors ligne — liste locale');
  }
  function startCloud(){
    if (!showSnapshot()) setSync('', 'Connexion…');
    var base = 'https://www.gstatic.com/firebasejs/10.12.5/';
    loadScript(base + 'firebase-app-compat.js', function(e1){
      if (e1) return offline();
      loadScript(base + 'firebase-database-compat.js', function(e2){
        if (e2) return offline();
        try{
          firebase.initializeApp({databaseURL: CFG.databaseURL});
          ROOT = firebase.database().ref(CFG.path || 'voyage-ny-2026');
          CLOUD = true; SNAP = false;
          firebase.database().ref('.info/connected').on('value', function(s){
            if (s.val()) setSync('on', 'Partagé — à jour'); else setSync('off', 'Reconnexion…');
          });
          ROOT.on('value', function(snap){
            var v = snap.val() || {};
            DB = {s: v.s || {}, i: v.i || {}, g: v.g || {}, t: v.t || {}, d: v.d || {}, a: v.a || {}, del: v.del || {}, ord: v.ord || {}, loc: v.loc || {}, st: v.st || {}};
            if (!Object.keys(DB.i).length && !ready){ ROOT.set(defaults()); return; }
            ls(SKEY, JSON.stringify(DB));
            repairTitles();
            ready = true; render();
          }, function(){ startLocal('Accès refusé — liste locale'); });
        }catch(err){ offline(); }
      });
    });
  }
  if (CFG.databaseURL) startCloud(); else startLocal();

  setInterval(function(){ if (ready && !editing) paintTotals(); }, 60000);

  /* ----------------------------------------------------- bascule onglets */
  var tabs  = {prog: document.getElementById('tab-prog'),  check: document.getElementById('tab-check')};
  var views = {prog: document.getElementById('view-prog'), check: document.getElementById('view-check')};
  function show(which){
    Object.keys(views).forEach(function(k){
      views[k].hidden = (k !== which);
      tabs[k].setAttribute('aria-selected', k === which ? 'true' : 'false');
    });
    ls('nyc2026:tab', which);
    if (which === 'prog' && window.__nycRefreshMaps) window.__nycRefreshMaps();
    if (which === 'check' && !ME) setTimeout(function(){ askMe(); }, 250);
    window.scrollTo(0, 0);
  }
  tabs.prog.addEventListener('click', function(){ show('prog'); });
  tabs.check.addEventListener('click', function(){ show('check'); });
  if (ls('nyc2026:tab') === 'check') show('check');

  /* L'identité sert maintenant partout (coches, +1 sur les suggestions, droit de
     correction), plus seulement dans la check-list : on la demande dès l'arrivée.
     Non bloquant — « Je regarde juste » ferme, et la question revient à la première
     action qui a besoin de savoir qui vous êtes. */
  if (!ME) setTimeout(function(){ if (!ME) askMe(); }, 500);
})();
