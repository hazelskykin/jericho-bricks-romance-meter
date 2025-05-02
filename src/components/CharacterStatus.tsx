
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AffectionMeter from './AffectionMeter';
import { Character } from '@/types/game';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';
import characterExpressions from '@/data/characterExpressions';
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
          {characters.map((char) => {
            // Try to get chibi image first
            const chibiImage = characterChibis[char.id]?.image;
            
            // Fallback to neutral expression if no chibi available
            const neutralExpression = characterExpressions[char.id]?.neutral;
            
            // Determine which image to use (chibi first, neutral second, avatar fallback)
            const characterImage = chibiImage || (neutralExpression?.image || char.avatar);
            
            console.log(`Character ${char.id} using image: ${characterImage}`);
            
            // Function to handle image error and provide fallback
            const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              console.error(`Failed to load image: ${characterImage}`);
              e.currentTarget.src = char.avatar; // Fallback to character avatar
            };
            
            return (
              <motion.div 
                key={char.id} 
                className="flex items-center justify-between gap-4 p-2 rounded-lg transition-colors"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ backgroundColor: char.color + '20' }}
              >
                <div 
                  className="flex items-center"
                  style={{ color: char.color }}
                >
                  <Avatar 
                    className={`w-10 h-10 mr-3 border ${chibiImage ? 'rounded-xl' : 'rounded-full'}`}
                    style={{ 
                      borderColor: char.color,
                      boxShadow: `0 0 8px ${char.color}40`
                    }}
                  >
                    <AvatarImage 
                      src={characterImage} 
                      alt={char.name}
                      className={chibiImage ? 'rounded-xl' : 'rounded-full'} 
                      onError={handleImageError}
                    />
                    <AvatarFallback
                      style={{ 
                        backgroundColor: char.color + '20',
                        color: char.color,
                        borderColor: char.color
                      }}
                      className={chibiImage ? 'rounded-xl' : 'rounded-full'}
                    >
                      {char.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium block">{char.name}</span>
                    <span className="text-xs opacity-70 block">{char.role}</span>
                  </div>
                </div>
                
                <AffectionMeter character={char} isOpen={isOpen} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterStatus;
