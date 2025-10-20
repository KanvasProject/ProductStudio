import React from 'react';
import { BrandKit, ImageAsset } from '../types';
import { fileToBase64 } from '../services/utils';
import { ImageUploaderSlot } from './ImageUploaderSlot';
import { useBrandKitContext } from '../contexts/BrandKitContext';
import { useAppContext } from '../contexts/AppContext';

export const BrandKitPanel: React.FC = () => {
    const { brandKit, setBrandKit } = useBrandKitContext();
    const { addToast } = useAppContext();

    const handleInputChange = (field: keyof BrandKit, value: string) => {
        setBrandKit(prev => ({ ...prev, [field]: value }));
    };

    const handleColorChange = (index: number, value: string) => {
        const newColors = [...brandKit.colors];
        newColors[index] = value;
        setBrandKit(prev => ({ ...prev, colors: newColors }));
    };

    const handleLogoUpload = async (file: File) => {
        const base64 = await fileToBase64(file);
        const logoAsset: ImageAsset = { data: base64, mimeType: file.type };
        setBrandKit(prev => ({ ...prev, logo: logoAsset }));
    };
    
    const handleSave = () => {
        // Data is saved automatically via useEffect in BrandKitContext
        addToast('Kit Merek berhasil disimpan!', 'success');
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Kit Merek Anda</h2>
                 <p className="mt-2 max-w-2xl mx-auto text-slate-500 dark:text-slate-400">
                    Atur identitas merek Anda di sini. AI akan menggunakan informasi ini untuk menghasilkan konten yang lebih konsisten dan personal.
                 </p>
            </div>

            <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="brandName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Merek</label>
                        <input
                            type="text"
                            id="brandName"
                            value={brandKit.brandName}
                            onChange={(e) => handleInputChange('brandName', e.target.value)}
                            className="w-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500"
                            placeholder="Contoh: Kopi Senja"
                        />
                    </div>
                    <div>
                        <label htmlFor="brandVoice" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Suara & Nada Merek</label>
                         <textarea
                            id="brandVoice"
                            rows={1}
                            value={brandKit.brandVoice}
                            onChange={(e) => handleInputChange('brandVoice', e.target.value)}
                            className="w-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500"
                            placeholder="Contoh: Ceria, ramah, dan sedikit jenaka"
                        />
                    </div>
                </div>

                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Palet Warna Merek (Kode Hex)</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {brandKit.colors.map((color, index) => (
                            <div key={index} className="relative">
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => handleColorChange(index, e.target.value)}
                                    className="w-full pl-10 pr-2 py-2 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500"
                                    placeholder="#000000"
                                />
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md border border-slate-300 dark:border-slate-600" style={{ backgroundColor: color || 'transparent' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
                
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Logo Merek Utama</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <ImageUploaderSlot
                            onFileChange={handleLogoUpload}
                            placeholderText="Unggah Logo Anda"
                            subPlaceholderText="PNG dengan latar transparan"
                        />
                        {brandKit.logo && (
                            <div className="flex justify-center">
                                <img 
                                    src={`data:${brandKit.logo.mimeType};base64,${brandKit.logo.data}`} 
                                    alt="Pratinjau Logo" 
                                    className="max-h-32 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                        Simpan Kit Merek
                    </button>
                </div>
            </div>
        </div>
    );
};
