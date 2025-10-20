import React from 'react';
import { Product, CarouselResult, ImageAsset, BrandKit } from '../types';
import { GenerateButton } from './GenerateButton';
import { Spinner } from './Spinner';
import { fileToBase64 } from '../services/utils';
import { analyzeProductImage } from '../services/geminiService';
import { ImageUploaderSlot } from './ImageUploaderSlot';
import { useAppContext } from '../contexts/AppContext';
import { useToolsContext } from '../contexts/ToolsContext';

export const SocialToolkit: React.FC = () => {
    const { addToast } = useAppContext();
    const {
        carouselProduct,
        setCarouselProduct,
        isCarouselGenerating,
        handleGenerateCarousel,
        carouselResult,
    } = useToolsContext();

    const [isAnalyzing, setIsAnalyzing] = React.useState(false);

    const handleFileChange = async (file: File) => {
        const base64 = await fileToBase64(file);
        const imageAsset: ImageAsset = { data: base64, mimeType: file.type };
        setCarouselProduct(p => ({ ...p, image: imageAsset }));
        
        setIsAnalyzing(true);
        try {
            const description = await analyzeProductImage(base64, file.type);
            setCarouselProduct(p => ({ ...p, description: description || '' }));
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleDescriptionChange = (description: string) => {
        setCarouselProduct(p => ({ ...p, description }));
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            addToast('Teks berhasil disalin!', 'success');
        }).catch(err => {
            addToast('Gagal menyalin teks.', 'error');
        });
    };

    const isDisabled = isCarouselGenerating || !carouselProduct.image || !carouselProduct.description;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 lg:sticky top-8 space-y-6">
                    <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Generator Post Carousel</h2>
                        <ImageUploaderSlot
                            onFileChange={handleFileChange}
                            placeholderText="Unggah Produk"
                            subPlaceholderText="PNG, JPG, WEBP"
                        />
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis Produk</label>
                            <textarea 
                                rows={2}
                                value={carouselProduct.description}
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                                className="w-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500 disabled:opacity-70"
                                placeholder="Contoh: Kemeja flanel lengan panjang"
                                disabled={isAnalyzing}
                            />
                            {isAnalyzing && (
                                <div className="absolute top-8 right-2"><Spinner /></div>
                            )}
                        </div>
                    </div>
                    <GenerateButton onGenerate={handleGenerateCarousel} isGenerating={isCarouselGenerating} isDisabled={isDisabled} text="Buat Ide Carousel" generatingText="Membuat..." />
                </div>
                <div className="lg:col-span-2 space-y-6">
                    {isCarouselGenerating && <div className="min-h-[60vh] flex items-center justify-center"><Spinner /></div>}
                    {!isCarouselGenerating && !carouselResult && (
                         <div className="text-center text-slate-500 dark:text-slate-400 p-8 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[60vh] flex flex-col justify-center">
                            <svg className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 018.25 20.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 15.75V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Toolkit Media Sosial</h2>
                            <p className="mt-2 max-w-xl mx-auto">
                               Alat bantu cepat untuk membuat konten media sosial yang menarik. Mulai dengan Generator Post Carousel untuk merancang postingan multi-slide yang memukau.
                            </p>
                        </div>
                    )}
                    {carouselResult && (
                        <div className="space-y-4">
                            {carouselResult.map(slide => (
                                <div key={slide.slide_number} className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Slide {slide.slide_number}</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{slide.description}</p>
                                    </div>
                                    <div className="px-4 pb-4 space-y-3">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">PROMPT VISUAL</p>
                                                <button onClick={() => copyToClipboard(slide.visual_prompt)} className="text-xs font-bold text-blue-600 dark:text-blue-500 hover:underline">Salin</button>
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 font-mono">{slide.visual_prompt}</p>
                                        </div>
                                         <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">TEKS CAPTION</p>
                                                <button onClick={() => copyToClipboard(slide.caption)} className="text-xs font-bold text-blue-600 dark:text-blue-500 hover:underline">Salin</button>
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">"{slide.caption}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
