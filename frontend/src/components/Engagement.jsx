import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';

const engagements = [
  "Determiner et surveiller les besoins de nos clients, respecter nos obligations de conformite reglementaire ainsi que toutes les exigences legales relatives a nos activites.",
  "Lutter contre toute forme de corruption et les pratiques contraires a l'ethique.",
  "Veiller sur la protection des droits humains, des minorites, de l'egalite homme-femme et des donnees personnelles.",
  "Promouvoir la pratique des achats responsables.",
];

const Engagement = () => {
  return (
    <section id="engagement" className="relative py-20 bg-neutral-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wider mb-4 uppercase">
              NOS <span className="text-amber-400">ENGAGEMENTS</span>
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              Politique Qualite et RSE E-SA-01- V1
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-6 mb-12">
            <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
              Entreprise a taille humaine, implantee dans le sud de France, MTJ assure la securite des biens et des personnes a savoir : la reactivite et la flexibilite, en vue de satisfaire les besoins de nos clients.
            </p>
            <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
              Notre orientation strategique vise a structurer MTJ de maniere a ameliorer la satisfaction des besoins de nos clients, avec force et honneur, a travers les valeurs de loyaute et de transparence, en veillant sur notre responsabilite societale.
            </p>
          </div>

          {/* Engagements list */}
          <div className="bg-black border border-amber-400/20 p-8 lg:p-10 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck size={28} className="text-amber-400" />
              <h3 className="text-xl font-bold text-amber-400 uppercase tracking-wider">
                A cet effet, nous nous engageons formellement a :
              </h3>
            </div>
            <ul className="space-y-5">
              {engagements.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle size={22} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy text */}
          <div className="space-y-6 mb-12">
            <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
              La presente politique QRSE fixe le cap pour l'annee a venir dans le cadre de notre orientation strategique. Elle sera revue chaque annee a l'occasion d'une revue generale du fonctionnement de notre systeme de management qualite et RSE, afin qu'il demeure conforme aux exigences de la norme ISO 9001, en suivant les lignes directrices de la norme ISO 26000.
            </p>
            <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
              Nous nous engageons a fournir les moyens necessaires a la mise en place de notre systeme de management QRSE en assumant la responsabilite de son efficacite, et en veillant sur son amelioration continue.
            </p>
          </div>

          {/* Signature */}
          <div className="bg-black border-2 border-amber-400/30 p-8 text-center mb-8">
            <p className="text-gray-300 text-base lg:text-lg italic leading-relaxed mb-6">
              J'invite tous nos collaborateurs a s'engager aux cotes de la direction pour la reussite de notre politique Qualite et RSE.
            </p>
            <p className="text-amber-400 font-bold text-lg uppercase tracking-widest">La Direction</p>
          </div>

          {/* Legal notice */}
          <p className="text-gray-600 text-xs text-center leading-relaxed">
            Art. L612-14 du CSI : L'autorisation d'exercice ne confere aucune prerogative de puissance publique a l'entreprise ou aux personnes qui en beneficient
          </p>

        </div>
      </div>
    </section>
  );
};

export default Engagement;
