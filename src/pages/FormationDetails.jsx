import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { formationService } from '../services/api';
import MagneticHover from '../components/MagneticHover';
import { fadeUp, imageReveal } from '../animations/motionVariants';
import useSEO from '../hooks/useSEO';
import { getLocalized } from '../utils/i18nHelper';

const FormationDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';

  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);

  const titleText = getLocalized(formation?.title, currentLang);
  const descText = getLocalized(formation?.description, currentLang);
  const durationText = getLocalized(formation?.duration, currentLang);
  const conditionText = getLocalized(formation?.condition, currentLang);
  const categoryName = getLocalized(formation?.category?.name, currentLang);

  useSEO({
    title: formation ? `${titleText} | Institut ITI Tanger` : 'Formation | Institut ITI Tanger',
    description: descText || "Détails de la formation à l'Institut ITI à Tanger.",
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
          alt={titleText} 
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
                {categoryName}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">{titleText}</h1>
              <div className="flex flex-wrap gap-4 md:gap-8">
                {durationText && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary-fixed">schedule</span>
                    <span className="font-bold text-sm uppercase tracking-widest">{durationText}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed">verified</span>
                  <span className="font-bold text-sm uppercase tracking-widest">{t('formations.diplomaStateAccredited')}</span>
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
              <h2 className="font-headline-lg text-primary mb-6">{t('formationDetails.overview')}</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed whitespace-pre-line">
                {descText}
              </p>
              {conditionText && (
                <div className="mt-8 p-6 bg-surface-container rounded-2xl border border-outline/10">
                  <h4 className="font-label-md text-primary uppercase tracking-widest mb-2">{t('formationDetails.admissionConditions')}</h4>
                  <p className="text-on-surface-variant">{conditionText}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div
              className="bg-primary text-white p-8 rounded-2xl shadow-xl"
              whileHover={{ scale: 1.03, transition: { duration: 0.45, ease: 'easeInOut' } }}
            >
              <h3 className="font-headline-md mb-6">{t('formationDetails.nextStepTitle')}</h3>
              <p className="text-primary-fixed-dim text-sm mb-8">
                {t('formationDetails.nextStepDesc')}
              </p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <MagneticHover>
                  <Link 
                    to="/inscription"
                    state={{ formationId: formation.id }}
                    className="w-full bg-tertiary-container text-on-tertiary-container font-black py-4 rounded-xl text-center block uppercase tracking-widest transition-transform"
                  >
                    {t('formationDetails.applyForProgram')}
                  </Link>
                </MagneticHover>
              </div>
            </motion.div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-headline-md text-primary mb-4 text-lg">{t('formationDetails.needHelpTitle')}</h4>
              <p className="text-on-surface-variant text-sm mb-6">{t('formationDetails.needHelpDesc')}</p>
              <Link to="/contact" className="text-secondary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform uppercase text-xs tracking-widest">
                {t('formationDetails.contactAdvisor')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FormationDetails;
