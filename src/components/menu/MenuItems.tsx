
import React from 'react';
import { motion } from 'framer-motion';
import { Book, RefreshCcw, Info } from 'lucide-react';
import ExpandableMenuItem from './ExpandableMenuItem';

interface MenuItemsProps {
  isExpanded: boolean;
  activeView: 'game' | 'tester';
  onGameClick: () => void;
  onTesterClick: () => void;
  startNewGame: () => void;
  showAboutInfo: () => void;
  openGlossary: () => void;
  openDialogHistory: () => void;
  handleItemClick: (callback: () => void) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({
  isExpanded,
  activeView,
  onGameClick,
  onTesterClick,
  startNewGame,
  showAboutInfo,
  openGlossary,
  openDialogHistory,
  handleItemClick,
}) => {
  if (!isExpanded) return null;

  return (
    <motion.div
      className="absolute bottom-14 right-0 flex flex-col gap-2 w-48"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Main Game Controls */}
      <ExpandableMenuItem
        label="Game View"
        onClick={() => handleItemClick(onGameClick)}
        active={activeView === 'game'}
        tooltipText="Switch to Game View"
      />

      <ExpandableMenuItem
        label="Background Tester"
        onClick={() => handleItemClick(onTesterClick)}
        active={activeView === 'tester'}
        tooltipText="Switch to Background Tester"
      />
      
      {/* Game controls */}
      <ExpandableMenuItem
        label="New Game"
        onClick={() => handleItemClick(startNewGame)}
        tooltipText="Start a New Game"
      />
      
      <ExpandableMenuItem
        label="About"
        icon={<Info className="h-4 w-4" />}
        onClick={() => handleItemClick(showAboutInfo)}
        tooltipText="About the Game"
      />
      
      {/* Dialog history and glossary buttons */}
      <ExpandableMenuItem
        label="Dialog History"
        icon={<RefreshCcw className="h-4 w-4" />}
        onClick={() => handleItemClick(openDialogHistory)}
        tooltipText="View Dialog History"
      />
      
      <ExpandableMenuItem
        label="Glossary"
        icon={<Book className="h-4 w-4" />}
        onClick={() => handleItemClick(openGlossary)}
        tooltipText="Open Glossary"
      />
    </motion.div>
  );
};

export default MenuItems;
