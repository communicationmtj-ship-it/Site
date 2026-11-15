// Pages de villes ajoutées au site (Montpellier, Nîmes, Perpignan, Marseille, Avignon, Lyon, Grenoble, Annecy).
// Décisions de Théo :
// - 13/11/2026, « Site implantations commentaire: fudr'ai aen avoir sur toutl le secteur plutot parce que ca
//   ramne du clietn » : une page par grande ville du secteur, sans adresse locale (seul le siège de Toulon) ;
// - 15/11/2026 05:56, « soit tu met pas soit tu laisse ce qui etait » ; 15/11/2026 vers 06:10 (formulaire 3/4) :
//   les pages de villes sortent SANS aucune preuve (ni mission passée, ni client, ni chiffre, ni phrase
//   inventée), seulement ce que le site en ligne dit déjà : les prestations, le secteur « de Bordeaux à Nice
//   jusqu'à Annecy », contact@, CYNODEX et SSIAP 1, 2 et 3 affirmés.
// Chaque phrase ci-dessous est donc reprise du site en ligne (cartes « Nos métiers », « Domaine d'intervention »,
// questions fréquentes, pages de Toulon, Toulouse et Bordeaux), le nom de la ville mis à sa place ; la seule
// phrase propre à la page dit que MTJ Sécurité Privée intervient dans cette ville et ce département.
// Relecture adverse du 15/11/2026 : « Notre zone d'intervention principale va … » n'était pas sur le site en
// ligne ; à sa place, la phrase de l'accueil (« De Toulouse à Nice - Zone d'intervention prioritaire… Siège basé
// à Toulon. »), secteur décidé mis à la place de « De Toulouse à Nice ». Titre et description pour Google : le
// modèle des pages de villes en ligne (page de Bordeaux), la ville et son département mis à leur place.
// L'essai backend/tests/test_site_choix_theo_13_11.py compare ces phrases au site en ligne (commit 9561a0a).
import { companyInfo, services, interventionDomains } from '../../data/mock';
import { SECTEUR, SECTEUR_TITRE } from '../../data/perimetre';

// Libellés des liens, tels que le site en ligne les écrit (« Sécurité privée Nice & Monaco »).
const LIBELLES_VILLES = {
  '/securite-privee-toulon': 'Sécurité privée à Toulon',
  '/securite-privee-toulouse': 'Sécurité privée à Toulouse',
  '/securite-privee-nice-monaco': 'Sécurité privée Nice & Monaco',
  '/securite-privee-bordeaux': 'Sécurité privée à Bordeaux',
  '/securite-privee-montpellier': 'Sécurité privée à Montpellier',
  '/securite-privee-nimes': 'Sécurité privée à Nîmes',
  '/securite-privee-perpignan': 'Sécurité privée à Perpignan',
  '/securite-privee-marseille': 'Sécurité privée à Marseille',
  '/securite-privee-avignon': 'Sécurité privée à Avignon',
  '/securite-privee-lyon': 'Sécurité privée à Lyon',
  '/securite-privee-grenoble': 'Sécurité privée à Grenoble',
  '/securite-privee-annecy': 'Sécurité privée à Annecy',
};

