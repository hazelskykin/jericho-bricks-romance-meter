
import { useEffect, useRef } from 'react';
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
  const { hiddenItems, timeRemaining, gameComplete, gameExited } = gameState;
  const onCompleteCalled = useRef(false);
  
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
    if (gameComplete || gameExited) return;

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
          } else {
            playSoundSafely('lose');
          }
          
          return 0;
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameComplete, gameExited, hiddenItems, setGameComplete, setTimeRemaining]);
  
  // Check for early victory if all items are found
  useEffect(() => {
    if (gameComplete || gameExited || onCompleteCalled.current) return;
    
    const allItemsFound = hiddenItems.length > 0 && hiddenItems.every(item => item.found);
    
    if (allItemsFound) {
      console.log('All items found! Game complete.');
      setGameComplete(true);
      playSoundSafely('win');
      
      // Use a toast only for the completion message
      toast.success("You found all the items!", {
        description: "Great job!",
        duration: 3000
      });
    }
  }, [hiddenItems, gameComplete, gameExited, setGameComplete]);
  
  // Handle game completion and progression
  useEffect(() => {
    if (!gameComplete || onCompleteCalled.current) return;
    
    // Add delay before completing to show the success message
    const timer = setTimeout(() => {
      console.log("Game complete, calling onComplete handler");
      const allItemsFound = hiddenItems.every(item => item.found);
      onCompleteCalled.current = true; // Prevent multiple calls
      onComplete(allItemsFound);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [gameComplete, hiddenItems, onComplete]);

  return {
    playSoundSafely
  };
}
