import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/securite-privee-toulon',
  metaTitle: 'Société de Sécurité Privée à Toulon (83) | MTJ Sécurité Privée',
  metaDescription: 'MTJ Sécurité Privée, société de sécurité basée à Toulon. Agents de sécurité, maître-chien, SSIAP, sécurité événementielle dans le Var et en PACA. Devis gratuit — 07 60 73 82 06.',
  breadcrumbCurrent: 'Sécurité privée à Toulon',
  areaServed: 'Toulon, Le Var, PACA',

  h1: 'Société de Sécurité Privée à Toulon — Var (83)',
  introduction: `Basée au 31 rue Chevalier Paul à Toulon, MTJ Sécurité Privée est votre partenaire de proximité pour tous vos besoins en sécurité dans le Var et la région PACA. Notre connaissance approfondie du tissu économique et social toulonnais nous permet de proposer des prestations parfaitement adaptées aux réalités locales.\n\nCapitale économique du Var, Toulon accueille une activité portuaire majeure (port militaire, port de commerce, ferries vers la Corse), des événements culturels et sportifs d'envergure et un tissu de PME-PMI dynamique. Chacun de ces secteurs génère des besoins spécifiques en matière de sécurité.`,

  sections: [
    {
      h2: 'Nos services de sécurité à Toulon et dans le Var',
      intro: 'MTJ Sécurité Privée déploie l\'ensemble de ses compétences sur Toulon et ses environs.',
      subsections: [
        {
          h3: 'Gardiennage et surveillance à Toulon',
          content: 'Nos agents de prévention et de sécurité assurent la surveillance de sites industriels, commerciaux et résidentiels dans toute l\'agglomération toulonnaise. Du centre-ville aux zones d\'activité de La Valette, La Garde, Ollioules et La Seyne-sur-Mer, nos équipes sont opérationnelles 24h/24 et 7j/7. Le gardiennage inclut les rondes de surveillance, le contrôle d\'accès et la gestion des systèmes d\'alarme.',
          list: ['Toulon centre et littoral', 'Zones d\'activité La Valette, La Garde', 'La Seyne-sur-Mer, Ollioules, Sanary', 'Hyères, Le Pradet, Carqueiranne']
        },
        {
          h3: 'Sécurité événementielle à Toulon',
          content: 'Toulon accueille chaque année de nombreux événements : matchs du RCT (Rugby Club Toulonnais) au stade Mayol, le festival de musique Six Fours, les marchés de Noël, les fêtes de la Saint-Jean et les régates nautiques. MTJ Sécurité Privée sécurise ces manifestations avec des dispositifs dimensionnés pour chaque type d\'événement, en coordination avec les autorités municipales et préfectorales.'
        }
      ]
    },
    {
      h2: 'Zones d\'intervention dans le Var',
      intro: 'Notre implantation à Toulon nous permet de couvrir l\'ensemble du département du Var avec des délais d\'intervention courts.',
      subsections: [
        {
          h3: 'Toulon Provence Méditerranée et bassin toulonnais',
          content: 'L\'agglomération Toulon Provence Méditerranée regroupe 12 communes et plus de 430 000 habitants. Nos équipes interviennent sur l\'ensemble de ce territoire : Toulon, La Seyne-sur-Mer, Hyères, La Valette-du-Var, La Garde, Ollioules, Le Pradet, Carqueiranne, Le Revest-les-Eaux, Saint-Mandrier, Six-Fours-les-Plages et La Crau.'
        },
        {
          h3: 'Var Est : Fréjus, Saint-Raphaël, Draguignan',
          content: 'Nous assurons des prestations de sécurité dans l\'est du Var : Fréjus, Saint-Raphaël, Draguignan, Brignoles, Le Luc et leurs environs. Ces communes accueillent des zones commerciales, des chantiers de construction et des événements saisonniers qui nécessitent un dispositif de sécurité professionnel.'
        },
        {
          h3: 'Presqu\'île de Saint-Tropez et littoral varois',
          content: 'La presqu\'île de Saint-Tropez et le littoral varois attirent une clientèle internationale et des événements de prestige. MTJ Sécurité Privée intervient pour la sécurité de propriétés privées, d\'événements exclusifs, de yachts et de villas de luxe dans les communes de Saint-Tropez, Ramatuelle, Cogolin, Grimaud et Sainte-Maxime.'
        }
      ]
    },
    {
      h2: 'Pourquoi choisir MTJ Sécurité Privée à Toulon',
      subsections: [
        {
          h3: 'Proximité et réactivité locale',
          content: 'Basés physiquement à Toulon, nous connaissons le terrain, les acteurs locaux et les enjeux sécuritaires du département. Cette proximité se traduit par des temps de réponse courts, une capacité à mobiliser rapidement des agents supplémentaires et un suivi personnalisé de chaque client. Vous n\'êtes pas un numéro de contrat : vous avez un interlocuteur dédié.'
        },
        {
          h3: 'Partenaire des entreprises et collectivités du Var',
          content: 'MTJ Sécurité Privée accompagne les entreprises de toutes tailles (artisans, PME, grands groupes), les collectivités territoriales et les organisateurs d\'événements du Var. Notre réputation repose sur notre professionnalisme, notre fiabilité et la qualité de nos prestations.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Où se situe MTJ Sécurité Privée à Toulon ?',
      answer: 'Notre siège social est situé au 31 rue Chevalier Paul, 83200 Toulon, à proximité du centre-ville et de la rade de Toulon. Vous pouvez nous joindre par téléphone au 07 60 73 82 06 ou par email à mtj.securiteprivee@gmail.com.'
    },
    {
      question: 'Intervenez-vous en urgence sur Toulon ?',
      answer: 'Oui. Grâce à notre implantation locale, nous pouvons mobiliser des agents en urgence sur Toulon et l\'agglomération TPM. Pour les demandes urgentes, contactez-nous directement au 07 60 73 82 06.'
    },
    {
      question: 'Quelles certifications possèdent vos agents ?',
      answer: 'Tous nos agents sont titulaires de la carte professionnelle délivrée par le CNAPS. Selon les missions, ils possèdent également les certifications CQP APS, CQP Agent Cynophile, SSIAP 1/2/3 et SST (Sauveteur Secouriste du Travail). MTJ Sécurité Privée est elle-même autorisée par le CNAPS à exercer ses activités de sécurité privée.'
    }
  ],

  conclusion: `Toulon et le Var méritent une sécurité à la hauteur de leur dynamisme économique et culturel. MTJ Sécurité Privée, acteur local ancré dans le tissu toulonnais, vous apporte cette garantie au quotidien.\n\nFaites confiance à une entreprise de proximité pour protéger vos sites, vos événements et vos collaborateurs. Contactez-nous dès aujourd'hui pour un devis gratuit.`,

  relatedLinks: [
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée Nice & Monaco' },
    { href: '/securite-privee-toulouse', label: 'Sécurité privée à Toulouse' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-cynophile-maitre-chien', label: 'Sécurité cynophile et maître-chien' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
    { href: '/ssiap-securite-incendie', label: 'SSIAP — Sécurité incendie' },
  ]
};

export default function ToulonPage() {
  return <SeoPageLayout data={data} />;
}
