
import React from 'react';

interface FlowerTilesLayerProps {
  flowerTilesPath: string;
  imageLoaded: boolean;
}

const FlowerTilesLayer: React.FC<FlowerTilesLayerProps> = ({ flowerTilesPath, imageLoaded }) => {
  if (!imageLoaded || !flowerTilesPath) return null;
  
  // Create a flower tiles pattern using a semi-transparent div with background image
  return (
    <div 
      className="absolute inset-0 z-20 pointer-events-none"
      style={{
        backgroundImage: `url(${flowerTilesPath})`,
        backgroundSize: '125%', // Properly sized to create a nice pattern
        backgroundPosition: 'center',
        opacity: 0.85, // Semi-transparent to partially hide objects
        mixBlendMode: 'normal'
      }}
    />
  );
};

export default FlowerTilesLayer;
