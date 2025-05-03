
import React, { useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import DialogueBox from '../DialogueBox';
import CharacterPortrait from '../CharacterPortrait';
import ChoiceMenu from '../ChoiceMenu';
import BackgroundScene from '../BackgroundScene';
import CharacterStatus from '../CharacterStatus';

const StandardGameView: React.FC = () => {
  const { 
    gameState, 
    currentScene, 
    currentLine, 
    handleContinue, 
    handleChoiceSelected 
  } = useGame();

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

export default StandardGameView;
