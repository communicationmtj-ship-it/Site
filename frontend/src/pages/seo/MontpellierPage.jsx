import React from 'react';
import SeoPageLayout from './SeoPageLayout';
import { pageLocale } from './pageLocale';

// Page de ville (Théo, 15/11/2026 : les pages de villes sortent, sans preuve ni phrase inventée) : tout le
// texte vient du site en ligne, assemblé dans pageLocale.js ; aucune agence ni adresse à Montpellier, siège à Toulon.
const data = pageLocale({
  slug: '/securite-privee-montpellier',
  ville: "Montpellier",
  departement: "Hérault",
  leDepartement: "l'Hérault",
  code: '34',
  region: "Occitanie",
  voisines: ['/securite-privee-nimes', '/securite-privee-perpignan', '/securite-privee-toulouse', '/securite-privee-marseille'],
});

export default function MontpellierPage() {
  return <SeoPageLayout data={data} />;
}
