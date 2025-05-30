
import React from 'react';
import { Button } from '@/components/ui/button';

interface MenuButtonsProps {
  onNewGame: () => void;
  onAbout?: () => void;
  loadingComplete: boolean;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onNewGame, onAbout, loadingComplete }) => {
  const handleNewGameClick = () => {
    console.log('New Game button clicked inside MenuButtons');
    // Remove ui-click sound since the file doesn't exist
    onNewGame();
  };

  const handleAboutClick = () => {
    console.log('About button clicked inside MenuButtons');
    // Remove ui-click sound since the file doesn't exist
    if (onAbout) {
      onAbout();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Button
        onClick={handleNewGameClick}
        disabled={!loadingComplete}
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-3 px-6 text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingComplete ? 'New Game' : 'Loading...'}
      </Button>
      
      {onAbout && (
        <Button
          onClick={handleAboutClick}
          variant="outline"
          className="w-full border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white font-semibold py-3 px-6 text-lg transition-all duration-200"
        >
          About
        </Button>
      )}
    </div>
  );
};

export default MenuButtons;
