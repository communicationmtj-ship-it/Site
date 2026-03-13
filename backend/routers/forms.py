from fastapi import APIRouter, UploadFile, File, Form
from typing import List, Optional
from pathlib import Path
from datetime import datetime, timezone
import uuid
import shutil
import logging

from email_service import send_quote_email, send_contact_email, send_recruitment_email

logger = logging.getLogger(__name__)

router = APIRouter()

UPLOAD_DIR = Path(__file__).parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


def _get_db():
    from server import db
    return db


@router.post("/quote")
async def submit_quote(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    serviceType: str = Form(...),
    message: str = Form(...),
    company: Optional[str] = Form(None),
    attachment: Optional[UploadFile] = File(None),
):
    try:
        attachment_path = None
        attachment_filename = None

        if attachment:
            file_extension = Path(attachment.filename).suffix
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            attachment_path = UPLOAD_DIR / unique_filename
            with open(attachment_path, "wb") as buffer:
                shutil.copyfileobj(attachment.file, buffer)
            attachment_filename = attachment.filename

        quote_dict = {
            "id": str(uuid.uuid4()),
            "name": name,
            "company": company,
            "email": email,
            "phone": phone,
            "serviceType": serviceType,
            "message": message,
            "attachment_filename": attachment_filename,
            "attachment_path": str(attachment_path) if attachment_path else None,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

        db = _get_db()
        await db.quotes.insert_one(quote_dict)

        send_quote_email(
            name=name,
            company=company,
            email=email,
            phone=phone,
            service_type=serviceType,
            message=message,
            attachment_path=str(attachment_path) if attachment_path else None,
        )

        return {
            "status": "success",
            "message": "Votre demande de devis a ete envoyee avec succes. Nous vous contacterons dans les plus brefs delais.",
        }
    except Exception as e:
        logger.error(f"Error submitting quote: {str(e)}")
        return {
            "status": "error",
            "message": "Une erreur est survenue lors de l'envoi de votre demande. Veuillez reessayer.",
        }


@router.post("/contact")
async def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    phone: Optional[str] = Form(None),
    attachment: Optional[UploadFile] = File(None),
):
    try:
        attachment_path = None
        attachment_filename = None

        if attachment:
            file_extension = Path(attachment.filename).suffix
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            attachment_path = UPLOAD_DIR / unique_filename
            with open(attachment_path, "wb") as buffer:
                shutil.copyfileobj(attachment.file, buffer)
            attachment_filename = attachment.filename

        contact_dict = {
            "id": str(uuid.uuid4()),
            "name": name,
            "email": email,
            "phone": phone,
            "subject": subject,
            "message": message,
            "attachment_filename": attachment_filename,
            "attachment_path": str(attachment_path) if attachment_path else None,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

        db = _get_db()
        await db.contacts.insert_one(contact_dict)

        send_contact_email(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message,
            attachment_path=str(attachment_path) if attachment_path else None,
        )

        return {
            "status": "success",
            "message": "Votre message a ete envoye avec succes. Nous vous repondrons dans les plus brefs delais.",
        }
    except Exception as e:
        logger.error(f"Error submitting contact: {str(e)}")
        return {
            "status": "error",
            "message": "Une erreur est survenue lors de l'envoi de votre message. Veuillez reessayer.",
        }


@router.post("/recrutement")
async def submit_recruitment(
    firstName: str = Form(...),
    lastName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    message: str = Form(...),
    attachments: List[UploadFile] = File(...),
):
    try:
        attachment_paths = []
        attachment_filenames = []

        for attachment in attachments:
            file_extension = Path(attachment.filename).suffix
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            attachment_path = UPLOAD_DIR / unique_filename
            with open(attachment_path, "wb") as buffer:
                shutil.copyfileobj(attachment.file, buffer)
            attachment_paths.append(str(attachment_path))
            attachment_filenames.append(attachment.filename)

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
            first_name=firstName,
            last_name=lastName,
            email=email,
            phone=phone,
            message=message,
            attachment_paths=attachment_paths,
        )

        return {
            "status": "success",
            "message": "Votre candidature a ete envoyee avec succes. Nous examinerons votre profil et vous contacterons rapidement.",
        }
    except Exception as e:
        logger.error(f"Error submitting recruitment application: {str(e)}")
        return {
            "status": "error",
            "message": "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez reessayer.",
        }
