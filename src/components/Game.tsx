
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainMenu from './MainMenu';
import DialogueBox from './DialogueBox';
import CharacterPortrait from './CharacterPortrait';
import ChoiceMenu from './ChoiceMenu';
import BackgroundScene from './BackgroundScene';
import CharacterStatus from './CharacterStatus';
import AssetLoading from './AssetLoading';
import { GameState, Scene, DialogueChoice } from '@/types/game';
import scenes from '@/data/scenes';
import characters from '@/data/characters';
import backgrounds from '@/data/backgrounds';
import characterExpressions from '@/data/characterExpressions';
import { showAffectionChange } from '@/components/AffectionChangeToast';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'start',
    dialogueIndex: 0,
    characters: JSON.parse(JSON.stringify(characters)), // Deep copy
    sceneHistory: [],
    showChoices: false
  });
  
  const [assetsReady, setAssetsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading game assets...');

  const currentScene: Scene = scenes[gameState.currentScene];
  const currentLine = currentScene?.dialogue[gameState.dialogueIndex];

  // Preload all game assets
  useEffect(() => {
    const preloadAssets = async () => {
      setLoadingMessage('Loading background scenes...');
      // Load all background images
      const backgroundPromises = Object.values(backgrounds).map((bg) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = bg.image;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      });
      
      await Promise.all(backgroundPromises);
      
      setLoadingMessage('Loading character portraits...');
      // Load all character expression images
      const expressionPromises = Object.values(characterExpressions).flatMap(moodMap => 
        Object.values(moodMap).map(expression => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = expression.image;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          });
        })
      );
      
      await Promise.all(expressionPromises);
      
      setLoadingMessage('Finalizing game setup...');
      setAssetsReady(true);
    };
    
    preloadAssets();
  }, []);

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
      showChoices: false
    });
  };

  // Show about screen
  const handleAbout = () => {
    handleSceneTransition('about');
  };

  // Auto-advance hidden empty scenes
  useEffect(() => {
    if (currentScene && currentScene.dialogue.length === 0 && currentScene.nextSceneId) {
      handleSceneTransition(currentScene.nextSceneId);
    }
  }, [gameState.currentScene]);

  // Render different views based on current scene
  const renderGameContent = () => {
    if (!assetsReady) {
      return <AssetLoading message={loadingMessage} />;
    }
    
    // If we're at the start or about screen, show main menu
    if (gameState.currentScene === 'start' || gameState.currentScene === 'about') {
      return (
        <MainMenu onNewGame={handleNewGame} onAbout={handleAbout} />
      );
    }

    // Otherwise show game interface
    return (
      <>
        <BackgroundScene backgroundId={currentScene?.background || 'default'} />
        
        <CharacterStatus 
          characters={Object.values(gameState.characters)}
        />
        
        <AnimatePresence mode="wait">
          <CharacterPortrait 
            characterId={currentLine?.character} 
            mood={currentLine?.mood}
            isActive={!gameState.showChoices}
          />
        </AnimatePresence>
        
        <DialogueBox 
          line={currentLine || { text: 'Error: No dialogue found' }}
          onContinue={handleContinue}
          isActive={!gameState.showChoices}
        />
        
        {currentScene?.choices && (
          <ChoiceMenu 
            choices={currentScene.choices} 
            onChoiceSelected={handleChoiceSelected}
            isActive={gameState.showChoices}
          />
        )}
      </>
    );
  };

  return (
    <motion.div 
      className="min-h-screen overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {renderGameContent()}
    </motion.div>
  );
};

export default Game;
