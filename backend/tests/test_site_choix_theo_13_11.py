"""Essais hors ligne des choix de Théo du 13/11/2026 sur le site vitrine (formulaire « site vitrine (2/3) »)
et des constats du bilan SEO du 13/11/2026, construits le 15/11/2026.

1. e-mail affiché contact@ ; mails de l'équipe vers l'adresse de NOTIFY_EMAIL ;
2. mentions légales : Théo MERCIER, Président, directeur de la publication ; forme, capital et date
   d'immatriculation recopiées du Kbis ; TVA vérifiée ;
3. durées de conservation affichées, aucun effacement automatique annoncé ni programmé ;
4. périmètre de Bordeaux à Nice jusqu'à Annecy partout (34 codes du logiciel MTJ) ;
5. pages locales d'intervention, contenu propre à chaque ville, une seule adresse (Toulon) ;
6. CYNODEX et SSIAP 2-3 : repli prudent gardé ; 7. aucun chiffre sur l'accueil ;
9. pré-rendu : un HTML par page publique, canonique propre, plan du site = pages pré-rendues.

Aucun serveur, aucune base, aucun envoi : les envois de mail sont remplacés par une fonction qui note
l'adresse visée. Les noms et adresses de visiteurs sont fictifs.

Lancement (depuis backend/) :
    python -m pytest -x -q -p no:cacheprovider tests/test_site_choix_theo_13_11.py
"""
import json
import logging
import os
import re
import sys
from itertools import combinations
from pathlib import Path

import pytest

BACKEND = Path(__file__).resolve().parent.parent
REPO = BACKEND.parent
FRONT = REPO / "frontend"
SRC = FRONT / "src"
SEO = SRC / "pages" / "seo"

if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

os.environ.setdefault("MONGO_URL", "mongodb://127.0.0.1:1")
os.environ.setdefault("DB_NAME", "essai_site_15_11")

VISITEUR_NOM = "Visiteur Fictif"
VISITEUR_MAIL = "visiteur.fictif@example.com"
EQUIPE_FICTIVE = "equipe.fictive@example.com"


def _lire(path: Path) -> str:
    return path.read_text(encoding="utf-8")


# ─── 4. Périmètre : la liste du logiciel MTJ, partout ──────────────────────────

# Recopie de DEPARTEMENTS_DEFAUT du logiciel MTJ (backend/utils/perimetre_commercial.py, main du
# 13/10/2026, relue le 15/11/2026) : 33 départements et Monaco, « de Bordeaux jusqu'à Nice en
# remontant jusqu'à Annecy » (Théo, 11/10/2026).
CODES_LOGICIEL = [
    "33", "40", "64", "47", "24", "31", "32", "65", "09", "81", "82", "11", "66", "34", "30", "12", "46",
    "48", "84", "13", "83", "06", "04", "05", "98", "26", "07", "38", "69", "73", "74", "01", "15", "43",
]
FICHIER_LOGICIEL = Path(os.environ.get(
    "MTJ_PERIMETRE_LOGICIEL", str(Path.home() / "Logiciel" / "backend" / "utils" / "perimetre_commercial.py")))


def _codes_site() -> list:
    return re.findall(r"\{ code: '(\w+)', nom: '[^']+', region: ", _lire(SRC / "data" / "perimetre.js"))


def test_perimetre_du_site_egal_a_celui_du_logiciel():
    assert _codes_site() == CODES_LOGICIEL
    assert len(CODES_LOGICIEL) == 34


def test_perimetre_du_logiciel_relu_quand_il_est_sur_la_machine():
    if not FICHIER_LOGICIEL.is_file():
        pytest.skip("dépôt du logiciel MTJ absent de cette machine : comparaison faite avec la recopie")
    texte = _lire(FICHIER_LOGICIEL).split("CODES_DEFAUT")[0]
    codes = re.findall(r'\{"code": "(\w+)", "nom": "[^"]+", "region": "[^"]+"\}', texte)
    assert codes == CODES_LOGICIEL, "le périmètre du logiciel a changé : recopier la liste dans perimetre.js"


