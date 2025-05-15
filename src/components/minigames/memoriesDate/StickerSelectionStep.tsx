
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sticker } from 'lucide-react';
import { PhotoSticker } from '@/hooks/memoriesDate/useMemoriesDateState';
import { soundManager } from '@/utils/sound';

interface StickerSelectionStepProps {
  stickers: PhotoSticker[];
  selectSticker: (stickerId: string) => void;
  onComplete: () => void;
  currentStickers: PhotoSticker[];
}

const StickerSelectionStep: React.FC<StickerSelectionStepProps> = ({
  stickers,
  selectSticker,
  onComplete,
  currentStickers
}) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl mb-4">Add stickers to your photo</h3>
      
      <div className="mb-6 w-full max-w-md bg-gray-800 rounded-lg p-4">
        <div className="text-center mb-2">Selected stickers:</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {currentStickers.length === 0 ? (
            <span className="text-gray-500">No stickers selected yet</span>
          ) : (
            currentStickers.map((sticker, index) => (
              <div key={index} className="flex items-center bg-gray-700 rounded px-2 py-1">
                <span className="text-xs">{sticker.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            className={`relative p-1 border-2 ${
              currentStickers.some(s => s.id === sticker.id) ? 'border-[#9b87f5]' : 'border-transparent'
            } hover:border-[#7e69AB] transition-colors`}
            onClick={() => {
              selectSticker(sticker.id);
              soundManager.playSFX('memoriesDate-sticker-select', false);
            }}
          >
            <img 
              src={sticker.src} 
              alt={sticker.name} 
              className="w-32 h-32 object-contain rounded" 
            />
            <div className="mt-1 text-center text-sm">{sticker.name}</div>
          </button>
        ))}
      </div>
      
      <Button 
        onClick={onComplete}
        className="bg-purple-700 hover:bg-purple-600 mt-4"
      >
        Complete Photo <Sticker className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};

export default StickerSelectionStep;
