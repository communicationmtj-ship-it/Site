"""Essais hors ligne des choix de Théo du 13/11/2026 sur le site vitrine (formulaire « site vitrine (2/3) »)
et des constats du bilan SEO du 13/11/2026, construits le 15/11/2026.

1. e-mail affiché contact@ ; mails de l'équipe vers l'adresse de NOTIFY_EMAIL ;
2. mentions légales : Théo MERCIER, Président, directeur de la publication ; forme, capital et date
   d'immatriculation recopiées du Kbis ; TVA vérifiée ;
3. durées de conservation affichées, aucun effacement automatique annoncé ni programmé ;
4. périmètre de Bordeaux à Nice jusqu'à Annecy partout (34 codes du logiciel MTJ) ;
5. pages de villes : texte repris du site en ligne, sans preuve ni phrase inventée (Théo, 15/11/2026,
   formulaire 3/4), une seule adresse (Toulon) ;
6. CYNODEX et SSIAP 1, 2 et 3 présentés sans réserve (réponse de Théo du 15/11/2026) ; CYNODEX = diplôme
   du maître-chien de détection d'explosifs, jamais une « unité » (Théo, 15/11/2026 05:56) ;
7. aucun chiffre sur l'accueil ;
9. pré-rendu : un HTML par page publique, canonique propre, plan du site = pages pré-rendues.

Aucun serveur, aucune base, aucun envoi : les envois de mail sont remplacés par une fonction qui note
l'adresse visée. Les noms et adresses de visiteurs sont fictifs.

Lancement (depuis backend/) :
    python -m pytest -x -q -p no:cacheprovider tests/test_site_choix_theo_13_11.py
"""
import html
import json
import logging
import os
import re
import subprocess
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


# ─── Texte du site en ligne (relecture adverse du 15/11/2026) ──────────────────
# Le site en ligne est la version du 04/11/2026 : commit 9561a0a, base de la branche. Un essai qui dit « repris du
# site en ligne » compare à CE texte, jamais aux autres fichiers de la branche (qu'elle a pu réécrire elle-même).
COMMIT_EN_LIGNE = "9561a0a"
SECTEUR = "de Bordeaux à Nice jusqu'à Annecy"
SECTEUR_TITRE = "De Bordeaux à Nice jusqu'à Annecy"
# Groupes de mots du site en ligne que la décision « Site perimetre: A partout » (Théo, 13/11/2026) remplace par
# le secteur, du plus long au plus court ; « De Toulouse à Nice » est la tournure de l'accueil (bloc « Domaines »).
ANCIENS_SECTEURS = ("dans tout le sud de la France", "dans le sud de la France", "tout le sud de la France",
                    "le sud de la France", "De Toulouse à Nice")


def _git_en_ligne(*args: str) -> str:
    r = subprocess.run(["git", "-C", str(REPO), *args], capture_output=True, text=True)
    assert r.returncode == 0, f"texte du site en ligne ({COMMIT_EN_LIGNE}) illisible : {r.stderr.strip()}"
    return r.stdout


def _en_ligne(chemin: str) -> str:
    """Un fichier tel qu'il est sur le site en ligne."""
    return _git_en_ligne("show", f"{COMMIT_EN_LIGNE}:{chemin}")


def _marques(texte: str) -> str:
    """Texte ramené à ce qui doit être identique des deux côtés : seuls les remplacements décidés par Théo
    deviennent une marque (secteur, 13/11/2026 ; adresse e-mail, 13/11/2026 ; CYNODEX = diplôme du maître-chien,
    15/11/2026). Balises JSX et échappements retirés, espaces réduits."""
    texte = texte.replace("\\'", "'").replace("\\n", " ").replace("{' '}", " ")
    texte = re.sub(r"<[^<>]*>", " ", texte)
    texte = re.sub(r"[\w.+-]+@gmail\.com|contact@mtj-securite-privee\.fr|\$\{companyInfo\.email\}", "«EMAIL»", texte)
    texte = re.sub(r"\$\{SECTEUR(?:_TITRE)?\}|[Dd]e Bordeaux à Nice jusqu'à Annecy", "«SECTEUR»", texte)
    for ancien in ANCIENS_SECTEURS:
        texte = texte.replace(ancien, "«SECTEUR»")
    texte = re.sub(r"(?:(?:notre|nos|l'|les|son|ses) )?(?:unité|équipes?|maîtres-chiens(?: diplômés)?) CYNODEX",
                   "«CYNODEX»", texte)
    return re.sub(r"\s+", " ", texte).strip()


