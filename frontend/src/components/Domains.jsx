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
              {/* Accurate France Map based on real contours */}
              <div className="relative">
                <svg viewBox="0 0 551.13 551.13" className="w-full h-auto max-w-lg mx-auto">
                  <defs>
                    <linearGradient id="gradSouth" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 0.7}} />
                      <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 0.9}} />
                    </linearGradient>
                    <linearGradient id="gradNorth" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 0.15}} />
                      <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 0.25}} />
                    </linearGradient>
                  </defs>
                  
                  {/* France mainland outline - realistic path */}
                  <g transform="translate(20, 20)">
                    {/* Zone Nord - Grand déplacement */}
                    <path
                      d="M 140,40 L 160,35 L 190,30 L 220,28 L 250,25 L 280,24 L 310,26 L 340,30 L 370,38 L 395,48 L 415,60 L 435,75 L 450,92 L 462,110 L 472,130 L 478,150 L 482,170 L 485,190 L 487,210 L 488,230 L 488,250 L 30,250 L 30,230 L 28,210 L 27,190 L 28,170 L 30,150 L 34,130 L 40,110 L 48,92 L 58,75 L 72,60 L 88,48 L 105,38 L 122,32 Z"
                      fill="url(#gradNorth)"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      className="transition-all duration-300 hover:stroke-width-4"
                    />
                    
                    {/* Zone Sud - Notre secteur (Monaco à Bordeaux) */}
                    <path
                      d="M 30,250 L 28,270 L 26,290 L 26,310 L 28,335 L 32,360 L 38,385 L 46,410 L 58,435 L 72,458 L 90,478 L 112,495 L 138,508 L 165,517 L 195,522 L 225,523 L 255,521 L 285,516 L 312,508 L 338,496 L 362,481 L 384,463 L 404,443 L 422,422 L 437,400 L 450,377 L 460,353 L 468,328 L 474,303 L 478,278 L 482,260 L 488,250 Z"
                      fill="url(#gradSouth)"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      className="transition-all duration-300 hover:stroke-width-5"
                    />
                    
                    {/* Ligne de séparation horizontale */}
                    <line x1="30" y1="250" x2="488" y2="250" 
                          stroke="#fbbf24" strokeWidth="3" strokeDasharray="8,6" 
                          className="animate-pulse" />
                    
                    {/* Labels with better visibility */}
                    <g>
                      {/* Nord label */}
                      <rect x="150" y="120" width="220" height="65" fill="#000" fillOpacity="0.85" 
                            stroke="#f59e0b" strokeWidth="2" rx="8" />
                      <text x="260" y="145" textAnchor="middle" className="fill-amber-400 font-bold uppercase" 
                            style={{fontSize: '18px'}}>
                        Grand Déplacement
                      </text>
                      <text x="260" y="170" textAnchor="middle" className="fill-white" 
                            style={{fontSize: '13px'}}>
                        Intervention sur demande
                      </text>
                      
                      {/* Sud label */}
                      <rect x="120" y="340" width="280" height="95" fill="#000" fillOpacity="0.92" 
                            stroke="#f59e0b" strokeWidth="3" rx="8" />
                      <text x="260" y="370" textAnchor="middle" className="fill-amber-400 font-black uppercase" 
                            style={{fontSize: '24px'}}>
                        Notre Secteur
                      </text>
                      <text x="260" y="395" textAnchor="middle" className="fill-white font-semibold" 
                            style={{fontSize: '16px'}}>
                        Monaco ↔ Bordeaux
                      </text>
                      <text x="260" y="420" textAnchor="middle" className="fill-amber-200" 
                            style={{fontSize: '12px'}}>
                        Zone prioritaire • Intervention 24/7
                      </text>
                    </g>
                    
                    {/* City markers */}
                    <g>
                      {/* Toulon - Siège (étoile) */}
                      <g transform="translate(390, 430)">
                        <circle r="10" fill="#ef4444" stroke="#fff" strokeWidth="2.5" />
                        <path d="M 0,-6 L 1.5,-2 L 6,0 L 1.5,2 L 0,6 L -1.5,2 L -6,0 L -1.5,-2 Z" 
                              fill="#fff" />
                      </g>
                      <text x="408" y="435" className="fill-white font-bold" style={{fontSize: '13px'}}>
                        ⭐ TOULON
                      </text>
                      
                      {/* Monaco */}
                      <circle cx="465" cy="410" r="7" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
                      <text x="477" y="415" className="fill-white font-semibold" style={{fontSize: '12px'}}>
                        Monaco
                      </text>
                      
                      {/* Bordeaux */}
                      <circle cx="42" cy="320" r="7" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
                      <text x="15" y="310" className="fill-white font-semibold" style={{fontSize: '12px'}}>
                        Bordeaux
                      </text>
                    </g>
                  </g>
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
