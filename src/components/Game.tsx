import React, { useState, useEffect } from 'react';
import GameInterface from './GameInterface';
import MainMenu from './MainMenu';
import MinigameHandler from './minigames/MinigameHandler';
import { GameProvider } from '../context/GameContext';
import AssetPreloader from './AssetPreloader';
import DevSceneJumper from './DevSceneJumper';
import useGameScenes from '../hooks/useGameScenes';
import { MinigameType } from '@/types/minigames';

const Game: React.FC = () => {
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [priorityAssetsLoaded, setPriorityAssetsLoaded] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  // Initialize game scenes
  const {
    currentSceneId,
    transitionToScene,
    currentScene,
    previousSceneId,
    loading,
    transitionEffect,
    setTransitionEffect
  } = useGameScenes();
  
  // Debug logging
  useEffect(() => {
    console.log('Game component rendered');
  }, []);

  // Handle game start
  const handleStartGame = () => {
    setShowMainMenu(false);
    transitionToScene('prologue-intro');
  };

  // Handle game reset
  const handleResetGame = () => {
    setShowMainMenu(true);
    transitionToScene('start');
  };

  // Show loading screen first, then show priority assets, then show main menu
  if (!priorityAssetsLoaded) {
    return (
      <AssetPreloader 
        onComplete={() => setPriorityAssetsLoaded(true)}
        priorityOnly={true}
      />
    );
  }

  // Return the appropriate view
  return (
    <GameProvider>
      {!assetsLoaded && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-purple bg-opacity-75 text-white text-xs p-1">
          Loading remaining assets in background...
        </div>
      )}
      
      {showMainMenu ? (
        <MainMenu 
          onNewGame={handleStartGame} 
          loadingComplete={loadingComplete}
          onAbout={() => {}}
        />
      ) : (
        <GameInterface />
      )}
      
      <MinigameHandler 
        activeMinigame={null} 
        completeMinigame={() => {}} 
        exitMinigame={() => {}}
      />
      
      {/* Dev Scene Jumper - always available */}
      <DevSceneJumper 
        onSceneSelect={transitionToScene}
        currentSceneId={currentSceneId}
      />
      
      {/* Load remaining assets in background */}
      {!assetsLoaded && (
        <div className="hidden">
          <AssetPreloader 
            onComplete={() => {
              setAssetsLoaded(true);
              setLoadingComplete(true);
            }}
          />
        </div>
      )}
    </GameProvider>
  );
};

export default Game;
