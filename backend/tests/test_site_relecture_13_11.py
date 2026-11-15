"""Essais hors ligne de la relecture adverse du site vitrine (13/11/2026).

Aucun serveur, aucune base, aucun envoi : la base est remplacée par une fausse base en
mémoire et l'envoi de mail par une fonction simulée. Valeurs fictives uniquement
(adresses IP de documentation 203.0.113.x et 10.13.11.x).

Lancement (depuis backend/) :
    python -m pytest -x -q -p no:cacheprovider tests/test_site_relecture_13_11.py
"""
import os
import re
import sys
import time
from pathlib import Path

import pytest

BACKEND = Path(__file__).resolve().parent.parent
REPO = BACKEND.parent
FRONT = REPO / "frontend"
SRC = FRONT / "src"

if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

# database.py lit ces deux variables à l'import ; aucune connexion n'est ouverte par les essais.
os.environ.setdefault("MONGO_URL", "mongodb://127.0.0.1:1")
os.environ.setdefault("DB_NAME", "essai_site_relecture_13_11")


def _lire(path: Path) -> str:
    return path.read_text(encoding="utf-8")


# ─── Adresse du visiteur : celle du nginx du serveur, pas celle que le visiteur écrit ──

class _FausseRequete:
    def __init__(self, headers, host="172.18.0.5"):
        self.headers = {k.lower(): v for k, v in headers.items()}
        self.client = type("Client", (), {"host": host})()


def test_adresse_du_visiteur_lue_dans_x_real_ip_d_abord():
    from middleware import _get_client_ip

    forgee = _FausseRequete({"X-Forwarded-For": "198.51.100.9, 203.0.113.7", "X-Real-IP": "203.0.113.7"})
    assert _get_client_ip(forgee) == "203.0.113.7"
    # Sans X-Real-IP (essais, poste local) : premier X-Forwarded-For, puis la connexion.
    assert _get_client_ip(_FausseRequete({"X-Forwarded-For": "10.13.11.40"})) == "10.13.11.40"
    assert _get_client_ip(_FausseRequete({})) == "172.18.0.5"


def test_blocage_apres_5_essais_ne_se_contourne_pas_en_changeant_x_forwarded_for():
    from fastapi.testclient import TestClient
    import security
    import server

    ip = "203.0.113.77"
    security._login_failures.pop(ip, None)
    client = TestClient(server.app)
    try:
        for i in range(security.LOGIN_MAX_FAILURES):
            r = client.post(
                "/api/dashboard/login",
                json={"password": "mauvais-essai-fictif"},
                headers={"X-Real-IP": ip, "X-Forwarded-For": f"198.51.100.{i + 1}, {ip}"},
            )
            assert r.status_code == 200 and r.json()["status"] == "error"
        r = client.post(
            "/api/dashboard/login",
            json={"password": "mauvais-essai-fictif"},
            headers={"X-Real-IP": ip, "X-Forwarded-For": f"198.51.100.99, {ip}"},
        )
        assert r.status_code == 429, "le 6e essai doit être bloqué malgré une nouvelle adresse écrite par le visiteur"
        assert int(r.headers["Retry-After"]) > 0
    finally:
        security._login_failures.pop(ip, None)


# ─── Formulaires : un onglet resté ouvert plus de 24 h est prévenu, pas trompé ───────

class _FausseCollection:
    def __init__(self):
        self.docs = []

    async def insert_one(self, doc):
        self.docs.append(dict(doc))

    async def update_one(self, filtre, maj):
        for doc in self.docs:
            if all(doc.get(k) == v for k, v in filtre.items()):
                doc.update(maj.get("$set", {}))


class _FausseBase:
    def __init__(self):
        self.quotes = _FausseCollection()
        self.contacts = _FausseCollection()
        self.recruitments = _FausseCollection()


@pytest.fixture()
def client_site(monkeypatch, tmp_path):
    from fastapi.testclient import TestClient
    import server
    from routers import forms

    base = _FausseBase()
    envois = []
    monkeypatch.setattr(forms, "_get_db", lambda: base)
    monkeypatch.setattr(forms, "UPLOAD_DIR", tmp_path)
    monkeypatch.setattr(forms, "send_quote_email", lambda **kwargs: envois.append(kwargs) or True)
    monkeypatch.setattr(forms, "send_contact_email", lambda **kwargs: envois.append(kwargs) or True)
    monkeypatch.setattr(forms, "send_recruitment_email", lambda **kwargs: envois.append(kwargs) or True)
    return TestClient(server.app), base, envois


