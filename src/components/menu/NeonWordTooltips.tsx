
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Lock } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NeonWordTooltips: React.FC = () => {
  const { gameState } = useGame();
  
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* GNARUS Tooltip */}
      <div className="absolute top-[21%] left-[15%] pointer-events-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-36 h-36 cursor-help opacity-0 hover:opacity-10 bg-blue-500/30 rounded-sm transition-all duration-300"></div>
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
      <div className="absolute top-[33%] left-[13%] pointer-events-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-40 h-40 cursor-help opacity-0 hover:opacity-10 bg-blue-500/30 rounded-sm transition-all duration-300"></div>
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
      <div className="absolute top-[47%] left-[17%] pointer-events-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-36 h-36 cursor-help opacity-0 hover:opacity-10 bg-blue-500/30 rounded-sm transition-all duration-300"></div>
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
      <div className="absolute top-[61%] left-[14%] pointer-events-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-40 h-36 cursor-help opacity-0 hover:opacity-10 bg-blue-500/30 rounded-sm transition-all duration-300"></div>
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
      <div className="absolute bottom-[20%] left-[17%] pointer-events-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-36 h-36 cursor-help opacity-0 hover:opacity-10 bg-blue-500/30 rounded-sm transition-all duration-300">
              {gameState.hasCompletedGame && (
                <div className="absolute inset-0 animate-pulse-glow"></div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent 
            className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border border-blue-400/30 p-3 max-w-xs backdrop-blur-sm flex items-center justify-center gap-2"
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
