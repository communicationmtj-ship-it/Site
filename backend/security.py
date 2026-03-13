import re
import os
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


def validate_upload_size(file_bytes: bytes) -> None:
    if len(file_bytes) > MAX_UPLOAD_SIZE:
        raise ValueError(f"Fichier trop volumineux. Taille maximale : {MAX_UPLOAD_SIZE // (1024*1024)} Mo.")


# ─── Honeypot + Timestamp Anti-Spam ─────────────────────────────

MIN_SUBMIT_TIME_SECONDS = 3


def check_honeypot(honeypot_value: Optional[str], form_loaded_at: Optional[str]) -> None:
    if honeypot_value:
        logger.warning(f"Honeypot triggered: value='{honeypot_value}'")
        raise ValueError("SPAM_DETECTED")

    if form_loaded_at:
        try:
            loaded = float(form_loaded_at)
            elapsed = datetime.now(timezone.utc).timestamp() - loaded
            if elapsed < MIN_SUBMIT_TIME_SECONDS:
                logger.warning(f"Form submitted too fast: {elapsed:.1f}s")
                raise ValueError("SPAM_DETECTED")
        except (ValueError, TypeError):
            pass


# ─── Dashboard Auth ──────────────────────────────────────────────

DASHBOARD_PASSWORD = os.environ.get("DASHBOARD_PASSWORD", "mtj-admin-2024")
_active_tokens: dict[str, float] = {}
TOKEN_EXPIRY = 3600  # 1 hour


def dashboard_login(password: str) -> Optional[str]:
    if not secrets.compare_digest(password, DASHBOARD_PASSWORD):
        return None
    token = secrets.token_hex(32)
    _active_tokens[token] = datetime.now(timezone.utc).timestamp() + TOKEN_EXPIRY
    _cleanup_expired_tokens()
    return token


def verify_dashboard_token(token: str) -> bool:
    if not token:
        return False
    expiry = _active_tokens.get(token)
    if not expiry:
        return False
    if datetime.now(timezone.utc).timestamp() > expiry:
        del _active_tokens[token]
        return False
    return True


def _cleanup_expired_tokens():
    now = datetime.now(timezone.utc).timestamp()
    expired = [t for t, exp in _active_tokens.items() if now > exp]
    for t in expired:
        del _active_tokens[t]
