
import { assetManager } from '@/utils/assetManager';

// Helper functions for Bloom With A View minigame

/**
 * Load assets for the Bloom With A View minigame
 */
export const loadBloomWithAViewAssets = (
  onAssetsLoaded: (
    backgroundPath: string,
    debugMode: boolean
  ) => void
) => {
  // Define asset paths
  const bgPath = '/assets/minigames/spring/bloomwithAView/garden-background.jpg';
  
  // Individual hidden object paths
  const objectPaths = [
    '/assets/minigames/spring/bloomwithAView/hidden-objects-wateringcan.png',
    '/assets/minigames/spring/bloomwithAView/hidden-objects-gloves.png',
    '/assets/minigames/spring/bloomwithAView/hidden-objects-beedrone.png',
    '/assets/minigames/spring/bloomwithAView/hidden-objects-seedpacket.png',
    '/assets/minigames/spring/bloomwithAView/hidden-objects-butterfly.png',
  ];
  
  // Individual flower tile paths
  const flowerTilePaths = [
    '/assets/minigames/spring/bloomwithAView/flower-tiles-1.png',
    '/assets/minigames/spring/bloomwithAView/flower-tiles-2.png',
    '/assets/minigames/spring/bloomwithAView/flower-tiles-3.png',
    '/assets/minigames/spring/bloomwithAView/flower-tiles-4.png',
    '/assets/minigames/spring/bloomwithAView/flower-tiles-5.png',
    '/assets/minigames/spring/bloomwithAView/flower-tiles-6.png',
    '/assets/minigames/spring/bloomwithAView/flower-tiles-7.png',
    '/assets/minigames/spring/bloomwithAView/flower-tiles-8.png',
  ];
  
  // Combine all paths
  const allPaths = [bgPath, ...objectPaths, ...flowerTilePaths];

  // Preload all images
  assetManager.preloadAssets(allPaths, (loaded, total) => {
    console.log(`Loaded ${loaded}/${total} BloomWithAView assets`);
  }).then(() => {
    console.log('BloomWithAView assets loaded');
    
    // Check if we need to use debug mode (if our primary assets failed to load)
    const debugMode = assetManager.didAssetFail(bgPath);
    
    // Call the callback with the paths
    onAssetsLoaded(
      bgPath,
      debugMode
    );
  });
};

/**
 * Get the size and position styling for a hidden object
 */
export const getObjectPosition = (itemId: string, debugMode: boolean) => {
  // In debug mode, return larger sizes for better visibility
  if (debugMode) {
    return {
      width: 80,
      height: 80,
      backgroundPosition: '0 0',
      spriteSheetWidth: 80,
      spriteSheetHeight: 80
    };
  }

  // In normal mode, use these sizes for our individual images
  return {
    width: 60,
    height: 60,
    backgroundPosition: '0 0',
    spriteSheetWidth: 60,
    spriteSheetHeight: 60
  };
};
