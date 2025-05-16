
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
    }
  }, [backgroundId, isTransitioning]);
  
  // Play background music when background changes
  useEffect(() => {
    if (backgroundId) {
      playBackgroundMusicForScene(backgroundId);
    }
  }, [backgroundId]);
  
  // Debug logging (just once on component mount/unmount to avoid spam)
  useEffect(() => {
    console.log(`GameBackgroundScene mounted with backgroundId: ${backgroundId}`);
    
    return () => {
      console.log(`GameBackgroundScene unmounted with backgroundId: ${backgroundId}`);
    };
  }, []);
  
  // Log background ID changes (but not too frequently)
  useEffect(() => {
    if (currentBackgroundId !== backgroundId && !hasLoggedError.current) {
      console.log(`GameBackgroundScene background changed from ${currentBackgroundId} to ${backgroundId}`);
      hasLoggedError.current = true;
      
      // Reset after a delay to allow logging again
      const timer = setTimeout(() => {
        hasLoggedError.current = false;
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentBackgroundId, backgroundId]);

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

export default React.memo(GameBackgroundScene);
