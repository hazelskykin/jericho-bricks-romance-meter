
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { SoundToggle } from './common/SoundToggle';
import { initializeGameSounds } from '@/utils/soundEffects';

interface MinigameContainerProps {
  title: string;
  instructions: string;
  children: React.ReactNode;
  onComplete: (success: boolean) => void;
  onExit?: () => void;
  showExitButton?: boolean;
}

const MinigameContainer: React.FC<MinigameContainerProps> = ({
  title,
  instructions,
  children,
  onComplete,
  onExit,
  showExitButton = true
}) => {
  // Initialize sound effects when minigame container mounts
  useEffect(() => {
    initializeGameSounds();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border-2 border-[#9b87f5]/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 bg-[#1A1F2C] border-b border-[#9b87f5]/30 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#9b87f5]">{title}</h2>
          <div className="flex items-center gap-2">
            <SoundToggle />
            {showExitButton && onExit && (
              <Button 
                variant="outline" 
                className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
                onClick={onExit}
              >
                Exit
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-4 border-b border-[#9b87f5]/30">
          <p className="text-white">{instructions}</p>
        </div>
        
        <div className="flex-grow p-4 overflow-auto">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default MinigameContainer;
