import { Link } from 'react-router-dom';
import itiLogo from '../assets/iti-logo.png';
import accreditationLogo from '../assets/accreditation-logo.png';

const Footer = () => {
  return (
    <footer
      className="text-white w-full rounded-none mt-auto"
      style={{ background: 'linear-gradient(135deg, #F1CCD0 0%, #E8A5AB 100%)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 px-8 max-w-7xl mx-auto w-full">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src={itiLogo}
              alt="Logo Institut ITI"
              className="h-12 w-auto object-contain rounded-md"
            />
            <img
              src={accreditationLogo}
              alt="Accréditation Formation Professionnelle"
              className="h-20 w-auto object-contain"
            />
            <span className="text-xl font-bold uppercase tracking-widest" style={{ color: '#6B1D2A' }}>Institut ITI</span>
          </div>
          <p className="font-body-md text-sm leading-relaxed" style={{ color: '#4A1520' }}>
            Donner aux étudiants les moyens d'agir grâce à une formation en informatique et en gestion axée sur la carrière. Façonner l'avenir du paysage professionnel de Tanger depuis 1986.
          </p>
        </div>
        <div>
          <h4 className="font-headline-md mb-6 uppercase text-sm tracking-widest" style={{ color: '#6B1D2A' }}>Liens Rapides</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/formations" className="transition-opacity hover:underline decoration-2 underline-offset-4 text-sm" style={{ color: '#4A1520' }}>
                Formations Proposées
              </Link>
            </li>
            <li>
              <Link to="/inscription" className="transition-opacity hover:underline decoration-2 underline-offset-4 text-sm" style={{ color: '#4A1520' }}>
                Processus d'Inscription
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-opacity hover:underline decoration-2 underline-offset-4 text-sm" style={{ color: '#4A1520' }}>
                Contactez-nous
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline-md mb-6 uppercase text-sm tracking-widest" style={{ color: '#6B1D2A' }}>Informations</h4>
          <p className="font-body-md text-sm flex items-center gap-2" style={{ color: '#4A1520' }}>
            <span className="material-symbols-outlined text-sm">location_on</span>
            42, Rue de Fès – Tanger
          </p>
          <p className="font-body-md text-sm flex items-center gap-2" style={{ color: '#4A1520' }}>
            <span className="material-symbols-outlined text-sm">mail</span>
            institutrans@gmail.com
          </p>
          <p className="font-body-md text-sm flex items-center gap-2" style={{ color: '#4A1520' }}>
            <span className="material-symbols-outlined text-sm">call</span>
            05 39 93 95 37 / 06 68 43 48 95
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(107, 29, 42, 0.3)' }}>
        <p className="font-body-md text-sm leading-relaxed" style={{ color: '#6B1D2A' }}>
          © 2024 Institut ITI - Institut Technique d'Informatique. Tous droits réservés.
        </p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined cursor-pointer transition-colors" style={{ color: '#6B1D2A' }}>social_leaderboard</span>
          <span className="material-symbols-outlined cursor-pointer transition-colors" style={{ color: '#6B1D2A' }}>share</span>
          <span className="material-symbols-outlined cursor-pointer transition-colors" style={{ color: '#6B1D2A' }}>language</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
