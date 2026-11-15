#!/usr/bin/env node
// Pré-rendu des pages publiques du site (choix de Théo du 13/11/2026, formulaire « site vitrine (2/3) » :
// « Site ajouts: D pre-rendu Google »).
//
// Lancé juste après « craco build » (script postbuild de package.json), donc à la construction de
// l'image du site (Dockerfile, « yarn build »). Pour chaque page de scripts/pages-publiques.js :
//   1. l'application React est rendue à l'adresse de la page (StaticRouter), pages chargées à la
//      demande comprises, sans navigateur ;
//   2. build/prerendu/<page>.html reçoit le gabarit construit (build/index.html : mêmes scripts, mêmes
//      styles) avec le titre, la description, la canonique PROPRE à la page (bilan SEO du 13/11/2026),
//      les balises de partage et le contenu complet dans <div id="root"> ;
//   3. nginx (nginx-site.conf) sert ce fichier d'abord ; le navigateur charge les mêmes scripts et React
//      reprend la page (hydrateRoot, src/index.js). Les autres adresses gardent le gabarit vide.
// Une page qui ne se rend pas, sans titre, ou dont la canonique n'est pas sa propre adresse arrête la
// construction (code de sortie 1) : l'image n'est pas remplacée, l'ancienne reste en ligne, et la raison
// est écrite dans le journal de construction (règle « échec visible »).
//
// Usage : node scripts/prerender.js [--build <dossier>]   (par défaut : frontend/build)
// Essais hors ligne : backend/tests/test_site_choix_theo_13_11.py.
"use strict";

// Comme les essais de Create React App : le code de src/ est traduit par Babel (préréglage react-app,
// environnement « test » : modules CommonJS, cible Node) ; React tourne dans sa version de
// développement, qui écrit le même HTML et signale plus d'erreurs.
process.env.NODE_ENV = "test";
process.env.BABEL_ENV = "test";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const FRONT = path.resolve(__dirname, "..");
const SRC = path.join(FRONT, "src");
const { BASE, PAGES, fichierPrerendu } = require("./pages-publiques");

const argBuild = process.argv.indexOf("--build");
const BUILD = argBuild > 0 ? path.resolve(process.argv[argBuild + 1]) : path.join(FRONT, "build");
const SORTIE = path.join(BUILD, "prerendu");

const echec = (message) => {
  console.error(`PRÉ-RENDU EN ÉCHEC : ${message}`);
  process.exit(1);
};

// ─── Traduction du code de src/ à la volée ─────────────────────────────────────────────────────
// Babel et son préréglage sont pris là où react-scripts les a installés (jamais une autre version).
const requireReactScripts = Module.createRequire(require.resolve("react-scripts/package.json", { paths: [FRONT] }));
const babel = requireReactScripts("@babel/core");
const PRESET_REACT_APP = requireReactScripts.resolve("babel-preset-react-app");

const traduire = (module, fichier, source) => {
  const code = source === undefined ? fs.readFileSync(fichier, "utf8") : source;
  const sortie = babel.transformSync(code, {
    filename: fichier,
    babelrc: false,
    configFile: false,
    sourceMaps: false,
    presets: [[PRESET_REACT_APP, { runtime: "automatic" }]],
  });
  // Code traduit en CommonJS : forcé comme tel (Node 22 et plus lirait sinon en module ES un fichier d'un
  // paquet déclaré « type: module ») ; Node 20 ignore ce troisième argument.
  module._compile(sortie.code, fichier, "commonjs");
};

