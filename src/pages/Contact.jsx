import { useState } from 'react';
import { motion } from 'framer-motion';
import { contactService } from '../services/api';
import MagneticHover from '../components/MagneticHover';
import { fadeUp, imageReveal, staggerContainer } from '../animations/motionVariants';
import useSEO from '../hooks/useSEO';

const Contact = () => {
  useSEO({
    title: "Contactez l'Institut ITI Tanger | Admissions & Renseignements",
    description: "Contactez l'Institut ITI \u00e0 Tanger pour vos questions sur les formations et admissions. T\u00e9l\u00e9phone: 05 39 93 95 37. E-mail: instituttrans@gmail.com. Adresse: 42, Rue de F\u00e8s, Tanger.",
    canonical: 'https://institut-iti.ma/contact',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await contactService.create(formData);
      setStatus({ type: 'success', message: 'Message envoyé avec succès' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <motion.section
        className="bg-primary py-12 md:py-20 text-white"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">Contactez-nous</h1>
          <p className="text-sm sm:text-base max-w-2xl mx-auto opacity-80">
            Vous avez des questions sur nos programmes ou le processus d'admission ? Contactez-nous, nous serons ravis de vous aider.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="py-12 md:py-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Contact Info */}
            <div className="space-y-12">
              <h2 className="font-headline-lg text-primary">Restons en contact</h2>

              <div className="space-y-8">
                <motion.div className="flex items-start gap-6 group" variants={fadeUp}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-primary mb-1 uppercase text-sm tracking-widest">Notre Campus</h4>
                    <p className="text-on-surface-variant">42, Rue de Fès – Tanger, Maroc</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-6 group" variants={fadeUp}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl">call</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-primary mb-1 uppercase text-sm tracking-widest">Lignes Directes</h4>
                    <p className="text-on-surface-variant font-bold">05 39 93 95 37</p>
                    <p className="text-on-surface-variant font-bold">06 68 43 48 95</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-6 group" variants={fadeUp}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl">mail</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-primary mb-1 uppercase text-sm tracking-widest">Écrivez-nous</h4>
                    <p className="text-on-surface-variant">instituttrans@gmail.com</p>
                  </div>
                </motion.div>
              </div>

              {/* Map */}
              <motion.div
                className="h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white mt-12"
                variants={imageReveal}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.9452060687654!2d-5.8142233!3d35.776722299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c7f5535026d2f%3A0x61b8886f50ec8d7a!2sInstitut%20Trans%20Informatique!5e0!3m2!1sen!2sma!4v1776953830842!5m2!1sen!2sma"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Institut Trans Informatique Location"
                ></iframe>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100"
              variants={fadeUp}
            >
              <h3 className="font-headline-md text-primary mb-8">Envoyez-nous un message</h3>
              {status.message && (
                <div className={`mb-8 p-4 rounded-xl text-sm font-bold uppercase tracking-widest ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {status.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest block">Nom Complet</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      type="text"
                      className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="ex: Ahmed Saïd"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest block">Adresse E-mail</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      type="email"
                      className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="ahmed@exemple.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-primary uppercase tracking-widest block">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="Votre message ici..."
                  ></textarea>
                </div>
                <MagneticHover>
                  <motion.button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-secondary text-white font-black py-5 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50"
                  >
                    {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                  </motion.button>
                </MagneticHover>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
