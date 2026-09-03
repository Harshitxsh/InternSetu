from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.internship import SkillQuest, QuestProgress
from services.quest_generator import generate_quests_for_student
from dependencies import get_current_user
from datetime import datetime

router = APIRouter()


@router.get("/me", response_model=List[SkillQuest])
async def get_my_quests(current_user: dict = Depends(get_current_user)):
    """Get personalized Skill Quest cards for the authenticated student."""
    uid = current_user["uid"]
    return await _fetch_quests(uid)


@router.get("/{uid}", response_model=List[SkillQuest])
async def get_quests(uid: str, current_user: dict = Depends(get_current_user)):
    """Get personalized Skill Quest cards for a student (authenticated)."""
    return await _fetch_quests(uid)


async def _fetch_quests(uid: str) -> List[SkillQuest]:
    from config import get_firestore
    db = get_firestore()

    student_doc = db.collection("students").document(uid).get()
    current_jri = 65.0
    if student_doc.exists:
        current_jri = student_doc.to_dict().get("jri", {}).get("overall_jri", 65.0)

    user_doc = db.collection("users").document(uid).get()
    student_skills = ["Python", "biology"]
    primary_domain = "Ayurveda"
    if user_doc.exists:
        data = user_doc.to_dict()
        student_skills = data.get("skills", student_skills)
        primary_domain = data.get("primary_domain", primary_domain)

    quests = generate_quests_for_student(
        student_skills=student_skills,
        primary_domain=primary_domain,
        current_jri=current_jri,
        max_quests=6,
    )
    return quests


@router.post("/{uid}/complete/{quest_id}")
async def complete_quest(
    uid: str,
    quest_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Mark a quest as completed and boost the student's JRI."""
    from services.quest_generator import AYUSH_QUEST_LIBRARY
    from config import get_firestore

    quest = next((q for q in AYUSH_QUEST_LIBRARY if q["id"] == quest_id), None)
    if not quest:
        raise HTTPException(status_code=404, detail="Quest not found")

    boost = quest["jri_boost_percent"]
    xp = quest["xp_reward"]

    db = get_firestore()
    student_ref = db.collection("students").document(uid)
    doc = student_ref.get()
    jri_data = doc.to_dict().get("jri", {}) if doc.exists else {}

    old_jri = jri_data.get("overall_jri", 65.0)
    new_jri = min(100.0, old_jri + boost)
    jri_data["overall_jri"] = new_jri
    jri_data["tier"] = "ALLOCATION_MODE" if new_jri >= 85.0 else "QUEST_MODE"

    progress = QuestProgress(
        uid=uid,
        quest_id=quest_id,
        status="COMPLETED",
        xp_earned=xp,
        jri_gained=boost,
        completed_at=datetime.utcnow(),
    )

    try:
        student_ref.set({"jri": jri_data}, merge=True)
        db.collection("students").document(uid).collection("quests").document(
            quest_id
        ).set(progress.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database write failed: {e}")

    return {
        "status": "completed",
        "quest_id": quest_id,
        "xp_earned": xp,
        "jri_boost": boost,
        "old_jri": round(old_jri, 2),
        "new_jri": round(new_jri, 2),
        "tier_unlocked": new_jri >= 85.0,
    }


@router.get("/{uid}/progress")
async def get_quest_progress(
    uid: str,
    current_user: dict = Depends(get_current_user),
):
    """Get all completed quest progress for a student."""
    from config import get_firestore
    db = get_firestore()

    quests_ref = db.collection("students").document(uid).collection("quests")
    docs = quests_ref.stream()

    completed = [doc.to_dict() for doc in docs]
    total_xp = sum(p.get("xp_earned", 0) for p in completed)
    total_jri_gained = sum(p.get("jri_gained", 0.0) for p in completed)

    return {
        "uid": uid,
        "completed_quests": len(completed),
        "total_xp": total_xp,
        "total_jri_gained": round(total_jri_gained, 2),
        "progress": completed,
    }
