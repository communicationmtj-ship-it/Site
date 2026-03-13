# PRD - MTJ SECURITE PRIVEE - Site Vitrine

**Date de creation:** 4 Mars 2026
**Derniere mise a jour:** 13 Mars 2026

---

## Probleme Statement Original

Construire un site vitrine pour MTJ SECURITE PRIVEE avec les sections suivantes :
- A propos de nous
- Nos metiers
- Domaine d'intervention
- Devis
- Contact

**Design requis:** Palette beige/noir/dore, style professionnel securite base sur la maquette fournie

---

## User Personas

**Persona Principal: Chef d'Entreprise / Responsable Securite**
- Recherche des services de securite professionnels
- Besoin de comprendre rapidement les services offerts
- Souhaite demander un devis facilement
- Veut une entreprise fiable et professionnelle

---

## Fonctionnalites Implementees

### Phase 1 - Frontend (4 Mars 2026)
- Navbar, Hero, A propos, Nos Metiers, Domaine d'intervention, Devis, Contact, Footer
- Page Recrutement (/recrutement) avec formulaire de candidature et televersement de fichiers

### Phase 2 - Backend & Emails (4-5 Mars 2026)
- API FastAPI (endpoints: /api/quote, /api/contact, /api/recrutement)
- Stockage fichiers dans /app/backend/uploads/
- Envoi d'emails fonctionnel pour les 3 formulaires via Gmail SMTP
- Stockage des soumissions dans MongoDB

### Phase 3 - Ajustements visuels (6 Mars 2026)
- Carte de France SVG vectorielle (FranceMap.jsx) avec departements, zones, marqueurs
- Menu horizontal fixe sur desktop

### Phase 4 - SEO (6 Mars 2026)
- 10 pages SEO (6 metiers + 4 localisations) avec H1/H2/H3, FAQ, Schema.org JSON-LD
- Sitemap XML dynamique (/api/sitemap.xml)
- Maillage interne via footer
- Donnees structurees LocalBusiness et FAQPage

### Phase 5 - Analytics & RGPD (Mars 2026)
- Tableau de bord d'analyse en temps reel (/dashboard)
- Suivi des visites avec geolocalisation IP
- Banniere de consentement aux cookies (RGPD)

### Phase 6 - Rapport mensuel HTML & Refactoring (13 Mars 2026)
- Rapport mensuel envoye par email en format HTML structure et professionnel
  - En-tete avec logo MTJ et periode
  - Cartes de synthese (visites totales, visiteurs uniques)
  - Compteurs formulaires (devis, contacts, candidatures)
  - Tableaux detailles : pages, pays, villes, IPs, devis, contacts, candidatures
  - Footer avec coordonnees
- Refactoring backend : decomposition du monolithe server.py en modules :
  - `server.py` : point d'entree slim (middleware, scheduler, sitemap)
  - `routers/forms.py` : endpoints formulaires (quote, contact, recrutement)
  - `routers/analytics.py` : endpoints analytics (track, stats, send-monthly-report)
  - `email_service.py` : service email avec support HTML

---

## Architecture Technique

**Stack:**
- Frontend: React 19 + Tailwind CSS + Shadcn UI + Recharts
- Backend: FastAPI + Motor + Pydantic + smtplib + APScheduler
- Database: MongoDB
- Icons: Lucide React
- Toast: Sonner

**Structure Backend:**
```
backend/
  server.py          # Entry point: app, middleware, scheduler, sitemap
  email_service.py   # Email sending (plain + HTML)
  routers/
    forms.py         # /api/quote, /api/contact, /api/recrutement
    analytics.py     # /api/track, /api/stats, /api/send-monthly-report
```

---

## API Endpoints

- `GET /api/` - Health check
- `POST /api/quote` - Soumission devis
- `POST /api/contact` - Soumission contact
- `POST /api/recrutement` - Soumission candidature
- `POST /api/track` - Enregistre visite
- `GET /api/stats` - Donnees analytics
- `POST /api/send-monthly-report` - Envoi rapport mensuel HTML
- `GET /api/sitemap.xml` - Sitemap XML

---

## Backlog Priorise

### P0 - Critique
- [x] Tous les formulaires fonctionnels avec envoi email
- [x] Rapport mensuel HTML structure
- [x] Refactoring backend en modules

### P1 - Important
- [ ] Validation des formulaires cote serveur
- [ ] Rate limiting pour les soumissions

### P2 - Nice to have
- [ ] Section temoignages clients
- [ ] Galerie photo des interventions
- [ ] Blog / Actualites
- [ ] Espace client / Dashboard admin
