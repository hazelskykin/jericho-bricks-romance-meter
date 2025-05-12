
import React from 'react';
import { motion } from 'framer-motion';
import { HiddenItem } from '@/hooks/bloomWithAView/types';

interface FoundItemMarkerProps {
  item: HiddenItem;
}

const FoundItemMarker: React.FC<FoundItemMarkerProps> = ({ item }) => {
  if (!item.found) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-20"
      style={{
        left: item.position.x - 16,
        top: item.position.y - 16
      }}
    >
      <span className="text-white text-xs">✓</span>
    </motion.div>
  );
};

export default FoundItemMarker;
