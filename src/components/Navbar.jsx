import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp } from '../animations/motionVariants';
import MagneticHover from './MagneticHover';
import ThemeToggle from './ThemeToggle';
import itiLogo from '../assets/iti-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Training', section: 'training' },
    { name: 'Registration', section: 'registration' },
    { name: 'Why Us', section: 'why-us' },
    { name: 'Contact', section: 'contact' },
  ];

  const goToSection = (sectionId) => {
    const scrollToSection = () => {
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scrollToSection, 120);
    } else {
      scrollToSection();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`font-headline-md antialiased top-0 z-50 fixed w-full border-b transition-all duration-500 ${
        isScrolled
          ? 'bg-white/75 dark:bg-[#0B0F19]/75 backdrop-blur-xl border-slate-200/70 dark:border-slate-700/60 shadow-sm'
          : 'bg-white dark:bg-[#0B0F19] border-slate-100 dark:border-slate-800'
      }`}
      initial="hidden"
      animate="show"
      variants={fadeUp}
    >
      <nav className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-4 shrink-0">
          <img
            src={itiLogo}
            alt="Logo Institut ITI"
            className="h-12 w-auto object-contain rounded-md"
          />
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase sm:text-2xl">
            ITI Info
          </span>
        </Link>

        {/* Menu Bureau */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.div key={link.name} className="relative">
              <button
                type="button"
                onClick={() => goToSection(link.section)}
                className={`${
                  'text-slate-600 dark:text-slate-400 font-medium hover:text-cyan-500'
                } transition-colors duration-300 text-sm uppercase tracking-tight pb-1`}
              >
                {link.name}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MagneticHover>
            <button 
              type="button"
              onClick={() => goToSection('registration')}
              className="hidden sm:block bg-[#00CFFF] text-white px-5 py-2 rounded-xl font-semibold text-sm transform transition-all shadow-md uppercase tracking-widest"
            >
              Register Now
            </button>
          </MagneticHover>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-700 dark:text-slate-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-50 bg-slate-950/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25, ease: 'easeInOut' } }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="ml-auto h-full w-72 bg-white p-6 shadow-xl dark:bg-slate-900"
              initial={{ x: 320 }}
              animate={{ x: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
              exit={{ x: 320, transition: { duration: 0.25, ease: 'easeInOut' } }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Menu</span>
                <button type="button" onClick={() => setIsOpen(false)} className="text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.name}
                    onClick={() => goToSection(link.section)}
                    className="block py-2 text-sm font-medium uppercase tracking-tight text-slate-700 transition-colors hover:text-cyan-500 dark:text-slate-300"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
