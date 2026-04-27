import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  Search, 
  Filter,
  Loader2,
  AlertCircle,
  Clock,
  TrendingUp,
  RefreshCw,
  Download
} from 'lucide-react';

// Import our new components
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import StatsCard from '../components/admin/StatsCard';
import DataTable from '../components/admin/DataTable';
import Modal, { InscriptionDetails } from '../components/admin/Modal';

const AdminDashboard = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exportingCsv, setExportingCsv] = useState(false);
  
  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFormation, setFilterFormation] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  
  // Modal states
  const [selectedInscription, setSelectedInscription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [inscriptionsRes, statsRes] = await Promise.all([
        adminService.getInscriptions(),
        adminService.getStats()
      ]);
      setInscriptions(inscriptionsRes.data.data);
      setStats(statsRes.data.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Erreur lors du chargement des données. Veuillez vérifier votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Derived Stats
  const inscriptionsToday = inscriptions.filter(ins => {
    const today = new Date().toISOString().split('T')[0];
    const insDate = new Date(ins.created_at).toISOString().split('T')[0];
    return today === insDate;
  }).length;

  const topFormation = stats?.byFormation?.[0]?.formation || 'N/A';
  const topFormationCount = stats?.byFormation?.[0]?.count || 0;

  const latestInscription = inscriptions.length > 0 
    ? inscriptions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
    : null;

  // Filtering Logic
  const filteredInscriptions = inscriptions.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm);
    
    const matchesFormation = filterFormation === 'All' || item.formation?.title === filterFormation;
    
    const matchesDate = !filterDate || new Date(item.created_at).toISOString().split('T')[0] === filterDate;
    
    return matchesSearch && matchesFormation && matchesDate;
  });

  const handleViewDetails = (inscription) => {
    setSelectedInscription(inscription);
    setIsModalOpen(true);
  };

  const handleExportCsv = async () => {
    try {
      setExportingCsv(true);
      setError(null);

      const response = await adminService.exportCsv();
      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', 'inscriptions.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting CSV:', err);
      setError("Erreur lors de l'export CSV. Veuillez réessayer.");
    } finally {
      setExportingCsv(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Chargement du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab="inscriptions" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar title="Admin Dashboard" />

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Aperçu des Inscriptions</h2>
                <p className="text-slate-500">Gérez les demandes de formation en temps réel.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleExportCsv}
                  disabled={exportingCsv}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {exportingCsv ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {exportingCsv ? 'Export en cours...' : 'Exporter CSV'}
                </button>

                <button 
                  onClick={fetchData}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Actualiser les données
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in slide-in-from-top-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatsCard 
                title="Total Inscriptions" 
                value={stats?.total || 0} 
                icon={Users} 
                trend="up" 
                trendValue="12"
                color="primary"
              />
              <StatsCard 
                title="Aujourd'hui" 
                value={inscriptionsToday} 
                icon={Clock} 
                color="success"
              />
              <StatsCard 
                title="Top Formation" 
                value={topFormationCount > 0 ? `${topFormationCount} inscr.` : 'N/A'} 
                icon={TrendingUp} 
                trend="up"
                trendValue="8"
                color="purple"
              />
              <StatsCard 
                title="Dernière Inscription" 
                value={latestInscription ? new Date(latestInscription.created_at).toLocaleDateString('fr-FR', {day: '2-digit', month: 'short'}) : 'Aucune'} 
                icon={Calendar} 
                color="warning"
              />
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Rechercher par nom, email..." 
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full lg:w-auto">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 rounded-xl flex-1 md:flex-none min-w-[200px]">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    <select 
                      className="w-full py-3 bg-transparent outline-none text-sm text-slate-600"
                      value={filterFormation}
                      onChange={(e) => setFilterFormation(e.target.value)}
                    >
                      <option value="All">Toutes les formations</option>
                      {stats?.byFormation?.map((f, idx) => (
                        <option key={idx} value={f.formation}>{f.formation}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 rounded-xl flex-1 md:flex-none">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <input 
                      type="date" 
                      className="py-3 bg-transparent outline-none text-sm text-slate-600"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Table */}
            <DataTable 
              data={filteredInscriptions} 
              onView={handleViewDetails}
              emptyMessage={searchTerm || filterFormation !== 'All' || filterDate ? "Aucune inscription ne correspond à vos filtres." : "Aucune inscription enregistrée."}
            />
          </div>
        </div>
      </main>

      {/* Details Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Détails de l'Inscription"
      >
        <InscriptionDetails inscription={selectedInscription} />
      </Modal>
    </div>
  );
};

export default AdminDashboard;

