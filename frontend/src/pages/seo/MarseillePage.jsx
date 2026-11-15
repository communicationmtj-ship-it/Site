import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page de ville (Théo, 15/11/2026 : les pages de villes sortent, sans preuve ni phrase inventée) : tout le
// texte vient du site en ligne, assemblé dans pageLocale.js ; aucune agence ni adresse à Marseille, siège à Toulon.
const data = pageLocale({
  slug: '/securite-privee-marseille',
  ville: "Marseille",
  departement: "Bouches-du-Rhône",
  leDepartement: "les Bouches-du-Rhône",
  code: '13',
  region: "Provence-Alpes-Côte d'Azur",
  voisines: ['/securite-privee-toulon', '/securite-privee-avignon', '/securite-privee-nice-monaco', '/securite-privee-nimes'],
});

export default function MarseillePage() {
  return <SeoPageLayout data={data} />;
}
