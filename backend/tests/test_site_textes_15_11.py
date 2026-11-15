# -*- coding: utf-8 -*-
"""Réglages de texte du site décidés par Théo le 15/11/2026 à 15:14 (« Site textes: Oui les 4 »).

1. Les accents que Mathilde avait remis (perdus par la règle « mot pour mot ») reviennent ; rien d'autre ne change.
2. La phrase de l'article L612-14 est complète pour les deux sociétés et le bloc CNAPS du pied de page se voit
   aussi sur téléphone.
3. Les 4 pages de villes en ligne (Toulon, Nice et Monaco, Toulouse, Bordeaux) ne citent plus d'événement nommé
   ni de preuve d'activité locale, et les phrases de couverture de tout un département sortent hors du siège.
   Rien n'est réécrit : une phrase sort entière, ou une parenthèse de noms ; une partie vide sort.
4. Les délais d'intervention restent mot pour mot (déjà gardé par les essais du 13/11/2026).
"""
import re
import subprocess
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
SRC = REPO / "frontend" / "src"
SEO = SRC / "pages" / "seo"
COMMIT_EN_LIGNE = "9561a0a"
# Version de la branche juste avant ces réglages (décisions du 13/11 et du 15/11/2026 matin déjà appliquées,
# dont « sans chiffre ») : les 4 pages ne font qu'en retirer des phrases ou des parenthèses de noms.
COMMIT_AVANT = "8e0eb54"


def _lire(p: Path) -> str:
    return p.read_text(encoding="utf-8")


def _en_ligne(chemin: str, commit: str = COMMIT_EN_LIGNE) -> str:
    r = subprocess.run(["git", "-C", str(REPO), "show", f"{commit}:{chemin}"], capture_output=True, text=True)
    assert r.returncode == 0, f"texte du site en ligne illisible ({chemin}) : {r.stderr.strip()}"
    return r.stdout


def test_accents_de_mathilde_remis():
    contact = _lire(SRC / "components" / "ContactPage.jsx")
    for juste in ("Message envoyé !", "Nous vous répondrons dans les plus brefs délais.", "Veuillez réessayer.",
                  'alt="Contact MTJ Sécurité"', ">Téléphone</h4>", ">Téléphone</label>", ">Réponse sous 24h</p>",
                  ">Pièce jointe (optionnel)</label>", "Fichier sélectionné : "):
        assert juste in contact, juste
    for faux in ("Message envoye", "repondrons", "reessayer", "Securite\"", ">Telephone<", ">Reponse ", ">Piece ", "selectionne :"):
        assert faux not in contact, faux
    engagement = _lire(SRC / "components" / "Engagement.jsx")
    for faux in ("Determiner", "l'ethique", "l'egalite", "Qualite", " a savoir", " a structurer", " a travers",
                 "loyaute", "presente", "generale", " a l'occasion", " a fournir", "nécessaires a la", "aux cotes"):
        assert faux not in engagement, faux
    assert "Politique Qualité et RSE E-SA-01- V1" in engagement, "seul l'accent change, la référence reste celle en ligne"
    assert ">Société du groupe MTJ</span>" in _lire(SRC / "components" / "Services.jsx")
    assert 'name: "MTJ SÉCURITÉ PRIVÉE",' in _lire(SRC / "data" / "mock.js")


def test_accents_seulement_rien_d_autre_ne_change():
    import unicodedata

    def sans_accents(t):
        t = t.replace("à", "a").replace("À", "A")
        return "".join(c for c in unicodedata.normalize("NFD", t) if unicodedata.category(c) != "Mn")

    for chemin in ("frontend/src/components/Engagement.jsx", "frontend/src/components/Services.jsx"):
        assert sans_accents(_lire(REPO / chemin)) == sans_accents(_en_ligne(chemin)), chemin


