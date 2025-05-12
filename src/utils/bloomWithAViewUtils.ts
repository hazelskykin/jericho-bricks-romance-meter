
import { fixAssetPath } from './assetManager';

type AssetLoadCallback = (
  backgroundPath: string,
  objectsPath: string,
  tilesPath: string,
  debugMode: boolean
) => void;

export function loadBloomWithAViewAssets(onLoad: AssetLoadCallback): void {
  // Asset paths for the game
  const bgPath = fixAssetPath('/assets/minigames/spring/bloomWithAView/garden-background.jpg');
  const objectsPath = fixAssetPath('/assets/minigames/spring/bloomWithAView/hidden-objects.png');
  const tilesPath = fixAssetPath('/assets/minigames/spring/bloomWithAView/flower-tiles.png');
  
  // Check if assets exist by preloading them
  let debugMode = false;
  let bgLoaded = false;
  let objectsLoaded = false;
  let tilesLoaded = false;
  
  // Function to check if all assets are loaded
  const checkAllLoaded = () => {
    if (bgLoaded && objectsLoaded && tilesLoaded) {
      console.log('All BloomWithAView assets loaded successfully');
      onLoad(bgPath, objectsPath, tilesPath, false);
    } else if (debugMode) {
      console.log('Using debug mode for BloomWithAView assets');
      // Use fallback paths for debug mode
      const fallbackBgPath = '/assets/backgrounds/stonewich-cityscape.jpg';
      onLoad(
        fallbackBgPath, 
        '/assets/minigames/spring/bloomWithAView/hidden-objects.png', 
        '/assets/minigames/spring/bloomWithAView/flower-tiles.png',
        true
      );
    }
  };
  
  // Load background image
  const bgImg = new Image();
  bgImg.onload = () => {
    bgLoaded = true;
    checkAllLoaded();
  };
  bgImg.onerror = () => {
    console.warn('Failed to load garden background image');
    debugMode = true;
    checkAllLoaded();
  };
  bgImg.src = bgPath;
  
  // Load objects image
  const objectsImg = new Image();
  objectsImg.onload = () => {
    objectsLoaded = true;
    checkAllLoaded();
  };
  objectsImg.onerror = () => {
    console.warn('Failed to load hidden objects image');
    debugMode = true;
    checkAllLoaded();
  };
  objectsImg.src = objectsPath;
  
  // Load tiles image
  const tilesImg = new Image();
  tilesImg.onload = () => {
    tilesLoaded = true;
    checkAllLoaded();
  };
  tilesImg.onerror = () => {
    console.warn('Failed to load flower tiles image');
    debugMode = true;
    checkAllLoaded();
  };
  tilesImg.src = tilesPath;
  
  // Set a timeout in case images take too long to load
  setTimeout(() => {
    if (!bgLoaded || !objectsLoaded || !tilesLoaded) {
      console.warn('Timeout waiting for BloomWithAView assets to load');
      debugMode = true;
      checkAllLoaded();
    }
  }, 5000);
}

// Get positioned and styled objects for each hidden item
export function getObjectPosition(itemId: string, debugMode: boolean = false): { 
  top: number;
  left: number;
  width: number;
  height: number;
  backgroundPosition: string;
} {
  // Position mapping for each item sprite in the sprite sheet
  // Format: [x-position, y-position, width, height]
  const positionMap: Record<string, [number, number, number, number]> = {
    'gardening-gloves': [0, 0, 60, 60],
    'bee-drone': [60, 0, 60, 60],
    'seed-packet': [120, 0, 60, 60],
    'butterfly': [180, 0, 60, 60],
    'vintage-watering-can': [240, 0, 60, 60]
  };
  
  const position = positionMap[itemId] || [0, 0, 60, 60];
  
  // For debug mode, use a simple colored div
  if (debugMode) {
    return {
      top: position[1],
      left: position[0],
      width: position[2],
      height: position[3],
      backgroundPosition: '0 0' // Not used in debug mode
    };
  }
  
  return {
    top: position[1],
    left: position[0],
    width: position[2],
    height: position[3],
    backgroundPosition: `-${position[0]}px -${position[1]}px`
  };
}
