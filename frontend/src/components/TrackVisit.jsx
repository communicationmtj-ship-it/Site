import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const CONSENT_KEY = 'mtj_cookie_consent';
const CONSENT_EVENT = 'mtj-consent-change';

const hasConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
};

// Aucune mesure d'audience n'est envoyée avant un choix explicite « Accepter ».
const TrackVisit = () => {
  const location = useLocation();
  const [consented, setConsented] = useState(hasConsent);

  useEffect(() => {
    const onChange = () => setConsented(hasConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (!consented) return;
    const track = async () => {
      try {
        await fetch(`${API_URL}/api/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: location.pathname,
            referrer: document.referrer || null,
          }),
        });
      } catch {
        // Tracking failure is non-critical, silently ignore
      }
    };
    track();
  }, [location.pathname, consented]);

  return null;
};

export default TrackVisit;
