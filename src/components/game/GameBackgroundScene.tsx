
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundScene from '../BackgroundScene';
import { playBackgroundMusicForScene } from '@/utils/sound';
import { useGame } from '@/context/GameContext';
import { assetManager } from '@/utils/assetManager';

interface GameBackgroundSceneProps {
  backgroundId: string;
  onBackgroundClick?: () => void;
}

const GameBackgroundScene: React.FC<GameBackgroundSceneProps> = ({
  backgroundId,
  onBackgroundClick,
}) => {
  const { isTransitioning, transitionDuration } = useGame();
  const [isVisible, setIsVisible] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Play background music when background changes
  useEffect(() => {
    if (backgroundId) {
      playBackgroundMusicForScene(backgroundId);
    }
    
    // Force visibility after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Pre-emptively mark background as loaded to ensure game can progress
    if (backgroundId) {
      const imagePath = `/assets/backgrounds/${backgroundId}.jpg`;
      assetManager.forceAssetSuccess(imagePath);
    }
    
    return () => clearTimeout(timer);
  }, [backgroundId]);

  // Render a default placeholder if no backgroundId is provided
  if (!backgroundId) {
    return (
      <div className="absolute inset-0 z-10 bg-gray-900 flex items-center justify-center text-white">
        <p>No background specified</p>
      </div>
    );
  }

  const handleRetry = () => {
    setLoadError(false);
    assetManager.clearFailedAssets();
    setIsVisible(false);
    // Force visibility after a short delay
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

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
        style={{ zIndex: 10 }}
      >
        <BackgroundScene 
          backgroundId={backgroundId} 
          priority={true}
          className={`w-full h-full ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Error overlay with retry button */}
        {loadError && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
            <p className="text-white mb-4">Error loading background</p>
            <button
              onClick={handleRetry}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(GameBackgroundScene);
