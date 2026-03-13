import React from 'react';
import SeoPageLayout from './SeoPageLayout';

const data = {
  slug: '/securite-privee-sud-france',
  metaTitle: 'Sécurité Privée dans le Sud de la France | PACA, Occitanie, Nouvelle-Aquitaine | MTJ',
  metaDescription: 'MTJ Sécurité Privée couvre tout le sud de la France : PACA, Occitanie et Nouvelle-Aquitaine. Agents de sécurité, cynophile, SSIAP, événementiel. Grand déplacement national sur demande.',
  breadcrumbCurrent: 'Sécurité privée dans le sud de la France',
  areaServed: 'PACA, Occitanie, Nouvelle-Aquitaine, France',

  h1: 'Sécurité Privée dans le Sud de la France',
  introduction: `MTJ Sécurité Privée est implantée dans le sud de la France avec trois pôles opérationnels à Toulon, Nice et Toulouse. Cette couverture géographique nous permet d'intervenir rapidement sur l'ensemble des régions Provence-Alpes-Côte d'Azur (PACA) et Occitanie.\n\nAu-delà de cette zone principale, nous proposons des missions en grand déplacement sur l'ensemble du territoire national, pour répondre aux besoins de nos clients multi-sites ou pour des événements ponctuels.`,

  sections: [
    {
      h2: 'Notre couverture géographique',
      intro: 'Trois implantations stratégiques pour couvrir efficacement le sud de la France.',
      subsections: [
        {
          h3: 'Pôle Toulon — PACA Est et Var',
          content: 'Notre siège à Toulon couvre le département du Var et la partie orientale de la région PACA : Toulon, Hyères, Fréjus, Saint-Raphaël, Draguignan, Brignoles et leurs environs. Ce pôle est également la base de notre unité cynophile principale et de notre cellule CYNODEX.',
          list: ['Var (83) : Toulon, Hyères, Fréjus, Saint-Tropez', 'Bouches-du-Rhône (13) : Marseille, Aix-en-Provence', 'Alpes-de-Haute-Provence (04) et Hautes-Alpes (05)', 'Vaucluse (84) : Avignon, Orange, Carpentras']
        },
        {
          h3: 'Pôle Nice — Côte d\'Azur et Monaco',
          content: 'Notre présence à Nice et sur la Côte d\'Azur nous positionne au cœur du marché azuréen : Nice, Monaco, Cannes, Antibes, Grasse, Menton. Ce pôle est spécialisé dans la sécurité de prestige, la sécurité événementielle haut de gamme et la protection de propriétés de luxe.',
          list: ['Alpes-Maritimes (06) : Nice, Cannes, Antibes, Grasse', 'Principauté de Monaco', 'Arrière-pays niçois et montagne']
        }
      ]
    },
    {
      h2: 'Pôle Toulouse et grand déplacement national',
      intro: 'Notre implantation toulousaine et notre capacité de déploiement national assurent une couverture complète.',
      subsections: [
        {
          h3: 'Pôle Toulouse — Occitanie',
          content: 'Notre antenne toulousaine couvre la Haute-Garonne et les départements limitrophes d\'Occitanie : Toulouse Métropole, zones aéronautiques de Blagnac et Colomiers, Montpellier, Nîmes, Perpignan. Ce pôle répond aux besoins croissants en sécurité privée de la quatrième agglomération française.',
          list: ['Haute-Garonne (31) : Toulouse, Blagnac, Colomiers', 'Hérault (34) : Montpellier, Béziers', 'Gard (30) et Aude (11)', 'Tarn (81) et Tarn-et-Garonne (82)']
        },
        {
          h3: 'Occitanie : Toulouse, Montpellier, Perpignan',
          content: 'La région Occitanie fait partie intégrante de notre zone d\'intervention. Nous intervenons régulièrement à Toulouse, Montpellier, Nîmes, Perpignan, Béziers et Carcassonne pour des missions de gardiennage, de sécurité événementielle et de sécurité cynophile.'
        }
      ]
    },
    {
      h2: 'L\'ensemble de nos métiers déployés dans le sud',
      subsections: [
        {
          h3: 'Agents de sécurité, cynophile, SSIAP et CYNODEX',
          content: 'Quel que soit votre lieu d\'implantation dans le sud de la France, vous avez accès à l\'intégralité de notre offre de services : agents de prévention et de sécurité (APS), binômes maître-chien d\'intervention, unité CYNODEX de détection d\'explosifs et agents SSIAP pour la sécurité incendie. Cette polyvalence est un atout unique sur le marché régional.',
          list: ['Agents APS certifiés CNAPS', 'Sécurité cynophile et CYNODEX', 'SSIAP 1, 2 et 3', 'Sécurité événementielle complète']
        },
        {
          h3: 'Un interlocuteur unique pour tous vos sites',
          content: 'Pour les entreprises multi-sites implantées dans le sud de la France, MTJ Sécurité Privée offre l\'avantage d\'un prestataire unique : un seul contrat, un seul interlocuteur, une qualité de service homogène de Toulouse à Nice. Cette centralisation simplifie votre gestion et garantit une cohérence opérationnelle sur l\'ensemble de vos implantations.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quelle est votre zone d\'intervention principale ?',
      answer: 'Notre zone d\'intervention principale couvre le sud de la France : PACA (Toulon, Marseille, Nice, Monaco) et Occitanie (Toulouse, Montpellier). Nous intervenons également en grand déplacement partout en France métropolitaine.'
    },
    {
      question: 'Pouvez-vous intervenir à Paris ou Lyon ?',
      answer: 'Oui, dans le cadre de missions en grand déplacement. Nous mobilisons nos équipes pour des événements ponctuels ou des besoins temporaires sur Paris, Lyon et toute autre ville de France métropolitaine. Contactez-nous pour étudier la faisabilité de votre projet.'
    },
    {
      question: 'Proposez-vous des contrats multi-sites ?',
      answer: 'Absolument. C\'est l\'un de nos atouts majeurs. Nous gérons des contrats multi-sites avec un interlocuteur unique et une qualité de service uniforme, de Toulouse à Nice en passant par Toulon. Idéal pour les enseignes, les groupes immobiliers et les entreprises ayant plusieurs implantations dans le sud de la France.'
    }
  ],

  conclusion: `De Toulouse à Nice, de Toulon à Montpellier, MTJ Sécurité Privée est votre partenaire de sécurité dans tout le sud de la France. Notre maillage territorial, nos équipes qualifiées et notre capacité de déploiement national font de nous un acteur de référence de la sécurité privée dans le sud.\n\nContactez-nous pour un devis gratuit adapté à votre localisation et à vos besoins spécifiques.`,

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
