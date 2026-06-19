import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import MagneticHover from '../components/MagneticHover';
import { fadeUp, imageReveal, staggerContainer } from '../animations/motionVariants';
import useSEO from '../hooks/useSEO';

const Home = () => {
  useSEO({
    title: 'Institut ITI Tanger | Formations Professionnelles en Informatique & Gestion',
    description: "Formations professionnelles en informatique, logistique et gestion \u00e0 Tanger. Dipl\u00f4mes accr\u00e9dit\u00e9s par l'\u00c9tat depuis 1986. Inscrivez-vous pour la session 2026-2027.",
    canonical: 'https://institut-iti.ma/',
  });

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
            <span className="inline-block py-1 px-3 rounded-full bg-tertiary-container text-on-tertiary-container font-label-md mb-4 md:mb-6 uppercase tracking-widest text-[10px] md:text-xs">Inscriptions Ouvertes 2026</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">Préparez votre carrière dès aujourd'hui</h1>
            <p className="text-sm sm:text-base md:text-lg text-primary-fixed mb-6 md:mb-8 opacity-90 leading-relaxed">Rejoignez le premier institut trans informatique de Tanger. Depuis 1986, nous formons la prochaine génération de professionnels de l'informatique et de la gestion avec des diplômes reconnus.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <MagneticHover>
                <Link to="/inscription" className="bg-tertiary-container text-on-tertiary-container px-6 md:px-8 py-3 md:py-4 rounded-xl font-headline-md shadow-lg hover:shadow-xl transform transition-all uppercase tracking-widest text-xs md:text-sm block text-center">Postuler Maintenant</Link>
              </MagneticHover>
              <MagneticHover>
                <Link to="/formations" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-headline-md hover:bg-white/20 transition-all uppercase tracking-widest text-xs md:text-sm block text-center">Voir les Formations</Link>
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
                <p className="text-on-surface-variant font-label-md uppercase tracking-widest text-[10px]">Ans d'Excellence</p>
              </div>
            </div>
            <div>
              <h2 className="font-headline-lg text-primary mb-6">Bâtir l'excellence depuis 1986</h2>
              <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                Fondée en 1986 au cœur de Tanger, l'Institut ITI (Institut Trans Informatique) s'est imposée comme une pierre angulaire de l'enseignement technique dans le Nord du Maroc. Notre mission est de fournir une formation professionnelle de haute qualité qui répond aux exigences évolutives du marché de l'emploi.
              </p>
              <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                Nous sommes fiers d'offrir un environnement d'apprentissage structuré où les compétences pratiques rencontrent la rigueur théorique, garantissant que nos diplômés sont prêts pour une carrière réussie.
              </p>
              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {[
                  { icon: 'verified', label: 'Accrédité par l\'État' },
                  { icon: 'terminal', label: 'Ateliers Pratiques' },
                  { icon: 'groups', label: 'Experts Formateurs' },
                  { icon: 'history_edu', label: 'Aide à l\'Emploi' }
                ].map((item) => (
                  <motion.div key={item.label} className="flex items-center gap-3" variants={fadeUp}>
                    <span className="material-symbols-outlined text-secondary symbol-filled">{item.icon}</span>
                    <span className="font-label-md text-xs uppercase tracking-tight">{item.label}</span>
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
            <h2 className="font-headline-lg text-primary mb-4">Nos Programmes Académiques</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Découvrez un cursus conçu pour le monde moderne, combinant maîtrise technique et sens des affaires.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Navigation & Logistique */}
            <motion.div
              className="md:col-span-7 group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-8 border border-outline-variant/30"
              whileHover={{ scale: 1.03, transition: { duration: 0.45, ease: 'easeInOut' } }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="md:w-1/2">
                  <span className="material-symbols-outlined text-4xl text-secondary mb-4">local_shipping</span>
                  <h3 className="font-headline-md text-primary mb-3">Navigation & Logistique</h3>
                  <p className="text-on-surface-variant font-body-md mb-4 text-sm">Devenez un expert en transit, douane et gestion des flux de transport nationaux et internationaux.</p>
                  <Link to="/formations" className="text-secondary font-label-md flex items-center gap-2 group-hover:translate-x-2 transition-transform uppercase text-xs tracking-widest font-bold">En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                </div>
                <div className="md:w-1/2 h-full">
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
            {/* Gestion des Entreprises */}
            <motion.div
              className="md:col-span-5 bg-primary text-white rounded-xl p-8 flex flex-col justify-between shadow-sm border border-primary-container group hover:shadow-lg transition-all"
              whileHover={{ scale: 1.03, transition: { duration: 0.45, ease: 'easeInOut' } }}
            >
              <div>
                <span className="material-symbols-outlined text-4xl text-tertiary-fixed mb-4">business_center</span>
                <h3 className="font-headline-md mb-3">Gestion des Entreprises</h3>
                <p className="text-primary-fixed-dim font-body-md text-sm">Maîtrisez les outils de gestion, la comptabilité et la relation client pour piloter la performance en entreprise.</p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                <span className="text-tertiary-fixed font-label-md uppercase text-xs tracking-widest">Diplôme : 2 Ans</span>
                <Link to="/formations" className="text-white hover:text-tertiary-fixed transition-colors"><span className="material-symbols-outlined">arrow_forward</span></Link>
              </div>
            </motion.div>
          </div>
          <div className="text-center mt-12">
            <MagneticHover className="inline-flex">
              <Link to="/formations" className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-xl font-headline-md shadow-lg hover:shadow-xl transform transition-all uppercase tracking-widest text-sm">
                Explorer toutes les formations <span className="material-symbols-outlined">east</span>
              </Link>
            </MagneticHover>
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
            <h2 className="font-headline-lg text-primary mb-4">Questions Fréquentes</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Retrouvez les réponses aux questions les plus posées sur l'Institut ITI, nos formations et le processus d'admission.</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Quelles formations propose l'Institut ITI à Tanger ?",
                a: "L'Institut ITI propose des diplômes de Technicien Spécialisé en Gestion de la Navigation & Logistique et en Gestion des Entreprises (2 ans), ainsi que des formations continues en Programmation Web (6 mois), Comptabilité (4 mois), Bureautique et Logiciels Comptables (SAGE, SAP)."
              },
              {
                q: "L'Institut ITI est-il accrédité par l'État ?",
                a: "Oui, l'Institut Trans Informatique (ITI) est un établissement de formation professionnelle accrédité par l'État marocain. Les diplômes délivrés sont reconnus officiellement et permettent une insertion professionnelle directe sur le marché du travail national et international."
              },
              {
                q: "Comment s'inscrire pour la session 2026-2027 ?",
                a: "Les inscriptions se font en ligne via notre formulaire de candidature sur le site. Remplissez vos informations personnelles, choisissez votre programme, et notre équipe d'admission vous contactera dans les 24 heures pour planifier votre entretien. Vous pouvez aussi nous appeler au 05 39 93 95 37."
              },
              {
                q: "Quelle est la durée des formations à l'ITI ?",
                a: "Les diplômes de Technicien Spécialisé durent 2 ans. Les formations continues varient de 4 mois (Comptabilité) à 6 mois (Programmation Web). Les formations pratiques en bureautique et logiciels comptables sont de courte durée, adaptées aux professionnels en activité."
              },
              {
                q: "Où se trouve l'Institut ITI et comment les contacter ?",
                a: "L'Institut ITI est situé au 42, Rue de Fès à Tanger, Maroc. Vous pouvez nous joindre par téléphone au 05 39 93 95 37 ou 06 68 43 48 95, par e-mail à instituttrans@gmail.com, ou via le formulaire de contact sur notre site."
              }
            ].map((item, index) => (
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
              <h2 className="font-headline-lg text-white mb-4 md:mb-6">Prêt à transformer votre carrière ?</h2>
              <p className="font-body-lg text-white mb-6 md:mb-8 opacity-90">Inscrivez-vous dès aujourd'hui pour la session prochaine et bénéficiez de notre accompagnement vers l'emploi.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticHover>
                  <Link to="/inscription" className="bg-tertiary-container text-on-tertiary-container px-6 md:px-8 py-3 md:py-4 rounded-xl font-black text-base md:text-lg transition-transform uppercase tracking-widest shadow-lg block text-center">S'INSCRIRE MAINTENANT</Link>
                </MagneticHover>
                <MagneticHover>
                  <Link to="/contact" className="bg-transparent border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-white hover:text-secondary transition-colors duration-200 uppercase tracking-widest block text-center">NOUS CONTACTER</Link>
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
