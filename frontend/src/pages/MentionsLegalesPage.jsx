// Mentions légales (12/11/2026, complétées le 13/11/2026 sur le choix de Théo « Site mentions: A ton
// nom Kbis ») : société, SIRET, siège, hébergeur et autorisations CNAPS (source : logiciel MTJ) ;
// directeur de la publication, forme, capital, immatriculation et TVA lus dans data/mock.js
// (legalInfo : recopiés de l'extrait Kbis à jour au 3 novembre 2026, TVA vérifiée sur VIES).
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { companyInfo, cnapsCompanies, legalInfo, L612_14 } from '../data/mock';

const Section = ({ title, children }) => (
  <section className="bg-neutral-900 border border-amber-400/10 p-6 lg:p-8">
    <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide text-amber-400 mb-4">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-3 text-sm md:text-base">{children}</div>
  </section>
);

const MentionsLegalesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { privee, rapprochee } = cnapsCompanies;

  return (
    <>
      <SeoHead
        title="Mentions légales | MTJ Sécurité Privée"
        description="Mentions légales du site de MTJ Sécurité Privée : éditeur, directeur de la publication, hébergeur, autorisations CNAPS."
        path="/mentions-legales"
      />
      <Navbar />
      <main className="bg-black min-h-screen pt-20">
        <header className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider uppercase leading-tight text-amber-400">
            Mentions légales
          </h1>
          <div className="w-20 h-1 mt-4 bg-amber-400"></div>
        </header>

        <div className="container mx-auto px-4 lg:px-8 space-y-8 pb-16 max-w-4xl">
          <Section title="Éditeur du site">
            <p>
              Le site mtj-securite-privee.fr est édité par <strong>{privee.name}</strong>, {legalInfo.forme} au
              capital de {legalInfo.capital}.
            </p>
            <ul className="space-y-1" data-testid="mentions-editeur">
              <li>Immatriculation : {legalInfo.rcs}, immatriculée le {legalInfo.immatriculation}</li>
              <li>SIRET : {privee.siret} (SIREN 922 208 202)</li>
              <li>Numéro de TVA intracommunautaire : {legalInfo.tva}</li>
              <li>Siège social : {companyInfo.address}</li>
              <li>
                Téléphone : <a href={companyInfo.phoneHref} className="underline text-amber-400">{companyInfo.phone}</a>
              </li>
              <li>
                Courriel : <a href={companyInfo.emailHref} className="underline text-amber-400">{companyInfo.email}</a>
              </li>
            </ul>
          </Section>

          <Section title="Directeur de la publication">
            <p data-testid="mentions-directeur">Le directeur de la publication est {legalInfo.directeurPublication}.</p>
          </Section>

          <Section title="Hébergeur">
            <p>
              Le site est hébergé par OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.
            </p>
          </Section>

          <Section title="Autorisations d'exercer (CNAPS)">
            <p>
              <strong>{privee.name}</strong> — SIRET {privee.siret} — autorisation d'exercer délivrée par le Conseil national
              des activités privées de sécurité (CNAPS) : {privee.authorization} (activité : {privee.activity}).
            </p>
            <p>
              <strong>{rapprochee.name}</strong> — SIRET {rapprochee.siret} — autorisation d'exercer : {rapprochee.authorization}{' '}
              (activité : {rapprochee.activity}). Les prestations de protection rapprochée sont assurées par cette société.
            </p>
            <p>{L612_14}</p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L'ensemble des contenus du site (textes, logos, images, mise en page) est la propriété de ses éditeurs ou
              utilisé avec l'autorisation de leurs titulaires. Toute reproduction sans autorisation écrite préalable est interdite.
            </p>
          </Section>

          <Section title="Données personnelles et cookies">
            <p>
              Le traitement de vos données personnelles et la gestion de la mesure d'audience sont détaillés dans notre{' '}
              <Link to="/politique-de-confidentialite" className="underline text-amber-400">politique de confidentialité</Link>.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MentionsLegalesPage;
