
import { BackgroundAsset, MinigameAsset } from '@/types/assets';
import { CharacterExpression } from '@/types/expressions';

/**
 * Utility functions for handling game assets consistently
 */

/**
 * Safely extract the file path from any asset type
 */
export function getAssetPath(asset: any): string {
  if (!asset) {
    console.warn('Empty asset provided to getAssetPath');
    return '/assets/backgrounds/stonewich-cityscape.jpg'; // Default
  }
  
  if (typeof asset === 'string') {
    return fixAssetPath(asset);
  }
  
  // Handle standard asset types
  if (typeof asset === 'object') {
    // MinigameAsset type
    if ('src' in asset && typeof asset.src === 'string') {
      return fixAssetPath(asset.src);
    }
    
    // BackgroundAsset type
    if ('image' in asset && typeof asset.image === 'string') {
      return fixAssetPath(asset.image);
    }
    
    // CharacterExpression type
    if ('characterId' in asset && 'mood' in asset && 'image' in asset) {
      return fixAssetPath(asset.image);
    }
  }
  
  console.warn('Unknown asset type:', asset);
  return '/assets/backgrounds/stonewich-cityscape.jpg'; // Default fallback
}

/**
 * Check if an asset is considered high priority for loading
 */
export function isHighPriorityAsset(asset: any): boolean {
  if (!asset || typeof asset !== 'object') return false;
  
  return Boolean(asset.priority);
}

/**
 * Generate fallback path for common missing assets
 */
export function getFallbackAssetPath(originalPath: string): string {
  // If the path is empty or undefined, return a generic fallback
  if (!originalPath) {
    return '/assets/backgrounds/stonewich-cityscape.jpg';
  }
  
  // For minigame assets, always return a city background
  if (originalPath.includes('/minigame')) {
    return '/assets/backgrounds/stonewich-cityscape.jpg';
  }
  
  // General fallbacks for common assets
  if (originalPath.includes('/audio/')) {
    return 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAXAAAARW5jb2RlZCBieQBMYXZmNTguMjkuMTAwVFlFUgAAAAUAAAAyMDIzVFBFMQAAAAcAAABMYXZmNTgAVERSTQAAAAUAAAAyMDIzVENPTgAAAAsAAABTaWxlbnQgTVAzAFByaXYA0jAAAFRJVDIAAAANAAAAU2lsZW5jZSAwLjFzAENPTU0AAAAPAAAAZW5nAFNpbGVuY2UgMC4xAENPTU0AAAAdAAAATGF2ZjU4LjI5LjEwMCAoTGliYXYgNTguMTgpAENPTQAAAA8AAABlbmcAU2lsZW5jZSAwLjEAL/8=';
  }
  
  // Fallbacks for character expressions
  if (originalPath.includes('/characters/')) {
    return '/assets/backgrounds/stonewich-cityscape.jpg';
  }
  
  return '/assets/backgrounds/stonewich-cityscape.jpg';
}

/**
 * Fix common path issues with assets
 */
export function fixAssetPath(path: string): string {
  if (!path) {
    console.warn('Empty path provided to fixAssetPath');
    return '/assets/backgrounds/stonewich-cityscape.jpg';
  }
  
  // Make absolute paths for all asset paths that don't start with http or data:
  if (!path.startsWith('/') && !path.startsWith('http') && !path.startsWith('data:')) {
    path = `/${path}`;
  }
  
  // Ensure jpg is used correctly for backgrounds
  if (path.includes('/backgrounds/') && !path.endsWith('.jpg')) {
    if (path.endsWith('.png')) {
      path = path.replace('.png', '.jpg');
    } 
    // If no extension, add .jpg
    else if (!path.endsWith('.jpg') && !path.endsWith('.jpeg')) {
      path = `${path}.jpg`;
    }
  }
  
  // Always use PNG for characters
  if (path.includes('/characters/') && !path.endsWith('.png')) {
    if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      path = path.replace(/\.jpe?g$/, '.png');
    }
    // If no extension, add .png
    else if (!path.endsWith('.png')) {
      path = `${path}.png`;
    }
  }
  
  // If a path incorrectly includes minigrames, correct it to minigames
  if (path.includes('/minigrames/')) {
    return path.replace('/minigrames/', '/minigames/');
  }
  
  // Correct issue with "wall-tiles" vs "wall-tiles.jpg"
  if (path.includes('wall-tiles') && !path.endsWith('.jpg')) {
    return path.replace('wall-tiles', 'wall-tiles.jpg');
  }
  
  return path;
}

/**
 * Verify the existence of an image by checking its actual response
 */
export function verifyImageExists(imagePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!imagePath) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath;
    
    // Add timeout to prevent hanging
    setTimeout(() => resolve(false), 5000);
  });
}
