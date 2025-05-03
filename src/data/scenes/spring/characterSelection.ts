
import { Scene } from '../../../types/game';
import { CharacterId } from '@/types/game';

// Helper function to track which characters have been visited
const getCharacterSelectionScene = (visitedCharacters: CharacterId[]): Scene => {
  const remainingCharacters: CharacterId[] = 
    ['xavier', 'navarre', 'etta', 'senara'].filter(
      charId => !visitedCharacters.includes(charId as CharacterId)
    ) as CharacterId[];
  
  // If all characters visited, move to festival planning
  if (remainingCharacters.length === 0) {
    return {
      id: 'spring-character-selection',
      background: 'stonewich-cityscape',
      dialogue: [
        {
          character: 'narrator',
          text: "You know a little about what each team member does. It's time to pitch in for the Spring festival.",
        }
      ],
      nextSceneId: 'spring-festival-planning',
    };
  }
  
  // Character selection interface doesn't use dialogue
  return {
    id: 'spring-character-selection',
    background: 'stonewich-cityscape',
    dialogue: [], // Empty dialogue as we use custom UI
    // This scene doesn't advance automatically
  };
};

// Create different scene IDs based on visited characters
const springCharacterSelections: Record<string, Scene> = {
  'spring-character-selection': getCharacterSelectionScene([]),
  'spring-character-selection-1': getCharacterSelectionScene(['xavier']),
  'spring-character-selection-2': getCharacterSelectionScene(['navarre']),
  'spring-character-selection-3': getCharacterSelectionScene(['etta']),
  'spring-character-selection-4': getCharacterSelectionScene(['senara']),
  'spring-character-selection-12': getCharacterSelectionScene(['xavier', 'navarre']),
  'spring-character-selection-13': getCharacterSelectionScene(['xavier', 'etta']),
  'spring-character-selection-14': getCharacterSelectionScene(['xavier', 'senara']),
  'spring-character-selection-23': getCharacterSelectionScene(['navarre', 'etta']),
  'spring-character-selection-24': getCharacterSelectionScene(['navarre', 'senara']),
  'spring-character-selection-34': getCharacterSelectionScene(['etta', 'senara']),
  'spring-character-selection-123': getCharacterSelectionScene(['xavier', 'navarre', 'etta']),
  'spring-character-selection-124': getCharacterSelectionScene(['xavier', 'navarre', 'senara']),
  'spring-character-selection-134': getCharacterSelectionScene(['xavier', 'etta', 'senara']),
  'spring-character-selection-234': getCharacterSelectionScene(['navarre', 'etta', 'senara']),
};

export default springCharacterSelections;
