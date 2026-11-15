import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { ZONE_DESSERVIE } from '../../data/perimetre';

// 15/11/2026 (règle de Théo, 05:56 : « soit tu met pas soit tu laisse ce qui etait ») : texte du site en
// ligne (04/11/2026), sauf les décisions de Théo : secteur « de Bordeaux à Nice jusqu'à Annecy » à la place
// de « sud de la France » (13/11/2026, « Site perimetre: A partout ») ; aucun chiffre non prouvé
// (13/11/2026, « Site chiffres: B aucun ») ; aucune implantation hors du siège de Toulon ; CYNODEX =
// diplôme du maître-chien de détection d'explosifs (15/11/2026), jamais une « unité » ni une « équipe ».
const data = {
  slug: '/securite-evenementielle',
  metaTitle: 'Sécurité Événementielle | Concerts, Festivals, Matchs | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée assure la sécurité de vos événements : concerts, festivals, salons, matchs. Agents de sécurité, équipes cynophiles et SSIAP, de Bordeaux à Nice jusqu\'à Annecy.',
  breadcrumbCurrent: 'Sécurité événementielle',
  areaServed: ZONE_DESSERVIE,

  h1: 'Sécurité Événementielle — Protection de vos Événements',
  introduction: `MTJ Sécurité Privée est votre partenaire de confiance pour la sécurisation de tous types d'événements de Bordeaux à Nice jusqu'à Annecy et sur l'ensemble du territoire national. Concerts, festivals, compétitions sportives, salons professionnels, réceptions privées : nous déployons des dispositifs de sécurité sur mesure adaptés à la taille, la nature et les risques spécifiques de chaque manifestation.\n\nNotre expertise couvre l'ensemble de la chaîne de sécurité événementielle : étude préalable des risques, planification du dispositif, déploiement opérationnel et retour d'expérience.`,

  sections: [
    {
      h2: 'Nos prestations de sécurité événementielle',
      intro: 'De la planification à l\'exécution, nous couvrons chaque aspect de la sécurité de votre événement.',
      subsections: [
        {
          h3: 'Contrôle d\'accès et filtrage du public',
          content: 'Le contrôle d\'accès est la pierre angulaire de la sécurité événementielle. Nos agents assurent la vérification des billets et accréditations, le filtrage par palpations de sécurité, l\'inspection des sacs et la gestion des files d\'attente. Nous dimensionnons le nombre de postes de contrôle en fonction de la jauge de votre événement pour garantir la fluidité des entrées.',
          list: ['Palpations de sécurité réglementaires', 'Inspection visuelle des sacs et effets personnels', 'Gestion des accréditations et zones VIP', 'Régulation des flux d\'entrée et de sortie']
        },
        {
          h3: 'Surveillance périmétrique et gestion de foule',
          content: 'Nos agents sont positionnés stratégiquement sur l\'ensemble du périmètre de votre événement. Ils assurent la surveillance des accès secondaires, préviennent les intrusions et gèrent les mouvements de foule. En cas de situation d\'urgence, ils coordonnent l\'évacuation selon les procédures établies en amont avec les organisateurs et les autorités.'
        }
      ]
    },
    {
      h2: 'Types d\'événements sécurisés',
      intro: 'MTJ Sécurité Privée intervient sur tous les formats de manifestations, du plus intime au plus massif.',
      subsections: [
        {
          h3: 'Concerts, festivals et événements musicaux',
          content: 'La sécurité des événements musicaux requiert une expertise spécifique : gestion de foules enthousiastes, prévention des mouvements de foule dangereux, surveillance des zones backstage et protection des artistes. MTJ Sécurité Privée a sécurisé de nombreux concerts et festivals de Bordeaux à Nice jusqu\'à Annecy.'
        },
        {
          h3: 'Événements sportifs et compétitions',
          content: 'Matchs de football, rencontres de rugby, compétitions d\'athlétisme, régates : nos agents sécurisent les enceintes sportives, gèrent la séparation des supporters, assurent le contrôle d\'accès aux tribunes et zones VIP. Notre connaissance du terrain sportif nous permet d\'anticiper les comportements à risque.'
        },
        {
          h3: 'Salons professionnels et événements d\'entreprise',
          content: 'Pour vos salons, congrès, séminaires et soirées d\'entreprise, nous proposons une sécurité discrète mais efficace : contrôle d\'accès badge, surveillance des espaces d\'exposition, protection des équipements de valeur et gestion du parking. Notre approche s\'adapte à l\'image professionnelle de votre événement.'
        }
      ]
    },
    {
      h2: 'Notre méthodologie événementielle',
      subsections: [
        {
          h3: 'Étude préalable et plan de sécurité',
          content: 'Avant chaque événement, notre équipe réalise une visite de site, une analyse des risques (Vigipirate, risques d\'affluence, configuration des lieux) et élabore un plan de sécurité détaillé. Ce document est partagé avec les organisateurs et les autorités compétentes. Il définit le nombre d\'agents, leur positionnement, les procédures d\'urgence et les moyens de communication.',
          list: ['Visite de site et analyse des risques', 'Élaboration du plan de sécurité', 'Coordination avec les autorités (préfecture, pompiers, SAMU)', 'Dimensionnement du dispositif']
        },
        {
          h3: 'Moyens combinés : APS, cynophile, SSIAP',
          content: 'Pour les événements d\'envergure, MTJ Sécurité Privée déploie un dispositif combinant agents de sécurité (APS), équipes cynophiles d\'intervention, maîtres-chiens CYNODEX de détection d\'explosifs et agents SSIAP pour la sécurité incendie. Cette approche intégrée offre une couverture complète de tous les risques identifiés.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Combien d\'agents faut-il pour sécuriser un événement ?',
      answer: 'Le nombre d\'agents dépend de la jauge de l\'événement, de la configuration du site, du niveau de risque et des exigences réglementaires. MTJ Sécurité Privée dimensionne précisément le dispositif après l\'étude préalable.'
    },
    {
      question: 'Faut-il déclarer la sécurité privée de mon événement en préfecture ?',
      answer: 'Oui, les organisateurs d\'événements accueillant du public doivent déclarer leur dispositif de sécurité privée auprès du CNAPS et des autorités compétentes. MTJ Sécurité Privée peut vous accompagner dans ces démarches administratives pour garantir la conformité de votre événement.'
    },
    {
      question: 'Intervenez-vous pour des événements privés (mariages, réceptions) ?',
      answer: 'Absolument. MTJ Sécurité Privée assure la sécurité d\'événements privés : mariages, réceptions, anniversaires, soirées de gala. Nous proposons un service discret et professionnel pour que vos invités profitent de la soirée en toute sérénité.'
    }
  ],

  conclusion: `La sécurité de votre événement ne doit pas être laissée au hasard. MTJ Sécurité Privée vous offre une expertise complète en sécurité événementielle, de l'étude préalable à l'exécution opérationnelle, avec des agents qualifiés et des équipes spécialisées.\n\nConfiez la sécurité de votre prochain événement à des professionnels. Contactez-nous pour un devis gratuit et sur mesure.`,

  relatedLinks: [
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/detection-explosifs-cynodex', label: 'Détection d\'explosifs CYNODEX' },
    { href: '/ssiap-securite-incendie', label: 'SSIAP — Sécurité incendie' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/surveillance-chantier-site', label: 'Surveillance de chantiers' },
  ]
};

export default function EvenementielPage() {
  return <SeoPageLayout data={data} />;
}
