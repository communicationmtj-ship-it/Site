// Pages locales d'intervention (choix de Théo du 13/11/2026 : « il faudrait en avoir sur tout le
// secteur plutôt, parce que ça ramène du client »). Règles communes à toutes ces pages :
// - MTJ Sécurité Privée « intervient à <ville> et alentour » depuis son siège de Toulon ;
// - aucune adresse locale, aucune agence, aucune équipe « basée » sur place, aucun client cité,
//   aucune mission passée affirmée, aucun chiffre non sourcé ;
// - CYNODEX et SSIAP sans réserve (réponse de Théo du 15/11/2026, « Qualifications », qui remplace
//   la prudence du 13/11/2026) : maîtres-chiens certifiés CYNODEX, agents SSIAP 1, 2 et 3 ;
// - coordonnées lues dans data/mock.js, secteur et voisines dans data/perimetre.js.
// L'essai backend/tests/test_site_choix_theo_13_11.py relit ces pages.
import { companyInfo } from '../../data/mock';
import { PAGE_SECTEUR, lienLocal } from '../../data/perimetre';

const LIENS_METIERS = [
  { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
  { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
  { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
];

const sectionMethode = (ville) => ({
  h2: `Comment nous intervenons à ${ville}`,
  intro: `Notre siège est à Toulon : à ${ville}, nous intervenons sur devis, avec des agents affectés à votre mission.`,
  subsections: [
    {
      h3: 'Un devis avant chaque mission',
      content: "Chaque mission commence par un échange sur votre besoin : le site, les horaires, le nombre d'agents et les qualifications utiles. Le dispositif, le délai de mise en place et, s'il y en a, les frais de déplacement sont écrits dans le devis, avant tout démarrage.",
    },
    {
      h3: 'Des agents en règle',
      content: "Les agents affectés à votre mission sont titulaires de la carte professionnelle délivrée par le CNAPS et des qualifications que demande le poste : diplôme SSIAP pour la sécurité incendie, formation cynophile pour les maîtres-chiens. MTJ Sécurité Privée est elle-même autorisée par le CNAPS à exercer.",
    },
    {
      h3: 'Un interlocuteur dédié',
      content: `Du devis à la fin de la mission, vous avez un interlocuteur dédié, et notre permanence téléphonique répond 24 h/24 au ${companyInfo.phone}.`,
      list: [
        'Agents de prévention et de sécurité',
        'Maîtres-chiens (sécurité cynophile)',
        "Détection d'explosifs par des maîtres-chiens certifiés CYNODEX",
        'Agents SSIAP 1, 2 et 3',
      ],
    },
  ],
});

const faqSiege = (ville) => ({
  question: 'Où se trouve MTJ Sécurité Privée ?',
  answer: `Notre siège est à Toulon (${companyInfo.address}). Nous intervenons à ${ville} et alentour sur devis : appelez-nous au ${companyInfo.phone} ou écrivez-nous à ${companyInfo.email}.`,
});

const conclusionCommune = (ville) =>
  `Vous cherchez une société de sécurité privée à ${ville} ? MTJ Sécurité Privée met à votre disposition des agents de sécurité, des maîtres-chiens et des agents SSIAP, selon votre besoin.\n\nContactez-nous pour un devis gratuit : nous étudions votre demande et vous proposons un dispositif adapté.`;

/**
 * Données d'une page locale pour SeoPageLayout.
 * `sections` et `faq` : le contenu propre à la ville ; `voisines` : adresses des pages locales
 * voisines (data/perimetre.js). La section « Comment nous intervenons », la question « Où se
 * trouve MTJ Sécurité Privée ? » et les liens communs sont ajoutés ici.
 */
export function pageLocale({ slug, ville, departement, code, region, introduction, sections, faq, voisines = [], conclusion }) {
  return {
    slug,
    metaTitle: `Sécurité privée à ${ville} (${code}) | MTJ Sécurité Privée`,
    metaDescription: `MTJ Sécurité Privée intervient à ${ville} et alentour (${departement}) : agents de sécurité, maîtres-chiens, agents SSIAP, sécurité événementielle et surveillance de chantiers. Devis gratuit — ${companyInfo.phone}.`,
    breadcrumbParent: { href: PAGE_SECTEUR.slug, label: 'Notre secteur' },
    breadcrumbCurrent: `Sécurité privée à ${ville}`,
    areaServed: `${ville}, ${departement}, ${region}`,
    h1: `Sécurité privée à ${ville} — ${departement} (${code})`,
    introduction,
    sections: [...sections, sectionMethode(ville)],
    faq: [...faq, faqSiege(ville)],
    conclusion: conclusion || conclusionCommune(ville),
    relatedLinks: [
      ...voisines.map(lienLocal).filter(Boolean),
      { href: PAGE_SECTEUR.slug, label: 'Tout notre secteur' },
      ...LIENS_METIERS,
    ],
  };
}
