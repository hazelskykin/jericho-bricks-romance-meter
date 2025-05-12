
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiddenItem } from '@/hooks/useBloomWithAViewGame';

interface BloomWithAViewSceneProps {
  hiddenItems: HiddenItem[];
  clickPosition: { x: number, y: number } | null;
  showHint: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  backgroundImage?: string;
  foundItemCount: number;
  totalItemCount: number;
}

const BloomWithAViewScene: React.FC<BloomWithAViewSceneProps> = ({
  hiddenItems,
  clickPosition,
  showHint,
  onClick,
  backgroundImage = 'spring/bloomWithAView/garden-background',
  foundItemCount,
  totalItemCount
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.src = `/assets/minigames/${backgroundImage}.jpg`;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      console.error(`Failed to load background image: ${backgroundImage}`);
      // Fall back to the cityscape background
      setImageLoaded(true);
    };
  }, [backgroundImage]);

  return (
    <div className="relative w-full">
      <div 
        className="relative w-full h-[400px] rounded-lg border-2 border-purple-600/50 overflow-hidden cursor-pointer"
        onClick={onClick}
        style={{
          backgroundImage: `url(/assets/backgrounds/stonewich-cityscape.jpg)`, /* Fallback */
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Main background image */}
        {imageLoaded && (
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url(/assets/minigames/${backgroundImage}.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}

        {/* Game progress indicator */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg z-20">
          {foundItemCount} / {totalItemCount}
        </div>

        {/* Visual markers for hints */}
        {hiddenItems.map((item) => (
          item.highlighted && showHint && (
            <motion.div
              key={`hint-${item.id}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute w-12 h-12 rounded-full border-2 border-dashed border-yellow-400 bg-yellow-400/20 z-10"
              style={{
                left: item.position.x - 24,
                top: item.position.y - 24,
                zIndex: 5
              }}
            />
          )
        ))}
        
        {/* Display found items markers */}
        {hiddenItems.map((item) => (
          item.found && (
            <motion.div
              key={`found-${item.id}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-10"
              style={{
                left: item.position.x - 16,
                top: item.position.y - 16,
                zIndex: 10
              }}
            >
              <span className="text-white text-xs">✓</span>
            </motion.div>
          )
        ))}
        
        {/* Click feedback */}
        {clickPosition && (
          <motion.div
            initial={{ opacity: 0.8, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.5 }}
            className="absolute w-8 h-8 rounded-full bg-white/50 pointer-events-none z-20"
            style={{
              left: clickPosition.x - 16,
              top: clickPosition.y - 16,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BloomWithAViewScene;
