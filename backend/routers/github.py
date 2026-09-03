from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from models.scoring import GitHubSnapshot
from dependencies import get_current_user

router = APIRouter()
_github_cache: dict = {}


@router.get("/repos/{username}", response_model=GitHubSnapshot)
async def get_github_repos(
    username: str,
    current_user: dict = Depends(get_current_user),
):
    """Fetch GitHub repos and compute S_proj score for a given username.
    The GitHub access token is extracted from the JWT payload."""
    from services.github_ingestion import fetch_github_repos

    access_token = current_user.get("github_token")
    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="No GitHub token found. Please sign in with GitHub.",
        )

    if username in _github_cache:
        return _github_cache[username]

    try:
        snapshot = await fetch_github_repos(username, access_token)
        _github_cache[username] = snapshot
        return snapshot
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"GitHub API error: {str(e)}")


@router.post("/score/{username}")
async def score_github_profile(
    username: str,
    current_user: dict = Depends(get_current_user),
):
    """Re-score an already-fetched GitHub profile."""
    from services.github_ingestion import compute_s_proj

    snapshot = _github_cache.get(username)
    if not snapshot:
        raise HTTPException(
            status_code=404,
            detail="Profile not fetched yet. Call GET /api/github/repos first.",
        )

    snap_dict = snapshot.model_dump() if hasattr(snapshot, "model_dump") else snapshot
    repos_dicts = [
        r.model_dump() if hasattr(r, "model_dump") else r
        for r in snap_dict.get("repos", [])
    ]
    snap_dict["repos"] = repos_dicts
    s_proj = compute_s_proj(snap_dict)
    return {"username": username, "s_proj_score": s_proj}
