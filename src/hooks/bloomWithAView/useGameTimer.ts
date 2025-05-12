
import { useEffect } from 'react';
import { GameState } from './types';
import { toast } from 'sonner';
import { soundManager } from '@/utils/sound';

interface GameTimerProps {
  gameState: GameState;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  setGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: (success: boolean) => void;
}

export function useGameTimer({
  gameState,
  setTimeRemaining,
  setGameComplete,
  onComplete
}: GameTimerProps) {
  const { timeRemaining, hiddenItems, gameComplete } = gameState;

  // Timer effect to count down game time
  useEffect(() => {
    // Skip if game is already complete
    if (gameComplete) return;

    // Start timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Low time warning at 15 seconds
        if (newTime === 15) {
          toast.warning("Only 15 seconds left!");
          playSoundSafely('click'); // Audio cue for low time
        }
        
        // Game complete when timer reaches zero
        if (newTime <= 0) {
          handleGameComplete(false);
          return 0;
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameComplete]);

  // Check if all items are found to end the game
  useEffect(() => {
    const allItemsFound = hiddenItems.every(item => item.found);
    
    if (allItemsFound && hiddenItems.length > 0 && !gameComplete) {
      handleGameComplete(true);
    }
  }, [hiddenItems, gameComplete]);

  // Handle game completion
  const handleGameComplete = (success: boolean) => {
    if (gameComplete) return; // Prevent duplicate calls
    
    setGameComplete(true);
    
    // Play appropriate sound
    if (success) {
      playSoundSafely('bloomWithAView-success');
      toast.success("Congratulations! You found all the items!");
    } else {
      playSoundSafely('item-miss');
      toast.error("Time's up!");
    }
    
    // Notify parent component
    setTimeout(() => {
      onComplete(success);
    }, 2000); // Give time for toast to be seen
  };
  
  // Helper function to safely play sounds, handling any errors
  const playSoundSafely = (soundId: string) => {
    try {
      console.log(`Playing sound: ${soundId}`);
      
      // Try the exact ID first
      soundManager.playSFX(soundId);
    } catch (error) {
      console.warn(`Error playing sound ${soundId}:`, error);
    }
  };

  return {
    playSoundSafely
  };
}
