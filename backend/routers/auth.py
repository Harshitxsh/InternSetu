"""
Authentication Router — InternSetu v2.0
Hybrid OAuth-to-JWT flow:
  1. Frontend brokers Google/GitHub OAuth via Firebase popup.
  2. This endpoint verifies the Firebase token ONCE, then mints a custom JWT.
  3. All subsequent requests use the custom JWT (no Firebase on the wire).
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from core.security import create_access_token
from dependencies import get_current_user
from models.user import UserRole, RoleOnboardingRequest

router = APIRouter()


# ── Request / Response Schemas ────────────────────────────────────────────────

class LoginRequest(BaseModel):
    firebase_token: str
    github_token: Optional[str] = None


class OnboardRequest(BaseModel):
    role: UserRole
    profile_data: dict


# ── POST /login ──────────────────────────────────────────────────────────────

@router.post("/login")
async def login(request: LoginRequest):
    """
    Exchange a Firebase ID token for a custom InternSetu JWT.

    1. Verify the Firebase token using firebase-admin (one-time).
    2. Upsert the user in Firestore.
    3. Mint a custom JWT with uid, role, and github_token.
    """
    # Step 1: Verify Firebase token
    from config import get_auth
    try:
        firebase_auth = get_auth()
        decoded = firebase_auth.verify_id_token(request.firebase_token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Firebase token invalid: {e}")

    uid = decoded["uid"]

    # Step 2: Upsert user in Firestore
    from config import get_firestore
    db = get_firestore()
    doc = db.collection("users").document(uid).get()

    if doc.exists:
        user_data = doc.to_dict()
    else:
        user_data = {
            "uid": uid,
            "email": decoded.get("email", ""),
            "name": decoded.get("name", ""),
            "photoURL": decoded.get("picture", ""),
            "is_onboarded": False,
            "role": None,
            "created_at": datetime.utcnow().isoformat(),
        }
        db.collection("users").document(uid).set(user_data)

    # Step 3: Mint custom JWT
    jwt_payload = {
        "uid": uid,
        "role": user_data.get("role"),
    }
    if request.github_token:
        jwt_payload["github_token"] = request.github_token
    elif user_data.get("github_token"):
        # Re-embed any previously stored github token
        jwt_payload["github_token"] = user_data["github_token"]

    access_token = create_access_token(jwt_payload)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_data,
    }


# ── POST /onboard ────────────────────────────────────────────────────────────

@router.post("/onboard")
async def onboard_user(
    request: OnboardRequest,
    current_user: dict = Depends(get_current_user),
):
    """Complete first-time role selection and profile setup.
    Returns a NEW JWT with the updated role embedded."""
    uid = current_user["uid"]
    role = request.role
    profile_data = request.profile_data

    user_record = {
        "uid": uid,
        "role": role.value,
        "is_onboarded": True,
        "onboarded_at": datetime.utcnow().isoformat(),
        **profile_data,
    }

    try:
        from config import get_firestore
        db = get_firestore()
        db.collection("users").document(uid).set(user_record, merge=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database write failed: {e}")

    # Mint a fresh JWT with the now-assigned role
    new_token = create_access_token({
        "uid": uid,
        "role": role.value,
        "github_token": current_user.get("github_token"),
    })

    return {
        "status": "onboarded",
        "access_token": new_token,
        "token_type": "bearer",
        "user": user_record,
    }


# ── GET /me ───────────────────────────────────────────────────────────────────

@router.get("/me")
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    """Return the authenticated user's profile from Firestore."""
    uid = current_user["uid"]
    try:
        from config import get_firestore
        db = get_firestore()
        doc = db.collection("users").document(uid).get()
        if doc.exists:
            return doc.to_dict()
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Firestore unavailable: {e}")

    raise HTTPException(status_code=404, detail="User profile not found")


# ── GET /profile/{uid} ───────────────────────────────────────────────────────

@router.get("/profile/{uid}")
async def get_profile(uid: str, current_user: dict = Depends(get_current_user)):
    """Get any user profile by UID (requires authentication)."""
    try:
        from config import get_firestore
        db = get_firestore()
        doc = db.collection("users").document(uid).get()
        if doc.exists:
            return doc.to_dict()
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Firestore unavailable: {e}")

    raise HTTPException(status_code=404, detail="User profile not found")


# ── PUT /profile ──────────────────────────────────────────────────────────────

@router.put("/profile")
async def update_profile(
    profile_data: dict,
    current_user: dict = Depends(get_current_user),
):
    """Update the authenticated user's profile fields."""
    uid = current_user["uid"]
    try:
        from config import get_firestore
        db = get_firestore()
        doc_ref = db.collection("users").document(uid)

        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        update_data = {**profile_data, "updated_at": datetime.utcnow().isoformat()}
        doc_ref.set(update_data, merge=True)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Firestore error: {e}")

    return {"status": "updated", "uid": uid}
