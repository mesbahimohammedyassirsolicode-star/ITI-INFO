import { Link } from 'react-router-dom';
import itiLogo from '../assets/iti-logo.png';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#F5F7FA] dark:border-slate-800 dark:bg-[#111827]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <img
              src={itiLogo}
              alt="Logo Institut ITI"
              className="h-12 w-auto object-contain rounded-md"
            />
            <span className="text-xl font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">ITI Info</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Career-focused training programs with practical learning paths and simple student registration.
          </p>
        </div>
        <div>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-900 dark:text-slate-100">Quick Links</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/formations" className="text-sm text-slate-600 transition-colors hover:text-cyan-500 dark:text-slate-300">
                Training
              </Link>
            </li>
            <li>
              <Link to="/inscription" className="text-sm text-slate-600 transition-colors hover:text-cyan-500 dark:text-slate-300">
                Registration
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-slate-600 transition-colors hover:text-cyan-500 dark:text-slate-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-900 dark:text-slate-100">Connect</h4>
          <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-sm text-cyan-500">mail</span>
            contact@itiinfo.ma
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-sm text-cyan-500">call</span>
            +212 6 00 00 00 00
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-sm text-cyan-500">location_on</span>
            Tanger, Morocco
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200 px-4 py-6 sm:px-6 md:flex-row lg:px-8 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © 2026 ITI Info. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined cursor-pointer text-slate-500 transition-colors hover:text-cyan-500 dark:text-slate-400">language</span>
          <span className="material-symbols-outlined cursor-pointer text-slate-500 transition-colors hover:text-cyan-500 dark:text-slate-400">groups</span>
          <span className="material-symbols-outlined cursor-pointer text-slate-500 transition-colors hover:text-cyan-500 dark:text-slate-400">share</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
