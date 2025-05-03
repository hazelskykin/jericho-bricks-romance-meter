
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
import { CharacterId } from '@/types/game';

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
  if (gameState.currentScene.includes('spring-character-selection')) {
    // Extract suffix from scene ID to identify which characters have been visited
    const suffix = gameState.currentScene.replace('spring-character-selection', '');
    
    // Parse the suffix to determine visited characters
    let visitedChars: CharacterId[] = [];
    if (suffix) {
      // Convert the suffix numbering scheme to character IDs
      if (suffix.includes('1')) visitedChars.push('xavier');
      if (suffix.includes('2')) visitedChars.push('navarre');
      if (suffix.includes('3')) visitedChars.push('etta');
      if (suffix.includes('4')) visitedChars.push('senara');
    }
    
    // Determine remaining characters - ensure we're working with properly typed arrays
    const remainingChars = (['xavier', 'navarre', 'etta', 'senara'] as CharacterId[]).filter(
      char => !visitedChars.includes(char)
    );
    
    // Always show the character selection screen, even if no characters remain
    // The "Proceed to Festival Planning" button will always be available
    return (
      <CharacterSelectionScene 
        availableCharacters={remainingChars}
        scenePrefix="spring-visit"
        title="Spring Connections"
        description={
          remainingChars.length > 0
            ? "As spring begins in Stonewich, take time to connect with your teammates. Who would you like to visit next?"
            : "You've visited all your teammates. You can proceed to the Spring festival planning."
        }
      />
    );
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
