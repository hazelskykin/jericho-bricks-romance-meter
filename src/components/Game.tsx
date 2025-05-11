
import React, { useState, useEffect } from 'react';
import GameInterface from './GameInterface';
import MainMenu from './MainMenu';
import { GameProvider } from '../context/GameContext';
import AssetPreloader from './AssetPreloader';
import DevSceneJumper from './DevSceneJumper';
import useGameScenes from '../hooks/useGameScenes';
import { soundManager } from '@/utils/soundEffects';
import { toast } from 'sonner';
import { initializeGameSounds } from '@/utils/soundEffects';

const Game: React.FC = () => {
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [priorityAssetsLoaded, setPriorityAssetsLoaded] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [soundInitialized, setSoundInitialized] = useState(false);
  
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
    console.log('Game component rendered, current scene:', currentSceneId);
    if (!currentScene) {
      console.error('Current scene is undefined for sceneId:', currentSceneId);
    }
  }, [currentSceneId, currentScene]);

  // Initialize sound system when component mounts
  useEffect(() => {
    if (!soundInitialized) {
      try {
        initializeGameSounds();
        soundManager.exposeToWindow();
        setSoundInitialized(true);
        console.log('Sound system initialized');
      } catch (error) {
        console.error('Failed to initialize sound system:', error);
      }
    }
  }, [soundInitialized]);

  // Handle game start
  const handleStartGame = () => {
    console.log('Starting new game');
    
    // Log sound effect instead of playing to avoid errors
    console.log('[SOUND] ui-click');
    
    setShowMainMenu(false);
    
    // If intro scene exists in our scenes data, transition to it
    transitionToScene('intro');
    
    // Show toast indicating game started
    toast.success('Starting new game...');
  };

  // Handle game reset
  const handleResetGame = () => {
    console.log('[SOUND] ui-click');
    
    setShowMainMenu(true);
    transitionToScene('start');
  };

  // Handle about button click
  const handleAbout = () => {
    console.log('Showing about screen');
    console.log('[SOUND] ui-click');
    
    transitionToScene('about');
  };

  // Show loading screen first, then show priority assets, then show main menu
  if (!priorityAssetsLoaded) {
    return (
      <AssetPreloader 
        onComplete={() => setPriorityAssetsLoaded(true)}
        priorityOnly={true}
        skipMinigameAssets={true} // Always skip minigame assets
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
          onAbout={handleAbout}
        />
      ) : (
        <GameInterface />
      )}
      
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
            skipMinigameAssets={true} // Always skip minigame assets
          />
        </div>
      )}
    </GameProvider>
  );
};

export default Game;
