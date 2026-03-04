from fastapi import FastAPI, APIRouter
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
from models import QuoteRequest, ContactRequest
from email_service import send_quote_email, send_contact_email


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

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
async def submit_quote(request: QuoteRequest):
    """
    Handle quote form submission
    """
    try:
        # Save to database
        quote_dict = request.model_dump()
        quote_dict['id'] = str(uuid.uuid4())
        quote_dict['timestamp'] = datetime.now(timezone.utc).isoformat()
        quote_dict['status'] = 'pending'
        
        await db.quotes.insert_one(quote_dict)
        
        # Send email notification
        send_quote_email(
            name=request.name,
            company=request.company,
            email=request.email,
            phone=request.phone,
            service_type=request.serviceType,
            message=request.message
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
async def submit_contact(request: ContactRequest):
    """
    Handle contact form submission
    """
    try:
        # Save to database
        contact_dict = request.model_dump()
        contact_dict['id'] = str(uuid.uuid4())
        contact_dict['timestamp'] = datetime.now(timezone.utc).isoformat()
        contact_dict['status'] = 'pending'
        
        await db.contacts.insert_one(contact_dict)
        
        # Send email notification
        send_contact_email(
            name=request.name,
            email=request.email,
            phone=request.phone,
            subject=request.subject,
            message=request.message
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