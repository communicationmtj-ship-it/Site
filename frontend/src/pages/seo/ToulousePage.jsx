import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { PAGE_SECTEUR, lienLocal } from '../../data/perimetre';

const data = {
  slug: '/securite-privee-toulouse',
  metaTitle: 'Société de Sécurité Privée à Toulouse (31) | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée à Toulouse : agents de sécurité, gardiennage, sécurité cynophile et événementielle en Haute-Garonne et Occitanie. Devis gratuit — 07 60 73 82 06.',
  breadcrumbParent: { href: PAGE_SECTEUR.slug, label: 'Notre secteur' },
  breadcrumbCurrent: 'Sécurité privée à Toulouse',
  areaServed: 'Toulouse, Haute-Garonne, Occitanie',

  h1: 'Sécurité Privée à Toulouse — Haute-Garonne (31)',
  // 13/11/2026 (audit du site de Mathilde, site-061 à 063) : siège à Toulon, intervention à
  // Toulouse sur demande ; aucune implantation, équipe locale ni client cité sans preuve.
  introduction: `MTJ Sécurité Privée propose son expertise en sécurité privée à Toulouse et sur l'ensemble de la métropole toulousaine. Quatrième ville de France, Toulouse est un pôle économique majeur avec un secteur aéronautique et spatial de renommée mondiale, un tissu de start-ups innovantes et une vie culturelle dynamique.\n\nCette dynamique génère des besoins croissants en sécurité privée : surveillance de sites industriels aéronautiques, gardiennage de zones d'activité, sécurisation d'événements culturels et sportifs. MTJ Sécurité Privée répond à ces besoins avec des solutions professionnelles et adaptées au contexte toulousain.`,

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
          content: 'Toulouse accueille des événements majeurs : matchs du Stade Toulousain au stade Ernest-Wallon, rencontres du TFC au Stadium, le festival Rio Loco, la Fête de la Violette et de nombreux salons professionnels au MEETT. MTJ Sécurité Privée sécurise ce type de manifestation avec des dispositifs dimensionnés pour chaque événement, en coordination avec les autorités municipales et préfectorales.'
        }
      ]
    },
    {
      h2: 'Zones d\'intervention en Occitanie',
      intro: 'Depuis notre siège de Toulon, nous intervenons à Toulouse et dans l\'ensemble de la région Occitanie, selon vos besoins.',
      subsections: [
        {
          h3: 'Toulouse Métropole et bassin toulousain',
          content: 'Toulouse Métropole regroupe 37 communes. Nos équipes interviennent sur l\'ensemble de ce territoire : Toulouse centre, Blagnac (zones aéroportuaires et aéronautiques), Colomiers, Tournefeuille, Balma, L\'Union, Saint-Orens et l\'ensemble des communes périphériques. Chaque zone présente des enjeux de sécurité propres, que nous étudions avec vous.'
        },
        {
          // 13/11/2026 (choix de Théo, « Site perimetre: A partout ») : tout le secteur autour de Toulouse.
          h3: 'Gers, Hautes-Pyrénées, Ariège, Tarn, Tarn-et-Garonne, Aveyron, Lot et Cantal',
          content: 'Autour de Toulouse, notre secteur couvre Auch, Tarbes et Lourdes, Foix et Pamiers, Albi et Castres, Montauban, Rodez et Millau, Cahors, et, plus au nord, Aurillac dans le Cantal.'
        },
        {
          h3: 'Montpellier, Perpignan et littoral méditerranéen',
          content: 'Nous assurons des prestations de sécurité dans l\'ensemble de l\'Occitanie : Montpellier, Nîmes, Perpignan, Béziers, Narbonne et le littoral méditerranéen. Ces communes accueillent des zones commerciales, des chantiers de construction et des événements saisonniers qui nécessitent un dispositif de sécurité professionnel.'
        },
        {
          h3: 'Sites industriels sensibles',
          content: 'Toulouse est la capitale européenne de l\'aéronautique. MTJ Sécurité Privée propose des prestations de gardiennage et de contrôle d\'accès adaptées aux exigences des sites industriels sensibles, dont ceux du secteur aéronautique. Nos agents appliquent les consignes de sûreté propres à chaque site.'
        }
      ]
    },
    {
      h2: 'Pourquoi choisir MTJ Sécurité Privée à Toulouse',
      subsections: [
        {
          // 15/11/2026 (repli prudent) : plus de « savoir-faire éprouvé » ni de « sites sensibles » sans preuve.
          // 15/11/2026 (réponse de Théo, « Qualifications ») : CYNODEX sans réserve, maîtres-chiens certifiés.
          h3: 'Un seul interlocuteur sur tout le secteur',
          content: 'Depuis notre siège de Toulon, nous intervenons de Bordeaux à Nice et jusqu\'à Annecy : vos sites de Haute-Garonne et ceux du reste du secteur peuvent relever d\'un même interlocuteur et d\'un même devis. Nos maîtres-chiens complètent l\'offre ; la détection d\'explosifs est assurée par nos maîtres-chiens certifiés CYNODEX.'
        },
        {
          h3: 'Capacité de montée en charge',
          content: 'Grâce à notre réseau d\'agents sur tout notre secteur, nous pouvons renforcer le dispositif pour vos pics d\'activité ou vos événements exceptionnels. Cette flexibilité est un atout pour les clients ayant des besoins variables ou saisonniers.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'MTJ Sécurité Privée intervient-elle à Toulouse ?',
      answer: 'Oui. Notre siège est à Toulon ; nous intervenons à Toulouse et en Haute-Garonne selon vos besoins, avec un dispositif défini dans chaque devis.'
    },
    {
      question: 'Pouvez-vous intervenir sur les sites aéronautiques de Blagnac ?',
      answer: 'Oui, après étude de votre demande : nous pouvons assurer des missions de gardiennage, de contrôle d\'accès et de surveillance sur les zones d\'activité de Blagnac, de Colomiers et du bassin aéronautique toulousain, dans le respect des consignes de sûreté de chaque site.'
    },
    {
      question: 'Proposez-vous des prestations cynophiles à Toulouse ?',
      answer: 'Oui. Nos maîtres-chiens interviennent à Toulouse pour des missions de surveillance renforcée et de sécurité événementielle ; la détection d\'explosifs est assurée par nos maîtres-chiens certifiés CYNODEX. Les binômes maître-chien sont adaptés aux sites étendus et aux grands événements.'
    }
  ],

  conclusion: `MTJ Sécurité Privée intervient à Toulouse, en Haute-Garonne et dans toute l'Occitanie. Agents de sécurité qualifiés, maîtres-chiens, agents SSIAP et détection d'explosifs par nos maîtres-chiens certifiés CYNODEX : l'ensemble de nos compétences est à votre disposition pour protéger vos sites, vos événements et vos biens.\n\nContactez-nous pour un devis gratuit et découvrez comment MTJ Sécurité Privée peut répondre à vos besoins de sécurité à Toulouse.`,

  relatedLinks: [
    lienLocal('/securite-privee-bordeaux'),
    lienLocal('/securite-privee-montpellier'),
    lienLocal('/securite-privee-perpignan'),
    { href: PAGE_SECTEUR.slug, label: 'Tout notre secteur' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/surveillance-chantier-site', label: 'Surveillance de chantiers' },
  ]
};

export default function ToulousePage() {
  return <SeoPageLayout data={data} />;
}
