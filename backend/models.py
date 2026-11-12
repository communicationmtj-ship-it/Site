from pydantic import BaseModel, EmailStr
from typing import Optional

class QuoteRequest(BaseModel):
    name: str
    company: Optional[str] = None
    email: EmailStr
    phone: str
    serviceType: str
    message: str
    consent: bool = False
    consent_at: Optional[str] = None

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    consent: bool = False
    consent_at: Optional[str] = None
