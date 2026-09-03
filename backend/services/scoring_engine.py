"""
Scoring Engine — Sentence-BERT based JRI component calculators.
Falls back to TF-IDF cosine similarity if sentence-transformers unavailable (offline mode).
"""
import os
import math
from typing import List, Optional, Dict, Tuple
from pathlib import Path
import numpy as np

ML_MODEL_CACHE_DIR = os.getenv("ML_MODEL_CACHE_DIR", ".model_cache")

# ── Lazy-loaded sentence-transformer model ─────────────────────────────────────
_model = None

def _get_model():
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
            cache_path = Path(ML_MODEL_CACHE_DIR)
            _model = SentenceTransformer("all-MiniLM-L6-v2", cache_folder=str(cache_path))
            print("[ScoringEngine] Loaded all-MiniLM-L6-v2 from cache.")
        except Exception as e:
            print(f"[ScoringEngine] sentence-transformers unavailable ({e}). Using fallback scorer.")
            _model = None
    return _model


def _cosine_sim(a: np.ndarray, b: np.ndarray) -> float:
    norm_a, norm_b = np.linalg.norm(a), np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(np.dot(a, b) / (norm_a * norm_b))


def _tfidf_cosine_fallback(text_a: str, text_b: str) -> float:
    """Simple word-overlap cosine similarity for offline fallback."""
    tokens_a = set(text_a.lower().split())
    tokens_b = set(text_b.lower().split())
    if not tokens_a or not tokens_b:
        return 0.0
    overlap = tokens_a & tokens_b
    return len(overlap) / (math.sqrt(len(tokens_a)) * math.sqrt(len(tokens_b)))


def compute_semantic_similarity(text_a: str, text_b: str) -> float:
    """Returns cosine similarity [0,1] between two text passages."""
    model = _get_model()
    if model is not None:
        emb_a, emb_b = model.encode([text_a, text_b])
        return max(0.0, _cosine_sim(emb_a, emb_b))
    return _tfidf_cosine_fallback(text_a, text_b)


# ── AYUSH role requirement templates for matching ────────────────────────────
AYUSH_ROLE_PROFILES = {
    "Herbal Drug Research Intern": (
        "phytochemistry HPLC GC-MS mass spectrometry ayurvedic formulation standardization "
        "extraction pharmacognosy ethnobotany medicinal plants AYUSH drug development quality control"
    ),
    "Pharmacovigilance Analyst": (
        "adverse drug reaction reporting signal detection pharmacovigilance AYUSH drug safety "
        "regulatory compliance CDSCO WHO UMC vigiBase NLP clinical data analysis"
    ),
    "Digital Health & Telemedicine Engineer": (
        "FHIR HL7 EHR telemedicine AYUSH digital health API react python fastapi healthcare "
        "data interoperability mobile health mHealth patient portal cloud AWS"
    ),
    "Bioinformatics Research Associate": (
        "genomics bioinformatics bioconductor R python scikit-learn machine learning "
        "molecular docking QSAR ADMET rdkit drug discovery cheminformatics proteomics"
    ),
    "Yoga & Wellness Technology Specialist": (
        "computer vision pose estimation mediapipe tensorflow yoga naturopathy wellness app "
        "wearable sensors IoT health monitoring mobile python real-time processing"
    ),
    "Quality Assurance & Regulatory Affairs": (
        "GMP GLP ISO regulatory affairs AYUSH drug licensing CDSCO pharmacopeia "
        "quality control SOP documentation compliance traditional medicine certification"
    ),
}


def compute_s_resume(resume_text: str, job_description: str) -> Tuple[float, float, List[str]]:
    """
    Compute S_resume (0-100): ATS semantic match + anti-AI-fluff credibility.
    Returns: (ats_score, credibility_index, matched_keywords)
    """
    # ATS match via semantic similarity
    ats_score = compute_semantic_similarity(resume_text, job_description) * 100

    # Anti-fluff credibility: penalize generic AI-generated phrases
    fluff_phrases = [
        "results-driven", "synergy", "leveraged", "spearheaded", "proactive team player",
        "passionate about", "dynamic environment", "go-getter", "thought leader",
        "strategic mindset", "world-class", "cutting-edge solutions", "innovative approach"
    ]
    fluff_hits = sum(1 for phrase in fluff_phrases if phrase.lower() in resume_text.lower())
    credibility_index = max(0.0, 100.0 - (fluff_hits * 8))

    # Extract matched AYUSH keywords
    ayush_keywords = [
        "ayurveda", "pharmacovigilance", "bioinformatics", "herbal", "clinical",
        "python", "machine learning", "FHIR", "drug", "genomics", "yoga", "HPLC",
        "regulatory", "telemedicine", "molecular docking", "phytochemistry", "NLP"
    ]
    matched = [kw for kw in ayush_keywords if kw.lower() in resume_text.lower()]

    # Composite S_resume
    s_resume = (ats_score * 0.70) + (credibility_index * 0.30)
    return round(s_resume, 2), round(credibility_index, 2), matched


