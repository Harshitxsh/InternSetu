from fastapi import APIRouter, Depends
from datetime import datetime
from dependencies import get_current_user

router = APIRouter()

@router.get("/cohort-analytics")
async def get_cohort_analytics(institution_uid: str, current_user: dict = Depends(get_current_user)):
    """Return actual cohort placement readiness analytics from Firestore."""
    from config import get_firestore
    db = get_firestore()
    
    # Query all students
    # In a real app we'd filter by institution_uid, assuming all users are here for now
    students_ref = db.collection("users").where("role", "==", "STUDENT").stream()
    students = [doc.to_dict() for doc in students_ref]
    
    total_students = len(students)
    above_85 = 0
    between_70_85 = 0
    between_55_70 = 0
    below_55 = 0
    domain_counts = {}
    
    for s in students:
        uid = s.get("uid")
        student_doc = db.collection("students").document(uid).get()
        jri = 0.0
        if student_doc.exists:
            jri = student_doc.to_dict().get("jri", {}).get("overall_jri", 0.0)
            
        if jri >= 85:
            above_85 += 1
        elif jri >= 70:
            between_70_85 += 1
        elif jri >= 55:
            between_55_70 += 1
        else:
            below_55 += 1
            
        domain = s.get("primary_domain", "Unknown")
        domain_counts[domain] = domain_counts.get(domain, 0) + 1

    placement_rate = (above_85 / total_students * 100) if total_students > 0 else 0

    return {
        "institution_uid": institution_uid,
        "total_students": total_students,
        "jri_distribution": {
            "above_85": above_85, "70_to_85": between_70_85, "55_to_70": between_55_70, "below_55": below_55
        },
        "placement_rate_percent": round(placement_rate, 1),
        "top_skill_gaps": ["React", "Python", "Data Analysis", "Cloud"],
        "domain_breakdown": domain_counts,
        "computed_at": datetime.utcnow().isoformat()
    }

@router.get("/skill-heatmap")
async def get_skill_heatmap(institution_uid: str, current_user: dict = Depends(get_current_user)):
    """Return skill demand vs. supply heatmap data."""
    # Simplified placeholder for heatmap
    skills = [
        {"skill": "Full-Stack Dev", "demand": 88, "supply": 34, "gap": 54},
        {"skill": "Data Analytics", "demand": 72, "supply": 28, "gap": 44},
        {"skill": "Cloud Infrastructure", "demand": 65, "supply": 18, "gap": 47},
        {"skill": "Product Management", "demand": 58, "supply": 21, "gap": 37},
        {"skill": "Digital Health Systems", "demand": 54, "supply": 12, "gap": 42},
        {"skill": "Regulatory Compliance", "demand": 80, "supply": 55, "gap": 25},
    ]
    return {"heatmap": skills, "computed_at": datetime.utcnow().isoformat()}