// Un fichier de node_modules écrit en modules ES sans le déclarer (cas de la carte de France,
// @svg-maps/france.departments) est traduit aussi ; tout autre fichier garde le chargeur de Node.
const SYNTAXE_ESM = /^\s*(?:import\s+(?:[\w*{][^;]*?\s+from\s+)?["']|export\s+(?:default\b|const\b|let\b|var\b|function\b|async\s+function\b|class\b|\{|\*))/m;
const SYNTAXE_CJS = /\bmodule\.exports\b|\bexports\.[\w$]+\s*=|\brequire\(/;
const chargeurJs = Module._extensions[".js"];
const dansSrc = (fichier) => fichier.startsWith(SRC + path.sep);

Module._extensions[".js"] = (module, fichier) => {
  if (dansSrc(fichier)) return traduire(module, fichier);
  // Node confie aussi à ce chargeur les .mjs et .cjs : ceux-là gardent toujours le chargeur de Node.
  if (path.extname(fichier) === ".js") {
    const source = fs.readFileSync(fichier, "utf8");
    if (SYNTAXE_ESM.test(source) && !SYNTAXE_CJS.test(source)) return traduire(module, fichier, source);
  }
  return chargeurJs(module, fichier);
};
Module._extensions[".jsx"] = (module, fichier) => traduire(module, fichier);
// Les styles sont déjà dans le CSS construit ; une image importée vaut son adresse publique.
Module._extensions[".css"] = () => {};
for (const ext of [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico"]) {
  Module._extensions[ext] = (module, fichier) => {
    module.exports = `/${path.basename(fichier)}`;
  };
}
// Alias « @/ » de craco.config.js : « @/x » = src/x.
const resoudre = Module._resolveFilename;
Module._resolveFilename = function resoudreAvecAlias(demande, parent, ...reste) {
  const cible = typeof demande === "string" && demande.startsWith("@/") ? path.join(SRC, demande.slice(2)) : demande;
  return resoudre.call(this, cible, parent, ...reste);
};

// ─── Gabarit construit ─────────────────────────────────────────────────────────────────────────
const echapperAttribut = (texte) =>
  String(texte).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const echapperTexte = (texte) => String(texte).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Remplace la première balise qui correspond, ou l'ajoute à la fin de <head>.
// Remplacements par FONCTION (15/11/2026) : avec une chaîne de remplacement, String.replace interprète « $$ »,
// « $& », « $1 »… ; la gamme de prix « $$ » des données structurées devenait « $ » dans la page pré-rendue.
const poser = (html, motif, balise) =>
  motif.test(html) ? html.replace(motif, () => balise) : html.replace("</head>", () => `${balise}</head>`);

const balisesMeta = (attribut, cle) => new RegExp(`<meta\\b[^>]*\\b${attribut}="${cle.replace(/[.:]/g, "\\$&")}"[^>]*>`, "i");

const RACINE_VIDE = '<div id="root"></div>';

function composer(gabarit, chemin, seo, contenu) {
  let html = gabarit;
  html = poser(html, /<title>[\s\S]*?<\/title>/i, `<title>${echapperTexte(seo.title)}</title>`);
  html = poser(html, balisesMeta("name", "description"), `<meta name="description" content="${echapperAttribut(seo.description)}"/>`);
  html = poser(html, /<link\b[^>]*\brel="canonical"[^>]*>/i, `<link rel="canonical" href="${echapperAttribut(seo.url)}"/>`);
  html = poser(html, balisesMeta("property", "og:url"), `<meta property="og:url" content="${echapperAttribut(seo.url)}"/>`);
  html = poser(html, balisesMeta("property", "og:title"), `<meta property="og:title" content="${echapperAttribut(seo.title)}"/>`);
  html = poser(html, balisesMeta("property", "og:description"), `<meta property="og:description" content="${echapperAttribut(seo.description)}"/>`);
  html = poser(html, balisesMeta("property", "og:image"), `<meta property="og:image" content="${echapperAttribut(seo.image)}"/>`);
  html = poser(html, balisesMeta("name", "twitter:title"), `<meta name="twitter:title" content="${echapperAttribut(seo.title)}"/>`);
  html = poser(html, balisesMeta("name", "twitter:description"), `<meta name="twitter:description" content="${echapperAttribut(seo.description)}"/>`);
  html = poser(html, balisesMeta("name", "twitter:image"), `<meta name="twitter:image" content="${echapperAttribut(seo.image)}"/>`);
  if (chemin !== "/") {
    // L'image de fond de l'accueil n'est préchargée que sur l'accueil.
    html = html.replace(/<link\b[^>]*\brel="preload"[^>]*hero-bg[^>]*>/i, () => "");
  }
  return html.replace(RACINE_VIDE, () => `<div id="root">${contenu}</div>`);
}

// ─── Rendu d'une page ──────────────────────────────────────────────────────────────────────────
async function main() {
  const fichierGabarit = path.join(BUILD, "index.html");
  if (!fs.existsSync(fichierGabarit)) echec(`gabarit introuvable (${fichierGabarit}) : lancer d'abord la construction`);
  const gabarit = fs.readFileSync(fichierGabarit, "utf8");
  if (gabarit.split(RACINE_VIDE).length !== 2) echec(`le gabarit doit contenir une seule fois ${RACINE_VIDE}`);

  const React = require("react");
  const { prerenderToNodeStream } = require("react-dom/static");
  const { StaticRouter } = require("react-router-dom");
  const { AppContenu } = require(path.join(SRC, "App.js"));
  const { SeoCollecteur } = require(path.join(SRC, "components", "SeoHead.jsx"));
  if (typeof prerenderToNodeStream !== "function") echec("react-dom/static ne fournit pas prerenderToNodeStream (React 19 attendu)");
  if (typeof AppContenu !== "function") echec("src/App.js n'exporte pas AppContenu");

  const rendre = async (chemin) => {
    const seo = [];
    const erreurs = [];
    // Même arbre que src/index.js et App (StrictMode > div.App > routeur > AppContenu), routeur statique.
    const arbre = React.createElement(
      React.StrictMode,
      null,
      React.createElement(
        SeoCollecteur.Provider,
        { value: (valeurs) => seo.push(valeurs) },
        React.createElement(
          "div",
          { className: "App" },
          React.createElement(StaticRouter, { location: chemin }, React.createElement(AppContenu))
        )
      )
    );
    const { prelude } = await prerenderToNodeStream(arbre, {
      // Sans limite de taille par bloc : le contenu de chaque page est écrit en place, lisible sans
      // script (par défaut, React écrit un bloc de plus de 12,8 ko caché, puis le déplace par script).
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
      onError(erreur) {
        erreurs.push(erreur);
      },
    });
    const morceaux = [];
    for await (const morceau of prelude) morceaux.push(Buffer.from(morceau));
    return { contenu: Buffer.concat(morceaux).toString("utf8"), seo: seo[seo.length - 1], erreurs };
  };

  fs.rmSync(SORTIE, { recursive: true, force: true });
  fs.mkdirSync(SORTIE, { recursive: true });

  const rapport = [];
  const problemes = [];
  for (const [chemin] of PAGES) {
    let resultat;
    try {
      resultat = await rendre(chemin);
    } catch (erreur) {
      problemes.push(`${chemin} : rendu impossible (${erreur && erreur.message})`);
      continue;
    }
    const { contenu, seo, erreurs } = resultat;
    const attendue = chemin === "/" ? `${BASE}/` : `${BASE}${chemin}`;
    if (erreurs.length) {
      problemes.push(`${chemin} : ${erreurs.length} erreur(s) de rendu, la première : ${erreurs[0] && erreurs[0].message}`);
      continue;
    }
    if (!seo || !seo.title || !seo.description) {
      problemes.push(`${chemin} : aucun titre ni description (SeoHead absent : page inconnue de App.js ?)`);
      continue;
    }
    if (seo.url !== attendue) {
      problemes.push(`${chemin} : canonique « ${seo.url} » au lieu de « ${attendue} »`);
      continue;
    }
    if (/<!--\$[?!]-->|<template\b|\$RC\(/.test(contenu)) {
      problemes.push(`${chemin} : contenu laissé en attente (bloc « Suspense » non écrit en place)`);
      continue;
    }
    if (!/<h1[\s>]/.test(contenu) || contenu.length < 2000) {
      problemes.push(`${chemin} : contenu incomplet (${contenu.length} caractères, titre principal ${/<h1[\s>]/.test(contenu) ? "présent" : "absent"})`);
      continue;
    }
    const fichier = fichierPrerendu(chemin);
    const html = composer(gabarit, chemin, seo, contenu);
    fs.writeFileSync(path.join(SORTIE, fichier), html);
    rapport.push({ chemin, fichier, titre: seo.title, canonique: seo.url, octets: Buffer.byteLength(html) });
  }

  if (problemes.length) {
    echec(`${problemes.length} page(s) sur ${PAGES.length} :\n  - ${problemes.join("\n  - ")}`);
  }
  fs.writeFileSync(
    path.join(SORTIE, "rapport.json"),
    JSON.stringify({ genere_le: new Date().toISOString(), base: BASE, pages: rapport }, null, 2) + "\n"
  );
  console.log(`Pré-rendu : ${rapport.length} pages écrites dans ${path.relative(FRONT, SORTIE) || SORTIE} (plan du site : ${PAGES.length} pages).`);
}

main().catch((erreur) => echec(erreur && erreur.stack ? erreur.stack : String(erreur)));
