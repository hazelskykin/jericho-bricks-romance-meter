
import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';

export function useAutumnSeasonHandlers(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  // Autumn season transition
  const handleAutumnTransition = useCallback(() => {
    // At the end of summer, identify the character with highest affection
    const topCharacter = Object.entries(gameState.characters)
      .filter(([charId]) => 
        charId !== 'maven' && 
        gameState.viableRoutes.includes(charId as CharacterId)
      )
      .sort(([, charA], [, charB]) => charB.affection - charA.affection)[0];
    
    if (topCharacter) {
      const [charId] = topCharacter;
      
      setGameState(prev => ({
        ...prev,
        currentLoveInterest: charId as CharacterId
      }));
      
      // Show notification about focusing on one relationship
      showRelationshipMilestone({
        characterId: charId as CharacterId,
        milestoneText: "Your relationship has deepened. A more intimate bond may be possible.",
        level: "Autumn Romance"
      });

      console.log('Transitioning to Autumn season', charId);
    }
  }, [gameState.characters, gameState.viableRoutes, setGameState]);

  return {
    handleAutumnTransition
  };
}
