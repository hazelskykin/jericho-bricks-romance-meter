
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playBackgroundMusicForScene } from '@/utils/sound';
import { useGame } from '@/context/GameContext';
import BackgroundScene from '../BackgroundScene';

interface GameBackgroundSceneProps {
  backgroundId: string;
  onBackgroundClick?: () => void;
}

const GameBackgroundScene: React.FC<GameBackgroundSceneProps> = ({
  backgroundId,
  onBackgroundClick,
}) => {
  const { isTransitioning, transitionDuration } = useGame();
  
  // Set up background music when background changes
  React.useEffect(() => {
    if (backgroundId) {
      // Play background music for this scene
      playBackgroundMusicForScene(backgroundId);
      
      console.log(`GameBackgroundScene mounting with background: ${backgroundId}`);
    }
    
    return () => {
      console.log(`GameBackgroundScene unmounting: ${backgroundId}`);
    };
  }, [backgroundId]);

  // Render a default placeholder if no backgroundId is provided
  if (!backgroundId) {
    return (
      <div className="absolute inset-0 z-0 bg-gray-900 flex items-center justify-center text-white">
        <p>No background specified</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={backgroundId}
        className="absolute inset-0 bg-gray-900 game-background"
        onClick={onBackgroundClick}
        data-testid="game-background"
        initial={{ opacity: isTransitioning ? 0 : 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: transitionDuration / 2000 }}
        style={{ zIndex: 0 }}
      >
        <BackgroundScene 
          backgroundId={backgroundId} 
          priority={true}
          onLoad={() => console.log(`Background loaded in GameBackgroundScene: ${backgroundId}`)}
          onError={() => console.error(`Background failed in GameBackgroundScene: ${backgroundId}`)}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(GameBackgroundScene);
