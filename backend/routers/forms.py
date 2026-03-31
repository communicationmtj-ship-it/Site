from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List, Optional
from pathlib import Path
from datetime import datetime, timezone
import uuid
import shutil
import logging

from email_service import send_quote_email, send_contact_email, send_recruitment_email
from security import (
    validate_field, validate_email, validate_phone,
    validate_upload, validate_upload_size,
    check_honeypot, sanitize_text,
    ALLOWED_UPLOAD_EXTENSIONS, MAX_UPLOAD_SIZE, MAX_TOTAL_UPLOAD_SIZE,
)

logger = logging.getLogger(__name__)

router = APIRouter()

UPLOAD_DIR = Path(__file__).parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

GENERIC_ERROR = "Une erreur est survenue. Veuillez reessayer."


def _get_db():
    from database import db
    return db


def _save_upload(file: UploadFile) -> tuple[str, str]:
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
    try:
        check_honeypot(hp, ts)
    except ValueError as e:
        if str(e) == "SPAM_DETECTED":
            return {"status": "success", "message": "Merci pour votre demande."}
        raise

    try:
        name = validate_field("name", name)
        email = validate_email(email)
        phone = validate_phone(phone)
        serviceType = validate_field("serviceType", serviceType)
        message = validate_field("message", message)
        company = validate_field("company", company) if company else None

        attachment_path = None
        attachment_filename = None
        if attachment and attachment.filename:
            attachment_path, attachment_filename = _save_upload(attachment)

        quote_dict = {
            "id": str(uuid.uuid4()),
            "name": name,
            "company": company,
            "email": email,
            "phone": phone,
            "serviceType": serviceType,
            "message": message,
            "attachment_filename": attachment_filename,
            "attachment_path": attachment_path,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

        db = _get_db()
        await db.quotes.insert_one(quote_dict)

        send_quote_email(
            name=name, company=company, email=email, phone=phone,
            service_type=serviceType, message=message,
            attachment_path=attachment_path,
        )

        return {
            "status": "success",
            "message": "Votre demande de devis a ete envoyee avec succes. Nous vous contacterons dans les plus brefs delais.",
        }
    except ValueError as e:
        logger.warning(f"Validation error (quote): {e}")
        return {"status": "error", "message": str(e)}
    except Exception as e:
        logger.error(f"Error submitting quote: {e}")
        return {"status": "error", "message": GENERIC_ERROR}


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
    try:
        check_honeypot(hp, ts)
    except ValueError as e:
        if str(e) == "SPAM_DETECTED":
            return {"status": "success", "message": "Merci pour votre message."}
        raise

    try:
        name = validate_field("name", name)
        email = validate_email(email)
        subject = validate_field("subject", subject)
        message = validate_field("message", message)
        phone = validate_phone(phone) if phone else None

        attachment_path = None
        attachment_filename = None
        if attachment and attachment.filename:
            attachment_path, attachment_filename = _save_upload(attachment)

        contact_dict = {
            "id": str(uuid.uuid4()),
            "name": name,
            "email": email,
            "phone": phone,
            "subject": subject,
            "message": message,
            "attachment_filename": attachment_filename,
            "attachment_path": attachment_path,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

        db = _get_db()
        await db.contacts.insert_one(contact_dict)

        send_contact_email(
            name=name, email=email, phone=phone, subject=subject,
            message=message, attachment_path=attachment_path,
        )

        return {
            "status": "success",
            "message": "Votre message a ete envoye avec succes. Nous vous repondrons dans les plus brefs delais.",
        }
    except ValueError as e:
        logger.warning(f"Validation error (contact): {e}")
        return {"status": "error", "message": str(e)}
    except Exception as e:
        logger.error(f"Error submitting contact: {e}")
        return {"status": "error", "message": GENERIC_ERROR}


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
    try:
        check_honeypot(hp, ts)
    except ValueError as e:
        if str(e) == "SPAM_DETECTED":
            return {"status": "success", "message": "Merci pour votre candidature."}
        raise

    try:
        firstName = validate_field("firstName", firstName)
        lastName = validate_field("lastName", lastName)
        email = validate_email(email)
        phone = validate_phone(phone)
        message = validate_field("message", message)

        attachment_paths = []
        attachment_filenames = []
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
            attachment_paths.append(str(path))
            attachment_filenames.append(att.filename)

        recruitment_dict = {
            "id": str(uuid.uuid4()),
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "message": message,
            "attachment_filenames": attachment_filenames,
            "attachment_paths": attachment_paths,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

        db = _get_db()
        await db.recruitments.insert_one(recruitment_dict)

        send_recruitment_email(
            first_name=firstName, last_name=lastName, email=email,
            phone=phone, message=message, attachment_paths=attachment_paths,
        )

        return {
            "status": "success",
            "message": "Votre candidature a ete envoyee avec succes. Nous examinerons votre profil et vous contacterons rapidement.",
        }
    except ValueError as e:
        logger.warning(f"Validation error (recruitment): {e}")
        return {"status": "error", "message": str(e)}
    except Exception as e:
        logger.error(f"Error submitting recruitment application: {e}")
        return {"status": "error", "message": GENERIC_ERROR}
