
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { Character, CharacterId } from '@/types/game';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import characters, { maven } from '@/data/characters';

interface AffectionChangeProps {
  characterId: CharacterId;
  changeAmount: number;
}

export const showAffectionChange = ({ characterId, changeAmount }: AffectionChangeProps) => {
  // Get the character based on the ID
  const character = characterId === 'maven' ? maven : characters[characterId];
  if (!character) return;

  const isPositive = changeAmount > 0;
  
  toast({
    title: (
      <div className="flex items-center gap-2">
        <span className="font-medium" style={{ color: character.color }}>
          {character.name}
        </span>
        <span>{isPositive ? 'likes that' : 'dislikes that'}</span>
      </div>
    ),
    description: (
      <div className="flex items-center gap-2">
        <span>Relationship {isPositive ? 'increased' : 'decreased'} by</span>
        <span className="font-bold">{Math.abs(changeAmount)}</span>
      </div>
    ),
    variant: "default",
    duration: 3000,
    style: {
      backgroundColor: `${character.color}10`,
      borderColor: character.color,
      borderWidth: '1px',
    },
    icon: <AffectionChangeIcon character={character} isPositive={isPositive} />,
  });
};

const AffectionChangeIcon: React.FC<{ character: Character, isPositive: boolean }> = ({ character, isPositive }) => {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Heart 
        size={24} 
        className={isPositive ? "fill-current" : "fill-none"}
        style={{ color: character.color }}
      />
      {isPositive ? (
        <motion.span
          className="absolute -top-1 -right-1 text-xs font-bold"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: character.color }}
        >
          +
        </motion.span>
      ) : (
        <motion.span
          className="absolute -top-1 -right-1 text-xs font-bold"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: character.color }}
        >
          -
        </motion.span>
      )}
    </motion.div>
  );
};

export default showAffectionChange;
