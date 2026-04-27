export const baseTransition = {
  duration: 0.68,
  ease: 'easeInOut',
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: baseTransition,
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const pageLoad = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: 'easeInOut',
    },
  },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

export const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.76,
      ease: 'easeInOut',
    },
  },
};

export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
    transition: baseTransition,
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 16px 34px rgba(15, 23, 42, 0.16)',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export const buttonMotion = {
  whileHover: {
    scale: 1.05,
    filter: 'brightness(1.05)',
    transition: {
      duration: 0.44,
      ease: 'easeInOut',
    },
  },
  whileTap: {
    scale: 0.97,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};
