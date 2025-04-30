
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
          <div 
            className="character-portrait w-64 h-64 mb-28"
            style={{ 
              backgroundColor: character.color + '30', 
              backgroundImage: `url(${character.avatar})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'no-repeat',
              borderRadius: '50%',
              border: `2px solid ${character.color}`
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CharacterPortrait;
