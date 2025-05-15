
import React, { useState, useEffect } from 'react';
import GameInterface from './GameInterface';
import MainMenu from './MainMenu';
import { GameProvider } from '../context/GameProvider';
import AssetPreloader from './AssetPreloader';
import DevSceneJumper from './DevSceneJumper';
import useGameScenes from '../hooks/useGameScenes';
import { toast } from 'sonner';
import { soundManager, initializeGameSounds, exposeSoundManagerToWindow } from '@/utils/sound';

const Game: React.FC = () => {
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [priorityAssetsLoaded, setPriorityAssetsLoaded] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [soundInitialized, setSoundInitialized] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [forcedSceneId, setForcedSceneId] = useState<string | null>(null);
  
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
    
    // If the current scene is no longer 'start' or 'about', we should hide the main menu
    if (currentSceneId !== 'start' && currentSceneId !== 'about' && showMainMenu && gameStarted) {
      console.log('Scene is not start or about, hiding main menu');
      setShowMainMenu(false);
    }
    
    // If we're back at the start scene, show the main menu
    if ((currentSceneId === 'start' || currentSceneId === 'about') && !showMainMenu) {
      console.log('Returning to start/about scene, showing main menu');
      setShowMainMenu(true);
    }
  }, [currentSceneId, showMainMenu, gameStarted]);

  // Initialize sound system when component mounts
  useEffect(() => {
    if (!soundInitialized) {
      try {
        console.log('Initializing game sound system...');
        initializeGameSounds();
        exposeSoundManagerToWindow();
        setSoundInitialized(true);
        console.log('Sound system initialized');
      } catch (error) {
        console.error('Failed to initialize sound system:', error);
      }
    }
  }, [soundInitialized]);

  // Handle game start - make this a proper function that handles the entire flow
  const handleStartGame = () => {
    console.log('Starting new game');
    
    try {
      // Play sound effect if sound system is ready
      if (soundInitialized) {
        soundManager.playSFX('ui-click', false);
      } else {
        console.log('[SOUND] ui-click');
      }
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
    
    // First mark the game as started to trigger menu hiding
    setGameStarted(true);
    
    // Immediately hide the main menu first to avoid flicker
    setShowMainMenu(false);
    
    // Force scene transition to intro
    setForcedSceneId('intro');
    
    // Add a small delay to ensure UI updates before scene transition
    setTimeout(() => {
      // Transition to intro scene
      transitionToScene('intro');
      
      // Show toast indicating game started
      toast.success('Starting new game...');
    }, 50);
  };

  // Handle game reset
  const handleResetGame = () => {
    try {
      soundManager.playSFX('ui-click', false);
    } catch (error) {
      console.log('[SOUND] ui-click');
      console.warn('Failed to play sound:', error);
    }
    
    setShowMainMenu(true);
    setGameStarted(false);
    setForcedSceneId(null);
    transitionToScene('start');
  };

  // Handle about button click
  const handleAbout = () => {
    console.log('Showing about screen');
    
    try {
      soundManager.playSFX('ui-click', false);
    } catch (error) {
      console.log('[SOUND] ui-click');
      console.warn('Failed to play sound:', error);
    }
    
    transitionToScene('about');
  };

  // Show loading screen first, then show priority assets, then show main menu
  if (!priorityAssetsLoaded) {
    return (
      <AssetPreloader 
        onComplete={() => setPriorityAssetsLoaded(true)}
        priorityOnly={true}
        skipMinigameAssets={true} // Skip minigame assets during initial load
      />
    );
  }

  // Return the appropriate view based on current state
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
        <GameInterface 
          initialSceneId={forcedSceneId || currentSceneId} 
          gameStarted={gameStarted} 
        />
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
            skipMinigameAssets={true} // Skip minigame assets during background load
          />
        </div>
      )}
    </GameProvider>
  );
};

export default Game;
