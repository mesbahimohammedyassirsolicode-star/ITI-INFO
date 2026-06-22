import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp } from '../animations/motionVariants';
import MagneticHover from './MagneticHover';
import ThemeToggle from './ThemeToggle';
import itiLogo from '../assets/iti-logo.png';
import accreditationLogo from '../assets/accreditation-logo.png';

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
      <nav className="flex items-center w-full h-16 md:h-20 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 md:gap-4 shrink-0 mr-auto">
          <img
            src={itiLogo}
            alt="Logo Institut ITI"
            className="h-12 md:h-16 w-auto object-contain rounded-md"
          />
          <img
            src={accreditationLogo}
            alt="Accréditation Formation Professionnelle"
            className="h-14 md:h-24 w-auto object-contain opacity-70"
          />
          <span className="hidden lg:inline text-lg xl:text-2xl font-black tracking-tight text-blue-900 dark:text-blue-100 uppercase">INSTITUT TRANS INFORMATIQUE</span>
        </Link>

        {/* Menu Bureau */}
        <div className="hidden md:flex items-center space-x-14">
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

        <div className="flex items-center gap-4 ml-auto">
          <MagneticHover className="hidden sm:block">
            <Link 
              to="/inscription"
              className="bg-secondary-container text-on-secondary-container px-4 md:px-6 py-2 rounded-xl font-headline-md text-xs md:text-sm transform transition-all shadow-md uppercase tracking-widest block"
            >
              Register Now
            </Link>
          </MagneticHover>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary ml-1"
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
            <Link
              to="/inscription"
              className="block bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-headline-md text-sm shadow-md uppercase tracking-widest text-center mt-4"
              onClick={() => setIsOpen(false)}
            >
              S'inscrire
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
