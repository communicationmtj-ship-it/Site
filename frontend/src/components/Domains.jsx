import React from 'react';
import { MapPin, Building2, HardHat, Home, Users } from 'lucide-react';
import { interventionDomains } from '../data/mock';

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
              {/* France Map */}
              <div className="relative">
                <svg viewBox="0 0 400 500" className="w-full h-auto">
                  {/* Nord de la France - Grand déplacement */}
                  <path
                    d="M 200 50 L 180 70 L 160 90 L 140 110 L 130 130 L 120 160 L 110 190 L 100 220 L 95 240 L 90 250 L 200 245 L 310 250 L 305 240 L 300 220 L 290 190 L 280 160 L 270 130 L 260 110 L 240 90 L 220 70 Z"
                    fill="#f59e0b"
                    fillOpacity="0.2"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    className="hover:fill-opacity-30 transition-all duration-300"
                  />
                  
                  {/* Sud de la France - Notre secteur (Monaco à Bordeaux) */}
                  <path
                    d="M 90 250 L 95 260 L 100 280 L 105 310 L 110 340 L 120 370 L 135 400 L 150 420 L 170 440 L 190 455 L 210 465 L 230 455 L 250 440 L 270 420 L 285 400 L 300 370 L 310 340 L 315 310 L 318 280 L 310 250 Z"
                    fill="#f59e0b"
                    fillOpacity="0.5"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    className="hover:fill-opacity-70 transition-all duration-300"
                  />
                  
                  {/* Légende Nord */}
                  <text x="200" y="150" textAnchor="middle" className="fill-amber-400 text-sm font-bold uppercase">
                    Grand Déplacement
                  </text>
                  <text x="200" y="170" textAnchor="middle" className="fill-white text-xs">
                    Intervention
                  </text>
                  
                  {/* Légende Sud */}
                  <text x="200" y="330" textAnchor="middle" className="fill-amber-400 text-lg font-black uppercase">
                    Notre Secteur
                  </text>
                  <text x="200" y="355" textAnchor="middle" className="fill-white text-sm font-semibold">
                    Monaco ↔ Bordeaux
                  </text>
                  
                  {/* Points de repère */}
                  <circle cx="310" cy="380" r="4" fill="#fbbf24" />
                  <text x="320" y="385" className="fill-white text-xs">Monaco</text>
                  
                  <circle cx="95" cy="340" r="4" fill="#fbbf24" />
                  <text x="40" y="345" className="fill-white text-xs">Bordeaux</text>
                </svg>
              </div>
              
              {/* Zone Details */}
              <div className="space-y-8">
                <div className="bg-neutral-900 p-6 border-l-4 border-amber-400">
                  <h4 className="text-2xl font-bold text-amber-400 mb-3 uppercase">
                    🎯 Notre Secteur Principal
                  </h4>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    <strong className="text-white">De Monaco à Bordeaux</strong> - Zone d'intervention prioritaire avec nos équipes dédiées disponibles 24/7.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Intervention rapide</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Équipes locales dédiées</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Disponibilité 24h/24</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-neutral-900 p-6 border-l-4 border-amber-400/50">
                  <h4 className="text-2xl font-bold text-white mb-3 uppercase">
                    🚀 Grand Déplacement
                  </h4>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    <strong className="text-white">Reste de la France</strong> - Nous intervenons sur l'ensemble du territoire pour vos besoins spécifiques.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Sur devis personnalisé</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Événements & missions spéciales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Planification à l'avance</span>
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
