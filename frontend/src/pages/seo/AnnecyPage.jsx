import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page locale d'intervention (choix de Théo du 13/11/2026) : aucune agence ni adresse à Annecy,
// siège à Toulon. Règles communes : pageLocale.js.
const data = pageLocale({
  slug: '/securite-privee-annecy',
  ville: 'Annecy',
  departement: 'Haute-Savoie',
  code: '74',
  region: 'Auvergne-Rhône-Alpes',
  introduction: `MTJ Sécurité Privée intervient à Annecy et dans toute la Haute-Savoie, au nord-est de son secteur. Préfecture de la Haute-Savoie, Annecy vit au rythme de son lac, de ses événements et des saisons touristiques, entre stations de ski, vallée industrielle de l'Arve et proximité de Genève.\n\nGardiennage, sécurité événementielle, maîtres-chiens, agents SSIAP : nous vous proposons le dispositif adapté, défini dans un devis.`,
  sections: [
    {
      h2: 'Nos services de sécurité à Annecy',
      intro: "L'ensemble de nos métiers est disponible à Annecy et en Haute-Savoie.",
      subsections: [
        {
          h3: 'Gardiennage et surveillance de sites',
          content: "Commerces, entrepôts, sites industriels, chantiers et résidences : nos agents assurent rondes, contrôle d'accès et surveillance, de jour comme de nuit.",
          list: ['Annecy, Annecy-le-Vieux, Seynod, Cran-Gevrier', 'Rumilly et le bassin annécien', 'Annemasse, Thonon-les-Bains, Évian-les-Bains', "Cluses, Sallanches et la vallée de l'Arve"],
        },
        {
          h3: 'Événements, marchés et saisons touristiques',
          content: "Fêtes au bord du lac, marchés de Noël, festivals, rencontres sportives, saison d'hiver dans les stations : nous dimensionnons le contrôle d'accès, la surveillance et les rondes avec l'organisateur.",
        },
      ],
    },
    {
      h2: "Zones d'intervention en Haute-Savoie et en Savoie",
      intro: 'Nous intervenons dans toute la Haute-Savoie et en Savoie.',
      subsections: [
        {
          h3: 'Savoie',
          content: 'Nous intervenons aussi en Savoie : Chambéry, Aix-les-Bains, Albertville et les stations de la Tarentaise et de la Maurienne.',
        },
        {
          h3: 'Stations de montagne',
          content: 'Des Aravis au Chablais et au pays du Mont-Blanc, nous pouvons renforcer la surveillance des résidences, des commerces et des événements pendant la saison.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Intervenez-vous à Annecy et autour du lac ?',
      answer: 'Oui. Nous intervenons à Annecy, autour du lac et dans toute la Haute-Savoie, avec un dispositif défini dans chaque devis.',
    },
    {
      question: "Proposez-vous des renforts pour la saison d'hiver ?",
      answer: 'Oui. Pour la saison, nous pouvons mettre en place des agents, avec des maîtres-chiens si besoin, pour des résidences, des commerces, des chantiers ou des événements, sur la durée que vous choisissez.',
    },
  ],
  voisines: ['/securite-privee-lyon', '/securite-privee-grenoble'],
});

export default function AnnecyPage() {
  return <SeoPageLayout data={data} />;
}
