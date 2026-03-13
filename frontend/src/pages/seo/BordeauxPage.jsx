import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/securite-privee-bordeaux',
  metaTitle: 'Société de Sécurité Privée à Bordeaux (33) | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée à Bordeaux : agents de sécurité, gardiennage, sécurité cynophile et événementielle en Gironde et Nouvelle-Aquitaine. Devis gratuit — 07 60 73 82 06.',
  breadcrumbCurrent: 'Sécurité privée à Bordeaux',
  areaServed: 'Bordeaux, Gironde, Nouvelle-Aquitaine',

  h1: 'Sécurité Privée à Bordeaux — Gironde (33)',
  introduction: `MTJ Sécurité Privée étend son expertise en sécurité privée à Bordeaux et sur l'ensemble de la métropole bordelaise. Sixième ville de France, Bordeaux est un pôle économique majeur avec une activité viticole mondialement reconnue, un secteur aéronautique de pointe et un tissu tertiaire en pleine expansion.\n\nCette dynamique génère des besoins croissants en sécurité privée : surveillance de sites viticoles, gardiennage de zones d'activité, sécurisation d'événements culturels et sportifs. MTJ Sécurité Privée répond à ces besoins avec des solutions professionnelles et adaptées au contexte bordelais.`,

  sections: [
    {
      h2: 'Nos services de sécurité à Bordeaux',
      intro: 'L\'ensemble des compétences de MTJ Sécurité Privée est mobilisable sur Bordeaux et la Gironde.',
      subsections: [
        {
          h3: 'Gardiennage et surveillance en Gironde',
          content: 'Nos agents assurent le gardiennage de sites industriels, commerciaux et résidentiels dans la métropole bordelaise et en Gironde. Des zones d\'activité de Mérignac et Pessac aux domaines viticoles du Médoc et de Saint-Émilion, en passant par le centre-ville de Bordeaux, nos équipes couvrent l\'ensemble du département.',
          list: ['Bordeaux centre, Chartrons, Bassins à flot', 'Mérignac, Pessac, Talence', 'Bassin d\'Arcachon et littoral', 'Libournais et vignobles de Saint-Émilion']
        },
        {
          h3: 'Sécurité événementielle à Bordeaux',
          content: 'Bordeaux accueille des événements majeurs : Bordeaux Fête le Vin, matchs des Girondins et de l\'UBB (rugby), salons professionnels (Vinexpo), festivals de musique et événements à la Cité du Vin. MTJ Sécurité Privée assure la sécurisation de ces manifestations avec des dispositifs dimensionnés et une coordination avec les autorités locales.'
        }
      ]
    },
    {
      h2: 'Zones d\'intervention en Nouvelle-Aquitaine',
      intro: 'Depuis Bordeaux, nous intervenons sur l\'ensemble de la Gironde et dans les départements limitrophes de Nouvelle-Aquitaine.',
      subsections: [
        {
          h3: 'Métropole bordelaise et rive droite',
          content: 'La Métropole de Bordeaux regroupe 28 communes et près de 800 000 habitants. Nos agents couvrent l\'ensemble de ce territoire : Bordeaux centre, Mérignac (zones aéroportuaires), Pessac, Talence, Villenave-d\'Ornon, Bègles, Cenon, Lormont et Floirac. Chaque commune présente des enjeux sécuritaires spécifiques que nous maîtrisons.'
        },
        {
          h3: 'Bassin d\'Arcachon et littoral girondin',
          content: 'Le Bassin d\'Arcachon, Arcachon, La Teste-de-Buch, Gujan-Mestras et le littoral girondin sont des zones touristiques majeures qui nécessitent une sécurité renforcée en saison estivale. Surveillance de campings, sécurité d\'événements nautiques, gardiennage de résidences secondaires : nous répondons aux besoins saisonniers avec des équipes dédiées.'
        },
        {
          h3: 'Vignobles et domaines viticoles',
          content: 'La Gironde abrite certains des vignobles les plus prestigieux au monde : Médoc, Saint-Émilion, Pomerol, Graves. La protection de ces domaines contre le vol, l\'intrusion et le vandalisme est un enjeu crucial. MTJ Sécurité Privée assure la surveillance de propriétés viticoles, de chais et d\'exploitations agricoles avec des prestations adaptées au monde viticole.'
        }
      ]
    },
    {
      h2: 'Pourquoi choisir MTJ Sécurité Privée à Bordeaux',
      subsections: [
        {
          h3: 'Expertise transposée du sud de la France',
          content: 'Forte de son expérience acquise dans le sud-est de la France (Toulon, Nice, Monaco), MTJ Sécurité Privée apporte à Bordeaux un savoir-faire éprouvé dans la sécurisation de sites sensibles, d\'événements de grande envergure et de milieux exigeants. Notre expertise en sécurité cynophile et en détection d\'explosifs (CYNODEX) complète notre offre bordelaise.'
        },
        {
          h3: 'Capacité de montée en charge',
          content: 'Grâce à notre implantation multi-sites (Toulon, Bordeaux, Nice), nous disposons d\'une capacité de mobilisation rapide d\'agents supplémentaires pour vos pics d\'activité ou vos événements exceptionnels. Cette flexibilité est un atout majeur pour les clients ayant des besoins variables ou saisonniers.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Depuis quand MTJ Sécurité Privée est-elle présente à Bordeaux ?',
      answer: 'MTJ Sécurité Privée a étendu son activité à Bordeaux pour répondre à la demande croissante en sécurité privée en Nouvelle-Aquitaine. Notre siège reste à Toulon, mais nous disposons d\'équipes opérationnelles sur Bordeaux et la Gironde pour assurer un service de proximité.'
    },
    {
      question: 'Pouvez-vous intervenir dans le Médoc ou le Libournais ?',
      answer: 'Oui. Nos équipes couvrent l\'ensemble du département de la Gironde, y compris les zones rurales du Médoc, du Libournais et de l\'Entre-deux-Mers. Nous intervenons régulièrement pour la surveillance de domaines viticoles et de propriétés privées dans ces secteurs.'
    },
    {
      question: 'Proposez-vous des prestations cynophiles à Bordeaux ?',
      answer: 'Absolument. Notre unité cynophile intervient à Bordeaux pour des missions de surveillance renforcée, de sécurité événementielle et de détection d\'explosifs (CYNODEX). Les binômes maître-chien sont particulièrement adaptés aux sites étendus et aux événements de grande envergure.'
    }
  ],

  conclusion: `Bordeaux et la Gironde bénéficient désormais de l'expertise de MTJ Sécurité Privée. Agents de sécurité qualifiés, équipes cynophiles, agents SSIAP et unité CYNODEX : l'ensemble de nos compétences est à votre disposition pour protéger vos sites, vos événements et vos biens.\n\nContactez-nous pour un devis gratuit et découvrez comment MTJ Sécurité Privée peut répondre à vos besoins de sécurité à Bordeaux.`,

  relatedLinks: [
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée Nice & Monaco' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/surveillance-chantier-site', label: 'Surveillance de chantiers' },
  ]
};

export default function BordeauxPage() {
  return <SeoPageLayout data={data} />;
}
