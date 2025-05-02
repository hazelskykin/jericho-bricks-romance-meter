
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';

/**
 * Game scene observer component to handle minigame transitions
 * Extracted from App.tsx to maintain separation of concerns
 */
const GameSceneObserver = () => {
  const { gameState, startMinigame } = useGame();

  // Monitor scene changes to detect when to trigger minigames
  useEffect(() => {
    const currentScene = gameState.currentScene;
    
    // Check if we need to start a minigame based on the scene
    if (currentScene === 'spring-brooms-away-start') {
      startMinigame('broomsAway');
    } else if (currentScene === 'spring-mud-fling-start') {
      startMinigame('mudFling');
    } else if (currentScene === 'spring-bloom-view-start') {
      startMinigame('bloomWithAView');
    } else if (currentScene === 'spring-transition') {
      // Transition to summer season
      // This is where we would handle season transition
    }
  }, [gameState.currentScene, startMinigame]);

  return null; // This component doesn't render anything
};

export default GameSceneObserver;
