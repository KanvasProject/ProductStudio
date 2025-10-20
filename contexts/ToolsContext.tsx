import React, { createContext, useContext, useState } from 'react';
import { 
    ImageAsset, VideoFlowResult, CampaignGoal, CampaignResult, 
    CarouselResult, Product, ToolsContextType 
} from '../types';
import { generateVideoFlowPrompt, generateCampaign, generateCarousel } from '../services/geminiService';
import { useAppContext } from './AppContext';
import { useBrandKitContext } from './BrandKitContext';
import { usePhotoshootContext } from './PhotoshootContext';

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export const ToolsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { addToast } = useAppContext();
    const { brandKit } = useBrandKitContext();
    const { products } = usePhotoshootContext();

    // Video Flow Generator state
    const [sceneImages, setSceneImages] = useState<ImageAsset[]>([]);
    const [campaignDescription, setCampaignDescription] = useState<string>('');
    const [isVideoFlowGenerating, setIsVideoFlowGenerating] = useState(false);
    const [videoFlowResult, setVideoFlowResult] = useState<VideoFlowResult | null>(null);

    // Campaign Planner state
    const [campaignGoal, setCampaignGoal] = useState<CampaignGoal>('peluncuran_produk');
    const [isCampaignGenerating, setIsCampaignGenerating] = useState(false);
    const [campaignResult, setCampaignResult] = useState<CampaignResult | null>(null);

    // Social Toolkit state
    const [carouselProduct, setCarouselProduct] = useState<Product>({ id: 'carousel-prod', image: null, description: '' });
    const [isCarouselGenerating, setIsCarouselGenerating] = useState(false);
    const [carouselResult, setCarouselResult] = useState<CarouselResult | null>(null);

    const handleGenerateVideoFlow = async () => {
        if (sceneImages.some(img => !img) || sceneImages.length === 0) {
            addToast('Silakan unggah gambar untuk semua adegan.', 'error');
            return;
        }
        setIsVideoFlowGenerating(true);
        setVideoFlowResult(null);
        try {
            const result = await generateVideoFlowPrompt(sceneImages, campaignDescription, brandKit);
            if(result) {
              setVideoFlowResult(result);
              addToast('Alur video berhasil dibuat!', 'success');
            } else {
              throw new Error("Hasil kosong dari API");
            }
        } catch (error) {
            console.error(error);
            addToast('Gagal membuat alur video.', 'error');
        } finally {
            setIsVideoFlowGenerating(false);
        }
    };

    const handleGenerateCampaign = async () => {
      const primaryProduct = products[0];
      if (!primaryProduct?.image) {
        addToast('Silakan unggah produk di tab Photoshoot dulu.', 'error');
        return;
      }
      setIsCampaignGenerating(true);
      setCampaignResult(null);
      try {
          const result = await generateCampaign(primaryProduct, campaignGoal, brandKit);
          if (result) {
              setCampaignResult(result);
              addToast('Rencana kampanye berhasil dibuat!', 'success');
          } else {
              throw new Error("Hasil kosong dari API");
          }
      } catch (error) {
          console.error(error);
          addToast('Gagal membuat rencana kampanye.', 'error');
      } finally {
          setIsCampaignGenerating(false);
      }
    };

    const handleGenerateCarousel = async () => {
      if (!carouselProduct?.image) {
        addToast('Silakan unggah gambar produk untuk carousel.', 'error');
        return;
      }
      setIsCarouselGenerating(true);
      setCarouselResult(null);
      try {
          const result = await generateCarousel(carouselProduct, brandKit);
          if (result) {
              setCarouselResult(result);
              addToast('Ide carousel berhasil dibuat!', 'success');
          } else {
              throw new Error("Hasil kosong dari API");
          }
      } catch(error) {
          console.error(error);
          addToast('Gagal membuat ide carousel.', 'error');
      } finally {
          setIsCarouselGenerating(false);
      }
    };

    const value: ToolsContextType = {
        sceneImages, setSceneImages, campaignDescription, setCampaignDescription,
        isVideoFlowGenerating, videoFlowResult, handleGenerateVideoFlow,
        campaignGoal, setCampaignGoal, isCampaignGenerating, campaignResult, handleGenerateCampaign,
        carouselProduct, setCarouselProduct, isCarouselGenerating, carouselResult, handleGenerateCarousel
    };

    return (
        <ToolsContext.Provider value={value}>
            {children}
        </ToolsContext.Provider>
    );
};

export const useToolsContext = (): ToolsContextType => {
    const context = useContext(ToolsContext);
    if (context === undefined) {
        throw new Error('useToolsContext must be used within a ToolsProvider');
    }
    return context;
};
