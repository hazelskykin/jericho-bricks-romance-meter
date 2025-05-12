
/**
 * Types for asset management system
 */

// Define types for assets
export interface GameAsset {
  id: string;
  src: string;
  type: 'background' | 'character' | 'ui' | 'minigame';
  priority?: boolean;
}

// Asset cache interface
export interface AssetCache {
  images: Map<string, HTMLImageElement>;
  loaded: Set<string>;
  failed: Set<string>;
}

// Stats interface for reporting loading status
export interface AssetStats {
  loaded: number;
  failed: number;
  total: number;
}

// Progress callback for asset loading
export type ProgressCallback = (loaded: number, total: number) => void;
