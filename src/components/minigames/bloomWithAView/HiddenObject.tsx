
import React from 'react';
import { HiddenItem } from '@/hooks/bloomWithAView/types';
import { getHiddenObjectStyle } from '@/utils/bloomWithAViewUtils';

interface HiddenObjectProps {
  item: HiddenItem;
  objectsImagePath: string;
  debugMode: boolean;
}

const HiddenObject: React.FC<HiddenObjectProps> = ({ 
  item, 
  objectsImagePath, 
  debugMode 
}) => {
  if (item.found) return null;
  
  return (
    <div
      className="absolute z-10"
      style={getHiddenObjectStyle(item, objectsImagePath, debugMode)}
    >
      {/* If no sprite sheet is available, show item names for debugging */}
      {(debugMode || !objectsImagePath) && (
        <div className="absolute -top-6 left-0 right-0 text-center text-xs bg-black/70 text-white px-1 rounded">
          {item.name}
        </div>
      )}
    </div>
  );
};

export default HiddenObject;
