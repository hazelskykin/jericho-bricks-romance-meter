
import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';
import { useRouteCompletion } from './useRouteCompletion';

// Constants
const HAPPY_ENDING_THRESHOLD = 8;

export function useVersaEpilogueHandlers(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  const { completeCharacterRoute, handleGameReset } = useRouteCompletion(
    gameState, setGameState, handleSceneTransition
  );

  // Versa Epilogue transition (post-game)
  const handleVersaEpilogueTransition = useCallback(() => {
    // Logic for starting versa-epilogue based on completion of all routes
    if (gameState.currentLoveInterest) {
      const finalAffection = gameState.characters[gameState.currentLoveInterest].affection;
      
      // Determine if versa ending or if still locked due to incompletion of other routes
      if (finalAffection >= HAPPY_ENDING_THRESHOLD) {
        // All routes completed, then update to mark game completion to unlock versa content
        completeCharacterRoute(gameState.currentLoveInterest);
        console.log('After achieving mastery of each role, you are now a true Versa.');
      } else {
        // keep playing ending
        console.log('Your role mastery is not yet complete. Keep playing.');
      }
    }
  }, [gameState.characters, gameState.currentLoveInterest, completeCharacterRoute, handleGameReset]);

  return {
    handleVersaEpilogueTransition
  };
}
