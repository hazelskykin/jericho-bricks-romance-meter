
import React, { useEffect } from 'react';
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
    if (character.affection <= -3) return 'Hostile';
    if (character.affection <= -1) return 'Cold';
    if (character.affection <= 3) return 'Neutral';
    if (character.affection <= 5) return 'Friendly';
    if (character.affection <= 8) return 'Close';
    return 'Romantic';
  };
  
  // Hearts to display - align with level thresholds
  const getHeartsToShow = () => {
    const level = getLevel();
    switch(level) {
      case 'Hostile': return 0;
      case 'Cold': return 1;
      case 'Neutral': return 2;
      case 'Friendly': return 3;
      case 'Close': return 4;
      case 'Romantic': return 5;
      default: return 2; // Default to Neutral
    }
  };
  
  const heartsToShow = getHeartsToShow();
  
  // Class for level label
  const getLevelClass = () => {
    const level = getLevel();
    switch(level) {
      case 'Hostile': return 'text-red-600 font-semibold';
      case 'Cold': return 'text-orange-500 font-medium';
      case 'Neutral': return 'text-gray-400';
      case 'Friendly': return 'text-blue-400 font-medium';
      case 'Close': return 'text-pink-500 font-semibold';
      case 'Romantic': return 'text-red-500 font-bold';
      default: return '';
    }
  };
  
  if (!character) {
    console.warn('AffectionMeter received undefined character');
    return null;
  }
  
  // Log current affection value to help debug
  useEffect(() => {
    if (isOpen) {
      console.log(`Rendering affection meter for ${character.id}: ${character.affection} (${getLevel()}) - Hearts: ${heartsToShow}`);
    }
  }, [character.affection, isOpen]);
  
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="flex items-center space-x-1"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: i < heartsToShow ? 1 : 0.8,
              opacity: i < heartsToShow ? 1 : 0.5,
            }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            <Heart
              size={20}
              className={i < heartsToShow 
                ? `fill-current text-current transition-colors duration-300`
                : "fill-none text-gray-400"}
              style={{ color: i < heartsToShow ? character.color : undefined }}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        className={`text-xs mt-1 ${getLevelClass()}`}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -5 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {getLevel()}
      </motion.div>
    </div>
  );
};

export default AffectionMeter;
