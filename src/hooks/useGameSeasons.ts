import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';

// Constants for season management
const HAPPY_ENDING_THRESHOLD = 8;
const VIABLE_ROUTE_COUNT = 2;

export function useGameSeasons(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  // Handle transition to a new season
  const handleSeasonTransition = useCallback((newSeason: GameState['currentSeason']) => {
    // Update the current season
    setGameState(prev => ({
      ...prev,
      currentSeason: newSeason
    }));

    // Handle specific season transition logic
    switch (newSeason) {
      case 'spring':
        handleSpringTransition();
        break;
        
      case 'summer':
        handleSummerTransition();
        break;
        
      case 'autumn':
        handleAutumnTransition();
        break;
        
      case 'winter':
        handleWinterTransition();
        break;
        
      case 'epilogue':
        handleEpilogueTransition();
        break;
    }
  }, [gameState.characters, gameState.viableRoutes, gameState.currentLoveInterest]);

  // Spring season transition (beginning of the game)
  const handleSpringTransition = useCallback(() => {
    // Logic for starting spring season - could be expanded later
    console.log('Transitioning to Spring season');
  }, []);

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
      milestoneText: "You've narrowed down your potential connections.",
      level: "Spring Complete"
    });

    console.log('Transitioning to Summer season', viableCharacters);
  }, [gameState.characters]);
  
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

      console.log('Transitioning to Autumn season', charId);
    }
  }, [gameState.characters, gameState.viableRoutes]);
  
  // Winter season transition
  const handleWinterTransition = useCallback(() => {
    // Logic for starting winter season
    console.log('Transitioning to Winter season');
  }, []);
  
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
  }, [gameState.characters, gameState.currentLoveInterest]);

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
  }, []);

  // Create a function to check season progress for the GameSceneObserver
  const checkSeasonProgress = useCallback((sceneId: string) => {
    // Check for specific scene transitions that should trigger season changes
    if (sceneId === 'spring-transition') {
      handleSeasonTransition('summer');
    } else if (sceneId === 'summer-transition') {
      handleSeasonTransition('autumn');
    } else if (sceneId === 'autumn-transition') {
      handleSeasonTransition('winter');
    } else if (sceneId === 'winter-transition') {
      handleSeasonTransition('epilogue');
    }
  }, [handleSeasonTransition]);

  return {
    handleSeasonTransition,
    completeCharacterRoute,
    completeVersaRoute,
    handleGameReset,
    checkSeasonProgress
  };
}
