import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/ssiap-securite-incendie',
  metaTitle: 'SSIAP Sécurité Incendie | Agent SSIAP 1 2 3 | MTJ Sécurité Privée',
  metaDescription: 'Agents SSIAP certifiés pour la sécurité incendie de vos ERP et IGH à Toulon, Nice et Toulouse. Prévention, évacuation, assistance à personnes. MTJ Sécurité Privée — devis gratuit.',
  breadcrumbCurrent: 'SSIAP — Sécurité incendie',
  areaServed: 'Toulon, Toulouse, Nice, Sud de la France',

  h1: 'SSIAP — Sécurité Incendie et Assistance à Personnes',
  introduction: `MTJ Sécurité Privée met à votre disposition des agents SSIAP (Service de Sécurité Incendie et d'Assistance à Personnes) qualifiés pour assurer la sécurité incendie de vos établissements. Nos agents interviennent dans les ERP (Établissements Recevant du Public) et les IGH (Immeubles de Grande Hauteur) en conformité avec la réglementation en vigueur.\n\nLa prévention et la gestion du risque incendie sont des obligations légales pour de nombreux établissements. MTJ Sécurité Privée vous garantit une conformité totale et une protection optimale de vos occupants et de vos biens.`,

  sections: [
    {
      h2: 'Nos prestations SSIAP',
      intro: 'Nos agents SSIAP assurent l\'ensemble des missions réglementaires liées à la sécurité incendie dans les établissements soumis à obligation.',
      subsections: [
        {
          h3: 'Surveillance et prévention incendie',
          content: 'Nos agents SSIAP assurent une surveillance permanente du poste central de sécurité (PCS), effectuent des rondes de prévention pour vérifier le bon fonctionnement des équipements de sécurité incendie (extincteurs, RIA, détecteurs, désenfumage) et s\'assurent du respect des consignes de sécurité au sein de l\'établissement. Ils sont formés à l\'utilisation du SSI (Système de Sécurité Incendie) et à la lecture des tableaux de signalisation.',
          list: ['Tenue du poste central de sécurité (PCS)', 'Rondes de prévention réglementaires', 'Vérification des équipements incendie', 'Gestion du SSI et des alarmes']
        },
        {
          h3: 'Gestion d\'évacuation et assistance à personnes',
          content: 'En cas d\'alarme incendie, nos agents SSIAP dirigent l\'évacuation des occupants selon les procédures établies, guident les personnes à mobilité réduite vers les zones de sécurité, accueillent et orientent les secours extérieurs (pompiers) et assurent les premiers gestes de secours. Ils sont le premier maillon de la chaîne de secours, indispensable pour la sauvegarde des vies.'
        }
      ]
    },
    {
      h2: 'Niveaux de qualification SSIAP',
      intro: 'Le SSIAP se décline en trois niveaux de qualification, chacun correspondant à un rôle et des responsabilités spécifiques.',
      subsections: [
        {
          h3: 'SSIAP 1 — Agent de sécurité incendie',
          content: 'L\'agent SSIAP 1 assure les missions de base de la sécurité incendie : rondes, surveillance du PCS, intervention de première urgence, évacuation et assistance à personnes. C\'est le profil le plus déployé dans les ERP et les IGH. MTJ Sécurité Privée dispose d\'un effectif conséquent d\'agents SSIAP 1 opérationnels.'
        },
        {
          h3: 'SSIAP 2 — Chef d\'équipe de sécurité incendie',
          content: 'Le chef d\'équipe SSIAP 2 encadre les agents SSIAP 1 et coordonne les opérations de sécurité incendie au quotidien. Il gère la planification des rondes, rédige les rapports d\'activité et fait l\'interface avec la direction de l\'établissement. Il supervise les exercices d\'évacuation et les formations internes.'
        },
        {
          h3: 'SSIAP 3 — Chef de service de sécurité incendie',
          content: 'Le SSIAP 3 est le plus haut niveau de qualification. Il assure la direction du service de sécurité incendie, définit la politique de prévention, veille à la conformité réglementaire et représente l\'établissement auprès des commissions de sécurité. MTJ Sécurité Privée peut fournir ce niveau d\'expertise pour vos établissements les plus exigeants.'
        }
      ]
    },
    {
      h2: 'Types d\'établissements couverts',
      subsections: [
        {
          h3: 'ERP — Établissements Recevant du Public',
          content: 'Nos agents SSIAP interviennent dans tous les types d\'ERP : centres commerciaux, cinémas, théâtres, hôpitaux, établissements scolaires, musées, hôtels et salles de spectacles. La réglementation impose la présence d\'agents SSIAP qualifiés en fonction de la catégorie et du type de l\'établissement.',
          list: ['Centres commerciaux et galeries marchandes', 'Hôtels et restaurants', 'Hôpitaux et cliniques', 'Salles de spectacles et cinémas', 'Établissements scolaires et universitaires']
        },
        {
          h3: 'IGH — Immeubles de Grande Hauteur',
          content: 'Les immeubles de grande hauteur (bureaux, habitations, hôtels) sont soumis à une réglementation spécifique en matière de sécurité incendie. Nos agents SSIAP sont formés aux contraintes propres aux IGH : gestion des sas, compartimentage, désenfumage et coordination de l\'évacuation par zones.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Est-il obligatoire d\'avoir un agent SSIAP dans mon établissement ?',
      answer: 'L\'obligation dépend du type et de la catégorie de votre ERP ou de votre IGH. Les ERP de 1ère catégorie (plus de 1 500 personnes) et certains établissements de 2ème catégorie doivent disposer d\'un service de sécurité incendie avec des agents SSIAP. Contactez MTJ Sécurité Privée pour une évaluation de vos obligations réglementaires.'
    },
    {
      question: 'Quelle est la différence entre SSIAP 1, 2 et 3 ?',
      answer: 'Le SSIAP 1 est l\'agent qui effectue les rondes et la surveillance. Le SSIAP 2 est le chef d\'équipe qui coordonne les agents. Le SSIAP 3 est le chef de service qui dirige la politique de sécurité incendie de l\'établissement. Le niveau requis dépend de la taille et de la catégorie de votre établissement.'
    },
    {
      question: 'Intervenez-vous pour la mise en conformité de mon ERP ?',
      answer: 'Oui. Au-delà de la fourniture d\'agents SSIAP, MTJ Sécurité Privée peut vous accompagner dans l\'analyse de vos besoins en sécurité incendie et vous conseiller sur la mise en conformité de votre établissement avec la réglementation en vigueur (Code de la construction, règlement de sécurité).'
    }
  ],

  conclusion: `La sécurité incendie est un enjeu vital pour tout établissement recevant du public. Avec des agents SSIAP certifiés et expérimentés, MTJ Sécurité Privée assure la protection de vos occupants, la prévention des risques et la conformité réglementaire de vos établissements.\n\nNe laissez pas le risque incendie menacer votre activité. Faites appel à nos équipes SSIAP pour une protection complète et professionnelle.`,

  relatedLinks: [
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée Nice & Monaco' },
    { href: '/securite-privee-toulouse', label: 'Sécurité privée à Toulouse' },
  ]
};

export default function SsiapPage() {
  return <SeoPageLayout data={data} />;
}
