
import { useCallback } from 'react';

export function useSeasonProgress(handleSeasonTransition: (newSeason: string) => void) {
  // Create a function to check season progress for the GameSceneObserver
  const checkSeasonProgress = useCallback((sceneId: string) => {
    console.log(`Checking season progress for scene [${sceneId}]`);
    
    // Check for specific scene transitions that should trigger season changes
    if (sceneId === 'spring-transition') {
      console.log('Explicit spring transition detected');
      handleSeasonTransition('spring');
    } else if (sceneId === 'summer-transition') {
      console.log('Explicit summer transition detected');
      handleSeasonTransition('summer');
    } else if (sceneId === 'autumn-transition') {
      console.log('Explicit autumn transition detected');
      handleSeasonTransition('autumn');
    } else if (sceneId === 'winter-transition') {
      console.log('Explicit winter transition detected');
      handleSeasonTransition('winter');
    } else if (sceneId === 'winter-ending') {
      console.log('Winter ending detected, transitioning to epilogue');
      handleSeasonTransition('epilogue');
    }
    
    // Handle season transition scenes
    if (sceneId === 'season-transition-spring') {
      console.log('Season transition scene detected: spring');
      handleSeasonTransition('spring');
    } else if (sceneId === 'season-transition-summer') {
      console.log('Season transition scene detected: summer');
      handleSeasonTransition('summer');
    } else if (sceneId === 'season-transition-autumn') {
      console.log('Season transition scene detected: autumn');
      handleSeasonTransition('autumn');
    } else if (sceneId === 'season-transition-winter') {
      console.log('Season transition scene detected: winter');
      handleSeasonTransition('winter');
    }
    
    // New check for conclusion transitions
    if (sceneId === 'summer-conclusion-debrief' && !window.preventSeasonCheck) {
      console.log('Summer conclusion scene detected, ensuring correct transition');
      // Set a flag to prevent multiple transitions
      window.preventSeasonCheck = true;
      // Clear the flag after a short delay
      setTimeout(() => { window.preventSeasonCheck = false; }, 2000);
    }
  }, [handleSeasonTransition]);

  return {
    checkSeasonProgress
  };
}
