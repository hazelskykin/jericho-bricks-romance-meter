
import { assetManager } from './assetManager';

/**
 * Image cache utility for faster access to preloaded images
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
    return {
      get: () => undefined,
      has: () => false,
      set: () => {},
      clear: () => {},
      preload: () => Promise.resolve(new Image())
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
    },
    
    // New method to preload an image and return it
    preload: (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        // First check if already cached
        if (localCache.has(src)) {
          resolve(localCache.get(src)!);
          return;
        }
        
        if (assetManager.hasAsset(src)) {
          const img = assetManager.getAsset(src)!;
          localCache.set(src, img);
          resolve(img);
          return;
        }
        
        // Not in cache, load it
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        img.onload = () => {
          localCache.set(src, img);
          try {
            assetManager.preloadAssets([src]);
          } catch (e) {
            console.warn(`AssetManager failed to cache image: ${src}`, e);
          }
          resolve(img);
        };
        
        img.onerror = () => {
          console.error(`Failed to preload image: ${src}`);
          
          // Try to use asset manager fallback
          assetManager.setLoadImmediateMode(true); 
          assetManager.preloadAssets([src])
            .then(() => {
              assetManager.setLoadImmediateMode(false);
              
              // Even if it failed in asset manager, it should have created a fallback
              const fallbackImg = assetManager.getAsset(src);
              if (fallbackImg) {
                localCache.set(src, fallbackImg);
                resolve(fallbackImg);
              } else {
                // Last resort - create a simple image
                const emptyImg = new Image();
                emptyImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
                localCache.set(src, emptyImg);
                resolve(emptyImg);
              }
            });
        };
        
        img.src = src;
        
        // Add a timeout to prevent hanging
        setTimeout(() => {
          if (!img.complete) {
            console.warn(`Image timeout in imageCache.preload: ${src}`);
            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
          }
        }, 5000);
      });
    }
  };
};

export default getImageCache;
