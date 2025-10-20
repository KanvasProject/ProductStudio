import React, { useState, useEffect } from 'react';
import { ImageAsset } from '../types';
import { generateImage } from '../services/geminiService';
import { Spinner } from './Spinner';
import { useAppContext } from '../contexts/AppContext';
import { usePhotoshootContext } from '../contexts/PhotoshootContext';

export const EditModal: React.FC = () => {
    const { modals, closeModal } = useAppContext();
    const { handleSaveEdit } = usePhotoshootContext();
    const { isOpen, imageToEdit: image } = modals.edit;

    const [prompt, setPrompt] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setPrompt('');
            setEditedImageUrl(null);
            setIsEditing(false);
            setError(null);
        }
    }, [isOpen]);

    const handleGenerateEdit = async () => {
        if (!prompt || !image?.url) return;
        
        setIsEditing(true);
        setEditedImageUrl(null);
        setError(null);
        
        try {
            const base64Data = image.url.split(',')[1];
            const mimeType = image.url.match(/:(.*?);/)?.[1] || 'image/png';
            const imageAsset: ImageAsset = { data: base64Data, mimeType };

            const newUrl = await generateImage(prompt, imageAsset, null, null, null);
            
            if (newUrl) {
                setEditedImageUrl(newUrl);
            } else {
                throw new Error('Gagal membuat editan. Coba lagi.');
            }
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan.');
        } finally {
            setIsEditing(false);
        }
    };

    const handleSave = () => {
        if (image && editedImageUrl) {
            handleSaveEdit(image.id, editedImageUrl, prompt);
            closeModal('edit');
        }
    };

    if (!image) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => closeModal('edit')}
        >
            <div 
                className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Edit Gambar</h3>
                    <button onClick={() => closeModal('edit')} className="text-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">&times;</button>
                </div>
                
                <div className="flex-grow p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">Original</h4>
                        <div className="aspect-square w-full rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
                           <img src={image.url!} alt="Original" className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <div className="space-y-2">
                         <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">Hasil Edit</h4>
                         <div className="aspect-square w-full rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            {isEditing && <Spinner />}
                            {!isEditing && editedImageUrl && <img src={editedImageUrl} alt="Edited" className="w-full h-full object-contain" />}
                            {!isEditing && !editedImageUrl && <div className="text-xs text-slate-500 p-4 text-center">Hasil editan akan muncul di sini.</div>}
                            {error && <div className="text-xs text-red-500 p-4 text-center">{error}</div>}
                         </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <div>
                        <label htmlFor="edit-prompt" className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 block">Deskripsi Perubahan</label>
                        <textarea
                            id="edit-prompt"
                            rows={2}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Contoh: tambahkan kacamata hitam pada model"
                        />
                    </div>
                    <div className="flex gap-3">
                         <button
                            onClick={handleGenerateEdit}
                            disabled={isEditing || !prompt.trim()}
                            className="flex-1 border border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isEditing ? <Spinner /> : <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>}
                            <span>{isEditing ? 'Mengedit...' : 'Generate Edit'}</span>
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isEditing || !editedImageUrl}
                            className="flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
