
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Book } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Glossary from './Glossary';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (callback: () => void) => {
    callback();
    setIsExpanded(false);
  };

  const openGlossary = () => {
    setGlossaryOpen(true);
    setIsExpanded(false);
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50">
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
              <TooltipContent side="right">
                <p>Toggle Menu</p>
              </TooltipContent>
            </Tooltip>

            {/* Expandable Menu Items */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="absolute bottom-14 left-0 flex flex-col gap-2"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="shadow-md" 
                        size="sm" 
                        variant={activeView === 'game' ? 'default' : 'outline'} 
                        onClick={() => handleItemClick(onGameClick)}
                      >
                        Game
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Switch to Game View</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="shadow-md" 
                        size="sm" 
                        variant={activeView === 'tester' ? 'default' : 'outline'} 
                        onClick={() => handleItemClick(onTesterClick)}
                      >
                        Background Tester
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Switch to Background Tester</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="shadow-md" 
                        size="sm" 
                        variant="outline" 
                        onClick={openGlossary}
                      >
                        <Book className="h-4 w-4 mr-2" />
                        Glossary
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Open Glossary</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TooltipProvider>
      </div>
      
      {/* Glossary Dialog */}
      <Glossary open={glossaryOpen} onOpenChange={setGlossaryOpen} />
    </>
  );
};

export default ExpandableMenu;
