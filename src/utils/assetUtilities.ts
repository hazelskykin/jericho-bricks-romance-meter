
import { BackgroundAsset, MinigameAsset } from '@/types/assets';
import { CharacterExpression } from '@/types/expressions';

/**
 * Utility functions for handling game assets consistently
 */

/**
 * Safely extract the file path from any asset type
 */
export function getAssetPath(asset: any): string {
  if (!asset) return '';
  
  if (typeof asset === 'string') {
    return asset;
  }
  
  // Handle standard asset types
  if (typeof asset === 'object') {
    // MinigameAsset type
    if ('src' in asset && typeof asset.src === 'string') {
      return asset.src;
    }
    
    // BackgroundAsset type
    if ('image' in asset && typeof asset.image === 'string') {
      return asset.image;
    }
    
    // CharacterExpression type
    if ('characterId' in asset && 'mood' in asset && 'image' in asset) {
      return asset.image;
    }
  }
  
  console.warn('Unknown asset type:', asset);
  return '';
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
    return '/assets/backgrounds/wall-tiles.jpg';
  }
  
  // For minigame assets, always return a city background
  if (originalPath.includes('/minigame') || originalPath.includes('/minigrames/')) {
    return '/assets/backgrounds/stonewich-cityscape.jpg';
  }
  
  // General fallbacks for common assets
  if (originalPath.includes('/audio/')) {
    return 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAXAAAARW5jb2RlZCBieQBMYXZmNTguMjkuMTAwVFlFUgAAAAUAAAAyMDIzVFBFMQAAAAcAAABMYXZmNTgAVERSTQAAAAUAAAAyMDIzVENPTgAAAAsAAABTaWxlbnQgTVAzAFByaXYA0jAAAFRJVDIAAAANAAAAU2lsZW5jZSAwLjFzAENPTU0AAAAPAAAAZW5nAFNpbGVuY2UgMC4xAENPTU0AAAAdAAAATGF2ZjU4LjI5LjEwMCAoTGliYXYgNTguMTgpAENPTQAAAA8AAABlbmcAU2lsZW5jZSAwLjEAL/8=';
  }
  
  // Fallbacks for character expressions
  if (originalPath.includes('/characters/')) {
    const character = originalPath.match(/\/characters\/([^-]+)/)?.[1];
    if (character) {
      return `/assets/backgrounds/stonewich-cityscape.jpg`;
    }
  }
  
  return '/assets/backgrounds/stonewich-cityscape.jpg';
}

/**
 * Fix common path issues with assets
 */
export function fixAssetPath(path: string): string {
  if (!path) return '/assets/backgrounds/stonewich-cityscape.jpg';
  
  // For any minigame asset, just return a cityscape background
  if (path.includes('/minigames/') || path.includes('/minigrames/')) {
    return '/assets/backgrounds/stonewich-cityscape.jpg';
  }
  
  return path;
}
