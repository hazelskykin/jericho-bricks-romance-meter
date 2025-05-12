
import React, { useEffect } from 'react';
import MinigameContainer from '../MinigameContainer';
import { useSpokenWord, DEFAULT_THEMES, DEFAULT_POEM_STANZAS } from './useSpokenWord';
import ThemeSelectionView from './ThemeSelectionView';
import PoemCreationView from './PoemCreationView';
import ResultsView from './ResultsView';
import { assetManager } from '@/utils/assetManager';
import { soundManager } from '@/utils/sound';

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

  // Preload assets when component mounts
  useEffect(() => {
    // Preload the game assets
    const assetPaths = [
      '/assets/minigames/summer/spokenWord/paper-background.png',
      '/assets/minigames/summer/spokenWord/theme-icons.png',
      '/assets/minigames/summer/spokenWord/mastery-icons.png',
    ];
    
    // Preload all assets
    assetManager.preloadAssets(assetPaths, (loaded, total) => {
      console.log(`Loaded ${loaded}/${total} Spoken Word assets`);
    }).then(() => {
      console.log('All Spoken Word assets loaded');
      // Play ambient sound if needed
    });
    
    // Stop sounds when unmounting
    return () => {
      soundManager.stopMusic();
    };
  }, []);

  // Get instructions based on game stage
  const getInstructions = () => {
    switch(gameStage) {
      case 'theme':
        return "Choose a theme for your poem. Different themes resonate with different characters.";
      case 'poem':
        return "Create your poem by selecting options for each stanza. Choose carefully to maintain thematic coherence.";
      case 'results':
        return "Your poem is complete! See how well you maintained the theme.";
      default:
        return "";
    }
  };

  return (
    <MinigameContainer
      title="Spoken Word: Poetry Game"
      instructions={getInstructions()}
      onComplete={handleContinue}
      onExit={onExit}
    >
      <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
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
