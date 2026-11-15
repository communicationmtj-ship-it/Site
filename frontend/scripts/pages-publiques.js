// Pages publiques du site : UNE liste pour le plan du site (sitemap.xml), la liste de contrôle
// des chemins (routes.json) et le pré-rendu (scripts/prerender.js).
// « Plan du site = pages pré-rendues » (choix de Théo du 13/11/2026, « pré-rendu Google ») :
// chaque chemin de PAGES reçoit un HTML complet à la construction de l'image et figure au plan
// du site ; les chemins de EXTRA_ROUTES répondent (application seule) sans être pré-rendus ni
// listés (/devis est l'accueil avec le formulaire, sa canonique est l'accueil ; /dashboard est privé).
// La règle nginx (nginx-site.conf), les routes de frontend/src/App.js et le plan du site du
// serveur (backend/server.py) gardent leur propre liste, comparée à celle-ci par l'essai
// backend/tests/test_site_retours_13_11.py.
"use strict";

const BASE = "https://mtj-securite-privee.fr";

// [chemin, priorité, fréquence de modification]
const PAGES = [
  ["/", "1.0", "weekly"],
  ["/contact", "0.8", "monthly"],
  ["/recrutement", "0.8", "monthly"],
  ["/mentions-legales", "0.3", "yearly"],
  ["/politique-de-confidentialite", "0.3", "yearly"],
  // Métiers
  ["/agent-securite-prevention", "0.9", "monthly"],
  ["/securite-cynophile-maitre-chien", "0.9", "monthly"],
  ["/detection-explosifs-cynodex", "0.9", "monthly"],
  ["/ssiap-securite-incendie", "0.9", "monthly"],
  ["/securite-evenementielle", "0.9", "monthly"],
  ["/surveillance-chantier-site", "0.9", "monthly"],
  ["/securite-sites-industriels-commerciaux", "0.9", "monthly"],
  ["/securite-residentielle", "0.9", "monthly"],
  ["/securite-erp-etablissements-public", "0.9", "monthly"],
  ["/protection-rapprochee", "0.9", "monthly"],
  ["/grand-deplacement-securite-france", "0.8", "monthly"],
  // Secteur et pages locales d'intervention (frontend/src/data/perimetre.js, PAGES_LOCALES)
  ["/securite-privee-sud-france", "0.8", "monthly"],
  ["/securite-privee-toulon", "0.9", "monthly"],
  ["/securite-privee-toulouse", "0.8", "monthly"],
  ["/securite-privee-nice-monaco", "0.8", "monthly"],
  ["/securite-privee-bordeaux", "0.8", "monthly"],
  ["/securite-privee-montpellier", "0.8", "monthly"],
  ["/securite-privee-nimes", "0.8", "monthly"],
  ["/securite-privee-perpignan", "0.8", "monthly"],
  ["/securite-privee-marseille", "0.8", "monthly"],
  ["/securite-privee-avignon", "0.8", "monthly"],
  ["/securite-privee-lyon", "0.8", "monthly"],
  ["/securite-privee-grenoble", "0.8", "monthly"],
  ["/securite-privee-annecy", "0.8", "monthly"],
];

// Chemins qui répondent mais ne sont ni pré-rendus ni au plan du site.
const EXTRA_ROUTES = ["/devis", "/dashboard"];

// Nom du fichier pré-rendu d'un chemin : « / » → index.html, « /contact » → contact.html.
// nginx-site.conf cherche le même nom : try_files /prerendu/$1.html.
const fichierPrerendu = (chemin) => (chemin === "/" ? "index.html" : `${chemin.replace(/^\//, "")}.html`);

module.exports = { BASE, PAGES, EXTRA_ROUTES, fichierPrerendu };
