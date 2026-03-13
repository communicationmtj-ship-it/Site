import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SeoPageLayout = ({ data }) => {
  useEffect(() => {
    document.title = data.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.metaDescription);
    else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = data.metaDescription;
      document.head.appendChild(meta);
    }
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <>
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
            <li className="text-amber-400">{data.breadcrumbCurrent}</li>
          </ol>
        </nav>

        {/* Hero / H1 + Introduction */}
        <header className="container mx-auto px-4 lg:px-8 py-8 lg:py-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 tracking-wider uppercase leading-tight" data-testid="seo-h1">
            {data.h1}
          </h1>
          <div className="w-20 h-1 bg-amber-400 mt-4 mb-6"></div>
          <p className="text-gray-300 text-base lg:text-lg max-w-4xl leading-relaxed whitespace-pre-line">
            {data.introduction}
          </p>
        </header>

        {/* Content Sections */}
        <div className="container mx-auto px-4 lg:px-8 space-y-12 pb-8">
          {data.sections.map((section, i) => (
            <section key={i} className="bg-neutral-900 border border-amber-400/10 p-6 lg:p-10">
              <h2 className="text-xl md:text-2xl font-bold text-amber-400 uppercase tracking-wide mb-6" data-testid={`seo-h2-${i}`}>
                {section.h2}
              </h2>
              {section.intro && (
                <p className="text-gray-300 leading-relaxed mb-6">{section.intro}</p>
              )}
              <div className="space-y-6">
                {section.subsections.map((sub, j) => (
                  <div key={j} className="pl-4 border-l-2 border-amber-400/30">
                    <h3 className="text-lg font-semibold text-white mb-2">{sub.h3}</h3>
                    <p className="text-gray-400 leading-relaxed">{sub.content}</p>
                    {sub.list && (
                      <ul className="mt-3 space-y-1">
                        {sub.list.map((item, k) => (
                          <li key={k} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5">&#10003;</span>
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
            <section className="bg-neutral-900 border border-amber-400/10 p-6 lg:p-10" data-testid="seo-faq">
              <h2 className="text-xl md:text-2xl font-bold text-amber-400 uppercase tracking-wide mb-6">
                Questions fréquentes
              </h2>
              <div className="space-y-6">
                {data.faq.map((item, i) => (
                  <div key={i} className="pl-4 border-l-2 border-amber-400/30">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.question}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
              {/* FAQ Schema.org JSON-LD */}
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
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
          <section className="bg-neutral-900 border border-amber-400/10 p-6 lg:p-10">
            <p className="text-gray-300 leading-relaxed text-base lg:text-lg whitespace-pre-line">{data.conclusion}</p>
          </section>

          {/* CTA */}
          <div className="bg-black border-2 border-amber-400/30 p-8 text-center">
            <h2 className="text-2xl font-black text-amber-400 uppercase tracking-wider mb-4">
              Demandez votre devis gratuit
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Contactez MTJ Sécurité Privée pour obtenir un devis personnalisé adapté à vos besoins en sécurité.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/#quote" className="bg-amber-400 text-black font-bold px-8 py-3 uppercase tracking-wider hover:bg-amber-300 transition-colors" data-testid="seo-cta-devis">
                Demander un devis
              </Link>
              <a href="tel:0760738206" className="flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                <Phone size={18} /> 07 60 73 82 06
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1"><Mail size={14} /> mtj.securiteprivee@gmail.com</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> 31 rue Chevalier Paul, 83200 Toulon</span>
            </div>
          </div>

          {/* Internal Links */}
          {data.relatedLinks && (
            <nav className="py-6" aria-label="Pages associées">
              <h2 className="text-lg font-bold text-white mb-4">Pages associées</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.relatedLinks.map((link, i) => (
                  <Link key={i} to={link.href} className="bg-neutral-900 border border-amber-400/10 p-4 hover:border-amber-400/40 transition-all group">
                    <span className="text-amber-400 group-hover:text-amber-300 font-semibold text-sm">{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>

        {/* LocalBusiness Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "MTJ Sécurité Privée",
          "description": data.metaDescription,
          "url": `https://mtj-securite-privee.fr${data.slug}`,
          "telephone": "+33760738206",
          "email": "mtj.securiteprivee@gmail.com",
          "address": { "@type": "PostalAddress", "streetAddress": "31 rue Chevalier Paul", "addressLocality": "Toulon", "postalCode": "83200", "addressCountry": "FR" },
          "areaServed": data.areaServed || "Sud de la France",
          "priceRange": "$$"
        })}} />
      </main>
      <Footer />
    </>
  );
};

export default SeoPageLayout;
