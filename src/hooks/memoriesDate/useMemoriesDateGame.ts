
import { useEffect, useState } from 'react';
import { soundManager } from '@/utils/sound';
import { PhotoLocation, PhotoFrame, PhotoSticker, useMemoriesDateState } from './useMemoriesDateState';
import { CharacterId } from '@/types/game';
import { toast } from 'sonner';

// Define the MemoriesPhoto interface for photos in the album
export interface MemoriesPhoto {
  id: string;
  location: PhotoLocation;
  frame: PhotoFrame;
  stickers: PhotoSticker[];
  completed: boolean;
}

export const useMemoriesDateGame = (onComplete: (success: boolean) => void) => {
  // Game state management
  const [currentStep, setCurrentStep] = useState<'location' | 'frame' | 'sticker' | 'gallery'>('location');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [photos, setPhotos] = useState<MemoriesPhoto[]>([
    { id: '1', location: { id: '', name: '', src: '' }, frame: { id: '', name: '', src: '' }, stickers: [], completed: false },
    { id: '2', location: { id: '', name: '', src: '' }, frame: { id: '', name: '', src: '' }, stickers: [], completed: false },
    { id: '3', location: { id: '', name: '', src: '' }, frame: { id: '', name: '', src: '' }, stickers: [], completed: false }
  ]);
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // Use the base state hook
  const memoriesDateState = useMemoriesDateState();
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(0);
  
  // Setup game music
  useEffect(() => {
    // Play game background music
    soundManager.playSFX('memoriesDate-loop-gameplay', true);
    
    // Cleanup when component unmounts
    return () => {
      soundManager.stopSFX('memoriesDate-loop-gameplay');
    };
  }, []);

  // Handle location selection
  const handleLocationSelect = (index: number) => {
    setSelectedLocationIndex(index);
    // Move to frame selection step
    setCurrentStep('frame');
  };

  // Handle frame selection
  const handleFrameSelect = (frameId: string) => {
    // Find the selected frame
    const selectedFrame = memoriesDateState.frames.find(frame => frame.id === frameId);
    
    if (selectedFrame) {
      // Play sound effect
      soundManager.playSFX('memoriesDate-frame-select', false);
      
      // Update photos array with selected frame
      const updatedPhotos = [...photos];
      updatedPhotos[activePhotoIndex] = {
        ...updatedPhotos[activePhotoIndex],
        frame: selectedFrame,
        location: memoriesDateState.locations[selectedLocationIndex]
      };
      
      setPhotos(updatedPhotos);
      
      // Move to sticker selection step
      setCurrentStep('sticker');
    }
  };

  // Handle sticker selection
  const handleStickerSelect = (stickerId: string) => {
    // Find the selected sticker
    const selectedSticker = memoriesDateState.stickers.find(sticker => sticker.id === stickerId);
    
    if (selectedSticker) {
      // Play sound effect
      soundManager.playSFX('memoriesDate-sticker-place', false);
      
      // Update photos array with selected sticker
      const updatedPhotos = [...photos];
      updatedPhotos[activePhotoIndex].stickers = [
        ...updatedPhotos[activePhotoIndex].stickers || [],
        selectedSticker
      ];
      
      setPhotos(updatedPhotos);
    }
  };

  // Handle completing a photo
  const handlePhotoComplete = () => {
    // Play camera click sound
    soundManager.playSFX('memoriesDate-camera-click', false);
    
    // Mark the current photo as completed
    const updatedPhotos = [...photos];
    updatedPhotos[activePhotoIndex].completed = true;
    setPhotos(updatedPhotos);
    
    // Check if we need to move to the next photo or finish the game
    if (activePhotoIndex < photos.length - 1) {
      // Move to the next photo
      setActivePhotoIndex(activePhotoIndex + 1);
      setCurrentStep('location');
      toast.success("Photo saved! Let's take another one.");
    } else {
      // All photos completed, show the gallery
      setSuccessMessage("You've completed your memory book!");
      setCurrentStep('gallery');
      toast.success("Memory book complete!");
    }
  };

  // Handle finishing the game
  const handleFinish = () => {
    // Signal completion to parent component
    onComplete(true);
  };

  // Get display photos for gallery
  const getDisplayPhotos = () => {
    return photos.filter(photo => photo.completed);
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
    getDisplayPhotos
  };
};

export default useMemoriesDateGame;
