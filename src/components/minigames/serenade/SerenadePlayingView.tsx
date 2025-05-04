
import React from 'react';
import { motion } from 'framer-motion';
import { HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SongOption } from './useSerenade';

interface SerenadePlayingViewProps {
  song: SongOption;
  beats: number[];
  currentBeatIndex: number;
  playerTaps: number[];
  timeRemaining: number;
  showFeedback: boolean;
  feedbackText: string;
  score: number;
  maxScore: number;
  beatBarRef: React.RefObject<HTMLDivElement>;
  onTap: () => void;
}

const SerenadePlayingView: React.FC<SerenadePlayingViewProps> = ({
  song,
  beats,
  currentBeatIndex,
  playerTaps,
  timeRemaining,
  showFeedback,
  feedbackText,
  score,
  maxScore,
  beatBarRef,
  onTap
}) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="mb-4 text-xl font-semibold" style={{ color: song.color }}>
        {song.title} - {song.artist}
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
        style={{ backgroundColor: song.color }}
        onClick={onTap}
      >
        <HeadphonesIcon className="mr-2" /> TAP
      </Button>
    </div>
  );
};

export default SerenadePlayingView;
