
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import SeasonTransition from './SeasonTransition';
import { toast } from '@/components/ui/use-toast';

/**
 * Game scene observer component to handle minigame transitions and season changes
 */
const GameSceneObserver = () => {
  const { gameState, startMinigame, checkSeasonProgress } = useGame();

  // Monitor scene changes to detect when to trigger minigames or season transitions
  useEffect(() => {
    const currentScene = gameState.currentScene;
    console.log(`GameSceneObserver detected scene change to: [${currentScene}]`);
    
    // Check specific minigame trigger scenes - these MUST match the scene IDs in data files
    const minigameMappings = {
      // Spring minigames
      'brooms-away-start': 'broomsAway',
      'mud-fling-start': 'mudFling',
      'bloom-view-start': 'bloomWithAView',
      
      // Summer minigames
      'serenade-start': 'serenade',
      'spoken-word-start': 'spokenWord', 
      'whats-on-tap-start': 'whatsOnTap',
      
      // Autumn minigames
      'tour-guide-start': 'tourGuide',
      'crafter-start': 'crafter',
      'memories-date-start': 'memoriesDate',
      
      // Winter minigames
      'charity-auction-start': 'charityAuction',
      'gala-dance-start': 'galaDance',
      'looking-signs-start': 'lookingSigns'
    };
    
    // Explicitly check if the current scene is a minigame trigger
    if (currentScene in minigameMappings) {
      const minigameType = minigameMappings[currentScene];
      console.log(`GameSceneObserver: Starting ${minigameType} minigame from scene: ${currentScene}`);
      
      // Notify user that minigame is starting
      toast({
        title: "Starting Minigame",
        description: `Loading ${minigameType} minigame. Please wait...`,
        duration: 3000,
      });
      
      // Add a clearer delay to ensure state updates are processed in the right order
      setTimeout(() => {
        try {
          console.log(`GameSceneObserver: Calling startMinigame(${minigameType})`);
          startMinigame(minigameType);
        } catch (error) {
          console.error("Error starting minigame:", error);
          toast({
            title: "Error Loading Minigame",
            description: "There was a problem starting the game. Please try again.",
            variant: "destructive",
            duration: 5000,
          });
        }
      }, 500); // Increase delay to ensure state is ready
    }
    
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
