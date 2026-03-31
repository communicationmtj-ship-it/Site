from fastapi import APIRouter, Request, Header
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone, timedelta
import hashlib
import httpx
import logging

from email_service import send_email_smtp, CONTACT_EMAIL, CONTACT_EMAIL_PASSWORD
from security import verify_dashboard_token

logger = logging.getLogger(__name__)

router = APIRouter()


def _get_db():
    from database import db
    return db


class TrackVisitRequest(BaseModel):
    page: str
    referrer: Optional[str] = None


async def get_geo_from_ip(ip: str):
    if ip in ("127.0.0.1", "::1", "localhost"):
        return {"country": "Local", "city": "Local"}
    try:
        async with httpx.AsyncClient(timeout=3) as client_http:
            resp = await client_http.get(f"http://ip-api.com/json/{ip}?fields=country,city,regionName")
            if resp.status_code == 200:
                data = resp.json()
                return {
                    "country": data.get("country", "Inconnu"),
                    "city": data.get("city", "Inconnu"),
                    "region": data.get("regionName", ""),
                }
    except Exception:
        pass
    return {"country": "Inconnu", "city": "Inconnu"}


@router.post("/track")
async def track_visit(req: TrackVisitRequest, request: Request):
    ip = request.headers.get("x-forwarded-for", request.headers.get("x-real-ip", request.client.host))
    if "," in ip:
        ip = ip.split(",")[0].strip()
    user_agent = request.headers.get("user-agent", "")
    visitor_hash = hashlib.sha256(f"{ip}{user_agent}".encode()).hexdigest()[:16]
    geo = await get_geo_from_ip(ip)
    now = datetime.now(timezone.utc)
    doc = {
        "page": req.page,
        "referrer": req.referrer,
        "visitor_id": visitor_hash,
        "ip": ip,
        "user_agent": user_agent,
        "country": geo.get("country", "Inconnu"),
        "city": geo.get("city", "Inconnu"),
        "region": geo.get("region", ""),
        "date": now.strftime("%Y-%m-%d"),
        "hour": now.hour,
        "timestamp": now.isoformat(),
    }
    db = _get_db()
    await db.visits.insert_one(doc)
    return {"status": "ok"}


@router.get("/stats")
async def get_stats(days: int = 30, x_dashboard_token: Optional[str] = Header(None)):
    if not verify_dashboard_token(x_dashboard_token or ""):
        return {"status": "error", "message": "Authentification requise."}

    days = max(1, min(days, 365))
    db = _get_db()
    now = datetime.now(timezone.utc)
    since = (now - timedelta(days=days)).strftime("%Y-%m-%d")
    today = now.strftime("%Y-%m-%d")

    pipeline_total = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": None, "total": {"$sum": 1}, "unique": {"$addToSet": "$visitor_id"}}},
        {"$project": {"_id": 0, "total": 1, "unique": {"$size": "$unique"}}},
    ]
    total_result = await db.visits.aggregate(pipeline_total).to_list(1)
    total_stats = total_result[0] if total_result else {"total": 0, "unique": 0}

    pipeline_today = [
        {"$match": {"date": today}},
        {"$group": {"_id": None, "total": {"$sum": 1}, "unique": {"$addToSet": "$visitor_id"}}},
        {"$project": {"_id": 0, "total": 1, "unique": {"$size": "$unique"}}},
    ]
    today_result = await db.visits.aggregate(pipeline_today).to_list(1)
    today_stats = today_result[0] if today_result else {"total": 0, "unique": 0}

    pipeline_daily = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": "$date", "visits": {"$sum": 1}, "unique": {"$addToSet": "$visitor_id"}}},
        {"$project": {"_id": 0, "date": "$_id", "visits": 1, "unique": {"$size": "$unique"}}},
        {"$sort": {"date": 1}},
    ]
    daily = await db.visits.aggregate(pipeline_daily).to_list(100)

    pipeline_pages = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": "$page", "visits": {"$sum": 1}}},
        {"$project": {"_id": 0, "page": "$_id", "visits": 1}},
        {"$sort": {"visits": -1}},
        {"$limit": 20},
    ]
    pages = await db.visits.aggregate(pipeline_pages).to_list(20)

    pipeline_countries = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": "$country", "visits": {"$sum": 1}}},
        {"$project": {"_id": 0, "country": "$_id", "visits": 1}},
        {"$sort": {"visits": -1}},
        {"$limit": 15},
    ]
    countries = await db.visits.aggregate(pipeline_countries).to_list(15)

    pipeline_cities = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": "$city", "visits": {"$sum": 1}}},
        {"$project": {"_id": 0, "city": "$_id", "visits": 1}},
        {"$sort": {"visits": -1}},
        {"$limit": 15},
    ]
    cities = await db.visits.aggregate(pipeline_cities).to_list(15)

    pipeline_hours = [
        {"$match": {"date": today}},
        {"$group": {"_id": "$hour", "visits": {"$sum": 1}}},
        {"$project": {"_id": 0, "hour": "$_id", "visits": 1}},
        {"$sort": {"hour": 1}},
    ]
    hours = await db.visits.aggregate(pipeline_hours).to_list(24)

    recent_raw = await db.visits.find({}, {"_id": 0}).sort("timestamp", -1).limit(20).to_list(20)

    return {
        "period": {"days": days, "since": since},
        "total": total_stats,
        "today": today_stats,
        "daily": daily,
        "pages": pages,
        "countries": countries,
        "cities": cities,
        "hours_today": hours,
        "recent": recent_raw,
    }


