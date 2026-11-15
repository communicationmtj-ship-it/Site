import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page de ville (Théo, 15/11/2026 : les pages de villes sortent, sans preuve ni phrase inventée) : tout le
// texte vient du site en ligne, assemblé dans pageLocale.js ; aucune agence ni adresse à Perpignan, siège à Toulon.
const data = pageLocale({
  slug: '/securite-privee-perpignan',
  ville: "Perpignan",
  departement: "Pyrénées-Orientales",
  leDepartement: "les Pyrénées-Orientales",
  code: '66',
  region: "Occitanie",
  voisines: ['/securite-privee-montpellier', '/securite-privee-toulouse', '/securite-privee-nimes'],
});

export default function PerpignanPage() {
  return <SeoPageLayout data={data} />;
}
