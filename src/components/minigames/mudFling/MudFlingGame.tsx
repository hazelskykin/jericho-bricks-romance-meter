
import React, { useState, useEffect } from 'react';
import MinigameContainer from '../MinigameContainer';
import MudFlingArena from './MudFlingArena';
import MudFlingControls from './MudFlingControls';
import GameStatusMessage from '../common/GameStatusMessage';
import { Character, Position } from './types';
import { useMudFlingGame } from '@/hooks/useMudFlingGame';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useGame } from '@/context/GameContext';

interface MudFlingGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const MudFlingGame: React.FC<MudFlingGameProps> = ({ onComplete, onExit }) => {
  const { gameState } = useGame();
  const {
    timeRemaining,
    fountainIntensity,
    mudBalls,
    characters,
    selectedMudBall,
    team1Score,
    team2Score,
    gameEnded,
    initialized,
    handleMudBallClick,
    handleGameAreaClick,
    initializeCharacters,
    handleExit
  } = useMudFlingGame(onComplete, onExit);
  
  // Initialize characters once when component mounts
  useEffect(() => {
    // Initialize characters with game state character data
    initializeCharacters(gameState.characters);
  }, []);
  
  // Determine the winner based on team scores
  const isPlayerWinner = team1Score > team2Score;
  
  // This variable can be set to false when the game is under construction
  const isGameReady = true;
  
  // If characters aren't initialized yet, show loading
  if (!initialized) {
    return (
      <MinigameContainer
        title="Mud Fling"
        instructions="Loading the game..."
        onComplete={onComplete}
        onExit={onExit}
      >
        <div className="flex flex-col items-center justify-center p-8 h-full">
          <Loader2 className="h-16 w-16 animate-spin text-[#9b87f5] mb-4" />
          <p className="text-white text-lg">Preparing mud fight...</p>
        </div>
      </MinigameContainer>
    );
  }
  
  return (
    <MinigameContainer
      title="Mud Fling"
      instructions="Select a mud ball and then click where you want to throw it. Hit the opposing team to score points!"
      onComplete={onComplete}
      onExit={handleExit}
    >
      <div className="flex flex-col items-center">
        {isGameReady ? (
          <>
            <MudFlingControls 
              timeRemaining={timeRemaining}
              fountainIntensity={fountainIntensity}
              team1Score={team1Score}
              team2Score={team2Score}
            />
            
            <MudFlingArena 
              mudBalls={mudBalls}
              characters={characters}
              selectedMudBall={selectedMudBall}
              fountainIntensity={fountainIntensity}
              characterColors={{
                'maven': { color: '#0D98BA' },
                'xavier': { color: '#4CC2FF' },
                'navarre': { color: '#FFB347' },
                'etta': { color: '#FF5E5B' },
                'senara': { color: '#9C89FF' }
              }}
              onMudBallClick={handleMudBallClick}
              onGameAreaClick={handleGameAreaClick}
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
