import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Book, RefreshCcw, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Glossary from './Glossary';
import DialogHistory from './DialogHistory';
import { useGame } from '@/context/GameContext';
import { toast } from "@/components/ui/use-toast";

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
    // Removed toast notification
  };

  // Function to show about info via the menu
  const showAboutInfo = () => {
    handleAbout();
    // Removed toast notification
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <TooltipProvider>
          <div className="relative">
            {/* Toggle Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-lg"
                  onClick={toggleMenu}
                  aria-label="Toggle Menu"
                >
                  {isExpanded ? <X /> : <Menu />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Toggle Menu</p>
              </TooltipContent>
            </Tooltip>

            {/* Expandable Menu Items */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="absolute bottom-14 right-0 flex flex-col gap-2 w-48"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Main Game Controls */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="shadow-md w-full justify-start" 
                        size="sm" 
                        variant={activeView === 'game' ? 'default' : 'outline'} 
                        onClick={() => handleItemClick(onGameClick)}
                      >
                        Game View
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Switch to Game View</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="shadow-md w-full justify-start" 
                        size="sm" 
                        variant={activeView === 'tester' ? 'default' : 'outline'} 
                        onClick={() => handleItemClick(onTesterClick)}
                      >
                        Background Tester
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Switch to Background Tester</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* New buttons moved from main menu */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="shadow-md w-full justify-start" 
                        size="sm" 
                        variant="default" 
                        onClick={() => handleItemClick(startNewGame)}
                      >
                        New Game
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Start a New Game</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="shadow-md w-full justify-start" 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleItemClick(showAboutInfo)}
                      >
                        <Info className="h-4 w-4 mr-2" />
                        About
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>About the Game</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* Dialog history and glossary buttons */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="shadow-md w-full justify-start" 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleItemClick(openDialogHistory)}
                      >
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Dialog History
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>View Dialog History</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="shadow-md w-full justify-start" 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleItemClick(openGlossary)}
                      >
                        <Book className="h-4 w-4 mr-2" />
                        Glossary
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Open Glossary</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              )}
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