def _telephone_du_site() -> str:
    return re.search(r'  phone: "([^"]+)"', _lire(SRC / "data" / "mock.js")).group(1)


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
    for fichier in ("components/Footer.jsx", "components/Domains.jsx", "components/HomeFaq.jsx",
                    "components/FranceMap.jsx", "pages/seo/SudFrancePage.jsx", "pages/seo/pageLocale.js", "App.js"):
        assert "data/perimetre" in _lire(SRC / fichier), f"{fichier} ne lit pas data/perimetre.js"
    # Les mots exacts du secteur (Théo, 13/11/2026 : « Site perimetre: A partout »).
    perimetre = _lire(SRC / "data" / "perimetre.js")
    assert "export const SECTEUR = \"de Bordeaux à Nice jusqu'à Annecy\";" in perimetre
    # 15/11/2026 (règle de Théo : « soit tu met pas soit tu laisse ce qui etait ») : le bloc « Zones de
    # recrutement » ajouté à la page Recrutement est retiré.
    assert 'data-testid="recrutement-zones"' not in _lire(SRC / "components" / "Recrutement.jsx")


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


def test_chaque_page_de_ville_au_pied_de_page():
    """Théo, 15/11/2026 (formulaire 3/4) : les 12 pages de villes sortent. Elles sont reliées par la colonne
    « Zones d'intervention » du pied de page, comme les pages de villes du site en ligne ; le menu « Nos zones »
    ajouté au menu est retiré (règle « soit tu met pas soit tu laisse ce qui etait »)."""
    footer = _lire(SRC / "components" / "Footer.jsx")
    for slug, _ in _pages_locales():
        assert f"'{slug}'" in footer or f'"{slug}"' in footer, slug
    assert "Nos zones" not in _lire(SRC / "components" / "Navbar.jsx")


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
    assert "Siège basé à Toulon." in commun
    # Le texte commun à toutes les pages locales passe le même contrôle.
    assert not _adresses_trouvees(_texte_affiche(commun)), _adresses_trouvees(_texte_affiche(commun))


def _phrases(texte: str) -> set:
    phrases = set()
    for m in _litteraux(texte):
        for p in re.split(r"(?<=[.!?:])\s+|\\n", m):
            if len(p) >= 50:
                phrases.add(p.strip())
    return phrases


# La seule phrase propre aux pages de villes ajoutées : la ville et son département.
PHRASES_DE_VILLE = ("MTJ Sécurité Privée intervient à ${ville} et dans ${leDepartement}.",)
VILLES_AJOUTEES = ("Montpellier", "Nîmes", "Perpignan", "Marseille", "Avignon", "Lyon", "Grenoble", "Annecy")


def _texte_en_ligne_marque() -> str:
    """Tout le texte des fichiers du site en ligne (frontend/src), remplacements décidés ramenés à leur marque."""
    fichiers = [f for f in _git_en_ligne("ls-tree", "-r", "--name-only", COMMIT_EN_LIGNE, "frontend/src").split()
                if f.endswith((".js", ".jsx")) and "/components/ui/" not in f]
    assert len(fichiers) > 30, "lecture du site en ligne incomplète"
    return " ¶ ".join(_marques(_en_ligne(f)) for f in fichiers)


