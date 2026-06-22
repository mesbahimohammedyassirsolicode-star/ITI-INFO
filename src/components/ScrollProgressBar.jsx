import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  return <motion.div className="fixed left-0 top-0 z-[70] h-1 origin-left bg-cyan-400" style={{ scaleX: width }} />;
};

export default ScrollProgressBar;
