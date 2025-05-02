
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, Scene, DialogueChoice } from '@/types/game';
import characters from '@/data/characters';
import scenes from '@/data/scenes';
import { showAffectionChange } from '@/components/AffectionChangeToast';

interface GameContextType {
  gameState: GameState;
  currentScene: Scene | undefined;
  currentLine: any;
  handleContinue: () => void;
  handleChoiceSelected: (choice: DialogueChoice) => void;
  handleNewGame: () => void;
  handleAbout: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'start',
    dialogueIndex: 0,
    characters: JSON.parse(JSON.stringify(characters)), // Deep copy
    sceneHistory: [],
    showChoices: false,
    hasCompletedGame: false // New property for tracking game completion
  });
  
  const currentScene: Scene | undefined = scenes[gameState.currentScene];
  const currentLine = currentScene?.dialogue[gameState.dialogueIndex];
  
  // Handle dialogue advancement
  const handleContinue = () => {
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
  };

  // Handle choice selection
  const handleChoiceSelected = (choice: DialogueChoice) => {
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
  };

  // Handle scene transitions
  const handleSceneTransition = (nextSceneId: string) => {
    setGameState(prev => ({
      ...prev,
      currentScene: nextSceneId,
      dialogueIndex: 0,
      showChoices: false,
      sceneHistory: [...prev.sceneHistory, prev.currentScene]
    }));
  };

  // Start a new game
  const handleNewGame = () => {
    setGameState({
      currentScene: 'intro',
      dialogueIndex: 0,
      characters: JSON.parse(JSON.stringify(characters)), // Reset characters
      sceneHistory: ['start'],
      showChoices: false,
      hasCompletedGame: false // Reset game completion status
    });
  };

  // Show about screen
  const handleAbout = () => {
    handleSceneTransition('about');
  };
  
  // Auto-advance hidden empty scenes
  React.useEffect(() => {
    if (currentScene && currentScene.dialogue.length === 0 && currentScene.nextSceneId) {
      handleSceneTransition(currentScene.nextSceneId);
    }
  }, [gameState.currentScene]);

  const value = {
    gameState,
    currentScene,
    currentLine,
    handleContinue,
    handleChoiceSelected,
    handleNewGame,
    handleAbout
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
