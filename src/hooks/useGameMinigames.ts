
import { useState, useCallback, useEffect } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showAffectionChange } from '@/components/AffectionChangeToast';
import { soundManager } from '@/utils/soundEffects';
import { toast } from '@/components/ui/use-toast';

// Add minigame types including autumn and winter minigames
export type MinigameType = 
  // Spring minigames
  'broomsAway' | 'mudFling' | 'bloomWithAView' | 
  // Summer minigames
  'serenade' | 'spokenWord' | 'whatsOnTap' |
  // Autumn minigames
  'tourGuide' | 'crafter' | 'memoriesDate' |
  // Winter minigames
  'charityAuction' | 'galaDance' | 'lookingSigns';

export function useGameMinigames(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  // Minigame state
  const [activeMinigame, setActiveMinigame] = useState<MinigameType | null>(null);
  const [returnSceneAfterMinigame, setReturnSceneAfterMinigame] = useState<string>('');
  const [pendingMinigame, setPendingMinigame] = useState<MinigameType | null>(null);
  
  // Debug log current state whenever minigame state changes
  useEffect(() => {
    console.log(`Minigame state updated - activeMinigame: ${activeMinigame}, returnScene: ${returnSceneAfterMinigame}`);
  }, [activeMinigame, returnSceneAfterMinigame, pendingMinigame]);
  
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
    console.log(`useGameMinigames: Starting minigame: ${minigameType} from scene: ${gameState.currentScene}`);
    
    // Show a toast notification when starting a minigame
    toast({
      title: "Loading Minigame",
      description: `Preparing ${minigameType} minigame...`,
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
    
    // Set active minigame 
    console.log(`Setting active minigame to: ${minigameType}`);
    setActiveMinigame(minigameType);
    
    // Additional debug toast to track flow
    setTimeout(() => {
      console.log(`Minigame should now be active: ${minigameType}`);
      if (!activeMinigame) {
        console.warn("Minigame state not updated as expected");
      }
    }, 700);
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
          affectionChanges = { navarre: 0.5, etta: 0.5, senara: 0.5 };
          break;
        
        // Summer minigames  
        case 'serenade':
          // The specific character boost would be determined by song choice within the game
          affectionChanges = { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 };
          break;
        case 'spokenWord':
          // The specific character boost would be determined by poem theme within the game
          affectionChanges = { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 };
          break;
        case 'whatsOnTap':
          // Social activity boosts Navarre affection most, with smaller boosts to others
          affectionChanges = { navarre: 1, xavier: 0.5, etta: 0.5, senara: 0.5 };
          break;
          
        // Autumn minigames
        case 'tourGuide':
          // Organization skills impress Etta and Senara
          affectionChanges = { etta: 1, senara: 0.5, xavier: 0.5 };
          break;
        case 'crafter':
          // Creative activity appeals to all characters
          affectionChanges = { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 };
          break;
        case 'memoriesDate':
          // Major boost to the current love interest
          if (gameState.currentLoveInterest) {
            affectionChanges[gameState.currentLoveInterest] = 2;
          }
          break;
          
        // Winter minigames
        case 'charityAuction':
          // Strategic thinking impresses all characters
          affectionChanges = { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 };
          break;
        case 'galaDance':
          // Major boost to the current love interest
          if (gameState.currentLoveInterest) {
            affectionChanges[gameState.currentLoveInterest] = 1.5;
          }
          break;
        case 'lookingSigns':
          // Personal connection boosts love interest affection
          if (gameState.currentLoveInterest) {
            affectionChanges[gameState.currentLoveInterest] = 1;
          }
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
    } else if (activeMinigame === 'lookingSigns') {
      // Special case: failing the Looking for Signs minigame has a significant negative effect
      const currentLoveInterest = gameState.currentLoveInterest;
      if (currentLoveInterest) {
        const updatedCharacters = { ...gameState.characters };
        updatedCharacters[currentLoveInterest] = {
          ...updatedCharacters[currentLoveInterest],
          affection: Math.max(0, updatedCharacters[currentLoveInterest].affection - 2)
        };
        
        setGameState(prev => ({
          ...prev,
          characters: updatedCharacters
        }));
        
        // Show negative affection change toast
        showAffectionChange({
          characterId: currentLoveInterest,
          changeAmount: -2
        });
      }
    }
    
    // Determine which scene to go to after completing the minigame
    let nextSceneId = '';
    
    // For each minigame, set the proper next scene ID
    // Spring minigames
    if (activeMinigame === 'broomsAway') {
      nextSceneId = 'spring-brooms-away-complete';
    } else if (activeMinigame === 'mudFling') {
      nextSceneId = 'spring-mud-fling-complete';
    } else if (activeMinigame === 'bloomWithAView') {
      nextSceneId = 'spring-bloom-view-complete';
    } 
    // Summer minigames
    else if (activeMinigame === 'serenade') {
      nextSceneId = 'summer-serenade-complete';
    } else if (activeMinigame === 'spokenWord') {
      nextSceneId = 'summer-spoken-word-complete';
    } else if (activeMinigame === 'whatsOnTap') {
      nextSceneId = 'summer-whats-on-tap-complete';
    }
    // Autumn minigames
    else if (activeMinigame === 'tourGuide') {
      nextSceneId = 'autumn-tour-guide-complete';
    } else if (activeMinigame === 'crafter') {
      nextSceneId = 'autumn-crafter-complete';
    } else if (activeMinigame === 'memoriesDate') {
      nextSceneId = 'autumn-memories-date-complete';
    }
    // Winter minigames
    else if (activeMinigame === 'charityAuction') {
      nextSceneId = 'winter-charity-auction-complete';
    } else if (activeMinigame === 'galaDance') {
      nextSceneId = 'winter-gala-dance-complete';
    } else if (activeMinigame === 'lookingSigns') {
      nextSceneId = 'winter-looking-signs-complete';
    }
    
    console.log(`Transitioning to next scene after minigame: ${nextSceneId || "using fallback"}`);
    
    // Show a toast notification when completing a minigame
    toast({
      title: success ? "Minigame Completed" : "Minigame Ended",
      description: success ? "Great job!" : "Better luck next time!",
      duration: 3000,
    });
    
    // Store values for later use (after state reset)
    const completedMinigame = activeMinigame;
    const savedReturnScene = returnSceneAfterMinigame;
    
    // Clear states immediately to prevent re-renders with stale data
    setActiveMinigame(null);
    setReturnSceneAfterMinigame('');
    
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
          
          // Try to determine season from current minigame to select appropriate fallback
          if (completedMinigame?.includes('spring')) {
            handleSceneTransition('spring-festival-midway');
          } else if (completedMinigame?.includes('summer')) {
            handleSceneTransition('summer-festival-midway');
          } else if (completedMinigame?.includes('autumn')) {
            handleSceneTransition('autumn-festival-midway');
          } else if (completedMinigame?.includes('winter')) {
            handleSceneTransition('winter-festival-midway');
          } else {
            // Last resort fallback
            handleSceneTransition('spring-festival-activities');
          }
        }
      } catch (error) {
        console.error("Error during scene transition after minigame:", error);
        // Emergency fallback
        handleSceneTransition('start');
      }
      
      // Check for pending minigame after a further delay
      setTimeout(() => {
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
      }, 300);
    }, 500);
    
  }, [activeMinigame, gameState.characters, gameState.currentLoveInterest, returnSceneAfterMinigame, handleSceneTransition, pendingMinigame, startMinigame]);
  
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
        try {
          handleSceneTransition(savedReturnScene);
        } catch (error) {
          console.error("Error returning from minigame:", error);
          // Emergency fallback
          handleSceneTransition('start');
        }
      }, 300);
    } else {
      console.error('No return scene available after minigame exit');
      // Try to determine the current season to find an appropriate scene
      const currentSeason = gameState.currentSeason;
      setTimeout(() => {
        if (currentSeason === 'spring') {
          handleSceneTransition('spring-festival-activities');
        } else if (currentSeason === 'summer') {
          handleSceneTransition('summer-festival-activities');
        } else if (currentSeason === 'autumn') {
          handleSceneTransition('autumn-festival-activities');
        } else if (currentSeason === 'winter') {
          handleSceneTransition('winter-festival-activities');
        } else {
          handleSceneTransition('start');
        }
      }, 300);
    }
  }, [returnSceneAfterMinigame, handleSceneTransition, gameState.currentSeason]);

  return {
    activeMinigame,
    startMinigame,
    completeMinigame,
    exitMinigame
  };
}
