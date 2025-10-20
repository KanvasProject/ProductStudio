import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
    Product, Category, AspectRatio, Concept, GeneratedImage, GeneratedResult, 
    AiSuggestions, ImageAsset, ModelAge, PhotoshootContextType 
} from '../types';
import { allConcepts, qualityPrompt, ratioPrompts, characterProfileMap } from '../constants';
import { generateImage, getAiSuggestions, generateVideo, pollVideoStatus } from '../services/geminiService';
import { useAppContext } from './AppContext';
import { useBrandKitContext } from './BrandKitContext';

const PhotoshootContext = createContext<PhotoshootContextType | undefined>(undefined);

export const PhotoshootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { addToast, openModal, closeModal } = useAppContext();
    const { brandKit } = useBrandKitContext();

    // State for controls
    const [products, setProducts] = useState<Product[]>([{ id: `product-${Date.now()}`, image: null, description: '' }]);
    const [backProductImage, setBackProductImage] = useState<ImageAsset | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category>('fashion');
    const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('1:1');
    const [selectedConceptIds, setSelectedConceptIds] = useState<string[]>([]);
    const [isCustomConcept, setIsCustomConcept] = useState(false);
    const [customConceptPrompt, setCustomConceptPrompt] = useState('');
    const [customConceptIncludesModel, setCustomConceptIncludesModel] = useState(false);
    const [customConceptUsesBackView, setCustomConceptUsesBackView] = useState(false);
    const [customConceptPromptForBack, setCustomConceptPromptForBack] = useState('');
    const [logoImage, setLogoImage] = useState<ImageAsset | null>(null);
    const [logoPrompt, setLogoPrompt] = useState('');
    const [modelGender, setModelGender] = useState<'man' | 'woman'>('woman');
    const [modelAge, setModelAge] = useState<ModelAge>('young-adult');
    const [hijabOption, setHijabOption] = useState<'hijab' | 'non-hijab'>('non-hijab');
    const [modelStyle, setModelStyle] = useState<'random' | 'reference'>('random');
    const [faceImage, setFaceImage] = useState<ImageAsset | null>(null);
    const [backgroundStyle, setBackgroundStyle] = useState<'default' | 'custom'>('default');
    const [customBackgroundType, setCustomBackgroundType] = useState<'text' | 'image'>('text');
    const [backgroundPrompt, setBackgroundPrompt] = useState('');
    const [backgroundImage, setBackgroundImage] = useState<ImageAsset | null>(null);
    
    // Generation state
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedResults, setGeneratedResults] = useState<GeneratedResult[]>([]);
    const [generatingVariationsId, setGeneratingVariationsId] = useState<string | null>(null);
    const [generatingVideoId, setGeneratingVideoId] = useState<string | null>(null);
    
    // Assistant state
    const [isAnalyzingProduct, setIsAnalyzingProduct] = useState(false);
    const [isAssistantLoading, setIsAssistantLoading] = useState(false);
    const [assistantSuggestions, setAssistantSuggestions] = useState<AiSuggestions | null>(null);
    
    // Logic
    const handleGetSuggestions = useCallback(async () => {
        const primaryProduct = products[0];
        if (!primaryProduct || !primaryProduct.image || !primaryProduct.description) return;
        setIsAssistantLoading(true);
        openModal('assistant', {});
        setAssistantSuggestions(null);
        try {
          const suggestions = await getAiSuggestions(primaryProduct.image, primaryProduct.description, brandKit);
          setAssistantSuggestions(suggestions);
        } catch (error) {
          console.error(error);
          addToast('Gagal mendapatkan saran AI.', 'error');
        } finally {
          setIsAssistantLoading(false);
        }
    }, [products, addToast, brandKit, openModal]);
    
    const handleApplyDescription = useCallback((description: string) => {
        setProducts(prev => {
            const newProducts = [...prev];
            if (newProducts.length > 0) {
                newProducts[0] = { ...newProducts[0], description };
            }
            return newProducts;
        });
        addToast('Deskripsi produk diperbarui!', 'success');
        closeModal('assistant');
    }, [addToast, closeModal]);

    const handleApplyConcept = useCallback((concept: string) => {
        setIsCustomConcept(true);
        setCustomConceptPrompt(concept);
        addToast('Konsep kustom diperbarui!', 'success');
        closeModal('assistant');
    }, [addToast, closeModal]);
    
    const constructPrompt = useCallback((
        concept: Concept,
        angleModifier: string,
        isBackView: boolean,
        usesFace: boolean,
        usesBackground: boolean,
        productDescription: string
      ): string => {
          let basePrompt: string;
          
          if (isBackView) {
              if (usesFace && usesBackground && concept.basePromptForBackWithFaceAndCustomBg) basePrompt = concept.basePromptForBackWithFaceAndCustomBg;
              else if (usesFace && concept.basePromptForBackWithFace) basePrompt = concept.basePromptForBackWithFace;
              else if (usesBackground && concept.basePromptForBackWithCustomBg) basePrompt = concept.basePromptForBackWithCustomBg;
              else basePrompt = concept.basePromptForBack || concept.basePrompt;
          } else {
              if (usesFace && usesBackground && concept.basePromptWithFaceAndCustomBg) basePrompt = concept.basePromptWithFaceAndCustomBg;
              else if (usesFace && concept.basePromptWithFace) basePrompt = concept.basePromptWithFace;
              else if (usesBackground && concept.basePromptWithCustomBg) basePrompt = concept.basePromptWithCustomBg;
              else basePrompt = concept.basePrompt;
          }
    
          let finalPrompt = basePrompt;
          let charDescription = '';
    
          if (finalPrompt.includes('[character_description]')) {
              let profiles: string[];
              if (modelGender === 'man') {
                  profiles = characterProfileMap[modelAge].man;
              } else {
                  profiles = characterProfileMap[modelAge].woman[hijabOption];
              }
              charDescription = profiles[Math.floor(Math.random() * profiles.length)];
              finalPrompt = finalPrompt.replace('[character_description]', charDescription);
          }
          
          finalPrompt = finalPrompt.replace(/\[product_description\]/g, productDescription);
    
          if (usesBackground && finalPrompt.includes('[custom_background]')) {
              if (customBackgroundType === 'text' && backgroundPrompt) {
                  finalPrompt = finalPrompt.replace(/\[custom_background\]/g, backgroundPrompt);
              } else if (customBackgroundType === 'image' && backgroundImage) {
                 finalPrompt = finalPrompt.replace(/\[custom_background\]/g, 'the provided background image reference');
              }
          }
    
          if (logoImage && logoPrompt) {
              finalPrompt += ` Include the brand logo as a 3D object in the scene, placed as if it's ${logoPrompt}.`
          }
          
          finalPrompt += ` ${angleModifier}`;
          finalPrompt += ` ${ratioPrompts[selectedRatio]}`;
          finalPrompt += ` ${qualityPrompt}`;
          
          return finalPrompt;
      }, [modelGender, modelAge, hijabOption, customBackgroundType, backgroundPrompt, backgroundImage, logoImage, logoPrompt, selectedRatio]);

      const handleGenerate = useCallback(async () => {
        const primaryProduct = products[0];
        if (!primaryProduct?.image) {
          addToast('Silakan unggah gambar produk utama.', 'error');
          return;
        }
        if (selectedConceptIds.length === 0 && !isCustomConcept) {
          addToast('Silakan pilih setidaknya satu konsep.', 'error');
          return;
        }
    
        setIsGenerating(true);
        setGeneratedResults([]);
    
        const conceptsToGenerate: Concept[] = allConcepts[selectedCategory].filter(c => selectedConceptIds.includes(c.id));
    
        if (isCustomConcept) {
          conceptsToGenerate.push({
            id: 'custom-concept',
            title: 'Konsep Kustom',
            basePrompt: customConceptPrompt,
            basePromptForBack: customConceptPromptForBack || customConceptPrompt,
            angles: [
              { name: 'Tampilan Kustom', modifier: '' },
              ...(backProductImage && customConceptUsesBackView ? [{ name: 'Tampilan Kustom Belakang', modifier: '', isBackView: true }] : [])
            ],
            requiresModelOptions: customConceptIncludesModel,
          });
        }
    
        const initialResults: GeneratedResult[] = conceptsToGenerate.map(concept => ({
          concept,
          images: concept.angles
            .filter(angle => !angle.isBackView || (angle.isBackView && backProductImage))
            .map(angle => {
              const usesModelOptions = !!concept.requiresModelOptions;
              return {
                id: `${concept.id}-${angle.name.replace(/\s/g, '')}-${Date.now()}`,
                conceptId: concept.id,
                angleName: angle.name,
                url: null,
                isLoading: true,
                prompt: '',
                imageRef: angle.isBackView ? 'back' : 'front',
                usesFace: modelStyle === 'reference' && faceImage && usesModelOptions,
                usesBackground: backgroundStyle === 'custom' && (!!backgroundImage || !!backgroundPrompt),
                usesLogo: !!logoImage,
                isBackView: angle.isBackView,
              }
            })
        }));
    
        setGeneratedResults(initialResults);
    
        const allPromises = initialResults.flatMap(result =>
          result.images.map(image => {
            const productAsset = image.isBackView ? backProductImage : primaryProduct.image;
            if (!productAsset) return Promise.resolve();
            
            const angle = result.concept.angles.find(a => a.name === image.angleName);
            const prompt = constructPrompt(
                result.concept,
                angle?.modifier || '',
                !!image.isBackView,
                image.usesFace,
                image.usesBackground,
                primaryProduct.description
            );
    
            return generateImage(prompt, productAsset, image.usesFace ? faceImage : null, image.usesBackground ? backgroundImage : null, image.usesLogo ? logoImage : null)
              .then(url => {
                setGeneratedResults(prev => prev.map(r => r.concept.id === result.concept.id
                  ? { ...r, images: r.images.map(i => i.id === image.id ? { ...i, url, isLoading: false, prompt } : i) }
                  : r
                ));
              })
              .catch(err => {
                console.error(err);
                addToast(`Gagal membuat gambar untuk ${image.angleName}`, 'error');
                setGeneratedResults(prev => prev.map(r => r.concept.id === result.concept.id
                  ? { ...r, images: r.images.map(i => i.id === image.id ? { ...i, isLoading: false } : i) }
                  : r
                ));
              });
          })
        );
    
        await Promise.all(allPromises);
        setIsGenerating(false);
      }, [
          products, selectedConceptIds, isCustomConcept, addToast, selectedCategory, customConceptPrompt, 
          customConceptPromptForBack, backProductImage, customConceptUsesBackView, customConceptIncludesModel, 
          constructPrompt, faceImage, backgroundImage, logoImage, modelStyle, backgroundStyle, backgroundPrompt
      ]);

      const handleRegenerate = useCallback(async(image: GeneratedImage) => {
        const primaryProduct = products[0];
        if (!primaryProduct?.image) return;
    
        setGeneratedResults(prev => prev.map(r => r.concept.id === image.conceptId
            ? { ...r, images: r.images.map(i => i.id === image.id ? { ...i, isLoading: true } : i) }
            : r
        ));
    
        const productAsset = image.isBackView ? backProductImage : primaryProduct.image;
        if (!productAsset) return;
    
        try {
            const url = await generateImage(image.prompt, productAsset, image.usesFace ? faceImage : null, image.usesBackground ? backgroundImage : null, image.usesLogo ? logoImage : null);
            setGeneratedResults(prev => prev.map(r => r.concept.id === image.conceptId
              ? { ...r, images: r.images.map(i => i.id === image.id ? { ...i, url, isLoading: false } : i) }
              : r
            ));
        } catch (err) {
            console.error(err);
            addToast(`Gagal membuat ulang gambar`, 'error');
            setGeneratedResults(prev => prev.map(r => r.concept.id === image.conceptId
              ? { ...r, images: r.images.map(i => i.id === image.id ? { ...i, isLoading: false } : i) }
              : r
            ));
        }
      }, [products, backProductImage, faceImage, backgroundImage, logoImage, addToast]);
      
      const handleGenerateVariations = useCallback(async(image: GeneratedImage) => {
          if (!image.url) return;
          setGeneratingVariationsId(image.id);
          addToast('Membuat 3 variasi baru...', 'info');
    
          const primaryProduct = products[0];
          if (!primaryProduct?.image) return;
    
          const productAsset = image.isBackView ? backProductImage : primaryProduct.image;
          if (!productAsset) return;
          
          const newImages: GeneratedImage[] = Array(3).fill(null).map((_, i) => ({
              ...image,
              id: `${image.id}-v-${i}-${Date.now()}`,
              url: null,
              isLoading: true,
          }));
    
          setGeneratedResults(prev => prev.map(r => {
              if (r.concept.id !== image.conceptId) return r;
              const originalImageIndex = r.images.findIndex(i => i.id === image.id);
              const newImageList = [...r.images];
              newImageList.splice(originalImageIndex + 1, 0, ...newImages);
              return { ...r, images: newImageList };
          }));
    
          const variationPromises = newImages.map(newImage => 
              generateImage(image.prompt, productAsset, newImage.usesFace ? faceImage : null, newImage.usesBackground ? backgroundImage : null, newImage.usesLogo ? logoImage : null)
                  .then(url => ({ id: newImage.id, url }))
          );
    
          const settledResults = await Promise.allSettled(variationPromises);
    
          settledResults.forEach(result => {
              if (result.status === 'fulfilled' && result.value.url) {
                  const { id, url } = result.value;
                  setGeneratedResults(prev => prev.map(r => r.concept.id === image.conceptId
                      ? { ...r, images: r.images.map(i => i.id === id ? { ...i, url, isLoading: false } : i) }
                      : r
                  ));
              }
          });
          setGeneratingVariationsId(null);
      }, [products, backProductImage, faceImage, backgroundImage, logoImage, addToast]);

      const handleSaveEdit = (imageId: string, newUrl: string, newPrompt: string) => {
        setGeneratedResults(prev => prev.map(r => ({
            ...r,
            images: r.images.map(i => i.id === imageId ? { ...i, url: newUrl, prompt: `${i.prompt}\n\nEdit: ${newPrompt}` } : i)
        })));
        addToast('Gambar berhasil diedit!', 'success');
    };

    const executeVideoGeneration = async (image: GeneratedImage, prompt: string) => {
        if (!image.url) return;
        setGeneratingVideoId(image.id);
        closeModal('motion');
        try {
            const base64Data = image.url.split(',')[1];
            const mimeType = image.url.match(/:(.*?);/)?.[1] || 'image/png';
            
            const operation = await generateVideo(base64Data, mimeType, prompt);
            const finalUrl = await pollVideoStatus(operation);
  
            if (finalUrl) {
                if (!process.env.API_KEY) {
                    addToast('Kunci API tidak ditemukan. Pastikan sudah dikonfigurasi.', 'error');
                    throw new Error("API_KEY is not defined in process.env");
                }
                const directUrl = `${finalUrl}&key=${process.env.API_KEY}`;
                openModal('video', { videoUrl: directUrl });
            } else {
                throw new Error("Gagal mengambil URL video final.");
            }
        } catch (error: any) {
            console.error("Video generation failed:", error);
             if (error.message?.includes("Requested entity was not found.")) {
                addToast('Kunci API tidak valid atau hilang. Silakan pilih kembali.', 'error');
            } else {
                addToast('Gagal membuat video. Coba lagi nanti.', 'error');
            }
        } finally {
            setGeneratingVideoId(null);
        }
    };

    const handleInitiateVideoGeneration = async (image: GeneratedImage) => {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        const onConfirm = () => {
             executeVideoGeneration(image, `Gerakan lambat, sinematik, close up pada [product_description]`);
        }
        if (!hasKey) {
            openModal('apiKey', { onConfirm });
        } else {
            onConfirm();
        }
    };
    
    const value: PhotoshootContextType = {
        products, setProducts, backProductImage, setBackProductImage, selectedCategory, setSelectedCategory,
        selectedRatio, setSelectedRatio, selectedConceptIds, setSelectedConceptIds, isCustomConcept, setIsCustomConcept,
        customConceptPrompt, setCustomConceptPrompt, customConceptIncludesModel, setCustomConceptIncludesModel,
        customConceptUsesBackView, setCustomConceptUsesBackView, customConceptPromptForBack, setCustomConceptPromptForBack,
        logoImage, setLogoImage, logoPrompt, setLogoPrompt, modelGender, setModelGender, modelAge, setModelAge,
        hijabOption, setHijabOption, modelStyle, setModelStyle, faceImage, setFaceImage, backgroundStyle, setBackgroundStyle,
        customBackgroundType, setCustomBackgroundType, backgroundPrompt, setBackgroundPrompt, backgroundImage, setBackgroundImage,
        isGenerating, generatedResults, setGeneratedResults, generatingVariationsId, generatingVideoId,
        isAnalyzingProduct, setIsAnalyzingProduct, isAssistantLoading, assistantSuggestions,
        handleGetSuggestions, handleApplyDescription, handleApplyConcept, handleGenerate, handleRegenerate,
        handleGenerateVariations, handleInitiateVideoGeneration, handleSaveEdit
    };

    return (
        <PhotoshootContext.Provider value={value}>
            {children}
        </PhotoshootContext.Provider>
    );
};

export const usePhotoshootContext = (): PhotoshootContextType => {
    const context = useContext(PhotoshootContext);
    if (context === undefined) {
        throw new Error('usePhotoshootContext must be used within a PhotoshootProvider');
    }
    return context;
};
