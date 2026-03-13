import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mtj_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('mtj_cookie_consent', 'accepted');
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem('mtj_cookie_consent', 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-neutral-900 border-t border-amber-400/20 shadow-2xl" data-testid="cookie-banner">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Shield size={24} className="text-amber-400 shrink-0 mt-1 sm:mt-0" />
        <p className="text-gray-300 text-sm flex-1 leading-relaxed">
          Ce site utilise des cookies pour mesurer l'audience et améliorer votre expérience. 
          En poursuivant votre navigation, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité et au RGPD.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={refuse}
            className="px-4 py-2 text-sm text-gray-400 border border-gray-700 hover:border-gray-500 transition-colors"
            data-testid="cookie-refuse"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors"
            data-testid="cookie-accept"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
