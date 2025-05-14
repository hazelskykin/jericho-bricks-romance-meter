
import React from 'react';
import LocationSelectionStep from './LocationSelectionStep';
import FrameSelectionStep from './FrameSelectionStep';
import StickerSelectionStep from './StickerSelectionStep';
import PhotoGalleryStep from './PhotoGalleryStep';
import GameFooter from './GameFooter';
import { useMemoriesDateGame } from '@/hooks/memoriesDate/useMemoriesDateGame';

interface MemoriesDateGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const MemoriesDateGame: React.FC<MemoriesDateGameProps> = ({ onComplete, onExit }) => {
  const {
    currentStep,
    activePhotoIndex,
    successMessage,
    selectedLocationIndex,
    photos,
    memoriesDateState,
    handleLocationSelect,
    handleFrameSelect,
    handleStickerSelect,
    handlePhotoComplete,
    handleFinish,
    getDisplayPhotos
  } = useMemoriesDateGame(onComplete);

  return (
    <div className="flex flex-col h-full w-full bg-gray-900 text-white p-4 rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Memories Date</h2>
        <p className="text-gray-400">
          {currentStep === 'gallery' 
            ? "Your memory book is complete!" 
            : "Create memories together by making a photo album"
          }
        </p>
        {successMessage && currentStep === 'gallery' && (
          <p className="text-green-400 mt-2">{successMessage}</p>
        )}
      </div>

      {/* Step Components - conditionally rendered based on current step */}
      {currentStep === 'location' && (
        <LocationSelectionStep 
          locations={memoriesDateState.locations}
          currentLocationIndex={selectedLocationIndex}
          selectLocation={handleLocationSelect}
        />
      )}

      {currentStep === 'frame' && (
        <FrameSelectionStep 
          frames={memoriesDateState.frames}
          selectFrame={handleFrameSelect}
        />
      )}

      {currentStep === 'sticker' && (
        <StickerSelectionStep 
          stickers={memoriesDateState.stickers}
          selectSticker={handleStickerSelect}
          onComplete={handlePhotoComplete}
          currentStickers={photos[activePhotoIndex]?.stickers || []}
        />
      )}

      {currentStep === 'gallery' && (
        <PhotoGalleryStep 
          photos={getDisplayPhotos()}
          onFinish={handleFinish}
        />
      )}

      {/* Footer with controls and navigation */}
      <GameFooter 
        photos={photos}
        activePhotoIndex={activePhotoIndex}
        currentStep={currentStep}
        onExit={onExit}
        onCompletePhoto={handlePhotoComplete}
      />
    </div>
  );
};

export default MemoriesDateGame;
