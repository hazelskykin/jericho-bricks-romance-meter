
import { useEffect } from 'react';
import { toast } from 'sonner';
import { soundManager } from '@/utils/sound';

interface TimerProps {
  gameState: {
    timeRemaining: number;
    gameComplete: boolean;
    hiddenItems: Array<{found: boolean}>;
  };
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  setGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: (success: boolean) => void;
}

export function useGameTimer({
  gameState,
  setTimeRemaining,
  setGameComplete,
  onComplete
}: TimerProps) {
  // Track completion state to avoid multiple completions
  const allItemsFound = gameState.hiddenItems.every(item => item.found);
  const itemsCount = gameState.hiddenItems.filter(item => item.found).length;
  const totalItems = gameState.hiddenItems.length;
  
  // Effect for timer countdown
  useEffect(() => {
    // Don't start countdown if game is already complete
    if (gameState.gameComplete) return;
    
    // Start the countdown timer
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        // If time's up, complete the game
        if (prevTime <= 1) {
          clearInterval(timer);
          
          // If all items are found, this is a successful completion
          if (allItemsFound) {
            console.log("All items found! Game complete.");
            playSoundSafely('win');
            
            // Delay the completion to allow for visual feedback
            setTimeout(() => {
              if (!gameState.gameComplete) {
                setGameComplete(true);
                console.log("Game complete, calling onComplete handler");
                onComplete(true);
              }
            }, 500);
            return 0;
          } else {
            // Game over, didn't find all items
            console.log("Time's up! Items found: " + itemsCount + "/" + totalItems);
            playSoundSafely('lose');
            
            // Delay the completion to allow for visual feedback
            setTimeout(() => {
              if (!gameState.gameComplete) {
                setGameComplete(true);
                console.log("Game complete, calling onComplete handler");
                onComplete(false);
              }
            }, 500);
            return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Cleanup the timer on component unmount
    return () => {
      clearInterval(timer);
    };
  }, [gameState.gameComplete, allItemsFound, onComplete, setGameComplete, setTimeRemaining, itemsCount, totalItems]);
  
  // Effect to check for game completion by finding all items
  useEffect(() => {
    // If the game is already marked complete or no items are found yet, do nothing
    if (gameState.gameComplete || !allItemsFound) return;
    
    // All items found - game complete!
    console.log("All items found! Game complete.");
    playSoundSafely('win');
    
    // Important: Add delay before completing to allow animations and sounds to play
    setTimeout(() => {
      if (!gameState.gameComplete) {
        setGameComplete(true);
        console.log("Game complete, calling onComplete handler");
        onComplete(true);
      }
    }, 500);
  }, [allItemsFound, gameState.gameComplete, onComplete, setGameComplete]);
  
  // Helper function to safely play sounds
  const playSoundSafely = (soundId: string) => {
    try {
      soundManager.playSFX(soundId);
    } catch (err) {
      console.error(`Error playing sound ${soundId}:`, err);
    }
  };

  return {
    playSoundSafely
  };
}
