import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { soundManager } from '@/utils/soundEffects';

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

// Helper to determine affection level based on value
const getAffectionLevel = (value: number): string => {
  if (value <= -15) return 'Hostile';
  if (value <= -5) return 'Cold';
  if (value <= 5) return 'Neutral';
  if (value <= 15) return 'Friendly';
  if (value <= 25) return 'Close';
  if (value <= 35) return 'Very Close';
  return 'Intimate';
};

export function useGameMinigames(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  // Minigame state
  const [activeMinigame, setActiveMinigame] = useState<MinigameType | null>(null);
  const [returnSceneAfterMinigame, setReturnSceneAfterMinigame] = useState<string>('');
  const [pendingMinigame, setPendingMinigame] = useState<MinigameType | null>(null);
  
  // Use refs to track state updates for debugging
  const activeMinigameRef = useRef<MinigameType | null>(null);
  const isProcessingRef = useRef<boolean>(false);
  
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
        setActiveMinigame(pendingMinigame);
        setPendingMinigame(null);
        
        // Reset processing flag after a delay to allow state to update
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 100);
      }, 100);
    }
  }, [pendingMinigame, activeMinigame]);
  
  // Minigame functions
  const startMinigame = useCallback((minigameType: MinigameType) => {
    console.log(`useGameMinigames: Starting minigame: ${minigameType} from scene: ${gameState.currentScene}`);
    
    // Store current scene for returning after minigame
    const currentReturnScene = gameState.currentScene;
    console.log(`Setting return scene to: ${currentReturnScene}`);
    setReturnSceneAfterMinigame(currentReturnScene);
    
    // Check if we already have an active minigame
    if (activeMinigameRef.current || isProcessingRef.current) {
      console.log(`Already have active minigame: ${activeMinigameRef.current}, queueing new request for: ${minigameType}`);
      setPendingMinigame(minigameType);
      return;
    }
    
    // Set processing flag
    isProcessingRef.current = true;
    
    // Set active minigame 
    console.log(`Setting active minigame to: ${minigameType}`);
    setActiveMinigame(minigameType);
    
    // Additional debug log to track flow
    setTimeout(() => {
      console.log(`Minigame should now be active: ${minigameType}, actual state: ${activeMinigameRef.current}`);
      
      // Check if the state was actually updated
      if (activeMinigameRef.current !== minigameType) {
        console.warn("Minigame state not updated as expected - forcing update");
        // Force update as a fallback
        setActiveMinigame(minigameType);
      }
      
      // Reset processing flag
      isProcessingRef.current = false;
    }, 300);
  }, [gameState.currentScene]);
  
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
      
      // Apply affection changes if any
      if (Object.keys(affectionChanges).length > 0) {
        // Create a safe copy of characters
        const updatedCharacters = JSON.parse(JSON.stringify(gameState.characters));
        
        // Apply each change safely
        Object.entries(affectionChanges).forEach(([charId, change]) => {
          const characterId = charId as CharacterId;
          if (updatedCharacters[characterId]) {
            const currentAffection = updatedCharacters[characterId].affection || 0;
            updatedCharacters[characterId].affection = currentAffection + change;
          }
        });
        
        // Update game state with new character affection values
        setGameState(prev => ({
          ...prev,
          characters: updatedCharacters
        }));
      }
    } else if (activeMinigame === 'lookingSigns') {
      // Special case: failing the Looking for Signs minigame has a significant negative effect
      const currentLoveInterest = gameState.currentLoveInterest;
      if (currentLoveInterest) {
        const currentAffection = gameState.characters[currentLoveInterest].affection;
        const newAffection = Math.max(0, currentAffection - 2);
        
        const updatedCharacters = { ...gameState.characters };
        updatedCharacters[currentLoveInterest] = {
          ...updatedCharacters[currentLoveInterest],
          affection: newAffection
        };
        
        setGameState(prev => ({
          ...prev,
          characters: updatedCharacters
        }));
        
        // Toast notifications have been removed
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
    
    // Store values for later use (after state reset)
    const completedMinigame = activeMinigame;
    const savedReturnScene = returnSceneAfterMinigame;
    
    // Set processing flag
    isProcessingRef.current = true;
    
    // Clear states immediately to prevent re-renders with stale data
    setActiveMinigame(null);
    activeMinigameRef.current = null;
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
          
          // Use a default fallback based on the minigame type
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
          setPendingMinigame(null);
          
          // Start the next minigame after a delay
          setTimeout(() => {
            startMinigame(nextMinigame);
          }, 500);
        }
      }, 300);
    }, 500);
    
  }, [activeMinigame, gameState.characters, returnSceneAfterMinigame, handleSceneTransition, pendingMinigame, startMinigame]);
  
  const exitMinigame = useCallback(() => {
    console.log(`Exiting minigame, returning to: ${returnSceneAfterMinigame}`);
    
    // Clear minigame state
    const savedReturnScene = returnSceneAfterMinigame;
    
    // Set processing flag
    isProcessingRef.current = true;
    
    // Clear states
    setActiveMinigame(null);
    activeMinigameRef.current = null;
    setReturnSceneAfterMinigame('');
    
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
        const currentSeason = gameState.currentSeason;
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
