
import { useState } from 'react';
import { GameState, HiddenItem } from './types';

// Initial hidden items for the game
const initialHiddenItems: HiddenItem[] = [
  {
    id: 'gardening-gloves',
    name: 'Gardening Gloves',
    found: false,
    highlighted: false,
    position: { x: 400, y: 250 }
  },
  {
    id: 'bee-drone',
    name: 'Bee Drone',
    found: false,
    highlighted: false,
    position: { x: 180, y: 300 }
  },
  {
    id: 'seed-packet',
    name: 'Seed Packet',
    found: false,
    highlighted: false,
    position: { x: 600, y: 350 }
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    found: false,
    highlighted: false,
    position: { x: 300, y: 150 }
  },
  {
    id: 'vintage-watering-can',
    name: 'Vintage Watering Can',
    found: false,
    highlighted: false,
    position: { x: 500, y: 200 }
  }
];

// Hook to manage the game state
export function useGameState(initialDuration: number = 30) { // Changed default to 30 seconds
  const [hiddenItems, setHiddenItems] = useState<HiddenItem[]>(initialHiddenItems);
  const [clickPosition, setClickPosition] = useState<{ x: number, y: number } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintCooldown, setHintCooldown] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [gameExited, setGameExited] = useState(false); // Track if game was manually exited

  return {
    // Game state
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    timeRemaining,
    gameExited,
    
    // State setters
    setHiddenItems,
    setClickPosition,
    setShowHint,
    setHintCooldown,
    setGameComplete,
    setTimeRemaining,
    setGameExited
  };
}
