
import React, { useState, useEffect } from 'react';
import { assetManager } from '@/utils/assetManager';

const MenuBackground: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const backgroundSrc = '/assets/backgrounds/wall-tiles.jpg';

  useEffect(() => {
    // Check if already cached
    if (assetManager.hasAsset(backgroundSrc)) {
      console.log('MenuBackground: wall-tiles.jpg already loaded');
      setImageLoaded(true);
      setImageError(false);
    } else {
      console.log('MenuBackground: Loading wall-tiles.jpg');
      setImageLoaded(false);
      setImageError(false);
    }
  }, []);

  const handleImageLoad = () => {
    console.log('MenuBackground: wall-tiles.jpg loaded successfully');
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('MenuBackground: Failed to load wall-tiles.jpg');
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="absolute inset-0 z-0">
      {/* Background image - always render */}
      <img
        src={backgroundSrc}
        alt="Menu background"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: 1, // Always visible
          visibility: 'visible',
          display: 'block'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
      
      {/* Loading indicator only if not cached and not loaded */}
      {!imageLoaded && !assetManager.hasAsset(backgroundSrc) && !imageError && (
        <div className="absolute inset-0 z-20 bg-gray-900 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {/* Error fallback */}
      {imageError && (
        <div className="absolute inset-0 z-20 bg-gradient-to-br from-[#1A1F2C] via-[#2A2F3C] to-[#1A1F2C]" />
      )}
    </div>
  );
};

export default MenuBackground;
