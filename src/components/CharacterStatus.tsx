
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
        className="bg-cyberpunk-dark/80 border border-cyberpunk-primary/30 p-2 rounded-md text-white/70 hover:text-white hover:bg-cyberpunk-primary/30 transition-all mb-2"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
      >
        {isOpen ? "Hide Relationships" : "Show Relationships"}
      </motion.button>
      
      <motion.div
        className="bg-cyberpunk-dark/80 border border-cyberpunk-primary/30 p-4 rounded-md"
        initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0,
          overflow: isOpen ? 'visible' : 'hidden'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-4">
          {characters.map((char) => (
            <div key={char.id} className="flex items-center justify-between gap-4">
              <div 
                className="flex items-center"
                style={{ color: char.color }}
              >
                <div 
                  className="w-8 h-8 rounded-full mr-2"
                  style={{ 
                    backgroundColor: char.color + '40',
                    border: `1px solid ${char.color}`
                  }}
                ></div>
                <span className="font-medium">{char.name}</span>
              </div>
              
              <AffectionMeter character={char} isOpen={isOpen} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterStatus;
