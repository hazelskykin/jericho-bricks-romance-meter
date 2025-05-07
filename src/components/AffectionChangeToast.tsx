
import React from 'react';
import { Heart } from 'lucide-react';
import { CharacterId } from '@/types/game';

interface AffectionChangeProps {
  characterId: CharacterId;
  changeAmount: number;
  newLevel: string;
  previousLevel: string;
}

/**
 * This component has been disabled as requested by the user.
 * No toast notifications will be shown for affection changes.
 */
export const showAffectionChange = ({ characterId, changeAmount, newLevel, previousLevel }: AffectionChangeProps) => {
  // All toast notifications have been disabled as requested by the user
  return;
};
