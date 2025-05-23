
import React, { useState, useEffect } from 'react';
import backgrounds from '../data/backgrounds';
import { assetManager } from '../utils/assetManager';

interface BackgroundSceneProps {
  src?: string;
  backgroundId?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  src,
  backgroundId,
  alt = 'Background scene',
  className = '',
  priority = true,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [finalSrc, setFinalSrc] = useState('');
  
  // Determine the image source
  useEffect(() => {
    let imageSrc = src;
    
    // If backgroundId is provided instead of direct src
    if (backgroundId && backgrounds) {
      const bgData = backgrounds[backgroundId];
      if (bgData) {
        imageSrc = typeof bgData === 'string' ? bgData : bgData.image;
      }
    }

    // Use default if no valid source is found
    const resolvedSrc = imageSrc || '/assets/backgrounds/stonewich-cityscape.jpg';
    setFinalSrc(resolvedSrc);
    
    // Pre-check asset manager
    if (assetManager.hasAsset(resolvedSrc)) {
      console.log(`Using cached background: ${resolvedSrc}`);
      setIsLoaded(true);
      setLoadError(false);
      onLoad?.();
    } else {
      console.log(`Loading background: ${resolvedSrc}`);
      setIsLoaded(false);
      setLoadError(false);
    }
  }, [src, backgroundId, onLoad]);

  // Handle image loading success
  const handleImageLoad = () => {
    console.log(`Successfully loaded background: ${finalSrc}`);
    setIsLoaded(true);
    setLoadError(false);
    onLoad?.();
  };

  // Handle image loading error
  const handleImageError = () => {
    console.error(`Failed to load background: ${finalSrc}`);
    setLoadError(true);
    onError?.();
    
    // Force display eventually even on error
    setTimeout(() => {
      console.log("Forcing background display despite error");
      setIsLoaded(true);
    }, 1000);
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-900 z-0" data-testid="background-scene">
      {/* Background image - Always render in DOM but control opacity */}
      <img
        src={finalSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={`absolute inset-0 w-full h-full object-cover z-10 ${className}`}
        style={{ 
          opacity: isLoaded ? 1 : 0, 
          transition: 'opacity 500ms',
          visibility: 'visible', // Force visibility
          display: 'block' // Ensure display is block
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Loading indicator (shows while loading) */}
      {!isLoaded && !loadError && (
        <div className="absolute inset-0 z-20 bg-gray-900 flex items-center justify-center text-white">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mb-2"></div>
            <p>Loading background...</p>
          </div>
        </div>
      )}
      
      {/* Error message (only shows if there was an error) */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-gray-900 bg-opacity-80">
          <div className="bg-red-900 bg-opacity-90 p-4 rounded text-white text-center">
            <p className="mb-2">Failed to load background</p>
            <button 
              onClick={() => {
                setLoadError(false);
                setIsLoaded(false);
                // Force reload with timestamp
                setFinalSrc(`${finalSrc}?t=${Date.now()}`);
              }}
              className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundScene;
