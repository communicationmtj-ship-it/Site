import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/securite-sites-industriels-commerciaux',
  metaTitle: 'Sécurité Sites Industriels et Commerciaux | MTJ Sécurité Privée Toulon',
  metaDescription: 'MTJ Sécurité Privée protège vos sites industriels, entrepôts, centres commerciaux et espaces professionnels. Surveillance 24/7, contrôle d\'accès, rondes à Toulon, Nice, Toulouse.',
  breadcrumbCurrent: 'Sites industriels et commerciaux',
  areaServed: 'Toulon, Toulouse, Nice, PACA, Occitanie, France',

  h1: 'Sécurité des Sites Industriels et Commerciaux',
  introduction: `MTJ Sécurité Privée assure la protection de vos sites industriels, zones commerciales, entrepôts et espaces professionnels dans le sud de la France. Nos agents qualifiés garantissent la sécurité de vos installations, de vos marchandises et de vos collaborateurs, 24 heures sur 24, 7 jours sur 7.\n\nQue vous gériez un entrepôt logistique, une zone industrielle, un centre commercial ou un immeuble de bureaux, nous concevons un dispositif de sécurité adapté à la configuration de votre site et à vos contraintes opérationnelles.`,

  sections: [
    {
      h2: 'Protection des sites industriels',
      intro: 'Les sites industriels présentent des enjeux de sécurité spécifiques : accès multiples, zones sensibles, flux de véhicules et de personnel.',
      subsections: [
        {
          h3: 'Surveillance d\'entrepôts et zones logistiques',
          content: 'Nos agents assurent la surveillance permanente de vos entrepôts et plateformes logistiques. Contrôle des entrées et sorties de marchandises, vérification des bons de livraison, surveillance des zones de stockage et prévention du vol interne : nous sécurisons l\'ensemble de votre chaîne logistique.',
          list: ['Contrôle des flux de marchandises', 'Surveillance des quais de chargement', 'Vérification des véhicules entrants et sortants', 'Prévention de la démarque inconnue']
        },
        {
          h3: 'Sécurité des zones industrielles',
          content: 'Les zones industrielles nécessitent une surveillance renforcée en raison de la valeur des équipements et des matières premières stockées. MTJ Sécurité Privée déploie des dispositifs de rondes, de contrôle d\'accès et de surveillance périmétrique adaptés aux contraintes de chaque site industriel.'
        },
        {
          h3: 'Protection des sites classés Seveso',
          content: 'Pour les sites industriels présentant des risques majeurs (ICPE, Seveso), nos agents sont formés aux procédures d\'urgence spécifiques, à la gestion des évacuations et à la coordination avec les services de secours. La sécurité de ces sites exige une rigueur et une expertise que MTJ Sécurité Privée maîtrise parfaitement.'
        }
      ]
    },
    {
      h2: 'Sécurité des espaces commerciaux',
      intro: 'Les centres commerciaux et espaces de vente accueillent un flux important de visiteurs, nécessitant une sécurité à la fois efficace et discrète.',
      subsections: [
        {
          h3: 'Centres commerciaux et galeries marchandes',
          content: 'Nos agents de sécurité assurent la surveillance des espaces communs, la gestion des flux de visiteurs, la prévention du vol à l\'étalage et l\'intervention en cas d\'incident. Nous veillons à maintenir un environnement sûr et accueillant pour les clients et les commerçants.',
          list: ['Surveillance des espaces communs', 'Prévention du vol et des incivilités', 'Gestion des situations d\'urgence', 'Accompagnement à la fermeture']
        },
        {
          h3: 'Immeubles de bureaux et parcs d\'activités',
          content: 'Pour les immeubles de bureaux et parcs tertiaires, MTJ Sécurité Privée propose un service de sécurité comprenant l\'accueil sécurisé des visiteurs, le contrôle d\'accès par badges, les rondes de surveillance et la gestion des systèmes d\'alarme. Nos agents garantissent la tranquillité de vos locataires et collaborateurs.'
        }
      ]
    },
    {
      h2: 'Nos dispositifs de sécurité',
      subsections: [
        {
          h3: 'Rondes de surveillance et patrouilles',
          content: 'Nos agents effectuent des rondes régulières selon un planning aléatoire pour dissuader toute tentative d\'intrusion ou de malveillance. Les rondes couvrent les zones sensibles, les accès, les parkings et les abords du site. Chaque passage est horodaté et consigné dans un rapport de ronde.',
          list: ['Rondes de jour et de nuit', 'Points de contrôle horodatés', 'Rapports de ronde détaillés', 'Intervention en cas d\'anomalie']
        },
        {
          h3: 'Contrôle d\'accès et gestion des entrées',
          content: 'Le contrôle d\'accès est essentiel pour sécuriser vos sites. Nos agents vérifient les identités, gèrent les badges et accréditations, enregistrent les visiteurs et contrôlent les livraisons. Un registre précis est tenu pour assurer la traçabilité complète des entrées et sorties.'
        },
        {
          h3: 'Équipes cynophiles de dissuasion',
          content: 'Pour renforcer la sécurité de vos sites industriels et commerciaux, MTJ Sécurité Privée peut déployer des équipes cynophiles. La présence d\'un maître-chien constitue un puissant moyen de dissuasion contre les intrusions et les actes de malveillance, tout en permettant une détection rapide des intrus.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quels types de sites industriels protégez-vous ?',
      answer: 'MTJ Sécurité Privée protège tous types de sites industriels : entrepôts logistiques, usines de production, zones industrielles, plateformes de stockage, sites classés ICPE et Seveso. Nous adaptons notre dispositif aux spécificités de chaque site.'
    },
    {
      question: 'Proposez-vous une surveillance 24h/24 ?',
      answer: 'Oui, nous proposons des prestations de surveillance continue 24h/24 et 7j/7, ainsi que des formules adaptées (surveillance de nuit uniquement, week-ends et jours fériés, etc.). Le dispositif est dimensionné selon vos besoins et votre budget.'
    },
    {
      question: 'Comment évaluez-vous les besoins de sécurité de mon site ?',
      answer: 'Nous réalisons une étude de sécurité complète comprenant la visite du site, l\'analyse des risques, l\'identification des points vulnérables et la recommandation d\'un dispositif adapté. Cette étude est gratuite et sans engagement.'
    }
  ],

  conclusion: `La sécurité de vos sites industriels et commerciaux est un investissement essentiel pour protéger vos actifs, vos employés et votre activité. MTJ Sécurité Privée vous accompagne avec des solutions de surveillance professionnelles et sur mesure.\n\nContactez-nous dès aujourd'hui pour une étude de sécurité gratuite et un devis personnalisé.`,

  relatedLinks: [
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/surveillance-chantier-site', label: 'Surveillance de chantiers' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-erp-etablissements-public', label: 'Sécurité ERP' },
  ]
};

export default function SitesIndustrielsPage() {
  return <SeoPageLayout data={data} />;
}
