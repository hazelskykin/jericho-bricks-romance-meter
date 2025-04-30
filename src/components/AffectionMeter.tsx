
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Character } from '@/types/game';

interface AffectionMeterProps {
  character: Character;
  isOpen: boolean;
}

const AffectionMeter: React.FC<AffectionMeterProps> = ({ character, isOpen }) => {
  // Map affection value to level
  const getLevel = () => {
    if (character.affection <= -5) return 'Hostile';
    if (character.affection <= -1) return 'Cold';
    if (character.affection <= 2) return 'Neutral';
    if (character.affection <= 5) return 'Friendly';
    if (character.affection <= 10) return 'Close';
    return 'Romantic';
  };
  
  // Hearts to display
  const heartsToShow = Math.max(0, Math.min(5, Math.floor(character.affection / 2) + 2));
  
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="flex items-center space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(5)].map((_, i) => (
          <Heart
            key={i}
            size={16}
            className={i < heartsToShow ? "fill-[#ff3a5e] text-[#ff3a5e]" : "fill-none text-gray-400"}
          />
        ))}
      </motion.div>
      
      <motion.div
        className="text-xs mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {getLevel()}
      </motion.div>
    </div>
  );
};

export default AffectionMeter;
