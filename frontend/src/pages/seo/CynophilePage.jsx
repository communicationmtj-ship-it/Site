import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { ZONE_DESSERVIE } from '../../data/perimetre';

const data = {
  slug: '/securite-cynophile-maitre-chien',
  themeColor: '#AC8631',
  metaTitle: 'Sécurité Cynophile & Maître-Chien | MTJ Sécurité Privée Toulon',
  metaDescription: 'MTJ Sécurité Privée propose des équipes cynophiles (maître-chien) d\'intervention de Bordeaux à Nice et jusqu\'à Annecy. Patrouilles, surveillance renforcée et sécurisation de sites. Devis gratuit.',
  breadcrumbCurrent: 'Sécurité cynophile',
  // 13/11/2026 (choix de Théo, « Site perimetre: A partout ») : zone desservie = le secteur (data/perimetre.js).
  areaServed: ZONE_DESSERVIE,

  h1: 'Sécurité Cynophile et Maître-Chien d\'Intervention',
  // 13/11/2026 (audit du site, suite de site-070 à 072) : aucun superlatif absolu, aucune
  // distance chiffrée, aucun titre de formation affirmé pour tous les agents.
  introduction: `MTJ Sécurité Privée dispose d'une unité cynophile spécialisée dans la surveillance renforcée et l'intervention rapide. Nos binômes maître-chien sont formés à la détection, à la dissuasion et à l'intervention.\n\nLa présence d'un chien de sécurité renforce nettement l'effet dissuasif d'un agent seul. C'est une solution de sécurité éprouvée, particulièrement adaptée aux sites étendus, aux rondes de nuit et aux environnements à haut risque.`,

  sections: [
    {
      h2: 'Nos prestations de sécurité cynophile',
      intro: 'L\'unité cynophile de MTJ Sécurité Privée intervient dans des configurations variées, de la surveillance de routine à l\'intervention d\'urgence.',
      subsections: [
        {
          h3: 'Cyno d\'intervention : surveillance et patrouilles',
          content: 'Nos binômes cyno d\'intervention assurent des rondes et des patrouilles sur vos sites sensibles. Le chien d\'intervention, grâce à ses capacités olfactives et auditives supérieures, détecte toute présence suspecte bien avant un agent humain seul. Ce dispositif est particulièrement efficace pour la surveillance nocturne de zones étendues : parkings, entrepôts, chantiers et zones industrielles.',
          list: ['Patrouilles cynophiles diurnes et nocturnes', 'Surveillance de sites étendus', 'Intervention rapide sur alerte', 'Effet dissuasif renforcé']
        },
        {
          h3: 'Sécurité cynophile événementielle',
          content: 'Lors de vos événements (concerts, festivals, manifestations sportives), nos équipes cynophiles assurent un contrôle périmétrique efficace. Les chiens d\'intervention permettent de sécuriser les zones de rassemblement, de filtrer les accès et de réagir instantanément en cas d\'incident. Leur présence est un gage de sérénité pour les organisateurs et les participants.'
        }
      ]
    },
    {
      h2: 'Formation et certification de nos équipes cynophiles',
      intro: 'La qualité de notre unité cynophile repose sur une formation rigoureuse des maîtres-chiens et de leurs partenaires canins.',
      subsections: [
        {
          h3: 'Carte professionnelle et formation cynophile',
          content: 'Nos maîtres-chiens sont titulaires de la carte professionnelle délivrée par le CNAPS et formés au maniement du chien en mission de sécurité, aux techniques de contention et aux premiers secours. Chaque binôme homme-chien est évalué régulièrement.'
        },
        {
          h3: 'Sélection et entraînement des chiens',
          content: 'Nos chiens d\'intervention sont sélectionnés pour leurs aptitudes physiques, leur tempérament équilibré et leur capacité d\'obéissance. Ils sont entraînés quotidiennement dans des conditions réalistes pour maintenir leur réactivité et leur fiabilité en situation opérationnelle. Bergers allemands, bergers belges malinois et autres races de travail composent notre effectif canin.'
        },
        {
          h3: 'Suivi vétérinaire et bien-être animal',
          content: 'MTJ Sécurité Privée accorde une importance capitale au bien-être de ses chiens. Un suivi vétérinaire régulier est assuré, avec des bilans de santé complets, un programme de vaccination à jour et une alimentation adaptée à l\'effort physique intense de chaque animal. Le respect de l\'animal fait partie intégrante de notre éthique professionnelle.'
        }
      ]
    },
    {
      h2: 'Avantages de la sécurité cynophile',
      subsections: [
        {
          h3: 'Dissuasion maximale et détection précoce',
          content: 'La présence d\'un chien d\'intervention constitue un moyen de dissuasion particulièrement fort. Un intrus qui repère un binôme cynophile est beaucoup plus enclin à renoncer. De plus, l\'odorat du chien peut détecter une présence humaine à distance, même dans l\'obscurité, ce qui renforce nettement la détection.'
        },
        {
          h3: 'Rapport coût-efficacité optimal',
          content: 'Un binôme maître-chien peut couvrir une zone de surveillance plus étendue qu\'un agent seul. Cette productivité accrue se traduit par un meilleur rapport coût-efficacité pour nos clients, tout en offrant un niveau de sécurité supérieur. C\'est une solution particulièrement adaptée aux sites étendus ou aux missions nocturnes.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quelles races de chiens sont utilisées pour la sécurité cynophile ?',
      answer: 'MTJ Sécurité Privée utilise principalement des bergers belges malinois et des bergers allemands, reconnus pour leurs qualités d\'obéissance, leur flair exceptionnel et leur endurance physique. Ces races sont les standards internationaux en matière de sécurité cynophile et de détection.'
    },
    {
      question: 'La sécurité cynophile est-elle adaptée aux événements publics ?',
      answer: 'Absolument. Nos chiens sont sociabilisés et entraînés pour travailler dans des environnements bruyants et très fréquentés. Ils assurent des missions de sécurité événementielle lors de concerts, festivals, salons et compétitions sportives sur tout notre secteur, de Bordeaux à Nice et jusqu\'à Annecy.'
    },
    {
      question: 'Quelle zone géographique couvrez-vous pour les prestations cynophiles ?',
      answer: 'Notre unité cynophile intervient sur tout notre secteur, de Bordeaux à Nice en remontant jusqu\'à Annecy : Nouvelle-Aquitaine, Occitanie, Provence-Alpes-Côte d\'Azur (Marseille, Toulon, Nice, Cannes), Auvergne-Rhône-Alpes et Monaco. Nous proposons également des missions en grand déplacement sur demande partout en France.'
    }
  ],

  conclusion: `La sécurité cynophile est une solution de protection à haute valeur ajoutée. Les binômes maître-chien de MTJ Sécurité Privée apportent un niveau élevé de dissuasion, de détection et de réactivité.\n\nQue ce soit pour la surveillance de vos sites, la sécurisation de vos événements ou des interventions ponctuelles, notre unité cynophile est à votre service. Demandez votre devis gratuit dès maintenant.`,

  relatedLinks: [
    { href: '/detection-explosifs-cynodex', label: 'Détection d\'explosifs CYNODEX' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée Nice & Monaco' },
    { href: '/surveillance-chantier-site', label: 'Surveillance de chantiers' },
  ]
};

export default function CynophilePage() {
  return <SeoPageLayout data={data} />;
}