def test_la_carte_colorie_le_perimetre():
    carte = _lire(SRC / "components" / "FranceMap.jsx")
    assert "new Set(CODES_CARTE)" in carte and "SOUTH_DEPARTMENTS" not in carte
    perimetre = _lire(SRC / "data" / "perimetre.js")
    assert "CODES_CARTE = DEPARTEMENTS.filter((d) => d.code !== '98')" in perimetre


def test_le_perimetre_est_lu_partout():
    for fichier in ("components/Navbar.jsx", "components/Footer.jsx", "components/Domains.jsx",
                    "components/HomeFaq.jsx", "components/Recrutement.jsx", "components/FranceMap.jsx",
                    "pages/seo/SudFrancePage.jsx", "App.js"):
        assert "data/perimetre" in _lire(SRC / fichier), f"{fichier} ne lit pas data/perimetre.js"
    recrutement = _lire(SRC / "components" / "Recrutement.jsx")
    assert 'data-testid="recrutement-zones"' in recrutement and "{SECTEUR}" in recrutement


# ─── 5. Pages locales d'intervention ──────────────────────────────────────────

def _pages_locales() -> list:
    texte = _lire(SRC / "data" / "perimetre.js")
    bloc = texte.split("export const PAGES_LOCALES = [")[1].split("];")[0]
    return re.findall(r"\{ slug: '(/securite-privee-[a-z-]+)', ville: '([^']+)'", bloc)


def _composant(slug: str) -> Path:
    app = _lire(SRC / "App.js")
    m = re.search(r'<Route path="%s" element=\{<(\w+) />\} />' % re.escape(slug), app)
    assert m, f"{slug} absente des routes de App.js"
    return SEO / f"{m.group(1)}.jsx"


def test_une_page_locale_par_grande_ville_du_secteur():
    pages = dict(_pages_locales())
    for ville in ("Bordeaux", "Toulouse", "Montpellier", "Nîmes", "Perpignan", "Marseille", "Toulon",
                  "Avignon", "Lyon", "Grenoble", "Annecy"):
        assert ville in pages.values(), ville
    assert pages["/securite-privee-nice-monaco"] == "Nice et Monaco"
    publiques = _lire(FRONT / "scripts" / "pages-publiques.js")
    for slug in pages:
        assert _composant(slug).is_file(), slug
        assert f'["{slug}",' in publiques, f"{slug} absente du plan du site"


def test_bordeaux_au_menu_et_au_pied_de_page():
    for fichier in ("Navbar.jsx", "Footer.jsx"):
        texte = _lire(SRC / "components" / fichier)
        assert "PAGES_LOCALES.map" in texte, fichier
    assert "/securite-privee-bordeaux" in dict(_pages_locales())


# Mots qui annonceraient un lieu de MTJ Sécurité Privée ailleurs qu'au siège de Toulon (agence, antenne, bureaux,
# locaux, adresse). Relecture adverse du 15/11/2026 : « Bureaux de la Part-Dieu » (les bureaux des clients, page de
# Lyon) reste permis ; « nos bureaux », « notre bureau » et « bureau(x) à/de/sur <ville du secteur> » sont refusés.
VILLES_DU_SECTEUR = r"(?:Bordeaux|Toulouse|Montpellier|Nîmes|Perpignan|Marseille|Nice|Monaco|Avignon|Lyon|Grenoble|Annecy)"
ADRESSES_INTERDITES = [
    r"\bagences?\b", r"\bantennes?\b", r"\bimplantée? à\b", r"\b(?:nos|notre) bureaux?\b",
    r"\bbureaux? (?:à|de|sur) " + VILLES_DU_SECTEUR + r"\b", r"\bbasée? à (?!Toulon)",
    r"équipes? (?:basées?|locales?)\b", r"\bnos locaux\b", r"\brue\b", r"\bavenue\b", r"\bboulevard\b",
]


