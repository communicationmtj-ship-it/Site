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

## Fonctionnalites Implementees

### Phase 1-5 (4-13 Mars 2026)
- Site complet : Hero, A propos, Nos Metiers, Domaines, Devis, Contact, Footer, Recrutement
- Backend FastAPI avec 3 formulaires fonctionnels + envoi emails Gmail SMTP
- Carte de France SVG, 10 pages SEO, Sitemap XML, Schema.org JSON-LD
- Analytics temps reel (/dashboard), banniere RGPD, rapport mensuel HTML
- Refactoring backend en modules (routers/forms.py, routers/analytics.py)

### Phase 6 - Distinction societe partenaire (13 Mars 2026)
- Carte "Protection Physique des Personnes" en style violet distinct
- Bandeau "MTJ SECURITE RAPPROCHEE - Societe partenaire"

### Phase 7 - Liens SEO interactifs (13 Mars 2026)
- Section "Nos Metiers" : chaque carte service a un lien "En savoir plus" vers sa page SEO
  - Agents de prevention → /agent-securite-prevention
  - Cyno d'intervention → /securite-cynophile-maitre-chien
  - CYNODEX → /detection-explosifs-cynodex
  - SSIAP → /ssiap-securite-incendie
- Section "Domaine d'intervention" : cartes cliquables avec lien vers page SEO
  - Evenementiel → /securite-evenementielle
  - Chantiers → /surveillance-chantier-site

---

## Architecture Technique

**Structure Backend:**
```
backend/
  server.py          # Entry point
  email_service.py   # Email (plain + HTML)
  routers/
    forms.py         # /api/quote, /api/contact, /api/recrutement
    analytics.py     # /api/track, /api/stats, /api/send-monthly-report
```

---

## API Endpoints

- POST /api/quote, /api/contact, /api/recrutement - Formulaires
- POST /api/track - Visite | GET /api/stats - Analytics
- POST /api/send-monthly-report - Rapport HTML
- GET /api/sitemap.xml - Sitemap

---

## Backlog Priorise

### P1 - Important
- [ ] Validation formulaires cote serveur
- [ ] Rate limiting

### P2 - Nice to have
- [ ] Temoignages clients
- [ ] Galerie photo
- [ ] Blog / Actualites
- [ ] Dashboard admin
