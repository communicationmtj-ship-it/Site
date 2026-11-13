// Génère frontend/public/sitemap.xml (avec <lastmod>) et frontend/public/routes.json
// à partir d'UNE liste de chemins. Lancé automatiquement avant « yarn build » (script prebuild).
// routes.json est la liste de contrôle des chemins : la règle nginx (nginx-site.conf, 404 pour
// tout chemin inconnu) garde sa propre liste, comparée à celle-ci et à App.js par l'essai
// backend/tests/test_site_retours_13_11.py.
const fs = require("fs");
const path = require("path");

const BASE = "https://mtj-securite-privee.fr";
const PAGES = [
  ["/", "1.0", "weekly"],
  ["/contact", "0.8", "monthly"],
  ["/recrutement", "0.8", "monthly"],
  ["/mentions-legales", "0.3", "yearly"],
  ["/politique-de-confidentialite", "0.3", "yearly"],
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
  ["/securite-privee-toulon", "0.9", "monthly"],
  ["/securite-privee-toulouse", "0.8", "monthly"],
  ["/securite-privee-nice-monaco", "0.8", "monthly"],
  ["/securite-privee-sud-france", "0.8", "monthly"],
  ["/securite-privee-bordeaux", "0.8", "monthly"],
];
// Chemins qui répondent mais ne doivent pas figurer au plan du site.
const EXTRA_ROUTES = ["/devis", "/dashboard"];

const lastmod = process.env.SITEMAP_LASTMOD || new Date().toISOString().slice(0, 10);
const publicDir = path.join(__dirname, "..", "public");

const urls = PAGES.map(
  ([loc, priority, changefreq]) =>
    `  <url><loc>${BASE}${loc === "/" ? "/" : loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
).join("\n");
fs.writeFileSync(
  path.join(publicDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
fs.writeFileSync(
  path.join(publicDir, "routes.json"),
  JSON.stringify({ generated: lastmod, routes: [...PAGES.map((p) => p[0]), ...EXTRA_ROUTES] }, null, 2) + "\n"
);
console.log(`sitemap.xml et routes.json générés (lastmod ${lastmod})`);
