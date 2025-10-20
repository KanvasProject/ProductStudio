import React, { useState, useRef } from 'react';
import { fileToBase64 } from '../services/utils';
import { ImageAsset } from '../types';

interface LogoUploaderProps {
    onLogoUpload: (asset: ImageAsset | null) => void;
    logoPrompt: string;
    onLogoPromptChange: (prompt: string) => void;
    brandKitLogo: ImageAsset | null;
    onUseBrandKitLogo: () => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoUpload, logoPrompt, onLogoPromptChange, brandKitLogo, onUseBrandKitLogo }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target!.result as string;
                setPreview(result);
                const base64 = result.split(',')[1];
                onLogoUpload({ data: base64, mimeType: file.type });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUseBrandKitLogo = () => {
        if(brandKitLogo) {
            setPreview(`data:${brandKitLogo.mimeType};base64,${brandKitLogo.data}`);
            onUseBrandKitLogo();
        }
    }

    return (
        <div className="space-y-3">
            {brandKitLogo && (
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <img src={`data:${brandKitLogo.mimeType};base64,${brandKitLogo.data}`} alt="Logo Merek" className="w-12 h-12 object-contain rounded-md bg-white dark:bg-slate-800 p-1" />
                    <div className="flex-grow">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Logo Kit Merek</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Gunakan logo tersimpan Anda.</p>
                    </div>
                    <button 
                        onClick={handleUseBrandKitLogo}
                        className="text-sm text-blue-600 dark:text-blue-500 font-semibold py-2 px-3 rounded-lg border border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex-shrink-0"
                    >
                        Gunakan
                    </button>
                </div>
            )}
            <div className="relative w-full h-32 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex items-center justify-center">
                <div className={`text-center text-slate-500 dark:text-slate-400 p-4 cursor-pointer ${preview ? 'hidden' : ''}`} onClick={() => fileInputRef.current?.click()}>
                    <svg className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
                    <span className="mt-2 block text-sm font-medium">Unggah Logo Sesi Ini</span>
                </div>
                {preview && <img src={preview} alt="Pratinjau Logo" className="w-full h-full object-contain p-2 rounded-lg"/>}
                <input 
                    ref={fileInputRef}
                    type="file" 
                    id="logoFileInput" 
                    accept="image/png, image/svg+xml" 
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>
            {preview && (
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Deskripsi Penempatan Logo
                    </label>
                    <textarea
                        rows={2}
                        value={logoPrompt}
                        onChange={(e) => onLogoPromptChange(e.target.value)}
                        className="w-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Contoh: sebagai neon sign di dinding belakang"
                    />
                </div>
            )}
        </div>
    );
};