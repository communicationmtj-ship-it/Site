import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { contactInfo, companyInfo } from '../data/mock';
import { toast } from 'sonner';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import SeoHead from './SeoHead';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone || '');
    submitData.append('subject', formData.subject);
    submitData.append('message', formData.message);
    submitData.append('ts', formLoadedAt);
    if (attachment) submitData.append('attachment', attachment);

    axios.post(`${BACKEND_URL}/api/contact`, submitData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        toast.success("Message envoye !", {
          description: response.data.message || "Nous vous repondrons dans les plus brefs delais.",
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setAttachment(null);
        setFileName('');
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
        description="Contactez MTJ Sécurité Privée pour toute demande de sécurité privée à Toulon, Nice, Toulouse. Devis gratuit, réponse sous 24h. Tél : 07 60 73 82 06."
        path="/contact"
      />
      <Navbar />

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
                <img
                  src="https://customer-assets.emergentagent.com/job_24fc2e4e-22c8-49ad-ae48-a4221e89d53a/artifacts/39logzjd_IMG_2317.jpeg"
                  alt="Contact MTJ Securite"
                  className="w-full h-full object-cover"
                />
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
                  <button type="submit" className="group w-full px-8 py-4 bg-amber-400 hover:bg-amber-500 text-black font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center" data-testid="contact-submit">
                    <Send size={20} className="mr-3 group-hover:translate-x-1 transition-transform" />
                    Envoyer le message
                  </button>
                  <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                    <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact MTJ Sécurité Privée",
        "description": "Contactez MTJ Sécurité Privée pour toute demande de sécurité privée.",
        "url": "https://mtj-securite-privee.fr/contact",
        "mainEntity": {
          "@type": "Organization",
          "name": "MTJ Sécurité Privée",
          "telephone": "+33760738206",
          "email": "contactsmtjsecuriteprivee@gmail.com",
          "address": { "@type": "PostalAddress", "streetAddress": "31 rue Chevalier Paul", "addressLocality": "Toulon", "postalCode": "83200", "addressCountry": "FR" },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33760738206",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
          }
        }
      })}} />
      <Footer />
    </div>
  );
};

export default ContactPage;
