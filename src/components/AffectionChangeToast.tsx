
import React from 'react';
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
  // Toast notifications are completely disabled
  return;
};

// Export an empty component to maintain API compatibility, but it doesn't render anything
const AffectionChangeToast: React.FC = () => null;
export default AffectionChangeToast;
