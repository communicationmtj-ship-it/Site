import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page locale d'intervention (choix de Théo du 13/11/2026) : aucune agence ni adresse à Montpellier,
// siège à Toulon. Règles communes : pageLocale.js.
const data = pageLocale({
  slug: '/securite-privee-montpellier',
  ville: 'Montpellier',
  departement: 'Hérault',
  code: '34',
  region: 'Occitanie',
  introduction: `MTJ Sécurité Privée intervient à Montpellier et dans tout l'Hérault. Préfecture du département, Montpellier est une métropole universitaire et hospitalière, avec des parcs d'activités, des commerces et un littoral très fréquenté en été, de Palavas-les-Flots à La Grande-Motte.\n\nGardiennage, sécurité événementielle, maîtres-chiens et agents SSIAP : nous construisons avec vous le dispositif adapté à votre site ou à votre événement, défini dans un devis.`,
  sections: [
    {
      h2: 'Nos services de sécurité à Montpellier',
      intro: "L'ensemble de nos métiers est disponible à Montpellier et dans l'Hérault.",
      subsections: [
        {
          h3: 'Gardiennage et surveillance de sites',
          content: "Bureaux, commerces, entrepôts, établissements de santé et résidences : nos agents assurent rondes, contrôle d'accès et surveillance, de jour comme de nuit, dans la métropole et dans tout le département.",
          list: ['Montpellier centre, Antigone, Port Marianne', 'Lattes, Pérols, Mauguio, Castelnau-le-Lez', 'Sète, Frontignan, Agde', "Béziers, Lunel et l'arrière-pays"],
        },
        {
          h3: 'Sécurité événementielle',
          content: "Salons et congrès, concerts, rencontres sportives et festivals d'été sur le littoral : nous dimensionnons le contrôle d'accès, le filtrage et la surveillance avec l'organisateur.",
        },
      ],
    },
    {
      h2: "Zones d'intervention dans l'Hérault et alentour",
      intro: "Nous intervenons dans tout l'Hérault et dans le reste de l'Occitanie méditerranéenne.",
      subsections: [
        {
          h3: 'Littoral héraultais',
          content: "De La Grande-Motte au Cap d'Agde, la saison d'été demande des renforts : surveillance de campings, de résidences et de commerces, sécurité des événements de plage.",
        },
        {
          h3: "Gard, Aude et reste de l'Occitanie",
          content: "Depuis Montpellier, notre secteur continue dans le Gard, l'Aude et les Pyrénées-Orientales, et jusqu'à Toulouse.",
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Intervenez-vous à Montpellier et à Béziers ?',
      answer: "Oui. Nous intervenons à Montpellier, à Béziers, à Sète et dans tout l'Hérault, avec un dispositif défini dans chaque devis.",
    },
    {
      question: "Proposez-vous des renforts pour la saison d'été ?",
      answer: 'Oui. Pour la haute saison sur le littoral, nous pouvons mettre en place des agents et des maîtres-chiens pour des campings, des résidences, des commerces ou des événements, sur la durée que vous choisissez.',
    },
  ],
  voisines: ['/securite-privee-nimes', '/securite-privee-perpignan', '/securite-privee-toulouse', '/securite-privee-marseille'],
});

export default function MontpellierPage() {
  return <SeoPageLayout data={data} />;
}
