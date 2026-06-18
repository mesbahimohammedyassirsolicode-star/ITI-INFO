import { Bell, Search, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

const Topbar = ({ title = "Admin Dashboard" }) => {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      await authService.logout();
      navigate('/login');
    }
  };

  return (
    <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-base md:text-xl font-bold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-full border border-slate-200 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-transparent border-none outline-none text-sm px-2 w-48 text-slate-600 placeholder:text-slate-400"
          />
        </div>

        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{user?.name || 'Directeur ITI'}</p>
            <p className="text-xs text-slate-500">Administrateur</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors group"
            title="Déconnexion"
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
