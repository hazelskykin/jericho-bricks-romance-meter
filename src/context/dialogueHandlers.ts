
import { useState, useCallback } from 'react';
import { GameState } from '@/types/game';
import { allScenes } from '@/data/scenes';
import { toast } from 'sonner';
import { soundManager } from '@/utils/soundEffects';

/**
 * Custom hook for dialogue-related functionality
 */
export const useDialogueHandlers = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) => {
  // Handle dialogue click
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
  }, [gameState.currentScene, gameState.dialogueIndex, setGameState, handleSceneTransition]);
  
  // Handle choice selection
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
  }, [gameState.currentScene, setGameState, handleSceneTransition]);
  
  // Replay the current scene
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
  }, [gameState.currentScene, setGameState]);

  return {
    handleDialogueClick,
    handleChoiceClick,
    replayCurrentScene
  };
};
