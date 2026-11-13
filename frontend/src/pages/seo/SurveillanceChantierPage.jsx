import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/surveillance-chantier-site',
  metaTitle: 'Surveillance de Chantiers et Sites | Gardiennage 24h/24 | MTJ Sécurité Privée',
  metaDescription: 'Gardiennage et surveillance de chantiers à Toulon, Nice, Toulouse. Protection contre le vol, l\'intrusion et le vandalisme. MTJ Sécurité Privée — rondes 24h/24, devis gratuit.',
  breadcrumbCurrent: 'Surveillance de chantiers',
  areaServed: 'Toulon, Toulouse, Nice, Sud de la France',

  h1: 'Surveillance de Chantiers et Gardiennage de Sites',
  introduction: `Les chantiers de construction et les sites industriels sont des cibles privilégiées pour le vol de matériaux, de matériel et d'engins de chantier. MTJ Sécurité Privée assure la surveillance et le gardiennage de vos chantiers et de vos sites dans le sud de la France pour prévenir les intrusions, le vandalisme et le vol.\n\nNos agents sont spécifiquement formés aux risques propres aux environnements de chantier et travaillent en coordination étroite avec les chefs de projet et les maîtres d'œuvre.`,

  sections: [
    {
      h2: 'Nos prestations de surveillance de chantier',
      intro: 'MTJ Sécurité Privée propose un dispositif complet pour protéger vos chantiers des risques de vol et d\'intrusion.',
      subsections: [
        {
          h3: 'Gardiennage permanent et rondes de surveillance',
          content: 'Nos agents assurent une présence continue sur votre chantier, 24 heures sur 24 et 7 jours sur 7, y compris les nuits, les week-ends et les jours fériés — moments où les chantiers sont les plus vulnérables. Les rondes sont effectuées selon un circuit défini couvrant l\'ensemble du périmètre, avec des points de contrôle consignés à chaque passage.',
          list: ['Gardiennage de jour et de nuit', 'Rondes avec points de contrôle consignés', 'Week-ends et jours fériés couverts', 'Comptes rendus selon les modalités du devis']
        },
        {
          h3: 'Contrôle d\'accès et gestion des entrées/sorties',
          content: 'La gestion des accès au chantier est cruciale pour prévenir les vols et les accidents. Nos agents contrôlent l\'identité des intervenants, vérifient les habilitations et enregistrent les mouvements d\'entrée et de sortie du matériel et des véhicules. Cette traçabilité rigoureuse permet de réduire considérablement les risques de disparition de matériel.'
        }
      ]
    },
    {
      h2: 'Risques spécifiques aux chantiers',
      intro: 'Les chantiers de construction sont exposés à des risques variés qui nécessitent une surveillance professionnelle.',
      subsections: [
        {
          h3: 'Vol de matériaux et d\'engins',
          content: 'Le vol de cuivre, d\'acier, de câblage, d\'outillage et d\'engins de chantier (pelleteuses, groupes électrogènes, compacteurs) représente un préjudice considérable pour les entreprises du BTP. Un chantier non surveillé peut subir des pertes de plusieurs dizaines de milliers d\'euros en une seule nuit. La présence d\'un agent de sécurité réduit ce risque de manière significative.'
        },
        {
          h3: 'Intrusions et vandalisme',
          content: 'Les chantiers ouverts sont vulnérables aux intrusions nocturnes : squat, vandalisme, dégradations volontaires, incendies criminels. Ces actes retardent les travaux, augmentent les coûts et peuvent mettre en danger la sécurité des riverains. La surveillance professionnelle dissuade ces comportements et permet une intervention rapide en cas d\'incident.'
        },
        {
          h3: 'Sécurité des riverains et responsabilité du maître d\'ouvrage',
          content: 'Le maître d\'ouvrage est juridiquement responsable de la sécurisation de son chantier vis-à-vis des tiers. Une intrusion de personnes non autorisées (enfants, adolescents, personnes en situation de précarité) peut entraîner des accidents graves et engager la responsabilité civile et pénale du responsable du chantier. MTJ Sécurité Privée vous protège aussi sur le plan juridique.'
        }
      ]
    },
    {
      h2: 'Solutions adaptées à votre chantier',
      subsections: [
        {
          h3: 'Chantiers BTP et travaux publics',
          content: 'Construction d\'immeubles, rénovation de bâtiments, travaux de voirie, pose de réseaux : nous adaptons notre dispositif à la taille et à la durée de votre chantier. Que ce soit pour un gardiennage temporaire de quelques semaines ou une surveillance permanente sur plusieurs mois, MTJ Sécurité Privée vous propose une solution flexible et réactive.',
          list: ['Construction neuve et rénovation', 'Travaux de voirie et réseaux', 'Chantiers navals et portuaires', 'Sites de démolition']
        },
        {
          h3: 'Surveillance cynophile de chantiers',
          content: 'Pour les chantiers étendus ou les zones à haut risque, nous déployons des binômes maître-chien. La sécurité cynophile renforce la capacité de surveillance et l\'effet dissuasif, particulièrement lors des rondes nocturnes sur de vastes périmètres.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Combien coûte la surveillance d\'un chantier ?',
      answer: 'Le coût dépend de la superficie du chantier, de la durée de la mission, des horaires de couverture (jour, nuit, 24h/24) et du nombre d\'agents requis. MTJ Sécurité Privée établit un devis gratuit après une visite de site. Contactez-nous au 07 60 73 82 06 pour une évaluation personnalisée.'
    },
    {
      question: 'Peut-on mettre en place une surveillance uniquement la nuit ?',
      answer: 'Oui, c\'est d\'ailleurs une formule très demandée. La majorité des vols et des intrusions se produisent la nuit, les week-ends et les jours fériés. Nous proposons des formules de gardiennage nocturne (18h-6h) ou week-end seul, adaptées à votre budget et à votre niveau de risque.'
    },
    {
      question: 'Intervenez-vous sur les chantiers en dehors du sud de la France ?',
      answer: 'Notre zone d\'intervention principale couvre le sud de la France (PACA, Occitanie, Nouvelle-Aquitaine). Nous pouvons également intervenir en grand déplacement sur l\'ensemble du territoire national pour des chantiers de grande envergure. Contactez-nous pour étudier votre demande.'
    }
  ],

  conclusion: `Protéger votre chantier, c'est protéger votre investissement, votre planning et la sécurité de vos équipes et des riverains. MTJ Sécurité Privée vous offre des solutions de gardiennage professionnelles, flexibles et adaptées aux réalités du terrain.\n\nNe laissez pas votre chantier sans surveillance. Contactez-nous dès maintenant pour un devis gratuit et une prise en charge rapide.`,

  relatedLinks: [
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile — surveillance renforcée' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-toulouse', label: 'Sécurité privée à Toulouse' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée Nice & Monaco' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
  ]
};

export default function SurveillanceChantierPage() {
  return <SeoPageLayout data={data} />;
}
