from fastapi import FastAPI, APIRouter, UploadFile, File, Form, Request
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import shutil
import httpx
import hashlib

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from email_service import send_quote_email, send_contact_email, send_recruitment_email

# Create uploads directory
UPLOAD_DIR = ROOT_DIR / 'uploads'
UPLOAD_DIR.mkdir(exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Quote endpoint
@api_router.post("/quote")
async def submit_quote(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    serviceType: str = Form(...),
    message: str = Form(...),
    company: Optional[str] = Form(None),
    attachment: Optional[UploadFile] = File(None)
):
    """
    Handle quote form submission with optional file attachment
    """
    try:
        attachment_path = None
        attachment_filename = None
        
        # Save attachment if provided
        if attachment:
            # Generate unique filename
            file_extension = Path(attachment.filename).suffix
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            attachment_path = UPLOAD_DIR / unique_filename
            
            # Save file
            with open(attachment_path, "wb") as buffer:
                shutil.copyfileobj(attachment.file, buffer)
            
            attachment_filename = attachment.filename
            logger.info(f"Attachment saved: {unique_filename}")
        
        # Save to database
        quote_dict = {
            'id': str(uuid.uuid4()),
            'name': name,
            'company': company,
            'email': email,
            'phone': phone,
            'serviceType': serviceType,
            'message': message,
            'attachment_filename': attachment_filename,
            'attachment_path': str(attachment_path) if attachment_path else None,
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'status': 'pending'
        }
        
        await db.quotes.insert_one(quote_dict)
        
        # Send email notification
        send_quote_email(
            name=name,
            company=company,
            email=email,
            phone=phone,
            service_type=serviceType,
            message=message,
            attachment_path=str(attachment_path) if attachment_path else None
        )
        
        return {
            "status": "success",
            "message": "Votre demande de devis a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais."
        }
        
    except Exception as e:
        logger.error(f"Error submitting quote: {str(e)}")
        return {
            "status": "error",
            "message": "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer."
        }

# Contact endpoint
@api_router.post("/contact")
async def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    phone: Optional[str] = Form(None),
    attachment: Optional[UploadFile] = File(None)
):
    """
    Handle contact form submission with optional file attachment
    """
    try:
        attachment_path = None
        attachment_filename = None
        
        # Save attachment if provided
        if attachment:
            # Generate unique filename
            file_extension = Path(attachment.filename).suffix
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            attachment_path = UPLOAD_DIR / unique_filename
            
            # Save file
            with open(attachment_path, "wb") as buffer:
                shutil.copyfileobj(attachment.file, buffer)
            
            attachment_filename = attachment.filename
            logger.info(f"Attachment saved: {unique_filename}")
        
        # Save to database
        contact_dict = {
            'id': str(uuid.uuid4()),
            'name': name,
            'email': email,
            'phone': phone,
            'subject': subject,
            'message': message,
            'attachment_filename': attachment_filename,
            'attachment_path': str(attachment_path) if attachment_path else None,
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'status': 'pending'
        }
        
        await db.contacts.insert_one(contact_dict)
        
        # Send email notification
        send_contact_email(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message,
            attachment_path=str(attachment_path) if attachment_path else None
        )
        
        return {
            "status": "success",
            "message": "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."
        }
        
    except Exception as e:
        logger.error(f"Error submitting contact: {str(e)}")
        return {
            "status": "error",
            "message": "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer."
        }

# Recrutement endpoint
@api_router.post("/recrutement")
async def submit_recruitment(
    firstName: str = Form(...),
    lastName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    message: str = Form(...),
    attachments: List[UploadFile] = File(...)
):
    """
    Handle recruitment application submission with multiple file attachments
    """
    try:
        attachment_paths = []
        attachment_filenames = []
        
        # Save all attachments
        for attachment in attachments:
            # Generate unique filename
            file_extension = Path(attachment.filename).suffix
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            attachment_path = UPLOAD_DIR / unique_filename
            
            # Save file
            with open(attachment_path, "wb") as buffer:
                shutil.copyfileobj(attachment.file, buffer)
            
            attachment_paths.append(str(attachment_path))
            attachment_filenames.append(attachment.filename)
            logger.info(f"Recruitment attachment saved: {unique_filename}")
        
        # Save to database
        recruitment_dict = {
            'id': str(uuid.uuid4()),
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'message': message,
            'attachment_filenames': attachment_filenames,
            'attachment_paths': attachment_paths,
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'status': 'pending'
        }
        
        await db.recruitments.insert_one(recruitment_dict)
        
        # Send email notification
        send_recruitment_email(
            first_name=firstName,
            last_name=lastName,
            email=email,
            phone=phone,
            message=message,
            attachment_paths=attachment_paths
        )
        
        return {
            "status": "success",
            "message": "Votre candidature a été envoyée avec succès. Nous examinerons votre profil et vous contacterons rapidement."
        }
        
    except Exception as e:
        logger.error(f"Error submitting recruitment application: {str(e)}")
        return {
            "status": "error",
            "message": "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer."
        }

# ============================================
# ANALYTICS - Visit Tracking
# ============================================

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
                return {"country": data.get("country", "Inconnu"), "city": data.get("city", "Inconnu"), "region": data.get("regionName", "")}
    except Exception:
        pass
    return {"country": "Inconnu", "city": "Inconnu"}

