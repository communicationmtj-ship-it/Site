import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page de ville (Théo, 15/11/2026 : les pages de villes sortent, sans preuve ni phrase inventée) : tout le
// texte vient du site en ligne, assemblé dans pageLocale.js ; aucune agence ni adresse à Avignon, siège à Toulon.
const data = pageLocale({
  slug: '/securite-privee-avignon',
  ville: "Avignon",
  departement: "Vaucluse",
  leDepartement: "le Vaucluse",
  code: '84',
  region: "Provence-Alpes-Côte d'Azur",
  voisines: ['/securite-privee-marseille', '/securite-privee-nimes', '/securite-privee-grenoble', '/securite-privee-toulon'],
});

export default function AvignonPage() {
  return <SeoPageLayout data={data} />;
}
