import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Flame, ShieldCheck, ArrowRight } from 'lucide-react';
import { services } from '../data/mock';

const EXT_COLOR = '#68187B';

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
            const isExt = !!service.externalCompany;
            
            return (
              <div
                key={service.id}
                data-testid={`service-card-${service.id}`}
                className={`group relative bg-black p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${service.wide ? 'md:col-span-2' : ''} ${
                  isExt ? 'border' : 'border border-amber-400/20 hover:border-amber-400/60 hover:shadow-amber-400/20'
                }`}
                style={isExt ? {
                  animationDelay: `${index * 100}ms`,
                  borderColor: `${EXT_COLOR}44`,
                } : { animationDelay: `${index * 100}ms` }}
                onMouseEnter={isExt ? (e) => { e.currentTarget.style.borderColor = `${EXT_COLOR}aa`; } : undefined}
                onMouseLeave={isExt ? (e) => { e.currentTarget.style.borderColor = `${EXT_COLOR}44`; } : undefined}
              >
                {/* External company badge */}
                {isExt && (
                  <div data-testid="external-company-badge" className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center gap-2" style={{ backgroundColor: `${EXT_COLOR}e6` }}>
                    <ShieldCheck size={16} className="text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest">{service.externalCompany}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wider" style={{ color: '#c9a0d6' }}>Societe du groupe MTJ</span>
                  </div>
                )}

                {/* Icon */}
                <div className={isExt ? 'mb-6 mt-8' : 'mb-6'}>
                  <div
                    className={`inline-flex p-4 transition-colors duration-300 ${isExt ? '' : 'bg-amber-400/10 group-hover:bg-amber-400/20'}`}
                    style={isExt ? { backgroundColor: `${EXT_COLOR}22` } : {}}
                  >
                    <IconComponent size={40} style={isExt ? { color: EXT_COLOR } : {}} className={isExt ? '' : 'text-amber-400'} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                  {service.title}
                </h3>

                {/* Subtitle if exists */}
                {service.subtitle && (
                  <p className={`text-sm uppercase tracking-wider mb-4 font-semibold ${isExt ? '' : 'text-amber-400'}`} style={isExt ? { color: EXT_COLOR } : {}}>
                    {service.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-4 whitespace-pre-line">
                  {service.description}
                </p>

                {/* Legal Notice (small text) */}
                {service.legalNotice && (
                  <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-line mt-4 pt-4" style={{ borderTop: isExt ? `1px solid ${EXT_COLOR}33` : '1px solid rgba(251,191,36,0.1)' }}>
                    {service.legalNotice}
                  </p>
                )}

                {/* Features List */}
                {service.features.length > 0 && (
                  <ul className="space-y-2 mt-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-sm">
                        <span className={isExt ? 'mr-2 mt-1' : 'text-amber-400 mr-2 mt-1'} style={isExt ? { color: EXT_COLOR } : {}}>▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Decorative corner */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 transition-colors duration-300 ${isExt ? '' : 'border-amber-400/30 group-hover:border-amber-400'}`}
                  style={isExt ? { borderColor: `${EXT_COLOR}44` } : {}}
                ></div>

                {/* Link to SEO page */}
                {service.link && (
                  <Link
                    to={service.link}
                    data-testid={`service-link-${service.id}`}
                    className={`inline-flex items-center gap-2 mt-6 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${isExt ? 'hover:opacity-80' : 'text-amber-400 hover:text-amber-300'}`}
                    style={isExt ? { color: EXT_COLOR } : {}}
                  >
                    En savoir plus
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
