import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page locale d'intervention (choix de Théo du 13/11/2026) : aucune agence ni adresse à Avignon,
// siège à Toulon. Règles communes : pageLocale.js.
const data = pageLocale({
  slug: '/securite-privee-avignon',
  ville: 'Avignon',
  departement: 'Vaucluse',
  code: '84',
  region: "Provence-Alpes-Côte d'Azur",
  introduction: `MTJ Sécurité Privée intervient à Avignon et dans tout le Vaucluse. Préfecture du Vaucluse, Avignon accueille chaque été son festival de théâtre, et son bassin réunit des zones d'activité, des plateformes logistiques et des exploitations agricoles.\n\nGardiennage, sécurité événementielle, maîtres-chiens, agents SSIAP : nous vous proposons le dispositif adapté, défini dans un devis.`,
  sections: [
    {
      h2: "Nos services de sécurité à Avignon",
      intro: "L'ensemble de nos métiers est disponible à Avignon et dans le Vaucluse.",
      subsections: [
        {
          h3: 'Gardiennage et surveillance de sites',
          content: "Commerces, entrepôts, bureaux, exploitations agricoles et résidences : nos agents assurent rondes, contrôle d'accès et surveillance, de jour comme de nuit.",
          list: ['Avignon, Le Pontet, Sorgues', "Carpentras, Cavaillon, L'Isle-sur-la-Sorgue", 'Orange et le nord du Vaucluse', 'Pertuis, Apt et le Luberon'],
        },
        {
          h3: 'Festivals et événements',
          content: "Pendant les festivals d'été, les foires et les salons, l'affluence change d'échelle : contrôle d'accès, surveillance des lieux de spectacle et de leurs abords, gestion des flux, en lien avec l'organisateur.",
        },
      ],
    },
    {
      h2: 'Zones d\'intervention dans le Vaucluse et les Alpes du Sud',
      intro: 'Nous intervenons dans tout le Vaucluse et jusque dans les Alpes du Sud.',
      subsections: [
        {
          h3: 'Alpes-de-Haute-Provence et Hautes-Alpes',
          content: 'De Manosque et Digne-les-Bains à Gap et Briançon, nous intervenons aussi dans les Alpes du Sud : chantiers, sites isolés, stations et événements, sur devis.',
        },
        {
          h3: 'Drôme et Gard voisins',
          content: 'Au nord et à l\'ouest du Vaucluse, notre secteur continue dans la Drôme et dans le Gard.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Intervenez-vous à Avignon pendant le festival ?',
      answer: "Oui, sur devis : contrôle d'accès des salles, surveillance des lieux et de leurs abords, rondes de nuit. Les demandes pour la période des festivals sont à anticiper.",
    },
    {
      question: 'Couvrez-vous tout le Vaucluse ?',
      answer: "Oui : Avignon, Carpentras, Cavaillon, Orange, Pertuis et l'ensemble du département, avec un dispositif défini dans chaque devis.",
    },
  ],
  voisines: ['/securite-privee-marseille', '/securite-privee-nimes', '/securite-privee-grenoble', '/securite-privee-toulon'],
});

export default function AvignonPage() {
  return <SeoPageLayout data={data} />;
}
