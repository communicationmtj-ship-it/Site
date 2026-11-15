import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { PAGE_SECTEUR, lienLocal } from '../../data/perimetre';

const data = {
  slug: '/securite-privee-bordeaux',
  metaTitle: 'Société de Sécurité Privée à Bordeaux (33) | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée à Bordeaux : agents de sécurité, gardiennage, sécurité cynophile et événementielle en Gironde et Nouvelle-Aquitaine. Devis gratuit — 07 60 73 82 06.',
  breadcrumbParent: { href: PAGE_SECTEUR.slug, label: 'Notre secteur' },
  breadcrumbCurrent: 'Sécurité privée à Bordeaux',
  areaServed: 'Bordeaux, Gironde, Nouvelle-Aquitaine',

  h1: 'Sécurité Privée à Bordeaux — Gironde (33)',
  // 13/11/2026 (audit du site de Mathilde, site-062 et 068) : siège à Toulon, intervention à
  // Bordeaux sur demande ; aucune équipe locale ni implantation affirmée sans preuve.
  // 13/11/2026 (choix de Théo, « Site perimetre: A partout ») : Bordeaux est l'extrémité ouest du
  // secteur ; la page est au menu (« Nos zones ») et au pied de page.
  introduction: `MTJ Sécurité Privée propose son expertise en sécurité privée à Bordeaux et sur l'ensemble de la métropole bordelaise. Préfecture de la Gironde et de la région Nouvelle-Aquitaine, Bordeaux est un pôle économique majeur avec une activité viticole mondialement reconnue, un secteur aéronautique de pointe et un tissu tertiaire en pleine expansion.\n\nCette dynamique génère des besoins croissants en sécurité privée : surveillance de sites viticoles, gardiennage de zones d'activité, sécurisation d'événements culturels et sportifs. MTJ Sécurité Privée répond à ces besoins avec des solutions professionnelles et adaptées au contexte bordelais.`,

  sections: [
    {
      h2: 'Nos services de sécurité à Bordeaux',
      intro: 'L\'ensemble des compétences de MTJ Sécurité Privée est mobilisable sur Bordeaux et la Gironde.',
      subsections: [
        {
          h3: 'Gardiennage et surveillance en Gironde',
          content: 'Nos agents assurent le gardiennage de sites industriels, commerciaux et résidentiels dans la métropole bordelaise et en Gironde. Des zones d\'activité de Mérignac et Pessac aux domaines viticoles du Médoc et de Saint-Émilion, en passant par le centre-ville de Bordeaux, nos équipes couvrent l\'ensemble du département.',
          list: ['Bordeaux centre, Chartrons, Bassins à flot', 'Mérignac, Pessac, Talence', 'Bassin d\'Arcachon et littoral', 'Libournais et vignobles de Saint-Émilion']
        },
        {
          h3: 'Sécurité événementielle à Bordeaux',
          content: 'Bordeaux accueille des événements majeurs : Bordeaux Fête le Vin, matchs des Girondins et de l\'UBB (rugby), salons professionnels, festivals de musique et événements à la Cité du Vin. MTJ Sécurité Privée sécurise ce type de manifestation avec des dispositifs dimensionnés et une coordination avec les autorités locales.'
        }
      ]
    },
    {
      h2: 'Zones d\'intervention en Nouvelle-Aquitaine',
      intro: 'Nous intervenons sur l\'ensemble de la Gironde et dans les départements voisins de notre secteur en Nouvelle-Aquitaine, selon vos besoins.',
      subsections: [
        {
          h3: 'Métropole bordelaise et rive droite',
          content: 'La Métropole de Bordeaux regroupe 28 communes. Nos agents couvrent l\'ensemble de ce territoire : Bordeaux centre, Mérignac (zones aéroportuaires), Pessac, Talence, Villenave-d\'Ornon, Bègles, Cenon, Lormont et Floirac. Chaque commune présente des enjeux de sécurité propres, que nous étudions avec vous.'
        },
        {
          h3: 'Bassin d\'Arcachon et littoral girondin',
          content: 'Le Bassin d\'Arcachon, Arcachon, La Teste-de-Buch, Gujan-Mestras et le littoral girondin sont des zones touristiques majeures qui nécessitent une sécurité renforcée en saison estivale. Surveillance de campings, sécurité d\'événements nautiques, gardiennage de résidences secondaires : nous répondons aux besoins saisonniers.'
        },
        {
          h3: 'Vignobles et domaines viticoles',
          content: 'La Gironde abrite certains des vignobles les plus prestigieux au monde : Médoc, Saint-Émilion, Pomerol, Graves. La protection de ces domaines contre le vol, l\'intrusion et le vandalisme est un enjeu crucial. MTJ Sécurité Privée propose la surveillance de propriétés viticoles, de chais et d\'exploitations agricoles avec des prestations adaptées au monde viticole.'
        },
        {
          h3: 'Landes, Lot-et-Garonne, Dordogne et Pyrénées-Atlantiques',
          content: 'Notre secteur s\'étend aux départements voisins : Mont-de-Marsan et Dax dans les Landes, Agen dans le Lot-et-Garonne, Périgueux et Bergerac en Dordogne, Pau, Bayonne et Biarritz dans les Pyrénées-Atlantiques.'
        }
      ]
    },
    {
      h2: 'Pourquoi choisir MTJ Sécurité Privée à Bordeaux',
      subsections: [
        {
          // 15/11/2026 (repli prudent) : plus de « savoir-faire éprouvé » ni de « sites sensibles » sans preuve ;
          // CYNODEX selon la certification du binôme, comme sur les autres pages.
          h3: 'Un seul interlocuteur sur tout le secteur',
          content: 'Depuis notre siège de Toulon, nous intervenons de Bordeaux à Nice et jusqu\'à Annecy : vos sites de Gironde et ceux du reste du secteur peuvent relever d\'un même interlocuteur et d\'un même devis. Nos maîtres-chiens complètent l\'offre ; la détection d\'explosifs (CYNODEX) est proposée selon la certification du binôme.'
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
      question: 'MTJ Sécurité Privée intervient-elle à Bordeaux ?',
      answer: 'Oui. Notre siège est à Toulon ; nous intervenons à Bordeaux et en Gironde selon vos besoins, avec un dispositif défini dans chaque devis.'
    },
    {
      question: 'Pouvez-vous intervenir dans le Médoc ou le Libournais ?',
      answer: 'Oui. Nous pouvons intervenir dans l\'ensemble du département de la Gironde, y compris les zones rurales du Médoc, du Libournais et de l\'Entre-deux-Mers, notamment pour la surveillance de domaines viticoles et de propriétés privées.'
    },
    {
      question: 'Proposez-vous des prestations cynophiles à Bordeaux ?',
      answer: 'Oui. Nos maîtres-chiens interviennent à Bordeaux pour des missions de surveillance renforcée et de sécurité événementielle ; la détection d\'explosifs (CYNODEX) est proposée selon la certification du binôme. Les binômes maître-chien sont adaptés aux sites étendus et aux grands événements.'
    }
  ],

  conclusion: `MTJ Sécurité Privée intervient à Bordeaux et dans toute la Gironde. Agents de sécurité qualifiés, maîtres-chiens, agents SSIAP et, selon la certification du binôme, détection d'explosifs (CYNODEX) : l'ensemble de nos compétences est à votre disposition pour protéger vos sites, vos événements et vos biens.\n\nContactez-nous pour un devis gratuit et découvrez comment MTJ Sécurité Privée peut répondre à vos besoins de sécurité à Bordeaux.`,

  relatedLinks: [
    lienLocal('/securite-privee-toulouse'),
    { href: PAGE_SECTEUR.slug, label: 'Tout notre secteur' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/surveillance-chantier-site', label: 'Surveillance de chantiers' },
  ]
};

export default function BordeauxPage() {
  return <SeoPageLayout data={data} />;
}
