
import { useState, useCallback } from 'react';
import { GameState, Scene, DialogueChoice } from '@/types/game';
import scenes from '@/data/scenes';
import { showAffectionChange } from '@/components/AffectionChangeToast';
import { toast } from "@/components/ui/use-toast";

export function useGameScenes(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  const currentScene: Scene | undefined = scenes[gameState.currentScene];
  const currentLine = currentScene?.dialogue[gameState.dialogueIndex];
  
  // Handle dialogue advancement
  const handleContinue = useCallback(() => {
    if (!currentScene) {
      console.error(`Cannot continue: Current scene ${gameState.currentScene} not found`);
      toast({
        title: "Navigation Error",
        description: `Scene ${gameState.currentScene} not found`,
        variant: "destructive"
      });
      return;
    }
    
    console.log(`Continue pressed in scene [${gameState.currentScene}], dialogue index: ${gameState.dialogueIndex}, total dialogue: ${currentScene.dialogue.length}`);
    
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
        console.log(`Showing choices for scene [${gameState.currentScene}]`);
        setGameState(prev => ({ ...prev, showChoices: true }));
      } else if (currentScene.nextSceneId) {
        // Move to next scene
        console.log(`End of dialogue reached, moving to next scene: ${currentScene.nextSceneId}`);
        handleSceneTransition(currentScene.nextSceneId);
      } else {
        console.warn(`Scene [${gameState.currentScene}] has no choices or nextSceneId, cannot progress`);
        toast({
          title: "Navigation Warning",
          description: "Cannot progress - scene has no next step defined",
          variant: "default"
        });
      }
    }
  }, [currentScene, gameState.dialogueIndex, gameState.currentScene]);

  // Enhanced scene transition with logging and error handling
  const handleSceneTransition = useCallback((nextSceneId: string) => {
    console.log(`Attempting to transition from scene [${gameState.currentScene}] to [${nextSceneId}]`);
    
    // Check if the target scene exists
    if (!scenes[nextSceneId]) {
      console.error(`Scene transition failed: Target scene [${nextSceneId}] not found!`);
      toast({
        title: "Navigation Error",
        description: `Cannot navigate to scene "${nextSceneId}" - not found`,
        variant: "destructive"
      });
      return;
    }
    
    // Special handling for season transitions
    if (nextSceneId === 'season-transition-spring' || 
        nextSceneId === 'spring-intro' ||
        nextSceneId === 'departure-morning') {
      console.log(`Special season transition scene detected: ${nextSceneId}`);
    }
    
    setGameState(prev => ({
      ...prev,
      currentScene: nextSceneId,
      dialogueIndex: 0,
      showChoices: false,
      sceneHistory: [...prev.sceneHistory, prev.currentScene]
    }));
    
    console.log(`Scene transition complete, now at [${nextSceneId}]`);
  }, [gameState.currentScene]);

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
      console.log(`Choice selected, transitioning to: ${choice.nextSceneId}`);
      handleSceneTransition(choice.nextSceneId);
    } else {
      console.warn('Choice selected has no nextSceneId, cannot progress');
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