def _sans_commentaires(texte: str) -> str:
    """Le texte d'un fichier JS sans ses commentaires (les chaînes sont gardées telles quelles)."""
    sortie, i, n = [], 0, len(texte)
    while i < n:
        c = texte[i]
        if c in "'\"`":
            j = i + 1
            while j < n and texte[j] != c:
                j += 2 if texte[j] == "\\" else 1
            sortie.append(texte[i:j + 1])
            i = j + 1
        elif texte.startswith("//", i):
            i = texte.find("\n", i) if texte.find("\n", i) >= 0 else n
        elif texte.startswith("/*", i):
            i = texte.find("*/", i) + 2 if texte.find("*/", i) >= 0 else n
        else:
            sortie.append(c)
            i += 1
    return "".join(sortie)


def _litteraux(texte: str) -> list:
    """Les chaînes d'un fichier JS (apostrophes, guillemets, gabarits), lues dans l'ordre, hors commentaires."""
    texte = _sans_commentaires(texte)
    sortie, i, n = [], 0, len(texte)
    while i < n:
        c = texte[i]
        if c in "'\"`":
            j = i + 1
            while j < n and texte[j] != c:
                j += 2 if texte[j] == "\\" else 1
            sortie.append(texte[i + 1:j].replace("\\'", "'"))
            i = j + 1
        else:
            i += 1
    return sortie


def _texte_affiche(source: str) -> str:
    """Les chaînes d'un fichier JS mises bout à bout, chaque saut de paragraphe écrit dans le code (« \\n »)
    changé en espace. Relecture adverse du 15/11/2026 : sans ce changement, le premier mot d'un paragraphe
    restait collé au « n » de « \\n » et échappait aux motifs (« \\b » ne voyait pas de début de mot) :
    « \\n\\nNos bureaux à Lyon » passait l'essai."""
    return " ".join(_litteraux(source)).replace("\\n", " ")


def _adresses_trouvees(texte: str) -> list:
    return [motif for motif in ADRESSES_INTERDITES if re.search(motif, texte, re.IGNORECASE)]


def test_le_controle_des_fausses_adresses_voit_chaque_paragraphe():
    # Témoins : un texte fautif en début de paragraphe est vu ; les bureaux d'un client ne le sont pas.
    fautif = "const t = `Introduction.\\n\\nNos bureaux à Lyon vous accueillent.\\nAgence de Nice.`;"
    trouves = _adresses_trouvees(_texte_affiche(fautif))
    assert r"\b(?:nos|notre) bureaux?\b" in trouves and r"\bagences?\b" in trouves
    assert _adresses_trouvees(_texte_affiche("const t = `Intro.\\n\\nBureaux à Lyon.`;")), "« Bureaux à Lyon » doit être vu"
    assert not _adresses_trouvees("Bureaux de la Part-Dieu ou de Gerland, entrepôts de l'est lyonnais")


def test_pages_locales_sans_fausse_adresse():
    for slug, ville in _pages_locales():
        texte = _texte_affiche(_lire(_composant(slug)))
        if ville == "Toulon":
            continue  # le siège : la seule adresse réelle, lue dans data/mock.js
        assert not _adresses_trouvees(texte), f"{slug} : « {_adresses_trouvees(texte)} »"
    commun = _lire(SEO / "pageLocale.js")
    assert "Notre siège est à Toulon" in commun and "companyInfo.address" in commun
    # Le texte commun à toutes les pages locales passe le même contrôle.
    assert not _adresses_trouvees(_texte_affiche(commun)), _adresses_trouvees(_texte_affiche(commun))


def _phrases(texte: str) -> set:
    phrases = set()
    for m in _litteraux(texte):
        for p in re.split(r"(?<=[.!?:])\s+|\\n", m):
            if len(p) >= 50:
                phrases.add(p.strip())
    return phrases


def test_pages_locales_au_contenu_propre():
    fichiers = [_composant(slug) for slug, _ in _pages_locales() if "pageLocale(" in _lire(_composant(slug))]
    assert len(fichiers) >= 8
    phrases = {f.name: _phrases(_lire(f)) for f in fichiers}
    for a, b in combinations(phrases, 2):
        communes = phrases[a] & phrases[b]
        assert not communes, f"{a} et {b} partagent : {sorted(communes)[:2]}"
    for nom, ens in phrases.items():
        assert len(ens) >= 12, f"{nom} : contenu trop maigre ({len(ens)} phrases)"


