import React, { useState } from 'react';
import FloatingCTA from './FloatingCTA';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { contactInfo, companyInfo, postalAddressSchema } from '../data/mock';
import { toast } from 'sonner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SeoHead from './SeoHead';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

import { safeJsonLd } from '../utils/safeJsonLd';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [attachment, setAttachment] = useState(null);
  const [fileName, setFileName] = useState('');
  const [consent, setConsent] = useState(false);
  const [formLoadedAt] = useState(() => String(Date.now() / 1000));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Fichier trop volumineux", { description: "La taille maximale est de 10 Mo." });
        return;
      }
      setAttachment(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Consentement requis", { description: "Veuillez cocher la case de consentement pour envoyer votre message." });
      return;
    }
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone || '');
    submitData.append('subject', formData.subject);
    submitData.append('message', formData.message);
    submitData.append('consent', 'true');
    submitData.append('ts', formLoadedAt);
    // Le champ piège doit partir avec la demande, sinon le serveur ne peut pas le contrôler.
    submitData.append('hp', e.target.elements?.hp?.value || '');
    if (attachment) submitData.append('attachment', attachment);

    axios.post(`${BACKEND_URL}/api/contact`, submitData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        // Le serveur répond 200 avec status « error » quand il refuse le message (case de
        // consentement, champ invalide) : jamais « Message envoye ! » dans ce cas.
        if (response?.data?.status !== 'success') {
          toast.error("Envoi refusé", {
            description: response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
          });
          return;
        }
        toast.success("Message envoye !", {
          description: response.data.message || "Nous vous repondrons dans les plus brefs delais.",
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setAttachment(null);
        setFileName('');
        setConsent(false);
        const fileInput = document.getElementById('contact-attachment');
        if (fileInput) fileInput.value = '';
      })
      .catch(error => {
        toast.error("Erreur", {
          description: error.response?.data?.message || "Une erreur est survenue. Veuillez reessayer.",
        });
      });
  };

  return (
    <div className="min-h-screen bg-black">
      <SeoHead
        title="Contactez MTJ Sécurité Privée | Devis Gratuit | Toulon"
        description="Contactez MTJ Sécurité Privée pour toute demande de sécurité privée de Bordeaux à Nice jusqu'à Annecy. Devis gratuit, réponse sous 24 h. Tél : 07 60 73 82 06."
        path="/contact"
      />
      <Navbar />
      <main id="contenu" tabIndex={-1}>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-black via-neutral-900 to-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 bg-amber-400/10 backdrop-blur-sm rounded-full border-2 border-amber-400/30 mb-8">
              <MessageSquare size={48} className="text-amber-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-wider mb-6 uppercase">
              Contact
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8">
              {contactInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section id="contact" className="relative py-20 bg-stone-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information & Image */}
            <div className="space-y-8">
              <div className="relative h-[400px] overflow-hidden shadow-2xl">
                {/* Même photo, en WebP plus léger (repli JPEG) : rien ne change à l'écran. */}
                <picture className="block w-full h-full">
                  <source srcSet="/images/contact-bg.webp" type="image/webp" />
                  <img
                    src="/images/contact-bg.jpeg"
                    alt="Contact MTJ Securite"
                    className="w-full h-full object-cover"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                    {companyInfo.name}
                  </h3>
                  <p className="text-amber-400 text-sm mt-2 uppercase tracking-widest">
                    {companyInfo.slogan}
                  </p>
                </div>
              </div>

              <div className="bg-black p-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-400/20 border border-amber-400/30">
                    <Phone size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1 uppercase tracking-wide text-sm">Telephone</h4>
                    <p className="text-white text-lg">{companyInfo.phone}</p>
                    <p className="text-gray-400 text-sm mt-1">Disponible 24/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-400/20 border border-amber-400/30">
                    <Mail size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1 uppercase tracking-wide text-sm">Email</h4>
                    <p className="text-white text-lg">{companyInfo.email}</p>
                    <p className="text-gray-400 text-sm mt-1">Reponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-400/20 border border-amber-400/30">
                    <MapPin size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1 uppercase tracking-wide text-sm">Adresse</h4>
                    <p className="text-white text-lg">{companyInfo.address}</p>
                    <p className="text-gray-400 text-sm mt-1">France</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-black border-4 border-amber-400/30 p-8">
                <h3 className="text-2xl font-bold text-amber-400 mb-6 uppercase tracking-wider">
                  Envoyez-nous un message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">Nom *</label>
                    <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors" placeholder="Votre nom" data-testid="contact-name" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">Email *</label>
                    <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors" placeholder="votre@email.com" data-testid="contact-email" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">Telephone</label>
                    <input type="tel" id="contact-phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors" placeholder="+33 6 XX XX XX XX" data-testid="contact-phone" />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">Sujet *</label>
                    <input type="text" id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors" placeholder="Sujet de votre message" data-testid="contact-subject" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">Message *</label>
                    <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors resize-none" placeholder="Votre message..." data-testid="contact-message" />
                  </div>
                  <div>
                    <label htmlFor="contact-attachment" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">Piece jointe (optionnel)</label>
                    <div className="relative">
                      <input type="file" id="contact-attachment" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                      <label htmlFor="contact-attachment" className="w-full bg-neutral-900 border border-amber-400/30 text-gray-400 px-4 py-3 cursor-pointer hover:border-amber-400 transition-colors flex items-center justify-between">
                        <span>{fileName || "Choisir un fichier (PDF, DOC, Image - Max 10 Mo)"}</span>
                        <Send size={20} className="text-amber-400" />
                      </label>
                    </div>
                    {fileName && <p className="text-sm text-amber-400 mt-2">Fichier selectionne : {fileName}</p>}
                  </div>

                  {/* Consentement RGPD : la case renvoie à la politique de confidentialité (page décidée par
                      Théo le 13/11/2026) ; le serveur refuse un message arrivé sans elle. */}
                  <div>
                    <label htmlFor="contact-consent" className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed cursor-pointer">
                      <input
                        type="checkbox"
                        id="contact-consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 accent-amber-400 shrink-0"
                        data-testid="contact-consent"
                      />
                      <span>
                        J'accepte que MTJ Sécurité Privée utilise les informations saisies pour répondre à ma demande.
                        Elles sont conservées 3 ans après notre dernier échange. Vous pouvez accéder à vos données, les rectifier ou les faire supprimer en nous écrivant (voir notre{' '}
                        <Link to="/politique-de-confidentialite" className="underline text-amber-400 hover:text-amber-300">politique de confidentialité</Link>). *
                      </span>
                    </label>
                  </div>
                  <button type="submit" className="group w-full px-8 py-4 bg-amber-400 hover:bg-amber-500 text-black font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center" data-testid="contact-submit">
                    <Send size={20} className="mr-3 group-hover:translate-x-1 transition-transform" />
                    Envoyer le message
                  </button>
                  <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                    <label htmlFor="contact-hp">Laisser ce champ vide</label>
                    <input type="text" id="contact-hp" name="hp" tabIndex={-1} autoComplete="off" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact MTJ Sécurité Privée",
        "description": "Contactez MTJ Sécurité Privée pour toute demande de sécurité privée.",
        "url": "https://mtj-securite-privee.fr/contact",
        "mainEntity": {
          "@type": "Organization",
          "name": "MTJ Sécurité Privée",
          "telephone": companyInfo.phoneIntl,
          "email": companyInfo.email,
          "address": postalAddressSchema,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": companyInfo.phoneIntl,
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
          }
        }
      })}} />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;