
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterId } from '@/types/game';
import characters, { maven } from '@/data/characters';
import { MoodType } from '@/types/expressions';
import characterExpressions from '@/data/characterExpressions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CharacterPortraitProps {
  characterId: CharacterId | 'maven' | 'narrator' | undefined;
  mood?: MoodType;
  isActive: boolean;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ characterId, mood = 'neutral', isActive }) => {
  // Early return if no character to display
  if (!characterId || characterId === 'narrator' || !isActive) {
    return null;
  }
  
  // Use memoized values to prevent unnecessary calculations on re-render
  const character = characterId === 'maven' ? maven : characters[characterId];
  
  if (!character) return null;
  
  // Create direct PNG path - using consistent naming convention
  const pngImagePath = `/assets/characters/${characterId}-${mood}.png`;
  
  // Memoize mood-specific styling
  const moodStyles = useMemo(() => {
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
  }, [mood]);
  
  // Memoize brightness value based on mood
  const brightnessFactor = useMemo(() => {
    switch(mood) {
      case 'happy': return 1.1;
      case 'sad': return 0.8;
      case 'laughing': return 1.2;
      case 'shocked': return 1.15;
      case 'embarrassed': return 1.05;
      default: return 1;
    }
  }, [mood]);
  
  // Function to handle image error and provide fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image for ${characterId} with mood ${mood}: ${e.currentTarget.src}`);
    // If PNG fails, try avatar as fallback
    e.currentTarget.src = character.avatar;
  };
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed bottom-32 left-16 z-20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }} // Reduced animation duration for performance
        >
          <motion.div 
            className={`mb-4 ${moodStyles}`}
            initial={{ filter: 'brightness(0.9)' }}
            animate={{ filter: `brightness(${brightnessFactor})` }}
            transition={{ duration: 0.3 }} // Reduced animation duration for performance
          >
            <Avatar 
              className="w-56 h-56 border-4" 
              style={{ 
                borderColor: character.color,
                boxShadow: `0 0 15px ${character.color}50`
              }}
            >
              <AvatarImage 
                src={pngImagePath}
                alt={`${character.name} ${mood} expression`}
                onError={handleImageError}
                className="w-full h-full object-cover" // Ensure proper sizing
                loading="eager" // Tell browser to load this image with high priority
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
            transition={{ delay: 0.2, duration: 0.2 }} // Reduced animation duration
          >
            {character.name}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(CharacterPortrait); // Use React.memo to prevent unnecessary re-renders
