"""Essais hors ligne de la connexion au tableau d'administration du site (13/11/2026).

Décision de Théo (point du 13/11/2026 avant la mise en ligne) : le tableau s'ouvre avec le
compte FONDATEUR du logiciel MTJ (« les mêmes que le compte admin du logiciel »). Le site
transmet l'adresse e-mail et le mot de passe saisis à la route de connexion du logiciel,
SIMULÉE ici (httpx.MockTransport) : aucun serveur, aucune base, aucun envoi, aucun vrai
compte. Valeurs fictives uniquement (adresses e-mail en example.test, adresses IP de
documentation 203.0.113.x).

Lancement (depuis backend/) :
    python -m pytest -x -q -p no:cacheprovider tests/test_site_connexion_logiciel_13_11.py
"""
import asyncio
import json
import logging
import os
import subprocess
import sys
from pathlib import Path

import httpx
import pytest

BACKEND = Path(__file__).resolve().parent.parent
REPO = BACKEND.parent
DASHBOARD_JSX = REPO / "frontend" / "src" / "pages" / "Dashboard.jsx"

if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

# database.py lit ces deux variables à l'import ; aucune connexion n'est ouverte par les essais.
os.environ.setdefault("MONGO_URL", "mongodb://127.0.0.1:1")
os.environ.setdefault("DB_NAME", "essai_site_connexion_13_11")

ADRESSE_LOGICIEL_ESSAI = "https://logiciel.example.test"
MDP_FONDATEUR = "mdp-fictif-fondateur-13-11"
MDP_EXPLOITATION = "mdp-fictif-exploitation-13-11"
MDP_CHEF = "mdp-fictif-chef-13-11"
MDP_AGENT = "mdp-fictif-agent-13-11"
# Rôles tels que le logiciel les écrit en base : admin = Fondateur (seul accepté par le site).
COMPTES = {
    "fondateur@example.test": (MDP_FONDATEUR, "admin"),
    "exploitation@example.test": (MDP_EXPLOITATION, "exploitation"),
    "chef@example.test": (MDP_CHEF, "chef_equipe"),
    # Le vrai logiciel répond déjà 401 à un compte d'agent ; ici 200, pour prouver que le
    # site refuse quand même tout rôle qui n'est pas fondateur.
    "agent@example.test": (MDP_AGENT, "agent"),
}
TOUS_LES_MDP = (MDP_FONDATEUR, MDP_EXPLOITATION, MDP_CHEF, MDP_AGENT)


class LogicielSimule:
    """Route POST /api/auth/login du logiciel, simulée comme backend/routes/auth.py du
    logiciel (lu le 13/11/2026 sur origin/main) : 200 + {id, email, name, role} + cookies
    de session ; 401 « Invalid email or password » ; 429 + Retry-After quand la connexion
    du compte est suspendue. `mode` simule les pannes et les réponses inattendues."""

    def __init__(self):
        self.mode = "normal"
        self.delai = 0.0
        self.appels = []

    async def __call__(self, request: httpx.Request) -> httpx.Response:
        self.appels.append(request)
        if self.delai:
            await asyncio.sleep(self.delai)
        if self.mode == "injoignable":
            raise httpx.ConnectError("connexion refusée (simulée)", request=request)
        if self.mode == "delai_depasse":
            raise httpx.ReadTimeout("délai dépassé (simulé)", request=request)
        if self.mode in ("500", "502", "503"):
            return httpx.Response(int(self.mode), text="<html>panne simulée</html>")
        if self.mode == "bloque":
            return httpx.Response(429, headers={"Retry-After": "900"}, json={"detail": "Trop d'essais (simulé)"})
        if self.mode == "sans_role":
            return httpx.Response(200, json={"id": "id-fictif", "email": "fondateur@example.test"})
        if self.mode == "page_html":
            return httpx.Response(200, text="<html>page inattendue</html>")
        if self.mode == "redirection":
            return httpx.Response(302, headers={"Location": "https://ailleurs.example.test/connexion"})
        if request.method != "POST" or request.url.path != "/api/auth/login":
            return httpx.Response(404, json={"detail": "Not Found"})
        corps = json.loads(request.content or b"{}")
        email = str(corps.get("email", "")).lower().strip()
        compte = COMPTES.get(email)
        if not compte or corps.get("password") != compte[0]:
            return httpx.Response(401, json={"detail": "Invalid email or password"})
        return httpx.Response(
            200,
            json={"id": "id-fictif", "email": email, "name": "Compte fictif", "role": compte[1]},
            headers=[
                ("set-cookie", "access_token=jeton-fictif-acces; HttpOnly; Secure; Path=/"),
                ("set-cookie", "refresh_token=jeton-fictif-rafraichissement; HttpOnly; Secure; Path=/"),
            ],
        )


