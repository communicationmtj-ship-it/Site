import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { companyInfo } from '../data/mock';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    // If we're on recrutement page and trying to go to home sections
    if (location.pathname === '/recrutement' && sectionId !== 'recrutement') {
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
    if (link.isRoute) {
      navigate('/recrutement');
      setIsMobileMenuOpen(false);
    } else {
      scrollToSection(link.id);
    }
  };

  const navLinks = [
    { label: 'Accueil', id: 'hero' },
    { label: 'À propos', id: 'about' },
    { label: 'Nos métiers', id: 'services' },
    { label: 'Interventions', id: 'domains' },
    { label: 'Devis', id: 'quote' },
    { label: 'Contact', id: 'contact' },
    { label: 'Recrutement', id: 'recrutement', isRoute: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-black/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center space-x-3" 
            onClick={() => navigate('/')}
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_business-profile-21/artifacts/bk499w0o_IMG_0028-removebg-preview.png" 
              alt="MTJ Sécurité Privée"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div className="hidden md:block">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider leading-tight">
                MTJ <span className="text-amber-400">SÉCURITÉ</span>
              </h1>
              <p className="text-xs text-amber-400 tracking-widest">PRIVÉE</p>
            </div>
          </div>

          {/* Hamburger Menu Button - Always visible */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-amber-400 transition-colors p-2"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Full Screen Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-black/98 backdrop-blur-lg z-40 overflow-y-auto">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto space-y-2">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="block w-full text-left text-white hover:text-amber-400 hover:bg-amber-400/10 font-bold tracking-wider transition-all duration-300 py-5 px-6 text-2xl md:text-3xl uppercase border-b border-gray-800/50 hover:border-amber-400/30 transform hover:translate-x-2"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: 'slideInRight 0.3s ease-out forwards'
                  }}
                >
                  <span className="flex items-center justify-between">
                    {link.label}
                    <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Contact info in menu */}
            <div className="max-w-2xl mx-auto mt-12 pt-12 border-t border-gray-800">
              <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
                <div>
                  <p className="text-amber-400 font-semibold uppercase text-sm mb-2">Téléphone</p>
                  <p className="text-white text-lg">{companyInfo.phone}</p>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold uppercase text-sm mb-2">Email</p>
                  <p className="text-white text-lg">{companyInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