def _phrases_sans_origine(gabarit_source: str, en_ligne: str) -> list:
    """Les phrases d'un fichier JS (chaînes hors commentaires, chemins exclus) qui ne sont pas sur le site en ligne,
    une fois les remplacements décidés ramenés à leur marque ; « ${…} » (ville, département…) et le nom d'une ville
    ajoutée valent n'importe quel nom de lieu."""
    telephone = _telephone_du_site()
    manquantes = []
    for litteral in _litteraux(gabarit_source):
        if litteral.startswith((".", "/")):
            continue  # chemins d'import et adresses des pages
        for phrase in re.split(r"(?<=[.!?])\s+|\\n", litteral):
            phrase = phrase.strip()
            if not phrase or phrase in PHRASES_DE_VILLE:
                continue
            marquee = _marques(phrase.replace("${companyInfo.phone}", telephone))
            for ville in VILLES_AJOUTEES:
                marquee = marquee.replace(ville, "${ville}")
            motif = re.sub(r"\\\$\\\{[^}]*\\\}", "[^.¶]+?", re.escape(marquee))
            if not re.search(motif, en_ligne):
                manquantes.append(phrase)
    return manquantes


def test_pages_de_villes_sans_phrase_inventee():
    """Théo, 15/11/2026 (formulaire 3/4) : les pages de villes sortent SANS aucune preuve (ni mission passée,
    ni client, ni chiffre, ni phrase inventée), seulement ce que le site en ligne dit déjà. Les 8 pages ajoutées
    n'écrivent aucun texte elles-mêmes ; chaque phrase de pageLocale.js, titre et description pour Google compris,
    se retrouve, la ville mise à sa place, dans le texte du SITE EN LIGNE (commit 9561a0a), avec pour seuls écarts
    les remplacements décidés. Relecture adverse du 15/11/2026 : l'essai cherchait l'origine dans les autres fichiers
    de la branche ; « Notre zone d'intervention principale va … », réécrite par la branche, lui servait de preuve."""
    fichiers = [_composant(slug) for slug, _ in _pages_locales() if "pageLocale(" in _lire(_composant(slug))]
    assert len(fichiers) == 8
    for f in fichiers:
        texte = _sans_commentaires(_lire(f))
        for cle in ("introduction:", "sections:", "faq:", "conclusion:", "content:", "answer:", "metaTitle:",
                    "metaDescription:"):
            assert cle not in texte, f"{f.name} écrit son propre texte ({cle})"
    en_ligne = _texte_en_ligne_marque()
    # Témoins : la phrase réécrite par la branche est vue ; une phrase recopiée du site en ligne passe.
    assert _phrases_sans_origine("const t = `Notre zone d'intervention principale va ${SECTEUR}.`;", en_ligne)
    assert not _phrases_sans_origine("const t = `Siège basé à Toulon.`;", en_ligne)
    manquantes = _phrases_sans_origine(_lire(SEO / "pageLocale.js"), en_ligne)
    assert not manquantes, "phrases absentes du site en ligne :\n" + "\n".join(manquantes)


def test_lyon_et_grenoble_ne_sont_plus_en_grand_deplacement():
    texte = _lire(SEO / "GrandDeplacementPage.jsx")
    liste = re.search(r"list: \[([^\]]*)\]", texte.split("Villes et régions d")[1]).group(1)
    for ville in ("Lyon", "Grenoble", "Bordeaux", "Bayonne", "Marseille", "Toulouse", "Montpellier"):
        assert ville not in liste, ville


ANCIENS_PERIMETRES = ["à Toulon, Nice, Toulouse", "à Toulon, Toulouse et Nice", "à Toulon, Nice et Toulouse",
                      "Toulon, Toulouse, Nice, PACA", "dans tout le sud de la France", "dans le sud de la France"]


# 15/11/2026 (relecture adverse, site-12, réglage « sans réponse » annoncé à Théo) : une phrase AU PASSÉ garde
# « dans le sud de la France » ; la remplacer par le secteur affirmerait des missions passées jusqu'à Bordeaux et
# Annecy. C'est le texte du site en ligne, mot pour mot.
PHRASES_AU_PASSE_GARDEES = ["MTJ Sécurité Privée a sécurisé de nombreux concerts et festivals dans le sud de la France."]


