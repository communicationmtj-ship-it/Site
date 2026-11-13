import re
import os
import math
import asyncio
import hashlib
import secrets
import logging
from datetime import datetime, timezone
from typing import Optional

import httpx

logger = logging.getLogger(__name__)

# ─── Input Validation ────────────────────────────────────────────

EMAIL_RE = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")
PHONE_RE = re.compile(r"^[\d\s\+\-\.\(\)]{6,20}$")

MAX_FIELD_LENGTH = {
    "name": 200,
    "email": 254,
    "phone": 20,
    "subject": 300,
    "message": 5000,
    "company": 200,
    "serviceType": 100,
    "firstName": 100,
    "lastName": 100,
}

ALLOWED_UPLOAD_EXTENSIONS = {".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"}
ALLOWED_MIME_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
}
MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10 MB per file
MAX_TOTAL_UPLOAD_SIZE = 20 * 1024 * 1024  # 20 MB total


def sanitize_text(value: str) -> str:
    if not value:
        return value
    value = value.replace("<", "&lt;").replace(">", "&gt;")
    value = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", value)
    return value.strip()


def validate_field(name: str, value: str) -> str:
    max_len = MAX_FIELD_LENGTH.get(name, 1000)
    if len(value) > max_len:
        raise ValueError(f"Le champ '{name}' depasse la longueur maximale ({max_len} caracteres).")
    return sanitize_text(value)


def validate_email(email: str) -> str:
    email = email.strip()
    if not EMAIL_RE.match(email):
        raise ValueError("Adresse email invalide.")
    return email


def validate_phone(phone: str) -> str:
    phone = phone.strip()
    if phone and not PHONE_RE.match(phone):
        raise ValueError("Numero de telephone invalide.")
    return phone


def validate_upload(file) -> None:
    from pathlib import Path
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_UPLOAD_EXTENSIONS:
        raise ValueError(f"Type de fichier non autorise ({ext}). Formats acceptes : PDF, DOC, DOCX, JPG, PNG.")
    content_type = getattr(file, "content_type", "") or ""
    if content_type and content_type not in ALLOWED_MIME_TYPES:
        if ext not in (".doc", ".docx"):
            raise ValueError(f"Type MIME non autorise ({content_type}).")


# Signatures (premiers octets) des formats acceptés : on vérifie le contenu réel,
# pas seulement l'extension ni le type annoncé par le navigateur.
_MAGIC_SIGNATURES = (
    b"%PDF-",                      # PDF
    b"\xff\xd8\xff",                # JPEG
    b"\x89PNG\r\n\x1a\n",           # PNG
    b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1",  # DOC (ancien format Word)
    b"PK\x03\x04",                # DOCX (archive zip)
)


def validate_upload_size(file_bytes: bytes) -> None:
    if len(file_bytes) == 0:
        raise ValueError("Le fichier est vide.")
    if len(file_bytes) > MAX_UPLOAD_SIZE:
        raise ValueError(f"Fichier trop volumineux. Taille maximale : {MAX_UPLOAD_SIZE // (1024*1024)} Mo.")
    if not file_bytes.startswith(_MAGIC_SIGNATURES):
        raise ValueError("Le contenu du fichier ne correspond pas à un format accepté (PDF, DOC, DOCX, JPG, PNG).")


# ─── Honeypot + Timestamp Anti-Spam ─────────────────────────────

MIN_SUBMIT_TIME_SECONDS = 3


MAX_FORM_AGE_SECONDS = 24 * 3600

# Formulaire chargé depuis plus de 24 h : refus visible, pas réponse silencieuse.
FORM_EXPIRED = "FORM_EXPIRED"
FORM_EXPIRED_MESSAGE = (
    "Ce formulaire est ouvert depuis plus de 24 heures et votre demande n'a pas été transmise : "
    "rechargez la page, puis renvoyez-la."
)


def check_honeypot(honeypot_value: Optional[str], form_loaded_at: Optional[str]) -> None:
    """Champ piège + horodatage du chargement du formulaire.

    Les trois formulaires du site (devis, contact, recrutement) envoient toujours
    le champ « ts » : son absence, une valeur illisible ou non finie, ou un envoi en
    moins de 3 secondes sont traités comme du spam (réponse silencieuse).
    Un envoi plus de 24 h après le chargement n'est pas un robot mais un onglet resté
    ouvert (relecture du 13/11/2026) : refus VISIBLE (FORM_EXPIRED), pour que le
    visiteur recharge la page au lieu de croire partie une demande ni gardée ni envoyée.
    """
    if honeypot_value:
        logger.warning("Honeypot triggered")
        raise ValueError("SPAM_DETECTED")

    try:
        loaded = float(form_loaded_at)
    except (ValueError, TypeError):
        logger.warning("Form submitted without a valid timestamp")
        raise ValueError("SPAM_DETECTED")
    if not math.isfinite(loaded):
        # « nan » passait toutes les comparaisons de durée.
        logger.warning("Form submitted without a valid timestamp")
        raise ValueError("SPAM_DETECTED")
    elapsed = datetime.now(timezone.utc).timestamp() - loaded
    if elapsed < MIN_SUBMIT_TIME_SECONDS:
        logger.warning(f"Form submitted too fast: {elapsed:.1f}s")
        raise ValueError("SPAM_DETECTED")
    if elapsed > MAX_FORM_AGE_SECONDS:
        logger.warning(f"Form older than 24 h: {elapsed:.0f}s")
        raise ValueError(FORM_EXPIRED)


