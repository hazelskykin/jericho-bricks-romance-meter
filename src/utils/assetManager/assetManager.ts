
import { AssetCache, AssetStats, ProgressCallback } from './types';
import { fixPath } from './helpers';
import { initPlaceholder, getPlaceholder, createCanvasFallback } from './fallbackImage';

/**
 * AssetManager - Handles loading and caching of game assets
 */
export class AssetManager {
  private static instance: AssetManager;
  private cache: AssetCache;
  private loadQueue: string[];
  private loading: boolean;
  private completionCallbacks: Array<() => void>;
  private loadingAttempts: Map<string, number>;
  private loadImmediateMode: boolean;

  private constructor() {
    this.cache = {
      images: new Map<string, HTMLImageElement>(),
      loaded: new Set<string>(),
      failed: new Set<string>()
    };
    this.loadQueue = [];
    this.loading = false;
    this.completionCallbacks = [];
    this.loadingAttempts = new Map<string, number>();
    this.loadImmediateMode = false; // Default to batch loading
    
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
      
      const totalAssets = validAssets.length;
      let loadedCount = 0;

      // Filter out already loaded or queued assets
      const newAssets = validAssets.filter(src => 
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

      // Immediate mode - load all at once for critical assets
      if (this.loadImmediateMode) {
        Promise.all(
          this.loadQueue.map(src => this.loadSingleAsset(src))
        ).then(() => {
          if (onProgress) {
            onProgress(this.loadQueue.length, this.loadQueue.length);
          }
          
          this.loadQueue = [];
          resolve();
        });
        return;
      }

      // Normal batch loading mode
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
    return new Promise((resolve) => {
      // Check if already loaded
      if (this.cache.loaded.has(src)) {
        resolve(this.cache.images.get(src)!);
        return;
      }
      
      // Check if src is undefined or empty
      if (!src) {
        console.warn(`Invalid image path: empty or undefined`);
        this.cache.failed.add(src);
        this.useFallbackImage(src, resolve);
        return;
      }

      // Track loading attempts for this asset
      const attempts = this.loadingAttempts.get(src) || 0;
      this.loadingAttempts.set(src, attempts + 1);
      
      // If too many attempts, go straight to fallback
      if (attempts >= 2) {
        console.warn(`Too many attempts for ${src}, using fallback`);
        this.cache.failed.add(src);
        this.useFallbackImage(src, resolve);
        return;
      }

      // Fix path with potential issues
      const fixedPath = fixPath(src);

      // For lovable.dev preview, bypass real loading after first attempt
      if (attempts > 0 && typeof window !== 'undefined' && 
          window.location.hostname.includes('lovable.dev')) {
        console.log(`Using quick fallback for lovable.dev preview: ${src}`);
        this.useFallbackImage(src, resolve);
        return;
      }

      // Load new image
      const img = new Image();
      
      img.onload = () => {
        this.cache.images.set(src, img);
        this.cache.loaded.add(src);
        console.log(`Successfully loaded image: ${src}`);
        resolve(img);
      };
      
      img.onerror = (e) => {
        console.error(`Failed to load image: ${fixedPath}`, e);
        this.cache.failed.add(src);
        this.useFallbackImage(src, resolve);
      };
      
      // Set crossOrigin to anonymous to prevent CORS issues
      img.crossOrigin = "anonymous";
      
      // Use the potentially fixed path
      img.src = fixedPath;
      
      // Add a timeout to prevent hanging - REDUCED from 15s to 5s to avoid long waits
      setTimeout(() => {
        if (!this.cache.loaded.has(src) && !this.cache.failed.has(src)) {
          console.warn(`Image load timeout for: ${fixedPath}`);
          this.cache.failed.add(src);
          this.useFallbackImage(src, resolve);
        }
      }, 5000); // 5 second timeout
    });
  }
  
  // Helper method to provide fallback image
  private useFallbackImage(src: string, resolve: (img: HTMLImageElement) => void) {
    try {
      // First, check if we have a real image with the same name pattern
      // This helps when the path is slightly wrong but the file exists
      const similarImage = this.findSimilarImage(src);
      if (similarImage) {
        console.log(`Using similar image for: ${src}`);
        this.cache.images.set(src, similarImage);
        resolve(similarImage);
        return;
      }

      // Try to provide appropriate fallback based on path
      const placeholderImg = getPlaceholder();
      
      if (placeholderImg) {
        // Use placeholder
        console.log(`Using placeholder for: ${src}`);
        this.cache.images.set(src, placeholderImg);
        resolve(placeholderImg);
      } else {
        // If even the placeholder fails, create a simple canvas fallback
        const fallbackImg = createCanvasFallback(src);
        this.cache.images.set(src, fallbackImg);
        resolve(fallbackImg);
      }
    } catch (e) {
      console.error('Error creating fallback image:', e);
      // Last resort - create a minimal Image object
      const lastResortImg = new Image();
      lastResortImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
      this.cache.images.set(src, lastResortImg);
      resolve(lastResortImg);
    }
  }
  
  // Try to find a similar image in the cache
  private findSimilarImage(src: string): HTMLImageElement | undefined {
    // Don't try this if src is missing
    if (!src) return undefined;
    
    // Extract filename without extension
    const match = src.match(/\/([^\/]+)\.[^\.]+$/);
    if (!match || !match[1]) return undefined;
    
    const baseFilename = match[1];
    
    // Look for any loaded image with a similar name
    for (const [cachedSrc, img] of this.cache.images.entries()) {
      if (cachedSrc.includes(baseFilename) && this.cache.loaded.has(cachedSrc)) {
        return img;
      }
    }
    
    return undefined;
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
  public getStats(): AssetStats {
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
   * Force success for an asset (useful for lovable.dev preview or when asset is optional)
   */
  public forceAssetSuccess(src: string): void {
    if (!src) return;
    
    // If the asset already failed, remove from failed set
    if (this.cache.failed.has(src)) {
      this.cache.failed.delete(src);
    }
    
    // If the asset isn't already marked as loaded, use a fallback image
    if (!this.cache.loaded.has(src)) {
      const placeholder = getPlaceholder() || createCanvasFallback(src);
      this.cache.images.set(src, placeholder);
      this.cache.loaded.add(src);
    }
  }
}

// Export a singleton instance
export const assetManager = AssetManager.getInstance();
