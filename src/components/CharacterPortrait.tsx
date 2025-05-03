import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CharacterId } from '@/types/game';
import characters, { maven } from '@/data/characters';
import { MoodType } from '@/types/expressions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import characterExpressions from '@/data/characterExpressions';

interface CharacterPortraitProps {
  characterId: CharacterId | 'maven' | 'narrator' | undefined;
  mood?: MoodType;
  isActive: boolean;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ characterId, mood = 'neutral', isActive }) => {
  // Early return if no character to display or character is narrator
  if (!characterId || characterId === 'narrator' || !isActive) {
    return null;
  }
  
  // Get character data
  const character = characterId === 'maven' ? maven : characters[characterId];
  
  if (!character) return null;
  
  // Get expression data from our centralized expressions data
  const expressionSet = characterExpressions[characterId];
  const expression = expressionSet?.[mood];
  
  // Fallback to neutral if the specific mood isn't available
  const imagePath = expression?.image || expressionSet?.neutral?.image;
  
  // Function to handle image error and provide fallbacks
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image for ${characterId} with mood ${mood}: ${e.currentTarget.src}`);
    
    // First fallback: Try neutral expression if it's not already neutral
    if (mood !== 'neutral' && expressionSet?.neutral?.image) {
      e.currentTarget.src = expressionSet.neutral.image;
      return;
    }
    
    // Second fallback: Use character avatar
    if (character.avatar) {
      e.currentTarget.src = character.avatar;
      return;
    }
    
    // Third fallback: Hide the image and let the AvatarFallback show
    e.currentTarget.style.display = 'none';
  };
  
  // Enhanced Avatar styling - keeping this but removing animations
  const avatarStyle = {
    borderColor: character.color,
    boxShadow: `0 0 15px ${character.color}60`,
    backgroundColor: `${character.color}50`,
  };
  
  return (
    <div className="fixed bottom-32 left-16 z-20">
      <div className="mb-4">
        <Avatar 
          className="w-56 h-56 border-4" 
          style={avatarStyle}
        >
          {/* AvatarFallback first in DOM for better initial rendering */}
          <AvatarFallback 
            style={{ 
              backgroundColor: `${character.color}90`,
              color: 'white'
            }}
            className="flex items-center justify-center text-white font-bold text-2xl"
          >
            {character.name.substring(0, 2)}
          </AvatarFallback>
          
          {/* Preload image to reduce flickering */}
          {imagePath && (
            <AvatarImage 
              src={imagePath}
              alt={`${character.name} ${mood} expression`}
              onError={handleImageError}
              className="w-full h-full object-cover"
              loading="eager"
            />
          )}
        </Avatar>
      </div>
      
      {/* Character name badge - simplified with no animation */}
      <div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white font-medium text-glow-sm"
        style={{ 
          backgroundColor: character.color + '90',
          backdropFilter: 'blur(4px)',
          border: `1px solid ${character.color}`,
          boxShadow: `0 0 10px ${character.color}60`
        }}
      >
        {character.name}
      </div>
    </div>
  );
};

export default React.memo(CharacterPortrait);
