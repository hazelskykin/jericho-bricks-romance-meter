
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
  // General fallbacks for common assets
  if (originalPath.includes('/audio/')) {
    return 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAXAAAARW5jb2RlZCBieQBMYXZmNTguMjkuMTAwVFlFUgAAAAUAAAAyMDIzVFBFMQAAAAcAAABMYXZmNTgAVERSTQAAAAUAAAAyMDIzVENPTgAAAAsAAABTaWxlbnQgTVAzAFByaXYA0jAAAFRJVDIAAAANAAAAU2lsZW5jZSAwLjFzAENPTU0AAAAPAAAAZW5nAFNpbGVuY2UgMC4xAENPTU0AAAAdAAAATGF2ZjU4LjI5LjEwMCAoTGliYXYgNTguMTgpAENPTQAAAA8AAABlbmcAU2lsZW5jZSAwLjEAL/8=';
  }
  
  // Fallbacks for character expressions
  if (originalPath.includes('/characters/')) {
    const character = originalPath.match(/\/characters\/([^-]+)/)?.[1];
    if (character) {
      return `/assets/characters/${character}-neutral.png`;
    }
  }
  
  // Fallback for minigame assets
  if (originalPath.includes('/minigames/') || originalPath.includes('/minigrames/')) {
    // Check for specific bloom with a view files
    if (originalPath.includes('bloomWithAView/garden-background.png')) {
      return '/assets/backgrounds/stonewich-cityscape.jpg'; // Use a city background as fallback
    }
    
    // Check for mud arena
    if (originalPath.includes('mudFling/mud-arena.png')) {
      return '/assets/backgrounds/stonewich-cityscape.jpg'; // Use a city background as fallback
    }
    
    // Fix common path issues
    return originalPath.replace('/minigrames/', '/minigames/');
  }
  
  return originalPath;
}

/**
 * Fix common path issues with assets
 */
export function fixAssetPath(path: string): string {
  if (!path) return '';
  
  // Fix minigrames vs minigames typo
  if (path.includes('/minigrames/')) {
    path = path.replace('/minigrames/', '/minigames/');
  }
  
  // Fix capitalization issues
  if (path.includes('/bloomwithAView/')) {
    path = path.replace('/bloomwithAView/', '/bloomWithAView/');
  }
  
  // Handle specific troublesome paths
  if (path.includes('/minigames/spring/bloomWithAView/garden-background.png')) {
    console.log('Using fallback for garden-background.png');
    path = '/assets/backgrounds/stonewich-cityscape.jpg';
  }
  
  if (path.includes('/minigames/spring/mudFling/mud-arena.png')) {
    console.log('Using fallback for mud-arena.png');
    path = '/assets/backgrounds/stonewich-cityscape.jpg';
  }
  
  return path;
}
