
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameState, CharacterId } from '@/types/game';
import initialCharacters from '@/data/characters';
import useGameScenes from '@/hooks/useGameScenes';
import { useGameMinigames, MinigameType } from '@/hooks/useGameMinigames';
import { useGameSeasons } from '@/hooks/useGameSeasons';
import { useEpilogueChecker } from '@/hooks/useEpilogueChecker';
import GameSceneObserver from '@/components/GameSceneObserver';

// Initial game state
const initialGameState: GameState = {
  currentScene: 'start',
  dialogueIndex: 0,
  characters: initialCharacters,
  sceneHistory: [],
  showChoices: false,
  hasCompletedGame: false,
  
  // Track completed character routes
  completedRoutes: {
    xavier: false,
    navarre: false,
    etta: false,
    senara: false,
  },
  
  // Track current season
  currentSeason: 'prologue',
  
  // Track which characters are still viable love interests
  viableRoutes: ['xavier', 'navarre', 'etta', 'senara'],
  
  // Track current love interest (if selected)
  currentLoveInterest: undefined,
  
  // Track whether the Versa route is unlocked
  versaRouteUnlocked: false,
  
  // Scene state backup
  sceneStateBackup: null,
};

// Create the context
const GameContext = createContext<any>(null);

// Provider component that wraps app
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Game state
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  
  // Initialize game scenes hook
  const { currentSceneId, transitionToScene } = useGameScenes({ 
    initialScene: initialGameState.currentScene 
  });
  
  // Update game state when current scene changes
  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      currentScene: currentSceneId,
    }));
  }, [currentSceneId]);
  
  // Initialize game minigames hook
  const { 
    activeMinigame, 
    startMinigame, 
    completeMinigame, 
    exitMinigame 
  } = useGameMinigames(gameState, setGameState, transitionToScene);
  
  // Initialize game seasons hook
  const { 
    handleSeasonTransition,
    completeCharacterRoute,
    completeVersaRoute,
    handleGameReset,
    checkSeasonProgress
  } = useGameSeasons(gameState, setGameState, transitionToScene);
  
  // Initialize epilogue checker
  const { routeToEpilogue } = useEpilogueChecker(gameState, setGameState);
  
  // Handle scene transition
  const handleSceneTransition = useCallback((nextSceneId: string) => {
    console.log(`Game Context - Transitioning to scene: ${nextSceneId}`);
    
    // Special case handling for character selection screens
    if (nextSceneId === 'spring-selection' || nextSceneId === 'spring-character-selection') {
      console.log('Redirecting to spring character selection');
      transitionToScene('spring-character-selection');
      return;
    }
    
    if (nextSceneId === 'summer-selection' || nextSceneId === 'summer-character-selection') {
      console.log('Redirecting to summer character selection');
      transitionToScene('summer-character-selection');
      return;
    }
    
    // Special handling for autumn and winter character scenes with love interest
    if ((nextSceneId === 'autumn-character-path' || nextSceneId.includes('autumn-character')) && gameState.currentLoveInterest) {
      const characterScene = `autumn-character-${gameState.currentLoveInterest}`;
      console.log(`Redirecting to autumn character scene with love interest: ${characterScene}`);
      transitionToScene(characterScene);
      return;
    }
    
    if ((nextSceneId === 'winter-planning-character' || nextSceneId.includes('winter-character')) && gameState.currentLoveInterest) {
      const characterScene = `winter-planning-${gameState.currentLoveInterest}`;
      console.log(`Redirecting to winter character scene with love interest: ${characterScene}`);
      transitionToScene(characterScene);
      return;
    }
    
    // Default case
    transitionToScene(nextSceneId);
  }, [transitionToScene, gameState.currentLoveInterest]);
  
  // Handle new game
  const handleNewGame = useCallback(() => {
    console.log('Starting new game');
    setGameState({...initialGameState});
    handleSceneTransition('prologue-intro');
  }, [handleSceneTransition]);
  
  // Handle about screen
  const handleAbout = useCallback(() => {
    console.log('Showing about screen');
    handleSceneTransition('about');
  }, [handleSceneTransition]);

  // Create value object for provider
  const value = {
    gameState,
    setGameState,
    handleSceneTransition,
    handleNewGame,
    handleAbout,
    handleSeasonTransition,
    completeCharacterRoute,
    completeVersaRoute,
    handleGameReset,
    checkSeasonProgress,
    activeMinigame,
    startMinigame,
    completeMinigame,
    exitMinigame,
    routeToEpilogue
  };

  return (
    <GameContext.Provider value={value}>
      {children}
      <GameSceneObserver />
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