def test_lyon_et_grenoble_ne_sont_plus_en_grand_deplacement():
    texte = _lire(SEO / "GrandDeplacementPage.jsx")
    liste = re.search(r"list: \[([^\]]*)\]", texte.split("Villes et régions d")[1]).group(1)
    for ville in ("Lyon", "Grenoble", "Bordeaux", "Bayonne", "Marseille", "Toulouse", "Montpellier"):
        assert ville not in liste, ville


ANCIENS_PERIMETRES = ["à Toulon, Nice, Toulouse", "à Toulon, Toulouse et Nice", "à Toulon, Nice et Toulouse",
                      "Toulon, Toulouse, Nice, PACA", "dans tout le sud de la France", "dans le sud de la France"]


def test_plus_d_ancien_perimetre_dans_les_pages():
    for p in list(SEO.glob("*.jsx")) + [SRC / "components" / "ContactPage.jsx", SRC / "components" / "HomeFaq.jsx",
                                        SRC / "components" / "Domains.jsx", SRC / "App.js"]:
        texte = _lire(p)
        for phrase in ANCIENS_PERIMETRES:
            assert phrase not in texte, f"{p.name} : « {phrase} »"


# ─── 1. E-mail affiché et destinataire des mails de l'équipe ───────────────────

def test_adresse_affichee_contact_du_domaine():
    mock = _lire(SRC / "data" / "mock.js")
    assert 'const EMAIL = "contact@mtj-securite-privee.fr";' in mock
    index = _lire(FRONT / "public" / "index.html")
    assert set(re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", index)) == {"contact@mtj-securite-privee.fr"}
    for p in SRC.rglob("*"):
        if p.suffix in (".js", ".jsx") and "components/ui" not in p.as_posix():
            assert "gmail.com" not in _lire(p), f"adresse Gmail affichée dans {p.relative_to(REPO)}"


@pytest.fixture()
def envois(monkeypatch):
    import email_service

    vus = []

    def faux_envoi(**kwargs):
        vus.append(kwargs)
        return True

    monkeypatch.setattr(email_service, "send_email_smtp", faux_envoi)
    return email_service, vus


def _trois_mails(email_service):
    assert email_service.send_quote_email(VISITEUR_NOM, None, VISITEUR_MAIL, "0000000000", "SSIAP", "x")
    assert email_service.send_contact_email(VISITEUR_NOM, VISITEUR_MAIL, None, "Sujet", "x")
    assert email_service.send_recruitment_email("Visiteur", "Fictif", VISITEUR_MAIL, "0000000000", "x", [])


def test_mails_de_l_equipe_vers_notify_email(envois, monkeypatch):
    email_service, vus = envois
    monkeypatch.setenv("NOTIFY_EMAIL", EQUIPE_FICTIVE)
    _trois_mails(email_service)
    assert [v["to_email"] for v in vus] == [EQUIPE_FICTIVE] * 3
    # Les boîtes d'envoi ne changent pas.
    assert [v["from_email"] for v in vus] == [email_service.COMMERCIAL_EMAIL, email_service.CONTACT_EMAIL,
                                              email_service.RECRUITMENT_EMAIL]


def test_sans_notify_email_le_mail_part_quand_meme_et_le_journal_le_dit(envois, monkeypatch, caplog):
    email_service, vus = envois
    monkeypatch.delenv("NOTIFY_EMAIL", raising=False)
    with caplog.at_level(logging.WARNING):
        _trois_mails(email_service)
    assert [v["to_email"] for v in vus] == [email_service.COMMERCIAL_EMAIL, email_service.CONTACT_EMAIL,
                                            email_service.RECRUITMENT_EMAIL]
    assert caplog.text.count("NOTIFY_EMAIL non posée") == 3


@pytest.mark.parametrize("valeur", ["pas-une-adresse", "a@b.fr, c@d.fr", "a@b.fr\r\nBcc: x@y.fr"])
def test_notify_email_illisible_refuse_et_signale(envois, monkeypatch, caplog, valeur):
    email_service, vus = envois
    monkeypatch.setenv("NOTIFY_EMAIL", valeur)
    with caplog.at_level(logging.ERROR):
        assert email_service.destinataire_equipe("boite.envoi@example.com") == "boite.envoi@example.com"
    assert "NOTIFY_EMAIL illisible" in caplog.text
    assert valeur not in caplog.text


def test_le_rapport_mensuel_suit_la_meme_adresse():
    analytics = _lire(BACKEND / "routers" / "analytics.py")
    assert "to_email=destinataire_equipe(CONTACT_EMAIL)" in analytics
    email = _lire(BACKEND / "email_service.py")
    assert email.count("to_email=destinataire_equipe(") == 3
    assert "COMPANY_EMAIL" not in email


# ─── 2. Mentions légales ──────────────────────────────────────────────────────

def _legal_info() -> dict:
    bloc = _lire(SRC / "data" / "mock.js").split("export const legalInfo = {")[1].split("};")[0]
    return dict(re.findall(r'(\w+): "([^"]*)"', bloc))


def test_mentions_legales_recopiees_du_kbis():
    info = _legal_info()
    assert info["forme"] == "société par actions simplifiée (société à associé unique)"
    assert info["capital"] == "500,00 €"
    assert info["rcs"] == "922 208 202 R.C.S. Toulon"
    assert info["immatriculation"] == "12/12/2022"
    assert info["directeurPublication"] == "Théo MERCIER, Président de MTJ Sécurité Privée"
    page = _lire(SRC / "pages" / "MentionsLegalesPage.jsx")
    for champ in ("forme", "capital", "rcs", "immatriculation", "tva", "directeurPublication"):
        assert f"legalInfo.{champ}" in page, champ
    assert "à compléter" not in page.lower()


def test_numero_de_tva_coherent_avec_le_siren():
    tva = _legal_info()["tva"].replace(" ", "")
    siren = 922208202
    cle = (12 + 3 * (siren % 97)) % 97
    assert tva == f"FR{cle:02d}{siren}"


# ─── 3. Durées de conservation, sans effacement automatique ─────────────────────

def test_durees_affichees_sans_effacement_automatique():
    politique = _lire(SRC / "pages" / "ConfidentialitePage.jsx")
    for duree in ("3 ans après notre dernier échange", "2 ans après notre dernier échange", "13 mois"):
        assert duree in politique, duree
    assert "Le site ne les efface pas de lui-même" in politique
    for p in [SRC / "components" / n for n in ("Quote.jsx", "ContactPage.jsx", "Recrutement.jsx")] + [SRC / "pages" / "ConfidentialitePage.jsx"]:
        texte = _lire(p)
        for promesse in ("puis supprimées", "puis suppression", "puis effacées", "automatiquement supprim"):
            assert promesse not in texte, f"{p.name} : « {promesse} »"
    for p in BACKEND.rglob("*.py"):
        if "tests" in p.parts:
            continue
        texte = _lire(p)
        assert "expireAfterSeconds" not in texte and "delete_many(" not in texte, p.name


# ─── 6 et 7. Repli prudent CYNODEX et SSIAP, aucun chiffre sur l'accueil ─────────

def test_repli_prudent_cynodex_et_ssiap_garde():
    for p in SEO.glob("*.jsx"):
        texte = _lire(p)
        assert "unité CYNODEX :" not in texte and "et unité CYNODEX" not in texte, p.name
        assert not re.search(r"SSIAP\s*(?:2|3|2 et 3|1, 2 et 3)\s*(?:certifiés|garantis)", texte), p.name
    commun = _lire(SEO / "pageLocale.js")
    assert "selon la certification du binôme" in commun and "niveau étudié selon le poste" in commun


CHIFFRES_INTERDITS = re.compile(
    r"\d[\d\s]*\s*(?:%|clients?\b|agents?\b|missions?\b|sites?\b|années? d'expérience|ans d'expérience|interventions?\b|avis\b)",
    re.IGNORECASE)


def test_aucun_chiffre_sur_l_accueil():
    for nom in ("Hero.jsx", "About.jsx", "Services.jsx", "Domains.jsx", "Engagement.jsx", "HomeFaq.jsx"):
        texte = re.sub(r"//.*|\{/\*[\s\S]*?\*/\}|/\*[\s\S]*?\*/", "", _lire(SRC / "components" / nom))
        texte = re.sub(r'className="[^"]*"|size=\{\d+\}|style=\{\{[^}]*\}\}', "", texte)
        assert not CHIFFRES_INTERDITS.search(texte), f"{nom} : « {CHIFFRES_INTERDITS.search(texte).group(0)} »"


# ─── Constats du bilan SEO du 13/11/2026 ──────────────────────────────────────

def test_le_gabarit_n_impose_plus_l_accueil_comme_canonique():
    index = _lire(FRONT / "public" / "index.html")
    assert not re.search(r'<link[^>]*rel="canonical"', index)


def test_aucune_note_ecrite_a_la_main_ni_affirmation_non_prouvee():
    for p in list(SRC.rglob("*.js")) + list(SRC.rglob("*.jsx")) + [FRONT / "public" / "index.html"]:
        if "components/ui" in p.as_posix():
            continue
        texte = _lire(p)
        for motif in ("aggregateRating", "ratingValue", "reviewCount", "antenne toulousaine", "implantation multi-sites",
                      "multiplie par cinq", "plus de 90 %", "jauges allant de", "Sixième ville de France"):
            assert motif not in texte, f"{p.name} : « {motif} »"


def test_aucune_population_ni_classement_inverifiable():
    """Relecture adverse du 15/11/2026 : les populations des métropoles avaient été retirées des pages de
    Bordeaux et de Toulouse, pas de celle de Toulon (« plus de 430 000 habitants ») ; la page de Nice
    classait le carnaval « deuxième plus grand carnaval au monde ». Commentaires du code exclus."""
    for p in list(SRC.rglob("*.js")) + list(SRC.rglob("*.jsx")) + [FRONT / "public" / "index.html"]:
        if "components/ui" in p.as_posix():
            continue
        texte = re.sub(r"/\*[\s\S]*?\*/|//[^\n]*|<!--[\s\S]*?-->", "", _lire(p))
        assert not re.search(r"\d[\d\s\u00a0\u202f]*habitants", texte), f"{p.name} : population chiffrée"
        assert "plus grand carnaval" not in texte and "centaines de milliers de spectateurs" not in texte, p.name


def test_aucune_carte_du_code_source_publiee():
    docker = _lire(REPO / "Dockerfile")
    assert "ENV GENERATE_SOURCEMAP=false" in docker
    assert "find build -name '*.map'" in docker
    assert '"build": "GENERATE_SOURCEMAP=false craco build"' in _lire(FRONT / "package.json")
    assert re.search(r"location ~ \\\.map\$ \{\s*return 404;", _lire(REPO / "nginx-site.conf"))


def test_le_contexte_de_construction_n_emporte_ni_paquets_ni_construction_du_serveur():
    """Relecture adverse du 15/11/2026 : « COPY frontend/ . » vient après « yarn install » ; un node_modules ou
    un build resté dans le dossier du serveur écraserait les paquets de l'image (pré-rendu faussé)."""
    ignore = [ligne.strip() for ligne in _lire(REPO / ".dockerignore").splitlines()]
    assert "**/node_modules" in ignore and "frontend/build" in ignore
    docker = _lire(REPO / "Dockerfile")
    assert docker.index("yarn install") < docker.index("COPY frontend/ .") < docker.index("RUN yarn build")


# ─── 9. Pré-rendu ─────────────────────────────────────────────────────────────

def _pages_publiques() -> list:
    return re.findall(r'\["(/[^"]*)",\s*"[0-9.]+",\s*"\w+"\]', _lire(FRONT / "scripts" / "pages-publiques.js"))


def test_plan_du_site_egal_aux_pages_pre_rendues():
    pages = _pages_publiques()
    plan = re.findall(r"<loc>https://mtj-securite-privee\.fr(/[^<]*)</loc>", _lire(FRONT / "public" / "sitemap.xml"))
    assert plan == pages
    routes = json.loads(_lire(FRONT / "public" / "routes.json"))["routes"]
    assert routes[: len(pages)] == pages and routes[len(pages):] == ["/devis", "/dashboard"]
    script = _lire(FRONT / "scripts" / "prerender.js")
    assert "for (const [chemin] of PAGES)" in script


def test_le_script_de_pre_rendu_ecrit_une_canonique_propre_et_s_arrete_en_cas_d_echec():
    script = _lire(FRONT / "scripts" / "prerender.js")
    assert '<link rel="canonical" href="${echapperAttribut(seo.url)}"/>' in script
    assert "canonique « ${seo.url} » au lieu de « ${attendue} »" in script
    assert "process.exit(1)" in script
    assert "prerenderToNodeStream" in script and "StaticRouter" in script
    assert '"postbuild": "node scripts/prerender.js"' in _lire(FRONT / "package.json")
    docker = _lire(REPO / "Dockerfile")
    assert "RUN yarn build" in docker and "test -s build/prerendu/rapport.json" in docker
    assert docker.index("COPY nginx-site.conf") < docker.index("RUN nginx -t"), "nginx -t doit relire le réglage copié"


def test_nom_des_fichiers_pre_rendus_et_regle_nginx():
    publiques = _lire(FRONT / "scripts" / "pages-publiques.js")
    assert 'chemin === "/" ? "index.html" : `${chemin.replace(/^\\//, "")}.html`' in publiques
    conf = _lire(REPO / "nginx-site.conf")
    accueil = re.search(r"location = / \{([^}]*)\}", conf).group(1)
    assert "try_files /prerendu/index.html /index.html =404;" in accueil
    connues = re.search(r"location ~\* \^/\([^)]*\)/\?\$ \{([^}]*)\}", conf).group(1)
    assert "try_files /prerendu/$1.html /index.html =404;" in connues
    assert re.search(r"location \^~ /prerendu/ \{\s*internal;\s*\}", conf)
    assert "error_page 404 /index.html;" in conf


def test_react_reprend_la_page_pre_rendue():
    index = _lire(SRC / "index.js")
    assert "if (conteneur.firstElementChild)" in index and "ReactDOM.hydrateRoot(conteneur, application)" in index
    app = _lire(SRC / "App.js")
    assert "export function AppContenu()" in app
    assert re.search(r"<BrowserRouter>\s*<AppContenu />\s*</BrowserRouter>", app)
    seo = _lire(SRC / "components" / "SeoHead.jsx")
    assert "export const SeoCollecteur = createContext(null);" in seo
    footer = _lire(SRC / "components" / "Footer.jsx")
    assert re.search(r"<p [^>]*suppressHydrationWarning>\s*© \{currentYear\}", footer)
    # Les tracés de la carte (lourds) ne sont pas écrits dans le HTML pré-rendu : dessinés après la reprise.
    carte = _lire(SRC / "components" / "FranceMap.jsx")
    assert "const [traces, setTraces] = useState(false);" in carte and "{traces && (" in carte


def test_chaque_page_publique_a_son_seohead_et_sa_propre_adresse():
    """Chaque page pré-rendue doit appeler SeoHead avec SON chemin (sinon le pré-rendu s'arrête)."""
    app = _lire(SRC / "App.js")
    for chemin in _pages_publiques():
        if chemin == "/":
            assert 'path="/"' in app.split("const HomePage")[1].split("};")[0]
            continue
        m = re.search(r'<Route path="%s" element=\{<(\w+) />\} />' % re.escape(chemin), app)
        assert m, chemin
        nom = m.group(1)
        candidats = [SRC / "pages" / "seo" / f"{nom}.jsx", SRC / "pages" / f"{nom}.jsx", SRC / "components" / f"{nom}.jsx"]
        fichier = next(p for p in candidats if p.is_file())
        texte = _lire(fichier)
        assert f"slug: '{chemin}'" in texte or f'path="{chemin}"' in texte, f"{chemin} : SeoHead d'une autre adresse ({fichier.name})"
