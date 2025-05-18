
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
  const [isVisible, setIsVisible] = useState(true);
  const hasLoggedError = useRef(false);
  const mountedRef = useRef(true);
  
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

  // Force visibility after a delay to ensure rendering
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setIsVisible(true);
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [backgroundId]);
  
  // Debug logging
  useEffect(() => {
    console.log(`GameBackgroundScene mounted with backgroundId: ${backgroundId}`);
    
    return () => {
      console.log(`GameBackgroundScene unmounted with backgroundId: ${backgroundId}`);
      mountedRef.current = false;
    };
  }, [backgroundId]);

  // Render a default placeholder if no backgroundId is provided
  if (!backgroundId) {
    return (
      <div className="absolute inset-0 z-30 bg-gray-900 flex items-center justify-center text-white">
        <p>No background specified</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={backgroundId}
        className="absolute inset-0 bg-gray-900"
        onClick={onBackgroundClick}
        data-testid="game-background"
        initial={{ opacity: isTransitioning ? 0 : 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: transitionDuration / 2000 }}
        style={{ zIndex: 30 }} // Higher z-index to ensure visibility
      >
        <BackgroundScene 
          backgroundId={backgroundId} 
          priority={true}
          className={isVisible ? 'opacity-100' : 'opacity-0'}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(GameBackgroundScene);
