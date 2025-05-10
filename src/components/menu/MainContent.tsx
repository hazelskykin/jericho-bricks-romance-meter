
import React from 'react';
import GameTitle from './GameTitle';
import MenuButtons from './MenuButtons';
import { Toaster } from 'sonner';

interface MainContentProps {
  onNewGame: () => void;
  loadingComplete: boolean;
  onAbout?: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onNewGame, loadingComplete, onAbout }) => {
  // No state needed for characters since we've removed that animation
  
  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
      {/* Notification system */}
      <Toaster position="top-right" richColors />
      
      {/* Main Content - Positioned on the right */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl px-4 justify-end">
        <div className="w-full md:w-1/3 flex flex-col items-end pr-8">
          {/* Game Title */}
          <div className="flex flex-col items-end mb-6 animate-fade-in">
            <GameTitle />
          </div>
          
          {/* Menu Buttons */}
          <div className="w-full max-w-xs flex flex-col items-end justify-center mt-6">
            <MenuButtons onNewGame={onNewGame} onAbout={onAbout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
