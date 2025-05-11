
import { useCallback } from 'react';
import { GameState } from '@/types/game';
import { allScenes } from '@/data/scenes';
import { toast } from 'sonner';
import { mapSceneId } from '@/utils/sceneRouting';

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
      // Special handling for numbered character selection scenes
      if (/^spring-character-selection-\d+$/.test(nextSceneId) || 
          /^summer-character-selection-\d+$/.test(nextSceneId)) {
        console.log(`Detected numbered character selection scene: ${nextSceneId}`);
        
        // Extract the base scene ID (without the number)
        const baseSceneId = nextSceneId.replace(/-\d+$/, '');
        console.log(`Using base scene: ${baseSceneId} for numbered scene ${nextSceneId}`);
        
        // Ensure we reset dialogue index when transitioning to a new scene
        setGameState(prev => ({
          ...prev,
          dialogueIndex: 0,
          showChoices: false,
          sceneHistory: [...prev.sceneHistory, prev.currentScene],
          currentScene: baseSceneId // Use the base scene ID in state
        }));
        
        // Use the mapped base scene ID for the actual transition
        const mappedSceneId = mapSceneId(baseSceneId);
        transitionToScene(mappedSceneId);
        return;
      }
      
      // Check if scene exists explicitly before attempting transition
      if (nextSceneId === 'summer-visit-character') {
        console.log('Detected summer-visit-character, redirecting to summer-character-selection');
        nextSceneId = 'summer-character-selection';
      }
      
      // Validate that the scene exists before attempting transition
      if (!allScenes[nextSceneId] && nextSceneId !== 'start' && nextSceneId !== 'about') {
        console.error(`Scene [${nextSceneId}] not found in allScenes`);
        
        // Try to handle with a fallback
        if (nextSceneId.includes('intro') || nextSceneId === 'prologue-intro') {
          nextSceneId = 'intro';
        } else if (nextSceneId === 'summer-visit-character') {
          nextSceneId = 'summer-character-selection';
          toast.info('Transitioning to summer character selection');
        } else {
          toast.error(`Failed to find scene "${nextSceneId}". Redirecting to a known scene.`);
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
