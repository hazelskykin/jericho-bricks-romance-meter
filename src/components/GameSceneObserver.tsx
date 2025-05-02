
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';

/**
 * Game scene observer component to handle minigame transitions and season changes
 */
const GameSceneObserver = () => {
  const { gameState, startMinigame, checkSeasonProgress } = useGame();

  // Monitor scene changes to detect when to trigger minigames or season transitions
  useEffect(() => {
    const currentScene = gameState.currentScene;
    
    // Check if we need to start a minigame based on the scene
    if (currentScene === 'spring-brooms-away-start') {
      startMinigame('broomsAway');
    } else if (currentScene === 'spring-mud-fling-start') {
      startMinigame('mudFling');
    } else if (currentScene === 'spring-bloom-view-start') {
      startMinigame('bloomWithAView');
    } 
    
    // Check for season transition scenes
    checkSeasonProgress(currentScene);
    
  }, [gameState.currentScene, startMinigame, checkSeasonProgress]);

  return null; // This component doesn't render anything
};

export default GameSceneObserver;
