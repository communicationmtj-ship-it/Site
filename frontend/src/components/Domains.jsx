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
              {/* Real France Map */}
              <div className="relative">
                <svg viewBox="0 0 600 700" className="w-full h-auto max-w-md mx-auto">
                  <defs>
                    <linearGradient id="gradSouth" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 0.6}} />
                      <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 0.8}} />
                    </linearGradient>
                    <linearGradient id="gradNorth" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 0.2}} />
                      <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 0.3}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Contour de la France - Zone Nord (Grand déplacement) */}
                  <path
                    d="M 300 50 L 320 60 L 340 75 L 360 95 L 375 115 L 385 135 L 395 155 L 405 180 L 410 210 L 415 240 L 420 270 L 425 300 L 425 330 L 100 330 L 95 300 L 90 270 L 85 240 L 80 210 L 75 180 L 70 155 L 65 135 L 70 115 L 80 95 L 100 75 L 130 60 L 160 50 L 200 45 L 250 45 Z"
                    fill="url(#gradNorth)"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />
                  
                  {/* Zone Sud (Monaco à Bordeaux) - Notre secteur principal */}
                  <path
                    d="M 100 330 L 105 360 L 110 390 L 115 420 L 125 455 L 140 490 L 160 525 L 185 555 L 215 580 L 250 600 L 285 610 L 320 605 L 355 590 L 385 565 L 410 535 L 430 500 L 440 465 L 445 430 L 445 395 L 440 360 L 425 330 Z"
                    fill="url(#gradSouth)"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    className="transition-all duration-300"
                  />
                  
                  {/* Ligne de séparation entre les deux zones */}
                  <line x1="100" y1="330" x2="425" y2="330" stroke="#fbbf24" strokeWidth="3" strokeDasharray="5,5" />
                  
                  {/* Légende Nord avec fond */}
                  <rect x="180" y="160" width="240" height="70" fill="#000" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="2" rx="5" />
                  <text x="300" y="185" textAnchor="middle" className="fill-amber-400 text-base font-bold uppercase">
                    Grand Déplacement
                  </text>
                  <text x="300" y="210" textAnchor="middle" className="fill-white text-sm">
                    Intervention sur demande
                  </text>
                  
                  {/* Légende Sud avec fond */}
                  <rect x="150" y="430" width="300" height="90" fill="#000" fillOpacity="0.9" stroke="#f59e0b" strokeWidth="3" rx="5" />
                  <text x="300" y="460" textAnchor="middle" className="fill-amber-400 text-xl font-black uppercase">
                    Notre Secteur
                  </text>
                  <text x="300" y="485" textAnchor="middle" className="fill-white text-base font-semibold">
                    Monaco ↔ Bordeaux
                  </text>
                  <text x="300" y="505" textAnchor="middle" className="fill-amber-200 text-sm">
                    Zone prioritaire 24/7
                  </text>
                  
                  {/* Marqueurs de villes */}
                  <g>
                    {/* Monaco */}
                    <circle cx="415" cy="485" r="6" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
                    <text x="430" y="490" className="fill-white text-xs font-bold">Monaco</text>
                    
                    {/* Bordeaux */}
                    <circle cx="105" cy="410" r="6" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
                    <text x="40" y="415" className="fill-white text-xs font-bold">Bordeaux</text>
                    
                    {/* Toulon (siège) */}
                    <circle cx="360" cy="530" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                    <text x="375" y="535" className="fill-white text-sm font-bold">⭐ Toulon</text>
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