def _remise_a_zero():
    import middleware
    import security

    for ip in list(security._login_failures):
        if ip.startswith("203.0.113."):
            security._login_failures.pop(ip, None)
    for cle in list(middleware._rate_store):
        if cle.startswith("203.0.113."):
            middleware._rate_store.pop(cle, None)


@pytest.fixture()
def logiciel(monkeypatch):
    import security

    simule = LogicielSimule()
    monkeypatch.setenv("LOGICIEL_URL", ADRESSE_LOGICIEL_ESSAI)
    monkeypatch.setattr(security, "_transport_logiciel", lambda: httpx.MockTransport(simule))
    _remise_a_zero()
    yield simule
    _remise_a_zero()


@pytest.fixture()
def client():
    from fastapi.testclient import TestClient
    import server

    return TestClient(server.app)


def _connexion(client, ip, email, mdp):
    return client.post(
        "/api/dashboard/login",
        json={"username": email, "password": mdp},
        headers={"X-Real-IP": ip},
    )


# ─── Succès : le compte fondateur du logiciel ouvre le tableau ───────────────────

def test_le_compte_fondateur_du_logiciel_ouvre_le_tableau(client, logiciel):
    import security

    ip = "203.0.113.101"
    r = _connexion(client, ip, "  Fondateur@Example.test ", MDP_FONDATEUR)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "success" and len(data["token"]) == 64

    # Une seule question au logiciel : sa route de connexion, en https, avec ce qui a été saisi.
    assert len(logiciel.appels) == 1
    appel = logiciel.appels[0]
    assert appel.method == "POST"
    assert str(appel.url) == ADRESSE_LOGICIEL_ESSAI + "/api/auth/login"
    assert json.loads(appel.content) == {"email": "Fondateur@Example.test", "password": MDP_FONDATEUR}

    # Les jetons de session du logiciel ne sont jamais transmis au visiteur.
    assert "set-cookie" not in r.headers
    assert "jeton-fictif" not in r.text

    # Le jeton du site ouvre le tableau ; le succès remet le compteur d'échecs à zéro.
    v = client.get("/api/dashboard/verify", headers={"Authorization": f"Bearer {data['token']}"})
    assert v.json() == {"status": "ok"}
    assert ip not in security._login_failures


# ─── Refus : autre rôle, mauvais mot de passe, adresse ou mot de passe vide ──────

@pytest.mark.parametrize(
    "email,mdp",
    [
        ("exploitation@example.test", MDP_EXPLOITATION),
        ("chef@example.test", MDP_CHEF),
        ("agent@example.test", MDP_AGENT),
    ],
)
def test_un_compte_qui_n_est_pas_fondateur_est_refuse(client, logiciel, email, mdp):
    import security

    ip = "203.0.113.102"
    avant = set(security._active_tokens)
    r = _connexion(client, ip, email, mdp)
    assert r.status_code == 200
    assert r.json() == {"status": "error", "message": security.MESSAGE_IDENTIFIANTS_REFUSES}
    assert len(logiciel.appels) == 1  # le logiciel a accepté le mot de passe…
    assert set(security._active_tokens) == avant  # …mais aucun jeton du site n'est donné
    assert security._login_failures[ip]["count"] == 1  # et le refus compte comme un échec


