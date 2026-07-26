import { Bell, Search, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../../services/api';

const AdminLanguageToggle = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';

  return (
    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold font-sans">
      <button
        type="button"
        onClick={() => i18n.changeLanguage('fr')}
        className={`px-2 py-0.5 rounded-lg transition-all ${
          currentLang === 'fr' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-primary'
        }`}
      >
        FR
      </button>
      <span className="text-slate-300 px-1">|</span>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('en')}
        className={`px-2 py-0.5 rounded-lg transition-all ${
          currentLang === 'en' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-primary'
        }`}
      >
        EN
      </button>
    </div>
  );
};

const Topbar = ({ title }) => {
  const { t } = useTranslation();
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const headerTitle = title || t('admin.dashboardTitle');

  const handleLogout = async () => {
    if (window.confirm(t('admin.topbar.logoutConfirm'))) {
      await authService.logout();
      navigate('/login');
    }
  };

  return (
    <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-base md:text-xl font-bold text-slate-800">{headerTitle}</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-full border border-slate-200 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder={t('admin.topbar.searchPlaceholder')} 
            className="bg-transparent border-none outline-none text-sm px-2 w-48 text-slate-600 placeholder:text-slate-400"
          />
        </div>

        <AdminLanguageToggle />

        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{user?.name || 'Directeur ITI'}</p>
            <p className="text-xs text-slate-500">{t('admin.topbar.administrator')}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors group"
            title={t('admin.sidebar.logout')}
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 overflow-hidden">
            <User className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
