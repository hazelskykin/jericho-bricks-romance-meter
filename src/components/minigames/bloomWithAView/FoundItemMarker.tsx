
import React from 'react';
import { HiddenItem } from '@/hooks/bloomWithAView/types';
import { CheckCircle } from 'lucide-react';

interface FoundItemMarkerProps {
  item: HiddenItem;
}

const FoundItemMarker: React.FC<FoundItemMarkerProps> = ({ item }) => {
  // Only render for found items
  if (!item.found) return null;
  
  return (
    <div 
      className="absolute z-30 flex items-center justify-center animate-in fade-in duration-500"
      style={{
        top: `${item.position.y - 15}px`,
        left: `${item.position.x - 15}px`,
        width: '30px',
        height: '30px'
      }}
    >
      <CheckCircle className="w-full h-full text-green-500 bg-black/30 rounded-full p-0.5" />
    </div>
  );
};

export default FoundItemMarker;
