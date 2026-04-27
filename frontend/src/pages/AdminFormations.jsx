import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Loader2, 
  AlertCircle, 
  Edit2, 
  Trash2, 
  GraduationCap, 
  Clock, 
  Tag, 
  CheckCircle2,
  RefreshCw,
  X,
  Eye,
  Briefcase,
  Layers,
  FileText,
  Info,
  ChevronRight
} from 'lucide-react';
import { adminService, categoryService } from '../services/api';
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import Modal from '../components/admin/Modal';
import StatsCard from '../components/admin/StatsCard';
import Toast from '../components/admin/Toast';

const AdminFormations = () => {
  const [formations, setFormations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Notification state
  const [toast, setToast] = useState(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState(null);
  const [formationToDelete, setFormationToDelete] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    condition: '',
    category_id: '',
    image: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await adminService.getFormations();
      setFormations(response.data.data);
    } catch (err) {
      showToast("Erreur lors du chargement des formations.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleOpenAddModal = () => {
    setEditingFormation(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      condition: '',
      category_id: categories[0]?.id || '',
      image: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (formation) => {
    setEditingFormation(formation);
    setFormData({
      title: formation.title,
      description: formation.description,
      duration: formation.duration,
      condition: formation.condition,
      category_id: formation.category?.id || '',
      image: formation.image || ''
    });
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (formation) => {
    setFormationToDelete(formation);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    
    try {
      if (editingFormation) {
        await adminService.updateFormation(editingFormation.id, formData);
        showToast("Formation mise à jour avec succès !");
      } else {
        await adminService.createFormation(formData);
        showToast("Formation ajoutée avec succès !");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || "Erreur lors de l'enregistrement.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!formationToDelete) return;
    
    setActionLoading(true);
    try {
      await adminService.deleteFormation(formationToDelete.id);
      showToast("Formation supprimée avec succès !");
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      showToast("Erreur lors de la suppression.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredFormations = useMemo(() => {
    return formations.filter(f => 
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [formations, searchTerm]);

  // Stats
  const totalFormations = formations.length;
  const categoriesCount = categories.length;

  if (loading && formations.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar activeTab="formations" />
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <GraduationCap className="w-8 h-8 text-primary absolute inset-0 m-auto" />
            </div>
            <p className="mt-4 text-slate-500 font-semibold animate-pulse">Initialisation du catalogue...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab="formations" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar title="Gestion des Formations" />

        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Catalogue des Formations</h2>
                <p className="text-slate-500 mt-1 text-lg">Gérez l'offre pédagogique de l'institut.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={fetchData}
                  className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
                  title="Actualiser"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button 
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Nouvelle Formation</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard 
                title="Total Formations" 
                value={totalFormations} 
                icon={Briefcase} 
                color="primary"
              />
              <StatsCard 
                title="Catégories" 
                value={categoriesCount} 
                icon={Layers} 
                color="purple"
              />
              <div className="md:col-span-2 hidden lg:block">
                <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold mb-1">Mise à jour rapide</h4>
                    <p className="text-blue-100 text-sm mb-4">Modifiez vos formations pour refléter les nouveaux programmes.</p>
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm font-semibold hover:bg-white/30 transition-all">
                      Voir la documentation
                    </button>
                  </div>
                  <GraduationCap className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher par titre ou catégorie..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-2xl text-sm font-bold text-slate-500">
                <FilterIcon className="w-4 h-4" />
                <span>{filteredFormations.length} Résultats</span>
              </div>
            </div>

            {/* Formations Table */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200">
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Formation</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Catégorie</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Durée</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredFormations.length > 0 ? (
                      filteredFormations.map((formation) => (
                        <tr key={formation.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                <GraduationCap className="w-6 h-6" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-800 group-hover:text-primary transition-colors">{formation.title}</div>
                                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                  <Info className="w-3 h-3" />
                                  ID: #{formation.id.toString().padStart(3, '0')}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100">
                              <Tag className="w-3 h-3" />
                              {formation.category?.name || 'N/A'}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-slate-100 w-fit px-3 py-1 rounded-lg">
                              <Clock className="w-4 h-4 text-slate-400" />
                              {formation.duration}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleOpenEditModal(formation)}
                                className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                                title="Modifier"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleOpenDeleteModal(formation)}
                                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Supprimer"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                              <button 
                                className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all lg:hidden"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-dashed border-slate-200">
                              <Search className="w-10 h-10 text-slate-300" />
                            </div>
                            <div>
                              <p className="text-xl font-bold text-slate-800">Aucune formation disponible</p>
                              <p className="text-slate-500 mt-1">Essayez d'ajuster votre recherche ou ajoutez une nouvelle formation.</p>
                            </div>
                            <button 
                              onClick={handleOpenAddModal}
                              className="mt-2 text-primary font-bold hover:underline"
                            >
                              Ajouter ma première formation
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingFormation ? "Modifier la Formation" : "Nouvelle Formation"}
        showFooter={false}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: General Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                <Info className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Informations Générales</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Titre de la formation</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    placeholder="Ex: Gestion de la navigation et logistique"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Catégorie</label>
                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium appearance-none"
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                  >
                    <option value="" disabled>Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Durée</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    placeholder="Ex: 2 ans"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Details & Conditions */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Détails & Conditions</h4>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Condition d'accès</label>
                <div className="relative">
                  <CheckCircle2 className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <textarea 
                    required
                    rows="2"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium resize-none"
                    placeholder="Ex: Niveau Bac ou plus"
                    value={formData.condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description complète</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium resize-none"
                  placeholder="Décrivez les objectifs et le contenu de la formation..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
            >
              Annuler
            </button>
            <button 
              type="submit"
              disabled={actionLoading}
              className="px-8 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {actionLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {editingFormation ? "Mettre à jour" : "Créer la formation"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        showFooter={false}
      >
        <div className="text-center py-6">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 animate-bounce-slow">
            <Trash2 className="w-12 h-12" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Suppression Irréversible</h4>
          <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
            Êtes-vous sûr de vouloir supprimer la formation <span className="font-bold text-slate-900 italic">"{formationToDelete?.title}"</span> ? Toutes les données associées seront perdues.
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
          >
            Annuler
          </button>
          <button 
            onClick={handleDelete}
            disabled={actionLoading}
            className="px-10 py-3 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 flex items-center gap-2 active:scale-95 disabled:opacity-70"
          >
            {actionLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            Confirmer la suppression
          </button>
        </div>
      </Modal>

      {/* Toast Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

// Simple Filter Icon helper if lucide-react doesn't have it or for custom styling
const FilterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default AdminFormations;
