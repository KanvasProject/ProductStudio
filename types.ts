// FIX: Add React import to resolve "Cannot find namespace 'React'" errors.
import React from 'react';

// Fix: Create content for types.ts to resolve import errors across the application.
export type Category = 'fashion' | 'beauty' | 'furniture' | 'accessories' | 'gaming' | 'makanan' | 'minuman' | 'otomotif' | 'mainan' | 'elektronik' | 'olahraga';

export type AspectRatio = '1:1' | '4:5' | '16:9' | '9:16';

export type ModelAge = 'toddler' | 'kid' | 'teen' | 'young-adult' | 'adult' | 'mature-adult';

export interface ImageAsset {
    data: string; // base64 string
    mimeType: string;
}

export interface Product {
    id: string;
    image: ImageAsset | null;
    description: string;
}

export interface Angle {
    name: string;
    modifier: string;
    isBackView?: boolean;
}

export interface Concept {
    id:string;
    title: string;
    basePrompt: string;
    basePromptForBack?: string;
    basePromptWithFace?: string;
    basePromptForBackWithFace?: string;
    basePromptWithCustomBg?: string;
    basePromptForBackWithCustomBg?: string;
    basePromptWithFaceAndCustomBg?: string;
    basePromptForBackWithFaceAndCustomBg?: string;
    angles: Angle[];
    requiresModelOptions?: boolean;
    isPoster?: boolean;
}

export interface GeneratedImage {
    id: string;
    conceptId: string;
    angleName: string;
    url: string | null;
    isLoading: boolean;
    prompt: string;
    imageRef: 'front' | 'back';
    usesFace: boolean;
    usesBackground: boolean;
    usesLogo: boolean;
    isBackView?: boolean;
}

export interface GeneratedResult {
    concept: Concept;
    images: GeneratedImage[];
}

export interface AiSuggestions {
    descriptions: string[];
    concepts: string[];
    keywords: string[];
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export interface VideoScene {
    scene_number: number;
    image_description: string;
    video_prompt: string;
    duration_seconds: number;
    voice_over: string;
}

export type VideoFlowResult = VideoScene[];

export interface BrandKit {
    brandName: string;
    brandVoice: string;
    colors: string[];
    logo: ImageAsset | null;
}

export type CampaignGoal = 'peluncuran_produk' | 'peningkatan_engagement' | 'promo_diskon' | 'pengenalan_merek';

export interface CampaignResult {
    main_concept: string;
    content_schedule: { day: number; platform: string; post_idea: string; }[];
    visual_suggestions: { tool: string; concept_name: string; }[];
    ad_copy_examples: { platform: string; copy: string; }[];
    hashtags: string[];
}

export interface CarouselSlide {
    slide_number: number;
    visual_prompt: string;
    description: string;
    caption: string;
}

export type CarouselResult = CarouselSlide[];

// FIX: Declare the global `window.aistudio` object to resolve TypeScript errors
// related to missing properties across the application.
// By declaring the AIStudio interface, we can augment it if it already exists
// and provide a consistent type for window.aistudio, resolving all related errors.
declare global {
    interface AIStudio {
        share: () => void;
        hasSelectedApiKey: () => Promise<boolean>;
        openSelectKey: () => Promise<void>;
    }
    interface Window {
        aistudio?: AIStudio;
    }
}

// Context Types
export type Tab = 'photoshoot' | 'video_flow' | 'brand_kit' | 'campaign_planner' | 'social_toolkit';

export interface ModalState {
    image: { isOpen: boolean; src: string; title: string; };
    video: { isOpen: boolean; videoUrl: string | null; };
    edit: { isOpen: boolean; imageToEdit: GeneratedImage | null; };
    apiKey: { isOpen: boolean; onConfirm: () => void; };
    motion: { isOpen: boolean; prompt: string; };
    assistant: { isOpen: boolean; };
}

export type ModalName = keyof ModalState;

export interface AppContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    toasts: ToastMessage[];
    addToast: (message: string, type?: ToastType) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    modals: ModalState;
    openModal: <T extends ModalName>(name: T, props: Omit<ModalState[T], 'isOpen'>) => void;
    closeModal: (name: ModalName) => void;
}

export interface BrandKitContextType {
    brandKit: BrandKit;
    setBrandKit: React.Dispatch<React.SetStateAction<BrandKit>>;
}

