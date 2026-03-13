import requests
import sys
from datetime import datetime
import json

class MTJSecurityAPITester:
    def __init__(self, base_url="https://mtj-demo-site.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Response status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    print(f"Response text: {response.text}")
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Error response: {response.json()}")
                except:
                    print(f"Error text: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_basic_connectivity(self):
        """Test basic API connectivity"""
        success, response = self.run_test(
            "Basic API Connectivity",
            "GET",
            "api/",
            200
        )
        return success

    def test_status_check_creation(self):
        """Test status check creation"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        success, response = self.run_test(
            "Status Check Creation",
            "POST",
            "api/status",
            200,
            data=test_data
        )
        return success, response

    def test_status_check_retrieval(self):
        """Test status check retrieval"""
        success, response = self.run_test(
            "Status Check Retrieval",
            "GET",
            "api/status",
            200
        )
        return success

    def test_quote_submission(self):
        """Test quote form submission"""
        test_data = {
            "name": "Jean Dupont",
            "company": "Test Company",
            "email": "jean.dupont@test.com",
            "phone": "07 60 73 82 06",
            "serviceType": "Agent de prévention et sécurité",
            "message": "Bonjour, j'aimerais avoir un devis pour la sécurité de notre entreprise. Nous avons besoin d'agents pour surveiller notre site de 100 employés."
        }
        success, response = self.run_test(
            "Quote Form Submission",
            "POST",
            "api/quote",
            200,
            data=test_data
        )
        return success, response

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Marie Martin",
            "email": "marie.martin@test.com",
            "phone": "06 12 34 56 78",
            "subject": "Demande d'information sur vos services",
            "message": "Bonjour, je souhaiterais obtenir plus d'informations sur vos services de sécurité cynophile."
        }
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data
        )
        return success, response

def main():
    # Setup
    tester = MTJSecurityAPITester()
    
    print("=" * 60)
    print("MTJ SÉCURITÉ PRIVÉE - API Testing")
    print("=" * 60)
    
    # Test basic connectivity
    if not tester.test_basic_connectivity():
        print("❌ Basic connectivity failed, stopping tests")
        return 1

    # Test status check endpoints (existing functionality)
    print("\n" + "=" * 40)
    print("TESTING STATUS CHECK ENDPOINTS")
    print("=" * 40)
    
    # Create a status check first
    status_created, status_data = tester.test_status_check_creation()
    
    # Get all status checks
    tester.test_status_check_retrieval()
    
    # Test quote and contact endpoints (new functionality)
    print("\n" + "=" * 40)
    print("TESTING QUOTE & CONTACT ENDPOINTS")
    print("=" * 40)
    
    # Test quote submission
    quote_success, quote_response = tester.test_quote_submission()
    
    # Test contact submission  
    contact_success, contact_response = tester.test_contact_submission()

    # Print results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS: {tester.tests_passed}/{tester.tests_run} tests passed")
    print("=" * 60)
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} test(s) failed")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())