
import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showAffectionChange } from '@/components/AffectionChangeToast';

export function useGameCharacters(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  // Update a character's affection
  const updateCharacterAffection = useCallback((characterId: CharacterId, changeAmount: number) => {
    if (!gameState.characters[characterId]) return;
    
    setGameState(prev => {
      const updatedCharacters = { ...prev.characters };
      updatedCharacters[characterId] = {
        ...updatedCharacters[characterId],
        affection: updatedCharacters[characterId].affection + changeAmount
      };
      
      return {
        ...prev,
        characters: updatedCharacters
      };
    });
    
    // Show toast notification for significant affection changes
    if (Math.abs(changeAmount) >= 1) {
      showAffectionChange({
        characterId,
        changeAmount
      });
    }
  }, [gameState.characters]);

  return {
    updateCharacterAffection
  };
}