def test_plus_d_ancien_perimetre_dans_les_pages():
    for p in list(SEO.glob("*.jsx")) + [SRC / "components" / "ContactPage.jsx", SRC / "components" / "HomeFaq.jsx",
                                        SRC / "components" / "Domains.jsx", SRC / "App.js"]:
        texte = _lire(p)
        for gardee in PHRASES_AU_PASSE_GARDEES:
            texte = texte.replace(gardee, "")
        for phrase in ANCIENS_PERIMETRES:
            assert phrase not in texte, f"{p.name} : « {phrase} »"


# ─── Règle de Théo du 15/11/2026 (« soit tu met pas soit tu laisse ce qui etait »), relecture adverse ─────────
# Chaque essai ci-dessous part du texte du SITE EN LIGNE (commit 9561a0a) et n'admet que les écarts décidés :
# le secteur à la place de « (tout) le sud de la France », une phrase retirée (chiffre ou implantation) sans rien
# écrire à sa place, et les remplacements nommés dans chaque table.

def _chaine_apres(texte: str, debut: int) -> str:
    """La chaîne JS (apostrophes, guillemets ou gabarit) qui commence au premier guillemet après `debut`."""
    m = re.compile(r"(['\"`])((?:\\.|(?!\1).)*)\1", re.S).search(texte, debut)
    assert m, "chaîne introuvable"
    return m.group(2)


def _propriete(texte: str, cle: str, repere: str = "") -> str:
    """Valeur de `cle:` (introduction, metaTitle…), après `repere` s'il est donné (un titre h3, une question),
    sans déborder sur la sous-partie ou la question suivante."""
    i = texte.index(repere) + len(repere) if repere else 0
    j = texte.index(f"{cle}:", i)
    if repere:
        assert not re.search(r"\b(?:h3|question):", texte[i:j]), f"« {cle} » absent après « {repere} »"
    return _chaine_apres(texte, j + len(cle) + 1)


def _description_seohead(texte: str) -> str:
    i = texte.index("description=", texte.index("<SeoHead"))
    return _chaine_apres(texte, i).replace("${companyInfo.phone}", _telephone_du_site())


def _sans_phrases(texte: str, debuts: list) -> str:
    """Le texte sans les phrases qui commencent par l'un des `debuts` (chacune doit y être)."""
    phrases = re.split(r"(?<=[.!?])\s+", texte)
    gardees = [p for p in phrases if not p.startswith(tuple(debuts))]
    assert len(gardees) == len(phrases) - len(debuts), f"phrase à retirer introuvable : {debuts}"
    return " ".join(gardees)


# Site-3 : « Monaco delais: Garder les deux » (Théo, 15/11/2026 06:11). Seul le groupe « (tout) le sud de la France »
# change ; la liste de villes qui le suivait (Monaco compris) reste. Site-6 : même règle pour la page des chantiers.
SECTEUR_SEUL = [
    ("frontend/src/components/HomeFaq.jsx", 'question: "Qu\'est-ce que MTJ Sécurité Privée ?"'),
    ("frontend/src/pages/seo/SudFrancePage.jsx", "question: 'Quelle est votre zone d\\'intervention principale ?'"),
    ("frontend/src/pages/seo/CynophilePage.jsx",
     "question: 'Quelle zone géographique couvrez-vous pour les prestations cynophiles ?'"),
    ("frontend/src/pages/seo/SurveillanceChantierPage.jsx", "question: 'Intervenez-vous sur les chantiers en dehors"),
]


def test_le_secteur_ne_remplace_que_le_sud_de_la_france():
    for chemin, question in SECTEUR_SEUL:
        en_ligne = _propriete(_en_ligne(chemin), "answer", question)
        branche = _propriete(_lire(REPO / chemin), "answer", question)
        assert "«SECTEUR»" in _marques(en_ligne), chemin
        assert _marques(branche) == _marques(en_ligne), f"{chemin} :\n  en ligne : {en_ligne}\n  branche  : {branche}"
    # Monaco reste là où le site en ligne le citait.
    for chemin, question in SECTEUR_SEUL[:3]:
        assert "Monaco" in _propriete(_lire(REPO / chemin), "answer", question), chemin


