from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from models.user import AYUSHDomain

class SkillRequirement(BaseModel):
    skill: str
    weight: float = 1.0

class Internship(BaseModel):
    id: str
    company_name: str
    company_type: str
    role_title: str
    domain: AYUSHDomain
    location: str
    stipend_monthly: int
    duration_months: int
    available_seats: int
    required_skills: List[SkillRequirement] = []
    description: str = ""
    min_jri: float = 85.0
    posted_at: Optional[datetime] = None
    posted_by_uid: Optional[str] = None

class InternshipMatch(BaseModel):
    internship: Internship
    match_score: float
    ilp_rank: int
    semantic_explanation: str = ""

class AllocationResult(BaseModel):
    uid: str
    jri: float
    matched_internships: List[InternshipMatch]
    allocation_passed: bool
    computed_at: Optional[datetime] = None

class SkillQuest(BaseModel):
    id: str
    title: str
    domain: AYUSHDomain
    category: str
    description: str
    syllabus: List[str] = []
    duration_days: int
    xp_reward: int
    jri_boost_percent: float
    sponsor_company: str = ""
    difficulty: str = "Intermediate"
    status: str = "AVAILABLE"
    completed_at: Optional[datetime] = None

class QuestProgress(BaseModel):
    uid: str
    quest_id: str
    status: str
    xp_earned: int = 0
    jri_gained: float = 0.0
    completed_at: Optional[datetime] = None

class InternshipPostRequest(BaseModel):
    company_name: str
    company_type: str
    role_title: str
    domain: AYUSHDomain
    location: str
    stipend_monthly: int
    duration_months: int
    available_seats: int
    required_skills: List[SkillRequirement] = []
    description: str = ""
