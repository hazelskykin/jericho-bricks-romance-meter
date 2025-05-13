
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { PhotoFrame, PhotoLocation, PhotoSticker, Position } from '@/hooks/memoriesDate/useMemoriesDateState';
import { soundManager } from '@/utils/sound';

interface StickerSelectionStepProps {
  locations: PhotoLocation[];
  currentLocationIndex: number;
  selectedFrame: PhotoFrame | null;
  selectedSticker: PhotoSticker | null;
  stickers: PhotoSticker[];
  framePosition: Position;
  stickerPosition: Position;
  frameSize: number;
  moveSticker: (x: number, y: number) => void;
  selectSticker: (sticker: PhotoSticker) => void;
  onNext: () => void;
  onBack: () => void;
}

const StickerSelectionStep: React.FC<StickerSelectionStepProps> = ({
  locations,
  currentLocationIndex,
  selectedFrame,
  selectedSticker,
  stickers,
  framePosition,
  stickerPosition,
  frameSize,
  moveSticker,
  selectSticker,
  onNext,
  onBack,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl mb-4">Add a sticker</h3>
      <div className="relative w-full max-w-lg h-64 bg-gray-800 overflow-hidden mb-4">
        {/* Background */}
        <img 
          src={locations[currentLocationIndex].src} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        {/* Frame */}
        {selectedFrame && (
          <div
            className="absolute"
            style={{ 
              left: framePosition.x, 
              top: framePosition.y,
              width: `${frameSize}px`,
              height: `${frameSize * 0.75}px`
            }}
          >
            <img 
              src={selectedFrame.src} 
              alt="Frame" 
              className="w-full h-full object-contain" 
            />
          </div>
        )}
        
        {/* Draggable sticker */}
        {selectedSticker && (
          <motion.div
            className="absolute cursor-move z-10"
            drag
            dragMomentum={false}
            dragConstraints={{ 
              left: framePosition.x, 
              right: framePosition.x + frameSize, 
              top: framePosition.y, 
              bottom: framePosition.y + frameSize * 0.75
            }}
            style={{ 
              x: stickerPosition.x, 
              y: stickerPosition.y,
              width: '60px',
              height: '60px'
            }}
            onDrag={(_, info) => moveSticker(info.point.x, info.point.y)}
          >
            <img 
              src={selectedSticker.src} 
              alt="Sticker" 
              className="w-full h-full object-contain" 
            />
          </motion.div>
        )}
      </div>
      
      {/* Sticker selection */}
      <div className="flex gap-4 mb-4">
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            className={`p-1 border-2 ${selectedSticker?.id === sticker.id ? 'border-[#9b87f5]' : 'border-transparent'}`}
            onClick={() => {
              selectSticker(sticker);
              soundManager.playSFX('memoriesDate-sticker-select');
            }}
          >
            <img src={sticker.src} alt={sticker.name} className="w-12 h-12 object-contain" />
          </button>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Take Photo <Camera className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StickerSelectionStep;
