import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page locale d'intervention (choix de Théo du 13/11/2026) : aucune agence ni adresse à Perpignan,
// siège à Toulon. Règles communes : pageLocale.js.
const data = pageLocale({
  slug: '/securite-privee-perpignan',
  ville: 'Perpignan',
  departement: 'Pyrénées-Orientales',
  code: '66',
  region: 'Occitanie',
  introduction: `MTJ Sécurité Privée intervient à Perpignan et dans toutes les Pyrénées-Orientales. Préfecture du département, proche de la frontière espagnole, Perpignan est un carrefour logistique, notamment pour les fruits et légumes, entre un littoral touristique et la montagne.\n\nGardiennage, sécurité événementielle, maîtres-chiens, agents SSIAP : nous vous proposons le dispositif adapté, défini dans un devis.`,
  sections: [
    {
      h2: 'Nos services de sécurité à Perpignan',
      intro: "L'ensemble de nos métiers est disponible à Perpignan et dans les Pyrénées-Orientales.",
      subsections: [
        {
          h3: 'Gardiennage et surveillance de sites',
          content: "Entrepôts et plateformes logistiques, commerces, bureaux et résidences : nos agents assurent rondes, contrôle d'accès et surveillance, de jour comme de nuit.",
          list: ['Perpignan et son agglomération', 'Canet-en-Roussillon, Saint-Cyprien, Argelès-sur-Mer', 'Rivesaltes et la plaine du Roussillon', "Céret, Prades et l'arrière-pays"],
        },
        {
          h3: 'Saison touristique et événements',
          content: "L'été, le littoral demande des renforts : surveillance de campings, de résidences et de commerces, sécurité des fêtes et des festivals. Nous dimensionnons le dispositif avec vous.",
        },
      ],
    },
    {
      h2: "Zones d'intervention dans les Pyrénées-Orientales et l'Aude",
      intro: "Nous intervenons dans tout le département et dans l'Aude voisine.",
      subsections: [
        {
          h3: 'Aude : Narbonne et Carcassonne',
          content: 'Nous intervenons aussi dans l\'Aude, de Narbonne et du littoral audois à Carcassonne et Castelnaudary.',
        },
        {
          h3: "Le reste de l'Occitanie",
          content: "Depuis Perpignan, notre secteur continue dans l'Hérault, dans le Gard et jusqu'à Toulouse.",
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Intervenez-vous à Perpignan et sur la côte ?',
      answer: "Oui. Nous intervenons à Perpignan, sur tout le littoral des Pyrénées-Orientales et dans l'arrière-pays, avec un dispositif défini dans chaque devis.",
    },
    {
      question: 'Pouvez-vous surveiller un entrepôt ou une plateforme logistique ?',
      answer: "Oui. Rondes de nuit, contrôle des accès des véhicules, surveillance des quais et levée de doute sur alarme : le dispositif est décrit dans le devis, selon vos horaires d'activité.",
    },
  ],
  voisines: ['/securite-privee-montpellier', '/securite-privee-toulouse', '/securite-privee-nimes'],
});

export default function PerpignanPage() {
  return <SeoPageLayout data={data} />;
}
