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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center" 
            onClick={() => navigate('/')}
          >
            <img 
              src="/images/logo-mtj.png" 
              alt="MTJ Sécurité Privée"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="text-white hover:text-amber-400 font-medium tracking-wide transition-colors duration-300 text-sm uppercase"
              >
                {link.label}
              </button>
            ))}
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
        <div className="lg:hidden bg-black/98 backdrop-blur-md">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="block w-full text-left text-white hover:text-amber-400 font-medium tracking-wide transition-colors duration-300 py-3 text-base uppercase border-b border-gray-800"
              >
                {link.label}
              </button>
            ))}
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
