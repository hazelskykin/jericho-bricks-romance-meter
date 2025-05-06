
import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showAffectionChange } from '@/components/AffectionChangeToast';

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

export function useGameCharacters(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  // Update a character's affection
  const updateCharacterAffection = useCallback((characterId: CharacterId, changeAmount: number) => {
    if (!gameState.characters[characterId]) return;
    
    const currentAffection = gameState.characters[characterId].affection;
    const newAffection = currentAffection + changeAmount;
    
    const previousLevel = getAffectionLevel(currentAffection);
    const newLevel = getAffectionLevel(newAffection);
    
    setGameState(prev => {
      const updatedCharacters = { ...prev.characters };
      updatedCharacters[characterId] = {
        ...updatedCharacters[characterId],
        affection: newAffection
      };
      
      return {
        ...prev,
        characters: updatedCharacters
      };
    });
    
    // Only show notification if level changed (handled inside the function)
    showAffectionChange({
      characterId,
      changeAmount,
      previousLevel,
      newLevel
    });
  }, [gameState.characters]);

  return {
    updateCharacterAffection
  };
}
