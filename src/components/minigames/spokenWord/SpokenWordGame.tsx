
import React from 'react';
import MinigameContainer from '../MinigameContainer';
import { useSpokenWord, DEFAULT_THEMES, DEFAULT_POEM_STANZAS } from './useSpokenWord';
import ThemeSelectionView from './ThemeSelectionView';
import PoemCreationView from './PoemCreationView';
import ResultsView from './ResultsView';

interface SpokenWordGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const SpokenWordGame: React.FC<SpokenWordGameProps> = ({ onComplete, onExit }) => {
  const {
    selectedTheme,
    gameStage,
    selectedOptions,
    currentStanzaIndex,
    score,
    handleThemeSelect,
    handleOptionSelect,
    getRanking,
    getCompiledPoem,
    handleContinue
  } = useSpokenWord(onComplete);

  return (
    <MinigameContainer
      title="Spoken Word: Poetry Game"
      instructions={
        gameStage === 'theme' 
          ? "Choose a theme for your poem. Different themes resonate with different characters."
          : gameStage === 'poem'
          ? "Create your poem by selecting options for each stanza. Choose carefully to maintain thematic coherence."
          : "Your poem is complete!"
      }
      onComplete={handleContinue}
      onExit={onExit}
    >
      <div className="flex flex-col items-center gap-6">
        {gameStage === 'theme' && (
          <ThemeSelectionView themes={DEFAULT_THEMES} onThemeSelect={handleThemeSelect} />
        )}

        {gameStage === 'poem' && selectedTheme && (
          <PoemCreationView
            themes={DEFAULT_THEMES}
            stanzas={DEFAULT_POEM_STANZAS}
            selectedTheme={selectedTheme}
            currentStanzaIndex={currentStanzaIndex}
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
          />
        )}

        {gameStage === 'results' && selectedTheme && (
          <ResultsView
            themes={DEFAULT_THEMES}
            selectedTheme={selectedTheme}
            score={score}
            compiledPoem={getCompiledPoem()}
            ranking={getRanking()}
            onContinue={handleContinue}
          />
        )}
      </div>
    </MinigameContainer>
  );
};

export default SpokenWordGame;
