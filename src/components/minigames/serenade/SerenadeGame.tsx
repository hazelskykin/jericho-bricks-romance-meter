
import React from 'react';
import { motion } from 'framer-motion';
import { Music, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MinigameContainer from '../MinigameContainer';
import { useSerenade, DEFAULT_SONGS } from './useSerenade';
import SongSelectionView from './SongSelectionView';
import SerenadePlayingView from './SerenadePlayingView';
import SerenadeResultsView from './SerenadeResultsView';

interface SerenadeGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const SerenadeGame: React.FC<SerenadeGameProps> = ({ onComplete, onExit }) => {
  const {
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
    completeGame
  } = useSerenade(onComplete);

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
          <SongSelectionView songs={DEFAULT_SONGS} onSongSelect={handleSongSelect} />
        )}

        {gameStage === 'playing' && selectedSong && (
          <SerenadePlayingView
            song={selectedSong}
            beats={beats}
            currentBeatIndex={currentBeatIndex}
            playerTaps={playerTaps}
            timeRemaining={timeRemaining}
            showFeedback={showFeedback}
            feedbackText={feedbackText}
            score={score}
            maxScore={maxScore}
            beatBarRef={beatBarRef}
            onTap={handleTap}
          />
        )}

        {gameStage === 'results' && selectedSong && (
          <SerenadeResultsView
            song={selectedSong}
            score={score}
            maxScore={maxScore}
            onComplete={completeGame}
          />
        )}
      </div>
    </MinigameContainer>
  );
};

export default SerenadeGame;
