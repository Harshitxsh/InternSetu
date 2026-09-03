import sys
sys.path.insert(0, "./backend")
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    print("[OK] /health")

def test_root():
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert data["auth"] == "Custom JWT (Hybrid OAuth-to-JWT)"
    print(f"[OK] / -> auth: {data['auth']}")

def test_login_rejects_bad_token():
    res = client.post("/api/auth/login", json={"firebase_token": "bad-token"})
    assert res.status_code == 401
    print("[OK] /api/auth/login rejects invalid firebase token")

def test_protected_routes_require_jwt():
    for path in ["/api/jri/me", "/api/quests/test-uid", "/api/github/repos/test", "/api/internships/all"]:
        res = client.get(path)
        assert res.status_code in (401, 403), f"{path} returned {res.status_code}"
    print("[OK] All protected routes return 401/403 without JWT")

if __name__ == "__main__":
    test_health()
    test_root()
    test_login_rejects_bad_token()
    test_protected_routes_require_jwt()
    print("\n[PASS] All backend verification tests passed!")
