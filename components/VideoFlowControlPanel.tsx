import React, { useCallback } from 'react';
import { fileToBase64 } from '../services/utils';
import { ImageAsset } from '../types';
import { ImageUploaderSlot } from './ImageUploaderSlot';
import { GenerateButton } from './GenerateButton';
import { useToolsContext } from '../contexts/ToolsContext';

export const VideoFlowControlPanel: React.FC = () => {
    const {
        campaignDescription,
        setCampaignDescription,
        sceneImages,
        setSceneImages,
        handleGenerateVideoFlow,
        isVideoFlowGenerating,
    } = useToolsContext();
    
    const handleFileChange = useCallback(async (index: number, file: File) => {
        const base64 = await fileToBase64(file);
        const imageAsset: ImageAsset = { data: base64, mimeType: file.type };
        setSceneImages(prev => {
            const newImages = [...prev];
            newImages[index] = imageAsset;
            return newImages;
        });
    }, [setSceneImages]);

    const addScene = useCallback(() => {
        if (sceneImages.length < 5) {
            setSceneImages(prev => [...prev, null!]); // Use null as placeholder
        }
    }, [sceneImages.length, setSceneImages]);

    const removeScene = useCallback((index: number) => {
        setSceneImages(prev => prev.filter((_, i) => i !== index));
    }, [setSceneImages]);

    const isGenerateDisabled = isVideoFlowGenerating || sceneImages.length === 0 || sceneImages.some(img => !img) || !campaignDescription.trim();

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="space-y-6 p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">1. Deskripsi Kampanye</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Beri tahu AI tentang video Anda (misalnya, 'Video peluncuran koleksi sepatu musim panas baru kami').</p>
                    <textarea 
                        rows={3}
                        value={campaignDescription}
                        onChange={(e) => setCampaignDescription(e.target.value)}
                        className="w-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Deskripsi singkat..."
                    />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">2. Unggah Adegan Anda (1-5)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {sceneImages.map((image, index) => (
                             <div key={index} className="relative">
                                <ImageUploaderSlot
                                    onFileChange={(file) => handleFileChange(index, file)}
                                    placeholderText={`Adegan ${index + 1}`}
                                    subPlaceholderText="PNG, JPG, WEBP"
                                />
                                <button 
                                    onClick={() => removeScene(index)}
                                    className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 text-slate-500 hover:text-red-500 rounded-full w-7 h-7 flex items-center justify-center transition-colors z-10 border border-slate-300 dark:border-slate-700"
                                    aria-label="Remove scene"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                        {sceneImages.length < 5 && (
                            <button onClick={addScene} className="w-full h-48 text-blue-600 dark:text-blue-500 font-semibold rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors flex flex-col items-center justify-center gap-2">
                                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                <span>Tambah Adegan</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <GenerateButton
                onGenerate={handleGenerateVideoFlow}
                isGenerating={isVideoFlowGenerating}
                isDisabled={isGenerateDisabled}
                text="Generate Video Flow"
                generatingText="Generating Flow..."
            />
        </div>
    );
};