@api_router.post("/track")
async def track_visit(req: TrackVisitRequest, request: Request):
    ip = request.headers.get("x-forwarded-for", request.headers.get("x-real-ip", request.client.host))
    if "," in ip:
        ip = ip.split(",")[0].strip()
    user_agent = request.headers.get("user-agent", "")
    visitor_hash = hashlib.sha256(f"{ip}{user_agent}".encode()).hexdigest()[:16]
    geo = await get_geo_from_ip(ip)
    now = datetime.now(timezone.utc)
    doc = {
        "page": req.page, "referrer": req.referrer, "visitor_id": visitor_hash,
        "ip": ip, "user_agent": user_agent,
        "country": geo.get("country", "Inconnu"), "city": geo.get("city", "Inconnu"), "region": geo.get("region", ""),
        "date": now.strftime("%Y-%m-%d"), "hour": now.hour, "timestamp": now.isoformat(),
    }
    await db.visits.insert_one(doc)
    return {"status": "ok"}

@api_router.get("/stats")
async def get_stats(days: int = 30):
    now = datetime.now(timezone.utc)
    since = (now - timedelta(days=days)).strftime("%Y-%m-%d")
    today = now.strftime("%Y-%m-%d")

    pipeline_total = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": None, "total": {"$sum": 1}, "unique": {"$addToSet": "$visitor_id"}}},
        {"$project": {"_id": 0, "total": 1, "unique": {"$size": "$unique"}}}
    ]
    total_result = await db.visits.aggregate(pipeline_total).to_list(1)
    total_stats = total_result[0] if total_result else {"total": 0, "unique": 0}

    pipeline_today = [
        {"$match": {"date": today}},
        {"$group": {"_id": None, "total": {"$sum": 1}, "unique": {"$addToSet": "$visitor_id"}}},
        {"$project": {"_id": 0, "total": 1, "unique": {"$size": "$unique"}}}
    ]
    today_result = await db.visits.aggregate(pipeline_today).to_list(1)
    today_stats = today_result[0] if today_result else {"total": 0, "unique": 0}

    pipeline_daily = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": "$date", "visits": {"$sum": 1}, "unique": {"$addToSet": "$visitor_id"}}},
        {"$project": {"_id": 0, "date": "$_id", "visits": 1, "unique": {"$size": "$unique"}}},
        {"$sort": {"date": 1}}
    ]
    daily = await db.visits.aggregate(pipeline_daily).to_list(100)

    pipeline_pages = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": "$page", "visits": {"$sum": 1}}},
        {"$project": {"_id": 0, "page": "$_id", "visits": 1}},
        {"$sort": {"visits": -1}}, {"$limit": 20}
    ]
    pages = await db.visits.aggregate(pipeline_pages).to_list(20)

    pipeline_countries = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": "$country", "visits": {"$sum": 1}}},
        {"$project": {"_id": 0, "country": "$_id", "visits": 1}},
        {"$sort": {"visits": -1}}, {"$limit": 15}
    ]
    countries = await db.visits.aggregate(pipeline_countries).to_list(15)

    pipeline_cities = [
        {"$match": {"date": {"$gte": since}}},
        {"$group": {"_id": "$city", "visits": {"$sum": 1}}},
        {"$project": {"_id": 0, "city": "$_id", "visits": 1}},
        {"$sort": {"visits": -1}}, {"$limit": 15}
    ]
    cities = await db.visits.aggregate(pipeline_cities).to_list(15)

    pipeline_hours = [
        {"$match": {"date": today}},
        {"$group": {"_id": "$hour", "visits": {"$sum": 1}}},
        {"$project": {"_id": 0, "hour": "$_id", "visits": 1}},
        {"$sort": {"hour": 1}}
    ]
    hours = await db.visits.aggregate(pipeline_hours).to_list(24)

    recent_raw = await db.visits.find({}, {"_id": 0}).sort("timestamp", -1).limit(20).to_list(20)

    return {
        "period": {"days": days, "since": since},
        "total": total_stats, "today": today_stats,
        "daily": daily, "pages": pages, "countries": countries,
        "cities": cities, "hours_today": hours, "recent": recent_raw,
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

@app.get("/api/sitemap.xml")
async def sitemap():
    base_url = "https://mtj-securite-privee.fr"
    pages = [
        {"loc": "/", "priority": "1.0", "changefreq": "weekly"},
        {"loc": "/recrutement", "priority": "0.8", "changefreq": "monthly"},
        {"loc": "/agent-securite-prevention", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "/securite-cynophile-maitre-chien", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "/detection-explosifs-cynodex", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "/ssiap-securite-incendie", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "/securite-evenementielle", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "/surveillance-chantier-site", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "/securite-privee-toulon", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "/securite-privee-toulouse", "priority": "0.8", "changefreq": "monthly"},
        {"loc": "/securite-privee-nice-monaco", "priority": "0.8", "changefreq": "monthly"},
        {"loc": "/securite-privee-sud-france", "priority": "0.8", "changefreq": "monthly"},
    ]
    urls = "\n".join([
        f'  <url><loc>{base_url}{p["loc"]}</loc><changefreq>{p["changefreq"]}</changefreq><priority>{p["priority"]}</priority></url>'
        for p in pages
    ])
    xml = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>'
    return Response(content=xml, media_type="application/xml")
