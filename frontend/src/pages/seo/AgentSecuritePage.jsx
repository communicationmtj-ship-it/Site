import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { ZONE_DESSERVIE } from '../../data/perimetre';

const data = {
  slug: '/agent-securite-prevention',
  themeColor: '#AC8631',
  metaTitle: 'Agent de Prévention et Sécurité Privée | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée déploie des agents de prévention et de sécurité qualifiés à Toulon, Toulouse et Nice. Surveillance, contrôle d\'accès, rondes et protection 24h/24. Devis gratuit.',
  breadcrumbCurrent: 'Agent de prévention et sécurité',
  // 13/11/2026 (choix de Théo, « Site perimetre: A partout ») : zone desservie = le secteur (data/perimetre.js).
  areaServed: ZONE_DESSERVIE,

  h1: 'Agent de Prévention et de Sécurité Privée',
  // 13/11/2026 (audit du site de Mathilde, site-066 et 086) : siège à Toulon, Marseille cité
  // sans « principalement », aucun titre de formation affirmé pour tous les agents.
  introduction: `MTJ Sécurité Privée met à votre disposition des agents de prévention et de sécurité (APS) formés, certifiés et expérimentés. Nos professionnels assurent la protection de vos biens, de vos locaux et de vos collaborateurs de Bordeaux à Nice et jusqu'à Annecy, depuis notre siège de Toulon.\n\nTitulaires de la carte professionnelle délivrée par le CNAPS (Conseil National des Activités Privées de Sécurité), nos agents exercent dans le respect des exigences réglementaires du secteur.`,

  sections: [
    {
      h2: 'Nos prestations de surveillance et de sécurité',
      intro: 'Chaque mission est adaptée aux spécificités de votre site et de votre activité. Nos agents interviennent sur l\'ensemble du périmètre de la sécurité privée.',
      subsections: [
        {
          h3: 'Surveillance et gardiennage de sites',
          content: 'Nos agents assurent une présence dissuasive et opérationnelle sur vos sites 24 heures sur 24 et 7 jours sur 7. Que ce soit pour la surveillance de locaux commerciaux, de sites industriels, de résidences ou d\'entrepôts, nous mettons en place des dispositifs adaptés à la configuration de chaque lieu. La surveillance inclut les rondes régulières, la vérification des accès et la gestion des systèmes d\'alarme.',
          list: ['Surveillance 24h/24 et 7j/7', 'Rondes planifiées et aléatoires', 'Gestion des systèmes d\'alarme et de vidéosurveillance', 'Comptes rendus selon les modalités du devis']
        },
        {
          h3: 'Contrôle d\'accès et filtrage',
          content: 'Le contrôle d\'accès est un pilier fondamental de la sécurité. Nos agents gèrent l\'accueil, la vérification des identités, le contrôle des badges et la régulation des flux de personnes à l\'entrée de vos établissements. Cette prestation est particulièrement adaptée aux entreprises, aux ERP (Établissements Recevant du Public) et aux événements privés ou publics.',
          list: ['Vérification des habilitations et badges', 'Gestion des registres d\'entrée et sortie', 'Filtrage et palpations de sécurité', 'Accueil sécurisé des visiteurs']
        }
      ]
    },
    {
      h2: 'Formation et qualifications de nos agents',
      intro: 'La qualité de nos prestations repose sur le recrutement rigoureux et la formation continue de nos agents.',
      subsections: [
        {
          h3: 'Carte professionnelle et formation',
          content: 'Tous nos agents possèdent leur carte professionnelle délivrée par le CNAPS, qui suppose une formation qualifiante (par exemple le Titre à Finalité Professionnelle Agent de Prévention et de Sécurité, TFP APS). Elle atteste le respect des conditions fixées par le code de la sécurité intérieure (moralité, aptitude professionnelle). La formation couvre notamment les gestes de premiers secours, les techniques de médiation et la réglementation applicable.'
        },
        {
          h3: 'Formation continue et spécialisations',
          content: 'Au-delà de la formation initiale, MTJ Sécurité Privée investit dans la montée en compétences de ses équipes. Nos agents suivent des formations régulières en gestion de conflits, en techniques d\'intervention, en secourisme (SST) et en sûreté. Certains agents disposent de qualifications complémentaires comme le SSIAP ou la formation maître-chien.'
        },
        {
          h3: 'Encadrement et suivi opérationnel',
          content: 'Chaque équipe déployée est encadrée par un responsable de secteur qui assure le suivi des prestations, la coordination avec le client et la gestion des imprévus. Des audits internes sont réalisés régulièrement pour maintenir un niveau d\'excellence constant sur l\'ensemble de nos missions.'
        }
      ]
    },
    {
      h2: 'Secteurs d\'activité couverts',
      intro: 'Nos agents de prévention et de sécurité interviennent dans une grande variété de secteurs.',
      subsections: [
        {
          h3: 'Sécurité des entreprises et sites industriels',
          content: 'Nous protégeons les zones industrielles, les entrepôts logistiques, les sièges sociaux et les centres commerciaux. La sécurisation de ces sites sensibles nécessite une connaissance approfondie des risques spécifiques : vol, intrusion, vandalisme, risques incendie. Nos agents sont formés pour réagir à chaque situation avec professionnalisme.',
          list: ['Sites industriels et zones logistiques', 'Centres commerciaux et boutiques', 'Sièges sociaux et bureaux', 'Parkings et espaces de stationnement']
        },
        {
          h3: 'Événements et manifestations',
          content: 'MTJ Sécurité Privée assure la sécurité de vos événements : concerts, festivals, salons professionnels, compétitions sportives, réceptions privées. Nos agents gèrent le contrôle des accès, la surveillance des zones VIP, la gestion des foules et l\'évacuation d\'urgence.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quelle est la différence entre un agent de sécurité et un vigile ?',
      answer: 'Le terme "vigile" est couramment utilisé dans le langage courant, mais la dénomination officielle est "agent de prévention et de sécurité" (APS). Ce professionnel est obligatoirement titulaire d\'une carte professionnelle délivrée par le CNAPS et a suivi une formation certifiante (par exemple le TFP APS). Il exerce dans le cadre strict du Code de la Sécurité Intérieure.'
    },
    {
      question: 'Combien coûte un agent de sécurité privée ?',
      answer: 'Le tarif d\'un agent de sécurité dépend de plusieurs facteurs : durée de la mission, horaires (jour, nuit, week-end, jours fériés), nombre d\'agents requis et spécificités du site. MTJ Sécurité Privée établit un devis gratuit et personnalisé pour chaque demande. Contactez-nous au 07 60 73 82 06 pour obtenir une estimation.'
    },
    {
      question: 'Dans quelles villes MTJ Sécurité Privée intervient-elle ?',
      answer: 'Notre siège est basé à Toulon (83). Nous intervenons de Bordeaux à Nice en remontant jusqu\'à Annecy, notamment à Bordeaux, Toulouse, Montpellier, Marseille, Toulon, Nice, Monaco, Lyon et Annecy, ainsi que dans leurs agglomérations. Nous proposons également des missions en grand déplacement sur demande, couvrant l\'ensemble du territoire national.'
    }
  ],

  conclusion: `MTJ Sécurité Privée s'engage à fournir des prestations de surveillance et de sécurité de la plus haute qualité. Nos agents de prévention et de sécurité sont votre premier rempart contre les risques auxquels sont exposés vos sites et vos événements.\n\nFaites confiance à notre expertise et à notre réactivité pour garantir la sécurité de vos biens et de vos personnes. Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé.`,

  relatedLinks: [
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/detection-explosifs-cynodex', label: 'Détection d\'explosifs CYNODEX' },
    { href: '/ssiap-securite-incendie', label: 'SSIAP — Sécurité incendie' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-toulouse', label: 'Sécurité privée à Toulouse' },
  ]
};

export default function AgentSecuritePage() {
  return <SeoPageLayout data={data} />;
}
