import React, { useEffect, useState } from 'react';
import { getImageCache } from '../utils/imageCache';

interface CharacterPortraitProps {
  src: string;
  name: string;
  alt: string;
  position?: 'left' | 'center' | 'right';
  speaking?: boolean;
  className?: string;
  onClick?: () => void;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  src,
  name,
  alt,
  position = 'center',
  speaking = false,
  className = '',
  onClick,
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
      }, 300); // 300ms transition
      
      return () => clearTimeout(timer);
    }
  }, [src, currentSrc]);

  const positions = {
    left: 'left-0 ml-4',
    center: 'left-1/2 transform -translate-x-1/2',
    right: 'right-0 mr-4',
  };

  return (
    <div 
      className={`absolute bottom-0 ${positions[position]} transition-all duration-300 cursor-pointer
                 ${speaking ? 'scale-105' : 'scale-100'} ${className}`}
      onClick={onClick}
    >
      {prevSrc && (
        <img
          src={prevSrc}
          alt={alt}
          className={`max-h-[70vh] transition-opacity duration-300 ${isFading ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`max-h-[70vh] transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'} 
                  ${isLoaded ? '' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
      {name && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primary-purple text-white px-4 py-1 rounded-t-lg">
          {name}
        </div>
      )}
    </div>
  );
};

export default CharacterPortrait;
