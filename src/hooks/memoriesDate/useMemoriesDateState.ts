
import { useState, useEffect } from 'react';
import { CharacterId } from '@/types/game';
import { MinigameAsset } from '@/types/assets';
import { assetManager } from '@/utils/assetManager';
import { toast } from 'sonner';

export interface PhotoLocation {
  id: string;
  name: string;
  src: string;
}

export interface PhotoFrame {
  id: string;
  name: string;
  src: string;
}

export interface PhotoSticker {
  id: string;
  name: string;
  src: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Photo {
  location: PhotoLocation;
  frame: PhotoFrame;
  sticker: PhotoSticker;
  framePosition: Position;
  stickerPosition: Position;
  frameSize: number;
  loveInterest: CharacterId;
}

export function useMemoriesDateState(loveInterestId?: CharacterId) {
  // Available locations (backdrops)
  const [locations, setLocations] = useState<PhotoLocation[]>([
    { id: 'market', name: 'Market', src: '/assets/minigames/autumn/memoriesDate/market-backdrop.png' },
    { id: 'overlook', name: 'City Overlook', src: '/assets/minigames/autumn/memoriesDate/overlook-backdrop.png' },
    { id: 'boardwalk', name: 'Boardwalk', src: '/assets/minigames/autumn/memoriesDate/boardwalk-backdrop.png' }
  ]);
  
  // Available frames
  const [frames, setFrames] = useState<PhotoFrame[]>([
    { id: 'neon', name: 'Neon Frame', src: '/assets/minigames/autumn/memoriesDate/frames-neon.png' },
    { id: 'gears', name: 'Gear Frame', src: '/assets/minigames/autumn/memoriesDate/frames-gears.png' },
    { id: 'circle', name: 'Circle Frame', src: '/assets/minigames/autumn/memoriesDate/frames-circle.png' }
  ]);
  
  // Available stickers
  const [stickers, setStickers] = useState<PhotoSticker[]>([
    { id: 'bestday', name: 'Best Day', src: '/assets/minigames/autumn/memoriesDate/stickers-bestday.png' },
    { id: 'kitten', name: 'Kitten', src: '/assets/minigames/autumn/memoriesDate/stickers-kitten.png' },
    { id: 'sparklehearts', name: 'Sparkle Hearts', src: '/assets/minigames/autumn/memoriesDate/stickers-sparklehearts.png' },
    { id: 'sparklegears', name: 'Sparkle Gears', src: '/assets/minigames/autumn/memoriesDate/stickers-sparklegears.png' }
  ]);
  
  // Current selections
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(0);
  const [selectedFrame, setSelectedFrame] = useState<PhotoFrame | null>(null);
  const [selectedSticker, setSelectedSticker] = useState<PhotoSticker | null>(null);
  
  // Positions and sizes
  const [framePosition, setFramePosition] = useState<Position>({ x: 50, y: 50 });
  const [stickerPosition, setStickerPosition] = useState<Position>({ x: 100, y: 100 });
  const [frameSize, setFrameSize] = useState<number>(200);
  
  // Completed photos
  const [photos, setPhotos] = useState<Photo[]>([]);
  
  // Preload assets
  useEffect(() => {
    const assetPaths = [
      ...locations.map(loc => loc.src),
      ...frames.map(frame => frame.src),
      ...stickers.map(sticker => sticker.src),
      `/assets/characters/maven-chibi.png`
    ];
    
    if (loveInterestId) {
      assetPaths.push(`/assets/characters/${loveInterestId}-chibi.png`);
    }
    
    assetManager.preloadAssets(assetPaths, (loaded, total) => {
      console.log(`Loaded ${loaded}/${total} Memories Date assets`);
    }).catch(error => {
      console.error('Failed to preload Memories Date assets:', error);
    });
  }, [loveInterestId]);
  
  // Handle location selection
  const selectLocation = (index: number) => {
    setSelectedLocationIndex(index);
  };
  
  // Handle frame selection
  const selectFrame = (frame: PhotoFrame) => {
    setSelectedFrame(frame);
  };
  
  // Handle sticker selection
  const selectSticker = (sticker: PhotoSticker) => {
    setSelectedSticker(sticker);
  };
  
  // Handle frame movement
  const moveFrame = (x: number, y: number) => {
    setFramePosition({ x, y });
  };
  
  // Handle sticker movement
  const moveSticker = (x: number, y: number) => {
    setStickerPosition({ x, y });
  };
  
  // Handle frame resizing
  const resizeFrame = (size: number) => {
    setFrameSize(size);
  };
  
  // Take a photo (save current state)
  const takePhoto = () => {
    if (!selectedFrame || !selectedSticker || !loveInterestId) {
      toast.error("Cannot take photo - missing elements");
      return;
    }
    
    const newPhoto: Photo = {
      location: locations[selectedLocationIndex],
      frame: selectedFrame,
      sticker: selectedSticker,
      framePosition,
      stickerPosition,
      frameSize,
      loveInterest: loveInterestId
    };
    
    setPhotos(prev => [...prev, newPhoto]);
    toast.success("Photo taken!");
  };
  
  // Reset selection for next photo
  const resetSelection = () => {
    setSelectedFrame(null);
    setSelectedSticker(null);
    setFramePosition({ x: 50, y: 50 });
    setStickerPosition({ x: 100, y: 100 });
    setFrameSize(200);
  };
  
  return {
    locations,
    frames,
    stickers,
    selectedLocationIndex,
    selectedFrame,
    selectedSticker,
    framePosition,
    stickerPosition,
    frameSize,
    photos,
    selectLocation,
    selectFrame,
    selectSticker,
    moveFrame,
    moveSticker,
    resizeFrame,
    takePhoto,
    resetSelection
  };
}
