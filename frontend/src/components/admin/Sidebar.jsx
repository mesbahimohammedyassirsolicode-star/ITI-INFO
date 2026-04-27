import React from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Settings, 
  BarChart3, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import itiLogo from '../../assets/iti-logo.png';

const Sidebar = ({ activeTab = 'inscriptions' }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { id: 'inscriptions', label: 'Inscriptions', icon: Users, path: '/admin' },
    { id: 'formations', label: 'Formations', icon: GraduationCap, path: '/admin/formations' },
    { id: 'analytics', label: 'Analytiques', icon: BarChart3, path: '/admin/analytics' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <img
          src={itiLogo}
          alt="Logo Institut ITI"
          className="h-10 w-auto object-contain rounded-md"
        />
        <h2 className="text-xl font-bold tracking-tight">ITI Admin</h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 transition-colors ${
              activeTab === item.id ? 'text-white' : 'group-hover:text-white'
            }`} />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200">
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
