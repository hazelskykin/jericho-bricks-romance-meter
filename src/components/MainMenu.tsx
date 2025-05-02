
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import characterChibis from '@/data/characterChibis';
import characters from '@/data/characters';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import backgrounds from '@/data/backgrounds';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGame } from '@/context/GameContext';

interface MainMenuProps {
  onNewGame: () => void;
  onAbout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, onAbout }) => {
  // Get wall-tiles background data
  const bgData = backgrounds['wall-tiles'];
  const { gameState } = useGame();
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen relative overflow-hidden">
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
      
      {/* Content - Repositioned */}
      <div className="relative w-full h-full z-20 flex flex-col">
        {/* Title - Moved closer to top */}
        <motion.h1 
          className="text-6xl font-bold text-white text-glow mt-6 mb-4 text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Jericho Bricks
        </motion.h1>
        
        {/* Right-aligned content container */}
        <div className="flex flex-1 justify-end px-4">
          <motion.div 
            className="w-1/3 text-right pr-8 pt-8 flex flex-col items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-lg text-white/80 mb-6 max-w-md">
              Navigate relationships and technology in the city of Stonewich as part of Cybaton's elite administrative team.
            </p>

            {/* Character Chibi Preview */}
            <div className="flex justify-end gap-1 mb-6 max-w-md">
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
          </motion.div>
        </div>
      </div>

      {/* Neon word overlay for precise tooltip positioning */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* GNARUS Tooltip */}
        <div className="absolute top-[22%] left-[23%] pointer-events-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-28 h-12 cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded transition-all duration-300"></div>
            </TooltipTrigger>
            <TooltipContent 
              className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border border-blue-400/30 text-blue-300 p-3 max-w-xs backdrop-blur-sm"
              side="right"
            >
              <p className="font-medium text-blue-300">GNARUS</p>
              <p className="text-sm opacity-90">One who specializes in knowledge acquisition, curation and insights</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* SOLVITOR Tooltip */}
        <div className="absolute top-[35%] left-[20%] pointer-events-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-40 h-12 cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded transition-all duration-300"></div>
            </TooltipTrigger>
            <TooltipContent 
              className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border border-blue-400/30 text-blue-300 p-3 max-w-xs backdrop-blur-sm"
              side="right"
            >
              <p className="font-medium text-blue-300">SOLVITOR</p>
              <p className="text-sm opacity-90">One who specializes in design, build and performance optimization</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* DIVA Tooltip */}
        <div className="absolute top-[47%] left-[22%] pointer-events-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-20 h-12 cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded transition-all duration-300"></div>
            </TooltipTrigger>
            <TooltipContent 
              className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border border-blue-400/30 text-blue-300 p-3 max-w-xs backdrop-blur-sm"
              side="right"
            >
              <p className="font-medium text-blue-300">DIVA</p>
              <p className="text-sm opacity-90">One who plans, mobilizes and acts to transform vision to reality</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* BELLFOX Tooltip */}
        <div className="absolute top-[59%] left-[19%] pointer-events-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-36 h-12 cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded transition-all duration-300"></div>
            </TooltipTrigger>
            <TooltipContent 
              className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border border-blue-400/30 text-blue-300 p-3 max-w-xs backdrop-blur-sm"
              side="right"
            >
              <p className="font-medium text-blue-300">BELLFOX</p>
              <p className="text-sm opacity-90">One who achieves unity through empathy, influence and harmony</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* VERSA - Hidden until game completion */}
        <div className="absolute bottom-[22%] left-[22%] pointer-events-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-24 h-12 cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded transition-all duration-300">
                {gameState.hasCompletedGame && (
                  <div className="absolute inset-0 animate-pulse-glow"></div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent 
              className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border border-blue-400/30 p-3 max-w-xs backdrop-blur-sm"
              style={{ 
                color: gameState.hasCompletedGame ? '#4CC2FF' : '#6A7280'
              }}
              side="top"
            >
              <p className={`font-medium ${gameState.hasCompletedGame ? 'text-blue-300' : 'text-gray-400'}`}>
                VERSA
              </p>
              {gameState.hasCompletedGame ? (
                <p className="text-sm opacity-90">One who has completed the journey and understands what it means to be Versa</p>
              ) : (
                <p className="text-sm text-gray-500">Complete the game to unlock this achievement</p>
              )}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      {/* Version info */}
      <div className="absolute bottom-4 right-4 text-xs text-white/50 z-20">
        Demo Version 0.1
      </div>
    </div>
  );
};

export default MainMenu;
