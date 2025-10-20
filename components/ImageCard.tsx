import React from 'react';
import { GeneratedImage } from '../types';
import { Spinner } from './Spinner';

interface ImageCardProps {
    image: GeneratedImage;
    onRegenerate: (image: GeneratedImage) => void;
    onView: (url: string, title: string) => void;
    onGenerateVideo: (image: GeneratedImage) => void;
    isGeneratingVideoForThis: boolean;
    onGenerateVariations: (image: GeneratedImage) => void;
    isGeneratingVariations: boolean;
    onEdit: (image: GeneratedImage) => void;
    onShowMotionPrompt: (image: GeneratedImage) => void;
    onAddToVideoFlow: (image: GeneratedImage) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onRegenerate, onView, onGenerateVideo, isGeneratingVideoForThis, onGenerateVariations, isGeneratingVariations, onEdit, onShowMotionPrompt, onAddToVideoFlow }) => {
    const allActionsDisabled = image.isLoading || isGeneratingVariations || isGeneratingVideoForThis;
    
    return (
        <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg space-y-3 flex flex-col">
            <div className="aspect-square w-full rounded-md overflow-hidden relative bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                {image.isLoading ? (
                    <Spinner />
                ) : image.url ? (
                    <>
                        <img src={image.url} alt={image.angleName} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <button onClick={() => onView(image.url!, image.angleName)} className="bg-white/20 text-white rounded-full p-2 hover:bg-white/30 backdrop-blur-sm" disabled={allActionsDisabled}>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-slate-500 text-sm p-4">Gagal memuat gambar</div>
                )}
            </div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 text-center truncate flex-grow">{image.angleName}</p>
            <div className="grid grid-cols-4 gap-2">
                <button 
                    onClick={() => onRegenerate(image)} 
                    disabled={allActionsDisabled}
                    className="col-span-1 text-xs text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                    Ulang
                </button>
                <button 
                    onClick={() => onGenerateVariations(image)}
                    title="Buat Variasi"
                    disabled={allActionsDisabled || !image.url}
                    className="col-span-3 text-xs text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 018.25 20.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 15.75V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                    <span>Variasi</span>
                </button>
                <button 
                    onClick={() => onEdit(image)}
                    disabled={allActionsDisabled || !image.url}
                    className="col-span-2 text-xs text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                    <span>Edit</span>
                </button>
                 <button 
                    onClick={() => onGenerateVideo(image)}
                    disabled={allActionsDisabled || !image.url}
                    className="col-span-2 text-xs text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                    {isGeneratingVideoForThis ? <Spinner /> :  <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>}
                    <span>Video</span>
                </button>
                <button
                    onClick={() => onShowMotionPrompt(image)}
                    disabled={allActionsDisabled || !image.url}
                    className="col-span-2 text-xs text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5l-1.5 1.5M10.5 4.5L12 6m2.25-1.5l1.5 1.5M4.5 10.5l-1.5 1.5M19.5 10.5l1.5 1.5M16.5 19.5l-1.5-1.5M10.5 19.5L9 18m2.25 1.5l1.5-1.5M12 9l.75 2.25 2.25.75-2.25.75L12 15l-.75-2.25L9 12l2.25-.75L12 9z" /></svg>
                    <span>Prompt</span>
                </button>
                <button
                    onClick={() => onAddToVideoFlow(image)}
                    disabled={allActionsDisabled || !image.url}
                    className="col-span-2 text-xs text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a16.95 16.95 0 00-2.63-3.07A1.5 1.5 0 009.43 8.35v-3.03m5.84 7.38l-2.16-2.16m2.16 2.16l2.16 2.16m-8.49-5.14l-2.16-2.16m2.16 2.16l2.16 2.16M8.49 8.35l-2.16 2.16m2.16-2.16l2.16-2.16M3 17.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25z" /></svg>
                    <span>Alur Video</span>
                </button>
            </div>
        </div>
    );
};