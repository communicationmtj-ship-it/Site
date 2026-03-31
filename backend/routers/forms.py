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

GENERIC_ERROR = "Une erreur est survenue. Veuillez reessayer."


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


def _validate_base_contact(name: str, email: str, message: str, phone: str | None = None) -> dict:
    return {
        "name": validate_field("name", name),
        "email": validate_email(email),
        "message": validate_field("message", message),
        "phone": validate_phone(phone) if phone else None,
    }


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
    hp: Optional[str] = Form(None),
    ts: Optional[str] = Form(None),
):
    spam = _check_spam(hp, ts, "Merci pour votre demande.")
    if spam:
        return spam

    try:
        fields = _validate_base_contact(name, email, message, phone)
        fields["serviceType"] = validate_field("serviceType", serviceType)
        fields["company"] = validate_field("company", company) if company else None

        att_path, att_name = (None, None)
        if attachment and attachment.filename:
            att_path, att_name = _save_single_upload(attachment)

        db = _get_db()
        await db.quotes.insert_one({
            "id": str(uuid.uuid4()),
            **fields,
            "attachment_filename": att_name,
            "attachment_path": att_path,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        })

        send_quote_email(
            name=fields["name"], company=fields["company"], email=fields["email"],
            phone=fields["phone"], service_type=fields["serviceType"],
            message=fields["message"], attachment_path=att_path,
        )

        return {"status": "success", "message": "Votre demande de devis a ete envoyee avec succes. Nous vous contacterons dans les plus brefs delais."}

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
    hp: Optional[str] = Form(None),
    ts: Optional[str] = Form(None),
):
    spam = _check_spam(hp, ts, "Merci pour votre message.")
    if spam:
        return spam

    try:
        fields = _validate_base_contact(name, email, message, phone)
        fields["subject"] = validate_field("subject", subject)

        att_path, att_name = (None, None)
        if attachment and attachment.filename:
            att_path, att_name = _save_single_upload(attachment)

        db = _get_db()
        await db.contacts.insert_one({
            "id": str(uuid.uuid4()),
            **fields,
            "subject": fields["subject"],
            "attachment_filename": att_name,
            "attachment_path": att_path,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        })

        send_contact_email(
            name=fields["name"], email=fields["email"], phone=fields["phone"],
            subject=fields["subject"], message=fields["message"], attachment_path=att_path,
        )

        return {"status": "success", "message": "Votre message a ete envoye avec succes. Nous vous repondrons dans les plus brefs delais."}

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
    hp: Optional[str] = Form(None),
    ts: Optional[str] = Form(None),
):
    spam = _check_spam(hp, ts, "Merci pour votre candidature.")
    if spam:
        return spam

    try:
        firstName = validate_field("firstName", firstName)
        lastName = validate_field("lastName", lastName)
        email = validate_email(email)
        phone = validate_phone(phone)
        message = validate_field("message", message)

        att_paths, att_names = _save_multiple_uploads(attachments)

        db = _get_db()
        await db.recruitments.insert_one({
            "id": str(uuid.uuid4()),
            "firstName": firstName, "lastName": lastName,
            "email": email, "phone": phone, "message": message,
            "attachment_filenames": att_names,
            "attachment_paths": att_paths,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        })

        send_recruitment_email(
            first_name=firstName, last_name=lastName, email=email,
            phone=phone, message=message, attachment_paths=att_paths,
        )

        return {"status": "success", "message": "Votre candidature a ete envoyee avec succes. Nous examinerons votre profil et vous contacterons rapidement."}

    except ValueError as e:
        logger.warning(f"Validation error (recruitment): {e}")
        return {"status": "error", "message": str(e)}
    except Exception as e:
        logger.error(f"Error submitting recruitment application: {e}")
        return {"status": "error", "message": GENERIC_ERROR}
