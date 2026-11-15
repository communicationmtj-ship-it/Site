import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { ZONE_DESSERVIE } from '../../data/perimetre';

// 15/11/2026 (règle de Théo, 05:56 : « soit tu met pas soit tu laisse ce qui etait ») : texte du site en
// ligne (04/11/2026), sauf les décisions de Théo : secteur « de Bordeaux à Nice jusqu'à Annecy » à la place
// de « sud de la France » (13/11/2026, « Site perimetre: A partout ») ; aucun chiffre non prouvé
// (13/11/2026, « Site chiffres: B aucun ») ; aucune implantation hors du siège de Toulon ; CYNODEX =
// diplôme du maître-chien de détection d'explosifs (15/11/2026), jamais une « unité » ni une « équipe ».
const data = {
  slug: '/securite-erp-etablissements-public',
  metaTitle: 'Sécurité ERP — Établissements Recevant du Public | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée assure la sécurité des établissements recevant du public (ERP) : hôpitaux, écoles, musées, centres sportifs. Agents SSIAP, contrôle d\'accès de Bordeaux à Nice jusqu\'à Annecy.',
  breadcrumbCurrent: 'Établissements recevant du public',
  areaServed: ZONE_DESSERVIE,

  h1: 'Sécurité des Établissements Recevant du Public (ERP)',
  introduction: `MTJ Sécurité Privée est spécialisée dans la sécurité des établissements recevant du public (ERP) de Bordeaux à Nice jusqu'à Annecy. Hôpitaux, cliniques, établissements scolaires, musées, centres sportifs, administrations : chaque type d'ERP présente des enjeux de sécurité spécifiques que nos agents maîtrisent parfaitement.\n\nNous déployons des dispositifs conformes à la réglementation en vigueur (Code de la construction, règlement de sécurité contre les risques d'incendie) et adaptés à la catégorie et au type de votre établissement.`,

  sections: [
    {
      h2: 'Sécurité des ERP : une expertise réglementaire',
      intro: 'Les ERP sont soumis à des obligations strictes en matière de sécurité incendie, d\'accessibilité et de prévention des risques.',
      subsections: [
        {
          h3: 'Classification et obligations des ERP',
          content: 'Les établissements recevant du public sont classés en catégories (1 à 5) selon leur capacité d\'accueil et en types selon leur activité (J, L, M, N, O, P, R, S, T, U, W, X, Y). Chaque catégorie impose des obligations de sécurité spécifiques. MTJ Sécurité Privée connaît parfaitement cette réglementation et adapte ses prestations en conséquence.',
          list: ['Catégorie 1 : plus de 1500 personnes', 'Catégorie 2 : 701 à 1500 personnes', 'Catégorie 3 : 301 à 700 personnes', 'Catégorie 4 : jusqu\'à 300 personnes', 'Catégorie 5 : en dessous du seuil réglementaire']
        },
        {
          h3: 'Agents SSIAP pour la sécurité incendie',
          content: 'Les ERP de catégories 1 et 2 doivent obligatoirement disposer d\'un service de sécurité incendie composé d\'agents SSIAP. MTJ Sécurité Privée met à disposition des agents SSIAP 1, 2 et 3 certifiés, formés à la prévention incendie, à l\'utilisation des moyens de secours et à la gestion des évacuations.'
        }
      ]
    },
    {
      h2: 'Types d\'ERP sécurisés',
      intro: 'Notre expertise couvre l\'ensemble des catégories d\'établissements recevant du public.',
      subsections: [
        {
          h3: 'Établissements de santé (hôpitaux, cliniques)',
          content: 'La sécurité des établissements de santé nécessite une approche spécifique : gestion des accès aux services sensibles (urgences, réanimation, maternité), protection du personnel soignant, prévention des vols et des agressions. Nos agents sont formés à intervenir dans un environnement médical avec tact et professionnalisme.',
          list: ['Contrôle d\'accès aux services sensibles', 'Protection du personnel soignant', 'Gestion des situations de crise', 'Surveillance des parkings et abords']
        },
        {
          h3: 'Établissements scolaires et universitaires',
          content: 'La sécurité des écoles, collèges, lycées et universités est un enjeu majeur. MTJ Sécurité Privée assure le contrôle des accès, la surveillance des entrées et sorties, la prévention des intrusions et la gestion des plans Vigipirate. Nos agents sont sensibilisés aux spécificités du milieu scolaire.'
        },
        {
          h3: 'Musées, centres culturels et lieux de culte',
          content: 'La protection des lieux culturels et de culte requiert une surveillance attentive des visiteurs, la prévention des dégradations et du vol d\'oeuvres, et la gestion des flux. Nous assurons une présence discrète qui préserve l\'atmosphère du lieu tout en garantissant la sécurité de tous.'
        },
        {
          h3: 'Centres sportifs et complexes aquatiques',
          content: 'Les centres sportifs, gymnases, piscines et stades accueillent un public varié avec des flux importants. Nos agents gèrent les accès, surveillent les vestiaires et zones communes, et interviennent en cas de comportement inapproprié ou de situation d\'urgence.'
        }
      ]
    },
    {
      h2: 'Nos prestations pour les ERP',
      subsections: [
        {
          h3: 'Contrôle d\'accès et filtrage',
          content: 'Le contrôle d\'accès est la première ligne de sécurité d\'un ERP. Nos agents vérifient les identités, gèrent les badges et accréditations, filtrent les visiteurs et orientent le public. En période de vigilance renforcée (Vigipirate), nous adaptons le niveau de contrôle aux directives en vigueur.',
          list: ['Filtrage et inspection visuelle', 'Gestion des badges et accréditations', 'Application des mesures Vigipirate', 'Accueil et orientation du public']
        },
        {
          h3: 'Prévention incendie et évacuation',
          content: 'Nos agents SSIAP assurent la prévention incendie au sein de votre ERP : vérification des issues de secours, contrôle des moyens d\'extinction, gestion du poste central de sécurité et organisation des exercices d\'évacuation. En cas de sinistre, ils coordonnent l\'évacuation et l\'intervention des secours.'
        },
        {
          h3: 'Gestion des incivilités et situations de crise',
          content: 'Nos agents sont formés à la gestion des conflits et des incivilités. Ils interviennent avec professionnalisme pour désamorcer les situations tendues, protéger le personnel et le public, et faire respecter le règlement intérieur de votre établissement.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Mon ERP a-t-il l\'obligation d\'avoir un service de sécurité ?',
      answer: 'Les ERP de catégories 1 et 2, ainsi que certains ERP de catégorie 3 selon leur type, ont l\'obligation réglementaire de disposer d\'un service de sécurité incendie avec des agents SSIAP. Pour les autres catégories, la sécurité privée est fortement recommandée, notamment dans le contexte Vigipirate.'
    },
    {
      question: 'Quelle est la différence entre un agent de sécurité et un agent SSIAP ?',
      answer: 'Un agent de sécurité (APS) est chargé de la sûreté : contrôle d\'accès, surveillance, prévention des malveillances. Un agent SSIAP est spécifiquement formé à la sécurité incendie : prévention, utilisation des moyens de secours, évacuation. Dans un ERP, les deux compétences sont souvent complémentaires.'
    },
    {
      question: 'Intervenez-vous pour la mise en conformité sécurité de mon ERP ?',
      answer: 'MTJ Sécurité Privée peut réaliser un audit de sécurité de votre ERP et vous recommander les mesures nécessaires pour vous mettre en conformité. Nous fournissons ensuite les agents qualifiés (APS, SSIAP) pour assurer le service de sécurité requis.'
    }
  ],

  conclusion: `La sécurité des établissements recevant du public est une obligation légale et une responsabilité morale. MTJ Sécurité Privée vous accompagne avec des agents qualifiés, une connaissance approfondie de la réglementation ERP et des solutions adaptées à votre établissement.\n\nContactez-nous pour un audit de sécurité gratuit et un devis sur mesure pour votre ERP.`,

  relatedLinks: [
    { href: '/ssiap-securite-incendie', label: 'SSIAP — Sécurité incendie' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/securite-sites-industriels-commerciaux', label: 'Sites industriels et commerciaux' },
    { href: '/securite-residentielle', label: 'Sécurité résidentielle' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
  ]
};

export default function ErpPage() {
  return <SeoPageLayout data={data} />;
}
