import React from 'react';
import { PageSpinner } from './Spinner';
import { useAppContext } from '../contexts/AppContext';
import { usePhotoshootContext } from '../contexts/PhotoshootContext';

const SuggestionButton: React.FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left text-sm p-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
    >
        "{text}"
    </button>
);

const KeywordBadge: React.FC<{ text: string }> = ({ text }) => (
    <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium me-2 px-2.5 py-1 rounded-full">
        {text}
    </span>
);

export const AssistantModal: React.FC = () => {
    const { closeModal } = useAppContext();
    const { 
        isAssistantLoading, 
        assistantSuggestions, 
        handleApplyDescription, 
        handleApplyConcept 
    } = usePhotoshootContext();
    
    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => closeModal('assistant')}
        >
            <div 
                className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        ✨ Saran dari Asisten AI
                    </h3>
                    <button onClick={() => closeModal('assistant')} className="text-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">&times;</button>
                </div>
                <div className="p-6 space-y-6 overflow-y-auto">
                    {isAssistantLoading ? (
                        <div className="min-h-[40vh] flex items-center justify-center">
                            <PageSpinner />
                        </div>
                    ) : assistantSuggestions ? (
                        <>
                            <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Deskripsi Produk Alternatif</h4>
                                <div className="space-y-2">
                                    {assistantSuggestions.descriptions.map((desc, i) => (
                                        <SuggestionButton key={`desc-${i}`} text={desc} onClick={() => handleApplyDescription(desc)} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Ide Konsep Kustom</h4>
                                <div className="space-y-2">
                                    {assistantSuggestions.concepts.map((concept, i) => (
                                         <SuggestionButton key={`concept-${i}`} text={concept} onClick={() => handleApplyConcept(concept)} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Inspirasi Kata Kunci</h4>
                                <div className="flex flex-wrap gap-2">
                                   {assistantSuggestions.keywords.map((keyword, i) => (
                                        <KeywordBadge key={`kw-${i}`} text={keyword} />
                                   ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="min-h-[40vh] flex items-center justify-center text-center text-slate-500">
                            <p>Gagal mendapatkan saran.<br/>Silakan coba lagi.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