# ─── Dashboard Auth ──────────────────────────────────────────────
#
# 13/11/2026 — décision de Théo (point du 13/11/2026 avant la mise en ligne, mot de passe
# du tableau d'administration du site) : « les mêmes que le compte admin du logiciel ».
# Le site ne connaît plus AUCUN mot de passe : l'ancien mot de passe par défaut écrit dans
# le code est supprimé, DASHBOARD_PASSWORD et DASHBOARD_USER ne sont plus lus. L'adresse
# e-mail et le mot de passe saisis sont transmis, par HTTPS, à la route de connexion du
# logiciel MTJ (POST <LOGICIEL_URL>/api/auth/login), qui seule les vérifie ; seul un compte
# FONDATEUR du logiciel (rôle « admin » en base, libellé « Fondateur ») ouvre le tableau.
# Rien n'est gardé : ni le mot de passe (jamais écrit au journal), ni les jetons de session
# que le logiciel renvoie (cookies jetés avec le client HTTP, jamais transmis au visiteur).
# Logiciel injoignable, adresse mal réglée ou réponse inattendue : connexion REFUSÉE avec
# un message clair, jamais ouverte par défaut.

LOGICIEL_URL_PAR_DEFAUT = "https://app.mtj-securite-privee.fr"
LOGICIEL_ROUTE_CONNEXION = "/api/auth/login"
LOGICIEL_DELAI_SECONDES = 10.0
# Rôle fondateur tel que le logiciel l'écrit en base (backend/utils/permissions.py du
# logiciel : ROLE_LABELS["admin"] = "Fondateur" ; les autres rôles sont refusés ici).
ROLE_FONDATEUR_LOGICIEL = "admin"

# Même message pour un mauvais mot de passe et pour un compte qui n'est pas fondateur :
# comme le logiciel, le site ne dit pas si un compte existe ni quel est son rôle.
MESSAGE_IDENTIFIANTS_REFUSES = (
    "Identifiants refusés. Utilisez l'adresse e-mail et le mot de passe de votre compte "
    "fondateur du logiciel MTJ."
)
MESSAGE_LOGICIEL_INJOIGNABLE = (
    "Le logiciel MTJ ne répond pas : vos identifiants n'ont pas pu être vérifiés et le "
    "tableau d'administration reste fermé. Réessayez dans quelques minutes."
)
MESSAGE_LOGICIEL_REPONSE_INATTENDUE = (
    "Le logiciel MTJ a fait une réponse inattendue : par prudence, le tableau "
    "d'administration reste fermé. Réessayez dans quelques minutes ; si cela continue, "
    "le réglage du serveur du site est à vérifier."
)
MESSAGE_LOGICIEL_MAL_REGLE = (
    "L'adresse du logiciel MTJ est mal réglée sur le serveur du site (une adresse https "
    "est exigée) : le tableau d'administration reste fermé."
)

# Anciennes variables du mot de passe propre au site : plus lues. Leur présence est
# signalée au démarrage (le nom seul, jamais la valeur) pour qu'elles soient retirées.
for _ancienne_variable in ("DASHBOARD_PASSWORD", "DASHBOARD_USER"):
    if _ancienne_variable in os.environ:
        logger.warning(
            "%s n'est plus lu depuis le 13/11/2026 (connexion par le compte fondateur du "
            "logiciel MTJ) : à retirer du fichier d'environnement du site",
            _ancienne_variable,
        )

_active_tokens: dict[str, float] = {}
TOKEN_EXPIRY = 3600  # 1 hour

# Limitation des essais : 5 échecs, puis blocage de 15 minutes (par adresse).
LOGIN_MAX_FAILURES = 5
LOGIN_LOCK_SECONDS = 15 * 60
_login_failures: dict[str, dict] = {}

# Essais d'une même adresse passés un par un (voir dashboard_login).
_verrous_par_adresse: dict[str, asyncio.Lock] = {}
_essais_en_attente: dict[str, int] = {}


