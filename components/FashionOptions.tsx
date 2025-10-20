import React from 'react';
import { fileToBase64 } from '../services/utils';
import { OptionButton } from './OptionButton';
import { BackgroundOptions } from './BackgroundOptions';
import { ImageAsset, ModelAge } from '../types';

interface FashionOptionsProps {
    modelGender: 'man' | 'woman';
    setModelGender: (gender: 'man' | 'woman') => void;
    modelAge: ModelAge;
    setModelAge: (age: ModelAge) => void;
    hijabOption: 'hijab' | 'non-hijab';
    setHijabOption: (option: 'hijab' | 'non-hijab') => void;
    modelStyle: 'random' | 'reference';
    setModelStyle: (style: 'random' | 'reference') => void;
    onFaceUpload: (asset: ImageAsset | null) => void;
    backgroundStyle: 'default' | 'custom';
    setBackgroundStyle: (style: 'default' | 'custom') => void;
    customBackgroundType: 'text' | 'image';
    setCustomBackgroundType: (type: 'text' | 'image') => void;
    backgroundPrompt: string;
    setBackgroundPrompt: (prompt: string) => void;
    onBackgroundUpload: (asset: ImageAsset | null) => void;
}

const FaceUploader: React.FC<{ onUpload: (asset: ImageAsset) => void }> = ({ onUpload }) => {
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
                <svg className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="mt-1 block text-xs font-medium">Unggah Wajah</span>
            </div>
            {preview && <img src={preview} alt="Pratinjau Wajah" className="w-full h-full object-cover rounded-lg"/>}
            <input type="file" onChange={handleFileChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>
    );
};


export const FashionOptions: React.FC<FashionOptionsProps> = (props) => {
    return (
        <div className="space-y-6">
            <div>
                <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Gender Model</h5>
                <div className="grid grid-cols-2 gap-3">
                    <OptionButton label="Pria" isActive={props.modelGender === 'man'} onClick={() => props.setModelGender('man')} />
                    <OptionButton label="Wanita" isActive={props.modelGender === 'woman'} onClick={() => props.setModelGender('woman')} />
                </div>
                {props.modelGender === 'woman' && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <OptionButton label="Non-Hijab" isActive={props.hijabOption === 'non-hijab'} onClick={() => props.setHijabOption('non-hijab')} />
                        <OptionButton label="Berhijab" isActive={props.hijabOption === 'hijab'} onClick={() => props.setHijabOption('hijab')} />
                    </div>
                )}
            </div>
             <div>
                <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Usia Model</h5>
                 <div className="grid grid-cols-3 gap-3">
                    <OptionButton label="Balita" isActive={props.modelAge === 'toddler'} onClick={() => props.setModelAge('toddler')} />
                    <OptionButton label="Anak-anak" isActive={props.modelAge === 'kid'} onClick={() => props.setModelAge('kid')} />
                    <OptionButton label="Remaja" isActive={props.modelAge === 'teen'} onClick={() => props.setModelAge('teen')} />
                    <OptionButton label="Dewasa Muda" isActive={props.modelAge === 'young-adult'} onClick={() => props.setModelAge('young-adult')} />
                    <OptionButton label="Dewasa" isActive={props.modelAge === 'adult'} onClick={() => props.setModelAge('adult')} />
                    <OptionButton label="Matang" isActive={props.modelAge === 'mature-adult'} onClick={() => props.setModelAge('mature-adult')} />
                </div>
            </div>
            <div>
                 <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Wajah Model</h5>
                <div className="grid grid-cols-2 gap-3">
                    <OptionButton label="Model Acak" isActive={props.modelStyle === 'random'} onClick={() => props.setModelStyle('random')} />
                    <OptionButton label="Referensi Wajah" isActive={props.modelStyle === 'reference'} onClick={() => props.setModelStyle('reference')} />
                </div>
                {props.modelStyle === 'reference' && (
                    <div className="mt-3">
                        <FaceUploader onUpload={props.onFaceUpload} />
                    </div>
                )}
            </div>
            
            <div>
                <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Latar / Background</h5>
                <BackgroundOptions
                    backgroundStyle={props.backgroundStyle}
                    setBackgroundStyle={props.setBackgroundStyle}
                    customBackgroundType={props.customBackgroundType}
                    setCustomBackgroundType={props.setCustomBackgroundType}
                    backgroundPrompt={props.backgroundPrompt}
                    setBackgroundPrompt={props.setBackgroundPrompt}
                    onBackgroundUpload={props.onBackgroundUpload}
                />
            </div>
        </div>
    );
};