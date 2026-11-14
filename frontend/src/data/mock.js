// Mock data for MTJ SECURITE PRIVÉE

// Coordonnées : UNE seule source pour tout le site (pages, pied de page, données
// structurées). Changer l'adresse e-mail affichée = changer EMAIL ici, et la même
// adresse dans frontend/public/index.html (un essai du dépôt vérifie qu'elles sont égales).
// 13/11/2026 (choix de Théo, « Site email: A contact OVH ») : l'adresse du domaine, boîte OVH.
// Théo ne lit aucune boîte OVH : la boîte contact@ doit renvoyer vers sa boîte Gmail (réglage
// à poser dans OVH, hors du site) ; les mails des formulaires partent vers l'adresse de la
// variable NOTIFY_EMAIL du serveur (voir README.md).
const EMAIL = "contact@mtj-securite-privee.fr";
const STREET = "31 rue Chevalier Paul";
const POSTAL_CODE = "83000";
const CITY = "Toulon";

export const companyInfo = {
  name: "MTJ SÉCURITÉ PRIVÉE",
  slogan: "VOTRE SÉCURITÉ, NOTRE MISSION.",
  motto: "Avec Force et Honneur Toujours servir",
  phone: "07 60 73 82 06",
  phoneIntl: "+33760738206",
  phoneHref: "tel:+33760738206",
  email: EMAIL,
  emailHref: `mailto:${EMAIL}`,
  street: STREET,
  postalCode: POSTAL_CODE,
  city: CITY,
  address: `${STREET}, ${POSTAL_CODE} ${CITY}`,
  // Lien simple vers la carte (aucun contenu Google chargé avant le clic : pas de cookie tiers).
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${STREET}, ${POSTAL_CODE} ${CITY}`)}`,
  instagramUrl: "https://www.instagram.com/mtj.securite.privee/",
};

// Adresse postale au format des données structurées (schema.org).
export const postalAddressSchema = {
  "@type": "PostalAddress",
  "streetAddress": STREET,
  "addressLocality": CITY,
  "postalCode": POSTAL_CODE,
  "addressRegion": "Provence-Alpes-Côte d'Azur",
  "addressCountry": "FR",
};

// Identité légale de MTJ Sécurité Privée (page Mentions légales). Choix de Théo du 13/11/2026
// (« Site mentions: A ton nom Kbis ») : Théo MERCIER, Président, directeur de la publication.
// Forme, capital, immatriculation et date d'immatriculation RECOPIÉS de l'extrait Kbis à jour au
// 3 novembre 2026 (pièce du coffre du logiciel, lue le 13/11/2026). Le numéro de TVA n'est pas
// imprimé sur un Kbis : calculé depuis le SIREN (clé de la DGFiP) et vérifié « valide » sur le
// service VIES de la Commission européenne le 13/11/2026. Une valeur qui change = la changer ici.
export const legalInfo = {
  forme: "société par actions simplifiée à associé unique (SASU)",
  capital: "500,00 €",
  rcs: "922 208 202 R.C.S. Toulon",
  immatriculation: "12/12/2022",
  tva: "FR 27 922 208 202",
  directeurPublication: "Théo MERCIER, Président de MTJ Sécurité Privée",
};

// Bloc légal unique (CNAPS) : un numéro d'autorisation pour chaque société.
// Source : identité des sociétés du logiciel MTJ.
// À faire confirmer par la direction : numéro d'autorisation de MTJ Sécurité Privée (voir rapport).
export const L612_14 = "Article L612-14 du code de la sécurité intérieure : « L'autorisation administrative préalable ne confère aucun caractère officiel à l'entreprise ou aux personnes qui en bénéficient. Elle n'engage en aucune manière la responsabilité des pouvoirs publics. »";

export const cnapsCompanies = {
  privee: {
    name: "MTJ SÉCURITÉ PRIVÉE",
    siret: "922 208 202 00015",
    authorization: "AUT-083-2123-05-23-20240933884",
    activity: "surveillance ou gardiennage",
  },
  rapprochee: {
    name: "MTJ SÉCURITÉ RAPPROCHÉE",
    siret: "933 244 303 00014",
    authorization: "AUT-006-2123-10-21-20240955994",
    activity: "protection physique des personnes",
  },
};

export const aboutUs = {
  title: "QUI SOMMES NOUS",
  description: `MTJ SÉCURITÉ PRIVÉE est une entreprise spécialisée dans la sécurité privée et la protection des biens et des personnes. 

Forte d'une équipe d'experts qualifiés et expérimentés, nous mettons notre savoir-faire au service de nos clients pour garantir leur tranquillité d'esprit.

Notre engagement se traduit par des interventions professionnelles, un respect strict des réglementations en vigueur et une disponibilité 24h/24 et 7j/7.

Nous sommes fiers de notre expertise en sécurité cynophile, avec des maîtres-chiens formés à la surveillance et à la détection.`,
};

