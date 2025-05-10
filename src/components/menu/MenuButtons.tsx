
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { soundManager } from '@/utils/soundEffects';

interface MenuButtonsProps {
  onNewGame: () => void;
  onAbout?: () => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onNewGame, onAbout }) => {
  const handleNewGameClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    console.log("New Game button clicked inside MenuButtons");
    
    // Try to play click sound
    try {
      soundManager.playSFX('ui-click');
    } catch (error) {
      console.warn('Failed to play click sound:', error);
    }
    
    onNewGame();
  }, [onNewGame]);

  const handleAboutClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    console.log("About button clicked inside MenuButtons");
    
    // Try to play click sound
    try {
      soundManager.playSFX('ui-click');
    } catch (error) {
      console.warn('Failed to play click sound:', error);
    }
    
    if (onAbout) {
      onAbout();
    }
  }, [onAbout]);

  return (
    <div className="space-y-4">
      <Button
        onClick={handleNewGameClick}
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg"
      >
        New Game
      </Button>
      {onAbout && (
        <Button
          onClick={handleAboutClick}
          className="w-full bg-transparent hover:bg-[#7E69AB]/20 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg border border-[#9b87f5]"
        >
          About
        </Button>
      )}
    </div>
  );
};

export default MenuButtons;
