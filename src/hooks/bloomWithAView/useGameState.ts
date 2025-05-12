import { useState } from 'react';
import { HiddenItem, GameState } from './types';

export function useGameState(gameDuration: number): GameState {
  // Initialize hidden items
  const [hiddenItems, setHiddenItems] = useState<HiddenItem[]>([
    {
      id: 'rare-orchid',
      name: 'Rare Orchid',
      found: false,
      position: { x: 120, y: 150 }
    },
    {
      id: 'garden-gnome',
      name: 'Garden Gnome',
      found: false,
      position: { x: 300, y: 320 }
    },
    {
      id: 'butterfly',
      name: 'Butterfly',
      found: false,
      position: { x: 180, y: 80 }
    },
    {
      id: 'vintage-watering-can',
      name: 'Vintage Watering Can',
      found: false,
      position: { x: 250, y: 250 }
    },
    {
      id: 'stone-sculpture',
      name: 'Stone Sculpture',
      found: false,
      position: { x: 70, y: 200 }
    }
  ]);
  
  // Other game state
  const [clickPosition, setClickPosition] = useState<{x: number, y: number} | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintCooldown, setHintCooldown] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);

  return {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    timeRemaining
  };
}

// Export setters separately to keep component interface clean
export function useGameStateSetters(gameState: GameState) {
  // These functions are defined here but will be used in other hooks
  const updateHiddenItem = (itemId: string, updates: Partial<HiddenItem>) => {
    const updatedItems = gameState.hiddenItems.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    );
    return updatedItems;
  };

  const markItemFound = (itemId: string) => {
    return updateHiddenItem(itemId, { found: true });
  };
  
  const highlightItem = (itemId: string, highlighted: boolean = true) => {
    return updateHiddenItem(itemId, { highlighted });
  };
  
  const resetHighlights = () => {
    return gameState.hiddenItems.map(item => ({ ...item, highlighted: false }));
  };

  return {
    updateHiddenItem,
    markItemFound,
    highlightItem,
    resetHighlights
  };
}
