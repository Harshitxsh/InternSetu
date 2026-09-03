# InternSetu v2.0 — Ministry of AYUSH AI Skill-Bridge Platform
### Smart India Hackathon (SIH) 2026 | Team CodeNOVA
**Target Evaluation:** Galgotias University (September 7 & 9, 2026)  
**Official Authority:** Ministry of AYUSH, Government of India  
**Scheme:** Prime Minister's Internship Scheme (PMIS) in Top Companies & Research Institutions  

---

## 🏛️ Executive Summary

**InternSetu v2.0** is an enterprise full-stack AI platform built for the **Ministry of AYUSH, Government of India**. It bridges the critical academia-industry competency gap across traditional medicine systems (**Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homeopathy**), herbal biotechnology, pharmacovigilance, and digital healthcare.

The platform eliminates black-box placement subjectivity through an auditable, **100-Point Job Readiness Index (JRI)** and an autonomous **Integer Linear Programming (ILP) Allocation Engine** powered by Google OR-Tools.

---

## 🌟 Core System Highlights

### 1. 🦁 Ministry of AYUSH Brand & Design System
- Rooted in classical heritage & modern government digital standards:
  - **Herbal Forest Green (`#0F2E22`)**: Authoritative, grounded government aesthetic.
  - **Botanical Pine (`#184E38`)**: Primary interactive surfaces and navigation.
  - **Warm Brass / Ochre (`#C59B27`)**: Accentuation, CTAs, and allocation credentials.
  - **Parchment White (`#F4F1EA`)**: High-contrast, reading-optimized background.
- **Strictly No Gimmicks**: Avoids generic neon AI sparkles, glassmorphism, or non-functional 3D assets.

### 2. 🔐 Multi-Stakeholder Role-Based Access Control (RBAC)
Firebase Authentication with client OAuth token capture supporting 4 stakeholder personas:
- **Student / Intern Aspirant**: Diagnostics, GitHub analysis, gamified Skill Quests, and PM Scheme allocation.
- **Faculty / Academic Mentor**: Faculty Development Programs (FDPs) and research mentorship queues.
- **Industry / Enterprise Partner**: Posting scheme openings, sponsoring skill modules, and AI candidate shortlisting.
- **Institution / University CRM**: Cohort readiness heatmaps, skill deficit metrics, and curriculum audits.

### 3. 📊 100-Point Job Readiness Index (JRI)
The composite readiness index mathematically balances four orthogonal pillars:
```math
JRI = (0.35 \times S_{assess}) + (0.30 \times S_{proj}) + (0.20 \times S_{resume}) + (0.15 \times S_{acad})
```
- **$S_{assess}$ (35%)**: AYUSH-tailored clinical, standardization, and pharmacology diagnostics.
- **$S_{proj}$ (30%)**: Automated GitHub repository parsing (topics, CI/CD, Dockerfile, commit velocity).
- **$S_{resume}$ (20%)**: Sentence-BERT ATS semantic alignment and anti-AI-fluff credibility scoring.
- **$S_{acad}$ (15%)**: Normalized CGPA, degree relevance, and recency factor.

### 4. 🔀 Dynamic Conditional Routing
- **Tier 1 (JRI < 85%) — Skill Quest Mode**:
  Euclidean distance gap analysis directs students to industry-sponsored micro-credential quests (e.g. *HPLC Standardization*, *Plant Genomics in R*, *FHIR Telemedicine APIs*). Completing quests directly awards JRI boosts.
- **Tier 2 (JRI ≥ 85%) — Allocation Pool Mode**:
  Unlocks autonomous placement via **Google OR-Tools Integer Linear Programming (ILP)**, resolving multi-constraint candidate-to-seat optimization while preserving domain diversity and meritocracy.

### 5. 📴 SIH Venue Offline-Resilient Architecture
Designed specifically for local/hybrid presentations at Galgotias University:
- **Local SQLite Fallback**: Automatic failover if internet or Firestore is unavailable.
- **Pre-Cached Sentence-BERT**: Model weights cached locally (`.model_cache/`).
- **Simulated Demonstration Controls**: Quick toggle in the navigation bar allows judges to inspect both Quest Mode and Allocation Mode in seconds.

---

## 📁 Repository Structure

