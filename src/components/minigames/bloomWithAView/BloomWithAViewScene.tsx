
import React from 'react';
import { motion } from 'framer-motion';
import { HiddenItem } from '@/hooks/useBloomWithAViewGame';

interface BloomWithAViewSceneProps {
  hiddenItems: HiddenItem[];
  clickPosition: {x: number, y: number} | null;
  showHint: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const BloomWithAViewScene: React.FC<BloomWithAViewSceneProps> = ({
  hiddenItems,
  clickPosition,
  showHint,
  onClick
}) => {
  const itemSize = 40; // Size of the clickable area
  
  return (
    <div 
      className="relative w-full h-[300px] bg-[url('/assets/backgrounds/city-cafe.jpg')] bg-cover bg-center rounded-lg cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Item hotspots (invisible unless hint is active) */}
      {hiddenItems.map(item => (
        <motion.div 
          key={item.id}
          className={`absolute rounded-full ${item.found ? 'bg-green-500/30' : 'bg-transparent'}`}
          style={{ 
            left: item.position.x - itemSize/2, 
            top: item.position.y - itemSize/2,
            width: itemSize,
            height: itemSize
          }}
          animate={{ 
            scale: showHint && !item.found ? [1, 1.5, 1] : 1,
            opacity: showHint && !item.found ? [0, 0.7, 0] : item.found ? 0.5 : 0
          }}
          transition={{ 
            repeat: showHint && !item.found ? Infinity : 0,
            duration: 1
          }}
        />
      ))}
      
      {/* Click feedback animation */}
      {clickPosition && (
        <motion.div 
          className="absolute w-10 h-10 rounded-full border-2 border-white"
          style={{ 
            left: clickPosition.x - 20, 
            top: clickPosition.y - 20 
          }}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
};

export default BloomWithAViewScene;
