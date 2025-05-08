
import React from 'react';
import { Button } from '@/components/ui/button';

interface MenuButtonsProps {
  onNewGame: () => void;
  onAbout?: () => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onNewGame, onAbout }) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={onNewGame}
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg"
      >
        New Game
      </Button>
      {onAbout && (
        <Button
          onClick={onAbout}
          className="w-full bg-transparent hover:bg-[#7E69AB]/20 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg border border-[#9b87f5]"
        >
          About
        </Button>
      )}
    </div>
  );
};

export default MenuButtons;
