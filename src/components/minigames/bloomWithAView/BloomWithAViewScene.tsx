
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiddenItem } from '@/hooks/useBloomWithAViewGame';
import { getAssetPath } from '@/utils/assetUtilities';
import { toast } from 'sonner';
import { assetManager } from '@/utils/assetManager';

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
  const [debugMode, setDebugMode] = useState(false);

  // Add console logs to debug asset paths and loading
  useEffect(() => {
    console.log("Attempting to load BloomWithAView assets...");
    
    // Preload both background and object assets with consistent paths
    const assetPaths = [
      // Try direct paths with PNG extension first (confirmed by user)
      '/assets/minigames/spring/bloomWithAView/garden-background.png',
      '/assets/minigames/spring/bloomWithAView/hidden-objects.png',
      // Try alternative locations as fallbacks
      '/assets/minigames/spring/bloomwithAView/garden-background.png',
      '/assets/backgrounds/garden-background.png'
    ];
    
    // Log all file paths we're trying to load
    console.log("Attempting to load assets from paths:", assetPaths);
    
    // Use asset manager to preload assets
    assetManager.preloadAssets(assetPaths, (loaded, total) => {
      console.log(`Loaded ${loaded}/${total} BloomWithAView assets`);
    }).then(() => {
      console.log('Asset preloading complete');
      
      // Try to set the background image with priority for PNG
      const bgPath = '/assets/minigames/spring/bloomWithAView/garden-background.png';
      console.log(`Setting background image to: ${bgPath}`);
      setBgImagePath(bgPath);
      
      // Try to set the objects image
      const objectsPath = '/assets/minigames/spring/bloomWithAView/hidden-objects.png';
      console.log(`Setting objects image to: ${objectsPath}`);
      setObjectsImagePath(objectsPath);
      
      // Mark both as loaded (actual validation happens when rendering)
      setImageLoaded(true);
      setObjectsImageLoaded(true);
    }).catch(error => {
      console.error("Error loading assets:", error);
      setDebugMode(true);
      toast.error("Failed to load game assets", {
        description: "Using debug mode instead"
      });
    });
    
    // Additional error handling: check if images actually exist at paths
    const checkPaths = async () => {
      const bgImage = new Image();
      bgImage.onload = () => console.log("Background image exists and loaded successfully!");
      bgImage.onerror = () => {
        console.error("Background image failed to load - trying fallback");
        // Use known good fallback
        setBgImagePath('/assets/backgrounds/stonewich-cityscape.jpg');
        setDebugMode(true);
      };
      bgImage.src = '/assets/minigames/spring/bloomWithAView/garden-background.png';
      
      // Also check objects image
      const objImage = new Image();
      objImage.onload = () => console.log("Objects image exists and loaded successfully!");
      objImage.onerror = () => {
        console.error("Objects image failed to load - enabling debug mode");
        setDebugMode(true);
      };
      objImage.src = '/assets/minigames/spring/bloomWithAView/hidden-objects.png';
    };
    
    checkPaths();
  }, [backgroundImage]);

  // Generate CSS for the hidden object elements based on their position
  const getHiddenObjectStyle = (item: HiddenItem) => {
    if (!objectsImagePath || debugMode) return {};
    
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
        {debugMode && (
          <div className="absolute top-16 left-4 bg-red-500 text-white px-4 py-2 rounded-lg z-40">
            Missing image assets - Using debug mode
          </div>
        )}

        {/* Hidden object sprites (only visible until found) */}
        {hiddenItems.map((item) => (
          !item.found && (
            <div
              key={`object-${item.id}`}
              className={`absolute z-10 ${objectsImagePath && !debugMode ? '' : 'bg-purple-500/50 rounded-full border-2 border-white'}`}
              style={objectsImagePath && !debugMode ? getHiddenObjectStyle(item) : {
                left: `${item.position.x - 25}px`,
                top: `${item.position.y - 25}px`,
                width: '50px',
                height: '50px',
              }}
            >
              {/* If no sprite sheet is available, show item names for debugging */}
              {(debugMode || !objectsImagePath) && (
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
