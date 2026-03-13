import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import Optional
import logging
import os

logger = logging.getLogger(__name__)

COMPANY_EMAIL = "contactsmtjsecuriteprivee@gmail.com"
RECRUITMENT_EMAIL = os.environ.get("RECRUITMENT_EMAIL", "rex.mtjsecuriteprivee@gmail.com")
RECRUITMENT_EMAIL_PASSWORD = os.environ.get("RECRUITMENT_EMAIL_PASSWORD")
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "contactsmtjsecuriteprivee@gmail.com")
CONTACT_EMAIL_PASSWORD = os.environ.get("CONTACT_EMAIL_PASSWORD")
COMMERCIAL_EMAIL_PASSWORD = os.environ.get("COMMERCIAL_EMAIL_PASSWORD")


COMMERCIAL_EMAIL = os.environ.get("COMMERCIAL_EMAIL", "commercialmtj.securiteprivee@gmail.com")


def send_email_smtp(to_email: str, subject: str, body: str, from_email: str, password: str, attachment_paths: list = None, content_type: str = "plain"):
    """
    Send email via Gmail SMTP. content_type can be 'plain' or 'html'.
    """
    try:
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, content_type))

        if attachment_paths:
            for file_path in attachment_paths:
                if os.path.exists(file_path):
                    try:
                        with open(file_path, 'rb') as attachment:
                            part = MIMEBase('application', 'octet-stream')
                            part.set_payload(attachment.read())
                            encoders.encode_base64(part)
                            filename = os.path.basename(file_path)
                            part.add_header('Content-Disposition', f'attachment; filename= {filename}')
                            msg.attach(part)
                    except Exception as e:
                        logger.error(f"Error attaching file {file_path}: {str(e)}")

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, password)
        server.sendmail(from_email, to_email, msg.as_string())
        server.quit()

        logger.info(f"Email sent successfully to {to_email}")
        return True

    except Exception as e:
        logger.error(f"Error sending email via SMTP: {str(e)}")
        return False


def send_quote_email(name: str, company: Optional[str], email: str, phone: str, service_type: str, message: str, attachment_path: Optional[str] = None):
    """
    Send quote request email to commercial address via SMTP
    """
    try:
        subject = f"Nouvelle demande de devis - {service_type}"
        attachment_info = f"\nPièce jointe : Oui" if attachment_path else "\nPas de pièce jointe"

        body = f"""Nouvelle demande de devis

Nom : {name}
Entreprise : {company if company else 'Non renseigné'}
Email : {email}
Téléphone : {phone}

Service demandé : {service_type}

Message :
{message}
{"" if not attachment_path else chr(10) + "Une pièce jointe est incluse dans cet email."}
--
MTJ Sécurité Privée"""

        attachments = [attachment_path] if attachment_path else None

        success = send_email_smtp(
            to_email=COMMERCIAL_EMAIL,
            subject=subject,
            body=body,
            from_email=COMMERCIAL_EMAIL,
            password=COMMERCIAL_EMAIL_PASSWORD,
            attachment_paths=attachments
        )

        if success:
            logger.info(f"Quote email sent to {COMMERCIAL_EMAIL} from {name} ({email})")
        return success

    except Exception as e:
        logger.error(f"Error sending quote email: {str(e)}")
        return False


def send_contact_email(name: str, email: str, phone: Optional[str], subject: str, message: str, attachment_path: Optional[str] = None):
    """
    Send contact form email via SMTP
    """
    try:
        email_subject = f"Nouveau message de contact - {subject}"
        attachment_info = f"\nPièce jointe : Oui" if attachment_path else "\nPas de pièce jointe"

        body = f"""Nouveau message de contact

Nom : {name}
Email : {email}
Téléphone : {phone if phone else 'Non renseigné'}

Objet : {subject}

Message :
{message}
{"" if not attachment_path else chr(10) + "Une pièce jointe est incluse dans cet email."}
--
MTJ Sécurité Privée"""

        attachments = [attachment_path] if attachment_path else None

        success = send_email_smtp(
            to_email=CONTACT_EMAIL,
            subject=email_subject,
            body=body,
            from_email=CONTACT_EMAIL,
            password=CONTACT_EMAIL_PASSWORD,
            attachment_paths=attachments
        )

        if success:
            logger.info(f"Contact email sent to {CONTACT_EMAIL} from {name} ({email})")
        return success

    except Exception as e:
        logger.error(f"Error sending contact email: {str(e)}")
        return False


def send_recruitment_email(first_name: str, last_name: str, email: str, phone: str, message: str, attachment_paths: list):
    """
    Send recruitment application email to HR via SMTP
    """
    try:
        subject = f"Nouvelle candidature - {first_name} {last_name}"
        attachments_info = "\n".join([f"- {os.path.basename(path)}" for path in attachment_paths]) if attachment_paths else "Aucune pièce jointe"

        body = f"""Nouvelle candidature

Prénom : {first_name}
Nom : {last_name}
Email : {email}
Téléphone : {phone}

Message :
{message}

Pièces jointes : {len(attachment_paths) if attachment_paths else 0} fichier(s)

--
MTJ Sécurité Privée"""

        success = send_email_smtp(
            to_email=RECRUITMENT_EMAIL,
            subject=subject,
            body=body,
            from_email=RECRUITMENT_EMAIL,
            password=RECRUITMENT_EMAIL_PASSWORD,
            attachment_paths=attachment_paths
        )

        if success:
            logger.info(f"Recruitment email sent to {RECRUITMENT_EMAIL}")
            logger.info(f"Candidate: {first_name} {last_name} ({email})")
        return success

    except Exception as e:
        logger.error(f"Error sending recruitment email: {str(e)}")
        return False
