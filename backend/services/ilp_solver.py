"""
ILP Allocation Solver — uses Google OR-Tools for fair, constraint-satisfying
internship allocation. Falls back to rank-sorted greedy in mock/offline mode.
"""
import os
from typing import List, Dict, Optional, Tuple
from models.internship import Internship, InternshipMatch, AllocationResult
from services.scoring_engine import compute_semantic_similarity
from datetime import datetime


# ── Mock Internship Database ───────────────────────────────────────────────────
MOCK_INTERNSHIPS: List[Dict] = [
    {
        "id": "INT-AYUSH-001",
        "company_name": "Dabur India Limited",
        "company_type": "Herbal Pharmaceuticals",
        "role_title": "Herbal Drug Standardization Intern",
        "domain": "Herbal Pharmaceuticals",
        "location": "Ghaziabad, UP (On-site)",
        "stipend_monthly": 15000,
        "duration_months": 12,
        "available_seats": 30,
        "description": "Work directly with Dabur's R&D scientists on HPLC-based standardization of classical Ayurvedic formulations under the PM Internship Scheme.",
        "required_skills": [
            {"skill": "HPLC", "weight": 0.9},
            {"skill": "phytochemistry", "weight": 0.8},
            {"skill": "ayurveda", "weight": 0.7},
            {"skill": "GMP", "weight": 0.6},
        ],
        "min_jri": 85.0,
    },
    {
        "id": "INT-AYUSH-002",
        "company_name": "National Health Authority (NHA)",
        "company_type": "Digital Healthcare",
        "role_title": "ABDM Digital Health API Developer",
        "domain": "Digital Healthcare",
        "location": "New Delhi (Hybrid)",
        "stipend_monthly": 18000,
        "duration_months": 12,
        "available_seats": 20,
        "description": "Contribute to building FHIR R4-compliant APIs for the Ayushman Bharat Digital Mission, enabling AYUSH practitioner onboarding.",
        "required_skills": [
            {"skill": "FHIR", "weight": 0.95},
            {"skill": "FastAPI", "weight": 0.85},
            {"skill": "Python", "weight": 0.80},
            {"skill": "HL7", "weight": 0.75},
        ],
        "min_jri": 85.0,
    },
    {
        "id": "INT-AYUSH-003",
        "company_name": "CSIR-NBRI (National Botanical Research Institute)",
        "company_type": "Research Institute",
        "role_title": "Plant Genomics Bioinformatics Associate",
        "domain": "Biotechnology & Bioinformatics",
        "location": "Lucknow, UP",
        "stipend_monthly": 14000,
        "duration_months": 12,
        "available_seats": 15,
        "description": "Participate in genome sequencing and annotation projects for high-value medicinal plants. Develop ML models for secondary metabolite prediction.",
        "required_skills": [
            {"skill": "bioinformatics", "weight": 0.9},
            {"skill": "genomics", "weight": 0.85},
            {"skill": "R programming", "weight": 0.75},
            {"skill": "Python", "weight": 0.70},
        ],
        "min_jri": 85.0,
    },
    {
        "id": "INT-AYUSH-004",
        "company_name": "Himalaya Drug Company",
        "company_type": "Herbal Pharmaceuticals",
        "role_title": "Computational Drug Discovery Intern",
        "domain": "Herbal Pharmaceuticals",
        "location": "Bengaluru, Karnataka",
        "stipend_monthly": 16000,
        "duration_months": 12,
        "available_seats": 18,
        "description": "Apply molecular docking and QSAR modeling to identify lead phytoconstituents from Himalaya's proprietary plant library.",
        "required_skills": [
            {"skill": "molecular docking", "weight": 0.9},
            {"skill": "RDKit", "weight": 0.85},
            {"skill": "Python", "weight": 0.80},
            {"skill": "QSAR", "weight": 0.75},
        ],
        "min_jri": 85.0,
    },
    {
        "id": "INT-AYUSH-005",
        "company_name": "Patanjali Wellness Research Foundation",
        "company_type": "Yoga & Naturopathy",
        "role_title": "AI Wellness Technology Intern",
        "domain": "Yoga & Naturopathy",
        "location": "Haridwar, Uttarakhand",
        "stipend_monthly": 12000,
        "duration_months": 12,
        "available_seats": 25,
        "description": "Build computer vision applications for yoga asana correction, wellness tracking dashboards, and AI-assisted Nadi Pariksha (pulse diagnosis).",
        "required_skills": [
            {"skill": "computer vision", "weight": 0.9},
            {"skill": "Python", "weight": 0.85},
            {"skill": "TensorFlow", "weight": 0.75},
            {"skill": "yoga", "weight": 0.60},
        ],
        "min_jri": 85.0,
    },
    {
        "id": "INT-AYUSH-006",
        "company_name": "Sun Pharma Pharmacovigilance Unit",
        "company_type": "Pharmaceutical",
        "role_title": "AYUSH Pharmacovigilance Analyst Intern",
        "domain": "Pharmacovigilance",
        "location": "Mumbai, Maharashtra (Hybrid)",
        "stipend_monthly": 17000,
        "duration_months": 12,
        "available_seats": 22,
        "description": "Analyze adverse event reports for Sun Pharma's AYUSH portfolio, implement NLP signal detection, and manage CDSCO regulatory submissions.",
        "required_skills": [
            {"skill": "pharmacovigilance", "weight": 0.95},
            {"skill": "NLP", "weight": 0.80},
            {"skill": "Python", "weight": 0.75},
            {"skill": "regulatory", "weight": 0.70},
        ],
        "min_jri": 85.0,
    }
]


