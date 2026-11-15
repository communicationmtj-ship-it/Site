import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { companyInfo, cnapsCompanies, L612_14 } from '../data/mock';
import { PAGES_LOCALES, PAGE_SECTEUR, libelleMenu } from '../data/perimetre';

const INSTAGRAM_URL = companyInfo.instagramUrl;

// Vignettes Instagram servies par le site lui-même (frontend/public/images/instagram),
// en WebP avec repli JPEG : elles ne dépendent plus du serveur des formulaires (site-016).
const INSTAGRAM_POSTS = [
  { file: 'post1', alt: "Sécurité privée - Protection" },
  { file: 'post2', alt: "Devise MTJ - Force et Honneur" },
  { file: 'post3', alt: "Charte qualité MTJ Sécurité" },
  { file: 'post4', alt: "Mission Marché de Noël Annecy" },
  { file: 'post5', alt: "Mission Stade Allianz Riviera Nice" },
  { file: 'post6', alt: "Événement Ecausystème Gignac" },
];

// Fiches Google : liens seulement. Les notes et nombres d'avis écrits à la main ne se
// mettaient pas à jour (audit du 30/10/2026, site-088) ; les adresses sont nettoyées des
// paramètres copiés depuis Safari (site-132).
const GOOGLE_PLACES = [
  {
    name: "MTJ Sécurité Privée — Toulon",
    url: "https://www.google.com/search?kgmid=%2Fg%2F11wbyvpprw&q=MTJ+S%C3%A9curit%C3%A9+Priv%C3%A9e&hl=fr",
  },
  {
    name: "MTJ Sécurité Privée — Nîmes",
    url: "https://www.google.com/search?kgmid=%2Fg%2F11x18fs_43&q=MTJ+S%C3%A9curit%C3%A9+Priv%C3%A9e&hl=fr",
  },
  {
    name: "MTJ Sécurité Rapprochée",
    url: "https://www.google.com/search?kgmid=%2Fg%2F11mk__hkfx&q=MTJ+S%C3%A9curit%C3%A9+Rapproch%C3%A9e&hl=fr",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  // Sur la page Protection rapprochée, la société qui contracte est MTJ Sécurité Rapprochée.
  const onRapprochee = location.pathname.startsWith('/protection-rapprochee');
  const cnapsOrder = onRapprochee
    ? [cnapsCompanies.rapprochee, cnapsCompanies.privee]
    : [cnapsCompanies.privee, cnapsCompanies.rapprochee];

  // Fonctionne sur l'accueil comme sur les sous-pages.
  const goToSection = (event, sectionId) => {
    event.preventDefault();
    const scroll = () => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    };
    if (location.pathname === '/') {
      scroll();
    } else {
      navigate('/');
      setTimeout(scroll, 150);
    }
  };

  const openCookieChoice = () => {
    window.dispatchEvent(new CustomEvent('mtj-open-cookie-banner'));
  };

  return (
    <footer className="bg-black border-t border-amber-400/20">
      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* Company header */}
        <div className="flex items-center justify-between mb-6">
          <picture>
            <source srcSet="/images/logo-mtj.webp" type="image/webp" />
            <img
              src="/images/logo-mtj.png"
              alt="MTJ Sécurité Privée"
              className="h-14 w-auto object-contain"
            />
          </picture>
        </div>

        {/* Bloc CNAPS unique : quelle autorisation pour quelle société */}
        <div className="mb-8 pb-6 border-b border-gray-800 text-gray-400 text-[11px] leading-relaxed" data-testid="cnaps-block">
          <div className="grid sm:grid-cols-2 gap-4 mb-3">
            {cnapsOrder.map((co) => (
              <p key={co.authorization}>
                <span className="block font-semibold text-amber-400 text-xs">{co.name}</span>
                SIRET {co.siret}<br />
                Autorisation d'exercer CNAPS ({co.activity}) : {co.authorization}
              </p>
            ))}
          </div>
          <p>{L612_14}</p>
        </div>

        {/* 4 columns on same line */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Navigation */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wide mb-3 text-xs">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors text-xs">Accueil</Link>
              </li>
              {[
                { label: 'À propos', id: 'about' },
                { label: 'Nos métiers', id: 'services' },
                { label: 'Interventions', id: 'domains' },
                { label: 'Devis', id: 'quote' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(e) => goToSection(e, link.id)}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors text-xs">Contact</Link>
              </li>
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
              <li><Link to="/protection-rapprochee" className="text-gray-400 hover:text-amber-400 transition-colors">Protection rapprochée</Link></li>
              <li><Link to="/securite-evenementielle" className="text-gray-400 hover:text-amber-400 transition-colors">Événementiel</Link></li>
              <li><Link to="/surveillance-chantier-site" className="text-gray-400 hover:text-amber-400 transition-colors">Chantiers</Link></li>
              <li><Link to="/securite-sites-industriels-commerciaux" className="text-gray-400 hover:text-amber-400 transition-colors">Sites industriels</Link></li>
              <li><Link to="/securite-residentielle" className="text-gray-400 hover:text-amber-400 transition-colors">Résidentiel</Link></li>
              <li><Link to="/securite-erp-etablissements-public" className="text-gray-400 hover:text-amber-400 transition-colors">ERP</Link></li>
            </ul>
          </div>

          {/* Zones d'intervention : tout le secteur, une page locale par grande ville (data/perimetre.js).
              13/11/2026 (choix de Théo, « Site perimetre: A partout ») : Bordeaux y figure, comme au menu. */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wide mb-3 text-xs">
              Zones d'intervention
            </h4>
            <ul className="space-y-1.5 text-xs" data-testid="footer-zones">
              {PAGES_LOCALES.map((page) => (
                <li key={page.slug}>
                  <Link to={page.slug} className="text-gray-400 hover:text-amber-400 transition-colors">{libelleMenu(page)}</Link>
                </li>
              ))}
              <li><Link to={PAGE_SECTEUR.slug} className="text-gray-400 hover:text-amber-400 transition-colors">{PAGE_SECTEUR.libelle}</Link></li>
              <li><Link to="/grand-deplacement-securite-france" className="text-gray-400 hover:text-amber-400 transition-colors">Grand déplacement national</Link></li>
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
                <a href={companyInfo.phoneHref} className="text-gray-400 text-xs hover:text-amber-400 transition-colors">{companyInfo.phone}</a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <a href={companyInfo.emailHref} className="text-gray-400 text-xs break-all hover:text-amber-400 transition-colors">{companyInfo.email}</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <a
                  href={companyInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-xs hover:text-amber-400 transition-colors"
                >
                  {companyInfo.address}
                </a>
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
            <span className="text-gray-400 text-xs ml-auto group-hover:text-amber-400 transition-colors">Suivez-nous sur Instagram &rarr;</span>
          </a>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {INSTAGRAM_POSTS.map((item) => (
              <a
                key={item.file}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group border border-amber-400/10 hover:border-amber-400/40 transition-all"
              >
                <picture className="block w-full h-full">
                  <source srcSet={`/images/instagram/${item.file}.webp`} type="image/webp" />
                  <img
                    src={`/images/instagram/${item.file}.jpg`}
                    alt={item.alt}
                    width="400"
                    height="500"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-100"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Fiches Google (liens seulement, sans note ni nombre d'avis écrits à la main) */}
        <div className="border-t border-gray-800 pt-8 mb-8" data-testid="google-reviews">
          <div className="flex items-center gap-2 mb-5">
            <svg viewBox="0 0 24 24" width="20" height="20" className="flex-shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-white font-bold text-sm uppercase tracking-wider">Nos fiches Google</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {GOOGLE_PLACES.map((place) => (
              <a
                key={place.name}
                href={place.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-3 border border-amber-400/10 hover:border-amber-400/30 bg-amber-400/[0.03] hover:bg-amber-400/[0.06] transition-all group"
                data-testid={`google-review-${place.name}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate group-hover:text-amber-400 transition-colors">{place.name}</p>
                  <p className="text-gray-400 text-xs mt-1">Avis et coordonnées sur Google</p>
                </div>
                <span className="text-gray-400 text-xs group-hover:text-amber-400 transition-colors whitespace-nowrap">Voir &rarr;</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 space-y-3">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            <li><Link to="/mentions-legales" className="text-gray-400 hover:text-amber-400 transition-colors">Mentions légales</Link></li>
            <li><Link to="/politique-de-confidentialite" className="text-gray-400 hover:text-amber-400 transition-colors">Politique de confidentialité</Link></li>
            <li>
              <button type="button" onClick={openCookieChoice} className="text-gray-400 hover:text-amber-400 transition-colors" data-testid="cookie-manage">
                Gérer mes choix de mesure d'audience
              </button>
            </li>
          </ul>
          {/* L'année est écrite à la construction dans la page pré-rendue, puis par le navigateur :
              un écart le 1er janvier ne doit pas faire refaire la page (pré-rendu du 15/11/2026). */}
          <p className="text-gray-400 text-xs text-center" suppressHydrationWarning>
            © {currentYear} MTJ Sécurité Privée. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
