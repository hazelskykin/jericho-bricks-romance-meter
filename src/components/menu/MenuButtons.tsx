
import React from 'react';
import { Button } from '@/components/ui/button';

interface MenuButtonsProps {
  onNewGame: () => void;
  onAbout: () => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onNewGame, onAbout }) => {
  return (
    <div className="space-y-4 w-full max-w-xs">
      <Button 
        className="w-full py-5 text-sm bg-cyberpunk-primary hover:bg-cyberpunk-accent transition-all duration-300" 
        onClick={onNewGame}
      >
        New Game
      </Button>
      <Button 
        className="w-full py-5 text-sm bg-cyberpunk-dark hover:bg-cyberpunk-secondary transition-all duration-300" 
        onClick={onAbout}
        variant="outline"
      >
        About
      </Button>
    </div>
  );
};

export default MenuButtons;
