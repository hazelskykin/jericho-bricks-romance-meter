
import { useState } from 'react';
import { soundManager } from '@/utils/sound';
import { useGameState } from './bloomWithAView/useGameState';
import { useGameTimer } from './bloomWithAView/useGameTimer';
import { useGameHandlers } from './bloomWithAView/useGameHandlers';
import { HiddenItem } from './bloomWithAView/types';

// Re-export the HiddenItem type from the types file
export type { HiddenItem };

export function useBloomWithAViewGame(onComplete: (success: boolean) => void, onExit: () => void) {
  // Game config
  const gameDuration = 90; // seconds
  
  // Game state
  const gameState = useGameState(gameDuration);
  
  // State setters (using useState to maintain reactivity)
  const [hiddenItems, setHiddenItems] = useState(gameState.hiddenItems);
  const [clickPosition, setClickPosition] = useState(gameState.clickPosition);
  const [showHint, setShowHint] = useState(gameState.showHint);
  const [hintCooldown, setHintCooldown] = useState(gameState.hintCooldown);
  const [gameComplete, setGameComplete] = useState(gameState.gameComplete);
  const [timeRemaining, setTimeRemaining] = useState(gameState.timeRemaining);
  
  // Update the gameState reference with the latest state values
  const currentGameState = {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    timeRemaining
  };
  
  // Use the timer hook to manage game timing
  const { playSoundSafely } = useGameTimer({
    gameState: currentGameState,
    setTimeRemaining,
    setGameComplete,
    onComplete
  });
  
  // Use the handlers hook to manage game interactions
  const { handleSceneClick, handleHintClick, handleExit } = useGameHandlers({
    gameState: currentGameState,
    setHiddenItems,
    setClickPosition,
    setShowHint,
    setHintCooldown,
    gameComplete,
    playSoundSafely,
    onExit
  });

  return {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    timeRemaining,
    handleSceneClick,
    handleHintClick,
    handleExit
  };
}
