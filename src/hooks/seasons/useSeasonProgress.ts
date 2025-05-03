
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
    
    // Check for season transitions
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
    
    // Remove the inappropriate toast here - we'll let the SeasonTransition component
    // handle the visual feedback for season changes
  }, [handleSeasonTransition]);

  return {
    checkSeasonProgress
  };
}
