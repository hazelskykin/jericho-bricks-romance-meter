import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';

// Affection threshold to achieve a "Happy Ending"
const HAPPY_ENDING_THRESHOLD = 8;

export function useGameSeasons(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  // Handle season transitions
  const handleSeasonTransition = useCallback((newSeason: GameState['currentSeason']) => {
    // Update the current season
    setGameState(prev => ({
      ...prev,
      currentSeason: newSeason
    }));

    // Handle specific season transition logic
    switch (newSeason) {
      case 'spring':
        // Logic for starting spring season
        break;
        
      case 'summer':
        // At the end of spring, identify the two characters with lowest affection
        const affectionRanking = Object.entries(gameState.characters)
          .filter(([charId]) => charId !== 'maven')
          .sort(([, charA], [, charB]) => charB.affection - charA.affection);
        
        // Keep only the top two characters as viable routes
        const viableCharacters = affectionRanking
          .slice(0, 2)
          .map(([charId]) => charId as CharacterId);
        
        setGameState(prev => ({
          ...prev,
          viableRoutes: viableCharacters
        }));
        
        // Show notification about narrowing down options
        showRelationshipMilestone({
          characterId: 'maven',
          milestoneText: "You've narrowed down your potential connections.",
          level: "Spring Complete"
        });
        break;
        
      case 'autumn':
        // At the end of summer, identify the character with highest affection
        const topCharacter = Object.entries(gameState.characters)
          .filter(([charId]) => charId !== 'maven' && gameState.viableRoutes.includes(charId as CharacterId))
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
            milestoneText: "Your relationship with this character deepens.",
            level: "Romance Route"
          });
        }
        break;
        
      case 'winter':
        // Logic for starting winter season
        break;
        
      case 'epilogue':
        // Logic for starting epilogue based on final affection score
        if (gameState.currentLoveInterest) {
          const finalAffection = gameState.characters[gameState.currentLoveInterest].affection;
          
          // Determine if happy ending or try again ending
          if (finalAffection >= HAPPY_ENDING_THRESHOLD) {
            // Happy ending achieved, mark character route as completed
            completeCharacterRoute(gameState.currentLoveInterest);
          } else {
            // Try again ending
            handleGameReset('incomplete');
          }
        }
        break;
    }
  }, [gameState.characters, gameState.viableRoutes, gameState.currentLoveInterest]);

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
    
    const allRoutesCompleted = Object.values(updatedCompletedRoutes).every(completed => completed);
    
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
  }, [gameState.completedRoutes, handleSceneTransition]);

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
  }, [handleSceneTransition]);

  // Handle game reset (new game or try again)
  const handleGameReset = useCallback((type: 'new' | 'incomplete') => {
    // Keep completed routes and Versa unlock status, but reset current game state
    setGameState(prev => ({
      ...prev,
      currentScene: 'intro',
      dialogueIndex: 0,
      characters: JSON.parse(JSON.stringify(gameState.characters)), // Reset characters
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
  }, [gameState.characters]);

  return {
    handleSeasonTransition,
    completeCharacterRoute,
    completeVersaRoute,
    handleGameReset
  };
}