export interface PhotoshootContextType {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    backProductImage: ImageAsset | null;
    setBackProductImage: React.Dispatch<React.SetStateAction<ImageAsset | null>>;
    selectedCategory: Category;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
    selectedRatio: AspectRatio;
    setSelectedRatio: React.Dispatch<React.SetStateAction<AspectRatio>>;
    selectedConceptIds: string[];
    setSelectedConceptIds: React.Dispatch<React.SetStateAction<string[]>>;
    isCustomConcept: boolean;
    setIsCustomConcept: React.Dispatch<React.SetStateAction<boolean>>;
    customConceptPrompt: string;
    setCustomConceptPrompt: React.Dispatch<React.SetStateAction<string>>;
    customConceptIncludesModel: boolean;
    setCustomConceptIncludesModel: React.Dispatch<React.SetStateAction<boolean>>;
    customConceptUsesBackView: boolean;
    setCustomConceptUsesBackView: React.Dispatch<React.SetStateAction<boolean>>;
    customConceptPromptForBack: string;
    setCustomConceptPromptForBack: React.Dispatch<React.SetStateAction<string>>;
    logoImage: ImageAsset | null;
    setLogoImage: React.Dispatch<React.SetStateAction<ImageAsset | null>>;
    logoPrompt: string;
    setLogoPrompt: React.Dispatch<React.SetStateAction<string>>;
    modelGender: 'man' | 'woman';
    setModelGender: React.Dispatch<React.SetStateAction<'man' | 'woman'>>;
    modelAge: ModelAge;
    setModelAge: React.Dispatch<React.SetStateAction<ModelAge>>;
    hijabOption: 'hijab' | 'non-hijab';
    setHijabOption: React.Dispatch<React.SetStateAction<'hijab' | 'non-hijab'>>;
    modelStyle: 'random' | 'reference';
    setModelStyle: React.Dispatch<React.SetStateAction<'random' | 'reference'>>;
    faceImage: ImageAsset | null;
    setFaceImage: React.Dispatch<React.SetStateAction<ImageAsset | null>>;
    backgroundStyle: 'default' | 'custom';
    setBackgroundStyle: React.Dispatch<React.SetStateAction<'default' | 'custom'>>;
    customBackgroundType: 'text' | 'image';
    setCustomBackgroundType: React.Dispatch<React.SetStateAction<'text' | 'image'>>;
    backgroundPrompt: string;
    setBackgroundPrompt: React.Dispatch<React.SetStateAction<string>>;
    backgroundImage: ImageAsset | null;
    setBackgroundImage: React.Dispatch<React.SetStateAction<ImageAsset | null>>;
    isGenerating: boolean;
    generatedResults: GeneratedResult[];
    setGeneratedResults: React.Dispatch<React.SetStateAction<GeneratedResult[]>>;
    generatingVariationsId: string | null;
    generatingVideoId: string | null;
    isAnalyzingProduct: boolean;
    setIsAnalyzingProduct: React.Dispatch<React.SetStateAction<boolean>>;
    isAssistantLoading: boolean;
    assistantSuggestions: AiSuggestions | null;
    handleGetSuggestions: () => Promise<void>;
    handleApplyDescription: (description: string) => void;
    handleApplyConcept: (concept: string) => void;
    handleGenerate: () => Promise<void>;
    handleRegenerate: (image: GeneratedImage) => Promise<void>;
    handleGenerateVariations: (image: GeneratedImage) => Promise<void>;
    handleInitiateVideoGeneration: (image: GeneratedImage) => Promise<void>;
    handleSaveEdit: (imageId: string, newUrl: string, newPrompt: string) => void;
}

export interface ToolsContextType {
    sceneImages: ImageAsset[];
    setSceneImages: React.Dispatch<React.SetStateAction<ImageAsset[]>>;
    campaignDescription: string;
    setCampaignDescription: React.Dispatch<React.SetStateAction<string>>;
    isVideoFlowGenerating: boolean;
    videoFlowResult: VideoFlowResult | null;
    handleGenerateVideoFlow: () => Promise<void>;
    campaignGoal: CampaignGoal;
    setCampaignGoal: React.Dispatch<React.SetStateAction<CampaignGoal>>;
    isCampaignGenerating: boolean;
    campaignResult: CampaignResult | null;
    handleGenerateCampaign: () => Promise<void>;
    carouselProduct: Product;
    setCarouselProduct: React.Dispatch<React.SetStateAction<Product>>;
    isCarouselGenerating: boolean;
    carouselResult: CarouselResult | null;
    handleGenerateCarousel: () => Promise<void>;
}