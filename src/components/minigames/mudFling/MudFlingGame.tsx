
import React, { useState, useEffect } from 'react';
import MinigameContainer from '../MinigameContainer';
import MudFlingArena from './MudFlingArena';
import MudFlingControls from './MudFlingControls';
import GameStatusMessage from '../common/GameStatusMessage';
import { MudBallType, CharacterType } from './types';
import { useMudFlingGame } from '@/hooks/useMudFlingGame';
import { Button } from '@/components/ui/button';

interface MudFlingGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const MudFlingGame: React.FC<MudFlingGameProps> = ({ onComplete, onExit }) => {
  const {
    playerCharacter,
    aiCharacter,
    selectedMudBall,
    playerScore,
    aiScore,
    gameEnded,
    winScore,
    mudBalls,
    mudBallsLeft,
    throwMudBall,
    selectMudBall,
    isPlayerWinner
  } = useMudFlingGame(onComplete);
  
  // This variable can be set to false when the game is under construction
  const isGameReady = true;
  
  return (
    <MinigameContainer
      title="Mud Fling"
      instructions="Select a mud ball and then click where you want to throw it. Hit the opposing team to score points!"
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center">
        {isGameReady ? (
          <>
            <MudFlingControls 
              mudBalls={mudBalls}
              mudBallsLeft={mudBallsLeft}
              selectedMudBall={selectedMudBall}
              playerScore={playerScore}
              aiScore={aiScore}
              winScore={winScore}
              onSelectMudBall={selectMudBall}
            />
            
            <MudFlingArena 
              playerCharacter={playerCharacter}
              aiCharacter={aiCharacter}
              selectedMudBall={selectedMudBall}
              onThrowMudBall={throwMudBall}
              gameEnded={gameEnded}
            />
            
            {gameEnded && (
              <GameStatusMessage 
                status={isPlayerWinner ? 'won' : 'lost'}
                winMessage="You won the mud fling competition! The crowd goes wild!"
                loseMessage="Better luck next time! You put up a good fight!"
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

export default MudFlingGame;
