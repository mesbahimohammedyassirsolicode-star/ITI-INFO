import { motion } from 'framer-motion';
import { fadeUp } from '../../../animations/motionVariants';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">{subtitle}</p>
      ) : null}
    </motion.div>
  );
};

export default SectionTitle;
