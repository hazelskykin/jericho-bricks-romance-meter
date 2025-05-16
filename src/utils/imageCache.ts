
import { assetManager } from './assetManager';

/**
 * Image cache utility for faster access to preloaded images
 */
interface ImageCache {
  get: (src: string) => HTMLImageElement | undefined;
  has: (src: string) => boolean;
  set?: (src: string, img: HTMLImageElement) => void;
}

export const getImageCache = (): ImageCache => {
  if (typeof window === 'undefined') {
    return {
      get: () => undefined,
      has: () => false
    };
  }
  
  // Use assetManager internally
  return {
    get: (src: string) => assetManager.getAsset(src),
    has: (src: string) => assetManager.hasAsset(src),
    set: (src: string, img: HTMLImageElement) => {
      // This is just a pass-through to assetManager
      // The actual implementation is in assetManager
      console.log(`Cache set called for ${src}`);
    }
  };
};

export default getImageCache;
