"""
FastAPI Main Application — InternSetu v2.0 (Ministry of AYUSH)
Custom JWT Authentication Architecture
"""
import sys
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown lifecycle handler."""
    print("=" * 60)
    print("  InternSetu v2.0 — Ministry of AYUSH AI Platform")
    print("  Auth: Custom JWT (Hybrid OAuth-to-JWT)")
    print("=" * 60)

    # Initialize Firebase Admin SDK (used ONLY for initial token verification)
    try:
        from config import get_firebase_app
        get_firebase_app()
        print("[Startup] [OK] Firebase Admin SDK initialized (login verification only)")
    except Exception as e:
        print(f"[Startup] [FAIL] Firebase init failed: {e}")

    # Pre-warm ML model (non-blocking attempt)
    try:
        from services.scoring_engine import _get_model
        _get_model()
        print("[Startup] [OK] Sentence-BERT model ready")
    except Exception as e:
        print(f"[Startup] [WARN] ML model warm-up skipped: {e}")
        print("[Startup] -> Will use TF-IDF fallback for scoring")

    print("[Startup] [OK] InternSetu API ready on http://localhost:8000")
    print("[Startup] [OK] Interactive docs at http://localhost:8000/docs")
    print("-" * 60)

    yield  # App runs here

    print("[Shutdown] InternSetu API gracefully stopped.")


# ── Application Instance ──────────────────────────────────────────────────────
app = FastAPI(
    title="InternSetu v2.0 — Ministry of AYUSH AI Skill-Bridge API",
    description=(
        "Production API for AYUSH healthcare internship allocation, "
        "GitHub project scoring, JRI calculation, and gamified skill quest management. "
        "Authentication: Custom JWT (Hybrid OAuth-to-JWT via Firebase)."
    ),
    version="2.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS Middleware ───────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers (all under /api namespace) ────────────────────────────────────────
from routers import auth, github, jri, quests, internships, institution

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication & JWT"])
app.include_router(github.router, prefix="/api/github", tags=["GitHub Ingestion & S_proj Scoring"])
app.include_router(jri.router, prefix="/api/jri", tags=["100-Point JRI Calculator"])
app.include_router(quests.router, prefix="/api/quests", tags=["Gamified Skill Quests"])
app.include_router(internships.router, prefix="/api/internships", tags=["Internship Allocation Pool"])
app.include_router(institution.router, prefix="/api/institution", tags=["Institution Analytics CRM"])


@app.get("/", tags=["Health"])
def root():
    return {
        "service": "InternSetu v2.0",
        "authority": "Ministry of AYUSH, Government of India",
        "auth": "Custom JWT (Hybrid OAuth-to-JWT)",
        "status": "operational",
        "docs": "/docs",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "version": "2.0.0"}
