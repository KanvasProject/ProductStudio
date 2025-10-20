import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrandKit, BrandKitContextType } from '../types';

const BrandKitContext = createContext<BrandKitContextType | undefined>(undefined);

export const BrandKitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [brandKit, setBrandKit] = useState<BrandKit>({
        brandName: '',
        brandVoice: '',
        colors: ['#000000', '#FFFFFF', '#A9A9A9', '', ''],
        logo: null,
    });

    useEffect(() => {
        try {
            const storedBrandKit = localStorage.getItem('aiProductStudio_brandKit');
            if (storedBrandKit) {
                setBrandKit(JSON.parse(storedBrandKit));
            }
        } catch (error) {
            console.error("Failed to parse brand kit from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('aiProductStudio_brandKit', JSON.stringify(brandKit));
        } catch (error) {
            console.error("Failed to save brand kit to localStorage", error);
        }
    }, [brandKit]);

    return (
        <BrandKitContext.Provider value={{ brandKit, setBrandKit }}>
            {children}
        </BrandKitContext.Provider>
    );
};

export const useBrandKitContext = (): BrandKitContextType => {
    const context = useContext(BrandKitContext);
    if (context === undefined) {
        throw new Error('useBrandKitContext must be used within a BrandKitProvider');
    }
    return context;
};
