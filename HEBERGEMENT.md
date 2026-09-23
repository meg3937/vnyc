# Hébergement et entretien du site

Le site est un site **statique** : pas de serveur à faire tourner. N'importe quel
hébergement de fichiers convient (GitHub Pages, Netlify, etc.). La seule partie
« vivante » est la base Firebase qui partage la check-list, les suggestions et
les modifications du programme entre les 7.

## Organisation des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Le programme jour par jour (textes, étapes, restos) et la check-list |
| `css/style.css` | Toute la mise en forme, y compris le mode sombre et l'impression |
| `js/config.js` | **Les réglages à modifier** : base Firebase, adresse du logement, numéros d'urgence, dates |
| `js/map.js` | Les cartes du jour (Leaflet + OpenStreetMap) et les coordonnées des étapes |
| `js/app.js` | La check-list partagée, les suggestions, l'édition du programme |
| `js/trip.js` | Compte à rebours, mode « Aujourd'hui », météo, horloges, thème |
| `sw.js` | Le mode hors ligne (service worker) |
| `manifest.webmanifest`, `icons/` | L'installation sur l'écran d'accueil du téléphone |
| `img/` | Les photos, en WebP |

## Publier avec GitHub Pages

1. Sur GitHub : **Settings → Pages**.
2. *Source* : « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Le site est en ligne quelques minutes plus tard à l'adresse
   `https://<compte>.github.io/<dépôt>/`.

Le mode hors ligne et l'installation sur le téléphone ont besoin de **https**.
GitHub Pages le fournit. Ils ne marchent pas si on ouvre `index.html` en
double-cliquant dessus.

## Partager la check-list en direct (Firebase)

Sans Firebase, chacun a sa propre liste dans son navigateur.

1. Créer un projet sur <https://console.firebase.google.com>.
2. **Build → Realtime Database → Create database** (région Europe).
3. Copier l'URL de la base (`https://…firebasedatabase.app/`) dans
   `databaseURL`, dans `js/config.js`.
4. `path` est le « dossier » utilisé dans la base : une chaîne difficile à
   deviner fait office de mot de passe léger.

### Règles de sécurité conseillées

Il n'y a pas de compte utilisateur : toute personne qui a le lien du site peut
lire et écrire. Pour limiter la casse, ne rien autoriser en dehors du dossier
du voyage (**Realtime Database → Rules**) :

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "ny-a7f3k9m2": {
      ".read": true,
      ".write": true
    }
  }
}
```

Remplacez `ny-a7f3k9m2` par la valeur de `path` si vous la changez. Pensez aussi à
faire de temps en temps un export de sauvegarde : dans la console Firebase,
menu ⋮ puis **Export JSON**.

Bon à savoir : le profil « Mégan » (seul autorisé à corriger les textes) est
choisi dans la page et n'est pas vérifié par la base. C'est une protection contre
les fausses manipulations, pas contre quelqu'un de malveillant.

## Modifier les infos pratiques

Tout se trouve dans `js/config.js`, dans `TRIP_INFO` :

- `logement.adresse`, `lat`, `lng` : **à remplacer par l'adresse exacte** dès
  qu'elle est confirmée. Les boutons Itinéraire et Uber s'en servent.
- `urgences` : la liste des numéros affichés, qu'on peut appeler d'un tap.
- `debut` / `fin` : les dates du séjour. Elles pilotent le compte à rebours et
  le mode « Aujourd'hui ».

Pour tester le mode « Aujourd'hui » avant le départ, ajoutez `?date=2026-10-21`
à la fin de l'adresse du site.

## Mode hors ligne : ce qu'il faut savoir

- La première visite avec du réseau enregistre la page, les photos et les
  polices sur le téléphone. Ouvrez le site une fois au calme avant le départ.
  Idéalement, faites aussi défiler les cartes pour garder les fonds de carte.
- Les modifications du code (html, css, js) arrivent toutes seules dès qu'il y
  a du réseau.
- **À chaque modification d'un fichier css/js**, changez le numéro `?v=…` des
  lignes qui chargent `css/style.css` et `js/….js` dans `index.html` (par
  exemple la date du jour). Sinon, un téléphone peut garder l'ancien fichier
  en cache quelques minutes avec la nouvelle page, et le site s'affiche de
  travers.
- **Photos** : elles sont gardées en cache. Pour en remplacer une, donnez un
  **nouveau nom** au fichier, ou augmentez `VERSION` en haut de `sw.js`.
- Hors ligne, la check-list affiche la dernière version reçue, en lecture
  seule. On peut de nouveau cocher dès que le réseau revient.
- La météo vient d'[Open-Meteo](https://open-meteo.com/) : c'est gratuit et
  sans clé. Elle est gardée 3 h et apparaît dès que le séjour est à moins de
  16 jours.

## Ajouter une photo

Mettre le fichier dans `img/` au format WebP, d'environ 800 px de large pour
une étape et 1 400 px pour un bandeau. Utiliser un nom sans espaces ni accents,
par exemple `pont-de-brooklyn.webp`, puis y faire référence dans `index.html`.
Avec [Squoosh](https://squoosh.app/), la conversion se fait dans le navigateur.
