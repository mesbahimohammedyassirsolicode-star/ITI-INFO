import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { buttonMotion, cardHover, fadeUp, imageReveal } from '../animations/motionVariants';

const FormationCard = ({ formation }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden program-card-shadow border border-gray-100 flex flex-col group"
      variants={fadeUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div className="h-48 overflow-hidden relative" variants={cardHover}>
        <motion.img 
          alt={formation.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={formation.image} 
          variants={imageReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        />
        {formation.duration && (
          <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider">
            {formation.duration}
          </div>
        )}
      </motion.div>
      <div className="p-8 flex-grow">
        <h3 className="font-headline-md text-primary mb-2 min-h-[3.5rem] line-clamp-2">{formation.title}</h3>
        <p className="text-secondary font-bold text-xs mb-4 uppercase tracking-tighter">
          {formation.subCategory || formation.category?.name}
        </p>
        <p className="text-on-surface-variant text-sm mb-6 line-clamp-3">
          {formation.description}
        </p>
        
        {formation.opportunities && (
          <div className="space-y-4">
            <h4 className="font-label-md text-[10px] text-outline uppercase tracking-widest">Débouchés Professionnels</h4>
            <div className="flex flex-wrap gap-2">
              {formation.opportunities.slice(0, 3).map((opp, index) => (
                <span key={index} className="bg-surface-container px-3 py-1 rounded-full text-[10px] font-medium text-primary">
                  {opp}
                </span>
              ))}
              {formation.opportunities.length > 3 && (
                <span className="text-[10px] text-outline italic">+{formation.opportunities.length - 3} de plus</span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 border-t border-gray-50 mt-auto">
        <motion.div whileHover={buttonMotion.whileHover} whileTap={buttonMotion.whileTap}>
          <Link 
            to={`/formations/${formation.id}`}
            className="w-full border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 block text-center uppercase text-xs tracking-widest"
          >
            Voir les détails
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FormationCard;
