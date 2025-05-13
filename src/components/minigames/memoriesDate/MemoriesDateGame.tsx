
import React, { useState, useEffect } from 'react';
import LocationSelectionStep from './LocationSelectionStep';
import FrameSelectionStep from './FrameSelectionStep';
import StickerSelectionStep from './StickerSelectionStep';
import PhotoGalleryStep from './PhotoGalleryStep';
import { Button } from '@/components/ui/button';
import { SoundManager } from '@/utils/sound';
import { useAffection } from '@/hooks/useAffection';
import { useGame } from '@/context/GameContext';

// Load sound manager
const soundManager = SoundManager.getInstance();

// Interfaces for the game data
interface Photo {
  location: string;
  frame: string;
  stickers: string[];
  completed: boolean;
}

interface MemoriesDateGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const MemoriesDateGame: React.FC<MemoriesDateGameProps> = ({ onComplete, onExit }) => {
  const { modifyAffection } = useAffection();
  const { gameState } = useGame();
  const [currentStep, setCurrentStep] = useState<'location' | 'frame' | 'sticker' | 'gallery'>('location');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Initialize with 3 empty photos
  const [photos, setPhotos] = useState<Photo[]>([
    { location: '', frame: '', stickers: [], completed: false },
    { location: '', frame: '', stickers: [], completed: false },
    { location: '', frame: '', stickers: [], completed: false },
  ]);

  // Setup game music
  useEffect(() => {
    soundManager.playSFX('memoriesDate-loop-gameplay');
    
    // Cleanup when component unmounts
    return () => {
      soundManager.stopSFX(); // Using stopSFX() instead of stop()
    };
  }, []);

  const handleLocationSelect = (location: string) => {
    soundManager.playSFX('memoriesDate-camera-click');
    setPhotos(prev => {
      const updated = [...prev];
      updated[activePhotoIndex] = { ...updated[activePhotoIndex], location };
      return updated;
    });
    setCurrentStep('frame');
  };

  const handleFrameSelect = (frame: string) => {
    soundManager.playSFX('memoriesDate-frame-select');
    setPhotos(prev => {
      const updated = [...prev];
      updated[activePhotoIndex] = { ...updated[activePhotoIndex], frame };
      return updated;
    });
    setCurrentStep('sticker');
  };

  const handleStickerSelect = (sticker: string) => {
    soundManager.playSFX('memoriesDate-sticker-select');
    setPhotos(prev => {
      const updated = [...prev];
      const currentStickers = [...updated[activePhotoIndex].stickers];
      // Only add sticker if we don't already have it
      if (!currentStickers.includes(sticker)) {
        currentStickers.push(sticker);
      }
      updated[activePhotoIndex] = { ...updated[activePhotoIndex], stickers: currentStickers };
      return updated;
    });
  };

  const handlePhotoComplete = () => {
    soundManager.playSFX('memoriesDate-effect-twinkle');
    
    // Mark photo as completed
    setPhotos(prev => {
      const updated = [...prev];
      updated[activePhotoIndex] = { ...updated[activePhotoIndex], completed: true };
      return updated;
    });
    
    // Check if all photos are done
    const nextIncompleteIndex = photos.findIndex((photo, index) => 
      index !== activePhotoIndex && !photo.completed);
      
    if (nextIncompleteIndex === -1) {
      // All photos completed
      if (photos.every((photo, index) => 
        index === activePhotoIndex || photo.completed)) {
        
        // Award affection points to current love interest if one is selected
        if (gameState.currentLoveInterest) {
          // Award 5 affection points to the current love interest for completing the memory book
          modifyAffection(gameState.currentLoveInterest, 5);
          setSuccessMessage(`Created a beautiful memory book with ${gameState.characters[gameState.currentLoveInterest].name}!`);
        } else {
          setSuccessMessage("You've created a beautiful memory book!");
        }
        
        // Show gallery of completed photos
        setCurrentStep('gallery');
      }
    } else {
      // Move to next incomplete photo
      setActivePhotoIndex(nextIncompleteIndex);
      setCurrentStep('location');
    }
  };

  const handleFinish = () => {
    soundManager.stopSFX();
    onComplete(true);
  };

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

      {currentStep === 'location' && (
        <LocationSelectionStep onSelectLocation={handleLocationSelect} />
      )}

      {currentStep === 'frame' && (
        <FrameSelectionStep onSelectFrame={handleFrameSelect} />
      )}

      {currentStep === 'sticker' && (
        <StickerSelectionStep 
          onSelectSticker={handleStickerSelect}
          onComplete={handlePhotoComplete}
          currentStickers={photos[activePhotoIndex]?.stickers || []}
        />
      )}

      {currentStep === 'gallery' && (
        <PhotoGalleryStep 
          photos={photos} 
          onFinish={handleFinish}
        />
      )}

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
            onClick={handlePhotoComplete}
            className="bg-purple-700 hover:bg-purple-600"
          >
            Complete Photo
          </Button>
        )}
      </div>
    </div>
  );
};

export default MemoriesDateGame;
