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
              src="https://customer-assets.emergentagent.com/job_business-profile-21/artifacts/bk499w0o_IMG_0028-removebg-preview.png" 
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-amber-400 transition-colors"
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
