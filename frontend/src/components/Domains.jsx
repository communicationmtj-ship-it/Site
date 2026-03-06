import React from 'react';
import { MapPin, Building2, HardHat, Home, Users } from 'lucide-react';
import { interventionDomains } from '../data/mock';
import FranceMap from './FranceMap';

const Domains = () => {
  const iconMap = {
    0: Users,
    1: Building2,
    2: HardHat,
    3: Home,
    4: MapPin,
  };

  return (
    <section id="domains" className="relative py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-amber-400 tracking-wider mb-4 uppercase">
            {interventionDomains.title}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {interventionDomains.description}
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interventionDomains.domains.map((domain, index) => {
            const IconComponent = iconMap[index] || MapPin;
            
            return (
              <div
                key={domain.id}
                className="group relative bg-neutral-900 border border-amber-400/10 p-6 hover:border-amber-400/40 transition-all duration-300 hover:bg-neutral-800"
              >
                {/* Icon */}
                <div className="mb-4">
                  <IconComponent size={32} className="text-amber-400" strokeWidth={1.5} />
                </div>

                {/* Domain Name */}
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">
                  {domain.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {domain.description}
                </p>

                {/* Hover line effect */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-amber-400 group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <div className="bg-black border-2 border-amber-400/30 p-8 lg:p-12">
            <h3 className="text-3xl md:text-4xl font-black text-amber-400 mb-8 uppercase tracking-wider text-center">
              Nos Zones d'Intervention
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Custom styled France Map */}
              <div className="relative">
                <FranceMap />
              </div>
              
              {/* Zone Details */}
              <div className="space-y-8">
                <div className="bg-neutral-900 p-6 border-l-4 border-amber-400">
                  <h4 className="text-2xl font-bold text-amber-400 mb-3 uppercase">
                    🎯 Notre Secteur Principal
                  </h4>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    <strong className="text-white">De Bordeaux à Nice</strong> - Zone d'intervention prioritaire avec nos équipes dédiées disponibles 24/7. Siège basé à Toulon.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Intervention rapide - Disponibilité immédiate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Équipes locales dédiées basées à Toulon</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Service 24h/24 et 7j/7</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Couverture : Bordeaux, Toulon, Nice et toute la côte sud</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-neutral-900 p-6 border-l-4 border-amber-400/50">
                  <h4 className="text-2xl font-bold text-white mb-3 uppercase">
                    🚀 Grand Déplacement
                  </h4>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    <strong className="text-white">Reste de la France</strong> - Nous intervenons sur l'ensemble du territoire français pour vos besoins spécifiques et événements.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Intervention sur devis personnalisé</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Sécurité événementielle & missions spéciales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Planification à l'avance recommandée</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Couverture nationale complète</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Domains;