def _devis(ts, **extra):
    data = {
        "name": "Visiteur Fictif", "email": "visiteur.fictif@example.com", "phone": "00 00 00 00 00",
        "serviceType": "SSIAP", "message": "Besoin fictif", "consent": "true", "ts": ts,
    }
    data.update(extra)
    return data


# Depuis le 15/11/2026, le formulaire envoie aussi « elapsed » : la durée entre son chargement et l'envoi, lue
# deux fois sur l'horloge du visiteur (backend/security.py). Les essais envoient ce que le navigateur enverrait.

def test_devis_ouvert_depuis_plus_de_24h_refus_visible_et_rien_d_enregistre(client_site):
    client, base, envois = client_site
    r = client.post("/api/quote", data=_devis(str(time.time() - 25 * 3600), elapsed=str(25 * 3600)),
                    headers={"X-Forwarded-For": "10.13.11.31"})
    corps = r.json()
    assert corps["status"] == "error", "un onglet ouvert depuis plus de 24 h ne doit pas recevoir « Merci »"
    assert "rechargez la page" in corps["message"]
    assert base.quotes.docs == [] and envois == []


def test_contact_ouvert_depuis_plus_de_24h_refus_visible(client_site):
    client, base, envois = client_site
    r = client.post("/api/contact", data={
        "name": "Visiteur Fictif", "email": "visiteur.fictif@example.com", "subject": "Sujet", "message": "x",
        "consent": "true", "ts": str(time.time() - 30 * 3600), "elapsed": str(30 * 3600),
    }, headers={"X-Forwarded-For": "10.13.11.32"})
    assert r.json()["status"] == "error"
    assert base.contacts.docs == [] and envois == []


@pytest.mark.parametrize("cas, ip", [
    ("rapide", "10.13.11.33"),   # envoi en moins de 3 secondes : robot
    ("nan", "10.13.11.34"),      # horodatage non fini : passait toutes les comparaisons
    ("", "10.13.11.35"),         # horodatage absent
])
def test_signaux_de_robot_restent_silencieux_et_rien_n_est_enregistre(client_site, cas, ip):
    client, base, envois = client_site
    ts = str(time.time() - 1) if cas == "rapide" else cas  # calculé au moment de l'envoi
    extra = {"elapsed": "1"} if cas == "rapide" else {}
    r = client.post("/api/quote", data=_devis(ts, **extra), headers={"X-Forwarded-For": ip})
    assert r.json()["status"] == "success"  # réponse silencieuse pour le robot
    assert base.quotes.docs == [] and envois == []


# ─── Horloge du visiteur décalée : la vraie demande n'est jamais jetée (relecture adverse du 15/11/2026) ─────
# Avant : « ts » (heure de l'appareil du visiteur) était comparé à l'heure du serveur. Horloge en avance de 2 min
# et formulaire rempli en 60 s : écart de -60 s pris pour un robot, « Merci pour votre demande. » affiché alors que
# rien n'était gardé ni envoyé ; horloge en retard de 25 h : refus que recharger la page ne réglait pas.

SAISIE_SECONDES = 60
AVANCE_2_MIN, RETARD_25_H = 120, -25 * 3600


def _ts_du_visiteur(decalage: int) -> str:
    """« ts » tel que l'écrit un appareil décalé de `decalage` secondes, formulaire chargé il y a 60 s."""
    return str(time.time() + decalage - SAISIE_SECONDES)


@pytest.mark.parametrize("decalage", [AVANCE_2_MIN, RETARD_25_H])
def test_check_honeypot_ignore_le_decalage_de_l_horloge(decalage):
    import security

    security.check_honeypot(None, _ts_du_visiteur(decalage), str(SAISIE_SECONDES))  # ni robot ni formulaire périmé


