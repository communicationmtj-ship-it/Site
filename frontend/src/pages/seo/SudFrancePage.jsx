import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/securite-privee-sud-france',
  metaTitle: 'Sécurité Privée dans le Sud de la France | PACA, Occitanie, Nouvelle-Aquitaine | MTJ',
  metaDescription: 'MTJ Sécurité Privée couvre tout le sud de la France : PACA, Occitanie et Nouvelle-Aquitaine. Agents de sécurité, cynophile, SSIAP, événementiel. Grand déplacement national sur demande.',
  breadcrumbCurrent: 'Sécurité privée dans le sud de la France',
  areaServed: 'PACA, Occitanie, Nouvelle-Aquitaine, France',

  h1: 'Sécurité Privée dans le Sud de la France',
  // 13/11/2026 (audit du site de Mathilde, site-061, 062, 068, 069, 079) : un siège à Toulon,
  // aucune « antenne » ni « pôle » non prouvé ; le texte suit la carte de l'accueil.
  introduction: `Implantée à Toulon, MTJ Sécurité Privée intervient dans tout le sud de la France : Provence-Alpes-Côte d'Azur (PACA), Occitanie et Nouvelle-Aquitaine.\n\nAu-delà de cette zone principale, nous proposons des missions en grand déplacement sur l'ensemble du territoire national, pour répondre aux besoins de nos clients multi-sites ou pour des événements ponctuels.`,

  sections: [
    {
      h2: 'Notre couverture géographique',
      intro: 'Un siège à Toulon et des interventions dans tout le sud de la France.',
      subsections: [
        {
          h3: 'Toulon, le Var et la Provence',
          content: 'Depuis notre siège de Toulon, nous intervenons dans le Var et dans le reste de la région PACA : Toulon, Hyères, Fréjus, Saint-Raphaël, Draguignan, Brignoles, Marseille, Aix-en-Provence, Avignon et leurs environs.',
          list: ['Var (83) : Toulon, Hyères, Fréjus, Saint-Tropez', 'Bouches-du-Rhône (13) : Marseille, Aix-en-Provence', 'Alpes-de-Haute-Provence (04) et Hautes-Alpes (05)', 'Vaucluse (84) : Avignon, Orange, Carpentras']
        },
        {
          h3: 'Nice, la Côte d\'Azur et Monaco',
          content: 'Nous intervenons à Nice et sur toute la Côte d\'Azur (Cannes, Antibes, Grasse, Menton), ainsi qu\'à Monaco dans le cadre de la réglementation monégasque : sécurité de prestige, sécurité événementielle et protection de propriétés.',
          list: ['Alpes-Maritimes (06) : Nice, Cannes, Antibes, Grasse', 'Principauté de Monaco', 'Arrière-pays niçois et montagne']
        }
      ]
    },
    {
      h2: 'Occitanie, Nouvelle-Aquitaine et grand déplacement national',
      intro: 'Au-delà de la Provence et de la Côte d\'Azur, nous intervenons en Occitanie, en Nouvelle-Aquitaine et, en grand déplacement, dans toute la France métropolitaine.',
      subsections: [
        {
          h3: 'Occitanie — Toulouse, Montpellier, Nîmes, Perpignan',
          content: 'La région Occitanie fait partie de notre zone d\'intervention : Toulouse et la Haute-Garonne, Montpellier et l\'Hérault, Nîmes et le Gard, Perpignan, Béziers et Carcassonne, pour des missions de gardiennage, de sécurité événementielle et de sécurité cynophile.',
          list: ['Haute-Garonne (31) : Toulouse, Blagnac, Colomiers', 'Hérault (34) : Montpellier, Béziers', 'Gard (30) et Aude (11)', 'Tarn (81) et Tarn-et-Garonne (82)']
        },
        {
          h3: 'Nouvelle-Aquitaine — Bordeaux et le Sud-Ouest',
          content: 'Notre zone d\'intervention s\'étend aussi au sud de la Nouvelle-Aquitaine : Bordeaux et la Gironde, la Dordogne, les Landes, le Lot-et-Garonne et les Pyrénées-Atlantiques, pour des missions de gardiennage, de surveillance de chantiers et de sécurité événementielle.',
          list: ['Gironde (33) : Bordeaux, Mérignac, Libourne', 'Dordogne (24) et Lot-et-Garonne (47)', 'Landes (40) et Pyrénées-Atlantiques (64)']
        }
      ]
    },
    {
      h2: 'L\'ensemble de nos métiers déployés dans le sud',
      subsections: [
        {
          h3: 'Agents de sécurité, cynophile, SSIAP et CYNODEX',
          content: 'Quel que soit votre lieu d\'implantation dans le sud de la France, vous avez accès à l\'ensemble de notre offre de services : agents de prévention et de sécurité (APS), binômes maître-chien d\'intervention, détection d\'explosifs (CYNODEX) et agents SSIAP pour la sécurité incendie. Cette polyvalence est un atout sur le marché régional.',
          list: ['Agents APS titulaires de la carte professionnelle du CNAPS', 'Sécurité cynophile et CYNODEX', 'Agents SSIAP (niveau étudié selon le poste)', 'Sécurité événementielle complète']
        },
        {
          h3: 'Un interlocuteur unique pour tous vos sites',
          content: 'Pour les entreprises multi-sites implantées dans le sud de la France, MTJ Sécurité Privée offre l\'avantage d\'un prestataire unique : un seul contrat, un seul interlocuteur et le même niveau de service sur tous vos sites. Cette centralisation simplifie votre gestion.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quelle est votre zone d\'intervention principale ?',
      answer: 'Notre zone d\'intervention principale couvre le sud de la France : PACA (Toulon, Marseille, Nice, Monaco), Occitanie (Toulouse, Montpellier) et Nouvelle-Aquitaine (Bordeaux). Nous intervenons également en grand déplacement partout en France métropolitaine.'
    },
    {
      question: 'Pouvez-vous intervenir à Paris ou Lyon ?',
      answer: 'Oui, dans le cadre de missions en grand déplacement. Nous mobilisons nos équipes pour des événements ponctuels ou des besoins temporaires sur Paris, Lyon et toute autre ville de France métropolitaine. Contactez-nous pour étudier la faisabilité de votre projet.'
    },
    {
      question: 'Proposez-vous des contrats multi-sites ?',
      answer: 'Oui. Nous pouvons regrouper plusieurs sites dans un même contrat, avec un interlocuteur unique et le même niveau de service, dans tout le sud de la France. Idéal pour les enseignes, les groupes immobiliers et les entreprises ayant plusieurs implantations.'
    }
  ],

  conclusion: `De Toulon à Nice, de Montpellier à Toulouse et jusqu'à Bordeaux, MTJ Sécurité Privée est votre partenaire de sécurité dans tout le sud de la France. Nos équipes qualifiées et notre capacité de déploiement national sont à votre service.\n\nContactez-nous pour un devis gratuit adapté à votre localisation et à vos besoins spécifiques.`,

  relatedLinks: [
    { href: '/securite-privee-toulon', label: 'Sécurité privée à Toulon' },
    { href: '/securite-privee-nice-monaco', label: 'Sécurité privée Nice & Monaco' },
    { href: '/securite-privee-toulouse', label: 'Sécurité privée à Toulouse' },
    { href: '/grand-deplacement-securite-france', label: 'Grand déplacement national' },
    { href: '/agent-securite-prevention', label: 'Agent de prévention et sécurité' },
    { href: '/securite-evenementielle', label: 'Sécurité événementielle' },
  ]
};

export default function SudFrancePage() {
  return <SeoPageLayout data={data} />;
}
