import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { ZONE_DESSERVIE } from '../../data/perimetre';

// 15/11/2026 (Théo, formulaire 3/4 : les pages de villes sortent, sans preuve) : texte du site en ligne,
// sans chiffre (population, classement), sans client nommé, sans implantation hors du siège de Toulon ;
// secteur « de Bordeaux à Nice jusqu'à Annecy », adresse contact@, CYNODEX = diplôme du maître-chien.
// Relecture adverse du 15/11/2026 : une phrase d'implantation (pôle, antenne, présence hors de Toulon) est
// retirée sans rien écrire à sa place ; le reste de la page est mot pour mot celui du site en ligne, et seul
// le groupe « (tout) le sud de la France » est remplacé par le secteur (la liste de villes qui le suit reste).
const data = {
  slug: '/securite-privee-sud-france',
  metaTitle: 'Sécurité Privée de Bordeaux à Nice jusqu\'à Annecy | MTJ',
  metaDescription: 'MTJ Sécurité Privée intervient de Bordeaux à Nice jusqu\'à Annecy : Nouvelle-Aquitaine, Occitanie, Provence-Alpes-Côte d\'Azur, Auvergne-Rhône-Alpes et Monaco. Agents de sécurité, cynophile, SSIAP, événementiel. Grand déplacement national sur demande.',
  breadcrumbCurrent: 'Sécurité privée de Bordeaux à Nice jusqu\'à Annecy',
  areaServed: ZONE_DESSERVIE,

  h1: 'Sécurité Privée de Bordeaux à Nice jusqu\'à Annecy',
  introduction: `Cette couverture géographique nous permet d'intervenir rapidement sur l'ensemble des régions Provence-Alpes-Côte d'Azur (PACA) et Occitanie.\n\nAu-delà de cette zone principale, nous proposons des missions en grand déplacement sur l'ensemble du territoire national, pour répondre aux besoins de nos clients multi-sites ou pour des événements ponctuels.`,

  sections: [
    {
      h2: 'Notre couverture géographique',
      subsections: [
        {
          h3: 'Pôle Toulon — PACA Est et Var',
          content: 'Notre siège à Toulon couvre le département du Var et la partie orientale de la région PACA : Toulon, Hyères, Fréjus, Saint-Raphaël, Draguignan, Brignoles et leurs environs. Ce pôle est également la base de notre unité cynophile principale et de nos maîtres-chiens CYNODEX.',
          list: ['Var (83) : Toulon, Hyères, Fréjus, Saint-Tropez', 'Bouches-du-Rhône (13) : Marseille, Aix-en-Provence', 'Alpes-de-Haute-Provence (04) et Hautes-Alpes (05)', 'Vaucluse (84) : Avignon, Orange, Carpentras']
        },
        {
          h3: 'Côte d\'Azur et Monaco',
          list: ['Alpes-Maritimes (06) : Nice, Cannes, Antibes, Grasse', 'Principauté de Monaco', 'Arrière-pays niçois et montagne']
        }
      ]
    },
    {
      h2: 'Toulouse et grand déplacement national',
      subsections: [
        {
          h3: 'Toulouse — Occitanie',
          list: ['Haute-Garonne (31) : Toulouse, Blagnac, Colomiers', 'Hérault (34) : Montpellier, Béziers', 'Gard (30) et Aude (11)', 'Tarn (81) et Tarn-et-Garonne (82)']
        },
        {
          h3: 'Occitanie : Toulouse, Montpellier, Perpignan',
          content: 'La région Occitanie fait partie intégrante de notre zone d\'intervention. Nous intervenons régulièrement à Toulouse, Montpellier, Nîmes, Perpignan, Béziers et Carcassonne pour des missions de gardiennage, de sécurité événementielle et de sécurité cynophile.'
        }
      ]
    },
    {
      h2: 'L\'ensemble de nos métiers déployés de Bordeaux à Nice jusqu\'à Annecy',
      subsections: [
        {
          h3: 'Agents de sécurité, cynophile, SSIAP et CYNODEX',
          content: 'Quel que soit votre lieu d\'implantation de Bordeaux à Nice jusqu\'à Annecy, vous avez accès à l\'intégralité de notre offre de services : agents de prévention et de sécurité (APS), binômes maître-chien d\'intervention, maîtres-chiens CYNODEX de détection d\'explosifs et agents SSIAP pour la sécurité incendie. Cette polyvalence est un atout unique sur le marché régional.',
          list: ['Agents APS certifiés CNAPS', 'Sécurité cynophile et CYNODEX', 'SSIAP 1, 2 et 3', 'Sécurité événementielle complète']
        },
        {
          h3: 'Un interlocuteur unique pour tous vos sites',
          content: 'Pour les entreprises multi-sites implantées de Bordeaux à Nice jusqu\'à Annecy, MTJ Sécurité Privée offre l\'avantage d\'un prestataire unique : un seul contrat, un seul interlocuteur, une qualité de service homogène de Bordeaux à Nice jusqu\'à Annecy. Cette centralisation simplifie votre gestion et garantit une cohérence opérationnelle sur l\'ensemble de vos implantations.'
        }
      ]
    }
  ],

  faq: [
    {
      question: 'Quelle est votre zone d\'intervention principale ?',
      answer: 'Notre zone d\'intervention principale couvre de Bordeaux à Nice jusqu\'à Annecy : PACA (Toulon, Marseille, Nice, Monaco) et Occitanie (Toulouse, Montpellier). Nous intervenons également en grand déplacement partout en France métropolitaine.'
    },
    {
      question: 'Pouvez-vous intervenir à Paris ?',
      answer: 'Oui, dans le cadre de missions en grand déplacement. Nous mobilisons nos équipes pour des événements ponctuels ou des besoins temporaires sur Paris et toute autre ville de France métropolitaine. Contactez-nous pour étudier la faisabilité de votre projet.'
    },
    {
      question: 'Proposez-vous des contrats multi-sites ?',
      answer: 'Absolument. C\'est l\'un de nos atouts majeurs. Nous gérons des contrats multi-sites avec un interlocuteur unique et une qualité de service uniforme, de Bordeaux à Nice jusqu\'à Annecy, en passant par Toulon. Idéal pour les enseignes, les groupes immobiliers et les entreprises ayant plusieurs implantations de Bordeaux à Nice jusqu\'à Annecy.'
    }
  ],

  conclusion: `MTJ Sécurité Privée est votre partenaire de sécurité de Bordeaux à Nice jusqu'à Annecy. Nos équipes qualifiées et notre capacité de déploiement national font de nous un acteur de référence de la sécurité privée de Bordeaux à Nice jusqu'à Annecy.\n\nContactez-nous pour un devis gratuit adapté à votre localisation et à vos besoins spécifiques.`,

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
