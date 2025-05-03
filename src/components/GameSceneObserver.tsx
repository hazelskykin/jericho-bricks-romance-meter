
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import SeasonTransition from './SeasonTransition';
import { toast } from "@/components/ui/use-toast";

/**
 * Game scene observer component to handle minigame transitions and season changes
 */
const GameSceneObserver = () => {
  const { gameState, startMinigame, checkSeasonProgress, handleSceneTransition } = useGame();

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
    
    // Handle the prologue to spring transition edge case
    if (currentScene === 'departure-morning') {
      console.log('Detected end of prologue, setting up spring transition');
      // We'll display a toast to indicate the transition is happening
      toast({
        title: "Season Transition",
        description: "Completing prologue and transitioning to Spring season",
      });
    }
    
    // Check for season transition scenes
    checkSeasonProgress(currentScene);
    
  }, [gameState.currentScene, startMinigame, checkSeasonProgress, handleSceneTransition]);

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