@pytest.mark.parametrize("formulaire, decalage, ip", [
    ("devis", AVANCE_2_MIN, "10.13.11.60"), ("devis", RETARD_25_H, "10.13.11.61"),
    ("contact", AVANCE_2_MIN, "10.13.11.62"), ("contact", RETARD_25_H, "10.13.11.63"),
    ("recrutement", AVANCE_2_MIN, "10.13.11.64"), ("recrutement", RETARD_25_H, "10.13.11.65"),
])
def test_horloge_decalee_la_demande_est_gardee_et_envoyee(client_site, formulaire, decalage, ip):
    client, base, envois = client_site
    ts = _ts_du_visiteur(decalage)
    commun = {"email": "visiteur.fictif@example.com", "message": "Besoin fictif", "consent": "true",
              "ts": ts, "elapsed": str(SAISIE_SECONDES)}
    if formulaire == "devis":
        r = client.post("/api/quote", data=_devis(ts, elapsed=str(SAISIE_SECONDES)), headers={"X-Forwarded-For": ip})
        gardees, attendu = base.quotes.docs, "Votre demande de devis a ete envoyee avec succes."
    elif formulaire == "contact":
        r = client.post("/api/contact", data={**commun, "name": "Visiteur Fictif", "subject": "Sujet"},
                        headers={"X-Forwarded-For": ip})
        gardees, attendu = base.contacts.docs, "Votre message a ete envoye avec succes."
    else:
        r = client.post("/api/recrutement",
                        data={**commun, "firstName": "Visiteur", "lastName": "Fictif", "phone": "00 00 00 00 00"},
                        files=[("attachments", ("cv.pdf", b"%PDF-1.4 fictif", "application/pdf"))],
                        headers={"X-Forwarded-For": ip})
        gardees, attendu = base.recruitments.docs, "Votre candidature a ete envoyee avec succes."
    corps = r.json()
    assert corps["status"] == "success" and corps["message"].startswith(attendu), corps
    assert len(gardees) == 1 and len(envois) == 1, "demande jetée alors que le visiteur lit « Merci »"


@pytest.mark.parametrize("decalage, ip", [(AVANCE_2_MIN, "10.13.11.66"), (RETARD_25_H, "10.13.11.67")])
def test_onglet_ouvert_avant_la_correction_sans_duree_la_demande_part(client_site, decalage, ip):
    """Un onglet chargé avant cette version n'envoie pas « elapsed » : aucune mesure fiable, la demande passe."""
    client, base, envois = client_site
    r = client.post("/api/quote", data=_devis(_ts_du_visiteur(decalage)), headers={"X-Forwarded-For": ip})
    assert r.json()["message"].startswith("Votre demande de devis a ete envoyee avec succes.")
    assert len(base.quotes.docs) == 1 and len(envois) == 1


def test_les_trois_formulaires_envoient_la_duree_mesuree_par_le_navigateur():
    for nom in ("Quote.jsx", "ContactPage.jsx", "Recrutement.jsx"):
        texte = _lire(SRC / "components" / nom)
        assert "const [formLoadedAt] = useState(() => String(Date.now() / 1000));" in texte, nom
        assert "submitData.append('elapsed', String(Date.now() / 1000 - Number(formLoadedAt)));" in texte, nom
    forms = _lire(BACKEND / "routers" / "forms.py")
    assert forms.count("elapsed: Optional[str] = Form(None),") == 3
    assert forms.count("_check_spam(hp, ts, elapsed, ") == 3


# ─── Tableau d'administration : un comptage impossible ne devient jamais 0 ───────────

def test_tableau_n_affiche_jamais_0_pour_un_comptage_impossible():
    dash = _lire(SRC / "pages" / "Dashboard.jsx")
    assert "mails_non_partis.devis || 0" not in dash and "mails_non_partis.contact || 0" not in dash
    assert "'non compté'" in dash
    assert "mailsComptageImpossible" in dash and "Le comptage a échoué" in dash


# ─── Contenus : protection rapprochée et phrases neutralisées ─────────────────────────

def _descriptions_du_site() -> list:
    textes = []
    index = _lire(FRONT / "public" / "index.html")
    textes += re.findall(r'<meta (?:name|property)="(?:description|og:description|twitter:description)" content="([^"]*)"', index)
    for p in SRC.rglob("*"):
        if p.suffix not in (".js", ".jsx") or "components/ui" in p.as_posix():
            continue
        texte = _lire(p)
        textes += re.findall(r'\bdescription="([^"]*)"', texte)
        textes += re.findall(r"metaDescription:\s*'((?:[^'\\]|\\.)*)'", texte)
    return textes


def test_aucune_description_n_attribue_la_protection_rapprochee_a_mtj_securite_privee():
    textes = _descriptions_du_site()
    assert len(textes) >= 20, "lecture des descriptions incomplète"
    fautives = [t for t in textes if "protection rapprochée" in t.lower() and "MTJ Sécurité Rapprochée" not in t]
    assert not fautives, "\n".join(fautives)


