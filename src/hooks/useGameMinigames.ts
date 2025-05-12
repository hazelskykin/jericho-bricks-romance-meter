
import { useCallback, useState, useRef } from 'react';
import { GameState } from '@/types/game';
import { MinigameState, MinigameType } from '@/types/minigames';
import { getNextSceneAfterMinigame } from '@/utils/minigameUtils';
import { toast } from 'sonner';

export function useGameMinigames(
  gameState: GameState, 
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  transitionToScene: (sceneId: string) => void
) {
  // Local state for active minigame
  const [minigameState, setMinigameState] = useState<MinigameState>({
    activeMinigame: null,
    returnSceneAfterMinigame: '',
    pendingMinigame: null,
  });
  
  // Add a completion flag to prevent multiple completion calls
  const completionInProgress = useRef(false);
  
  // Track whether we've already handled a specific return scene
  const handledReturnScenes = useRef<Set<string>>(new Set());
  
  const { activeMinigame, returnSceneAfterMinigame } = minigameState;
  
  // Start a minigame
  const startMinigame = useCallback(
    (minigameType: MinigameType) => {
      console.log(`Starting minigame: ${minigameType}`);
      const nextSceneAfterMinigame = getNextSceneAfterMinigame(minigameType);
      
      // Reset the completion flag when starting a new minigame
      completionInProgress.current = false;
      
      // Set the active minigame
      setMinigameState({
        activeMinigame: minigameType,
        returnSceneAfterMinigame: nextSceneAfterMinigame,
        pendingMinigame: null,
      });
      
      // Log the state update
      console.log(`Minigame state updated - activeMinigame: ${minigameType}, returnScene: ${nextSceneAfterMinigame}`);
    },
    []
  );

  // Complete a minigame with success/failure and optional score
  const completeMinigame = useCallback(
    (success: boolean, score?: number) => {
      // Only proceed if there's an active minigame and not already completing
      if (!activeMinigame || !returnSceneAfterMinigame || completionInProgress.current) {
        console.warn('No active minigame to complete or completion already in progress');
        return;
      }
      
      // Check if we've already handled this return scene
      if (handledReturnScenes.current.has(returnSceneAfterMinigame)) {
        console.warn(`Already handled return scene: ${returnSceneAfterMinigame}, skipping duplicate completion`);
        
        // Clear the active minigame state but don't trigger another navigation
        setMinigameState({
          activeMinigame: null,
          returnSceneAfterMinigame: '',
          pendingMinigame: null,
        });
        
        return;
      }
      
      // Set the completion flag to prevent multiple calls
      completionInProgress.current = true;
      
      // Add this return scene to the handled set
      handledReturnScenes.current.add(returnSceneAfterMinigame);
      
      console.log(`Completing minigame: ${activeMinigame} with success: ${success}, score: ${score}`);
      
      // Show toast based on result
      if (success) {
        toast.success('Minigame completed successfully!');
      } else {
        toast.error('Minigame not completed successfully.');
      }
      
      // Store the return scene before clearing state
      const returnScene = returnSceneAfterMinigame;
      
      // Important: Clear the active minigame BEFORE transitioning scenes
      setMinigameState({
        activeMinigame: null,
        returnSceneAfterMinigame: '',
        pendingMinigame: null,
      });
      
      // Add a slight delay before transitioning to prevent multiple transitions
      setTimeout(() => {
        console.log(`Transitioning to next scene: ${returnScene}`);
        // Navigate to the appropriate scene based on completion state
        transitionToScene(returnScene);
        
        // Reset the completion flag after successful transition
        setTimeout(() => {
          completionInProgress.current = false;
          
          // Clear handled scenes after a reasonable period to allow for future replays
          setTimeout(() => {
            handledReturnScenes.current.clear();
          }, 5000);
        }, 1000);
      }, 500);
    },
    [activeMinigame, returnSceneAfterMinigame, transitionToScene]
  );

  // Exit minigame without completion
  const exitMinigame = useCallback(() => {
    // Prevent exit if completion is already in progress
    if (completionInProgress.current) {
      console.warn('Cannot exit: completion already in progress');
      return;
    }
    
    console.log('Exiting minigame without completion');
    
    // Get the festival activities scene based on current season
    const getFestivalActivitiesScene = () => {
      switch (gameState.currentSeason) {
        case 'spring': return 'spring-festival-activities';
        case 'summer': return 'summer-festival-activities';
        case 'autumn': return 'autumn-festival-activities';
        case 'winter': return 'winter-festival-activities';
        default: return 'spring-festival-activities';
      }
    };
    
    // Mark completion as in progress to prevent any further state changes
    completionInProgress.current = true;
    
    // Store the scene to transition to before clearing state
    const festivalActivitiesScene = getFestivalActivitiesScene();
    
    // Reset minigame state
    setMinigameState({
      activeMinigame: null,
      returnSceneAfterMinigame: '',
      pendingMinigame: null,
    });
    
    // Return to the festival activities screen instead of progressing the story
    console.log(`Returning to festival activities: ${festivalActivitiesScene}`);
    
    // Add a slight delay before transitioning to avoid state conflicts
    setTimeout(() => {
      transitionToScene(festivalActivitiesScene);
      // Reset the completion flag after transition
      setTimeout(() => {
        completionInProgress.current = false;
        
        // Clear handled scenes after a reasonable period to allow for future replays
        setTimeout(() => {
          handledReturnScenes.current.clear();
        }, 5000);
      }, 1000);
    }, 300);
  }, [gameState.currentSeason, transitionToScene]);

  return {
    activeMinigame,
    startMinigame,
    completeMinigame,
    exitMinigame,
  };
}
