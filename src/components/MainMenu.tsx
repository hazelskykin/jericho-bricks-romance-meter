
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import characterChibis from '@/data/characterChibis';
import characters from '@/data/characters';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import backgrounds from '@/data/backgrounds';

interface MainMenuProps {
  onNewGame: () => void;
  onAbout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, onAbout }) => {
  // Get wall-tiles background data
  const bgData = backgrounds['wall-tiles'];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background image with pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgData.image})` }}
      />
      
      {/* Gradient overlay to enhance readability */}
      <div 
        className="absolute inset-0 z-5" 
        style={{ background: bgData.gradient || 'linear-gradient(to bottom, rgba(26, 31, 44, 0.3), rgba(42, 30, 78, 0.6))' }}
      />
      
      {/* Additional stylized overlay for depth */}
      <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[1px]"></div>
      
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
        
        <p className="text-xl text-white/80 max-w-md mb-6">
          Navigate relationships and technology in the city of Stonewich as part of Cybaton's elite administrative team.
        </p>

        {/* Character Chibi Preview */}
        <div className="flex justify-center gap-1 mb-6">
          {Object.values(characters).map((char) => {
            const chibiData = characterChibis[char.id];
            
            return (
              <motion.div 
                key={char.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + Math.random() * 0.5 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                {chibiData?.image ? (
                  <Avatar 
                    className="w-14 h-14 border-2 rounded-xl"
                    style={{ 
                      borderColor: char.color,
                      boxShadow: `0 0 10px ${char.color}50`,
                      backgroundColor: `${char.color}30`,
                    }}
                  >
                    <AvatarFallback
                      style={{ 
                        backgroundColor: char.color + '60',
                        color: 'white',
                      }}
                      className="rounded-xl"
                    >
                      {char.name.substring(0, 2)}
                    </AvatarFallback>
                    <AvatarImage 
                      src={chibiData.image} 
                      alt={char.name}
                      className="rounded-xl"
                    />
                  </Avatar>
                ) : null}
              </motion.div>
            );
          })}
        </div>
        
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
