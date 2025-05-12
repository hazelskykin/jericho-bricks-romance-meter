
import { assetManager } from './assetManager';

type AssetLoadCallback = (
  backgroundPath: string,
  objectsPath: string,
  tilesPath: string,
  debugMode: boolean
) => void;

export function loadBloomWithAViewAssets(onLoad: AssetLoadCallback): void {
  console.log("Loading Bloom With A View assets...");
  
  // Use a single, consistent path structure
  const assetPaths = {
    bgPath: '/assets/minigames/spring/bloomwithAView/garden-background.jpg',
    objectsPath: '/assets/minigames/spring/bloomwithAView/hidden-objects.png',
    tilesPath: '/assets/minigames/spring/bloomwithAView/flower-tiles.png',
  };
  
  // Track asset loading state
  let debugMode = false;
  let bgLoaded = false;
  let objectsLoaded = false;
  let tilesLoaded = false;
  
  // Successfully loaded paths
  let bgPath = '';
  let objPath = '';
  let tilePath = '';
  
  // Function to check if all assets are loaded
  const checkAllLoaded = () => {
    if (bgLoaded && objectsLoaded && tilesLoaded) {
      console.log(`All BloomWithAView assets loaded successfully`);
      onLoad(bgPath, objPath, tilePath, false);
    } else {
      console.log('Using debug mode for BloomWithAView assets');
      // Use fallback paths for debug mode
      const fallbackBgPath = '/assets/backgrounds/stonewich-cityscape.jpg';
      onLoad(fallbackBgPath, objPath || assetPaths.objectsPath, tilePath || assetPaths.tilesPath, true);
    }
  };
  
  // Load background image
  const loadBackground = () => {
    console.log(`Loading garden background from: ${assetPaths.bgPath}`);
    const img = new Image();
    img.onload = () => {
      console.log(`Successfully loaded garden background`);
      bgLoaded = true;
      bgPath = assetPaths.bgPath;
      checkAllLoaded();
    };
    img.onerror = () => {
      console.warn('Failed to load garden background image');
      debugMode = true;
      checkAllLoaded();
    };
    img.src = assetPaths.bgPath;
  };
  
  // Load objects sprite
  const loadObjects = () => {
    console.log(`Loading hidden objects from: ${assetPaths.objectsPath}`);
    const img = new Image();
    img.onload = () => {
      console.log(`Successfully loaded hidden objects`);
      objectsLoaded = true;
      objPath = assetPaths.objectsPath;
      checkAllLoaded();
    };
    img.onerror = () => {
      console.warn('Failed to load hidden objects image');
      debugMode = true;
      checkAllLoaded();
    };
    img.src = assetPaths.objectsPath;
  };
  
  // Load flower tiles
  const loadTiles = () => {
    console.log(`Loading flower tiles from: ${assetPaths.tilesPath}`);
    const img = new Image();
    img.onload = () => {
      console.log(`Successfully loaded flower tiles`);
      tilesLoaded = true;
      tilePath = assetPaths.tilesPath;
      checkAllLoaded();
    };
    img.onerror = () => {
      console.warn('Failed to load flower tiles image');
      debugMode = true;
      checkAllLoaded();
    };
    img.src = assetPaths.tilesPath;
  };
  
  // Load all assets
  loadBackground();
  loadObjects();
  loadTiles();
  
  // Set a shorter timeout to avoid long waits when assets don't exist
  setTimeout(() => {
    if (!bgLoaded || !objectsLoaded || !tilesLoaded) {
      console.warn('Timeout waiting for BloomWithAView assets to load');
      debugMode = true;
      checkAllLoaded();
    }
  }, 3000); // Reduced from 5000 to 3000ms
}

// Get positioned and styled objects for each hidden item
export function getObjectPosition(itemId: string, debugMode: boolean = false): { 
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
  
  return {
    width: position[2],
    height: position[3],
    backgroundPosition: `-${position[0]}px -${position[1]}px`
  };
}
