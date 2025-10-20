import React from 'react';
import { VideoFlowControlPanel } from '../components/VideoFlowControlPanel';
import { VideoFlowResultsPanel } from '../components/VideoFlowResultsPanel';

const VideoFlowView: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 lg:sticky top-8">
                <VideoFlowControlPanel />
            </div>
            <div className="lg:col-span-2">
                <VideoFlowResultsPanel />
            </div>
        </div>
    );
};

export default VideoFlowView;
