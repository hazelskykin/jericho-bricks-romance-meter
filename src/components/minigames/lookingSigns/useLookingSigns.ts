
import { useState, useEffect, useCallback, useRef } from 'react';
import { soundManager } from '@/utils/sound';

// Types for sign items
export type SignType = 'good' | 'bad';

export interface SignItem {
  id: number;
  type: SignType;
  index: number;
  name: string;
}

// Define sign types
const goodSigns: SignItem[] = [
  { id: 1, type: 'good', index: 0, name: 'coin' },
  { id: 2, type: 'good', index: 1, name: 'bird' },
  { id: 3, type: 'good', index: 2, name: 'heart charm' },
];

const badSigns: SignItem[] = [
  { id: 4, type: 'bad', index: 0, name: 'broken clock' },
  { id: 5, type: 'bad', index: 1, name: 'black cat' },
  { id: 6, type: 'bad', index: 2, name: 'evil eye' },
];

// All available signs
const allSigns = [...goodSigns, ...badSigns];

// Define game stages
type GameStage = 'gameplay' | 'results';

export function useLookingSigns(onComplete: (success: boolean) => void) {
  // Game state
  const [gameStage, setGameStage] = useState<GameStage>('gameplay');
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds
  const [currentSign, setCurrentSign] = useState<SignItem | null>(null);
  const [score, setScore] = useState(0);
  const [incorrectScore, setIncorrectScore] = useState(0);
  const [gameResult, setGameResult] = useState<'win' | 'lose'>('lose');
  const [gameEnded, setGameEnded] = useState(false);
  
  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameCompleted = useRef(false);
  
  // Generate a random sign
  const generateRandomSign = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * allSigns.length);
    return allSigns[randomIndex];
  }, []);
  
  // Initialize first sign
  useEffect(() => {
    setCurrentSign(generateRandomSign());
  }, [generateRandomSign]);
  
  // Handle game timer
  useEffect(() => {
    if (gameStage !== 'gameplay') return;
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // End game when time runs out
          clearInterval(timerRef.current!);
          handleGameEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStage]);
  
  // Handle game end
  const handleGameEnd = useCallback(() => {
    setGameStage('results');
    const isWin = score > incorrectScore;
    setGameResult(isWin ? 'win' : 'lose');
  }, [score, incorrectScore]);
  
  // Handle sign sorting
  const handleSignSort = useCallback((direction: 'left' | 'right') => {
    if (!currentSign) return;
    
    // Check if sort direction matches sign type
    const isCorrect = 
      (direction === 'right' && currentSign.type === 'good') || 
      (direction === 'left' && currentSign.type === 'bad');
    
    // Play appropriate sound
    if (isCorrect) {
      soundManager.play('lookingSigns-sign-sorted');
      setScore(prev => prev + 1);
    } else {
      soundManager.play('lookingSigns-sort-wrong');
      setIncorrectScore(prev => prev + 1);
    }
    
    // Generate new sign
    setCurrentSign(generateRandomSign());
  }, [currentSign, generateRandomSign]);
  
  // Handle game completion
  const handleGameComplete = useCallback(() => {
    if (gameCompleted.current) return;
    gameCompleted.current = true;
    
    // Call onComplete with success flag based on game result
    onComplete(gameResult === 'win');
  }, [onComplete, gameResult]);
  
  return {
    gameStage,
    timeRemaining,
    currentSign,
    score,
    incorrectScore,
    gameResult,
    handleSignSort,
    handleGameComplete
  };
}
