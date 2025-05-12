
import React, { useEffect } from 'react';
import MinigameContainer from '../MinigameContainer';
import { useLookingSigns } from './useLookingSigns';
import GameplayView from './GameplayView';
import ResultsView from './ResultsView';
import { assetManager } from '@/utils/assetManager';
import { soundManager } from '@/utils/sound';

interface LookingSignsGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const LookingSignsGame: React.FC<LookingSignsGameProps> = ({ onComplete, onExit }) => {
  const {
    gameStage,
    timeRemaining,
    currentSign,
    score,
    incorrectScore,
    handleSignSort,
    gameResult,
    handleGameComplete
  } = useLookingSigns(onComplete);
  
  // Preload assets when component mounts
  useEffect(() => {
    // Define asset paths
    const assetPaths = [
      '/assets/minigames/winter/lookingSigns/signs-background.png',
      '/assets/minigames/winter/lookingSigns/sign-clues.png'
    ];
    
    // Preload all assets
    assetManager.preloadAssets(assetPaths, (loaded, total) => {
      console.log(`Loaded ${loaded}/${total} Looking Signs assets`);
    }).then(() => {
      console.log('All Looking Signs assets loaded');
      // Play ambient sound if needed
      soundManager.playMusic('lookingSigns-loop-gameplay.mp3', { loop: true, volume: 0.4 });
    });
    
    // Cleanup function
    return () => {
      soundManager.stopMusic();
    };
  }, []);

  // Get instructions based on game stage
  const getInstructions = () => {
    switch(gameStage) {
      case 'gameplay':
        return "Sort the signs by clicking the correct arrow. Good luck signs go RIGHT, bad luck signs go LEFT. You have 60 seconds!";
      case 'results':
        return "Game complete! See how well you did at finding auspicious signs.";
      default:
        return "";
    }
  };

  return (
    <MinigameContainer
      title="Looking Signs: Fortune Reading"
      instructions={getInstructions()}
      onComplete={() => handleGameComplete()}
      onExit={onExit}
    >
      {gameStage === 'gameplay' && (
        <GameplayView 
          currentSign={currentSign}
          timeRemaining={timeRemaining}
          score={score}
          incorrectScore={incorrectScore}
          onSortSign={handleSignSort}
        />
      )}

      {gameStage === 'results' && (
        <ResultsView 
          score={score}
          incorrectScore={incorrectScore}
          gameResult={gameResult}
          onContinue={handleGameComplete}
        />
      )}
    </MinigameContainer>
  );
};

export default LookingSignsGame;
