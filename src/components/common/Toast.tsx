import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-slide-up">
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
      {type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
      {type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
      <span className="text-xs sm:text-sm font-medium">{message}</span>
      <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
