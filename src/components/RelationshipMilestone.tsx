
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { CharacterId } from '@/types/game';
import characters, { maven } from '@/data/characters';
import characterChibis from '@/data/characterChibis';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RelationshipMilestoneProps {
  characterId: CharacterId;
  milestoneText: string;
  level: string;
}

export const showRelationshipMilestone = ({ characterId, milestoneText, level }: RelationshipMilestoneProps) => {
  // Get character data
  const character = characterId === 'maven' ? maven : characters[characterId];
  
  if (!character) return;
  
  // Get chibi image if available
  const chibiData = characterChibis[characterId];
  
  toast(
    <div className="flex items-center gap-3">
      {chibiData?.image && (
        <Avatar className="w-12 h-12 rounded-xl border-2" style={{ borderColor: character.color }}>
          <AvatarImage 
            src={chibiData.image} 
            alt={character.name}
            className="rounded-xl"
          />
          <AvatarFallback
            style={{ 
              backgroundColor: character.color + '30',
              color: character.color,
            }}
            className="rounded-xl"
          >
            {character.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      )}
      <div>
        <div className="font-semibold flex items-center gap-1">
          <span>{character.name}</span>
          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: character.color + '30', color: character.color }}>{level}</span>
        </div>
        <p className="text-sm">{milestoneText}</p>
      </div>
    </div>,
    {
      duration: 5000,
      icon: <Heart color={character.color} fill={character.color} />,
      style: {
        borderLeft: `4px solid ${character.color}`,
      },
    }
  );
};

export default showRelationshipMilestone;
