
import React from 'react';
import MenuBackground from './menu/MenuBackground';
import MainContent from './menu/MainContent';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

interface MainMenuProps {
  onNewGame: () => void;
  loadingComplete: boolean;
  onAbout?: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, loadingComplete, onAbout }) => {
  const handleNewGameClick = () => {
    console.log("New Game button clicked");
    toast.success("Starting new game...");
    // Add a small delay to allow the toast to show
    setTimeout(() => {
      onNewGame();
    }, 300);
  };

  const handleAboutClick = () => {
    console.log("About button clicked");
    if (onAbout) {
      onAbout();
    }
  };

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
