import React, { useState } from 'react';
import { FileText, Send, CheckCircle } from 'lucide-react';
import { quoteForm } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const Quote = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    console.log('Quote form submitted:', formData);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons dans les plus brefs délais.",
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
                  placeholder="Décrivez vos besoins en matière de sécurité..."
                />
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
