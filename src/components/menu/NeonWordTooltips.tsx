
import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Lock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NeonWordTooltips: React.FC = () => {
  const { gameState } = useGame();
  const isMobile = useIsMobile();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Responsive positioning calculations
  const getPosition = (basePosition: { top: string; left: string; width: string; height: string }) => {
    // Convert percentage values to numbers for calculations
    const top = parseFloat(basePosition.top);
    const left = parseFloat(basePosition.left);
    const width = parseFloat(basePosition.width);
    const height = parseFloat(basePosition.height);
    
    // Adjust for mobile
    if (isMobile) {
      return {
        top: `${top * 0.9}%`,
        left: `${left * 0.8}%`,
        width: `${width * 1.2}%`,
        height: `${height * 1.2}%`
      };
    }
    
    return basePosition;
  };

  // Base positions for desktop (percentages of viewport)
  const tooltipPositions = {
    gnarus: getPosition({ top: '24', left: '14', width: '12', height: '10' }),
    solvitor: getPosition({ top: '36', left: '12', width: '14', height: '10' }),
    diva: getPosition({ top: '48', left: '16', width: '10', height: '10' }),
    bellfox: getPosition({ top: '60', left: '13', width: '13', height: '10' }),
    versa: getPosition({ top: '72', left: '16', width: '10', height: '10' }),
  };
  
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* GNARUS Tooltip - Positioned to match tile */}
      <div 
        className="absolute pointer-events-auto" 
        style={{
          top: tooltipPositions.gnarus.top,
          left: tooltipPositions.gnarus.left,
          width: tooltipPositions.gnarus.width,
          height: tooltipPositions.gnarus.height,
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-full cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded-sm transition-all duration-300 border border-blue-400/0 hover:border-blue-400/50"></div>
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
      <div 
        className="absolute pointer-events-auto"
        style={{
          top: tooltipPositions.solvitor.top,
          left: tooltipPositions.solvitor.left,
          width: tooltipPositions.solvitor.width,
          height: tooltipPositions.solvitor.height,
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-full cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded-sm transition-all duration-300 border border-blue-400/0 hover:border-blue-400/50"></div>
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
      <div 
        className="absolute pointer-events-auto"
        style={{
          top: tooltipPositions.diva.top,
          left: tooltipPositions.diva.left,
          width: tooltipPositions.diva.width,
          height: tooltipPositions.diva.height,
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-full cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded-sm transition-all duration-300 border border-blue-400/0 hover:border-blue-400/50"></div>
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
      <div 
        className="absolute pointer-events-auto"
        style={{
          top: tooltipPositions.bellfox.top,
          left: tooltipPositions.bellfox.left,
          width: tooltipPositions.bellfox.width,
          height: tooltipPositions.bellfox.height,
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-full cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded-sm transition-all duration-300 border border-blue-400/0 hover:border-blue-400/50"></div>
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
      <div 
        className="absolute pointer-events-auto"
        style={{
          top: tooltipPositions.versa.top,
          left: tooltipPositions.versa.left,
          width: tooltipPositions.versa.width,
          height: tooltipPositions.versa.height,
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-full cursor-help opacity-0 hover:opacity-20 bg-blue-500/30 rounded-sm transition-all duration-300 border border-blue-400/0 hover:border-blue-400/50">
              {gameState.hasCompletedGame && (
                <div className="absolute inset-0 animate-pulse-glow"></div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent 
            className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border border-blue-400/30 p-3 backdrop-blur-sm flex items-center justify-center"
            style={{ 
              color: gameState.hasCompletedGame ? '#4CC2FF' : '#6A7280'
            }}
            side="top"
          >
            {gameState.hasCompletedGame ? (
              <>
                <p className="font-medium text-blue-300">VERSA</p>
                <p className="text-sm opacity-90">One who has completed the journey</p>
              </>
            ) : (
              <Lock className="text-gray-500" size={18} />
            )}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default NeonWordTooltips;
