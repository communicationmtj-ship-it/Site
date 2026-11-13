import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/grand-deplacement-securite-france',
  metaTitle: 'Grand Déplacement Sécurité — Intervention sur tout le Territoire National | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée intervient en grand déplacement sur l\'ensemble du territoire français. Paris, Lyon, Bordeaux, Nantes, Strasbourg : déploiement d\'agents de sécurité, cynophile, SSIAP et CYNODEX partout en France.',
  breadcrumbCurrent: 'Grand déplacement national',
  areaServed: 'France métropolitaine',

  h1: 'Grand Déplacement — Sécurité sur l\'Ensemble du Territoire National',
  // 13/11/2026 (audit du site de Mathilde, site-061, 064, 083 à 086) : pas de « pôles », pas
  // d'outre-mer ni d'international, aucun délai promis sans devis, suivi décrit sans outil non ouvert.
  introduction: `Au-delà de notre zone d'intervention principale dans le sud de la France, MTJ Sécurité Privée peut déployer ses équipes en grand déplacement sur l'ensemble du territoire métropolitain.\n\nParis, Lyon, Bordeaux, Nantes, Strasbourg, Lille : où que se trouvent vos besoins en sécurité, nous mobilisons nos agents qualifiés pour des missions ponctuelles ou récurrentes, et vous accompagnons sur tous vos sites en France.`,

  sections: [
    {
      h2: 'Notre capacité de déploiement national',
      intro: 'MTJ Sécurité Privée organise le déplacement de ses équipes partout en France métropolitaine.',
      subsections: [
        {
          h3: 'Mobilisation des équipes',
          content: 'Depuis notre siège de Toulon et grâce à notre réseau d\'agents, nous organisons le déplacement de nos équipes sur l\'ensemble du territoire. Le délai de mise en place est annoncé dans chaque devis ; en cas d\'urgence, appelez-nous pour connaître le délai possible. Nos équipes voyagent avec leur équipement.',
          list: ['Délai de mise en place annoncé au devis', 'Équipes autonomes et équipées', 'Coordination logistique centralisée', 'Frais de déplacement et d\'hébergement précisés dans chaque devis']
        },
        {
          h3: 'Villes et régions d\'intervention',
          content: 'Nous pouvons intervenir hors de notre zone principale pour des missions de sécurité événementielle, de gardiennage temporaire, de sécurité cynophile ou de détection d\'explosifs : Paris et Île-de-France, Lyon et région Auvergne-Rhône-Alpes, Bordeaux et Nouvelle-Aquitaine, Nantes et Pays de la Loire, Strasbourg et Grand Est.',
          list: ['Paris et Île-de-France', 'Lyon, Grenoble, Saint-Étienne', 'Bordeaux, La Rochelle, Bayonne', 'Nantes, Rennes, Brest', 'Strasbourg, Metz, Nancy', 'Lille, Rouen, Reims']
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
          h3: 'Renfort d\'effectifs pour d\'autres entreprises de sécurité',
          content: 'MTJ Sécurité Privée peut également intervenir en renfort d\'effectifs pour d\'autres entreprises de sécurité lors de pics d\'activité, dans le cadre légal de la sous-traitance prévu par le code de la sécurité intérieure. Nos agents sont titulaires de leur carte professionnelle et équipés pour la mission.'
        },
        {
          h3: 'Sécurité cynophile et CYNODEX en déplacement',
          content: 'Nos binômes maître-chien d\'intervention et nos binômes CYNODEX de détection d\'explosifs peuvent être déployés en grand déplacement pour des missions spécifiques : sécurisation d\'événements sensibles, levées de doute, inspections de sites avant des manifestations publiques. Ces compétences rares sont un atout pour les organisateurs d\'événements.'
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
          h3: 'Suivi et compte rendu',
          content: 'Pendant la mission, un responsable suit la prestation et reste votre interlocuteur. Un compte rendu vous est transmis selon les modalités prévues au devis.'
        },
        {
          h3: 'Tarification transparente',
          content: 'Les frais de déplacement, d\'hébergement et de restauration des agents sont précisés dans chaque devis, poste par poste. Nous optimisons la logistique pour proposer des tarifs adaptés, même loin de notre siège.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quel est le délai pour organiser une mission en grand déplacement ?',
      answer: 'Le délai dépend du lieu, du nombre d\'agents et des qualifications demandées : il est annoncé dans le devis. En cas d\'urgence, appelez-nous au 07 60 73 82 06 pour connaître le délai possible. Pour les événements planifiés, nous recommandons de nous contacter au moins 2 semaines à l\'avance.'
    },
    {
      question: 'Les frais de déplacement sont-ils inclus dans le devis ?',
      answer: 'Les frais de déplacement (transport des agents, hébergement, restauration) et l\'équipement sont précisés dans chaque devis, en plus de la prestation de sécurité elle-même, poste par poste. Le devis vous est remis avant le début de la mission.'
    },
    {
      question: 'Pouvez-vous intervenir pour un seul jour ?',
      answer: 'Absolument. Nous réalisons des missions ponctuelles d\'une journée (événement, inauguration, assemblée générale) comme des missions longue durée de plusieurs semaines ou mois (gardiennage de chantier, remplacement d\'effectifs). Le dispositif est adapté à chaque besoin.'
    },
    {
      question: 'Quels types d\'agents pouvez-vous déployer en grand déplacement ?',
      answer: 'L\'ensemble de nos compétences est disponible en grand déplacement : agents de prévention et de sécurité (APS), maîtres-chiens d\'intervention, binômes CYNODEX de détection d\'explosifs et agents SSIAP de sécurité incendie ; la protection rapprochée est assurée par MTJ Sécurité Rapprochée, société du groupe. Nous composons l\'équipe en fonction de vos besoins.'
    }
  ],

  conclusion: `MTJ Sécurité Privée ne se limite pas au sud de la France. Notre capacité de déploiement en grand déplacement vous permet de bénéficier de notre expertise et de notre savoir-faire sur l'ensemble du territoire national, avec un seul interlocuteur.\n\nContactez-nous pour étudier votre projet et recevoir un devis personnalisé qui détaille les frais de déplacement.`,

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
