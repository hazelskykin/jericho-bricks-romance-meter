
import React, { useState, useEffect } from 'react';
import GameTitle from './GameTitle';
import MenuButtons from './MenuButtons';
import CharacterChibisPreview from './CharacterChibisPreview';
import characterChibis from '../../data/characterChibis';
import { Toaster } from 'sonner';
import { CharacterId, ChibiImageData } from '@/types/game';

interface MainContentProps {
  onNewGame: () => void;
  loadingComplete: boolean;
  onAbout?: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onNewGame, loadingComplete, onAbout }) => {
  const [charactersLoaded, setCharactersLoaded] = useState(false);
  
  // Manage character animation states
  useEffect(() => {
    const timer = setTimeout(() => {
      setCharactersLoaded(true);
    }, 500); // Short delay to allow smooth animation
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
      {/* Notification system */}
      <Toaster position="top-right" richColors />
      
      {/* Main Content - Now positioned on the right */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl px-4 gap-8 justify-end">
        <div className="w-full md:w-1/2 flex flex-col items-end">
          {/* Game Title */}
          <div className="flex flex-col items-end mb-6 animate-fade-in">
            <GameTitle />
          </div>
          
          {/* Character Chibis */}
          <div className={`w-full flex justify-end items-end mb-8 md:mb-0 mt-4 md:mt-0 transition-all duration-700 ${charactersLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CharacterChibisPreview
              characterChibis={characterChibis}
              loadingComplete={loadingComplete}
              showNeutral={false} // Use regular chibi images
            />
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
