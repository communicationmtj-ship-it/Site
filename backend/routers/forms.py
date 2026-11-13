from fastapi import APIRouter, UploadFile, File, Form
from typing import List, Optional
from pathlib import Path
from datetime import datetime, timezone
import uuid
import logging

from email_service import send_quote_email, send_contact_email, send_recruitment_email
from security import (
    validate_field, validate_email, validate_phone,
    validate_upload, validate_upload_size,
    check_honeypot,
    ALLOWED_UPLOAD_EXTENSIONS, MAX_TOTAL_UPLOAD_SIZE,
)

logger = logging.getLogger(__name__)

router = APIRouter()

UPLOAD_DIR = Path(__file__).parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

GENERIC_ERROR = "Une erreur est survenue. Veuillez réessayer."


def _get_db():
    from database import db
    return db


# ─── Shared helpers ──────────────────────────────────────────────

def _check_spam(hp: Optional[str], ts: Optional[str], fake_msg: str) -> dict | None:
    try:
        check_honeypot(hp, ts)
    except ValueError as e:
        if str(e) == "SPAM_DETECTED":
            return {"status": "success", "message": fake_msg}
        raise
    return None


def _save_single_upload(file: UploadFile) -> tuple[str, str]:
    validate_upload(file)
    content = file.file.read()
    validate_upload_size(content)
    file.file.seek(0)
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_UPLOAD_EXTENSIONS:
        raise ValueError("Extension non autorisee.")
    unique_name = f"{uuid.uuid4()}{ext}"
    path = UPLOAD_DIR / unique_name
    with open(path, "wb") as f:
        f.write(content)
    return str(path), file.filename


CONSENT_REQUIRED_MESSAGE = "Veuillez accepter le traitement de vos données (case de consentement) pour envoyer ce formulaire."


def _consent_given(consent: Optional[str]) -> bool:
    return str(consent or "").strip().lower() in ("true", "1", "on", "yes", "oui")


def _consent_record(consent: Optional[str]) -> dict:
    """Preuve de consentement enregistree avec la demande (booleen + date)."""
    given = _consent_given(consent)
    return {
        "consent": given,
        "consent_at": datetime.now(timezone.utc).isoformat() if given else None,
    }


def _validate_base_contact(name: str, email: str, message: str, phone: str | None = None) -> dict:
    return {
        "name": validate_field("name", name),
        "email": validate_email(email),
        "message": validate_field("message", message),
        "phone": validate_phone(phone) if phone else None,
    }


async def _mark_email_sent(collection, record_id: str, sent: bool, kind: str) -> None:
    """Le mail est le seul moyen de prévenir l'équipe (13/11/2026, règle « échec visible ») :
    l'état d'envoi est gardé avec la demande (email_sent), compté par le tableau
    d'administration, et un mail qui ne part pas laisse une erreur au journal, sans donnée
    personnelle du visiteur."""
    try:
        await collection.update_one({"id": record_id}, {"$set": {"email_sent": bool(sent)}})
    except Exception as e:
        logger.error(f"État d'envoi du mail non enregistré ({kind}, id {record_id}) : {e}")
    if not sent:
        logger.error(f"Mail NON envoyé pour une demande de {kind} (id {record_id}) : demande gardée en base, à traiter à la main.")


# ─── Quote ────────────────────────────────────────────────────────

@router.post("/quote")
async def submit_quote(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    serviceType: str = Form(...),
    message: str = Form(...),
    company: Optional[str] = Form(None),
    attachment: Optional[UploadFile] = File(None),
    consent: Optional[str] = Form(None),
    startDate: Optional[str] = Form(None),
    urgency: Optional[str] = Form(None),
    hp: Optional[str] = Form(None),
    ts: Optional[str] = Form(None),
):
    spam = _check_spam(hp, ts, "Merci pour votre demande.")
    if spam:
        return spam
    # 12/11/2026 (audit du site de Mathilde, site-006) : le formulaire de devis envoie la case
    # de consentement ; comme le contact et le recrutement, il ne part pas sans elle.
    if not _consent_given(consent):
        return {"status": "error", "message": CONSENT_REQUIRED_MESSAGE}

    try:
        fields = _validate_base_contact(name, email, message, phone)
        fields["serviceType"] = validate_field("serviceType", serviceType)
        fields["company"] = validate_field("company", company) if company else None

        att_path, att_name = (None, None)
        if attachment and attachment.filename:
            att_path, att_name = _save_single_upload(attachment)

        db = _get_db()
        record_id = str(uuid.uuid4())
        # Date de début et urgence (site-104), facultatives, texte court gardé tel quel.
        start_date = (startDate or "").strip()[:40] or None
        urgency_value = (urgency or "").strip()[:40] or None
        await db.quotes.insert_one({
            "id": record_id,
            **fields,
            "attachment_filename": att_name,
            "attachment_path": att_path,
            "start_date": start_date,
            "urgency": urgency_value,
            **_consent_record(consent),
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        })

        sent = send_quote_email(
            name=fields["name"], company=fields["company"], email=fields["email"],
            phone=fields["phone"], service_type=fields["serviceType"],
            message=fields["message"], attachment_path=att_path,
            start_date=start_date, urgency=urgency_value,
        )
        await _mark_email_sent(db.quotes, record_id, sent, "devis")

        return {"status": "success", "message": "Votre demande de devis a été envoyée. Nous vous recontactons dans les plus brefs délais."}

    except ValueError as e:
        logger.warning(f"Validation error (quote): {e}")
        return {"status": "error", "message": str(e)}
    except Exception as e:
        logger.error(f"Error submitting quote: {e}")
        return {"status": "error", "message": GENERIC_ERROR}


