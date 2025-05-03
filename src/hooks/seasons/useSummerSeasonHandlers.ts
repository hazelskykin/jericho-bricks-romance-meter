import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';

// Constants
const VIABLE_ROUTE_COUNT = 2;

export function useSummerSeasonHandlers(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  // Summer season transition
  const handleSummerTransition = useCallback(() => {
    // At the end of spring, identify the characters with highest affection
    const affectionRanking = Object.entries(gameState.characters)
      .filter(([charId]) => charId !== 'maven')
      .sort(([, charA], [, charB]) => charB.affection - charA.affection);
    
    // Keep only the top characters as viable routes
    const viableCharacters = affectionRanking
      .slice(0, VIABLE_ROUTE_COUNT)
      .map(([charId]) => charId as CharacterId);
    
    setGameState(prev => ({
      ...prev,
      viableRoutes: viableCharacters
    }));
    
    // Show notification about narrowing down options
    showRelationshipMilestone({
      characterId: 'maven',
      milestoneText: "You've grown closer to a couple team members. Maybe something special might yet develop with one of them.",
      level: "Summer Sizzle"
    });

    console.log('Transitioning to Summer season', viableCharacters);
  }, [gameState.characters, setGameState]);

  return {
    handleSummerTransition
  };
}
