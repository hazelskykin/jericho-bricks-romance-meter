
import { useState, useEffect, useRef } from 'react';
import { CharacterId } from '@/types/game';
import { soundManager } from '@/utils/soundEffects';
import { useMinigameTimer } from '../common/useMinigameTimer';

export interface SongOption {
  id: string;
  title: string;
  artist: string;
  character: CharacterId;
  color: string;
  description: string;
}

export const DEFAULT_SONGS: SongOption[] = [
  {
    id: 'xavier-song',
    title: 'Digital Harmony',
    artist: 'Byte Collective',
    character: 'xavier',
    color: '#4CC2FF',
    description: 'A smooth electronic melody with ambient undertones.'
  },
  {
    id: 'navarre-song',
    title: 'Social Butterfly',
    artist: 'The Networkers',
    character: 'navarre',
    color: '#FFB347',
    description: 'An upbeat pop track with catchy hooks.'
  },
  {
    id: 'etta-song',
    title: 'Ambitious Heights',
    artist: 'Power Dynamics',
    character: 'etta',
    color: '#FF5E5B',
    description: 'A driving rock anthem with powerful vocals.'
  },
  {
    id: 'senara-song',
    title: 'Analytical Symphony',
    artist: 'Mind Collective',
    character: 'senara',
    color: '#9C89FF',
    description: 'A complex instrumental piece with unexpected patterns.'
  }
];

export function useSerenade(onComplete: (success: boolean) => void) {
  const [selectedSong, setSelectedSong] = useState<SongOption | null>(null);
  const [gameStage, setGameStage] = useState<'selection' | 'playing' | 'results'>('selection');
  const [score, setScore] = useState(0);
  const [maxScore] = useState(100);
  const [beats, setBeats] = useState<number[]>([]);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [playerTaps, setPlayerTaps] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const beatBarRef = useRef<HTMLDivElement>(null);
  
  const { timeRemaining, startTimer } = useMinigameTimer({
    initialTime: 30,
    onTimeUp: () => endGame(),
    autoStart: false
  });

  useEffect(() => {
    if (selectedSong && gameStage === 'playing') {
      // Generate 20 beats at random positions
      const newBeats = Array.from({ length: 20 }, () => 
        Math.floor(Math.random() * 100)
      ).sort((a, b) => a - b);
      setBeats(newBeats);
      
      // Start the game timer
      startTimer();

      // Start the beat generation
      gameLoopRef.current = setInterval(() => {
        setCurrentBeatIndex(prev => {
          if (prev >= beats.length - 1) {
            clearInterval(gameLoopRef.current!);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [selectedSong, gameStage, beats.length, startTimer]);

  const handleSongSelect = (song: SongOption) => {
    setSelectedSong(song);
    soundManager.play('click');
    setGameStage('playing');
  };

  const handleTap = () => {
    if (gameStage !== 'playing') return;
    
    const currentBeat = beats[currentBeatIndex];
    const currentPosition = (timeRemaining % 3) * 100 / 3;
    const distance = Math.abs(currentPosition - currentBeat);
    
    // Calculate accuracy (closer to 0 is better)
    const accuracy = Math.max(0, 100 - distance * 2);
    
    setPlayerTaps(prev => [...prev, currentPosition]);
    setScore(prev => Math.min(maxScore, prev + Math.floor(accuracy / 10)));
    
    // Show feedback
    if (accuracy > 80) {
      setFeedbackText('Perfect!');
      soundManager.play('win');
    } else if (accuracy > 50) {
      setFeedbackText('Good!');
      soundManager.play('click');
    } else {
      setFeedbackText('Miss!');
      soundManager.play('error');
    }
    
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 500);
  };

  const endGame = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    setGameStage('results');
  };

  const completeGame = () => {
    // 70+ is considered a success
    const success = score >= 70;
    onComplete(success);
  };

  return {
    selectedSong,
    gameStage,
    score,
    maxScore,
    beats,
    currentBeatIndex,
    playerTaps,
    timeRemaining,
    showFeedback,
    feedbackText,
    beatBarRef,
    handleSongSelect,
    handleTap,
    completeGame,
    endGame
  };
}
