import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import logging

logger = logging.getLogger(__name__)

COMPANY_EMAIL = "mtj.securiteprivee@gmail.com"
RECRUITMENT_EMAIL = "rex.mtjsecuriteprivee@gmail.com"

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
    Send recruitment application email to HR
    """
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = email
        msg['To'] = RECRUITMENT_EMAIL
        msg['Subject'] = f"Nouvelle candidature - {first_name} {last_name}"
        
        # Email body
        attachments_info = "\n".join([f"- {path}" for path in attachment_paths]) if attachment_paths else "Aucune pièce jointe"
        
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
        
        msg.attach(MIMEText(body, 'plain'))
        
        # For now, just log the email
        logger.info(f"Recruitment email prepared for {RECRUITMENT_EMAIL}")
        logger.info(f"Candidate: {first_name} {last_name} ({email})")
        logger.info(f"Attachments: {len(attachment_paths)}")
        
        return True
        
    except Exception as e:
        logger.error(f"Error preparing recruitment email: {str(e)}")
        return False
