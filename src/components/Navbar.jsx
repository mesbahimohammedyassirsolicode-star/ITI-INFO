import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeUp } from '../animations/motionVariants';
import MagneticHover from './MagneticHover';
import itiLogo from '../assets/iti-logo.png';
import accreditationLogo from '../assets/accreditation-logo.png';

// ─── Compact Language Toggle ──────────────────────────────────────────────────
// Renders as:  FR | EN  with the active language highlighted in primary colour.
// Designed to be narrow (≈60px wide) so it never disrupts the Navbar layout.
const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div
      className="flex items-center gap-0.5 text-xs font-bold font-sans tracking-widest whitespace-nowrap shrink-0"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => changeLanguage('fr')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          currentLang === 'fr'
            ? 'text-primary font-extrabold'
            : 'text-slate-500 dark:text-slate-400 hover:text-primary'
        }`}
        aria-label="Passer en français"
        aria-pressed={currentLang === 'fr'}
      >
        FR
      </button>

      <span className="text-slate-300 dark:text-slate-600 select-none">|</span>

      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          currentLang === 'en'
            ? 'text-primary font-extrabold'
            : 'text-slate-500 dark:text-slate-400 hover:text-primary'
        }`}
        aria-label="Switch to English"
        aria-pressed={currentLang === 'en'}
      >
        EN
      </button>
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { key: 'navbar.home', path: '/' },
    { key: 'navbar.formations', path: '/formations' },
    { key: 'navbar.registration', path: '/inscription' },
    { key: 'navbar.contact', path: '/contact' },
  ];

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
          ? 'bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-xl border-slate-200/70 dark:border-slate-700/60 shadow-sm'
          : 'bg-white dark:bg-[#0B0F19] border-slate-100 dark:border-slate-800'
      }`}
      initial="hidden"
      animate="show"
      variants={fadeUp}
    >
      {/*
        ── 3-column layout: [Logo] [Nav links] [Actions]
        ─ Logo:     shrink-0, no auto-margin  (left anchor)
        ─ Nav links: flex-1, justify-center    (centred, flexible)
        ─ Actions:  shrink-0, flex, gap-3      (right anchor)
        This prevents the triple mr-auto / mx-auto / ml-auto conflict.
      */}
      <nav className="flex items-center w-full h-16 md:h-20 px-4 md:px-8 gap-4">

        {/* ── Left: Logo ──────────────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2 md:gap-3 shrink-0"
        >
          <img
            src={itiLogo}
            alt={t('navbar.logoAlt')}
            className="h-10 md:h-14 w-auto object-contain rounded-md"
          />
          <img
            src={accreditationLogo}
            alt={t('navbar.accreditationAlt')}
            className="h-10 md:h-16 w-auto object-contain opacity-70"
          />
          <span className="hidden lg:inline text-lg xl:text-2xl font-black tracking-tight text-blue-900 dark:text-blue-100 uppercase">
            {t('navbar.institutTitle')}
          </span>
        </Link>

        {/* ── Centre: Desktop nav links ──────────────────────────────── */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8 xl:gap-12">
          {navLinks.map((link) => (
            <motion.div key={link.key} className="relative shrink-0">
              <Link
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-slate-600 dark:text-slate-400 font-medium hover:text-cyan-500'
                } transition-colors duration-300 text-sm uppercase tracking-tight pb-1 whitespace-nowrap`}
              >
                {t(link.key)}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Right: Actions ─────────────────────────────────────────── */}
        <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0">

          {/* Language toggle — desktop only; also lives inside mobile menu */}
          <div className="hidden md:flex">
            <LanguageToggle />
          </div>

          {/* Register button — hidden on narrow mobile */}
          <MagneticHover className="hidden sm:block">
            <Link
              to="/inscription"
              className="bg-secondary-container text-on-secondary-container px-4 md:px-6 py-2 rounded-xl font-headline-md text-xs md:text-sm transform transition-all shadow-md uppercase tracking-widest block whitespace-nowrap"
            >
              {t('navbar.registerNow')}
            </Link>
          </MagneticHover>

          {/* Mobile hamburger — md and above: hidden */}
          <button
            type="button"
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown Menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-[#0B0F19] border-t border-gray-100 dark:border-gray-800 p-4 space-y-1 shadow-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeInOut' } }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`block py-2.5 uppercase text-sm tracking-tight font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary font-bold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}

            {/* Language selector row */}
            <div className="pt-3 mt-1 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">
                Langue / Language
              </span>
              <LanguageToggle />
            </div>

            {/* Register CTA */}
            <Link
              to="/inscription"
              className="block bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-headline-md text-sm shadow-md uppercase tracking-widest text-center mt-3"
              onClick={() => setIsOpen(false)}
            >
              {t('navbar.registerNow')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
