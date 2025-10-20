
import React from 'react';
import { fileToBase64 } from '../services/utils';
import { OptionButton } from './OptionButton';
import { ImageAsset } from '../types';

interface BackgroundOptionsProps {
    backgroundStyle: 'default' | 'custom';
    setBackgroundStyle: (style: 'default' | 'custom') => void;
    customBackgroundType: 'text' | 'image';
    setCustomBackgroundType: (type: 'text' | 'image') => void;
    backgroundPrompt: string;
    setBackgroundPrompt: (prompt: string) => void;
    onBackgroundUpload: (asset: ImageAsset | null) => void;
}

const BackgroundUploader: React.FC<{ onUpload: (asset: ImageAsset) => void }> = ({ onUpload }) => {
    const [preview, setPreview] = React.useState<string | null>(null);
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                setPreview(e.target!.result as string);
                const base64 = await fileToBase64(file);
                onUpload({ data: base64, mimeType: file.type });
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="relative w-full h-32 bg-white dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex items-center justify-center">
            <div className={`text-center text-slate-500 dark:text-slate-400 p-2 cursor-pointer ${preview ? 'hidden' : ''}`}>
                <svg className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>
                <span className="mt-1 block text-xs font-medium">Unggah Latar</span>
            </div>
            {preview && <img src={preview} alt="Pratinjau Latar" className="w-full h-full object-cover rounded-lg"/>}
            <input type="file" onChange={handleFileChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>
    );
};

export const BackgroundOptions: React.FC<BackgroundOptionsProps> = (props) => {
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <OptionButton label="Latar Bawaan" isActive={props.backgroundStyle === 'default'} onClick={() => props.setBackgroundStyle('default')} />
                <OptionButton label="Latar Kustom" isActive={props.backgroundStyle === 'custom'} onClick={() => props.setBackgroundStyle('custom')} />
            </div>
            {props.backgroundStyle === 'custom' && (
                <div className="mt-3 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <OptionButton label="Deskripsi Teks" isActive={props.customBackgroundType === 'text'} onClick={() => props.setCustomBackgroundType('text')} />
                        <OptionButton label="Referensi Gambar" isActive={props.customBackgroundType === 'image'} onClick={() => props.setCustomBackgroundType('image')} />
                    </div>
                    {props.customBackgroundType === 'text' && (
                        <textarea 
                            value={props.backgroundPrompt}
                            onChange={(e) => props.setBackgroundPrompt(e.target.value)}
                            className="w-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Contoh: sebuah kafe di Bali dengan pemandangan sawah"
                        />
                    )}
                    {props.customBackgroundType === 'image' && (
                        <div>
                            <BackgroundUploader onUpload={props.onBackgroundUpload} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
