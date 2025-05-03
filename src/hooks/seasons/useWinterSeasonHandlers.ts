import { useCallback, useRef } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';

export function useWinterSeasonHandlers(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  // Store the previous affection values when entering winter
  const previousAffectionRef = useRef<number | null>(null);
  
  // Winter season transition
  const handleWinterTransition = useCallback(() => {
    // Log the transition
    console.log('Transitioning to Winter season');
    
    // Check if we have a current love interest
    if (gameState.currentLoveInterest) {
      const characterId = gameState.currentLoveInterest;
      const currentAffection = gameState.characters[characterId].affection;
      
      // Store current affection at winter start if not already set
      if (previousAffectionRef.current === null) {
        previousAffectionRef.current = currentAffection;
        console.log(`Winter start: ${characterId} affection is ${currentAffection}`);
      } 
      // Otherwise compare with previous affection to check for increase
      else if (currentAffection > previousAffectionRef.current) {
        // Relationship has deepened during winter
        showRelationshipMilestone({
          characterId,
          milestoneText: "Your relationship continues to deepen.",
          level: "Winter Romance"
        });
        
        console.log(`Winter progression: ${characterId} affection increased from ${previousAffectionRef.current} to ${currentAffection}`);
        
        // Update the reference for future checks
        previousAffectionRef.current = currentAffection;
      }
    }
  }, [gameState.currentLoveInterest, gameState.characters]);

  return {
    handleWinterTransition
  };
}
