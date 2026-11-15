// Périmètre d'intervention de MTJ Sécurité Privée : UNE seule source pour la carte, les textes,
// les pages locales, le menu, le pied de page et les données structurées du site.
//
// Décision de Théo du 11/10/2026 : « mon secteur c'est de Bordeaux jusqu'à Nice en remontant
// jusqu'à Annecy » ; liste confirmée, puis complétée par Théo sur la carte (Aveyron, Cantal,
// Dordogne, Haute-Loire, Lot, Lozère) : 33 départements et Monaco, recopiés tels quels de la
// liste du logiciel MTJ (backend/utils/perimetre_commercial.py, DEPARTEMENTS_DEFAUT).
// Choix du 13/11/2026 (formulaire « site vitrine », « Site perimetre: A partout ») : ce périmètre
// est celui du texte, de la carte, des zones de recrutement, du menu et du pied de page.
// L'essai backend/tests/test_site_choix_theo_13_11.py compare cette liste à celle du logiciel.
// 15/11/2026 (règle de Théo : « soit tu met pas soit tu laisse ce qui etait ») : sur les pages, seul le
// groupe de mots « sud de la France » (ou son équivalent) du site en ligne est remplacé, par ces mots
// exacts ; la phrase autour reste celle du site en ligne.

export const SECTEUR = "de Bordeaux à Nice jusqu'à Annecy";
export const SECTEUR_TITRE = "De Bordeaux à Nice jusqu'à Annecy";

export const DEPARTEMENTS = [
  // Nouvelle-Aquitaine
  { code: '33', nom: 'Gironde', region: 'Nouvelle-Aquitaine' },
  { code: '40', nom: 'Landes', region: 'Nouvelle-Aquitaine' },
  { code: '64', nom: 'Pyrénées-Atlantiques', region: 'Nouvelle-Aquitaine' },
  { code: '47', nom: 'Lot-et-Garonne', region: 'Nouvelle-Aquitaine' },
  { code: '24', nom: 'Dordogne', region: 'Nouvelle-Aquitaine' },
  // Occitanie
  { code: '31', nom: 'Haute-Garonne', region: 'Occitanie' },
  { code: '32', nom: 'Gers', region: 'Occitanie' },
  { code: '65', nom: 'Hautes-Pyrénées', region: 'Occitanie' },
  { code: '09', nom: 'Ariège', region: 'Occitanie' },
  { code: '81', nom: 'Tarn', region: 'Occitanie' },
  { code: '82', nom: 'Tarn-et-Garonne', region: 'Occitanie' },
  { code: '11', nom: 'Aude', region: 'Occitanie' },
  { code: '66', nom: 'Pyrénées-Orientales', region: 'Occitanie' },
  { code: '34', nom: 'Hérault', region: 'Occitanie' },
  { code: '30', nom: 'Gard', region: 'Occitanie' },
  { code: '12', nom: 'Aveyron', region: 'Occitanie' },
  { code: '46', nom: 'Lot', region: 'Occitanie' },
  { code: '48', nom: 'Lozère', region: 'Occitanie' },
  // Provence-Alpes-Côte d'Azur et Monaco
  { code: '84', nom: 'Vaucluse', region: "Provence-Alpes-Côte d'Azur" },
  { code: '13', nom: 'Bouches-du-Rhône', region: "Provence-Alpes-Côte d'Azur" },
  { code: '83', nom: 'Var', region: "Provence-Alpes-Côte d'Azur" },
  { code: '06', nom: 'Alpes-Maritimes', region: "Provence-Alpes-Côte d'Azur" },
  { code: '04', nom: 'Alpes-de-Haute-Provence', region: "Provence-Alpes-Côte d'Azur" },
  { code: '05', nom: 'Hautes-Alpes', region: "Provence-Alpes-Côte d'Azur" },
  { code: '98', nom: 'Monaco', region: 'Monaco' },
  // Auvergne-Rhône-Alpes (en remontant vers Annecy)
  { code: '26', nom: 'Drôme', region: 'Auvergne-Rhône-Alpes' },
  { code: '07', nom: 'Ardèche', region: 'Auvergne-Rhône-Alpes' },
  { code: '38', nom: 'Isère', region: 'Auvergne-Rhône-Alpes' },
  { code: '69', nom: 'Rhône', region: 'Auvergne-Rhône-Alpes' },
  { code: '73', nom: 'Savoie', region: 'Auvergne-Rhône-Alpes' },
  { code: '74', nom: 'Haute-Savoie', region: 'Auvergne-Rhône-Alpes' },
  { code: '01', nom: 'Ain', region: 'Auvergne-Rhône-Alpes' },
  { code: '15', nom: 'Cantal', region: 'Auvergne-Rhône-Alpes' },
  { code: '43', nom: 'Haute-Loire', region: 'Auvergne-Rhône-Alpes' },
];

