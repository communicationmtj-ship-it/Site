import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page locale d'intervention (choix de Théo du 13/11/2026) : aucune agence ni adresse à Lyon,
// siège à Toulon. Règles communes : pageLocale.js.
const data = pageLocale({
  slug: '/securite-privee-lyon',
  ville: 'Lyon',
  departement: 'Rhône',
  code: '69',
  region: 'Auvergne-Rhône-Alpes',
  introduction: `MTJ Sécurité Privée intervient à Lyon et dans le Rhône, au nord de son secteur. Préfecture de la région Auvergne-Rhône-Alpes, Lyon concentre quartiers d'affaires, grands lieux d'exposition, zones logistiques et sites industriels, et accueille chaque année de grands événements, comme la Fête des Lumières.\n\nBureaux de la Part-Dieu ou de Gerland, entrepôts de l'est lyonnais, salons d'Eurexpo : nous établissons le dispositif avec vous, agents de sécurité, maîtres-chiens ou agents SSIAP, et le chiffrons dans un devis.`,
  sections: [
    {
      h2: 'Nos services de sécurité à Lyon',
      intro: "L'ensemble de nos métiers est disponible à Lyon et dans le Rhône.",
      subsections: [
        {
          h3: 'Gardiennage et surveillance de sites',
          content: "Bureaux, commerces, entrepôts, sites industriels et résidences : nos agents assurent rondes, contrôle d'accès, gestion des alarmes et surveillance, de jour comme de nuit.",
          list: ['Lyon, Part-Dieu, Confluence, Gerland', 'Villeurbanne, Vaulx-en-Velin, Bron', 'Vénissieux, Saint-Priest, Corbas', 'Villefranche-sur-Saône et le Beaujolais'],
        },
        {
          h3: 'Salons, congrès et événements',
          content: "Salons, congrès, concerts, rencontres sportives et grandes fêtes populaires : nous dimensionnons le contrôle d'accès, le filtrage et la surveillance avec l'organisateur, en lien avec les autorités.",
        },
      ],
    },
    {
      h2: "Zones d'intervention dans le Rhône et alentour",
      intro: 'Nous intervenons dans tout le Rhône et dans les départements voisins de notre secteur.',
      subsections: [
        {
          h3: 'Ain',
          content: "Nous intervenons aussi dans l'Ain : Bourg-en-Bresse, Oyonnax, la Côtière et le pays de Gex.",
        },
        {
          h3: 'Isère et vallée du Rhône',
          content: "Au sud et à l'est de Lyon, notre secteur continue en Isère, jusqu'à Grenoble, et le long de la vallée du Rhône vers la Drôme et l'Ardèche.",
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Intervenez-vous à Lyon et dans sa métropole ?',
      answer: 'Oui. Nous intervenons à Lyon, dans toute la métropole et dans le Rhône, avec un dispositif défini dans chaque devis.',
    },
    {
      question: "Pouvez-vous sécuriser un salon ou un congrès ?",
      answer: "Oui. Contrôle d'accès, filtrage, surveillance des stands la nuit, rondes : nous étudions l'événement avec l'organisateur et décrivons le dispositif dans le devis.",
    },
  ],
  voisines: ['/securite-privee-annecy', '/securite-privee-grenoble', '/securite-privee-avignon'],
});

export default function LyonPage() {
  return <SeoPageLayout data={data} />;
}
