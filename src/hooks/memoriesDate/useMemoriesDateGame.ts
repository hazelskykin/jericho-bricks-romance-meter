import { useEffect, useState } from 'react';
import { soundManager } from '@/utils/sound';

export const useMemoriesDateGame = (onComplete: (success: boolean) => void) => {
  const [selectedBackdrop, setSelectedBackdrop] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [photoElements, setPhotoElements] = useState<any[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Backdrops
  const backdrops = [
    { id: 'market', name: 'Market', image: '/assets/minigames/autumn/memoriesDate/market-backdrop.png' },
    { id: 'overlook', name: 'Overlook', image: '/assets/minigames/autumn/memoriesDate/overlook-backdrop.png' },
    { id: 'boardwalk', name: 'Boardwalk', image: '/assets/minigames/autumn/memoriesDate/boardwalk-backdrop.png' },
  ];

  // Frames
  const frames = [
    { id: 'neon', name: 'Neon', image: '/assets/minigames/autumn/memoriesDate/frames-neon.png' },
    { id: 'gears', name: 'Gears', image: '/assets/minigames/autumn/memoriesDate/frames-gears.png' },
    { id: 'circle', name: 'Circle', image: '/assets/minigames/autumn/memoriesDate/frames-circle.png' },
  ];

  // Stickers
  const stickers = [
    { id: 'bestday', name: 'Best Day', image: '/assets/minigames/autumn/memoriesDate/stickers-bestday.png' },
    { id: 'kitten', name: 'Kitten', image: '/assets/minigames/autumn/memoriesDate/stickers-kitten.png' },
    { id: 'sparklehearts', name: 'Sparkle Hearts', image: '/assets/minigames/autumn/memoriesDate/stickers-sparklehearts.png' },
    { id: 'sparklegears', name: 'Sparkle Gears', image: '/assets/minigames/autumn/memoriesDate/stickers-sparklegears.png' },
  ];

  // Setup game music
  useEffect(() => {
    // Adding required true parameter for loop argument
    soundManager.playSFX('memoriesDate-loop-gameplay', true);
    
    // Cleanup when component unmounts
    return () => {
      soundManager.stopSFX('memoriesDate-loop-gameplay');
    };
  }, []);

  // Handle backdrop selection
  const handleBackdropSelect = (backdrop: string) => {
    setSelectedBackdrop(backdrop);
  };

  // Handle frame selection
  const handleFrameSelect = (frame: string) => {
    setSelectedFrame(frame);
  };

  // Handle sticker placement
  const handleStickerSelect = (sticker: string) => {
    // Adding required false parameter for loop argument
    soundManager.playSFX('memoriesDate-sticker-place', false);
    setSelectedSticker(sticker);
    
    if (selectedBackdrop && selectedFrame && sticker) {
      setPhotoElements([selectedBackdrop, selectedFrame, sticker]);
      setIsCompleted(true);
    }
  };

  // Handle game completion
  useEffect(() => {
    if (isCompleted) {
      onComplete(true);
    }
  }, [isCompleted, onComplete]);

  return {
    backdrops,
    frames,
    stickers,
    selectedBackdrop,
    selectedFrame,
    selectedSticker,
    handleBackdropSelect,
    handleFrameSelect,
    handleStickerSelect,
    photoElements,
    isCompleted,
  };
};

export default useMemoriesDateGame;
