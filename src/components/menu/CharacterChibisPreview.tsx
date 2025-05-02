
import React from 'react';
import { motion } from 'framer-motion';
import characterChibis from '@/data/characterChibis';
import characters from '@/data/characters';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CharacterChibisPreview: React.FC = () => {
  return (
    <div className="flex justify-end gap-1 mb-6 max-w-md">
      {Object.values(characters).map((char) => {
        const chibiData = characterChibis[char.id];
        
        return (
          <motion.div 
            key={char.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + Math.random() * 0.5 }}
            whileHover={{ y: -5, scale: 1.05 }}
          >
            {chibiData?.image ? (
              <Avatar 
                className="w-14 h-14 border-2 rounded-xl"
                style={{ 
                  borderColor: char.color,
                  boxShadow: `0 0 10px ${char.color}50`,
                  backgroundColor: `${char.color}30`,
                }}
              >
                <AvatarFallback
                  style={{ 
                    backgroundColor: char.color + '60',
                    color: 'white',
                  }}
                  className="rounded-xl"
                >
                  {char.name.substring(0, 2)}
                </AvatarFallback>
                <AvatarImage 
                  src={chibiData.image} 
                  alt={char.name}
                  className="rounded-xl"
                />
              </Avatar>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CharacterChibisPreview;
