import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page locale d'intervention (choix de Théo du 13/11/2026) : aucune agence ni adresse à Grenoble,
// siège à Toulon. Règles communes : pageLocale.js.
const data = pageLocale({
  slug: '/securite-privee-grenoble',
  ville: 'Grenoble',
  departement: 'Isère',
  code: '38',
  region: 'Auvergne-Rhône-Alpes',
  introduction: `MTJ Sécurité Privée intervient à Grenoble et dans toute l'Isère. Préfecture de l'Isère, Grenoble est un pôle de recherche et d'industrie, entouré de massifs et de stations de montagne.\n\nGardiennage, sécurité événementielle, maîtres-chiens, agents SSIAP : nous vous proposons le dispositif adapté, défini dans un devis.`,
  sections: [
    {
      h2: 'Nos services de sécurité à Grenoble',
      intro: "L'ensemble de nos métiers est disponible à Grenoble et en Isère.",
      subsections: [
        {
          h3: 'Gardiennage et surveillance de sites',
          content: "Sites industriels et de recherche, bureaux, commerces, chantiers et résidences : nos agents assurent rondes, contrôle d'accès et surveillance, en appliquant les consignes propres à chaque site.",
          list: ["Grenoble, Échirolles, Saint-Martin-d'Hères", 'Meylan, Montbonnot, Crolles et le Grésivaudan', 'Voiron et le pays voironnais', 'Vienne, Bourgoin-Jallieu et le nord de l\'Isère'],
        },
        {
          h3: 'Stations et événements de montagne',
          content: 'En saison, les stations et les événements de montagne demandent des renforts : surveillance de résidences et de commerces, sécurité des manifestations, rondes de nuit. Nous dimensionnons le dispositif avec vous.',
        },
      ],
    },
    {
      h2: "Zones d'intervention en Isère et alentour",
      intro: "Nous intervenons dans toute l'Isère et dans les départements voisins de notre secteur.",
      subsections: [
        {
          h3: 'Drôme, Ardèche et Haute-Loire',
          content: "De Valence et Montélimar à Privas, Aubenas et Annonay, nous intervenons aussi dans la Drôme et l'Ardèche, le long de la vallée du Rhône, et jusqu'en Haute-Loire.",
        },
        {
          h3: 'Savoie et Haute-Savoie',
          content: "À l'est, notre secteur continue en Savoie et en Haute-Savoie, de Chambéry à Annecy.",
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Intervenez-vous à Grenoble et dans le Grésivaudan ?',
      answer: "Oui. Nous intervenons à Grenoble, dans le Grésivaudan, le Voironnais et dans toute l'Isère, avec un dispositif défini dans chaque devis.",
    },
    {
      question: 'Pouvez-vous surveiller un site industriel ou de recherche ?',
      answer: "Oui, après étude du site : nos agents appliquent les consignes de sûreté et de contrôle d'accès propres à chaque établissement. Le dispositif est décrit dans le devis.",
    },
  ],
  voisines: ['/securite-privee-lyon', '/securite-privee-annecy', '/securite-privee-avignon'],
});

export default function GrenoblePage() {
  return <SeoPageLayout data={data} />;
}
