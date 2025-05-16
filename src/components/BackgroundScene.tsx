import React, { useEffect, useState, useRef } from 'react';
import { getImageCache } from '../utils/imageCache';
import backgrounds from '../data/backgrounds';
import { getAssetSource } from '@/utils/assetManager';

interface BackgroundSceneProps {
  src?: string;
  backgroundId?: string;
  alt?: string;
  className?: string;
  transitionDuration?: number;
  priority?: boolean;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  src,
  backgroundId,
  alt = 'Background scene',
  className = '',
  transitionDuration = 500,
  priority = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const loadAttempted = useRef(false);
  
  const imageCache = getImageCache();
  
  // Get actual source based on either direct src or backgroundId
  useEffect(() => {
    if (backgroundId && backgrounds[backgroundId]) {
      setCurrentSrc(backgrounds[backgroundId].image);
    } else if (src) {
      setCurrentSrc(src);
    } else {
      // Use default background if neither src nor backgroundId is provided
      setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
    }
  }, [backgroundId, src]);

  useEffect(() => {
    if (!currentSrc || loadAttempted.current) return;
    
    // Mark this load attempt to prevent infinite loops
    loadAttempted.current = true;
    
    // Check if image is in cache
    const isCached = imageCache.has(currentSrc);
    
    if (isCached) {
      // If image is cached, set loaded immediately
      console.log(`Background image ${currentSrc} found in cache`);
      setIsLoaded(true);
    } else {
      // Otherwise, load the image
      console.log(`Loading background image: ${currentSrc}`);
      setIsLoaded(false);
      
      const img = new Image();
      
      img.onload = () => {
        console.log(`Background image loaded: ${currentSrc}`);
        setIsLoaded(true);
        loadAttempted.current = true; // Mark as loaded successfully
      };
      
      img.onerror = (e) => {
        console.error(`Error loading background image: ${currentSrc}`, e);
        // Use default background on error
        if (currentSrc !== '/assets/backgrounds/stonewich-cityscape.jpg') {
          setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
        }
        setIsLoaded(true); // Still mark as loaded to avoid black screen
        loadAttempted.current = true; // Mark as attempted
      };
      
      img.src = currentSrc;
    }
  }, [currentSrc, imageCache]);

  useEffect(() => {
    if (prevSrc !== null && prevSrc !== currentSrc) {
      setIsFading(true);
      
      const timer = setTimeout(() => {
        setIsFading(false);
        setPrevSrc(null);
      }, transitionDuration);
      
      return () => clearTimeout(timer);
    }
  }, [prevSrc, currentSrc, transitionDuration]);

  // When src changes, set previous src for transition
  useEffect(() => {
    if (currentSrc && currentSrc !== prevSrc) {
      setPrevSrc(prevSrc || currentSrc);
      // Reset load attempted flag when source changes
      loadAttempted.current = false;
    }
  }, [currentSrc, prevSrc]);

  // For debugging (limited to avoid console spam)
  useEffect(() => {
    if (backgroundId) {
      console.log(`BackgroundScene mounted: ${backgroundId}`);
      
      return () => {
        console.log(`BackgroundScene unmounted: ${backgroundId}`);
      };
    }
  }, [backgroundId]);

  if (!currentSrc) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {prevSrc && prevSrc !== currentSrc && (
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
        onLoad={() => {
          console.log(`Image onLoad fired for ${currentSrc}`);
          setIsLoaded(true);
        }}
      />
    </div>
  );
};

export default BackgroundScene;
