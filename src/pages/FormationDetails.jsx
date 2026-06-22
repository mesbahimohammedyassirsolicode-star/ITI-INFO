import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formationService } from '../services/api';
import MagneticHover from '../components/MagneticHover';
import { fadeUp, imageReveal } from '../animations/motionVariants';
import useSEO from '../hooks/useSEO';

const FormationDetails = () => {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: formation ? `${formation.title} | Institut ITI Tanger` : 'Formation | Institut ITI Tanger',
    description: formation?.description || "D\u00e9couvrez les d\u00e9tails de la formation \u00e0 l'Institut ITI \u00e0 Tanger.",
    canonical: formation ? `https://institut-iti.ma/formations/${formation.id || id}` : undefined,
    ogImage: formation?.image || undefined,
  });

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await formationService.getById(id);
        setFormation(response.data.data);
      } catch (error) {
        console.error('Error fetching formation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!formation) {
    return <Navigate to="/formations" />;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative h-[350px] sm:h-[400px] md:h-[500px] overflow-hidden"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <motion.img 
          alt={formation.title} 
          className="w-full h-full object-cover" 
          src={formation.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"} 
          variants={imageReveal}
          initial="hidden"
          animate="show"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent flex items-end pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-8">
            <div className="max-w-3xl text-white">
              <span className="bg-tertiary-container text-on-tertiary-container px-4 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4 inline-block rounded">
                {formation.category?.name}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">{formation.title}</h1>
              <div className="flex flex-wrap gap-4 md:gap-8">
                {formation.duration && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary-fixed">schedule</span>
                    <span className="font-bold text-sm uppercase tracking-widest">{formation.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed">verified</span>
                  <span className="font-bold text-sm uppercase tracking-widest">Accrédité par l'État</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-headline-lg text-primary mb-6">Aperçu</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed whitespace-pre-line">
                {formation.description}
              </p>
              <div className="mt-8 p-6 bg-surface-container rounded-2xl border border-outline/10">
                <h4 className="font-label-md text-primary uppercase tracking-widest mb-2">Conditions d'admission</h4>
                <p className="text-on-surface-variant">{formation.condition}</p>
              </div>
            </div>

            {/* Curriculum and other sections would come from the API if available */}
            {/* For now we stick to the core fields provided by the API */}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div
              className="bg-primary text-white p-8 rounded-2xl shadow-xl"
              whileHover={{ scale: 1.03, transition: { duration: 0.45, ease: 'easeInOut' } }}
            >
              <h3 className="font-headline-md mb-6">Passez à l'étape suivante</h3>
              <p className="text-primary-fixed-dim text-sm mb-8">
                Prêt à transformer votre carrière ? Rejoignez TRANS INFORMATIQUE et maîtrisez les compétences nécessaires pour l'industrie de demain.
              </p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <MagneticHover>
                  <Link 
                    to="/inscription"
                    state={{ formationId: formation.id }}
                    className="w-full bg-tertiary-container text-on-tertiary-container font-black py-4 rounded-xl text-center block uppercase tracking-widest transition-transform"
                  >
                    S'inscrire à ce programme
                  </Link>
                </MagneticHover>
              </div>
            </motion.div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-headline-md text-primary mb-4 text-lg">Besoin d'aide pour choisir ?</h4>
              <p className="text-on-surface-variant text-sm mb-6">Nos conseillers académiques sont là pour vous aider à trouver la voie qui correspond à vos objectifs de carrière.</p>
              <Link to="/contact" className="text-secondary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform uppercase text-xs tracking-widest">
                Contacter un conseiller <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FormationDetails;