# Site-4 : « Site chiffres: B aucun » (Théo, 13/11/2026) = la phrase qui porte le chiffre est retirée, avec celle qui
# en dépend ; jamais réécrite (« renonce. », « plusieurs agents », « plusieurs familles »).
CHIFFRES_RETIRES = [
    ("frontend/src/pages/seo/CynophilePage.jsx", "content", "h3: 'Dissuasion maximale et détection précoce'",
     ["Un intrus qui repère un binôme cynophile"]),
    ("frontend/src/pages/seo/CynophilePage.jsx", "content", "h3: 'Rapport coût-efficacité optimal'",
     ["Un binôme maître-chien couvre", "Cette productivité accrue"]),
    ("frontend/src/pages/seo/CynodexPage.jsx", "content", "h3: 'Chiens détecteurs : entraînement spécialisé'",
     ["Ils sont capables de détecter"]),
    ("frontend/src/pages/seo/CynodexPage.jsx", "answer",
     "question: 'Le chien peut-il détecter tous les types d\\'explosifs ?'", ["Nos chiens CYNODEX sont entraînés"]),
]


def test_chiffre_retire_avec_sa_phrase_jamais_reecrite():
    for chemin, cle, repere, debuts in CHIFFRES_RETIRES:
        attendu = _sans_phrases(_propriete(_en_ligne(chemin), cle, repere), debuts)
        branche = _propriete(_lire(REPO / chemin), cle, repere)
        assert _marques(branche) == _marques(attendu), f"{chemin} ({repere}) :\n  attendu : {attendu}\n  branche : {branche}"


# Site-5 : « aucune implantation hors du siège de Toulon » (Théo, 13/11 et 15/11/2026) = la phrase ou la proposition
# d'implantation est retirée, rien n'est écrit à sa place (pas de « Nous sommes spécialisés… », « Nous couvrons… »).
def test_implantation_retiree_sans_phrase_neuve():
    chemin = "frontend/src/pages/seo/SudFrancePage.jsx"
    en_ligne, branche = _en_ligne(chemin), _lire(REPO / chemin)
    attendu = _sans_phrases(_propriete(en_ligne, "introduction"), ["MTJ Sécurité Privée est implantée"])
    assert _marques(_propriete(branche, "introduction")) == _marques(attendu)
    # Côte d'Azur et Toulouse : toutes les phrases parlaient d'un pôle, d'une antenne ou d'une présence ; il reste le
    # titre et la liste. La partie « Toulouse et grand déplacement » n'a plus d'introduction.
    assert re.search(r"h3: 'Côte d\\'Azur et Monaco',\s*list:", branche)
    assert re.search(r"h3: 'Toulouse — Occitanie',\s*list:", branche)
    assert re.search(r"h2: 'Toulouse et grand déplacement national',\s*subsections:", branche)
    chemin = "frontend/src/pages/seo/GrandDeplacementPage.jsx"
    proposition = "Au-delà de notre zone d'implantation principale dans le sud de la France (Toulon, Nice, Toulouse), "
    attendu = _propriete(_en_ligne(chemin), "introduction").split("\\n")[0]
    assert proposition in attendu
    assert _propriete(_lire(REPO / chemin), "introduction").split("\\n")[0] == attendu.replace(proposition, "")
    for p in SEO.glob("*.js*"):
        texte = _sans_commentaires(_lire(p)).replace("\\'", "'")
        for neuve in ("Nous sommes spécialisés dans la sécurité de prestige", "Nous couvrons la Haute-Garonne",
                      "Notre capacité de déploiement national assure", "Notre présence à Nice",
                      "zone d'intervention principale, de", "zone d'intervention principale va"):
            assert neuve not in texte, f"{p.name} : « {neuve} »"


# Site-7 : titres et descriptions lus par Google et par les aperçus de partage = ceux du site en ligne, avec
# seulement les remplacements décidés, nommés ici un par un.
ATTRIBUTION = ("SSIAP, protection rapprochée.",
               "SSIAP ; protection rapprochée par MTJ Sécurité Rapprochée, société du groupe.")  # relecture du 13/11/2026
