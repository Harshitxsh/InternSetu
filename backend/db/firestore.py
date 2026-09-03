"""
Firestore database helper module for InternSetu v2.0.
Provides unified CRUD helper methods for user profiles, student JRI scores, quests, and internships.
"""
from typing import Optional, Dict, Any, List
from config import get_firestore, OFFLINE_MODE
from datetime import datetime

def get_collection(col_name: str):
    db = get_firestore()
    return db.collection(col_name)

def save_user_profile(uid: str, data: Dict[str, Any]) -> bool:
    try:
        db = get_firestore()
        db.collection("users").document(uid).set(data, merge=True)
        return True
    except Exception as e:
        print(f"[Firestore] Error saving user profile {uid}: {e}")
        return False

def get_user_profile(uid: str) -> Optional[Dict[str, Any]]:
    try:
        db = get_firestore()
        doc = db.collection("users").document(uid).get()
        if doc.exists:
            return doc.to_dict()
        return None
    except Exception as e:
        print(f"[Firestore] Error getting user profile {uid}: {e}")
        return None

def save_student_jri(uid: str, jri_data: Dict[str, Any]) -> bool:
    try:
        db = get_firestore()
        db.collection("students").document(uid).set({"jri": jri_data}, merge=True)
        return True
    except Exception as e:
        print(f"[Firestore] Error saving JRI for {uid}: {e}")
        return False

def save_student_quest_completion(uid: str, quest_id: str, quest_data: Dict[str, Any]) -> bool:
    try:
        db = get_firestore()
        db.collection("students").document(uid).collection("completed_quests").document(quest_id).set(quest_data)
        return True
    except Exception as e:
        print(f"[Firestore] Error recording quest completion {quest_id} for {uid}: {e}")
        return False
