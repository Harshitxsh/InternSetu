from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from models.internship import AllocationResult, Internship, InternshipPostRequest
from services.ilp_solver import run_allocation, get_all_internships
from dependencies import get_current_user
from datetime import datetime
import uuid

router = APIRouter()


@router.get("/all", response_model=List[Internship])
async def list_all_internships(current_user: dict = Depends(get_current_user)):
    """List all available PM Internship Scheme openings."""
    try:
        from config import get_firestore
        db = get_firestore()
        docs = db.collection("internships").stream()
        internships = [Internship(**doc.to_dict()) for doc in docs]
        if not internships:
            return get_all_internships()
        return internships
    except Exception:
        return get_all_internships()


@router.get("/matches/me", response_model=AllocationResult)
async def get_my_matches(
    use_ilp: bool = True,
    current_user: dict = Depends(get_current_user),
):
    """Run ILP allocation for the authenticated student."""
    uid = current_user["uid"]
    return await _run_matches(uid, use_ilp)


@router.get("/matches/{uid}", response_model=AllocationResult)
async def get_matches(
    uid: str,
    use_ilp: bool = True,
    current_user: dict = Depends(get_current_user),
):
    """Run ILP-based allocation to rank best-matching internships for a student."""
    return await _run_matches(uid, use_ilp)


async def _run_matches(uid: str, use_ilp: bool) -> AllocationResult:
    from config import get_firestore
    db = get_firestore()

    student_doc = db.collection("students").document(uid).get()
    jri = 0.0
    if student_doc.exists:
        jri = student_doc.to_dict().get("jri", {}).get("overall_jri", 0.0)

    user_doc = db.collection("users").document(uid).get()
    skills = []
    bio = ""
    if user_doc.exists:
        data = user_doc.to_dict()
        skills = data.get("skills", [])
        bio = f"{data.get('degree', '')} {data.get('branch', '')} {data.get('primary_domain', '')}"

    result = run_allocation(
        uid=uid,
        jri=jri,
        student_skills=skills,
        student_bio=bio,
        use_ilp=use_ilp,
    )
    return result


@router.post("/post")
async def post_internship(
    internship: InternshipPostRequest,
    current_user: dict = Depends(get_current_user),
):
    """Company users post new PM Scheme internship openings."""
    new_id = f"INT-AYUSH-{uuid.uuid4().hex[:6].upper()}"
    internship_obj = Internship(
        id=new_id,
        **internship.model_dump(),
        posted_at=datetime.utcnow(),
        posted_by_uid=current_user["uid"],
    )

    try:
        from config import get_firestore
        db = get_firestore()
        db.collection("internships").document(new_id).set(
            internship_obj.model_dump(mode="json")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database write failed: {e}")

    return {"status": "posted", "internship_id": new_id}
