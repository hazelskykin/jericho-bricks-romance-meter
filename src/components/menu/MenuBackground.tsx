
import React, { useState, useEffect } from 'react';
import { assetManager } from '@/utils/assetManager';

const MenuBackground: React.FC = () => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [backgroundError, setBackgroundError] = useState(false);
  
  const backgroundPath = '/assets/backgrounds/wall-tiles.jpg';
  
  useEffect(() => {
    // Check if background is already loaded
    if (assetManager.hasAsset(backgroundPath)) {
      console.log('MenuBackground: wall-tiles.jpg already loaded');
      setBackgroundLoaded(true);
      return;
    }
    
    // Load the background image
    console.log('MenuBackground: Loading wall-tiles.jpg');
    const img = new Image();
    img.onload = () => {
      console.log('MenuBackground: Successfully loaded wall-tiles.jpg');
      setBackgroundLoaded(true);
      setBackgroundError(false);
    };
    img.onerror = () => {
      console.error('MenuBackground: Failed to load wall-tiles.jpg');
      setBackgroundError(true);
      // Still show something even if image fails
      setTimeout(() => setBackgroundLoaded(true), 1000);
    };
    img.src = backgroundPath;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -10 }}>
      {/* Background image layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{ 
          backgroundImage: backgroundLoaded ? `url(${backgroundPath})` : 'none',
          filter: 'brightness(0.8)',
          opacity: backgroundLoaded ? 1 : 0,
          zIndex: 1
        }}
      />
      
      {/* Fallback background while loading */}
      {!backgroundLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] to-[#2D1B69]"
          style={{ zIndex: 1 }}
        />
      )}
      
      {/* Dark gradient overlay on the right side only */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-[#1A1F2C]/90 to-transparent" 
        style={{ zIndex: 2 }}
      />
      
      {/* Animated particles/stars effect */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ zIndex: 3 }}
      >
        <div className="stars-bg"></div>
      </div>
      
      {/* Purple glow effects */}
      <div 
        className="absolute bottom-[-50%] right-[-25%] w-[80%] h-[150%] rounded-full bg-[#9b87f5]/10 blur-[100px]" 
        style={{ zIndex: 4 }}
      />
      <div 
        className="absolute top-[-50%] right-[-25%] w-[80%] h-[150%] rounded-full bg-[#7E69AB]/10 blur-[100px]" 
        style={{ zIndex: 4 }}
      />
      
      {/* Debug info */}
      {backgroundError && (
        <div className="absolute top-4 left-4 text-red-400 text-xs bg-black/50 p-2 rounded" style={{ zIndex: 50 }}>
          Background image failed to load
        </div>
      )}
    </div>
  );
};

export default MenuBackground;
