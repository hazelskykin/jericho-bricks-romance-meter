
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiddenItem } from '@/hooks/useBloomWithAViewGame';
import { getAssetPath } from '@/utils/assetUtilities';

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
  const [objectsImageLoaded, setObjectsImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.src = `/assets/minigames/${backgroundImage}.jpg`;
    img.onload = () => setImageLoaded(true);
    img.onerror = (e) => {
      console.error(`Failed to load background image: ${backgroundImage}`, e);
      // Fall back to trying PNG format
      const pngImg = new Image();
      pngImg.src = `/assets/minigames/${backgroundImage}.png`;
      pngImg.onload = () => setImageLoaded(true);
      pngImg.onerror = () => {
        console.error(`Failed to load PNG background image: ${backgroundImage}`);
        // Use the fallback cityscape as last resort
        setImageLoaded(true);
      };
    };
    
    // Preload the hidden objects image
    const objectsImg = new Image();
    objectsImg.src = `/assets/minigames/spring/bloomWithAView/hidden-objects.png`;
    objectsImg.onload = () => setObjectsImageLoaded(true);
    objectsImg.onerror = () => {
      console.error('Failed to load hidden objects image');
      setObjectsImageLoaded(true); // Continue even if failed
    };
  }, [backgroundImage]);

  // Generate CSS for the hidden object elements based on their position
  const getHiddenObjectStyle = (item: HiddenItem) => {
    return {
      left: `${item.position.x - 25}px`, // Adjust position to center
      top: `${item.position.y - 25}px`, // Adjust position to center
      width: '50px',
      height: '50px',
      backgroundImage: "url('/assets/minigames/spring/bloomWithAView/hidden-objects.png')",
      backgroundSize: '250px auto', // The sprite sheet is 5 items wide (50px * 5)
      backgroundPosition: getBackgroundPositionForItem(item.id),
    };
  };

  // Map item IDs to positions in the sprite sheet
  const getBackgroundPositionForItem = (id: string): string => {
    const positions: Record<string, string> = {
      'rare-orchid': '0px 0px',       // First sprite
      'garden-gnome': '-50px 0px',    // Second sprite
      'butterfly': '-100px 0px',      // Third sprite
      'vintage-watering-can': '-150px 0px', // Fourth sprite
      'stone-sculpture': '-200px 0px' // Fifth sprite
    };
    
    return positions[id] || '0px 0px'; // Default to first sprite if not found
  };

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
            className="absolute inset-0 z-0" 
            style={{
              backgroundImage: `url(/assets/minigames/spring/bloomWithAView/garden-background.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}

        {/* Hidden object sprites (only visible until found) */}
        {objectsImageLoaded && hiddenItems.map((item) => (
          !item.found && (
            <div
              key={`object-${item.id}`}
              className="absolute z-10"
              style={getHiddenObjectStyle(item)}
            />
          )
        ))}

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
                zIndex: 15
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
                zIndex: 20
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
