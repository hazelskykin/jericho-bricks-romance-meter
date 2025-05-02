
import { useState, useCallback } from 'react';
import { GameState, Scene, DialogueChoice } from '@/types/game';
import scenes from '@/data/scenes';
import { showAffectionChange } from '@/components/AffectionChangeToast';

export function useGameScenes(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  const currentScene: Scene | undefined = scenes[gameState.currentScene];
  const currentLine = currentScene?.dialogue[gameState.dialogueIndex];
  
  // Handle dialogue advancement
  const handleContinue = useCallback(() => {
    if (!currentScene) return;
    
    if (gameState.dialogueIndex < currentScene.dialogue.length - 1) {
      // More dialogue in this scene
      setGameState(prev => ({
        ...prev,
        dialogueIndex: prev.dialogueIndex + 1
      }));
    } else {
      // End of dialogue for this scene
      if (currentScene.choices) {
        // Show choices
        setGameState(prev => ({ ...prev, showChoices: true }));
      } else if (currentScene.nextSceneId) {
        // Move to next scene
        handleSceneTransition(currentScene.nextSceneId);
      }
    }
  }, [currentScene, gameState.dialogueIndex]);

  // Handle scene transitions
  const handleSceneTransition = useCallback((nextSceneId: string) => {
    setGameState(prev => ({
      ...prev,
      currentScene: nextSceneId,
      dialogueIndex: 0,
      showChoices: false,
      sceneHistory: [...prev.sceneHistory, prev.currentScene]
    }));
  }, []);

  // Handle choice selection
  const handleChoiceSelected = useCallback((choice: DialogueChoice) => {
    // Apply affection changes
    if (choice.affectionChanges) {
      const updatedCharacters = { ...gameState.characters };
      
      Object.entries(choice.affectionChanges).forEach(([charId, change]) => {
        if (updatedCharacters[charId]) {
          updatedCharacters[charId] = {
            ...updatedCharacters[charId],
            affection: updatedCharacters[charId].affection + change
          };

          // Show toast for significant affection changes
          if (Math.abs(change) >= 1) {
            showAffectionChange({
              characterId: charId as any,
              changeAmount: change
            });
          }
        }
      });
      
      setGameState(prev => ({
        ...prev,
        characters: updatedCharacters
      }));
    }

    // Move to next scene
    if (choice.nextSceneId) {
      handleSceneTransition(choice.nextSceneId);
    }
  }, [gameState.characters, handleSceneTransition]);

  return {
    currentScene,
    currentLine,
    handleContinue,
    handleChoiceSelected,
    handleSceneTransition
  };
}
