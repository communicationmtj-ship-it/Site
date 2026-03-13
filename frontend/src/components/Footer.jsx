import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { companyInfo } from '../data/mock';

const INSTAGRAM_URL = "https://www.instagram.com/mtj.securite.privee?igsh=MXVyc2ZhbTg1bTV0OQ%3D%3D&utm_source=qr";

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
      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* Company header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
          <img
            src="https://customer-assets.emergentagent.com/job_business-profile-21/artifacts/bk499w0o_IMG_0028-removebg-preview.png"
            alt="MTJ Sécurité Privée"
            className="h-14 w-auto object-contain"
          />
          <div className="text-gray-500 text-[10px] max-w-xs text-right leading-relaxed hidden md:block">
            <p className="font-semibold text-amber-400 text-xs mb-1">AUT -083-2024-05-22-2024084324</p>
            <p>L612-14 du CSI L'autorisation administrative préalable ne confère aucun caractère officiel à l'entreprise ou aux personnes qui en bénéficient.</p>
          </div>
        </div>

        {/* 4 columns on same line */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Navigation */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wide mb-3 text-xs">
              Navigation
            </h4>
            <ul className="space-y-1.5">
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
                    className="text-gray-400 hover:text-amber-400 transition-colors text-xs"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos Services */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wide mb-3 text-xs">
              Nos Services
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/agent-securite-prevention" className="text-gray-400 hover:text-amber-400 transition-colors">Agent de sécurité</Link></li>
              <li><Link to="/securite-cynophile-maitre-chien" className="text-gray-400 hover:text-amber-400 transition-colors">Cyno d'intervention</Link></li>
              <li><Link to="/detection-explosifs-cynodex" className="text-gray-400 hover:text-amber-400 transition-colors">CYNODEX</Link></li>
              <li><Link to="/ssiap-securite-incendie" className="text-gray-400 hover:text-amber-400 transition-colors">SSIAP</Link></li>
              <li><Link to="/securite-evenementielle" className="text-gray-400 hover:text-amber-400 transition-colors">Événementiel</Link></li>
              <li><Link to="/surveillance-chantier-site" className="text-gray-400 hover:text-amber-400 transition-colors">Chantiers</Link></li>
              <li><Link to="/securite-sites-industriels-commerciaux" className="text-gray-400 hover:text-amber-400 transition-colors">Sites industriels</Link></li>
              <li><Link to="/securite-residentielle" className="text-gray-400 hover:text-amber-400 transition-colors">Résidentiel</Link></li>
              <li><Link to="/securite-erp-etablissements-public" className="text-gray-400 hover:text-amber-400 transition-colors">ERP</Link></li>
            </ul>
          </div>

          {/* Zones d'intervention */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wide mb-3 text-xs">
              Zones d'intervention
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/securite-privee-toulon" className="text-gray-400 hover:text-amber-400 transition-colors">Toulon (83)</Link></li>
              <li><Link to="/securite-privee-toulouse" className="text-gray-400 hover:text-amber-400 transition-colors">Toulouse (31)</Link></li>
              <li><Link to="/securite-privee-nice-monaco" className="text-gray-400 hover:text-amber-400 transition-colors">Nice & Monaco (06)</Link></li>
              <li><Link to="/securite-privee-sud-france" className="text-gray-400 hover:text-amber-400 transition-colors">Sud de la France</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wide mb-3 text-xs">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Phone size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs">{companyInfo.phone}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs break-all">{companyInfo.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs">{companyInfo.address}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Instagram size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-xs hover:text-amber-400 transition-colors"
                >
                  @mtj.securite.privee
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Instagram Feed Preview */}
        <div className="border-t border-gray-800 pt-8 mb-8" data-testid="instagram-feed">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mb-5 group"
          >
            <Instagram size={20} className="text-amber-400" />
            <span className="text-white font-bold text-sm uppercase tracking-wider">@mtj.securite.privee</span>
            <span className="text-gray-500 text-xs ml-auto group-hover:text-amber-400 transition-colors">Suivez-nous sur Instagram &rarr;</span>
          </a>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {[
              { img: "https://images.unsplash.com/photo-1582510810295-bf11cd55dd6a?w=300&h=300&fit=crop", alt: "Maître-chien en patrouille" },
              { img: "https://images.unsplash.com/photo-1669822308470-09f3f3e8d4a2?w=300&h=300&fit=crop", alt: "Chien de sécurité" },
              { img: "https://images.unsplash.com/photo-1689969599825-40b9a4e6cecc?w=300&h=300&fit=crop", alt: "Caméra de surveillance" },
              { img: "https://images.unsplash.com/photo-1515432085503-cabf2fbcd690?w=300&h=300&fit=crop", alt: "Vidéosurveillance" },
              { img: "https://images.unsplash.com/photo-1663380690572-2e9fbb857807?w=300&h=300&fit=crop", alt: "Patrouille de nuit" },
            ].map((item, i) => (
              <a
                key={i}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative aspect-square overflow-hidden group border border-amber-400/10 hover:border-amber-400/40 transition-all ${i >= 3 ? (i >= 4 ? 'hidden md:block' : 'hidden sm:block') : ''}`}
              >
                <img src={item.img} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-100" loading="lazy" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300"></div>
              </a>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square bg-neutral-900 border border-amber-400/10 overflow-hidden hover:border-amber-400/40 transition-all hidden md:flex items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center h-full w-full">
                <Instagram size={28} className="text-amber-400 mb-2" />
                <p className="text-[10px] text-amber-400 font-semibold">Voir plus</p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-500 text-xs text-center md:text-left">
              © {currentYear} MTJ Sécurité Privée. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-2">
              <Shield size={14} className="text-amber-400" />
              <span className="text-gray-500 text-xs">
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
