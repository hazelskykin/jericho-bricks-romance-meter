
import { useState, useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showAffectionChange } from '@/components/AffectionChangeToast';
import { soundManager } from '@/utils/soundEffects';

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
  
  // Minigame functions
  const startMinigame = useCallback((minigameType: MinigameType) => {
    console.log(`Starting minigame: ${minigameType}`);
    setActiveMinigame(minigameType);
    setReturnSceneAfterMinigame(gameState.currentScene);
  }, [gameState.currentScene]);
  
  const completeMinigame = useCallback((success: boolean) => {
    console.log(`Completing minigame: ${activeMinigame}, success: ${success}`);
    // Apply affection bonuses based on minigame success
    if (success) {
      // Play win sound (already played in the respective games)
      
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
    } else {
      // Play lose sound (already played in the respective games)
    }
    
    // Determine which scene to go to after completing the minigame
    let nextSceneId = returnSceneAfterMinigame;
    
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
    
    // Return to the appropriate scene
    handleSceneTransition(nextSceneId);
    
    // Clear minigame state
    setActiveMinigame(null);
    setReturnSceneAfterMinigame('');
  }, [activeMinigame, gameState.characters, returnSceneAfterMinigame, handleSceneTransition]);
  
  const exitMinigame = useCallback(() => {
    console.log(`Exiting minigame, returning to: ${returnSceneAfterMinigame}`);
    // Return to the previous scene
    if (returnSceneAfterMinigame) {
      handleSceneTransition(returnSceneAfterMinigame);
    }
    
    // Clear minigame state
    setActiveMinigame(null);
    setReturnSceneAfterMinigame('');
  }, [returnSceneAfterMinigame, handleSceneTransition]);

  return {
    activeMinigame,
    startMinigame,
    completeMinigame,
    exitMinigame
  };
}
