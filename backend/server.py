from fastapi import FastAPI, APIRouter
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Base models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# Include routers
from routers.forms import router as forms_router
from routers.analytics import router as analytics_router

api_router.include_router(forms_router)
api_router.include_router(analytics_router)

# Include the api router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


async def monthly_report_scheduler():
    from routers.analytics import generate_monthly_report
    while True:
        now = datetime.now(timezone.utc)
        if now.day == 1 and now.hour == 8:
            try:
                already_sent = await db.report_logs.find_one({"month": now.strftime("%Y-%m")})
                if not already_sent:
                    success = await generate_monthly_report()
                    await db.report_logs.insert_one({
                        "month": now.strftime("%Y-%m"),
                        "sent_at": now.isoformat(),
                        "success": success
                    })
                    logger.info(f"Monthly report sent: {success}")
            except Exception as e:
                logger.error(f"Monthly report error: {e}")
        await asyncio.sleep(3600)


@app.on_event("startup")
async def start_scheduler():
    asyncio.create_task(monthly_report_scheduler())


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
        {"loc": "/securite-sites-industriels-commerciaux", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "/securite-residentielle", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "/securite-erp-etablissements-public", "priority": "0.9", "changefreq": "monthly"},
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
