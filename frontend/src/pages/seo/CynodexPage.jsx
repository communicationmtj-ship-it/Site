import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/detection-explosifs-cynodex',
  themeColor: '#AC8631',
  metaTitle: 'Détection d\'Explosifs CYNODEX | Équipe Cynophile | MTJ Sécurité Privée',
  metaDescription: 'Unité CYNODEX spécialisée en détection d\'explosifs avec chiens entraînés. MTJ Sécurité Privée intervient de Bordeaux à Nice et jusqu\'à Annecy pour sécuriser événements et sites sensibles.',
  breadcrumbCurrent: 'CYNODEX - Détection d\'explosifs',
  areaServed: 'France entière',

  h1: 'CYNODEX — Détection d\'Explosifs par Équipe Cynophile',
  // 13/11/2026 (audit du site de Mathilde, site-075 à 077) : sans liste ni nombre de familles
  // d'explosifs, sans sites militaires, nucléaires ni gouvernementaux, sans « partenaire des
  // autorités ».
  // 15/11/2026 (réponse de Théo, « Qualifications ») : le site est une vitrine commerciale, MTJ recrute
  // si un client demande un profil et assure la prestation ; plus aucune réserve de certification,
  // d'habilitation ni de disponibilité : maîtres-chiens certifiés CYNODEX.
  introduction: `L'unité CYNODEX de MTJ Sécurité Privée est spécialisée dans la détection d'explosifs à l'aide de chiens entraînés à cette mission. Face à la menace terroriste et aux risques liés aux engins explosifs improvisés, la détection canine apporte une capacité complémentaire aux moyens technologiques.\n\nNos maîtres-chiens certifiés CYNODEX interviennent pour sécuriser des événements, des sites sensibles et des lieux accueillant du public.`,

  sections: [
    {
      h2: 'Missions de l\'unité CYNODEX',
      intro: 'L\'expertise CYNODEX de MTJ Sécurité Privée couvre la prévention et la levée de doute.',
      subsections: [
        {
          h3: 'Levée de doute et inspection de sites',
          content: 'Nos binômes CYNODEX effectuent des levées de doute sur les colis ou objets suspects identifiés dans vos locaux ou sur vos sites. Le chien de détection d\'explosifs, grâce à son flair, peut identifier des traces de matières explosives, même dissimulées. Cette prestation s\'adresse notamment aux sièges d\'entreprises et aux lieux accueillant du public.',
          list: ['Levée de doute sur colis suspects', 'Inspection de véhicules', 'Vérification de locaux avant occupation', 'Recherche de matières explosives']
        },
        {
          h3: 'Sécurisation pré-événementielle',
          content: 'Avant un événement (concert, match sportif, congrès), nos binômes CYNODEX procèdent à une inspection des lieux. Le chien détecteur passe l\'enceinte, les coulisses, les zones techniques et les parkings afin de détecter une éventuelle menace explosive. Cette prestation s\'inscrit dans une démarche globale de sûreté événementielle.'
        }
      ]
    },
    {
      h2: 'Compétences et habilitations CYNODEX',
      intro: 'La détection d\'explosifs exige un niveau de certification et d\'entraînement supérieur aux missions de sécurité cynophile classiques.',
      subsections: [
        {
          h3: 'Certification spécialisée détection d\'explosifs',
          content: 'Nos maîtres-chiens CYNODEX sont titulaires d\'une certification en détection d\'explosifs, en complément de leur carte professionnelle délivrée par le CNAPS. Ils opèrent selon des protocoles stricts de sécurité.'
        },
        {
          h3: 'Chiens détecteurs : entraînement spécialisé',
          content: 'Les chiens de notre unité CYNODEX suivent un entraînement continu à la détection de matières explosives. Ils sont entraînés à la détection de plusieurs familles de matières explosives et font l\'objet d\'évaluations régulières.'
        },
        {
          h3: 'Coordination avec les forces de l\'ordre',
          content: 'En cas de détection positive, nos binômes CYNODEX appliquent des protocoles d\'alerte stricts et alertent les forces de sécurité intérieure (police, gendarmerie, services de déminage), seules compétentes pour intervenir sur un engin suspect.'
        }
      ]
    },
    {
      h2: 'Applications et secteurs d\'intervention',
      subsections: [
        {
          h3: 'Événements accueillant un large public',
          content: 'Festivals, concerts, compétitions sportives, congrès : nos binômes CYNODEX peuvent intervenir en amont de l\'événement pour l\'inspection des lieux et pendant la manifestation pour une veille sur site.',
          list: ['Festivals et concerts', 'Événements sportifs', 'Congrès et salons professionnels', 'Lieux accueillant du public']
        },
        {
          h3: 'Sites sensibles et lieux accueillant du public',
          content: 'Nos maîtres-chiens certifiés CYNODEX interviennent dans des centres commerciaux, des gares, des aéroports et des lieux accueillant du public. La détection canine offre une couche de sécurité complémentaire aux dispositifs technologiques existants (portiques, scanners, caméras).'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Qu\'est-ce que le CYNODEX exactement ?',
      answer: 'CYNODEX signifie "Cynophile Détection d\'Explosifs". C\'est une spécialisation de la sécurité cynophile dédiée à la détection de matières explosives à l\'aide de chiens spécialement entraînés. Les équipes CYNODEX interviennent pour sécuriser des sites et des événements en identifiant la présence potentielle d\'engins explosifs.'
    },
    {
      question: 'Le chien peut-il détecter tous les types d\'explosifs ?',
      answer: 'Aucun moyen de détection n\'est infaillible. Nos chiens CYNODEX sont entraînés à la détection de plusieurs familles de matières explosives et leur entraînement est entretenu régulièrement. Le détail vous est précisé lors de l\'étude de votre besoin.'
    },
    {
      question: 'Dans quels délais pouvez-vous intervenir ?',
      answer: 'Le délai dépend du lieu de la mission : il vous est annoncé lors de votre demande. Contactez-nous au 07 60 73 82 06 pour évaluer votre besoin.'
    }
  ],

  conclusion: `La détection d'explosifs par équipe cynophile est un moyen reconnu pour renforcer la sécurité de vos sites et de vos événements face à la menace terroriste. L'unité CYNODEX de MTJ Sécurité Privée vous apporte cette expertise, assurée par des binômes certifiés.\n\nProtégez vos collaborateurs, vos clients et votre public avec une solution de détection reconnue. Contactez MTJ Sécurité Privée pour un devis adapté à votre situation.`,

  relatedLinks: [
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée Nice & Monaco' },
    { href: '/securite-privee-toulouse', label: 'Sécurité privée à Toulouse' },
  ]
};

export default function CynodexPage() {
  return <SeoPageLayout data={data} />;
}
