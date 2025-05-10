
import React, { useCallback } from 'react';
import MenuBackground from './menu/MenuBackground';
import MainContent from './menu/MainContent';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { soundManager } from '@/utils/soundEffects';

interface MainMenuProps {
  onNewGame: () => void;
  loadingComplete: boolean;
  onAbout?: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, loadingComplete, onAbout }) => {
  const handleNewGameClick = useCallback(() => {
    console.log("New Game button clicked");
    
    // Try to play a sound when clicked, but don't block if it fails
    try {
      soundManager.playSFX('ui-click');
    } catch (error) {
      console.warn('Failed to play button click sound:', error);
      // Continue with game start even if sound fails
    }
    
    toast.success("Starting new game...");
    
    // Add a small delay to allow the toast to show
    setTimeout(() => {
      onNewGame();
    }, 300);
  }, [onNewGame]);

  const handleAboutClick = useCallback(() => {
    console.log("About button clicked");
    
    // Try to play a sound when clicked, but don't block if it fails
    try {
      soundManager.playSFX('ui-click');
    } catch (error) {
      console.warn('Failed to play button click sound:', error);
      // Continue with about navigation even if sound fails
    }
    
    if (onAbout) {
      onAbout();
    }
  }, [onAbout]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Background */}
      <MenuBackground />
      
      {/* Main Content */}
      <MainContent 
        onNewGame={handleNewGameClick} 
        loadingComplete={loadingComplete} 
        onAbout={onAbout ? handleAboutClick : undefined} 
      />
    </div>
  );
};

export default MainMenu;
