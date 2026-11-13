import re
import os
import math
import hashlib
import secrets
import logging
from datetime import datetime, timezone
from typing import Optional

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

DASHBOARD_PASSWORD = os.environ.get("DASHBOARD_PASSWORD", "mtj-admin-2024")
# Identifiant facultatif : s'il est défini dans l'environnement (DASHBOARD_USER),
# il est exigé en plus du mot de passe.
DASHBOARD_USER = os.environ.get("DASHBOARD_USER", "")
_active_tokens: dict[str, float] = {}
TOKEN_EXPIRY = 3600  # 1 hour

# Limitation des essais : 5 échecs, puis blocage de 15 minutes (par adresse).
LOGIN_MAX_FAILURES = 5
LOGIN_LOCK_SECONDS = 15 * 60
_login_failures: dict[str, dict] = {}


class LoginLocked(Exception):
    def __init__(self, retry_after: int):
        super().__init__("LOGIN_LOCKED")
        self.retry_after = retry_after


def _same(a: str, b: str) -> bool:
    return secrets.compare_digest((a or "").encode("utf-8"), (b or "").encode("utf-8"))


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


def dashboard_login(password: str, ip: str = "unknown", username: str = "") -> Optional[str]:
    remaining = login_lock_remaining(ip)
    if remaining > 0:
        raise LoginLocked(remaining)

    ok = _same(password, DASHBOARD_PASSWORD)
    if DASHBOARD_USER:
        ok = _same(username, DASHBOARD_USER) and ok
    if not ok:
        entry = _login_failures.setdefault(ip, {"count": 0, "locked_until": 0})
        entry["count"] += 1
        if entry["count"] >= LOGIN_MAX_FAILURES:
            entry["locked_until"] = _now() + LOGIN_LOCK_SECONDS
            entry["count"] = 0
            logger.warning(f"Dashboard login locked for {ip} ({LOGIN_LOCK_SECONDS}s)")
        return None

    _login_failures.pop(ip, None)
    token = secrets.token_hex(32)
    _active_tokens[token] = _now() + TOKEN_EXPIRY
    _cleanup_expired_tokens()
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
