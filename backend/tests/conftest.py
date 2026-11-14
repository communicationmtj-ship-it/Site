"""Garde commune des essais du site vitrine (13/11/2026) : aucun essai ne joint le vrai logiciel MTJ.

La connexion au tableau d'administration du site interroge la route de connexion du logiciel
(security.verifier_compte_fondateur). Pendant les essais :
- l'adresse du logiciel est une adresse d'essai qui n'existe pas (domaine réservé .test) ;
- le transport HTTP vers le logiciel refuse tout envoi, sans réseau. Un essai qui veut une
  réponse du logiciel installe sa propre route simulée (test_site_connexion_logiciel_13_11.py).
Les anciens essais « en ligne » (test_api_endpoints.py, test_security_features.py) visent un
serveur déjà lancé : cette garde ne les change pas.
"""
import os
import sys
from pathlib import Path

import pytest

BACKEND = Path(__file__).resolve().parent.parent
if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

os.environ["LOGICIEL_URL"] = "https://logiciel.example.test"


@pytest.fixture(autouse=True)
def _aucun_envoi_vers_le_logiciel(monkeypatch):
    import httpx
    import security

    def _refus(request):
        raise httpx.ConnectError("essai hors ligne : aucun envoi vers le logiciel", request=request)

    monkeypatch.setenv("LOGICIEL_URL", "https://logiciel.example.test")
    monkeypatch.setattr(security, "_transport_logiciel", lambda: httpx.MockTransport(_refus))
    yield
