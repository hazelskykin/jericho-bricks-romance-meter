
import { useCallback } from 'react';

export function useSeasonProgress(handleSeasonTransition: (newSeason: string) => void) {
  // Create a function to check season progress for the GameSceneObserver
  const checkSeasonProgress = useCallback((sceneId: string) => {
    // Check for specific scene transitions that should trigger season changes
    if (sceneId === 'spring-transition') {
      handleSeasonTransition('summer');
    } else if (sceneId === 'summer-transition') {
      handleSeasonTransition('autumn');
    } else if (sceneId === 'autumn-transition') {
      handleSeasonTransition('winter');
    } else if (sceneId === 'winter-transition') {
      handleSeasonTransition('epilogue');
    }
  }, [handleSeasonTransition]);

  return {
    checkSeasonProgress
  };
}
