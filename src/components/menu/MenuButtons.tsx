import React from 'react';
import { Button } from '@/components/ui/button';

interface MenuButtonsProps {
  onNewGame: () => void;
  onAbout: () => void;
}

// This component is now obsolete as buttons have been moved to the hamburger menu
// We're keeping the file but making it empty to avoid errors
// You could safely delete this file but would need to update imports
const MenuButtons: React.FC<MenuButtonsProps> = () => {
  return null;
};

export default MenuButtons;
