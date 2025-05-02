
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterId } from '@/types/game';
import characters, { maven } from '@/data/characters';
import characterExpressions, { MoodType } from '@/data/characterExpressions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CharacterPortraitProps {
  characterId: CharacterId | 'maven' | 'narrator' | undefined;
  mood?: MoodType;
  isActive: boolean;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ characterId, mood = 'neutral', isActive }) => {
  if (!characterId || characterId === 'narrator' || !isActive) {
    return null;
  }
  
  const character = characterId === 'maven' ? maven : characters[characterId];
  
  if (!character) return null;
  
  // Get the appropriate expression
  const expression = characterExpressions[characterId] ? 
    characterExpressions[characterId][mood] : 
    null;
    
  if (!expression) {
    console.log(`No expression found for ${characterId} with mood ${mood}`);
    return null;
  }
  
  console.log(`Loading character portrait: ${characterId}, mood: ${mood}, image: ${expression.image}`);
  
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
      case 'laughing':
        return 'animate-bounce-light animate-intense-glow scale-105';
      case 'shocked':
        return 'animate-shake animate-shock-flash';
      case 'embarrassed':
        return 'animate-subtle-shift animate-blush-pulse';
      default:
        return '';
    }
  };
  
  // Function to handle image error and provide fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${expression.image}`);
    e.currentTarget.src = character.avatar; // Fallback to character avatar
  };
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed bottom-32 left-16 z-20" // Moved up from bottom-0 to bottom-32
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className={`mb-4 ${getMoodStyles()}`} // Reduced margin-bottom from mb-20 to mb-4
            initial={{ filter: 'brightness(0.9)' }}
            animate={{ 
              filter: `brightness(${
                mood === 'happy' ? 1.1 : 
                mood === 'sad' ? 0.8 : 
                mood === 'laughing' ? 1.2 :
                mood === 'shocked' ? 1.15 :
                mood === 'embarrassed' ? 1.05 : 
                1
              })`
            }}
            transition={{ duration: 0.5 }}
          >
            <Avatar 
              className="w-56 h-56 border-4" 
              style={{ 
                borderColor: character.color,
                boxShadow: `0 0 15px ${character.color}50`
              }}
            >
              <AvatarImage 
                src={expression.image} 
                alt={expression.description} 
                onError={handleImageError}
              />
              <AvatarFallback style={{ backgroundColor: character.color }}>
                {character.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          {/* Character name badge */}
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white font-medium text-glow-sm"
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
