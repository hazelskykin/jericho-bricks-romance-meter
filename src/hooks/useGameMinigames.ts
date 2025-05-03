
import { useState, useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showAffectionChange } from '@/components/AffectionChangeToast';
import { soundManager } from '@/utils/soundEffects';

// Add minigame types
export type MinigameType = 'broomsAway' | 'mudFling' | 'bloomWithAView';

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
    setActiveMinigame(minigameType);
    setReturnSceneAfterMinigame(gameState.currentScene);
  }, [gameState.currentScene]);
  
  const completeMinigame = useCallback((success: boolean) => {
    // Apply affection bonuses based on minigame success
    if (success) {
      // Play win sound (already played in the respective games)
      
      // Different affection changes for each minigame
      let affectionChanges: Partial<Record<CharacterId, number>> = {};
      
      switch(activeMinigame) {
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
    
    // Return to the previous scene
    exitMinigame();
  }, [activeMinigame, gameState.characters]);
  
  const exitMinigame = useCallback(() => {
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
