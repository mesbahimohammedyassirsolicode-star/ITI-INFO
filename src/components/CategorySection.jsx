import { motion } from 'framer-motion';
import FormationCard from './FormationCard';
import { fadeUp, staggerContainer } from '../animations/motionVariants';

const CategorySection = ({ title, formations }) => {
  if (!formations || formations.length === 0) return null;

  return (
    <motion.div
      className="mb-20"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="h-8 w-2 bg-secondary"></div>
        <h2 className="font-headline-lg text-primary uppercase tracking-tight">{title}</h2>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {formations.map((formation) => (
          <FormationCard key={formation.id} formation={formation} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CategorySection;
