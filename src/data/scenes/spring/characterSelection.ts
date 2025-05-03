
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
      id: `spring-character-selection${visitedCharacters.length > 0 ? '-1234' : ''}`,
      background: 'stonewich-cityscape',
      dialogue: [
        {
          character: 'narrator',
          text: "You've spent time with each team member and learned about their roles and perspectives. Now it's time to come together for the Spring festival.",
        },
        {
          character: 'maven',
          text: "I feel like I understand everyone a bit better now. Our different strengths will really come in handy for the festival.",
          mood: 'happy',
        }
      ],
      nextSceneId: 'spring-festival-planning', // Direct transition to festival planning
    };
  }
  
  // If characters remain to be visited
  return {
    id: `spring-character-selection${visitedCharacters.length > 0 ? '-' + visitedCharacters.map(char => {
      switch(char) {
        case 'xavier': return '1';
        case 'navarre': return '2';
        case 'etta': return '3';
        case 'senara': return '4';
        default: return '';
      }
    }).join('') : ''}`,
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: visitedCharacters.length > 0 
          ? "Who would you like to visit next to learn more about their role in the festival preparations?"
          : "As spring begins in Stonewich, take time to connect with your teammates before the festival.",
      }
    ],
    // This scene doesn't advance automatically as it uses the CharacterSelectionScene component
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
  'spring-character-selection-1234': getCharacterSelectionScene(['xavier', 'navarre', 'etta', 'senara']),
};

export default springCharacterSelections;
