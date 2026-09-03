"""
JWT Security Module — InternSetu v2.0
Custom JWT minting and verification for session management.
Firebase is used ONLY to broker the initial OAuth login;
all subsequent requests are authenticated via this module.
"""
import os
import jwt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET: str = os.getenv("JWT_SECRET", "CHANGE_ME_IN_PRODUCTION_internsetu_2026")
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours


def create_access_token(
    data: Dict[str, Any],
    expires_delta: Optional[timedelta] = None,
) -> str:
    """
    Mint a signed JWT embedding the user's uid, role, and optionally
    a GitHub access token for S_proj codebase analysis.

    Parameters
    ----------
    data : dict
        Must contain at least ``uid``.  May include ``role`` and
        ``github_token``.
    expires_delta : timedelta, optional
        Custom expiry.  Defaults to ACCESS_TOKEN_EXPIRE_MINUTES.

    Returns
    -------
    str  –  Encoded JWT string.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)


def verify_jwt_token(token: str) -> Dict[str, Any]:
    """
    Decode and validate a JWT.

    Returns
    -------
    dict  –  The decoded payload (uid, role, github_token, exp, iat).

    Raises
    ------
    jwt.ExpiredSignatureError   – Token has expired.
    jwt.InvalidTokenError       – Token is malformed or signature mismatch.
    """
    return jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
