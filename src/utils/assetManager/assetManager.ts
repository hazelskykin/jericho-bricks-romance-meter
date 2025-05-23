
import { AssetCache, AssetStats, ProgressCallback } from './types';
import { getPlaceholder, createCanvasFallback } from './fallbackImage';

/**
 * AssetManager - Simplified version that handles loading and caching of game assets
 */
export class AssetManager {
  private static instance: AssetManager;
  private cache: AssetCache;
  private loading: boolean;
  private maxRetries: number = 2;
  private timeoutDuration: number = 8000; // Increased timeout

  private constructor() {
    this.cache = {
      images: new Map<string, HTMLImageElement>(),
      loaded: new Set<string>(),
      failed: new Set<string>()
    };
    this.loading = false;
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
    // This is kept for API compatibility but doesn't do anything now
    // We always load images immediately
  }

  /**
   * Preload a batch of assets with simplified approach
   */
  public preloadAssets(assets: string[], onProgress?: ProgressCallback): Promise<void> {
    return new Promise((resolve) => {
      // Filter out any undefined or null values
      const validAssets = assets.filter(src => src);
      
      if (validAssets.length === 0) {
        resolve();
        return;
      }

      let loadedCount = 0;
      const totalCount = validAssets.length;

      // Load all assets in parallel for speed
      validAssets.forEach(src => {
        this.loadImage(src)
          .then(() => {
            loadedCount++;
            if (onProgress) {
              onProgress(loadedCount, totalCount);
            }
            if (loadedCount === totalCount) {
              resolve();
            }
          })
          .catch(() => {
            // Count failed loads toward the total
            loadedCount++;
            if (onProgress) {
              onProgress(loadedCount, totalCount);
            }
            if (loadedCount === totalCount) {
              resolve();
            }
          });
      });
    });
  }

  /**
   * Load a single image with proper error handling
   */
  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (!src) {
        console.error("Attempted to load image with empty src");
        const fallback = createCanvasFallback("empty-src");
        this.cache.images.set("empty-src", fallback);
        resolve(fallback);
        return;
      }
      
      // Return immediately if we already have this image
      if (this.cache.loaded.has(src)) {
        resolve(this.cache.images.get(src)!);
        return;
      }

      // If we've already tried and failed to load this image, use the fallback
      if (this.cache.failed.has(src)) {
        const fallback = createCanvasFallback(src);
        this.cache.images.set(src, fallback);
        resolve(fallback);
        return;
      }

      // Create a new image
      const img = new Image();
      
      // Set up a quick timeout to avoid hanging
      const timeoutId = setTimeout(() => {
        console.warn(`Image load timeout for: ${src}`);
        this.cache.failed.add(src);
        const fallback = createCanvasFallback(src);
        this.cache.images.set(src, fallback);
        resolve(fallback);
      }, this.timeoutDuration);
      
      // Set up success handler
      img.onload = () => {
        clearTimeout(timeoutId);
        this.cache.images.set(src, img);
        this.cache.loaded.add(src);
        console.log(`Successfully loaded image: ${src}`);
        resolve(img);
      };
      
      // Set up error handler
      img.onerror = () => {
        clearTimeout(timeoutId);
        console.error(`Failed to load image: ${src}`);
        this.cache.failed.add(src);
        const fallback = createCanvasFallback(src);
        this.cache.images.set(src, fallback);
        resolve(fallback);
      };
      
      // Actually start loading the image
      img.crossOrigin = "anonymous";
      img.src = src;
    });
  }

  /**
   * Get an asset from the cache
   */
  public getAsset(src: string): HTMLImageElement | undefined {
    if (!src) return undefined;
    return this.cache.images.get(src);
  }

  /**
   * Check if an asset is loaded
   */
  public hasAsset(src: string): boolean {
    if (!src) return false;
    return this.cache.loaded.has(src);
  }

  /**
   * Check if an asset failed to load
   */
  public didAssetFail(src: string): boolean {
    if (!src) return false;
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
   * Clear failed assets to allow retry
   */
  public clearFailedAssets(): void {
    this.cache.failed.clear();
    console.log("Cleared failed asset cache to allow retrying");
  }

  /**
   * Force an asset to be considered successful
   */
  public forceAssetSuccess(src: string): void {
    if (!src) return;
    
    // Remove from failed set if present
    if (this.cache.failed.has(src)) {
      this.cache.failed.delete(src);
    }
    
    // If not already loaded, add a placeholder
    if (!this.cache.loaded.has(src)) {
      const placeholder = createCanvasFallback(src);
      this.cache.images.set(src, placeholder);
      this.cache.loaded.add(src);
      console.log(`Forced success for asset: ${src}`);
    }
  }
  
  /**
   * Get debug information about an asset
   */
  public getAssetDebugInfo(src: string): {exists: boolean, loaded: boolean, failed: boolean} {
    return {
      exists: this.cache.images.has(src),
      loaded: this.cache.loaded.has(src),
      failed: this.cache.failed.has(src)
    };
  }
}

// Export a singleton instance
export const assetManager = AssetManager.getInstance();
