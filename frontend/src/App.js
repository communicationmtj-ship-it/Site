import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Domains from "./components/Domains";
import Quote from "./components/Quote";
import Engagement from "./components/Engagement";
import Footer from "./components/Footer";
import HomeFaq from "./components/HomeFaq";
import FloatingCTA from "./components/FloatingCTA";
import TrackVisit from "./components/TrackVisit";
import CookieBanner from "./components/CookieBanner";
import { Toaster } from "./components/ui/sonner";
import "./App.css";
import { safeJsonLd } from "./utils/safeJsonLd";
import SeoHead from "./components/SeoHead";
import { companyInfo, postalAddressSchema } from "./data/mock";

// Pages chargées à la demande : le code de chaque page (et celui du tableau
// d'administration) n'est plus dans le JavaScript de l'accueil.
const Recrutement = lazy(() => import("./components/Recrutement"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const MentionsLegalesPage = lazy(() => import("./pages/MentionsLegalesPage"));
const ConfidentialitePage = lazy(() => import("./pages/ConfidentialitePage"));
const AgentSecuritePage = lazy(() => import("./pages/seo/AgentSecuritePage"));
const CynophilePage = lazy(() => import("./pages/seo/CynophilePage"));
const CynodexPage = lazy(() => import("./pages/seo/CynodexPage"));
const SsiapPage = lazy(() => import("./pages/seo/SsiapPage"));
const EvenementielPage = lazy(() => import("./pages/seo/EvenementielPage"));
const SurveillanceChantierPage = lazy(() => import("./pages/seo/SurveillanceChantierPage"));
const ToulonPage = lazy(() => import("./pages/seo/ToulonPage"));
const ToulousePage = lazy(() => import("./pages/seo/ToulousePage"));
const NiceMonacoPage = lazy(() => import("./pages/seo/NiceMonacoPage"));
const SudFrancePage = lazy(() => import("./pages/seo/SudFrancePage"));
const SitesIndustrielsPage = lazy(() => import("./pages/seo/SitesIndustrielsPage"));
const ResidentielPage = lazy(() => import("./pages/seo/ResidentielPage"));
const ErpPage = lazy(() => import("./pages/seo/ErpPage"));
const ProtectionRapprocheePage = lazy(() => import("./pages/seo/ProtectionRapprocheePage"));
const GrandDeplacementPage = lazy(() => import("./pages/seo/GrandDeplacementPage"));
const BordeauxPage = lazy(() => import("./pages/seo/BordeauxPage"));

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MTJ Sécurité Privée",
    "url": "https://mtj-securite-privee.fr",
    "logo": "https://mtj-securite-privee.fr/images/logo-mtj.png",
    "description": "Entreprise de sécurité privée spécialisée en agents de sécurité, cynophile, CYNODEX et SSIAP dans le sud de la France ; protection rapprochée par MTJ Sécurité Rapprochée, société du groupe.",
    "telephone": companyInfo.phoneIntl,
    "email": companyInfo.email,
    "address": postalAddressSchema,
    "areaServed": [
      { "@type": "City", "name": "Toulon" },
      { "@type": "City", "name": "Nice" },
      { "@type": "City", "name": "Monaco" },
      { "@type": "City", "name": "Toulouse" },
      { "@type": "AdministrativeArea", "name": "Provence-Alpes-Côte d'Azur" },
      { "@type": "AdministrativeArea", "name": "Occitanie" },
      { "@type": "AdministrativeArea", "name": "Nouvelle-Aquitaine" },
      { "@type": "Country", "name": "France" }
    ],
    "sameAs": [companyInfo.instagramUrl],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de sécurité privée",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Agent de prévention et sécurité", "url": "https://mtj-securite-privee.fr/agent-securite-prevention" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sécurité cynophile et maître-chien", "url": "https://mtj-securite-privee.fr/securite-cynophile-maitre-chien" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CYNODEX - Détection d'explosifs", "url": "https://mtj-securite-privee.fr/detection-explosifs-cynodex" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SSIAP - Sécurité incendie", "url": "https://mtj-securite-privee.fr/ssiap-securite-incendie" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Protection rapprochée", "url": "https://mtj-securite-privee.fr/protection-rapprochee", "provider": { "@type": "Organization", "name": "MTJ Sécurité Rapprochée" } }},
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
    "image": "https://mtj-securite-privee.fr/images/logo-mtj.png",
    "telephone": companyInfo.phoneIntl,
    "email": companyInfo.email,
    "url": "https://mtj-securite-privee.fr",
    "address": postalAddressSchema,
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
        description="MTJ Sécurité Privée : agents de sécurité, cynophile, CYNODEX, SSIAP ; protection rapprochée par MTJ Sécurité Rapprochée, société du groupe. Interventions à Toulon, Nice, Monaco, Toulouse et sur tout le territoire national. Devis gratuit."
        path="/"
      />
      <Navbar />
      <main id="contenu" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Domains />
        <Quote />
        <Engagement />
        <HomeFaq />
      </main>
      <Footer />
      <FloatingCTA />
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

// Lien d'évitement : premier élément atteint au clavier, il mène au contenu principal.
const SkipLink = () => {
  const goToContent = (e) => {
    const main = document.querySelector("main");
    if (!main) return;
    e.preventDefault();
    if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
    main.focus();
    main.scrollIntoView({ block: "start" });
  };
  return (
    <a
      href="#contenu"
      onClick={goToContent}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-amber-400 focus:text-black focus:font-bold focus:px-4 focus:py-2"
    >
      Aller au contenu
    </a>
  );
};

const PageLoading = () => (
  <div className="min-h-screen bg-black" role="status" aria-label="Chargement de la page" />
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SkipLink />
        <TrackVisit />
        <ScrollToHash />
        <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/devis" element={<HomePage />} />
          <Route path="/recrutement" element={<Recrutement />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/politique-de-confidentialite" element={<ConfidentialitePage />} />
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
          <Route path="/securite-privee-bordeaux" element={<BordeauxPage />} />
          {/* SEO - Localisation */}
          <Route path="/securite-privee-toulon" element={<ToulonPage />} />
          <Route path="/securite-privee-toulouse" element={<ToulousePage />} />
          <Route path="/securite-privee-nice-monaco" element={<NiceMonacoPage />} />
          <Route path="/securite-privee-sud-france" element={<SudFrancePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
        <CookieBanner />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
