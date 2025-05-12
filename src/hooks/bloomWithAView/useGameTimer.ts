
import { useEffect, useRef } from 'react';
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
  
  // Use a ref to track if completion has already been called
  const completionCalled = useRef(false);
  
  // Use a ref to track the completion timer to clear it if needed
  const completionTimerRef = useRef<number | null>(null);
  
  // Clean up any pending timers when component unmounts
  useEffect(() => {
    return () => {
      if (completionTimerRef.current) {
        clearTimeout(completionTimerRef.current);
      }
    };
  }, []);
  
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
          if (allItemsFound && !completionCalled.current) {
            console.log("All items found! Game complete.");
            
            // Mark game as complete to prevent multiple calls
            completionCalled.current = true;
            setGameComplete(true);
            
            // Delay the completion to allow for visual feedback
            completionTimerRef.current = window.setTimeout(() => {
              console.log("Game complete, calling onComplete handler");
              onComplete(true);
              completionTimerRef.current = null;
            }, 500);
            return 0;
          } else if (!completionCalled.current) {
            // Game over, didn't find all items
            console.log("Time's up! Items found: " + itemsCount + "/" + totalItems);
            
            // Mark game as complete to prevent multiple calls
            completionCalled.current = true;
            setGameComplete(true);
            
            // Delay the completion to allow for visual feedback
            completionTimerRef.current = window.setTimeout(() => {
              console.log("Game complete, calling onComplete handler");
              onComplete(false);
              completionTimerRef.current = null;
            }, 500);
            return 0;
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Cleanup the timer on component unmount or game completion
    return () => {
      clearInterval(timer);
    };
  }, [gameState.gameComplete, allItemsFound, onComplete, setGameComplete, setTimeRemaining, itemsCount, totalItems]);
  
  // Effect to check for game completion by finding all items
  useEffect(() => {
    // If the game is already marked complete or completion has been called, do nothing
    if (gameState.gameComplete || !allItemsFound || completionCalled.current) return;
    
    // All items found - game complete!
    console.log("All items found! Game complete.");
    
    // Mark game as complete to prevent multiple calls
    completionCalled.current = true;
    setGameComplete(true);
    
    // Important: Add delay before completing to allow animations and sounds to play
    completionTimerRef.current = window.setTimeout(() => {
      console.log("Game complete, calling onComplete handler");
      onComplete(true);
      completionTimerRef.current = null;
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
