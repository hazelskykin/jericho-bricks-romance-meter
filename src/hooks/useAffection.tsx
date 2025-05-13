import { useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { CharacterId } from '@/types/game';
import { toast } from 'sonner';
import { AffectionChangeToast } from '@/components/AffectionChangeToast';

/**
 * Custom hook for managing character affection
 */
export const useAffection = () => {
  const { gameState, setGameState } = useGame();

  /**
   * Modify a character's affection level
   * @param characterId The ID of the character
   * @param amount The amount to change (positive or negative)
   */
  const modifyAffection = useCallback(
    (characterId: CharacterId, amount: number) => {
      if (!characterId || amount === 0) return;

      // Get current character info
      const character = gameState.characters[characterId];
      if (!character) {
        console.error(`Character ${characterId} not found`);
        return;
      }

      console.log(`Modifying ${characterId}'s affection by ${amount}`);

      // Calculate new affection value
      const newAffection = Math.max(0, Math.min(100, character.affection + amount));

      // Update the character's affection
      setGameState((prev) => ({
        ...prev,
        characters: {
          ...prev.characters,
          [characterId]: {
            ...prev.characters[characterId],
            affection: newAffection,
          },
        },
      }));

      // Show toast notification
      const message = amount > 0
        ? `${character.name} liked that!`
        : `${character.name} didn't like that...`;

      toast.custom((t) => (
        <AffectionChangeToast
          character={character}
          amount={amount}
          message={message}
          onDismiss={() => toast.dismiss(t)}
        />
      ));
    },
    [gameState.characters, setGameState]
  );

  return { modifyAffection };
};
