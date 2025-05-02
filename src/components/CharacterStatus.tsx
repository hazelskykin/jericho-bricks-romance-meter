
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import AffectionMeter from './AffectionMeter';
import { Character } from '@/types/game';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';
import characterChibis from '@/data/characterChibis';

interface CharacterStatusProps {
  characters: Character[];
}

const CharacterStatus: React.FC<CharacterStatusProps> = ({ characters }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="fixed top-4 right-4 z-30">
      <motion.button
        className="bg-gradient-cyberpunk border border-cyberpunk-primary/30 p-2 rounded-full text-white/70 hover:text-white hover:border-cyberpunk-primary/60 transition-all mb-2 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        style={{
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 15px rgba(155, 135, 245, 0.2)',
          width: '40px',
          height: '40px'
        }}
        aria-label={isOpen ? "Hide Relationships" : "Show Relationships"}
        title={isOpen ? "Hide Relationships" : "Show Relationships"}
      >
        <Heart 
          size={22} 
          className={isOpen ? "fill-current" : "fill-none"} 
          stroke={isOpen ? "#0D98BA" : "#0D98BA"}
          strokeWidth={1.5}
          color="#0D98BA"
        />
      </motion.button>
      
      <motion.div
        className="bg-gradient-cyberpunk border border-cyberpunk-primary/30 p-4 rounded-md"
        initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0,
          overflow: isOpen ? 'visible' : 'hidden'
        }}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 15px rgba(155, 135, 245, 0.2)'
        }}
      >
        <div className="space-y-4">
          {characters.map((char) => (
            <CharacterStatusItem key={char.id} character={char} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Extract character item into a separate component for better performance
const CharacterStatusItem: React.FC<{ character: Character }> = ({ character }) => {
  // Use memoization for better performance and avoid recalculations
  const characterImage = useMemo(() => {
    const chibiImage = characterChibis[character.id]?.image;
    return chibiImage || character.avatar;
  }, [character.id, character.avatar]);
  
  // Handle image error and provide fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${characterImage}`);
    e.currentTarget.src = character.avatar;
  };
  
  // Determine if we're using a chibi image or regular avatar
  const isChibi = characterImage === characterChibis[character.id]?.image;
  
  return (
    <motion.div 
      className="flex items-center justify-between gap-4 p-2 rounded-lg transition-colors"
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ backgroundColor: character.color + '20' }}
    >
      <div 
        className="flex items-center flex-1"
        style={{ color: character.color }}
      >
        <Avatar 
          className={`w-10 h-10 mr-3 border ${isChibi ? 'rounded-xl' : 'rounded-full'}`}
          style={{ 
            borderColor: character.color,
            boxShadow: `0 0 8px ${character.color}40`
          }}
        >
          <AvatarImage 
            src={characterImage} 
            alt={character.name}
            className={isChibi ? 'rounded-xl' : 'rounded-full'} 
            onError={handleImageError}
            loading="eager" // High priority loading
          />
          <AvatarFallback
            style={{ 
              backgroundColor: character.color + '20',
              color: character.color,
              borderColor: character.color
            }}
            className={isChibi ? 'rounded-xl' : 'rounded-full'}
          >
            {character.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="text-left">
          <span className="font-medium block">{character.name}</span>
          <span className="text-xs opacity-70 block">{character.role}</span>
        </div>
      </div>
      
      <AffectionMeter character={character} isOpen={true} />
    </motion.div>
  );
};

export default CharacterStatus;
