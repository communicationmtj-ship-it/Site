import React from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[3px] scale-105"
          style={{
            backgroundImage: `url('/images/hero-bg.jpeg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Bandeau urgence */}
          <a
            href={companyInfo.phoneHref}
            className="inline-flex items-center gap-2 border border-amber-400 bg-black/60 px-5 py-2 text-sm md:text-base font-semibold text-amber-400 hover:bg-amber-400 hover:text-black transition-colors"
          >
            <Phone size={18} />
            Besoin urgent ? {companyInfo.phone}, 24h/24
          </a>

          {/* Main Heading */}
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-wider leading-tight">
              VOTRE SÉCURITÉ
            </h1>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-amber-400 tracking-wider leading-tight">
              NOTRE MISSION.
            </h2>
          </div>

          {/* Motto */}
          <p className="text-xl md:text-2xl text-amber-100/90 font-light tracking-widest uppercase animate-fade-in-up animation-delay-200">
            {companyInfo.motto}
          </p>

          <p className="text-base md:text-lg text-white/90 font-medium">
            Intervention 24/7 · Sécurité cynophile avec maître-chien
          </p>

          {/* CTA Button */}
          <div className="pt-8 animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={companyInfo.phoneHref}
              className="px-10 py-4 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold text-lg uppercase tracking-wider transition-colors inline-flex items-center"
            >
              <Phone size={22} className="mr-2" />
              {companyInfo.phone}
            </a>
            <button
              onClick={scrollToAbout}
              className="group px-10 py-4 bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/50"
            >
              Découvrir nos services
              <ChevronDown className="inline-block ml-2 group-hover:translate-y-1 transition-transform" size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={40} className="text-amber-400/70" />
      </div>
    </section>
  );
};

export default Hero;
