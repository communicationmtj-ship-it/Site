import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import Optional
import logging
import os

logger = logging.getLogger(__name__)

COMPANY_EMAIL = "mtj.securiteprivee@gmail.com"
RECRUITMENT_EMAIL = "rex.mtjsecuriteprivee@gmail.com"
RECRUITMENT_EMAIL_PASSWORD = "aemaavzboobgdgzo"  # Gmail app password

def send_email_smtp(to_email: str, subject: str, body: str, from_email: str = RECRUITMENT_EMAIL, attachment_paths: list = None):
    """
    Send email via Gmail SMTP
    """
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Attach body
        msg.attach(MIMEText(body, 'plain'))
        
        # Attach files if provided
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
        
        # Connect to Gmail SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, RECRUITMENT_EMAIL_PASSWORD)
        
        # Send email
        text = msg.as_string()
        server.sendmail(from_email, to_email, text)
        server.quit()
        
        logger.info(f"Email sent successfully to {to_email}")
        return True
        
    except Exception as e:
        logger.error(f"Error sending email via SMTP: {str(e)}")
        return False

def send_quote_email(name: str, company: Optional[str], email: str, phone: str, service_type: str, message: str, attachment_path: Optional[str] = None):
    """
    Send quote request email to company
    """
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = email
        msg['To'] = COMPANY_EMAIL
        msg['Subject'] = f"Nouvelle demande de devis - {service_type}"
        
        # Email body
        attachment_info = f"\nPièce jointe : {attachment_path}" if attachment_path else "\nPas de pièce jointe"
        
        body = f"""
Nouvelle demande de devis reçue :

===========================================
INFORMATIONS CLIENT
===========================================

Nom : {name}
Entreprise : {company if company else 'Non renseigné'}
Email : {email}
Téléphone : {phone}

===========================================
SERVICE DEMANDÉ
===========================================

Type de service : {service_type}

===========================================
MESSAGE
===========================================

{message}

===========================================
{attachment_info}
===========================================

Cette demande a été envoyée depuis le formulaire de devis du site MTJ SÉCURITÉ PRIVÉE.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # For now, just log the email (will be sent when SMTP is configured)
        logger.info(f"Quote email prepared for {COMPANY_EMAIL}")
        logger.info(f"From: {name} ({email})")
        logger.info(f"Service: {service_type}")
        if attachment_path:
            logger.info(f"Attachment: {attachment_path}")
        
        return True
        
    except Exception as e:
        logger.error(f"Error preparing quote email: {str(e)}")
        return False

def send_contact_email(name: str, email: str, phone: Optional[str], subject: str, message: str, attachment_path: Optional[str] = None):
    """
    Send contact form email to company
    """
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = email
        msg['To'] = COMPANY_EMAIL
        msg['Subject'] = f"Nouveau message de contact - {subject}"
        
        # Email body
        attachment_info = f"\nPièce jointe : {attachment_path}" if attachment_path else "\nPas de pièce jointe"
        
        body = f"""
Nouveau message de contact reçu :

===========================================
INFORMATIONS CONTACT
===========================================

Nom : {name}
Email : {email}
Téléphone : {phone if phone else 'Non renseigné'}

===========================================
SUJET
===========================================

{subject}

===========================================
MESSAGE
===========================================

{message}

===========================================
{attachment_info}
===========================================

Ce message a été envoyé depuis le formulaire de contact du site MTJ SÉCURITÉ PRIVÉE.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # For now, just log the email
        logger.info(f"Contact email prepared for {COMPANY_EMAIL}")
        logger.info(f"From: {name} ({email})")
        logger.info(f"Subject: {subject}")
        if attachment_path:
            logger.info(f"Attachment: {attachment_path}")
        
        return True
        
    except Exception as e:
        logger.error(f"Error preparing contact email: {str(e)}")
        return False

def send_recruitment_email(first_name: str, last_name: str, email: str, phone: str, message: str, attachment_paths: list):
    """
    Send recruitment application email to HR with real SMTP
    """
    try:
        # Email subject
        subject = f"Nouvelle candidature - {first_name} {last_name}"
        
        # Email body
        attachments_info = "\n".join([f"- {os.path.basename(path)}" for path in attachment_paths]) if attachment_paths else "Aucune pièce jointe"
        
        body = f"""
Nouvelle candidature reçue :

===========================================
INFORMATIONS CANDIDAT
===========================================

Prénom : {first_name}
Nom : {last_name}
Email : {email}
Téléphone portable : {phone}

===========================================
MESSAGE DE MOTIVATION
===========================================

{message}

===========================================
PIÈCES JOINTES
===========================================

{attachments_info}

===========================================

Cette candidature a été envoyée depuis le formulaire de recrutement du site MTJ SÉCURITÉ PRIVÉE.
        """
        
        # Send email via SMTP with attachments
        success = send_email_smtp(
            to_email=RECRUITMENT_EMAIL,
            subject=subject,
            body=body,
            from_email=RECRUITMENT_EMAIL,
            attachment_paths=attachment_paths
        )
        
        if success:
            logger.info(f"Recruitment email sent to {RECRUITMENT_EMAIL}")
            logger.info(f"Candidate: {first_name} {last_name} ({email})")
            logger.info(f"Attachments: {len(attachment_paths)}")
        
        return success
        
    except Exception as e:
        logger.error(f"Error preparing recruitment email: {str(e)}")
        return False
