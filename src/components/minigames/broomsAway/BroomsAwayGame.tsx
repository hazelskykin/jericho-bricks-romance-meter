
import React from 'react';
import MinigameContainer from '../MinigameContainer';
import BroomsAwayGrid from './BroomsAwayGrid';
import BroomsAwayControls from './BroomsAwayControls';
import GameStatusMessage from '../common/GameStatusMessage';
import { useBroomsAwayGame, Cell } from '@/hooks/useBroomsAwayGame';
import { Button } from '@/components/ui/button';

// Re-export the Cell type for BroomsAwayGrid to use
export type { Cell };

interface BroomsAwayGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const BroomsAwayGame: React.FC<BroomsAwayGameProps> = ({ onComplete, onExit }) => {
  // Use the custom hook to manage game state and logic
  const {
    grid,
    cols,
    featherDusters,
    brokenSpots,
    maxBrokenSpots,
    cursorType,
    gameStatus,
    toggleCursor,
    handleCellClick,
    getCursorClass
  } = useBroomsAwayGame(onComplete);
  
  // This variable can be set to false when the game is under construction
  const isGameReady = true; 
  
  return (
    <MinigameContainer
      title="Brooms Away!"
      instructions="Sweep away the dust covering the city without breaking sensitive tech spots. Use feather dusters to mark sensitive spots."
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center">
        {isGameReady ? (
          <>
            <BroomsAwayControls 
              featherDusters={featherDusters}
              brokenSpots={brokenSpots}
              maxBrokenSpots={maxBrokenSpots}
              cursorType={cursorType}
              toggleCursor={toggleCursor}
            />
            
            <BroomsAwayGrid 
              grid={grid}
              cols={cols}
              cursorClass={getCursorClass()}
              onCellClick={handleCellClick}
            />
            
            {gameStatus !== 'playing' && (
              <GameStatusMessage 
                status={gameStatus}
                winMessage="Excellent job keeping the city clean while protecting sensitive tech!"
                loseMessage="Too many sensitive tech spots were broken. Better luck next time!"
              />
            )}
          </>
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
      </div>
    </MinigameContainer>
  );
};

export default BroomsAwayGame;
