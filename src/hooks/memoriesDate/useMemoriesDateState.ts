
import { useState } from 'react';

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

export const useMemoriesDateState = () => {
  // Define available locations
  const [locations] = useState<PhotoLocation[]>([
    {
      id: 'market',
      name: 'Autumn Market',
      src: '/assets/minigames/autumn/memoriesDate/market-backdrop.png'
    },
    {
      id: 'overlook',
      name: 'City Overlook',
      src: '/assets/minigames/autumn/memoriesDate/overlook-backdrop.png'
    },
    {
      id: 'boardwalk',
      name: 'Boardwalk',
      src: '/assets/minigames/autumn/memoriesDate/boardwalk-backdrop.png'
    }
  ]);

  // Define available frames
  const [frames] = useState<PhotoFrame[]>([
    {
      id: 'neon',
      name: 'Neon Frame',
      src: '/assets/minigames/autumn/memoriesDate/frames-neon.png'
    },
    {
      id: 'gears',
      name: 'Gear Frame',
      src: '/assets/minigames/autumn/memoriesDate/frames-gears.png'
    },
    {
      id: 'circle',
      name: 'Circle Frame',
      src: '/assets/minigames/autumn/memoriesDate/frames-circle.png'
    }
  ]);

  // Define available stickers
  const [stickers] = useState<PhotoSticker[]>([
    {
      id: 'bestday',
      name: 'Best Day',
      src: '/assets/minigames/autumn/memoriesDate/stickers-bestday.png'
    },
    {
      id: 'kitten',
      name: 'Kitten',
      src: '/assets/minigames/autumn/memoriesDate/stickers-kitten.png'
    },
    {
      id: 'sparklehearts',
      name: 'Sparkle Hearts',
      src: '/assets/minigames/autumn/memoriesDate/stickers-sparklehearts.png'
    },
    {
      id: 'sparklegears',
      name: 'Sparkle Gears',
      src: '/assets/minigames/autumn/memoriesDate/stickers-sparklegears.png'
    }
  ]);

  // Track current selections
  const [selectedBackdrop, setSelectedBackdrop] = useState<string>('');
  const [selectedFrame, setSelectedFrame] = useState<string>('');
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const reset = () => {
    setSelectedBackdrop('');
    setSelectedFrame('');
    setSelectedStickers([]);
    setCompleted(false);
  };

  const complete = () => {
    setCompleted(true);
  };

  return {
    // Available assets
    locations,
    frames,
    stickers,
    
    // Current selections
    selectedBackdrop,
    selectedFrame,
    selectedStickers,
    
    // Selection methods
    setSelectedBackdrop,
    setSelectedFrame,
    setSelectedStickers,
    
    // Status
    isCompleted: completed,
    
    // Actions
    reset,
    complete
  };
};

export default useMemoriesDateState;
