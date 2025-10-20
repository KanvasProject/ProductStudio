import React from 'react';
import { Tab } from '../types';
import { useAppContext } from '../contexts/AppContext';

const navItems: { id: Tab; label: string; icon: React.ReactElement }[] = [
    { id: 'photoshoot', label: 'Photoshoot', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { id: 'video_flow', label: 'Video Flow', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    { id: 'social_toolkit', label: 'Social Toolkit', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v4z" /></svg> },
    { id: 'campaign_planner', label: 'Perancang Kampanye', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'brand_kit', label: 'Kit Merek', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
];

export const Sidebar: React.FC = () => {
    const { isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab, addToast } = useAppContext();

    const handleShare = () => {
        if (window.aistudio && typeof window.aistudio.share === 'function') {
            window.aistudio.share();
            addToast('Tautan publik disalin ke papan klip!', 'success');
        } else {
            addToast('Fitur berbagi tidak didukung di lingkungan ini.', 'error');
        }
    };

    const handleNavClick = (tab: Tab) => {
        setActiveTab(tab);
        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={`fixed inset-0 bg-black/60 z-30 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 h-20 border-b border-slate-200 dark:border-slate-800">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-900 dark:text-white">
                                    <path d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5 5L7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M17 17L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M17 7L19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M5 19L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-md font-bold text-slate-900 dark:text-white">AI Product Studio</h1>
                            </div>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                    activeTab === item.id 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                     {/* Footer */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        <button
                            onClick={handleShare}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                            aria-label="Bagikan Tautan Publik"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            <span>Bagikan Tautan</span>
                        </button>
                         <p className="text-center text-xs text-slate-500 dark:text-slate-400">
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
            </aside>
        </>
    );
};
