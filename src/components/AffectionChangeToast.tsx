
import React from 'react';
import { Heart, HeartCrack } from 'lucide-react';
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
  const direction = isPositive ? 'increased' : 'decreased';
  
  toast(`${character.name}'s affection ${direction}`, {
    description: `Your choice has affected your relationship.`,
    duration: 3000,
    action: {
      label: '',
      onClick: () => {},
    },
    icon: isPositive 
      ? <Heart color={character.color} fill={character.color} /> 
      : <HeartCrack color={character.color} />,
    style: {
      borderLeft: `4px solid ${character.color}`,
    },
  });
};
