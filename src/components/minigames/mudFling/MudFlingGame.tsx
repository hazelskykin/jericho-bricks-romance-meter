
import React, { useEffect, useRef } from 'react';
import MinigameContainer from '../MinigameContainer';
import { useGame } from '@/context/GameContext';
import MudFlingArena from './MudFlingArena';
import MudFlingControls from './MudFlingControls';
import GameStatusMessage from '../common/GameStatusMessage';
import { useMudFlingGame } from '@/hooks/useMudFlingGame';

interface MudFlingGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const MudFlingGame: React.FC<MudFlingGameProps> = ({ onComplete, onExit }) => {
  const { gameState } = useGame();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const {
    timeRemaining,
    fountainIntensity,
    mudBalls,
    characters,
    selectedMudBall,
    team1Score,
    team2Score,
    gameEnded,
    handleMudBallClick,
    handleGameAreaClick,
    initializeCharacters
  } = useMudFlingGame(onComplete);

  // Initialize characters based on game state
  useEffect(() => {
    initializeCharacters(gameState.characters);
  }, []);
  
  return (
    <MinigameContainer
      title="Mud Fling"
      instructions="Select a mud ball and then click where you want to throw it. Hit the opposing team to score points!"
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center">
        <MudFlingControls
          timeRemaining={timeRemaining}
          fountainIntensity={fountainIntensity}
          team1Score={team1Score}
          team2Score={team2Score}
        />
        
        <MudFlingArena
          ref={gameAreaRef}
          mudBalls={mudBalls}
          characters={characters}
          selectedMudBall={selectedMudBall}
          fountainIntensity={fountainIntensity}
          characterColors={gameState.characters}
          onMudBallClick={handleMudBallClick}
          onGameAreaClick={handleGameAreaClick}
        />
        
        {gameEnded && (
          <GameStatusMessage 
            status={team1Score > team2Score ? 'won' : 'lost'}
            winMessage={`Final Score: ${team1Score} - ${team2Score}`}
            loseMessage={`Final Score: ${team1Score} - ${team2Score}`}
          />
        )}
      </div>
    </MinigameContainer>
  );
};

export default MudFlingGame;
