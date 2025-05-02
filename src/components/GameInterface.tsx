
import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import DialogueBox from './DialogueBox';
import CharacterPortrait from './CharacterPortrait';
import ChoiceMenu from './ChoiceMenu';
import BackgroundScene from './BackgroundScene';
import CharacterStatus from './CharacterStatus';
import MainMenu from './MainMenu';

// Import minigames
import BroomsAwayGame from './minigames/BroomsAwayGame';
import MudFlingGame from './minigames/MudFlingGame';
import BloomWithAViewGame from './minigames/BloomWithAViewGame';

const GameInterface: React.FC = () => {
  const { 
    gameState, 
    currentScene, 
    currentLine, 
    handleContinue, 
    handleChoiceSelected,
    handleNewGame,
    handleAbout,
    activeMinigame,
    completeMinigame,
    exitMinigame
  } = useGame();

  // If we're at the start or about screen, show main menu
  if (gameState.currentScene === 'start' || gameState.currentScene === 'about') {
    return <MainMenu onNewGame={handleNewGame} onAbout={handleAbout} />;
  }
  
  // If a minigame is active, show it
  if (activeMinigame) {
    switch (activeMinigame) {
      case 'broomsAway':
        return <BroomsAwayGame onComplete={completeMinigame} onExit={exitMinigame} />;
      case 'mudFling':
        return <MudFlingGame onComplete={completeMinigame} onExit={exitMinigame} />;
      case 'bloomWithAView':
        return <BloomWithAViewGame onComplete={completeMinigame} onExit={exitMinigame} />;
    }
  }
  
  // Use memoized callback functions
  const onContinue = useCallback(() => {
    handleContinue();
  }, [handleContinue]);
  
  // Modified to pass the index to handleChoiceSelected
  const onChoiceSelected = useCallback((index: number) => {
    if (currentScene?.choices && currentScene.choices[index]) {
      handleChoiceSelected(currentScene.choices[index]);
    }
  }, [handleChoiceSelected, currentScene]);

  // Otherwise show game interface
  return (
    <>
      <BackgroundScene backgroundId={currentScene?.background || 'default'} />
      
      <CharacterStatus 
        characters={Object.values(gameState.characters)}
      />
      
      {/* Only render CharacterPortrait if we have a character to display */}
      {currentLine?.character && !gameState.showChoices && (
        <CharacterPortrait 
          characterId={currentLine.character} 
          mood={currentLine.mood}
          isActive={!gameState.showChoices}
        />
      )}
      
      <DialogueBox 
        line={currentLine || { text: 'Error: No dialogue found' }}
        onContinue={onContinue}
        isActive={!gameState.showChoices}
      />
      
      {currentScene?.choices && gameState.showChoices && (
        <ChoiceMenu 
          choices={currentScene.choices} 
          onChoiceSelected={onChoiceSelected}
          isActive={gameState.showChoices}
        />
      )}
    </>
  );
};

export default React.memo(GameInterface);
