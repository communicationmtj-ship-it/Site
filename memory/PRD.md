# PRD - MTJ SÉCURITÉ PRIVÉE - Site Vitrine

**Date de création:** 4 Mars 2026  
**Dernière mise à jour:** 4 Mars 2026

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
- ✅ Navbar avec navigation smooth scroll et logo image
- ✅ Hero section : "VOTRE SÉCURITÉ, NOTRE MISSION"
- ✅ À propos (Qui sommes-nous) avec statistiques 24/7 et 100% engagement
- ✅ Nos Métiers : Agent de prévention, Sécurité cynophile (Maître-chien), SSIAP
- ✅ Domaine d'intervention : 5 domaines (Événementiel, Sites industriels, Chantiers, Résidentiel, ERP)
- ✅ Formulaire de devis (mock)
- ✅ Formulaire de contact (mock)
- ✅ Footer complet avec navigation et informations

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

### P0 - Critique (Backend)
- [ ] Créer l'API backend FastAPI
- [ ] Implémenter envoi d'emails pour formulaires
- [ ] Intégration formulaire de devis avec backend
- [ ] Intégration formulaire de contact avec backend

### P1 - Important
- [ ] Système de gestion des demandes de devis (admin)
- [ ] Validation des formulaires côté serveur
- [ ] Rate limiting pour les soumissions

### P2 - Nice to have
- [ ] Section témoignages clients
- [ ] Galerie photo complète des interventions
- [ ] Blog / Actualités
- [ ] Espace client / Dashboard admin

---

## 🚀 Prochaines Étapes

1. **Validation client du frontend**
2. **Mise à jour des coordonnées** (téléphone, email, adresse)
3. **Développement backend** pour formulaires fonctionnels
4. **Tests end-to-end**
5. **Déploiement production**

---

## 📝 Notes Techniques

- Les formulaires sont actuellement en mock (console.log + toast)
- Les données de contact sont à personnaliser dans `/app/frontend/src/data/mock.js`
- Images hébergées via Emergent assets
- Logo au format image intégré

