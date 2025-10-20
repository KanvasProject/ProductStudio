import React, { useEffect } from 'react';
import { ToastType } from '../types';

interface MotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    prompt: string;
    addToast: (message: string, type: ToastType) => void;
}

export const MotionModal: React.FC<MotionModalProps> = ({ isOpen, onClose, prompt, addToast }) => {
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

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt).then(() => {
            addToast('Prompt berhasil disalin!', 'success');
        }, (err) => {
            console.error('Could not copy text: ', err);
            addToast('Gagal menyalin prompt.', 'error');
        });
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                         <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5l-1.5 1.5M10.5 4.5L12 6m2.25-1.5l1.5 1.5M4.5 10.5l-1.5 1.5M19.5 10.5l1.5 1.5M16.5 19.5l-1.5-1.5M10.5 19.5L9 18m2.25 1.5l1.5-1.5M12 9l.75 2.25 2.25.75-2.25.75L12 15l-.75-2.25L9 12l2.25-.75L12 9z" /></svg>
                        Prompt Gerakan untuk Video
                    </h3>
                    <button onClick={onClose} className="text-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">&times;</button>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Gunakan prompt di bawah ini pada platform AI Video (seperti Google Veo, Kling AI, dll.) dengan gambar ini sebagai input untuk membuat video.
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg">
                        <pre className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans">
                            {prompt}
                        </pre>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                     <button onClick={onClose} className="px-4 py-2 rounded-lg font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Tutup
                    </button>
                    <button 
                        onClick={handleCopy}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.042m0 0c0 .675-.447 1.226-1.008 1.352M11.25 6.75H6.75a2.25 2.25 0 00-2.25 2.25v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25H11.25z" /></svg>
                        <span>Salin Prompt</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