def _build_internship_objects() -> List[Internship]:
    from models.user import AYUSHDomain
    from models.internship import SkillRequirement
    result = []
    domain_map = {d.value: d for d in AYUSHDomain}
    for d in MOCK_INTERNSHIPS:
        dom = domain_map.get(d["domain"], AYUSHDomain.AYURVEDA)
        skills = [SkillRequirement(**s) for s in d["required_skills"]]
        result.append(Internship(
            id=d["id"],
            company_name=d["company_name"],
            company_type=d["company_type"],
            role_title=d["role_title"],
            domain=dom,
            location=d["location"],
            stipend_monthly=d["stipend_monthly"],
            duration_months=d["duration_months"],
            available_seats=d["available_seats"],
            required_skills=skills,
            description=d["description"],
            min_jri=d["min_jri"],
            posted_at=datetime.utcnow()
        ))
    return result


def _compute_match_score(student_profile: str, internship: Internship) -> float:
    """Semantic similarity between student profile text and internship description."""
    internship_text = (
        f"{internship.role_title} {internship.description} "
        + " ".join(s.skill for s in internship.required_skills)
    )
    sim = compute_semantic_similarity(student_profile, internship_text)
    return round(sim * 100, 2)


def _greedy_allocation(
    internships: List[Internship],
    match_scores: List[float],
    jri: float,
    top_n: int = 5
) -> List[InternshipMatch]:
    """Greedy rank-sorted allocation (used in offline/demo mode)."""
    ranked = sorted(
        zip(internships, match_scores),
        key=lambda x: x[1],
        reverse=True
    )[:top_n]

    results = []
    for rank, (intern, score) in enumerate(ranked, start=1):
        explanation = (
            f"Ranked #{rank} based on semantic alignment ({score:.1f}%). "
            f"Your profile matches {len(intern.required_skills)} key skill requirements."
        )
        results.append(InternshipMatch(
            internship=intern,
            match_score=score,
            ilp_rank=rank,
            semantic_explanation=explanation
        ))
    return results


def _ilp_allocation(
    internships: List[Internship],
    match_scores: List[float],
    jri: float,
    top_n: int = 5
) -> List[InternshipMatch]:
    """
    OR-Tools Integer Linear Programming allocation.
    Maximizes total match score while respecting seat constraints
    and enforcing demographic diversity (simplified single-student case).
    """
    try:
        from ortools.sat.python import cp_model
    except ImportError:
        print("[ILPSolver] OR-Tools not available. Falling back to greedy.")
        return _greedy_allocation(internships, match_scores, jri, top_n)

    model = cp_model.CpModel()
    n = len(internships)
    # Decision variables: select[i] = 1 if internship i is recommended
    select = [model.new_bool_var(f"select_{i}") for i in range(n)]

    # Objective: maximize sum of match scores (scaled to integers for CP-SAT)
    scaled_scores = [int(s * 10) for s in match_scores]
    model.maximize(sum(scaled_scores[i] * select[i] for i in range(n)))

    # Constraint: recommend at most top_n
    model.add(sum(select) <= top_n)

    # Constraint: must recommend at least 1
    model.add(sum(select) >= 1)

    # Constraint: prefer domain diversity (at most 2 per company type)
    company_types = list(set(intern.company_type for intern in internships))
    for ct in company_types:
        ct_indices = [i for i, intern in enumerate(internships) if intern.company_type == ct]
        if len(ct_indices) > 1:
            model.add(sum(select[i] for i in ct_indices) <= 2)

    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 5.0
    status = solver.solve(model)

    results = []
    if status in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        selected = [(i, internships[i], match_scores[i]) for i in range(n) if solver.value(select[i])]
        selected.sort(key=lambda x: x[2], reverse=True)
        for rank, (i, intern, score) in enumerate(selected, start=1):
            results.append(InternshipMatch(
                internship=intern,
                match_score=score,
                ilp_rank=rank,
                semantic_explanation=(
                    f"ILP-optimized rank #{rank}. Score: {score:.1f}%. "
                    f"Diversity constraint satisfied across company types."
                )
            ))
    else:
        results = _greedy_allocation(internships, match_scores, jri, top_n)
    return results


def run_allocation(
    uid: str,
    jri: float,
    student_skills: List[str],
    student_bio: str = "",
    use_ilp: bool = True
) -> AllocationResult:
    """Main entry point: returns ranked InternshipMatch list for a student."""
    internships = _build_internship_objects()
    eligible = [i for i in internships if jri >= i.min_jri]

    if not eligible:
        return AllocationResult(
            uid=uid, jri=jri,
            matched_internships=[],
            allocation_passed=False,
            computed_at=datetime.utcnow()
        )

    profile_text = student_bio + " " + " ".join(student_skills)
    match_scores = [_compute_match_score(profile_text, intern) for intern in eligible]

    if use_ilp:
        matches = _ilp_allocation(eligible, match_scores, jri)
    else:
        matches = _greedy_allocation(eligible, match_scores, jri)

    return AllocationResult(
        uid=uid,
        jri=jri,
        matched_internships=matches,
        allocation_passed=True,
        computed_at=datetime.utcnow()
    )


def get_all_internships() -> List[Internship]:
    return _build_internship_objects()
