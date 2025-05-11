
import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';
import { toast } from 'sonner';

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
      
      console.log(`Autumn transition - selected love interest: ${charId} with affection: ${topCharacter[1].affection}`);
      
      setGameState(prev => ({
        ...prev,
        currentLoveInterest: charId as CharacterId,
        currentSeason: 'autumn'
      }));
      
      // Show notification about focusing on one relationship
      toast.success(`${topCharacter[1].name} has become your primary love interest for the autumn season!`);
      
      showRelationshipMilestone({
        characterId: charId as CharacterId,
        milestoneText: "Your relationship has deepened. A more intimate bond may be possible.",
        level: "Autumn Romance"
      });

      console.log('Transitioning to Autumn season with love interest:', charId);
    } else {
      console.warn('No top character found for Autumn transition');
      
      // Fallback to continue the game without a love interest
      setGameState(prev => ({
        ...prev,
        currentSeason: 'autumn'
      }));
      
      toast.info("No clear romantic connection has formed. Continuing to autumn without a primary love interest.");
    }
  }, [gameState.characters, gameState.viableRoutes, setGameState]);

  return {
    handleAutumnTransition
  };
}
