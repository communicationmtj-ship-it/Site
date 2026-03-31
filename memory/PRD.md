# MTJ Sécurité Privée - Site Vitrine

## Problem Statement
Création d'un site vitrine pour l'entreprise de sécurité privée "MTJ SECURITE PRIVEE", basée à Toulon (83200).

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI + react-router-dom
- **Backend**: FastAPI + Motor (MongoDB) + smtplib + APScheduler
- **Database**: MongoDB

## What's Been Implemented

### Pages
- Homepage (Hero, About, Services, Domains, Quote, Engagement)
- Contact (/contact), Recrutement (/recrutement)
- Dashboard analytique (/dashboard) — protégé par mot de passe
- 15 pages SEO (services + zones géographiques)

### SEO (13/03/2026)
- SeoHead.jsx, JSON-LD schemas, robots.txt, Sitemap XML (18 pages)

### Sécurité (13/03/2026)
- Rate limiting, validation entrées, protection uploads, headers HTTP, CORS
- Anti-spam honeypot, dashboard auth, protection NoSQL, masquage erreurs, logging suspect

### Revue de Code (31/03/2026)
- Import circulaire corrigé (database.py module partagé)
- XSS protection (safeJsonLd helper sur 7 instances)
- Secret hardcodé supprimé des tests
- Hook dependencies corrigées
- Console statements production supprimés
- Empty catch blocks corrigés

### UI/UX Récents
- Bouton "DEVIS GRATUIT" CTA dans la navbar
- Cartes Nos Métiers entièrement cliquables
- Placeholder guidé dans le formulaire devis
- Barre Avis Google dans le footer (Toulon, Nîmes, Sécurité Rapprochée)
- Pictogramme patte de chien pour les services cynophiles
- CQP APS renommé en TFP APS

## Credentials
- Dashboard Admin: mtj-admin-2024
- Email Recrutement: rex.mtjsecuriteprivee@gmail.com
- Email Commercial: commercialmtj.securiteprivee@gmail.com
- Email Contact: contactsmtjsecuriteprivee@gmail.com

## Prioritized Backlog
- P2: Refactoring composants volumineux (Dashboard, Recrutement, Quote)
- P2: Extraction fonctions analytics backend
