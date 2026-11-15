import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page de ville (Théo, 15/11/2026 : les pages de villes sortent, sans preuve ni phrase inventée) : tout le
// texte vient du site en ligne, assemblé dans pageLocale.js ; aucune agence ni adresse à Annecy, siège à Toulon.
const data = pageLocale({
  slug: '/securite-privee-annecy',
  ville: "Annecy",
  departement: "Haute-Savoie",
  leDepartement: "la Haute-Savoie",
  code: '74',
  region: "Auvergne-Rhône-Alpes",
  voisines: ['/securite-privee-lyon', '/securite-privee-grenoble'],
});

export default function AnnecyPage() {
  return <SeoPageLayout data={data} />;
}
