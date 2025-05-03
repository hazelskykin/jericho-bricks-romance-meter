import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';

export function useRouteCompletion(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  // Handle character route completion
  const completeCharacterRoute = useCallback((characterId: CharacterId) => {
    if (characterId === 'maven') return;
    
    setGameState(prev => ({
      ...prev,
      completedRoutes: {
        ...prev.completedRoutes,
        [characterId]: true
      }
    }));
    
    // Show notification about completing the route
    showRelationshipMilestone({
      characterId,
      milestoneText: "You've completed this character's story!",
      level: "Happy Ending"
    });
    
    // Check if all routes are completed to unlock Versa route
    const updatedCompletedRoutes = {
      ...gameState.completedRoutes,
      [characterId]: true
    };
    
    const allRoutesCompleted = Object.entries(updatedCompletedRoutes)
      .filter(([key]) => key !== 'maven')
      .every(([, completed]) => completed);
    
    if (allRoutesCompleted) {
      // Unlock Versa route
      setGameState(prev => ({
        ...prev,
        versaRouteUnlocked: true
      }));
      
      // Show notification about unlocking Versa route
      showRelationshipMilestone({
        characterId: 'maven',
        milestoneText: "You've unlocked the Versa route!",
        level: "All Routes Complete"
      });
    }
    
    // Return to main menu
    setTimeout(() => {
      handleSceneTransition('start');
    }, 3000);
  }, [gameState.completedRoutes, handleSceneTransition, setGameState]);

  // Complete the Versa route and game
  const completeVersaRoute = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      hasCompletedGame: true
    }));
    
    // Show notification about completing the game
    showRelationshipMilestone({
      characterId: 'maven',
      milestoneText: "You've completed the game and unlocked your potential as Versa.",
      level: "Game Complete"
    });
    
    // Return to main menu
    setTimeout(() => {
      handleSceneTransition('start');
    }, 3000);
  }, [handleSceneTransition, setGameState]);

  // Handle game reset (new game or try again)
  const handleGameReset = useCallback((type: 'new' | 'incomplete') => {
    // Keep completed routes and Versa unlock status, but reset current game state
    setGameState(prev => ({
      ...prev,
      currentScene: 'intro',
      dialogueIndex: 0,
      characters: { ...prev.characters },
      sceneHistory: ['start'],
      showChoices: false,
      currentSeason: 'prologue',
      viableRoutes: ['xavier', 'navarre', 'etta', 'senara'],
      currentLoveInterest: undefined
    }));
    
    if (type === 'incomplete') {
      // Show "try again" message
      showRelationshipMilestone({
        characterId: 'maven',
        milestoneText: "Try again. Your potential has not reached its limits. Become the Versa.",
        level: "Try Again"
      });
    }
  }, [setGameState]);

  return {
    completeCharacterRoute,
    completeVersaRoute,
    handleGameReset
  };
}
