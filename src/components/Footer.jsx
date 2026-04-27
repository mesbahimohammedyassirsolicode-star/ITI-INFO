import { Link } from 'react-router-dom';
import itiLogo from '../assets/iti-logo.png';

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-black text-white w-full rounded-none border-t border-blue-800 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 px-8 max-w-7xl mx-auto w-full">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src={itiLogo}
              alt="Logo Institut ITI"
              className="h-12 w-auto object-contain rounded-md"
            />
            <span className="text-xl font-bold text-yellow-500 uppercase tracking-widest">Institut ITI</span>
          </div>
          <p className="font-body-md text-sm leading-relaxed text-blue-100/80">
            Donner aux étudiants les moyens d'agir grâce à une formation en informatique et en gestion axée sur la carrière. Façonner l'avenir du paysage professionnel de Tanger depuis 1986.
          </p>
        </div>
        <div>
          <h4 className="font-headline-md text-white mb-6 uppercase text-sm tracking-widest">Liens Rapides</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/formations" className="text-blue-100/80 hover:text-white transition-opacity hover:underline decoration-yellow-500 decoration-2 underline-offset-4 text-sm">
                Formations Proposées
              </Link>
            </li>
            <li>
              <Link to="/inscription" className="text-blue-100/80 hover:text-white transition-opacity hover:underline decoration-yellow-500 decoration-2 underline-offset-4 text-sm">
                Processus d'Inscription
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-100/80 hover:text-white transition-opacity hover:underline decoration-yellow-500 decoration-2 underline-offset-4 text-sm">
                Contactez-nous
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline-md text-white mb-6 uppercase text-sm tracking-widest">Informations</h4>
          <p className="text-blue-100/80 font-body-md text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">location_on</span>
            42, Rue de Fès – Tanger
          </p>
          <p className="text-blue-100/80 font-body-md text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">mail</span>
            institutrans@gmail.com
          </p>
          <p className="text-blue-100/80 font-body-md text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">call</span>
            05 39 93 95 37 / 06 68 43 48 95
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-blue-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-md text-sm leading-relaxed text-blue-100/60">
          © 2024 Institut ITI - Institut Technique d'Informatique. Tous droits réservés.
        </p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-blue-100/60 hover:text-yellow-500 cursor-pointer transition-colors">social_leaderboard</span>
          <span className="material-symbols-outlined text-blue-100/60 hover:text-yellow-500 cursor-pointer transition-colors">share</span>
          <span className="material-symbols-outlined text-blue-100/60 hover:text-yellow-500 cursor-pointer transition-colors">language</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
