import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formationService, inscriptionService } from '../services/api';
import MagneticHover from '../components/MagneticHover';
import { fadeUp, imageReveal, staggerContainer } from '../animations/motionVariants';

const Inscription = () => {
  const location = useLocation();
  const [formations, setFormations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    formation_id: location.state?.formationId || '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await formationService.getAll();
        setFormations(response.data.data);
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };
    fetchFormations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await inscriptionService.create(formData);
      setStatus({ type: 'success', message: 'Inscription envoyée avec succès' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        formation_id: '',
        message: ''
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Header */}
      <motion.header
        className="relative bg-primary py-12 md:py-24 overflow-hidden"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2 space-y-4 md:space-y-6">
            <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded">Inscriptions 2026-2027</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">Votre Carrière <span className="text-tertiary-fixed">Commence Ici</span></h1>
            <p className="text-sm sm:text-base max-w-lg opacity-90">
              Rejoignez le premier institut technologique du Maroc. Notre processus d'admission transparent est conçu pour trouver les innovateurs de demain.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-tertiary/20 blur-2xl rounded-full"></div>
              <motion.img 
                alt="Étudiants en train d'étudier" 
                className="rounded-xl shadow-2xl relative z-10 w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover" 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                variants={imageReveal}
                initial="hidden"
                animate="show"
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Process Stepper */}
      <motion.section
        className="py-12 md:py-20 bg-surface-container-lowest"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-headline-lg text-primary">Parcours d'Admission</h2>
            <div className="w-24 h-1 bg-tertiary mx-auto mt-4"></div>
          </div>
          <motion.div
            className="relative grid grid-cols-1 md:grid-cols-3 gap-12 pt-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {[
              { num: '01', icon: 'edit_note', title: 'Candidature', desc: 'Remplissez notre formulaire en ligne avec vos informations personnelles et votre programme d\'études préféré.' },
              { num: '02', icon: 'assignment_turned_in', title: 'Évaluation', desc: 'Participez à une évaluation technique et un entretien avec notre conseil académique.' },
              { num: '03', icon: 'school', title: 'Inscription', desc: 'Finalisez votre inscription en soumettant les documents requis et les frais d\'inscription.' }
            ].map((step, index) => (
              <motion.div key={index} className="relative z-10 flex flex-col items-center text-center px-4 group" variants={fadeUp}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-300 ${index === 2 ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary text-white group-hover:bg-secondary'}`}>
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                <h3 className="font-headline-md text-primary mb-2 uppercase text-sm tracking-widest">{step.num}. {step.title}</h3>
                <p className="text-on-surface-variant text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Application Form */}
      <motion.section
        className="py-12 md:py-20 bg-surface-container-low"
        id="form"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl border border-outline-variant">
            {/* Left: Info */}
            <div className="lg:w-1/3 bg-primary p-8 md:p-12 text-white">
              <h2 className="font-headline-md mb-6 uppercase tracking-tight">Prêt à commencer ?</h2>
              <p className="opacity-80 mb-12 text-sm leading-relaxed">Remplissez ce formulaire et notre équipe d'admission vous contactera dans les 24 heures pour planifier votre entretien.</p>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-tertiary-fixed text-3xl">support_agent</span>
                  <div>
                    <p className="font-bold uppercase text-[10px] tracking-widest opacity-60">Lignes d'Assistance</p>
                    <p className="text-lg font-black text-tertiary-fixed">05 39 93 95 37</p>
                    <p className="text-lg font-black text-tertiary-fixed">06 68 43 48 95</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-tertiary-fixed text-3xl">mail</span>
                  <div>
                    <p className="font-bold uppercase text-[10px] tracking-widest opacity-60">E-mail Admissions</p>
                    <p className="text-sm font-medium">institutrans@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Form */}
            <div className="lg:w-2/3 p-6 md:p-12">
              {status.message && (
                <div className={`mb-8 p-4 rounded-xl text-sm font-bold uppercase tracking-widest ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {status.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest block">Nom Complet</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface-container border-none rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none" 
                      placeholder="ex: Adam Smith" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest block">Adresse E-mail</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface-container border-none rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none" 
                      placeholder="adam@exemple.com" 
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest block">Numéro de Téléphone</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface-container border-none rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none" 
                      placeholder="+212 6..." 
                      type="tel"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest block">Programme d'Intérêt</label>
                    <select 
                      name="formation_id"
                      value={formData.formation_id}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface-container border-none rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none appearance-none"
                    >
                      <option value="">Sélectionnez un programme</option>
                      {formations.map(f => (
                        <option key={f.id} value={f.id}>{f.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-primary uppercase tracking-widest block">Message (Optionnel)</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-surface-container border-none rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none" 
                    placeholder="Des questions spécifiques ou des détails sur votre parcours..." 
                    rows="4"
                  ></textarea>
                </div>
                <div className="pt-6">
                  <MagneticHover>
                    <motion.button 
                      disabled={loading}
                      className="w-full bg-secondary text-white font-black py-5 rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50" 
                      type="submit"
                    >
                      {loading ? 'Envoi en cours...' : 'Soumettre la candidature'}
                    </motion.button>
                  </MagneticHover>
                  <p className="text-center text-[10px] text-on-surface-variant mt-6 uppercase tracking-widest opacity-60">En soumettant ce formulaire, vous acceptez nos Conditions d'Utilisation et notre Politique de Confidentialité.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Inscription;
