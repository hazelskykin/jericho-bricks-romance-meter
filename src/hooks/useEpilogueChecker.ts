import { useCallback } from 'react';
import { GameState } from '@/types/game';
import { toast } from '@/components/ui/use-toast';

export function useEpilogueChecker(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  // Check if the happy ending epilogue should be shown
  const checkForHappyEnding = useCallback(() => {
    if (!gameState.currentLoveInterest) return false;
    
    const character = gameState.characters[gameState.currentLoveInterest];
    
    // If affection is high enough (10+), show happy ending
    if (character.affection >= 10) {
      return true;
    }
    
    return false;
  }, [gameState.currentLoveInterest, gameState.characters]);
  
  // Check if all character routes have been completed
  const checkAllRoutesCompleted = useCallback(() => {
    const { completedRoutes } = gameState;
    
    if (
      completedRoutes.xavier &&
      completedRoutes.navarre &&
      completedRoutes.etta &&
      completedRoutes.senara
    ) {
      // All routes complete, enable Versa epilogue
      if (!gameState.versaRouteUnlocked) {
        setGameState(prev => ({
          ...prev,
          versaRouteUnlocked: true
        }));
        
        toast({
          title: "New Ending Unlocked",
          description: "You've completed all character routes! The Versa epilogue is now available.",
          duration: 5000,
        });
      }
      
      return true;
    }
    
    return false;
  }, [gameState.completedRoutes, gameState.versaRouteUnlocked, setGameState]);
  
  // Route to appropriate epilogue
  const routeToEpilogue = useCallback((sceneId: string) => {
    // If current love interest exists and affection is high enough, go to happy ending
    if (checkForHappyEnding()) {
      return 'happy-ending-intro';
    }
    
    // If all routes completed, enable Versa epilogue
    checkAllRoutesCompleted();
    
    // Otherwise go to normal epilogue or game over
    return 'game-complete';
  }, [checkForHappyEnding, checkAllRoutesCompleted]);

  return {
    checkForHappyEnding,
    checkAllRoutesCompleted,
    routeToEpilogue
  };
}
