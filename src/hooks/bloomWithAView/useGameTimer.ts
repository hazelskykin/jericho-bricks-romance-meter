
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
            // Add slight delay before reporting completion to prevent auto-restart
            setTimeout(() => {
              onComplete(true);
            }, 2000);
          } else {
            playSoundSafely('lose');
            // Add slight delay before reporting completion to prevent auto-restart
            setTimeout(() => {
              onComplete(false);
            }, 2000);
          }
          
          return 0;
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameComplete, hiddenItems, setGameComplete, setTimeRemaining, onComplete]);
  
  // Check for early victory if all items are found
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
      
      // Add delay before triggering completion to prevent auto-restart
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }
  }, [hiddenItems, gameComplete, setGameComplete, onComplete]);

  return {
    playSoundSafely
  };
}
