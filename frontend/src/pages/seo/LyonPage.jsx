import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page de ville (Théo, 15/11/2026 : les pages de villes sortent, sans preuve ni phrase inventée) : tout le
// texte vient du site en ligne, assemblé dans pageLocale.js ; aucune agence ni adresse à Lyon, siège à Toulon.
const data = pageLocale({
  slug: '/securite-privee-lyon',
  ville: "Lyon",
  departement: "Rhône",
  leDepartement: "le Rhône",
  code: '69',
  region: "Auvergne-Rhône-Alpes",
  voisines: ['/securite-privee-annecy', '/securite-privee-grenoble', '/securite-privee-avignon'],
});

export default function LyonPage() {
  return <SeoPageLayout data={data} />;
}
