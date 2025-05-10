
import React, { useState, useEffect, useRef, useCallback } from 'react';
import MudFlingArena from './MudFlingArena';
import MudFlingControls from './MudFlingControls';
import GameStatusMessage from '../common/GameStatusMessage';
import { SoundToggle } from '../common/SoundToggle';
import { useMudBalls } from './useMudBalls';
import { useCharacterAI } from './useCharacterAI';
import { soundManager } from '@/utils/soundEffects';
import { Button } from '@/components/ui/button';
import { MudCharacterPosition } from './types';

type MudGameStatus = 'ready' | 'countdown' | 'playing' | 'ended';

interface MudFlingGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const MudFlingGame: React.FC<MudFlingGameProps> = ({ onComplete, onExit }) => {
  const [gameStatus, setGameStatus] = useState<MudGameStatus>('ready');
  const [countdown, setCountdown] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [muted, setMuted] = useState<boolean>(false);
  
  const playerPosition = useRef<MudCharacterPosition>({ x: 150, y: 380 });
  const opponentPosition = useRef<MudCharacterPosition>({ x: 450, y: 380 });
  
  // Initialize mudball system
  const {
    playerMudballs,
    opponentMudballs,
    throwMudball,
    updateMudballs,
    resetMudballs
  } = useMudBalls();
  
  // Initialize opponent AI
  const { updateOpponent } = useCharacterAI({
    playerPosition,
    opponentPosition,
    throwMudball: (x, y) => {
      if (gameStatus === 'playing') {
        throwMudball('opponent', opponentPosition.current.x, opponentPosition.current.y, x, y);
        if (!muted) soundManager.playSFX('mud-throw');
      }
    }
  });

  // Game logic
  useEffect(() => {
    let gameLoop: number | null = null;
    let countdownTimer: number | null = null;
    let gameTimer: number | null = null;

    const startCountdown = () => {
      setGameStatus('countdown');
      setCountdown(3);
      
      countdownTimer = window.setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer!);
            startGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    const startGame = () => {
      setGameStatus('playing');
      resetMudballs();
      setScore(0);
      setTimeLeft(60);
      
      // Game timer
      gameTimer = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Game loop
      gameLoop = window.setInterval(() => {
        updateMudballs(
          playerPosition.current,
          opponentPosition.current,
          (hit) => {
            if (hit === 'player') {
              // Player was hit
              setScore(prev => Math.max(0, prev - 5));
              if (!muted) soundManager.playSFX('mud-hit');
            } else {
              // Opponent was hit
              setScore(prev => prev + 10);
              if (!muted) soundManager.playSFX('mud-hit');
            }
          }
        );
        
        updateOpponent();
      }, 1000 / 60); // 60 FPS
    };

    const endGame = () => {
      setGameStatus('ended');
      if (gameLoop) clearInterval(gameLoop);
      if (gameTimer) clearInterval(gameTimer);
      // Submit final score
      onComplete(score);
    };

    // Start game when component mounts
    startCountdown();

    return () => {
      // Cleanup timers
      if (gameLoop) clearInterval(gameLoop);
      if (countdownTimer) clearInterval(countdownTimer);
      if (gameTimer) clearInterval(gameTimer);
    };
  }, [muted, onComplete, updateMudballs, updateOpponent, resetMudballs, score]);

  // Handle player movement and mud throwing
  const handlePlayerMove = useCallback((x: number, y: number) => {
    if (gameStatus === 'playing') {
      playerPosition.current = { x, y };
    }
  }, [gameStatus]);

  const handlePlayerThrow = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (gameStatus === 'playing') {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      throwMudball('player', playerPosition.current.x, playerPosition.current.y, x, y);
      if (!muted) soundManager.playSFX('mud-throw');
    }
  }, [gameStatus, muted, throwMudball]);

  const toggleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  return (
    <div className="mud-fling-game flex flex-col items-center">
      <div className="relative mb-4 flex justify-between w-full max-w-3xl px-4">
        <div>
          <span className="text-white font-bold">Score: {score}</span>
          <span className="ml-4 text-white font-bold">Time: {timeLeft}s</span>
        </div>
        <SoundToggle showMusicToggle={false} />
      </div>

      {gameStatus === 'countdown' && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black bg-opacity-60">
          <div className="text-white text-4xl font-bold">{countdown}</div>
        </div>
      )}
      
      {gameStatus === 'ended' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black bg-opacity-70">
          <h2 className="text-white text-2xl mb-4">Game Over!</h2>
          <p className="text-white mb-4">Final Score: {score}</p>
          <div className="flex space-x-4">
            <Button onClick={() => onComplete(score)}>Continue</Button>
            <Button variant="outline" onClick={onExit}>Exit</Button>
          </div>
        </div>
      )}

      <MudFlingArena 
        playerPosition={playerPosition.current}
        opponentPosition={opponentPosition.current}
        playerMudballs={playerMudballs}
        opponentMudballs={opponentMudballs}
        onPlayerMove={handlePlayerMove}
        onArenaClick={handlePlayerThrow}
      />

      <MudFlingControls 
        timeRemaining={timeLeft}
        team1Score={score}
        team2Score={0}
      />
    </div>
  );
};

export default MudFlingGame;
