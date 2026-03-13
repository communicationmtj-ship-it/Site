import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Domains from "./components/Domains";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Recrutement from "./components/Recrutement";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

// SEO Pages
import AgentSecuritePage from "./pages/seo/AgentSecuritePage";
import CynophilePage from "./pages/seo/CynophilePage";
import CynodexPage from "./pages/seo/CynodexPage";
import SsiapPage from "./pages/seo/SsiapPage";
import EvenementielPage from "./pages/seo/EvenementielPage";
import SurveillanceChantierPage from "./pages/seo/SurveillanceChantierPage";
import ToulonPage from "./pages/seo/ToulonPage";
import BordeauxPage from "./pages/seo/BordeauxPage";
import NiceMonacoPage from "./pages/seo/NiceMonacoPage";
import SudFrancePage from "./pages/seo/SudFrancePage";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Domains />
      <Quote />
      <Contact />
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recrutement" element={<Recrutement />} />
          {/* SEO - Métiers */}
          <Route path="/agent-securite-prevention" element={<AgentSecuritePage />} />
          <Route path="/securite-cynophile-maitre-chien" element={<CynophilePage />} />
          <Route path="/detection-explosifs-cynodex" element={<CynodexPage />} />
          <Route path="/ssiap-securite-incendie" element={<SsiapPage />} />
          <Route path="/securite-evenementielle" element={<EvenementielPage />} />
          <Route path="/surveillance-chantier-site" element={<SurveillanceChantierPage />} />
          {/* SEO - Localisation */}
          <Route path="/securite-privee-toulon" element={<ToulonPage />} />
          <Route path="/securite-privee-bordeaux" element={<BordeauxPage />} />
          <Route path="/securite-privee-nice-monaco" element={<NiceMonacoPage />} />
          <Route path="/securite-privee-sud-france" element={<SudFrancePage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