# ============================================
# Monthly Report
# ============================================

def _html_table_rows(items, columns):
    if not items:
        return '<tr><td colspan="{}" style="padding:10px 14px;color:#888;text-align:center;">Aucune donnee</td></tr>'.format(
            len(columns)
        )
    rows = ""
    for i, item in enumerate(items):
        bg = "#f9f6f2" if i % 2 == 0 else "#ffffff"
        cells = "".join(
            f'<td style="padding:10px 14px;border-bottom:1px solid #eee;">{item.get(col, "—")}</td>'
            for col in columns
        )
        rows += f'<tr style="background:{bg};">{cells}</tr>'
    return rows


async def generate_monthly_report():
    db = _get_db()
    now = datetime.now(timezone.utc)
    last_month_end = now.replace(day=1) - timedelta(days=1)
    last_month_start = last_month_end.replace(day=1)
    month_name = last_month_start.strftime("%B %Y")
    since = last_month_start.strftime("%Y-%m-%d")
    until = last_month_end.strftime("%Y-%m-%d")

    total = await db.visits.aggregate([
        {"$match": {"date": {"$gte": since, "$lte": until}}},
        {"$group": {"_id": None, "total": {"$sum": 1}, "unique": {"$addToSet": "$visitor_id"}}},
        {"$project": {"_id": 0, "total": 1, "unique": {"$size": "$unique"}}},
    ]).to_list(1)
    total = total[0] if total else {"total": 0, "unique": 0}

    pages = await db.visits.aggregate([
        {"$match": {"date": {"$gte": since, "$lte": until}}},
        {"$group": {"_id": "$page", "visits": {"$sum": 1}}},
        {"$sort": {"visits": -1}},
        {"$limit": 10},
    ]).to_list(10)

    countries = await db.visits.aggregate([
        {"$match": {"date": {"$gte": since, "$lte": until}}},
        {"$group": {"_id": "$country", "visits": {"$sum": 1}}},
        {"$sort": {"visits": -1}},
        {"$limit": 10},
    ]).to_list(10)

    cities = await db.visits.aggregate([
        {"$match": {"date": {"$gte": since, "$lte": until}}},
        {"$group": {"_id": "$city", "visits": {"$sum": 1}}},
        {"$sort": {"visits": -1}},
        {"$limit": 10},
    ]).to_list(10)

    ips = await db.visits.aggregate([
        {"$match": {"date": {"$gte": since, "$lte": until}}},
        {"$group": {"_id": "$ip", "visits": {"$sum": 1}, "city": {"$first": "$city"}, "country": {"$first": "$country"}}},
        {"$sort": {"visits": -1}},
        {"$limit": 50},
    ]).to_list(50)

    quotes_emails = await db.quotes.find(
        {"timestamp": {"$gte": last_month_start.isoformat(), "$lte": now.isoformat()}},
        {"_id": 0, "name": 1, "email": 1, "phone": 1, "serviceType": 1},
    ).to_list(100)
    contacts_emails = await db.contacts.find(
        {"timestamp": {"$gte": last_month_start.isoformat(), "$lte": now.isoformat()}},
        {"_id": 0, "name": 1, "email": 1, "phone": 1, "subject": 1},
    ).to_list(100)
    recruits_emails = await db.recruitments.find(
        {"timestamp": {"$gte": last_month_start.isoformat(), "$lte": now.isoformat()}},
        {"_id": 0, "firstName": 1, "lastName": 1, "email": 1, "phone": 1},
    ).to_list(100)

    pages_data = [{"page": p["_id"], "visits": p["visits"]} for p in pages]
    countries_data = [{"country": c["_id"], "visits": c["visits"]} for c in countries]
    cities_data = [{"city": c["_id"], "visits": c["visits"]} for c in cities]
    ips_data = [
        {"ip": ip["_id"], "localisation": f'{ip.get("city", "—")}, {ip.get("country", "—")}', "visits": ip["visits"]}
        for ip in ips
    ]
    quotes_data = [
        {"nom": q.get("name", "—"), "email": q.get("email", "—"), "tel": q.get("phone", "—"), "service": q.get("serviceType", "—")}
        for q in quotes_emails
    ]
    contacts_data = [
        {"nom": c.get("name", "—"), "email": c.get("email", "—"), "tel": c.get("phone", "—"), "objet": c.get("subject", "—")}
        for c in contacts_emails
    ]
    recruits_data = [
        {"nom": f'{r.get("firstName", "")} {r.get("lastName", "")}', "email": r.get("email", "—"), "tel": r.get("phone", "—")}
        for r in recruits_emails
    ]

    def section(title, headers, data, columns):
        header_cells = "".join(
            f'<th style="padding:10px 14px;text-align:left;background:#1a1a1a;color:#d4c5b9;font-weight:600;border-bottom:2px solid #AC8631;">{h}</th>'
            for h in headers
        )
        return f'''
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-collapse:collapse;border-radius:6px;overflow:hidden;border:1px solid #e5e0da;">
            <tr><td colspan="{len(headers)}" style="background:#1a1a1a;padding:14px 18px;">
                <span style="color:#AC8631;font-size:16px;font-weight:700;letter-spacing:0.5px;">{title}</span>
            </td></tr>
            <tr>{header_cells}</tr>
            {_html_table_rows(data, columns)}
        </table>'''

    body = f'''<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:24px 0;">
<tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <tr><td style="background:#1a1a1a;padding:32px 40px;text-align:center;">
        <h1 style="margin:0;color:#AC8631;font-size:24px;font-weight:800;letter-spacing:1px;">MTJ SECURITE PRIVEE</h1>
        <p style="margin:8px 0 0;color:#d4c5b9;font-size:14px;">Rapport mensuel — {month_name}</p>
    </td></tr>

    <!-- Summary Cards -->
    <tr><td style="padding:32px 40px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td width="50%" style="padding-right:10px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border:1px solid #e5e0da;border-radius:8px;">
                        <tr><td style="padding:20px;text-align:center;">
                            <p style="margin:0;font-size:32px;font-weight:800;color:#1a1a1a;">{total['total']}</p>
                            <p style="margin:6px 0 0;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:1px;">Visites totales</p>
                        </td></tr>
                    </table>
                </td>
                <td width="50%" style="padding-left:10px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border:1px solid #e5e0da;border-radius:8px;">
                        <tr><td style="padding:20px;text-align:center;">
                            <p style="margin:0;font-size:32px;font-weight:800;color:#1a1a1a;">{total['unique']}</p>
                            <p style="margin:6px 0 0;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:1px;">Visiteurs uniques</p>
                        </td></tr>
                    </table>
                </td>
            </tr>
        </table>
    </td></tr>

    <!-- Formulaires Summary -->
    <tr><td style="padding:8px 40px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td width="33%" style="padding-right:6px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:6px;">
                        <tr><td style="padding:14px;text-align:center;">
                            <p style="margin:0;font-size:22px;font-weight:700;color:#AC8631;">{len(quotes_emails)}</p>
                            <p style="margin:4px 0 0;font-size:11px;color:#d4c5b9;text-transform:uppercase;">Devis</p>
                        </td></tr>
                    </table>
                </td>
                <td width="33%" style="padding:0 6px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:6px;">
                        <tr><td style="padding:14px;text-align:center;">
                            <p style="margin:0;font-size:22px;font-weight:700;color:#AC8631;">{len(contacts_emails)}</p>
                            <p style="margin:4px 0 0;font-size:11px;color:#d4c5b9;text-transform:uppercase;">Contacts</p>
                        </td></tr>
                    </table>
                </td>
                <td width="33%" style="padding-left:6px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:6px;">
                        <tr><td style="padding:14px;text-align:center;">
                            <p style="margin:0;font-size:22px;font-weight:700;color:#AC8631;">{len(recruits_emails)}</p>
                            <p style="margin:4px 0 0;font-size:11px;color:#d4c5b9;text-transform:uppercase;">Candidatures</p>
                        </td></tr>
                    </table>
                </td>
            </tr>
        </table>
    </td></tr>

    <!-- Data Tables -->
    <tr><td style="padding:0 40px 16px;">
        {section("Pages les plus visitees", ["Page", "Visites"], pages_data, ["page", "visits"])}
        {section("Pays", ["Pays", "Visites"], countries_data, ["country", "visits"])}
        {section("Villes", ["Ville", "Visites"], cities_data, ["city", "visits"])}
        {section("Adresses IP des visiteurs", ["IP", "Localisation", "Visites"], ips_data, ["ip", "localisation", "visits"])}
        {section("Demandes de devis", ["Nom", "Email", "Telephone", "Service"], quotes_data, ["nom", "email", "tel", "service"])}
        {section("Messages de contact", ["Nom", "Email", "Telephone", "Objet"], contacts_data, ["nom", "email", "tel", "objet"])}
        {section("Candidatures recrutement", ["Nom", "Email", "Telephone"], recruits_data, ["nom", "email", "tel"])}
    </td></tr>

    <!-- Footer -->
    <tr><td style="background:#1a1a1a;padding:24px 40px;text-align:center;">
        <p style="margin:0;color:#888;font-size:12px;">Ce rapport est genere automatiquement par le site MTJ Securite Privee.</p>
        <p style="margin:6px 0 0;color:#AC8631;font-size:12px;">31 rue Chevalier Paul, 83200 Toulon | 07 60 73 82 06</p>
    </td></tr>

</table>
</td></tr>
</table>
</body></html>'''

    success = send_email_smtp(
        to_email=CONTACT_EMAIL,
        subject=f"Rapport mensuel du site — {month_name}",
        body=body,
        from_email=CONTACT_EMAIL,
        password=CONTACT_EMAIL_PASSWORD,
        content_type="html",
    )
    return success


@router.post("/send-monthly-report")
async def send_monthly_report_now(x_dashboard_token: Optional[str] = Header(None)):
    if not verify_dashboard_token(x_dashboard_token or ""):
        return {"status": "error", "message": "Authentification requise."}
    success = await generate_monthly_report()
    if success:
        return {"status": "success", "message": "Rapport envoye"}
    return {"status": "error", "message": "Erreur lors de l'envoi"}
