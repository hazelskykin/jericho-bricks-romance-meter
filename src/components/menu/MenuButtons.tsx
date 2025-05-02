
import React from 'react';
import { Button } from '@/components/ui/button';

interface MenuButtonsProps {
  onNewGame: () => void;
  onAbout: () => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onNewGame, onAbout }) => {
  return (
    <div className="space-y-4 max-w-md">
      <Button 
        className="w-full py-6 text-base bg-cyberpunk-primary hover:bg-cyberpunk-accent transition-all duration-300" 
        onClick={onNewGame}
      >
        New Game
      </Button>
      <Button 
        className="w-full py-6 text-base bg-cyberpunk-dark hover:bg-cyberpunk-secondary transition-all duration-300" 
        onClick={onAbout}
        variant="outline"
      >
        About
      </Button>
    </div>
  );
};

export default MenuButtons;