def test_mauvais_mot_de_passe_refuse_et_compte(client, logiciel):
    import security

    ip = "203.0.113.103"
    avant = set(security._active_tokens)
    r = _connexion(client, ip, "fondateur@example.test", "mauvais-mdp-fictif")
    assert r.status_code == 200
    assert r.json() == {"status": "error", "message": security.MESSAGE_IDENTIFIANTS_REFUSES}
    assert security._login_failures[ip]["count"] == 1
    # Adresse inconnue du logiciel : même refus, même message (aucun indice sur l'existence
    # d'un compte ni sur son rôle).
    r2 = _connexion(client, ip, "inconnu@example.test", "mauvais-mdp-fictif")
    assert r2.json() == r.json()
    assert security._login_failures[ip]["count"] == 2
    assert set(security._active_tokens) == avant


def test_adresse_ou_mot_de_passe_vide_refuse_sans_interroger_le_logiciel(client, logiciel):
    import security

    ip = "203.0.113.104"
    reponses = [
        client.post("/api/dashboard/login", json={"password": MDP_FONDATEUR}, headers={"X-Real-IP": ip}),
        _connexion(client, ip, "   ", MDP_FONDATEUR),
        _connexion(client, ip, "fondateur@example.test", ""),
    ]
    for r in reponses:
        assert r.json() == {"status": "error", "message": security.MESSAGE_IDENTIFIANTS_REFUSES}
    assert logiciel.appels == []
    assert security._login_failures[ip]["count"] == 3


# ─── Logiciel injoignable ou réponse inattendue : refus clair, jamais d'ouverture ─

@pytest.mark.parametrize("mode", ["injoignable", "delai_depasse", "500", "502", "503"])
def test_logiciel_injoignable_connexion_refusee_jamais_ouverte(client, logiciel, mode):
    import security

    ip = "203.0.113.105"
    logiciel.mode = mode
    avant = set(security._active_tokens)
    r = _connexion(client, ip, "fondateur@example.test", MDP_FONDATEUR)  # même le bon mot de passe
    assert r.status_code == 503
    assert r.json() == {"status": "error", "message": security.MESSAGE_LOGICIEL_INJOIGNABLE}
    assert "token" not in r.json()
    assert set(security._active_tokens) == avant
    # Rien n'a été vérifié : une panne du logiciel ne bloque pas le fondateur 15 minutes.
    assert ip not in security._login_failures


@pytest.mark.parametrize("mode", ["sans_role", "page_html", "redirection", "introuvable"])
def test_reponse_inattendue_du_logiciel_connexion_refusee(client, logiciel, monkeypatch, mode):
    import security

    ip = "203.0.113.106"
    if mode == "introuvable":
        # Mauvaise adresse posée (chemin en trop) : la route de connexion n'est pas trouvée.
        monkeypatch.setenv("LOGICIEL_URL", ADRESSE_LOGICIEL_ESSAI + "/autre-chemin")
    else:
        logiciel.mode = mode
    avant = set(security._active_tokens)
    r = _connexion(client, ip, "fondateur@example.test", MDP_FONDATEUR)
    assert r.status_code == 503
    assert r.json() == {"status": "error", "message": security.MESSAGE_LOGICIEL_REPONSE_INATTENDUE}
    assert set(security._active_tokens) == avant
    assert ip not in security._login_failures
    # Une redirection n'est jamais suivie : le mot de passe ne part qu'une fois, au logiciel.
    assert len(logiciel.appels) == 1
    assert logiciel.appels[0].url.host == "logiciel.example.test"


