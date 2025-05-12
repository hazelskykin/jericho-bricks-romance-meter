
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiddenItem } from '@/hooks/bloomWithAView/types';
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
  const [flowerTilesPath, setFlowerTilesPath] = useState('');
  const [debugMode, setDebugMode] = useState(false);

  // Add console logs to debug asset paths and loading
  useEffect(() => {
    console.log("Attempting to load BloomWithAView assets...");
    
    // Only use the correct minigames folder paths
    const assetPaths = [
      // Garden background (PNG)
      '/assets/minigames/spring/bloomWithAView/garden-background.png',
      // Hidden objects
      '/assets/minigames/spring/bloomWithAView/hidden-objects.png',
      // Flower tiles
      '/assets/minigames/spring/bloomWithAView/flower-tiles.png',
    ];
    
    console.log("Attempting to load assets from paths:", assetPaths);
    
    // Use asset manager to preload assets
    assetManager.preloadAssets(assetPaths, (loaded, total) => {
      console.log(`Loaded ${loaded}/${total} BloomWithAView assets`);
    }).then(() => {
      console.log('Asset preloading complete');
      
      // Set the background image
      const bgPath = '/assets/minigames/spring/bloomWithAView/garden-background.png';
      console.log(`Setting background image to: ${bgPath}`);
      setBgImagePath(bgPath);
      
      // Set the objects image (fixed path)
      const objectsPath = '/assets/minigames/spring/bloomWithAView/hidden-objects.png';
      console.log(`Setting objects image to: ${objectsPath}`);
      setObjectsImagePath(objectsPath);
      
      // Set the flower tiles image
      const tilesPath = '/assets/minigames/spring/bloomWithAView/flower-tiles.png';
      console.log(`Setting flower tiles image to: ${tilesPath}`);
      setFlowerTilesPath(tilesPath);
      
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
      // Check background image
      const bgImage = new Image();
      bgImage.onload = () => console.log("Background image exists and loaded successfully!");
      bgImage.onerror = () => {
        console.error("Background image failed to load - trying fallback");
        // Use known good fallback
        setBgImagePath('/assets/backgrounds/stonewich-cityscape.jpg');
        setDebugMode(true);
      };
      bgImage.src = '/assets/minigames/spring/bloomWithAView/garden-background.png';
      
      // Check hidden objects image
      const objImage = new Image();
      objImage.onload = () => {
        console.log("Hidden objects image exists and loaded successfully!");
        setObjectsImagePath('/assets/minigames/spring/bloomWithAView/hidden-objects.png');
        setDebugMode(false); // Turn off debug mode if we find the image
        setObjectsImageLoaded(true);
      };
      objImage.onerror = () => {
        console.error("Hidden objects image failed to load - enabling debug mode");
        setDebugMode(true);
      };
      objImage.src = '/assets/minigames/spring/bloomWithAView/hidden-objects.png';
      
      // Check flower tiles image
      const tilesImage = new Image();
      tilesImage.onload = () => {
        console.log("Flower tiles image exists and loaded successfully!");
        setFlowerTilesPath('/assets/minigames/spring/bloomWithAView/flower-tiles.png');
      };
      tilesImage.onerror = () => {
        console.error("Flower tiles image failed to load - enabling debug mode");
        setDebugMode(true);
      };
      tilesImage.src = '/assets/minigames/spring/bloomWithAView/flower-tiles.png';
    };
    
    checkPaths();
  }, [backgroundImage]);

  // Generate CSS for individual hidden object elements based on their ID
  const getHiddenObjectStyle = (item: HiddenItem) => {
    // When in debug mode or no sprite sheet, use basic styling
    if (!objectsImagePath || debugMode) {
      return {
        left: `${item.position.x - 25}px`,
        top: `${item.position.y - 25}px`,
        width: '50px',
        height: '50px',
        backgroundColor: 'rgba(255, 0, 255, 0.3)',
        border: '2px dashed white',
        borderRadius: '4px',
      };
    }
    
    // When using sprite sheet, position each object correctly
    return {
      left: `${item.position.x - 25}px`, // Center the 50x50 sprite
      top: `${item.position.y - 25}px`,
      width: '50px',
      height: '50px',
      backgroundImage: `url(${objectsImagePath})`,
      backgroundSize: '250px 50px', // The sprite sheet is 5 items wide (50px * 5) and 1 item tall
      backgroundPosition: getBackgroundPositionForItem(item.id),
      border: item.highlighted ? '2px dashed yellow' : 'none',
    };
  };

  // Map item IDs to positions in the sprite sheet - updated to match the correct items
  const getBackgroundPositionForItem = (id: string): string => {
    const positions: Record<string, string> = {
      'gardening-gloves': '0px 0px',    // First sprite
      'bee-drone': '-50px 0px',         // Second sprite
      'seed-packet': '-100px 0px',      // Third sprite
      'butterfly': '-150px 0px',        // Fourth sprite
      'vintage-watering-can': '-200px 0px' // Fifth sprite
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
        {/* Main background image - z-index 0 (furthest back) */}
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
        
        {/* Hidden object sprites - z-index 10 (middle layer) */}
        {hiddenItems.map((item) => (
          !item.found && (
            <div
              key={`object-${item.id}`}
              className="absolute z-10"
              style={getHiddenObjectStyle(item)}
            >
              {/* If no sprite sheet is available, show item names for debugging */}
              {(debugMode || !objectsImageLoaded) && (
                <div className="absolute -top-6 left-0 right-0 text-center text-xs bg-black/70 text-white px-1 rounded">
                  {item.name}
                </div>
              )}
            </div>
          )
        ))}
        
        {/* Flower tiles layer - properly sized and placed OVER hidden objects - z-index 15 (foreground) */}
        {imageLoaded && flowerTilesPath && (
          <div 
            className="absolute inset-0 z-15 pointer-events-none" 
            style={{
              backgroundImage: `url(${flowerTilesPath})`,
              backgroundSize: '400px auto', // Smaller size for flower tiles to not fully cover objects
              backgroundPosition: 'center',
              opacity: 0.7, // Increased opacity to show flowers better
              mixBlendMode: 'soft-light' // This blend mode allows objects to be partially visible
            }}
          />
        )}

        {/* Game progress indicator */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg z-20">
          {foundItemCount} / {totalItemCount}
        </div>

        {/* Debug marker to show if we're in fallback mode */}
        {debugMode && (
          <div className="absolute top-16 left-4 bg-red-500 text-white px-4 py-2 rounded-lg z-40">
            Missing image assets - Using debug mode
          </div>
        )}

        {/* Visual markers for hints */}
        {hiddenItems.map((item) => (
          item.highlighted && showHint && (
            <motion.div
              key={`hint-${item.id}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute w-12 h-12 rounded-full border-2 border-dashed border-yellow-400 bg-yellow-400/20 z-30"
              style={{
                left: item.position.x - 24,
                top: item.position.y - 24
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
              className="absolute w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-20"
              style={{
                left: item.position.x - 16,
                top: item.position.y - 16
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
            className="absolute w-8 h-8 rounded-full bg-white/50 pointer-events-none z-40"
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
