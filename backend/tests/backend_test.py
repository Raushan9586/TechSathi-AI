"""TechSathi AI — backend API tests (pytest)"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://techsathi-suite.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

TIMEOUT = 90  # Claude calls can take a few seconds


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "message" in data


# ---------- Tools list ----------
class TestTools:
    def test_tools_shape(self, client):
        r = client.get(f"{API}/tools", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert "student" in data and "business" in data
        assert isinstance(data["student"], list) and len(data["student"]) >= 4
        assert isinstance(data["business"], list) and len(data["business"]) >= 4
        ids = {t["id"] for t in data["student"] + data["business"]}
        assert {"resume", "content-gen"}.issubset(ids)


# ---------- AI generate (Claude Sonnet 4.5) ----------
class TestAIGenerate:
    def test_resume_en(self, client):
        payload = {
            "tool": "resume",
            "language": "en",
            "prompt": "B.Tech CSE final year, skills: Python, React, ML. Interned at a startup. Built a food-delivery clone."
        }
        r = client.post(f"{API}/ai/generate", json=payload, timeout=TIMEOUT)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["tool"] == "resume"
        assert data["language"] == "en"
        assert isinstance(data["output"], str) and len(data["output"].strip()) > 50
        assert "id" in data and "created_at" in data

    def test_content_gen_hinglish(self, client):
        payload = {
            "tool": "content-gen",
            "language": "hinglish",
            "prompt": "Small bakery in Pune selling eggless cakes and cookies, brand name: SweetSpot."
        }
        r = client.post(f"{API}/ai/generate", json=payload, timeout=TIMEOUT)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["language"] == "hinglish"
        assert len(data["output"].strip()) > 50

    def test_invalid_tool(self, client):
        r = client.post(f"{API}/ai/generate", json={"tool": "not-a-tool", "language": "en", "prompt": "hi"}, timeout=30)
        assert r.status_code == 400


# ---------- Chat ----------
class TestChat:
    def test_chat_returns_reply(self, client):
        sid = str(uuid.uuid4())
        r = client.post(f"{API}/chat", json={"session_id": sid, "message": "Give me a one-line marketing tip.", "language": "en"}, timeout=TIMEOUT)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["session_id"] == sid
        assert isinstance(data["reply"], str) and len(data["reply"]) > 0


# ---------- Waitlist ----------
class TestWaitlist:
    def test_waitlist_create_and_idempotent(self, client):
        email = f"TEST_{uuid.uuid4().hex[:8]}@example.com"
        r1 = client.post(f"{API}/waitlist", json={"email": email, "persona": "student", "name": "TEST"}, timeout=30)
        assert r1.status_code == 200, r1.text
        d1 = r1.json()
        assert d1["email"] == email
        assert "id" in d1
        # Idempotent
        r2 = client.post(f"{API}/waitlist", json={"email": email}, timeout=30)
        assert r2.status_code == 200
        d2 = r2.json()
        assert d2["id"] == d1["id"]

    def test_waitlist_count(self, client):
        r = client.get(f"{API}/waitlist/count", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data.get("count"), int)
        assert data["count"] >= 1247  # bootstrap offset
