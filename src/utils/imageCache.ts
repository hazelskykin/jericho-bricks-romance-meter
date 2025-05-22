
import { assetManager } from './assetManager';

/**
 * Simplified image cache utility that leverages the asset manager
 */
interface ImageCache {
  get: (src: string) => HTMLImageElement | undefined;
  has: (src: string) => boolean;
  set: (src: string, img: HTMLImageElement) => void;
  clear: () => void;
  preload: (src: string) => Promise<HTMLImageElement>;
}

export const getImageCache = (): ImageCache => {
  if (typeof window === 'undefined') {
    // Server-side rendering placeholder
    return {
      get: () => undefined,
      has: () => false,
      set: () => {},
      clear: () => {},
      preload: () => Promise.resolve(new Image())
    };
  }
  
  // Create a local cache
  const localCache = new Map<string, HTMLImageElement>();
  
  return {
    get: (src: string) => {
      // First try our local cache
      if (localCache.has(src)) {
        return localCache.get(src);
      }
      
      // Then try the asset manager
      return assetManager.getAsset(src);
    },
    
    has: (src: string) => {
      return localCache.has(src) || assetManager.hasAsset(src);
    },
    
    set: (src: string, img: HTMLImageElement) => {
      if (img && src) {
        // Add to local cache
        localCache.set(src, img);
      }
    },
    
    clear: () => {
      localCache.clear();
    },
    
    // Preload an image
    preload: (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        // First check if already cached
        if (localCache.has(src)) {
          resolve(localCache.get(src)!);
          return;
        }
        
        // Try asset manager
        if (assetManager.hasAsset(src)) {
          const img = assetManager.getAsset(src);
          if (img) {
            localCache.set(src, img);
            resolve(img);
            return;
          }
        }
        
        // Use asset manager to load it
        assetManager.preloadAssets([src])
          .then(() => {
            const img = assetManager.getAsset(src);
            if (img) {
              localCache.set(src, img);
              resolve(img);
            } else {
              // Create a new image
              const newImg = new Image();
              newImg.crossOrigin = "anonymous";
              newImg.src = src;
              
              newImg.onload = () => {
                localCache.set(src, newImg);
                resolve(newImg);
              };
              
              newImg.onerror = () => {
                // Use the fallback from asset manager
                const fallback = assetManager.getAsset(src) || new Image();
                localCache.set(src, fallback);
                resolve(fallback);
              };
            }
          })
          .catch(() => {
            // Create a new image as last resort
            const fallbackImg = new Image();
            fallbackImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
            localCache.set(src, fallbackImg);
            resolve(fallbackImg);
          });
      });
    }
  };
};

export default getImageCache;