def test_mention_l612_14_complete_et_visible_sur_telephone():
    footer = _lire(SRC / "components" / "Footer.jsx")
    bloc = re.search(r'<div className="([^"]*)" data-testid="cnaps-block">', footer)
    assert bloc and "hidden" not in bloc.group(1).split(), "le bloc CNAPS doit se voir à toutes les largeurs"
    complete = ("L612-14 du CSI L'autorisation administrative préalable ne confère aucun caractère officiel à "
                "l'entreprise ou aux personnes qui en bénéficient. Elle n'engage en aucune manière la responsabilité "
                "des pouvoirs publics.")
    assert footer.count(complete) == 2, "phrase complète pour MTJ Sécurité Privée et MTJ Sécurité Rapprochée"
    assert "md:text-right" in bloc.group(1) and "md:flex-row" in footer, "sur ordinateur, rien ne bouge"


PAGES = {
    "ToulonPage.jsx": True,  # siège : la couverture du bassin toulonnais reste
    "NiceMonacoPage.jsx": False,
    "ToulousePage.jsx": False,
    "BordeauxPage.jsx": False,
}
EVENEMENTS = ["RCT", "Rugby Club Toulonnais", "Mayol", "Six Fours", "Festival de Cannes", "Festival International",
              "MIPIM", "MIPCOM", "Cannes Lions", "Grand Prix", "Monte-Carlo Masters", "Carnaval", "Stade Toulousain",
              "TFC", "Rio Loco", "Violette", "MEETT", "Fête le Vin", "Girondins", "UBB", "Vinexpo", "Cité du Vin",
              "Airbus", "Thales", "Safran"]
PREUVES = ["Nous disposons d'une expérience", "Nous intervenons régulièrement", "Nous intervenons sur les zones",
           "sécurise ces manifestations", "assure la sécurisation de ces manifestations"]
COUVERTURE = ["équipes couvrent l\\'ensemble", "agents couvrent l\\'ensemble", "l\\'ensemble de ce territoire",
              "Nous couvrons également",
              "dans l\\'ensemble de l\\'Occitanie", "Nous intervenons sur l\\'ensemble de la Gironde"]
PARENTHESES_RETIREES = ["(Festival de Cannes, Grand Prix de Monaco, Carnaval de Nice) ", "(Airbus, Thales, Safran)",
                        "usines Airbus, "]


def test_pages_de_villes_sans_evenement_ni_preuve():
    for nom, siege in PAGES.items():
        texte = re.sub(r"^\s*//[^\n]*$", "", _lire(SEO / nom), flags=re.MULTILINE)
        for mot in EVENEMENTS + PREUVES:
            assert not re.search(r"(?<![\w-])" + re.escape(mot) + r"(?![\w-])", texte), f"{nom} : « {mot} »"
        if not siege:
            for phrase in COUVERTURE:
                assert phrase not in texte, f"{nom} : « {phrase} »"


def test_pages_de_villes_rien_n_est_reecrit():
    """Chaque phrase restante des 4 pages est une phrase d'avant ces réglages (parenthèses de noms retirées)."""
    for nom in PAGES:
        chemin = f"frontend/src/pages/seo/{nom}"
        en_ligne = _en_ligne(chemin, COMMIT_AVANT)
        for parenthese in PARENTHESES_RETIREES:
            en_ligne = en_ligne.replace(parenthese, "")
        en_ligne = re.sub(r"\s+", " ", en_ligne)
        branche = re.sub(r"^\s*//[^\n]*$", "", _lire(REPO / chemin), flags=re.MULTILINE)
        valeurs = re.findall(r"(?:content|answer|intro|introduction|conclusion): ['`]((?:[^'`\\]|\\.)*)['`]", branche)
        assert valeurs, nom
        for valeur in valeurs:
            for phrase in re.split(r"(?<=[.!?])\s+|\\n\\n", valeur):
                phrase = re.sub(r"\s+", " ", phrase).strip()
                if len(phrase) < 25 or "${" in phrase:
                    continue
                assert phrase in en_ligne, f"{nom} : phrase absente de la version d'avant : « {phrase} »"
