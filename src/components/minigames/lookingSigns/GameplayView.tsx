
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SignType, SignItem } from './useLookingSigns';

interface GameplayViewProps {
  currentSign: SignItem | null;
  timeRemaining: number;
  score: number;
  incorrectScore: number;
  onSortSign: (direction: 'left' | 'right') => void;
}

const GameplayView: React.FC<GameplayViewProps> = ({
  currentSign,
  timeRemaining,
  score,
  incorrectScore,
  onSortSign
}) => {
  // Helper function to get sprite position based on sign type and index
  const getSignSpritePosition = (type: SignType, index: number): string => {
    // Top row (0%) for good signs, bottom row (50%) for bad signs
    const yPos = type === 'good' ? '0%' : '50%';
    // Each sign takes up 33.33% width
    const xPos = `${index * 33.33}%`;
    return `${xPos} ${yPos}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
      {/* Timer and Score Display */}
      <div className="w-full flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-green-400">Good: {score}</span>
        </div>
        <div className="px-4 py-2 bg-[#1A1F2C] rounded-md border border-[#9b87f5]/30">
          <span className="text-xl font-mono">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
        </div>
        <div className="text-2xl font-bold">
          <span className="text-red-400">Bad: {incorrectScore}</span>
        </div>
      </div>

      {/* Game Area with Background */}
      <div 
        className="w-full h-80 relative rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: 'url(/assets/minigames/winter/lookingSigns/signs-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Sign Display */}
        {currentSign && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-40 h-40 bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/assets/minigames/winter/lookingSigns/sign-clues.png)',
              backgroundPosition: getSignSpritePosition(currentSign.type, currentSign.index),
              backgroundSize: '300% 200%',
            }}
          />
        )}
      </div>

      {/* Sorting Buttons */}
      <div className="flex justify-center gap-12 mt-4">
        <Button
          variant="destructive"
          className="w-40 h-16 text-xl flex items-center gap-2"
          onClick={() => onSortSign('left')}
        >
          <ArrowLeft className="w-6 h-6" />
          Bad Omen
        </Button>
        
        <Button
          variant="default"
          className="w-40 h-16 text-xl bg-green-600 hover:bg-green-700 flex items-center gap-2"
          onClick={() => onSortSign('right')}
        >
          Good Luck
          <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default GameplayView;
