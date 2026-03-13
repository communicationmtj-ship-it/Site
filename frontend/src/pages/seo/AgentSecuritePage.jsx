import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/agent-securite-prevention',
  metaTitle: 'Agent de Prévention et Sécurité Privée | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée déploie des agents de prévention et de sécurité qualifiés à Toulon, Toulouse et Nice. Surveillance, contrôle d\'accès, rondes et protection 24h/24. Devis gratuit.',
  breadcrumbCurrent: 'Agent de prévention et sécurité',
  areaServed: 'Toulon, Toulouse, Nice, Sud de la France',

  h1: 'Agent de Prévention et de Sécurité Privée',
  introduction: `MTJ Sécurité Privée met à votre disposition des agents de prévention et de sécurité (APS) formés, certifiés et expérimentés. Nos professionnels assurent la protection de vos biens, de vos locaux et de vos collaborateurs dans le sud de la France, avec une présence opérationnelle à Toulon, Toulouse et Nice.\n\nTitulaires de la carte professionnelle délivrée par le CNAPS (Conseil National des Activités Privées de Sécurité), nos agents garantissent des prestations conformes aux exigences réglementaires les plus strictes du secteur.`,

  sections: [
    {
      h2: 'Nos prestations de surveillance et de sécurité',
      intro: 'Chaque mission est adaptée aux spécificités de votre site et de votre activité. Nos agents interviennent sur l\'ensemble du périmètre de la sécurité privée.',
      subsections: [
        {
          h3: 'Surveillance et gardiennage de sites',
          content: 'Nos agents assurent une présence dissuasive et opérationnelle sur vos sites 24 heures sur 24 et 7 jours sur 7. Que ce soit pour la surveillance de locaux commerciaux, de sites industriels, de résidences ou d\'entrepôts, nous mettons en place des dispositifs adaptés à la configuration de chaque lieu. La surveillance inclut les rondes régulières, la vérification des accès et la gestion des systèmes d\'alarme.',
          list: ['Surveillance 24h/24 et 7j/7', 'Rondes planifiées et aléatoires', 'Gestion des systèmes d\'alarme et de vidéosurveillance', 'Rapports d\'activité quotidiens']
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
          h3: 'Certification CQP APS et carte professionnelle',
          content: 'Tous nos agents sont titulaires du Certificat de Qualification Professionnelle Agent de Prévention et de Sécurité (CQP APS). Ils possèdent leur carte professionnelle délivrée par le CNAPS, garantissant le respect des normes légales imposées par le Code de la Sécurité Intérieure. Cette certification assure la maîtrise des gestes de premiers secours, des techniques de médiation et de la réglementation applicable.'
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
      answer: 'Le terme "vigile" est couramment utilisé dans le langage courant, mais la dénomination officielle est "agent de prévention et de sécurité" (APS). Ce professionnel est obligatoirement titulaire d\'une carte professionnelle délivrée par le CNAPS et a suivi une formation certifiante (CQP APS). Il exerce dans le cadre strict du Code de la Sécurité Intérieure.'
    },
    {
      question: 'Combien coûte un agent de sécurité privée ?',
      answer: 'Le tarif d\'un agent de sécurité dépend de plusieurs facteurs : durée de la mission, horaires (jour, nuit, week-end, jours fériés), nombre d\'agents requis et spécificités du site. MTJ Sécurité Privée établit un devis gratuit et personnalisé pour chaque demande. Contactez-nous au 07 60 73 82 06 pour obtenir une estimation.'
    },
    {
      question: 'Dans quelles villes MTJ Sécurité Privée intervient-elle ?',
      answer: 'Notre siège est basé à Toulon (83). Nous intervenons principalement dans le sud de la France : Toulon, Marseille, Nice, Monaco, Toulouse et leurs agglomérations. Nous proposons également des missions en grand déplacement sur demande, couvrant l\'ensemble du territoire national.'
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
