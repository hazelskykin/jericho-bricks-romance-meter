
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PhotoFrame, PhotoLocation, Position } from '@/hooks/memoriesDate/useMemoriesDateState';
import { soundManager } from '@/utils/sound';

interface FrameSelectionStepProps {
  locations: PhotoLocation[];
  currentLocationIndex: number;
  frames: PhotoFrame[];
  selectedFrame: PhotoFrame | null;
  framePosition: Position;
  frameSize: number;
  moveFrame: (x: number, y: number) => void;
  selectFrame: (frame: PhotoFrame) => void;
  resizeFrame: (size: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const FrameSelectionStep: React.FC<FrameSelectionStepProps> = ({
  locations,
  currentLocationIndex,
  frames,
  selectedFrame,
  framePosition,
  frameSize,
  moveFrame,
  selectFrame,
  resizeFrame,
  onNext,
  onBack,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl mb-4">Position your frame</h3>
      <div className="relative w-full max-w-lg h-64 bg-gray-800 overflow-hidden mb-4">
        {/* Background */}
        <img 
          src={locations[currentLocationIndex].src} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        {/* Draggable frame */}
        {selectedFrame && (
          <motion.div
            className="absolute cursor-move"
            drag
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 320, top: 0, bottom: 180 }}
            style={{ 
              x: framePosition.x, 
              y: framePosition.y,
              width: `${frameSize}px`,
              height: `${frameSize * 0.75}px`
            }}
            onDrag={(_, info) => moveFrame(info.point.x, info.point.y)}
          >
            <img 
              src={selectedFrame.src} 
              alt="Frame" 
              className="w-full h-full object-contain" 
            />
          </motion.div>
        )}
      </div>
      
      {/* Frame selection */}
      <div className="flex gap-4 mb-4">
        {frames.map((frame) => (
          <button
            key={frame.id}
            className={`p-1 border-2 ${selectedFrame?.id === frame.id ? 'border-[#9b87f5]' : 'border-transparent'}`}
            onClick={() => {
              selectFrame(frame);
              soundManager.playSFX('memoriesDate-frame-select');
            }}
          >
            <img src={frame.src} alt={frame.name} className="w-16 h-12 object-contain" />
          </button>
        ))}
      </div>
      
      {/* Frame size control */}
      <div className="flex items-center gap-4 mb-4">
        <span>Frame Size:</span>
        <input
          type="range"
          min={100}
          max={250}
          value={frameSize}
          onChange={(e) => resizeFrame(parseInt(e.target.value))}
          className="accent-[#9b87f5]"
        />
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next: Add Sticker
        </Button>
      </div>
    </div>
  );
};

export default FrameSelectionStep;
