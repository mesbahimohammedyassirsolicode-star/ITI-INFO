import { useState } from 'react';
import { 
  BarChart3, 
  LogOut,
  GraduationCap,
  Menu,
  X
} from 'lucide-react';
import itiLogo from '../../assets/iti-logo.png';

const Sidebar = ({ activeTab = 'formations' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'formations', label: 'Formations', icon: GraduationCap, path: '/admin/formations' },
    { id: 'analytics', label: 'Analytiques', icon: BarChart3, path: '/admin/analytics' },
  ];

  const sidebarContent = (
    <>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={itiLogo}
            alt="Logo Institut ITI"
            className="h-10 w-auto object-contain rounded-md"
          />
          <h2 className="text-xl font-bold tracking-tight">ITI Admin</h2>
        </div>
        <button 
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
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
            onClick={() => setIsOpen(false)}
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
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="md:hidden fixed bottom-6 left-6 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside className={`md:hidden fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col h-screen sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
