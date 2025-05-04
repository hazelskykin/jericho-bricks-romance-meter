
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MinigameContainer from '../MinigameContainer';
import { CharacterId } from '@/types/game';
import { soundManager } from '@/utils/soundEffects';

interface SerenadeGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

interface SongOption {
  id: string;
  title: string;
  artist: string;
  character: CharacterId;
  color: string;
  description: string;
}

const songs: SongOption[] = [
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

const SerenadeGame: React.FC<SerenadeGameProps> = ({ onComplete, onExit }) => {
  const [selectedSong, setSelectedSong] = useState<SongOption | null>(null);
  const [gameStage, setGameStage] = useState<'selection' | 'playing' | 'results'>('selection');
  const [score, setScore] = useState(0);
  const [maxScore] = useState(100);
  const [beats, setBeats] = useState<number[]>([]);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds game
  const [playerTaps, setPlayerTaps] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const beatBarRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random beat pattern when song is selected
  useEffect(() => {
    if (selectedSong && gameStage === 'playing') {
      // Generate 20 beats at random positions
      const newBeats = Array.from({ length: 20 }, () => 
        Math.floor(Math.random() * 100)
      ).sort((a, b) => a - b);
      setBeats(newBeats);
      
      // Start the game timer
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

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
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [selectedSong, gameStage]);

  const handleSongSelect = (song: SongOption) => {
    setSelectedSong(song);
    soundManager.playSound('click');
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
      soundManager.playSound('win');
    } else if (accuracy > 50) {
      setFeedbackText('Good!');
      soundManager.playSound('click');
    } else {
      setFeedbackText('Miss!');
      soundManager.playSound('error');
    }
    
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 500);
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    setGameStage('results');
  };

  const completeGame = () => {
    // 70+ is considered a success
    const success = score >= 70;
    onComplete(success);
  };

  return (
    <MinigameContainer
      title="Serenade: Rhythm Game"
      instructions={
        gameStage === 'selection' 
          ? "Choose a music stage to visit during the festival."
          : gameStage === 'playing'
          ? "Tap in rhythm with the beats! Press the button when the indicator aligns with the beat marker."
          : "Performance completed!"
      }
      onComplete={completeGame}
      onExit={onExit}
    >
      <div className="flex flex-col items-center gap-6">
        {gameStage === 'selection' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {songs.map(song => (
              <motion.div
                key={song.id}
                className="p-4 rounded-lg border cursor-pointer"
                style={{ borderColor: `${song.color}50`, backgroundColor: `${song.color}10` }}
                whileHover={{ backgroundColor: `${song.color}30`, y: -5 }}
                onClick={() => handleSongSelect(song)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: song.color }}>
                    <Music size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: song.color }}>{song.title}</h3>
                    <p className="text-gray-300">{song.artist}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">{song.description}</p>
              </motion.div>
            ))}
          </div>
        )}

        {gameStage === 'playing' && selectedSong && (
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="mb-4 text-xl font-semibold" style={{ color: selectedSong.color }}>
              {selectedSong.title} - {selectedSong.artist}
            </div>

            <div className="w-full bg-gray-800 h-8 rounded-lg relative overflow-hidden" ref={beatBarRef}>
              {/* Current beat indicator */}
              {beats.map((beat, index) => (
                index === currentBeatIndex && (
                  <motion.div
                    key={`beat-${index}`}
                    className="absolute top-0 h-full w-4 bg-white opacity-70 rounded"
                    style={{ left: `${beat}%` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )
              ))}
              
              {/* Player tap markers */}
              {playerTaps.map((position, index) => (
                <div
                  key={`tap-${index}`}
                  className="absolute top-0 h-full w-2"
                  style={{ 
                    left: `${position}%`,
                    backgroundColor: position === beats[index] ? '#4ade80' : '#ef4444'
                  }}
                />
              ))}
            </div>

            <div className="text-2xl my-4">
              Time: {timeRemaining}s
            </div>

            {showFeedback && (
              <motion.div
                className="text-3xl font-bold"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                style={{ color: feedbackText === 'Perfect!' ? '#4ade80' : feedbackText === 'Good!' ? '#facc15' : '#ef4444' }}
              >
                {feedbackText}
              </motion.div>
            )}

            <div className="text-xl mt-2">
              Score: {score}/{maxScore}
            </div>

            <Button 
              className="mt-6 text-2xl px-8 py-6 rounded-full"
              style={{ backgroundColor: selectedSong.color }}
              onClick={handleTap}
            >
              <HeadphonesIcon className="mr-2" /> TAP
            </Button>
          </div>
        )}

        {gameStage === 'results' && selectedSong && (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-4" style={{ color: selectedSong.color }}>
              {selectedSong.title}
            </div>
            
            <div className="flex items-center justify-center my-4">
              <div className="text-4xl font-bold">{score}</div>
              <div className="text-gray-400 ml-2">/ {maxScore}</div>
            </div>
            
            <div className="text-xl mb-6">
              {score >= 90 ? "Amazing performance!" : 
               score >= 70 ? "Great rhythm!" : 
               score >= 50 ? "Not bad!" : 
               "Keep practicing!"}
            </div>
            
            <Button 
              onClick={completeGame}
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </MinigameContainer>
  );
};

export default SerenadeGame;
