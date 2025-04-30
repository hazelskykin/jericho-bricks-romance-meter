
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterId } from '@/types/game';
import characters, { maven } from '@/data/characters';

interface CharacterPortraitProps {
  characterId: CharacterId | 'maven' | 'narrator' | undefined;
  mood?: 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised';
  isActive: boolean;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ characterId, mood = 'neutral', isActive }) => {
  if (!characterId || characterId === 'narrator' || !isActive) {
    return null;
  }
  
  const character = characterId === 'maven' ? maven : characters[characterId];
  
  if (!character) return null;
  
  // Apply mood-specific styling
  const getMoodStyles = () => {
    switch(mood) {
      case 'happy':
        return 'animate-pulse-glow';
      case 'sad':
        return 'opacity-80';
      case 'angry':
        return 'scale-105';
      case 'surprised':
        return 'animate-float';
      default:
        return '';
    }
  };
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed bottom-0 left-16 z-20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className={`character-portrait w-64 h-64 mb-28 ${getMoodStyles()}`}
            style={{ 
              backgroundColor: character.color + '30', 
              backgroundImage: `url(${character.avatar})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'no-repeat',
              borderRadius: '50%',
              border: `2px solid ${character.color}`,
              boxShadow: `0 0 15px ${character.color}50`
            }}
            initial={{ filter: 'brightness(0.9)' }}
            animate={{ 
              filter: `brightness(${mood === 'happy' ? 1.1 : mood === 'sad' ? 0.8 : 1})`
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Character name badge */}
          <motion.div
            className="absolute bottom-28 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white font-medium text-glow-sm"
            style={{ 
              backgroundColor: character.color + '80',
              backdropFilter: 'blur(4px)',
              border: `1px solid ${character.color}`,
              boxShadow: `0 0 10px ${character.color}50`
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {character.name}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CharacterPortrait;
