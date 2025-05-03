
import React from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import MenuBackground from './menu/MenuBackground';
import GameTitle from './menu/GameTitle';
import MainContent from './menu/MainContent';
import { useGame } from '@/context/GameContext';
import { Button } from "./ui/button";

interface MainMenuProps {
  onNewGame: () => void;
  onAbout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, onAbout }) => {
  const { handleSceneTransition } = useGame();
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen relative overflow-hidden">
      {/* Background */}
      <MenuBackground backgroundId="wall-tiles" />
      
      {/* Content */}
      <div className="relative w-full h-full z-20 flex flex-col">
        {/* Title */}
        <GameTitle />
        
        {/* Right-aligned content container */}
        <div className="flex flex-1 justify-end px-4">
          <MainContent />
        </div>

        {/* Menu buttons - Adding these back */}
        <div className="absolute bottom-20 right-10 z-30 flex flex-col gap-3">
          <Button 
            onClick={onNewGame} 
            className="px-8 py-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary/90"
          >
            New Game
          </Button>
          <Button 
            onClick={onAbout}
            className="px-8 py-2 bg-secondary text-white rounded-md shadow-lg hover:bg-secondary/90"
          >
            About
          </Button>
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
