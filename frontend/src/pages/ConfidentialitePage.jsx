// Brouillon à valider par la direction avant mise en ligne (12/11/2026).
// Les durées de conservation (3 ans, 2 ans, 13 mois) sont des propositions : à confirmer par la direction.
// Elles doivent rester identiques à celles annoncées dans Contact.jsx, ContactPage.jsx et Recrutement.jsx.
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { companyInfo } from '../data/mock';

const Section = ({ title, children }) => (
  <section className="bg-neutral-900 border border-amber-400/10 p-6 lg:p-8">
    <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide text-amber-400 mb-4">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-3 text-sm md:text-base">{children}</div>
  </section>
);

const ConfidentialitePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SeoHead
        title="Politique de confidentialité | MTJ Sécurité Privée"
        description="Politique de confidentialité du site de MTJ Sécurité Privée : données collectées, finalités, durées de conservation, vos droits."
        path="/politique-de-confidentialite"
      />
      <Navbar />
      <main className="bg-black min-h-screen pt-20">
        <header className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider uppercase leading-tight text-amber-400">
            Politique de confidentialité
          </h1>
          <div className="w-20 h-1 mt-4 bg-amber-400"></div>
        </header>

        <div className="container mx-auto px-4 lg:px-8 space-y-8 pb-16 max-w-4xl">
          <Section title="Qui est responsable de vos données ?">
            <p>
              Le responsable du traitement est <strong>MTJ SÉCURITÉ PRIVÉE</strong> (SIRET 922 208 202 00015),
              {' '}{companyInfo.address}. Pour toute question sur vos données :{' '}
              <a href={companyInfo.emailHref} className="underline text-amber-400">{companyInfo.email}</a>.
            </p>
          </Section>

          <Section title="Pourquoi et comment nous utilisons vos données">
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Demande de devis</strong> : nom, société, adresse e-mail, téléphone, type de prestation, message et
                pièce jointe éventuelle. Finalité : étudier votre besoin et vous répondre. Base légale : mesures
                précontractuelles prises à votre demande. Durée : 3 ans après notre dernier échange.
              </li>
              <li>
                <strong>Formulaire de contact</strong> : nom, adresse e-mail, téléphone (facultatif), sujet, message et pièce
                jointe éventuelle. Finalité : répondre à votre message. Base légale : votre consentement (case à cocher).
                Durée : 3 ans après notre dernier échange.
              </li>
              <li>
                <strong>Candidatures</strong> : prénom, nom, adresse e-mail, téléphone, message de motivation, CV et documents
                joints. Finalité : étudier votre candidature et vous recontacter. Base légale : votre consentement (case à
                cocher). Durée : 2 ans après notre dernier échange, puis suppression. Merci de ne pas joindre de numéro de
                sécurité sociale, de RIB ni d'information de santé.
              </li>
              <li>
                <strong>Mesure d'audience</strong> (uniquement si vous cliquez sur « Accepter » dans le bandeau) : page visitée,
                site d'origine de la visite, adresse IP, navigateur, pays et ville déduits de l'adresse IP. Finalité :
                connaître la fréquentation du site pour l'améliorer. Base légale : votre consentement. Durée : 13 mois.
                Pour déduire le pays et la ville, l'adresse IP est transmise à un service de géolocalisation tiers. Sans
                votre accord, aucune mesure n'est effectuée.
              </li>
            </ul>
          </Section>

          <Section title="Cookies et stockage dans votre navigateur">
            <p>
              Le site ne dépose aucun cookie de suivi ni de publicité. Votre choix dans le bandeau est mémorisé dans le stockage local
              de votre navigateur afin de ne pas vous le redemander à chaque page. Vous pouvez le modifier à tout moment avec le
              lien « Gérer mes choix de mesure d'audience » en bas de chaque page.
            </p>
          </Section>

          <Section title="Qui voit vos données ?">
            <p>
              Vos données sont destinées uniquement aux personnes habilitées de MTJ Sécurité Privée (direction, service
              commercial pour les devis et contacts, ressources humaines pour les candidatures). Elles ne sont ni vendues ni
              cédées. Elles sont traitées par nos prestataires techniques d'hébergement et de messagerie, dans le cadre de leurs
              missions, et peuvent être communiquées aux autorités compétentes lorsque la loi l'exige.
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation ou l'opposition à leur
              traitement, ainsi que leur portabilité. Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à
              tout moment, sans effet sur ce qui a été fait avant. Pour exercer vos droits, écrivez à{' '}
              <a href={companyInfo.emailHref} className="underline text-amber-400">{companyInfo.email}</a> ; nous répondons dans
              un délai d'un mois.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL
              (Commission nationale de l'informatique et des libertés), 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline text-amber-400">www.cnil.fr</a>.
            </p>
          </Section>

          <p className="text-gray-500 text-sm">
            Voir aussi nos <Link to="/mentions-legales" className="underline text-amber-400">mentions légales</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ConfidentialitePage;
