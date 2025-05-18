
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
      // Cache the image in assetManager
      if (img && src) {
        console.log(`Explicitly setting image in cache: ${src}`);
        const cache = assetManager['cache'];
        if (cache && cache.images) {
          cache.images.set(src, img);
          cache.loaded.add(src);
        }
      }
    }
  };
};

export default getImageCache;
