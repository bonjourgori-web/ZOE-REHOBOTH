"""Backend tests for ZOE & REHOBOTH - auth, testimonials, events"""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")

# ─── Auth Tests ───────────────────────────────────────────

class TestAuth:
    def test_login_success(self):
        r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": "admin@zoereh.com", "password": "Admin2025Zoe"})
        assert r.status_code == 200
        data = r.json()
        assert "token" in data
        assert data["role"] == "admin"
        assert data["email"] == "admin@zoereh.com"

    def test_login_wrong_password(self):
        r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": "admin@zoereh.com", "password": "wrong"})
        assert r.status_code == 401

    def test_login_wrong_email(self):
        r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": "nobody@example.com", "password": "Admin2025Zoe"})
        assert r.status_code == 401

    def test_me_authenticated(self):
        r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": "admin@zoereh.com", "password": "Admin2025Zoe"})
        token = r.json()["token"]
        r2 = requests.get(f"{BASE_URL}/api/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert r2.status_code == 200
        assert r2.json()["role"] == "admin"

    def test_me_unauthenticated(self):
        r = requests.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 401

# ─── Public Testimonials ──────────────────────────────────

class TestTestimonials:
    def test_get_testimonials(self):
        r = requests.get(f"{BASE_URL}/api/testimonials")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 6

    def test_testimonials_fields(self):
        r = requests.get(f"{BASE_URL}/api/testimonials")
        items = r.json()
        for item in items:
            assert "name" in item
            assert "text" in item
            assert "stars" in item
            assert "book" in item
            assert "location" in item
            assert "id" in item

# ─── Public Events ────────────────────────────────────────

class TestEvents:
    def test_get_events(self):
        r = requests.get(f"{BASE_URL}/api/events")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

# ─── Admin Testimonials CRUD ──────────────────────────────

@pytest.fixture(scope="module")
def auth_token():
    r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": "admin@zoereh.com", "password": "Admin2025Zoe"})
    if r.status_code != 200:
        pytest.skip("Auth failed")
    return r.json()["token"]

@pytest.fixture(scope="module")
def auth_headers(auth_token):
    return {"Authorization": f"Bearer {auth_token}"}

class TestAdminTestimonials:
    def test_list_testimonials(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/admin/testimonials", headers=auth_headers)
        assert r.status_code == 200
        assert len(r.json()) >= 6

    def test_create_and_delete_testimonial(self, auth_headers):
        payload = {"name": "TEST_User", "location": "Test City", "book": "TestBook", "text": "Test testimonial text", "stars": 4, "approved": True}
        r = requests.post(f"{BASE_URL}/api/admin/testimonials", json=payload, headers=auth_headers)
        assert r.status_code == 200
        tid = r.json()["id"]
        # delete
        rd = requests.delete(f"{BASE_URL}/api/admin/testimonials/{tid}", headers=auth_headers)
        assert rd.status_code == 200

    def test_update_testimonial(self, auth_headers):
        # create
        payload = {"name": "TEST_Update", "location": "City", "book": "Book", "text": "Text", "stars": 3, "approved": True}
        r = requests.post(f"{BASE_URL}/api/admin/testimonials", json=payload, headers=auth_headers)
        tid = r.json()["id"]
        # update
        ru = requests.put(f"{BASE_URL}/api/admin/testimonials/{tid}", json={"stars": 5}, headers=auth_headers)
        assert ru.status_code == 200
        assert ru.json()["stars"] == 5
        # cleanup
        requests.delete(f"{BASE_URL}/api/admin/testimonials/{tid}", headers=auth_headers)

class TestAdminEvents:
    def test_list_events(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/admin/events", headers=auth_headers)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_create_and_delete_event(self, auth_headers):
        payload = {
            "date_fr": "15 Mars 2026", "date_en": "March 15, 2026",
            "title_fr": "TEST Événement", "title_en": "TEST Event",
            "location": "Test Location", "description_fr": "Desc FR", "description_en": "Desc EN",
            "author": "Test Author", "upcoming": True
        }
        r = requests.post(f"{BASE_URL}/api/admin/events", json=payload, headers=auth_headers)
        assert r.status_code == 200
        eid = r.json()["id"]
        rd = requests.delete(f"{BASE_URL}/api/admin/events/{eid}", headers=auth_headers)
        assert rd.status_code == 200

    def test_admin_events_unauthenticated(self):
        r = requests.get(f"{BASE_URL}/api/admin/events")
        assert r.status_code == 401
