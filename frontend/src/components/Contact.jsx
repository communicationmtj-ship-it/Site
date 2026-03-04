import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { contactInfo, companyInfo } from '../data/mock';
import { toast } from '../components/ui/sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [attachment, setAttachment] = useState(null);
  const [fileName, setFileName] = useState('');

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
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone || '');
    submitData.append('subject', formData.subject);
    submitData.append('message', formData.message);
    if (attachment) {
      submitData.append('attachment', attachment);
    }
    
    // Call backend API
    axios.post(`${BACKEND_URL}/api/contact`, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Contact submitted:', response.data);
        
        toast.success("Message envoyé !", {
          description: response.data.message || "Nous vous répondrons dans les plus brefs délais.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setAttachment(null);
        setFileName('');
        // Reset file input
        const fileInput = document.getElementById('contact-attachment');
        if (fileInput) fileInput.value = '';
      })
      .catch(error => {
        console.error('Error submitting contact:', error);
        
        toast.error("Erreur", {
          description: error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
        });
      });
  };

  return (
    <section id="contact" className="relative py-20 bg-stone-200">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-wider mb-4 uppercase">
            {contactInfo.title}
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            {contactInfo.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information & Image */}
          <div className="space-y-8">
            {/* Image */}
            <div className="relative h-[400px] overflow-hidden shadow-2xl">
              <img
                src="https://customer-assets.emergentagent.com/job_24fc2e4e-22c8-49ad-ae48-a4221e89d53a/artifacts/39logzjd_IMG_2317.jpeg"
                alt="Contact MTJ Sécurité"
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

            {/* Contact Details */}
            <div className="bg-black p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-400/20 border border-amber-400/30">
                  <Phone size={24} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1 uppercase tracking-wide text-sm">
                    Téléphone
                  </h4>
                  <p className="text-white text-lg">{companyInfo.phone}</p>
                  <p className="text-gray-400 text-sm mt-1">Disponible 24/7</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-400/20 border border-amber-400/30">
                  <Mail size={24} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1 uppercase tracking-wide text-sm">
                    Email
                  </h4>
                  <p className="text-white text-lg">{companyInfo.email}</p>
                  <p className="text-gray-400 text-sm mt-1">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-400/20 border border-amber-400/30">
                  <MapPin size={24} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1 uppercase tracking-wide text-sm">
                    Adresse
                  </h4>
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
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
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
                  <label htmlFor="contact-phone" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="+33 6 XX XX XX XX"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="Sujet de votre message"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                {/* Attachment */}
                <div>
                  <label htmlFor="contact-attachment" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Pièce jointe (optionnel)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="contact-attachment"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="contact-attachment"
                      className="w-full bg-neutral-900 border border-amber-400/30 text-gray-400 px-4 py-3 cursor-pointer hover:border-amber-400 transition-colors flex items-center justify-between"
                    >
                      <span>{fileName || "Choisir un fichier (PDF, DOC, Image - Max 10 Mo)"}</span>
                      <Send size={20} className="text-amber-400" />
                    </label>
                  </div>
                  {fileName && (
                    <p className="text-sm text-amber-400 mt-2">Fichier sélectionné : {fileName}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full px-8 py-4 bg-amber-400 hover:bg-amber-500 text-black font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  <Send size={20} className="mr-3 group-hover:translate-x-1 transition-transform" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
