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

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI + react-router-dom
- **Backend**: FastAPI + Motor (MongoDB) + smtplib + APScheduler
- **Database**: MongoDB (visits, unique_visitors, report_logs)

## What's Been Implemented

### Pages
- Homepage avec Hero, About, Services, Domains, Quote, Engagement
- Page Contact (/contact)
- Page Recrutement (/recrutement)
- Dashboard analytique (/dashboard)
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
- Schémas JSON-LD:
  - Homepage: Organization + LocalBusiness
  - Pages SEO: Service + LocalBusiness + BreadcrumbList + FAQPage
  - Contact: ContactPage + Organization
  - Recrutement: WebPage + Organization
- robots.txt (Disallow /dashboard, Sitemap directive)
- Sitemap XML avec 18 pages

### Autres
- Color-coding par service
- Bannière cookies RGPD
- Feed Instagram dynamique dans le footer

## Prioritized Backlog
- Aucune tâche P0/P1 en attente
- Le projet est en phase de finalisation

## Credentials
- Email Recrutement: rex.mtjsecuriteprivee@gmail.com
- Email Commercial: commercialmtj.securiteprivee@gmail.com
- Email Contact: contactsmtjsecuriteprivee@gmail.com
