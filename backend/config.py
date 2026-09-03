import os
import firebase_admin
from firebase_admin import credentials, firestore, auth
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

FIREBASE_KEY_PATH = os.getenv("FIREBASE_KEY_PATH", "firebase-key.json")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
ML_MODEL_CACHE_DIR = os.getenv("ML_MODEL_CACHE_DIR", ".model_cache")

_firebase_app = None
_db = None

def get_firebase_app():
    global _firebase_app
    if _firebase_app is None:
        key_path = Path(FIREBASE_KEY_PATH)
        if not key_path.exists():
            raise FileNotFoundError(f"Firebase key not found at {key_path.absolute()}")
        cred = credentials.Certificate(str(key_path))
        _firebase_app = firebase_admin.initialize_app(cred, {'projectId': 'internsetu-999'})
    return _firebase_app

def get_firestore():
    global _db
    if _db is None:
        get_firebase_app()
        _db = firestore.client()
    return _db

def get_auth():
    get_firebase_app()
    return auth
