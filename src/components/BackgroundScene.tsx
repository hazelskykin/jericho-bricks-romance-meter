
import React, { useEffect, useState, useRef } from 'react';
import { getImageCache } from '../utils/imageCache';
import backgrounds from '../data/backgrounds';
import { fixAssetPath } from '../utils/assetUtilities';

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
  const [hasError, setHasError] = useState(false);
  const loadAttempted = useRef(false);
  const imageCache = getImageCache();
  const imgRef = useRef<HTMLImageElement>(null);
  const retryCount = useRef(0);
  
  // Clear state when props change
  useEffect(() => {
    if (backgroundId || src) {
      loadAttempted.current = false;
      setIsLoaded(false);
      setHasError(false);
      retryCount.current = 0;
    }
  }, [backgroundId, src]);

  // Get actual source based on either direct src or backgroundId
  useEffect(() => {
    try {
      if (backgroundId && backgrounds && backgrounds[backgroundId]) {
        const imagePath = backgrounds[backgroundId].image;
        console.log(`Setting background from backgroundId ${backgroundId}: ${imagePath}`);
        if (imagePath) {
          setCurrentSrc(fixAssetPath(imagePath));
        } else {
          throw new Error(`Image path is empty for backgroundId: ${backgroundId}`);
        }
      } else if (src) {
        console.log(`Setting background from direct src: ${src}`);
        setCurrentSrc(fixAssetPath(src));
      } else {
        // Use default background if neither src nor backgroundId is provided
        console.warn(`No background source provided, using default`);
        setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
      }
    } catch (error) {
      console.error(`Error setting background source:`, error);
      // Use default background on error
      setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
      setHasError(true);
    }
  }, [backgroundId, src]);

  useEffect(() => {
    if (!currentSrc) {
      console.error("No background source available");
      return;
    }
    
    if (loadAttempted.current) return;
    
    // Mark this load attempt to prevent infinite loops
    loadAttempted.current = true;
    
    // Check if image is in cache
    const isCached = imageCache.has(currentSrc);
    
    if (isCached) {
      console.log(`Background image ${currentSrc} found in cache`);
      setIsLoaded(true);
      
      // Force REPAINT to ensure image shows
      if (imgRef.current) {
        const img = imgRef.current;
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
        
        const parent = img.parentElement;
        if (parent) {
          // Trick to force a repaint
          parent.style.display = 'none';
          void parent.offsetHeight;
          parent.style.display = 'block';
        }
      }
    } else {
      console.log(`Loading background image: ${currentSrc}`);
      setIsLoaded(false);
      
      const img = new Image();
      
      img.onload = () => {
        console.log(`Image onLoad fired for ${currentSrc}`);
        // Cache the loaded image
        imageCache.set(currentSrc, img);
        setIsLoaded(true);
        setHasError(false);
      };
      
      img.onerror = (e) => {
        console.error(`Error loading background image: ${currentSrc}`, e);
        
        if (retryCount.current < 2) {
          // Retry loading with a short delay
          retryCount.current += 1;
          loadAttempted.current = false;
          setTimeout(() => {
            loadAttempted.current = false;
          }, 300);
        } else {
          // Use default background after retries
          if (currentSrc !== '/assets/backgrounds/stonewich-cityscape.jpg') {
            setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
          }
          setHasError(true);
          setIsLoaded(true); // Still mark as loaded to avoid black screen
        }
      };
      
      // Set crossOrigin to anonymous
      img.crossOrigin = "anonymous";
      img.src = currentSrc;
    }
  }, [currentSrc, imageCache]);

  // When src changes, reset load attempted flag
  useEffect(() => {
    if (currentSrc && currentSrc !== prevSrc) {
      setPrevSrc(currentSrc);
      loadAttempted.current = false;
    }
  }, [currentSrc, prevSrc]);

  // For debugging
  useEffect(() => {
    if (backgroundId) {
      console.log(`BackgroundScene mounted: ${backgroundId}`);
      
      return () => {
        console.log(`BackgroundScene unmounted: ${backgroundId}`);
      };
    }
  }, [backgroundId]);

  if (!currentSrc) {
    console.error("No background source available");
    return (
      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white z-20">
        <p>No background available</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-900 z-10">
      {/* Background image - using higher z-index to ensure it's visible */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover z-30 ${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity`}
        style={{ 
          transitionDuration: `${transitionDuration}ms`,
          zIndex: 30, // Increased z-index
          display: 'block',
          visibility: 'visible'
        }}
        onLoad={() => {
          console.log(`Image onLoad fired for ${currentSrc}`);
          setIsLoaded(true);
        }}
        // Add error handler directly on image
        onError={() => {
          console.error(`Error on image element: ${currentSrc}`);
          if (currentSrc !== '/assets/backgrounds/stonewich-cityscape.jpg') {
            setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
          }
        }}
      />
      
      {/* Placeholder for when image is loading - using a lower z-index */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 bg-gray-800 flex items-center justify-center text-white">
          <p>Loading background...</p>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 z-25 bg-gray-800 bg-opacity-70 flex items-center justify-center text-white">
          <p>Failed to load background</p>
        </div>
      )}
    </div>
  );
};

export default BackgroundScene;
