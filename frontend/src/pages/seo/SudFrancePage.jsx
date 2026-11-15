import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { PAGES_LOCALES, REGIONS, SECTEUR, ZONE_DESSERVIE, departementsDe, lienLocal } from '../../data/perimetre';

// 13/11/2026 (choix de Théo : « Site perimetre: A partout », pages locales « sur tout le
// secteur ») : cette page présente TOUT le secteur validé le 11/10/2026, de Bordeaux à Nice en
// remontant jusqu'à Annecy, région par région (data/perimetre.js), avec un lien vers chaque page
// locale. Adresse inchangée (/securite-privee-sud-france) pour garder son référencement.
// Un siège à Toulon, aucune « antenne » ni « pôle » annoncé (audit du 30/10/2026, site-061 et 062).

const PRESENTATION_REGIONS = {
  'Nouvelle-Aquitaine': 'De Bordeaux au Pays basque et au Périgord.',
  Occitanie: "De Toulouse à Montpellier, Nîmes et Perpignan, jusqu'à l'Aveyron, au Lot et à la Lozère.",
  "Provence-Alpes-Côte d'Azur": "De Marseille à Nice en passant par Toulon, notre siège, et d'Avignon aux Hautes-Alpes.",
  'Auvergne-Rhône-Alpes': "En remontant par la Drôme et l'Ardèche jusqu'à Lyon, Grenoble, Chambéry et Annecy, avec le Cantal et la Haute-Loire.",
};

const data = {
  slug: '/securite-privee-sud-france',
  metaTitle: 'Notre secteur : de Bordeaux à Nice et jusqu\'à Annecy | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée intervient de Bordeaux à Nice en remontant jusqu\'à Annecy : Nouvelle-Aquitaine, Occitanie, Provence-Alpes-Côte d\'Azur, Auvergne-Rhône-Alpes et Monaco. Agents de sécurité, cynophile, SSIAP, événementiel. Grand déplacement national sur demande.',
  breadcrumbCurrent: 'Notre secteur',
  areaServed: ZONE_DESSERVIE,

  h1: 'Notre secteur : de Bordeaux à Nice, jusqu\'à Annecy',
  introduction: `Depuis son siège de Toulon, MTJ Sécurité Privée intervient ${SECTEUR} : Nouvelle-Aquitaine, Occitanie, Provence-Alpes-Côte d'Azur, Auvergne-Rhône-Alpes et Monaco.\n\nAu-delà de ce secteur, nous proposons des missions en grand déplacement sur l'ensemble du territoire national, pour les clients multi-sites ou pour des événements ponctuels.`,

  sections: [
    {
      h2: 'Nos départements, région par région',
      intro: 'Nous intervenons dans chacun de ces départements, sur devis. Les grandes villes ont leur page, en bas de celle-ci.',
      subsections: [
        ...REGIONS.map((region) => ({
          h3: region,
          content: PRESENTATION_REGIONS[region],
          list: departementsDe(region),
        })),
        {
          h3: 'Monaco',
          content: 'Nous intervenons à Monaco dans le respect de la réglementation monégasque applicable aux activités de sécurité privée : le cadre applicable est étudié avec vous avant toute proposition.',
        },
      ],
    },
    {
      h2: 'L\'ensemble de nos métiers sur tout le secteur',
      subsections: [
        {
          h3: 'Agents de sécurité, cynophile, SSIAP et CYNODEX',
          content: 'Où que se trouve votre site dans notre secteur, vous avez accès à l\'ensemble de notre offre : agents de prévention et de sécurité (APS), binômes maître-chien d\'intervention, détection d\'explosifs (CYNODEX) et agents SSIAP pour la sécurité incendie.',
          list: ['Agents APS titulaires de la carte professionnelle du CNAPS', 'Sécurité cynophile et CYNODEX', 'Agents SSIAP 1, 2 et 3', 'Sécurité événementielle complète']
        },
        {
          h3: 'Un interlocuteur unique pour tous vos sites',
          content: 'Pour les entreprises présentes sur plusieurs sites de notre secteur, MTJ Sécurité Privée offre l\'avantage d\'un prestataire unique : un seul contrat, un seul interlocuteur et le même niveau de service sur tous vos sites. Cette centralisation simplifie votre gestion.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quelle est votre zone d\'intervention principale ?',
      answer: `Notre secteur va ${SECTEUR} : Nouvelle-Aquitaine, Occitanie, Provence-Alpes-Côte d'Azur, Auvergne-Rhône-Alpes et Monaco. Notre siège est à Toulon. Ailleurs en France, nous intervenons en grand déplacement, sur demande.`
    },
    {
      question: 'Pouvez-vous intervenir à Paris ?',
      answer: 'Oui, dans le cadre de missions en grand déplacement, pour des événements ponctuels ou des besoins temporaires partout en France métropolitaine. Contactez-nous pour étudier la faisabilité de votre projet.'
    },
    {
      question: 'Proposez-vous des contrats multi-sites ?',
      answer: 'Oui. Nous pouvons regrouper plusieurs sites dans un même contrat, avec un interlocuteur unique et le même niveau de service, sur tout notre secteur. Idéal pour les enseignes, les groupes immobiliers et les entreprises ayant plusieurs implantations.'
    }
  ],

  conclusion: `De Bordeaux à Nice et jusqu'à Annecy, MTJ Sécurité Privée est votre partenaire de sécurité sur tout son secteur. Nos équipes qualifiées et notre capacité de déploiement national sont à votre service.\n\nContactez-nous pour un devis gratuit adapté à votre localisation et à vos besoins spécifiques.`,

  relatedLinks: [
    ...PAGES_LOCALES.map((p) => lienLocal(p.slug)),
    { href: '/grand-deplacement-securite-france', label: 'Grand déplacement national' },
  ]
};

export default function SudFrancePage() {
  return <SeoPageLayout data={data} />;
}
