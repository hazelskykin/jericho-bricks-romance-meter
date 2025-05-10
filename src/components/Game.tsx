
import React, { useState, useEffect } from 'react';
import GameInterface from './GameInterface';
import MainMenu from './MainMenu';
import MinigameHandler from './minigames/MinigameHandler';
import { GameProvider } from '../context/GameContext';
import AssetPreloader from './AssetPreloader';
import DevSceneJumper from './DevSceneJumper';
import useGameScenes from '../hooks/useGameScenes';
import { MinigameType } from '@/types/minigames';
import { soundManager } from '@/utils/soundEffects';
import { toast } from 'sonner';
import { initializeGameSounds } from '@/utils/soundEffects';

const Game: React.FC = () => {
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [priorityAssetsLoaded, setPriorityAssetsLoaded] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [soundInitialized, setSoundInitialized] = useState(false);
  const [activeMinigame, setActiveMinigame] = useState<MinigameType | null>(null);
  
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
    
    // Don't try to play sounds until they're properly initialized
    try {
      soundManager.playSFX('ui-click');
    } catch (error) {
      console.warn('Could not play sound effect:', error);
    }
    
    setShowMainMenu(false);
    
    // If intro scene exists in our scenes data, transition to it
    transitionToScene('intro');
    
    // Show toast indicating game started
    toast.success('Starting new game...');
  };

  // Handle game reset
  const handleResetGame = () => {
    try {
      soundManager.playSFX('ui-click');
    } catch (error) {
      console.warn('Could not play sound effect:', error);
    }
    
    setShowMainMenu(true);
    transitionToScene('start');
  };

  // Handle about button click
  const handleAbout = () => {
    console.log('Showing about screen');
    try {
      soundManager.playSFX('ui-click');
    } catch (error) {
      console.warn('Could not play sound effect:', error);
    }
    
    transitionToScene('about');
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
          />
        </div>
      )}
    </GameProvider>
  );
};

export default Game;
