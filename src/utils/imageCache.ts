
import { assetManager } from './assetManager';

/**
 * Image cache utility for faster access to preloaded images
 */
interface ImageCache {
  get: (src: string) => HTMLImageElement | undefined;
  has: (src: string) => boolean;
  set: (src: string, img: HTMLImageElement) => void;
}

export const getImageCache = (): ImageCache => {
  if (typeof window === 'undefined') {
    return {
      get: () => undefined,
      has: () => false,
      set: () => {}
    };
  }
  
  // Use assetManager internally
  return {
    get: (src: string) => assetManager.getAsset(src),
    has: (src: string) => assetManager.hasAsset(src),
    set: (src: string, img: HTMLImageElement) => {
      if (img && src) {
        // Direct access to asset manager's internal cache
        assetManager.exposeToWindow();
        
        // Try both methods to ensure the image is cached
        try {
          // Method 1: Directly add to asset manager's cache
          const cache = (assetManager as any)['cache'];
          if (cache) {
            if (cache.images) cache.images.set(src, img);
            if (cache.loaded) cache.loaded.add(src);
          }
          
          // Method 2: Add via a fake preload
          const tempArray = [src];
          assetManager.preloadAssets(tempArray);
          
          console.log(`Image cached successfully: ${src}`);
        } catch (e) {
          console.error(`Failed to cache image: ${src}`, e);
        }
      }
    }
  };
};

export default getImageCache;
