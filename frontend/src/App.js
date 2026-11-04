import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Domains from "./components/Domains";
import Quote from "./components/Quote";
import Engagement from "./components/Engagement";
import Footer from "./components/Footer";
import Recrutement from "./components/Recrutement";
import ContactPage from "./components/ContactPage";
import TrackVisit from "./components/TrackVisit";
import CookieBanner from "./components/CookieBanner";
import { Toaster } from "./components/ui/sonner";
import "./App.css";
import { safeJsonLd } from "./utils/safeJsonLd";

// SEO Pages
import AgentSecuritePage from "./pages/seo/AgentSecuritePage";
import CynophilePage from "./pages/seo/CynophilePage";
import CynodexPage from "./pages/seo/CynodexPage";
import SsiapPage from "./pages/seo/SsiapPage";
import EvenementielPage from "./pages/seo/EvenementielPage";
import SurveillanceChantierPage from "./pages/seo/SurveillanceChantierPage";
import ToulonPage from "./pages/seo/ToulonPage";
import ToulousePage from "./pages/seo/ToulousePage";
import NiceMonacoPage from "./pages/seo/NiceMonacoPage";
import SudFrancePage from "./pages/seo/SudFrancePage";
import SitesIndustrielsPage from "./pages/seo/SitesIndustrielsPage";
import ResidentielPage from "./pages/seo/ResidentielPage";
import ErpPage from "./pages/seo/ErpPage";
import ProtectionRapprocheePage from "./pages/seo/ProtectionRapprocheePage";
import GrandDeplacementPage from "./pages/seo/GrandDeplacementPage";
import Dashboard from "./pages/Dashboard";
import SeoHead from "./components/SeoHead";

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MTJ Sécurité Privée",
    "url": "https://mtj-securite-privee.fr",
    "logo": "https://customer-assets.emergentagent.com/job_business-profile-21/artifacts/bk499w0o_IMG_0028-removebg-preview.png",
    "description": "Entreprise de sécurité privée spécialisée en agents de sécurité, cynophile, CYNODEX, SSIAP et protection rapprochée dans le sud de la France.",
    "telephone": "+33760738206",
    "email": "contactsmtjsecuriteprivee@gmail.com",
    "address": { "@type": "PostalAddress", "streetAddress": "31 rue Chevalier Paul", "addressLocality": "Toulon", "postalCode": "83000", "addressRegion": "Provence-Alpes-Côte d'Azur", "addressCountry": "FR" },
    "areaServed": [
      { "@type": "City", "name": "Toulon" },
      { "@type": "City", "name": "Nice" },
      { "@type": "City", "name": "Monaco" },
      { "@type": "City", "name": "Toulouse" },
      { "@type": "AdministrativeArea", "name": "Provence-Alpes-Côte d'Azur" },
      { "@type": "AdministrativeArea", "name": "Occitanie" },
      { "@type": "Country", "name": "France" }
    ],
    "sameAs": ["https://www.instagram.com/mtj.securite.privee"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de sécurité privée",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Agent de prévention et sécurité", "url": "https://mtj-securite-privee.fr/agent-securite-prevention" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sécurité cynophile et maître-chien", "url": "https://mtj-securite-privee.fr/securite-cynophile-maitre-chien" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CYNODEX - Détection d'explosifs", "url": "https://mtj-securite-privee.fr/detection-explosifs-cynodex" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SSIAP - Sécurité incendie", "url": "https://mtj-securite-privee.fr/ssiap-securite-incendie" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Protection rapprochée", "url": "https://mtj-securite-privee.fr/protection-rapprochee" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sécurité événementielle", "url": "https://mtj-securite-privee.fr/securite-evenementielle" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Surveillance de chantiers", "url": "https://mtj-securite-privee.fr/surveillance-chantier-site" }}
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mtj-securite-privee.fr/#localbusiness",
    "name": "MTJ Sécurité Privée",
    "image": "https://customer-assets.emergentagent.com/job_business-profile-21/artifacts/bk499w0o_IMG_0028-removebg-preview.png",
    "telephone": "+33760738206",
    "email": "contactsmtjsecuriteprivee@gmail.com",
    "url": "https://mtj-securite-privee.fr",
    "address": { "@type": "PostalAddress", "streetAddress": "31 rue Chevalier Paul", "addressLocality": "Toulon", "postalCode": "83000", "addressRegion": "PACA", "addressCountry": "FR" },
    "geo": { "@type": "GeoCoordinates", "latitude": 43.1242, "longitude": 5.9280 },
    "priceRange": "$$",
    "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "00:00", "closes": "23:59" }
  }
];

const HomePage = () => {
  return (
    <>
      <SeoHead
        title="MTJ Sécurité Privée | Sécurité, Gardiennage, Cynophile | Toulon, Nice, Toulouse"
        description="MTJ Sécurité Privée : agents de sécurité, cynophile, CYNODEX, SSIAP, protection rapprochée. Interventions à Toulon, Nice, Monaco, Toulouse et sur tout le territoire national. Devis gratuit."
        path="/"
      />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Domains />
      <Quote />
      <Engagement />
      <Footer />
      {homeSchema.map((schema, i) => (
        <script key={`schema-${schema['@type']}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
      ))}
    </>
  );
};

// Le site se construit après le chargement : un lien vers /devis ou vers une ancre
// (#quote…) doit attendre que la section existe avant d'y descendre.
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = pathname === "/devis" ? "quote" : decodeURIComponent(hash.replace("#", ""));
    if (!target) return undefined;
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(target);
      tries += 1;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(timer);
      } else if (tries >= 50) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [pathname, hash]);
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TrackVisit />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/devis" element={<HomePage />} />
          <Route path="/recrutement" element={<Recrutement />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* SEO - Métiers */}
          <Route path="/agent-securite-prevention" element={<AgentSecuritePage />} />
          <Route path="/securite-cynophile-maitre-chien" element={<CynophilePage />} />
          <Route path="/detection-explosifs-cynodex" element={<CynodexPage />} />
          <Route path="/ssiap-securite-incendie" element={<SsiapPage />} />
          <Route path="/securite-evenementielle" element={<EvenementielPage />} />
          <Route path="/surveillance-chantier-site" element={<SurveillanceChantierPage />} />
          <Route path="/securite-sites-industriels-commerciaux" element={<SitesIndustrielsPage />} />
          <Route path="/securite-residentielle" element={<ResidentielPage />} />
          <Route path="/securite-erp-etablissements-public" element={<ErpPage />} />
          <Route path="/protection-rapprochee" element={<ProtectionRapprocheePage />} />
          <Route path="/grand-deplacement-securite-france" element={<GrandDeplacementPage />} />
          {/* SEO - Localisation */}
          <Route path="/securite-privee-toulon" element={<ToulonPage />} />
          <Route path="/securite-privee-toulouse" element={<ToulousePage />} />
          <Route path="/securite-privee-nice-monaco" element={<NiceMonacoPage />} />
          <Route path="/securite-privee-sud-france" element={<SudFrancePage />} />
        </Routes>
        <CookieBanner />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
