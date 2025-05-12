
import { useEffect } from 'react';
import { toast } from 'sonner';
import { soundManager } from '@/utils/sound';
import { GameState } from './types';

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
  const { timeRemaining, gameComplete, hiddenItems } = gameState;
  
  // Play sound safely with fallbacks
  const playSoundSafely = (soundId: string) => {
    try {
      console.log(`🔊 Attempting to play sound: ${soundId}`);
      soundManager.playSFX(soundId);
    } catch (error) {
      console.error(`Failed to play sound ${soundId}:`, error);
      
      // Try alternative sound IDs with different capitalization
      try {
        const altSoundId = soundId.replace('bloomWithAView', 'bloomwithAView');
        console.log(`🔊 Trying alternative sound ID: ${altSoundId}`);
        soundManager.playSFX(altSoundId);
      } catch (altError) {
        console.error(`Failed to play alternative sound ${altError}`);
      }
    }
  };
  
  // Game timer
  useEffect(() => {
    if (timeRemaining <= 0 && !gameComplete) {
      // Time's up, end the game
      setGameComplete(true);
      playSoundSafely('game-lose');
      toast.error("Time's up!");
      setTimeout(() => {
        onComplete(false);
      }, 2000);
      return;
    }
    
    if (gameComplete) return;
    
    const timer = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRemaining, gameComplete, onComplete, setGameComplete, setTimeRemaining]);
  
  // Check for game completion
  useEffect(() => {
    const allFound = hiddenItems.every(item => item.found);
    
    if (allFound && !gameComplete) {
      setGameComplete(true);
      playSoundSafely('game-win');
      toast.success("You found all the hidden items!");
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }
  }, [hiddenItems, gameComplete, onComplete, setGameComplete]);

  return { playSoundSafely };
}
