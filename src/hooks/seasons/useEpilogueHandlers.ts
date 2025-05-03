
import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';
import { useRouteCompletion } from './useRouteCompletion';

// Constants
const HAPPY_ENDING_THRESHOLD = 8;

export function useEpilogueHandlers(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  const { completeCharacterRoute, handleGameReset } = useRouteCompletion(
    gameState, setGameState, handleSceneTransition
  );

  // Epilogue transition (end of the game)
  const handleEpilogueTransition = useCallback(() => {
    // Logic for starting epilogue based on final affection score
    if (gameState.currentLoveInterest) {
      const finalAffection = gameState.characters[gameState.currentLoveInterest].affection;
      
      // Determine if happy ending or try again ending
      if (finalAffection >= HAPPY_ENDING_THRESHOLD) {
        // Happy ending achieved, mark character route as completed
        completeCharacterRoute(gameState.currentLoveInterest);
        console.log('Happy ending achieved with', gameState.currentLoveInterest);
      } else {
        // Try again ending
        handleGameReset('incomplete');
        console.log('Affection too low for happy ending');
      }
    }
  }, [gameState.characters, gameState.currentLoveInterest, completeCharacterRoute, handleGameReset]);

  return {
    handleEpilogueTransition
  };
}