```
InternSetu/
├── backend/                             # FastAPI Python 3.12 Backend
│   ├── config.py                        # Firebase Admin & offline config
│   ├── main.py                          # Lifespan manager, CORS & routes
│   ├── requirements.txt                 # Backend dependencies
│   ├── models/                          # Pydantic v2 schemas
│   │   ├── user.py                      # Profiles & RBAC
│   │   ├── scoring.py                   # JRI breakdown & GitHub models
│   │   └── internship.py                # Quests & allocation schemas
│   ├── routers/                         # FastAPI route endpoints
│   │   ├── auth.py                      # Firebase token verification & onboarding
│   │   ├── github.py                    # GitHub repo fetch & S_proj scoring
│   │   ├── jri.py                       # JRI calculation engine
│   │   ├── quests.py                    # Skill quest generator & completion
│   │   ├── internships.py               # Allocation pool & postings
│   │   ├── faculty.py                   # FDP & mentorship queues
│   │   └── institution.py               # Cohort analytics & heatmap
│   ├── services/                        # Core AI/ML & algorithmic services
│   │   ├── scoring_engine.py            # Sentence-BERT cosine & JRI formula
│   │   ├── github_ingestion.py          # GitHub REST API fetcher & S_proj
│   │   ├── ilp_solver.py                # Google OR-Tools CP-SAT optimizer
│   │   ├── quest_generator.py           # Gap-to-quest mapping service
│   │   └── resume_parser.py             # pdfplumber ATS text extractor
│   └── db/
│       ├── firestore.py                 # Cloud Firestore CRUD
│       └── sqlite_fallback.py           # Local SQLite offline database
│
├── src/                                 # React 18 + TypeScript Frontend
│   ├── auth/                            # Firebase Client SDK & AuthProvider
│   ├── components/
│   │   ├── auth/                        # LoginCard & RoleOnboarding
│   │   ├── layout/                      # TopNav, Sidebar, Footer
│   │   ├── student/                     # JRIGauge, SkillRadar, GitHubSyncCard,
│   │   │                                # QuestDashboard, AllocationPool, ProgressTree
│   │   ├── faculty/                     # FacultyDashboard
│   │   ├── industry/                    # IndustryDashboard
│   │   ├── institution/                 # InstitutionDashboard
│   │   └── shared/                      # ExplainabilityModal, ApplicationPassModal
│   ├── store/                           # Zustand reactive state store
│   ├── types/                           # Complete TypeScript interfaces
│   └── App.tsx                          # Root container & SIH role switcher
│
├── public/
│   └── ayush-logo.jpg                   # Official Ministry of AYUSH Emblem
├── scripts/
│   ├── preload_ml_models.py             # Pre-downloads sentence-transformers
│   └── seed_demo_data.py                # Populates offline personas
└── legacy/                              # Archived MCA v1 demo files
```

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js**: v18+ (tested on Node v24.15)
- **Python**: 3.10+ (tested on Python 3.12.10)

---

### Step 1: Start the React Frontend
```powershell
# In project root: c:\Users\harsh\Documents\antigravity\InternSetu
npm.cmd run dev
```
The client will launch at `http://localhost:3000/`.

---

### Step 2: Start the FastAPI Backend
```powershell
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```
Interactive Swagger API documentation will be live at `http://localhost:8000/docs`.

---

### Step 3: Seed Offline Data (Optional for SIH Presentation)
```powershell
python scripts/seed_demo_data.py
```

---

## 🎯 10-Minute SIH Judging Walkthrough

1. **Brand & Authority Showcase**:
   Observe the official **Ministry of AYUSH** emblem, lion capital crest, and government palette.
2. **Student Authentication & RBAC**:
   Sign in with Google/GitHub. Notice the OAuth token capture for programmatic repository ingestion.
3. **GitHub Project Scoring ($S_{proj}$)**:
   Click **Sync GitHub Profile** to trigger repo analysis, commit velocity, and language breakdown.
4. **JRI Diagnostics & Radar Map**:
   Review the 100-Point JRI gauge and competency vector comparing candidate skills against industry standards.
5. **Gamified Skill Quests (< 85 JRI)**:
   Explore the personalized quest roadmap. Click **Complete Quest & Claim JRI** to watch the animated radial gauge climb with confetti!
6. **Allocation Mode & Google OR-Tools (≥ 85 JRI)**:
   Unlock the PM Scheme Allocation Pool. View company matches (Dabur, NHA, Sun Pharma) optimized by linear programming.
7. **Provisional Allocation Pass**:
   Click **Generate Provisional Allocation Pass** to view the cryptographically verifiable allocation document with barcode watermark.
8. **Multi-Role Switching**:
   Use the top golden evaluation strip to seamlessly transition to **Faculty**, **Industry**, and **Institution** portals.

---

## 👥 Team CodeNOVA | SIH 2026
- **Smart India Hackathon 2026**
- **Evaluation Venue:** Galgotias University, Greater Noida
- **Dates:** September 7 & 9, 2026