TITRES_ET_DESCRIPTIONS = [
    ("frontend/src/App.js", None, [ATTRIBUTION]),
    ("frontend/src/components/ContactPage.jsx", None, [("à Toulon, Nice, Toulouse", SECTEUR)]),
    ("frontend/src/components/Recrutement.jsx", None, [
        ("maîtres-chiens, SSIAP et agents de protection rapprochée.",
         "maîtres-chiens et agents SSIAP ; MTJ Sécurité Rapprochée, société du groupe, des agents de protection rapprochée.")]),
    ("frontend/src/pages/seo/AgentSecuritePage.jsx", "metaDescription", [("à Toulon, Toulouse et Nice", SECTEUR)]),
    # Lyon et Bordeaux sont dans le secteur : retirés de la liste du grand déplacement (comme dans l'introduction).
    ("frontend/src/pages/seo/GrandDeplacementPage.jsx", "metaDescription", [("Paris, Lyon, Bordeaux, Nantes", "Paris, Nantes")]),
    ("frontend/src/pages/seo/GrandDeplacementPage.jsx", "metaTitle", []),
    ("frontend/src/pages/seo/ProtectionRapprocheePage.jsx", "metaDescription", [("à Toulon, Nice, Toulouse", SECTEUR)]),
    ("frontend/src/pages/seo/ProtectionRapprocheePage.jsx", "metaTitle", []),
    ("frontend/src/pages/seo/SsiapPage.jsx", "metaTitle", []),
    ("frontend/src/pages/seo/AgentSecuritePage.jsx", "metaTitle", []),
]
GABARIT_EN_LIGNE = [
    ("name", "description", [ATTRIBUTION]),
    ("property", "og:title", [("à Toulon, Nice, Toulouse", SECTEUR)]),
    ("property", "og:description", [("dans le sud de la France", SECTEUR), ATTRIBUTION]),
    ("name", "twitter:title", [("Sud de France", SECTEUR)]),
    ("name", "twitter:description", [ATTRIBUTION, ("Toulon, Nice, Toulouse.", SECTEUR_TITRE + ".")]),
]


def _remplacer(texte: str, remplacements: list) -> str:
    for ancien, nouveau in remplacements:
        assert ancien in texte, f"« {ancien} » absent du texte en ligne"
        texte = texte.replace(ancien, nouveau)
    return texte


def _valeur_affichee(texte: str) -> str:
    return texte.replace("\\'", "'")


def test_titres_et_descriptions_du_site_en_ligne():
    for chemin, cle, remplacements in TITRES_ET_DESCRIPTIONS:
        en_ligne, branche = _en_ligne(chemin), _lire(REPO / chemin)
        lire = _description_seohead if cle is None else (lambda t, c=cle: _propriete(t, c))
        attendu = _remplacer(_valeur_affichee(lire(en_ligne)), remplacements)
        assert _valeur_affichee(lire(branche)) == attendu, f"{chemin} ({cle or 'description'})"
    index_en_ligne, index = _en_ligne("frontend/public/index.html"), _lire(FRONT / "public" / "index.html")

    def meta(texte, attribut, nom):
        return html.unescape(re.search(rf'<meta {attribut}="{re.escape(nom)}" content="([^"]*)"', texte).group(1))

    for attribut, nom, remplacements in GABARIT_EN_LIGNE:
        assert meta(index, attribut, nom) == _remplacer(meta(index_en_ligne, attribut, nom), remplacements), nom
    # Accueil : même description dans le gabarit et dans la page (Monaco compris, comme en ligne).
    assert meta(index, "name", "description") == _description_seohead(_lire(SRC / "App.js"))
    assert "Monaco" in meta(index, "name", "description")

    def organisation(texte):
        return re.search(r'"@type": "Organization",[\s\S]*?"description": "([^"]*)"', texte).group(1)

    attendu = _remplacer(organisation(index_en_ligne), [("dans le sud de la France", SECTEUR), ATTRIBUTION])
    assert organisation(index) == attendu


