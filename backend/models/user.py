from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    STUDENT = "STUDENT"
    COMPANY = "COMPANY"
    INSTITUTION = "INSTITUTION"

class AYUSHDomain(str, Enum):
    AYURVEDA = "Ayurveda"
    YOGA = "Yoga & Naturopathy"
    UNANI = "Unani Medicine"
    SIDDHA = "Siddha"
    HOMEOPATHY = "Homeopathy"
    HERBAL_PHARMA = "Herbal Pharmaceuticals"
    BIOTECH = "Biotechnology & Bioinformatics"
    PHARMACOVIGILANCE = "Pharmacovigilance"
    DIGITAL_HEALTH = "Digital Healthcare"
    TRADITIONAL_MEDICINE = "Traditional Medicine Research"

class StudentProfile(BaseModel):
    uid: str
    name: str
    email: str
    institution: str = ""
    degree: str = ""
    branch: str = ""
    cgpa: float = Field(default=0.0, ge=0.0, le=10.0)
    graduation_year: int = 2026
    skills: List[str] = []
    primary_domain: AYUSHDomain = AYUSHDomain.AYURVEDA
    github_username: Optional[str] = None
    github_token: Optional[str] = None
    role: UserRole = UserRole.STUDENT
    is_onboarded: bool = False
    created_at: Optional[datetime] = None

class CompanyProfile(BaseModel):
    uid: str
    name: str
    email: str
    company_name: str
    company_type: str = ""
    domains: List[AYUSHDomain] = []
    role: UserRole = UserRole.COMPANY
    is_onboarded: bool = False

class InstitutionProfile(BaseModel):
    uid: str
    name: str
    email: str
    institution_name: str
    type: str = "University"
    affiliated_to: str = ""
    role: UserRole = UserRole.INSTITUTION
    is_onboarded: bool = False

class RoleOnboardingRequest(BaseModel):
    uid: str
    role: UserRole
    profile_data: dict

class TokenVerifyRequest(BaseModel):
    id_token: str
