import React from 'react';
import { Shield, Flame } from 'lucide-react';
import { services } from '../data/mock';

const Services = () => {
  const iconMap = {
    Shield: Shield,
    Flame: Flame,
  };

  return (
    <section id="services" className="relative py-20 bg-neutral-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-wider mb-4 uppercase">
            NOS <span className="text-amber-400">MÉTIERS</span>
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Une expertise complète au service de votre sécurité
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Shield;
            
            return (
              <div
                key={service.id}
                className="group relative bg-black border border-amber-400/20 p-8 hover:border-amber-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-400/20 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-amber-400/10 group-hover:bg-amber-400/20 transition-colors duration-300">
                    <IconComponent size={40} className="text-amber-400" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                  {service.title}
                </h3>

                {/* Subtitle if exists */}
                {service.subtitle && (
                  <p className="text-amber-400 text-sm uppercase tracking-wider mb-4 font-semibold">
                    {service.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300 text-sm">
                      <span className="text-amber-400 mr-2 mt-1">▸</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-400/30 group-hover:border-amber-400 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Special highlight for K9 Unit */}
        <div className="mt-16 relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-gradient-to-r from-black to-neutral-900 border border-amber-400/30 p-8 lg:p-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-amber-400 mb-4 uppercase tracking-wider">
                MAÎTRE-CHIEN
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Notre unité cynophile est composée de maîtres-chiens hautement qualifiés et de chiens spécialement dressés pour la sécurité et la détection. Cette collaboration homme-animal offre une efficacité incomparable dans la surveillance et l'intervention.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-amber-400/10 px-4 py-2 border border-amber-400/30">
                  <p className="text-amber-400 font-semibold">Détection</p>
                </div>
                <div className="bg-amber-400/10 px-4 py-2 border border-amber-400/30">
                  <p className="text-amber-400 font-semibold">Surveillance</p>
                </div>
                <div className="bg-amber-400/10 px-4 py-2 border border-amber-400/30">
                  <p className="text-amber-400 font-semibold">Intervention</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <img
                src="https://customer-assets.emergentagent.com/job_24fc2e4e-22c8-49ad-ae48-a4221e89d53a/artifacts/oi6cpa87_IMG_2316.jpeg"
                alt="Maître-chien MTJ Sécurité"
                className="w-full h-full object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
