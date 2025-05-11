
import { useCallback } from 'react';
import { GameState } from '@/types/game';
import { allScenes } from '@/data/scenes';
import { toast } from 'sonner';

/**
 * Custom hook for scene transition functionality
 */
export const useSceneTransitions = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  transitionToScene: (sceneId: string) => void
) => {
  // Handle scene transition with error handling
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
  }, [transitionToScene, setGameState]);
  
  // Handle new game with improved error handling
  const handleNewGame = useCallback(() => {
    console.log('Starting new game');
    
    try {
      // Reset the game state completely to initial state
      setGameState(prev => ({
        ...prev,
        currentScene: 'start',
        dialogueIndex: 0,
        sceneHistory: [],
        showChoices: false,
        hasCompletedGame: false,
        completedRoutes: {
          xavier: false,
          navarre: false,
          etta: false,
          senara: false,
        },
        currentSeason: 'prologue',
        viableRoutes: ['xavier', 'navarre', 'etta', 'senara'],
        currentLoveInterest: undefined,
        versaRouteUnlocked: false,
        sceneStateBackup: null
      }));
      
      // Force transition to intro scene
      handleSceneTransition('intro');
      
      toast.success('New game started!');
    } catch (error) {
      console.error('Failed to start new game:', error);
      toast.error('Failed to start new game. Please try again.');
    }
  }, [handleSceneTransition, setGameState]);
  
  // Handle about screen
  const handleAbout = useCallback(() => {
    console.log('Showing about screen');
    handleSceneTransition('about');
  }, [handleSceneTransition]);

  return {
    handleSceneTransition,
    handleNewGame,
    handleAbout
  };
};
