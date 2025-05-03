import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGame } from '@/context/GameContext';
import Glossary from './Glossary';
import DialogHistory from './DialogHistory';
import MenuToggleButton from './menu/MenuToggleButton';
import MenuItems from './menu/MenuItems';

interface ExpandableMenuProps {
  onGameClick: () => void;
  onTesterClick: () => void;
  activeView: 'game' | 'tester';
}

const ExpandableMenu: React.FC<ExpandableMenuProps> = ({ 
  onGameClick, 
  onTesterClick, 
  activeView 
}) => {
  // Start with menu expanded by default
  const [isExpanded, setIsExpanded] = useState(true);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const { handleSceneTransition, gameState, handleNewGame, handleAbout, replayCurrentScene } = useGame();

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (callback: () => void) => {
    callback();
    // Don't close menu after clicking - keep it open for better UX
  };

  const openGlossary = () => {
    setGlossaryOpen(true);
  };
  
  const openDialogHistory = () => {
    setHistoryOpen(true);
  };

  // Function to start a new game via the menu
  const startNewGame = () => {
    handleNewGame();
  };

  // Function to show about info via the menu
  const showAboutInfo = () => {
    handleAbout();
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <TooltipProvider>
          <div className="relative">
            {/* Toggle Button */}
            <MenuToggleButton 
              isExpanded={isExpanded} 
              onClick={toggleMenu} 
            />

            {/* Expandable Menu Items */}
            <AnimatePresence>
              <MenuItems 
                isExpanded={isExpanded}
                activeView={activeView}
                onGameClick={onGameClick}
                onTesterClick={onTesterClick}
                startNewGame={startNewGame}
                showAboutInfo={showAboutInfo}
                openGlossary={openGlossary}
                openDialogHistory={openDialogHistory}
                handleItemClick={handleItemClick}
              />
            </AnimatePresence>
          </div>
        </TooltipProvider>
      </div>
      
      {/* Dialogs */}
      <Glossary open={glossaryOpen} onOpenChange={setGlossaryOpen} />
      <DialogHistory 
        open={historyOpen} 
        onOpenChange={setHistoryOpen}
        onReplayScene={replayCurrentScene} 
      />
    </>
  );
};

export default ExpandableMenu;
