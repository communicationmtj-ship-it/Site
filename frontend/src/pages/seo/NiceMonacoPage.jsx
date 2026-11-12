import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/securite-privee-nice-monaco',
  metaTitle: 'Sécurité Privée Nice & Monaco | Côte d\'Azur | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée à Nice et Monaco : agents de sécurité, maître-chien, SSIAP, sécurité événementielle sur la Côte d\'Azur. Cannes, Antibes, Menton. Devis gratuit.',
  breadcrumbCurrent: 'Sécurité privée Nice & Monaco',
  areaServed: 'Nice, Monaco, Cannes, Côte d\'Azur, Alpes-Maritimes',

  h1: 'Sécurité Privée à Nice, Monaco et sur la Côte d\'Azur',
  introduction: `MTJ Sécurité Privée intervient sur l'ensemble de la Côte d'Azur, de Nice à Monaco en passant par Cannes, Antibes et Menton. La French Riviera, destination internationale de prestige, accueille chaque année des millions de touristes, des événements planétaires (Festival de Cannes, Grand Prix de Monaco, Carnaval de Nice) et une clientèle exigeante en matière de sécurité.\n\nNotre expertise en sécurité privée, en sécurité cynophile et en détection d'explosifs répond aux standards les plus élevés requis par les acteurs économiques et les organisateurs d'événements de la Côte d'Azur.`,

  sections: [
    {
      h2: 'Nos services de sécurité sur la Côte d\'Azur',
      intro: 'De la surveillance de propriétés de luxe à la sécurisation d\'événements internationaux, nos prestations couvrent l\'ensemble des besoins en sécurité de la Riviera.',
      subsections: [
        {
          h3: 'Sécurité privée à Nice et dans les Alpes-Maritimes',
          content: 'Nice, cinquième ville de France, concentre une activité économique dense et diversifiée. Nos agents assurent le gardiennage de sites commerciaux (Nice Étoile, Cap 3000, Polygone Riviera), la surveillance de résidences de standing, le contrôle d\'accès d\'événements sur la Promenade des Anglais et la protection de sites touristiques. Nous couvrons également les communes limitrophes : Saint-Laurent-du-Var, Cagnes-sur-Mer, Vence, Grasse et l\'arrière-pays niçois.',
          list: ['Nice centre et Promenade des Anglais', 'Sophia Antipolis et technopole', 'Cannes, La Croisette et Palais des Festivals', 'Antibes, Juan-les-Pins, Mougins']
        },
        {
          h3: 'Sécurité privée à Monaco',
          content: 'La Principauté de Monaco exige un niveau de sécurité d\'exception. MTJ Sécurité Privée intervient pour la protection de résidences privées, d\'hôtels de luxe, de boutiques de haute joaillerie et d\'événements exclusifs à Monaco. Nos agents, rompus aux exigences de discrétion et de professionnalisme de la clientèle monégasque, assurent des prestations haut de gamme dans le respect de la législation de la Principauté.'
        }
      ]
    },
    {
      h2: 'Événements internationaux sécurisés',
      intro: 'La Côte d\'Azur accueille certains des événements les plus prestigieux au monde, chacun avec des exigences sécuritaires spécifiques.',
      subsections: [
        {
          h3: 'Festival de Cannes et événements culturels',
          content: 'Le Festival International du Film de Cannes, le MIPIM, le MIPCOM, le Cannes Lions : ces événements de renommée mondiale nécessitent des dispositifs de sécurité d\'envergure. MTJ Sécurité Privée intervient pour le contrôle d\'accès, la surveillance périmétrique, la protection de personnalités et la sécurisation des zones VIP lors de ces manifestations.'
        },
        {
          h3: 'Grand Prix de Monaco et événements sportifs',
          content: 'Le Grand Prix de Formule 1 de Monaco est l\'un des événements sportifs les plus sécurisés au monde. Notre expertise en sécurité événementielle nous permet de contribuer à la sécurisation de ce type de manifestation d\'exception, ainsi que des tournois de tennis (Monte-Carlo Masters), des régates et des rallyes de la Côte d\'Azur.'
        },
        {
          h3: 'Carnaval de Nice et festivités locales',
          content: 'Le Carnaval de Nice, deuxième plus grand carnaval au monde, attire des centaines de milliers de spectateurs. La sécurisation de cet événement en plein air nécessite un dispositif important : contrôle des accès aux tribunes, surveillance des cortèges, gestion des mouvements de foule et coordination avec les forces de l\'ordre.'
        }
      ]
    },
    {
      h2: 'Sécurité de prestige et clientèle internationale',
      subsections: [
        {
          h3: 'Protection de propriétés de luxe',
          content: 'La Côte d\'Azur abrite certaines des propriétés les plus prestigieuses d\'Europe. MTJ Sécurité Privée assure la surveillance de villas, de domaines privés et de résidences de luxe à Cap-Ferrat, Cap d\'Antibes, Mougins, Super-Cannes et dans l\'ensemble des quartiers résidentiels haut de gamme. Nos agents allient compétence technique et savoir-être irréprochable.',
          list: ['Villas et domaines privés', 'Résidences de standing et copropriétés', 'Yachts et ports de plaisance', 'Hôtels et palaces']
        },
        {
          h3: 'Discrétion et professionnalisme',
          content: 'La clientèle de la Côte d\'Azur attend un service de sécurité discret, efficace et respectueux de sa vie privée. Nos agents sont formés aux codes de la sécurité de prestige : tenue adaptée, communication maîtrisée, gestion de la confidentialité et capacité à évoluer dans des environnements sociaux exigeants.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Intervenez-vous à Monaco depuis la France ?',
      answer: 'Oui. MTJ Sécurité Privée, société de sécurité privée autorisée par le CNAPS, intervient à Monaco dans le cadre d\'accords transfrontaliers. Nos agents respectent la réglementation monégasque applicable aux prestataires de sécurité privée étrangers. Contactez-nous pour en savoir plus sur nos prestations à Monaco.'
    },
    {
      question: 'Pouvez-vous sécuriser un événement au Palais des Festivals de Cannes ?',
      answer: 'Absolument. Nous disposons d\'une expérience en sécurisation d\'événements de prestige sur la Côte d\'Azur. Nos équipes (agents APS, cynophile, CYNODEX) peuvent être déployées au Palais des Festivals et dans tout lieu événementiel de Cannes et de la Riviera.'
    },
    {
      question: 'Proposez-vous une sécurité saisonnière pour l\'été ?',
      answer: 'Oui. La Côte d\'Azur connaît un pic d\'activité en période estivale. MTJ Sécurité Privée propose des contrats saisonniers pour la surveillance de résidences secondaires, la sécurité d\'événements estivaux, le gardiennage de plages privées et la protection de sites touristiques pendant la haute saison.'
    }
  ],

  conclusion: `La Côte d'Azur exige une sécurité à la hauteur de son prestige international. MTJ Sécurité Privée apporte à Nice, Monaco, Cannes et l'ensemble de la Riviera une expertise complète en sécurité privée, événementielle, cynophile et incendie.\n\nProtégez vos événements, vos propriétés et vos activités avec un partenaire de confiance. Contactez MTJ Sécurité Privée pour un devis personnalisé.`,

  relatedLinks: [
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-toulouse', label: 'Sécurité privée à Toulouse' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/detection-explosifs-cynodex', label: 'Détection d\'explosifs CYNODEX' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
  ]
};

export default function NiceMonacoPage() {
  return <SeoPageLayout data={data} />;
}
