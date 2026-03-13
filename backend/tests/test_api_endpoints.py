"""
Backend API Tests for MTJ SECURITE PRIVEE
Tests all endpoints after backend refactoring from server.py monolith to modular routers
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestRootEndpoint:
    """Test root API endpoint"""
    
    def test_root_returns_hello_world(self):
        """GET /api/ - root endpoint returns Hello World"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"


class TestAnalyticsEndpoints:
    """Tests for analytics router endpoints (/api/track, /api/stats)"""
    
    def test_track_visit(self):
        """POST /api/track - track page visit"""
        response = requests.post(
            f"{BASE_URL}/api/track",
            json={"page": "/test-pytest"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert data["status"] == "ok"
    
    def test_track_visit_with_referrer(self):
        """POST /api/track - track page visit with referrer"""
        response = requests.post(
            f"{BASE_URL}/api/track",
            json={"page": "/test-pytest-referrer", "referrer": "https://google.com"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
    
    def test_get_stats_default(self):
        """GET /api/stats - returns stats object with default 30 days"""
        response = requests.get(f"{BASE_URL}/api/stats")
        assert response.status_code == 200
        data = response.json()
        # Verify all required fields in response
        assert "period" in data
        assert "total" in data
        assert "today" in data
        assert "daily" in data
        assert "pages" in data
        assert "countries" in data
        assert "cities" in data
        assert "hours_today" in data
        assert "recent" in data
        # Verify structure of nested objects
        assert "days" in data["period"]
        assert "since" in data["period"]
        assert "total" in data["total"]
        assert "unique" in data["total"]
    
    def test_get_stats_7_days(self):
        """GET /api/stats?days=7 - returns stats for 7 days"""
        response = requests.get(f"{BASE_URL}/api/stats?days=7")
        assert response.status_code == 200
        data = response.json()
        assert data["period"]["days"] == 7


class TestMonthlyReportEndpoint:
    """Test monthly report endpoint"""
    
    def test_send_monthly_report(self):
        """POST /api/send-monthly-report - sends monthly HTML report email"""
        response = requests.post(f"{BASE_URL}/api/send-monthly-report")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert data["status"] == "success"


class TestSitemapEndpoint:
    """Test sitemap endpoint"""
    
    def test_sitemap_returns_xml(self):
        """GET /api/sitemap.xml - returns XML sitemap"""
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/xml"
        assert "<?xml" in response.text
        assert "<urlset" in response.text
        assert "</urlset>" in response.text
        # Verify it contains expected pages
        assert "mtj-securite-privee.fr" in response.text
        assert "/recrutement" in response.text


class TestQuoteFormEndpoint:
    """Tests for quote form endpoint (forms router)"""
    
    def test_submit_quote_success(self):
        """POST /api/quote - submit quote form (multipart/form-data)"""
        response = requests.post(
            f"{BASE_URL}/api/quote",
            data={
                "name": "TEST_Pytest User",
                "email": "pytest@example.com",
                "phone": "0600000000",
                "serviceType": "Agent de sécurité",
                "message": "Test quote message from pytest"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert data["status"] == "success"
        assert "message" in data
    
    def test_submit_quote_with_company(self):
        """POST /api/quote - submit quote form with company field"""
        response = requests.post(
            f"{BASE_URL}/api/quote",
            data={
                "name": "TEST_Business User",
                "email": "business@example.com",
                "phone": "0700000000",
                "serviceType": "Sécurité événementielle",
                "message": "Test business quote",
                "company": "Test Company Inc"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"


class TestContactFormEndpoint:
    """Tests for contact form endpoint (forms router)"""
    
    def test_submit_contact_success(self):
        """POST /api/contact - submit contact form (multipart/form-data)"""
        response = requests.post(
            f"{BASE_URL}/api/contact",
            data={
                "name": "TEST_Contact User",
                "email": "contact-pytest@example.com",
                "subject": "Test Subject",
                "message": "Test contact message from pytest"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert data["status"] == "success"
        assert "message" in data
    
    def test_submit_contact_with_phone(self):
        """POST /api/contact - submit contact form with optional phone"""
        response = requests.post(
            f"{BASE_URL}/api/contact",
            data={
                "name": "TEST_Phone User",
                "email": "phone-pytest@example.com",
                "subject": "Test with Phone",
                "message": "Test contact with phone",
                "phone": "0612345678"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"


class TestStatusEndpoint:
    """Tests for status check endpoint"""
    
    def test_create_status_check(self):
        """POST /api/status - create status check"""
        response = requests.post(
            f"{BASE_URL}/api/status",
            json={"client_name": "TEST_Pytest Client"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert "client_name" in data
        assert data["client_name"] == "TEST_Pytest Client"
        assert "timestamp" in data
    
    def test_get_status_checks(self):
        """GET /api/status - retrieve status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
