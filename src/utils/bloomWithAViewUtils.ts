
import { HiddenItem } from '@/hooks/bloomWithAView/types';
import { assetManager } from '@/utils/assetManager';
import { getAssetPath, fixAssetPath } from '@/utils/assetUtilities';
import { toast } from 'sonner';

/**
 * Get background position for item in sprite sheet
 */
export const getBackgroundPositionForItem = (id: string): string => {
  const positions: Record<string, string> = {
    'gardening-gloves': '0px 0px',    // First sprite
    'bee-drone': '-50px 0px',         // Second sprite
    'seed-packet': '-100px 0px',      // Third sprite
    'butterfly': '-150px 0px',        // Fourth sprite
    'vintage-watering-can': '-200px 0px' // Fifth sprite
  };
  
  return positions[id] || '0px 0px'; // Default to first sprite if not found
};

/**
 * Generate CSS for individual hidden object elements
 */
export const getHiddenObjectStyle = (
  item: HiddenItem, 
  objectsImagePath: string, 
  debugMode: boolean
): React.CSSProperties => {
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

/**
 * Load assets for the Bloom With A View game
 */
export const loadBloomWithAViewAssets = (
  onAssetsLoaded: (
    bgPath: string, 
    objectsPath: string, 
    tilesPath: string, 
    debugMode: boolean
  ) => void
) => {
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
    
    // Set the objects image (fixed path)
    const objectsPath = '/assets/minigames/spring/bloomWithAView/hidden-objects.png';
    
    // Set the flower tiles image
    const tilesPath = '/assets/minigames/spring/bloomWithAView/flower-tiles.png';
    
    // Mark all assets as loaded (no debug mode)
    onAssetsLoaded(
      fixAssetPath(bgPath), 
      fixAssetPath(objectsPath), 
      fixAssetPath(tilesPath), 
      false
    );
  }).catch(error => {
    console.error("Error loading assets:", error);
    
    // Use fallbacks and enable debug mode
    toast.error("Failed to load game assets", {
      description: "Using debug mode instead"
    });
    
    onAssetsLoaded(
      '/assets/backgrounds/stonewich-cityscape.jpg',
      '',
      '',
      true
    );
  });
};