# ─── Contact ─────────────────────────────────────────────────────

@router.post("/contact")
async def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    phone: Optional[str] = Form(None),
    attachment: Optional[UploadFile] = File(None),
    consent: Optional[str] = Form(None),
    hp: Optional[str] = Form(None),
    ts: Optional[str] = Form(None),
):
    spam = _check_spam(hp, ts, "Merci pour votre message.")
    if spam:
        return spam

    if not _consent_given(consent):
        return {"status": "error", "message": CONSENT_REQUIRED_MESSAGE}

    try:
        fields = _validate_base_contact(name, email, message, phone)
        fields["subject"] = validate_field("subject", subject)

        att_path, att_name = (None, None)
        if attachment and attachment.filename:
            att_path, att_name = _save_single_upload(attachment)

        db = _get_db()
        record_id = str(uuid.uuid4())
        await db.contacts.insert_one({
            "id": record_id,
            **fields,
            "subject": fields["subject"],
            "attachment_filename": att_name,
            "attachment_path": att_path,
            **_consent_record(consent),
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        })

        sent = send_contact_email(
            name=fields["name"], email=fields["email"], phone=fields["phone"],
            subject=fields["subject"], message=fields["message"], attachment_path=att_path,
        )
        await _mark_email_sent(db.contacts, record_id, sent, "contact")

        return {"status": "success", "message": "Votre message a été envoyé. Nous vous répondons dans les plus brefs délais."}

    except ValueError as e:
        logger.warning(f"Validation error (contact): {e}")
        return {"status": "error", "message": str(e)}
    except Exception as e:
        logger.error(f"Error submitting contact: {e}")
        return {"status": "error", "message": GENERIC_ERROR}


# ─── Recrutement ─────────────────────────────────────────────────

def _save_multiple_uploads(attachments: List[UploadFile]) -> tuple[list[str], list[str]]:
    paths, names = [], []
    total_size = 0
    for att in attachments:
        if not att.filename:
            continue
        validate_upload(att)
        content = att.file.read()
        total_size += len(content)
        if total_size > MAX_TOTAL_UPLOAD_SIZE:
            raise ValueError(f"Taille totale des fichiers trop importante. Maximum : {MAX_TOTAL_UPLOAD_SIZE // (1024*1024)} Mo.")
        validate_upload_size(content)
        att.file.seek(0)
        ext = Path(att.filename).suffix.lower()
        if ext not in ALLOWED_UPLOAD_EXTENSIONS:
            raise ValueError(f"Extension non autorisee: {ext}")
        unique_name = f"{uuid.uuid4()}{ext}"
        path = UPLOAD_DIR / unique_name
        with open(path, "wb") as f:
            f.write(content)
        paths.append(str(path))
        names.append(att.filename)
    return paths, names


@router.post("/recrutement")
async def submit_recruitment(
    firstName: str = Form(...),
    lastName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    message: str = Form(...),
    attachments: List[UploadFile] = File(...),
    consent: Optional[str] = Form(None),
    hp: Optional[str] = Form(None),
    ts: Optional[str] = Form(None),
):
    spam = _check_spam(hp, ts, "Merci pour votre candidature.")
    if spam:
        return spam

    if not _consent_given(consent):
        return {"status": "error", "message": CONSENT_REQUIRED_MESSAGE}

    try:
        firstName = validate_field("firstName", firstName)
        lastName = validate_field("lastName", lastName)
        email = validate_email(email)
        phone = validate_phone(phone)
        message = validate_field("message", message)

        att_paths, att_names = _save_multiple_uploads(attachments)

        db = _get_db()
        record_id = str(uuid.uuid4())
        await db.recruitments.insert_one({
            "id": record_id,
            "firstName": firstName, "lastName": lastName,
            "email": email, "phone": phone, "message": message,
            "attachment_filenames": att_names,
            "attachment_paths": att_paths,
            **_consent_record(consent),
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        })

        sent = send_recruitment_email(
            first_name=firstName, last_name=lastName, email=email,
            phone=phone, message=message, attachment_paths=att_paths,
        )
        await _mark_email_sent(db.recruitments, record_id, sent, "recrutement")

        return {"status": "success", "message": "Votre candidature a été envoyée. Nous étudions votre profil et vous recontactons rapidement."}

    except ValueError as e:
        logger.warning(f"Validation error (recruitment): {e}")
        return {"status": "error", "message": str(e)}
    except Exception as e:
        logger.error(f"Error submitting recruitment application: {e}")
        return {"status": "error", "message": GENERIC_ERROR}
