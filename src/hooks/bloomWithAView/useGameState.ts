
import { useState } from 'react';
import { HiddenItem } from './types';

// Initial hidden items (5 items to find)
const initialHiddenItems: HiddenItem[] = [
  {
    id: 'wateringcan',
    name: 'Watering Can',
    imagePath: '/assets/minigames/spring/bloomWithAView/hidden-objects-wateringcan.png',
    position: { x: 75, y: 60 },
    found: false
  },
  {
    id: 'gloves',
    name: 'Garden Gloves',
    imagePath: '/assets/minigames/spring/bloomWithAView/hidden-objects-gloves.png',
    position: { x: 25, y: 75 },
    found: false
  },
  {
    id: 'beedrone',
    name: 'Bee Drone',
    imagePath: '/assets/minigames/spring/bloomWithAView/hidden-objects-beedrone.png',
    position: { x: 55, y: 25 },
    found: false
  },
  {
    id: 'seedpacket',
    name: 'Seed Packet',
    imagePath: '/assets/minigames/spring/bloomWithAView/hidden-objects-seedpacket.png',
    position: { x: 15, y: 40 },
    found: false
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    imagePath: '/assets/minigames/spring/bloomWithAView/hidden-objects-butterfly.png',
    position: { x: 85, y: 35 },
    found: false
  }
];

// Game state hook
export function useGameState() {
  // Game state
  const [hiddenItems] = useState<HiddenItem[]>(initialHiddenItems);
  const [clickPosition, setClickPosition] = useState<{ x: number, y: number } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintCooldown, setHintCooldown] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameExited, setGameExited] = useState(false);
  
  return {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    gameExited
  };
}
