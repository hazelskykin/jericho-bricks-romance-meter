
import { useState, useCallback, useEffect } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showAffectionChange } from '@/components/AffectionChangeToast';
import { soundManager } from '@/utils/soundEffects';
import { toast } from '@/components/ui/use-toast';

// Add minigame types including summer minigames
export type MinigameType = 'broomsAway' | 'mudFling' | 'bloomWithAView' | 'serenade' | 'spokenWord' | 'whatsOnTap';

export function useGameMinigames(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  // Minigame state
  const [activeMinigame, setActiveMinigame] = useState<MinigameType | null>(null);
  const [returnSceneAfterMinigame, setReturnSceneAfterMinigame] = useState<string>('');
  const [pendingMinigame, setPendingMinigame] = useState<MinigameType | null>(null);
  
  // Effect to handle pending minigame requests
  useEffect(() => {
    if (pendingMinigame && !activeMinigame) {
      console.log(`Processing pending minigame request: ${pendingMinigame}`);
      setActiveMinigame(pendingMinigame);
      setPendingMinigame(null);
    }
  }, [pendingMinigame, activeMinigame]);
  
  // Minigame functions
  const startMinigame = useCallback((minigameType: MinigameType) => {
    console.log(`Starting minigame: ${minigameType} from scene: ${gameState.currentScene}`);
    
    // Show a toast notification when starting a minigame
    toast({
      title: "Starting Minigame",
      description: `Loading ${minigameType} minigame...`,
      duration: 3000,
    });
    
    // Store current scene for returning after minigame
    const currentReturnScene = gameState.currentScene;
    console.log(`Setting return scene to: ${currentReturnScene}`);
    setReturnSceneAfterMinigame(currentReturnScene);
    
    // Check if we already have an active minigame
    if (activeMinigame) {
      console.log(`Already have active minigame: ${activeMinigame}, queueing new request for: ${minigameType}`);
      setPendingMinigame(minigameType);
      return;
    }
    
    // Set active minigame with a slight delay to ensure state updates are processed
    setTimeout(() => {
      console.log(`Setting active minigame to: ${minigameType}`);
      setActiveMinigame(minigameType);
    }, 100);
    
  }, [gameState.currentScene, activeMinigame]);
  
  const completeMinigame = useCallback((success: boolean) => {
    console.log(`Completing minigame: ${activeMinigame}, success: ${success}, return scene: ${returnSceneAfterMinigame}`);
    
    if (!activeMinigame) {
      console.error('Cannot complete minigame: No active minigame');
      return;
    }
    
    // Apply affection bonuses based on minigame success
    if (success) {
      // Different affection changes for each minigame
      let affectionChanges: Partial<Record<CharacterId, number>> = {};
      
      switch(activeMinigame) {
        // Spring minigames
        case 'broomsAway':
          affectionChanges = { xavier: 1, senara: 1 };
          break;
        case 'mudFling':
          affectionChanges = { navarre: 1, etta: 1 };
          break;
        case 'bloomWithAView':
          // All characters get a small affection boost
          affectionChanges = { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 };
          break;
        
        // Summer minigames  
        case 'serenade':
          // The specific character boost would be determined by song choice within the game
          // This is handled directly in the minigame component
          affectionChanges = { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 };
          break;
        case 'spokenWord':
          // The specific character boost would be determined by poem theme within the game
          // This is handled directly in the minigame component
          affectionChanges = { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 };
          break;
        case 'whatsOnTap':
          // Social activity boosts Navarre affection most, with smaller boosts to others
          affectionChanges = { navarre: 1, xavier: 0.5, etta: 0.5, senara: 0.5 };
          break;
      }
      
      // Apply affection changes
      const updatedCharacters = { ...gameState.characters };
      
      Object.entries(affectionChanges).forEach(([charId, change]) => {
        if (updatedCharacters[charId]) {
          updatedCharacters[charId] = {
            ...updatedCharacters[charId],
            affection: updatedCharacters[charId].affection + change
          };

          // Show toast for affection changes
          if (change > 0) {
            showAffectionChange({
              characterId: charId as CharacterId,
              changeAmount: change
            });
          }
        }
      });
      
      setGameState(prev => ({
        ...prev,
        characters: updatedCharacters
      }));
    }
    
    // Determine which scene to go to after completing the minigame
    let nextSceneId = '';
    
    // For each minigame, set the proper next scene ID
    if (activeMinigame === 'broomsAway') {
      nextSceneId = 'spring-brooms-away-complete';
    } else if (activeMinigame === 'mudFling') {
      nextSceneId = 'spring-mud-fling-complete';
    } else if (activeMinigame === 'bloomWithAView') {
      nextSceneId = 'spring-bloom-view-complete';
    } else if (activeMinigame === 'serenade') {
      nextSceneId = 'summer-serenade-complete';
    } else if (activeMinigame === 'spokenWord') {
      nextSceneId = 'summer-spoken-word-complete';
    } else if (activeMinigame === 'whatsOnTap') {
      nextSceneId = 'summer-whats-on-tap-complete';
    }
    
    console.log(`Transitioning to next scene after minigame: ${nextSceneId}`);
    
    // Show a toast notification when completing a minigame
    toast({
      title: success ? "Minigame Completed" : "Minigame Ended",
      description: success ? "Great job!" : "Better luck next time!",
      duration: 3000,
    });
    
    // Set minigame as completed with a temporary variable to prevent race conditions
    const completedMinigame = activeMinigame;
    
    // Clear minigame state first before transitioning
    setActiveMinigame(null);
    const savedReturnScene = returnSceneAfterMinigame;
    setReturnSceneAfterMinigame('');
    
    // Use setTimeout to ensure React has time to process the state change
    setTimeout(() => {
      console.log(`Now navigating to scene: ${nextSceneId || savedReturnScene}`);
      // Return to the appropriate scene
      if (nextSceneId) {
        handleSceneTransition(nextSceneId);
      } else if (savedReturnScene) {
        handleSceneTransition(savedReturnScene);
      } else {
        console.error('No next scene ID or return scene available after minigame completion');
        // Default to spring festival midway scene as a fallback
        handleSceneTransition('spring-festival-midway');
      }
      
      // Check if there's a pending minigame to start next
      if (pendingMinigame) {
        console.log(`Processing pending minigame after completion: ${pendingMinigame}`);
        // Clear pending state first to avoid infinite loop
        const nextMinigame = pendingMinigame;
        setPendingMinigame(null);
        
        // Start the next minigame after a delay
        setTimeout(() => {
          startMinigame(nextMinigame);
        }, 500);
      }
    }, 500);
    
  }, [activeMinigame, gameState.characters, returnSceneAfterMinigame, handleSceneTransition, pendingMinigame, startMinigame]);
  
  const exitMinigame = useCallback(() => {
    console.log(`Exiting minigame, returning to: ${returnSceneAfterMinigame}`);
    
    // Show toast for exiting
    toast({
      title: "Exiting Minigame",
      description: "Returning to the festival...",
      duration: 2000,
    });
    
    // Clear minigame state
    const savedReturnScene = returnSceneAfterMinigame;
    setActiveMinigame(null);
    setReturnSceneAfterMinigame('');
    
    // Return to the previous scene if we have one
    if (savedReturnScene) {
      setTimeout(() => {
        console.log(`Now navigating back to scene: ${savedReturnScene}`);
        handleSceneTransition(savedReturnScene);
      }, 300);
    } else {
      console.error('No return scene available after minigame exit');
      // Default to spring festival scene as a fallback
      setTimeout(() => {
        handleSceneTransition('spring-festival-activities');
      }, 300);
    }
  }, [returnSceneAfterMinigame, handleSceneTransition]);

  return {
    activeMinigame,
    startMinigame,
    completeMinigame,
    exitMinigame
  };
}
