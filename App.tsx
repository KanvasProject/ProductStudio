import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ImageModal } from './components/ImageModal';
import { VideoModal } from './components/VideoModal';
import { EditModal } from './components/EditModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { MotionModal } from './components/MotionModal';
import { ToastContainer } from './components/ToastContainer';
import { AssistantModal } from './components/AssistantModal';

import { AppProvider, useAppContext } from './contexts/AppContext';
import { BrandKitProvider } from './contexts/BrandKitContext';
import { PhotoshootProvider } from './contexts/PhotoshootContext';
import { ToolsProvider } from './contexts/ToolsContext';

import PhotoshootView from './views/PhotoshootView';
import VideoFlowView from './views/VideoFlowView';
import BrandKitView from './views/BrandKitView';
import CampaignPlannerView from './views/CampaignPlannerView';
import SocialToolkitView from './views/SocialToolkitView';

const ActiveViewRenderer: React.FC = () => {
  const { activeTab } = useAppContext();
  switch (activeTab) {
    case 'video_flow':
      return <VideoFlowView />;
    case 'brand_kit':
      return <BrandKitView />;
    case 'campaign_planner':
      return <CampaignPlannerView />;
    case 'social_toolkit':
      return <SocialToolkitView />;
    case 'photoshoot':
    default:
      return <PhotoshootView />;
  }
};

const AppModals: React.FC = () => {
    const { modals, closeModal, addToast } = useAppContext();

    return (
        <>
            {modals.image.isOpen && (
                <ImageModal 
                    src={modals.image.src} 
                    title={modals.image.title} 
                    onClose={() => closeModal('image')} 
                />
            )}
            {modals.video.isOpen && (
                <VideoModal 
                    isOpen={modals.video.isOpen}
                    onClose={() => closeModal('video')} 
                    videoUrl={modals.video.videoUrl} 
                />
            )}
             {modals.edit.isOpen && (
                <EditModal 
                    isOpen={modals.edit.isOpen}
                    image={modals.edit.imageToEdit} 
                    onClose={() => closeModal('edit')}
                />
            )}
             {modals.apiKey.isOpen && (
                <ApiKeyModal 
                    isOpen={modals.apiKey.isOpen}
                    onClose={() => closeModal('apiKey')} 
                    onConfirm={modals.apiKey.onConfirm}
                />
            )}
             {modals.motion.isOpen && (
                <MotionModal 
                    isOpen={modals.motion.isOpen}
                    onClose={() => closeModal('motion')}
                    prompt={modals.motion.prompt}
                    addToast={addToast}
                />
            )}
            {modals.assistant.isOpen && (
                <AssistantModal
                    isOpen={modals.assistant.isOpen}
                    onClose={() => closeModal('assistant')}
                />
            )}
        </>
    );
};


const AppContent: React.FC = () => {
  const { theme, toggleTheme, toasts, isSidebarOpen, setIsSidebarOpen } = useAppContext();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Sidebar />
      <main className="lg:ml-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="lg:hidden mb-6">
                <Header theme={theme} toggleTheme={toggleTheme} onMenuClick={() => setIsSidebarOpen(true)} />
            </div>
            <ActiveViewRenderer />
        </div>
      </main>
      
      <AppModals />
      <ToastContainer toasts={toasts} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrandKitProvider>
        <PhotoshootProvider>
          <ToolsProvider>
            <AppContent />
          </ToolsProvider>
        </PhotoshootProvider>
      </BrandKitProvider>
    </AppProvider>
  );
};

export default App;
