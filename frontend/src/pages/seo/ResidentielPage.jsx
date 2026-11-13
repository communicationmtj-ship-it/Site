import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/securite-residentielle',
  metaTitle: 'Sécurité Résidentielle | Résidences, Copropriétés, Domaines | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée assure la sécurité de vos résidences privées, copropriétés et domaines. Gardiennage, rondes, contrôle d\'accès à Toulon, Nice, Toulouse et sud de la France.',
  breadcrumbCurrent: 'Sécurité résidentielle',
  areaServed: 'Toulon, Toulouse, Nice, PACA, Occitanie, France',

  h1: 'Sécurité Résidentielle — Protection de vos Résidences et Domaines',
  introduction: `MTJ Sécurité Privée propose des services de sécurité dédiés aux résidences privées, copropriétés, domaines et propriétés de prestige dans le sud de la France. Nous comprenons que la sécurité de votre lieu de vie est une priorité absolue.\n\nNos agents assurent une présence rassurante et professionnelle, de jour comme de nuit, pour protéger les résidents, leurs biens et garantir la tranquillité de votre voisinage. Du simple gardiennage au dispositif de sécurité complet, nous adaptons nos prestations à vos exigences.`,

  sections: [
    {
      h2: 'Sécurité des copropriétés et résidences collectives',
      intro: 'Les résidences collectives et copropriétés font face à des enjeux de sécurité croissants : intrusions, dégradations, occupation illicite des parties communes.',
      subsections: [
        {
          h3: 'Gardiennage et contrôle d\'accès résidentiel',
          content: 'Nos agents assurent le gardiennage de votre résidence avec un contrôle rigoureux des accès. Vérification des identités, gestion des visiteurs, surveillance des entrées de parking et des parties communes : nous garantissons que seules les personnes autorisées accèdent à votre résidence.',
          list: ['Contrôle d\'accès piétons et véhicules', 'Gestion des visiteurs et livraisons', 'Surveillance des parties communes', 'Prévention des intrusions et squats']
        },
        {
          h3: 'Rondes de nuit en résidence',
          content: 'Les rondes de nuit constituent un moyen efficace de dissuasion et de détection des anomalies. Nos agents patrouillent dans les espaces communs, les parkings souterrains, les abords de la résidence et vérifient la fermeture des accès. Tout incident est immédiatement signalé au syndic et aux résidents concernés.'
        }
      ]
    },
    {
      h2: 'Protection des propriétés privées et domaines',
      intro: 'Les propriétés de prestige et domaines privés nécessitent une sécurité discrète, personnalisée et hautement professionnelle.',
      subsections: [
        {
          h3: 'Sécurité de villas et propriétés de prestige',
          content: 'MTJ Sécurité Privée assure la protection de villas, bastides, châteaux et propriétés de luxe sur la Côte d\'Azur et dans tout le sud de la France. Nos agents, sélectionnés pour leur discrétion et leur professionnalisme, assurent la surveillance de votre propriété en votre présence ou en votre absence.',
          list: ['Surveillance permanente ou ponctuelle', 'Protection pendant les absences prolongées', 'Accueil et filtrage des visiteurs', 'Coordination avec les systèmes d\'alarme existants']
        },
        {
          h3: 'Sécurité de domaines viticoles et agricoles',
          content: 'Les domaines viticoles et exploitations agricoles du sud de la France sont exposés aux vols de matériel, de récoltes et au vandalisme. MTJ Sécurité Privée propose des solutions de surveillance adaptées aux grandes superficies : rondes motorisées, équipes cynophiles et surveillance nocturne.'
        }
      ]
    },
    {
      h2: 'Services complémentaires résidentiels',
      subsections: [
        {
          h3: 'Surveillance saisonnière et vacances',
          // 13/11/2026 (audit, site-082) : la gestion du courrier et des colis n'est pas une prestation de sécurité privée.
          content: 'Pendant vos périodes d\'absence (vacances, déplacements professionnels), MTJ Sécurité Privée assure la surveillance de votre domicile. Rondes régulières, vérification des accès et simulation de présence : nous veillons sur votre bien comme si vous y étiez.',
          list: ['Rondes de vérification planifiées', 'Simulation de présence', 'Vérification des accès', 'Rapport d\'intervention quotidien']
        },
        {
          h3: 'Sécurité cynophile résidentielle',
          content: 'Pour une protection renforcée de votre propriété, nos équipes cynophiles offrent un niveau de dissuasion supérieur. Le binôme maître-chien assure des rondes périmétriques et une détection optimale de toute tentative d\'intrusion, y compris sur les terrains étendus.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Proposez-vous la sécurité de copropriété en continu ?',
      answer: 'Oui, nous proposons des prestations de gardiennage en continu (24h/24, 7j/7) ou sur des créneaux définis (nuit uniquement, week-ends, etc.). Le dispositif est adapté aux besoins de votre copropriété et validé avec le syndic et le conseil syndical.'
    },
    {
      question: 'Pouvez-vous sécuriser ma villa pendant mes vacances ?',
      answer: 'Absolument. Nous proposons des formules de surveillance saisonnière avec rondes régulières, vérification des accès et rapport quotidien. Ce service est très demandé pendant les périodes estivales sur la Côte d\'Azur et dans le Var.'
    },
    {
      question: 'Vos agents sont-ils formés à la discrétion ?',
      answer: 'Oui, tous nos agents affectés à la sécurité résidentielle sont sélectionnés pour leur professionnalisme et leur discrétion. Ils portent une tenue adaptée au contexte (uniforme ou civil selon vos préférences) et sont formés à l\'accueil des résidents et visiteurs.'
    }
  ],

  conclusion: `La sécurité de votre résidence ou de votre propriété privée est notre priorité. MTJ Sécurité Privée vous offre des solutions de gardiennage et de surveillance sur mesure, alliant professionnalisme, discrétion et réactivité.\n\nContactez-nous pour un devis gratuit et personnalisé, adapté à votre résidence et à vos besoins.`,

  relatedLinks: [
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/securite-sites-industriels-commerciaux', label: 'Sécurité sites industriels' },
    { href: '/securite-erp-etablissements-public', label: 'Sécurité ERP' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée à Nice et Monaco' },
  ]
};

export default function ResidentielPage() {
  return <SeoPageLayout data={data} />;
}
