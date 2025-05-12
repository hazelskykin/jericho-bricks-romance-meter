
/**
 * Helper functions for asset management
 */

/**
 * Fix paths with capitalization issues
 * Enhanced to handle null/undefined values safely
 */
export function fixPath(src: string): string {
  // Safety check for null or undefined
  if (!src) {
    console.warn('Empty or undefined asset path provided');
    return ''; // Return empty string instead of trying to work with undefined
  }
  
  // Fix locaton-icons typo if it exists
  if (src.includes('/locaton-icons.png')) {
    return src.replace('/locaton-icons.png', '/location-icons.png');
  }
  
  // Fix BloomWithAView capitalization
  if (src.includes('/spring/bloomwithAView/')) {
    return src.replace('/spring/bloomwithAView/', '/spring/bloomWithAView/');
  }
  
  // Handle specific files that might have different names
  if (src.includes('/splashEffects_victoryEffect.png')) {
    return src.replace('/splashEffects_victoryEffect.png', '/splashVictory.png');
  }
  
  // Handle cases where paths might be pointing to the wrong directory
  if (src.startsWith('/assets/minigrames/')) {
    return src.replace('/assets/minigrames/', '/assets/minigames/');
  }
  
  return src;
}

/**
 * Extract image source from various asset types
 */
export function getAssetSource(asset: any): string {
  if (!asset) return '';
  
  // Handle different asset types
  if (typeof asset === 'string') {
    return asset;
  } else if (typeof asset === 'object') {
    // Object with src property
    if (asset.src) return asset.src;
    
    // Object with image property (backgrounds)
    if (asset.image) return asset.image;
    
    // Character expressions
    if (asset.characterId && asset.mood) {
      return asset.image || '';
    }
  }
  
  return '';
}
