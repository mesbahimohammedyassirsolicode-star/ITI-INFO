import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { buttonMotion } from '../animations/motionVariants';

const MagneticHover = ({ children, className = '', strength = 6 }) => {
  const prefersReducedMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(0, { stiffness: 180, damping: 22, mass: 0.5 });

  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set((dx / (rect.width / 2)) * strength);
    y.set((dy / (rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={prefersReducedMotion ? undefined : { x, y }}
      whileHover={prefersReducedMotion ? undefined : buttonMotion.whileHover}
      whileTap={buttonMotion.whileTap}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default MagneticHover;
