from fastapi import APIRouter, HTTPException, Depends
from models.scoring import JRIBreakdown, JRICalculateRequest
from dependencies import get_current_user

router = APIRouter()


@router.post("/calculate", response_model=JRIBreakdown)
async def calculate_jri(
    request: JRICalculateRequest,
    current_user: dict = Depends(get_current_user),
):
    """
    Compute the 100-point Job Readiness Index (JRI).
    JRI = (0.35 x S_assess) + (0.30 x S_proj) + (0.20 x S_resume) + (0.15 x S_acad)
    The uid is taken from the JWT, not the request body.
    """
    uid = current_user["uid"]

    from config import get_firestore
    db = get_firestore()
    doc_ref = db.collection("students").document(uid)
    doc = doc_ref.get()

    cached = {}
    if doc.exists:
        cached = doc.to_dict().get("jri", {})

    s_assess = request.s_assess if request.s_assess is not None else cached.get("s_assess", 0.0)
    s_proj = request.s_proj if request.s_proj is not None else cached.get("s_proj", 0.0)
    s_resume = request.s_resume if request.s_resume is not None else cached.get("s_resume", 0.0)
    s_acad = request.s_acad if request.s_acad is not None else cached.get("s_acad", 0.0)

    breakdown = JRIBreakdown.calculate(uid, s_assess, s_proj, s_resume, s_acad)

    # Add contextual strength/gap analysis
    scores = {
        "Assessment": s_assess,
        "GitHub Projects": s_proj,
        "Resume": s_resume,
        "Academic": s_acad,
    }
    breakdown.top_strengths = [
        k for k, v in sorted(scores.items(), key=lambda x: x[1], reverse=True)[:2]
    ]
    breakdown.skill_gaps = [
        k for k, v in sorted(scores.items(), key=lambda x: x[1])[:2]
    ]
    breakdown.percentile = min(99.0, round(breakdown.overall_jri * 0.93, 1))

    try:
        doc_ref.set({"jri": breakdown.model_dump(mode="json")}, merge=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database write failed: {e}")

    return breakdown


@router.get("/me", response_model=JRIBreakdown)
async def get_my_jri(current_user: dict = Depends(get_current_user)):
    """Retrieve the latest computed JRI for the authenticated student."""
    uid = current_user["uid"]
    try:
        from config import get_firestore
        db = get_firestore()
        doc = db.collection("students").document(uid).get()
        if doc.exists:
            data = doc.to_dict().get("jri")
            if data:
                return JRIBreakdown(**data)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Firestore error: {e}")

    raise HTTPException(status_code=404, detail="JRI not found for user")


@router.get("/{uid}", response_model=JRIBreakdown)
async def get_jri(uid: str, current_user: dict = Depends(get_current_user)):
    """Retrieve the latest computed JRI for a student (authenticated)."""
    try:
        from config import get_firestore
        db = get_firestore()
        doc = db.collection("students").document(uid).get()
        if doc.exists:
            data = doc.to_dict().get("jri")
            if data:
                return JRIBreakdown(**data)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Firestore error: {e}")

    raise HTTPException(status_code=404, detail="JRI not found for user")
