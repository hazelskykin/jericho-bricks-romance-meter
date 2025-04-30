
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AffectionMeter from './AffectionMeter';
import { Character } from '@/types/game';

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
          {characters.map((char) => (
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
                <div 
                  className="w-10 h-10 rounded-full mr-3 bg-cover bg-center"
                  style={{ 
                    backgroundColor: char.color + '20',
                    border: `1px solid ${char.color}`,
                    backgroundImage: `url(${char.avatar})`,
                    boxShadow: `0 0 8px ${char.color}40`
                  }}
                ></div>
                <div>
                  <span className="font-medium block">{char.name}</span>
                  <span className="text-xs opacity-70 block">{char.role}</span>
                </div>
              </div>
              
              <AffectionMeter character={char} isOpen={isOpen} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterStatus;
