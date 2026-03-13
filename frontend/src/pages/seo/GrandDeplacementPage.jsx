import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/grand-deplacement-securite-france',
  metaTitle: 'Grand Déplacement Sécurité — Intervention sur tout le Territoire National | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée intervient en grand déplacement sur l\'ensemble du territoire français. Paris, Lyon, Bordeaux, Nantes, Strasbourg : déploiement d\'agents de sécurité, cynophile, SSIAP et CYNODEX partout en France.',
  breadcrumbCurrent: 'Grand déplacement national',
  areaServed: 'France métropolitaine',

  h1: 'Grand Déplacement — Sécurité sur l\'Ensemble du Territoire National',
  introduction: `Au-delà de notre zone d'implantation principale dans le sud de la France (Toulon, Nice, Toulouse), MTJ Sécurité Privée dispose de la capacité logistique et opérationnelle pour déployer ses équipes en grand déplacement sur l'ensemble du territoire français.\n\nParis, Lyon, Bordeaux, Nantes, Strasbourg, Lille : où que se trouvent vos besoins en sécurité, nous mobilisons nos agents qualifiés pour des missions ponctuelles ou récurrentes. Cette flexibilité fait de MTJ Sécurité Privée un partenaire unique capable de vous accompagner sur tous vos sites en France.`,

  sections: [
    {
      h2: 'Notre capacité de déploiement national',
      intro: 'MTJ Sécurité Privée a développé une organisation logistique permettant d\'intervenir rapidement partout en France métropolitaine.',
      subsections: [
        {
          h3: 'Mobilisation rapide des équipes',
          content: 'Grâce à nos trois pôles opérationnels (Toulon, Nice, Toulouse), nous sommes en mesure de projeter nos agents sur l\'ensemble du territoire en moins de 48 heures. Pour les urgences, un dispositif de déploiement accéléré permet une intervention sous 24 heures. Nos équipes voyagent avec leur équipement complet et sont immédiatement opérationnelles à leur arrivée.',
          list: ['Déploiement sous 24 à 48 heures', 'Équipes autonomes et équipées', 'Coordination logistique centralisée', 'Hébergement et transport pris en charge']
        },
        {
          h3: 'Villes et régions d\'intervention',
          content: 'Nous intervenons régulièrement hors de notre zone principale pour des missions de sécurité événementielle, de gardiennage temporaire, de sécurité cynophile ou de détection d\'explosifs. Paris et Île-de-France, Lyon et région Auvergne-Rhône-Alpes, Bordeaux et Nouvelle-Aquitaine, Nantes et Pays de la Loire, Strasbourg et Grand Est : nos équipes connaissent les spécificités de chaque territoire.',
          list: ['Paris et Île-de-France', 'Lyon, Grenoble, Saint-Étienne', 'Bordeaux, La Rochelle, Bayonne', 'Nantes, Rennes, Brest', 'Strasbourg, Metz, Nancy', 'Lille, Rouen, Reims']
        },
        {
          h3: 'DOM-TOM et international',
          content: 'Sur demande spécifique, MTJ Sécurité Privée peut étudier la faisabilité de missions dans les départements et territoires d\'outre-mer ainsi qu\'à l\'international. Chaque demande fait l\'objet d\'une étude personnalisée prenant en compte les contraintes réglementaires locales.'
        }
      ]
    },
    {
      h2: 'Types de missions en grand déplacement',
      intro: 'Le grand déplacement répond à des besoins variés, ponctuels ou récurrents.',
      subsections: [
        {
          h3: 'Sécurité événementielle nationale',
          content: 'Festivals, salons professionnels, tournées artistiques, compétitions sportives : de nombreux événements se déroulent sur tout le territoire français. MTJ Sécurité Privée accompagne les organisateurs avec des équipes complètes (agents APS, cynophile, SSIAP, CYNODEX) déployées directement sur le lieu de l\'événement, quelle que soit sa localisation.',
          list: ['Festivals et concerts en plein air', 'Salons et foires exposition', 'Événements sportifs nationaux', 'Tournées et spectacles itinérants']
        },
        {
          h3: 'Gardiennage temporaire de sites',
          content: 'Chantiers de grande envergure, sites industriels en maintenance, locaux vacants en attente de reconversion : le gardiennage temporaire en grand déplacement permet de sécuriser vos actifs partout en France pendant une période définie. Nos agents assurent rondes, contrôle d\'accès et surveillance 24/7.'
        },
        {
          h3: 'Renfort d\'effectifs pour partenaires',
          content: 'MTJ Sécurité Privée peut également intervenir en renfort d\'effectifs pour des entreprises de sécurité partenaires lors de pics d\'activité. Cette prestation de sous-traitance qualifiée garantit à nos partenaires des agents formés, équipés et immédiatement opérationnels.'
        },
        {
          h3: 'Sécurité cynophile et CYNODEX en déplacement',
          content: 'Nos binômes maître-chien d\'intervention et nos équipes CYNODEX de détection d\'explosifs sont particulièrement sollicités en grand déplacement pour des missions spécifiques : sécurisation d\'événements sensibles, levées de doute, inspections de sites avant des manifestations publiques. Ces compétences rares sont un atout décisif pour les organisateurs d\'événements nationaux.'
        }
      ]
    },
    {
      h2: 'Organisation et logistique',
      subsections: [
        {
          h3: 'Préparation et reconnaissance',
          content: 'Chaque mission en grand déplacement fait l\'objet d\'une préparation rigoureuse : étude du site à distance, coordination avec le client et les autorités locales, planification des rotations d\'équipes, organisation du transport et de l\'hébergement. Un chef de mission est désigné pour chaque opération.',
          list: ['Étude de site et analyse de risques', 'Coordination avec les autorités locales', 'Planification des rotations d\'équipes', 'Chef de mission dédié']
        },
        {
          h3: 'Suivi et reporting',
          content: 'Pendant toute la durée de la mission, un suivi en temps réel est assuré depuis notre centre opérationnel. Rapports quotidiens, main courante dématérialisée, photos géolocalisées : vous disposez d\'une visibilité complète sur la prestation, même à distance.'
        },
        {
          h3: 'Tarification transparente',
          content: 'Les missions en grand déplacement incluent les frais de déplacement, d\'hébergement et de restauration des agents. Tous ces coûts sont détaillés dans notre devis, sans surprise. Nous optimisons la logistique pour proposer des tarifs compétitifs même pour des interventions loin de nos bases.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quel est le délai pour organiser une mission en grand déplacement ?',
      answer: 'Le délai standard est de 48 à 72 heures pour une mission classique. En cas d\'urgence, nous pouvons mobiliser des équipes sous 24 heures. Pour les événements planifiés, nous recommandons de nous contacter au moins 2 semaines à l\'avance pour une préparation optimale.'
    },
    {
      question: 'Les frais de déplacement sont-ils inclus dans le devis ?',
      answer: 'Oui, notre devis pour les missions en grand déplacement est tout compris : prestation de sécurité, transport des agents, hébergement, restauration et équipement. Aucun frais caché. Le tarif est fixé à l\'avance et détaillé poste par poste.'
    },
    {
      question: 'Pouvez-vous intervenir pour un seul jour ?',
      answer: 'Absolument. Nous réalisons des missions ponctuelles d\'une journée (événement, inauguration, assemblée générale) comme des missions longue durée de plusieurs semaines ou mois (gardiennage de chantier, remplacement d\'effectifs). Le dispositif est adapté à chaque besoin.'
    },
    {
      question: 'Quels types d\'agents pouvez-vous déployer en grand déplacement ?',
      answer: 'L\'ensemble de nos compétences est disponible en grand déplacement : agents de prévention et de sécurité (APS), maîtres-chiens d\'intervention, équipes CYNODEX de détection d\'explosifs, agents SSIAP de sécurité incendie et agents de protection rapprochée. Nous composons l\'équipe en fonction de vos besoins spécifiques.'
    }
  ],

  conclusion: `MTJ Sécurité Privée ne se limite pas au sud de la France. Notre capacité de déploiement en grand déplacement vous permet de bénéficier de notre expertise et de notre savoir-faire sur l'ensemble du territoire national. Un seul interlocuteur, une qualité de service constante, où que vous soyez en France.\n\nContactez-nous pour étudier votre projet et recevoir un devis personnalisé incluant tous les frais de déplacement.`,

  relatedLinks: [
    { href: '/securite-privee-sud-france', label: 'Sécurité privée dans le sud de la France' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-toulouse', label: 'Sécurité privée à Toulouse' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée Nice & Monaco' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/surveillance-chantier-site', label: 'Surveillance de chantiers' },
  ]
};

export default function GrandDeplacementPage() {
  return <SeoPageLayout data={data} />;
}
