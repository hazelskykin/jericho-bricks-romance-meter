
import React from 'react';
import MenuBackground from './menu/MenuBackground';
import MainContent from './menu/MainContent';
import { Toaster } from 'sonner';

interface MainMenuProps {
  onNewGame: () => void;
  loadingComplete: boolean;
  onAbout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, loadingComplete, onAbout }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Background */}
      <MenuBackground />
      
      {/* Main Content */}
      <MainContent onNewGame={onNewGame} loadingComplete={loadingComplete} />
    </div>
  );
};

export default MainMenu;
