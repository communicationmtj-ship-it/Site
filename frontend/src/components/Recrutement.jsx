import React, { useState } from 'react';
import { Send, FileText, Briefcase, Mail, Phone, User } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SeoHead from './SeoHead';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

import { safeJsonLd } from '../utils/safeJsonLd';

const Recrutement = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [attachments, setAttachments] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [consent, setConsent] = useState(false);
  const [formLoadedAt] = useState(() => String(Date.now() / 1000));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Check total size
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 20 * 1024 * 1024) { // 20 MB total
      toast.error("Fichiers trop volumineux", {
        description: "La taille totale maximale est de 20 Mo.",
      });
      return;
    }

    setAttachments(files);
    setFileNames(files.map(f => f.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Consentement requis", {
        description: "Veuillez cocher la case de consentement pour envoyer votre candidature.",
      });
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append('firstName', formData.firstName);
    submitData.append('lastName', formData.lastName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('message', formData.message);
    submitData.append('ts', formLoadedAt);
    submitData.append('consent', 'true');
    
    // Append all attachments
    attachments.forEach((file, index) => {
      submitData.append('attachments', file);
    });
    
    // Call backend API
    axios.post(`${BACKEND_URL}/api/recrutement`, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        // 12/11/2026 — le serveur répond 200 avec status « error » quand il refuse
        // (consentement, champ invalide) : jamais « envoyé » dans ce cas.
        if (response?.data?.status !== 'success') {
          toast.error("Envoi refusé", {
            description: response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
          });
          return;
        }
        toast.success("Candidature envoyée !", {
          description: response.data.message || "Nous examinerons votre candidature et vous contacterons rapidement.",
        });

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });
        setAttachments([]);
        setFileNames([]);
        setConsent(false);
        // Reset file input
        const fileInput = document.getElementById('recruitment-attachments');
        if (fileInput) fileInput.value = '';
      })
      .catch(error => {
        toast.error("Erreur", {
          description: error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
        });
      });
  };

  return (
    <div className="min-h-screen bg-black">
      <SeoHead
        title="Recrutement | Rejoignez MTJ Sécurité Privée | Postulez"
        description="MTJ Sécurité Privée recrute des agents de sécurité, maîtres-chiens, SSIAP et agents de protection rapprochée. Postulez en ligne dès maintenant."
        path="/recrutement"
      />
      <Navbar />
      <main id="contenu" tabIndex={-1}>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-black via-neutral-900 to-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 bg-amber-400/10 backdrop-blur-sm rounded-full border-2 border-amber-400/30 mb-8">
              <Briefcase size={48} className="text-amber-400" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-wider mb-6 uppercase">
              Recrutement
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8">
              Rejoignez l'équipe MTJ SÉCURITÉ PRIVÉE
            </p>
            
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Nous recherchons des professionnels passionnés et qualifiés pour renforcer notre équipe. 
              Si vous partagez nos valeurs de professionnalisme et d'excellence, postulez dès maintenant !
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="relative py-20 bg-stone-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-black tracking-wider mb-4 uppercase">
                Postulez maintenant
              </h2>
              <p className="text-gray-700 text-lg">
                Remplissez le formulaire ci-dessous et joignez votre CV et lettre de motivation
              </p>
            </div>

            {/* Profils recherchés (repris de la description de la page) */}
            <div className="mt-10 mb-12 bg-black border border-amber-400/30 p-6 text-left">
              <h2 className="text-amber-400 font-bold uppercase tracking-wide text-sm mb-3">Profils recherchés</h2>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>Agents de sécurité</li>
                <li>Maîtres-chiens</li>
                <li>Agents SSIAP</li>
                <li>Agents de protection rapprochée</li>
              </ul>
            </div>

            <div className="bg-black border-4 border-amber-400/30 p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="Votre prénom"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="Votre nom"
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
                      Téléphone portable *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Message de motivation *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-neutral-900 border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    placeholder="Présentez-vous et expliquez pourquoi vous souhaitez rejoindre MTJ SÉCURITÉ PRIVÉE..."
                  />
                </div>

                {/* Attachments */}
                <div>
                  <label htmlFor="recruitment-attachments" className="block text-amber-400 font-semibold mb-2 uppercase tracking-wide text-sm">
                    CV et documents (obligatoire)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="recruitment-attachments"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      multiple
                      required
                    />
                    <label
                      htmlFor="recruitment-attachments"
                      className="w-full bg-neutral-900 border border-amber-400/30 text-gray-400 px-4 py-3 cursor-pointer hover:border-amber-400 transition-colors flex items-center justify-between"
                    >
                      <span>
                        {fileNames.length > 0 
                          ? `${fileNames.length} fichier(s) sélectionné(s)` 
                          : "Choisir fichiers (CV, lettre de motivation, diplômes - Max 20 Mo total)"
                        }
                      </span>
                      <FileText size={20} className="text-amber-400" />
                    </label>
                  </div>
                  {fileNames.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {fileNames.map((name) => (
                        <p key={`file-${name}`} className="text-sm text-amber-400">
                          ✓ {name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Consentement RGPD */}
                <div>
                  <label htmlFor="recruitment-consent" className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed cursor-pointer">
                    <input
                      type="checkbox"
                      id="recruitment-consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-1 h-4 w-4 accent-amber-400 shrink-0"
                      data-testid="recruitment-consent"
                    />
                    <span>
                      J'accepte que MTJ Sécurité Privée traite les informations et documents transmis (CV, lettre de motivation, diplômes) pour étudier ma candidature.
                      Mes données sont conservées 2 ans après notre dernier échange, puis supprimées. Je peux exercer mon droit d'accès, de rectification et de suppression en écrivant à l'adresse indiquée dans la{' '}
                      <Link to="/politique-de-confidentialite" className="underline text-amber-400 hover:text-amber-300">politique de confidentialité</Link>. *
                    </span>
                  </label>
                  <p className="text-gray-500 text-xs mt-2 ml-7">
                    Merci de ne pas joindre de pièce inutile à l'étude de votre candidature (numéro de sécurité sociale, RIB, informations de santé).
                  </p>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="group px-10 py-4 bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                  >
                    <Send size={20} className="mr-3 group-hover:translate-x-1 transition-transform" />
                    Envoyer ma candidature
                  </button>
                </div>
                <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                  <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-700 text-sm">
                <FileText className="inline-block mr-2 text-amber-600" size={18} />
                Formats acceptés : PDF, DOC, DOCX, Images • Taille maximale : 20 Mo
              </p>
              <p className="text-gray-700 text-sm">
                <Mail className="inline-block mr-2 text-amber-600" size={18} />
                Votre candidature sera examinée dans les plus brefs délais
              </p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Recrutement MTJ Sécurité Privée",
        "description": "MTJ Sécurité Privée recrute des agents de sécurité, maîtres-chiens, SSIAP et agents de protection rapprochée.",
        "url": "https://mtj-securite-privee.fr/recrutement",
        "publisher": {
          "@type": "Organization",
          "name": "MTJ Sécurité Privée",
          "url": "https://mtj-securite-privee.fr"
        }
      })}} />
      </main>
      <Footer />
    </div>
  );
};

export default Recrutement;
