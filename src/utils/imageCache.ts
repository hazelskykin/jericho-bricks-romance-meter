
import { assetManager } from './assetManager';

/**
 * Image cache utility for faster access to preloaded images
 */
interface ImageCache {
  get: (src: string) => HTMLImageElement | undefined;
  has: (src: string) => boolean;
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
    has: (src: string) => assetManager.hasAsset(src)
  };
};

export default getImageCache;
