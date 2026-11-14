import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { cnapsCompanies, L612_14 } from '../../data/mock';

const RAPPROCHEE = cnapsCompanies.rapprochee;

// 13/11/2026 (audit du site de Mathilde, site-065) : autorisation et mention L612-14 lues dans
// data/mock.js ; « partout en France » sans l'international ; le bouton devis présélectionne
// la protection rapprochée.
const data = {
  slug: '/protection-rapprochee',
  societe: { nom: 'MTJ Sécurité Rapprochée', mention: 'société du groupe MTJ', autorisation: RAPPROCHEE.authorization, activite: RAPPROCHEE.activity, ville: 'Nice', adresse: null },
  serviceDevis: 'Protection rapprochée',
  metaTitle: 'Protection Rapprochée — Sécurité des Personnes | MTJ Sécurité Rapprochée',
  metaDescription: 'MTJ Sécurité Rapprochée assure la protection physique des personnalités, dirigeants, célébrités et particuliers exposés. Agents de protection rapprochée formés et certifiés à Toulon, Nice, Toulouse et dans toute la France.',
  breadcrumbCurrent: 'Protection rapprochée',
  // Données structurées alignées sur le texte (site-065) : l'autorisation du CNAPS vaut pour la
  // France ; Monaco, État étranger, n'est plus annoncé pour la protection rapprochée (13/11/2026).
  areaServed: 'Toulon, Toulouse, Nice, PACA, Occitanie, France',

  h1: 'Protection Rapprochée — Sécurité Physique des Personnes',
  introduction: `MTJ Sécurité Rapprochée, société du groupe MTJ, est spécialisée dans la protection physique des personnes. Nous assurons la sécurité rapprochée de personnalités, dirigeants d'entreprise, célébrités, diplomates et particuliers exposés, partout en France.\n\nNos agents de protection rapprochée (APR), rigoureusement sélectionnés et formés, assurent votre protection en toute discrétion. Chaque mission fait l'objet d'une analyse de risques préalable et d'un dispositif de protection sur mesure.\n\nAutorisation d'exercer du CNAPS n° ${RAPPROCHEE.authorization} (${RAPPROCHEE.activity}).\n${L612_14}`,

  sections: [
    {
      h2: 'Nos prestations de protection rapprochée',
      intro: 'MTJ Sécurité Rapprochée intervient dans tous les contextes nécessitant une protection physique qualifiée et discrète.',
      subsections: [
        {
          h3: 'Protection de dirigeants et chefs d\'entreprise',
          content: 'Les dirigeants d\'entreprise, cadres supérieurs et décideurs économiques peuvent être exposés à des menaces ciblées : tentatives d\'agression, enlèvement, espionnage industriel. MTJ Sécurité Rapprochée met en place un dispositif de protection adapté à votre profil de risque, intégrant escorte lors de déplacements, sécurisation de domicile et protection lors d\'événements professionnels.',
          list: ['Évaluation du niveau de menace', 'Escorte lors de déplacements professionnels et privés', 'Sécurisation du domicile et des lieux de travail', 'Protection lors d\'assemblées générales et réunions sensibles']
        },
        {
          h3: 'Protection de personnalités et célébrités',
          content: 'Artistes, sportifs, personnalités médiatiques et publiques font face à des risques spécifiques liés à leur notoriété. Nos agents de protection rapprochée assurent une sécurité discrète et efficace lors de vos déplacements, tournées, événements publics et dans votre vie quotidienne. Nous maîtrisons parfaitement la gestion des foules et la sécurisation des accès.',
          list: ['Protection lors de tournées et événements', 'Gestion des fans et des foules', 'Sécurisation des accès VIP', 'Escorte discrète au quotidien']
        },
        {
          h3: 'Protection de diplomates et délégations',
          content: 'La protection de diplomates, délégations officielles et personnalités étrangères requiert une expertise particulière en matière de protocole, de coordination avec les forces de l\'ordre et de gestion des risques géopolitiques. MTJ Sécurité Rapprochée dispose d\'agents formés à ces exigences spécifiques.'
        },
        {
          h3: 'Protection de particuliers exposés',
          content: 'Certaines situations personnelles (menaces, harcèlement, litiges, séparations conflictuelles) peuvent justifier le recours à une protection rapprochée. Nous proposons des dispositifs discrets et adaptés pour les particuliers confrontés à des situations à risque, avec une prise en charge rapide et confidentielle.'
        }
      ]
    },
    {
      h2: 'Méthodologie et expertise',
      intro: 'Chaque mission de protection rapprochée suit un protocole rigoureux pour garantir votre sécurité optimale.',
      subsections: [
        {
          h3: 'Analyse de risques et étude de sûreté',
          content: 'Avant chaque mission, nos experts réalisent une analyse approfondie des menaces et des vulnérabilités. Cette étude de sûreté permet de déterminer le niveau de protection adapté, d\'identifier les points sensibles et de planifier les itinéraires et les dispositifs de repli. Rien n\'est laissé au hasard.',
          list: ['Évaluation des menaces et des vulnérabilités', 'Reconnaissance des lieux et des itinéraires', 'Planification des dispositifs de repli', 'Coordination avec les autorités si nécessaire']
        },
        {
          h3: 'Dispositif de protection opérationnel',
          content: 'Le dispositif de protection est dimensionné en fonction du niveau de menace : agent unique en protection discrète, équipe de protection rapprochée, véhicule de sécurité, poste avancé. Nos agents maîtrisent les techniques de protection en mouvement, de sécurisation de périmètre et d\'extraction d\'urgence.'
        },
        {
          h3: 'Discrétion et professionnalisme',
          content: 'La discrétion est au cœur de notre approche. Nos agents de protection rapprochée sont sélectionnés pour leur capacité à assurer une sécurité invisible : tenue adaptée au contexte (costume, tenue décontractée), comportement discret, communication non intrusive. Votre sécurité est assurée sans altérer votre image ou votre confort.'
        }
      ]
    },
    {
      h2: 'Contextes d\'intervention',
      subsections: [
        {
          h3: 'Déplacements et voyages',
          content: 'Pour vos déplacements en France, sur étude préalable, MTJ Sécurité Rapprochée organise la sécurisation de vos trajets : transferts aéroport ou gare, escorte motorisée, reconnaissance des hôtels et lieux de rendez-vous, coordination avec les services de sécurité des lieux.',
          list: ['Transferts sécurisés aéroport/gare', 'Escorte motorisée', 'Reconnaissance et sécurisation des hébergements', 'Coordination avec les services de sécurité des lieux']
        },
        {
          h3: 'Événements et soirées privées',
          content: 'Lors de galas, soirées privées, mariages ou événements exclusifs, nos agents assurent la protection des invités d\'honneur et la sécurisation de l\'événement. Contrôle des accès, filtrage discret, présence en civil : nous garantissons la sérénité de votre événement.'
        },
        {
          h3: 'Protection au quotidien',
          content: 'Pour les personnes nécessitant une protection continue, nous mettons en place un dispositif permanent intégrant la sécurisation du domicile, l\'escorte lors des activités quotidiennes et la surveillance des proches. Ce service est assuré en toute confidentialité par des agents dédiés qui connaissent parfaitement vos habitudes et votre environnement.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quelle est la différence entre un agent de sécurité et un agent de protection rapprochée ?',
      answer: 'Un agent de sécurité (APS) assure la surveillance de sites et le contrôle d\'accès. Un agent de protection rapprochée (APR) est spécifiquement formé à la protection physique d\'une personne : évaluation des menaces, techniques d\'escorte, extraction d\'urgence, gestion de crise. L\'APR suit la personne protégée dans tous ses déplacements.'
    },
    {
      question: 'La protection rapprochée est-elle uniquement pour les personnalités ?',
      answer: 'Non. Toute personne confrontée à une situation de risque peut bénéficier d\'une protection rapprochée : dirigeants d\'entreprise, particuliers menacés, témoins dans des affaires sensibles, personnes en situation de séparation conflictuelle. Le dispositif est adapté au niveau de risque et au budget.'
    },
    {
      question: 'Comment se déroule la mise en place d\'une mission ?',
      answer: 'Après un premier échange confidentiel pour comprendre votre situation, nous réalisons une analyse de risques. Nous vous proposons ensuite un dispositif de protection adapté avec un devis détaillé. La mise en place peut être très rapide (quelques heures) en cas d\'urgence, ou planifiée sur plusieurs jours pour les missions récurrentes.'
    }
  ],

  conclusion: `La protection rapprochée est un métier d'excellence qui exige rigueur, discrétion et réactivité. MTJ Sécurité Rapprochée, société du groupe MTJ, met à votre disposition des agents de protection rapprochée formés et expérimentés pour assurer votre sécurité.\n\nContactez-nous en toute confidentialité pour une évaluation personnalisée de vos besoins de protection.`,

  relatedLinks: [
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée à Nice et Monaco' },
    { href: '/securite-privee-sud-france', label: 'Tout notre secteur' },
  ]
};

export default function ProtectionRapprocheePage() {
  return <SeoPageLayout data={data} />;
}
