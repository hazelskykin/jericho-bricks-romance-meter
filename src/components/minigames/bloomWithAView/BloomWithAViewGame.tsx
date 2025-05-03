
import React from 'react';
import MinigameContainer from '../MinigameContainer';
import BloomWithAViewScene from './BloomWithAViewScene';
import BloomWithAViewItemList from './BloomWithAViewItemList';
import GameStatusMessage from '../common/GameStatusMessage';
import { useBloomWithAViewGame } from '@/hooks/useBloomWithAViewGame';
import { Button } from '@/components/ui/button';

interface BloomWithAViewGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const BloomWithAViewGame: React.FC<BloomWithAViewGameProps> = ({ onComplete, onExit }) => {
  const {
    availableItems,
    placedItems,
    selectedItem,
    score,
    targetScore,
    gameEnded,
    selectItem,
    placeItem,
    isGameWon
  } = useBloomWithAViewGame(onComplete);

  // This variable can be set to false when the game is under construction
  const isGameReady = true;
  
  return (
    <MinigameContainer
      title="Bloom with a View"
      instructions="Create beautiful garden displays by selecting flowers and placing them in the scene. Score points for harmonious arrangements!"
      onComplete={onComplete}
      onExit={onExit}
    >
      {isGameReady ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <BloomWithAViewItemList 
              items={availableItems} 
              selectedItemId={selectedItem?.id} 
              onSelectItem={selectItem} 
            />
          </div>
          
          <div className="flex-[2]">
            <BloomWithAViewScene 
              placedItems={placedItems} 
              selectedItem={selectedItem}
              onPlaceItem={placeItem}
              score={score}
              targetScore={targetScore}
            />
            
            {gameEnded && (
              <GameStatusMessage 
                status={isGameWon ? 'won' : 'lost'}
                winMessage="Beautiful job! Your garden display is stunning!"
                loseMessage="The garden isn't quite there yet. Keep working on your design skills!"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-[#1A1F2C]/80 p-8 rounded-lg border border-[#9b87f5]/30 max-w-md">
            <h3 className="text-2xl font-bold text-[#9b87f5] mb-4">Game Under Construction</h3>
            <p className="text-white/80 mb-6">
              We're still working on this minigame. Please check back soon!
            </p>
            <Button 
              variant="default" 
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              onClick={() => onComplete(true)}
            >
              Skip This Game
            </Button>
          </div>
        </div>
      )}
    </MinigameContainer>
  );
};

export default BloomWithAViewGame;
