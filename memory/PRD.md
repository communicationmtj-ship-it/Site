# MTJ Sécurité Privée - Site Vitrine

## Problem Statement
Site vitrine pour "MTJ SECURITE PRIVEE", entreprise de sécurité privée basée à Toulon (83200).
Domaine : https://mtj-securite-privee.fr

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI + react-router-dom
- **Backend**: FastAPI + Motor (MongoDB) + smtplib + APScheduler
- **Database**: MongoDB

## What's Been Implemented

### Pages
- Homepage (Hero, About, Services, Domains, Quote, Engagement)
- Contact (/contact), Recrutement (/recrutement)
- Dashboard analytique (/dashboard) — ouvert avec le compte fondateur du logiciel MTJ (depuis le 13/11/2026)
- 15 pages SEO (services + zones géographiques)

### SEO
- SeoHead.jsx, JSON-LD dans HTML statique (Organization, LocalBusiness, AggregateRating, GeoCoordinates)
- JSON-LD dynamiques (Service, BreadcrumbList, FAQPage, ContactPage, WebPage)
- robots.txt, Sitemap XML (18 pages)
- Bouton CTA "Devis Gratuit" dans la navbar

### Sécurité
- Rate limiting, validation entrées, protection uploads, headers HTTP, CORS
- Anti-spam honeypot, dashboard auth, protection NoSQL, masquage erreurs, logging suspect

### Revues de Code (2x)
- Import circulaire corrigé (database.py)
- XSS protection (safeJsonLd)
- 12 array-index-as-key corrigés
- Console statements production supprimés
- Form handlers backend refactorisés (helpers extraits)
- Secrets env-only

### UI/UX
- Bouton CTA "Devis Gratuit" navbar
- Cartes Nos Métiers entièrement cliquables
- Placeholder guidé formulaire devis
- Barre Avis Google footer (Toulon, Nîmes, Sécurité Rapprochée)
- Pictogramme patte de chien services cynophiles
- TFP APS (remplacé CQP APS)

## Credentials
- Dashboard : compte fondateur du logiciel MTJ (adresse e-mail et mot de passe du logiciel, vérifiés par sa route de connexion ; décision de Théo du 13/11/2026). Aucun mot de passe propre au site : l'ancien mot de passe par défaut est supprimé du code, DASHBOARD_PASSWORD et DASHBOARD_USER ne sont plus lus. Variable facultative du serveur du site : LOGICIEL_URL (par défaut https://app.mtj-securite-privee.fr, https exigé).
- Email Recrutement: rex.mtjsecuriteprivee@gmail.com
- Email Commercial: commercialmtj.securiteprivee@gmail.com
- Email Contact: contactsmtjsecuriteprivee@gmail.com

## Prioritized Backlog
- Aucune tâche P0/P1 en attente
