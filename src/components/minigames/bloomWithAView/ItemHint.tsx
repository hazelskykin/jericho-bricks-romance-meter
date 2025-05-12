
import React from 'react';
import { motion } from 'framer-motion';
import { HiddenItem } from '@/hooks/bloomWithAView/types';

interface ItemHintProps {
  item: HiddenItem;
  showHint: boolean;
}

const ItemHint: React.FC<ItemHintProps> = ({ item, showHint }) => {
  if (!item.highlighted || !showHint) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute w-12 h-12 rounded-full border-2 border-dashed border-yellow-400 bg-yellow-400/20 z-30"
      style={{
        left: item.position.x - 24,
        top: item.position.y - 24
      }}
    />
  );
};

export default ItemHint;
