import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PAGES_LOCALES, PAGE_SECTEUR, SECTEUR_TITRE, libelleMenu } from '../data/perimetre';

// 13/11/2026 (choix de Théo, « Site perimetre: A partout ») : menu « Nos zones » avec chaque page
// locale du secteur (Bordeaux compris), la page de tout le secteur et le grand déplacement.
// Fermé par un clic dehors, par la touche Échap et à chaque changement de page.

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [zonesOuvert, setZonesOuvert] = useState(false);
  const [zonesMobileOuvert, setZonesMobileOuvert] = useState(false);
  const zonesRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setZonesOuvert(false);
    setZonesMobileOuvert(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!zonesOuvert) return undefined;
    const clicDehors = (e) => {
      if (zonesRef.current && !zonesRef.current.contains(e.target)) setZonesOuvert(false);
    };
    const echap = (e) => {
      if (e.key === 'Escape') setZonesOuvert(false);
    };
    document.addEventListener('mousedown', clicDehors);
    document.addEventListener('keydown', echap);
    return () => {
      document.removeEventListener('mousedown', clicDehors);
      document.removeEventListener('keydown', echap);
    };
  }, [zonesOuvert]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or on a link
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    // If we're on a subpage and trying to go to home sections
    if (location.pathname !== '/' && !navLinks.find(l => l.id === sectionId)?.route) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (link) => {
    if (link.route) {
      navigate(link.route);
      setIsMobileMenuOpen(false);
    } else {
      scrollToSection(link.id);
    }
  };

  const navLinks = [
    { label: 'À propos', id: 'about' },
    { label: 'Nos métiers', id: 'services' },
    { label: 'Interventions', id: 'domains' },
    { label: 'Recrutement', id: 'recrutement', route: '/recrutement' },
    { label: 'Contact', id: 'contact', route: '/contact' },
  ];

  const lienBureau = (link) => (
    <button
      key={link.id}
      onClick={() => handleNavClick(link)}
      className="text-white hover:text-amber-400 font-medium tracking-wide transition-colors duration-300 text-sm uppercase"
    >
      {link.label}
    </button>
  );

  const lienMobile = (link) => (
    <button
      key={link.id}
      onClick={() => handleNavClick(link)}
      className="block w-full text-left text-white hover:text-amber-400 font-medium tracking-wide transition-colors duration-300 py-3 text-base uppercase border-b border-gray-800"
    >
      {link.label}
    </button>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo : vrai lien vers l'accueil (atteignable au clavier), image WebP allégée avec repli PNG */}
          <Link to="/" className="cursor-pointer flex items-center" aria-label="MTJ Sécurité Privée, retour à l'accueil">
            <picture>
              <source srcSet="/images/logo-mtj.webp" type="image/webp" />
              <img
                src="/images/logo-mtj.png"
                alt="MTJ Sécurité Privée"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </picture>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 3).map(lienBureau)}
            <div className="relative" ref={zonesRef}>
              <button
                type="button"
                onClick={() => setZonesOuvert((ouvert) => !ouvert)}
                aria-expanded={zonesOuvert}
                aria-controls="menu-zones"
                className="inline-flex items-center gap-1 text-white hover:text-amber-400 font-medium tracking-wide transition-colors duration-300 text-sm uppercase"
                data-testid="navbar-zones"
              >
                Nos zones
                <ChevronDown size={16} className={`transition-transform duration-200 ${zonesOuvert ? 'rotate-180' : ''}`} />
              </button>
              {zonesOuvert && (
                <div id="menu-zones" className="absolute right-0 top-full mt-4 w-[30rem] bg-black/95 border border-amber-400/30 shadow-xl p-5" data-testid="navbar-zones-menu">
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">{SECTEUR_TITRE}</p>
                  <ul className="grid grid-cols-3 gap-x-4 gap-y-2">
                    {PAGES_LOCALES.map((page) => (
                      <li key={page.slug}>
                        <Link to={page.slug} className="text-gray-300 hover:text-amber-400 text-sm transition-colors">{libelleMenu(page)}</Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between gap-4 text-xs uppercase tracking-wider">
                    <Link to={PAGE_SECTEUR.slug} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">{PAGE_SECTEUR.libelle}</Link>
                    <Link to="/grand-deplacement-securite-france" className="text-gray-400 hover:text-amber-400 transition-colors">Grand déplacement national</Link>
                  </div>
                </div>
              )}
            </div>
            {navLinks.slice(3).map(lienBureau)}
            <button
              onClick={() => handleNavClick({ id: 'quote' })}
              className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-5 py-2.5 text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
              data-testid="navbar-devis-cta"
            >
              Devis gratuit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-amber-400 transition-colors p-2"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-md max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.slice(0, 3).map(lienMobile)}
            <div className="border-b border-gray-800">
              <button
                type="button"
                onClick={() => setZonesMobileOuvert((ouvert) => !ouvert)}
                aria-expanded={zonesMobileOuvert}
                aria-controls="menu-zones-mobile"
                className="flex w-full items-center justify-between text-left text-white hover:text-amber-400 font-medium tracking-wide transition-colors duration-300 py-3 text-base uppercase"
                data-testid="navbar-zones-mobile"
              >
                Nos zones
                <ChevronDown size={20} className={`transition-transform duration-200 ${zonesMobileOuvert ? 'rotate-180' : ''}`} />
              </button>
              {zonesMobileOuvert && (
                <ul id="menu-zones-mobile" className="grid grid-cols-2 gap-x-4 gap-y-3 pb-4">
                  {PAGES_LOCALES.map((page) => (
                    <li key={page.slug}>
                      <Link to={page.slug} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-amber-400 text-sm">{libelleMenu(page)}</Link>
                    </li>
                  ))}
                  <li className="col-span-2">
                    <Link to={PAGE_SECTEUR.slug} onClick={() => setIsMobileMenuOpen(false)} className="text-amber-400 text-sm font-semibold uppercase">{PAGE_SECTEUR.libelle}</Link>
                  </li>
                </ul>
              )}
            </div>
            {navLinks.slice(3).map(lienMobile)}
            <button
              onClick={() => handleNavClick({ id: 'quote' })}
              className="block w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-4 text-base uppercase tracking-wider transition-all duration-300 text-center mt-4"
              data-testid="navbar-devis-cta-mobile"
            >
              Devis gratuit
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
