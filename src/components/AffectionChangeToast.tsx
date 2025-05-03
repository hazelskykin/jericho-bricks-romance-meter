
import React from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import characters, { maven } from '@/data/characters';
import { CharacterId } from '@/types/game';

interface AffectionChangeProps {
  characterId: CharacterId;
  changeAmount: number;
}

export const showAffectionChange = ({ characterId, changeAmount }: AffectionChangeProps) => {
  // Get the character data
  const character = characterId === 'maven' ? maven : characters[characterId];
  
  if (!character) return;
  
  const isPositive = changeAmount > 0;
  
  toast(
    // Empty string for no text content, just showing the heart icon
    "",
    {
      duration: 2000,
      icon: isPositive 
        ? <Heart color={character.color} fill={character.color} /> 
        : <Heart color={character.color} />,
      style: {
        borderLeft: `4px solid ${character.color}`,
        padding: '8px',
        minWidth: 'auto',
        minHeight: 'auto'
      },
    }
  );
};
