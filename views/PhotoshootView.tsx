import React from 'react';
import { ControlPanel } from '../components/ControlPanel';
import { ResultsPanel } from '../components/ResultsPanel';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { usePhotoshootContext } from '../contexts/PhotoshootContext';

const PhotoshootView: React.FC = () => {
    const { generatedResults } = usePhotoshootContext();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 lg:sticky top-8">
                <ControlPanel />
            </div>
            <div className="lg:col-span-2">
                {generatedResults.length > 0 ? (
                    <ResultsPanel />
                ) : (
                    <WelcomeScreen />
                )}
            </div>
        </div>
    );
};

export default PhotoshootView;
