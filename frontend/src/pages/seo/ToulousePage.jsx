import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/securite-privee-toulouse',
  metaTitle: 'Société de Sécurité Privée à Toulouse (31) | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée à Toulouse : agents de sécurité, gardiennage, sécurité cynophile et événementielle en Haute-Garonne et Occitanie. Devis gratuit — 07 60 73 82 06.',
  breadcrumbCurrent: 'Sécurité privée à Toulouse',
  areaServed: 'Toulouse, Haute-Garonne, Occitanie',

  h1: 'Sécurité Privée à Toulouse — Haute-Garonne (31)',
  introduction: `MTJ Sécurité Privée étend son expertise en sécurité privée à Toulouse et sur l'ensemble de la métropole toulousaine. Quatrième ville de France, Toulouse est un pôle économique majeur avec un secteur aéronautique de renommée mondiale (Airbus, Thales, Safran), un tissu de start-ups innovantes et une vie culturelle dynamique.\n\nCette dynamique génère des besoins croissants en sécurité privée : surveillance de sites industriels aéronautiques, gardiennage de zones d'activité, sécurisation d'événements culturels et sportifs. MTJ Sécurité Privée répond à ces besoins avec des solutions professionnelles et adaptées au contexte toulousain.`,

  sections: [
    {
      h2: 'Nos services de sécurité à Toulouse',
      intro: 'L\'ensemble des compétences de MTJ Sécurité Privée est mobilisable sur Toulouse et la Haute-Garonne.',
      subsections: [
        {
          h3: 'Gardiennage et surveillance en Haute-Garonne',
          content: 'Nos agents assurent le gardiennage de sites industriels, commerciaux et résidentiels dans la métropole toulousaine et en Haute-Garonne. Des zones aéronautiques de Blagnac et Colomiers aux quartiers d\'affaires du centre-ville, en passant par les zones d\'activité de Labège et Ramonville, nos équipes couvrent l\'ensemble du département.',
          list: ['Toulouse centre, Capitole, Saint-Cyprien', 'Blagnac, Colomiers, zones aéronautiques', 'Labège, Ramonville, Castanet-Tolosan', 'Muret, Saint-Gaudens et sud Haute-Garonne']
        },
        {
          h3: 'Sécurité événementielle à Toulouse',
          content: 'Toulouse accueille des événements majeurs : matchs du Stade Toulousain au stade Ernest-Wallon, rencontres du TFC au Stadium, le festival Rio Loco, la Fête de la Violette et de nombreux salons professionnels au MEETT. MTJ Sécurité Privée sécurise ces manifestations avec des dispositifs dimensionnés pour chaque type d\'événement, en coordination avec les autorités municipales et préfectorales.'
        }
      ]
    },
    {
      h2: 'Zones d\'intervention en Occitanie',
      intro: 'Notre implantation à Toulouse nous permet de couvrir l\'ensemble de la région Occitanie avec des délais d\'intervention adaptés.',
      subsections: [
        {
          h3: 'Toulouse Métropole et bassin toulousain',
          content: 'Toulouse Métropole regroupe 37 communes et plus de 780 000 habitants. Nos équipes interviennent sur l\'ensemble de ce territoire : Toulouse centre, Blagnac (zones aéroportuaires et aéronautiques), Colomiers, Tournefeuille, Balma, L\'Union, Saint-Orens et l\'ensemble des communes périphériques. Chaque zone présente des enjeux sécuritaires spécifiques que nous maîtrisons.'
        },
        {
          h3: 'Montpellier, Perpignan et littoral méditerranéen',
          content: 'Nous assurons des prestations de sécurité dans l\'ensemble de l\'Occitanie : Montpellier, Nîmes, Perpignan, Béziers, Narbonne et le littoral méditerranéen. Ces communes accueillent des zones commerciales, des chantiers de construction et des événements saisonniers qui nécessitent un dispositif de sécurité professionnel.'
        },
        {
          h3: 'Sites industriels aéronautiques et de défense',
          content: 'Toulouse est la capitale européenne de l\'aéronautique. MTJ Sécurité Privée propose des prestations de gardiennage et de contrôle d\'accès adaptées aux exigences de sécurité des sites industriels sensibles : usines Airbus, sous-traitants aéronautiques, centres de recherche et installations liées à la défense. Nos agents sont formés aux procédures de sûreté spécifiques à ces environnements.'
        }
      ]
    },
    {
      h2: 'Pourquoi choisir MTJ Sécurité Privée à Toulouse',
      subsections: [
        {
          h3: 'Expertise transposée du sud de la France',
          content: 'Forte de son expérience acquise dans le sud-est de la France (Toulon, Nice, Monaco), MTJ Sécurité Privée apporte à Toulouse un savoir-faire éprouvé dans la sécurisation de sites sensibles, d\'événements de grande envergure et de milieux exigeants. Notre expertise en sécurité cynophile et en détection d\'explosifs (CYNODEX) complète notre offre toulousaine.'
        },
        {
          h3: 'Capacité de montée en charge',
          content: 'Grâce à notre implantation multi-sites (Toulon, Toulouse, Nice), nous disposons d\'une capacité de mobilisation rapide d\'agents supplémentaires pour vos pics d\'activité ou vos événements exceptionnels. Cette flexibilité est un atout majeur pour les clients ayant des besoins variables ou saisonniers.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'MTJ Sécurité Privée est-elle présente à Toulouse ?',
      answer: 'Oui. MTJ Sécurité Privée a étendu son activité à Toulouse pour répondre à la demande croissante en sécurité privée en Occitanie. Notre siège reste à Toulon, mais nous disposons d\'équipes opérationnelles sur Toulouse et la Haute-Garonne pour assurer un service de proximité.'
    },
    {
      question: 'Pouvez-vous intervenir sur les sites aéronautiques de Blagnac ?',
      answer: 'Oui. Nos agents sont formés aux exigences de sécurité des sites industriels sensibles. Nous intervenons sur les zones aéronautiques de Blagnac, Colomiers et l\'ensemble du bassin aéronautique toulousain pour des missions de gardiennage, de contrôle d\'accès et de surveillance.'
    },
    {
      question: 'Proposez-vous des prestations cynophiles à Toulouse ?',
      answer: 'Absolument. Notre unité cynophile intervient à Toulouse pour des missions de surveillance renforcée, de sécurité événementielle et de détection d\'explosifs (CYNODEX). Les binômes maître-chien sont particulièrement adaptés aux sites étendus et aux événements de grande envergure.'
    }
  ],

  conclusion: `Toulouse et l'Occitanie bénéficient désormais de l'expertise de MTJ Sécurité Privée. Agents de sécurité qualifiés, équipes cynophiles, agents SSIAP et unité CYNODEX : l'ensemble de nos compétences est à votre disposition pour protéger vos sites, vos événements et vos biens.\n\nContactez-nous pour un devis gratuit et découvrez comment MTJ Sécurité Privée peut répondre à vos besoins de sécurité à Toulouse.`,

  relatedLinks: [
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée Nice & Monaco' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/surveillance-chantier-site', label: 'Surveillance de chantiers' },
  ]
};

export default function ToulousePage() {
  return <SeoPageLayout data={data} />;
}
