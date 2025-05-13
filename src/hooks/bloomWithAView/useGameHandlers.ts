
import { useCallback } from 'react';
import { HiddenItem } from './types';

interface GameState {
  hiddenItems: HiddenItem[];
  clickPosition: { x: number, y: number } | null;
  showHint: boolean;
  hintCooldown: number;
  gameComplete: boolean;
  gameExited: boolean;
}

interface UseGameHandlersProps {
  gameState: GameState;
  setHiddenItems: React.Dispatch<React.SetStateAction<HiddenItem[]>>;
  setClickPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number } | null>>;
  setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
  setHintCooldown: React.Dispatch<React.SetStateAction<number>>;
  setGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setGameExited: React.Dispatch<React.SetStateAction<boolean>>;
  checkCompletion: () => boolean;
  playSoundSafely: (sound: string) => void;
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

export function useGameHandlers({
  gameState,
  setHiddenItems,
  setClickPosition,
  setShowHint,
  setHintCooldown,
  setGameExited,
  checkCompletion,
  playSoundSafely,
  onComplete,
  onExit
}: UseGameHandlersProps) {
  
  // Handle click on the game scene
  const handleSceneClick = useCallback(
    (x: number, y: number) => {
      if (gameState.gameComplete || gameState.gameExited) return;

      setClickPosition({ x, y });
      
      // Check if any hidden item was clicked
      const clickedItem = gameState.hiddenItems.find((item) => {
        // Calculate distance between click and item center
        const itemX = item.position.x;
        const itemY = item.position.y;
        
        // Item radius (percentage of scene width/height)
        const radius = 10;
        
        // Calculate distance using the percentage values
        const distance = Math.sqrt(Math.pow(x - itemX, 2) + Math.pow(y - itemY, 2));
        
        // Return true if the click is within the item's radius and the item is not already found
        return distance <= radius && !item.found;
      });
      
      if (clickedItem) {
        // Mark the item as found
        setHiddenItems((prevItems) =>
          prevItems.map((item) =>
            item.id === clickedItem.id ? { ...item, found: true } : item
          )
        );
        
        // Reset hint state if active
        if (gameState.showHint) {
          setShowHint(false);
        }
        
        // Play success sound
        playSoundSafely('bloomWithAView-find-success');
        
        // Check if all items are found
        const allFound = checkCompletion();
        if (allFound) {
          // Play game completion sound
          playSoundSafely('bloomWithAView-completion-success');
        }
      } else {
        // Play error sound for misclick
        playSoundSafely('bloomWithAView-find-miss');
      }
    },
    [gameState, setClickPosition, setHiddenItems, setShowHint, checkCompletion, playSoundSafely]
  );
  
  // Handle hint button click
  const handleHintClick = useCallback(() => {
    if (gameState.gameComplete || gameState.gameExited || gameState.hintCooldown > 0) return;
    
    setShowHint(true);
    setHintCooldown(10); // 10 second cooldown for hint
    
    // Start cooldown timer
    const interval = setInterval(() => {
      setHintCooldown((prevCooldown) => {
        if (prevCooldown <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevCooldown - 1;
      });
    }, 1000);
    
    // Play hint sound
    playSoundSafely('bloomWithAView-hint-activate');
    
    return () => clearInterval(interval);
  }, [gameState, setShowHint, setHintCooldown, playSoundSafely]);
  
  // Handle exit button click
  const handleExit = useCallback(() => {
    setGameExited(true);
    onExit();
  }, [setGameExited, onExit]);

  // Handle completion of the game
  const handleComplete = useCallback(() => {
    onComplete(true);
  }, [onComplete]);
  
  return {
    handleSceneClick,
    handleHintClick,
    handleExit,
    handleComplete
  };
}
