
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundScene from '../BackgroundScene';
import { playBackgroundMusicForScene } from '@/utils/sound';
import { useGame } from '@/context/GameContext';

interface GameBackgroundSceneProps {
  backgroundId: string;
  onBackgroundClick?: () => void;
}

const GameBackgroundScene: React.FC<GameBackgroundSceneProps> = ({
  backgroundId,
  onBackgroundClick,
}) => {
  const { isTransitioning, transitionDuration } = useGame();
  
  // Play background music when background changes
  useEffect(() => {
    if (backgroundId) {
      playBackgroundMusicForScene(backgroundId);
    }
  }, [backgroundId]);
  
  // Debug logging
  useEffect(() => {
    console.log(`GameBackgroundScene rendering with backgroundId: ${backgroundId}`);
  }, [backgroundId]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={backgroundId}
        className="absolute inset-0 z-0"
        onClick={onBackgroundClick}
        data-testid="game-background"
        initial={{ opacity: isTransitioning ? 0 : 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: transitionDuration / 2000 }}
      >
        <BackgroundScene 
          backgroundId={backgroundId} 
          priority={true}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default GameBackgroundScene;
