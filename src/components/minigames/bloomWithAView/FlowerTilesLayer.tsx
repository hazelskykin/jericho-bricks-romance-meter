
import React from 'react';

interface FlowerTilesLayerProps {
  flowerTilesPath: string;
  imageLoaded: boolean;
}

const FlowerTilesLayer: React.FC<FlowerTilesLayerProps> = ({
  flowerTilesPath,
  imageLoaded
}) => {
  if (!imageLoaded || !flowerTilesPath) return null;
  
  return (
    <div 
      className="absolute inset-0 z-15 pointer-events-none" 
      style={{
        backgroundImage: `url(${flowerTilesPath})`,
        backgroundSize: '400px auto', // Smaller size for flower tiles to partially reveal objects
        backgroundPosition: 'center',
        opacity: 0.7, // Increased opacity to show flowers better
        mixBlendMode: 'soft-light' // This blend mode allows objects to be partially visible
      }}
    />
  );
};

export default FlowerTilesLayer;