class LoginLocked(Exception):
    def __init__(self, retry_after: int):
        super().__init__("LOGIN_LOCKED")
        self.retry_after = retry_after


def _en_minutes(secondes: int) -> str:
    n = max(1, math.ceil(secondes / 60))
    return f"{n} minute{'s' if n > 1 else ''}"


def message_trop_d_essais(secondes: int) -> str:
    """Blocage du site après 5 essais refusés depuis la même adresse."""
    return f"Trop d'essais : la connexion est suspendue. Réessayez dans {_en_minutes(secondes)}."


class LogicielBloque(Exception):
    """Le logiciel a suspendu la connexion de ce compte (trop d'essais) : refus.

    Pas compté comme un échec du site : le logiciel n'a rien vérifié, il compte déjà
    lui-même ses échecs et prévient les fondateurs."""

    def __init__(self, retry_after: int):
        super().__init__("LOGICIEL_BLOQUE")
        self.retry_after = retry_after
        self.message = (
            "Trop d'essais sur ce compte : le logiciel MTJ a suspendu sa connexion. "
            f"Réessayez dans {_en_minutes(retry_after)}."
        )


class LogicielIndisponible(Exception):
    """Le logiciel n'a pas pu vérifier les identifiants : refus, jamais d'ouverture.

    Pas compté comme un échec : rien n'a été vérifié, et une panne du logiciel ne doit pas
    bloquer un fondateur pendant 15 minutes."""

    def __init__(self, cause: str, message: str = MESSAGE_LOGICIEL_INJOIGNABLE):
        super().__init__(cause)
        self.cause = cause
        self.message = message


def _now() -> float:
    return datetime.now(timezone.utc).timestamp()


def login_lock_remaining(ip: str) -> int:
    entry = _login_failures.get(ip)
    if not entry:
        return 0
    remaining = int(entry.get("locked_until", 0) - _now())
    if remaining <= 0 and entry.get("locked_until"):
        del _login_failures[ip]
        return 0
    return max(remaining, 0)


def _noter_echec(ip: str) -> None:
    entry = _login_failures.setdefault(ip, {"count": 0, "locked_until": 0})
    entry["count"] += 1
    if entry["count"] >= LOGIN_MAX_FAILURES:
        entry["locked_until"] = _now() + LOGIN_LOCK_SECONDS
        entry["count"] = 0
        logger.warning(f"Dashboard login locked for {ip} ({LOGIN_LOCK_SECONDS}s)")


def adresse_logiciel() -> str:
    """Adresse du logiciel MTJ : variable LOGICIEL_URL, sinon l'adresse en ligne."""
    return (os.environ.get("LOGICIEL_URL") or LOGICIEL_URL_PAR_DEFAUT).strip().rstrip("/")


def _transport_logiciel():
    """Transport HTTP vers le logiciel : None = le réseau réel.

    Les essais le remplacent par une route de connexion simulée (httpx.MockTransport) ;
    aucun essai ne joint le vrai logiciel (voir tests/conftest.py)."""
    return None


def _url_connexion_logiciel() -> str:
    base = adresse_logiciel()
    try:
        url = httpx.URL(base + LOGICIEL_ROUTE_CONNEXION)
    except Exception:
        url = None
    if url is None or url.scheme != "https" or not url.host:
        # Le mot de passe ne part jamais en clair (http) ni vers une adresse illisible.
        logger.error("Connexion au tableau refusée : LOGICIEL_URL n'est pas une adresse https lisible")
        raise LogicielIndisponible("adresse du logiciel mal réglée", MESSAGE_LOGICIEL_MAL_REGLE)
    return str(url)


def _attente_demandee(reponse) -> int:
    try:
        secondes = int(str(reponse.headers.get("Retry-After", "")).strip())
    except ValueError:
        secondes = 0
    return secondes if 0 < secondes <= 24 * 3600 else LOGIN_LOCK_SECONDS


