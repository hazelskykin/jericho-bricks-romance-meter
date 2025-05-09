import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState } from '@/types/game';
import { MinigameType, MinigameState } from '@/types/minigames';
import { 
  getAffectionChangesForMinigame, 
  handleLoveInterestAffectionChange,
  applyAffectionChanges
} from '@/utils/affectionUtils';
import {
  getNextSceneAfterMinigame,
  getFallbackSceneForMinigame,
  getFallbackSceneForSeason
} from '@/utils/minigameUtils';

export function useGameMinigames(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  // Minigame state
  const [minigameState, setMinigameState] = useState<MinigameState>({
    activeMinigame: null,
    returnSceneAfterMinigame: '',
    pendingMinigame: null
  });
  
  // Use refs to track state updates for debugging
  const activeMinigameRef = useRef<MinigameType | null>(null);
  const isProcessingRef = useRef<boolean>(false);
  
  // Destructure minigameState for convenience
  const { activeMinigame, returnSceneAfterMinigame, pendingMinigame } = minigameState;
  
  // Keep the ref in sync with the state
  useEffect(() => {
    activeMinigameRef.current = activeMinigame;
  }, [activeMinigame]);
  
  // Debug log current state whenever minigame state changes
  useEffect(() => {
    console.log(`Minigame state updated - activeMinigame: ${activeMinigame}, returnScene: ${returnSceneAfterMinigame}`);
  }, [activeMinigame, returnSceneAfterMinigame, pendingMinigame]);
  
  // Effect to handle pending minigame requests
  useEffect(() => {
    if (pendingMinigame && !activeMinigame && !isProcessingRef.current) {
      console.log(`Processing pending minigame request: ${pendingMinigame}`);
      isProcessingRef.current = true;
      
      // Use setTimeout to ensure React has finished processing previous state updates
      setTimeout(() => {
        setMinigameState(prev => ({
          ...prev,
          activeMinigame: pendingMinigame,
          pendingMinigame: null
        }));
        
        // Reset processing flag after a delay to allow state to update
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 100);
      }, 100);
    }
  }, [pendingMinigame, activeMinigame]);
  
  // Start a minigame
  const startMinigame = useCallback((minigameType: MinigameType) => {
    console.log(`useGameMinigames: Starting minigame: ${minigameType} from scene: ${gameState.currentScene}`);
    
    // Store current scene for returning after minigame
    const currentReturnScene = gameState.currentScene;
    console.log(`Setting return scene to: ${currentReturnScene}`);
    
    // Check if we already have an active minigame
    if (activeMinigameRef.current || isProcessingRef.current) {
      console.log(`Already have active minigame: ${activeMinigameRef.current}, queueing new request for: ${minigameType}`);
      setMinigameState(prev => ({
        ...prev,
        pendingMinigame: minigameType
      }));
      return;
    }
    
    // Set processing flag
    isProcessingRef.current = true;
    
    // Update minigame state
    setMinigameState({
      activeMinigame: minigameType,
      returnSceneAfterMinigame: currentReturnScene,
      pendingMinigame: null
    });
    
    // Additional debug log to track flow
    setTimeout(() => {
      console.log(`Minigame should now be active: ${minigameType}, actual state: ${activeMinigameRef.current}`);
      
      // Check if the state was actually updated
      if (activeMinigameRef.current !== minigameType) {
        console.warn("Minigame state not updated as expected - forcing update");
        // Force update as a fallback
        setMinigameState(prev => ({
          ...prev,
          activeMinigame: minigameType
        }));
      }
      
      // Reset processing flag
      isProcessingRef.current = false;
    }, 300);
  }, [gameState.currentScene]);
  
  // Complete a minigame
  const completeMinigame = useCallback((success: boolean) => {
    console.log(`Completing minigame: ${activeMinigame}, success: ${success}, return scene: ${returnSceneAfterMinigame}`);
    
    if (!activeMinigame) {
      console.error('Cannot complete minigame: No active minigame');
      return;
    }
    
    // Apply affection changes based on minigame success
    if (success) {
      // Get standard affection changes from the utility
      const affectionChanges = getAffectionChangesForMinigame(activeMinigame);
      
      // Apply standard changes
      applyAffectionChanges(gameState, affectionChanges, setGameState);
      
      // Handle special cases for love interest minigames
      handleLoveInterestAffectionChange(activeMinigame, gameState, true, setGameState);
    } else if (activeMinigame === 'lookingSigns') {
      // Special case: failing the Looking for Signs minigame
      handleLoveInterestAffectionChange(activeMinigame, gameState, false, setGameState);
    }
    
    // Determine which scene to go to after completing the minigame
    const nextSceneId = getNextSceneAfterMinigame(activeMinigame);
    
    console.log(`Transitioning to next scene after minigame: ${nextSceneId || "using fallback"}`);
    
    // Store values for later use (after state reset)
    const completedMinigame = activeMinigame;
    const savedReturnScene = returnSceneAfterMinigame;
    
    // Set processing flag
    isProcessingRef.current = true;
    
    // Clear states immediately to prevent re-renders with stale data
    setMinigameState({
      activeMinigame: null,
      returnSceneAfterMinigame: '',
      pendingMinigame: null
    });
    activeMinigameRef.current = null;
    
    // Navigate to the next scene with a delay to ensure state changes are processed
    setTimeout(() => {
      console.log(`Now navigating to scene: ${nextSceneId || savedReturnScene || "fallback scene"}`);
      try {
        // Return to the appropriate scene
        if (nextSceneId) {
          handleSceneTransition(nextSceneId);
        } else if (savedReturnScene) {
          handleSceneTransition(savedReturnScene);
        } else {
          console.error('No next scene ID or return scene available after minigame completion');
          
          // Use a default fallback based on the minigame type
          const fallbackScene = getFallbackSceneForMinigame(completedMinigame);
          handleSceneTransition(fallbackScene);
        }
        
        // Reset processing flag
        isProcessingRef.current = false;
      } catch (error) {
        console.error("Error during scene transition after minigame:", error);
        // Reset processing flag even on error
        isProcessingRef.current = false;
        // Emergency fallback
        handleSceneTransition('start');
      }
      
      // Check for pending minigame after a further delay
      setTimeout(() => {
        if (pendingMinigame) {
          console.log(`Processing pending minigame after completion: ${pendingMinigame}`);
          // Clear pending state first to avoid infinite loop
          const nextMinigame = pendingMinigame;
          setMinigameState(prev => ({
            ...prev,
            pendingMinigame: null
          }));
          
          // Start the next minigame after a delay
          setTimeout(() => {
            startMinigame(nextMinigame);
          }, 500);
        }
      }, 300);
    }, 500);
    
  }, [activeMinigame, gameState, returnSceneAfterMinigame, handleSceneTransition, pendingMinigame, startMinigame]);
  
  // Exit a minigame without completing it
  const exitMinigame = useCallback(() => {
    console.log(`Exiting minigame, returning to: ${returnSceneAfterMinigame}`);
    
    // Clear minigame state
    const savedReturnScene = returnSceneAfterMinigame;
    
    // Set processing flag
    isProcessingRef.current = true;
    
    // Clear states
    setMinigameState({
      activeMinigame: null,
      returnSceneAfterMinigame: '',
      pendingMinigame: null
    });
    activeMinigameRef.current = null;
    
    // Return to the previous scene if we have one
    setTimeout(() => {
      if (savedReturnScene) {
        console.log(`Now navigating back to scene: ${savedReturnScene}`);
        try {
          handleSceneTransition(savedReturnScene);
        } catch (error) {
          console.error("Error returning from minigame:", error);
          // Emergency fallback
          handleSceneTransition('start');
        }
      } else {
        console.error('No return scene available after minigame exit');
        // Try to determine the current season to find an appropriate scene
        const fallbackScene = getFallbackSceneForSeason(gameState.currentSeason);
        handleSceneTransition(fallbackScene);
      }
      
      // Reset processing flag
      isProcessingRef.current = false;
    }, 300);
  }, [returnSceneAfterMinigame, handleSceneTransition, gameState.currentSeason]);

  return {
    activeMinigame,
    startMinigame,
    completeMinigame,
    exitMinigame
  };
}

export type { MinigameType } from '@/types/minigames';
export { getAffectionLevel } from '@/utils/affectionUtils';
