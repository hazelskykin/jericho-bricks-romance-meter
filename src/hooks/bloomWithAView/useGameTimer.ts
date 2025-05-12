
import { useEffect } from 'react';
import { toast } from 'sonner';
import { GameState } from './types';
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
  const { hiddenItems, timeRemaining, gameComplete } = gameState;

  // Function to safely play sounds that handles errors
  const playSoundSafely = (soundId: string) => {
    try {
      soundManager.playSFX(soundId);
    } catch (err) {
      console.warn(`Failed to play sound: ${soundId}`, err);
    }
  };

  // Handle timer countdown
  useEffect(() => {
    if (gameComplete) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        // Time's up - game over
        if (prev <= 1) {
          clearInterval(timer);
          setGameComplete(true);
          
          // Check if all items were found
          const allFound = hiddenItems.every(item => item.found);
          
          if (allFound) {
            playSoundSafely('win');
            // Only call onComplete once, with longer delay to prevent auto-restart
            setTimeout(() => {
              onComplete(true);
            }, 3000);
          } else {
            playSoundSafely('lose');
            // Only call onComplete once, with longer delay to prevent auto-restart
            setTimeout(() => {
              onComplete(false);
            }, 3000);
          }
          
          return 0;
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameComplete, hiddenItems, setGameComplete, setTimeRemaining, onComplete]);
  
  // Check for early victory if all items are found, but only once
  useEffect(() => {
    if (gameComplete) return;
    
    const allItemsFound = hiddenItems.length > 0 && hiddenItems.every(item => item.found);
    
    if (allItemsFound) {
      console.log('All items found! Game complete.');
      setGameComplete(true);
      playSoundSafely('win');
      toast.success("You found all the items!", {
        description: "Great job!",
        duration: 3000
      });
      
      // Add significant delay before triggering completion to prevent auto-restart
      // and use a state flag to ensure we only call onComplete once
      const timer = setTimeout(() => {
        onComplete(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hiddenItems, gameComplete, setGameComplete, onComplete]);

  return {
    playSoundSafely
  };
}
