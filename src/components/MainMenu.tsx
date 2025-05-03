
import React from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import MenuBackground from './menu/MenuBackground';
import GameTitle from './menu/GameTitle';
import MainContent from './menu/MainContent';

interface MainMenuProps {
  onNewGame: () => void;
  onAbout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, onAbout }) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen relative overflow-hidden">
      {/* Background */}
      <MenuBackground backgroundId="wall-tiles" />
      
      {/* Content - Repositioned */}
      <div className="relative w-full h-full z-20 flex flex-col">
        {/* Title - Moved closer to top */}
        <GameTitle />
        
        {/* Right-aligned content container - Now without buttons */}
        <div className="flex flex-1 justify-end px-4">
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
