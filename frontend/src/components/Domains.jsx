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
        <div className="mt-16 text-center">
          <div className="inline-block bg-neutral-900 border-2 border-amber-400/30 p-8 max-w-2xl">
            <p className="text-gray-300 text-lg mb-6">
              Quel que soit votre besoin en matière de sécurité, MTJ SÉCURITÉ PRIVÉE est votre partenaire de confiance.
            </p>
            <button
              onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105"
            >
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Domains;
