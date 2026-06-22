import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import CategorySection from '../components/CategorySection';
import { categoryService, formationService } from '../services/api';
import { buttonMotion, fadeUp, imageReveal, staggerContainer } from '../animations/motionVariants';
import useSEO from '../hooks/useSEO';

const Formations = () => {
  useSEO({
    title: 'Formations Professionnelles \u00e0 Tanger | Institut ITI - Informatique, Logistique, Gestion',
    description: "D\u00e9couvrez les formations de l'Institut ITI \u00e0 Tanger : Technicien Sp\u00e9cialis\u00e9 en Logistique et Gestion, Programmation Web, Comptabilit\u00e9, Bureautique. Dipl\u00f4mes accr\u00e9dit\u00e9s.",
    canonical: 'https://institut-iti.ma/formations',
  });
  const [activeCategory, setActiveCategory] = useState('Toutes');
  const [categories, setCategories] = useState(['Toutes']);
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, formRes] = await Promise.all([
          categoryService.getAll(),
          formationService.getAll()
        ]);
        
        setCategories(['Toutes', ...catRes.data.data.map(c => c.name)]);
        setFormations(formRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredFormations = useMemo(() => {
    if (activeCategory === 'Toutes') return formations;
    return formations.filter(f => f.category?.name === activeCategory);
  }, [activeCategory, formations]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Header */}
      <motion.section
        className="relative h-[280px] sm:h-[350px] md:h-[400px] overflow-hidden"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <motion.img 
          alt="Aperçu des programmes" 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
          variants={imageReveal}
          initial="hidden"
          animate="show"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-8">
            <div className="max-w-2xl text-white">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">Nos Programmes Académiques</h1>
              <p className="text-sm sm:text-base md:text-lg text-white opacity-90">Construisez votre avenir avec une expertise technique et une rigueur académique de premier plan.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Onglets de Filtrage */}
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-8 mt-8 md:mt-12 mb-8 md:mb-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.div
          className="flex flex-wrap gap-4 justify-center border-b border-gray-200 pb-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-label-md transition-all uppercase text-xs tracking-widest ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-primary border border-primary hover:bg-primary/5'
              }`}
              variants={fadeUp}
              whileHover={buttonMotion.whileHover}
              whileTap={buttonMotion.whileTap}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Formations Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {categories.slice(1).map((catName) => {
          const catFormations = filteredFormations.filter(f => f.category?.name === catName);
          return <CategorySection key={catName} title={catName} formations={catFormations} />;
        })}
      </div>
    </div>
  );
};

export default Formations;
