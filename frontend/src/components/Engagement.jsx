import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';

const engagements = [
  "Entreprise à taille humaine, implantée dans le sud de France, MTJ assure la sécurité des biens et des personnes avec réactivité et flexibilité.",
  "Nous visons la satisfaction des besoins de nos clients, avec force et honneur, par la loyauté et la transparence, en veillant sur notre responsabilité sociétale.",
  "Nous respectons la conformité réglementaire et toutes les exigences légales de nos activités, et luttons contre toute forme de corruption.",
  "Nous veillons à la protection des droits humains, de l'égalité entre les femmes et les hommes et des données personnelles, et promouvons les achats responsables.",
  "Cette politique est revue chaque année, dans le cadre d'une démarche de certification ISO 9001 en cours et selon les lignes directrices de la norme ISO 26000.",
];

const Engagement = () => {
  return (
    <section id="engagement" className="relative scroll-mt-20 py-20 bg-neutral-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wider mb-4 uppercase">
              NOS <span className="text-amber-400">ENGAGEMENTS</span>
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              Politique Qualité et RSE E-SA-01-V1
            </p>
          </div>

          {/* Engagements list */}
          <div className="bg-black border border-amber-400/20 p-8 lg:p-10 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck size={28} className="text-amber-400" />
              <h3 className="text-xl font-bold text-amber-400 uppercase tracking-wider">
                Nos engagements en 5 points
              </h3>
            </div>
            <ul className="space-y-5">
              {engagements.map((item) => (
                <li key={`eng-${item.substring(0, 20)}`} className="flex items-start gap-4">
                  <CheckCircle size={22} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Signature */}
          <div className="bg-black border-2 border-amber-400/30 p-8 text-center mb-8">
            <p className="text-gray-300 text-base lg:text-lg italic leading-relaxed mb-6">
              Nous invitons tous nos collaborateurs à s'engager à nos côtés pour la réussite de notre politique Qualité et RSE.
            </p>
            <p className="text-amber-400 font-bold text-lg tracking-widest">La direction de MTJ Sécurité Privée</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Engagement;
