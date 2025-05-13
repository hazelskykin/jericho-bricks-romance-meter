
import { useState } from 'react';
import { soundManager } from '@/utils/sound';
import { useGameState } from './bloomWithAView/useGameState';
import { useGameHandlers } from './bloomWithAView/useGameHandlers';
import { HiddenItem } from './bloomWithAView/types';

// Re-export the HiddenItem type from the types file
export type { HiddenItem };

export function useBloomWithAViewGame(onComplete: (success: boolean) => void, onExit: () => void) {
  // Game state - remove timer-related code
  const gameState = useGameState();
  
  // State setters (using useState to maintain reactivity)
  const [hiddenItems, setHiddenItems] = useState(gameState.hiddenItems);
  const [clickPosition, setClickPosition] = useState(gameState.clickPosition);
  const [showHint, setShowHint] = useState(gameState.showHint);
  const [hintCooldown, setHintCooldown] = useState(gameState.hintCooldown);
  const [gameComplete, setGameComplete] = useState(gameState.gameComplete);
  const [gameExited, setGameExited] = useState(gameState.gameExited);
  
  // Update the gameState reference with the latest state values
  const currentGameState = {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    gameExited
  };
  
  // Check if all items are found
  const checkCompletion = () => {
    const allItemsFound = hiddenItems.every(item => item.found);
    if (allItemsFound && !gameComplete) {
      setGameComplete(true);
      // Play success sound
      soundManager.playSFX('bloomWithAView-completion-success');
    }
    return allItemsFound;
  };
  
  // Use the handlers hook to manage game interactions
  const { handleSceneClick, handleHintClick, handleExit } = useGameHandlers({
    gameState: currentGameState,
    setHiddenItems,
    setClickPosition,
    setShowHint,
    setHintCooldown,
    setGameComplete,
    setGameExited,
    checkCompletion,
    playSoundSafely: (sound: string) => soundManager.playSFX(sound),
    onComplete,
    onExit
  });

  return {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    handleSceneClick,
    handleHintClick,
    handleExit,
    checkCompletion
  };
}
