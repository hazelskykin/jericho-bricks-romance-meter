
import { assetManager } from './assetManager';

/**
 * Image cache utility for faster access to preloaded images
 */
interface ImageCache {
  get: (src: string) => HTMLImageElement | undefined;
  has: (src: string) => boolean;
  set: (src: string, img: HTMLImageElement) => void;
  clear: () => void;
}

export const getImageCache = (): ImageCache => {
  if (typeof window === 'undefined') {
    return {
      get: () => undefined,
      has: () => false,
      set: () => {},
      clear: () => {}
    };
  }
  
  // Create a local cache that works reliably
  const localCache = new Map<string, HTMLImageElement>();
  
  return {
    get: (src: string) => {
      // First try our local cache
      if (localCache.has(src)) {
        return localCache.get(src);
      }
      
      // Then try the asset manager
      const img = assetManager.getAsset(src);
      if (img) {
        localCache.set(src, img);
      }
      return img;
    },
    
    has: (src: string) => {
      return localCache.has(src) || assetManager.hasAsset(src);
    },
    
    set: (src: string, img: HTMLImageElement) => {
      if (img && src) {
        // Add to our local cache first
        localCache.set(src, img);
        
        // Try to add to asset manager too
        try {
          // Expose to window for debugging
          assetManager.exposeToWindow();
          
          // Method 1: Add via the preload method
          assetManager.preloadAssets([src]);
          
          console.log(`Image cached successfully: ${src}`);
        } catch (e) {
          console.error(`Failed to cache image in asset manager: ${src}`, e);
          // Our local cache still works even if asset manager fails
        }
      }
    },
    
    clear: () => {
      localCache.clear();
    }
  };
};

export default getImageCache;
