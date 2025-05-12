
import React from 'react';
import { HiddenItem } from '@/hooks/bloomWithAView/types';

interface HiddenObjectProps {
  item: HiddenItem;
  debugMode: boolean;
}

// Helper function to get image path for hidden objects
const getHiddenObjectPath = (id: string): string => {
  const objectImages: Record<string, string> = {
    'watering-can': '/assets/minigames/spring/bloomwithAView/hidden-objects-wateringcan.png',
    'gloves': '/assets/minigames/spring/bloomwithAView/hidden-objects-gloves.png',
    'bee-drone': '/assets/minigames/spring/bloomwithAView/hidden-objects-beedrone.png',
    'seed-packet': '/assets/minigames/spring/bloomwithAView/hidden-objects-seedpacket.png',
    'butterfly': '/assets/minigames/spring/bloomwithAView/hidden-objects-butterfly.png',
    // Fallback for any other IDs
    'default': '/assets/minigames/spring/bloomwithAView/hidden-objects-butterfly.png'
  };
  
  return objectImages[id] || objectImages['default'];
};

const HiddenObject: React.FC<HiddenObjectProps> = ({ item, debugMode }) => {
  // Skip rendering if the item is already found
  if (item.found) return null;
  
  // Use debug mode styling if needed
  if (debugMode) {
    // Debug mode uses colored squares with increased size for better visibility and interaction
    return (
      <div 
        className={`absolute z-10 rounded-md ${item.highlighted ? 'animate-pulse' : ''}`}
        style={{
          width: '80px',  // Increased size for better visibility and interaction
          height: '80px', // Increased size for better visibility and interaction
          top: `${item.position.y - 40}px`,
          left: `${item.position.x - 40}px`,
          backgroundColor: item.highlighted ? 'rgba(255, 255, 0, 0.7)' : 'rgba(255, 0, 0, 0.3)',
          border: '2px dashed rgba(255, 255, 255, 0.7)',
          pointerEvents: 'none'
        }}
      />
    );
  }
  
  // Normal mode - render actual image file with increased clickable area
  return (
    <div 
      className={`absolute z-10 ${item.highlighted ? 'animate-pulse' : ''}`}
      style={{
        width: '60px',
        height: '60px',
        top: `${item.position.y - 30}px`,
        left: `${item.position.x - 30}px`,
        backgroundImage: `url(${getHiddenObjectPath(item.id)})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        // Add subtle highlight in production mode too
        boxShadow: item.highlighted ? '0 0 15px 8px rgba(255, 255, 0, 0.3)' : 'none'
      }}
    />
  );
};

export default HiddenObject;
