import os
import sys
import json
import asyncio
from typing import Optional, List, Dict
from pathlib import Path

import httpx
from models.scoring import GitHubRepo, GitHubSnapshot
from datetime import datetime, timedelta

# ──────────────────────────────────────────────────────────────────────────────
# AYUSH-relevant tech stack keywords for vector similarity scoring
# ──────────────────────────────────────────────────────────────────────────────
AYUSH_TECH_KEYWORDS = [
    "bioinformatics", "genomics", "proteomics", "cheminformatics", "drug discovery",
    "pharmacovigilance", "clinical trials", "NLP", "natural language processing",
    "machine learning", "deep learning", "python", "r programming", "bioconductor",
    "rdkit", "molecular docking", "phytochemistry", "QSAR", "ADMET",
    "electronic health records", "EHR", "FHIR", "healthcare API", "telemedicine",
    "ayurvedic formulation", "herbal extraction", "HPLC", "GC-MS", "mass spectrometry",
    "pharmacognosy", "ethnobotany", "traditional medicine", "yoga", "naturopathy",
    "data science", "computer vision", "medical imaging", "DICOM", "OpenCV",
    "database", "sql", "nosql", "flask", "fastapi", "django", "react", "vue",
    "docker", "kubernetes", "aws", "azure", "gcp", "ci cd", "github actions",
    "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy", "jupyter"
]




def _cosine_similarity_simple(tokens_a: List[str], tokens_b: List[str]) -> float:
    """Simple token overlap cosine similarity (used when sentence-transformers unavailable)."""
    set_a = set(t.lower() for t in tokens_a)
    set_b = set(t.lower() for t in tokens_b)
    if not set_a or not set_b:
        return 0.0
    intersection = set_a & set_b
    return len(intersection) / (len(set_a) ** 0.5 * len(set_b) ** 0.5)


def _extract_repo_tokens(repo: dict) -> List[str]:
    tokens = []
    if repo.get("description"):
        tokens.extend(repo["description"].lower().split())
    tokens.extend([t.lower() for t in repo.get("topics", [])])
    if repo.get("language"):
        tokens.append(repo["language"].lower())
    return tokens


def compute_s_proj(snapshot: dict) -> float:
    """
    Compute S_proj (0–100) from a GitHub snapshot dict.
    
    Formula:
      Tech Relevance (50%)  — cosine similarity of repo topics/languages vs AYUSH keywords
      Implementation Depth (30%) — README + CI + Docker presence, stars, code volume
      Commit Cadence (20%)  — commit velocity, total commits, not-all-in-one-day
    """
    repos = snapshot.get("repos", [])
    if not repos:
        return 0.0

    # 1. Tech Relevance (50%)
    relevance_scores = []
    for repo in repos:
        repo_tokens = _extract_repo_tokens(repo)
        sim = _cosine_similarity_simple(repo_tokens, AYUSH_TECH_KEYWORDS)
        relevance_scores.append(sim)
    tech_relevance = (sum(relevance_scores) / len(relevance_scores)) * 100 * 0.5

    # 2. Implementation Depth (30%)
    has_readme_count = sum(1 for r in repos if r.get("has_readme"))
    has_ci_count = sum(1 for r in repos if r.get("has_ci"))
    has_docker_count = sum(1 for r in repos if r.get("has_dockerfile"))
    avg_stars = sum(r.get("stars", 0) for r in repos) / len(repos)
    avg_commits = sum(r.get("commit_count", 0) for r in repos) / len(repos)

    depth_score = (
        (has_readme_count / len(repos)) * 30 +
        (has_ci_count / len(repos)) * 25 +
        (has_docker_count / len(repos)) * 20 +
        min(avg_stars / 50, 1.0) * 15 +
        min(avg_commits / 100, 1.0) * 10
    )
    implementation_depth = depth_score * 0.30

    # 3. Commit Cadence (20%)
    velocity = snapshot.get("commit_velocity", 0.0)
    cadence_score = min(velocity / 15.0, 1.0) * 100
    commit_cadence = cadence_score * 0.20

    total = round(tech_relevance + implementation_depth + commit_cadence, 2)
    return min(100.0, total)


async def fetch_github_repos(username: str, access_token: str) -> GitHubSnapshot:
    """Fetch real GitHub repos and compute S_proj using the user's OAuth token."""
    headers = {
        "Authorization": f"token {access_token}",
        "Accept": "application/vnd.github.v3+json"
    }
    async with httpx.AsyncClient(timeout=15.0) as client:
        # Fetch repos
        resp = await client.get(
            f"https://api.github.com/users/{username}/repos",
            headers=headers,
            params={"per_page": 100, "sort": "updated"}
        )
        resp.raise_for_status()
        raw_repos = resp.json()

        # Fetch commit activity
        repos: List[GitHubRepo] = []
        language_totals: Dict[str, int] = {}
        total_commits = 0

        for raw in raw_repos[:20]:  # limit to top 20 most-recent
            lang = raw.get("language") or "Unknown"
            language_totals[lang] = language_totals.get(lang, 0) + 1

            # Check for CI/Dockerfile heuristically via tree listing (lightweight)
            has_ci = False
            has_dockerfile = False
            try:
                tree_resp = await client.get(
                    f"https://api.github.com/repos/{username}/{raw['name']}/git/trees/HEAD",
                    headers=headers,
                    params={"recursive": "0"}
                )
                if tree_resp.status_code == 200:
                    tree_files = [item["path"] for item in tree_resp.json().get("tree", [])]
                    has_ci = any(".github" in f or "ci" in f.lower() for f in tree_files)
                    has_dockerfile = any("dockerfile" in f.lower() for f in tree_files)
            except Exception:
                pass

            commit_count = raw.get("size", 0) // 10  # rough proxy
            total_commits += commit_count

            repos.append(GitHubRepo(
                name=raw["name"],
                description=raw.get("description"),
                language=lang,
                stars=raw.get("stargazers_count", 0),
                forks=raw.get("forks_count", 0),
                size=raw.get("size", 0),
                topics=raw.get("topics", []),
                has_readme=bool(raw.get("description")),
                has_ci=has_ci,
                has_dockerfile=has_dockerfile,
                commit_count=commit_count,
                updated_at=raw.get("updated_at")
            ))

        # Estimate commit velocity (commits per week over last 12 weeks)
        commit_velocity = total_commits / 12.0

        snapshot_dict = {
            "username": username,
            "total_repos": len(raw_repos),
            "primary_languages": language_totals,
            "repos": [r.model_dump() for r in repos],
            "commit_velocity": commit_velocity,
        }
        s_proj = compute_s_proj(snapshot_dict)

        return GitHubSnapshot(
            username=username,
            total_repos=len(raw_repos),
            primary_languages=language_totals,
            repos=repos,
            commit_velocity=commit_velocity,
            s_proj_score=s_proj,
            scored_at=datetime.utcnow()
        )


