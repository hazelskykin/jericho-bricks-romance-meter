import React, { useState } from 'react';
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
  const [showDevMenu, setShowDevMenu] = useState(false);

  const handleJump = (sceneId: string) => {
    handleSceneTransition(sceneId);
  };

  return (
    <div className="flex flex-col items-end justify-start min-h-screen relative overflow-hidden">
      {/* Background */}
      <MenuBackground backgroundId="wall-tiles" />

      {/* Content */}
      <div className="relative w-full h-full z-20 flex flex-col items-end">
        {/* Title */}
        <GameTitle />

        {/* Main Content - right-aligned */}
        <div className="flex flex-1 justify-end px-4 w-full">
          <MainContent />
        </div>

        {/* Main Button - right-aligned */}
        <div className="flex justify-end my-6 z-30 pr-10 w-full">
          <Button 
            onClick={onNewGame} 
            className="px-12 py-4 bg-primary text-white text-xl rounded-md shadow-lg hover:bg-primary/90 transform transition-all hover:scale-105"
          >
            New Game
          </Button>
        </div>

        {/* Dev Menu Toggle */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-4 left-4 z-30">
            <Button 
              onClick={() => setShowDevMenu(!showDevMenu)} 
              className="bg-yellow-600 text-white px-4 py-2 text-sm rounded shadow"
            >
              {showDevMenu ? 'Hide Test Menu' : 'Show Test Menu'}
            </Button>

            {showDevMenu && (
              <div className="mt-2 bg-black/80 p-4 rounded shadow max-w-xs space-y-2">
                <p className="text-white text-sm font-semibold">Jump to Scene:</p>
                <div className="flex flex-col space-y-1">
                  <Button onClick={() => handleJump('spring-intro')} className="text-xs">Spring Intro</Button>
                  <Button onClick={() => handleJump('spring-character-selection')} className="text-xs">Spring Character Select</Button>
                  <Button onClick={() => handleJump('spring-festival-planning')} className="text-xs">Spring Festival Planning</Button>
                  <Button onClick={() => handleJump('summer-intro')} className="text-xs">Summer Intro</Button>
                  <Button onClick={() => handleJump('summer-character-selection')} className="text-xs">Summer Character Select</Button>
                  <Button onClick={() => handleJump('summer-planning')} className="text-xs">Summer Festival Planning</Button>
                  <Button onClick={() => handleJump('autumn-intro')} className="text-xs">Autumn Intro</Button>
                  <Button onClick={() => handleJump('winter-intro')} className="text-xs">Winter Intro</Button>
                  <Button onClick={() => handleJump('epilogue-route')} className="text-xs">Epilogue</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Version info */}
      <div className="absolute bottom-4 right-4 text-xs text-white/50 z-20">
        Demo Version 0.1
      </div>
    </div>
  );
};

export default MainMenu;
