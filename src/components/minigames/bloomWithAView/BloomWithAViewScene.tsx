
import React from 'react';
import { motion } from 'framer-motion';
import { HiddenItem } from '@/hooks/useBloomWithAViewGame';

interface BloomWithAViewSceneProps {
  hiddenItems: HiddenItem[];
  clickPosition: { x: number, y: number } | null;
  showHint: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  backgroundImage?: string;
}

const BloomWithAViewScene: React.FC<BloomWithAViewSceneProps> = ({
  hiddenItems,
  clickPosition,
  showHint,
  onClick,
  backgroundImage = 'summer-transition'
}) => {
  return (
    <div 
      className="relative w-full h-[400px] rounded-lg border-2 border-purple-600/50 overflow-hidden cursor-pointer"
      onClick={onClick}
      style={{
        backgroundImage: `url(/assets/backgrounds/${backgroundImage}.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Visual markers for hints */}
      {hiddenItems.map((item) => (
        item.highlighted && showHint && (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute w-12 h-12 rounded-full border-2 border-dashed border-yellow-400 bg-yellow-400/20"
            style={{
              left: item.position.x - 24,
              top: item.position.y - 24,
              zIndex: 5
            }}
          />
        )
      ))}
      
      {/* Display found items markers */}
      {hiddenItems.map((item) => (
        item.found && (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
            style={{
              left: item.position.x - 16,
              top: item.position.y - 16,
              zIndex: 10
            }}
          >
            <span className="text-white text-xs">✓</span>
          </motion.div>
        )
      ))}
      
      {/* Click feedback */}
      {clickPosition && (
        <motion.div
          initial={{ opacity: 0.8, scale: 0.5 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
          className="absolute w-8 h-8 rounded-full bg-white/50 pointer-events-none"
          style={{
            left: clickPosition.x - 16,
            top: clickPosition.y - 16,
            zIndex: 20
          }}
        />
      )}
      
      {/* Decoration items to make the game scene more interesting */}
      <div className="absolute bottom-4 right-4 w-16 h-16 bg-contain bg-no-repeat" 
        style={{ backgroundImage: 'url(/assets/characters/maven-chibi.png)' }} />
    </div>
  );
};

export default BloomWithAViewScene;
