import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedCounter from '../components/AnimatedCounter';
import MagneticHover from '../components/MagneticHover';
import { fadeUp, imageReveal, staggerContainer } from '../animations/motionVariants';
import useSEO from '../hooks/useSEO';

const Home = () => {
  const { t } = useTranslation();

  useSEO({
    title: t('seo.homeTitle'),
    description: t('seo.homeDescription'),
    canonical: 'https://institut-iti.ma/',
  });

  const aboutItems = useMemo(() => [
    { icon: 'school', title: t('home.about.item1Title'), description: t('home.about.item1Desc') },
    { icon: 'groups', title: t('home.about.item2Title'), description: t('home.about.item2Desc') },
    { icon: 'work', title: t('home.about.item3Title'), description: t('home.about.item3Desc') },
    { icon: 'emoji_events', title: t('home.about.item4Title'), description: t('home.about.item4Desc') },
  ], [t]);

  const faqItems = useMemo(() => [
    { q: t('home.faq.q1'), a: t('home.faq.a1') },
    { q: t('home.faq.q2'), a: t('home.faq.a2') },
    { q: t('home.faq.q3'), a: t('home.faq.a3') },
    { q: t('home.faq.q4'), a: t('home.faq.a4') },
    { q: t('home.faq.q5'), a: t('home.faq.a5') }
  ], [t]);

  return (
    <div className="flex flex-col">
      {/* Section Héros */}
      <motion.section
        className="relative h-[480px] sm:h-[600px] md:h-[870px] flex items-center overflow-hidden"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <div className="absolute inset-0 z-0">
          <motion.img 
            className="w-full h-full object-cover" 
            alt="Campus de l'Institut ITI"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTJJNelJC-5dOTIetDUH2MTji6xFaweRrSqGOCoANWOyh1cFavKuGP_XnpeT3PwRyHru9I3UZqdTjm0f4vlOXllEKqvBFhTwq5b1kIiEWKHuT2n1osQ44Xq_AQb8Qp_tsjkknN9GoDbgihRvWg-Annv2YFBO7x3-DIVplMcSBh0_lbDzy4wZ9jLnFwTwqvAmmxueTP1IlxjRaWgHJx-gxKdkz3ezXGKcfFPyTEWUDR4IW6TdNQSTfFgd4DEfiI8cCKhHF99LSXsVw"
            variants={imageReveal}
            initial="hidden"
            animate="show"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40"></div>
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10 max-w-7xl">
          <div className="max-w-2xl text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-tertiary-container text-on-tertiary-container font-label-md mb-4 md:mb-6 uppercase tracking-widest text-[10px] md:text-xs">
              {t('home.hero.badge')}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-primary-fixed mb-6 md:mb-8 opacity-90 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <MagneticHover>
                <Link to="/inscription" className="bg-tertiary-container text-on-tertiary-container px-6 md:px-8 py-3 md:py-4 rounded-xl font-headline-md shadow-lg hover:shadow-xl transform transition-all uppercase tracking-widest text-xs md:text-sm block text-center">
                  {t('home.hero.applyNow')}
                </Link>
              </MagneticHover>
              <MagneticHover>
                <Link to="/formations" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-headline-md hover:bg-white/20 transition-all uppercase tracking-widest text-xs md:text-sm block text-center">
                  {t('home.hero.viewFormations')}
                </Link>
              </MagneticHover>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section À Propos */}
      <motion.section
        className="py-12 md:py-20 bg-white"
        id="a-propos"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-tertiary-container rounded-xl -z-10 opacity-20"></div>
              <motion.img 
                className="rounded-xl shadow-2xl w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover" 
                alt="Étudiants à l'ITI"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA2gyScZsd3-hC2m31wmkQLNZABOrnhAiufRB_947WfyLUXLWrCLB__JqJb4iqrXZymxLYsVV_EeCM0B519Be5aX6wXy25fHMx9GDgjYnuf-Yq-zGndtdWqEfrFz-Twg-cOSclxqtZcjW3nEcUYYdKrpypJc6CSUaXm73fixkyh4S57_VXhgiywtiJEvw_-5zdhHemAZDNtO_AZuCD6FMG1egCg9put3295ehfPE2pQJqhC30dMbmuKQlOSCbIOr_Yrh6JNYrQiG0"
                variants={imageReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              />
              <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-xl shadow-lg border-l-4 border-secondary">
                <p className="text-secondary font-headline-xl mb-0"><AnimatedCounter value={38} suffix="+" /></p>
                <p className="text-on-surface-variant font-label-md uppercase tracking-widest text-[10px]">{t('home.about.yearsLabel')}</p>
              </div>
            </div>

            <div>
              <h2 className="font-headline-lg text-primary mb-6">{t('home.about.title')}</h2>
              <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                {t('home.about.paragraph1')}
              </p>
              <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                {t('home.about.paragraph2')}
              </p>
              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {aboutItems.map((item, index) => (
                  <motion.div key={index} className="bg-surface-container-low rounded-xl p-4 text-center" variants={fadeUp}>
                    <span className="material-symbols-outlined text-3xl text-secondary mb-2">
                      {item.icon}
                    </span>
                    <h3 className="font-headline-md text-primary text-sm mb-1">{item.title}</h3>
                    <p className="text-on-surface-variant text-xs">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Aperçu des Formations */}
      <motion.section
        className="py-12 md:py-20 bg-surface-container-low"
        id="formations"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-primary mb-4">{t('home.programsPreview.title')}</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">{t('home.programsPreview.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Navigation & Logistique */}
            <motion.div
              className="md:col-span-12 group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-8 border border-outline-variant/30"
              whileHover={{ scale: 1.01, transition: { duration: 0.45, ease: 'easeInOut' } }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="md:w-1/2">
                  <span className="material-symbols-outlined text-4xl text-secondary mb-4">local_shipping</span>
                  <h3 className="font-headline-md text-primary mb-3">{t('home.programsPreview.logisticsTitle')}</h3>
                  <p className="text-on-surface-variant font-body-md mb-4 text-sm">{t('home.programsPreview.logisticsDesc')}</p>
                  <Link to="/formations" className="text-secondary font-label-md flex items-center gap-2 group-hover:translate-x-2 transition-transform uppercase text-xs tracking-widest font-bold">
                    {t('home.programsPreview.learnMore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
                <div className="md:w-1/2 h-full w-full">
                  <motion.img
                    className="rounded-lg h-48 w-full object-cover"
                    alt="Logistique"
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                    variants={imageReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section FAQ */}
      <motion.section
        className="py-12 md:py-20 bg-surface-container-low"
        id="faq"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-primary mb-4">{t('home.faq.title')}</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">{t('home.faq.subtitle')}</p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.details
                key={index}
                className="group bg-white rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all"
                variants={fadeUp}
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-headline-md text-primary text-sm md:text-base uppercase tracking-tight">
                  {item.q}
                  <span className="material-symbols-outlined text-secondary ml-4 transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
                  {item.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quick Registration CTA */}
      <motion.section
        className="py-12 md:py-20 bg-white"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="bg-secondary rounded-2xl p-6 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-headline-lg text-white mb-4 md:mb-6">{t('home.cta.title')}</h2>
              <p className="font-body-lg text-white mb-6 md:mb-8 opacity-90">{t('home.cta.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticHover>
                  <Link to="/inscription" className="bg-tertiary-container text-on-tertiary-container px-6 md:px-8 py-3 md:py-4 rounded-xl font-black text-base md:text-lg transition-transform uppercase tracking-widest shadow-lg block text-center">
                    {t('home.cta.registerNow')}
                  </Link>
                </MagneticHover>
                <MagneticHover>
                  <Link to="/contact" className="bg-transparent border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-white hover:text-secondary transition-colors duration-200 uppercase tracking-widest block text-center">
                    {t('home.cta.contactUs')}
                  </Link>
                </MagneticHover>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
