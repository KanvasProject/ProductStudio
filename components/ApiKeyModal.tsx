import React, { useEffect } from 'react';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onConfirm }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleConfirm = async () => {
        // First, open the platform's key selection dialog
        await window.aistudio.openSelectKey();
        // Then, proceed with the generation logic
        onConfirm();
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-lg w-full h-auto overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <svg className="w-6 h-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                        Panduan Kunci API Video
                    </h3>
                    <button onClick={onClose} className="text-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-slate-700 dark:text-slate-300">
                        Fitur video memerlukan Kunci API yang terhubung ke akun penagihan Google AI.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                         <li><strong>Pengguna Baru?</strong> Klik "Dapatkan Kunci API" untuk membuatnya di Google AI Studio.</li>
                        <li>Proses pembuatan video bisa memakan waktu <strong>beberapa menit</strong>.</li>
                        <li>Biaya mungkin berlaku. Lihat{' '}
                            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">
                                dokumentasi penagihan
                            </a> untuk detail.
                        </li>
                    </ul>
                     <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full block text-center px-4 py-2 rounded-lg font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        Dapatkan Kunci API
                    </a>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                     <button onClick={onClose} className="px-4 py-2 rounded-lg