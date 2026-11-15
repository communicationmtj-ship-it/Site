import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page de ville (Théo, 15/11/2026 : les pages de villes sortent, sans preuve ni phrase inventée) : tout le
// texte vient du site en ligne, assemblé dans pageLocale.js ; aucune agence ni adresse à Grenoble, siège à Toulon.
const data = pageLocale({
  slug: '/securite-privee-grenoble',
  ville: "Grenoble",
  departement: "Isère",
  leDepartement: "l'Isère",
  code: '38',
  region: "Auvergne-Rhône-Alpes",
  voisines: ['/securite-privee-lyon', '/securite-privee-annecy', '/securite-privee-avignon'],
});

export default function GrenoblePage() {
  return <SeoPageLayout data={data} />;
}
