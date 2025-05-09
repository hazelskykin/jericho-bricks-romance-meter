
import { toast } from 'sonner';

// Define types for assets
export interface GameAsset {
  id: string;
  src: string;
  type: 'background' | 'character' | 'ui' | 'minigame';
  priority?: boolean;
}

// Asset cache interface
interface AssetCache {
  images: Map<string, HTMLImageElement>;
  loaded: Set<string>;
  failed: Set<string>;
}

// Create a singleton for the asset manager
class AssetManager {
  private static instance: AssetManager;
  private cache: AssetCache;
  private loadQueue: string[];
  private loading: boolean;
  private completionCallbacks: Array<() => void>;

  private constructor() {
    this.cache = {
      images: new Map<string, HTMLImageElement>(),
      loaded: new Set<string>(),
      failed: new Set<string>()
    };
    this.loadQueue = [];
    this.loading = false;
    this.completionCallbacks = [];
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  /**
   * Preload a batch of assets
   */
  public preloadAssets(assets: string[], onProgress?: (loaded: number, total: number) => void): Promise<void> {
    return new Promise((resolve) => {
      const totalAssets = assets.length;
      let loadedCount = 0;

      // Filter out already loaded or queued assets
      const newAssets = assets.filter(src => 
        !this.cache.loaded.has(src) && 
        !this.cache.failed.has(src) &&
        !this.loadQueue.includes(src)
      );

      if (newAssets.length === 0) {
        // All assets already loaded or in queue
        resolve();
        return;
      }

      // Add new assets to the queue
      this.loadQueue.push(...newAssets);

      const loadNextBatch = (startIndex: number, batchSize: number) => {
        const endIndex = Math.min(startIndex + batchSize, this.loadQueue.length);
        const batch = this.loadQueue.slice(startIndex, endIndex);

        Promise.all(
          batch.map(src => this.loadSingleAsset(src))
        ).then(() => {
          loadedCount += batch.length;
          if (onProgress) {
            onProgress(loadedCount, totalAssets);
          }

          if (startIndex + batchSize < this.loadQueue.length) {
            // Load next batch
            loadNextBatch(endIndex, batchSize);
          } else {
            // All assets processed
            this.loadQueue = this.loadQueue.filter(src => 
              !this.cache.loaded.has(src) && 
              !this.cache.failed.has(src)
            );
            resolve();
          }
        });
      };

      // Start loading in batches of 5
      loadNextBatch(0, 5);
    });
  }

  /**
   * Load a single asset
   */
  private loadSingleAsset(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (this.cache.loaded.has(src)) {
        resolve(this.cache.images.get(src)!);
        return;
      }

      // Load new image
      const img = new Image();
      
      img.onload = () => {
        this.cache.images.set(src, img);
        this.cache.loaded.add(src);
        resolve(img);
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        this.cache.failed.add(src);
        
        // Try fallback
        if (!src.includes('silence.mp3')) {
          console.info(`Trying fallback asset for: ${src}`);
          const fallbackImg = new Image();
          fallbackImg.src = '/placeholder.svg';
          this.cache.images.set(src, fallbackImg);
          resolve(fallbackImg);
        } else {
          reject(new Error(`Failed to load asset: ${src}`));
        }
      };
      
      img.src = src;
    });
  }

  /**
   * Get an asset from the cache
   */
  public getAsset(src: string): HTMLImageElement | undefined {
    return this.cache.images.get(src);
  }

  /**
   * Check if an asset is loaded
   */
  public hasAsset(src: string): boolean {
    return this.cache.loaded.has(src);
  }

  /**
   * Check if an asset failed to load
   */
  public didAssetFail(src: string): boolean {
    return this.cache.failed.has(src);
  }

  /**
   * Get loading statistics
   */
  public getStats(): { loaded: number, failed: number, total: number } {
    return {
      loaded: this.cache.loaded.size,
      failed: this.cache.failed.size,
      total: this.cache.loaded.size + this.cache.failed.size
    };
  }
  
  /**
   * Make the cache available globally through window
   */
  public exposeToWindow(): void {
    if (typeof window !== 'undefined') {
      (window as any).gameImageCache = this.cache.images;
    }
  }
}

// Export a singleton instance
export const assetManager = AssetManager.getInstance();

// Export a simplified API for getting assets
export const getAsset = (src: string): HTMLImageElement | undefined => {
  return assetManager.getAsset(src);
};

export const hasAsset = (src: string): boolean => {
  return assetManager.hasAsset(src);
};

// Utility function to extract image source from various asset types
export const getAssetSource = (asset: any): string => {
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
};

export default assetManager;
