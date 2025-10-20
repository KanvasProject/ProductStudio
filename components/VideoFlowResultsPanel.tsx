import React from 'react';
import { ImageAsset } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { useToolsContext } from '../contexts/ToolsContext';

const ResultSkeleton: React.FC = () => (
    <div className="space-y-8 animate-pulse">
        <div className="space-y-4">
            <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
            <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-lg flex-shrink-0"></div>
                        <div className="flex-grow space-y-2 pt-2">
                             <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                             <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                             <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="space-y-4">
             <div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
             <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        </div>
    </div>
);


const EmptyState: React.FC = () => (
    <div className="text-center text-slate-500 dark:text-slate-400 p-8 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl">
         <svg className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Generator Alur Video</h2>
        <p className="mt-2 max-w-xl mx-auto">
            Jelaskan kampanye Anda, unggah gambar adegan, dan biarkan AI membuat alur video promosi yang terstruktur untuk Anda.
        </p>
    </div>
);


export const VideoFlowResultsPanel: React.FC = () => {
    const { addToast } = useAppContext();
    const { videoFlowResult, isVideoFlowGenerating, sceneImages } = useToolsContext();

    const copyJsonToClipboard = () => {
        if (!videoFlowResult) return;
        const jsonString = JSON.stringify(videoFlowResult, null, 2);
        navigator.clipboard.writeText(jsonString).then(() => {
            addToast('Prompt JSON berhasil disalin!', 'success');
        }).catch(err => {
            console.error('Gagal menyalin JSON: ', err);
            addToast('Gagal menyalin JSON.', 'error');
        });
    };

    if (isVideoFlowGenerating) {
        return <ResultSkeleton />;
    }

    if (!videoFlowResult) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-12">
            <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Storyboard</h3>
                <div className="space-y-6">
                    {videoFlowResult.map((scene, index) => {
                        const sceneImage = sceneImages[index];
                        return (
                            <div key={scene.scene_number} className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg flex flex-col sm:flex-row gap-4">
                                {sceneImage && (
                                    <img 
                                        src={`data:${sceneImage.mimeType};base64,${sceneImage.data}`}
                                        alt={`Scene ${scene.scene_number}`}
                                        className="w-full sm:w-40 aspect-square object-cover rounded-md flex-shrink-0 bg-slate-100 dark:bg-slate-900"
                                    />
                                )}
                                <div className="space-y-2">
                                     <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">Adegan {scene.scene_number} ({scene.duration_seconds} detik)</h4>
                                     <p className="text-sm text-slate-600 dark:text-slate-400"><strong className="text-slate-700 dark:text-slate-300">Deskripsi Gambar:</strong> {scene.image_description}</p>
                                     <p className="text-sm text-slate-600 dark:text-slate-400"><strong className="text-slate-700 dark:text-slate-300">Voice-over:</strong> "{scene.voice_over}"</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

             <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Hasil Prompt JSON</h3>
                <div className="bg-slate-900 rounded-lg">
                    <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50 rounded-t-lg">
                        <span className="text-sm font-medium text-slate-300">prompt.json</span>
                        <button 
                            onClick={copyJsonToClipboard}
                            className="text-sm text-slate-300 hover:text-white font-semibold py-1 px-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                        >
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.042m0 0c0 .675-.447 1.226-1.008 1.352M11.25 6.75H6.75a2.25 2.25 0 00-2.25 2.25v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25H11.25z" /></svg>
                           <span>Salin</span>
                        </button>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <pre className="text-sm text-slate-200"><code>{JSON.stringify(videoFlowResult, null, 2)}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    );
};
