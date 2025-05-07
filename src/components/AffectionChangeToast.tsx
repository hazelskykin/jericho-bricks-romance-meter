
import React from 'react';
import { Heart } from 'lucide-react';
import { CharacterId } from '@/types/game';

interface AffectionChangeProps {
  characterId: CharacterId;
  changeAmount: number;
  newLevel: string;
  previousLevel: string;
}

export const showAffectionChange = ({ characterId, changeAmount, newLevel, previousLevel }: AffectionChangeProps) => {
  // All toast notifications have been disabled as requested
  return;
};
