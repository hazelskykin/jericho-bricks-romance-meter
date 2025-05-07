
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import SeasonTransition from './SeasonTransition';

/**
 * Game scene observer component to handle minigame transitions and season changes
 */
const GameSceneObserver = () => {
  const { gameState, startMinigame, checkSeasonProgress } = useGame();

  // Monitor scene changes to detect when to trigger minigames or season transitions
  useEffect(() => {
    const currentScene = gameState.currentScene;
    
    // Check specific minigame trigger scenes - these MUST match the scene IDs in data files
    const minigameMappings = {
      // Spring minigames
      'spring-brooms-away-start': 'broomsAway',
      'spring-mud-fling-start': 'mudFling',
      'spring-bloom-view-start': 'bloomWithAView',
      
      // Summer minigames
      'summer-serenade-start': 'serenade',
      'summer-spoken-word-start': 'spokenWord', 
      'summer-whats-on-tap-start': 'whatsOnTap',
      
      // Autumn minigames
      'autumn-tour-guide-start': 'tourGuide',
      'autumn-crafter-start': 'crafter',
      'autumn-memories-date-start': 'memoriesDate',
      
      // Winter minigames
      'winter-charity-auction-start': 'charityAuction',
      'winter-gala-dance-start': 'galaDance',
      'winter-looking-signs-start': 'lookingSigns'
    };
    
    // Explicitly check if the current scene is a minigame trigger
    if (currentScene in minigameMappings) {
      const minigameType = minigameMappings[currentScene];
      
      // Add a clearer delay to ensure state updates are processed in the right order
      setTimeout(() => {
        try {
          startMinigame(minigameType);
        } catch (error) {
          console.error("Error starting minigame:", error);
        }
      }, 500); // Increase delay to ensure state is ready
    }
    
    // Check for season transition scenes
    checkSeasonProgress(currentScene);
    
  }, [gameState.currentScene, startMinigame, checkSeasonProgress]);

  // Render season transition screens when needed
  const renderSeasonTransition = () => {
    if (gameState.currentScene === 'season-transition-spring') {
      return <SeasonTransition season="spring" nextSceneId="spring-intro" />;
    } else if (gameState.currentScene === 'season-transition-summer') {
      return <SeasonTransition season="summer" nextSceneId="summer-intro" />;
    } else if (gameState.currentScene === 'season-transition-autumn') {
      return <SeasonTransition season="autumn" nextSceneId="autumn-intro" />;
    } else if (gameState.currentScene === 'season-transition-winter') {
      return <SeasonTransition season="winter" nextSceneId="winter-intro" />;
    }
    return null;
  };

  return renderSeasonTransition();
};

export default GameSceneObserver;
