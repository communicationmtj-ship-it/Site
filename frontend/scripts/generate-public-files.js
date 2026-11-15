// Génère frontend/public/sitemap.xml (avec <lastmod>) et frontend/public/routes.json
// à partir de la liste des pages publiques (scripts/pages-publiques.js, la même que le pré-rendu).
// Lancé automatiquement avant « yarn build » (script prebuild).
// routes.json est la liste de contrôle des chemins : la règle nginx (nginx-site.conf, 404 pour
// tout chemin inconnu) garde sa propre liste, comparée à celle-ci et à App.js par l'essai
// backend/tests/test_site_retours_13_11.py.
const fs = require("fs");
const path = require("path");
const { BASE, PAGES, EXTRA_ROUTES } = require("./pages-publiques");

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
console.log(`sitemap.xml et routes.json générés (lastmod ${lastmod}, ${PAGES.length} pages au plan du site)`);
