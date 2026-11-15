import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import Optional
import logging
import os

logger = logging.getLogger(__name__)

RECRUITMENT_EMAIL = os.environ.get("RECRUITMENT_EMAIL", "rex.mtjsecuriteprivee@gmail.com")
RECRUITMENT_EMAIL_PASSWORD = os.environ.get("RECRUITMENT_EMAIL_PASSWORD")
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "contactsmtjsecuriteprivee@gmail.com")
CONTACT_EMAIL_PASSWORD = os.environ.get("CONTACT_EMAIL_PASSWORD")
COMMERCIAL_EMAIL_PASSWORD = os.environ.get("COMMERCIAL_EMAIL_PASSWORD")


COMMERCIAL_EMAIL = os.environ.get("COMMERCIAL_EMAIL", "commercialmtj.securiteprivee@gmail.com")

# 13/11/2026 (choix de Théo, « Site email: A contact OVH », avec un renvoi vers sa boîte Gmail :
# « si je les verai jamais je aucun mail ovh de conencter ») : le site affiche contact@ (domaine,
# boîte OVH) ; les mails du site destinés à l'équipe (devis, contact, candidature, rapport mensuel)
# partent vers l'adresse de la variable NOTIFY_EMAIL du serveur du site (valeur : la boîte Gmail
# donnée par Théo, notée dans memory/PRD.md ; aucune adresse écrite ici). Les boîtes d'envoi et leurs
# mots de passe ne changent pas. Variable absente ou illisible : le mail part, comme avant, vers sa
# boîte d'envoi, et le journal le dit à chaque envoi (règle « échec visible »).
NOTIFY_EMAIL_VAR = "NOTIFY_EMAIL"


def destinataire_equipe(boite_envoi: str) -> str:
    """Adresse qui reçoit un mail du site destiné à l'équipe, relue à chaque envoi."""
    adresse = (os.environ.get(NOTIFY_EMAIL_VAR) or "").strip()
    if adresse and "@" in adresse and not any(c in adresse for c in " ,;\r\n"):
        return adresse
    if adresse:
        logger.error("NOTIFY_EMAIL illisible sur le serveur : le mail part vers sa boîte d'envoi.")
    else:
        logger.warning("NOTIFY_EMAIL non posée sur le serveur : le mail part vers sa boîte d'envoi.")
    return boite_envoi


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


PROTECTION_RAPPROCHEE = "Protection rapprochée"


def format_date_fr(value: Optional[str]) -> Optional[str]:
    """« 2026-11-20 » (champ date du navigateur) devient « 20/11/2026 » ; toute autre valeur reste telle quelle."""
    text = (value or "").strip()
    if not text:
        return None
    parts = text.split("-")
    if len(parts) == 3 and len(parts[0]) == 4 and all(p.isdigit() for p in parts):
        return f"{parts[2]}/{parts[1]}/{parts[0]}"
    return text


def is_urgent(urgency: Optional[str]) -> bool:
    return (urgency or "").strip().lower().startswith("urgent")


def quote_email_subject(service_type: str, urgency: Optional[str] = None) -> str:
    """Objet du mail de devis : « URGENT » en tête pour une demande sous 24 h (voie rapide,
    audit du 30/10/2026, site-104) et la société du groupe pour la protection rapprochée."""
    subject = f"Nouvelle demande de devis - {service_type}"
    if service_type == PROTECTION_RAPPROCHEE:
        subject += " - MTJ Sécurité Rapprochée"
    if is_urgent(urgency):
        subject = f"URGENT - {subject}"
    return subject


def quote_email_body(name: str, company: Optional[str], email: str, phone: str, service_type: str,
                     message: str, attachment_path: Optional[str] = None,
                     start_date: Optional[str] = None, urgency: Optional[str] = None) -> str:
    societe = ""
    if service_type == PROTECTION_RAPPROCHEE:
        societe = "\nSociété concernée : MTJ Sécurité Rapprochée (devis et contrat à son nom)\n"
    # 15/11/2026 : le formulaire du site ne demande plus la date de début ni l'urgence (retour au formulaire
    # en ligne, règle de Théo du 15/11/2026) ; les lignes ne s'écrivent que si la demande les porte.
    date_debut = format_date_fr(start_date)
    urgence = (urgency or "").strip()
    precisions = ""
    if date_debut:
        precisions += f"Date de début souhaitée : {date_debut}\n"
    if urgence:
        precisions += f"Urgence : {urgence}\n"
    return f"""Nouvelle demande de devis

Nom : {name}
Entreprise : {company if company else 'Non renseigné'}
Email : {email}
Téléphone : {phone}

Service demandé : {service_type}{societe}
{precisions}
Message :
{message}
{"" if not attachment_path else chr(10) + "Une pièce jointe est incluse dans cet email."}
--
MTJ Sécurité Privée"""


def send_quote_email(name: str, company: Optional[str], email: str, phone: str, service_type: str, message: str,
                     attachment_path: Optional[str] = None, start_date: Optional[str] = None,
                     urgency: Optional[str] = None):
    """
    Send quote request email to commercial address via SMTP
    """
    try:
        subject = quote_email_subject(service_type, urgency)
        body = quote_email_body(name, company, email, phone, service_type, message,
                                attachment_path, start_date, urgency)

        attachments = [attachment_path] if attachment_path else None

        success = send_email_smtp(
            to_email=destinataire_equipe(COMMERCIAL_EMAIL),
            subject=subject,
            body=body,
            from_email=COMMERCIAL_EMAIL,
            password=COMMERCIAL_EMAIL_PASSWORD,
            attachment_paths=attachments
        )

        # Journal sans donnée personnelle du visiteur (ni nom ni adresse) : 13/11/2026.
        if success:
            logger.info("Mail de demande de devis envoyé à la boîte commerciale")
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
        attachment_info = "\nPièce jointe : Oui" if attachment_path else "\nPas de pièce jointe"

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
            to_email=destinataire_equipe(CONTACT_EMAIL),
            subject=email_subject,
            body=body,
            from_email=CONTACT_EMAIL,
            password=CONTACT_EMAIL_PASSWORD,
            attachment_paths=attachments
        )

        if success:
            logger.info("Mail de message de contact envoyé à la boîte de contact")
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
            to_email=destinataire_equipe(RECRUITMENT_EMAIL),
            subject=subject,
            body=body,
            from_email=RECRUITMENT_EMAIL,
            password=RECRUITMENT_EMAIL_PASSWORD,
            attachment_paths=attachment_paths
        )

        if success:
            logger.info("Mail de candidature envoyé à la boîte du recrutement")
        return success

    except Exception as e:
        logger.error(f"Error sending recruitment email: {str(e)}")
        return False
