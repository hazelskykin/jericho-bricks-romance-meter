
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
    console.log(`GameSceneObserver detected scene change to: [${currentScene}]`);
    
    // Check if we need to start a minigame based on the scene
    if (currentScene === 'spring-brooms-away-start') {
      console.log('Starting Brooms Away minigame');
      startMinigame('broomsAway');
    } else if (currentScene === 'spring-mud-fling-start') {
      console.log('Starting Mud Fling minigame');
      startMinigame('mudFling');
    } else if (currentScene === 'spring-bloom-view-start') {
      console.log('Starting Bloom With a View minigame');
      startMinigame('bloomWithAView');
    } 
    // Add hooks for potential future summer minigames
    // else if (currentScene === 'summer-music-game') {
    //   console.log('Starting Music Game minigame');
    //   startMinigame('musicGame');
    // }
    
    // Check for season transition scenes
    checkSeasonProgress(currentScene);
    
  }, [gameState.currentScene, startMinigame, checkSeasonProgress]);

  // Render season transition screens when needed
  const renderSeasonTransition = () => {
    if (gameState.currentScene === 'season-transition-spring') {
      console.log('Rendering Spring season transition screen');
      return <SeasonTransition season="spring" nextSceneId="spring-intro" />;
    } else if (gameState.currentScene === 'season-transition-summer') {
      console.log('Rendering Summer season transition screen');
      return <SeasonTransition season="summer" nextSceneId="summer-intro" />;
    } else if (gameState.currentScene === 'season-transition-autumn') {
      console.log('Rendering Autumn season transition screen');
      return <SeasonTransition season="autumn" nextSceneId="autumn-intro" />;
    } else if (gameState.currentScene === 'season-transition-winter') {
      console.log('Rendering Winter season transition screen');
      return <SeasonTransition season="winter" nextSceneId="winter-intro" />;
    }
    return null;
  };

  return renderSeasonTransition();
};

export default GameSceneObserver;
