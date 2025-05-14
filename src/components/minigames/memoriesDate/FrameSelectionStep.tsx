
import React from 'react';
import { Photo } from 'lucide-react';
import { PhotoFrame } from '@/hooks/memoriesDate/useMemoriesDateState';
import { soundManager } from '@/utils/sound';

interface FrameSelectionStepProps {
  frames: PhotoFrame[];
  selectFrame: (frameId: string) => void;
}

const FrameSelectionStep: React.FC<FrameSelectionStepProps> = ({
  frames,
  selectFrame
}) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl mb-4">Choose a frame</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {frames.map((frame) => (
          <button
            key={frame.id}
            className="relative p-1 border-2 border-transparent hover:border-[#9b87f5] transition-colors"
            onClick={() => {
              selectFrame(frame.id);
              soundManager.playSFX('memoriesDate-frame-select');
            }}
          >
            <img 
              src={frame.src} 
              alt={frame.name} 
              className="w-32 h-32 object-contain rounded" 
            />
            <div className="mt-1 text-center text-sm">{frame.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrameSelectionStep;
