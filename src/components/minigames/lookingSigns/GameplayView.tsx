
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SignType, SignItem } from './useLookingSigns';

interface GameplayViewProps {
  currentSign: SignItem | null;
  timeRemaining: number;
  score: number;
  incorrectScore: number;
  onSortSign: (direction: 'left' | 'right') => void;
  signAnimating: boolean;
}

const GameplayView: React.FC<GameplayViewProps> = ({
  currentSign,
  timeRemaining,
  score,
  incorrectScore,
  onSortSign,
  signAnimating
}) => {
  // Helper function to get sign image path based on sign type and index
  const getSignImagePath = (type: SignType, index: number): string => {
    const signImages = {
      good: [
        '/assets/minigames/winter/lookingSigns/sign-clues-coin.png',
        '/assets/minigames/winter/lookingSigns/sign-clues-bird.png',
        '/assets/minigames/winter/lookingSigns/sign-clues-heartcharm.png'
      ],
      bad: [
        '/assets/minigames/winter/lookingSigns/sign-clues-brokenclock.png',
        '/assets/minigames/winter/lookingSigns/sign-clues-blackcat.png',
        '/assets/minigames/winter/lookingSigns/sign-clues-evileye.png'
      ]
    };
    
    return signImages[type][index] || signImages.good[0];
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
        className="w-full h-80 relative rounded-lg overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundImage: 'url(/assets/minigames/winter/lookingSigns/signs-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Sign Display with Animation */}
        <AnimatePresence mode="wait">
          {currentSign && !signAnimating && (
            <motion.div
              key={`${currentSign.type}-${currentSign.index}-${Date.now()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="w-40 h-40 bg-contain bg-center bg-no-repeat mb-4"
              style={{
                backgroundImage: `url(${getSignImagePath(currentSign.type, currentSign.index)})`,
              }}
            />
          )}
        </AnimatePresence>
        
        {/* Sorting Buttons - Moved closer to the sign */}
        <div className="flex justify-center gap-12 mt-2">
          <Button
            variant="destructive"
            className="w-40 h-16 text-xl flex items-center gap-2"
            onClick={() => onSortSign('left')}
            disabled={signAnimating}
          >
            <ArrowLeft className="w-6 h-6" />
            Bad Omen
          </Button>
          
          <Button
            variant="default"
            className="w-40 h-16 text-xl bg-green-600 hover:bg-green-700 flex items-center gap-2"
            onClick={() => onSortSign('right')}
            disabled={signAnimating}
          >
            Good Luck
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameplayView;
