"""
Quest Generator Service — maps detected skill gaps to AYUSH Skill Quest cards.
"""
from typing import List, Dict, Optional
from models.internship import SkillQuest
from models.user import AYUSHDomain
import uuid

# ── Master AYUSH Quest Library ─────────────────────────────────────────────────
AYUSH_QUEST_LIBRARY: List[Dict] = [
    {
        "id": "quest-ayush-001",
        "title": "Ayurvedic Drug Standardization with HPLC & GCMS",
        "domain": AYUSHDomain.AYURVEDA,
        "category": "Research",
        "description": "Master the analytical techniques for quality control and standardization of Ayurvedic formulations per WHO and AYUSH Ministry guidelines.",
        "syllabus": [
            "HPLC method development for herbal marker compounds",
            "GC-MS fingerprinting of essential oils and volatile extracts",
            "TLC densitometry for primary screening",
            "WHO guidelines for herbal drug standardization",
            "Capstone: Full QC report for a Triphala formulation"
        ],
        "duration_days": 7,
        "xp_reward": 450,
        "jri_boost_percent": 9.0,
        "sponsor_company": "Dabur India Research Division",
        "difficulty": "Intermediate",
        "trigger_keywords": ["hplc", "gc-ms", "standardization", "herbal", "ayurveda", "formulation"]
    },
    {
        "id": "quest-ayush-002",
        "title": "Pharmacovigilance Signal Detection & NLP Reporting",
        "domain": AYUSHDomain.PHARMACOVIGILANCE,
        "category": "Technical",
        "description": "Build an NLP-based adverse event extraction pipeline and learn WHO-UMC VigiBase submission protocols for AYUSH drug safety monitoring.",
        "syllabus": [
            "AYUSH drug adverse event classification framework",
            "Named Entity Recognition (NER) for clinical text using spaCy",
            "WHO-UMC VigiBase data submission format (ICH E2B)",
            "Disproportionality analysis (ROR, PRR, IC scores)",
            "Capstone: Automated ADR report generator for a herbal product"
        ],
        "duration_days": 5,
        "xp_reward": 520,
        "jri_boost_percent": 10.5,
        "sponsor_company": "Sun Pharma - Pharmacovigilance Unit",
        "difficulty": "Advanced",
        "trigger_keywords": ["pharmacovigilance", "nlp", "adverse", "drug safety", "signal detection"]
    },
    {
        "id": "quest-ayush-003",
        "title": "FHIR-Based Digital Health API for AYUSH Telemedicine",
        "domain": AYUSHDomain.DIGITAL_HEALTH,
        "category": "Technical",
        "description": "Design and deploy a FHIR R4-compliant REST API enabling interoperable AYUSH patient records, e-prescriptions, and telemedicine consultations.",
        "syllabus": [
            "HL7 FHIR R4 resource modeling (Patient, Practitioner, MedicationRequest)",
            "Building FHIR-compliant endpoints with FastAPI + HAPI-FHIR",
            "SMART on FHIR OAuth2 authentication flows",
            "Integrating AYUSH e-health portals (Ayush Sanjivani API)",
            "Capstone: Deploy a FHIR-based teleconsultation microservice"
        ],
        "duration_days": 6,
        "xp_reward": 600,
        "jri_boost_percent": 11.0,
        "sponsor_company": "National Health Authority (NHA) - ABDM Team",
        "difficulty": "Advanced",
        "trigger_keywords": ["fhir", "hl7", "telemedicine", "digital health", "api", "ehr"]
    },
    {
        "id": "quest-ayush-004",
        "title": "Plant Genomics & Bioinformatics Pipeline (Bioconductor/R)",
        "domain": AYUSHDomain.BIOTECH,
        "category": "Research",
        "description": "Build an end-to-end bioinformatics pipeline for analyzing medicinal plant genomes, identifying secondary metabolite biosynthetic gene clusters.",
        "syllabus": [
            "Bioconductor DESeq2/edgeR for RNA-seq differential expression",
            "BLAST & multiple sequence alignment for herb genome annotation",
            "Secondary metabolite gene cluster prediction (antiSMASH workflow)",
            "Phylogenetic tree visualization with ggtree in R",
            "Capstone: Full annotation report for Withania somnifera (Ashwagandha)"
        ],
        "duration_days": 8,
        "xp_reward": 680,
        "jri_boost_percent": 12.0,
        "sponsor_company": "CSIR-NBRI (National Botanical Research Institute)",
        "difficulty": "Advanced",
        "trigger_keywords": ["bioinformatics", "genomics", "bioconductor", "r", "plant", "metabolite"]
    },
    {
        "id": "quest-ayush-005",
        "title": "AI Yoga Pose Estimation with MediaPipe & TensorFlow",
        "domain": AYUSHDomain.YOGA,
        "category": "Technical",
        "description": "Build a real-time computer vision system for 32-asana recognition and biomechanical feedback using MediaPipe Pose Landmarker.",
        "syllabus": [
            "MediaPipe Pose API: landmark extraction and normalization",
            "Random Forest / LSTM for asana sequence classification",
            "Real-time biomechanical joint angle analysis",
            "Integration with wearable sensor data (IMU fusion)",
            "Capstone: Deploy pose correction app as a Progressive Web App"
        ],
        "duration_days": 5,
        "xp_reward": 490,
        "jri_boost_percent": 8.5,
        "sponsor_company": "Patanjali Wellness Research Center",
        "difficulty": "Intermediate",
        "trigger_keywords": ["yoga", "computer vision", "mediapipe", "tensorflow", "pose", "machine learning"]
    },
    {
        "id": "quest-ayush-006",
        "title": "Molecular Docking & QSAR for Herbal Drug Discovery",
        "domain": AYUSHDomain.HERBAL_PHARMA,
        "category": "Research",
        "description": "Apply computational drug design techniques to identify and optimize phytoconstituents from Ayurvedic plants as lead compounds.",
        "syllabus": [
            "RDKit for molecular descriptor computation and SMILES handling",
            "AutoDock Vina molecular docking workflow",
            "ADMET property prediction (Lipinski Rule of Five, SwissADME)",
            "QSAR modeling with scikit-learn (Random Forest, SVM)",
            "Capstone: Docking study for curcumin analogues against COX-2"
        ],
        "duration_days": 7,
        "xp_reward": 620,
        "jri_boost_percent": 11.5,
        "sponsor_company": "Himalaya Drug Company R&D",
        "difficulty": "Advanced",
        "trigger_keywords": ["molecular docking", "qsar", "rdkit", "drug discovery", "computational", "phytochemistry"]
    },
    {
        "id": "quest-ayush-007",
        "title": "GMP Compliance & AYUSH Regulatory Affairs Documentation",
        "domain": AYUSHDomain.PHARMACOVIGILANCE,
        "category": "Regulatory",
        "description": "Navigate the CDSCO/AYUSH licensing framework and master GMP documentation, SOP writing, and regulatory submission for traditional medicine products.",
        "syllabus": [
            "AYUSH drug licensing categories and Schedule E drugs",
            "GMP audit checklist for herbal manufacturing units",
            "SOP writing and Change Control procedures (21 CFR Part 11)",
            "WHO Traditional Medicine Strategy 2019-2030 compliance",
            "Capstone: Draft a complete DMF for a classical Ayurvedic formulation"
        ],
        "duration_days": 4,
        "xp_reward": 360,
        "jri_boost_percent": 7.0,
        "sponsor_company": "Zandu Realty & AYUSH Regulatory Consulting",
        "difficulty": "Beginner",
        "trigger_keywords": ["gmp", "regulatory", "compliance", "cdsco", "ayush", "sop", "documentation"]
    },
    {
        "id": "quest-ayush-008",
        "title": "Scientific Communication & Research Paper Writing",
        "domain": AYUSHDomain.TRADITIONAL_MEDICINE,
        "category": "Communication",
        "description": "Develop strong academic writing skills for publishing in AYUSH and complementary medicine journals (JEP, JCA, Phytomedicine).",
        "syllabus": [
            "Systematic review methodology (PRISMA 2020 guidelines)",
            "Statistical analysis and result interpretation (SPSS/R)",
            "Ethical considerations in traditional medicine research",
            "Journal submission, peer review, and revision process",
            "Capstone: Draft an 800-word structured abstract for a meta-analysis"
        ],
        "duration_days": 3,
        "xp_reward": 280,
        "jri_boost_percent": 5.5,
        "sponsor_company": "Ministry of AYUSH Research Cell",
        "difficulty": "Beginner",
        "trigger_keywords": ["research", "writing", "communication", "publication", "systematic review"]
    }
]


