
import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import DialogueBox from './DialogueBox';
import CharacterPortrait from './CharacterPortrait';
import ChoiceMenu from './ChoiceMenu';
import BackgroundScene from './BackgroundScene';
import CharacterStatus from './CharacterStatus';
import MainMenu from './MainMenu';
import CharacterSelectionScene from './CharacterSelectionScene';

// Import minigames
import BroomsAwayGame from './minigames/broomsAway/BroomsAwayGame';
import MudFlingGame from './minigames/mudFling/MudFlingGame';
import BloomWithAViewGame from './minigames/bloomWithAView/BloomWithAViewGame';

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
    exitMinigame,
    handleSceneTransition
  } = useGame();

  // If we're at the start or about screen, show main menu
  if (gameState.currentScene === 'start' || gameState.currentScene === 'about') {
    return <MainMenu onNewGame={handleNewGame} onAbout={handleAbout} />;
  }
  
  // Handle special scenes like character selection
  if (gameState.currentScene.startsWith('spring-character-selection')) {
    // Get remaining characters
    const visitedSuffixes = {
      '': [],
      '1': ['xavier'],
      '2': ['navarre'],
      '3': ['etta'],
      '4': ['senara'],
      '12': ['xavier', 'navarre'],
      '13': ['xavier', 'etta'],
      '14': ['xavier', 'senara'],
      '23': ['navarre', 'etta'],
      '24': ['navarre', 'senara'],
      '34': ['etta', 'senara'],
      '123': ['xavier', 'navarre', 'etta'],
      '124': ['xavier', 'navarre', 'senara'],
      '134': ['xavier', 'etta', 'senara'],
      '234': ['navarre', 'etta', 'senara']
    };
    
    // Extract suffix from scene ID
    const suffix = gameState.currentScene.replace('spring-character-selection', '');
    const visitedChars = visitedSuffixes[suffix] || [];
    
    // Determine remaining characters
    const remainingChars = ['xavier', 'navarre', 'etta', 'senara'].filter(
      char => !visitedChars.includes(char)
    );
    
    if (remainingChars.length === 0) {
      // If no characters remain, proceed with normal dialogue
      // This will show the dialogue and then auto-advance to spring-festival-planning
    } else {
      return (
        <CharacterSelectionScene 
          availableCharacters={remainingChars}
          scenePrefix="spring-visit"
          title="Spring Connections"
          description="As spring begins in Stonewich, take time to connect with your teammates. Who would you like to visit first?"
        />
      );
    }
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
