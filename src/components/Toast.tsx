import React from 'react';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-11/12 max-w-md pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onDismiss(toast.id)}
          className="pointer-events-auto cursor-pointer flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md transition-all animate-bounce-short bg-slate-900/95 text-white border-purple-400/40"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            <span className="text-sm font-semibold leading-snug">{toast.text}</span>
          </div>
          <span className="text-xs text-slate-400 hover:text-white mr-2">✕</span>
        </div>
      ))}
    </div>
  );
};
