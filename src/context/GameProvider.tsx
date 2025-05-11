
import React, { createContext, useState, useEffect } from 'react';
import initialCharacters from '@/data/characters';
import { GameState } from '@/types/game';
import { GameContextValue } from './types';
import useGameScenes from '@/hooks/useGameScenes';
import { useGameMinigames } from '@/hooks/useGameMinigames';
import { useGameSeasons } from '@/hooks/useGameSeasons';
import { useEpilogueChecker } from '@/hooks/useEpilogueChecker';
import { useSceneTransitions } from './sceneTransitions';
import { useDialogueHandlers } from './dialogueHandlers';
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
export const GameContext = createContext<GameContextValue | null>(null);

// Provider component that wraps app
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Game state
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  
  // Initialize game scenes hook
  const { currentSceneId, transitionToScene, currentScene } = useGameScenes({ 
    initialScene: initialGameState.currentScene 
  });
  
  // Update game state when current scene changes
  useEffect(() => {
    if (currentSceneId !== gameState.currentScene) {
      console.log(`Updating game state currentScene from ${gameState.currentScene} to ${currentSceneId}`);
      setGameState(prev => ({
        ...prev,
        currentScene: currentSceneId,
        dialogueIndex: 0, // Reset dialogue index when changing scenes
        showChoices: false // Hide choices when changing scenes
      }));
    }
  }, [currentSceneId, gameState.currentScene]);
  
  // Initialize scene transitions
  const { 
    handleSceneTransition, 
    handleNewGame, 
    handleAbout 
  } = useSceneTransitions(gameState, setGameState, transitionToScene);
  
  // Initialize dialogue handlers
  const { 
    handleDialogueClick, 
    handleChoiceClick, 
    replayCurrentScene 
  } = useDialogueHandlers(gameState, setGameState, handleSceneTransition);
  
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

  // Create value object for provider
  const value: GameContextValue = {
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
    // Fix: Type error by providing a proper wrapper function that matches expected signature
    completeMinigame: (success: boolean, score?: number) => completeMinigame(success, score),
    exitMinigame,
    routeToEpilogue,
    handleDialogueClick,
    handleChoiceClick,
    replayCurrentScene
  };

  return (
    <GameContext.Provider value={value}>
      {children}
      <GameSceneObserver />
    </GameContext.Provider>
  );
};
