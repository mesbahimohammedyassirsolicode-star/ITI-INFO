import { motion } from 'framer-motion';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <motion.article
      className="group rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/70"
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white dark:bg-cyan-500/15 dark:text-cyan-300 dark:group-hover:bg-cyan-500">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
      <div className="pointer-events-none mt-5 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.article>
  );
};

export default ServiceCard;
