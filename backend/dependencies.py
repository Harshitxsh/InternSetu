"""
FastAPI Dependencies — InternSetu v2.0
Provides the ``get_current_user`` dependency that extracts and verifies
the Bearer JWT from the Authorization header.
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.security import verify_jwt_token
import jwt

_bearer_scheme = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
) -> dict:
    """
    FastAPI dependency — inject into any route that requires authentication.

    Extracts the JWT from the ``Authorization: Bearer <token>`` header,
    decodes it, and returns a dict with::

        { "uid": str, "role": str | None, "github_token": str | None }

    Raises 401 if the token is missing, expired, or invalid.
    """
    token = credentials.credentials
    try:
        payload = verify_jwt_token(token)
        return {
            "uid": payload["uid"],
            "role": payload.get("role"),
            "github_token": payload.get("github_token"),
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
