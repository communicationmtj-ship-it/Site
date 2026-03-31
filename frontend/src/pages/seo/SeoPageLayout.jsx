import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SeoHead from '../../components/SeoHead';

const DEFAULT = '#AC8631';

import { safeJsonLd } from '../../utils/safeJsonLd';

const SeoPageLayout = ({ data }) => {
  const navigate = useNavigate();
  const c = data.themeColor || DEFAULT;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <>
      <SeoHead title={data.metaTitle} description={data.metaDescription} path={data.slug} />
      <Navbar />
      <main className="bg-black min-h-screen pt-20">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 lg:px-8 py-4" aria-label="Breadcrumb" data-testid="seo-breadcrumb">
          <ol className="flex items-center text-sm text-gray-500 flex-wrap gap-1">
            <li><Link to="/" className="hover:text-amber-400 transition-colors">Accueil</Link></li>
            <li><ChevronRight size={14} /></li>
            {data.breadcrumbParent && (
              <>
                <li><Link to={data.breadcrumbParent.href} className="hover:text-amber-400 transition-colors">{data.breadcrumbParent.label}</Link></li>
                <li><ChevronRight size={14} /></li>
              </>
            )}
            <li style={{ color: c }}>{data.breadcrumbCurrent}</li>
          </ol>
        </nav>

        {/* Hero / H1 + Introduction */}
        <header className="container mx-auto px-4 lg:px-8 py-8 lg:py-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider uppercase leading-tight" style={{ color: c }} data-testid="seo-h1">
            {data.h1}
          </h1>
          <div className="w-20 h-1 mt-4 mb-6" style={{ backgroundColor: c }}></div>
          <p className="text-gray-300 text-base lg:text-lg max-w-4xl leading-relaxed whitespace-pre-line">
            {data.introduction}
          </p>
        </header>

        {/* Content Sections */}
        <div className="container mx-auto px-4 lg:px-8 space-y-12 pb-8">
          {data.sections.map((section, i) => (
            <section key={`section-${section.h2.substring(0, 20)}`} className="bg-neutral-900 border p-6 lg:p-10" style={{ borderColor: `${c}1a` }}>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-6" style={{ color: c }} data-testid={`seo-h2-${i}`}>
                {section.h2}
              </h2>
              {section.intro && (
                <p className="text-gray-300 leading-relaxed mb-6">{section.intro}</p>
              )}
              <div className="space-y-6">
                {section.subsections.map((sub, j) => (
                  <div key={j} className="pl-4 border-l-2" style={{ borderColor: `${c}44` }}>
                    <h3 className="text-lg font-semibold text-white mb-2">{sub.h3}</h3>
                    <p className="text-gray-400 leading-relaxed">{sub.content}</p>
                    {sub.list && (
                      <ul className="mt-3 space-y-1">
                        {sub.list.map((item, k) => (
                          <li key={k} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="mt-0.5" style={{ color: c }}>&#10003;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* FAQ Section */}
          {data.faq && (
            <section className="bg-neutral-900 border p-6 lg:p-10" style={{ borderColor: `${c}1a` }} data-testid="seo-faq">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-6" style={{ color: c }}>
                Questions fréquentes
              </h2>
              <div className="space-y-6">
                {data.faq.map((item, i) => (
                  <div key={`faq-${item.question.substring(0, 20)}`} className="pl-4 border-l-2" style={{ borderColor: `${c}44` }}>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.question}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": data.faq.map(item => ({
                  "@type": "Question",
                  "name": item.question,
                  "acceptedAnswer": { "@type": "Answer", "text": item.answer }
                }))
              })}} />
            </section>
          )}

          {/* Conclusion */}
          <section className="bg-neutral-900 border p-6 lg:p-10" style={{ borderColor: `${c}1a` }}>
            <p className="text-gray-300 leading-relaxed text-base lg:text-lg whitespace-pre-line">{data.conclusion}</p>
          </section>

          {/* CTA */}
          <div className="bg-black border-2 p-8 text-center" style={{ borderColor: `${c}44` }}>
            <h2 className="text-2xl font-black uppercase tracking-wider mb-4" style={{ color: c }}>
              Demandez votre devis gratuit
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Contactez MTJ Sécurité Privée pour obtenir un devis personnalisé adapté à vos besoins en sécurité.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('quote');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className="text-black font-bold px-8 py-3 uppercase tracking-wider transition-opacity hover:opacity-90"
                style={{ backgroundColor: c }}
                data-testid="seo-cta-devis"
              >
                Demander un devis
              </button>
              <a href="tel:0760738206" className="flex items-center gap-2 font-semibold transition-opacity hover:opacity-80" style={{ color: c }}>
                <Phone size={18} /> 07 60 73 82 06
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1"><Mail size={14} /> contactsmtjsecuriteprivee@gmail.com</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> 31 rue Chevalier Paul, 83200 Toulon</span>
            </div>
          </div>

          {/* Internal Links */}
          {data.relatedLinks && (
            <nav className="py-6" aria-label="Pages associées">
              <h2 className="text-lg font-bold text-white mb-4">Pages associées</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.relatedLinks.map((link) => (
                  <Link key={`rel-${link.href}`} to={link.href} className="bg-neutral-900 border p-4 transition-all group" style={{ borderColor: '#AC86311a' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#AC863166'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#AC86311a'; }}
                  >
                    <span className="font-semibold text-sm" style={{ color: '#AC8631' }}>{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://mtj-securite-privee.fr/" },
            ...(data.breadcrumbParent ? [{ "@type": "ListItem", "position": 2, "name": data.breadcrumbParent.label, "item": `https://mtj-securite-privee.fr${data.breadcrumbParent.href}` }] : []),
            { "@type": "ListItem", "position": data.breadcrumbParent ? 3 : 2, "name": data.breadcrumbCurrent, "item": `https://mtj-securite-privee.fr${data.slug}` }
          ]
        })}} />
        {/* LocalBusiness Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "MTJ Sécurité Privée",
          "description": data.metaDescription,
          "url": `https://mtj-securite-privee.fr${data.slug}`,
          "telephone": "+33760738206",
          "email": "contactsmtjsecuriteprivee@gmail.com",
          "address": { "@type": "PostalAddress", "streetAddress": "31 rue Chevalier Paul", "addressLocality": "Toulon", "postalCode": "83200", "addressCountry": "FR" },
          "geo": { "@type": "GeoCoordinates", "latitude": 43.1242, "longitude": 5.9280 },
          "areaServed": data.areaServed || "Sud de la France",
          "priceRange": "$$",
          "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "00:00", "closes": "23:59" }
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.h1,
          "description": data.metaDescription,
          "url": `https://mtj-securite-privee.fr${data.slug}`,
          "provider": { "@type": "Organization", "name": "MTJ Sécurité Privée", "url": "https://mtj-securite-privee.fr", "telephone": "+33760738206" },
          "areaServed": data.areaServed || "Sud de la France",
          "serviceType": data.breadcrumbCurrent
        })}} />
      </main>
      <Footer />
    </>
  );
};

export default SeoPageLayout;
