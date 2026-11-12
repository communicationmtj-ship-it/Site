import React, { useState } from 'react';
import { Phone, FileText, X } from 'lucide-react';

const FloatingCTA = () => {
  const [expanded, setExpanded] = useState(false);

  const scrollToDevis = () => {
    setExpanded(false);
    const el = document.getElementById('quote');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#quote';
    }
  };

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3 md:hidden">

      {expanded && (
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={scrollToDevis}
            className="flex items-center gap-2 bg-amber-400 text-black font-bold px-5 py-3 shadow-lg text-sm uppercase tracking-wide"
            style={{ borderRadius: 2 }}
          >
            <FileText size={16} />
            Devis gratuit
          </button>

          <a
            href="tel:+33760738206"
            className="flex items-center gap-2 bg-white text-black font-bold px-5 py-3 shadow-lg text-sm uppercase tracking-wide"
            style={{ borderRadius: 2 }}
          >
            <Phone size={16} />
            07 60 73 82 06 · 24h/24
          </a>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 flex items-center justify-center shadow-xl transition-all duration-200"
        style={{ backgroundColor: expanded ? '#ffffff' : '#F59E0B', borderRadius: 2 }}
        aria-label={expanded ? 'Fermer' : 'Nous contacter'}
      >
        {expanded
          ? <X size={22} className="text-black" />
          : <Phone size={22} className="text-black" />
        }
      </button>
    </div>
  );
};

export default FloatingCTA;
