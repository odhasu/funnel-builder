import { useEffect, useState } from 'react';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastListeners: ((t: Toast) => void)[] = [];

export function showToast(message: string, type: Toast['type'] = 'info') {
  toastListeners.forEach(fn => fn({ message, type }));
}

export function ToastContainer() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    toastListeners.push(setToast);
    return () => { toastListeners = toastListeners.filter(fn => fn !== setToast); };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!toast) return null;

  const colors = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-blue-600' };

  return (
    <div className={`fixed bottom-6 right-6 ${colors[toast.type]} text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-medium transition-all`}>
      {toast.message}
    </div>
  );
}