def compute_s_acad(cgpa: float, degree: str, branch: str, graduation_year: int,
                   relevant_coursework: Optional[List[str]] = None) -> float:
    """
    Compute S_acad (0-100):
      - CGPA normalized to 10.0 scale    (50%)
      - Domain relevance of degree/branch (30%)
      - Graduation recency bonus          (20%)
    """
    relevant_coursework = relevant_coursework or []

    # CGPA score (50%)
    cgpa_score = min(cgpa / 10.0, 1.0) * 50

    # Branch/degree relevance (30%)
    ayush_branches = [
        "ayurveda", "unani", "siddha", "homeopathy", "yoga", "bioinformatics",
        "biotechnology", "pharmacology", "pharmacy", "biochemistry", "microbiology",
        "biomedical", "life sciences", "botany", "herbal", "naturopathy",
        "public health", "health informatics", "medical", "nursing", "physiotherapy"
    ]
    branch_lower = branch.lower()
    degree_lower = degree.lower()
    branch_rel = any(kw in branch_lower or kw in degree_lower for kw in ayush_branches)
    coursework_rel = sum(1 for c in relevant_coursework
                        if any(kw in c.lower() for kw in ayush_branches))
    branch_score = (30 if branch_rel else 10) + min(coursework_rel * 3, 10)
    branch_score = min(branch_score, 30)

    # Recency (20%)
    current_year = 2026
    years_old = current_year - graduation_year
    if years_old <= 0:
        recency_score = 20  # fresh/current student
    elif years_old == 1:
        recency_score = 18
    elif years_old == 2:
        recency_score = 14
    else:
        recency_score = max(5, 20 - years_old * 3)

    s_acad = cgpa_score + branch_score + recency_score
    return round(min(100.0, s_acad), 2)


AYUSH_ASSESSMENT_QUESTIONS: Dict[str, List[Dict]] = {
    "Ayurveda": [
        {"id": "q1", "text": "Explain the concept of Tridosha in Ayurvedic pharmacology.",
         "max_score": 10, "domain": "Ayurveda"},
        {"id": "q2", "text": "What is the process of Shodhana (purification) in Bhasma preparation?",
         "max_score": 10, "domain": "Ayurveda"},
        {"id": "q3", "text": "Describe HPLC fingerprinting techniques for Ayurvedic drug standardization.",
         "max_score": 10, "domain": "Herbal Pharmaceuticals"},
    ],
    "Digital Healthcare": [
        {"id": "q1", "text": "Explain HL7 FHIR resources and their role in healthcare interoperability.",
         "max_score": 10, "domain": "Digital Health"},
        {"id": "q2", "text": "Design an API endpoint for adverse drug reaction reporting.",
         "max_score": 10, "domain": "Pharmacovigilance"},
        {"id": "q3", "text": "Describe ML techniques for predicting drug-herb interactions.",
         "max_score": 10, "domain": "Bioinformatics"},
    ],
}


def compute_s_assess(responses: Dict[str, int], domain: str = "Ayurveda") -> float:
    """
    Compute S_assess (0-100) from assessment question responses.
    responses: dict of {question_id: score_given}
    """
    questions = AYUSH_ASSESSMENT_QUESTIONS.get(domain, AYUSH_ASSESSMENT_QUESTIONS["Ayurveda"])
    total_possible = sum(q["max_score"] for q in questions)
    total_scored = sum(responses.get(q["id"], 0) for q in questions)
    if total_possible == 0:
        return 50.0  # neutral default
    raw = (total_scored / total_possible) * 100
    return round(min(100.0, raw), 2)


def compute_quest_jri_boost(completed_quests: List[Dict]) -> float:
    """Sum up JRI boosts from completed skill quests."""
    return sum(q.get("jri_boost_percent", 0.0) for q in completed_quests)


def identify_skill_gaps(
    student_skills: List[str],
    target_role: str,
    top_n: int = 5
) -> List[Tuple[str, float]]:
    """
    Identify skill gaps by computing Euclidean distance between
    student skill vector and target role requirement vector.
    Returns list of (missing_skill, gap_magnitude) sorted by gap size.
    """
    role_profile = AYUSH_ROLE_PROFILES.get(target_role, "")
    role_tokens = set(role_profile.lower().split())
    student_tokens = set(s.lower() for s in student_skills)
    missing = role_tokens - student_tokens
    # Score each missing skill by how central it is to the role profile
    scored_gaps = []
    for skill in missing:
        centrality = role_profile.lower().count(skill) / max(len(role_tokens), 1)
        scored_gaps.append((skill, centrality))
    scored_gaps.sort(key=lambda x: x[1], reverse=True)
    return scored_gaps[:top_n]
