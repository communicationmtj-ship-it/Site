import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Flame, ShieldCheck, ArrowRight, PawPrint } from 'lucide-react';
import { services } from '../data/mock';

const DEFAULT_COLOR = '#AC8631';

const DogSniffIcon = ({ size = 40, style = {}, strokeWidth = 1.5 }) => {
  const color = style.color || '#AC8631';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Paw pad main */}
      <ellipse cx="12" cy="15.5" rx="3.5" ry="3" />
      {/* Toe pads */}
      <ellipse cx="7.5" cy="10.5" rx="1.5" ry="1.8" />
      <ellipse cx="11" cy="8.5" rx="1.3" ry="1.6" />
      <ellipse cx="16.5" cy="10.5" rx="1.5" ry="1.8" />
      {/* Scent / flair lines */}
      <path d="M19 5.5c0.8-0.5 1.5-1.2 2-2" opacity="0.7" />
      <path d="M20 8c0.7 0 1.5-0.2 2-0.5" opacity="0.5" />
      <path d="M19.5 10.5c0.6 0.3 1.3 0.3 2 0.1" opacity="0.35" />
    </svg>
  );
};

const Services = () => {
  const iconMap = {
    Shield: Shield,
    Dog: PawPrint,
    DogSniff: DogSniffIcon,
    Flame: Flame,
    UserShield: ShieldCheck,
  };

  return (
    <section id="services" className="relative scroll-mt-20 py-20 bg-neutral-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-wider mb-4 uppercase">
            NOS <span className="text-amber-400">MÉTIERS</span>
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Une expertise complète au service de votre sécurité
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Shield;
            const isExt = !!service.externalCompany;
            const c = service.color || DEFAULT_COLOR;

            const cardContent = (
              <div
                data-testid={`service-card-${service.id}`}
                className={`group relative bg-black p-8 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${service.wide ? 'md:col-span-2' : ''} ${service.link ? 'cursor-pointer' : ''}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  borderColor: `${c}44`,
                  '--card-color': c,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${c}aa`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${c}44`; }}
              >
                {/* External company badge */}
                {isExt && (
                  <div data-testid="external-company-badge" className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center gap-2" style={{ backgroundColor: `${c}e6` }}>
                    <ShieldCheck size={16} className="text-black" />
                    <span className="text-black text-xs font-bold uppercase tracking-widest">{service.externalCompany}</span>
                    <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-black/80">Société du groupe MTJ</span>
                  </div>
                )}

                {/* Icon */}
                <div className={isExt ? 'mb-6 mt-8' : 'mb-6'}>
                  <div className="inline-flex p-4 transition-colors duration-300" style={{ backgroundColor: `${c}22` }}>
                    <IconComponent size={40} style={{ color: c }} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                  {service.title}
                </h3>

                {/* Subtitle */}
                {service.subtitle && (
                  <p className="text-sm uppercase tracking-wider mb-4 font-semibold" style={{ color: c }}>
                    {service.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-4 whitespace-pre-line">
                  {service.description}
                </p>

                {/* Legal Notice */}
                {service.legalNotice && (
                  <p className="text-gray-400 text-xs leading-relaxed whitespace-pre-line mt-4 pt-4" style={{ borderTop: `1px solid ${c}33` }}>
                    {service.legalNotice}
                  </p>
                )}

                {/* Features */}
                {service.features.length > 0 && (
                  <ul className="space-y-2 mt-2">
                    {service.features.map((feature, idx) => (
                      <li key={`feat-${feature.substring(0, 15)}`} className="flex items-start text-gray-300 text-sm">
                        <span className="mr-2 mt-1" style={{ color: c }}>▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 transition-colors duration-300" style={{ borderColor: `${c}44` }}></div>

                {/* Link indicator */}
                {service.link && (
                  <div
                    className="inline-flex items-center gap-2 mt-6 text-sm font-semibold uppercase tracking-wider"
                    style={{ color: c }}
                  >
                    En savoir plus
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                )}
              </div>
            );

            return service.link ? (
              <Link key={service.id} to={service.link} className={`block no-underline ${service.wide ? 'md:col-span-2' : ''}`}>
                {cardContent}
              </Link>
            ) : (
              <React.Fragment key={service.id}>
                {cardContent}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
