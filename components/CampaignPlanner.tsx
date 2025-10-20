import React from 'react';
import { CampaignGoal, CampaignResult } from '../types';
import { GenerateButton } from './GenerateButton';
import { Spinner } from './Spinner';
import { useAppContext } from '../contexts/AppContext';
import { usePhotoshootContext } from '../contexts/PhotoshootContext';
import { useToolsContext } from '../contexts/ToolsContext';

const goals: { id: CampaignGoal; name: string; description: string }[] = [
    { id: 'peluncuran_produk', name: 'Peluncuran Produk', description: 'Buat buzz untuk produk baru.' },
    { id: 'peningkatan_engagement', name: 'Peningkatan Engagement', description: 'Tingkatkan interaksi dengan audiens.' },
    { id: 'promo_diskon', name: 'Promo & Diskon', description: 'Dorong penjualan dengan penawaran.' },
    { id: 'pengenalan_merek', name: 'Pengenalan Merek', description: 'Perkenalkan merek Anda ke audiens baru.' },
];

const ResultCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">{icon}</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
        </div>
        <div className="space-y-3">{children}</div>
    </div>
);

export const CampaignPlanner: React.FC = () => {
    const { setActiveTab } = useAppContext();
    const { products } = usePhotoshootContext();
    const {
        campaignGoal,
        setCampaignGoal,
        handleGenerateCampaign,
        isCampaignGenerating,
        campaignResult,
    } = useToolsContext();

    const primaryProduct = products[0];
    
    if (!primaryProduct || !primaryProduct.image) {
        return (
             <div className="text-center text-slate-500 dark:text-slate-400 p-8 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl">
                <svg className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Produk Dibutuhkan</h2>
                <p className="mt-2 max-w-xl mx-auto">
                    Silakan unggah produk utama dan deskripsinya di tab <button onClick={() => setActiveTab('photoshoot')} className="font-bold text-blue-600 dark:text-blue-500 hover:underline">Product Photoshoot</button> terlebih dahulu untuk menggunakan Perancang Kampanye.
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Control Panel */}
                <div className="lg:col-span-1 lg:sticky top-8 space-y-6">
                    <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Produk Target</h3>
                        <div className="flex items-center gap-4 p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                           <img src={`data:${primaryProduct.image.mimeType};base64,${primaryProduct.image.data}`} alt="Product" className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                           <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{primaryProduct.description}</p>
                        </div>
                    </div>
                     <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">Tujuan Kampanye</h3>
                        <div className="space-y-2">
                            {goals.map(goal => (
                                <label key={goal.id} className="block p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20 has-[:checked]:border-blue-500">
                                    <input type="radio" name="campaignGoal" value={goal.id} checked={campaignGoal === goal.id} onChange={() => setCampaignGoal(goal.id)} className="sr-only" />
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">{goal.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{goal.description}</p>
                                </label>
                            ))}
                        </div>
                    </div>
                    <GenerateButton onGenerate={handleGenerateCampaign} isGenerating={isCampaignGenerating} isDisabled={isCampaignGenerating} text="Rencanakan Kampanye" generatingText="Merencanakan..." />
                </div>
                
                {/* Results Panel */}
                <div className="lg:col-span-2 space-y-6">
                    {isCampaignGenerating && <div className="min-h-[60vh] flex items-center justify-center"><Spinner /></div>}
                    {!isCampaignGenerating && !campaignResult && (
                         <div className="text-center text-slate-500 dark:text-slate-400 p-8 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[60vh] flex flex-col justify-center">
                            <svg className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Perancang Kampanye AI</h2>
                            <p className="mt-2 max-w-xl mx-auto">
                               Pilih tujuan Anda dan biarkan AI membuat strategi pemasaran mini yang disesuaikan untuk produk dan merek Anda.
                            </p>
                        </div>
                    )}
                    {campaignResult && (
                        <>
                            <ResultCard title="Ide Konsep Utama" icon="💡"><p className="text-slate-700 dark:text-slate-300">"{campaignResult.main_concept}"</p></ResultCard>
                            
                            <ResultCard title="Jadwal Konten" icon="🗓️">
                                <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                                {campaignResult.content_schedule.map(item => (
                                    <li key={item.day + item.platform} className="py-3">
                                        <p className="font-semibold text-slate-800 dark:text-slate-200">Hari {item.day} ({item.platform})</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.post_idea}</p>
                                    </li>
                                ))}
                                </ul>
                            </ResultCard>

                             <ResultCard title="Saran Aset Visual" icon="🎨">
                                {campaignResult.visual_suggestions.map(item => (
                                    <div key={item.concept_name} className="text-sm p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                                        <p className="font-semibold text-slate-800 dark:text-slate-200">Gunakan: <span className="text-blue-600 dark:text-blue-500">{item.tool}</span></p>
                                        <p className="text-slate-600 dark:text-slate-400">Konsep: "{item.concept_name}"</p>
                                    </div>
                                ))}
                             </ResultCard>

                             <ResultCard title="Contoh Teks Iklan" icon="✍️">
                                {campaignResult.ad_copy_examples.map(item => (
                                     <div key={item.platform} className="text-sm p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                                        <p className="font-semibold text-slate-800 dark:text-slate-200">{item.platform}</p>
                                        <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">"{item.copy}"</p>
                                    </div>
                                ))}
                             </ResultCard>

                            <ResultCard title="Saran Hashtag" icon="#">
                                <div className="flex flex-wrap gap-2">
                                    {campaignResult.hashtags.map(tag => (
                                        <span key={tag} className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </ResultCard>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
