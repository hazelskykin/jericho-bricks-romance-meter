
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MinigameContainer from '../MinigameContainer';
import BloomWithAViewScene from './BloomWithAViewScene';
import BloomWithAViewItemList from './BloomWithAViewItemList';
import GameStatusMessage from '../common/GameStatusMessage';
import { useBloomWithAViewGame } from '@/hooks/useBloomWithAViewGame';

interface BloomWithAViewGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const BloomWithAViewGame: React.FC<BloomWithAViewGameProps> = ({ onComplete, onExit }) => {
  const {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    timeRemaining,
    handleSceneClick,
    handleHintClick
  } = useBloomWithAViewGame(onComplete);

  return (
    <MinigameContainer
      title="Bloom with a View"
      instructions="Find all 5 hidden items in the garden art fair. Click around to discover them!"
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center">
        {/* Timer */}
        <div className="w-full mb-2 flex justify-between items-center">
          <span className="text-white">Time: {timeRemaining}s</span>
          <span className="text-white">
            Items Found: {hiddenItems.filter(item => item.found).length}/{hiddenItems.length}
          </span>
        </div>
        
        {/* Items to find list */}
        <BloomWithAViewItemList items={hiddenItems} />
        
        {/* Garden scene */}
        <BloomWithAViewScene 
          hiddenItems={hiddenItems} 
          clickPosition={clickPosition}
          showHint={showHint}
          onClick={handleSceneClick}
        />
        
        {/* Hint button */}
        <div className="mt-4">
          <Button
            variant="outline"
            className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
            onClick={handleHintClick}
            disabled={hintCooldown > 0}
          >
            {hintCooldown > 0 ? `Hint (${hintCooldown}s)` : 'Get Hint'}
          </Button>
        </div>
        
        {/* Game completion message */}
        {gameComplete && (
          <GameStatusMessage 
            status={hiddenItems.every(item => item.found) ? "won" : "lost"}
            winMessage="Great job! You found all the hidden items in the garden."
            loseMessage="Time's up! You didn't find all the hidden items."
          />
        )}
      </div>
    </MinigameContainer>
  );
};

export default BloomWithAViewGame;