@pytest.mark.parametrize("adresse", ["http://logiciel.example.test", "logiciel.example.test", "https://"])
def test_adresse_du_logiciel_non_https_refusee_sans_envoi(client, logiciel, monkeypatch, adresse):
    import security

    monkeypatch.setenv("LOGICIEL_URL", adresse)
    r = _connexion(client, "203.0.113.107", "fondateur@example.test", MDP_FONDATEUR)
    assert r.status_code == 503
    assert r.json() == {"status": "error", "message": security.MESSAGE_LOGICIEL_MAL_REGLE}
    assert logiciel.appels == []  # le mot de passe n'est jamais parti


def test_adresse_par_defaut_du_logiciel(monkeypatch):
    import security

    monkeypatch.delenv("LOGICIEL_URL", raising=False)
    assert security.adresse_logiciel() == "https://app.mtj-securite-privee.fr"
    monkeypatch.setenv("LOGICIEL_URL", " https://logiciel.example.test/ ")
    assert security.adresse_logiciel() == "https://logiciel.example.test"


def test_connexion_suspendue_par_le_logiciel(client, logiciel):
    import security

    ip = "203.0.113.108"
    logiciel.mode = "bloque"
    r = _connexion(client, ip, "fondateur@example.test", MDP_FONDATEUR)
    assert r.status_code == 429
    assert r.headers["Retry-After"] == "900"
    assert r.json() == {
        "status": "error",
        "message": "Trop d'essais sur ce compte : le logiciel MTJ a suspendu sa connexion. Réessayez dans 15 minutes.",
    }
    # Le logiciel compte déjà ses échecs : pas de double compte ici.
    assert ip not in security._login_failures


# ─── Blocage après 5 essais (gardé de 5aa8689) ─────────────────────────────────────

def test_blocage_apres_5_essais_meme_avec_le_bon_mot_de_passe_ensuite(client, logiciel):
    import security

    ip = "203.0.113.109"
    for _ in range(security.LOGIN_MAX_FAILURES):
        r = _connexion(client, ip, "fondateur@example.test", "mauvais-mdp-fictif")
        assert r.status_code == 200 and r.json()["status"] == "error"
    r = _connexion(client, ip, "fondateur@example.test", MDP_FONDATEUR)
    assert r.status_code == 429
    assert int(r.headers["Retry-After"]) > 0
    assert r.json()["message"] == "Trop d'essais : la connexion est suspendue. Réessayez dans 15 minutes."
    assert len(logiciel.appels) == security.LOGIN_MAX_FAILURES  # le 6e essai n'est jamais parti
    # Une autre adresse n'est pas bloquée.
    r = _connexion(client, "203.0.113.110", "fondateur@example.test", MDP_FONDATEUR)
    assert r.json()["status"] == "success"


def test_essais_simultanes_d_une_meme_adresse_ne_depassent_pas_5(logiciel):
    import security

    ip = "203.0.113.111"
    logiciel.delai = 0.02  # chaque réponse du logiciel prend un peu de temps

    async def huit_essais_en_meme_temps():
        return await asyncio.gather(
            *[security.dashboard_login("mauvais-mdp-fictif", ip, "fondateur@example.test") for _ in range(8)],
            return_exceptions=True,
        )

    resultats = asyncio.run(huit_essais_en_meme_temps())
    assert len(logiciel.appels) == security.LOGIN_MAX_FAILURES
    assert sum(1 for x in resultats if x is None) == security.LOGIN_MAX_FAILURES
    assert sum(1 for x in resultats if isinstance(x, security.LoginLocked)) == 3
    # Rien ne traîne en mémoire une fois les essais finis.
    assert ip not in security._verrous_par_adresse and ip not in security._essais_en_attente


# ─── Rien n'est gardé : ni mot de passe, ni jeton du logiciel, ni ancien mot de passe ─