const LIENS_METIERS = [
  { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
  { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
  { href: '/detection-explosifs-cynodex', label: 'Détection d\'explosifs CYNODEX' },
  { href: '/ssiap-securite-incendie', label: 'SSIAP — Sécurité incendie' },
];

// Les quatre métiers de MTJ Sécurité Privée, avec le texte de leurs cartes de l'accueil (data/mock.js).
const METIERS = [
  { h3: 'Agent de prévention et sécurité', carte: 1 },
  { h3: 'Sécurité cynophile et maître-chien', carte: 2 },
  { h3: 'Détection d\'explosifs CYNODEX', carte: 3 },
  { h3: 'SSIAP — Sécurité incendie', carte: 4, enPlus: ['SSIAP 1, 2 et 3'] },
];

const sectionMetiers = (ville, leDepartement) => ({
  h2: `Nos services de sécurité à ${ville}`,
  intro: `L'ensemble des compétences de MTJ Sécurité Privée est mobilisable sur ${ville} et ${leDepartement}.`,
  subsections: METIERS.map(({ h3, carte, enPlus = [] }) => {
    const service = services.find((s) => s.id === carte);
    return { h3, content: service.description, list: [...service.features, ...enPlus] };
  }),
});

const sectionDomaines = () => ({
  h2: interventionDomains.title,
  intro: interventionDomains.description,
  subsections: interventionDomains.domains.map((d) => ({ h3: d.name, content: d.description })),
});

// Questions fréquentes du site en ligne (accueil et page de Toulon), réponses mot pour mot ; l'adresse
// e-mail est celle choisie par Théo le 13/11/2026 (« Site email: A contact OVH »).
const faqCommune = () => [
  {
    question: 'Vos agents sont-ils certifiés CNAPS ?',
    answer: 'Oui. Tous nos agents sont titulaires de la carte professionnelle délivrée par le CNAPS (Conseil National des Activités Privées de Sécurité), obligatoire pour exercer dans la sécurité privée en France. Nos agents cynophiles sont également certifiés et nos équipes SSIAP sont diplômées.',
  },
  {
    question: 'Quelles certifications possèdent vos agents ?',
    answer: 'Tous nos agents sont titulaires de la carte professionnelle délivrée par le CNAPS. Selon les missions, ils possèdent également les certifications TFP APS, TFP Agent Cynophile, SSIAP 1/2/3 et SST (Sauveteur Secouriste du Travail). MTJ Sécurité Privée est elle-même autorisée par le CNAPS à exercer ses activités de sécurité privée.',
  },
  {
    question: 'Comment obtenir un devis pour une mission de sécurité ?',
    answer: `Pour obtenir un devis gratuit et personnalisé, vous pouvez nous contacter par téléphone au 07 60 73 82 06, par email à ${companyInfo.email}, ou via notre formulaire de devis en ligne. Nous vous répondons sous 24h et établissons une proposition adaptée à vos besoins.`,
  },
];

/**
 * Données d'une page de ville pour SeoPageLayout.
 * `leDepartement` : le département avec son article (« la Gironde », « l'Hérault », « les Bouches-du-Rhône ») ;
 * `voisines` : adresses des pages de villes proches.
 */
export function pageLocale({ slug, ville, departement, leDepartement, code, region, voisines = [] }) {
  const lieu = `dans ${leDepartement} et en ${region}`;
  return {
    slug,
    // Titre et description pour Google et les aperçus de partage : modèle en ligne de la page de Bordeaux
    // (« … et événementielle en Gironde et Nouvelle-Aquitaine. ») ; ${lieu} = le département avec son article.
    metaTitle: `Société de Sécurité Privée à ${ville} (${code}) | MTJ Sécurité Privée`,
    metaDescription: `MTJ Sécurité Privée à ${ville} : agents de sécurité, gardiennage, sécurité cynophile et événementielle ${lieu}. Devis gratuit — ${companyInfo.phone}.`,
    breadcrumbCurrent: `Sécurité privée à ${ville}`,
    areaServed: `${ville}, ${departement}, ${region}`,
    h1: `Sécurité Privée à ${ville} — ${departement} (${code})`,
    introduction: `MTJ Sécurité Privée intervient à ${ville} et dans ${leDepartement}. ${SECTEUR_TITRE} - Zone d'intervention prioritaire avec nos équipes dédiées disponibles 24/7. Siège basé à Toulon.\n\nNotre engagement se traduit par des interventions professionnelles, un respect strict des réglementations en vigueur et une disponibilité 24h/24 et 7j/7.`,
    sections: [sectionMetiers(ville, leDepartement), sectionDomaines()],
    faq: faqCommune(),
    conclusion: `Agents de sécurité qualifiés, équipes cynophiles, agents SSIAP et maîtres-chiens CYNODEX : l'ensemble de nos compétences est à votre disposition pour protéger vos sites, vos événements et vos biens.\n\nContactez-nous pour un devis gratuit et découvrez comment MTJ Sécurité Privée peut répondre à vos besoins de sécurité à ${ville}.`,
    relatedLinks: [
      ...voisines.map((href) => ({ href, label: LIBELLES_VILLES[href] })).filter((l) => l.label),
      { href: '/securite-privee-sud-france', label: `Sécurité privée ${SECTEUR}` },
      ...LIENS_METIERS,
    ],
  };
}
