
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AffectionMeter from './AffectionMeter';
import { Character } from '@/types/game';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import characterExpressions from '@/data/characterExpressions';

interface CharacterStatusProps {
  characters: Character[];
}

const CharacterStatus: React.FC<CharacterStatusProps> = ({ characters }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="fixed top-4 right-4 z-30">
      <motion.button
        className="bg-gradient-cyberpunk border border-cyberpunk-primary/30 p-2 rounded-md text-white/70 hover:text-white hover:border-cyberpunk-primary/60 transition-all mb-2 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        style={{
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 15px rgba(155, 135, 245, 0.2)'
        }}
      >
        <span className="text-sm font-medium">{isOpen ? "Hide Relationships" : "Show Relationships"}</span>
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
            // Get neutral expression for character avatar
            const neutralExpression = characterExpressions[char.id]?.neutral;
            
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
                    className="w-10 h-10 mr-3 border"
                    style={{ 
                      borderColor: char.color,
                      boxShadow: `0 0 8px ${char.color}40`
                    }}
                  >
                    <AvatarImage 
                      src={neutralExpression?.image || char.avatar} 
                      alt={char.name} 
                    />
                    <AvatarFallback
                      style={{ 
                        backgroundColor: char.color + '20',
                        color: char.color,
                        borderColor: char.color
                      }}
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
