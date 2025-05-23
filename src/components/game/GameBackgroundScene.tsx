
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [imagePath, setImagePath] = useState('');
  
  // Set up the image path and play background music when background changes
  useEffect(() => {
    if (backgroundId) {
      // Set the image path
      setImagePath(`/assets/backgrounds/${backgroundId}.jpg`);
      
      // Play background music for this scene
      playBackgroundMusicForScene(backgroundId);
      
      // Reset error state when background changes
      setLoadError(false);
      setIsLoaded(false);
      
      console.log(`Loading background: ${backgroundId}`);
    }
  }, [backgroundId]);

  // Handle image load success
  const handleImageLoad = () => {
    console.log(`Successfully loaded background: ${backgroundId}`);
    setIsLoaded(true);
    setLoadError(false);
  };

  // Handle image load error
  const handleImageError = () => {
    console.error(`Failed to load background: ${backgroundId}`);
    setLoadError(true);
  };

  // Handle retry when loading fails
  const handleRetry = () => {
    setIsLoaded(false);
    setLoadError(false);
    
    // Force a reload by updating the key with a timestamp
    setImagePath(`/assets/backgrounds/${backgroundId}.jpg?t=${Date.now()}`);
  };

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
        {/* Background image - Always render in DOM but control opacity */}
        <img 
          src={imagePath}
          alt={`Background: ${backgroundId}`} 
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Loading indicator - show only when loading */}
        {!isLoaded && !loadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <div className="bg-gray-800 p-4 rounded-md text-white">
              <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p>Loading background...</p>
            </div>
          </div>
        )}

        {/* Error overlay with retry button */}
        {loadError && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
            <p className="text-white mb-4">Loading is taking longer than expected.</p>
            <button
              onClick={handleRetry}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(GameBackgroundScene);
