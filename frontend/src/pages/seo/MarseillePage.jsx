import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page locale d'intervention (choix de Théo du 13/11/2026) : aucune agence ni adresse à Marseille,
// siège à Toulon. Règles communes : pageLocale.js.
const data = pageLocale({
  slug: '/securite-privee-marseille',
  ville: 'Marseille',
  departement: 'Bouches-du-Rhône',
  code: '13',
  region: "Provence-Alpes-Côte d'Azur",
  introduction: `MTJ Sécurité Privée intervient à Marseille et dans toutes les Bouches-du-Rhône, non loin de son siège de Toulon. Préfecture de la région Provence-Alpes-Côte d'Azur, Marseille réunit un grand port de commerce et de passagers, des quartiers d'affaires, des zones logistiques et industrielles et une vie événementielle intense.\n\nGardiennage de sites, sécurité de vos événements, maîtres-chiens, agents SSIAP pour vos établissements recevant du public : nous vous proposons le dispositif qui correspond à votre besoin, défini dans un devis.`,
  sections: [
    {
      h2: 'Nos services de sécurité à Marseille',
      intro: "L'ensemble de nos métiers est disponible à Marseille et dans les Bouches-du-Rhône.",
      subsections: [
        {
          h3: 'Gardiennage et surveillance de sites',
          content: "Nos agents de prévention et de sécurité surveillent bureaux, commerces, entrepôts et résidences : rondes, contrôle d'accès, gestion des alarmes et levée de doute. Les zones d'activité et logistiques de l'agglomération, comme à Vitrolles, aux Pennes-Mirabeau ou à Aubagne, demandent souvent une présence la nuit et le week-end.",
          list: ['Marseille centre, Euroméditerranée, quartiers nord et sud', "Aix-en-Provence et le pays d'Aix", 'Aubagne et La Ciotat', "Vitrolles, Marignane et le pourtour de l'étang de Berre"],
        },
        {
          h3: 'Sécurité événementielle',
          content: "Matchs, concerts, salons professionnels, festivals d'été et manifestations sur le littoral : nous dimensionnons le dispositif (contrôle d'accès, filtrage, surveillance des zones sensibles, équipes cynophiles) avec l'organisateur et en lien avec les autorités compétentes.",
        },
      ],
    },
    {
      h2: "Zones d'intervention dans les Bouches-du-Rhône",
      intro: 'Nous intervenons dans tout le département et dans le reste de la Provence.',
      subsections: [
        {
          h3: 'Métropole Aix-Marseille-Provence',
          content: "De Marseille à Aix-en-Provence, d'Aubagne à Martigues, nous intervenons dans l'ensemble de la métropole, pour des missions ponctuelles comme pour des contrats de longue durée.",
        },
        {
          h3: "Pays d'Arles et Camargue",
          content: "Arles, Salon-de-Provence, Istres et Tarascon : surveillance de sites agricoles et logistiques, de chantiers et d'événements d'été.",
        },
        {
          h3: 'Le reste de la Provence',
          content: 'Depuis Marseille, notre secteur continue dans le Var, où se trouve notre siège, dans le Vaucluse et dans les Alpes-de-Haute-Provence.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Intervenez-vous à Marseille et à Aix-en-Provence ?',
      answer: 'Oui. Nous intervenons à Marseille, à Aix-en-Provence et dans toutes les Bouches-du-Rhône, avec un dispositif défini dans chaque devis.',
    },
    {
      question: 'Pouvez-vous sécuriser un événement à Marseille ?',
      answer: "Oui. Concert, match, salon, festival ou soirée privée : nous étudions l'événement avec vous (lieu, public attendu, horaires) et vous proposons un dispositif d'agents adapté, avec des maîtres-chiens si besoin.",
    },
  ],
  voisines: ['/securite-privee-toulon', '/securite-privee-avignon', '/securite-privee-nice-monaco', '/securite-privee-nimes'],
});

export default function MarseillePage() {
  return <SeoPageLayout data={data} />;
}
