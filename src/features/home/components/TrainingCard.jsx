import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TrainingCard = ({ id, icon, title, description, duration, level }) => {
  return (
    <motion.article
      className="group rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#111827] dark:text-[#F9FAFB]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#6B7280] dark:text-slate-300">{description}</p>
      <div className="mt-5 flex items-center justify-between text-xs font-medium">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {duration}
        </span>
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
          {level}
        </span>
      </div>
      <Link
        to={`/formations/${id}`}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition group-hover:border-cyan-400 group-hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200 dark:group-hover:text-cyan-300"
      >
        View Details
      </Link>
    </motion.article>
  );
};

export default TrainingCard;
