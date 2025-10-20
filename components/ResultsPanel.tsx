import React, { useState, useCallback, useEffect } from 'react';
import { GeneratedResult, GeneratedImage, ImageAsset, BrandKit } from '../types';
import { ImageCard } from './ImageCard';
import { PosterCard } from './PosterCard';
import { DescriptionCard } from './DescriptionCard';
import { NarrationCard } from './NarrationCard';
import { generateText, generateAudio } from '../services/geminiService';
import { pcmToWav, base64ToArrayBuffer } from '../services/utils';
import { useAppContext } from '../contexts/AppContext';
import { usePhotoshootContext } from '../contexts/PhotoshootContext';
import { useBrandKitContext } from '../contexts/BrandKitContext';
import { useToolsContext } from '../contexts/ToolsContext';

const ResultGroup: React.FC<{
    result: GeneratedResult;
}> = ({ result }) => {
    const { 
        handleRegenerate, 
        handleGenerateVariations,
        generatingVariationsId,
        handleInitiateVideoGeneration,
        generatingVideoId,
    } = usePhotoshootContext();
    const { openModal } = useAppContext();
    const { setSceneImages } = useToolsContext();
    const { addToast } = useAppContext();
    
    const handleAddToVideoFlow = useCallback((image: GeneratedImage) => {
        if (!image.url) {
            addToast('URL gambar tidak valid.', 'error');
            return;
        }
        const base64Data = image.url.split(',')[1];
        const mimeType = image.url.match(/:(.*?);/)?.[1] || 'image/png';
        const newScene: ImageAsset = { data: base64Data, mimeType };

        setSceneImages(prev => {
            if (prev.length >= 5) {
                addToast('Maksimal 5 adegan dalam Alur Video.', 'info');
                return prev;
            }
            return [...prev, newScene];
        });
        
        addToast('Gambar ditambahkan ke Alur Video!', 'success');
        // This navigation should be handled by the context/app level
        // For now, we assume the user navigates manually or we can trigger it via a context function
    }, [addToast, setSceneImages]);


    if (result.concept.isPoster) {
        const image = result.images[0];
        if (!image) return null;
        return <PosterCard concept={result.concept} image={image} onRegenerate={handleRegenerate} />;
    }

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{result.concept.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {result.images.map(image => (
                    <ImageCard
                        key={image.id}
                        image={image}
                        onRegenerate={handleRegenerate}
                        onView={(url, title) => openModal('image', { src: url, title })}
                        onGenerateVideo={handleInitiateVideoGeneration}
                        isGeneratingVideoForThis={generatingVideoId === image.id}
                        onGenerateVariations={handleGenerateVariations}
                        isGeneratingVariations={generatingVariationsId !== null}
                        onEdit={(img) => openModal('edit', { imageToEdit: img })}
                        onShowMotionPrompt={(img) => openModal('motion', { prompt: `Gerakan lambat, sinematik, close up pada [product_description]` })}
                        onAddToVideoFlow={handleAddToVideoFlow}
                    />
                ))}
            </div>
        </div>
    );
};

export const ResultsPanel: React.FC = () => {
    const { addToast } = useAppContext();
    const { generatedResults: results, products } = usePhotoshootContext();
    const { brandKit } = useBrandKitContext();
    const primaryProductImage = products[0]?.image;

    const [description, setDescription] = useState<string>('');
    const [narrationScript, setNarrationScript] = useState<string>('');
    const [isGeneratingAudio, setIsGeneratingAudio] = useState<boolean>(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [voice, setVoice] = useState<'Puck' | 'Leda'>('Puck');

    const handleGenerateDescription = useCallback(async () => {
        if (!primaryProductImage) {
            addToast('Gambar produk utama dibutuhkan.', 'error');
            return;
        }
        setDescription('Menghasilkan deskripsi...');
        try {
            const prompt = `Buat narasi singkat untuk video promosi produk berdurasi maksimal 20 detik. Narasi harus menarik, ringkas, dan cocok untuk platform seperti TikTok atau Instagram Reels. Sertakan 3-5 tagar yang relevan di akhir. Jangan sertakan judul atau pembuka seperti "Narasi:". Fokus hanya pada teks kontennya.`;
            const generatedDesc = await generateText(prompt, primaryProductImage, brandKit);
            const cleanDesc = generatedDesc || 'Gagal menghasilkan deskripsi. Silakan coba lagi.';
            setDescription(cleanDesc);
            if (generatedDesc) {
                setNarrationScript(generatedDesc.split('#')[0].trim());
            } else {
                setNarrationScript('Gagal menghasilkan skrip.');
            }
        } catch (error) {
            console.error(error);
            setDescription('Gagal menghasilkan deskripsi. Silakan coba lagi.');
            setNarrationScript('Gagal menghasilkan skrip.');
        }
    }, [primaryProductImage, addToast, brandKit]);

    useEffect(() => {
        if (results.length > 0 && primaryProductImage) {
            handleGenerateDescription();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [results.length, primaryProductImage]);


    const handleGenerateAudio = async () => {
        if (!narrationScript.trim() || narrationScript.startsWith("Gagal")) {
            addToast('Script narasi tidak valid.', 'error');
            return;
        }
        setIsGeneratingAudio(true);
        setAudioUrl(null);
        try {
            const scriptWithTone = `Ucapkan dengan nada bersemangat: ${narrationScript}`;
            const result = await generateAudio(scriptWithTone, voice);
            if (result?.audioData) {
                const pcmData = new Int16Array(base64ToArrayBuffer(result.audioData));
                const wavBlob = pcmToWav(pcmData, 24000);
                const url = URL.createObjectURL(wavBlob);
                setAudioUrl(url);
                addToast('Audio berhasil dibuat!', 'success');
            } else {
                throw new Error('No audio data received');
            }
        } catch (error) {
            console.error(error);
            addToast('Gagal membuat audio.', 'error');
        } finally {
            setIsGeneratingAudio(false);
        }
    };


    return (
        <div className="space-y-12">
            {results.map(result => (
                <ResultGroup 
                    key={result.concept.id}
                    result={result}
                />
            ))}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <DescriptionCard description={description} addToast={addToast} />
                <NarrationCard 
                    script={narrationScript}
                    onScriptChange={setNarrationScript}
                    onGenerateAudio={handleGenerateAudio}
                    isGeneratingAudio={isGeneratingAudio}
                    audioUrl={audioUrl}
                    voice={voice}
                    setVoice={setVoice}
                />
            </div>
        </div>
    );
};
