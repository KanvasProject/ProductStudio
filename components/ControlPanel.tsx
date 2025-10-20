import React, { useState } from 'react';
import { allConcepts } from '../constants';
import { ProductUploader } from './ProductUploader';
import { RatioSelector } from './RatioSelector';
import { ConceptSelector } from './ConceptSelector';
import { LogoUploader } from './LogoUploader';
import { FashionOptions } from './FashionOptions';
import { GenerateButton } from './GenerateButton';
import { CategorySelector } from './CategorySelector';
import { BackgroundOptions } from './BackgroundOptions';
import { usePhotoshootContext } from '../contexts/PhotoshootContext';
import { useBrandKitContext } from '../contexts/BrandKitContext';


const AccordionSection: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void; }> = ({ title, children, isOpen, onToggle }) => (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
        <h3>
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between p-4 font-bold text-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <svg className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
        </h3>
        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <div className="p-4 pt-0">
                    {children}
                </div>
            </div>
        </div>
    </div>
);


export const ControlPanel: React.FC = () => {
    const props = usePhotoshootContext();
    const { brandKit } = useBrandKitContext();
    const [openSections, setOpenSections] = useState<string[]>(['product', 'scene']);

    const handleToggleSection = (sectionId: string) => {
        setOpenSections(prev => 
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const showModelOptions = props.selectedConceptIds.some(id => {
        const conceptsForCategory = allConcepts[props.selectedCategory];
        const concept = conceptsForCategory.find(c => c.id === id);
        return concept?.requiresModelOptions;
    }) || (props.isCustomConcept && props.customConceptIncludesModel);

    const isGenerateDisabled = props.isGenerating || props.products[0].image === null || (props.selectedConceptIds.length === 0 && !props.isCustomConcept);
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow space-y-0 border border-slate-200 dark:border-slate-800 rounded-xl">
                 <AccordionSection 
                    title="1. Produk"
                    isOpen={openSections.includes('product')}
                    onToggle={() => handleToggleSection('product')}
                 >
                    <ProductUploader/>
                 </AccordionSection>

                 <AccordionSection 
                    title="2. Skenario"
                    isOpen={openSections.includes('scene')}
                    onToggle={() => handleToggleSection('scene')}
                 >
                    <div className="space-y-6">
                        <div className="space-y-3">
                             <h4 className="text-base font-medium text-slate-800 dark:text-slate-200">Kategori Produk</h4>
                             <CategorySelector selectedCategory={props.selectedCategory} onSelectCategory={props.setSelectedCategory} />
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-base font-medium text-slate-800 dark:text-slate-200">Rasio Aspek</h4>
                            <RatioSelector selectedRatio={props.selectedRatio} onSelectRatio={props.setSelectedRatio} />
                        </div>
                         <div className="space-y-3">
                            <h4 className="text-base font-medium text-slate-800 dark:text-slate-200">Konsep Photoshoot</h4>
                            <ConceptSelector
                                concepts={allConcepts[props.selectedCategory]}
                                selectedIds={props.selectedConceptIds}
                                setSelectedIds={props.setSelectedConceptIds}
                                isCustom={props.isCustomConcept}
                                setIsCustom={props.setIsCustomConcept}
                                customPrompt={props.customConceptPrompt}
                                setCustomPrompt={props.setCustomConceptPrompt}
                                includesModel={props.customConceptIncludesModel}
                                setIncludesModel={props.setCustomConceptIncludesModel}
                                usesBackView={props.customConceptUsesBackView}
                                setUsesBackView={props.setCustomConceptUsesBackView}
                                customPromptForBack={props.customConceptPromptForBack}
                                setCustomPromptForBack={props.setCustomConceptPromptForBack}
                                hasBackImage={!!props.backProductImage}
                            />
                        </div>
                        {props.isCustomConcept && !props.customConceptIncludesModel && (
                            <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
                                <h4 className="text-base font-medium text-slate-800 dark:text-slate-200">Latar Kustom (Untuk Konsep Sendiri)</h4>
                                <BackgroundOptions
                                    backgroundStyle={props.backgroundStyle}
                                    setBackgroundStyle={props.setBackgroundStyle}
                                    customBackgroundType={props.customBackgroundType}
                                    setCustomBackgroundType={props.setCustomBackgroundType}
                                    backgroundPrompt={props.backgroundPrompt}
                                    setBackgroundPrompt={props.setBackgroundPrompt}
                                    onBackgroundUpload={props.setBackgroundImage}
                                />
                            </div>
                        )}
                    </div>
                 </AccordionSection>
                 
                {showModelOptions && (
                     <AccordionSection 
                        title="3. Opsi Kustom Model (Opsional)"
                        isOpen={openSections.includes('model')}
                        onToggle={() => handleToggleSection('model')}
                    >
                         <FashionOptions
                            modelGender={props.modelGender}
                            setModelGender={props.setModelGender}
                            modelAge={props.modelAge}
                            setModelAge={props.setModelAge}
                            hijabOption={props.hijabOption}
                            setHijabOption={props.setHijabOption}
                            modelStyle={props.modelStyle}
                            setModelStyle={props.setModelStyle}
                            onFaceUpload={props.setFaceImage}
                            backgroundStyle={props.backgroundStyle}
                            setBackgroundStyle={props.setBackgroundStyle}
                            customBackgroundType={props.customBackgroundType}
                            setCustomBackgroundType={props.setCustomBackgroundType}
                            backgroundPrompt={props.backgroundPrompt}
                            setBackgroundPrompt={props.setBackgroundPrompt}
                            onBackgroundUpload={props.setBackgroundImage}
                        />
                    </AccordionSection>
                )}
                
                 <AccordionSection 
                    title="4. Logo 3D (Opsional)"
                    isOpen={openSections.includes('logo')}
                    onToggle={() => handleToggleSection('logo')}
                 >
                    <LogoUploader 
                        onLogoUpload={props.setLogoImage}
                        logoPrompt={props.logoPrompt}
                        onLogoPromptChange={props.setLogoPrompt}
                        brandKitLogo={brandKit.logo}
                        onUseBrandKitLogo={() => props.setLogoImage(brandKit.logo)}
                    />
                 </AccordionSection>
            </div>
            <div className="mt-6 space-y-3">
                <GenerateButton 
                    onGenerate={props.handleGenerate}
                    isGenerating={props.isGenerating}
                    isDisabled={isGenerateDisabled}
                />
                 <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
                    Dibuat oleh{' '}
                    <a
                        href="https://www.tiktok.com/@rh.photoshot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 dark:text-blue-500 hover:underline group inline-flex items-center gap-1"
                    >
                        Rohmat Hadi Wijaya
                        <span className="transition-transform group-hover:rotate-12">✨</span>
                    </a>
                </p>
            </div>
        </div>
    );
};
