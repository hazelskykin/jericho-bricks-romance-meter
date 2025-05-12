
import React from 'react';
import { HiddenItem } from '@/hooks/bloomWithAView/types';
import { getObjectPosition } from '@/utils/bloomWithAViewUtils';

interface HiddenObjectProps {
  item: HiddenItem;
  objectsImagePath: string;
  debugMode: boolean;
}

const HiddenObject: React.FC<HiddenObjectProps> = ({ item, objectsImagePath, debugMode }) => {
  // Skip rendering if the item is already found
  if (item.found) return null;
  
  // Get styling for this item based on its position in the sprite sheet
  const style = getObjectPosition(item.id, debugMode);
  
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
  
  // Normal mode - render actual sprite from sprite sheet with increased clickable area
  return (
    <div 
      className={`absolute z-10 ${item.highlighted ? 'animate-pulse' : ''}`}
      style={{
        width: `${style.width}px`,
        height: `${style.height}px`,
        top: `${item.position.y - style.height/2}px`,
        left: `${item.position.x - style.width/2}px`,
        backgroundImage: `url(${objectsImagePath})`,
        backgroundPosition: style.backgroundPosition,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        pointerEvents: 'none',
        // Add subtle highlight in production mode too
        boxShadow: item.highlighted ? '0 0 15px 8px rgba(255, 255, 0, 0.3)' : 'none'
      }}
    />
  );
};

export default HiddenObject;
