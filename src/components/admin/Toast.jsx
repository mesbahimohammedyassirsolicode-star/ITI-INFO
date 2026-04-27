import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      text: 'text-emerald-800',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div className={`fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-full duration-300`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} min-w-[300px]`}>
        <div className="flex-shrink-0">
          {currentStyle.icon}
        </div>
        <div className="flex-1 text-sm font-semibold">
          {message}
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/5 transition-colors"
        >
          <X className="w-4 h-4 opacity-50" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
