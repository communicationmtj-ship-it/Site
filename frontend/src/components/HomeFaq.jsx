import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { safeJsonLd } from '../utils/safeJsonLd';
import { companyInfo } from '../data/mock';
import { SECTEUR } from '../data/perimetre';

// 15/11/2026 (règle de Théo : « soit tu met pas soit tu laisse ce qui etait ») : réponses du site en ligne,
// sauf le secteur (13/11/2026, « Site perimetre: A partout »), l'adresse e-mail (13/11/2026, « Site email:
// A contact OVH ») et le CYNODEX, diplôme du maître-chien de détection d'explosifs (Théo, 15/11/2026).
// Seul le groupe de mots « sud de la France » (avec sa préposition) est remplacé : la liste de villes qui le suit
// (Monaco compris, Théo, 15/11/2026 06:11 : « Monaco delais: Garder les deux ») reste mot pour mot.

const faqs = [
  {
    question: "Qu'est-ce que MTJ Sécurité Privée ?",
    answer: `MTJ Sécurité Privée est une entreprise de sécurité privée basée à Toulon (Var), spécialisée dans la surveillance, le gardiennage, la sécurité cynophile, le SSIAP, la protection rapprochée et la détection d'explosifs (CYNODEX). Nous intervenons sur tout le territoire national avec une présence forte ${SECTEUR} (Toulon, Nice, Monaco, Toulouse, Bordeaux).`
  },
  {
    question: "Vos agents sont-ils certifiés CNAPS ?",
    answer: "Oui. Tous nos agents sont titulaires de la carte professionnelle délivrée par le CNAPS (Conseil National des Activités Privées de Sécurité), obligatoire pour exercer dans la sécurité privée en France. Nos agents cynophiles sont également certifiés et nos équipes SSIAP sont diplômées."
  },
  {
    question: "Dans quelles villes MTJ Sécurité Privée intervient-elle ?",
    answer: `MTJ Sécurité Privée intervient principalement à Toulon, Nice, Monaco, Marseille, Toulouse et Bordeaux. Nous couvrons ${SECTEUR}. Pour des missions ponctuelles, nous intervenons sur tout le territoire national.`
  },
  {
    question: "Comment obtenir un devis pour une mission de sécurité ?",
    answer: `Pour obtenir un devis gratuit et personnalisé, vous pouvez nous contacter par téléphone au 07 60 73 82 06, par email à ${companyInfo.email}, ou via notre formulaire de devis en ligne. Nous vous répondons sous 24h et établissons une proposition adaptée à vos besoins.`
  },
  {
    question: "MTJ Sécurité Privée propose-t-elle la sécurité événementielle ?",
    answer: "Oui. Nous assurons la sécurisation de tout type d'événement : concerts, festivals, matchs sportifs, salons professionnels, soirées privées, mariages. Nos agents événementiels sont formés aux spécificités des Établissements Recevant du Public (ERP) et à la gestion des flux de personnes."
  },
  {
    question: "Qu'est-ce que le CYNODEX proposé par MTJ Sécurité Privée ?",
    answer: "Le CYNODEX est le diplôme du maître-chien de détection d'engins explosifs improvisés par des chiens dressés. Nos maîtres-chiens diplômés CYNODEX interviennent pour sécuriser des événements sensibles, des sites stratégiques et des infrastructures critiques. C'est une compétence rare dans le secteur de la sécurité privée."
  }
];

const HomeFaq = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-wider uppercase mb-4">
            QUESTIONS <span className="text-amber-400">FRÉQUENTES</span>
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-amber-400/20 bg-neutral-900">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white group-hover:text-amber-400 transition-colors pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={open === i ? "text-amber-400 flex-shrink-0 rotate-180 transition-transform duration-200" : "text-amber-400 flex-shrink-0 transition-transform duration-200"}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(f => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer }
            }))
          })
        }}
      />
    </section>
  );
};

export default HomeFaq;
