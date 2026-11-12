import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Page affichée pour toute adresse inconnue. Elle demande aux moteurs de recherche
// de ne pas l'indexer (le vrai code HTTP 404 se règle côté serveur web).
const NotFoundPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page introuvable | MTJ Sécurité Privée";
    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;
    const previousContent = robots ? robots.getAttribute("content") : null;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
      if (created) {
        robots.remove();
      } else if (previousContent !== null) {
        robots.setAttribute("content", previousContent);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="contenu" tabIndex={-1} className="bg-black min-h-screen pt-32 pb-20" data-testid="not-found-page">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
          <p className="text-amber-400 font-black text-6xl mb-4">404</p>
          <h1 className="text-3xl font-bold text-white mb-4">Page introuvable</h1>
          <p className="text-gray-300 mb-8">
            La page que vous cherchez n&apos;existe pas ou a été déplacée. Vous pouvez revenir à
            l&apos;accueil ou nous contacter directement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-amber-400 text-black font-bold px-6 py-3 uppercase tracking-wider hover:bg-amber-300 transition-colors"
              data-testid="not-found-home"
            >
              <ArrowLeft size={18} aria-hidden="true" /> Retour à l&apos;accueil
            </Link>
            <a
              href="tel:+33760738206"
              className="inline-flex items-center gap-2 border border-amber-400/40 text-amber-400 px-6 py-3 hover:bg-amber-400/10 transition-colors"
            >
              <Phone size={18} aria-hidden="true" /> 07 60 73 82 06
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;
