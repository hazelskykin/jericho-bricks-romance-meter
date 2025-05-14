
import { useState, useEffect } from 'react';
import { useAffection } from '@/hooks/useAffection';
import { useGame } from '@/context/GameContext';
import { useMemoriesDateState } from '@/hooks/memoriesDate/useMemoriesDateState';
import { soundManager } from '@/utils/sound';

export interface MemoriesPhoto {
  location: string;
  frame: string;
  stickers: string[];
  completed: boolean;
}

export function useMemoriesDateGame(onComplete: (success: boolean) => void) {
  const { modifyAffection } = useAffection();
  const { gameState } = useGame();
  const [currentStep, setCurrentStep] = useState<'location' | 'frame' | 'sticker' | 'gallery'>('location');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const memoriesDateState = useMemoriesDateState(gameState.currentLoveInterest);
  
  // Initialize with 3 empty photos
  const [photos, setPhotos] = useState<MemoriesPhoto[]>([
    { location: '', frame: '', stickers: [], completed: false },
    { location: '', frame: '', stickers: [], completed: false },
    { location: '', frame: '', stickers: [], completed: false },
  ]);

  // Setup game music
  useEffect(() => {
    soundManager.playSFX('memoriesDate-loop-gameplay', true);
    
    // Cleanup when component unmounts
    return () => {
      soundManager.stopSFX();
    };
  }, []);

  // Location selection handler
  const handleLocationSelect = (index: number) => {
    soundManager.playSFX('memoriesDate-camera-click', true);
    setSelectedLocationIndex(index);
    setPhotos(prev => {
      const updated = [...prev];
      updated[activePhotoIndex] = { ...updated[activePhotoIndex], location: memoriesDateState.locations[index].id };
      return updated;
    });
    setCurrentStep('frame');
  };

  // Frame selection handler
  const handleFrameSelect = (frameId: string) => {
    soundManager.playSFX('memoriesDate-frame-select', true);
    setPhotos(prev => {
      const updated = [...prev];
      updated[activePhotoIndex] = { ...updated[activePhotoIndex], frame: frameId };
      return updated;
    });
    setCurrentStep('sticker');
  };

  // Sticker selection handler
  const handleStickerSelect = (stickerId: string) => {
    soundManager.playSFX('memoriesDate-sticker-select', true);
    setPhotos(prev => {
      const updated = [...prev];
      const currentStickers = [...updated[activePhotoIndex].stickers];
      // Only add sticker if we don't already have it
      if (!currentStickers.includes(stickerId)) {
        currentStickers.push(stickerId);
      }
      updated[activePhotoIndex] = { ...updated[activePhotoIndex], stickers: currentStickers };
      return updated;
    });
  };

  // Photo completion handler
  const handlePhotoComplete = () => {
    soundManager.playSFX('memoriesDate-effect-twinkle', true);
    
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

  // Game completion handler
  const handleFinish = () => {
    soundManager.stopSFX();
    onComplete(true);
  };
  
  // Map internal photos format to the format expected by the PhotoGalleryStep
  const getDisplayPhotos = () => {
    return photos.map(photo => ({
      location: memoriesDateState.locations.find(l => l.id === photo.location) || memoriesDateState.locations[0],
      frame: memoriesDateState.frames.find(f => f.id === photo.frame) || memoriesDateState.frames[0],
      sticker: memoriesDateState.stickers.find(s => photo.stickers[0] === s.id) || memoriesDateState.stickers[0],
      framePosition: { x: 50, y: 50 },
      stickerPosition: { x: 100, y: 100 },
      frameSize: 200,
      loveInterest: gameState.currentLoveInterest || 'maven'
    }));
  };

  return {
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
    getDisplayPhotos,
    setCurrentStep,
  };
}
