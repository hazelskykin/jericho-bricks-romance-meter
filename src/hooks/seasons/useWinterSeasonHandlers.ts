
import { useCallback, useRef, useEffect } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';

export function useWinterSeasonHandlers(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  // Store the previous affection values when entering winter
  const previousAffectionRef = useRef<Record<CharacterId, number>>({} as Record<CharacterId, number>);
  
  // Effect to store affection values when a love interest is selected at the end of summer
  useEffect(() => {
    if (gameState.currentSeason === 'summer' && gameState.currentLoveInterest) {
      // Store the affection value from when the character was selected as love interest in summer
      const characterId = gameState.currentLoveInterest;
      previousAffectionRef.current[characterId] = gameState.characters[characterId].affection;
      console.log(`Storing summer affection for ${characterId}: ${previousAffectionRef.current[characterId]}`);
    }
  }, [gameState.currentSeason, gameState.currentLoveInterest, gameState.characters]);
  
  // Winter season transition
  const handleWinterTransition = useCallback(() => {
    // Log the transition
    console.log('Transitioning to Winter season');
    
    // Check if we have a current love interest
    if (gameState.currentLoveInterest) {
      const characterId = gameState.currentLoveInterest;
      const currentAffection = gameState.characters[characterId].affection;
      const summerAffection = previousAffectionRef.current[characterId];
      
      console.log(`Winter check for ${characterId}: Current: ${currentAffection}, Summer: ${summerAffection}`);
      
      // If we have a recorded summer affection, compare with current
      if (summerAffection !== undefined && currentAffection > summerAffection) {
        // Relationship has deepened during winter
        showRelationshipMilestone({
          characterId,
          milestoneText: "Your relationship continues to deepen.",
          level: "Winter Romance"
        });
        
        console.log(`Winter progression: ${characterId} affection increased from ${summerAffection} to ${currentAffection}`);
      }
    }
  }, [gameState.currentLoveInterest, gameState.characters]);

  return {
    handleWinterTransition
  };
}
