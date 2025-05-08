
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

  const cache = (window as any).gameImageCache || new Map();
  
  return {
    get: (src: string) => cache.get(src),
    has: (src: string) => cache.has(src)
  };
};

export default getImageCache;
