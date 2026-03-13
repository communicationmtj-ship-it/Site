import { useEffect } from 'react';

const BASE_URL = 'https://mtj-securite-privee.fr';
const DEFAULT_IMAGE = 'https://customer-assets.emergentagent.com/job_business-profile-21/artifacts/bk499w0o_IMG_0028-removebg-preview.png';

const SeoHead = ({ title, description, path = '/', image }) => {
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
