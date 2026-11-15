import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page locale d'intervention (choix de Théo du 13/11/2026) : aucune agence ni adresse à Nîmes,
// siège à Toulon. Règles communes : pageLocale.js.
const data = pageLocale({
  slug: '/securite-privee-nimes',
  ville: 'Nîmes',
  departement: 'Gard',
  code: '30',
  region: 'Occitanie',
  introduction: `MTJ Sécurité Privée intervient à Nîmes et dans tout le Gard. Préfecture du Gard, Nîmes accueille dans ses arènes romaines des concerts et des férias, et son agglomération compte des zones d'activité et logistiques le long des grands axes routiers.\n\nArènes et lieux de férias, entrepôts le long de l'autoroute, domaines des Costières : nous adaptons le gardiennage, la sécurité des événements et les rondes cynophiles à chaque site, dans un devis détaillé.`,
  sections: [
    {
      h2: 'Nos services de sécurité à Nîmes',
      intro: "L'ensemble de nos métiers est disponible à Nîmes et dans le Gard.",
      subsections: [
        {
          h3: 'Gardiennage et surveillance de sites',
          content: "Nos agents surveillent entrepôts, commerces, bureaux et résidences : rondes, contrôle d'accès, gestion des alarmes. Nous intervenons aussi sur les chantiers et dans les exploitations agricoles et viticoles du département.",
          list: ['Nîmes et son agglomération', 'Alès et le bassin alésien', 'Beaucaire, Bellegarde, Saint-Gilles', 'Uzès, Bagnols-sur-Cèze et le Gard rhodanien'],
        },
        {
          h3: 'Férias, concerts et événements',
          content: "Les férias, les concerts et les grands rassemblements de Nîmes et du Gard demandent un dispositif solide : contrôle d'accès, filtrage, surveillance des abords et gestion des flux, en lien avec l'organisateur et les autorités.",
        },
      ],
    },
    {
      h2: "Zones d'intervention dans le Gard et alentour",
      intro: 'Nous intervenons dans tout le Gard et dans les départements voisins de notre secteur.',
      subsections: [
        {
          h3: 'Cévennes et Lozère',
          content: "D'Alès aux Cévennes, et jusqu'en Lozère, nous intervenons pour des sites isolés, des chantiers et des événements, sur devis.",
        },
        {
          h3: 'Camargue gardoise et vallée du Rhône',
          content: "D'Aigues-Mortes et du Grau-du-Roi à Beaucaire et Pont-Saint-Esprit, nous couvrons tout le sud et l'est du département, ainsi que le Vaucluse voisin.",
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Intervenez-vous à Nîmes et à Alès ?',
      answer: 'Oui. Nous intervenons à Nîmes, à Alès et dans tout le Gard, avec un dispositif défini dans chaque devis.',
    },
    {
      question: 'Pouvez-vous sécuriser une féria ou un concert ?',
      answer: "Oui, après étude de l'événement avec l'organisateur : public attendu, lieux, horaires. Le dispositif d'agents, avec des maîtres-chiens si besoin, est décrit dans le devis.",
    },
  ],
  voisines: ['/securite-privee-montpellier', '/securite-privee-avignon', '/securite-privee-marseille', '/securite-privee-perpignan'],
});

export default function NimesPage() {
  return <SeoPageLayout data={data} />;
}
