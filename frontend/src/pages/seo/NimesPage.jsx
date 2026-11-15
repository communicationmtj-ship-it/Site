import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page de ville (Théo, 15/11/2026 : les pages de villes sortent, sans preuve ni phrase inventée) : tout le
// texte vient du site en ligne, assemblé dans pageLocale.js ; aucune agence ni adresse à Nîmes, siège à Toulon.
const data = pageLocale({
  slug: '/securite-privee-nimes',
  ville: "Nîmes",
  departement: "Gard",
  leDepartement: "le Gard",
  code: '30',
  region: "Occitanie",
  voisines: ['/securite-privee-montpellier', '/securite-privee-avignon', '/securite-privee-marseille', '/securite-privee-perpignan'],
});

export default function NimesPage() {
  return <SeoPageLayout data={data} />;
}
