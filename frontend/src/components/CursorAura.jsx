import { useEffect } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

const CursorAura = () => {
  const prefersReducedMotion = useReducedMotion();
  const enabled =
    !prefersReducedMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    window.innerWidth >= 1024;

  const x = useSpring(-100, { stiffness: 160, damping: 28, mass: 0.4 });
  const y = useSpring(-100, { stiffness: 160, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return undefined;

    const onMouseMove = (event) => {
      x.set(event.clientX - 18);
      y.set(event.clientY - 18);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 h-9 w-9 rounded-full bg-primary/15 blur-[2px] mix-blend-multiply"
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    />
  );
};

export default CursorAura;
