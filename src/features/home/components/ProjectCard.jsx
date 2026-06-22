import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
      whileHover={{ y: -4 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 left-4 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          Live Demo
        </a>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
