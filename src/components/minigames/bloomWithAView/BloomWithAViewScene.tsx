
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiddenItem } from '@/hooks/useBloomWithAViewGame';
import { getAssetPath } from '@/utils/assetUtilities';
import { toast } from 'sonner';

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
  const [bgImagePath, setBgImagePath] = useState('');
  const [objectsImageLoaded, setObjectsImageLoaded] = useState(false);
  const [objectsImagePath, setObjectsImagePath] = useState('');

  useEffect(() => {
    console.log("Attempting to load BloomWithAView assets...");
    
    // Try loading the background image with different paths and extensions
    const tryLoadBackground = async () => {
      const possibleBackgrounds = [
        // Try direct paths first
        `/assets/minigames/${backgroundImage}.jpg`,
        `/assets/minigames/${backgroundImage}.png`,
        // Try fixing capitalization issues
        `/assets/minigames/spring/bloomwithAView/garden-background.jpg`,
        `/assets/minigames/spring/bloomwithAView/garden-background.png`,
        // Last resort - try loading from backgrounds directory
        `/assets/backgrounds/garden-background.jpg`,
        `/assets/backgrounds/garden-background.png`,
        // Absolute fallback
        `/assets/backgrounds/stonewich-cityscape.jpg`
      ];
      
      // Try each path until one loads
      for (const path of possibleBackgrounds) {
        console.log(`Trying to load background: ${path}`);
        try {
          const img = new Image();
          img.src = path;
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            // Add a timeout to prevent hanging
            setTimeout(reject, 3000);
          });
          
          // If we get here, the image loaded successfully
          console.log(`Successfully loaded background: ${path}`);
          setBgImagePath(path);
          setImageLoaded(true);
          return;
        } catch (e) {
          console.warn(`Failed to load background from ${path}`);
        }
      }
      
      // If we get here, none of the paths worked
      console.error("Could not load any background image");
      // Set fallback and continue
      setBgImagePath('/assets/backgrounds/stonewich-cityscape.jpg');
      setImageLoaded(true);
    };
    
    // Try loading the hidden objects image with different paths
    const tryLoadObjectsImage = async () => {
      const possibleObjectImages = [
        '/assets/minigames/spring/bloomWithAView/hidden-objects.png',
        '/assets/minigames/spring/bloomwithAView/hidden-objects.png',
        '/assets/minigames/spring/bloomWithAView/hidden_objects_sprites.png',
        '/assets/minigames/spring/bloomwithAView/hidden_objects_sprites.png'
      ];
      
      // Try each path until one loads
      for (const path of possibleObjectImages) {
        console.log(`Trying to load objects: ${path}`);
        try {
          const img = new Image();
          img.src = path;
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            // Add a timeout to prevent hanging
            setTimeout(reject, 3000);
          });
          
          // If we get here, the image loaded successfully
          console.log(`Successfully loaded objects: ${path}`);
          setObjectsImagePath(path);
          setObjectsImageLoaded(true);
          return;
        } catch (e) {
          console.warn(`Failed to load objects from ${path}`);
        }
      }
      
      // If we get here, we couldn't load the objects image
      console.error("Could not load any hidden objects image");
      setObjectsImageLoaded(true); // Continue anyway
    };
    
    // Load both assets
    tryLoadBackground();
    tryLoadObjectsImage();
  }, [backgroundImage]);

  // Generate CSS for the hidden object elements based on their position
  const getHiddenObjectStyle = (item: HiddenItem) => {
    if (!objectsImagePath) return {};
    
    return {
      left: `${item.position.x - 25}px`, // Adjust position to center
      top: `${item.position.y - 25}px`, // Adjust position to center
      width: '50px',
      height: '50px',
      backgroundImage: `url('${objectsImagePath}')`,
      backgroundSize: '250px auto', // The sprite sheet is 5 items wide (50px * 5)
      backgroundPosition: getBackgroundPositionForItem(item.id),
      border: item.highlighted ? '2px dashed yellow' : 'none',
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
        {imageLoaded && bgImagePath && (
          <div 
            className="absolute inset-0 z-0" 
            style={{
              backgroundImage: `url(${bgImagePath})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}

        {/* Debug marker to show if we're in fallback mode */}
        {!objectsImagePath && (
          <div className="absolute top-16 left-4 bg-red-500 text-white px-4 py-2 rounded-lg z-40">
            Missing sprite sheet - Using debug mode
          </div>
        )}

        {/* Hidden object sprites (only visible until found) */}
        {hiddenItems.map((item) => (
          !item.found && (
            <div
              key={`object-${item.id}`}
              className={`absolute z-10 ${objectsImagePath ? '' : 'bg-purple-500/50 rounded-full border-2 border-white'}`}
              style={objectsImagePath ? getHiddenObjectStyle(item) : {
                left: `${item.position.x - 25}px`,
                top: `${item.position.y - 25}px`,
                width: '50px',
                height: '50px',
              }}
            >
              {/* If no sprite sheet is available, show item names for debugging */}
              {!objectsImagePath && (
                <div className="absolute -top-6 left-0 right-0 text-center text-xs bg-black/70 text-white px-1 rounded">
                  {item.name}
                </div>
              )}
            </div>
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
