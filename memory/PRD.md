# MTJ Sécurité Privée - Site Vitrine

## Problem Statement
Site vitrine pour "MTJ SECURITE PRIVEE", entreprise de sécurité privée basée à Toulon (83000, décision de Théo du 04/11/2026).
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
- 10 pages métiers, 12 pages de villes (Bordeaux, Toulouse, Nice et Monaco, Toulon, déjà en ligne ; Montpellier, Nîmes, Perpignan, Marseille, Avignon, Lyon, Grenoble, Annecy, ajoutées ; choix de Théo du 13/11/2026 : « sur tout le secteur », sans adresse locale, une seule adresse réelle : le siège de Toulon ; Théo, 15/11/2026, formulaire 3/4 : les 12 sortent, sans preuve ni phrase inventée), la page de tout le secteur et le grand déplacement. Les pages de villes sont reliées dans la colonne « Zones d'intervention » du pied de page.
- Secteur (choix de Théo du 13/11/2026, « partout ») : « de Bordeaux à Nice jusqu'à Annecy », 33 départements et Monaco, liste recopiée de celle du logiciel MTJ (frontend/src/data/perimetre.js)

### Règle du texte affiché (Théo, 15/11/2026 05:56)
« soit tu met pas soit tu laisse ce qui etait » : tout texte affiché est celui du site en ligne du 04/11/2026 (9561a0a), mot pour mot, sauf les décisions de Théo :
- secteur : seul le groupe de mots « sud de la France » (ou son équivalent) devient « de Bordeaux à Nice jusqu'à Annecy » ;
- adresse affichée contact@mtj-securite-privee.fr ;
- aucun chiffre non prouvé (pourcentage, population, classement, nombre, note d'avis) : le chiffre est retiré, la phrase n'est pas réécrite ;
- CYNODEX = diplôme du maître-chien de détection d'explosifs (jamais « unité » ni « équipe ») ; SSIAP 1, 2 et 3 affirmés ;
- aucune agence, aucun pôle, aucune équipe basée hors du siège de Toulon ; pas de bureau (Théo, 15/11/2026) ;
- mention CNAPS (autorisation + article L612-14) une fois par société, dans le pied de page ;
- titre de l'accueil dans Google : celui du site en ligne ; Monaco et délais d'intervention : texte d'origine (« garder les deux ») ;
- restent : pages Mentions légales et Politique de confidentialité, page introuvable (404), bandeau des cookies conforme, cases de consentement des formulaires, et tout ce qui est invisible (pré-rendu, canoniques, plan du site, titres et descriptions pour Google, nginx, mails vers NOTIFY_EMAIL, connexion du tableau).
Inventaire des écarts restants : maquette du site (dossier Site-maquette-15-11, hors dépôt).

### SEO
- Pré-rendu (choix de Théo du 13/11/2026, « pré-rendu Google ») : à la construction de l'image, frontend/scripts/prerender.js écrit un HTML complet par page publique (titre, description, canonique propre, contenu, liens) dans build/prerendu ; nginx le sert d'abord, React reprend la page ; plan du site = pages pré-rendues (frontend/scripts/pages-publiques.js)
- SeoHead.jsx (titre, description, canonique), JSON-LD dans HTML statique (Organization, LocalBusiness, GeoCoordinates ; aucune note ni nombre d'avis écrits à la main depuis le 13/11/2026)
- JSON-LD dynamiques (Service, BreadcrumbList, FAQPage, ContactPage, WebPage)
- robots.txt, Sitemap XML (pages pré-rendues)
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
- Adresse affichée sur tout le site : contact@mtj-securite-privee.fr (choix de Théo du 13/11/2026, « Site email: A contact OVH ») ; la redirection de cette boîte OVH vers sa boîte Gmail se pose dans OVH (geste de Théo).
- Mails du site destinés à l'équipe (devis, contact, candidature, rapport mensuel) : envoyés vers l'adresse de la variable NOTIFY_EMAIL du serveur du site ; valeur décidée par Théo le 13/11/2026 : mtj.securiteprivee@gmail.com (« REPORT SUR mtj.securiteprivee#gmail.com »). Variable absente : le mail part vers sa boîte d'envoi, avec un avertissement au journal.
- Boîtes d'envoi (inchangées) : Email Recrutement: rex.mtjsecuriteprivee@gmail.com
- Email Commercial: commercialmtj.securiteprivee@gmail.com
- Email Contact: contactsmtjsecuriteprivee@gmail.com

## Prioritized Backlog
- Aucune tâche P0/P1 en attente
