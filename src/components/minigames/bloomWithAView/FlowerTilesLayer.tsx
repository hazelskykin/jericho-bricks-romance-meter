
import React from 'react';

interface FlowerTilesLayerProps {
  imageLoaded: boolean;
}

const FlowerTilesLayer: React.FC<FlowerTilesLayerProps> = ({ imageLoaded }) => {
  if (!imageLoaded) return null;
  
  // Create an array of flower tiles with different positions and images
  const flowerTilePositions = [
    { top: '50%', left: '20%', rotation: '0deg', size: '60px', imageIndex: 1 },
    { top: '55%', left: '75%', rotation: '45deg', size: '70px', imageIndex: 2 },
    { top: '60%', left: '20%', rotation: '15deg', size: '55px', imageIndex: 3 },
    { top: '52%', left: '60%', rotation: '-10deg', size: '65px', imageIndex: 4 },
    { top: '75%', left: '80%', rotation: '30deg', size: '60px', imageIndex: 5 },
    { top: '85%', left: '40%', rotation: '-20deg', size: '50px', imageIndex: 6 },
    { top: '65%', left: '45%', rotation: '5deg', size: '55px', imageIndex: 7 },
    { top: '70%', left: '85%', rotation: '-5deg', size: '65px', imageIndex: 8 },
    // Additional tiles - all below midpoint
    { top: '58%', left: '35%', rotation: '12deg', size: '58px', imageIndex: 1 },
    { top: '67%', left: '55%', rotation: '-8deg', size: '62px', imageIndex: 2 },
    { top: '80%', left: '25%', rotation: '22deg', size: '54px', imageIndex: 3 },
    { top: '72%', left: '70%', rotation: '-15deg', size: '59px', imageIndex: 4 },
  ];

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Semi-transparent overlay to partially hide objects */}
      <div 
        className="absolute inset-0 bg-green-100/20 mix-blend-overlay"
      />
      
      {/* Individual flower tiles placed strategically */}
      {flowerTilePositions.map((position, index) => (
        <div
          key={`flower-tile-${index}`}
          className="absolute pointer-events-none"
          style={{
            top: position.top,
            left: position.left,
            width: position.size,
            height: position.size,
            backgroundImage: `url(/assets/minigames/spring/bloomwithAView/flower-tiles-${position.imageIndex}.png)`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `rotate(${position.rotation})`,
            opacity: 0.9
          }}
        />
      ))}
    </div>
  );
};

export default FlowerTilesLayer;
