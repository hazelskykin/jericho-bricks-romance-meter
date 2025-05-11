
import { CharacterId } from '@/types/game';
import { generateSeasonCharacterSelections } from '@/utils/generateSeasonCharacterSelections';

const summerCharacterSelections = generateSeasonCharacterSelections(
  'summer',
  ['xavier', 'navarre', 'etta', 'senara'] as CharacterId[],
  'As summer heats up in Stonewich, spend time with your teammates to prepare for the festival.',
  'Who would you like to visit next to support festival preparations and deepen your bonds?'
);

// Log the generated scene keys for debugging
console.log('Generated summer character selection scene keys:', Object.keys(summerCharacterSelections));

// Make sure we have the exact 'summer-character-selection' key
if (!summerCharacterSelections['summer-character-selection']) {
  // Create it explicitly if it doesn't exist
  summerCharacterSelections['summer-character-selection'] = {
    id: 'summer-character-selection',
    background: 'summer-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: 'As summer heats up in Stonewich, spend time with your teammates to prepare for the festival.'
      },
      {
        character: 'narrator',
        text: 'Who would you like to visit next to support festival preparations and deepen your bonds?'
      }
    ],
    choices: [
      {
        text: 'Visit Xavier',
        nextSceneId: 'summer-visit-xavier'
      },
      {
        text: 'Visit Navarre',
        nextSceneId: 'summer-visit-navarre'
      },
      {
        text: 'Visit Etta',
        nextSceneId: 'summer-visit-etta'
      },
      {
        text: 'Visit Senara',
        nextSceneId: 'summer-visit-senara'
      },
      {
        text: 'Proceed to festival planning',
        nextSceneId: 'summer-planning'
      }
    ]
  };
}

export default summerCharacterSelections;
