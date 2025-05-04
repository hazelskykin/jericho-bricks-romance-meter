
import { Scene } from '../../../types/game';
import { CharacterId } from '@/types/game';

// Helper function to track which characters have been visited
const getCharacterSelectionScene = (visitedCharacters: CharacterId[]): Scene => {
  const remainingCharacters: CharacterId[] = 
    ['xavier', 'navarre', 'etta', 'senara'].filter(
      charId => !visitedCharacters.includes(charId as CharacterId)
    ) as CharacterId[];
  
  // Create a scene ID suffix based on visited characters
  const suffix = visitedCharacters.length > 0 
    ? '-' + visitedCharacters.map(char => {
        switch(char) {
          case 'xavier': return '1';
          case 'navarre': return '2';
          case 'etta': return '3';
          case 'senara': return '4';
          default: return '';
        }
      }).join('')
    : '';
  
  return {
    id: `summer-character-selection${suffix}`,
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: visitedCharacters.length > 0 
          ? "Who would you like to visit next to learn more about their role in the festival preparations?"
          : "As summer begins in Stonewich, take time to connect with your teammates before the festival.",
      }
    ],
    // This scene doesn't advance automatically as it uses the CharacterSelectionScene component
  };
};

// Create different scene IDs based on visited characters
const summerCharacterSelections: Record<string, Scene> = {
  'summer-character-selection': getCharacterSelectionScene([]),
  'summer-character-selection-1': getCharacterSelectionScene(['xavier']),
  'summer-character-selection-2': getCharacterSelectionScene(['navarre']),
  'summer-character-selection-3': getCharacterSelectionScene(['etta']),
  'summer-character-selection-4': getCharacterSelectionScene(['senara']),
  'summer-character-selection-12': getCharacterSelectionScene(['xavier', 'navarre']),
  'summer-character-selection-13': getCharacterSelectionScene(['xavier', 'etta']),
  'summer-character-selection-14': getCharacterSelectionScene(['xavier', 'senara']),
  'summer-character-selection-23': getCharacterSelectionScene(['navarre', 'etta']),
  'summer-character-selection-24': getCharacterSelectionScene(['navarre', 'senara']),
  'summer-character-selection-34': getCharacterSelectionScene(['etta', 'senara']),
  'summer-character-selection-123': getCharacterSelectionScene(['xavier', 'navarre', 'etta']),
  'summer-character-selection-124': getCharacterSelectionScene(['xavier', 'navarre', 'senara']),
  'summer-character-selection-134': getCharacterSelectionScene(['xavier', 'etta', 'senara']),
  'summer-character-selection-234': getCharacterSelectionScene(['navarre', 'etta', 'senara']),
  'summer-character-selection-1234': getCharacterSelectionScene(['xavier', 'navarre', 'etta', 'senara']),
};

export default summerCharacterSelections;
