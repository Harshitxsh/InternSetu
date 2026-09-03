from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class GitHubRepo(BaseModel):
    name: str
    description: Optional[str] = None
    language: Optional[str] = None
    stars: int = 0
    forks: int = 0
    size: int = 0
    topics: List[str] = []
    has_readme: bool = False
    has_ci: bool = False
    has_dockerfile: bool = False
    commit_count: int = 0
    updated_at: Optional[str] = None

class GitHubSnapshot(BaseModel):
    username: str
    total_repos: int
    primary_languages: Dict[str, int] = {}
    repos: List[GitHubRepo] = []
    commit_velocity: float = 0.0
    s_proj_score: float = 0.0
    scored_at: Optional[datetime] = None

class ResumeScore(BaseModel):
    filename: str
    extracted_text_length: int
    ats_match_score: float
    credibility_index: float
    matched_keywords: List[str] = []
    s_resume_score: float = 0.0
    parsed_at: Optional[datetime] = None

class JRIBreakdown(BaseModel):
    uid: str
    overall_jri: float = Field(..., ge=0, le=100)
    s_assess: float = Field(default=0.0, ge=0, le=100)
    s_proj: float = Field(default=0.0, ge=0, le=100)
    s_resume: float = Field(default=0.0, ge=0, le=100)
    s_acad: float = Field(default=0.0, ge=0, le=100)
    tier: str
    top_strengths: List[str] = []
    skill_gaps: List[str] = []
    percentile: float = 0.0
    computed_at: Optional[datetime] = None

    @classmethod
    def calculate(cls, uid: str, s_assess: float, s_proj: float, s_resume: float, s_acad: float) -> 'JRIBreakdown':
        overall = (0.35 * s_assess) + (0.30 * s_proj) + (0.20 * s_resume) + (0.15 * s_acad)
        overall = round(min(100.0, max(0.0, overall)), 2)
        tier = "ALLOCATION_MODE" if overall >= 85.0 else "QUEST_MODE"
        return cls(
            uid=uid, overall_jri=overall, s_assess=s_assess, s_proj=s_proj,
            s_resume=s_resume, s_acad=s_acad, tier=tier, computed_at=datetime.utcnow()
        )

class JRICalculateRequest(BaseModel):
    uid: str
    s_assess: Optional[float] = None
    s_proj: Optional[float] = None
    s_resume: Optional[float] = None
    s_acad: Optional[float] = None
    use_cached: bool = True
