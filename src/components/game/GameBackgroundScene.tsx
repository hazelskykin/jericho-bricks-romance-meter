
import React, { useEffect, useState, useRef } from 'react';
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
  const [currentBackgroundId, setCurrentBackgroundId] = useState(backgroundId);
  const hasLoggedError = useRef(false);
  
  // Update current background ID when prop changes and not during transition
  useEffect(() => {
    if (!isTransitioning && backgroundId) {
      setCurrentBackgroundId(backgroundId);
      console.log(`GameBackgroundScene updating backgroundId to: ${backgroundId}`);
    }
  }, [backgroundId, isTransitioning]);
  
  // Play background music when background changes
  useEffect(() => {
    if (backgroundId) {
      playBackgroundMusicForScene(backgroundId);
    }
  }, [backgroundId]);
  
  // Debug logging (just once on component mount/unmount)
  useEffect(() => {
    console.log(`GameBackgroundScene mounted with backgroundId: ${backgroundId}`);
    
    return () => {
      console.log(`GameBackgroundScene unmounted with backgroundId: ${backgroundId}`);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={backgroundId}
        className="absolute inset-0 z-0 bg-gray-900"
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

export default React.memo(GameBackgroundScene);
