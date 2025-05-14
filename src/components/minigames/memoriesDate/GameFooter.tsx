
import React from 'react';
import { Button } from '@/components/ui/button';
import { MemoriesPhoto } from '@/hooks/memoriesDate/useMemoriesDateGame';

interface GameFooterProps {
  photos: MemoriesPhoto[];
  activePhotoIndex: number;
  currentStep: 'location' | 'frame' | 'sticker' | 'gallery';
  onExit: () => void;
  onCompletePhoto: () => void;
}

const GameFooter: React.FC<GameFooterProps> = ({
  photos,
  activePhotoIndex,
  currentStep,
  onExit,
  onCompletePhoto
}) => {
  return (
    <div className="flex justify-between mt-4">
      <Button 
        variant="outline" 
        onClick={onExit}
        className="bg-red-800 hover:bg-red-700 text-white"
      >
        Exit
      </Button>
      
      <div className="flex space-x-2">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className={`w-3 h-3 rounded-full ${
              activePhotoIndex === index 
                ? 'bg-purple-500' 
                : photo.completed 
                  ? 'bg-green-500' 
                  : 'bg-gray-500'
            }`} 
          />
        ))}
      </div>

      {currentStep === 'sticker' && (
        <Button
          variant="default"
          onClick={onCompletePhoto}
          className="bg-purple-700 hover:bg-purple-600"
        >
          Complete Photo
        </Button>
      )}
    </div>
  );
};

export default GameFooter;
