import React from 'react';
import { Shield, Flame, ShieldCheck } from 'lucide-react';
import { services } from '../data/mock';

const Services = () => {
  const iconMap = {
    Shield: Shield,
    Dog: Shield,
    Flame: Flame,
    UserShield: ShieldCheck,
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
            const isExternal = !!service.externalCompany;
            const accent = isExternal ? 'violet' : 'amber';
            
            return (
              <div
                key={service.id}
                data-testid={`service-card-${service.id}`}
                className={`group relative p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${service.wide ? 'md:col-span-2' : ''} ${
                  isExternal
                    ? 'bg-gradient-to-br from-violet-950/80 to-black border border-violet-500/30 hover:border-violet-400/70 hover:shadow-violet-500/20'
                    : 'bg-black border border-amber-400/20 hover:border-amber-400/60 hover:shadow-amber-400/20'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* External company badge */}
                {isExternal && (
                  <div data-testid="external-company-badge" className="absolute top-0 left-0 right-0 bg-violet-600/90 px-4 py-2 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest">{service.externalCompany}</span>
                    <span className="ml-auto text-violet-200 text-[10px] uppercase tracking-wider">Societe partenaire</span>
                  </div>
                )}

                {/* Icon */}
                <div className={isExternal ? 'mb-6 mt-8' : 'mb-6'}>
                  <div className={`inline-flex p-4 transition-colors duration-300 ${
                    isExternal
                      ? 'bg-violet-500/15 group-hover:bg-violet-500/25'
                      : 'bg-amber-400/10 group-hover:bg-amber-400/20'
                  }`}>
                    <IconComponent size={40} className={isExternal ? 'text-violet-400' : 'text-amber-400'} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                  {service.title}
                </h3>

                {/* Subtitle if exists */}
                {service.subtitle && (
                  <p className={`text-sm uppercase tracking-wider mb-4 font-semibold ${isExternal ? 'text-violet-400' : 'text-amber-400'}`}>
                    {service.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-4 whitespace-pre-line">
                  {service.description}
                </p>

                {/* Legal Notice (small text) */}
                {service.legalNotice && (
                  <p className={`text-gray-600 text-xs leading-relaxed whitespace-pre-line mt-4 pt-4 ${
                    isExternal ? 'border-t border-violet-500/20' : 'border-t border-amber-400/10'
                  }`}>
                    {service.legalNotice}
                  </p>
                )}

                {/* Features List */}
                {service.features.length > 0 && (
                  <ul className="space-y-2 mt-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-sm">
                        <span className={`mr-2 mt-1 ${isExternal ? 'text-violet-400' : 'text-amber-400'}`}>▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 transition-colors duration-300 ${
                  isExternal
                    ? 'border-violet-500/30 group-hover:border-violet-400'
                    : 'border-amber-400/30 group-hover:border-amber-400'
                }`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
