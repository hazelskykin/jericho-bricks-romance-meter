import React, { useEffect, useState } from 'react';
import { getImageCache } from '../utils/imageCache';

interface BackgroundSceneProps {
  src: string;
  alt: string;
  className?: string;
  transitionDuration?: number;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  src,
  alt,
  className = '',
  transitionDuration = 500,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  
  const imageCache = getImageCache();

  useEffect(() => {
    if (src !== currentSrc) {
      setPrevSrc(currentSrc);
      setCurrentSrc(src);
      setIsFading(true);
      
      // Check if image is in cache
      const isCached = imageCache.has(src);
      
      if (isCached) {
        // If image is cached, set loaded immediately
        setIsLoaded(true);
      } else {
        // Otherwise, load the image
        setIsLoaded(false);
        const img = new Image();
        img.onload = () => setIsLoaded(true);
        img.src = src;
      }
      
      const timer = setTimeout(() => {
        setIsFading(false);
        setPrevSrc(null);
      }, transitionDuration);
      
      return () => clearTimeout(timer);
    }
  }, [src, currentSrc, transitionDuration]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {prevSrc && (
        <img
          src={prevSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${className} ${
            isFading ? 'opacity-100' : 'opacity-0'
          } transition-opacity`}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${className} ${
          isFading ? 'opacity-0' : 'opacity-100'
        } ${isLoaded ? '' : 'opacity-0'} transition-opacity`}
        style={{ transitionDuration: `${transitionDuration}ms` }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default BackgroundScene;
