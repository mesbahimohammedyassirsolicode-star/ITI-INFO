import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp } from '../animations/motionVariants';
import MagneticHover from './MagneticHover';
import itiLogo from '../assets/iti-logo.png';
import accreditationLogo from '../assets/accreditation-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'À Propos', path: '/', hash: '#a-propos' },
    { name: 'Formations', path: '/formations' },
    { name: 'Inscriptions', path: '/inscription' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

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
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-gray-200/70 dark:border-slate-700/60 shadow-sm'
          : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800'
      }`}
      initial="hidden"
      animate="show"
      variants={fadeUp}
    >
      <nav className="flex justify-between items-center w-full h-20 px-8 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-4 shrink-0">
          <img
            src={itiLogo}
            alt="Logo Institut ITI"
            className="h-12 w-auto object-contain rounded-md"
          />
          <img
            src={accreditationLogo}
            alt="Accréditation Formation Professionnelle"
            className="h-20 w-auto object-contain opacity-70"
          />
          <span className="text-2xl font-black tracking-tight text-blue-900 dark:text-blue-100 uppercase">TRANS INFORMATIQUE</span>
        </Link>

        {/* Menu Bureau */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.div key={link.name} className="relative">
              <Link
                to={link.path + (link.hash || '')}
                className={`${
                  isActive(link.path)
                    ? 'text-blue-900 dark:text-blue-300 font-bold'
                    : 'text-gray-600 dark:text-gray-400 font-medium hover:text-blue-800'
                } transition-colors duration-300 text-sm uppercase tracking-tight pb-1`}
              >
                {link.name}
              </Link>
              {isActive(link.path) && (
                <motion.span
                  layoutId="active-nav-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-yellow-500 rounded-full"
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <MagneticHover>
            <Link 
              to="/inscription"
              className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-xl font-headline-md text-sm transform transition-all shadow-md uppercase tracking-widest block"
            >
              S'inscrire
            </Link>
          </MagneticHover>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary"
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
            className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.35, ease: 'easeInOut' } }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path + (link.hash || '')}
                className="block text-gray-600 font-medium hover:text-blue-800 py-2 uppercase text-sm tracking-tight"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
