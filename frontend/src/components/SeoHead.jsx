import { createContext, useContext, useEffect } from 'react';

const BASE_URL = 'https://mtj-securite-privee.fr';
const DEFAULT_IMAGE = 'https://mtj-securite-privee.fr/images/logo-mtj.png';

// Pré-rendu des pages publiques (choix de Théo du 13/11/2026, « pré-rendu Google ») : à la
// construction de l'image, scripts/prerender.js rend chaque page sans navigateur, donc sans effet ;
// il fournit ce collecteur pour recevoir le titre, la description et l'adresse canonique de la page
// et les écrire dans la tête de son HTML. Dans le navigateur, aucun collecteur : rien ne change.
export const SeoCollecteur = createContext(null);

const SeoHead = ({ title, description, path = '/', image }) => {
  const collecteur = useContext(SeoCollecteur);
  if (collecteur) {
    collecteur({ title, description, path, url: `${BASE_URL}${path}`, image: image || DEFAULT_IMAGE });
  }

  useEffect(() => {
    const fullUrl = `${BASE_URL}${path}`;
    const img = image || DEFAULT_IMAGE;

    document.title = title;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('name', 'description', description);
    setLink('canonical', fullUrl);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', 'fr_FR');
    setMeta('property', 'og:site_name', 'MTJ Sécurité Privée');

    // Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
    setMeta('name', 'twitter:card', 'summary_large_image');
  }, [title, description, path, image]);

  return null;
};

export default SeoHead;
