
import React from 'react';
import { MinigameType } from '@/types/minigames';
import PlaceholderMinigame from './PlaceholderMinigame';

interface MinigameHandlerProps {
  activeMinigame: MinigameType | null;
  completeMinigame: (success: boolean) => void;
  exitMinigame: () => void;
}

/**
 * Temporarily simplified MinigameHandler that uses placeholders
 * instead of actual minigame components
 */
const MinigameHandler: React.FC<MinigameHandlerProps> = ({ 
  activeMinigame, 
  completeMinigame, 
  exitMinigame 
}) => {
  console.log(`MinigameHandler rendering with activeMinigame: ${activeMinigame}`);
  
  if (!activeMinigame) {
    return null;
  }

  // Use the placeholder minigame for all minigame types
  return (
    <PlaceholderMinigame
      minigameType={activeMinigame}
      onComplete={completeMinigame}
      onExit={exitMinigame}
    />
  );
};

export default MinigameHandler;
