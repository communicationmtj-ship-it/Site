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
    return TestClient(server.app), base, envois


def _devis(ts, **extra):
    data = {
        "name": "Visiteur Fictif", "email": "visiteur.fictif@example.com", "phone": "00 00 00 00 00",
        "serviceType": "SSIAP", "message": "Besoin fictif", "consent": "true", "ts": ts,
    }
    data.update(extra)
    return data


def test_devis_ouvert_depuis_plus_de_24h_refus_visible_et_rien_d_enregistre(client_site):
    client, base, envois = client_site
    r = client.post("/api/quote", data=_devis(str(time.time() - 25 * 3600)),
                    headers={"X-Forwarded-For": "10.13.11.31"})
    corps = r.json()
    assert corps["status"] == "error", "un onglet ouvert depuis plus de 24 h ne doit pas recevoir « Merci »"
    assert "rechargez la page" in corps["message"]
    assert base.quotes.docs == [] and envois == []


def test_contact_ouvert_depuis_plus_de_24h_refus_visible(client_site):
    client, base, envois = client_site
    r = client.post("/api/contact", data={
        "name": "Visiteur Fictif", "email": "visiteur.fictif@example.com", "subject": "Sujet", "message": "x",
        "consent": "true", "ts": str(time.time() - 30 * 3600),
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
    r = client.post("/api/quote", data=_devis(ts), headers={"X-Forwarded-For": ip})
    assert r.json()["status"] == "success"  # réponse silencieuse pour le robot
    assert base.quotes.docs == [] and envois == []


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


PHRASES_NEUTRALISEES = ["intégrité physique", "techniques les plus avancées"]


def test_phrases_neutralisees_sur_les_pages_ne_reviennent_pas_sur_l_accueil():
    fichiers = [p for p in SRC.rglob("*") if p.suffix in (".js", ".jsx") and "components/ui" not in p.as_posix()]
    trouvees = [
        f"{p.relative_to(REPO)} : « {phrase} »"
        for p in fichiers
        for phrase in PHRASES_NEUTRALISEES
        if phrase in _lire(p)
    ]
    assert not trouvees, "\n".join(trouvees)
