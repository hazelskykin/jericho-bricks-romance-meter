
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MainMenuProps {
  onNewGame: () => void;
  onAbout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, onAbout }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-cyberpunk z-0"></div>
      <div className="absolute inset-0 z-10 bg-black/40"></div>
      
      {/* Content */}
      <motion.div 
        className="z-20 text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-6xl font-bold text-white text-glow mb-8"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Jericho Bricks
        </motion.h1>
        
        <p className="text-xl text-white/80 max-w-md mb-12">
          Navigate relationships and technology in the city of Stonewich as part of Cybaton's elite administrative team.
        </p>
        
        <div className="space-y-4 w-64 mx-auto">
          <Button 
            className="w-full py-6 text-lg bg-cyberpunk-primary hover:bg-cyberpunk-accent transition-all duration-300" 
            onClick={onNewGame}
          >
            New Game
          </Button>
          <Button 
            className="w-full py-6 text-lg bg-cyberpunk-dark hover:bg-cyberpunk-secondary transition-all duration-300" 
            onClick={onAbout}
            variant="outline"
          >
            About
          </Button>
        </div>
      </motion.div>
      
      {/* Version info */}
      <div className="absolute bottom-4 right-4 text-xs text-white/50 z-20">
        Demo Version 0.1
      </div>
    </div>
  );
};

export default MainMenu;
