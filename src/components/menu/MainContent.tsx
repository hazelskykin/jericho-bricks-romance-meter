
import React, { useState, useEffect } from 'react';
import GameTitle from './GameTitle';
import MenuButtons from './MenuButtons';
import CharacterChibisPreview from './CharacterChibisPreview';
import characterChibis from '../../data/characterChibis';
import { Toaster } from 'sonner';

interface MainContentProps {
  onNewGame: () => void;
  loadingComplete: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ onNewGame, loadingComplete }) => {
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
      
      {/* Game Title */}
      <div className="flex flex-col items-center mb-6 animate-fade-in">
        <GameTitle />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl px-4 gap-8">
        {/* Character Chibis */}
        <div className="flex-1 flex justify-center items-end mb-8 md:mb-0 mt-4 md:mt-0">
          <div className={`transition-all duration-700 ${charactersLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CharacterChibisPreview
              characters={characterChibis}
              loadingComplete={loadingComplete}
            />
          </div>
        </div>
        
        {/* Menu Buttons - Using div with direct button */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            <button
              onClick={onNewGame}
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