export const services = [
  {
    id: 1,
    title: "AGENTS DE PRÉVENTION ET SÉCURITÉ",
    description: "Nos agents de prévention et de sécurité assurent la surveillance et la protection de vos sites. Formés aux dernières techniques de sécurité, ils garantissent un environnement sûr pour vos activités professionnelles et personnelles.",
    icon: "Shield",
    link: "/agent-securite-prevention",
    color: "#AC8631",
    features: [
      "Surveillance de sites",
      "Contrôle d'accès",
      "Rondes de sécurité",
      "Gestion des alarmes"
    ]
  },
  {
    id: 2,
    title: "AGENTS CYNOPHILES D'INTERVENTION",
    description: "Notre équipe cyno d'intervention est spécialisée dans la sécurité avec chiens d'intervention. Nos binômes maître-chien sont formés pour intervenir rapidement et efficacement dans toutes les situations nécessitant une sécurité renforcée.",
    icon: "Dog",
    link: "/securite-cynophile-maitre-chien",
    color: "#AC8631",
    features: [
      "Surveillance avec chiens d'intervention",
      "Intervention rapide",
      "Sécurité événementielle",
      "Patrouilles cynophiles"
    ]
  },
  {
    id: 3,
    title: "CYNODEX",
    subtitle: "Détection d'Explosifs",
    description: "Notre unité CYNODEX est spécialisée dans la détection d'explosifs avec des chiens entraînés à cette mission. Nos binômes maître-chien interviennent pour sécuriser vos événements et vos installations, selon la certification de chaque binôme.",
    icon: "Dog",
    link: "/detection-explosifs-cynodex",
    color: "#AC8631",
    features: [
      "Détection d'explosifs",
      "Sécurisation d'événements",
      "Inspection de sites sensibles",
      "Intervention préventive"
    ]
  },
  {
    id: 4,
    title: "SSIAP",
    subtitle: "Service de Sécurité Incendie et d'Assistance à Personnes",
    description: "Nos agents SSIAP diplômés assurent la sécurité incendie de vos établissements recevant du public. Ils veillent au respect des consignes de sécurité incendie et à la protection des personnes.",
    icon: "Flame",
    link: "/ssiap-securite-incendie",
    color: "#AC8631",
    features: [
      "Prévention incendie",
      "Évacuation d'urgence",
      "Gestion des équipements de sécurité"
    ]
  },
  {
    id: 5,
    title: "PROTECTION PHYSIQUE DES PERSONNES",
    subtitle: "Sécurité Rapprochée",
    description: "La protection rapprochée de personnalités, dirigeants d'entreprise, célébrités et particuliers exposés. Des agents de protection rapprochée, formés aux techniques d'évaluation des menaces, d'escorte et de sécurisation de déplacements, assurent votre protection en toute discrétion.",
    legalNotice: "MTJ SÉCURITÉ RAPPROCHÉE — SIRET 933 244 303 00014\nAutorisation CNAPS AUT-006-2123-10-21-20240955994\nArticle L612-14 du code de la sécurité intérieure : « L'autorisation administrative préalable ne confère aucun caractère officiel à l'entreprise ou aux personnes qui en bénéficient. Elle n'engage en aucune manière la responsabilité des pouvoirs publics. »",
    icon: "UserShield",
    features: [],
    wide: true,
    externalCompany: "MTJ SÉCURITÉ RAPPROCHÉE",
    link: "/protection-rapprochee",
    // Charte noir et doré pour toutes les cartes (audit du 30/10/2026, site-035 à 037) :
    // la société du groupe se distingue par son bandeau nominatif, pas par une couleur.
    color: "#AC8631"
  }
];

export const interventionDomains = {
  title: "DOMAINE D'INTERVENTION",
  description: "MTJ SÉCURITÉ PRIVÉE intervient dans de nombreux secteurs d'activité pour répondre à tous vos besoins en matière de sécurité.",
  domains: [
    {
      id: 1,
      name: "Événementiel",
      description: "Sécurisation de concerts, festivals, événements sportifs et manifestations culturelles",
      link: "/securite-evenementielle"
    },
    {
      id: 2,
      name: "Sites industriels et commerciaux",
      description: "Protection des zones industrielles, entrepôts, centres commerciaux et espaces professionnels",
      link: "/securite-sites-industriels-commerciaux"
    },
    {
      id: 3,
      name: "Chantiers",
      description: "Surveillance de chantiers, prévention du vol de matériel et sécurisation des zones de construction",
      link: "/surveillance-chantier-site"
    },
    {
      id: 4,
      name: "Résidentiel",
      description: "Sécurité des résidences privées, copropriétés et domaines",
      link: "/securite-residentielle"
    },
    {
      id: 5,
      name: "Établissements recevant du public",
      description: "Protection des ERP, contrôle d'accès et gestion des flux",
      link: "/securite-erp-etablissements-public"
    }
  ]
};

export const quoteForm = {
  title: "DEVIS",
  subtitle: "Demandez votre devis personnalisé",
  description: "Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les plus brefs délais pour établir un devis adapté à vos besoins.",
};

export const contactInfo = {
  title: "CONTACT",
  subtitle: "Contactez-nous",
  description: "Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets de sécurité.",
};
