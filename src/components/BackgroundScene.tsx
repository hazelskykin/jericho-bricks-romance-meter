
import React, { useState, useEffect } from 'react';
import backgrounds from '../data/backgrounds';

interface BackgroundSceneProps {
  src?: string;
  backgroundId?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  src,
  backgroundId,
  alt = 'Background scene',
  className = '',
  priority = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Determine the image source
  let imageSrc = src;
  
  // If backgroundId is provided instead of direct src
  if (backgroundId && backgrounds) {
    const bgData = backgrounds[backgroundId];
    if (bgData) {
      imageSrc = typeof bgData === 'string' ? bgData : bgData.image;
    }
  }

  // Use default if no valid source is found
  const finalSrc = imageSrc || '/assets/backgrounds/stonewich-cityscape.jpg';
  
  // Clear any error state when the source changes
  useEffect(() => {
    setLoadError(false);
    setIsLoaded(false);
  }, [finalSrc]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-900 z-0">
      {/* Background image - Always render in DOM but control opacity */}
      <img
        src={finalSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={`absolute inset-0 w-full h-full object-cover z-10 ${className}`}
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 500ms' }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          console.error(`Error loading background: ${finalSrc}`);
          setLoadError(true);
        }}
      />
      
      {/* Loading indicator (shows while loading) */}
      {!isLoaded && !loadError && (
        <div className="absolute inset-0 z-20 bg-gray-900 flex items-center justify-center text-white">
          <p>Loading background...</p>
        </div>
      )}
      
      {/* Error message (only shows if there was an error and image is not loaded) */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-gray-900 bg-opacity-50">
          <div className="bg-red-900 bg-opacity-90 p-4 rounded text-white">
            Failed to load background
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundScene;
