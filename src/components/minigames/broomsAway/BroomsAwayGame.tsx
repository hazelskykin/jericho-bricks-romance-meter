
import React from 'react';
import MinigameContainer from '../MinigameContainer';
import BroomsAwayGrid from './BroomsAwayGrid';
import BroomsAwayControls from './BroomsAwayControls';
import GameStatusMessage from '../common/GameStatusMessage';
import { useBroomsAwayGame, Cell } from '@/hooks/useBroomsAwayGame';

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
  
  return (
    <MinigameContainer
      title="Brooms Away!"
      instructions="Sweep away the dust covering the city without breaking sensitive tech spots. Use feather dusters to mark sensitive spots."
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center">
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
      </div>
    </MinigameContainer>
  );
};

export default BroomsAwayGame;
