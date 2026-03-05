import React from 'react';
import { Shield, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-amber-400/20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_business-profile-21/artifacts/bk499w0o_IMG_0028-removebg-preview.png" 
                alt="MTJ Sécurité Privée"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {companyInfo.slogan}
            </p>
            <div className="text-gray-500 text-xs space-y-2">
              <p className="font-semibold text-amber-400">AUT -083-2024-05-22-2024084324</p>
              <p className="leading-relaxed">
                L612-14 du CSI L'autorisation administrative préalable ne confère aucun caractère officiel à l'entreprise ou aux personnes qui en bénéficient.
                Elle n'engage en aucune manière la responsabilité des pouvoirs publics.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wide mb-4 text-sm">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Accueil', id: 'hero' },
                { label: 'À propos', id: 'about' },
                { label: 'Nos métiers', id: 'services' },
                { label: 'Interventions', id: 'domains' },
                { label: 'Devis', id: 'quote' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wide mb-4 text-sm">
              Nos Services
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Agent de sécurité</li>
              <li>Cyno d'intervention</li>
              <li>CYNODEX - Détection d'explosifs</li>
              <li>SSIAP</li>
              <li>Sécurité événementielle</li>
              <li>Gardiennage</li>
              <li>Surveillance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wide mb-4 text-sm">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone size={16} className="text-amber-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{companyInfo.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={16} className="text-amber-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm break-all">{companyInfo.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-amber-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{companyInfo.address}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Instagram size={16} className="text-amber-400 mt-1 flex-shrink-0" />
                <a 
                  href="https://www.instagram.com/mtj.securite.privee?igsh=MXVyc2ZhbTg1bTV0OQ%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-amber-400 transition-colors"
                >
                  @mtj.securite.privee
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} MTJ Sécurité Privée. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-2">
              <Shield size={16} className="text-amber-400" />
              <span className="text-gray-500 text-sm">
                Agrément CNAPS • Licence professionnelle
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
