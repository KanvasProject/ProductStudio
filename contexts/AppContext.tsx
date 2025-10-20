import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useToasts } from '../hooks/useToasts';
import { AppContextType, Tab, ModalState, ModalName, ToastType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialModalsState: ModalState = {
    image: { isOpen: false, src: '', title: '' },
    video: { isOpen: false, videoUrl: null },
    edit: { isOpen: false, imageToEdit: null },
    apiKey: { isOpen: false, onConfirm: () => {} },
    motion: { isOpen: false, prompt: '' },
    assistant: { isOpen: false }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme, toggleTheme } = useTheme();
    const { toasts, addToast } = useToasts();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('photoshoot');
    const [modals, setModals] = useState<ModalState>(initialModalsState);

    const openModal = useCallback(<T extends ModalName>(name: T, props: Omit<ModalState[T], 'isOpen'>) => {
        setModals(prev => ({
            ...prev,
            [name]: { ...props, isOpen: true }
        }));
    }, []);

    const closeModal = useCallback((name: ModalName) => {
        setModals(prev => ({
            ...prev,
            [name]: { ...initialModalsState[name], isOpen: false }
        }));
    }, []);

    const typedAddToast = useCallback((message: string, type: ToastType = 'info') => {
        addToast(message, type);
    }, [addToast]);

    const value: AppContextType = {
        theme,
        toggleTheme,
        toasts,
        addToast: typedAddToast,
        isSidebarOpen,
        setIsSidebarOpen,
        activeTab,
        setActiveTab,
        modals,
        openModal,
        closeModal,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
