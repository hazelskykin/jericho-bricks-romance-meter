
import { useState, useEffect, useCallback } from 'react';
import { soundManager } from '@/utils/sound';

export type SignType = 'good' | 'bad';

export interface SignItem {
  type: SignType;
  index: number;
}

export type GameStage = 'gameplay' | 'results';
export type GameResult = 'success' | 'failure';

// Custom hook for Looking Signs minigame
export const useLookingSigns = (onComplete: (success: boolean) => void) => {
  // Game state
  const [gameStage, setGameStage] = useState<GameStage>('gameplay');
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds
  const [currentSign, setCurrentSign] = useState<SignItem | null>(null);
  const [score, setScore] = useState(0);
  const [incorrectScore, setIncorrectScore] = useState(0);
  const [gameResult, setGameResult] = useState<GameResult>('failure');
  const [gameOver, setGameOver] = useState(false);

  // Generate a random sign
  const generateRandomSign = useCallback(() => {
    const type: SignType = Math.random() > 0.5 ? 'good' : 'bad';
    const index = Math.floor(Math.random() * 3); // 0, 1, or 2 for the three signs of each type
    return { type, index };
  }, []);

  // Initialize with a random sign
  useEffect(() => {
    if (gameStage === 'gameplay' && !currentSign) {
      setCurrentSign(generateRandomSign());
      // Play sorting sound effect when sign appears
      soundManager.playSFX('lookingSigns-clue-found');
    }
  }, [gameStage, currentSign, generateRandomSign]);

  // Timer countdown
  useEffect(() => {
    if (gameStage !== 'gameplay' || gameOver) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStage, gameOver]);

  // End game function
  const endGame = useCallback(() => {
    setGameOver(true);
    
    // Determine if player won based on score
    const success = score > incorrectScore;
    setGameResult(success ? 'success' : 'failure');
    
    // Show results
    setGameStage('results');
  }, [score, incorrectScore]);

  // Handle sign sorting
  const handleSignSort = useCallback((direction: 'left' | 'right') => {
    if (!currentSign || gameOver) return;

    const isCorrect = 
      (currentSign.type === 'good' && direction === 'right') || 
      (currentSign.type === 'bad' && direction === 'left');

    // Play appropriate sound effect
    if (isCorrect) {
      soundManager.playSFX('lookingSigns-sign-sorted');
      setScore(prev => prev + 1);
    } else {
      soundManager.playSFX('lookingSigns-sort-wrong');
      setIncorrectScore(prev => prev + 1);
    }
    
    // Generate next sign
    setCurrentSign(generateRandomSign());
  }, [currentSign, gameOver, generateRandomSign]);

  // Handle game completion
  const handleGameComplete = useCallback(() => {
    const success = gameResult === 'success';
    onComplete(success);
  }, [gameResult, onComplete]);

  return {
    gameStage,
    timeRemaining,
    currentSign,
    score,
    incorrectScore,
    handleSignSort,
    gameResult,
    handleGameComplete
  };
};
