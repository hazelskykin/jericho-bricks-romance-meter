
import React from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import characters, { maven } from '@/data/characters';
import { CharacterId } from '@/types/game';

interface AffectionChangeProps {
  characterId: CharacterId;
  changeAmount: number;
  newLevel: string;
  previousLevel: string;
}

export const showAffectionChange = ({ characterId, changeAmount, newLevel, previousLevel }: AffectionChangeProps) => {
  // Only show toast if the affection level has changed
  if (newLevel === previousLevel) return;
  
  // Get the character data
  const character = characterId === 'maven' ? maven : characters[characterId];
  
  if (!character) return;
  
  const isPositive = newLevel === 'Hostile' || newLevel === 'Cold' ? false : true;
  
  toast(
    <div className="flex items-center gap-2">
      <span className="font-semibold" style={{ color: character.color }}>{character.name}</span>
      <span className="text-sm">relationship is now</span>
      <span className="font-bold" style={{ color: character.color }}>{newLevel}</span>
    </div>,
    {
      duration: 3000,
      icon: isPositive 
        ? <Heart color={character.color} fill={character.color} /> 
        : <Heart color={character.color} />,
      style: {
        borderLeft: `4px solid ${character.color}`,
        padding: '8px',
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 100
      },
      className: "affection-toast",
    }
  );
};
