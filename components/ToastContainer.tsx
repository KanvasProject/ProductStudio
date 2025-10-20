import React from 'react';
import { ToastMessage, ToastType } from '../types';

const toastIcons: Record<ToastType, React.ReactElement> = {
    success: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
    ),
    error: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
    ),
    info: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
    ),
};

const toastStyles: Record<ToastType, string> = {
    success: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
    error: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
    info: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
};

const Toast: React.FC<{ toast: ToastMessage }> = ({ toast }) => {
    return (
        <div className={`toast flex items-center w-full max-w-xs p-4 space-x-3 rtl:space-x-reverse rounded-lg shadow-lg ${toastStyles[toast.type]}`} role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
                {toastIcons[toast.type]}
            </div>
            <div className="text-sm font-normal">{toast.message}</div>
        </div>
    );
};

interface ToastContainerProps {
    toasts: ToastMessage[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} />
            ))}
        </div>
    );
};
