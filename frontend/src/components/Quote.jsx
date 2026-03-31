import React, { useState } from 'react';
import { FileText, Send, CheckCircle } from 'lucide-react';
import { quoteForm } from '../data/mock';
import { toast } from '../components/ui/sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const [attachment, setAttachment] = useState(null);
  const [fileName, setFileName] = useState('');
  const [formLoadedAt] = useState(() => String(Date.now() / 1000));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Limit file size to 10MB
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale est de 10 Mo.",
          variant: "destructive",
        });
        return;
      }
      setAttachment(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('company', formData.company || '');
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('serviceType', formData.serviceType);
    submitData.append('message', formData.message);
    submitData.append('ts', formLoadedAt);
    if (attachment) {
      submitData.append('attachment', attachment);
    }
    
    // Call backend API
    axios.post(`${BACKEND_URL}/api/quote`, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Quote submitted:', response.data);
        
        toast.success("Demande envoyée !", {
          description: response.data.message || "Nous vous contacterons dans les plus brefs délais.",
        });

        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          serviceType: '',
          message: '',
        });
        setAttachment(null);
        setFileName('');
        // Reset file input
        const fileInput = document.getElementById('quote-attachment');
        if (fileInput) fileInput.value = '';
      })
      .catch(error => {
        console.error('Error submitting quote:', error);
        
        toast.error("Erreur", {
          description: error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
        });
      });
  };

  const serviceTypes = [
    'Agent de prévention et sécurité',
    'Sécurité cynophile (Maître-chien)',
    'SSIAP',
    'Événementiel',
    'Gardiennage',
    'Autre'
  ];

  return (
    <section id="quote" className="relative py-20 bg-stone-200">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-wider mb-4 uppercase">
            {quoteForm.title}
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            {quoteForm.description}
          </p>
        </div>

        {/* Quote Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black border-4 border-amber-400/30 p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="Nom de l'entreprise"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="+33 6 XX XX XX XX"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                  Type de service *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="">Sélectionnez un service</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                  Détails de votre projet *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  placeholder="Précisez-nous les informations suivantes :&#10;- Type d'événement ou de site à sécuriser&#10;- Dates et horaires souhaités&#10;- Adresse / lieu de la prestation&#10;- Nombre d'agents nécessaires (si connu)&#10;- Toute autre information utile (accès, contraintes...)"
                />
              </div>

              {/* Attachment */}
              <div>
                <label htmlFor="quote-attachment" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                  Pièce jointe (optionnel)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="quote-attachment"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="quote-attachment"
                    className="w-full bg-neutral-900 border border-amber-400/30 text-gray-400 px-4 py-3 cursor-pointer hover:border-amber-400 transition-colors flex items-center justify-between"
                  >
                    <span>{fileName || "Choisir un fichier (PDF, DOC, Image - Max 10 Mo)"}</span>
                    <FileText size={20} className="text-amber-400" />
                  </label>
                </div>
                {fileName && (
                  <p className="text-sm text-amber-400 mt-2">Fichier sélectionné : {fileName}</p>
                )}
              </div>

              {/* Honeypot - invisible to humans */}
              <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="group px-10 py-4 bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                >
                  <Send size={20} className="mr-3 group-hover:translate-x-1 transition-transform" />
                  Envoyer la demande
                </button>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-700 text-sm">
              <CheckCircle className="inline-block mr-2 text-amber-600" size={18} />
              Réponse sous 24h • Devis gratuit et sans engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
