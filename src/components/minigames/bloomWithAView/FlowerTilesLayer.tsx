
import React from 'react';

interface FlowerTilesLayerProps {
  flowerTilesPath: string;
  imageLoaded: boolean;
}

const FlowerTilesLayer: React.FC<FlowerTilesLayerProps> = ({ flowerTilesPath, imageLoaded }) => {
  if (!imageLoaded || !flowerTilesPath) return null;
  
  // Create an array of flower tiles with different positions
  const flowerTilePositions = [
    // Tiles in the middle area
    { top: '50%', left: '20%', rotation: '0deg', size: '60px' },
    { top: '55%', left: '75%', rotation: '45deg', size: '70px' },
    { top: '60%', left: '20%', rotation: '15deg', size: '55px' },
    { top: '52%', left: '60%', rotation: '-10deg', size: '65px' },
    { top: '75%', left: '80%', rotation: '30deg', size: '60px' },
    { top: '85%', left: '40%', rotation: '-20deg', size: '50px' },
    { top: '65%', left: '45%', rotation: '5deg', size: '55px' },
    { top: '70%', left: '85%', rotation: '-5deg', size: '65px' },
    // Additional tiles - all below midpoint
    { top: '58%', left: '35%', rotation: '12deg', size: '58px' },
    { top: '67%', left: '55%', rotation: '-8deg', size: '62px' },
    { top: '80%', left: '25%', rotation: '22deg', size: '54px' },
    { top: '72%', left: '70%', rotation: '-15deg', size: '59px' },
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
            backgroundImage: `url(${flowerTilesPath})`,
            backgroundSize: '400%', // Displaying a portion of the sprite sheet
            backgroundPosition: getBackgroundPosition(index), // Get different positions for each tile
            transform: `rotate(${position.rotation})`,
            opacity: 0.9
          }}
        />
      ))}
    </div>
  );
};

// Helper function to get different background positions for the tiles
function getBackgroundPosition(index: number): string {
  // These positions correspond to different flower tiles in the sprite sheet
  const positions = [
    '0% 0%',      // Top-left flower
    '33.33% 0%',  // Top-center flower
    '66.66% 0%',  // Top-right flower
    '0% 50%',     // Middle-left flower
    '33.33% 50%', // Middle-center flower
    '66.66% 50%', // Middle-right flower
    '0% 100%',    // Bottom-left flower
    '33.33% 100%', // Bottom-center flower
    '66.66% 100%', // Bottom-right flower
    '100% 0%',    // Far-right top flower
    '100% 50%',   // Far-right middle flower
    '100% 100%'   // Far-right bottom flower
  ];
  
  return positions[index % positions.length];
}

export default FlowerTilesLayer;
