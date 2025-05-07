
import React from 'react';
import { motion } from 'framer-motion';
import { Character } from './types';

interface MudCharacterProps {
  character: Character;
  characterColors: Record<string, { color: string }>;
}

const MudCharacter: React.FC<MudCharacterProps> = ({ character, characterColors }) => {
  const characterColor = characterColors[character.id]?.color || '#888888';
  
  // Determine which character chibi image to use
  const getCharacterImage = (id: string) => {
    return `/assets/characters/${id}-chibi.png`;
  };

  return (
    <motion.div
      className={`absolute ${character.isHit ? 'opacity-50' : 'opacity-100'}`}
      style={{
        left: character.position.x - 20,
        top: character.position.y - 20,
        zIndex: 10
      }}
      animate={{
        x: character.isHit ? [0, -5, 5, -5, 0] : 0
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Character body */}
      <div
        className="relative w-16 h-16 flex items-center justify-center"
        style={{ filter: character.isHit ? 'grayscale(50%)' : 'none' }}
      >
        {/* Character image */}
        <div 
          className="absolute w-full h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${getCharacterImage(character.id)})` }}
        />
        
        {/* Team indicator */}
        <div 
          className="absolute top-0 right-0 w-4 h-4 rounded-full" 
          style={{ 
            backgroundColor: character.team === 'team1' ? '#4CC2FF' : '#FF5E5B',
            border: '1px solid white'
          }}
        />
        
        {/* Character is hit indicator */}
        {character.isHit && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-amber-800/50 w-12 h-12 rounded-full animate-ping"></div>
          </div>
        )}
      </div>
      
      {/* Character name */}
      <div 
        className="absolute -bottom-6 left-0 right-0 text-center text-xs font-medium bg-black/50 text-white rounded px-1"
      >
        {character.id}
      </div>
    </motion.div>
  );
};

export default MudCharacter;
