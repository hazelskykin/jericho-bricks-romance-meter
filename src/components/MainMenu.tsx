
import React from 'react';
import MenuBackground from './menu/MenuBackground';
import GameTitle from './menu/GameTitle';
import MainContent from './menu/MainContent';
import { useGame } from '@/context/GameContext';
import { Button } from "./ui/button";

interface MainMenuProps {
  onNewGame: () => void;
  onAbout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame }) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen relative overflow-hidden">
      {/* Background */}
      <MenuBackground backgroundId="wall-tiles" />
      
      {/* Content */}
      <div className="relative w-full h-full z-20 flex flex-col">
        {/* Title */}
        <GameTitle />
        
        {/* Main Button */}
        <div className="flex justify-center my-6 z-30">
          <Button 
            onClick={onNewGame} 
            className="px-12 py-4 bg-primary text-white text-xl rounded-md shadow-lg hover:bg-primary/90 transform transition-all hover:scale-105"
          >
            New Game
          </Button>
        </div>
        
        {/* Content container - now positioned below the button */}
        <div className="flex flex-1 justify-center px-4">
          <MainContent />
        </div>
      </div>
      
      {/* Version info */}
      <div className="absolute bottom-4 right-4 text-xs text-white/50 z-20">
        Demo Version 0.1
      </div>
    </div>
  );
};

export default MainMenu;
