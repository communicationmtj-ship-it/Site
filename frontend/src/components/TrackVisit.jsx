import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TrackVisit = () => {
  const location = useLocation();

  useEffect(() => {
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
  }, [location.pathname]);

  return null;
};

export default TrackVisit;
