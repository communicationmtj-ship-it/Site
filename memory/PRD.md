# PRD - MTJ SECURITE PRIVEE - Site Vitrine

**Date de creation:** 4 Mars 2026
**Derniere mise a jour:** 13 Mars 2026

---

## Probleme Statement Original

Construire un site vitrine pour MTJ SECURITE PRIVEE avec les sections suivantes :
- A propos de nous, Nos metiers, Domaine d'intervention, Devis, Contact

**Design requis:** Palette beige/noir/dore, style professionnel securite

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
- Chaque carte "Nos Metiers" a un lien "En savoir plus" vers sa page SEO
- Chaque carte "Domaine d'intervention" est cliquable vers sa page SEO

### Phase 8 - 3 nouvelles pages SEO domaines (13 Mars 2026)
- `/securite-sites-industriels-commerciaux` - Sites industriels, entrepots, centres commerciaux
- `/securite-residentielle` - Residences privees, coproprietes, domaines
- `/securite-erp-etablissements-public` - ERP, hopitaux, ecoles, musees
- Total : 13 pages SEO (6 metiers + 3 domaines + 4 localisations)
- Sitemap XML mis a jour, Footer mis a jour avec liens vers les 3 nouvelles pages

---

## Architecture

**Frontend:** React 19 + Tailwind CSS + Shadcn UI + Recharts
**Backend:** FastAPI + Motor + smtplib (routers/forms.py, routers/analytics.py)
**Database:** MongoDB

## 13 Pages SEO
- /agent-securite-prevention
- /securite-cynophile-maitre-chien
- /detection-explosifs-cynodex
- /ssiap-securite-incendie
- /securite-evenementielle
- /surveillance-chantier-site
- /securite-sites-industriels-commerciaux (NEW)
- /securite-residentielle (NEW)
- /securite-erp-etablissements-public (NEW)
- /securite-privee-toulon
- /securite-privee-toulouse
- /securite-privee-nice-monaco
- /securite-privee-sud-france

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