def test_titre_et_description_des_pages_de_villes_au_modele_en_ligne():
    """Les 8 pages de villes ajoutées suivent le modèle des pages de villes en ligne (page de Bordeaux), la ville,
    son numéro et son département mis à leur place (comme la page de Toulon en ligne : « dans le Var et en PACA »)."""
    bordeaux = _en_ligne("frontend/src/pages/seo/BordeauxPage.jsx")
    titre = _propriete(bordeaux, "metaTitle").replace("Bordeaux", "${ville}").replace("(33)", "(${code})")
    description = _remplacer(_propriete(bordeaux, "metaDescription"), [
        ("Bordeaux", "${ville}"), ("en Gironde et Nouvelle-Aquitaine", "${lieu}"),
        (_telephone_du_site(), "${companyInfo.phone}")])
    gabarit = _lire(SEO / "pageLocale.js")
    assert _propriete(gabarit, "metaTitle") == titre
    assert _propriete(gabarit, "metaDescription") == description
    assert "const lieu = `dans ${leDepartement} et en ${region}`;" in gabarit


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


# ─── 6 et 7. CYNODEX et SSIAP 1, 2 et 3 sans réserve, aucun chiffre sur l'accueil ──

# Réponse de Théo du 15/11/2026 (« Qualifications ») : le site est une vitrine pour le commercial ; si un
# client demande un profil, MTJ recrute et assure la prestation. Les maîtres-chiens certifiés CYNODEX et
# les agents SSIAP 1, 2 et 3 sont des prestations que MTJ assure : plus aucune réserve de
# certification, d'habilitation, de disponibilité ni de niveau « étudié ». Ces essais remplacent celui du
# repli prudent du 13/11/2026 (test_repli_prudent_cynodex_et_ssiap_garde), qui imposait ces réserves.
RESERVES_RETIREES = [
    "selon la certification du binôme", "selon la certification de chaque binôme", "selon leur habilitation",
    "niveau étudié selon le poste", "selon les agents disponibles", "disponibilité des binômes",
    "nous étudions chaque demande de ssiap", "demandes de ssiap 2 ou 3", "peut mettre à disposition des agents ssiap",
]


def _texte_sans_commentaires(path: Path) -> str:
    """Le texte d'un fichier du site sans ses lignes de commentaire (les explications datées du code
    restent permises), apostrophes échappées rendues, en minuscules."""
    texte = re.sub(r"^\s*//[^\n]*$|/\*[\s\S]*?\*/|<!--[\s\S]*?-->", "", _lire(path), flags=re.MULTILINE)
    return texte.replace("\\'", "'").lower()


def test_cynodex_et_ssiap_1_2_3_sans_reserve():
    fichiers = [p for p in SRC.rglob("*") if p.suffix in (".js", ".jsx") and "components/ui" not in p.as_posix()]
    fichiers.append(FRONT / "public" / "index.html")
    for p in fichiers:
        texte = _texte_sans_commentaires(p)
        for reserve in RESERVES_RETIREES:
            assert reserve not in texte, f"{p.relative_to(REPO)} : « {reserve} »"
    # La prestation est écrite franchement, avec le vocabulaire de Théo (15/11/2026 : « un cynodex c'est le
    # diplome de maitre chien de detection d'explosif ») : des maîtres-chiens diplômés CYNODEX, jamais une
    # « unité », une « équipe », une « cellule » ni des « binômes » CYNODEX.
    for p in (SRC / "components" / "HomeFaq.jsx", SRC / "data" / "mock.js", SEO / "CynodexPage.jsx"):
        assert "maîtres-chiens diplômés cynodex" in _texte_sans_commentaires(p), p.name
    for p in (SEO / "BordeauxPage.jsx", SEO / "ToulousePage.jsx", SEO / "pageLocale.js", SEO / "GrandDeplacementPage.jsx"):
        assert "maîtres-chiens cynodex" in _texte_sans_commentaires(p), p.name
    for p in fichiers:
        texte = _texte_sans_commentaires(p)
        for faux in ("unité cynodex", "unités cynodex", "équipes cynodex", "équipe cynodex", "cellule cynodex", "binômes cynodex",
                     "par équipe cynophile",
                     "nos chiens cynodex", "le cynodex est une prestation"):
            assert faux not in texte, f"{p.relative_to(REPO)} : « {faux} »"
    for p in (SEO / "ErpPage.jsx", SEO / "SudFrancePage.jsx", SEO / "pageLocale.js", SEO / "SsiapPage.jsx"):
        assert "ssiap 1, 2 et 3" in _texte_sans_commentaires(p), p.name
    ssiap = _texte_sans_commentaires(SEO / "SsiapPage.jsx")
    assert "dispose d'un effectif conséquent d'agents ssiap 1 opérationnels" in ssiap
    assert "peut fournir ce niveau d'expertise" in ssiap
    assert "ssiap 1/2/3" in _texte_sans_commentaires(SEO / "ToulonPage.jsx")


