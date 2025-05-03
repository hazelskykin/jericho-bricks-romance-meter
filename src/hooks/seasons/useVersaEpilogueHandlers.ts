
import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';
import { useRouteCompletion } from './useRouteCompletion';

export function useVersaEpilogueHandlers(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  const { completeCharacterRoute, completeVersaRoute, handleGameReset } = useRouteCompletion(
    gameState, setGameState, handleSceneTransition
  );

  // Check if all character routes have been completed
  const areAllRoutesCompleted = useCallback(() => {
    return Object.entries(gameState.completedRoutes)
      .every(([_, completed]) => completed === true);
  }, [gameState.completedRoutes]);

  // Versa Epilogue transition (post-game)
  const handleVersaEpilogueTransition = useCallback(() => {
    // Check if all character routes have been completed
    if (areAllRoutesCompleted()) {
      // If all routes are completed, unlock the Versa epilogue
      if (!gameState.versaRouteUnlocked) {
        setGameState(prev => ({
          ...prev,
          versaRouteUnlocked: true
        }));

        // Show milestone notification for unlocking the Versa route
        showRelationshipMilestone({
          characterId: 'maven',
          milestoneText: "With all paths explored, you've unlocked your true potential as Versa.",
          level: "Versa Awakening"
        });
      }

      // Direct to the versa epilogue starting scene
      handleSceneTransition('versa-epilogue-intro');
      console.log('Beginning the Versa Epilogue - all character routes completed!');
    } else {
      // Not all routes have been completed yet
      console.log('Cannot access Versa Epilogue - not all character routes are completed yet.');
      
      // Return to main menu with a hint about unlocking the versa route
      showRelationshipMilestone({
        characterId: 'maven',
        milestoneText: "To unlock your full potential as Versa, master all roles.",
        level: "Locked Content"
      });
      
      setTimeout(() => {
        handleSceneTransition('start');
      }, 3000);
    }
  }, [gameState.versaRouteUnlocked, gameState.completedRoutes, areAllRoutesCompleted, handleSceneTransition, setGameState]);

  return {
    handleVersaEpilogueTransition,
    areAllRoutesCompleted
  };
}
