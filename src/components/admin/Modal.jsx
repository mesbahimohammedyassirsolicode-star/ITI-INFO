import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Mail, Phone, Calendar, MessageSquare, GraduationCap, User } from 'lucide-react';
import { getLocalized } from '../../utils/i18nHelper';

const Modal = ({ isOpen, onClose, title, children, showFooter = true }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        
        {showFooter && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              {t('admin.modal.close')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const InscriptionDetails = ({ inscription }) => {
  const { t, i18n } = useTranslation();
  if (!inscription) return null;

  const currentLang = i18n.language || 'fr';
  const formationTitle = getLocalized(inscription.formation?.title, currentLang);

  const detailItem = (Icon, label, value) => (
    <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors">
      <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-slate-800 font-semibold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {detailItem(User, t('admin.modal.fullName'), inscription.name)}
      {detailItem(Mail, t('admin.modal.emailAddress'), inscription.email)}
      {detailItem(Phone, t('admin.modal.phoneNumber'), inscription.phone)}
      {detailItem(Calendar, t('admin.modal.registrationDate'), new Date(inscription.created_at).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }))}
      <div className="md:col-span-2">
        {detailItem(GraduationCap, t('admin.modal.chosenFormation'), formationTitle || 'N/A')}
      </div>
      <div className="md:col-span-2">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <MessageSquare className="w-5 h-5" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('admin.modal.messageNote')}</p>
          </div>
          <p className="text-slate-700 leading-relaxed italic">
            {inscription.message || t('admin.modal.noMessage')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
