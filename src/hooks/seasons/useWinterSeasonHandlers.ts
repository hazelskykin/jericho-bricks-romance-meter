
import { useCallback, useRef, useEffect } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';
import { toast } from '@/components/ui/use-toast';

export function useWinterSeasonHandlers(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  // Store the previous affection values when entering winter
  const previousAffectionRef = useRef<Record<CharacterId, number>>({} as Record<CharacterId, number>);
  
  // Effect to store affection values when a love interest is selected at the end of summer
  useEffect(() => {
    if (gameState.currentSeason === 'autumn' && gameState.currentLoveInterest) {
      // Store the affection value from when the character was selected as love interest in autumn
      const characterId = gameState.currentLoveInterest;
      previousAffectionRef.current[characterId] = gameState.characters[characterId].affection;
      console.log(`Storing autumn affection for ${characterId}: ${previousAffectionRef.current[characterId]}`);
    }
  }, [gameState.currentSeason, gameState.currentLoveInterest, gameState.characters]);
  
  // Winter season transition
  const handleWinterTransition = useCallback(() => {
    // Log the transition
    console.log('Transitioning to Winter season');
    
    // Update the season state
    setGameState(prev => ({
      ...prev,
      currentSeason: 'winter'
    }));
    
    // Show toast notification
    toast({
      title: "Winter Begins",
      description: "The final season of your year in Stonewich has arrived.",
      duration: 5000,
    });
    
    // Check if we have a current love interest
    if (gameState.currentLoveInterest) {
      const characterId = gameState.currentLoveInterest;
      const currentAffection = gameState.characters[characterId].affection;
      const autumnAffection = previousAffectionRef.current[characterId];
      
      console.log(`Winter check for ${characterId}: Current: ${currentAffection}, Autumn: ${autumnAffection}`);
      
      // If we have a recorded autumn affection, compare with current
      if (autumnAffection !== undefined && currentAffection > autumnAffection) {
        // Relationship has deepened during autumn
        showRelationshipMilestone({
          characterId,
          milestoneText: "Your relationship continues to deepen.",
          level: "Winter Love"
        });
        
        console.log(`Winter progression: ${characterId} affection increased from ${autumnAffection} to ${currentAffection}`);
      }
    }
  }, [gameState.currentLoveInterest, gameState.characters, setGameState]);

  return {
    handleWinterTransition
  };
}