def generate_quests_for_student(
    student_skills: List[str],
    primary_domain: str,
    current_jri: float,
    max_quests: int = 6
) -> List[SkillQuest]:
    """
    Generate a personalized list of skill quest cards for a student.
    Priority: quests most relevant to detected gaps and primary domain.
    """
    student_tokens = set(s.lower() for s in student_skills)

    scored_quests = []
    for q in AYUSH_QUEST_LIBRARY:
        trigger_tokens = set(q["trigger_keywords"])
        gap_coverage = len(trigger_tokens - student_tokens) / max(len(trigger_tokens), 1)
        domain_match = 1.5 if primary_domain.lower() in q["domain"].lower() else 1.0
        relevance = gap_coverage * domain_match * q["jri_boost_percent"]
        # Prioritize quests that could push student past 85% threshold
        jri_headroom = max(0, 85.0 - current_jri)
        if q["jri_boost_percent"] <= jri_headroom:
            relevance *= 1.3  # boost quests that directly close the gap
        scored_quests.append((relevance, q))

    scored_quests.sort(key=lambda x: x[0], reverse=True)
    top_quests = scored_quests[:max_quests]

    result = []
    for _, q in top_quests:
        result.append(SkillQuest(
            id=q["id"],
            title=q["title"],
            domain=q["domain"],
            category=q["category"],
            description=q["description"],
            syllabus=q["syllabus"],
            duration_days=q["duration_days"],
            xp_reward=q["xp_reward"],
            jri_boost_percent=q["jri_boost_percent"],
            sponsor_company=q["sponsor_company"],
            difficulty=q["difficulty"],
            status="AVAILABLE"
        ))
    return result
