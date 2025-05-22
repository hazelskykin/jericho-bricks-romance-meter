
import { AssetCache, AssetStats, ProgressCallback } from './types';
import { initPlaceholder, getPlaceholder, createCanvasFallback, getMinimalFallback } from './fallbackImage';

/**
 * AssetManager - Handles loading and caching of game assets
 */
export class AssetManager {
  private static instance: AssetManager;
  private cache: AssetCache;
  private loading: boolean;
  private loadingAttempts: Map<string, number>;
  private loadImmediateMode: boolean;
  private maxRetries: number = 1; // Reduced from previous value

  private constructor() {
    this.cache = {
      images: new Map<string, HTMLImageElement>(),
      loaded: new Set<string>(),
      failed: new Set<string>()
    };
    this.loading = false;
    this.loadingAttempts = new Map<string, number>();
    this.loadImmediateMode = false;
    
    // Initialize placeholder image
    initPlaceholder();
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }
  
  /**
   * Set immediate loading mode (useful for critical assets)
   */
  public setLoadImmediateMode(immediate: boolean): void {
    this.loadImmediateMode = immediate;
  }

  /**
   * Preload a batch of assets
   */
  public preloadAssets(assets: string[], onProgress?: ProgressCallback): Promise<void> {
    return new Promise((resolve) => {
      // Filter out any undefined or null values
      const validAssets = assets.filter(src => src);
      
      if (validAssets.length === 0) {
        // No valid assets to load
        resolve();
        return;
      }
      
      // Filter out already loaded or failed assets
      const newAssets = validAssets.filter(src => 
        !this.cache.loaded.has(src) && 
        !this.cache.failed.has(src)
      );

      if (newAssets.length === 0) {
        // All assets already loaded or failed
        resolve();
        return;
      }

      // Load all assets at once in immediate mode
      if (this.loadImmediateMode) {
        Promise.all(
          newAssets.map(src => this.loadSingleAsset(src))
        ).then(() => {
          if (onProgress) {
            onProgress(newAssets.length, newAssets.length);
          }
          resolve();
        });
        return;
      }

      // Normal batch loading mode
      const batchSize = 5;
      let loadedCount = 0;
      
      const loadNextBatch = (startIndex: number) => {
        const endIndex = Math.min(startIndex + batchSize, newAssets.length);
        const batch = newAssets.slice(startIndex, endIndex);

        Promise.all(
          batch.map(src => this.loadSingleAsset(src))
        ).then(() => {
          loadedCount += batch.length;
          if (onProgress) {
            onProgress(loadedCount, newAssets.length);
          }

          if (endIndex < newAssets.length) {
            // Load next batch
            loadNextBatch(endIndex);
          } else {
            // All assets processed
            resolve();
          }
        });
      };

      // Start loading in batches
      loadNextBatch(0);
    });
  }

  /**
   * Load a single asset with simplified error handling
   */
  private loadSingleAsset(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      // Check if already loaded
      if (this.cache.loaded.has(src)) {
        resolve(this.cache.images.get(src)!);
        return;
      }
      
      // Check if src is invalid
      if (!src) {
        this.cache.failed.add(src);
        const fallback = getPlaceholder();
        resolve(fallback);
        return;
      }

      // Track loading attempts to avoid infinite retries
      const attempts = this.loadingAttempts.get(src) || 0;
      this.loadingAttempts.set(src, attempts + 1);
      
      // If too many attempts, use fallback immediately
      if (attempts >= this.maxRetries) {
        console.warn(`Too many attempts for ${src}, using fallback`);
        this.cache.failed.add(src);
        const fallback = getPlaceholder();
        this.cache.images.set(src, fallback);
        resolve(fallback);
        return;
      }

      // Load new image with reasonable timeout
      const img = new Image();
      
      img.onload = () => {
        this.cache.images.set(src, img);
        this.cache.loaded.add(src);
        console.log(`Successfully loaded image: ${src}`);
        resolve(img);
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        this.cache.failed.add(src);
        const fallback = getPlaceholder();
        this.cache.images.set(src, fallback);
        resolve(fallback);
      };
      
      // Set crossOrigin and src
      img.crossOrigin = "anonymous";
      img.src = src;
      
      // 3 second timeout reduced from previous 5s
      setTimeout(() => {
        if (!this.cache.loaded.has(src) && !this.cache.failed.has(src)) {
          console.warn(`Image load timeout for: ${src}`);
          this.cache.failed.add(src);
          const fallback = getPlaceholder();
          this.cache.images.set(src, fallback);
          resolve(fallback);
        }
      }, 3000);
    });
  }

  /**
   * Get an asset from the cache
   */
  public getAsset(src: string): HTMLImageElement | undefined {
    const img = this.cache.images.get(src);
    if (img) return img;
    
    // Return fallback if asset failed
    if (this.didAssetFail(src)) {
      const fallback = getPlaceholder();
      this.cache.images.set(src, fallback);
      return fallback;
    }
    
    return undefined;
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
  public getStats(): AssetStats {
    return {
      loaded: this.cache.loaded.size,
      failed: this.cache.failed.size,
      total: this.cache.loaded.size + this.cache.failed.size
    };
  }
  
  /**
   * Make the cache available globally for debugging
   */
  public exposeToWindow(): void {
    if (typeof window !== 'undefined') {
      (window as any).gameImageCache = this.cache.images;
      (window as any).assetManager = this;
    }
  }
  
  /**
   * Clear any failed assets and allow them to be retried
   */
  public clearFailedAssets(): void {
    this.cache.failed.clear();
    this.loadingAttempts.clear();
    console.log("Cleared failed asset cache to allow retrying");
  }
  
  /**
   * Force success for an asset
   */
  public forceAssetSuccess(src: string): void {
    if (!src) return;
    
    // Remove from failed set if present
    if (this.cache.failed.has(src)) {
      this.cache.failed.delete(src);
    }
    
    // If not already loaded, add a placeholder
    if (!this.cache.loaded.has(src)) {
      const placeholder = getPlaceholder();
      this.cache.images.set(src, placeholder);
      this.cache.loaded.add(src);
    }
  }
}

// Export a singleton instance
export const assetManager = AssetManager.getInstance();
