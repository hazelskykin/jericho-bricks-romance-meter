
import { assetManager } from './assetManager';
import { getAssetSource } from './helpers';
import { GameAsset, AssetStats } from './types';

// Export types
export type { GameAsset, AssetStats };

// Export the singleton instance
export { assetManager };

// Export utility functions
export const getAsset = (src: string): HTMLImageElement | undefined => {
  return assetManager.getAsset(src);
};

export const hasAsset = (src: string): boolean => {
  return assetManager.hasAsset(src);
};

// Re-export getAssetSource
export { getAssetSource };

export default assetManager;
