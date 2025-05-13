
import { useState, useEffect } from 'react';
import MinigameContainer from '../common/MinigameContainer';
import { toast } from 'sonner';
import { soundManager } from '@/utils/sound';
import { useMemoriesDateState } from '@/hooks/memoriesDate/useMemoriesDateState';
import LocationSelectionStep from './LocationSelectionStep';
import FrameSelectionStep from './FrameSelectionStep';
import StickerSelectionStep from './StickerSelectionStep';
import PhotoGalleryStep from './PhotoGalleryStep';
import { useGame } from '@/context/GameContext';
import { handleLoveInterestAffectionChange } from '@/utils/affectionUtils';

interface MemoriesDateGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

type GameStep = 'location' | 'frame' | 'sticker' | 'gallery';

const MemoriesDateGame = ({ onComplete, onExit }: MemoriesDateGameProps) => {
  const { gameState, setGameState } = useGame();
  const [currentStep, setCurrentStep] = useState<GameStep>('location');
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  
  // Get game state from our custom hook
  const {
    locations,
    frames,
    stickers,
    selectedFrame,
    selectedSticker,
    photos,
    framePosition,
    stickerPosition,
    frameSize,
    selectLocation,
    selectFrame,
    selectSticker,
    moveFrame,
    moveSticker,
    resizeFrame,
    takePhoto,
    resetSelection
  } = useMemoriesDateState(gameState.currentLoveInterest || 'senara');

  // Play background music when the game starts
  useEffect(() => {
    soundManager.playSFX('memoriesDate-loop-gameplay');
    return () => {
      try {
        soundManager.stopSFX('memoriesDate-loop-gameplay');
      } catch (err) {
        console.error('Error stopping sound:', err);
      }
    };
  }, []);

  // Proceed to next step in the photo creation process
  const handleNextStep = () => {
    if (currentStep === 'location') {
      setCurrentStep('frame');
      soundManager.playSFX('ui-click');
    } else if (currentStep === 'frame') {
      if (!selectedFrame) {
        toast.error("Please select a frame first!");
        return;
      }
      setCurrentStep('sticker');
      soundManager.playSFX('ui-click');
    } else if (currentStep === 'sticker') {
      if (!selectedSticker) {
        toast.error("Please select a sticker first!");
        return;
      }
      
      // Take the photo
      soundManager.playSFX('memoriesDate-camera-click');
      takePhoto();
      
      // Check if we've taken all 3 photos
      if (currentLocationIndex >= 2) {
        // Show gallery
        setCurrentStep('gallery');
        soundManager.playSFX('memoriesDate-effect-twinkle');
      } else {
        // Move to next location
        setCurrentLocationIndex(prev => prev + 1);
        resetSelection();
        setCurrentStep('location');
      }
    } else if (currentStep === 'gallery') {
      // Apply affection change for completing the minigame
      if (gameState.currentLoveInterest) {
        // Use the handleLoveInterestAffectionChange utility to award points
        handleLoveInterestAffectionChange(
          'memoriesDate',
          gameState,
          true, // success = true since they completed all photos
          setGameState
        );
        
        // Show success message with character name
        const loveInterestName = gameState.characters[gameState.currentLoveInterest]?.name || gameState.currentLoveInterest;
        toast.success(`${loveInterestName} appreciates the beautiful memories you've created together!`);
      }
      
      // Complete the minigame
      onComplete(true);
    }
  };

  // Render the current step of the photo creation process
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'location':
        return (
          <LocationSelectionStep
            locations={locations}
            currentLocationIndex={currentLocationIndex}
            selectLocation={selectLocation}
            onNext={handleNextStep}
          />
        );
        
      case 'frame':
        return (
          <FrameSelectionStep
            locations={locations}
            currentLocationIndex={currentLocationIndex}
            frames={frames}
            selectedFrame={selectedFrame}
            framePosition={framePosition}
            frameSize={frameSize}
            moveFrame={moveFrame}
            selectFrame={selectFrame}
            resizeFrame={resizeFrame}
            onNext={handleNextStep}
            onBack={() => setCurrentStep('location')}
          />
        );
        
      case 'sticker':
        return (
          <StickerSelectionStep
            locations={locations}
            currentLocationIndex={currentLocationIndex}
            selectedFrame={selectedFrame}
            selectedSticker={selectedSticker}
            stickers={stickers}
            framePosition={framePosition}
            stickerPosition={stickerPosition}
            frameSize={frameSize}
            moveSticker={moveSticker}
            selectSticker={selectSticker}
            onNext={handleNextStep}
            onBack={() => setCurrentStep('frame')}
          />
        );
        
      case 'gallery':
        return (
          <PhotoGalleryStep
            photos={photos}
            onComplete={handleNextStep}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <MinigameContainer
      title="Memories Date"
      instructions="Create beautiful photo memories at three locations around the festival. Choose a frame, position it, add a sticker, and take the perfect photo with your love interest."
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center justify-center p-4">
        {renderCurrentStep()}
      </div>
    </MinigameContainer>
  );
};

export default MemoriesDateGame;
