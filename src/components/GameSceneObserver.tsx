
import React, { useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import SeasonTransition from './SeasonTransition';
import { MinigameType } from '@/types/minigames';
import { toast } from 'sonner';
import { Scene } from '@/types/game';
import { allScenes } from '@/data/scenes';

/**
 * Game scene observer component to handle minigame transitions and season changes
 */
const GameSceneObserver = () => {
  const { gameState, startMinigame, checkSeasonProgress, handleSceneTransition } = useGame();
  const lastTriggeredMinigame = useRef<string | null>(null);
  const minigameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSceneId = useRef<string | null>(null);

  // Monitor scene changes to detect when to trigger minigames or season transitions
  useEffect(() => {
    const currentScene = gameState.currentScene;
    console.log(`GameSceneObserver: Current scene is ${currentScene}`);
    
    // Get the current scene data
    const sceneData: Scene | undefined = allScenes[currentScene];
    
    // Special handling for summer conclusion to autumn transition
    if (currentScene === 'summer-conclusion-debrief') {
      const dialogueComplete = gameState.dialogueIndex >= (sceneData?.dialogue?.length || 0) - 1;
      
      if (dialogueComplete && lastSceneId.current === currentScene) {
        console.log('Summer conclusion dialogue complete, forcing transition to autumn');
        // Short delay to ensure state is ready
        const timer = setTimeout(() => {
          handleSceneTransition('season-transition-autumn');
        }, 100);
        return () => clearTimeout(timer);
      }
    }

    // Store current scene for comparison on next render
    lastSceneId.current = currentScene;
    
    // Check if the scene has a minigame property 
    if (sceneData?.minigame) {
      const minigameType = sceneData.minigame;
      console.log(`GameSceneObserver: Detected minigame from scene property: ${minigameType}`);
      
      // Prevent double-triggering of minigames
      if (lastTriggeredMinigame.current === currentScene) {
        console.log(`GameSceneObserver: Skipping duplicate minigame trigger for ${minigameType}`);
        return;
      }
      
      // Update the last triggered minigame reference
      lastTriggeredMinigame.current = currentScene;
      
      // Don't show toast if we're re-triggering the same minigame
      if (gameState.currentScene !== minigameType) {
        toast.info(`Starting minigame: ${minigameType}`);
      }
      
      // Clear any existing timers
      if (minigameTimerRef.current) {
        clearTimeout(minigameTimerRef.current);
      }
      
      // Add a clearer delay to ensure state updates are processed in the right order
      minigameTimerRef.current = setTimeout(() => {
        try {
          console.log(`GameSceneObserver: Starting minigame ${minigameType}`);
          startMinigame(minigameType as MinigameType);
        } catch (error) {
          console.error("Error starting minigame:", error);
          toast.error(`Failed to start minigame: ${error}`);
        }
        // Reset timer reference
        minigameTimerRef.current = null;
      }, 500); // Delay to ensure state is ready
    } else {
      // Keep legacy approach for backward compatibility
      const minigameMappings: Record<string, MinigameType> = {
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
        'winter-looking-signs-start': 'lookingSigns',
        
        // Direct mappings for easier debugging
        'broomsAway': 'broomsAway',
        'mudFling': 'mudFling',
        'bloomWithAView': 'bloomWithAView',
        'serenade': 'serenade',
        'spokenWord': 'spokenWord',
        'whatsOnTap': 'whatsOnTap',
        'tourGuide': 'tourGuide',
        'crafter': 'crafter',
        'memoriesDate': 'memoriesDate',
        'charityAuction': 'charityAuction',
        'galaDance': 'galaDance',
        'lookingSigns': 'lookingSigns'
      };
      
      // Handle minigame trigger scenes
      if (currentScene in minigameMappings) {
        const minigameType = minigameMappings[currentScene];
        console.log(`GameSceneObserver: Detected minigame trigger scene for ${minigameType}`);
        
        // Prevent double-triggering of minigames
        if (lastTriggeredMinigame.current === currentScene) {
          console.log(`GameSceneObserver: Skipping duplicate minigame trigger for ${minigameType}`);
          return;
        }
        
        // Update the last triggered minigame reference
        lastTriggeredMinigame.current = currentScene;
        
        // Don't show toast if we're re-triggering the same minigame
        if (gameState.currentScene !== minigameType) {
          toast.info(`Starting minigame: ${minigameType}`);
        }
        
        // Clear any existing timers
        if (minigameTimerRef.current) {
          clearTimeout(minigameTimerRef.current);
        }
        
        // Add a clearer delay to ensure state updates are processed in the right order
        minigameTimerRef.current = setTimeout(() => {
          try {
            console.log(`GameSceneObserver: Starting minigame ${minigameType}`);
            startMinigame(minigameType);
          } catch (error) {
            console.error("Error starting minigame:", error);
            toast.error(`Failed to start minigame: ${error}`);
          }
          // Reset timer reference
          minigameTimerRef.current = null;
        }, 500); // Delay to ensure state is ready
      } else {
        // Reset the last triggered minigame if we're on a different scene
        lastTriggeredMinigame.current = null;
      }
    }
    
    // Check for season transition scenes
    checkSeasonProgress(currentScene);
    
    // Cleanup function to clear any pending timers
    return () => {
      if (minigameTimerRef.current) {
        clearTimeout(minigameTimerRef.current);
        minigameTimerRef.current = null;
      }
    };
    
  }, [gameState.currentScene, gameState.dialogueIndex, startMinigame, checkSeasonProgress, handleSceneTransition]);

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
