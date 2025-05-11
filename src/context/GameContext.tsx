
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameState, CharacterId } from '@/types/game';
import initialCharacters from '@/data/characters';
import useGameScenes from '@/hooks/useGameScenes';
import { useGameMinigames, MinigameType } from '@/hooks/useGameMinigames';
import { useGameSeasons } from '@/hooks/useGameSeasons';
import { useEpilogueChecker } from '@/hooks/useEpilogueChecker';
import GameSceneObserver from '@/components/GameSceneObserver';
import { toast } from 'sonner';
import { soundManager } from '@/utils/soundEffects';
import { allScenes } from '../data/scenes';

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
  
  // Handle dialogue click - NEW FUNCTION
  const handleDialogueClick = useCallback(() => {
    try {
      // Get current scene and dialogue
      const currentScene = allScenes[gameState.currentScene];
      
      if (!currentScene) {
        console.error(`Cannot advance dialogue: Scene [${gameState.currentScene}] not found`);
        toast.error('Error loading scene. Try restarting the game.');
        return;
      }
      
      const { dialogue, choices, nextSceneId } = currentScene;
      const nextIndex = gameState.dialogueIndex + 1;
      
      // Play dialogue sound
      try {
        soundManager.playSFX('ui-click');
      } catch (error) {
        console.warn('Could not play sound effect:', error);
      }
      
      // If there's more dialogue, advance to next line
      if (nextIndex < dialogue.length) {
        setGameState(prev => ({
          ...prev,
          dialogueIndex: nextIndex,
          showChoices: false
        }));
        console.log(`Advanced to dialogue index ${nextIndex}`);
      } 
      // If we're at the end of dialogue and have choices, show choices
      else if (choices && choices.length > 0) {
        setGameState(prev => ({
          ...prev,
          showChoices: true
        }));
        console.log('Showing dialogue choices');
      } 
      // If there's a next scene, go to it
      else if (nextSceneId) {
        console.log(`Dialogue complete, transitioning to next scene: ${nextSceneId}`);
        handleSceneTransition(nextSceneId);
      } 
      // No next scene or choices, stay at current state
      else {
        console.warn(`Dialogue complete but no choices or nextSceneId defined for scene [${gameState.currentScene}]`);
      }
    } catch (error) {
      console.error('Error in handleDialogueClick:', error);
      toast.error('An error occurred while progressing dialogue');
    }
  }, [gameState.currentScene, gameState.dialogueIndex]);
  
  // Handle choice selection - NEW FUNCTION
  const handleChoiceClick = useCallback((choiceIndex: number) => {
    try {
      const currentScene = allScenes[gameState.currentScene];
      
      if (!currentScene || !currentScene.choices) {
        console.error(`Cannot select choice: Invalid scene or no choices in scene [${gameState.currentScene}]`);
        toast.error('Error processing choice. Try restarting the game.');
        return;
      }
      
      // Get the selected choice
      const selectedChoice = currentScene.choices[choiceIndex];
      
      if (!selectedChoice) {
        console.error(`Invalid choice index: ${choiceIndex}`);
        return;
      }
      
      // Play choice sound
      try {
        soundManager.playSFX('ui-click');
      } catch (error) {
        console.warn('Could not play sound effect:', error);
      }
      
      console.log(`Selected choice: ${selectedChoice.text}`);
      
      // Apply affection changes if any
      if (selectedChoice.affectionChanges) {
        setGameState(prev => {
          const updatedCharacters = { ...prev.characters };
          
          Object.entries(selectedChoice.affectionChanges || {}).forEach(([charId, change]) => {
            if (updatedCharacters[charId as CharacterId]) {
              const newAffection = updatedCharacters[charId as CharacterId].affection + (change || 0);
              updatedCharacters[charId as CharacterId] = {
                ...updatedCharacters[charId as CharacterId],
                affection: newAffection
              };
              
              console.log(`Changed ${charId}'s affection by ${change}, now ${newAffection}`);
              
              // Show affection change toast
              if (change && change > 0) {
                toast.success(`${updatedCharacters[charId as CharacterId].name} likes that (+${change})`, {
                  style: { borderLeft: `4px solid ${updatedCharacters[charId as CharacterId].color}` }
                });
              } else if (change && change < 0) {
                toast.error(`${updatedCharacters[charId as CharacterId].name} doesn't like that (${change})`, {
                  style: { borderLeft: `4px solid ${updatedCharacters[charId as CharacterId].color}` }
                });
              }
            }
          });
          
          return {
            ...prev,
            characters: updatedCharacters,
            showChoices: false
          };
        });
      } else {
        // Just hide choices if no affection changes
        setGameState(prev => ({
          ...prev,
          showChoices: false
        }));
      }
      
      // Transition to next scene if specified
      if (selectedChoice.nextSceneId) {
        handleSceneTransition(selectedChoice.nextSceneId);
      }
    } catch (error) {
      console.error('Error in handleChoiceClick:', error);
      toast.error('An error occurred while processing your choice');
    }
  }, [gameState.currentScene]);
  
  // Replay the current scene - NEW FUNCTION
  const replayCurrentScene = useCallback(() => {
    try {
      setGameState(prev => ({
        ...prev,
        dialogueIndex: 0,
        showChoices: false
      }));
      console.log(`Replaying scene [${gameState.currentScene}] from beginning`);
    } catch (error) {
      console.error('Error replaying scene:', error);
    }
  }, [gameState.currentScene]);

  // Handle scene transition with better error handling
  const handleSceneTransition = useCallback((nextSceneId: string) => {
    console.log(`Game Context - Transitioning to scene: ${nextSceneId}`);
    
    try {
      // Validate that the scene exists before attempting transition
      if (!allScenes[nextSceneId] && nextSceneId !== 'start' && nextSceneId !== 'about') {
        console.error(`Scene [${nextSceneId}] not found in allScenes`);
        toast.error(`Failed to find scene "${nextSceneId}". Redirecting to a known scene.`);
        
        // Try to handle with a fallback
        if (nextSceneId.includes('intro') || nextSceneId === 'prologue-intro') {
          nextSceneId = 'intro';
        } else {
          nextSceneId = 'start'; // Default fallback
        }
      }
      
      // Ensure we reset dialogue index when transitioning to a new scene
      setGameState(prev => ({
        ...prev,
        dialogueIndex: 0,
        showChoices: false,
        sceneHistory: [...prev.sceneHistory, prev.currentScene]
      }));
      
      // Default case
      transitionToScene(nextSceneId);
    } catch (error) {
      console.error('Error during scene transition:', error);
      toast.error('Failed to transition to next scene. Returning to start.');
      
      // Fallback to main menu if serious error
      transitionToScene('start');
    }
  }, [transitionToScene]);
  
  // Handle new game with improved error handling
  const handleNewGame = useCallback(() => {
    console.log('Starting new game');
    try {
      // Reset the game state completely
      setGameState({...initialGameState});
      
      // Force transition to intro scene
      handleSceneTransition('intro');
      
      toast.success('New game started!');
    } catch (error) {
      console.error('Failed to start new game:', error);
      toast.error('Failed to start new game. Please try again.');
    }
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

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
