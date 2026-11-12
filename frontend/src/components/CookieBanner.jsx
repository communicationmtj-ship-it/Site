import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const CONSENT_KEY = 'mtj_cookie_consent';
export const CONSENT_EVENT = 'mtj-consent-change';
export const OPEN_BANNER_EVENT = 'mtj-open-cookie-banner';

const readConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
    // Permet de rouvrir le bandeau depuis le pied de page (« Gérer mes cookies »).
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_BANNER_EVENT, reopen);
    return () => window.removeEventListener(OPEN_BANNER_EVENT, reopen);
  }, []);

  const choose = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      localStorage.setItem(`${CONSENT_KEY}_date`, new Date().toISOString());
    } catch {
      // Stockage indisponible : le choix vaut pour cette page seulement.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  // Les deux boutons ont le même poids visuel (même taille, même contraste).
  const buttonClass =
    'px-6 py-2.5 text-sm font-semibold bg-amber-400 text-black hover:bg-amber-300 transition-colors';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-neutral-900 border-t border-amber-400/20 shadow-2xl"
      role="dialog"
      aria-label="Choix relatif à la mesure d'audience"
      data-testid="cookie-banner"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Shield size={24} className="text-amber-400 shrink-0 mt-1 sm:mt-0" />
        <p className="text-gray-300 text-sm flex-1 leading-relaxed">
          Avec votre accord, nous mesurons l'audience du site (pages vues, provenance des visites) afin de l'améliorer.
          Aucune mesure n'est faite tant que vous n'avez pas choisi, et vous pouvez revenir sur votre choix à tout moment
          depuis le pied de page. Pour en savoir plus, consultez notre{' '}
          <Link to="/politique-de-confidentialite" className="underline text-amber-400 hover:text-amber-300">
            politique de confidentialité
          </Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={() => choose('refused')} className={buttonClass} data-testid="cookie-refuse">
            Refuser
          </button>
          <button onClick={() => choose('accepted')} className={buttonClass} data-testid="cookie-accept">
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
