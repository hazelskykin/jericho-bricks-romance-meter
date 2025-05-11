
import { CharacterId } from '@/types/game';

/**
 * Get the display name for a character based on their ID
 */
export const getSpeakerName = (characterId: CharacterId | string): string => {
  // Map character IDs to display names
  const characterNames: Record<string, string> = {
    'maven': 'Maven',
    'xavier': 'Xavier',
    'navarre': 'Navarre',
    'etta': 'Etta',
    'senara': 'Senara',
    'narrator': 'Narrator'
  };

  return characterNames[characterId] || characterId;
};