def test_le_mot_de_passe_n_est_jamais_garde_ni_ecrit_au_journal(client, logiciel, caplog):
    import security

    caplog.set_level(logging.DEBUG)
    ip = "203.0.113.112"
    _connexion(client, ip, "fondateur@example.test", MDP_FONDATEUR)  # succès
    _connexion(client, ip, "fondateur@example.test", "mauvais-" + MDP_FONDATEUR)  # refus
    _connexion(client, ip, "exploitation@example.test", MDP_EXPLOITATION)  # rôle refusé
    _connexion(client, ip, "agent@example.test", MDP_AGENT)  # rôle refusé
    logiciel.mode = "injoignable"
    _connexion(client, ip, "fondateur@example.test", MDP_FONDATEUR)  # logiciel injoignable

    journal = caplog.text
    etat = "".join(
        repr(x)
        for x in (
            security._active_tokens,
            security._login_failures,
            security._verrous_par_adresse,
            security._essais_en_attente,
        )
    )
    for mdp in TOUS_LES_MDP:
        assert mdp not in journal
        assert mdp not in etat
    assert "jeton-fictif" not in journal and "jeton-fictif" not in etat
    # Le journal du serveur ne nomme personne : pas d'adresse e-mail saisie.
    assert "@example.test" not in journal
    # Les refus sont bien écrits au journal (échec visible), sans donnée.
    assert "n'est pas fondateur" in journal and "injoignable" in journal


def test_l_ancien_mot_de_passe_du_site_n_ouvre_plus_rien(client, logiciel, monkeypatch):
    import security

    assert not hasattr(security, "DASHBOARD_PASSWORD") and not hasattr(security, "DASHBOARD_USER")
    source = (BACKEND / "security.py").read_text(encoding="utf-8")
    assert 'environ.get("DASHBOARD_PASSWORD"' not in source
    assert 'environ.get("DASHBOARD_USER"' not in source

    monkeypatch.setenv("DASHBOARD_PASSWORD", "ancien-mdp-fictif")
    monkeypatch.setenv("DASHBOARD_USER", "ancien-identifiant-fictif")
    ip = "203.0.113.113"
    r1 = client.post("/api/dashboard/login", json={"password": "ancien-mdp-fictif"}, headers={"X-Real-IP": ip})
    r2 = _connexion(client, ip, "ancien-identifiant-fictif", "ancien-mdp-fictif")
    assert r1.json()["status"] == "error" and r2.json()["status"] == "error"
    assert "token" not in r1.json() and "token" not in r2.json()


def test_les_anciennes_variables_sont_signalees_au_demarrage_sans_leur_valeur():
    env = dict(os.environ)
    env["DASHBOARD_PASSWORD"] = "ancien-mdp-fictif"
    env["DASHBOARD_USER"] = "ancien-identifiant-fictif"
    sortie = subprocess.run(
        [sys.executable, "-B", "-c", "import security"],
        cwd=str(BACKEND),
        env=env,
        capture_output=True,
        text=True,
        timeout=60,
    )
    assert sortie.returncode == 0, sortie.stderr
    assert "DASHBOARD_PASSWORD n'est plus lu" in sortie.stderr
    assert "DASHBOARD_USER n'est plus lu" in sortie.stderr
    assert "ancien-mdp-fictif" not in sortie.stderr and "ancien-identifiant-fictif" not in sortie.stderr


# ─── Écran de connexion du tableau ──────────────────────────────────────────────

def test_ecran_de_connexion_demande_le_compte_fondateur_du_logiciel():
    src = DASHBOARD_JSX.read_text(encoding="utf-8")
    assert "compte fondateur du logiciel MTJ" in src
    assert 'type="email"' in src and 'placeholder="Adresse e-mail du logiciel"' in src
    assert "JSON.stringify({ username: username.trim(), password })" in src
    # Blocage (429), logiciel injoignable (503) : le message du serveur est affiché.
    assert "data.message || data.detail" in src
    assert "setAuthError(data.message)" in src
    # Le mot de passe saisi est effacé de l'écran une fois la connexion faite.
    assert "setPassword('')" in src
