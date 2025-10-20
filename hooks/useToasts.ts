import { useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '../types';

export const useToasts = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000); // 4 seconds timeout
  }, []);

  return { toasts, addToast };
};
