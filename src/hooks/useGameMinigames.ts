
import { useCallback, useState } from 'react';
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
  
  const { activeMinigame, returnSceneAfterMinigame } = minigameState;
  
  // Start a minigame
  const startMinigame = useCallback(
    (minigameType: MinigameType) => {
      console.log(`Starting minigame: ${minigameType}`);
      const nextSceneAfterMinigame = getNextSceneAfterMinigame(minigameType);
      
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
      // Only proceed if there's an active minigame
      if (!activeMinigame || !returnSceneAfterMinigame) {
        console.warn('No active minigame to complete');
        return;
      }
      
      console.log(`Completing minigame: ${activeMinigame} with success: ${success}, score: ${score}`);
      
      // Show toast based on result
      if (success) {
        toast.success('Minigame completed successfully!');
      } else {
        toast.error('Minigame not completed successfully.');
      }
      
      // Add a safety delay to prevent multiple completions
      console.log(`Transitioning to next scene: ${returnSceneAfterMinigame}`);

      // Important: Clear the active minigame BEFORE transitioning scenes
      // This prevents multiple completions or auto-restarts
      setMinigameState({
        activeMinigame: null,
        returnSceneAfterMinigame: '',
        pendingMinigame: null,
      });
      
      // Add a slight delay before transitioning to prevent multiple transitions
      setTimeout(() => {
        // Navigate to the appropriate scene based on completion state
        transitionToScene(returnSceneAfterMinigame);
      }, 500);
    },
    [activeMinigame, returnSceneAfterMinigame, transitionToScene]
  );

  // Exit minigame without completion
  const exitMinigame = useCallback(() => {
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
    
    // Reset minigame state
    setMinigameState({
      activeMinigame: null,
      returnSceneAfterMinigame: '',
      pendingMinigame: null,
    });
    
    // Return to the festival activities screen instead of progressing the story
    const festivalActivitiesScene = getFestivalActivitiesScene();
    console.log(`Returning to festival activities: ${festivalActivitiesScene}`);
    
    // Add a slight delay before transitioning to avoid state conflicts
    setTimeout(() => {
      transitionToScene(festivalActivitiesScene);
    }, 300);
  }, [gameState.currentSeason, transitionToScene]);

  return {
    activeMinigame,
    startMinigame,
    completeMinigame,
    exitMinigame,
  };
}
