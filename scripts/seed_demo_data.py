"""
Demo Seeding Script for SIH 2026.
Seeds SQLite and Firestore (if online) with realistic AYUSH personas across all 4 roles:
1. Arjun Sharma (Student - Ayurveda & Tech, JRI 68.5 -> eligible for Quests)
2. Priya Nair (Student - Biotech, JRI 87.2 -> unlocked Allocation Pool)
3. Dr. Ramesh Vaidya (Faculty - AIIA Delhi)
4. Sun Pharma AYUSH R&D (Industry)
5. Rajiv Gandhi University of Health Sciences (Institution)
"""
import os
import sys
from pathlib import Path
from datetime import datetime

# Add backend to sys.path
backend_path = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(backend_path))

from db.sqlite_fallback import init_sqlite, upsert_user, upsert_jri

DEMO_PERSONAS = [
    {
        "uid": "demo-student-001",
        "role": "STUDENT",
        "name": "Arjun Sharma",
        "email": "arjun.sharma@ayush-institute.edu.in",
        "is_onboarded": True,
        "institution": "All India Institute of Ayurveda (AIIA), New Delhi",
        "degree": "B.Pharm (Ayurveda)",
        "branch": "Phytopharmacy & Drug Standardization",
        "cgpa": 8.4,
        "graduation_year": 2026,
        "primary_domain": "Ayurveda",
        "skills": ["HPLC", "Ayurvedic Formulations", "Python", "Data Analysis"],
        "github_username": "arjun-ayurveda-dev",
        "jri": {
            "uid": "demo-student-001",
            "overall_jri": 68.5,
            "s_assess": 72.0,
            "s_proj": 58.0,
            "s_resume": 65.0,
            "s_acad": 84.0,
            "tier": "QUEST_MODE",
            "top_strengths": ["Academic CGPA", "AYUSH Assessment"],
            "skill_gaps": ["GitHub Production Depth", "FHIR APIs"],
            "percentile": 67.4,
            "computed_at": datetime.utcnow().isoformat()
        }
    },
    {
        "uid": "demo-student-002",
        "role": "STUDENT",
        "name": "Priya Nair",
        "email": "priya.nair@biotech-univ.ac.in",
        "is_onboarded": True,
        "institution": "Institute of Chemical Technology (ICT), Mumbai",
        "degree": "M.Sc Bioinformatics",
        "branch": "Computational Biology",
        "cgpa": 9.1,
        "graduation_year": 2026,
        "primary_domain": "Biotechnology & Bioinformatics",
        "skills": ["R", "Bioconductor", "Molecular Docking", "RDKit", "Python", "Docker"],
        "github_username": "priya-biotech",
        "jri": {
            "uid": "demo-student-002",
            "overall_jri": 88.4,
            "s_assess": 89.0,
            "s_proj": 86.5,
            "s_resume": 84.0,
            "s_acad": 92.0,
            "tier": "ALLOCATION_MODE",
            "top_strengths": ["Genomic Pipelines", "Molecular Modeling"],
            "skill_gaps": ["GMP Documentation"],
            "percentile": 94.2,
            "computed_at": datetime.utcnow().isoformat()
        }
    },
    {
        "uid": "demo-faculty-001",
        "role": "FACULTY",
        "name": "Dr. Ramesh Vaidya",
        "email": "dr.ramesh@aiia.gov.in",
        "is_onboarded": True,
        "institution": "All India Institute of Ayurveda, New Delhi",
        "department": "Department of Dravyaguna & Herbal Pharmacology",
        "designation": "Professor & Head of Research",
        "specializations": ["Ayurveda", "Pharmacovigilance", "Herbal Pharmaceuticals"]
    },
    {
        "uid": "demo-industry-001",
        "role": "INDUSTRY",
        "name": "Sun Pharma AYUSH Division",
        "email": "partnerships@sunpharma.com",
        "is_onboarded": True,
        "company_name": "Sun Pharmaceutical Industries Ltd - Traditional Medicine Wing",
        "company_type": "Herbal Pharmaceuticals & Pharmacovigilance",
        "domains": ["Herbal Pharmaceuticals", "Pharmacovigilance"]
    },
    {
        "uid": "demo-inst-001",
        "role": "INSTITUTION",
        "name": "Rajiv Gandhi University of Health Sciences",
        "email": "registrar@rguhs.ac.in",
        "is_onboarded": True,
        "institution_name": "Rajiv Gandhi University of Health Sciences, Karnataka",
        "type": "State Health University",
        "affiliated_to": "UGC & Ministry of AYUSH"
    }
]

def seed():
    print("Seeding SQLite offline database...")
    init_sqlite()
    for persona in DEMO_PERSONAS:
        uid = persona["uid"]
        upsert_user(uid, persona)
        if "jri" in persona:
            upsert_jri(uid, persona["jri"])
        print(f"  [OK] Seeded {persona['name']} ({persona['role']})")
    print("\nOffline demo seeding complete! Database ready for SIH presentation.")

if __name__ == "__main__":
    seed()