def test_le_controle_des_reserves_voit_le_texte_et_pas_les_commentaires():
    # Témoins : une réserve dans une chaîne affichée est vue ; la même dans une ligne de commentaire ne l'est pas.
    import tempfile
    with tempfile.TemporaryDirectory() as dossier:
        fautif = Path(dossier) / "fautif.jsx"
        fautif.write_text("const t = 'Nos binômes interviennent, selon la certification du binôme.';\n", encoding="utf-8")
        assert "selon la certification du binôme" in _texte_sans_commentaires(fautif)
        commente = Path(dossier) / "commente.jsx"
        commente.write_text("  // 13/11/2026 : selon la certification du binôme (ancienne règle).\nconst t = 'x';\n",
                            encoding="utf-8")
        assert "selon la certification du binôme" not in _texte_sans_commentaires(commente)


def test_aucune_garantie_absolue_sur_les_ssiap():
    """Gardé du 13/11/2026 (audit du site de Mathilde) : la prestation est assurée, jamais « garantie »."""
    for p in SEO.glob("*.jsx"):
        assert not re.search(r"SSIAP\s*(?:2|3|2 et 3|1, 2 et 3)\s*garantis", _lire(p)), p.name


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
                      "multiplie par cinq", "plus de 90 %", "90%", "jauges allant de", "Sixième ville de France",
                      "Quatrième ville de France", "cinquième ville de France", "trois pôles", "équipes opérationnelles sur",
                      "plus de 20 familles", "trois agents de sécurité", "1 agent pour", "millions de touristes"):
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


def test_phrase_au_passe_de_l_evenementiel_mot_pour_mot():
    """site-12 (15/11/2026) : la phrase au passé reste celle du site en ligne, sans le secteur."""
    texte = _lire(SEO / "EvenementielPage.jsx")
    assert PHRASES_AU_PASSE_GARDEES[0] in texte
    assert "a sécurisé de nombreux concerts et festivals de Bordeaux" not in texte


def test_aucune_ville_declaree_pour_la_societe_de_protection_rapprochee():
    """site-17 (15/11/2026) : aucune ville déclarée à Google pour MTJ Sécurité Rapprochée tant que son Kbis
    n'est pas lu ; l'adresse ne porte que le pays."""
    page = _lire(SEO / "ProtectionRapprocheePage.jsx")
    assert "ville: 'Nice'" not in page
    assert "ville: null" in page
    gabarit = _lire(SEO / "SeoPageLayout.jsx")
    assert '{ "@type": "PostalAddress", "addressCountry": "FR" }' in gabarit


def test_numero_cnaps_de_mtj_securite_privee_celui_de_la_decision():
    """15/11/2026 (Théo, 15/11/2026 16:07, « Numero cnaps: Decision 2123-05-23 ») : le numéro de MTJ Sécurité Privée est celui de la décision du CNAPS du 23/05/2024 ;
    l'ancien numéro du site (date de la demande, sur aucune pièce) n'apparaît nulle part."""
    donnees = _lire(SRC / "data" / "mock.js")
    assert 'authorization: "AUT-083-2123-05-23-20240933884"' in donnees
    for f in list(SEO.glob("*.jsx")) + [SRC / "components" / "Footer.jsx", SRC / "pages" / "MentionsLegalesPage.jsx",
                                        SRC / "data" / "mock.js"]:
        assert "2024084324" not in _lire(f), f.name
