import requests
import sys

# Test recruitment email
url = "https://mtj-preview-deploy.preview.emergentagent.com/api/recrutement"

# Create test data
data = {
    'firstName': 'Jean',
    'lastName': 'Dupont',
    'email': 'jean.dupont@example.com',
    'phone': '06 12 34 56 78',
    'message': 'Je suis intéressé par un poste d\'agent de sécurité. J\'ai 5 ans d\'expérience dans le domaine.'
}

# Create a dummy file for testing
with open('/tmp/test_cv.txt', 'w') as f:
    f.write('CV Test - Jean Dupont\nAgent de Sécurité\n5 ans d\'expérience')

# Send request with file
files = {'attachments': open('/tmp/test_cv.txt', 'rb')}

try:
    response = requests.post(url, data=data, files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {str(e)}")
    sys.exit(1)
