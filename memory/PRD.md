# MTJ Sécurité Privée - Site Vitrine

## Problem Statement
Création d'un site vitrine pour l'entreprise de sécurité privée "MTJ SECURITE PRIVEE", basée à Toulon (83200).

## Core Requirements
- Sections: À propos, Nos métiers, Domaine d'intervention, Devis, Contact
- Page de recrutement avec formulaire + upload pièces jointes
- Page de contact dédiée
- Envoi d'emails via SMTP Gmail pour devis, contact, recrutement
- Infos contact: 0760738206, contactsmtjsecuriteprivee@gmail.com, 31 rue Chevalier Paul, 83200 Toulon
- Footer: lien Instagram, mentions légales, feed Instagram dynamique
- Carte de France pour les zones d'intervention
- 15 pages SEO (services + zones géographiques)
- Section Engagements (politique qualité)
- Dashboard d'analyse des visites + rapport mensuel HTML
- SEO optimal: meta tags, JSON-LD, sitemap, robots.txt
- Sécurisation complète du site

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI + react-router-dom
- **Backend**: FastAPI + Motor (MongoDB) + smtplib + APScheduler
- **Database**: MongoDB (visits, unique_visitors, report_logs, quotes, contacts, recruitments)

## What's Been Implemented

### Pages
- Homepage avec Hero, About, Services, Domains, Quote, Engagement
- Page Contact (/contact)
- Page Recrutement (/recrutement)
- Dashboard analytique (/dashboard) — protégé par mot de passe
- 15 pages SEO (services + zones géographiques)

### Backend
- Architecture modulaire (routers/forms.py, routers/analytics.py, email_service.py)
- 3 formulaires avec envoi email (devis, contact, recrutement)
- Suivi des visites (tracking)
- Sitemap XML dynamique (18 URLs)
- Feed Instagram (téléchargement + service statique)
- Rapport mensuel HTML automatique

### SEO (Complété le 13/03/2026)
- Composant SeoHead.jsx: title, meta description, canonical, OG tags, Twitter cards
- Schémas JSON-LD: Organization, LocalBusiness, Service, BreadcrumbList, FAQPage, ContactPage, WebPage
- robots.txt, Sitemap XML avec 18 pages

### Sécurité (Complété le 13/03/2026)
10 mesures de sécurité implémentées :

**P0 — Critiques :**
1. Rate limiting — 5 req/5min sur formulaires, 10/5min sur login, 60/min sur tracking
2. Validation & sanitisation des entrées — longueur max, regex email/téléphone, nettoyage HTML
3. Protection des uploads — whitelist extensions (.pdf,.doc,.docx,.jpg,.png), validation MIME, taille max 10Mo/fichier
4. Headers de sécurité HTTP — CSP, X-Frame-Options:DENY, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy
5. CORS restreint — méthodes GET/POST/OPTIONS uniquement, headers spécifiques

**P1 — Importants :**
6. Anti-spam honeypot — champ invisible + vérification du temps de soumission (min 3s)
7. Dashboard protégé par mot de passe — auth par token (1h d'expiration), stocké en sessionStorage
8. Protection NoSQL — validation stricte des paramètres de requête (days: 1-365)

**P2 — Durcissement :**
9. Masquage d'erreurs — messages génériques en production, pas de stack traces
10. Logging des requêtes suspectes — détection de patterns d'injection/XSS

### Fichiers de sécurité
- `backend/middleware/__init__.py` — SecurityHeadersMiddleware, RateLimitMiddleware, SuspiciousRequestLogger
- `backend/security.py` — Validation, honeypot, dashboard auth

## Credentials
- Email Recrutement: rex.mtjsecuriteprivee@gmail.com
- Email Commercial: commercialmtj.securiteprivee@gmail.com
- Email Contact: contactsmtjsecuriteprivee@gmail.com
- Dashboard Admin: mtj-admin-2024

## Testing Status
- SEO: 28/28 tests PASS (iteration_3.json)
- Sécurité: 19/19 tests PASS (security_test_results.xml)
- Backend refactoring: all PASS (iteration_2.json)

## Prioritized Backlog
- Aucune tâche P0/P1 en attente
- Le projet est complet
