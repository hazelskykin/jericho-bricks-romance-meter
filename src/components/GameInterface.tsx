
import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { allScenes } from '@/data/scenes';
import SceneRenderer from './interface/SceneRenderer';
import SpecialSceneRouter from './interface/SpecialSceneRouter';
import SceneTransition from './SceneTransition';

interface GameInterfaceProps {
  initialSceneId?: string;
  gameStarted?: boolean;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ initialSceneId, gameStarted = false }) => {
  const {
    gameState,
    handleNewGame,
    handleAbout,
    activeMinigame,
    completeMinigame,
    exitMinigame,
    handleSceneTransition,
    isTransitioning,
    transitionDuration
  } = useGame();
  
  const [initialized, setInitialized] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(true); // Default to true for asset loading

  // Debug the current scene
  useEffect(() => {
    console.log('GameInterface rendering with scene:', gameState.currentScene);
    console.log('Current scene data:', allScenes[gameState.currentScene]);
    
    // Debug summer-character-selection specifically
    if (gameState.currentScene === 'summer-character-selection') {
      console.log('Summer character selection scene triggered in GameInterface');
      console.log('Scene exists in allScenes:', Boolean(allScenes['summer-character-selection']));
    }
    
    // Only perform this sync once when the component first loads with an initialSceneId
    if (!initialized && initialSceneId && initialSceneId !== 'start' && gameStarted) {
      console.log(`Initializing GameInterface with scene: ${initialSceneId}`);
      handleSceneTransition(initialSceneId);
      setInitialized(true);
    }
  }, [gameState.currentScene, initialSceneId, handleSceneTransition, initialized, gameStarted]);

  return (
    <>
      <SceneTransition 
        isTransitioning={isTransitioning} 
        duration={transitionDuration} 
      />
      <SpecialSceneRouter />
      <SceneRenderer 
        gameState={gameState}
        activeMinigame={activeMinigame}
        completeMinigame={completeMinigame}
        exitMinigame={exitMinigame}
        handleSceneTransition={handleSceneTransition}
        handleNewGame={handleNewGame}
        handleAbout={handleAbout}
        loadingComplete={loadingComplete}
        gameStarted={gameStarted}
        initialSceneId={initialSceneId}
      />
    </>
  );
};

export default React.memo(GameInterface);
