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
              {/* Real France Map Image with overlays */}
              <div className="relative">
                <div className="relative max-w-lg mx-auto">
                  {/* Base map image */}
                  <img 
                    src="https://customer-assets.emergentagent.com/job_business-profile-21/artifacts/o8468091_IMG_0114.png" 
                    alt="Carte de France"
                    className="w-full h-auto"
                  />
                  
                  {/* SVG Overlay for zones and markers */}
                  <svg 
                    viewBox="0 0 1080 1080" 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    {/* Zone Nord - Grand déplacement (lighter overlay) */}
                    <rect x="0" y="0" width="1080" height="550" 
                          fill="#f59e0b" fillOpacity="0.15" 
                          stroke="none"
                          className="transition-all duration-300" />
                    
                    {/* Zone Sud - Notre secteur (stronger overlay) */}
                    <rect x="0" y="550" width="1080" height="530" 
                          fill="#f59e0b" fillOpacity="0.4" 
                          stroke="none"
                          className="transition-all duration-300" />
                    
                    {/* Separation line */}
                    <line x1="0" y1="550" x2="1080" y2="550" 
                          stroke="#fbbf24" strokeWidth="6" strokeDasharray="15,10" 
                          className="animate-pulse" />
                    
                    {/* Labels */}
                    <g>
                      {/* Nord label */}
                      <rect x="340" y="220" width="400" height="110" 
                            fill="#000" fillOpacity="0.85" 
                            stroke="#f59e0b" strokeWidth="4" rx="12" />
                      <text x="540" y="265" textAnchor="middle" 
                            className="fill-amber-400 font-bold uppercase" 
                            style={{fontSize: '36px'}}>
                        GRAND DÉPLACEMENT
                      </text>
                      <text x="540" y="305" textAnchor="middle" 
                            className="fill-white" 
                            style={{fontSize: '24px'}}>
                        Intervention sur demande
                      </text>
                      
                      {/* Sud label */}
                      <rect x="280" y="720" width="520" height="150" 
                            fill="#000" fillOpacity="0.92" 
                            stroke="#f59e0b" strokeWidth="5" rx="12" />
                      <text x="540" y="775" textAnchor="middle" 
                            className="fill-amber-400 font-black uppercase" 
                            style={{fontSize: '48px'}}>
                        NOTRE SECTEUR
                      </text>
                      <text x="540" y="820" textAnchor="middle" 
                            className="fill-white font-semibold" 
                            style={{fontSize: '32px'}}>
                        Monaco ↔ Bordeaux
                      </text>
                      <text x="540" y="855" textAnchor="middle" 
                            className="fill-amber-200" 
                            style={{fontSize: '22px'}}>
                        Zone prioritaire • Intervention 24/7
                      </text>
                    </g>
                    
                    {/* City markers - positioned at real locations */}
                    <g>
                      {/* Bordeaux - Côte ouest/atlantique */}
                      <circle cx="220" cy="660" r="14" fill="#fbbf24" stroke="#fff" strokeWidth="3" />
                      <text x="150" y="650" className="fill-white font-bold" 
                            style={{fontSize: '24px'}}>
                        Bordeaux
                      </text>
                      
                      {/* Toulon - Côte méditerranée sud-est */}
                      <g transform="translate(800, 890)">
                        <circle r="20" fill="#ef4444" stroke="#fff" strokeWidth="4" />
                        <path d="M 0,-12 L 3,-4 L 12,0 L 3,4 L 0,12 L -3,4 L -12,0 L -3,-4 Z" 
                              fill="#fff" />
                      </g>
                      <text x="830" y="900" className="fill-white font-black" 
                            style={{fontSize: '26px'}}>
                        ⭐ TOULON
                      </text>
                      
                      {/* Monaco - Extrême sud-est, près de l'Italie */}
                      <circle cx="920" cy="880" r="14" fill="#fbbf24" stroke="#fff" strokeWidth="3" />
                      <text x="940" y="888" className="fill-white font-bold" 
                            style={{fontSize: '24px'}}>
                        Monaco
                      </text>
                    </g>
                  </svg>
                </div>
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
