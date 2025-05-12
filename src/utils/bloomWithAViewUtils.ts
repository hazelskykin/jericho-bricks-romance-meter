
import { fixAssetPath } from './assetUtilities';

type AssetLoadCallback = (
  backgroundPath: string,
  objectsPath: string,
  tilesPath: string,
  debugMode: boolean
) => void;

export function loadBloomWithAViewAssets(onLoad: AssetLoadCallback): void {
  console.log("Attempting to load Bloom With A View assets from all possible paths...");
  
  // Try multiple possible paths to handle inconsistent casing in folder names
  const possiblePaths = {
    // Standard paths (uppercase W)
    bgPathPng: '/assets/minigames/spring/bloomWithAView/garden-background.png',
    bgPathJpg: '/assets/minigames/spring/bloomWithAView/garden-background.jpg',
    objectsPath: '/assets/minigames/spring/bloomWithAView/hidden-objects.png',
    tilesPath: '/assets/minigames/spring/bloomWithAView/flower-tiles.png',
    
    // Alternative paths (lowercase w)
    bgPathPngAlt: '/assets/minigames/spring/bloomwithAView/garden-background.png',
    bgPathJpgAlt: '/assets/minigames/spring/bloomwithAView/garden-background.jpg',
    objectsPathAlt: '/assets/minigames/spring/bloomwithAView/hidden-objects.png',
    tilesPathAlt: '/assets/minigames/spring/bloomwithAView/flower-tiles.png',
    
    // Different object name alternatives
    objectsPathAlt2: '/assets/minigames/spring/bloomwithAView/hidden_objects_sprites.png',
    objectsPathAlt3: '/assets/minigames/spring/bloomWithAView/hidden_objects_sprites.png'
  };
  
  // Additional search path from minigrames folder (typo in the folder name exists in the codebase)
  const minigramePaths = {
    bgPathPng: '/assets/minigrames/spring/bloomwithAView/garden-background.png',
    objectsPath: '/assets/minigrames/spring/bloomwithAView/hidden_objects_sprites.png',
    tilesPath: '/assets/minigrames/spring/bloomwithAView/flower-tiles.png'
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
      console.log(`All BloomWithAView assets loaded successfully from paths: ${bgPath}, ${objPath}, ${tilePath}`);
      onLoad(bgPath, objPath, tilePath, false);
    } else if (debugMode) {
      console.log('Using debug mode for BloomWithAView assets');
      // Use fallback paths for debug mode
      const fallbackBgPath = '/assets/backgrounds/stonewich-cityscape.jpg';
      onLoad(fallbackBgPath, objPath || possiblePaths.objectsPath, tilePath || possiblePaths.tilesPath, true);
    }
  };
  
  // Try all possible background paths
  const tryLoadBackground = () => {
    let attempts = 0;
    const tryNextBg = (paths) => {
      if (attempts >= paths.length) {
        console.warn('Failed to load garden background from any path');
        debugMode = true;
        checkAllLoaded();
        return;
      }
      
      const path = paths[attempts];
      console.log(`Trying to load background from: ${path}`);
      const img = new Image();
      img.onload = () => {
        console.log(`Successfully loaded garden background from: ${path}`);
        bgLoaded = true;
        bgPath = path;
        checkAllLoaded();
      };
      img.onerror = () => {
        console.log(`Failed to load garden background from: ${path}, trying next...`);
        attempts++;
        tryNextBg(paths);
      };
      img.src = path;
    };
    
    // Try all paths in order
    tryNextBg([
      possiblePaths.bgPathPng,
      possiblePaths.bgPathJpg,
      possiblePaths.bgPathPngAlt,
      possiblePaths.bgPathJpgAlt,
      minigramePaths.bgPathPng
    ]);
  };
  
  // Try all possible object sprite paths
  const tryLoadObjects = () => {
    let attempts = 0;
    const tryNextObj = (paths) => {
      if (attempts >= paths.length) {
        console.warn('Failed to load hidden objects from any path');
        debugMode = true;
        checkAllLoaded();
        return;
      }
      
      const path = paths[attempts];
      console.log(`Trying to load hidden objects from: ${path}`);
      const img = new Image();
      img.onload = () => {
        console.log(`Successfully loaded hidden objects from: ${path}`);
        objectsLoaded = true;
        objPath = path;
        checkAllLoaded();
      };
      img.onerror = () => {
        console.log(`Failed to load hidden objects from: ${path}, trying next...`);
        attempts++;
        tryNextObj(paths);
      };
      img.src = path;
    };
    
    // Try all paths in order
    tryNextObj([
      possiblePaths.objectsPath,
      possiblePaths.objectsPathAlt,
      possiblePaths.objectsPathAlt2,
      possiblePaths.objectsPathAlt3,
      minigramePaths.objectsPath
    ]);
  };
  
  // Try all possible tile paths
  const tryLoadTiles = () => {
    let attempts = 0;
    const tryNextTiles = (paths) => {
      if (attempts >= paths.length) {
        console.warn('Failed to load flower tiles from any path');
        debugMode = true;
        checkAllLoaded();
        return;
      }
      
      const path = paths[attempts];
      console.log(`Trying to load flower tiles from: ${path}`);
      const img = new Image();
      img.onload = () => {
        console.log(`Successfully loaded flower tiles from: ${path}`);
        tilesLoaded = true;
        tilePath = path;
        checkAllLoaded();
      };
      img.onerror = () => {
        console.log(`Failed to load flower tiles from: ${path}, trying next...`);
        attempts++;
        tryNextTiles(paths);
      };
      img.src = path;
    };
    
    // Try all paths in order
    tryNextTiles([
      possiblePaths.tilesPath,
      possiblePaths.tilesPathAlt,
      minigramePaths.tilesPath
    ]);
  };
  
  // Start trying to load all assets
  tryLoadBackground();
  tryLoadObjects();
  tryLoadTiles();
  
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
