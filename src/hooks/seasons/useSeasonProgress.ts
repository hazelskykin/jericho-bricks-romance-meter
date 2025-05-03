
import { useCallback } from 'react';

export function useSeasonProgress(handleSeasonTransition: (newSeason: string) => void) {
  // Create a function to check season progress for the GameSceneObserver
  const checkSeasonProgress = useCallback((sceneId: string) => {
    // Check for specific scene transitions that should trigger season changes
    if (sceneId === 'spring-transition') {
      handleSeasonTransition('spring');
    } else if (sceneId === 'summer-transition') {
      handleSeasonTransition('summer');
    } else if (sceneId === 'autumn-transition') {
      handleSeasonTransition('autumn');
    } else if (sceneId === 'winter-transition') {
      handleSeasonTransition('winter');
    } else if (sceneId === 'winter-ending') {
      handleSeasonTransition('epilogue');
    }
    
    // Check for season transitions
    if (sceneId === 'season-transition-spring') {
      handleSeasonTransition('spring');
    } else if (sceneId === 'season-transition-summer') {
      handleSeasonTransition('summer');
    } else if (sceneId === 'season-transition-autumn') {
      handleSeasonTransition('autumn');
    } else if (sceneId === 'season-transition-winter') {
      handleSeasonTransition('winter');
    }
    
    // Check for prologue to spring transition specifically
    if (sceneId === 'departure-morning') {
      // This can also trigger the transition to spring at the end of the prologue
      handleSeasonTransition('spring');
    }
  }, [handleSeasonTransition]);

  return {
    checkSeasonProgress
  };
}
