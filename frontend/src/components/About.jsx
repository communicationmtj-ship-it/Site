import React from 'react';
import { aboutUs } from '../data/mock';

const About = () => {
  return (
    <section id="about" className="relative py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-amber-400 tracking-wider mb-4 uppercase">
                {aboutUs.title}
              </h2>
              <div className="w-24 h-1 bg-amber-400"></div>
            </div>

            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              {aboutUs.description.split('\n\n').map((paragraph) => (
                <p key={`p-${paragraph.substring(0, 20)}`} className="opacity-90">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-6 flex flex-wrap gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-400">24/7</p>
                <p className="text-sm text-gray-400 uppercase tracking-wide mt-1">Disponibilité</p>
              </div>
              {/* 15/11/2026 (décision de Théo du 13/11/2026, « Site chiffres: B aucun ») : le chiffre
                  « 100% Engagement » est retiré, rien n'est écrit à sa place. */}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden shadow-2xl">
              {/* Même photo, en WebP plus léger (repli JPEG) : rien ne change à l'écran. */}
              <picture>
                <source srcSet="/images/about-team.webp" type="image/webp" />
                <img
                  src="/images/about-team.jpeg"
                  alt="Équipe MTJ Sécurité"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-400/10 backdrop-blur-sm border-2 border-amber-400/30 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