export const REGIONS = [
  'Nouvelle-Aquitaine',
  'Occitanie',
  "Provence-Alpes-Côte d'Azur",
  'Auvergne-Rhône-Alpes',
];

// Départements coloriés sur la carte. Monaco n'est pas un département français : il n'a pas
// de tracé sur la carte, il est nommé dans les textes.
export const CODES_CARTE = DEPARTEMENTS.filter((d) => d.code !== '98').map((d) => d.code);

// Zone desservie, en clair, pour les données structurées (schema.org « areaServed »).
export const ZONE_DESSERVIE = `${SECTEUR_TITRE} : Nouvelle-Aquitaine, Occitanie, Provence-Alpes-Côte d'Azur, Auvergne-Rhône-Alpes et Monaco`;

// Départements d'une région, en clair : « Gironde (33), Landes (40)… ».
export const departementsDe = (region) =>
  DEPARTEMENTS.filter((d) => d.region === region).map((d) => `${d.nom} (${d.code})`);

// Pages locales d'intervention (choix de Théo du 13/11/2026 : « il faudrait en avoir sur tout le
// secteur plutôt, parce que ça ramène du client »). Une page = « nous intervenons à <ville> et
// alentour » : aucune agence locale, aucune adresse locale ; la seule adresse est le siège de Toulon.
export const PAGES_LOCALES = [
  { slug: '/securite-privee-bordeaux', ville: 'Bordeaux', departement: 'Gironde', code: '33', region: 'Nouvelle-Aquitaine' },
  { slug: '/securite-privee-toulouse', ville: 'Toulouse', departement: 'Haute-Garonne', code: '31', region: 'Occitanie' },
  { slug: '/securite-privee-montpellier', ville: 'Montpellier', departement: 'Hérault', code: '34', region: 'Occitanie' },
  { slug: '/securite-privee-nimes', ville: 'Nîmes', departement: 'Gard', code: '30', region: 'Occitanie' },
  { slug: '/securite-privee-perpignan', ville: 'Perpignan', departement: 'Pyrénées-Orientales', code: '66', region: 'Occitanie' },
  { slug: '/securite-privee-marseille', ville: 'Marseille', departement: 'Bouches-du-Rhône', code: '13', region: "Provence-Alpes-Côte d'Azur" },
  { slug: '/securite-privee-toulon', ville: 'Toulon', departement: 'Var', code: '83', region: "Provence-Alpes-Côte d'Azur", siege: true },
  { slug: '/securite-privee-nice-monaco', ville: 'Nice et Monaco', departement: 'Alpes-Maritimes', code: '06', region: "Provence-Alpes-Côte d'Azur" },
  { slug: '/securite-privee-avignon', ville: 'Avignon', departement: 'Vaucluse', code: '84', region: "Provence-Alpes-Côte d'Azur" },
  { slug: '/securite-privee-lyon', ville: 'Lyon', departement: 'Rhône', code: '69', region: 'Auvergne-Rhône-Alpes' },
  { slug: '/securite-privee-grenoble', ville: 'Grenoble', departement: 'Isère', code: '38', region: 'Auvergne-Rhône-Alpes' },
  { slug: '/securite-privee-annecy', ville: 'Annecy', departement: 'Haute-Savoie', code: '74', region: 'Auvergne-Rhône-Alpes' },
];

// Libellé court pour le menu et le pied de page : « Bordeaux (33) », « Toulon (83) – siège ».
export const libelleMenu = (page) => `${page.ville} (${page.code})${page.siege ? ' – siège' : ''}`;

// Lien « Pages associées » vers une page locale.
export const lienLocal = (slug) => {
  const page = PAGES_LOCALES.find((p) => p.slug === slug);
  return page ? { href: page.slug, label: `Sécurité privée à ${page.ville}` } : null;
};

// Page qui présente tout le secteur (adresse gardée pour ne pas perdre son référencement).
export const PAGE_SECTEUR = { slug: '/securite-privee-sud-france', libelle: 'Tout notre secteur' };
