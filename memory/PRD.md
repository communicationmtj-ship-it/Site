# PRD - MTJ SÉCURITÉ PRIVÉE - Site Vitrine

**Date de création:** 4 Mars 2026  
**Dernière mise à jour:** 6 Mars 2026

---

## 📋 Problème Statement Original

Construire un site vitrine pour MTJ SÉCURITÉ PRIVÉE avec les sections suivantes :
- À propos de nous
- Nos métiers
- Domaine d'intervention
- Devis
- Contact

**Design requis:** Palette beige/noir/doré, style professionnel sécurité basé sur la maquette fournie

---

## 🎯 User Personas

**Persona Principal: Chef d'Entreprise / Responsable Sécurité**
- Recherche des services de sécurité professionnels
- Besoin de comprendre rapidement les services offerts
- Souhaite demander un devis facilement
- Veut une entreprise fiable et professionnelle

---

## ✅ Fonctionnalités Implémentées

### Phase 1 - Frontend avec Mock Data (4 Mars 2026)

**Sections créées:**
- Navbar avec navigation smooth scroll et logo image
- Hero section : "VOTRE SÉCURITÉ, NOTRE MISSION"
- À propos (Qui sommes-nous) avec statistiques 24/7 et 100% engagement
- Nos Métiers : Agent de prévention, Sécurité cynophile (Cyno d'Intervention + CYNODEX), SSIAP
- Domaine d'intervention : 5 domaines (Événementiel, Sites industriels, Chantiers, Résidentiel, ERP)
- Formulaire de devis avec pièce jointe
- Formulaire de contact avec pièce jointe
- Footer complet avec lien Instagram et mentions légales
- Page Recrutement (/recrutement) avec formulaire de candidature et téléversement de fichiers

### Phase 2 - Backend & Emails (4-5 Mars 2026)

- API FastAPI opérationnelle (endpoints: /api/devis, /api/contact, /api/recrutement)
- Stockage fichiers téléversés dans /app/backend/uploads/
- Envoi d'emails fonctionnel pour le recrutement (rex.mtjsecuriteprivee@gmail.com)
- Stockage des soumissions dans MongoDB

### Phase 3 - Ajustements visuels (6 Mars 2026)

- Carte de France SVG vectorielle créée (composant FranceMap.jsx) avec départements, zones nord/sud, marqueurs villes
- Utilisation du package @svg-maps/france.departments pour les contours départementaux
- Menu horizontal fixe sur desktop

**Design:**
- Palette : Noir (#000), Beige/Stone (#d4c5b9), Amber/Doré (#fbbf24)
- Images réelles du client intégrées
- Animations et transitions fluides
- Responsive design
- Icônes Lucide React (Shield, Flame, etc.)

**Composants créés:**
- `/app/frontend/src/components/Navbar.jsx`
- `/app/frontend/src/components/Hero.jsx`
- `/app/frontend/src/components/About.jsx`
- `/app/frontend/src/components/Services.jsx`
- `/app/frontend/src/components/Domains.jsx`
- `/app/frontend/src/components/Quote.jsx`
- `/app/frontend/src/components/Contact.jsx`
- `/app/frontend/src/components/Footer.jsx`
- `/app/frontend/src/data/mock.js`

**Modifications demandées:**
- ✅ Logo image intégré (remplace le texte)
- ✅ Suppression de "+10 ans d'expérience"

---

## 📊 Architecture Technique

**Stack:**
- Frontend: React 19 + Tailwind CSS
- Components: Shadcn UI
- Icons: Lucide React
- Toast: Sonner

**Structure des données (mock.js):**
```javascript
- companyInfo: Informations entreprise
- aboutUs: Présentation
- services: 3 services détaillés
- interventionDomains: 5 domaines
- quoteForm: Configuration formulaire devis
- contactInfo: Configuration contact
```

---

## 🎯 Backlog Priorisé

### P0 - Critique
- [x] Créer l'API backend FastAPI
- [x] Carte de France avec image stylisée du client
- [x] Envoi d'emails pour recrutement (rex.mtjsecuriteprivee@gmail.com)
- [ ] Envoi d'emails devis/contact (BLOQUÉ - mot de passe d'application Gmail pour mtj.securiteprivee@gmail.com requis)

### P1 - Important
- [ ] Validation des formulaires côté serveur
- [ ] Rate limiting pour les soumissions

### P2 - Nice to have
- [ ] Section témoignages clients
- [ ] Galerie photo complète des interventions
- [ ] Blog / Actualités
- [ ] Espace client / Dashboard admin

---

### Phase 4 - SEO (6 Mars 2026)

- 10 pages SEO créées (6 métiers + 4 localisations) avec structure H1/H2/H3, FAQ, Schema.org JSON-LD
- Sitemap XML dynamique (/api/sitemap.xml)
- Maillage interne : liens croisés entre pages + liens dans le footer
- Données structurées LocalBusiness et FAQPage sur chaque page

1. **Obtenir le mot de passe d'application Gmail** pour `mtj.securiteprivee@gmail.com` (activer envoi emails devis/contact)
2. **Refactoring** : Extraire les sections de Home.js en composants séparés (déjà fait partiellement)
3. **Tests end-to-end**
4. **Déploiement production**

---

## Notes Techniques

- Envoi d'emails pour recrutement : FONCTIONNEL (rex.mtjsecuriteprivee@gmail.com / mot de passe app dans backend/.env)
- Envoi d'emails pour devis/contact : NON FONCTIONNEL (en attente des identifiants SMTP)
- Images hébergées via Emergent assets
- Logo au format image intégré