def test_protection_rapprochee_sans_etat_etranger_dans_les_donnees_structurees():
    page = _lire(SRC / "pages" / "seo" / "ProtectionRapprocheePage.jsx")
    zone = re.search(r"areaServed:\s*'([^']*)'", page).group(1)
    assert "Monaco" not in zone and "international" not in zone.lower(), zone


# 15/11/2026 05:56, Théo, sur ses captures de la maquette : « tout ce que je t'ai mis en capture c'est de lamerde
# soit ca veux rien dire donc soit tu met pas soit tu laisse ce qui etait ». Les textes capturés ne reviennent
# pas ; le texte du site en ligne revient à leur place (« intégrité physique » et « techniques les plus
# avancées », retirés le 13/11/2026, sont donc de nouveau permis).
PHRASES_CAPTUREES = [
    "Intervention 24/7 · Sécurité cynophile avec maître-chien", "formés à la surveillance et à la détection",
    "avec une permanence joignable 24/7", "Société du groupe MTJ", "Besoin urgent ?", "Permanence téléphonique",
    "Entreprise autorisée", "Nos engagements en 5 points", "Voir tout notre secteur", "unité CYNODEX", "unités CYNODEX",
    "équipes CYNODEX", "binômes CYNODEX", "cellule CYNODEX", "certifiés CYNODEX",
]


def _texte_sans_commentaires(texte: str) -> str:
    return re.sub(r"\{/\*[\s\S]*?\*/\}|/\*[\s\S]*?\*/|^\s*//[^\n]*$", "", texte, flags=re.MULTILINE)


def test_les_phrases_capturees_par_theo_ne_reviennent_pas():
    fichiers = [p for p in SRC.rglob("*") if p.suffix in (".js", ".jsx") and "components/ui" not in p.as_posix()]
    trouvees = [
        f"{p.relative_to(REPO)} : « {phrase} »"
        for p in fichiers
        for phrase in PHRASES_CAPTUREES
        if phrase in _texte_sans_commentaires(_lire(p))
    ]
    assert not trouvees, "\n".join(trouvees)
    mock = _lire(SRC / "data" / "mock.js")
    assert "maîtres-chiens formés aux techniques les plus avancées de surveillance et de détection" in mock
    assert "garantissent votre intégrité physique en toute discrétion" in mock


# ─── Mention CNAPS de MTJ Sécurité Rapprochée visible sur téléphone (relecture adverse du 15/11/2026) ─────────
# La branche l'avait retirée de la carte de l'accueil et de l'introduction de la page Protection rapprochée pour ne
# la garder que dans le bloc du pied de page, masqué sous 768 px (« hidden md:block ») : sur téléphone, elle
# n'apparaissait plus sur aucune page (hors Mentions légales). Elle revient aux deux endroits, mot pour mot.

def _en_ligne(chemin: str) -> str:
    """Texte d'un fichier tel qu'il est sur le site en ligne (version du 04/11/2026, commit 9561a0a)."""
    import subprocess

    r = subprocess.run(["git", "-C", str(REPO), "show", f"9561a0a:{chemin}"], capture_output=True, text=True)
    assert r.returncode == 0, f"texte du site en ligne illisible ({chemin}) : {r.stderr.strip()}"
    return r.stdout


def test_mention_cnaps_de_mtj_securite_rapprochee_visible_sur_telephone():
    def ligne_legale(texte):
        return [ligne.strip() for ligne in texte.splitlines() if ligne.strip().startswith("legalNotice:")]

    mock = _lire(SRC / "data" / "mock.js")
    assert ligne_legale(mock) == ligne_legale(_en_ligne("frontend/src/data/mock.js")), "carte de l'accueil"
    assert "AUT-006-2123-10-21-20240955994" in ligne_legale(mock)[0]
    services = _lire(SRC / "components" / "Services.jsx")
    rendu = services.split("{service.legalNotice && (")[1].split("</p>")[0]
    assert "hidden" not in rendu, "la carte doit montrer la mention à toutes les largeurs d'écran"

    def introduction(texte):
        return re.search(r"introduction: `([^`]*)`", texte).group(1)

    chemin = "frontend/src/pages/seo/ProtectionRapprocheePage.jsx"
    intro = introduction(_lire(REPO / chemin))
    assert intro == introduction(_en_ligne(chemin)), "introduction de la page Protection rapprochée"
    assert intro.endswith("Elle n'engage en aucune manière la responsabilité des pouvoirs publics.")
    assert "AUT-006-2123-10-21-20240955994" in intro