async def verifier_compte_fondateur(email: str, mot_de_passe: str) -> bool:
    """Demande au logiciel MTJ si ces identifiants ouvrent un compte FONDATEUR.

    True : le logiciel accepte les identifiants et le compte est fondateur.
    False : le logiciel refuse les identifiants (401 : mauvais mot de passe, compte coupé
    ou sans accès au logiciel) ou le compte n'est pas fondateur.
    LogicielBloque : le logiciel a suspendu la connexion de ce compte (429).
    LogicielIndisponible : logiciel injoignable, délai dépassé, panne (5xx), adresse mal
    réglée ou réponse inattendue. Dans aucun de ces cas le tableau n'est ouvert.

    Le mot de passe ne sert qu'à cette requête : jamais gardé, jamais écrit au journal.
    Les jetons de session que le logiciel renvoie (cookies) restent dans le client HTTP,
    fermé et jeté à la fin de la requête ; ils ne sont jamais transmis au visiteur.
    """
    url = _url_connexion_logiciel()
    try:
        async with httpx.AsyncClient(
            timeout=LOGICIEL_DELAI_SECONDES,
            follow_redirects=False,  # une redirection n'emporte jamais le mot de passe ailleurs
            transport=_transport_logiciel(),
        ) as client:
            reponse = await client.post(
                url,
                json={"email": email, "password": mot_de_passe},
                headers={"Accept": "application/json"},
            )
    except httpx.HTTPError as exc:  # réseau, délai, certificat, protocole
        logger.error("Connexion au tableau refusée : logiciel injoignable (%s)", type(exc).__name__)
        raise LogicielIndisponible(type(exc).__name__) from None

    statut = reponse.status_code
    if statut == 401:
        return False
    if statut == 429:
        logger.warning("Connexion au tableau refusée : le logiciel a suspendu la connexion de ce compte")
        raise LogicielBloque(_attente_demandee(reponse))
    if statut >= 500:
        logger.error("Connexion au tableau refusée : le logiciel répond %s", statut)
        raise LogicielIndisponible(f"statut {statut}")
    if statut != 200:
        logger.error("Connexion au tableau refusée : réponse inattendue du logiciel (statut %s)", statut)
        raise LogicielIndisponible(f"statut {statut}", MESSAGE_LOGICIEL_REPONSE_INATTENDUE)
    try:
        donnees = reponse.json()
    except ValueError:
        donnees = None
    role = donnees.get("role") if isinstance(donnees, dict) else None
    if not isinstance(role, str):
        logger.error("Connexion au tableau refusée : réponse du logiciel sans rôle lisible")
        raise LogicielIndisponible("réponse sans rôle", MESSAGE_LOGICIEL_REPONSE_INATTENDUE)
    if role.strip().lower() != ROLE_FONDATEUR_LOGICIEL:
        logger.warning("Connexion au tableau refusée : compte du logiciel qui n'est pas fondateur")
        return False
    return True


async def dashboard_login(password: str, ip: str = "unknown", username: str = "") -> Optional[str]:
    """Un essai de connexion au tableau d'administration depuis l'adresse `ip`.

    Rend un jeton de session du site (1 h) ou None (identifiants refusés, échec compté).
    LoginLocked : 5 essais refusés depuis cette adresse, blocage de 15 minutes.
    LogicielBloque, LogicielIndisponible : refus sans échec compté (voir plus haut).

    Les essais d'une même adresse passent un par un : la vérification attend la réponse
    du logiciel, et des essais envoyés en même temps ne doivent pas dépasser 5 avant le
    blocage (contrôle du blocage et compte des échecs restent d'un seul tenant).
    """
    verrou = _verrous_par_adresse.setdefault(ip, asyncio.Lock())
    _essais_en_attente[ip] = _essais_en_attente.get(ip, 0) + 1
    try:
        async with verrou:
            return await _un_essai(password, ip, username)
    finally:
        _essais_en_attente[ip] -= 1
        if _essais_en_attente[ip] <= 0:
            _essais_en_attente.pop(ip, None)
            _verrous_par_adresse.pop(ip, None)


async def _un_essai(password: str, ip: str, username: str) -> Optional[str]:
    remaining = login_lock_remaining(ip)
    if remaining > 0:
        raise LoginLocked(remaining)

    email = (username or "").strip()
    if email and password:
        ok = await verifier_compte_fondateur(email, password)
    else:
        ok = False  # adresse ou mot de passe vide : refusé sans interroger le logiciel
    if not ok:
        _noter_echec(ip)
        return None

    _login_failures.pop(ip, None)
    token = secrets.token_hex(32)
    _active_tokens[token] = _now() + TOKEN_EXPIRY
    _cleanup_expired_tokens()
    logger.info("Tableau d'administration ouvert avec un compte fondateur du logiciel")
    return token


def token_from_authorization(authorization: Optional[str]) -> str:
    """Extrait le jeton d'un en-tête « Authorization: Bearer <jeton> »."""
    if not authorization:
        return ""
    parts = authorization.strip().split(None, 1)
    if len(parts) == 2 and parts[0].lower() == "bearer":
        return parts[1].strip()
    return ""


def verify_dashboard_token(token: str) -> bool:
    if not token:
        return False
    expiry = _active_tokens.get(token)
    if not expiry:
        return False
    if _now() > expiry:
        del _active_tokens[token]
        return False
    return True


def _cleanup_expired_tokens():
    now = _now()
    expired = [t for t, exp in _active_tokens.items() if now > exp]
    for t in expired:
        del _active_tokens[t]
