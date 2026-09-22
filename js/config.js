/* ---------------------------------------------------------------------------
   Synchronisation partagee.  Laissez databaseURL vide pour rester en local
   (chacun sa liste dans son navigateur).  Renseignez-le pour que les 7
   voient la meme liste en temps reel.  Voir HEBERGEMENT.md.
--------------------------------------------------------------------------- */
window.TRIP_SYNC = {
  databaseURL: "https://new-york-937a7-default-rtdb.europe-west1.firebasedatabase.app/",
  path: "ny-a7f3k9m2"
};

/* ---------------------------------------------------------------------------
   Infos pratiques affichees en haut du programme.  Mettez l'adresse exacte du
   logement des qu'elle est confirmee (elle sert aux boutons Itineraire et Uber).
--------------------------------------------------------------------------- */
window.TRIP_INFO = {
  /* dates du sejour, heure de New York : jour 1 = premier jour du programme */
  debut: "2026-10-19",
  fin:   "2026-10-26",
  logement: {
    adresse: "Liberty Ave, Jersey City, NJ",
    lat: 40.7328, lng: -74.0634
  },
  urgences: [
    {nom: "Police, pompiers, ambulance", tel: "911"},
    {nom: "Consulat général de France à New York", tel: "+1 212 606 3600"}
  ],
  /* point de reference pour la meteo (Manhattan) */
  meteo: {lat: 40.7128, lng: -74.006}
};
